"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import SectionNav from "@/components/SectionNav";
import CountUp from "@/components/CountUp";
import { closing, closingScenarios } from "@/data/deck";

interface ClosingSectionProps {
  onNavigate: (index: number) => void;
}

export default function ClosingSection({ onNavigate }: ClosingSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = closingScenarios[activeIndex];

  return (
    <SectionShell id="closing" index={7} dark>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="block text-caption font-mono uppercase tracking-widest text-white/40 mb-4">
            Investment Opportunity
          </span>
          <h2 className="text-display-sm sm:text-display-md md:text-display-lg font-display font-bold tracking-tight text-white mb-6">
            Let&apos;s Build Together
          </h2>
        </motion.div>

        {/* ── Scenario Toggle ── */}
        <div className="flex flex-wrap items-center gap-1 mb-6 bg-white/10 rounded-full p-1 w-fit max-w-full">
          {closingScenarios.map((scenario, i) => (
            <button
              key={scenario.key}
              onClick={() => setActiveIndex(i)}
              className={`relative px-3 md:px-5 py-2 rounded-full text-body-sm font-medium transition-colors duration-300 ${
                activeIndex === i
                  ? "text-ink"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              {activeIndex === i && (
                <motion.div
                  layoutId="closing-scenario-bg"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{scenario.label}</span>
            </button>
          ))}
        </div>

        <p className="text-body-lg text-white/60 max-w-2xl mb-10">
          Citra Capital is raising{" "}
          <span className="text-white font-semibold">{active.capitalAsk}</span>{" "}
          in equity to acquire and develop Craigmore Drive —{" "}
          <span className="text-white/80">{active.label}</span>.
        </p>

        {/* ── Scenario Content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* ── Column 1: Capital Ask ── */}
              <div className="space-y-4">
                <h4 className="text-heading-md font-display font-semibold text-white">
                  Capital Ask
                </h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-display-sm font-display font-bold text-white">
                      <CountUp value={active.capitalAsk} duration={2000} delay={300} />
                    </span>
                    <span className="block text-body-sm text-white/40 mt-1">
                      Minimum:{" "}
                      <CountUp
                        value={active.minimumInvestment}
                        duration={1500}
                        delay={500}
                      />
                    </span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between items-baseline">
                    <span className="text-body-sm text-white/50">Structure</span>
                    <span className="text-body-sm text-white/80 text-right">
                      {active.structure}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-body-sm text-white/50">Target Close</span>
                    <span className="text-body-sm text-white/80">
                      {active.targetClose}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-body-sm text-white/50">Equity Offered</span>
                    <span className="text-body-sm text-white/80 text-right">
                      {active.equityOffered}
                    </span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <p className="text-body-sm text-white/60 leading-relaxed">
                    {active.investorTerms}
                  </p>
                </div>

                {/* Contact Us button */}
                <div className="mt-10">
                  <a
                    href="mailto:sam@citracapital.ca?subject=Craigmore%20Drive%20Investment%20Inquiry"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-white text-white font-display font-semibold text-body-sm hover:bg-white hover:text-ink transition-all duration-300"
                  >
                    Contact Us
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* ── Column 2: Use of Funds ── */}
              <div className="space-y-4">
                <h4 className="text-heading-md font-display font-semibold text-white">
                  Use of Funds
                </h4>
                <div className="space-y-3">
                  {active.useOfFunds.map((item, i) => (
                    <div
                      key={item.label}
                      className="flex justify-between items-baseline gap-4"
                    >
                      <span className="text-body-sm text-white/50">
                        {item.label}
                      </span>
                      <span className="text-body-sm text-white/80 font-medium tabular-nums whitespace-nowrap">
                        <CountUp
                          value={item.amount}
                          duration={1500}
                          delay={400 + i * 100}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Column 3: Timeline ── */}
              <div className="space-y-4">
                <h4 className="text-heading-md font-display font-semibold text-white">
                  Key Dates
                </h4>
                <div className="space-y-3">
                  {active.timeline.map((item) => (
                    <div key={item.event} className="flex items-start gap-3">
                      <span className="text-body-sm font-mono text-white min-w-[100px] flex-shrink-0">
                        {item.date}
                      </span>
                      <span className="text-body-sm text-white/60">
                        {item.event}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Contact (static) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="text-heading-md font-display font-semibold text-white mb-1">
                {closing.contact.name}
              </h4>
              <p className="text-body-sm text-white/50">
                {closing.contact.title}
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-1">
              <a
                href={`mailto:${closing.contact.email}`}
                className="text-body-sm text-white/60 hover:text-white transition-colors"
              >
                {closing.contact.email}
              </a>
              <a
                href={`tel:${closing.contact.phone.replace(/[^+\d]/g, "")}`}
                className="text-body-sm text-white/60 hover:text-white transition-colors"
              >
                {closing.contact.phone}
              </a>
            </div>
          </div>

          <p className="text-caption text-white/50 mt-8 max-w-3xl">
            {closing.disclaimer}
          </p>
        </motion.div>

        {/* Nav with light text overrides */}
        <div className="[&_button]:text-white/40 [&_button:hover]:text-white/70 [&_div]:bg-white/10 [&_.bg-ink]:bg-white">
          <SectionNav currentIndex={7} onNavigate={onNavigate} />
        </div>

        {/* Credit line */}
        <p className="text-center text-caption text-white/50 mt-12">
          Do you want a pitch deck like this? Contact{" "}
          <a
            href="https://thevisitor.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 font-semibold uppercase tracking-wide underline hover:text-white transition-colors"
          >
            THE VISITOR
          </a>
        </p>
      </div>
    </SectionShell>
  );
}
