"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { type SendButtonProps } from "@/features/chat/types";

export function SendButton({ disabled, onClick }: SendButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      aria-label="Send message"
      onClick={onClick}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl",
        "border border-neutral-700 bg-neutral-800/40 text-neutral-200",
        "transition-all",
        "hover:border-neutral-600 hover:bg-neutral-700/30",
        "active:scale-95",
        "disabled:cursor-not-allowed disabled:opacity-50"
      )}
    >
      <ArrowRight className="h-5 w-5" />
    </button>
  );
}
