"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="flex items-center justify-center h-8 w-8"
        aria-label="Loading theme switcher"
      >
        <div className="animate-pulse">
          <BsSun className="text-xl text-yellow-200" />
        </div>
      </button>
    );
  }

  const currentTheme = resolvedTheme || theme;

  const toggleTheme = () => {
    setTheme(currentTheme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center h-8 w-8 transition-transform duration-200 hover-only:hover:scale-[1.02] active:scale-[0.96] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_hsl(var(--ring))] rounded-sm select-none"
      aria-label={
        currentTheme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
    >
      {currentTheme === "light" ? (
        <BsMoon className="text-xl text-gray-700 hover-only:hover:text-[#3399ff]" />
      ) : (
        <BsSun className="text-xl text-yellow-400 hover-only:hover:text-yellow-300" />
      )}
    </button>
  );
}
