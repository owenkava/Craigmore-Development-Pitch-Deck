"use client";

import SectionShell from "@/components/SectionShell";
import SectionNav from "@/components/SectionNav";
import { risks } from "@/data/deck";
import { motion } from "framer-motion";

interface RisksSectionProps {
  onNavigate: (index: number) => void;
}

const riskIcons: React.ReactNode[] = [
  // Market softening
  <svg key="market" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 9l-5 5-2-2-4 4"/></svg>,
  // Construction cost
  <svg key="cost" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  // Interest rate
  <svg key="rate" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8l-8 8"/><circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/></svg>,
  // Timeline
  <svg key="time" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
];

export default function RisksSection({ onNavigate }: RisksSectionProps) {
  return (
    <SectionShell id="risks" index={6}>
      <div>
        <span className="section-label">Risks &amp; Mitigations</span>
        <h2 className="text-display-sm sm:text-display-md font-display font-bold tracking-tight text-ink mb-3 max-w-3xl">
          Risks &amp; Mitigations
        </h2>
        <p className="text-body-lg text-ink-light max-w-2xl mb-12">
          Every development carries risk. Here is how Craigmore Drive is positioned to manage each one.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {risks.map((item, i) => (
            <motion.div
              key={item.risk}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-card p-6 shadow-card"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-cool flex items-center justify-center flex-shrink-0 text-accent">
                  {riskIcons[i]}
                </div>
                <div>
                  <h4 className="text-heading-md font-display font-semibold text-ink mb-2">
                    {item.risk}
                  </h4>
                  <p className="text-body-sm text-ink-light leading-relaxed">
                    {item.mitigation}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionNav currentIndex={6} onNavigate={onNavigate} />
    </SectionShell>
  );
}
