"use client";

import { cn } from "@/lib/utils";
import { type ChatInputProps } from "@/features/chat/types";
import { SendButton } from "./send-button";

export function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled,
  placeholder = "Ask me anything…",
}: ChatInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSubmit();
    }
  };

  const isSendDisabled = !value.trim() || disabled;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={cn(
          "flex items-center gap-2 rounded-2xl border border-neutral-700",
          "bg-neutral-800/30 px-4 py-3 backdrop-blur-lg",
          "transition-all",
          "hover:border-neutral-600 hover:bg-neutral-700/30",
          "focus-within:border-neutral-500",
          "focus-within:bg-neutral-700/30",
          "focus-within:ring-1 focus-within:ring-neutral-500/40"
        )}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "min-w-0 flex-1 border-none bg-transparent text-base",
            "text-neutral-200 placeholder:text-neutral-500",
            "outline-none disabled:opacity-50"
          )}
          aria-label="Chat message input"
          autoComplete="off"
        />
        <SendButton disabled={isSendDisabled} />
      </div>
    </form>
  );
}
