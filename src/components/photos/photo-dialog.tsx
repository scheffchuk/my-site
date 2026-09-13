"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export function PhotoDialog({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        router.replace("/photos");
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Photo">
      <Link
        href="/photos"
        replace
        aria-label="Back to photos"
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
      />
      <div className="pointer-events-none relative z-10 flex h-full items-center justify-center">
        <div className="pointer-events-auto">{children}</div>
      </div>
      <Link
        href="/photos"
        replace
        aria-label="Close"
        className="absolute top-4 right-4 z-20 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-black focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
      >
        <X className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
