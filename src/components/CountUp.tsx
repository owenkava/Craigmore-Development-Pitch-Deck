"use client";

import { useEffect, useRef, useCallback } from "react";
import { useInView } from "framer-motion";

/**
 * Parses a formatted stat string and extracts the numeric portion, prefix, and suffix.
 */
function parseStat(raw: string): {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
  hasCommas: boolean;
} | null {
  const trimmed = raw.trim();
  const match = trimmed.match(/^([^0-9]*?)([\d,]+(?:\.\d+)?)\s*(.*)$/);
  if (!match) return null;

  const prefix = match[1];
  const numStr = match[2];
  const suffix = match[3];

  if (suffix.includes("-") || numStr.includes("-")) return null;

  const hasCommas = numStr.includes(",");
  const cleanNum = numStr.replace(/,/g, "");
  const number = parseFloat(cleanNum);

  if (isNaN(number)) return null;

  const decimalPart = cleanNum.split(".")[1];
  const decimals = decimalPart ? decimalPart.length : 0;

  return { prefix, number, suffix, decimals, hasCommas };
}

/**
 * Formats a number to match the original display format.
 */
function formatNumber(
  value: number,
  decimals: number,
  hasCommas: boolean
): string {
  const fixed = value.toFixed(decimals);
  if (!hasCommas) return fixed;

  const [intPart, decPart] = fixed.split(".");
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decPart !== undefined ? `${withCommas}.${decPart}` : withCommas;
}

interface CountUpProps {
  /** The raw stat string, e.g. "$5,000,000", "24.1%", "1.9x" */
  value: string;
  /** Duration of the count-up animation in ms */
  duration?: number;
  /** Delay before starting the animation in ms */
  delay?: number;
  /** Custom className applied to the wrapper span */
  className?: string;
}

export default function CountUp({
  value,
  duration = 2000,
  delay = 0,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const hasAnimated = useRef(false);
  const rafId = useRef<number>(0);

  const parsed = parseStat(value);

  const animate = useCallback(() => {
    if (!parsed || hasAnimated.current || !ref.current) return;
    hasAnimated.current = true;

    const { prefix, number: target, suffix, decimals, hasCommas } = parsed;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Quintic ease-out — very smooth deceleration, less jitter than cubic
      const eased = 1 - Math.pow(1 - progress, 5);

      const current = eased * target;
      const formatted = formatNumber(current, decimals, hasCommas);

      // Direct DOM update — no React re-render per frame
      if (ref.current) {
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }

      if (progress < 1) {
        rafId.current = requestAnimationFrame(step);
      } else {
        // Ensure we land on the exact original value
        if (ref.current) {
          ref.current.textContent = value;
        }
      }
    };

    rafId.current = requestAnimationFrame(step);
  }, [parsed, duration, value]);

  useEffect(() => {
    if (isInView && parsed && !hasAnimated.current) {
      if (delay > 0) {
        const timer = setTimeout(animate, delay);
        return () => {
          clearTimeout(timer);
          if (rafId.current) cancelAnimationFrame(rafId.current);
        };
      } else {
        animate();
      }
    }
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isInView, parsed, delay, animate]);

  // If unparseable (e.g. a range like "30-36 months"), just show the raw value
  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {`${parsed.prefix}0${parsed.suffix}`}
    </span>
  );
}
