"use client";

import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  websiteUrl: string;
}

const ProjectCard = ({ title, description, websiteUrl }: ProjectCardProps) => {
  return (
    <Link
      href={websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:bg-accent/10 -mx-2 flex flex-col rounded-sm p-2"
    >
      <h3 className="text-accent">{title}</h3>
      <p className="text-accent/80">{description}</p>
    </Link>
  );
};

export { ProjectCard };
