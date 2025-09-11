"use client";

import React from "react";
import SectionHeading from "../ui/section-heading";
import { motion } from "motion/react";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "../ui/submit-btn";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const t = useTranslations("contact");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 w-[min(100%,38rem)] scroll-mt-16 text-center sm:mb-28"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>{t("title")}</SectionHeading>

      <p className="-mt-2 text-gray-700 dark:text-white/80">
        {t.rich("message", {
          Email: (chunks) => (
            <a className="underline" href="mailto:darthusian@gmail.com">
              {chunks}
            </a>
          ),
        })}
      </p>

      <form
        className="mt-10 flex flex-col dark:text-black"
        action={async (formData) => {
          const { error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success("Email sent successfully!");
        }}
      >
        <input
          className="borderBlack h-14 rounded-lg bg-white/50 px-4 transition-all dark:bg-white dark:bg-opacity-30 dark:outline-hidden dark:focus:bg-opacity-50"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <textarea
          className="borderBlack my-3 h-52 rounded-lg bg-white/50 p-4 transition-all dark:bg-white dark:bg-opacity-30 dark:outline-hidden dark:focus:bg-opacity-50"
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
        />
        <SubmitBtn />
      </form>
    </motion.section>
  );
}
