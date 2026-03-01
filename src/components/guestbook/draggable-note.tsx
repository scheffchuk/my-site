"use client";

import { Drag } from "./drag";
import { Note } from "./note";

type DraggableNoteProps = {
  id: string;
  name: string;
  content: string;
  signature?: string;
  initialX?: number;
  initialY?: number;
};

export function DraggableNote({
  name,
  content,
  signature,
  initialX,
  initialY,
}: DraggableNoteProps) {
  return (
    <Drag className="z-10 max-w-[200px]" initialX={initialX} initialY={initialY}>
      <Note name={name} content={content} signature={signature} />
    </Drag>
  );
}
