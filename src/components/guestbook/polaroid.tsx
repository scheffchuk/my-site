"use client";

import Image from "next/image";
import { Drag } from "./drag";

type PolaroidProps = {
  src: string;
  alt: string;
  initialX?: number;
  initialY?: number;
};

export function Polaroid({ src, alt, initialX, initialY }: PolaroidProps) {
  return (
    <Drag initialX={initialX} initialY={initialY}>
      <div className="w-48 rounded-lg bg-background p-1 pb-6 shadow-[0_4px_8px_rgba(0,0,0,0.2),0_8px_16px_rgba(0,0,0,0.2),0_16px_32px_rgba(0,0,0,0.2)] transition-shadow duration-300 ease-out hover:shadow-md">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[4px]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            draggable={false}
          />
        </div>
      </div>
    </Drag>
  );
}
