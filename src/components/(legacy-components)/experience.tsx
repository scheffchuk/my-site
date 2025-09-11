"use client";

import React from "react";
import SectionHeading from "../ui/section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesDataEng, experiencesDataJap } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "next-themes";
import { useTranslations, useLocale } from "next-intl";
import { ExperienceItem } from "@/lib/types";

export default function Experience() {
  const { ref } = useSectionInView("Experience", 0.3);
  const { theme, resolvedTheme } = useTheme();
  const t = useTranslations("experience");
  const locale = useLocale();
  const [mounted, setMounted] = React.useState(false);

  const currentTheme = resolvedTheme || theme;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentExperiences: readonly ExperienceItem[] =
    locale === "ja" ? experiencesDataJap : experiencesDataEng;

  if (!mounted) {
    return (
      <section
        id="experience"
        ref={ref}
        className="mb-28 scroll-mt-16 text-pretty sm:mb-40"
      >
        <SectionHeading>{t("title")}</SectionHeading>
      </section>
    );
  }

  return (
    <section
      id="experience"
      ref={ref}
      className="mb-28 scroll-mt-16 text-pretty sm:mb-40"
    >
      <SectionHeading>{t("title")}</SectionHeading>
      <VerticalTimeline lineColor="">
        {currentExperiences.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              contentStyle={{
                background:
                  currentTheme === "light"
                    ? "rgba(240, 240, 240, 0.5)"
                    : "rgb(30, 41, 57, 0.5)",
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                textAlign: "left",
                padding: "1.3rem 2rem",
                borderRadius: "0.3rem",
              }}
              contentArrowStyle={{
                borderRight:
                  currentTheme === "light"
                    ? "0.4rem solid #9ca3af"
                    : "0.4rem solid rgb(30, 41, 57, 0.5)",
              }}
              date={item.date}
              icon={item.icon}
              iconStyle={{
                background:
                  currentTheme === "light"
                    ? "rgba(240, 240, 240, 0.05)"
                    : "rgba(255, 255, 255, 0.15)",
                fontSize: "0.15rem",
              }}
            >
              <h3 className="font-semibold capitalize">{item.title}</h3>
              <p className="mt-2! font-normal">{item.location}</p>
              <p className="mt-2! text-pretty font-normal! text-gray-700 dark:text-white/85">
                {item.description}
              </p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
