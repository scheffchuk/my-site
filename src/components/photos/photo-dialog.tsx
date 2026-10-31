"use client";

import { type MouseEvent, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export function PhotoDialog({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (document.activeElement?.matches(":focus-visible")) {
      dialog
        .getAnimations({ subtree: true })
        .forEach((animation) => animation.cancel());
    }
  }, []);

  const close = async (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.detail === 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    event.preventDefault();
    const dialog = dialogRef.current;
    const content = contentRef.current;
    if (!dialog || !content || closingRef.current) return;
    closingRef.current = true;

    const options = {
      duration: 200,
      easing: getComputedStyle(dialog).getPropertyValue("--ease-out").trim(),
      fill: "forwards",
    } as const;
    const animations = [
      dialog.animate(
        [{ opacity: getComputedStyle(dialog).opacity }, { opacity: 0 }],
        options,
      ),
    ];

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animations.push(
        content.animate(
          [
            { transform: getComputedStyle(content).transform },
            { transform: "scale(0.96)" },
          ],
          options,
        ),
      );
    }

    await Promise.allSettled(animations.map((animation) => animation.finished));
    if (dialog.isConnected) router.replace("/photos", { scroll: false });
  };

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        router.replace("/photos", { scroll: false });
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <div
      ref={dialogRef}
      className="photo-dialog fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Photo"
    >
      <Link
        href="/photos"
        replace
        scroll={false}
        onClick={close}
        aria-label="Back to photos"
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
      />
      <div className="pointer-events-none relative z-10 flex h-full items-center justify-center pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]">
        <div
          ref={contentRef}
          className="photo-dialog-content pointer-events-auto"
        >
          {children}
        </div>
      </div>
      <Link
        href="/photos"
        replace
        scroll={false}
        onClick={close}
        aria-label="Close"
        className="press-feedback absolute top-[calc(1rem+env(safe-area-inset-top,0px))] right-[calc(1rem+env(safe-area-inset-right,0px))] z-20 rounded-full bg-white/10 p-2.5 text-white hover:bg-black focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
      >
        <X className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
