"use client";

import React from "react";
import SectionHeading from "../ui/section-heading";
import { motion } from "motion/react";
import { useSectionInView } from "@/lib/hooks";
import { useTranslations } from "next-intl";

export default function About() {
  const { ref } = useSectionInView("About");
  const t = useTranslations("about");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-180 scroll-mt-16 text-center leading-8 sm:mb-40"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>{t("title")}</SectionHeading>
      <p className="mx-auto mb-6 text-pretty px-4 text-start md:px-6 md:text-lg/9">
        {t("content1")}
      </p>
      <p className="mx-auto text-pretty px-4 text-start md:px-6 md:text-lg/9">
        {t("content2")}
      </p>
    </motion.section>
  );
}
