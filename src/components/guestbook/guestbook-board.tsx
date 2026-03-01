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
        className="relative h-dvh overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[10px]"
          style={{
            boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.4)",
          }}
        />
        <GuestbookEntries optimisticEntries={optimisticEntries} />

        <Polaroid src="/kanichan.jpg" alt="kanichan" initialX={200} initialY={100} />
        <Polaroid src="/portrait.jpg" alt="portrait" />
        <Polaroid src="/sakura.jpg" alt="sakura" />
        <Polaroid src="/pepper.png" alt="pepper" />

        <Sticker initialX={110} initialY={380}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/envelope.png" alt="envelope" className="w-48 drop-shadow-md" draggable={false} />
        </Sticker>
        <Sticker initialX={100} initialY={400}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/letter.png" alt="letter" className="w-36 drop-shadow-md" draggable={false} />
        </Sticker>
      </div>
      <WriteNoteCTA onEntryCreated={handleEntryCreated} />
    </>
  );
}
