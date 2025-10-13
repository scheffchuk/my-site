import "./globals.css";

import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";

const paperMono = localFont({
  src: "../assets/PaperMono-Regular.woff2",
  style: "normal",
  display: "swap",
});

export const metadata = {
  title: "Scheff Chuk",
  description:
    "Hi, I am Scheff. I am learning full-stack development by building sites and apps. Work mainly with React and Next.js.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth!" suppressHydrationWarning>
      <body className={cn(paperMono.className, "max-w-2xl mx-auto px-2")}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="blue"
          enableSystem={false}
          storageKey="color-theme"
          disableTransitionOnChange={false}
          themes={["red", "green", "blue", "darkBlue"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
