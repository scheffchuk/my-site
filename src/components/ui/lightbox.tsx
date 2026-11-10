"use client";

// Adapted from Ramka’s Default preset (MIT): https://ramka.dev/presets/default

import * as React from "react";
import Image from "next/image";
import {
  GalleryHorizontalIcon,
  RectangleHorizontalIcon,
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import * as RamkaLightbox from "@ramka/react/lightbox";

import { cn } from "@/lib/utils";

type LightboxItem = {
  id?: string | number;
  src: string;
  thumb: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

type SlidesLayout = "bleed" | "snug";

const SLIDES_LAYOUT_STORAGE_KEY = "ramka-lightbox-slides-layout";
const SLIDES_LAYOUT_CHANGE_EVENT = "ramka-lightbox-layout-change";

function subscribeToSlidesLayout(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(SLIDES_LAYOUT_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(SLIDES_LAYOUT_CHANGE_EVENT, onChange);
  };
}

function readStoredSlidesLayout(): SlidesLayout | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(SLIDES_LAYOUT_STORAGE_KEY);
    return value === "snug" || value === "bleed" ? value : null;
  } catch {
    return null;
  }
}

function storeSlidesLayout(layout: SlidesLayout) {
  try {
    window.localStorage.setItem(SLIDES_LAYOUT_STORAGE_KEY, layout);
    window.dispatchEvent(new Event(SLIDES_LAYOUT_CHANGE_EVENT));
  } catch {}
}

function itemAspectRatio(item: LightboxItem): number {
  return item.width / item.height;
}

const controlClass = cn(
  "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full",
  "border border-accent/30 bg-accent/10 text-accent",
  "shadow-[0_0.5px_1px_rgb(0_0_0/0.12),0_1px_2px_rgb(0_0_0/0.08),inset_0_0.5px_0_rgb(255_255_255/0.65)]",
  "backdrop-blur-[40px] backdrop-saturate-150",
  "transition-[background-color,box-shadow,transform,scale,opacity,color] duration-150 ease-out",
  "outline-none",
  "hover:bg-accent/20",
  "active:scale-[0.96] active:bg-accent/25",
  "focus-visible:shadow-[0_0_0_2px_var(--accent),0_0.5px_1px_rgb(0_0_0/0.12),0_1px_2px_rgb(0_0_0/0.08),inset_0_0.5px_0_rgb(255_255_255/0.65)]",
  "disabled:pointer-events-none disabled:opacity-30",
  "[&_svg]:block [&_svg]:size-4",
  "dark:shadow-[0_0_0_0.5px_#000,0_0.5px_1px_rgb(0_0_0/0.45),0_1px_2px_rgb(0_0_0/0.35),inset_0_0.5px_0_rgb(255_255_255/0.14)]",
  "dark:focus-visible:shadow-[0_0_0_2px_var(--accent),0_0_0_0.5px_#000,0_0.5px_1px_rgb(0_0_0/0.45),0_1px_2px_rgb(0_0_0/0.35),inset_0_0.5px_0_rgb(255_255_255/0.14)]",
);

const controlGroupClass = cn(
  "inline-flex items-stretch overflow-hidden rounded-full",
  "border border-accent/30 bg-accent/10",
  "shadow-[0_0.5px_1px_rgb(0_0_0/0.12),0_1px_2px_rgb(0_0_0/0.08),inset_0_0.5px_0_rgb(255_255_255/0.65)]",
  "backdrop-blur-[40px] backdrop-saturate-150",
  "dark:shadow-[0_0_0_0.5px_#000,0_0.5px_1px_rgb(0_0_0/0.45),0_1px_2px_rgb(0_0_0/0.35),inset_0_0.5px_0_rgb(255_255_255/0.14)]",
);

const controlSegmentClass = cn(
  "relative h-auto w-9 rounded-none border-0 bg-transparent shadow-none",
  "backdrop-blur-none backdrop-saturate-100",
  "active:scale-100",
  "focus-visible:shadow-[inset_0_0_0_2px_var(--accent)]",
  "dark:bg-transparent dark:shadow-none",
  "dark:focus-visible:shadow-[inset_0_0_0_2px_var(--accent)]",
);

const controlSegmentDividerClass =
  "before:absolute before:inset-y-[22%] before:start-0 before:w-px before:bg-accent/30";

const chromeGestureHideClass = cn(
  "visible opacity-100 [transition:opacity_200ms,visibility_0s_linear_0s] starting:opacity-0",
  "group-data-pulling/lb:invisible group-data-pulling/lb:opacity-0",
  "group-data-pulling/lb:[transition:opacity_200ms,visibility_0s_linear_200ms]",
  "group-data-pull-dismissing/lb:invisible group-data-pull-dismissing/lb:opacity-0",
  "group-data-pull-dismissing/lb:[transition:opacity_200ms,visibility_0s_linear_200ms]",
);

