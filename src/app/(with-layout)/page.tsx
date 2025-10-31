/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { PenTool } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CopyEmailButton } from "@/components/copy-email-button";
import ThemeChanger from "@/components/theme-switcher";

import { Project } from "@/components/page.client";
import TwitterXMotion from "@/components/twitter-x-loop";
import NewFooter from "@/components/new-footer";
import { ExperienceAccordion } from "@/components/experience-accordion";
import { StayTextLoop } from "@/components/stay-loop";
import ScrambleIn from "@/components/fancy/text/scramble-in";
import {
  getAnimationDuration,
  ROW_DELAY,
  SCRAMBLE_SPEED,
  SCRAMBLED_LETTER_COUNT,
} from "@/lib/utils";

export const dynamic = "force-static";

const DottedSpacer = ({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) => {
  return (
    <div className={cn("my-0.5 flex flex-col gap-y-0.5", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: this is a static list
          key={index}
          className="border-accent h-px border-b border-dotted"
          aria-hidden
        />
      ))}
    </div>
  );
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="h-full text-2xl font-semibold">
      {children}
    </h2>
  );
};

const Section = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="gap-y-2 text-accent flex w-full flex-col">
      {title ? <SectionTitle>{title}</SectionTitle> : null}
      <SectionContent>{children}</SectionContent>
      <div></div>
    </section>
  );
};

const SocialLink = ({
  href,
  social,
  children,
}: {
  href: string;
  social: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="grid grid-cols-[75px_auto_auto] items-center gap-x-1 py-2">
      <p className="font-medium">{social}</p>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-sm underline-offset-2 transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring select-none hover:underline"
      >
        {children}
      </Link>
    </div>
  );
};

const SectionContent = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default function Home() {
  return (
    <>
      <div className="selection:bg-accent/10 flex flex-col justify-between gap-y-6 md:pt-10">
        <nav className="top-4 right-0 flex gap-1 max-md:py-4 md:absolute">
          {/* <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-accent/80 bg-accent text-primary-foreground flex cursor-pointer items-center gap-x-1.5 rounded-xs py-0.5 pr-1.5 pl-1.5 transition"
          >
            Collections
          </Link>
          <Link
            href="/"
            className="hover:bg-accent/80 bg-accent text-primary-foreground flex cursor-pointer items-center gap-x-1.5 rounded-xs py-0.5 pr-1.5 pl-1.5 transition"
          >
            Guestbook
          </Link> */}
          {/* <CopyEmailButtonAlt /> */}
          <ThemeChanger />
        </nav>

        <Section title=" ">
          <div className="flex flex-col gap-y-2 md:pt-10">
            <h1 className="text-4xl font-bold">
              <ScrambleIn
                text="Scheff Chuk"
                delay={0}
                scrambleSpeed={SCRAMBLE_SPEED}
                scrambledLetterCount={SCRAMBLED_LETTER_COUNT}
              />
            </h1>
            <p className="text-lg">
              <ScrambleIn
                text="is learning to be a good full-stack developer. Always trying out new things."
                delay={getAnimationDuration("Scheff Chuk")}
                scrambleSpeed={SCRAMBLE_SPEED}
                scrambledLetterCount={SCRAMBLED_LETTER_COUNT}
              />
            </p>
            <div className="pt-10">
              <StayTextLoop />
            </div>
            {/* <p className="text-lg">
              <ScrambleIn
                text="I am from Guangzhou in southern China, married. I don't smoke. I drink moderately."
                delay={getAnimationDuration("Scheff Chuk") + ROW_DELAY * 2}
                scrambleSpeed={SCRAMBLE_SPEED}
                scrambledLetterCount={SCRAMBLED_LETTER_COUNT}
              />
            </p> */}

            {/* <MusicPlayer /> */}
            {/* <div className="flex">
              <Link
                href="/visitors"
                className="rounded-4 hover:bg-accent/90 bg-accent text-light-green flex items-center gap-x-1.5 px-2 py-1 font-medium transition"
                style={{
                  boxShadow:
                    "0 4px 4px #08080814, 0 1px 2px #08080833, inset 0 6px 12px #ffffff1f, inset 0 1px 1px #fff3",
                }}
              >
                Sign guestbook
                <Signature
                  size={12}
                  aria-hidden={true}
                  className="text-light-green shrink-0"
                />
              </Link>
            </div> */}
          </div>
        </Section>
        <Section title="Past">
          <ExperienceAccordion />
        </Section>
        <Section title="Projects">
          <Project
            title="My site"
            description="My portfolio website. It serves as a playground for me to try out various techs, currently going through redesign."
            delay={getAnimationDuration("Scheff Chuk") + ROW_DELAY * 7}
            hrefs={{
              code: "https://github.com/scheffchuk/scheff-portfolio-nextjs",
            }}
          />

          <Project
            title="HeadSalon"
            description="I built this blog web app for my favorite writer, WhigZhou, with a focus on a clean design, exceptional speed, and a smooth user experience."
            delay={getAnimationDuration("Scheff Chuk") + ROW_DELAY * 11}
            hrefs={{
              live: "https://headsalon.vercel.app/",
              code: "https://github.com/scheffchuk/headsalon",
            }}
          />
        </Section>
        <Section title="Where you can find me">
          <DottedSpacer lines={3} />
          <div className="space-y-2">
            <div className="grid grid-cols-[75px_auto_1fr] items-center gap-x-1.5 py-2">
              <p className="font-medium">Mail</p>
              <Link
                href="mailto:darthusian@gmail.com"
                className="rounded-sm underline-offset-2 transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring select-none hover:underline"
              >
                darthusian@gmail.com
              </Link>
              <div className="ml-auto flex gap-x-1">
                <Button
                  asChild
                  variant="accent"
                  size="compact"
                  className="hidden w-fit gap-x-1.5 pr-1.5 pl-1 text-sm md:flex"
                >
                  <Link href="mailto:darthusian@gmail.com">
                    <PenTool size={12} aria-hidden={true} />
                    Compose
                  </Link>
                </Button>
                <CopyEmailButton />
              </div>
            </div>
            <TwitterXMotion className="grid grid-cols-[75px_auto_1fr] items-center gap-x-1.5 overflow-hidden py-2" />
            <SocialLink
              social="Ins"
              href="https://www.instagram.com/scheff.d.chuk"
            >
              @scheff.d.chuk
            </SocialLink>
            <SocialLink social="GitHub" href="https://github.com/scheffchuk">
              scheffchuk
            </SocialLink>
          </div>
          <DottedSpacer lines={3} />
        </Section>

        {/* <Footer /> */}
        <NewFooter />
      </div>
    </>
  );
}
