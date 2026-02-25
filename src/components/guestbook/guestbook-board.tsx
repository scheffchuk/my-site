"use client";

import { useState } from "react";
import { GuestbookEntries, type OptimisticEntry } from "./guestbook-entries";
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
      </div>
      <WriteNoteCTA onEntryCreated={handleEntryCreated} />
    </>
  );
}
