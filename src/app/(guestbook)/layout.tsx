export default function GuestbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="guestbook-shell h-dvh overflow-hidden bg-background pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]">
      {children}
    </div>
  );
}
