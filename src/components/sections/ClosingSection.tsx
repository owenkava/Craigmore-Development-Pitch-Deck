"use client";

import { motion } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import SectionNav from "@/components/SectionNav";
import CountUp from "@/components/CountUp";
import { closing } from "@/data/deck";

interface ClosingSectionProps {
  onNavigate: (index: number) => void;
}

export default function ClosingSection({ onNavigate }: ClosingSectionProps) {
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
          <h2 className="text-display-lg font-display font-bold tracking-tight text-white mb-4">
            Let&apos;s Build Together
          </h2>
          <p className="text-body-lg text-white/60 max-w-2xl">
            Citra Capital is raising {closing.capitalAsk} to acquire and develop
            Craigmore Drive — an upzoned residential site in Halifax.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Capital Ask */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-heading-md font-display font-semibold text-white">
              Capital Ask
            </h4>
            <div className="space-y-3">
              <div>
                <span className="text-display-sm font-display font-bold text-white">
                  <CountUp value={closing.capitalAsk} duration={2000} delay={300} />
                </span>
                <span className="block text-body-sm text-white/40 mt-1">
                  Minimum: <CountUp value={closing.minimumInvestment} duration={1500} delay={500} />
                </span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex justify-between">
                <span className="text-body-sm text-white/50">Structure</span>
                <span className="text-body-sm text-white/80">{closing.structure}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-body-sm text-white/50">Target Close</span>
                <span className="text-body-sm text-white/80">{closing.targetClose}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-body-sm text-white/50">Equity Offered</span>
                <span className="text-body-sm text-white/80">{closing.equityOffered}</span>
              </div>
              <div className="h-px bg-white/10" />
              <p className="text-body-sm text-white/60 leading-relaxed">
                {closing.investorTerms}
              </p>
            </div>

            {/* Contact Us button */}
            <div className="mt-10">
              <a
                href="mailto:sam@citracapital.ca?subject=Craigmore%20Drive%20Investment%20Inquiry"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-white text-white font-display font-semibold text-body-sm hover:bg-white hover:text-ink transition-all duration-300"
              >
                Contact Us
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Use of Funds */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-heading-md font-display font-semibold text-white">
              Use of Funds
            </h4>
            <div className="space-y-3">
              {closing.useOfFunds.map((item, i) => (
                <div key={item.label} className="flex justify-between items-baseline">
                  <span className="text-body-sm text-white/50">{item.label}</span>
                  <span className="text-body-sm text-white/80 font-medium">
                    <CountUp value={item.amount} duration={1500} delay={400 + i * 100} />
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-heading-md font-display font-semibold text-white">
              Key Dates
            </h4>
            <div className="space-y-3">
              {closing.timeline.map((item) => (
                <div key={item.date} className="flex items-start gap-3">
                  <span className="text-body-sm font-mono text-white min-w-[80px] flex-shrink-0">
                    {item.date}
                  </span>
                  <span className="text-body-sm text-white/60">{item.event}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact */}
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
              <p className="text-body-sm text-white/50">{closing.contact.title}</p>
            </div>
            <div className="flex flex-col md:items-end gap-1">
              <span className="text-body-sm text-white/60">{closing.contact.email}</span>
              <span className="text-body-sm text-white/60">{closing.contact.phone}</span>
            </div>
          </div>

          <p className="text-caption text-white/25 mt-8 max-w-3xl">
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
