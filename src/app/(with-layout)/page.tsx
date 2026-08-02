import Link from "next/link";
import { AppearanceSwitcher } from "@/components/appearance-switcher";
import ThemeChanger from "@/components/theme-switcher";
import { ProjectCard } from "@/components/project-card";
import Footer from "@/components/footer";

const inlineLinkClassName =
  "text-accent-chrome rounded-sm underline decoration-accent/30 underline-offset-4 transition-all duration-150 ease-out hover:opacity-70 hover:decoration-accent/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

export default function Home() {
  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-end gap-x-4 py-4">
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
          <p className="text-accent-chrome-muted">Design engineer</p>
        </div>
        <div className="flex flex-col items-start gap-y-4">
          <h2 className="text-accent-chrome font-medium">Today</h2>
          <p className="text-accent-chrome-muted text-pretty">
            I am building things that are beautiful and performant with code. This site is my playground. Hope you enjoy it! Leave me a note if you want to!
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
              title="HeadSalon"
              description="A blog web app for my favorite writer, WhigZhou."
              websiteUrl="https://headsalon.vercel.app/"
            />
            <ProjectCard
              title="ODY CELL"
              description="A marketing site for a book store in Tokyo."
              websiteUrl="https://odycell.space/"
            />
            <ProjectCard
              title="Birds in Ueno Park"
              description="A seasonal guide to birds you’ll meet in Ueno."
              websiteUrl="https://birds-in-ueno-park.vercel.app/"
            />
          </div>
        </div>

        <p className="text-accent-chrome-muted text-balance">
          You can read{" "}
          <Link
            href="https://github.com/scheffchuk"
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLinkClassName}
          >
            my code
          </Link>
          , or follow me{" "}
          <Link
            href="https://x.com/scheffchuk"
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLinkClassName}
          >
            online
          </Link>
          .
        </p>
        <Footer />
      </div>
    </div>
  );
}
