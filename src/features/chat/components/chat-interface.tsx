"use client";

import { useChat } from "@/features/chat/lib/chat-store";
import { motion } from "framer-motion";
import { useCallback } from "react";
import { useScrollToBottom } from "../hooks/use-scroll-to-bottom";
import { ChatInput } from "./chat-input";
import { InlineSuggestions } from "./inline-suggestions";
import { MessageList } from "./message-list";

export function ChatInterface() {
  const { state, sendMessage, setInput, isThinking } = useChat();

  const { scrollRef } = useScrollToBottom({
    dependencies: [state.messages, state.streamText],
    behavior: "smooth",
  });

  const handleSubmit = useCallback(() => {
    const query = state.input.trim();
    if (!query || isThinking) return;
    sendMessage(query);
  }, [state.input, isThinking, sendMessage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="flex w-full max-w-2xl flex-col mx-auto"
      style={{ height: "calc(100vh - 130px)", marginTop: "4px" }}
    >
      <MessageList
        messages={state.messages}
        streamingId={state.streamingId}
        streamText={state.streamText}
        scrollRef={scrollRef}
        isThinking={isThinking}
      />

      <InlineSuggestions disabled={isThinking} />

      <div className="shrink-0 pb-4 pt-1 px-1">
        <ChatInput
          value={state.input}
          onChange={setInput}
          onSubmit={handleSubmit}
          disabled={isThinking}
        />
      </div>
    </motion.div>
  );
}
