import { notFound } from "next/navigation";
import { PhotoGallery } from "@/components/photos/photo-gallery";
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

  return <PhotoGallery initialIndex={photos.indexOf(photo)} />;
}
