"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { AvatarProps } from "@/features/chat/types";

export function Avatar({
  src,
  alt = "Assistant",
  isThinking = false,
  size = "sm",
}: AvatarProps) {
  const sizeClasses = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-11 w-11",
  };

  const imageSizes = {
    sm: 28,
    md: 36,
    lg: 44,
  };

  return (
    <motion.div
      animate={{
        rotate: isThinking ? [0, -5, 5, -3, 0] : 0,
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
          : { duration: 0.2 }
      }
      className={cn(
        "shrink-0 rounded-full overflow-hidden ring-1 ring-neutral-700/50 mb-1",
        sizeClasses[size]
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={imageSizes[size]}
        height={imageSizes[size]}
        className="h-full w-full object-contain"
        priority={false}
      />
    </motion.div>
  );
}
