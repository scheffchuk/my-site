"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GuestbookEntries, type OptimisticEntry } from "./guestbook-entries";
import { Polaroid } from "./polaroid";
import { Sticker } from "./sticker";
import { WriteNoteCTA } from "./write-note-cta";

export function GuestbookBoard() {
  const [optimisticEntries, setOptimisticEntries] = useState<OptimisticEntry[]>(
    [],
  );

  const handleEntryCreated = (entry: OptimisticEntry) => {
    setOptimisticEntries((prev) => [entry, ...prev]);
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[10px]"
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

      <Polaroid
        src="/kanichan.jpg"
        alt="kanichan"
        initialX={200}
        initialY={100}
      />
      <Polaroid src="/portrait.jpg" alt="portrait" />
      <Polaroid src="/sakura.jpg" alt="sakura" />
      <Polaroid src="/pepper.png" alt="pepper" />

      <Sticker initialX={110} initialY={300}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/envelope.png"
          alt="envelope"
          className="w-48 drop-shadow-md"
          draggable={false}
        />
      </Sticker>
      <Sticker initialX={100} initialY={310}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/letter.png"
          alt="letter"
          className="w-36 drop-shadow-md"
          draggable={false}
        />
      </Sticker>

      <Link
        href="/"
        className="border-accent/30 bg-background/80 text-accent/90 hover:text-accent focus-visible:ring-ring absolute top-4 left-4 z-50 rounded-md border px-3 py-2 text-sm backdrop-blur-sm transition-colors focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98]"
      >
        <ArrowLeft className="mr-1 inline-block size-4" aria-hidden />
        take me home
      </Link>

      <WriteNoteCTA onEntryCreated={handleEntryCreated} />
    </div>
  );
}
