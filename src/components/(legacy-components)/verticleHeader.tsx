import Link from "next/link";
import React from "react";
import { links } from "@/lib/data";
import ScrambleIn from "../fancy/text/scramble-in";
import { SCRAMBLE_SPEED, SCRAMBLED_LETTER_COUNT } from "@/lib/utils";
import { StayTextLoop } from "../stay-loop";

export default function VerticalHeader() {
  return (
    <nav className="border-accent text-accent selection:bg-accent/10 sticky top-0 flex h-full flex-col border-r p-10 gap-y-2">
      <ScrambleIn
        text="Scheff Chuk"
        delay={0}
        scrambleSpeed={SCRAMBLE_SPEED}
        scrambledLetterCount={SCRAMBLED_LETTER_COUNT}
        className="text-xl font-bold"
      />
      <StayTextLoop />
      <h2 className="sr-only" id="v-header-keyword"></h2>
      <ul className="mt-10 grid">
        {links.map((link) => (
          <li key={link.hash} className="w-full">
            <Link
              href={link.hash}
              className="block w-full rounded-xs px-1.5 py-2 text-sm underline-offset-2 transition duration-100 select-none hover:underline focus-visible:shadow-[0_0_0_2px_hsl(var(--ring))] focus-visible:outline-none"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
