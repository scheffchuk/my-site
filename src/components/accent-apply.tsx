"use client";

import { useEffect } from "react";
import {
  ACCENT_STORAGE_KEY,
  applyAccent,
  readStoredAccent,
} from "@/lib/accent";

export function AccentApply() {
  useEffect(() => {
    applyAccent(readStoredAccent());
    const onStorage = (event: StorageEvent) => {
      if (event.key === ACCENT_STORAGE_KEY) {
        applyAccent(readStoredAccent());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return null;
}
