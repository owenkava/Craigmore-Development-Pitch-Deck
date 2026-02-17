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
    <div className="space-y-10">
      {/* Header */}
      <div>
        <span className={`section-label ${dark ? "!text-white/40" : ""}`}>{home.name}</span>
        <h2 className={`text-display-sm sm:text-display-md font-display font-bold tracking-tight ${txt} mb-2`}>
          {home.name}
        </h2>
        <p className={`text-body-lg ${txtLight} max-w-xl`}>{home.tagline}</p>
      </div>

      {/* Images */}
      <div className={`grid grid-cols-1 ${home.floorPlanImage ? "md:grid-cols-2" : ""} gap-6`}>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Key Specs */}
        <div className="md:col-span-1 space-y-4">
          <h4 className={`text-heading-md font-display font-semibold ${txt}`}>
            Key Specs
          </h4>
          <div className="space-y-3">
            {home.specs.map((spec) => (
              <div key={spec.label} className="flex justify-between items-baseline">
                <span className={`text-body-sm ${txtMuted}`}>{spec.label}</span>
                <span className={`text-body-sm font-medium ${txt}`}>{spec.value}</span>
              </div>
            ))}
          </div>
          <div className={`pt-4 border-t ${border}`}>
            <span className={`text-caption font-mono ${txtMuted}`}>Price Band</span>
            <span className={`block text-heading-lg font-display font-bold ${txt} mt-1`}>
              {home.priceBand}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="md:col-span-1 space-y-4">
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
        <div className="md:col-span-1 space-y-4">
          <h4 className={`text-heading-md font-display font-semibold ${txt}`}>
            Target Buyer
          </h4>
          <p className={`text-body-md ${txtLight} leading-relaxed`}>
            {home.targetBuyer}
          </p>
        </div>
      </div>
    </div>
  );
}
