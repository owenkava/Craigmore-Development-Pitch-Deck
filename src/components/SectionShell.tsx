"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { theme } from "@/lib/theme";

interface SectionShellProps {
  id: string;
  index: number;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export default function SectionShell({
  id,
  index,
  children,
  className = "",
  dark = false,
}: SectionShellProps) {
  const bg = theme.sectionBackgrounds[index] ?? "#ffffff";
  const isDark = dark || bg === "#023E40";

  return (
    <section
      id={id}
      className={`snap-section min-h-screen w-full flex items-center justify-center relative ${className}`}
      style={{ backgroundColor: bg }}
      data-section-index={index}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`w-full max-w-[1200px] mx-auto px-4 md:px-8 py-16 md:py-24 ${
          isDark ? "text-white" : "text-ink"
        }`}
      >
        {children}
      </motion.div>
    </section>
  );
}
