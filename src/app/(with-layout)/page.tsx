/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import ThemeChanger from "@/components/theme-switcher";

import { ProjectCard } from "@/components/project-card";
import NewFooter from "@/components/new-footer";
import { ExperienceAccordion } from "@/components/experience-accordion";
import { StayTextLoop } from "@/components/stay-loop";


export default function Home() {
  return (
      <main className=" flex flex-col justify-between gap-y-12">
        <header className="flex items-center justify-end py-4">
          <ThemeChanger />
        </header>

        <section className="text-accent flex w-full flex-col gap-y-2">
          <h2 className="text-medium h-full font-medium"> </h2>
          <div>
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl">Scheff Chuk</h1>
              <p className="text-base text-accent/80">
                is learning to be a good full-stack developer. Always trying out
                new things. Currently looking for a job in Tokyo.
              </p>
              <div className="pt-10">
                <StayTextLoop />
              </div>
              
            </div>
          </div>
          <div></div>
        </section>
        <section className="text-accent flex w-full flex-col gap-y-2">
          <h2 className="text-medium h-full font-medium">Experience</h2>
          <div>
            <ExperienceAccordion />
          </div>
          <div></div>
        </section>
        <section className="text-accent flex w-full flex-col gap-y-2">
          <h2 className="text-medium h-full font-medium">Projects</h2>
            <ProjectCard
              title="My site"
              description="My portfolio and playground for practicing new tricks."
              websiteUrl="https://scheff.dev"
            />

            <ProjectCard
              title="HeadSalon"
              description="A blog web app for my favorite writer, WhigZhou."
              websiteUrl="https://headsalon.vercel.app/"
            />
        </section>
        <section className="text-accent flex w-full flex-col gap-y-2">
          <h2 className="text-medium h-full font-medium">Links</h2>
          <div>
            <div className="flex flex-wrap gap-x-4 py-2">
              <Link
                href="mailto:hi@scheff.dev"
                className="focus-visible:ring-ring rounded-sm transition-all duration-150 ease-out hover:opacity-70 focus-visible:ring-2 focus-visible:outline-none"
                aria-label="Email"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mail
              </Link>
              <Link
                href="https://x.com/scheffchuk"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-visible:ring-ring rounded-sm transition-all duration-150 ease-out hover:opacity-70 focus-visible:ring-2 focus-visible:outline-none"
                aria-label="Twitter/X"
              >
                Twitter/X
              </Link>
              <Link
                href="https://www.instagram.com/scheff.d.chuk"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-visible:ring-ring rounded-sm transition-all duration-150 ease-out hover:opacity-70 focus-visible:ring-2 focus-visible:outline-none"
                aria-label="Instagram"
              >
                Instagram
              </Link>
              <Link
                href="https://github.com/scheffchuk"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-visible:ring-ring rounded-sm transition-all duration-150 ease-out hover:opacity-70 focus-visible:ring-2 focus-visible:outline-none"
                aria-label="GitHub"
              >
                GitHub
              </Link>
            </div>
          </div>
          <div></div>
        </section>
        <NewFooter />
      </main>
  );
}
