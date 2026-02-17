"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";

interface StatBlockProps {
  stat: string;
  label: string;
  description?: string;
  index?: number;
  dark?: boolean;
}

export default function StatBlock({
  stat,
  label,
  description,
  index = 0,
  dark = false,
}: StatBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="space-y-2"
    >
      <span
        className={`block text-display-sm sm:text-display-md font-display font-bold tracking-tight ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        <CountUp
          value={stat}
          duration={1800}
          delay={index * 100 + 200}
        />
      </span>
      <span
        className={`block text-body-sm font-medium ${
          dark ? "text-white/60" : "text-ink-muted"
        }`}
      >
        {label}
      </span>
      {description && (
        <p
          className={`text-body-md mt-2 ${
            dark ? "text-white/70" : "text-ink-light"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
