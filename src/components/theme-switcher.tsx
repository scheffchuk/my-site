"use client";

import { PaintRoller } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const themes = ["green", "red", "darkBlue"];

  const toggleTheme = () => {
    const currentThemeIndex = themes.indexOf(theme ?? themes[0]);
    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[nextThemeIndex]);
  };

  return (
    <div>
      <Button
        type="button"
        onClick={toggleTheme}
        variant="accent"
        size="compact"
        className="h-full px-1 py-1"
        aria-label="Change theme"
      >
        <PaintRoller className="shrink-0" size={12} aria-hidden={true} />
      </Button>
    </div>
  );
};

export default ThemeChanger;
