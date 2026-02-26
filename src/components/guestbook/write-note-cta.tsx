"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form-nextjs";
import { api } from "../../../convex/_generated/api";
import useClickOutside from "@/hooks/useClickOutside";
import useMeasure from "react-use-measure";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import Signature, { type SignatureRef } from "@uiw/react-signature";
import { cn } from "@/lib/utils";
import { Field } from "./field";
import type { OptimisticEntry } from "./guestbook-entries";
import { useAction } from "convex/react";

function Spinner() {
  return (
    <svg
      className="size-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

const transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.25,
} as const;

type WriteNoteCTAProps = {
  onEntryCreated: (entry: OptimisticEntry) => void;
};

export function WriteNoteCTA({ onEntryCreated }: WriteNoteCTAProps) {
  const [step, setStep] = useState(0);
  const [contentRef, { height: heightContent }] = useMeasure();
  const [menuRef, { width: widthContainer }] = useMeasure();
  const [serverValidationErrors, setServerValidationErrors] = useState<{
    name?: string;
    message?: string;
  }>({});
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<SignatureRef>(null);

  const moderateAndCreate = useAction(api.guestbookActions.moderateAndCreate);
  const form = useForm({
    defaultValues: {
      name: "",
      message: "",
    },
  });

  const buttonText = ["Write me a note", "Next", "Submit", "Thanks!"][step];

  useEffect(() => {
    if (step !== 3) return;
    const timer = setTimeout(() => setStep(0), 2000);
    return () => clearTimeout(timer);
  }, [step]);

  const captureSignature = (): string | null => {
    const svgEl = signatureRef.current?.svg?.cloneNode(true) as SVGSVGElement | undefined;
    if (!svgEl) return null;
    const w = signatureRef.current?.svg?.clientWidth ?? 200;
    const h = signatureRef.current?.svg?.clientHeight ?? 80;
    svgEl.removeAttribute("style");
    svgEl.setAttribute("width", `${w}px`);
    svgEl.setAttribute("height", `${h}px`);
    svgEl.setAttribute("viewBox", `0 0 ${w} ${h}`);
    return svgEl.outerHTML;
  };

  const getRandomPosition = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const handleClick = async () => {
    const clearServerErrors = () => setServerValidationErrors({});
    const setServerErrors = (errors?: Record<string, string[]>) => {
      setServerValidationErrors({
        name: errors?.name?.[0],
        message: errors?.message?.[0],
      });
    };
    const syncFieldErrors = async () => {
      await Promise.all([form.validateField("name", "submit"), form.validateField("message", "submit")]);
    };

    if (step === 3) {
      setStep(0);
      return;
    }

    if (!isOpen && step === 0) {
      setIsOpen(true);
      setStep(1);
      return;
    }

    if (!isOpen) {
      setIsOpen(true);
      return;
    }

    if (step === 1) {
      setLoading(true);
      const { name, message } = form.state.values;
      const result = await moderateAndCreate({
        name,
        message,
        validateOnly: true,
      });
      setLoading(false);
      if (!result.success) {
        setServerErrors(result.errors);
        await syncFieldErrors();
        return;
      }
      clearServerErrors();
      await syncFieldErrors();
    }

    if (step === 2) {
      setLoading(true);
      const sig = captureSignature();
      if (!sig) {
        setLoading(false);
        return;
      }

      const localEntryId = crypto.randomUUID();
      const { name, message } = form.state.values;
      const result = await moderateAndCreate({
        name,
        message,
        signature: sig,
        localEntryId,
      });

      if (!result.success) {
        setServerErrors(result.errors);
        await syncFieldErrors();
        setLoading(false);
        return;
      }

      const initialX = getRandomPosition(100, typeof window !== "undefined" ? window.innerWidth - 150 : 800);
      const initialY = getRandomPosition(100, typeof window !== "undefined" ? window.innerHeight - 150 : 600);

      onEntryCreated({
        id: crypto.randomUUID(),
        localEntryId,
        name,
        message,
        signature: sig,
        initialX,
        initialY,
      });

      setStep(3);
      setIsOpen(false);
      setLoading(false);
      clearServerErrors();
      form.reset();
      signatureRef.current?.clear?.();
      return;
    }

    setStep((prev) => prev + 1);
  };

  useClickOutside(ref, () => setIsOpen(false));

  const stepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-3">
            <form.Field
              name="name"
              validators={{
                onSubmit: () => serverValidationErrors.name,
              }}
            >
              {(field) => (
                <Field
                  label="Name"
                  name="created_by"
                  value={field.state.value}
                  onChange={(e) => {
                    if (serverValidationErrors.name) {
                      setServerValidationErrors((prev) => ({ ...prev, name: undefined }));
                    }
                    field.handleChange(e.target.value);
                  }}
                  placeholder="ur name..."
                  autoComplete="name"
                  error={typeof field.state.meta.errors[0] === "string" ? field.state.meta.errors[0] : undefined}
                />
              )}
            </form.Field>
            <form.Field
              name="message"
              validators={{
                onSubmit: () => serverValidationErrors.message,
              }}
            >
              {(field) => (
                <Field
                  label="Message"
                  name="entry"
                  value={field.state.value}
                  onChange={(e) => {
                    if (serverValidationErrors.message) {
                      setServerValidationErrors((prev) => ({ ...prev, message: undefined }));
                    }
                    field.handleChange(e.target.value);
                  }}
                  placeholder="leave a note..."
                  multiline
                  error={typeof field.state.meta.errors[0] === "string" ? field.state.meta.errors[0] : undefined}
                />
              )}
            </form.Field>
          </div>
        );
      case 2:
        return (
          <div className="space-y-2">
            <div className="border border-input bg-background">
              <Signature ref={signatureRef} />
            </div>
            <button
              type="button"
              onClick={() => signatureRef.current?.clear?.()}
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              clear
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MotionConfig transition={transition}>
      <div ref={ref} className="fixed bottom-8 right-8 z-50">
        <form>
          <div
            ref={menuRef}
            className="w-72 overflow-hidden rounded-lg border border-border bg-background/95 shadow-lg backdrop-blur-sm"
          >
            <AnimatePresence initial={false} mode="sync">
              {isOpen ? (
                <motion.div
                  key="content"
                  initial={{ height: 0 }}
                  animate={{ height: heightContent || 0 }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div ref={contentRef} className="p-4">
                    {step === 1 && (
                      <form.Subscribe
                        selector={(state) => [
                          state.fieldMeta.name?.errors?.[0],
                          state.fieldMeta.message?.errors?.[0],
                        ]}
                      >
                        {([nameError, messageError]) => (
                          <p className="text-muted-foreground mb-3 text-sm">
                            {(typeof nameError === "string" ? nameError : undefined) ??
                              (typeof messageError === "string" ? messageError : undefined) ??
                              "tnx for visiting! leave ur name and a note if u want... <3"}
                          </p>
                        )}
                      </form.Subscribe>
                    )}
                    {step === 2 && (
                      <p className="text-muted-foreground mb-3 text-sm">
                        why not a little drawing as well!{" "}
                        <span className="font-medium">be creative!!</span>
                      </p>
                    )}
                    {stepContent()}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <button
              type="button"
              onClick={handleClick}
              disabled={loading}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-medium",
                "hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                "disabled:opacity-70",
              )}
            >
              {loading && <Spinner />}
              {isOpen || step === 3 ? buttonText : "write me a note"}
            </button>
          </div>
        </form>
      </div>
    </MotionConfig>
  );
}
