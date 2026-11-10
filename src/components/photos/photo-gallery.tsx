"use client";

import { Lightbox } from "@/components/ui/lightbox";
import { photos } from "@/lib/photos";
import { PhotoMasonry } from "./photo-masonry";

const items = photos.map((photo) => ({
  id: photo.src,
  src: photo.src,
  thumb: photo.src,
  alt: photo.title,
  caption: photo.takenAt ? `${photo.title} · ${photo.takenAt}` : photo.title,
  width: photo.width,
  height: photo.height,
}));

export function PhotoGallery({ initialIndex }: { initialIndex?: number }) {
  return (
    <Lightbox.Root
      defaultOpen={initialIndex !== undefined}
      defaultValue={initialIndex ?? 0}
      scrollTriggerIntoView={[
        { type: "onChange", behavior: "instant" },
        { type: "onOpenComplete", behavior: "instant" },
      ]}
    >
      <main className="min-h-dvh">
        <PhotoMasonry />
      </main>
      <Lightbox.Gallery
        items={items}
        ariaLabel="Photo viewer"
        portalProps={
          initialIndex !== undefined
            ? { container: null, className: "relative z-50" }
            : undefined
        }
      />
    </Lightbox.Root>
  );
}
