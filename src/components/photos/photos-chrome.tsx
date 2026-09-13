import { AppearanceSwitcher } from "@/components/appearance-switcher";
import { AccentSwitcher } from "@/components/accent-switcher";

export function PhotosChrome() {
  return (
    <div className="absolute top-0 right-0 z-50 flex items-center gap-1 px-4 py-4">
      <AppearanceSwitcher />
      <AccentSwitcher />
    </div>
  );
}
