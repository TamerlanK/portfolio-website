"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type StreamingCursorProps } from "@/features/chat/types";

export function StreamingCursor({ className }: StreamingCursorProps) {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className={cn(
        "inline-block w-0.5 h-3.5 bg-neutral-400 ml-0.5 align-middle",
        className
      )}
      aria-hidden="true"
    />
  );
}
