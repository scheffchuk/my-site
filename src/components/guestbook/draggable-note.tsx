"use client";

import { useState } from "react";
import { motion, type PanInfo, useAnimation } from "motion/react";
import { cn, getRandomRotation } from "@/lib/utils";
import useMaxZIndex from "@/hooks/useMaxZIndex";
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
  id,
  name,
  content,
  signature,
  initialX,
  initialY,
}: DraggableNoteProps) {
  const [zIndex, updateZIndex] = useMaxZIndex();
  const controls = useAnimation();
  const r = getRandomRotation();
  const [initialRotate] = useState(r);
  const [x, y] = [
    initialX ?? Math.floor(Math.random() * 1300),
    initialY ?? Math.floor(Math.random() * 900),
  ];

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const direction = info.offset.x > 0 ? 1 : -1;
    const velocity = Math.min(Math.abs(info.velocity.x), 1);
    controls.start({
      rotate: Math.floor(initialRotate + velocity * 20 * direction),
      transition: {
        type: "spring",
        duration: 1,
        stiffness: 50,
        damping: 30,
        mass: 1,
        restDelta: 0.001,
      },
    });
  };

  return (
    <motion.div
      key={id}
      className="absolute select-none touch-none cursor-grab active:cursor-grabbing"
      style={{ zIndex }}
      drag
      dragElastic={0.2}
      dragTransition={{ power: 0.2, timeConstant: 200 }}
      onMouseDown={updateZIndex}
      onTouchStart={updateZIndex}
      onDragEnd={handleDragEnd}
      initial={{ rotate: initialRotate, x, y }}
      animate={controls}
    >
      <Note name={name} content={content} signature={signature} />
    </motion.div>
  );
}
