"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import SectionNav from "@/components/SectionNav";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { property } from "@/data/deck";

interface PropertySectionProps {
  onNavigate: (index: number) => void;
}

export default function PropertySection({ onNavigate }: PropertySectionProps) {
  const [activeImage, setActiveImage] = useState(0);
  const gallery = property.galleryImages ?? [];

  return (
    <SectionShell id="property" index={2}>
      <div>
        <span className="section-label">The Current Property</span>
        <h2 className="text-display-sm sm:text-display-md font-display font-bold tracking-tight text-ink mb-2">
          Site Overview
        </h2>
        <p className="text-body-lg text-ink-light max-w-2xl mb-10">
          {property.location} &mdash; {property.totalAcreage} with capacity for{" "}
          {property.proposedLots}.
        </p>

        {/* Photo Gallery */}
        {gallery.length > 0 && (
          <div className="mb-10">
            {/* Main image */}
            <div className="relative rounded-card overflow-hidden bg-surface-cool" style={{ aspectRatio: "16/9" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={gallery[activeImage].src}
                  alt={gallery[activeImage].caption}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-4">
                <p className="text-white text-body-sm font-medium">
                  {gallery[activeImage].caption}
                </p>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative flex-1 rounded-lg overflow-hidden transition-all duration-200 ${
                    i === activeImage
                      ? "ring-2 ring-accent ring-offset-2 opacity-100"
                      : "opacity-60 hover:opacity-90"
                  }`}
                  style={{ aspectRatio: "16/9" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Fallback: original site plan / location map if no gallery */}
        {gallery.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <ImagePlaceholder label="Site Plan" src={property.sitePlanImage} />
            <ImagePlaceholder label="Location Map" src={property.locationImage} />
          </div>
        )}

        {/* Details grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Key Facts */}
          <div className="space-y-4">
            <h4 className="text-heading-md font-display font-semibold text-ink">
              Key Facts
            </h4>
            {[
              { label: "Total Acreage", value: property.totalAcreage },
              { label: "Proposed Lots", value: property.proposedLots },
              { label: "Zoning", value: property.zoning },
              { label: "Servicing", value: property.servicing },
              { label: "Topography", value: property.topography },
              { label: "Access", value: property.access },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-baseline gap-4">
                <span className="text-body-sm text-ink-muted flex-shrink-0">
                  {item.label}
                </span>
                <span className="text-body-sm text-ink text-right">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Constraints */}
          <div className="space-y-4">
            <h4 className="text-heading-md font-display font-semibold text-ink">
              Constraints
            </h4>
            <ul className="space-y-2">
              {property.constraints.map((c) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-body-sm text-ink-light flex items-start gap-2"
                >
                  <span className="text-warning mt-0.5 flex-shrink-0">&#9679;</span>
                  {c}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Advantages */}
          <div className="space-y-4">
            <h4 className="text-heading-md font-display font-semibold text-ink">
              Advantages
            </h4>
            <ul className="space-y-2">
              {property.advantages.map((a) => (
                <motion.li
                  key={a}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-body-sm text-ink-light flex items-start gap-2"
                >
                  <span className="text-accent mt-0.5 flex-shrink-0">&#9679;</span>
                  {a}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Communal Amenities */}
        {property.communalAmenities && property.communalAmenities.length > 0 && (
          <div className="mt-10 p-8 bg-white rounded-card border border-ink/5">
            <h4 className="text-heading-md font-display font-semibold text-ink mb-4">
              Community Amenities
            </h4>
            <p className="text-body-sm text-ink-light mb-4">
              The development includes shared amenities designed to enhance the resident
              experience and complement the established neighbourhood character.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {property.communalAmenities.map((amenity) => (
                <motion.div
                  key={amenity}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-2 text-body-sm text-ink-light"
                >
                  <span className="text-success mt-0.5 flex-shrink-0">&#9679;</span>
                  {amenity}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <SectionNav currentIndex={2} onNavigate={onNavigate} />
    </SectionShell>
  );
}
