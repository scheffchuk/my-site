"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export const ACCENTS = ["green", "red", "blue"] as const;
export type Accent = (typeof ACCENTS)[number];

const STORAGE_KEY = "color-accent";
const LEGACY_STORAGE_KEY = "color-theme";
export const DEFAULT_ACCENT: Accent = "blue";

export function normalizeAccent(value: string | null): Accent {
  if (value === "green" || value === "red" || value === "blue") return value;
  if (value === "darkBlue") return "blue";
  return DEFAULT_ACCENT;
}

export function readAccentFromStorage(): Accent {
  if (typeof window === "undefined") return DEFAULT_ACCENT;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return normalizeAccent(stored);

    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) {
      const accent = normalizeAccent(legacy);
      localStorage.setItem(STORAGE_KEY, accent);
      return accent;
    }
  } catch {
    // ignore storage errors
  }

  return DEFAULT_ACCENT;
}

type AccentContextValue = {
  accent: Accent;
  setAccent: (accent: Accent) => void;
  cycleAccent: () => void;
};

const AccentContext = createContext<AccentContextValue | null>(null);

export function AccentProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<Accent>(DEFAULT_ACCENT);

  useEffect(() => {
    const initial = readAccentFromStorage();
    setAccentState(initial);
    document.documentElement.setAttribute("data-accent", initial);
  }, []);

  const setAccent = useCallback((next: Accent) => {
    setAccentState(next);
    document.documentElement.setAttribute("data-accent", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors
    }
  }, []);

  const cycleAccent = useCallback(() => {
    setAccentState((current) => {
      const currentIndex = ACCENTS.indexOf(current);
      const next = ACCENTS[(currentIndex + 1) % ACCENTS.length];
      document.documentElement.setAttribute("data-accent", next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  return (
    <AccentContext.Provider value={{ accent, setAccent, cycleAccent }}>
      {children}
    </AccentContext.Provider>
  );
}

export function useAccent() {
  const context = useContext(AccentContext);
  if (!context) {
    throw new Error("useAccent must be used within AccentProvider");
  }
  return context;
}
