"use client";

import { Globe, Terminal } from "lucide-react";
import { track } from "@vercel/analytics";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  delay?: number;
  hrefs: {
    live?: string;
    code?: string;
  };
}

const ProjectCard = ({
  title,
  description,
  hrefs: { live, code },
}: ProjectCardProps) => {
  return (
    <div className="-mx-2 px-2 pt-4 pb-5 flex flex-col gap-y-2 hover:bg-accent/10">
      <h3 className="font-base">
        {title}
      </h3>
      <p>
        {description}
      </p>
      <div className="flex items-center mt-2 gap-x-2">
        {live ? (
          <Link
            className="flex items-center bg-accent hover:bg-accent/80 transition-colors duration-150 ease-out text-primary-foreground py-0.5 pl-1 pr-1.5 rounded-xs text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
            className="flex gap-x-1.5 items-center bg-accent hover:bg-accent/80 transition-colors duration-150 ease-out text-primary-foreground py-0.5 pl-1 pr-1.5 rounded-xs text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

export { ProjectCard };