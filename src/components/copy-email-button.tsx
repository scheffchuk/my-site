"use client";

import { Copy } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";

// import useSound from "use-sound";

const motionVariants: Variants = {
  initial: { y: 5, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -5, opacity: 0 },
};

export const CopyEmailButton = () => {
  // const [play] = useSound("/sounds/copy.mp3");
  const [copied, setCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleCopy = async (text: string) => {
    if (isDisabled) return;
    setIsDisabled(true);
    // play();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsDisabled(false);
      }, 2000);
    } catch {
      setIsDisabled(false);
    }
  };
  return (
    <button
      type="button"
      onClick={() => handleCopy("darthusian@gmail.com")}
      disabled={isDisabled}
      className="bg-accent hover:bg-accent/80 text-primary-foreground py-0.5 pl-1 pr-1.5 rounded-xs cursor-pointer text-sm w-[70px] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_hsl(var(--ring))] active:scale-[0.96] transition-all duration-200 select-none"
      aria-label={copied ? "Email copied to clipboard" : "Copy email to clipboard"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className="flex gap-x-0.5 items-center justify-center"
          variants={motionVariants}
          key={copied ? "Copied!" : "Copy"}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.05 }}
        >
          {copied ? (
            "Copied!"
          ) : (
            <>
              <Copy className="shrink-0" size={12} aria-hidden={true} />
              Copy
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export const CopyEmailButtonAlt = () => {
  // const [play] = useSound("/sounds/copy.mp3");
  const [copied, setCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleCopy = async (text: string) => {
    if (isDisabled) return;
    setIsDisabled(true);
    // play();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsDisabled(false);
      }, 2000);
    } catch {
      setIsDisabled(false);
    }
  };

  return (
    <button
      type="button"
      className="flex gap-x-1.5 items-center bg-accent hover:bg-accent/80 text-primary-foreground py-0.5 pl-1.5 pr-1.5 rounded-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_hsl(var(--ring))] active:scale-[0.96] transition-all duration-200 select-none"
      onClick={() => handleCopy("darthusian@gmail.com")}
      disabled={isDisabled}
      aria-label={copied ? "Email copied to clipboard" : "Copy email to clipboard"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          variants={motionVariants}
          key={copied ? "Copied!" : "Copy"}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.05 }}
        >
          {copied ? "Copied!" : "Email"}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};
