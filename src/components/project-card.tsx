"use client";

import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  websiteUrl: string;
}

const ProjectCard = ({
  title,
  description,
  websiteUrl,
}: ProjectCardProps) => {
  return (
    <Link href={websiteUrl} target="_blank" rel="noopener noreferrer" className="-mx-2 p-2 flex flex-col hover:bg-accent/10 rounded-sm">
      
      <h3 className="font-base text-accent">
        {title}
      </h3>
      <p className="text-accent/80">
        {description}
      </p>
    </Link>
  );
};

export { ProjectCard };