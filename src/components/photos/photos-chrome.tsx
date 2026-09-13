import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppearanceSwitcher } from "@/components/appearance-switcher";
import { AccentSwitcher } from "@/components/accent-switcher";

export function PhotosChrome() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4">
      <Link
        href="/"
        className="border-accent/30 bg-background/80 text-accent/90 hover:text-accent focus-visible:ring-ring pointer-events-auto rounded-md border px-3 py-2 text-sm backdrop-blur-sm transition-colors focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98]"
      >
        <ArrowLeft className="mr-1 inline-block size-4" aria-hidden />
        take me home
      </Link>
      <div className="pointer-events-auto flex items-center gap-1">
        <AppearanceSwitcher />
        <AccentSwitcher />
      </div>
    </div>
  );
}
