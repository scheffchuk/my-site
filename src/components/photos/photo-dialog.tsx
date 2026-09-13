"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export function PhotoDialog({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        router.back();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black"
      role="dialog"
      aria-modal="true"
      aria-label="Photo"
      onClick={() => router.back()}
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        onClick={() => router.back()}
      >
        <X className="size-4" aria-hidden />
      </button>
      <div
        className="flex h-full items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
