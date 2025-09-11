"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Project } from "@/lib/types";

type ProjectProps = Project;

export default function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  websiteUrl,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="group mb-3 last:mb-0 sm:mb-8"
    >
      <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
        <section className="relative max-w-2xl overflow-hidden rounded-lg border border-black/5 bg-white/50 transition hover:bg-white/70 dark:bg-gray-800/50 dark:text-white dark:hover:bg-gray-800/70 sm:h-80 sm:pr-8 sm:group-even:pl-8 shadow-xs">
          <div className="flex h-full flex-col px-5 pb-7 pt-4 sm:max-w-[50%] sm:pl-10 sm:pr-2 sm:pt-10 sm:group-even:ml-72">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="my-2 text-pretty text-gray-700 dark:text-white/80">
              {description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1 sm:mt-auto">
              {tags.map((tag, index) => (
                <li
                  className="rounded-full bg-black/70 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white dark:text-white/80"
                  key={index}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <Image
            src={imageUrl}
            alt="Project I worked on"
            quality={95}
            className="absolute -right-40 top-8 hidden w-113 rounded-t-lg shadow-2xl transition group-even:-left-40 group-even:right-[initial] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-hover:scale-[1.04] group-hover:group-even:translate-x-3 group-hover:group-even:translate-y-3 group-hover:group-even:rotate-2 sm:block"
          />
        </section>
      </a>
    </motion.div>
  );
}
