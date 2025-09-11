import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";

export default function SubmitBtn() {
  const { pending } = useFormStatus();
  const t = useTranslations("contact");

  return (
    <button
      type="submit"
      className="group flex h-12 w-32 items-center justify-center gap-2 rounded-full bg-gray-900 text-white outline-hidden transition-all hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105 disabled:scale-100 disabled:bg-opacity-65 dark:bg-white dark:bg-opacity-20"
      disabled={pending}
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        <>
          {t("submit")}{" "}
          <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:-translate-y-1 group-hover:translate-x-1" />{" "}
        </>
      )}
    </button>
  );
}
