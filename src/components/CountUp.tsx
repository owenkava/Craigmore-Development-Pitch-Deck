"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "framer-motion";

/**
 * Parses a formatted stat string and extracts the numeric portion, prefix, and suffix.
 *
 * Examples:
 *   "$5,000,000"  → { prefix: "$", number: 5000000, suffix: "", decimals: 0, formatted: "5,000,000" }
 *   "24.1%"       → { prefix: "",  number: 24.1,    suffix: "%", decimals: 1, formatted: "24.1" }
 *   "1.9x"        → { prefix: "",  number: 1.9,     suffix: "x", decimals: 1, formatted: "1.9" }
 *   "$6.3M"       → { prefix: "$", number: 6.3,     suffix: "M", decimals: 1, formatted: "6.3" }
 *   "12,000"      → { prefix: "",  number: 12000,   suffix: "", decimals: 0, formatted: "12,000" }
 *   "85%+"        → { prefix: "",  number: 85,      suffix: "%+", decimals: 0, formatted: "85" }
 *   "2.4km"       → { prefix: "",  number: 2.4,     suffix: "km", decimals: 1, formatted: "2.4" }
 *   "22%+"        → { prefix: "",  number: 22,      suffix: "%+", decimals: 0, formatted: "22" }
 *   "30-36 months" → null (range, not a single number — display as-is)
 */
function parseStat(raw: string): {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
  hasCommas: boolean;
} | null {
  const trimmed = raw.trim();

  // Match: optional prefix ($), number with optional commas and decimals, optional suffix
  const match = trimmed.match(
    /^([^0-9]*?)([\d,]+(?:\.\d+)?)\s*(.*)$/
  );

  if (!match) return null;

  const prefix = match[1];
  const numStr = match[2];
  const suffix = match[3];

  // Skip if the "number" part contains a dash (range like "30-36")
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
  duration = 1800,
  delay = 0,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(value);
  const hasAnimated = useRef(false);

  const parsed = parseStat(value);

  const animate = useCallback(() => {
    if (!parsed || hasAnimated.current) return;
    hasAnimated.current = true;

    const { prefix, number: target, suffix, decimals, hasCommas } = parsed;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = eased * target;
      const formatted = formatNumber(current, decimals, hasCommas);
      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Ensure we land on the exact original value
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(step);
  }, [parsed, duration, value]);

  useEffect(() => {
    if (isInView && parsed && !hasAnimated.current) {
      if (delay > 0) {
        const timer = setTimeout(animate, delay);
        return () => clearTimeout(timer);
      } else {
        animate();
      }
    }
  }, [isInView, parsed, delay, animate]);

  // If unparseable (e.g. a range like "30-36 months"), just show the raw value
  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {isInView ? displayValue : `${parsed.prefix}0${parsed.suffix}`}
    </span>
  );
}
