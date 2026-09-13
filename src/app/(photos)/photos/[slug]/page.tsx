import Link from "next/link";
import { notFound } from "next/navigation";
import { PhotoView } from "@/components/photos/photo-view";
import { photoBySlug, photos, photoSlug } from "@/lib/photos";

export function generateStaticParams() {
  return photos.map((photo) => ({ slug: photoSlug(photo.title) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const photo = photoBySlug(slug);
  if (!photo) {
    return { title: "Photo | Scheff Chuk" };
  }
  return {
    title: `${photo.title} | Scheff Chuk`,
  };
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const photo = photoBySlug(slug);
  if (!photo) {
    notFound();
  }

  return (
    <main className="relative bg-black">
      <Link
        href="/photos"
        className="absolute top-4 left-4 z-10 rounded bg-white/10 px-2 py-2 text-sm leading-none text-white transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
      >
        Back to Gallery
      </Link>
      <PhotoView photo={photo} />
    </main>
  );
}
