"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type NoteProps = {
  name: string;
  content: string;
  signature?: string;
  className?: string;
};

export function Note({
  name,
  content,
  signature,
  className,
}: NoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "w-fit max-w-36 rounded-lg border border-black/10 bg-white px-1.5 pt-1.5 pb-2 text-neutral-900 backdrop-blur-[6px]",
        "shadow-md",
        "transition-shadow duration-300 ease-out hover:shadow-[0_4px_8px_rgba(0,0,0,0.15),0_8px_16px_rgba(0,0,0,0.15),0_16px_32px_rgba(0,0,0,0.15)]",
        className,
      )}
    >
      {signature ? (
        <div
          className="relative flex items-center justify-center overflow-hidden rounded-[4px] border border-black/10 bg-neutral-50 [&_svg]:h-28 [&_svg]:w-full"
          dangerouslySetInnerHTML={{ __html: signature }}
        />
      ) : null}
      <div className="mt-1.5 w-full wrap-break-word">
        <span className="mr-1 text-sm font-semibold text-neutral-500">{name}</span>
        <div className="text-base font-medium leading-tight">{content}</div>
      </div>
    </motion.div>
  );
}
