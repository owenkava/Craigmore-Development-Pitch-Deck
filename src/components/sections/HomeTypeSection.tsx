"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionNav from "@/components/SectionNav";
import HomeCard from "@/components/HomeCard";
import { premiumCondoUnit, maxDensityCondoUnit, townhomeUnit } from "@/data/deck";

interface HomeTypeSectionProps {
  onNavigate: (index: number) => void;
}

const scenarios = [
  {
    key: "premium-condos",
    label: "24 Premium Condos",
    bg: "#023E40",
    isDark: true,
    data: premiumCondoUnit,
  },
  {
    key: "max-density",
    label: "38 Luxury Condos",
    bg: "#124546",
    isDark: true,
    data: maxDensityCondoUnit,
  },
  {
    key: "townhomes",
    label: "12 Townhomes",
    bg: "#D0ECED",
    isDark: false,
    data: townhomeUnit,
  },
] as const;

export default function HomeTypeSection({ onNavigate }: HomeTypeSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = scenarios[activeIndex];
  const isDark = active.isDark;

  // Dynamic text classes based on active scenario
  const toggleBg = isDark ? "bg-white/10" : "bg-ink/10";
  const toggleActive = isDark ? "text-ink" : "text-white";
  const toggleInactive = isDark
    ? "text-white/60 hover:text-white/80"
    : "text-ink/50 hover:text-ink/70";
  const togglePillBg = isDark ? "bg-white" : "bg-ink";
  const navOverrides = isDark
    ? "[&_button]:text-white/40 [&_button:hover]:text-white/70 [&_div]:bg-white/10 [&_.bg-ink]:bg-white"
    : "[&_button]:text-ink/40 [&_button:hover]:text-ink/70 [&_div]:bg-ink/10";

  return (
    <section
      id="homes"
      className="snap-section min-h-screen w-full flex items-center justify-center relative"
      data-section-index={4}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: active.bg }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 relative z-10 ${
          isDark ? "text-white" : "text-ink"
        }`}
      >
        <div>
          {/* Scenario toggle */}
          <div className={`flex flex-wrap items-center gap-1 mb-6 sm:mb-8 lg:mb-10 ${toggleBg} rounded-full p-1 w-fit max-w-full`}>
            {scenarios.map((scenario, i) => (
              <button
                key={scenario.key}
                onClick={() => setActiveIndex(i)}
                className={`relative px-3 md:px-5 py-2 rounded-full text-body-sm font-medium transition-colors duration-300 ${
                  activeIndex === i ? toggleActive : toggleInactive
                }`}
              >
                {activeIndex === i && (
                  <motion.div
                    layoutId="home-scenario-bg"
                    className={`absolute inset-0 ${togglePillBg} rounded-full`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{scenario.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <HomeCard home={active.data} dark={isDark} />
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <div className={navOverrides}>
            <SectionNav currentIndex={4} onNavigate={onNavigate} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
