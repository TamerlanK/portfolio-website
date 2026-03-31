"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

type ScrollFadeProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollFade({ children, className }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollState();

    const el = ref.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  return (
    <div className={`relative ${className}`}>
      {/* LEFT FADE */}
      {canScrollLeft && (
        <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-linear-to-r from-background to-transparent" />
      )}

      {/* RIGHT FADE */}
      {canScrollRight && (
        <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-linear-to-l from-background to-transparent" />
      )}

      {/* SCROLL AREA */}
      <div
        ref={ref}
        className="flex overflow-x-auto whitespace-nowrap scroll-smooth"
      >
        {children}
      </div>
    </div>
  );
}
