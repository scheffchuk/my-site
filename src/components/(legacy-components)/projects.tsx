"use client";

import React from "react";
import SectionHeading from "../ui/section-heading";
import { projectsData, projectsDataJap } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useLocale, useTranslations } from "next-intl";
import ProjectCard from "./project";
import { Project } from "@/lib/types";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.3);
  const t = useTranslations("projects");

  const locale = useLocale();

  const currentProjectsData: readonly Project[] =
    locale === "ja" ? projectsDataJap : projectsData;

  return (
    <section ref={ref} id="projects" className="mb-28 scroll-mt-16">
      <SectionHeading>{t("title")}</SectionHeading>
      <div>
        {currentProjectsData.map((project, index) => (
          <React.Fragment key={index}>
            <ProjectCard {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
