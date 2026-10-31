const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="selection:bg-accent/10 mx-auto max-w-173 pt-[env(safe-area-inset-top)] pr-[max(1.5rem,env(safe-area-inset-right))] pb-[env(safe-area-inset-bottom)] pl-[max(1.5rem,env(safe-area-inset-left))]">
      <div className="relative mb-16 h-full">{children}</div>
    </main>
  );
};
export default Layout;
