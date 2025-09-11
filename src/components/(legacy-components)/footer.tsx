import React from "react";
import { BsGithub } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="mb-10 flex flex-row items-center justify-center gap-2 px-4 text-center text-gray-700 dark:text-gray-200">
      <small className="block text-base">
        © {new Date().getFullYear()} Scheff.
      </small>
      <a
        href="https://github.com/scheffchuk"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsGithub size={20} />
      </a>
    </footer>
  );
}
