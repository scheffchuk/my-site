/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { PenTool } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CopyEmailButton,
  CopyEmailButtonAlt,
} from "@/components/copy-email-button";
import ThemeChanger from "@/components/theme-switcher";

import { Project } from "@/components/page.client";
import TwitterXMotion from "@/components/twitter-x-loop";
import NewFooter from "@/components/new-footer";
import { ExperienceAccordion } from "@/components/experience-accordion";

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
    <h2 className="h-full pt-4 pl-4 text-lg font-medium md:ml-auto md:py-4 md:pr-4">
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
    <section className="divide-accent border-accent text-accent w-full grid-cols-[210px_650px_auto] border-b md:grid md:divide-x">
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
    <div className="grid grid-cols-[75px_auto_auto] items-center gap-x-1 px-4 py-2">
      <p className="font-medium">{social}</p>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline-offset-2 hover:underline"
      >
        {children}
      </Link>
    </div>
  );
};

const SectionContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="md:border-r">{children}</div>;
};

export default function Home() {
  return (
    <>
      {/* <Shader /> */}
      <div className="animate-in fade-in selection:bg-accent/10 flex-col justify-between duration-500 md:flex">
        <nav className="top-5 right-5 flex gap-1 max-md:p-4 md:absolute">
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
          <CopyEmailButtonAlt />
          <ThemeChanger />
        </nav>

        <Section title=" ">
          <div className="col-start-2 px-4 pb-6 text-pretty md:pt-16">
            <h1 className="flex items-center text-3xl font-extrabold">
              Scheff Chuk
            </h1>
            <span>
              Learning full-stack development by building sites and apps. Work
              mainly with React and Next.js.
            </span>
            <span className="mt-8 block text-lg font-medium tracking-tight">
              About Me
            </span>
            <p className="mt-4 text-sm">
              {/* I'm a creative{" "}
              <LinkPrimitive
                href="https://www.youtube.com/watch?v=jG7dSXcfVqE"
                external
              >
                doing what I can't
              </LinkPrimitive> */}
              I am from Guangzhou in southern China, married. I don't smoke. I
              drink moderately.
            </p>
            <p className="mt-2 pb-6 text-sm">
              My bedtime varies, but I sleep seven hours nightly. Before sleep,
              I drink cold milk and read for twenty minutes. I sleep soundly
              until morning. I wake refreshed, like a child. My health
              examinations show nothing wrong.
            </p>
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
          <DottedSpacer className="mt-4 mb-0 md:mt-0.5" />
          <ExperienceAccordion />
          <DottedSpacer lines={3} />
        </Section>
        <Section title="Projects">
          <Project
            title="My site"
            description="My portfolio website. It serves as a playground for me to try out various techs, including multilingual support, dark mode, animations, and an AI chatbot."
            hrefs={{
              code: "https://github.com/scheffchuk/scheff-portfolio-nextjs",
            }}
          />
          <DottedSpacer className="my-0" />
          <Project
            title="Japan Demographic Chart App"
            description="This app was developed as a coding test submission, and regardless of the interview outcome, I learned a great deal and received valuable feedback."
            hrefs={{
              live: "https://population-trends-japan-nextjs.vercel.app",
              code: "https://github.com/scheffchuk/japan-population-trends-nextjs",
            }}
          />
          <DottedSpacer className="my-0" />
          <Project
            title="HeadSalon"
            description="I built this blog web app for my favorite writer, WhigZhou, with a focus on a clean, beautiful design, exceptional speed, and a smooth user experience. It also includes a variety of  “nice-to-have” features."
            hrefs={{
              live: "https://headsalon.vercel.app/",
              code: "https://github.com/scheffchuk/headsalon",
            }}
          />
        </Section>
        <Section title="Contact">
          <p className="p-4">Where you can find me</p>
          <DottedSpacer lines={2} />
          <div className="grid gap-x-4 divide-y divide-dotted border-y border-dotted">
            <div className="grid grid-cols-[75px_auto_1fr] items-center gap-x-1.5 px-4 py-2">
              <p className="font-medium">Mail</p>
              <Link href="mailto:darthusian@gmail.com">
                darthusian@gmail.com
              </Link>
              <div className="ml-auto flex gap-x-1">
                <Link
                  href="mailto:darthusian@gmail.com"
                  className="hover:bg-accent/80 bg-accent text-primary-foreground hidden w-fit cursor-pointer items-center gap-x-1.5 rounded-xs py-0.5 pr-1.5 pl-1 text-sm transition md:flex"
                >
                  <PenTool size={12} aria-hidden={true} />
                  Compose
                </Link>
                <CopyEmailButton />
              </div>
            </div>
            <TwitterXMotion className="grid grid-cols-[75px_auto_1fr] items-center gap-x-1.5 overflow-hidden px-4 py-2" />
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
          <DottedSpacer lines={2} />
        </Section>

        {/* <Footer /> */}
        <NewFooter />
      </div>
    </>
  );
}
