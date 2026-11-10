"use client";

import Image from "next/image";
import * as Lightbox from "@ramka/react/lightbox";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { photos } from "@/lib/photos";

const controlClass =
  "press-feedback flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:pointer-events-none disabled:opacity-30";

export function PhotoDialog() {
  return (
    <Lightbox.Portal container={null} className="relative z-50">
      <Lightbox.Backdrop className="photo-lightbox-backdrop fixed inset-0 bg-black/85 backdrop-blur-md" />
      <Lightbox.Content
        aria-label="Photo viewer"
        className="pointer-events-none fixed inset-0 text-white"
      >
        <Lightbox.Slides
          aria-label="Photos"
          aria-roledescription="carousel"
          className="h-full"
        >
          {photos.map((photo, index) => (
            <Lightbox.Slide
              key={photo.title}
              className="shrink-0 basis-full pt-[calc(4.5rem+env(safe-area-inset-top,0px))] pr-[calc(1rem+env(safe-area-inset-right,0px))] pb-[calc(6rem+env(safe-area-inset-bottom,0px))] pl-[calc(1rem+env(safe-area-inset-left,0px))] sm:px-16"
            >
              <Lightbox.Item
                index={index}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${photos.length}`}
                caption={
                  <>
                    <span className="block font-medium tracking-tight">
                      {photo.title}
                    </span>
                    {photo.takenAt ? (
                      <span className="block text-sm text-white/70">
                        {photo.takenAt}
                      </span>
                    ) : null}
                  </>
                }
                className="h-full"
              >
                <Lightbox.Zoom className="h-full">
                  <Lightbox.Media
                    width={photo.width}
                    height={photo.height}
                    className="pointer-events-auto"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      width={photo.width}
                      height={photo.height}
                      loading="eager"
                      sizes="(min-width: 640px) calc(100vw - 8rem), calc(100vw - 2rem)"
                      className="object-contain"
                    />
                  </Lightbox.Media>
                </Lightbox.Zoom>
              </Lightbox.Item>
            </Lightbox.Slide>
          ))}
        </Lightbox.Slides>
        <div className="pointer-events-auto absolute top-[calc(1rem+env(safe-area-inset-top,0px))] right-[calc(1rem+env(safe-area-inset-right,0px))] flex gap-2">
          <Lightbox.ZoomOut aria-label="Zoom out" className={controlClass}>
            <ZoomOut className="size-4" aria-hidden />
          </Lightbox.ZoomOut>
          <Lightbox.ZoomIn aria-label="Zoom in" className={controlClass}>
            <ZoomIn className="size-4" aria-hidden />
          </Lightbox.ZoomIn>
          <Lightbox.Close aria-label="Close" className={controlClass}>
            <X className="size-4" aria-hidden />
          </Lightbox.Close>
        </div>
        <Lightbox.Previous
          aria-label="Previous photo"
          className={`${controlClass} pointer-events-auto absolute top-1/2 left-[calc(0.5rem+env(safe-area-inset-left,0px))] -translate-y-1/2`}
        >
          <ChevronLeft className="size-5" aria-hidden />
        </Lightbox.Previous>
        <Lightbox.Next
          aria-label="Next photo"
          className={`${controlClass} pointer-events-auto absolute top-1/2 right-[calc(0.5rem+env(safe-area-inset-right,0px))] -translate-y-1/2`}
        >
          <ChevronRight className="size-5" aria-hidden />
        </Lightbox.Next>
        <div className="absolute inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] text-center">
          <Lightbox.Caption />
          <Lightbox.Counter className="mt-1 text-xs text-white/50" />
        </div>
      </Lightbox.Content>
    </Lightbox.Portal>
  );
}
