"use client";

import Image from "next/image";

export function Memoji() {
  return (
    <div className="relative z-10 mx-auto flex h-52 w-52 items-center justify-center overflow-hidden rounded-full sm:h-72 sm:w-72">
      <Image
        src="/memoji.png"
        alt="Hero memoji"
        width={500}
        height={500}
        priority
        className="h-full w-full object-contain"
      />
    </div>
  );
}
