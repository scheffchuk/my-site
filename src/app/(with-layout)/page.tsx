import Link from "next/link";
import { AppearanceSwitcher } from "@/components/appearance-switcher";
import { AccentSwitcher } from "@/components/accent-switcher";
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
          <AccentSwitcher />
        </div>
      </header>
      <div className="flex flex-col gap-y-28">
        <div className="pt-16">
          <h1 className="text-accent-chrome font-medium tracking-tight">
            Scheff Chuk
          </h1>
          <p className="text-accent-chrome-muted">Software engineer</p>
        </div>
        <div className="flex flex-col items-start gap-y-4">
          <h2 className="text-accent-chrome font-medium">About Me</h2>
          <p className="text-accent-chrome-muted text-pretty">
            I am learning to craft beautiful and performant things with code.
            In my spare time, I like to cook, read, listen to music, watch movies, and walk around with my wife.
            And I started to learn playing drums recently!
            This site is my playground to try out new things. I hope you like it. Sign my guestbook if you like!
          </p>
          <Link
            href="/guestbook"
            className="bg-accent hover:bg-accent/90 text-primary-foreground rounded-xs px-2 py-1 font-medium transition-normal duration-150 ease-out active:scale-[0.98]"
          >
            Guestbook
          </Link>
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-accent-chrome font-medium">Projects</h2>
          <div className="flex flex-col gap-y-4">
            <ProjectCard
              title="HeadSalon"
              description="A blog archive for WhigZhou, the person who shaped my worldview."
              websiteUrl="https://headsalon.vercel.app/"
            />
            <ProjectCard
              title="ODY CELL"
              description="A marketing site for a book store in Tokyo."
              websiteUrl="https://odycell.space/"
            />
            <ProjectCard
              title="Ueno Birds"
              description="A seasonal guide to birds you’ll meet in Ueno Park."
              websiteUrl="https://birds-in-ueno-park.vercel.app/"
            />
          </div>
        </div>

        <p className="text-accent-chrome-muted text-pretty">
          For more, you can look at {" "}
          <Link href="/photos" className={inlineLinkClassName}>
            photos
          </Link> I took, read{" "}
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
