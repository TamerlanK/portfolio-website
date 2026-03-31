"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseScrollToBottomOptions {
  dependencies?: unknown[];
  behavior?: ScrollBehavior;
}

export function useScrollToBottom({
  dependencies = [],
  behavior = "smooth",
}: UseScrollToBottomOptions = {}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollIntoView({ behavior });
  }, [behavior]);

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { scrollRef, scrollToBottom };
}
