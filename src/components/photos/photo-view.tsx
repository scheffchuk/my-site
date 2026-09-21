import Image from "next/image";
import type { Photo } from "@/lib/photos";

export function PhotoView({ photo }: { photo: Photo }) {
  return (
    <figure
      className="relative"
      style={{
        width: `min(90vw, calc(90dvh * ${photo.width} / ${photo.height}))`,
        height: `min(90dvh, calc(90vw * ${photo.height} / ${photo.width}))`,
      }}
    >
      <Image
        src={photo.src}
        alt={photo.title}
        fill
        preload
        className="shadow-md object-contain"
        sizes="90vw"
      />
      <figcaption className="absolute bottom-4 left-4 text-white">
        <p className="font-medium tracking-tight">{photo.title}</p>
        {photo.takenAt ? (
          <p className="text-sm text-white/70">{photo.takenAt}</p>
        ) : null}
      </figcaption>
    </figure>
  );
}
