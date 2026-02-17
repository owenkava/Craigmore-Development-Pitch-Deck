"use client";

import { useState } from "react";
import SectionShell from "@/components/SectionShell";
import SectionNav from "@/components/SectionNav";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { opportunity } from "@/data/deck";
import { motion } from "framer-motion";

interface OpportunitySectionProps {
  onNavigate: (index: number) => void;
}

/* ── Small icon set for location stats ── */
const icons: Record<string, React.ReactNode> = {
  transit: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 21l2-4"/><path d="M17 21l-2-4"/></svg>
  ),
  highway: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19L8 5"/><path d="M16 5l4 14"/><path d="M9 10h6"/><path d="M10 14h4"/></svg>
  ),
  shopping: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
  ),
  school: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5"/></svg>
  ),
  downtown: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="1"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/><path d="M10 18h4v4h-4z"/></svg>
  ),
  waterfront: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M9 7a3 3 0 100-6 3 3 0 000 6z"/><path d="M9 7v5"/></svg>
  ),
};

export default function OpportunitySection({ onNavigate }: OpportunitySectionProps) {
  const [mapHover, setMapHover] = useState(false);

  return (
    <SectionShell id="opportunity" index={1}>
      <div>
        {/* Header */}
        <span className="section-label">The Opportunity</span>
        <h2 className="text-display-sm sm:text-display-md font-display font-bold tracking-tight text-ink mb-3 max-w-3xl">
          {opportunity.headline}
        </h2>
        <p className="text-body-lg text-ink-light max-w-2xl mb-12">
          {opportunity.subtitle}
        </p>

        {/* ── Build overview + Render ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {/* Build summary card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-card p-6 shadow-card space-y-5"
          >
            <h3 className="text-heading-md font-display font-semibold text-ink">
              The Build at a Glance
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Total Units", value: opportunity.buildOverview.totalUnits },
                { label: "Scenarios", value: opportunity.buildOverview.composition },
                { label: "Site", value: opportunity.buildOverview.acreage },
                { label: "Timeline", value: opportunity.buildOverview.timeline },
              ].map((item) => (
                <div key={item.label}>
                  <span className="text-caption font-mono text-ink-muted uppercase tracking-wide">
                    {item.label}
                  </span>
                  <p className="text-body-sm font-medium text-ink mt-0.5">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Render placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ImagePlaceholder
              label="Subdivision Render"
              aspect="16/10"
              src={opportunity.buildOverview.renderImage}
            />
          </motion.div>
        </div>

        {/* ── Map + Location Stats ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-14">
          {/* Map with property glow + hotspot tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 relative rounded-card overflow-hidden shadow-card"
            onMouseLeave={() => setMapHover(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={opportunity.mapImage}
              alt="Map of Halifax showing Craigmore Drive location"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "3/4" }}
            />
            {/* Subtle blue glow around the blue square property outline */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: "38%",
                left: "38%",
                width: "11%",
                height: "6%",
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 20px 8px rgba(59,130,246,0.3), 0 0 40px 16px rgba(59,130,246,0.12)",
                borderRadius: "3px",
                border: "1.5px solid rgba(59,130,246,0.35)",
                animation: "pulse-glow 3s ease-in-out infinite",
              }}
            />
            {/* Clickable hotspot — over the blue square */}
            <div
              className="absolute cursor-pointer z-10"
              style={{ top: "34%", left: "32%", width: "14%", height: "10%" }}
              onMouseEnter={() => setMapHover(true)}
              onClick={() => setMapHover((prev) => !prev)}
            />
            {/* "Craigmore Drive" popup — appears on hover/click */}
            <motion.div
              className="absolute z-20 pointer-events-none"
              style={{ top: "27%", left: "31%", transformOrigin: "bottom center" }}
              initial={false}
              animate={{ opacity: mapHover ? 1 : 0, y: mapHover ? 0 : 6, scale: mapHover ? 1 : 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg border border-ink/5 pointer-events-auto">
                <span className="text-body-sm font-display font-semibold text-ink block">Craigmore Drive</span>
                <span className="text-caption text-ink-muted block">R-3 zoning — 38 units as-of-right</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Location stats grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {opportunity.locationStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-3 bg-white rounded-card p-4 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="w-9 h-9 rounded-full bg-surface-cool flex items-center justify-center flex-shrink-0 text-accent">
                  {icons[stat.icon] || icons.downtown}
                </div>
                <div>
                  <span className="text-body-sm font-medium text-ink">{stat.label}</span>
                  <span className="block text-caption text-ink-muted">{stat.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Investment thesis cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {opportunity.thesis.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-card p-6 shadow-card"
            >
              <div className="space-y-1 mb-4">
                <span className="block text-display-sm font-display font-bold tracking-tight text-ink">
                  {item.stat}
                </span>
                <span className="block text-body-sm font-medium text-ink-muted">
                  {item.statLabel}
                </span>
              </div>
              <div className="pt-4 border-t border-ink/5">
                <h4 className="text-heading-md font-display font-semibold text-ink mb-2">
                  {item.title}
                </h4>
                <p className="text-body-sm text-ink-light">{item.description}</p>
                {item.source && (
                  <span className="block text-caption text-ink-muted mt-2 italic">
                    Source: {item.source}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Demand drivers */}
        <div>
          <h3 className="text-heading-lg font-display font-semibold text-ink mb-4">
            Demand Drivers
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {opportunity.demandDrivers.map((driver, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-3 text-body-md text-ink-light"
              >
                <span className="w-5 h-5 rounded-full bg-surface-cool flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-caption text-accent font-bold">{i + 1}</span>
                </span>
                {driver}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <SectionNav currentIndex={1} onNavigate={onNavigate} />
    </SectionShell>
  );
}
