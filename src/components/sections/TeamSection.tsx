"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import SectionNav from "@/components/SectionNav";
import { team } from "@/data/deck";

interface TeamSectionProps {
  onNavigate: (index: number) => void;
}

function TeamPhoto({ name, src }: { name: string; src?: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const showImage = src && !failed;

  return (
    <div className="w-full aspect-[4/5] bg-surface-cool rounded-card overflow-hidden relative flex-shrink-0">
      {showImage && (
        <img
          src={src}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
      {!showImage && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/10 to-accent/5">
          <span className="text-display-lg font-display font-bold text-accent/30 select-none">
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}

export default function TeamSection({ onNavigate }: TeamSectionProps) {
  return (
    <SectionShell id="team" index={6}>
      <div>
        <span className="section-label">Our Team</span>
        <h2 className="text-display-sm sm:text-display-md font-display font-bold tracking-tight text-ink mb-2">
          Experienced Builders & Operators
        </h2>
        <p className="text-body-lg text-ink-light max-w-2xl mb-12">
          Our team combines deep development expertise with financial discipline
          and construction management excellence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-4 h-full"
            >
              <TeamPhoto name={member.name} src={member.image} />

              <div className="flex-shrink-0">
                <h3 className="text-heading-lg font-display font-semibold text-ink">
                  {member.name}
                </h3>
                <p className="text-body-sm text-accent font-medium">{member.role}</p>
              </div>

              <p className="text-body-sm text-ink-light flex-grow">{member.bio}</p>

              <ul className="space-y-1.5 flex-shrink-0">
                {member.highlights.map((h) => (
                  <li
                    key={h}
                    className="text-body-sm text-ink-muted flex items-start gap-2"
                  >
                    <span className="text-accent mt-1 flex-shrink-0 text-xs">&#9679;</span>
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionNav currentIndex={6} onNavigate={onNavigate} />
    </SectionShell>
  );
}
