"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  Children,
  cloneElement,
  isValidElement,
} from "react";

interface HScrollProps {
  children: React.ReactNode;
  gap?: number;
  /** CSS width value for each item, e.g. "calc(33.33% - 22px)" */
  itemWidth: string;
  autoScrollMs?: number;
  style?: React.CSSProperties;
}

export function HScroll({
  children,
  gap = 32,
  itemWidth,
  autoScrollMs = 4000,
  style,
}: HScrollProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [fillFrac, setFillFrac] = useState(0.33);
  const hovered = useRef(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setFillFrac(el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    sync();
    return () => {
      el.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, [sync]);

  useEffect(() => {
    if (!autoScrollMs) return;
    const id = setInterval(() => {
      if (hovered.current) return;
      const el = trackRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= max - 2) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: el.clientWidth * fillFrac, behavior: "smooth" });
      }
    }, autoScrollMs);
    return () => clearInterval(id);
  }, [autoScrollMs, fillFrac]);

  const items = Children.toArray(children);
  const indicatorLeft = `${progress * (1 - fillFrac) * 100}%`;
  const indicatorWidth = `${fillFrac * 100}%`;

  return (
    <div
      style={style}
      onMouseEnter={() => { hovered.current = true; }}
      onMouseLeave={() => { hovered.current = false; }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          cursor: "grab",
        } as React.CSSProperties}
      >
        {items.map((child, i) =>
          isValidElement(child) ? (
            cloneElement(child as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
              key: i,
              style: {
                flexShrink: 0,
                width: itemWidth,
                scrollSnapAlign: "start",
                ...(child.props as React.HTMLAttributes<HTMLElement>).style,
              },
            })
          ) : child
        )}
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          marginTop: 28,
          position: "relative",
          height: 1,
          background: "var(--line-2)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: indicatorLeft,
            height: "100%",
            width: indicatorWidth,
            background: "var(--ink)",
            transition: "left .35s cubic-bezier(.25,.46,.45,.94)",
          }}
        />
      </div>
    </div>
  );
}
