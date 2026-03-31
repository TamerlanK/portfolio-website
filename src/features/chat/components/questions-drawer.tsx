"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { QUESTION_CATEGORIES } from "@/features/chat/lib/chat-config";
import { useChat } from "@/features/chat/lib/chat-store";
import { cn } from "@/lib/utils";

export function QuestionsDrawer() {
  const { state, closeDrawer, startChat, sendMessage } = useChat();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    if (state.drawerOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [state.drawerOpen, closeDrawer]);

  const handleQuestionClick = (label: string) => {
    closeDrawer();
    if (state.mode === "landing") {
      startChat(label);
    } else {
      sendMessage(label);
    }
  };

  return (
    <AnimatePresence>
      {state.drawerOpen && (
        <>
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={closeDrawer}
          />

          <motion.div
            ref={drawerRef}
            key="drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              mass: 0.8,
            }}
            className={cn(
              "fixed right-0 top-0 z-50 h-full w-full max-w-sm",
              "border-l border-neutral-800",
              "bg-neutral-950/95 backdrop-blur-xl",
              "flex flex-col shadow-2xl shadow-black/40"
            )}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
                Ask me anything
              </h2>
              <button
                onClick={closeDrawer}
                aria-label="Close drawer"
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  "text-neutral-500 transition-colors",
                  "hover:bg-neutral-800 hover:text-neutral-300"
                )}
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-5 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]">
              {QUESTION_CATEGORIES.map((category, catIdx) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1 + catIdx * 0.05,
                  }}
                >
                  <div className="flex items-center gap-2 px-1 pb-2">
                    <span className="text-sm">{category.emoji}</span>
                    <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      {category.label}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {category.questions.map((question) => (
                      <button
                        key={question.key}
                        onClick={() => handleQuestionClick(question.label)}
                        className={cn(
                          "w-full text-left px-3 py-2.5 rounded-xl text-sm",
                          "text-neutral-300 transition-all duration-150",
                          "hover:bg-neutral-800/70 hover:text-white",
                          "active:scale-[0.98]"
                        )}
                      >
                        {question.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
