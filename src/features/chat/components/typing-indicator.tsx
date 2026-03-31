"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type TypingIndicatorProps } from "@/features/chat/types";

export function TypingIndicator({
  dotCount = 3,
  className,
}: TypingIndicatorProps) {
  return (
    <div
      className={cn("flex items-center gap-1.5 py-0.5", className)}
      role="status"
      aria-label="Assistant is typing"
      aria-live="polite"
    >
      {Array.from({ length: dotCount }).map((_, index) => (
        <motion.div
          key={index}
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 0.55,
            repeat: Infinity,
            delay: index * 0.13,
            ease: "easeInOut",
          }}
          className="h-1.5 w-1.5 rounded-full bg-neutral-500"
        />
      ))}
    </div>
  );
}
