"use client";

import { ScrollArea as ShadcnScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function ScrollArea({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ShadcnScrollArea className={cn("relative overflow-hidden", className)} type="always">
      {children}
      <ScrollBar 
        orientation="horizontal" 
        className="flex select-none -mb-2 w-[calc(100%-32px)] mx-auto rounded-md touch-none bg-muted transition-all duration-100 ease-out data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-0.5 hover:data-[orientation=horizontal]:h-1 group [&>div]:bg-accent/50 hover:[&>div]:bg-accent"
      />
    </ShadcnScrollArea>
  );
}
