"use client";

import { cn } from "@/lib/utils";

type NoteProps = {
  name: string;
  content: string;
  signature?: string;
  initialX?: number;
  initialY?: number;
  className?: string;
};

export function Note({
  name,
  content,
  signature,
  className,
}: NoteProps) {
  return (
    <div
      className={cn(
        "z-10 w-48 rounded-lg border border-border/20 bg-background/90 px-4 py-3 backdrop-blur-sm",
        "shadow-[0_4px_8px_rgba(0,0,0,0.15),0_8px_16px_rgba(0,0,0,0.1),0_16px_32px_rgba(0,0,0,0.08)]",
        className,
      )}
    >
      {signature ? (
        <div
          className="mb-2 [&_svg]:max-h-48 [&_svg]:w-full bg-gray-200"
          dangerouslySetInnerHTML={{ __html: signature }}
        />
      ) : null}
      <p className="text-foreground font-medium">{name}</p>
      <p className="text-muted-foreground mt-1 line-clamp-3 text-sm">{content}</p>
    </div>
  );
}
