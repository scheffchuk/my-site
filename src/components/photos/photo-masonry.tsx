import Image from "next/image";
import Link from "next/link";
import { AppearanceSwitcher } from "@/components/appearance-switcher";
import { AccentSwitcher } from "@/components/accent-switcher";
import { photos, photoSlug } from "@/lib/photos";

export function PhotoMasonry() {
  return (
    <div className="min-[500px]:columns-2 min-[700px]:columns-3 min-[1100px]:columns-4 columns-1 gap-2 px-8 py-4 sm:px-4">
      <div className="mb-2 flex h-96 break-inside-avoid flex-col justify-between rounded border border-accent px-4 pt-2 pb-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-accent-chrome font-medium tracking-tight">
              Photos
            </h1>
            <Link
              href="/"
              className="text-accent-chrome-muted rounded-sm text-sm underline decoration-accent/30 underline-offset-4 transition-all duration-150 ease-out hover:opacity-70 hover:decoration-accent/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
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
          Photos I keep from walking around Tokyo.
        </p>
      </div>
      {photos.map((photo) => (
        <Link
          key={photo.title}
          href={`/photos/${photoSlug(photo.title)}`}
          className="mb-2 block overflow-hidden rounded-lg border border-border break-inside-avoid"
        >
          <Image
            src={photo.src}
            alt={photo.title}
            width={photo.width}
            height={photo.height}
            className="h-auto w-full"
            sizes="(max-width: 499px) 100vw, (max-width: 699px) 50vw, (max-width: 1099px) 33vw, 25vw"
          />
        </Link>
      ))}
    </div>
  );
}
