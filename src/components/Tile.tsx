"use client";

import { motion } from "framer-motion";

interface TileProps {
  number: string;
  title: string;
  subtitle?: string;
  onClick: () => void;
  index: number;
}

export default function Tile({ number, title, subtitle, onClick, index }: TileProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative text-left w-full bg-white rounded-card p-6 md:p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300 cursor-pointer overflow-hidden"
    >
      {/* Animated background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-surface-cool to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden
      />

      <div className="relative z-10">
        {/* Number */}
        <span className="block text-caption font-mono text-ink-muted mb-4 tracking-widest">
          {number}
        </span>

        {/* Animated line */}
        <motion.div
          className="h-px bg-ink/10 mb-4 origin-left"
          initial={{ scaleX: 0.3 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Title */}
        <h3 className="text-heading-lg font-display font-semibold text-ink mb-1 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>

        {subtitle && (
          <p className="text-body-sm text-ink-muted">{subtitle}</p>
        )}

        {/* Arrow indicator */}
        <motion.div
          className="mt-4 flex items-center gap-1 text-ink-muted group-hover:text-accent transition-colors duration-300"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
        >
          <span className="text-body-sm font-medium">View</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.button>
  );
}
