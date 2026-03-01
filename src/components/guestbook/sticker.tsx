"use client";

import { Drag } from "./drag";

type StickerProps = {
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
};

export function Sticker({ children, initialX, initialY }: StickerProps) {
  return (
    <Drag initialX={initialX} initialY={initialY}>
      <div className="drop-shadow-xs">{children}</div>
    </Drag>
  );
}
