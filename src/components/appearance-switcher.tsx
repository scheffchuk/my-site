"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const APPEARANCES = ["light", "dark", "system"] as const;

const appearanceLabels: Record<(typeof APPEARANCES)[number], string> = {
  light: "Switch to dark mode",
  dark: "Switch to system appearance",
  system: "Switch to light mode",
};

function AppearanceIcon({ appearance }: { appearance: string }) {
  if (appearance === "dark") {
    return <Moon aria-hidden />;
  }
  if (appearance === "system") {
    return <Monitor aria-hidden />;
  }
  return <Sun aria-hidden />;
}

export function AppearanceSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="accent"
        size="iconSm"
        aria-label="Change appearance"
        disabled
      >
        <Sun aria-hidden />
      </Button>
    );
  }

  const current =
    APPEARANCES.find((appearance) => appearance === theme) ?? "system";
  const currentIndex = APPEARANCES.indexOf(current);
  const next = APPEARANCES[(currentIndex + 1) % APPEARANCES.length];

  return (
    <Button
      type="button"
      onClick={() => setTheme(next)}
      variant="accent"
      size="iconSm"
      aria-label={appearanceLabels[current]}
    >
      <AppearanceIcon appearance={current} />
    </Button>
  );
}
