import "./globals.css";

import localFont from "next/font/local";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
});

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
      <body className={cn(geist.className)}>
        <main className="selection:bg-accent/10 mx-auto max-w-2xl px-6">
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="darkBlue"
            enableSystem={false}
            storageKey="color-theme"
            disableTransitionOnChange={false}
            themes={["red", "green", "darkBlue"]}
          >
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
