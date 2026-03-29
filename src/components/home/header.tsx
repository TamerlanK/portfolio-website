"use client";

import RotatingText from "@/components/ui/RotatingText";
import { topElementVariants } from "@/lib/animations";
import { LayoutGroup, motion, Transition } from "framer-motion";

export function Header() {
  return (
    <LayoutGroup>
      <motion.h2
        className="
          z-10
          flex flex-col sm:flex-row
          items-center sm:items-baseline
          justify-center sm:justify-start
          text-center sm:text-left
          font-semibold text-white
          leading-tight
          whitespace-normal
        "
        style={{
          fontSize: "clamp(1.5rem, 4vw, 3.5rem)", // 🔥 fluid scaling
        }}
        variants={topElementVariants}
        initial="hidden"
        animate="visible"
        aria-label="Introduction: Hi, I am Tamerlan"
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          className="
            mb-2 sm:mb-0
            sm:mr-3
          "
        >
          Hi, I am
        </motion.span>

        <RotatingText
          texts={[
            "Tamerlan",
            "a Full-Stack Developer",
            "a Tech Enthusiast",
            "a JavaScript Lover",
          ]}
          mainClassName="
            px-4 py-2 sm:px-5 sm:py-3
            rounded-xl sm:rounded-2xl
            border border-neutral-700
            bg-neutral-800/30 backdrop-blur-lg
            text-neutral-200
            transition-all
            text-center
          "
          splitLevelClassName="
            overflow-hidden
            transition-all duration-300
          "
          staggerFrom="last"
          staggerDuration={0.025}
          rotationInterval={2000}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          transition={
            { type: "spring", damping: 30, stiffness: 400 } as Transition
          }
        />
      </motion.h2>
    </LayoutGroup>
  );
}
