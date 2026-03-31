"use client";

import { useState } from "react";
import { Info, X, MessageCircle, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function WelcomeModal() {
  const [open, setOpen] = useState(false);

  const handleStartChatting = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Floating Trigger Button */}
      <DialogTrigger asChild>
        <button
          className="
            fixed top-6 right-6 z-50
            flex size-10 sm:size-12 items-center justify-center text-white
            border-neutral-700 hover:bg-neutral-700/30 aspect-square rounded-lg sm:rounded-xl border bg-neutral-800/30 shadow-none backdrop-blur-lg active:scale-95
          "
          aria-label="Open welcome modal"
        >
          <Info className="size-5" />
        </button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent
        className="
          w-[95vw] max-w-250
          sm:w-[90vw] sm:max-w-200
          md:w-[85vw] md:max-w-175
          lg:w-[80vw] lg:max-w-162.5
          
          rounded-2xl border border-neutral-800
          bg-neutral-900
          text-neutral-200
          shadow-2xl
          p-0
          overflow-hidden
          focus:outline-none
          
          /* Hide default shadcn close button */
          [&>button]:hidden
        "
      >
        <div className="flex flex-col gap-6 p-8 md:p-10">
          {/* Header Section - Using DialogTitle */}
          <div className="space-y-2 pr-8">
            <DialogTitle className="text-3xl font-bold tracking-tight text-white">
              Welcome to AI Portfolio
            </DialogTitle>
            <DialogDescription className="text-neutral-400 text-base">
              An interactive way to explore my work and experience.
            </DialogDescription>
          </div>

          {/* Custom Close Button */}
          <DialogClose
            className="
              absolute right-4 top-4
              rounded-lg p-2
              text-neutral-400
              transition-colors
              hover:bg-neutral-800 hover:text-white
              z-10
            "
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>

          {/* Content Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Section 1: What */}
            <div className="space-y-3 rounded-xl bg-neutral-800/50 p-5 border border-neutral-800">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-xs">
                  1
                </span>
                What is this?
              </h3>
              <p className="text-sm leading-relaxed text-neutral-400">
                I'm so excited to present my brand new AI Portfolio. Whether
                you're a recruiter, a friend, family member, or just curious,
                feel free to ask anything you want!
              </p>
            </div>

            {/* Section 2: Why */}
            <div className="space-y-3 rounded-xl bg-neutral-800/50 p-5 border border-neutral-800">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                  2
                </span>
                Why this?
              </h3>
              <p className="text-sm leading-relaxed text-neutral-400">
                Traditional portfolios can be limiting. They can't adapt to
                every visitor's specific needs. My portfolio becomes exactly
                what you're interested in knowing about me and my work.
              </p>
            </div>
          </div>

          {/* Footer / Actions */}
          <div className="mt-2 flex flex-col gap-4 border-t border-neutral-800 pt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleStartChatting}
                className="
                  flex-1 h-12 text-base
                  bg-white text-neutral-900
                  hover:bg-neutral-200
                  border-0
                "
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Chatting
              </Button>

              <Button
                variant="outline"
                onClick={() => (window.location.href = "mailto:your@email.com")}
                className="
                  flex-1 h-12 text-base
                  border-neutral-700 bg-transparent
                  text-neutral-300
                  hover:bg-neutral-800 hover:text-white
                "
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact me
              </Button>
            </div>

            <p className="text-center text-xs text-neutral-500">
              If you love it, please share it! Feedback is always welcome.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
