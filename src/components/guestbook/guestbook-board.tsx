"use client";

import { useState } from "react";
import { GuestbookEntries, type OptimisticEntry } from "./guestbook-entries";
import { Polaroid } from "./polaroid";
import { Sticker } from "./sticker";
import { WriteNoteCTA } from "./write-note-cta";

export function GuestbookBoard() {
  const [optimisticEntries, setOptimisticEntries] = useState<OptimisticEntry[]>([]);

  const handleEntryCreated = (entry: OptimisticEntry) => {
    setOptimisticEntries((prev) => [entry, ...prev]);
  };

  return (
    <>
      <div
        className="relative min-h-screen overflow-hidden"
        style={{
          backgroundColor: "var(--accent)",
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "2vmin 2vmin",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[10px]"
          style={{
            boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.4)",
          }}
        />

        <GuestbookEntries optimisticEntries={optimisticEntries} />

        {/* Polaroids -- swap src with your own images */}
        <Polaroid src="/odycell-logo.png" alt="photo 1" initialX={200} initialY={100} />
        <Polaroid src="/placeholder.jpg" alt="photo 2" initialX={900} initialY={300} />
        <Polaroid src="/placeholder.jpg" alt="photo 3" initialX={500} initialY={600} />

        {/* Stickers -- swap children with your own SVGs / images */}
        <Sticker initialX={100} initialY={500}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/odycell-logo.png" alt="Odycell" className="w-48" draggable={false} />
        </Sticker>
        <Sticker initialX={1100} initialY={150}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vercel.svg" alt="File" className="w-16" draggable={false} />
        </Sticker>
      </div>
      <WriteNoteCTA onEntryCreated={handleEntryCreated} />
    </>
  );
}
