import Link from "next/link";
import { AppearanceSwitcher } from "@/components/appearance-switcher";
import ThemeChanger from "@/components/theme-switcher";
import { ProjectCard } from "@/components/project-card";
import Footer from "@/components/footer";
import { TokyoWeatherTime } from "@/components/tokyo-weather-time";
import { Suspense } from "react";

const links = [
  { href: "mailto:hi@scheff.dev", label: "Mail" },
  { href: "https://x.com/scheffchuk", label: "Twitter/X" },
  { href: "https://www.instagram.com/scheff.d.chuk", label: "Instagram" },
  { href: "https://github.com/scheffchuk", label: "GitHub" },
  { href: "/guestbook", label: "Guestbook" },
];

const baseLinkClassName =
  "text-accent-chrome rounded-sm transition-all duration-150 ease-out hover:opacity-70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

const isExternal = (href: string) =>
  href.startsWith("http") || href.startsWith("mailto:");

export default function Home() {
  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between gap-x-4 py-4">
        <Suspense
          fallback={
            <div className="bg-accent/10 dark:bg-muted h-5 w-40 animate-pulse rounded" />
          }
        >
          <TokyoWeatherTime />
        </Suspense>
        <div className="flex items-center gap-1">
          <AppearanceSwitcher />
          <ThemeChanger />
        </div>
      </header>
      <div className="flex flex-col gap-y-28">
        <div className="pt-16">
          <h1 className="text-accent-chrome font-medium tracking-tight">
            Scheff Chuk
          </h1>
          <p className="text-accent-chrome-muted">Self-taught design engineer</p>
        </div>
        <div className="flex flex-col items-start gap-y-4">
          <h2 className="text-accent-chrome font-medium">Today</h2>
          <p className="text-accent-chrome-muted text-balance">
            I am learning to build things that are beautiful and performant.
            Leave me a note if you feel like it!
          </p>
          <Link
            href="/guestbook"
            className="bg-accent hover:bg-accent/90 text-primary-foreground rounded-xs px-2 py-1 font-medium transition-normal duration-150 ease-out active:scale-[0.98]"
          >
            Leave a note
          </Link>
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-accent-chrome font-medium">Projects</h2>
          <div className="flex flex-col gap-y-4">
            <ProjectCard
              title="My site"
              description="My portfolio and playground."
              websiteUrl="https://scheff.dev"
            />
            <ProjectCard
              title="HeadSalon"
              description="A blog web app for my favorite writer, WhigZhou."
              websiteUrl="https://headsalon.vercel.app/"
            />
            <ProjectCard
              title="ODY CELL"
              description="A marketing site for a book store in Tokyo."
              websiteUrl="https://odycell.space/"
            />
          </div>
        </div>

        <div>
          <h2 className="text-accent-chrome font-medium">Links</h2>
          <div className="text-accent-chrome flex flex-wrap gap-x-4 py-2">
            {links.map(({ href, label }) => {
              const external = isExternal(href);
              return (
                <Link
                  key={label}
                  href={href}
                  className={`${baseLinkClassName} ${external ? "decoration-accent/30 hover:decoration-accent/60 underline underline-offset-4" : ""}`}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
