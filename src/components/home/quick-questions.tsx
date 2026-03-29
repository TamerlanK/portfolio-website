"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  QUESTION_CONFIG,
  QuestionKey,
  QUESTIONS,
  QuestionValue,
} from "@/lib/constants";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionConfigItem {
  key: string;
  icon: LucideIcon;
  label?: string;
}

interface QuickQuestionsProps {
  onQuestionSelect: (query: string) => void;
}

export function QuickQuestions({ onQuestionSelect }: QuickQuestionsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [hasLeftFade, setHasLeftFade] = useState(false);
  const [hasRightFade, setHasRightFade] = useState(false);

  const updateFade = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    const isScrollable = scrollWidth > clientWidth + 1;

    if (!isScrollable) {
      setHasLeftFade(false);
      setHasRightFade(false);
      return;
    }

    setHasLeftFade(scrollLeft > 5);
    setHasRightFade(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateFade();

    el.addEventListener("scroll", updateFade);
    window.addEventListener("resize", updateFade);

    return () => {
      el.removeEventListener("scroll", updateFade);
      window.removeEventListener("resize", updateFade);
    };
  }, []);

  const getMask = () => {
    if (hasLeftFade && hasRightFade) {
      return "linear-gradient(to right, transparent, black 32px, black calc(100% - 32px), transparent)";
    }

    if (hasRightFade) {
      return "linear-gradient(to right, black 0%, black calc(100% - 32px), transparent)";
    }

    if (hasLeftFade) {
      return "linear-gradient(to right, transparent, black 32px, black 100%)";
    }

    return "none";
  };

  return (
    <section
      aria-label="Quick suggestions"
      className="relative w-full max-w-2xl mx-auto"
    >
      <div
        ref={scrollRef}
        className={cn(
          "flex overflow-x-auto gap-2 pb-2 md:grid md:grid-cols-5 md:overflow-visible md:pb-0",
          "scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]",
          "md:mask-none md:[-webkit-mask-image:none]"
        )}
        style={{
          WebkitMaskImage: getMask(),
          maskImage: getMask(),
        }}
      >
        {QUESTION_CONFIG.map(
          ({ key, icon: Icon, label }: QuestionConfigItem) => {
            const displayLabel = label || key;
            const query = QUESTIONS[key as QuestionKey] as QuestionValue;

            return (
              <Button
                key={key}
                type="button"
                onClick={() => query && onQuestionSelect(query)}
                variant="outline"
                aria-label={`Ask about ${displayLabel}`}
                className={cn(
                  "group shrink-0 snap-center items-center gap-2",
                  "border-neutral-700/50 bg-neutral-800/30 text-neutral-200",
                  "transition-all duration-200 ease-in-out",
                  "hover:bg-neutral-700/40 hover:border-neutral-600 hover:text-white",
                  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-blue-500",
                  "active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
                  "backdrop-blur-md shadow-sm",
                  "h-10 px-4 rounded-full whitespace-nowrap md:h-auto",
                  "md:flex-col md:justify-center md:rounded-2xl md:min-h-25 md:w-full md:px-2 md:py-4"
                )}
              >
                <Icon
                  size={18}
                  strokeWidth={2}
                  className={cn(
                    "text-neutral-300 transition-colors group-hover:text-white",
                    "md:size-6"
                  )}
                  aria-hidden="true"
                />

                <span
                  className={cn(
                    "font-medium leading-none",
                    "text-xs md:text-sm md:leading-tight"
                  )}
                >
                  {displayLabel}
                </span>
              </Button>
            );
          }
        )}
      </div>
    </section>
  );
}
