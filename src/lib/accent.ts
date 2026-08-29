const ACCENTS = ["blue", "green", "red"] as const;
const DEFAULT_ACCENT = "blue";
export const ACCENT_STORAGE_KEY = "color-accent";

export function resolveAccent(value: string | null | undefined) {
  for (const accent of ACCENTS) {
    if (value === accent) return accent;
  }
  return DEFAULT_ACCENT;
}

export function applyAccent(value: string | null | undefined) {
  document.documentElement.setAttribute("data-accent", resolveAccent(value));
}

export function readStoredAccent() {
  try {
    return resolveAccent(localStorage.getItem(ACCENT_STORAGE_KEY));
  } catch {
    return DEFAULT_ACCENT;
  }
}

export function cycleAccent() {
  const current = resolveAccent(
    document.documentElement.getAttribute("data-accent"),
  );
  const next = ACCENTS[(ACCENTS.indexOf(current) + 1) % ACCENTS.length];
  applyAccent(next);
  try {
    localStorage.setItem(ACCENT_STORAGE_KEY, next);
  } catch {
    // ignore storage errors
  }
}

export const accentBlockingScript = `(function(){try{var v=localStorage.getItem(${JSON.stringify(ACCENT_STORAGE_KEY)});if(${ACCENTS.map((accent) => `v!=="${accent}"`).join("&&")})v=${JSON.stringify(DEFAULT_ACCENT)};document.documentElement.setAttribute("data-accent",v);}catch(e){}})();`;
