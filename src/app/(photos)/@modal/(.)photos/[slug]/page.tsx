import { notFound } from "next/navigation";
import { PhotoDialog } from "@/components/photos/photo-dialog";
import { PhotoView } from "@/components/photos/photo-view";
import { photoBySlug, photos, photoSlug } from "@/lib/photos";

export function generateStaticParams() {
  return photos.map((photo) => ({ slug: photoSlug(photo.title) }));
}

export default async function InterceptedPhotoPage({
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
    <PhotoDialog>
      <PhotoView photo={photo} />
    </PhotoDialog>
  );
}
