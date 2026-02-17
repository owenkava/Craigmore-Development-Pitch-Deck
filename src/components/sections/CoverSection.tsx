"use client";

import { motion } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import SectionNav from "@/components/SectionNav";
import { cover } from "@/data/deck";

interface CoverSectionProps {
  onNavigate: (index: number) => void;
}

export default function CoverSection({ onNavigate }: CoverSectionProps) {
  return (
    <SectionShell id="cover" index={0}>
      {/* Background hero image */}
      {cover.backgroundImage && (
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover.backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40" />
        </div>
      )}

      <div className={`flex flex-col justify-center min-h-[60vh] ${cover.backgroundImage ? "relative z-10" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="section-label">{cover.location}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-display-md sm:text-display-lg md:text-display-xl font-display font-bold tracking-tight text-ink text-balance whitespace-pre-line"
        >
          {cover.headline}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center gap-2 sm:gap-4"
        >
          <span className="text-body-md sm:text-body-lg text-ink-light">{cover.tagline}</span>
          <span className="w-1 h-1 rounded-full bg-ink-muted hidden sm:block" />
          <span className="text-body-md sm:text-body-lg text-ink-muted">{cover.date}</span>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-px bg-ink/10 mt-12 origin-left"
        />
      </div>

      <SectionNav currentIndex={0} onNavigate={onNavigate} />
    </SectionShell>
  );
}
