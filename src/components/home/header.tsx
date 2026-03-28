"use client";

import RotatingText from "@/components/ui/RotatingText";
import { topElementVariants } from "@/lib/animations";
import { LayoutGroup, motion, Transition } from "framer-motion";

export function Header() {
  return (
    <LayoutGroup>
      <motion.h2
        className="z-10 flex flex-wrap items-center text-3xl font-semibold text-white sm:text-4xl md:text-5xl lg:text-6xl"
        variants={topElementVariants}
        initial="hidden"
        animate="visible"
        aria-label={`Introduction: Hi, I am Tamerlan`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          className="mr-3"
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
            p-5
            rounded-2xl border border-neutral-700
            bg-neutral-800/30 backdrop-blur-lg
            text-neutral-200
            transition-all
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
