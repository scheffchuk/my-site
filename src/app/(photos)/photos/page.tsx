import { PhotoMasonry } from "@/components/photos/photo-masonry";

export const metadata = {
  title: "Photos | Scheff Chuk",
  description: "Photos I keep from walking around Tokyo.",
};

export default function PhotosPage() {
  return (
    <main className="min-h-dvh">
      <PhotoMasonry />
    </main>
  );
}
