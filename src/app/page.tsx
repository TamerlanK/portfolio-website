"use client";

import { Header, Memoji, QuickQuestions, SearchForm } from "@/components/home";
import { WelcomeModal } from "@/components/home/welcome-modal";
import Galaxy from "@/components/ui/Galaxy";
import { bottomElementVariants } from "@/lib/animations";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleChatNavigation = (query: string) => {
    router.push(`/chat?query=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <WelcomeModal />
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden gap-12 px-4">
        <Header />
        <Memoji />
        <motion.div
          variants={bottomElementVariants}
          initial="hidden"
          animate="visible"
          className="z-10 flex w-full flex-col gap-6 items-center justify-center md:px-0"
        >
          <SearchForm onSubmit={handleChatNavigation} />
          <QuickQuestions onQuestionSelect={handleChatNavigation} />
        </motion.div>
      </div>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none bg-black">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>
    </>
  );
}
