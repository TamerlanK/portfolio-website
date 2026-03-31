"use client";

import { cn } from "@/lib/utils";
import { type SuggestionChipProps } from "@/features/chat/types";

export function SuggestionChip({
  label,
  onClick,
  disabled = false,
}: SuggestionChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-3 py-1.5 rounded-full text-xs",
        "bg-neutral-800/50 text-neutral-400 border border-neutral-700/40",
        "transition-all duration-150",
        "hover:bg-neutral-700/50 hover:text-neutral-200 hover:border-neutral-600",
        "active:scale-[0.97]",
        "disabled:opacity-40 disabled:cursor-not-allowed"
      )}
    >
      {label}
    </button>
  );
}
