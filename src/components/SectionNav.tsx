"use client";

import { motion } from "framer-motion";
import { sections } from "@/data/deck";

interface SectionNavProps {
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function SectionNav({ currentIndex, onNavigate }: SectionNavProps) {
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < sections.length - 1;

  return (
    <div className="flex items-center justify-between mt-12 pt-6 border-t border-ink/5">
      <button
        onClick={() => hasPrev && onNavigate(currentIndex - 1)}
        disabled={!hasPrev}
        className={`flex items-center gap-2 text-body-sm font-medium transition-colors ${
          hasPrev
            ? "text-ink-muted hover:text-ink"
            : "text-ink-muted/30 cursor-not-allowed"
        }`}
        aria-label="Previous section"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 3l-5 5 5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {hasPrev && sections[currentIndex - 1].navLabel}
      </button>

      {/* Dots */}
      <div className="flex items-center gap-0.5">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            aria-label={`Go to ${sections[i].navLabel}`}
            className="p-2"
          >
            <motion.div
              className={`rounded-full transition-colors ${
                i === currentIndex
                  ? "bg-ink w-6 h-1.5"
                  : "bg-ink/15 w-1.5 h-1.5 hover:bg-ink/30"
              }`}
              layout
              transition={{ duration: 0.3 }}
            />
          </button>
        ))}
      </div>

      <button
        onClick={() => hasNext && onNavigate(currentIndex + 1)}
        disabled={!hasNext}
        className={`flex items-center gap-2 text-body-sm font-medium transition-colors ${
          hasNext
            ? "text-ink-muted hover:text-ink"
            : "text-ink-muted/30 cursor-not-allowed"
        }`}
        aria-label="Next section"
      >
        {hasNext && sections[currentIndex + 1].navLabel}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6 3l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
