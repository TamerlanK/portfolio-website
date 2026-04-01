"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import { QUESTION_CATEGORIES } from "@/features/chat/lib/chat-config";
import { useChat } from "@/features/chat/lib/chat-store";
import { cn } from "@/lib/utils";

export function QuestionsDrawer() {
  const { state, closeDrawer, startChat, sendMessage } = useChat();

  const handleQuestionClick = (label: string) => {
    closeDrawer();
    if (state.mode === "landing") {
      startChat(label);
    } else {
      sendMessage(label);
    }
  };

  return (
    <Drawer
      open={state.drawerOpen}
      onOpenChange={(open) => {
        if (!open) closeDrawer();
      }}
      direction="right"
    >
      <DrawerContent
        className={cn(
          "fixed right-0 top-0 bottom-0 w-full max-w-sm h-full rounded-none",
          "border-l border-neutral-800 border-r-0 border-t-0 border-b-0",
          "bg-neutral-950/95 backdrop-blur-xl",
          "flex flex-col shadow-2xl shadow-black/40"
        )}
      >
        <DrawerHeader className="flex items-center justify-between px-5 pt-5 pb-3">
          <DrawerTitle className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
            Ask me anything
          </DrawerTitle>
          <DrawerClose asChild>
            <button
              aria-label="Close drawer"
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg",
                "text-neutral-500 transition-colors",
                "hover:bg-neutral-800 hover:text-neutral-300"
              )}
            >
              <X size={16} />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-5 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]">
          {QUESTION_CATEGORIES.map((category) => (
            <div key={category.id}>
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
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
