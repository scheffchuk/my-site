"use client";

import { PaintRoller } from "lucide-react";
import { cycleAccent } from "@/lib/accent";
import { Button } from "./ui/button";

export function AccentSwitcher() {
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
}
