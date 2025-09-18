'use client';
import { type JSX, useEffect, useState } from 'react';
import { motion, MotionProps } from 'motion/react';

export type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: React.ElementType;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
} & MotionProps;

const defaultChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const narrowChars = 'il1I|!,.;:';
const wideChars = 'mwMWQ@';
const normalChars = 'ABCDEFGHJKLNOPRSTUVXYZabcdefghjknopqrstuvxyz023456789';

const getRandomChar = (chars: string, originalChar: string) => {
  if (originalChar === ' ') return ' ';

  let charSet = chars;
  if (chars === defaultChars) {
    if (narrowChars.includes(originalChar)) {
      charSet = narrowChars;
    } else if (wideChars.includes(originalChar)) {
      charSet = wideChars;
    } else {
      charSet = normalChars;
    }
  }

  return charSet[Math.floor(Math.random() * charSet.length)];
};

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.03,
  characterSet = defaultChars,
  className,
  as: Component = 'p',
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements
  );
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const text = children;


  const scramble = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const steps = duration / speed;
    let step = 0;

    const interval = setInterval(() => {
      let scrambled = '';
      const progress = step / steps;

      for (let i = 0; i < text.length; i++) {
        if (progress * text.length > i) {
          scrambled += text[i];
        } else {
          scrambled += getRandomChar(characterSet, text[i]);
        }
      }

      setDisplayText(scrambled);
      step++;

      if (step > steps) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
        onScrambleComplete?.();
      }
    }, speed * 1000);
  };


  useEffect(() => {
    if (!trigger) return;

    scramble();
  }, [trigger]);

  return (
    <MotionComponent
      className={className}
      style={{
        fontVariantNumeric: 'tabular-nums',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
        whiteSpace: 'pre-wrap',
        wordBreak: 'keep-all',
        overflowWrap: 'normal'
      }}
      {...props}
    >
      {displayText}
    </MotionComponent>
  );
}
