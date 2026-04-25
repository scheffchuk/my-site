"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { DraggableNote } from "./draggable-note";

export type OptimisticEntry = {
  id: string;
  localEntryId: string;
  name: string;
  message: string;
  signature?: string;
  initialX?: number;
  initialY?: number;
};

type GuestbookEntriesProps = {
  optimisticEntries: OptimisticEntry[];
};

export function GuestbookEntries({ optimisticEntries }: GuestbookEntriesProps) {
  const serverEntries = useQuery(api.guestbook.getApprovedEntries) ?? [];

  const approvedLocalIds = new Set(
    serverEntries.map((e) => e.localEntryId).filter((id): id is string => !!id),
  );

  const localOnly = optimisticEntries.filter(
    (e) => !approvedLocalIds.has(e.localEntryId),
  );

  const localEntries = localOnly.map((e) => ({
    id: e.id,
    name: e.name,
    message: e.message,
    signature: e.signature,
    initialX: e.initialX,
    initialY: e.initialY,
  }));

  const serverEntriesList = serverEntries.map((e) => ({
    id: e._id,
    name: e.name,
    message: e.message,
    signature: e.signature,
    initialX: undefined as number | undefined,
    initialY: undefined as number | undefined,
  }));

  return (
    <>
      {localEntries.map((entry) => (
        <DraggableNote
          key={entry.id}
          id={entry.id}
          name={entry.name}
          content={entry.message}
          signature={entry.signature}
          initialX={entry.initialX}
          initialY={entry.initialY}
        />
      ))}
      {serverEntriesList.map((entry) => (
        <DraggableNote
          key={entry.id}
          id={entry.id}
          name={entry.name}
          content={entry.message}
          signature={entry.signature}
          initialX={entry.initialX}
          initialY={entry.initialY}
        />
      ))}
    </>
  );
}
