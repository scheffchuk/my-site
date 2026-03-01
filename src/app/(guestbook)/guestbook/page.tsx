import { GuestbookBoard } from "@/components/guestbook/guestbook-board";

export const metadata = {
  title: "Guestbook | Scheff Chuk",
  description: "Leave a note on my guestbook.",
};

export default function GuestbookPage() {
  return (
    <div className="h-full p-2">
      <GuestbookBoard />
    </div>
  );
}
