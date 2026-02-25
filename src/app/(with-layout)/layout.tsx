import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#0F0F0F",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="selection:bg-accent/10 mx-auto max-w-2xl px-6">
      <div className="h-full relative mb-16">{children}</div>
    </main>
  );
};
export default Layout;
