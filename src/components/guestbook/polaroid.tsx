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
      <div className="h-[160px] w-[125px] rounded-lg bg-neutral-100 p-1 pb-6 shadow-[0_4px_8px_rgba(0,0,0,0.2),0_8px_16px_rgba(0,0,0,0.2),0_16px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.25),0_12px_24px_rgba(0,0,0,0.2),0_24px_48px_rgba(0,0,0,0.2)]">
        <div className="relative h-full w-full overflow-hidden rounded-[4px]">
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
