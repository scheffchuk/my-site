import { PhotoMasonry } from "@/components/photos/photo-masonry";
import { PhotosChrome } from "@/components/photos/photos-chrome";

export const metadata = {
  title: "Photos | Scheff Chuk",
  description: "Photos.",
};

export default function PhotosPage() {
  return (
    <main className="relative min-h-dvh">
      <PhotosChrome />
      <PhotoMasonry />
    </main>
  );
}
