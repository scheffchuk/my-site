"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type FieldProps = {
  value: string;
  label: string;
  name: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
  className?: string;
  autoComplete?: string;
  error?: string;
};

export function Field({
  value,
  label,
  onChange,
  name,
  placeholder,
  multiline,
  className,
  autoComplete,
  error,
}: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const inputClassName = cn(
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
    "shadow-[rgba(0,0,0,0.06)_0px_2px_4px_0px_inset]",
    "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    multiline && "min-h-[80px] resize-none",
    error && "border-destructive focus-visible:ring-destructive",
    className,
  );

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={inputClassName}
          rows={3}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
      ) : (
        <input
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={inputClassName}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
      )}
      {error && (
        <p id={errorId} className="text-xs text-destructive" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}
