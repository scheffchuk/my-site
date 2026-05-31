"use client";

import { PaintRoller } from "lucide-react";
import { useAccent } from "@/hooks/use-accent";
import { Button } from "./ui/button";

const ThemeChanger = () => {
  const { cycleAccent } = useAccent();

  return (
    <Button
      type="button"
      onClick={cycleAccent}
      variant="accent"
      size="iconSm"
      aria-label="Change accent color"
    >
      <PaintRoller aria-hidden={true} />
    </Button>
  );
};

export default ThemeChanger;
