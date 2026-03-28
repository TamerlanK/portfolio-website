"use client";

import { Button } from "@/components/ui/button";
import { QUESTION_CONFIG, QUESTIONS } from "@/lib/constants";

interface QuickQuestionsProps {
  onQuestionSelect: (query: string) => void;
}

export function QuickQuestions({ onQuestionSelect }: QuickQuestionsProps) {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {QUESTION_CONFIG.map(({ key, icon: Icon }) => (
        <Button
          key={key}
          onClick={() => onQuestionSelect(QUESTIONS[key])}
          variant="outline"
          className="border-neutral-700 hover:bg-neutral-700/30 aspect-square w-full rounded-2xl border bg-neutral-800/30 py-8 shadow-none backdrop-blur-lg active:scale-95 md:p-10"
        >
          <div className="flex h-full flex-col items-center justify-center gap-2 text-neutral-200">
            <Icon size={22} strokeWidth={2} className="text-white" />
            <span className="text-xs font-medium sm:text-sm text-neutral-200">
              {key}
            </span>
          </div>
        </Button>
      ))}
    </div>
  );
}
