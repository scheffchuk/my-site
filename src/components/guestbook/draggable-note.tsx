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
    initialX ?? Math.floor(Math.random() * Math.min(1300, typeof window !== "undefined" ? window.innerWidth - 100 : 800)),
    initialY ?? Math.floor(Math.random() * Math.min(900, typeof window !== "undefined" ? window.innerHeight - 100 : 600)),
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
      className="absolute cursor-grab touch-none active:cursor-grabbing"
      style={{
        left: x,
        top: y,
        zIndex,
      }}
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={updateZIndex}
      onDragEnd={handleDragEnd}
      initial={{ rotate: initialRotate }}
      animate={controls}
      whileTap={{ scale: 1.02 }}
    >
      <Note name={name} content={content} signature={signature} />
    </motion.div>
  );
}
