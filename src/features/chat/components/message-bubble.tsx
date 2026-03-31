"use client";

import { LayoutGroup, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type MessageBubbleProps } from "@/features/chat/types";
import { MessageContent } from "./message-content";
import { Avatar } from "./avatar";

export function MessageBubble({
  message,
  streamText,
  isStreaming,
}: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isThinking = message.status === "thinking";
  const isActive = isThinking || isStreaming;

  const avatarSrc = isActive ? "/memoji-thinking.png" : "/memoji.png";

  return (
    <LayoutGroup>
      <motion.div
        layout="position"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "flex items-end gap-2.5",
          isUser ? "justify-end" : "justify-start"
        )}
      >
        {!isUser && (
          <Avatar
            src={avatarSrc}
            alt="Assistant"
            isThinking={isThinking}
            size="sm"
          />
        )}

        <div className="relative max-w-[80%]">
          <div
            className={cn(
              "relative px-4 py-3 text-sm leading-relaxed border",
              isUser
                ? "bg-white/10 text-neutral-100 border-white/6 rounded-2xl rounded-br-none"
                : "bg-neutral-800/60 text-neutral-200 border-neutral-700/30 rounded-2xl rounded-bl-none",
              "pt-3.5 pb-3"
            )}
          >
            <MessageContent message={message} streamText={streamText} />
          </div>
        </div>
      </motion.div>
    </LayoutGroup>
  );
}
