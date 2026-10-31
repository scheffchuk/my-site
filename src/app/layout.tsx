import "./globals.css";

import type { Viewport } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";

import { AccentApply } from "@/components/accent-apply";
import { ThemeColorMeta } from "@/components/theme-color-meta";
import { accentBlockingScript } from "@/lib/accent";
import { cn } from "@/lib/utils";
import { QueryClientProviderWrapper } from "@/lib/query-client";
import { ConvexClientProvider } from "@/lib/ConvexClientProvider";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  title: "Scheff Chuk",
  description:
    "Hi, I am Scheff. I am learning full-stack development by building sites and apps. Work mainly with React and Next.js.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth!" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: accentBlockingScript }} />
      </head>
      <body className={cn(geist.className)}>
        <AccentApply />
        <ConvexClientProvider>
          <QueryClientProviderWrapper>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              storageKey="appearance"
              disableTransitionOnChange
              themes={["light", "dark", "system"]}
            >
              <ThemeColorMeta />
              {children}
            </ThemeProvider>
          </QueryClientProviderWrapper>
        </ConvexClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
