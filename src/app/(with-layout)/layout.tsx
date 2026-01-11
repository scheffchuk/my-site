import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#0F0F0F",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative mb-16">
      {children}
    </div>
  );
};
export default Layout;
