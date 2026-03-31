"use client";

import { cn } from "@/lib/utils";
import { type MessageListProps } from "@/features/chat/types";
import { MessageBubble } from "./message-bubble";
import { useScrollMask } from "@/hooks/use-scroll-mask";

export function MessageList({
  messages,
  streamingId,
  streamText,
  scrollRef,
  isThinking,
}: MessageListProps) {
  const { ref, maskStyle } = useScrollMask<HTMLDivElement>("vertical");

  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto px-2 mb-4 space-y-4",
        "scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]"
      )}
      ref={ref}
      style={{
        ...maskStyle,
        overflowY: isThinking ? "hidden" : "auto",
      }}
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          streamText={message.id === streamingId ? streamText : undefined}
          isStreaming={message.id === streamingId}
        />
      ))}
      <div ref={scrollRef} />
    </div>
  );
}
