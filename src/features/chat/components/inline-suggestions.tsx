"use client";

import { getInlineSuggestions } from "@/features/chat/lib/chat-config";
import { useChat } from "@/features/chat/lib/chat-store";
import { AnimatePresence, motion } from "framer-motion";
import { MoreSuggestionsButton } from "./more-suggestions-button";
import { SuggestionChip } from "./suggestion-chip";
import { SuggestionsToggle } from "./suggestions-toggle";
import { type InlineSuggestionsProps } from "@/features/chat/types";
import { useScrollMask } from "@/hooks/use-scroll-mask";

export function InlineSuggestions({
  disabled = false,
}: InlineSuggestionsProps) {
  const { state, sendMessage, openDrawer, toggleSuggestions } = useChat();
  const suggestions = getInlineSuggestions();

  const { ref, maskStyle } = useScrollMask<HTMLDivElement>();

  return (
    <div className="px-1">
      <SuggestionsToggle
        isVisible={state.showSuggestions}
        onToggle={toggleSuggestions}
      />

      <AnimatePresence>
        {state.showSuggestions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="flex items-start justify-between gap-2 pb-2">
              <div
                className="flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-hide"
                ref={ref}
                style={maskStyle}
              >
                {suggestions.map((suggestion) => (
                  <SuggestionChip
                    key={suggestion.label}
                    label={suggestion.label}
                    query={suggestion.query}
                    onClick={() => sendMessage(suggestion.query)}
                    disabled={disabled}
                  />
                ))}
              </div>

              <div className="shrink-0">
                <MoreSuggestionsButton onClick={openDrawer} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
