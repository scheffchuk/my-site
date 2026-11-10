"use client";

import Image from "next/image";
import Link from "next/link";
import * as Lightbox from "@ramka/react/lightbox";
import { AppearanceSwitcher } from "@/components/appearance-switcher";
import { AccentSwitcher } from "@/components/accent-switcher";
import { photos } from "@/lib/photos";

export function PhotoMasonry() {
  return (
    <div className="columns-1 gap-2 px-8 py-4 min-[500px]:columns-2 min-[700px]:columns-3 min-[1100px]:columns-4 sm:px-4">
      <div className="border-accent mb-2 flex h-96 break-inside-avoid flex-col justify-between rounded border px-4 pt-2 pb-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-accent-chrome font-medium tracking-tight">
              Photos
            </h1>
            <Link
              href="/"
              className="text-accent-chrome-muted decoration-accent/30 hover:decoration-accent/60 focus-visible:ring-ring rounded-sm text-sm underline underline-offset-4 transition-opacity duration-150 ease-out hover:opacity-70 focus-visible:ring-2 focus-visible:outline-none active:opacity-70"
            >
              take me home
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <AppearanceSwitcher />
            <AccentSwitcher />
          </div>
        </div>
        <p className="text-accent-chrome-muted text-sm text-pretty">
          I capture, therefore I remember.
          <br />
          拍下过，记住过。
        </p>
      </div>
      {photos.map((photo, index) => (
        <Lightbox.Trigger
          key={photo.title}
          index={index}
          className="press-feedback border-border focus-visible:ring-ring focus-visible:ring-offset-background mb-2 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-lg border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {({ imageRef }) => (
            <Image
              ref={imageRef}
              src={photo.src}
              alt={photo.title}
              width={photo.width}
              height={photo.height}
              className="h-auto w-full"
              sizes="(max-width: 499px) 100vw, (max-width: 699px) 50vw, (max-width: 1099px) 33vw, 25vw"
            />
          )}
        </Lightbox.Trigger>
      ))}
    </div>
  );
}
