import Link from "next/link";
import ThemeChanger from "@/components/theme-switcher";
import { ProjectCard } from "@/components/project-card";
import Footer from "@/components/footer";
import { TokyoWeatherTime } from "@/components/tokyo-weather-time";

const links = [
  { href: "mailto:hi@scheff.dev", label: "Mail" },
  { href: "https://x.com/scheffchuk", label: "Twitter/X" },
  { href: "https://www.instagram.com/scheff.d.chuk", label: "Instagram" },
  { href: "https://github.com/scheffchuk", label: "GitHub" },
];

const linkClassName =
  "rounded-sm transition-all duration-150 ease-out hover:opacity-70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

export default function Home() {
  return (
    <main className="flex flex-col">
        <header className="flex justify-end items-center py-4 gap-x-4">
          <TokyoWeatherTime />
          <ThemeChanger />
        </header>
        <div className="flex flex-col gap-y-20">

        <div>
          <h1 className="text-medium font-medium text-accent">Scheff Chuk</h1>
          <p className="text-medium text-accent/80">Self-taught design engineer</p>
        </div>
      <div>
        <p className="text-accent/80">I want to build things that are performant and beautiful. I believe building software is like composing Jazz. You must find the balance between order and chaos.</p>
      </div>

      <div>
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
          description="A marketing site for a book store in Tokyo I am currently working on."
          websiteUrl="https://odycell.space/"
        />
      </div>

      <div>
        <h2 className="text-medium font-medium text-accent">Links</h2>
        <div className="flex flex-wrap gap-x-4 py-2 text-accent/80">
          {links.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className={linkClassName}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
      <Footer />
      </div>
    </main>
  );
}
