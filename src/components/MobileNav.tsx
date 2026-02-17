"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sections } from "@/data/deck";

interface MobileNavProps {
  activeSection: number;
  onNavigate: (index: number) => void;
  showGrid: boolean;
  onShowGrid: () => void;
}

export default function MobileNav({
  activeSection,
  onNavigate,
  showGrid,
  onShowGrid,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  const handleNav = (i: number) => {
    onNavigate(i);
    setOpen(false);
  };

  return (
    <nav className="lg:hidden no-print" role="navigation" aria-label="Mobile navigation">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-3 left-4 z-50 w-10 h-10 bg-white/95 backdrop-blur-sm border border-ink/10 rounded-lg flex items-center justify-center"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
      >
        <motion.div animate={open ? "open" : "closed"} className="space-y-1.5" aria-hidden="true">
          <motion.div
            className="w-5 h-0.5 bg-ink rounded"
            variants={{
              open: { rotate: 45, y: 4 },
              closed: { rotate: 0, y: 0 },
            }}
          />
          <motion.div
            className="w-5 h-0.5 bg-ink rounded"
            variants={{
              open: { opacity: 0 },
              closed: { opacity: 1 },
            }}
          />
          <motion.div
            className="w-5 h-0.5 bg-ink rounded"
            variants={{
              open: { rotate: -45, y: -4 },
              closed: { rotate: 0, y: 0 },
            }}
          />
        </motion.div>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-[280px] bg-white z-50 py-6 shadow-xl"
            >
              <button
                onClick={() => {
                  onShowGrid();
                  setOpen(false);
                }}
                className="px-6 mb-6 flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-ink rounded-md flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white">
                    <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" />
                    <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" />
                    <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" />
                    <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-body-sm font-medium">Overview</span>
              </button>

              <div className="px-3 space-y-0.5">
                {sections.map((section, i) => (
                  <button
                    key={section.id}
                    onClick={() => handleNav(i)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 ${
                      !showGrid && activeSection === i
                        ? "bg-surface-cool text-ink"
                        : "text-ink-muted"
                    }`}
                  >
                    <span className="w-5 text-caption font-mono">{section.tileIcon}</span>
                    <span className="text-body-sm font-medium">{section.navLabel}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
