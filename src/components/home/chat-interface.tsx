"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  initialQuery: string;
}

const TYPING_RESPONSES: Record<string, string> = {
  default: `Thanks for your question! I'm Tamerlan — a full-stack developer who loves building polished, interactive web experiences with React, Next.js, and TypeScript.\n\nI focus on creating performant applications with beautiful UIs, smooth animations, and clean architecture. Whether it's a complex dashboard, a real-time app, or a creative portfolio like this one — I bring attention to detail and a passion for great user experiences.\n\nFeel free to ask me anything about my skills, projects, or experience!`,
};

export function ChatInterface({ initialQuery }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [currentTypingId, setCurrentTypingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, displayedText]);

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    if (initialQuery) {
      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: initialQuery,
      };
      setMessages([userMsg]);
      simulateResponse(userMsg.id);
    }
  }, [initialQuery]);

  const simulateResponse = (afterMessageId: string) => {
    setIsTyping(true);

    const responseId = crypto.randomUUID();
    const fullText = TYPING_RESPONSES.default;

    setTimeout(() => {
      setCurrentTypingId(responseId);
      setDisplayedText("");

      let i = 0;
      const interval = setInterval(() => {
        if (i < fullText.length) {
          const chunkSize =
            Math.random() > 0.7 ? 3 : Math.random() > 0.4 ? 2 : 1;
          setDisplayedText(fullText.slice(0, i + chunkSize));
          i += chunkSize;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setCurrentTypingId(null);
          setDisplayedText("");
          setMessages((prev) => [
            ...prev,
            { id: responseId, role: "assistant", content: fullText },
          ]);
        }
      }, 18);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    simulateResponse(userMsg.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex w-full max-w-2xl flex-col mx-auto"
      style={{ height: "calc(100vh - 140px)", marginTop: "8px" }}
    >
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-5 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]">
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.35,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-white/10 text-neutral-100 backdrop-blur-sm border border-white/6"
                    : "bg-neutral-800/40 text-neutral-200 backdrop-blur-sm border border-neutral-700/30"
                )}
              >
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles size={12} className="text-neutral-400" />
                    <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-500">
                      Tamerlan
                    </span>
                  </div>
                )}
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator / streaming text */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex justify-start"
            >
              <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed bg-neutral-800/40 text-neutral-200 backdrop-blur-sm border border-neutral-700/30">
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles size={12} className="text-neutral-400" />
                  <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-500">
                    Tamerlan
                  </span>
                </div>
                {currentTypingId && displayedText ? (
                  <p className="whitespace-pre-wrap">
                    {displayedText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="inline-block w-0.5 h-3.5 bg-neutral-400 ml-0.5 align-middle"
                    />
                  </p>
                ) : (
                  <div className="flex items-center gap-1.5 py-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                        className="h-1.5 w-1.5 rounded-full bg-neutral-500"
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Chat input bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="shrink-0 pb-4 pt-2 px-1"
      >
        <form onSubmit={handleSubmit}>
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
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              disabled={isTyping}
              className="min-w-0 flex-1 border-none bg-transparent text-base text-neutral-200 placeholder:text-neutral-500 outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
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
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
