"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { type ResponseImagesProps } from "@/features/chat/types";

export function ResponseImages({ images }: ResponseImagesProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 mt-3",
        "overflow-x-auto pb-1 scrollbar-hide"
      )}
      role="group"
      aria-label="Response images"
    >
      {images.map((image, index) => (
        <motion.div
          key={image.src}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
            delay: index * 0.05,
          }}
          className="relative overflow-hidden rounded-xl border border-neutral-700/30"
        >
          <Image
            src={image.src}
            alt={image.alt || "Response image"}
            width={280}
            height={180}
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 280px"
          />
        </motion.div>
      ))}
    </div>
  );
}