function Root(props: React.ComponentProps<typeof RamkaLightbox.Root>) {
  return <RamkaLightbox.Root {...props} />;
}

function Trigger({
  className,
  ...props
}: React.ComponentProps<typeof RamkaLightbox.Trigger>) {
  return (
    <RamkaLightbox.Trigger
      data-slot="lightbox-trigger"
      className={cn(
        "focus-visible:outline-accent cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
      {...props}
    />
  );
}

function Portal({
  className,
  ...props
}: React.ComponentProps<typeof RamkaLightbox.Portal>) {
  return (
    <RamkaLightbox.Portal
      data-slot="lightbox-portal"
      className={cn(
        "[--lb-ease-out-expo:cubic-bezier(0.16,1,0.3,1)]",
        className,
      )}
      {...props}
    />
  );
}

function Backdrop({
  className,
  ...props
}: React.ComponentProps<typeof RamkaLightbox.Backdrop>) {
  return (
    <RamkaLightbox.Backdrop
      data-slot="lightbox-backdrop"
      className={cn(
        "fixed inset-0 bg-white opacity-0 dark:bg-black",
        "transition-opacity",
        "duration-[var(--lightbox-pull-snap-duration,var(--lightbox-vt-duration,360ms))]",
        "ease-[var(--lightbox-pull-snap-easing,var(--lb-ease-out-expo))]",
        "data-open:opacity-[calc(1_-_var(--lightbox-pull-progress,0)*0.6)]",
        "data-open:starting:opacity-0",
        "data-pulling:transition-none",
        className,
      )}
      {...props}
    />
  );
}

function Content({
  className,
  ...props
}: React.ComponentProps<typeof RamkaLightbox.Content>) {
  return (
    <RamkaLightbox.Content
      data-slot="lightbox-content"
      className={cn(
        "group/lb fixed inset-0 flex flex-col overscroll-contain opacity-0 outline-none",
        "transition-opacity duration-[var(--lightbox-vt-duration,360ms)] ease-(--lb-ease-out-expo)",
        "data-open:opacity-100 data-open:starting:opacity-0",
        "[--lb-inset-top:calc(4rem_+_env(safe-area-inset-top,0px))]",
        "[--lb-inset-bottom:calc(4rem_+_env(safe-area-inset-bottom,0px))]",
        "[--lb-inset-inline:0px]",
        "md:[--lb-inset-top:calc(4.5rem_+_env(safe-area-inset-top,0px))]",
        "md:[--lb-inset-bottom:calc(8.625rem_+_env(safe-area-inset-bottom,0px))]",
        "md:[--lb-inset-inline:3rem]",
        className,
      )}
      {...props}
    />
  );
}

function Close({
  className,
  children,
  ...props
}: React.ComponentProps<typeof RamkaLightbox.Close>) {
  return (
    <RamkaLightbox.Close
      data-slot="lightbox-close"
      className={cn(controlClass, "[&_svg]:size-4.5", className)}
      aria-label="Close"
      {...props}
    >
      {children ?? <XIcon strokeWidth={2.25} />}
    </RamkaLightbox.Close>
  );
}

function Slides({
  className,
  ...props
}: React.ComponentProps<typeof RamkaLightbox.Slides>) {
  return (
    <RamkaLightbox.Slides
      data-slot="lightbox-slides"
      className={cn(
        "flex-1 [scrollbar-width:none] gap-5 md:gap-0 [&::-webkit-scrollbar]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function Slide({
  className,
  ...props
}: React.ComponentProps<typeof RamkaLightbox.Slide>) {
  return (
    <RamkaLightbox.Slide
      data-slot="lightbox-slide"
      className={cn(
        "h-full min-w-full flex-[0_0_100%] px-(--lb-inset-inline) pt-(--lb-inset-top) pb-(--lb-inset-bottom)",
        className,
      )}
      {...props}
    />
  );
}

function Item({
  className,
  ...props
}: React.ComponentProps<typeof RamkaLightbox.Item>) {
  return (
    <RamkaLightbox.Item
      data-slot="lightbox-item"
      className={className}
      {...props}
    />
  );
}

function Media({
  className,
  ...props
}: React.ComponentProps<typeof RamkaLightbox.Media>) {
  return (
    <RamkaLightbox.Media
      data-slot="lightbox-media"
      className={cn(
        "overflow-hidden md:rounded-sm [&_img]:select-none",
        "after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-[inherit]",
        "md:after:shadow-[inset_0_0_0_0.5px_rgb(0_0_0/0.1)]",
        "md:dark:after:shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.12)]",
        className,
      )}
      {...props}
    />
  );
}

function Zoom(props: React.ComponentProps<typeof RamkaLightbox.Zoom>) {
  return <RamkaLightbox.Zoom {...props} />;
}

function ZoomIn({
  className,
  children,
  ...props
}: React.ComponentProps<typeof RamkaLightbox.ZoomIn>) {
  return (
    <RamkaLightbox.ZoomIn
      data-slot="lightbox-zoom-in"
      className={cn(controlClass, "max-md:hidden", className)}
      aria-label="Zoom in"
      {...props}
    >
      {children ?? <ZoomInIcon strokeWidth={2.25} />}
    </RamkaLightbox.ZoomIn>
  );
}

function ZoomOut({
  className,
  children,
  ...props
}: React.ComponentProps<typeof RamkaLightbox.ZoomOut>) {
  return (
    <RamkaLightbox.ZoomOut
      data-slot="lightbox-zoom-out"
      className={cn(controlClass, "max-md:hidden", className)}
      aria-label="Zoom out"
      {...props}
    >
      {children ?? <ZoomOutIcon strokeWidth={2.25} />}
    </RamkaLightbox.ZoomOut>
  );
}

function Counter({
  className,
  ...props
}: React.ComponentProps<typeof RamkaLightbox.Counter>) {
  return (
    <RamkaLightbox.Counter
      data-slot="lightbox-counter"
      className={cn(
        "text-[0.6875rem] leading-[1.25] text-neutral-500 tabular-nums md:sr-only dark:text-neutral-400",
        className,
      )}
      {...props}
    />
  );
}

function Caption({
  className,
  ...props
}: React.ComponentProps<typeof RamkaLightbox.Caption>) {
  return (
    <RamkaLightbox.Caption
      data-slot="lightbox-caption"
      className={cn(
        "pointer-events-auto block max-w-full truncate text-[0.8125rem] leading-[1.25] font-medium text-neutral-900 select-text dark:text-neutral-50",
        className,
      )}
      {...props}
    />
  );
}

function ThumbnailStrip({
  className,
  ...props
}: React.ComponentProps<typeof RamkaLightbox.ThumbnailStrip>) {
  return (
    <RamkaLightbox.ThumbnailStrip
      data-slot="lightbox-thumbnail-strip"
      className={cn(
        "[--lb-strip-fade:40px] [--lb-thumb-size:4.5rem]",
        "[--lb-strip-mask:linear-gradient(to_right,rgb(0_0_0/0)_0,rgb(0_0_0/0.156)_calc(var(--lb-strip-fade)*0.25),rgb(0_0_0/0.5)_calc(var(--lb-strip-fade)*0.5),rgb(0_0_0/0.844)_calc(var(--lb-strip-fade)*0.75),#000_var(--lb-strip-fade),#000_calc(100%_-_var(--lb-strip-fade)),rgb(0_0_0/0.844)_calc(100%_-_var(--lb-strip-fade)*0.75),rgb(0_0_0/0.5)_calc(100%_-_var(--lb-strip-fade)*0.5),rgb(0_0_0/0.156)_calc(100%_-_var(--lb-strip-fade)*0.25),rgb(0_0_0/0)_100%)]",
        "pointer-events-auto w-full min-w-0 self-stretch py-[0.3125rem]",
        "[mask-image:var(--lb-strip-mask)] [-webkit-mask-image:var(--lb-strip-mask)]",
        className,
      )}
      {...props}
    />
  );
}

function ThumbnailStripTrack({
  className,
  ...props
}: React.ComponentProps<typeof RamkaLightbox.ThumbnailStripTrack>) {
  return (
    <RamkaLightbox.ThumbnailStripTrack
      data-slot="lightbox-thumbnail-strip-track"
      className={cn("flex w-max items-center gap-2.5", className)}
      {...props}
    />
  );
}

function Thumbnail({
  className,
  ...props
}: React.ComponentProps<typeof RamkaLightbox.Thumbnail>) {
  return (
    <RamkaLightbox.Thumbnail
      data-slot="lightbox-thumbnail"
      className={cn(
        "relative block size-(--lb-thumb-size) shrink-0 cursor-pointer overflow-hidden rounded-[0.5rem]",
        "[&_img]:block [&_img]:size-full [&_img]:object-cover",
        className,
      )}
      {...props}
    />
  );
}

function Previous(props: React.ComponentProps<typeof RamkaLightbox.Previous>) {
  return <RamkaLightbox.Previous {...props} />;
}

function Next(props: React.ComponentProps<typeof RamkaLightbox.Next>) {
  return <RamkaLightbox.Next {...props} />;
}

function ThumbnailGroup(
  props: React.ComponentProps<typeof RamkaLightbox.ThumbnailGroup>,
) {
  return <RamkaLightbox.ThumbnailGroup {...props} />;
}

const snugSlidesClass = cn(
  "[--lb-snug-gap:1rem] gap-4 md:gap-4",
  "[--lb-snug-width-start:min(calc(100cqw_-_2*var(--lb-inset-inline)),calc((100cqh_-_var(--lb-inset-top)_-_var(--lb-inset-bottom))*var(--lb-snug-ratio-start,1)))]",
  "[--lb-snug-width-end:min(calc(100cqw_-_2*var(--lb-inset-inline)),calc((100cqh_-_var(--lb-inset-top)_-_var(--lb-inset-bottom))*var(--lb-snug-ratio-end,1)))]",
  "md:before:pointer-events-none md:before:flex-[0_0_calc((100cqw_-_var(--lb-snug-width-start))/2_-_var(--lb-snug-gap))]",
  "md:after:pointer-events-none md:after:flex-[0_0_calc((100cqw_-_var(--lb-snug-width-end))/2_-_var(--lb-snug-gap))]",
);

const snugSlideClass = cn(
  "z-0 px-0",
  "[--lb-snug-width:min(calc(100cqw_-_2*var(--lb-inset-inline)),calc((100cqh_-_var(--lb-inset-top)_-_var(--lb-inset-bottom))*var(--lb-snug-ratio)))]",
  "md:w-(--lb-snug-width) md:min-w-0 md:flex-[0_0_auto]",
  "group-data-zoomed/lb:has-data-active:z-[1]",
);

const snugItemClass = cn(
  "md:transition-opacity",
  "md:duration-[var(--lightbox-pull-snap-duration,500ms)]",
  "md:ease-[var(--lightbox-pull-snap-easing,var(--lb-ease-out-expo))]",
  "md:not-data-active:[--lb-neighbor-dim:max(var(--lightbox-pull-progress,0),var(--lightbox-zoom-progress,0))]",
  "md:not-data-active:opacity-[calc(1_-_var(--lightbox-pull-progress,0)*0.85)]",
  "md:not-data-active:[filter:opacity(calc(1_-_var(--lb-neighbor-dim)))_blur(calc(var(--lb-neighbor-dim)*6px))]",
  "md:group-data-pulling/lb:transition-none",
  "md:group-data-pull-dismissing/lb:transition-none",
);

function GalleryThumbnailStrip({ items }: { items: LightboxItem[] }) {
  if (items.length <= 1) return null;

  return (
    <ThumbnailStrip className="max-md:hidden">
      <ThumbnailStripTrack aria-label="Photo thumbnails">
        {items.map((item, i) => (
          <Thumbnail key={item.id ?? i} index={i}>
            <Image
              src={item.thumb}
              alt={item.alt}
              width={72}
              height={72}
              sizes="72px"
              draggable={false}
            />
          </Thumbnail>
        ))}
      </ThumbnailStripTrack>

      <span
        aria-hidden
        className="border-accent pointer-events-none absolute top-1/2 left-1/2 size-[calc(var(--lb-thumb-size)_+_10px)] -translate-x-1/2 -translate-y-1/2 rounded-[calc(0.5rem_+_3px)] border-2"
      />
    </ThumbnailStrip>
  );
}

function Gallery({
  items,
  ariaLabel,
  slidesLayout: slidesLayoutProp,
  onSlidesLayoutChange,
  portalProps,
}: {
  items: LightboxItem[];
  ariaLabel: string;
  portalProps?: React.ComponentProps<typeof Portal>;
  slidesLayout?: SlidesLayout;
  onSlidesLayoutChange?: (layout: SlidesLayout) => void;
}) {
  const storedSlidesLayout = React.useSyncExternalStore(
    subscribeToSlidesLayout,
    readStoredSlidesLayout,
    () => null,
  );
  const [slidesLayoutInternal, setSlidesLayoutInternal] =
    React.useState<SlidesLayout>("snug");
  const slidesLayout =
    slidesLayoutProp ?? storedSlidesLayout ?? slidesLayoutInternal;
  const snug = slidesLayout === "snug";
  const solo = items.length <= 1;

  const setSlidesLayout = (next: SlidesLayout) => {
    storeSlidesLayout(next);
    onSlidesLayoutChange?.(next);
    if (slidesLayoutProp === undefined) {
      setSlidesLayoutInternal(next);
    }
  };

  const toggleSlidesLayout = () => {
    setSlidesLayout(slidesLayout === "snug" ? "bleed" : "snug");
  };

  const snugEdgeRatios =
    snug && items.length > 0
      ? {
          start: itemAspectRatio(items[0]),
          end: itemAspectRatio(items[items.length - 1]),
        }
      : null;

  const edgeStyle: React.CSSProperties & Record<string, number> = snugEdgeRatios
    ? {
        "--lb-snug-ratio-start": snugEdgeRatios.start,
        "--lb-snug-ratio-end": snugEdgeRatios.end,
      }
    : {};

  return (
    <Portal {...portalProps}>
      <Backdrop />
      <Content
        aria-label={ariaLabel}
        className={cn(
          snug && "md:[--lb-inset-inline:2rem]",
          solo &&
            "md:[--lb-inset-bottom:calc(4.5rem_+_env(safe-area-inset-bottom,0px))]",
        )}
      >
        <Slides
          key={slidesLayout}
          aria-label="Full-size images"
          aria-roledescription="carousel"
          preload={2}
          className={snug ? snugSlidesClass : undefined}
          style={edgeStyle}
        >
          {items.map((item, i) => {
            const slideStyle: React.CSSProperties & Record<string, number> = {
              "--lb-snug-ratio": itemAspectRatio(item),
            };
            return (
              <Slide
                key={item.id ?? i}
                className={snug ? snugSlideClass : undefined}
                style={snug ? slideStyle : undefined}
              >
                <Item
                  index={i}
                  caption={item.caption ?? item.alt}
                  className={snug ? snugItemClass : undefined}
                  aria-roledescription="slide"
                  {...(solo
                    ? { "aria-label": `${i + 1} of ${items.length}` }
                    : {})}
                >
                  <Zoom maxZoom={6}>
                    <Media width={item.width} height={item.height}>
                      <Image
                        width={item.width}
                        height={item.height}
                        src={item.src}
                        alt={item.alt}
                        sizes="100vw"
                        loading="eager"
                        draggable={false}
                      />
                    </Media>
                  </Zoom>
                </Item>
              </Slide>
            );
          })}
        </Slides>

        <div
          className={cn(
            "absolute end-3 top-[calc(0.75rem_+_env(safe-area-inset-top,0px))] z-[1] flex gap-2",
            chromeGestureHideClass,
            "max-md:group-data-zoomed/lb:invisible max-md:group-data-zoomed/lb:opacity-0",
            "max-md:group-data-zoomed/lb:[transition:opacity_200ms,visibility_0s_linear_200ms]",
          )}
        >
          <button
            type="button"
            className={cn(controlClass, "max-md:hidden [&_svg]:size-4.5")}
            aria-pressed={snug}
            aria-label={
              snug ? "Switch to theater layout" : "Switch to peek layout"
            }
            onClick={toggleSlidesLayout}
          >
            {snug ? (
              <GalleryHorizontalIcon strokeWidth={2.25} />
            ) : (
              <RectangleHorizontalIcon strokeWidth={2.25} />
            )}
          </button>

          <div className={cn(controlGroupClass, "max-md:hidden")}>
            <ZoomOut className={controlSegmentClass} />
            <ZoomIn
              className={cn(controlSegmentClass, controlSegmentDividerClass)}
            />
          </div>
          <Close />
        </div>

        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex flex-col items-center gap-3",
            "px-3 pb-[calc(1rem_+_env(safe-area-inset-bottom,0px))]",
            chromeGestureHideClass,
            "group-data-zoomed/lb:invisible group-data-zoomed/lb:opacity-0",
            "group-data-zoomed/lb:[transition:opacity_200ms,visibility_0s_linear_200ms]",
            solo &&
              "min-h-(--lb-inset-bottom) justify-center pb-[env(safe-area-inset-bottom,0px)]",
          )}
        >
          <div className="flex max-w-full flex-col items-center text-center">
            <Caption />

            {solo ? null : (
              <Counter>
                {({ current, total }) => `${current} of ${total}`}
              </Counter>
            )}
          </div>
          <GalleryThumbnailStrip items={items} />
        </div>
      </Content>
    </Portal>
  );
}

export const Lightbox = {
  Root,
  Trigger,
  Portal,
  Backdrop,
  Content,
  Close,
  Slides,
  Slide,
  Item,
  Media,
  Zoom,
  ZoomIn,
  ZoomOut,
  Counter,
  Caption,
  ThumbnailStrip,
  ThumbnailStripTrack,
  Thumbnail,
  ThumbnailGroup,
  Previous,
  Next,
  Gallery,
};
