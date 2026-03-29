"use client";

import { Header, Memoji, QuickQuestions, SearchForm } from "@/components/home";
import { ChatInterface } from "@/components/home/chat-interface";
import { WelcomeModal } from "@/components/home/welcome-modal";
import Galaxy from "@/components/ui/Galaxy";
import { bottomElementVariants } from "@/lib/animations";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback } from "react";

type ViewMode = "landing" | "chat";

export default function Home() {
  const [mode, setMode] = useState<ViewMode>("landing");
  const [chatQuery, setChatQuery] = useState("");

  const handleChatNavigation = useCallback((query: string) => {
    setChatQuery(query);
    setMode("chat");
  }, []);

  const handleBackToLanding = useCallback(() => {
    setMode("landing");
    setChatQuery("");
  }, []);

  return (
    <>
      <WelcomeModal />

      <div className="relative flex min-h-screen flex-col items-center overflow-hidden">
        {/* ── Top bar: Memoji avatar (animates to top in chat mode) ── */}
        <motion.div
          layout
          transition={{
            layout: {
              type: "spring",
              damping: 28,
              stiffness: 280,
              mass: 0.8,
            },
          }}
          className={
            mode === "landing"
              ? "z-10 flex items-center justify-center flex-1 w-full"
              : "z-10 shrink-0 flex items-center justify-center w-full pt-5 pb-2"
          }
        >
          <AnimatePresence mode="wait">
            {mode === "landing" ? (
              <motion.div
                key="landing-content"
                className="flex flex-col items-center gap-12"
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  transition: { duration: 0.3, ease: "easeInOut" },
                }}
              >
                <Header />
                <Memoji />
              </motion.div>
            ) : (
              <motion.button
                key="chat-avatar"
                onClick={handleBackToLanding}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  damping: 22,
                  stiffness: 300,
                  delay: 0.05,
                }}
                className="group relative cursor-pointer"
                aria-label="Back to home"
              >
                <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-neutral-700/50 transition-all duration-300 group-hover:ring-neutral-500/70 group-hover:scale-105">
                  <Image
                    src="/memoji.png"
                    alt="Tamerlan"
                    width={56}
                    height={56}
                    className="h-full w-full object-contain"
                  />
                </div>
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="block text-center text-[10px] font-medium uppercase tracking-widest text-neutral-500 mt-1.5"
                >
                  Tamerlan
                </motion.span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {mode === "landing" ? (
            <motion.div
              key="landing-bottom"
              variants={bottomElementVariants}
              initial="hidden"
              animate="visible"
              exit={{
                opacity: 0,
                y: 30,
                transition: { duration: 0.25, ease: "easeInOut" },
              }}
              className="z-10 flex w-full shrink-0 flex-col gap-3 md:gap-6 items-center justify-center px-4 md:px-0 pb-12"
            >
              <SearchForm onSubmit={handleChatNavigation} />
              <QuickQuestions onQuestionSelect={handleChatNavigation} />
            </motion.div>
          ) : (
            <motion.div
              key="chat-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.2 },
              }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="z-10 flex-1 w-full px-4 md:px-0"
            >
              <ChatInterface initialQuery={chatQuery} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="fixed top-0 left-0 w-full h-full bg-black z-0">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={0.5}
          starSpeed={0.5}
          speed={1}
        />
      </div>
    </>
  );
}
