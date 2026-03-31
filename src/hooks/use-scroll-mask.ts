"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Direction = "horizontal" | "vertical";

export function useScrollMask<T extends HTMLElement>(
  direction: Direction = "horizontal"
) {
  const ref = useRef<T>(null);

  const [startFade, setStartFade] = useState(false);
  const [endFade, setEndFade] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    if (direction === "horizontal") {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const isScrollable = scrollWidth > clientWidth + 1;

      if (!isScrollable) {
        setStartFade(false);
        setEndFade(false);
        return;
      }

      setStartFade(scrollLeft > 5);
      setEndFade(scrollLeft + clientWidth < scrollWidth - 5);
    } else {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const isScrollable = scrollHeight > clientHeight + 1;

      if (!isScrollable) {
        setStartFade(false);
        setEndFade(false);
        return;
      }

      setStartFade(scrollTop > 5);
      setEndFade(scrollTop + clientHeight < scrollHeight - 5);
    }
  }, [direction]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    setTimeout(update, 0);

    el.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const getMask = () => {
    const size = 32;

    if (direction === "horizontal") {
      if (startFade && endFade) {
        return `linear-gradient(to right, transparent, black ${size}px, black calc(100% - ${size}px), transparent)`;
      }
      if (endFade) {
        return `linear-gradient(to right, black 0%, black calc(100% - ${size}px), transparent)`;
      }
      if (startFade) {
        return `linear-gradient(to right, transparent, black ${size}px, black 100%)`;
      }
    } else {
      if (startFade && endFade) {
        return `linear-gradient(to bottom, transparent, black ${size}px, black calc(100% - ${size}px), transparent)`;
      }
      if (endFade) {
        return `linear-gradient(to bottom, black 0%, black calc(100% - ${size}px), transparent)`;
      }
      if (startFade) {
        return `linear-gradient(to bottom, transparent, black ${size}px, black 100%)`;
      }
    }

    return "none";
  };

  return {
    ref,
    maskStyle: {
      WebkitMaskImage: getMask(),
      maskImage: getMask(),
    } as React.CSSProperties,
  };
}
