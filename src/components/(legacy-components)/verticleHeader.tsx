import Link from "next/link";
import React from "react";
import { links } from "@/lib/data";

export default function VerticalHeader() {
  return (
    <nav className="flex flex-col items-start gap-y-2 md:block md:w-1/4">
      <Link href="/">
        <h1 className="text-2xl font-bold">Sceff Chuk</h1>
      </Link>
      <h2 className="text-center italic" id="v-header-keyword"></h2>
      <div className="py-1"></div>
      <ul className="flex flex-col items-start gap-y-2">
        {links.map((link) => (
          <li key={link.hash} className="w-full">
            <Link
              href={link.hash}
              className="block w-full py-2 text-gray-700 dark:text-gray-300"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="py-2"></div>
    </nav>
  );
}
