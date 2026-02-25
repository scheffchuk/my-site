import "./globals.css";

import localFont from "next/font/local";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";
import { QueryClientProviderWrapper } from "@/lib/query-client";
import { ConvexClientProvider } from "@/lib/ConvexClientProvider";

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
        <ConvexClientProvider>
          <QueryClientProviderWrapper>
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
          </QueryClientProviderWrapper>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
