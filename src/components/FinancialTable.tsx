"use client";

import { motion } from "framer-motion";
import type { FinancialRow } from "@/data/deck";
import CountUp from "@/components/CountUp";

interface FinancialTableProps {
  title: string;
  headers: string[];
  rows: FinancialRow[];
}

export default function FinancialTable({ title, headers, rows }: FinancialTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full"
    >
      <h4 className="text-heading-md font-display font-semibold text-ink mb-4">
        {title}
      </h4>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-ink/10">
              {headers.map((h) => (
                <th
                  key={h}
                  className="text-caption font-mono uppercase tracking-widest text-ink-muted pb-3 pr-4 last:pr-0 last:text-right"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={row.label}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`border-b border-ink/5 ${
                  row.highlight
                    ? "font-semibold bg-surface-cool"
                    : ""
                }`}
              >
                <td className="py-3 pr-4 text-body-sm text-ink">{row.label}</td>
                {row.values.map((v, vi) => (
                  <td
                    key={vi}
                    className={`py-3 text-body-sm text-right ${
                      vi === 0 ? "font-medium text-ink pr-4" : "text-ink-muted"
                    }`}
                  >
                    <CountUp
                      value={String(v)}
                      duration={1400}
                      delay={i * 80 + vi * 100}
                    />
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
