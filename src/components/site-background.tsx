"use client"

import LiquidEther from "@/components/LiquidEther"

export function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        mouseForce={12}
        cursorSize={65}
        isViscous
        viscous={30}
        iterationsViscous={50}
        iterationsPoisson={12}
        resolution={0.5}
        isBounce={false}
        autoDemo
        autoSpeed={0.15}
        autoIntensity={3.6}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
        color0="#3f3c48"
        color1="#e6bee5"
        color2="#B497CF"
      />
      <div className="absolute inset-0 bg-black/35" />
    </div>
  )
}
