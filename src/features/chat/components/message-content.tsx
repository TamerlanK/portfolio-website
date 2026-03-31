"use client";

import { ResponseImages } from "./response-images";
import { StreamingCursor } from "./streaming-cursor";
import { MessageContentProps } from "@/features/chat/types";
import { TypingIndicator } from "./typing-indicator";

export function MessageContent({ message, streamText }: MessageContentProps) {
  const isThinking = message.status === "thinking";
  const isStreaming = message.status === "streaming";
  const isComplete = message.status === "complete";

  const displayText =
    isStreaming && streamText != null ? streamText : message.content;

  if (isThinking) {
    return <TypingIndicator />;
  }

  if (isStreaming) {
    return (
      <p className="whitespace-pre-wrap">
        {displayText}
        <StreamingCursor />
      </p>
    );
  }

  if (isComplete) {
    return (
      <>
        <p className="whitespace-pre-wrap">{message.content}</p>
        {message.images && message.images.length > 0 && (
          <ResponseImages images={message.images} />
        )}
      </>
    );
  }

  return <p className="whitespace-pre-wrap">{message.content}</p>;
}
