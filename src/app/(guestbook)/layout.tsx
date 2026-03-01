import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#0F0F0F",
};

export default function GuestbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-dvh overflow-hidden bg-background">{children}</div>;
}
