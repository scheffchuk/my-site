import Image from "next/image";
import Link from "next/link";
import { photos, photoSlug } from "@/lib/photos";

export function PhotoMasonry() {
  return (
    <div className="min-[500px]:columns-2 min-[700px]:columns-3 min-[1100px]:columns-4 columns-1 gap-4 px-4 pt-16 pb-4">
      {photos.map((photo) => (
        <Link
          key={photo.title}
          href={`/photos/${photoSlug(photo.title)}`}
          className="mb-4 block break-inside-avoid"
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
