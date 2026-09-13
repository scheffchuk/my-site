export type Photo = {
  title: string;
  takenAt: string;
  src: string;
  width: number;
  height: number;
};

export const photos: Photo[] = [
  {
    title: "Sakura",
    takenAt: "2026-02-28",
    src: "/sakura.jpg",
    width: 4284,
    height: 5712,
  },
];

export function photoSlug(title: string) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function photoBySlug(slug: string) {
  return photos.find((photo) => photoSlug(photo.title) === slug);
}

const slugs = photos.map((photo) => photoSlug(photo.title));
if (new Set(slugs).size !== slugs.length) {
  throw new Error("Photo titles must produce unique slugs");
}
