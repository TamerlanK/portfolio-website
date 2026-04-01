"use client";

import { ResponseImages } from "./response-images";
import { StreamingCursor } from "./streaming-cursor";
import { MessageContentProps } from "@/features/chat/types";
import { TypingIndicator } from "./typing-indicator";
import { MarkdownRenderer } from "@/components/ui/markdown/markdown-renderer";

export function MessageContent({ message, streamText }: MessageContentProps) {
  const { status, content, images } = message;

  const isThinking = status === "thinking";
  const isStreaming = status === "streaming";
  const isComplete = status === "complete";

  const displayText = isStreaming && streamText != null ? streamText : content;

  if (isThinking) return <TypingIndicator />;

  return (
    <div className="space-y-2">
      {/* Markdown rendering */}
      <MarkdownRenderer content={displayText} />

      {/* Streaming cursor */}
      {isStreaming && <StreamingCursor />}

      {/* Images only when message is complete and images exist */}
      {isComplete && Array.isArray(images) && images.length > 0 && (
        <ResponseImages images={images} />
      )}
    </div>
  );
}
