import Image from "next/image";
import type { Photo } from "@/lib/photos";

export function PhotoView({ photo }: { photo: Photo }) {
  return (
    <figure className="flex h-dvh w-full items-center justify-center bg-black">
      <div className="relative max-h-dvh max-w-full">
        <Image
          src={photo.src}
          alt={photo.title}
          width={photo.width}
          height={photo.height}
          preload
          className="h-auto max-h-dvh w-auto max-w-full"
          sizes="100vw"
        />
        <figcaption className="absolute bottom-4 left-4 text-white">
          <p className="font-medium tracking-tight">{photo.title}</p>
          <p className="text-sm text-white/70">{photo.takenAt}</p>
        </figcaption>
      </div>
    </figure>
  );
}
