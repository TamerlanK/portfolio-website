"use client"

import { useChat } from "@/features/chat/lib/chat-store"
import { bottomElementVariants } from "@/lib/animations"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"

import { ChatInterface, QuestionsDrawer } from "@/features/chat/components"
import {
  Header,
  Memoji,
  QuickQuestions,
  SearchForm,
  WelcomeModal,
} from "@/features/home/components"
import { SiteBackground } from "@/components/site-background"

export default function Home() {
  const { state, startChat, goHome, isThinking } = useChat()

  const avatarSrc = isThinking ? "/memoji-thinking.png" : "/memoji.png"

  return (
    <>
      <WelcomeModal />
      <QuestionsDrawer />

      <div className="relative flex min-h-screen flex-col items-center overflow-hidden">
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
            state.mode === "landing"
              ? "z-10 flex items-center justify-center flex-1 w-full"
              : "z-10 shrink-0 flex items-center justify-center w-full pt-5 pb-2"
          }
        >
          <AnimatePresence mode="wait">
            {state.mode === "landing" ? (
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
                onClick={goHome}
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
                <motion.div
                  animate={{
                    rotate: isThinking ? [0, -6, 6, -3, 0] : 0,
                  }}
                  transition={
                    isThinking
                      ? {
                          rotate: {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }
                      : { duration: 0.25 }
                  }
                  className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-neutral-700/50 transition-all duration-300 group-hover:ring-neutral-500/70 group-hover:scale-105 flex items-center justify-center"
                >
                  <Image
                    src={avatarSrc}
                    alt="Tamerlan"
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </motion.div>

                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="
      mt-1
      w-14 text-center
      text-[10px]
      font-medium uppercase tracking-widest
      text-neutral-500 -ml-1
    "
                >
                  Tamerlan
                </motion.span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {state.mode === "landing" ? (
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
              <SearchForm onSubmit={startChat} />
              <QuickQuestions />
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
              <ChatInterface />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SiteBackground />
    </>
  )
}
