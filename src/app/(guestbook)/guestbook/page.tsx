import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GuestbookBoard } from "@/components/guestbook/guestbook-board";

export const metadata = {
  title: "Guestbook | Scheff Chuk",
  description: "Leave a note on my guestbook.",
};

export default function GuestbookPage() {
  return (
    <div className="relative min-h-screen">
      <GuestbookBoard />
      <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between">
        <Link
          href="/"
          className="rounded-md border border-accent/30 bg-background/80 px-3 py-2 text-sm text-accent/90 backdrop-blur-sm transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:scale-[0.98]"
        >
          <ArrowLeft className="mr-1 inline-block size-4" aria-hidden />
          take me home
        </Link>
      </div>
    </div>
  );
}
