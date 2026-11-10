"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import * as Lightbox from "@ramka/react/lightbox";
import { photos, photoSlug } from "@/lib/photos";
import { PhotoDialog } from "./photo-dialog";
import { PhotoMasonry } from "./photo-masonry";

const photoPaths = photos.map((photo) => `/photos/${photoSlug(photo.title)}`);

export function PhotoGallery() {
  const pathname = usePathname();
  const urlIndex = photoPaths.indexOf(pathname);
  const [open, setOpen] = useState(urlIndex !== -1);
  const [index, setIndex] = useState(Math.max(0, urlIndex));
  const openRef = useRef(open);
  const indexRef = useRef(index);

  useEffect(() => {
    function syncFromHistory() {
      const nextIndex = photoPaths.indexOf(window.location.pathname);
      openRef.current = nextIndex !== -1;
      setOpen(nextIndex !== -1);
      if (nextIndex !== -1) {
        indexRef.current = nextIndex;
        setIndex(nextIndex);
      }
    }

    window.addEventListener("popstate", syncFromHistory);
    return () => window.removeEventListener("popstate", syncFromHistory);
  }, []);

  useEffect(() => {
    document.title = open
      ? `${photos[index].title} | Scheff Chuk`
      : "Photos | Scheff Chuk";
  }, [open, index]);

  return (
    <Lightbox.Root
      open={open}
      value={index}
      onOpenChange={(nextOpen) => {
        openRef.current = nextOpen;
        setOpen(nextOpen);
        if (nextOpen) {
          window.history.pushState(null, "", photoPaths[indexRef.current]);
        } else {
          window.history.replaceState(null, "", "/photos");
        }
      }}
      onValueChange={(nextIndex) => {
        indexRef.current = nextIndex;
        setIndex(nextIndex);
        if (openRef.current) {
          window.history.replaceState(null, "", photoPaths[nextIndex]);
        }
      }}
      scrollTriggerIntoView={[
        { type: "onChange", behavior: "instant" },
        { type: "onOpenComplete", behavior: "instant" },
      ]}
    >
      <main className="min-h-dvh">
        <PhotoMasonry />
      </main>
      <PhotoDialog />
    </Lightbox.Root>
  );
}
