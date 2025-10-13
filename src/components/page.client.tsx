"use client";

import { Globe, Terminal } from "lucide-react";
import { track } from "@vercel/analytics";
import Link from "next/link";
import ScrambleIn from "@/components/fancy/text/scramble-in";
import {
  getAnimationDuration,
  SCRAMBLE_SPEED,
  SCRAMBLED_LETTER_COUNT,
} from "@/lib/utils";

interface ProjectProps {
  title: string;
  description: string;
  delay?: number;
  hrefs: {
    live?: string;
    code?: string;
  };
}

const Project = ({
  title,
  description,
  delay = 0,
  hrefs: { live, code },
}: ProjectProps) => {
  return (
    <div className="px-2 pt-4 pb-5 flex flex-col gap-y-2 hover:bg-accent/10">
      <h3 className="font-semibold">
        <ScrambleIn
          text={title}
          delay={delay}
          scrambleSpeed={SCRAMBLE_SPEED}
          scrambledLetterCount={SCRAMBLED_LETTER_COUNT}
        />
      </h3>
      <p>
        <ScrambleIn
          text={description}
          delay={delay + getAnimationDuration(title)}
          scrambleSpeed={SCRAMBLE_SPEED}
          scrambledLetterCount={SCRAMBLED_LETTER_COUNT}
        />
      </p>
      <div className="flex items-center mt-2 gap-x-2">
        {live ? (
          <Link
            className="flex gap-x-1.5 items-center bg-accent hover:bg-accent/80 transition text-primary-foreground py-0.5 pl-1 pr-1.5 rounded-xs cursor-pointer text-sm"
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("project_live_link_clicked", { title })}
          >
            <Globe
              aria-hidden={true}
              size={12}
              className="shrink-0 text-primary-foreground"
            />
            Live{" "}
          </Link>
        ) : null}
        {code ? (
          <Link
            className="flex gap-x-1.5 items-center bg-accent hover:bg-accent/80 transition text-primary-foreground py-0.5 pl-1 pr-1.5 rounded-xs cursor-pointer text-sm"
            href={code}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("project_code_link_clicked", { title })}
          >
            <Terminal
              aria-hidden={true}
              size={12}
              className="shrink-0 text-primary-foreground"
            />
            Code{" "}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export { Project };
