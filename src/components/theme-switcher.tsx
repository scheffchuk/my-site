"use client";

import { PaintRoller } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const themes = ["blue", "green", "red", "darkBlue"];

  const toggleTheme = () => {
    const currentThemeIndex = themes.indexOf(theme ?? themes[0]);
    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[nextThemeIndex]);
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggleTheme}
        className="flex gap-x-1.5 items-center bg-accent hover:bg-accent/80 transition text-primary-foreground py-0.5 px-1.5 rounded-xs cursor-pointer h-full"
        aria-label="Change theme"
      >
        <PaintRoller
          className="shrink-0"
          size={12}
          aria-hidden={true}
        />
      </button>
    </div>
  );
};

export default ThemeChanger;
