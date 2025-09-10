"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import profileImage from "@/assets/do-nothing-club-dog.jpg";
import { useTranslations } from "next-intl";
import AIChatBox from "@/components/ui/ai-chat-box";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const t = useTranslations("intro");
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <section
      ref={ref}
      id="home"
      className="relative mb-28 max-w-200 scroll-mt-400 sm:mb-0"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <div
            onClick={() => setIsChatOpen(true)}
            className="cursor-pointer transition hover:scale-105"
          >
            <Image
              src={profileImage}
              alt="Scheff portrait"
              width="192"
              height="192"
              quality="95"
              priority={true}
              className="h-24 w-24 rounded-full border-[0.1rem] border-white/30 object-cover shadow-xl"
            />
          </div>

          <span className="absolute bottom-0 right-0 text-4xl">👋</span>
        </div>
      </div>

      <h1 className="mb-10 mt-4 text-pretty px-4 text-center text-xl font-medium leading-normal! text-gray-900 dark:text-white/80 sm:px-0 sm:text-4xl">
        <span className="font-semibold">{t("greeting")}</span>
        <span>{t("selfIntro")}</span>
      </h1>

      <div className="flex flex-col items-center justify-center gap-2 px-4 text-lg font-medium sm:flex-row">
        <div className="flex flex-row gap-2">
          <Link
            href="#contact"
            className="group flex items-center gap-2 rounded-full bg-gray-800 px-7 py-3 text-white outline-hidden transition hover:scale-105 hover:bg-gray-950 focus:scale-105 active:scale-105"
            onClick={() => {
              setActiveSection("Contact");
              setTimeOfLastClick(Date.now());
            }}
          >
            Contact Me
          </Link>

          <a
            className="borderBlack flex cursor-pointer items-center gap-2 rounded-full bg-white/30 p-4 text-[1.35rem] text-gray-700 transition hover:scale-[1.15] hover:text-gray-950 focus:scale-[1.15] active:scale-105 dark:bg-white/10 dark:text-white/60"
            href="https://github.com/ScheffChuk"
            target="_blank"
          >
            <FaGithubSquare />
          </a>
        </div>
      </div>
      <AIChatBox
        open={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </section>
  );
}
