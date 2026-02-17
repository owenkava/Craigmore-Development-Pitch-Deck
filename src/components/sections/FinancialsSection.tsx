"use client";

import { useState } from "react";
import SectionShell from "@/components/SectionShell";
import SectionNav from "@/components/SectionNav";
import FinancialTable from "@/components/FinancialTable";
import ChartBlock from "@/components/ChartBlock";
import StatBlock from "@/components/StatBlock";
import { financialsPremiumCondos, financialsMaxDensity, financialsTownhomes } from "@/data/deck";
import { motion, AnimatePresence } from "framer-motion";

interface FinancialsSectionProps {
  onNavigate: (index: number) => void;
}

const scenarioOptions = [
  { key: "premium-condos", label: "24 Premium Condos", data: financialsPremiumCondos },
  { key: "max-density", label: "38 Luxury Condos", data: financialsMaxDensity },
  { key: "townhomes", label: "12 Townhomes", data: financialsTownhomes },
] as const;

export default function FinancialsSection({ onNavigate }: FinancialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = scenarioOptions[activeIndex];
  const financials = active.data;
  const s = financials.summary;

  return (
    <SectionShell id="financials" index={5}>
      <div>
        <span className="section-label">Financial Projections</span>
        <h2 className="text-display-sm sm:text-display-md font-display font-bold tracking-tight text-ink mb-6">
          Returns, Costs & Timeline
        </h2>

        {/* Scenario toggle */}
        <div className="flex flex-wrap items-center gap-1 mb-10 bg-ink/5 rounded-full p-1 w-fit max-w-full">
          {scenarioOptions.map((option, i) => (
            <button
              key={option.key}
              onClick={() => setActiveIndex(i)}
              className={`relative px-3 md:px-5 py-2 rounded-full text-body-sm font-medium transition-colors duration-300 ${
                activeIndex === i
                  ? "text-white"
                  : "text-ink/50 hover:text-ink/70"
              }`}
            >
              {activeIndex === i && (
                <motion.div
                  layoutId="fin-scenario-bg"
                  className="absolute inset-0 bg-ink rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{option.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Key metrics row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <StatBlock stat={s.projectedIRR} label="Projected IRR" index={0} />
              <StatBlock stat={s.equityMultiple} label="Equity Multiple" index={1} />
              <StatBlock stat={s.netProfit} label="Net Profit" index={2} />
              <StatBlock stat={s.projectTimeline} label="Timeline" index={3} />
            </div>

            {/* Tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <FinancialTable
                title="Cost Breakdown"
                headers={["Item", "Amount", "% of Total"]}
                rows={financials.costBreakdown}
              />
              <FinancialTable
                title="Revenue Breakdown"
                headers={["Source", "Amount", "% of Total"]}
                rows={financials.revenueBreakdown}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <ChartBlock
                type="pie"
                title="Cost Distribution"
                data={financials.chartData.costPie}
              />
              <ChartBlock
                type="pie"
                title="Revenue Sources"
                data={financials.chartData.revenuePie}
              />
            </div>

            <div className="mb-12">
              <ChartBlock
                type="cashflow"
                title="Quarterly Cash Flow ($000s)"
                data={financials.chartData.cashflow}
                height={350}
              />
            </div>

            {/* Sensitivity */}
            <div className="mb-6">
              <h4 className="text-heading-md font-display font-semibold text-ink mb-4">
                Sensitivity Analysis
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-ink/10">
                      <th className="text-caption font-mono uppercase tracking-widest text-ink-muted pb-3 pr-4">
                        Scenario
                      </th>
                      <th className="text-caption font-mono uppercase tracking-widest text-ink-muted pb-3 pr-4 text-right">
                        IRR
                      </th>
                      <th className="text-caption font-mono uppercase tracking-widest text-ink-muted pb-3 pr-4 text-right">
                        Multiple
                      </th>
                      <th className="text-caption font-mono uppercase tracking-widest text-ink-muted pb-3 text-right">
                        Profit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {financials.sensitivity.map((row, i) => (
                      <motion.tr
                        key={row.scenario}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className={`border-b border-ink/5 ${
                          row.scenario === "Base Case" ? "font-semibold bg-surface-cool" : ""
                        }`}
                      >
                        <td className="py-3 pr-4 text-body-sm">{row.scenario}</td>
                        <td className="py-3 pr-4 text-body-sm text-right font-medium">
                          {row.irr}
                        </td>
                        <td className="py-3 pr-4 text-body-sm text-right">
                          {row.multiple}
                        </td>
                        <td className="py-3 text-body-sm text-right">
                          {row.profit}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Timeline — horizontal on desktop, vertical on mobile */}
            <div>
              <h4 className="text-heading-md font-display font-semibold text-ink mb-8">
                Project Timeline
              </h4>

              {/* Desktop: horizontal milestone line */}
              <div className="relative hidden sm:block pb-2">
                {/* Background line */}
                <div className="absolute top-[7px] left-0 right-0 h-0.5 bg-ink/10" />
                {/* Animated progress line */}
                <motion.div
                  className="absolute top-[7px] left-0 h-0.5 bg-accent origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                  style={{ width: "100%" }}
                />
                {/* Milestone nodes */}
                <div className="relative flex justify-between">
                  {financials.timeline.map((item, i) => (
                    <motion.div
                      key={item.phase}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.12, duration: 0.4 }}
                      className="flex flex-col items-center text-center"
                      style={{ width: `${100 / financials.timeline.length}%` }}
                    >
                      <div className="w-3.5 h-3.5 rounded-full bg-accent border-[2.5px] border-white shadow-sm flex-shrink-0 z-10" />
                      <span className="text-caption font-mono font-semibold text-accent mt-3 mb-1">
                        {item.phase}
                      </span>
                      <span className="text-caption text-ink-light leading-snug max-w-[140px]">
                        {item.milestone}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile: vertical timeline */}
              <div className="relative sm:hidden pl-5">
                {/* Vertical line */}
                <div className="absolute left-[6px] top-0 bottom-0 w-0.5 bg-ink/10" />
                <motion.div
                  className="absolute left-[6px] top-0 w-0.5 bg-accent origin-top"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                  style={{ height: "100%" }}
                />
                <div className="space-y-6">
                  {financials.timeline.map((item, i) => (
                    <motion.div
                      key={item.phase}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.12, duration: 0.4 }}
                      className="relative"
                    >
                      <div className="absolute -left-5 top-0.5 w-3 h-3 rounded-full bg-accent border-[2px] border-white shadow-sm z-10" />
                      <span className="block text-caption font-mono font-semibold text-accent mb-0.5">
                        {item.phase}
                      </span>
                      <span className="block text-caption text-ink-light leading-snug">
                        {item.milestone}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <SectionNav currentIndex={5} onNavigate={onNavigate} />
    </SectionShell>
  );
}
