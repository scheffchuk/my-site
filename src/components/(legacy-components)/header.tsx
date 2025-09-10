"use client";

import { motion } from "motion/react";
import { links } from "@/lib/data";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Dock, DockItem, DockIcon, DockLabel } from "@/components/ui/dock";
import { Home, User, FolderOpen, Code, Briefcase, Mail } from "lucide-react";
import { BsMoon, BsSun } from "react-icons/bs";

const iconMap = {
  Home: Home,
  About: User,
  Projects: FolderOpen,
  Skills: Code,
  Experience: Briefcase,
  Contact: Mail,
};

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme || theme;

  const toggleTheme = () => {
    setTheme(currentTheme === "light" ? "dark" : "light");
  };

  return (
    <div className="fixed bottom-5 left-1/2 z-999 max-w-full -translate-x-1/2 drop-shadow-md">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Dock className="items-end pb-3 rounded-full" magnification={70} distance={100}>
          {links.map((link) => {
            const IconComponent = iconMap[link.name as keyof typeof iconMap];
            return (
              <DockItem
                key={link.hash}
                className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800"
                onClick={() => {
                  setActiveSection(link.name);
                  setTimeOfLastClick(Date.now());
                  // Navigate to the section
                  window.location.hash = link.hash;
                }}
              >
                <DockLabel>{link.name}</DockLabel>
                <DockIcon>
                  <div
                    className={clsx(
                      "flex h-full w-full items-center justify-center transition-colors",
                      {
                        "text-[#3399ff]": activeSection === link.name,
                        "text-gray-700 hover:text-[#3399ff] dark:text-gray-400 dark:hover:text-[#3399ff]":
                          activeSection !== link.name,
                      },
                    )}
                  >
                    <IconComponent size={20} />
                  </div>
                </DockIcon>
              </DockItem>
            );
          })}

          {/* Theme Switch */}
          <DockItem
            key="theme-switch"
            className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800"
            onClick={toggleTheme}
          >
            <DockLabel>
              {!mounted
                ? "Theme"
                : currentTheme === "light"
                  ? "Dark Mode"
                  : "Light Mode"}
            </DockLabel>
            <DockIcon>
              <div className="flex h-full w-full items-center justify-center text-gray-700 transition-colors hover:text-[#3399ff] dark:text-gray-400 dark:hover:text-[#3399ff]">
                {!mounted ? (
                  <div className="animate-pulse">
                    <BsSun size={20} className="text-gray-400" />
                  </div>
                ) : currentTheme === "light" ? (
                  <BsMoon
                    size={20}
                    className="text-gray-700 hover:text-[#3399ff]"
                  />
                ) : (
                  <BsSun
                    size={20}
                    className="text-yellow-400 hover:text-yellow-300"
                  />
                )}
              </div>
            </DockIcon>
          </DockItem>
        </Dock>
      </motion.div>
    </div>
  );
}
