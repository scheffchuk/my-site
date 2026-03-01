"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form-nextjs";
import { api } from "../../../convex/_generated/api";
import useClickOutside from "@/hooks/useClickOutside";
import useMeasure from "react-use-measure";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import Signature, { type SignatureRef } from "@uiw/react-signature";
import { cn } from "@/lib/utils";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import type { OptimisticEntry } from "./guestbook-entries";
import { useAction } from "convex/react";
import { Loader2 } from "lucide-react";


const transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.25,
} as const;

type Step = "idle" | "form" | "signature" | "success";
type ServerValidationErrors = {
  name?: string;
  message?: string;
};

type WriteNoteCTAProps = {
  onEntryCreated: (entry: OptimisticEntry) => void;
};

export function WriteNoteCTA({ onEntryCreated }: WriteNoteCTAProps) {
  const [step, setStep] = useState<Step>("idle");
  const [contentRef, { height: heightContent }] = useMeasure();
  const [menuRef] = useMeasure();
  const [serverValidationErrors, setServerValidationErrors] = useState<ServerValidationErrors>({});
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

  const buttonText =
    step === "form" ? "Next" : step === "signature" ? "Submit" : step === "success" ? "Thanks!" : "Write me a note";
  const inputClassName = cn(
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
    "shadow-[rgba(0,0,0,0.06)_0px_2px_4px_0px_inset]",
    "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  );
  const validateName = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "pls fill out all fields";
    if (trimmed.length > 50) return "ur name is too long";
    return undefined;
  };
  const validateMessage = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "pls fill out all fields";
    if (trimmed.length > 200) return "love ur long entry, but can u make it shorter?";
    return undefined;
  };

  useEffect(() => {
    if (step !== "success") return;
    const timer = setTimeout(() => setStep("idle"), 2000);
    return () => clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

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

  const clearServerErrors = () => setServerValidationErrors({});
  const setServerErrors = (errors?: Record<string, string[]>) => {
    setServerValidationErrors({
      name: errors?.name?.[0],
      message: errors?.message?.[0],
    });
  };
  const clearServerError = (field: keyof ServerValidationErrors) => {
    setServerValidationErrors((prev) => {
      if (!prev[field]) return prev;
      return { ...prev, [field]: undefined };
    });
  };
  const getTrimmedValues = () => {
    const { name, message } = form.state.values;
    return { name: name.trim(), message: message.trim() };
  };
  const openFlow = () => {
    setIsOpen(true);
    setStep("form");
  };
  const validateStep = async () => {
    const { name, message } = getTrimmedValues();
    const clientNameError = validateName(name);
    const clientMessageError = validateMessage(message);
    if (clientNameError || clientMessageError) {
      clearServerErrors();
      await Promise.all([form.validateField("name", "submit"), form.validateField("message", "submit")]);
      return false;
    }

    setLoading(true);
    const result = await moderateAndCreate({
      name,
      message,
      validateOnly: true,
    });
    setLoading(false);
    if (!result.success) {
      setServerErrors(result.errors);
      return false;
    }
    clearServerErrors();
    return true;
  };
  const submitStep = async () => {
    setLoading(true);
    const sig = captureSignature();
    if (!sig) {
      setLoading(false);
      return;
    }

    const localEntryId = crypto.randomUUID();
    const { name, message } = getTrimmedValues();
    const result = await moderateAndCreate({
      name,
      message,
      signature: sig,
      localEntryId,
    });

    if (!result.success) {
      setServerErrors(result.errors);
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

    setStep("success");
    setIsOpen(false);
    setLoading(false);
    clearServerErrors();
    form.reset();
    signatureRef.current?.clear?.();
  };
  const handleClick = async () => {
    if (loading) return;
    if (step === "success") {
      setStep("idle");
      return;
    }
    if (!isOpen) {
      openFlow();
      return;
    }
    if (step === "form") {
      const isValid = await validateStep();
      if (!isValid) return;
      setStep("signature");
      return;
    }
    if (step === "signature") {
      await submitStep();
    }
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleClick();
  };

  useClickOutside(ref, () => setIsOpen(false));

  const getFieldError = (formError: unknown, serverError?: string) =>
    (typeof formError === "string" ? formError : undefined) ?? serverError;

  const stepContent = () => {
    switch (step) {
      case "form":
        return (
          <div className="space-y-3">
            <form.Field
              name="name"
              validators={{
                onSubmit: () => validateName(form.state.values.name) ?? serverValidationErrors.name,
              }}
            >
              {(field) => {
                const nameError = getFieldError(field.state.meta.errors[0], serverValidationErrors.name);
                return (
                  <Field data-invalid={!!nameError}>
                    <FieldLabel htmlFor="guestbook-created-by">Name</FieldLabel>
                    <FieldContent>
                      <input
                        id="guestbook-created-by"
                        name="name"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          clearServerError("name");
                          field.handleChange(e.target.value);
                        }}
                        placeholder="ur name..."
                        autoComplete="name"
                        className={cn(inputClassName, nameError && "border-destructive focus-visible:ring-destructive")}
                        aria-invalid={!!nameError}
                      />
                      <FieldError errors={nameError ? [{ message: nameError }] : undefined} />
                    </FieldContent>
                  </Field>
                );
              }}
            </form.Field>
            <form.Field
              name="message"
              validators={{
                onSubmit: () => validateMessage(form.state.values.message) ?? serverValidationErrors.message,
              }}
            >
              {(field) => {
                const messageError = getFieldError(field.state.meta.errors[0], serverValidationErrors.message);
                return (
                  <Field data-invalid={!!messageError}>
                    <FieldLabel htmlFor="guestbook-entry">Message</FieldLabel>
                    <FieldContent>
                      <textarea
                        id="guestbook-entry"
                        name="message"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          clearServerError("message");
                          field.handleChange(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                            e.preventDefault();
                            void handleClick();
                          }
                        }}
                        placeholder="leave a note..."
                        rows={3}
                        className={cn(
                          inputClassName,
                          "min-h-[80px] resize-none",
                          messageError && "border-destructive focus-visible:ring-destructive",
                        )}
                        aria-invalid={!!messageError}
                      />
                      <FieldError errors={messageError ? [{ message: messageError }] : undefined} />
                    </FieldContent>
                  </Field>
                );
              }}
            </form.Field>
          </div>
        );
      case "signature":
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
        <form onSubmit={handleSubmit} aria-busy={loading}>
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
                    {step === "form" && (
                      <form.Subscribe
                        selector={(state) => [
                          state.fieldMeta.name?.errors?.[0],
                          state.fieldMeta.message?.errors?.[0],
                        ]}
                      >
                        {([nameError, messageError]) => (
                          <p className="text-muted-foreground mb-3 text-sm">
                            {(typeof nameError === "string" ? nameError : serverValidationErrors.name) ??
                              (typeof messageError === "string"
                                ? messageError
                                : serverValidationErrors.message) ??
                              "tnx for visiting! leave ur name and a note if u want... <3"}
                          </p>
                        )}
                      </form.Subscribe>
                    )}
                    {step === "signature" && (
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
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-medium",
                "hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                "disabled:opacity-70",
              )}
            >
              {loading && <Loader2 className="animate-spin" size={12} aria-hidden />}
              {isOpen || step === "success" ? buttonText : "write me a note"}
            </button>
          </div>
        </form>
      </div>
    </MotionConfig>
  );
}
