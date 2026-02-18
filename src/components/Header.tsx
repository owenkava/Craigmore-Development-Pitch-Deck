"use client";

import { motion } from "framer-motion";
import { sections } from "@/data/deck";
import { useState, useCallback } from "react";

interface HeaderProps {
  onNavigate: (index: number) => void;
  showGrid: boolean;
}

const PDF_FILENAME = "Craigmore Drive Investor Deck.pdf";

function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export default function Header({ onNavigate, showGrid }: HeaderProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const res = await fetch("/api/export-pdf");
      if (!res.ok) throw new Error("PDF export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      if (isMobileDevice()) {
        // Mobile: open PDF in browser viewer (enables native Share/Save)
        window.open(url, "_blank");
        // Delay revoke so the new tab has time to load the blob
        setTimeout(() => URL.revokeObjectURL(url), 60000);
      } else {
        // Desktop: trigger file download
        const a = document.createElement("a");
        a.href = url;
        a.download = PDF_FILENAME;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Download failed:", err);
      alert("PDF download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  }, [downloading]);

  // Quick-jump section indices
  const zoningIndex = sections.findIndex((s) => s.id === "zoning");
  const financialsIndex = sections.findIndex((s) => s.id === "financials");

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[240px] h-14 bg-white/90 backdrop-blur-sm border-b border-ink/5 z-30 flex items-center justify-between px-4 sm:px-6 pl-16 lg:pl-6 no-print">
      <div className="flex items-center gap-4">
        {!showGrid && (
          <>
            <button
              onClick={() => onNavigate(zoningIndex)}
              className="text-body-sm text-ink-muted hover:text-ink transition-colors hidden md:block"
            >
              Jump to Zoning
            </button>
            <span className="text-ink/10 hidden md:block">|</span>
            <button
              onClick={() => onNavigate(financialsIndex)}
              className="text-body-sm text-ink-muted hover:text-ink transition-colors hidden md:block"
            >
              Jump to Financials
            </button>
          </>
        )}
      </div>

      <motion.button
        onClick={handleDownload}
        disabled={downloading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 bg-ink text-white px-4 py-2.5 sm:py-2 rounded-lg text-body-sm font-medium hover:bg-ink-light transition-colors disabled:opacity-50 min-h-[44px] sm:min-h-0"
      >
        {downloading ? (
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx="8"
              cy="8"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="28"
              strokeDashoffset="8"
            />
          </motion.svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2v8m0 0l-3-3m3 3l3-3M3 12h10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {downloading ? "Exporting..." : "Download PDF"}
      </motion.button>
    </header>
  );
}
