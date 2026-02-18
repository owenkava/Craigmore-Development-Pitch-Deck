"use client";

import { motion } from "framer-motion";
import type { HomeType } from "@/data/deck";
import ImagePlaceholder from "./ImagePlaceholder";

interface HomeCardProps {
  home: HomeType;
  dark?: boolean;
}

export default function HomeCard({ home, dark = false }: HomeCardProps) {
  const txt = dark ? "text-white" : "text-ink";
  const txtLight = dark ? "text-white/70" : "text-ink-light";
  const txtMuted = dark ? "text-white/50" : "text-ink-muted";
  const txtAccent = dark ? "text-white/60" : "text-accent";
  const border = dark ? "border-white/10" : "border-ink/10";

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {/* Header */}
      <div>
        <span className={`section-label ${dark ? "!text-white/40" : ""}`}>{home.name}</span>
        <h2 className={`text-heading-lg sm:text-display-sm md:text-display-md font-display font-bold tracking-tight ${txt} mb-1 sm:mb-2`}>
          {home.name}
        </h2>
        <p className={`text-body-sm sm:text-body-md lg:text-body-lg ${txtLight} max-w-2xl`}>{home.tagline}</p>
      </div>

      {/* Images */}
      <div className={`grid grid-cols-1 ${home.floorPlanImage ? "sm:grid-cols-2" : ""} gap-4 sm:gap-6`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ImagePlaceholder
            label="Exterior Render"
            aspect={home.floorPlanImage ? "16/10" : "21/9"}
            src={home.exteriorImage}
          />
        </motion.div>
        {home.floorPlanImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ImagePlaceholder
              label="Floor Plan"
              aspect="16/10"
              src={home.floorPlanImage}
            />
          </motion.div>
        )}
      </div>

      {/* Specs + Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Key Specs */}
        <div className="space-y-3 sm:space-y-4">
          <h4 className={`text-heading-md font-display font-semibold ${txt}`}>
            Key Specs
          </h4>
          <div className="space-y-2 sm:space-y-3">
            {home.specs.map((spec) => (
              <div key={spec.label} className="flex justify-between items-baseline gap-2">
                <span className={`text-body-sm ${txtMuted} flex-shrink-0`}>{spec.label}</span>
                <span className={`text-body-sm font-medium ${txt} text-right`}>{spec.value}</span>
              </div>
            ))}
          </div>
          <div className={`pt-3 sm:pt-4 border-t ${border}`}>
            <span className={`text-caption font-mono ${txtMuted}`}>Price Band</span>
            <span className={`block text-heading-md sm:text-heading-lg font-display font-bold ${txt} mt-1`}>
              {home.priceBand}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 sm:space-y-4">
          <h4 className={`text-heading-md font-display font-semibold ${txt}`}>
            Features
          </h4>
          <ul className="space-y-2">
            {home.features.map((f) => (
              <li key={f} className={`flex items-start gap-2 text-body-sm ${txtLight}`}>
                <span className={`${txtAccent} mt-0.5 flex-shrink-0`}>&#8226;</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Target Buyer */}
        <div className="sm:col-span-2 lg:col-span-1 space-y-3 sm:space-y-4">
          <h4 className={`text-heading-md font-display font-semibold ${txt}`}>
            Target Buyer
          </h4>
          <p className={`text-body-sm sm:text-body-md ${txtLight} leading-relaxed`}>
            {home.targetBuyer}
          </p>
        </div>
      </div>
    </div>
  );
}
