"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

const THEME_COLORS = {
  light: "#ffffff",
  dark: "#0a0a0a",
} as const;

export function ThemeColorMeta() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;

    const color =
      resolvedTheme === "dark" ? THEME_COLORS.dark : THEME_COLORS.light;

    const syncThemeColor = () => {
      document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
        if (meta.getAttribute("content") !== color) {
          meta.setAttribute("content", color);
        }
      });
    };

    syncThemeColor();
    const observer = new MutationObserver(syncThemeColor);
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["content"],
    });
    return () => observer.disconnect();
  }, [resolvedTheme]);

  return null;
}
