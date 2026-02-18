"use client";

import {
  cover,
  team,
  opportunity,
  property,
  zoning,
  premiumCondoUnit,
  maxDensityCondoUnit,
  townhomeUnit,
  financialsPremiumCondos,
  financialsMaxDensity,
  financialsTownhomes,
  closing,
  closingScenarios,
} from "@/data/deck";

/**
 * Print route: renders each section as a 16:9 landscape slide
 * for PDF export via Puppeteer. NO Recharts — pure HTML/CSS for speed.
 */

const SLIDE_W = 1280;
const SLIDE_H = 720;
const PAD_X = 64;
const PAD_Y = 48;
const TOTAL_SLIDES = 14;

const BRAND = {
  ink: "#023E40",
  inkLight: "#124546",
  muted: "#5a7e7f",
  surface: "#f0fafa",
  cool: "#D0ECED",
  white: "#ffffff",
};

/* ── Slide Frame ── */
function SlideFrame({
  children,
  slideNumber,
  sectionLabel,
  dark = false,
  bgColor,
}: {
  children: React.ReactNode;
  slideNumber: number;
  sectionLabel: string;
  dark?: boolean;
  bgColor?: string;
}) {
  const bg = bgColor || (dark ? BRAND.ink : BRAND.white);
  const textColor = dark ? BRAND.white : BRAND.ink;
  const mutedColor = dark ? "rgba(255,255,255,0.4)" : BRAND.muted;

  return (
    <div
      className="slide-page"
      style={{
        backgroundColor: bg,
        color: textColor,
        width: `${SLIDE_W}px`,
        height: `${SLIDE_H}px`,
        padding: `${PAD_Y}px ${PAD_X}px`,
        position: "relative",
        pageBreakAfter: "always",
        pageBreakInside: "avoid",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Slide header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "10px",
          color: mutedColor,
          marginBottom: "20px",
        }}
      >
        <span style={{ fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {sectionLabel}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {String(slideNumber).padStart(2, "0")} / {String(TOTAL_SLIDES).padStart(2, "0")}
        </span>
      </div>

      {/* Content area */}
      <div style={{ height: `${SLIDE_H - PAD_Y * 2 - 60}px`, overflow: "hidden" }}>
        {children}
      </div>

      {/* Slide footer */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: `${PAD_X}px`,
          right: `${PAD_X}px`,
          display: "flex",
          justifyContent: "space-between",
          fontSize: "9px",
          color: mutedColor,
        }}
      >
        <span>Craigmore Drive — A Citra Capital Development</span>
        <span>{cover.date}</span>
      </div>
    </div>
  );
}

/* ── Helpers ── */
function SlideImage({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} style={{ objectFit: "cover", width: "100%", height: "100%", display: "block", ...style }} />
  );
}

function Bullet({ children, color, dark }: { children: React.ReactNode; color?: string; dark?: boolean }) {
  return (
    <li style={{ fontSize: "11px", color: dark ? "rgba(255,255,255,0.65)" : BRAND.inkLight, marginBottom: "5px", paddingLeft: "12px", position: "relative", lineHeight: 1.5 }}>
      <span style={{ position: "absolute", left: 0, color: color || (dark ? "rgba(255,255,255,0.3)" : BRAND.muted) }}>&#8226;</span>
      {children}
    </li>
  );
}

function SectionTitle({ children, sub, dark }: { children: React.ReactNode; sub?: string; dark?: boolean }) {
  return (
    <div style={{ marginBottom: sub ? "8px" : "20px" }}>
      <h2 style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.02em", color: dark ? "#fff" : BRAND.ink }}>
        {children}
      </h2>
      {sub && <p style={{ fontSize: "13px", color: dark ? "rgba(255,255,255,0.5)" : BRAND.muted, marginTop: "4px", maxWidth: "650px" }}>{sub}</p>}
    </div>
  );
}

function SpecGrid({ specs, dark }: { specs: { label: string; value: string }[]; dark?: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: "4px 12px", fontSize: "11px" }}>
      {specs.map((s) => (
        <div key={s.label} style={{ display: "contents" }}>
          <span style={{ color: dark ? "rgba(255,255,255,0.45)" : BRAND.muted, whiteSpace: "nowrap" }}>{s.label}</span>
          <span style={{ fontWeight: 500, color: dark ? "#fff" : BRAND.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Pure CSS donut chart (no Recharts) ── */
function CSSDonut({ data, size = 140, maxItems = 8 }: { data: { name: string; value: number; color: string }[]; size?: number; maxItems?: number }) {
  // Limit legend items to prevent overflow
  data = data.slice(0, maxItems);
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;
  const segments = data.map((d) => {
    const start = (cumulative / total) * 360;
    cumulative += d.value;
    const end = (cumulative / total) * 360;
    return { ...d, start, end, pct: ((d.value / total) * 100).toFixed(0) };
  });

  // Build conic-gradient stops
  const stops = segments
    .map((s) => `${s.color} ${s.start}deg ${s.end}deg`)
    .join(", ");

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          background: `conic-gradient(${stops})`,
          position: "relative",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "25%",
            width: "50%",
            height: "50%",
            borderRadius: "50%",
            background: "white",
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        {segments.map((s) => (
          <div key={s.name} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: s.color, flexShrink: 0 }} />
            <span style={{ color: BRAND.muted }}>{s.name}</span>
            <span style={{ color: BRAND.ink, fontWeight: 500 }}>{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Financial summary card for a scenario ── */
function FinancialSummaryCard({
  label,
  financials,
  highlight = false,
}: {
  label: string;
  financials: typeof financialsPremiumCondos;
  highlight?: boolean;
}) {
  const s = financials.summary;
  return (
    <div style={{
      background: highlight ? BRAND.surface : "transparent",
      border: highlight ? "none" : `1px solid ${BRAND.cool}`,
      borderRadius: "10px",
      padding: "16px",
    }}>
      <h4 style={{ fontSize: "13px", fontWeight: 700, marginBottom: "12px", color: BRAND.ink }}>{label}</h4>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
        {[
          { stat: s.projectedIRR, label: "IRR" },
          { stat: s.equityMultiple, label: "Multiple" },
          { stat: s.netProfit, label: "Net Profit" },
          { stat: s.totalRevenue, label: "Revenue" },
        ].map((m) => (
          <div key={m.label}>
            <span style={{ fontSize: "16px", fontWeight: 700, display: "block", color: BRAND.ink }}>{m.stat}</span>
            <span style={{ fontSize: "9px", color: BRAND.muted }}>{m.label}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "3px 10px", fontSize: "10px" }}>
        {[
          ["Cost", s.totalProjectCost],
          ["Equity", s.equityRequired],
          ["Debt", s.debtFinancing],
          ["Timeline", s.projectTimeline],
        ].map(([l, v]) => (
          <div key={l} style={{ display: "contents" }}>
            <span style={{ color: BRAND.muted }}>{l}</span>
            <span style={{ fontWeight: 500, textAlign: "right" }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */

export default function PrintPage() {
  return (
    <div id="print-root" style={{ width: `${SLIDE_W}px`, margin: "0 auto" }}>

      {/* ═══════════════ SLIDE 1: COVER ═══════════════ */}
      <div
        className="slide-page"
        style={{
          width: `${SLIDE_W}px`,
          height: `${SLIDE_H}px`,
          position: "relative",
          overflow: "hidden",
          pageBreakAfter: "always",
        }}
      >
        {cover.backgroundImage && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover.backgroundImage}
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.92) 45%, rgba(255,255,255,0.25) 100%)",
            }} />
          </>
        )}
        <div style={{
          position: "relative", zIndex: 10,
          padding: `${PAD_Y + 40}px ${PAD_X}px`,
          display: "flex", flexDirection: "column", justifyContent: "center",
          height: "100%",
        }}>
          <p style={{
            fontSize: "11px", fontFamily: "'JetBrains Mono', monospace",
            textTransform: "uppercase", letterSpacing: "0.2em",
            color: BRAND.muted, marginBottom: "16px",
          }}>
            {cover.location}
          </p>
          <h1 style={{ fontSize: "64px", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", color: BRAND.ink }}>
            {cover.headline}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "24px" }}>
            <span style={{ fontSize: "18px", color: BRAND.inkLight }}>{cover.tagline}</span>
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: BRAND.muted }} />
            <span style={{ fontSize: "18px", color: BRAND.muted }}>{cover.date}</span>
          </div>
          <div style={{ height: "1px", background: "rgba(2,62,64,0.1)", marginTop: "48px", width: "260px" }} />
        </div>
      </div>

      {/* ═══════════════ SLIDE 2: OPPORTUNITY — INVESTMENT THESIS ═══════════════ */}
      <SlideFrame slideNumber={2} sectionLabel="The Opportunity">
        <SectionTitle sub={opportunity.subtitle}>The Opportunity</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
          {opportunity.thesis.map((t) => (
            <div key={t.title} style={{ background: BRAND.surface, borderRadius: "10px", padding: "20px" }}>
              <span style={{ fontSize: "28px", fontWeight: 700, display: "block", color: BRAND.ink }}>{t.stat}</span>
              <span style={{ fontSize: "10px", color: BRAND.muted, display: "block", marginBottom: "8px" }}>{t.statLabel}</span>
              <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>{t.title}</h4>
              <p style={{ fontSize: "11px", color: BRAND.inkLight, lineHeight: 1.5 }}>{t.description}</p>
              {t.source && <span style={{ fontSize: "9px", color: BRAND.muted, marginTop: "6px", display: "block" }}>{t.source}</span>}
            </div>
          ))}
        </div>
      </SlideFrame>

      {/* ═══════════════ SLIDE 3: OPPORTUNITY — LOCATION & BUILD ═══════════════ */}
      <SlideFrame slideNumber={3} sectionLabel="The Opportunity">
        <SectionTitle>Location &amp; Build Overview</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginTop: "8px" }}>
          {/* Map */}
          <div>
            <div style={{ borderRadius: "10px", overflow: "hidden", height: "320px", background: BRAND.surface, position: "relative" }}>
              {opportunity.mapImage ? (
                <SlideImage src={opportunity.mapImage} alt="Halifax location map" />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "11px", color: BRAND.muted }}>Map</span>
                </div>
              )}
            </div>
            {/* Location stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "16px" }}>
              {opportunity.locationStats.map((ls) => (
                <div key={ls.label} style={{ fontSize: "10px" }}>
                  <span style={{ fontWeight: 600, display: "block", color: BRAND.ink }}>{ls.label}</span>
                  <span style={{ color: BRAND.muted }}>{ls.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Build at a Glance + Demand Drivers */}
          <div>
            <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "16px" }}>Build at a Glance</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "28px" }}>
              {[
                { label: "Total Doors", value: opportunity.buildOverview.totalUnits },
                { label: "Composition", value: opportunity.buildOverview.composition },
                { label: "Site Area", value: opportunity.buildOverview.acreage },
                { label: "Timeline", value: opportunity.buildOverview.timeline },
              ].map((item) => (
                <div key={item.label} style={{ background: BRAND.surface, borderRadius: "8px", padding: "14px" }}>
                  <span style={{ fontSize: "20px", fontWeight: 700, display: "block", color: BRAND.ink }}>{item.value}</span>
                  <span style={{ fontSize: "10px", color: BRAND.muted }}>{item.label}</span>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "10px" }}>Demand Drivers</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {opportunity.demandDrivers.map((d) => (
                <Bullet key={d}>{d}</Bullet>
              ))}
            </ul>
          </div>
        </div>
      </SlideFrame>

      {/* ═══════════════ SLIDE 4: CURRENT PROPERTY ═══════════════ */}
      <SlideFrame slideNumber={4} sectionLabel="Current Property">
        <SectionTitle>The Current Property</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
          <div>
            {property.galleryImages && property.galleryImages.length > 0 && (
              <div style={{ borderRadius: "10px", overflow: "hidden", height: "240px", marginBottom: "16px", position: "relative" }}>
                <SlideImage src={property.galleryImages[0].src} alt={property.galleryImages[0].caption} />
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 16px", fontSize: "12px" }}>
              {([
                ["Location", property.location],
                ["Acreage", property.totalAcreage],
                ["Lots", property.proposedLots],
                ["Zoning", property.zoning],
                ["Servicing", property.servicing],
              ] as const).map(([l, v]) => (
                <div key={l} style={{ display: "contents" }}>
                  <span style={{ color: BRAND.muted }}>{l}</span>
                  <span style={{ fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "10px" }}>Advantages</h4>
            <ul style={{ listStyle: "none", padding: 0, marginBottom: "20px" }}>
              {property.advantages.map((a) => (
                <Bullet key={a}>{a}</Bullet>
              ))}
            </ul>
            <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "10px" }}>Constraints</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {property.constraints.map((c) => (
                <Bullet key={c} color="#d97706">{c}</Bullet>
              ))}
            </ul>
          </div>
        </div>
      </SlideFrame>

      {/* ═══════════════ SLIDE 5: ZONING & SURROUNDINGS ═══════════════ */}
      <SlideFrame slideNumber={5} sectionLabel="Zoning & Surroundings">
        <SectionTitle sub={zoning.subtitle}>{zoning.headline}</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginTop: "8px" }}>
          {/* Left: entitlements grid */}
          <div>
            <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "14px" }}>Entitlements</h4>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 16px", fontSize: "12px" }}>
              {zoning.entitlements.map((e) => (
                <div key={e.label} style={{ display: "contents" }}>
                  <span style={{ color: BRAND.muted }}>{e.label}</span>
                  <span style={{ fontWeight: 500 }}>{e.value}</span>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: "13px", fontWeight: 600, marginTop: "24px", marginBottom: "10px" }}>Zoning Advantages</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {zoning.advantages.map((a) => (
                <Bullet key={a}>{a}</Bullet>
              ))}
            </ul>
          </div>

          {/* Right: surroundings + map */}
          <div>
            <div style={{ borderRadius: "10px", overflow: "hidden", height: "220px", background: BRAND.surface, position: "relative", marginBottom: "16px" }}>
              {zoning.mapImage ? (
                <SlideImage src={zoning.mapImage} alt="Halifax zoning and surroundings map" />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "11px", color: BRAND.muted }}>Zoning Map</span>
                </div>
              )}
            </div>
            <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "10px" }}>Surroundings</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {zoning.surroundings.map((s) => (
                <Bullet key={s}>{s}</Bullet>
              ))}
            </ul>
          </div>
        </div>
      </SlideFrame>

      {/* ═══════════════ SLIDE 6: HOME TYPE — 24 PREMIUM CONDOS ═══════════════ */}
      <SlideFrame slideNumber={6} sectionLabel="Development Options" dark>
        <SectionTitle dark sub={premiumCondoUnit.tagline}>{premiumCondoUnit.name}</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginTop: "8px" }}>
          <div>
            <div style={{ borderRadius: "10px", overflow: "hidden", height: "220px", marginBottom: "16px", position: "relative" }}>
              {premiumCondoUnit.exteriorImage ? (
                <SlideImage src={premiumCondoUnit.exteriorImage} alt="Premium Condo exterior" />
              ) : (
                <div style={{ background: "rgba(255,255,255,0.1)", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>Exterior Render</span>
                </div>
              )}
            </div>
            <h4 style={{ fontSize: "11px", fontWeight: 600, color: "white", marginBottom: "8px" }}>Key Features</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {premiumCondoUnit.features.map((f) => (
                <Bullet key={f} dark>{f}</Bullet>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 600, color: "white", marginBottom: "12px" }}>Specifications</h4>
            <SpecGrid specs={premiumCondoUnit.specs} dark />
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "8px", padding: "14px", marginTop: "20px", marginBottom: "20px" }}>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", display: "block" }}>Price Band</span>
              <span style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>{premiumCondoUnit.priceBand}</span>
            </div>
            <h4 style={{ fontSize: "11px", fontWeight: 600, color: "white", marginBottom: "6px" }}>Target Buyer</h4>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{premiumCondoUnit.targetBuyer}</p>
          </div>
        </div>
      </SlideFrame>

      {/* ═══════════════ SLIDE 7: HOME TYPE — 38 LUXURY CONDOS ═══════════════ */}
      <SlideFrame slideNumber={7} sectionLabel="Development Options" dark>
        <SectionTitle dark sub={maxDensityCondoUnit.tagline}>{maxDensityCondoUnit.name}</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginTop: "8px" }}>
          <div>
            <div style={{ borderRadius: "10px", overflow: "hidden", height: "220px", marginBottom: "16px", position: "relative" }}>
              {maxDensityCondoUnit.exteriorImage ? (
                <SlideImage src={maxDensityCondoUnit.exteriorImage} alt="Luxury Condo exterior" />
              ) : (
                <div style={{ background: "rgba(255,255,255,0.1)", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>Exterior Render</span>
                </div>
              )}
            </div>
            <h4 style={{ fontSize: "11px", fontWeight: 600, color: "white", marginBottom: "8px" }}>Key Features</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {maxDensityCondoUnit.features.map((f) => (
                <Bullet key={f} dark>{f}</Bullet>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 600, color: "white", marginBottom: "12px" }}>Specifications</h4>
            <SpecGrid specs={maxDensityCondoUnit.specs} dark />
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "8px", padding: "14px", marginTop: "20px", marginBottom: "20px" }}>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", display: "block" }}>Price Band</span>
              <span style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>{maxDensityCondoUnit.priceBand}</span>
            </div>
            <h4 style={{ fontSize: "11px", fontWeight: 600, color: "white", marginBottom: "6px" }}>Target Buyer</h4>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{maxDensityCondoUnit.targetBuyer}</p>
          </div>
        </div>
      </SlideFrame>

      {/* ═══════════════ SLIDE 8: HOME TYPE — 12 TOWNHOMES ═══════════════ */}
      <SlideFrame slideNumber={8} sectionLabel="Development Options" dark>
        <SectionTitle dark sub={townhomeUnit.tagline}>{townhomeUnit.name}</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginTop: "8px" }}>
          <div>
            <div style={{ borderRadius: "10px", overflow: "hidden", height: "220px", marginBottom: "16px", position: "relative" }}>
              {townhomeUnit.exteriorImage ? <SlideImage src={townhomeUnit.exteriorImage} alt="Townhome exterior" /> :
                <div style={{ background: "rgba(255,255,255,0.1)", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>Exterior Render</span>
                </div>}
            </div>
            <h4 style={{ fontSize: "11px", fontWeight: 600, color: "white", marginBottom: "8px" }}>Key Features</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {townhomeUnit.features.map((f) => (
                <Bullet key={f} dark>{f}</Bullet>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 600, color: "white", marginBottom: "12px" }}>Specifications</h4>
            <SpecGrid specs={townhomeUnit.specs} dark />
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "8px", padding: "14px", marginTop: "20px", marginBottom: "20px" }}>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", display: "block" }}>Price Band</span>
              <span style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>{townhomeUnit.priceBand}</span>
            </div>
            <h4 style={{ fontSize: "11px", fontWeight: 600, color: "white", marginBottom: "6px" }}>Target Buyer</h4>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{townhomeUnit.targetBuyer}</p>
          </div>
        </div>
      </SlideFrame>

      {/* ═══════════════ SLIDE 9: SCENARIO COMPARISON ═══════════════ */}
      <SlideFrame slideNumber={9} sectionLabel="Financials">
        <SectionTitle sub="Side-by-side comparison of all three development pathways">Scenario Comparison</SectionTitle>

        <table style={{ width: "100%", fontSize: "11px", borderCollapse: "collapse", marginTop: "10px", tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: "22%" }} />
            <col style={{ width: "26%" }} />
            <col style={{ width: "26%" }} />
            <col style={{ width: "26%" }} />
          </colgroup>
          <thead>
            <tr style={{ borderBottom: `2px solid ${BRAND.ink}` }}>
              <th style={{ textAlign: "left", padding: "8px 8px", fontSize: "9px", color: BRAND.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Metric</th>
              <th style={{ textAlign: "center", padding: "8px 8px", fontSize: "9px", color: BRAND.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>24 Premium Condos</th>
              <th style={{ textAlign: "center", padding: "8px 8px", fontSize: "9px", color: BRAND.muted, textTransform: "uppercase", letterSpacing: "0.08em", background: BRAND.surface }}>38 Luxury Condos</th>
              <th style={{ textAlign: "center", padding: "8px 8px", fontSize: "9px", color: BRAND.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>12 Townhomes</th>
            </tr>
          </thead>
          <tbody>
            {([
              { metric: "Total Project Cost", a: financialsPremiumCondos.summary.totalProjectCost, b: financialsMaxDensity.summary.totalProjectCost, c: financialsTownhomes.summary.totalProjectCost },
              { metric: "Total Revenue", a: financialsPremiumCondos.summary.totalRevenue, b: financialsMaxDensity.summary.totalRevenue, c: financialsTownhomes.summary.totalRevenue },
              { metric: "Net Profit", a: financialsPremiumCondos.summary.netProfit, b: financialsMaxDensity.summary.netProfit, c: financialsTownhomes.summary.netProfit, bold: true },
              { metric: "Equity Required", a: financialsPremiumCondos.summary.equityRequired, b: financialsMaxDensity.summary.equityRequired, c: financialsTownhomes.summary.equityRequired },
              { metric: "Projected IRR", a: financialsPremiumCondos.summary.projectedIRR, b: financialsMaxDensity.summary.projectedIRR, c: financialsTownhomes.summary.projectedIRR, bold: true },
              { metric: "Equity Multiple", a: financialsPremiumCondos.summary.equityMultiple, b: financialsMaxDensity.summary.equityMultiple, c: financialsTownhomes.summary.equityMultiple, bold: true },
              { metric: "Debt Financing", a: financialsPremiumCondos.summary.debtFinancing, b: financialsMaxDensity.summary.debtFinancing, c: financialsTownhomes.summary.debtFinancing },
              { metric: "Timeline", a: financialsPremiumCondos.summary.projectTimeline, b: financialsMaxDensity.summary.projectTimeline, c: financialsTownhomes.summary.projectTimeline },
            ] as { metric: string; a: string; b: string; c: string; bold?: boolean }[]).map((row) => (
              <tr key={row.metric} style={{ borderBottom: `1px solid ${BRAND.cool}`, ...(row.bold ? { fontWeight: 700 } : {}) }}>
                <td style={{ padding: "7px 8px", color: BRAND.inkLight, whiteSpace: "nowrap" }}>{row.metric}</td>
                <td style={{ padding: "7px 8px", textAlign: "center", fontWeight: row.bold ? 700 : 500, whiteSpace: "nowrap" }}>{row.a}</td>
                <td style={{ padding: "7px 8px", textAlign: "center", fontWeight: row.bold ? 700 : 500, background: BRAND.surface, whiteSpace: "nowrap" }}>{row.b}</td>
                <td style={{ padding: "7px 8px", textAlign: "center", fontWeight: row.bold ? 700 : 500, whiteSpace: "nowrap" }}>{row.c}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Sensitivity per scenario */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginTop: "20px" }}>
          {([
            { label: "24 Premium Condos", data: financialsPremiumCondos.sensitivity },
            { label: "38 Luxury Condos", data: financialsMaxDensity.sensitivity, highlight: true },
            { label: "12 Townhomes", data: financialsTownhomes.sensitivity },
          ]).map((scenario) => (
            <div key={scenario.label} style={{ background: scenario.highlight ? BRAND.surface : "transparent", borderRadius: "8px", padding: "8px", overflow: "hidden" }}>
              <h4 style={{ fontSize: "9px", fontWeight: 600, marginBottom: "4px" }}>{scenario.label} — Sensitivity</h4>
              <table style={{ width: "100%", fontSize: "9px", borderCollapse: "collapse", tableLayout: "fixed" }}>
                <colgroup>
                  <col style={{ width: "52%" }} />
                  <col style={{ width: "24%" }} />
                  <col style={{ width: "24%" }} />
                </colgroup>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BRAND.cool}` }}>
                    <th style={{ textAlign: "left", paddingBottom: "3px", fontSize: "8px", color: BRAND.muted }}>Case</th>
                    <th style={{ textAlign: "right", paddingBottom: "3px", fontSize: "8px", color: BRAND.muted }}>IRR</th>
                    <th style={{ textAlign: "right", paddingBottom: "3px", fontSize: "8px", color: BRAND.muted }}>Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {scenario.data.map((r) => (
                    <tr key={r.scenario} style={{ borderBottom: `1px solid ${BRAND.surface}` }}>
                      <td style={{ padding: "2px 4px 2px 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.scenario}</td>
                      <td style={{ padding: "2px 0", textAlign: "right", whiteSpace: "nowrap" }}>{r.irr}</td>
                      <td style={{ padding: "2px 0", textAlign: "right", whiteSpace: "nowrap" }}>{r.profit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </SlideFrame>

      {/* ═══════════════ SLIDES 10-12: FINANCIALS — STANDARDIZED TEMPLATE ═══════════════ */}
      {([
        { num: 10, label: "24 Premium Condos", fin: financialsPremiumCondos },
        { num: 11, label: "38 Luxury Condos", fin: financialsMaxDensity },
        { num: 12, label: "12 Townhomes", fin: financialsTownhomes },
      ] as const).map((scenario) => (
        <SlideFrame key={scenario.num} slideNumber={scenario.num} sectionLabel={`Financials — ${scenario.label}`}>
          <SectionTitle sub={`${scenario.label} — Cost, Revenue & Timeline`}>Financial Detail</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
            {/* LEFT: Cost Breakdown + Donut */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <h4 style={{ fontSize: "13px", fontWeight: 600 }}>Cost Breakdown</h4>
                <CSSDonut data={scenario.fin.chartData.costPie.slice(0, 6)} size={90} />
              </div>
              <table style={{ width: "100%", fontSize: "10px", borderCollapse: "collapse" }}>
                <tbody>
                  {scenario.fin.costBreakdown.map((row) => (
                    <tr key={row.label} style={{
                      borderBottom: `1px solid ${BRAND.surface}`,
                      ...(row.highlight ? { fontWeight: 700, background: BRAND.surface } : {}),
                    }}>
                      <td style={{ padding: "3px 0", color: row.highlight ? BRAND.ink : BRAND.inkLight }}>{row.label}</td>
                      <td style={{ padding: "3px 0", textAlign: "right", fontWeight: 500, whiteSpace: "nowrap" }}>{row.values[0]}</td>
                      <td style={{ padding: "3px 0", textAlign: "right", color: BRAND.muted, width: "36px", whiteSpace: "nowrap" }}>{row.values[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* RIGHT: Revenue + Timeline + Revenue Scenarios */}
            <div>
              <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>Revenue Breakdown</h4>
              <table style={{ width: "100%", fontSize: "10px", borderCollapse: "collapse", marginBottom: "14px" }}>
                <tbody>
                  {scenario.fin.revenueBreakdown.map((row) => (
                    <tr key={row.label} style={{
                      borderBottom: `1px solid ${BRAND.surface}`,
                      ...(row.highlight ? { fontWeight: 700, background: BRAND.surface } : {}),
                    }}>
                      <td style={{ padding: "3px 0", color: row.highlight ? BRAND.ink : BRAND.inkLight, maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.label}</td>
                      <td style={{ padding: "3px 0 3px 8px", textAlign: "right", fontWeight: 500, whiteSpace: "nowrap", fontSize: "9px" }}>{row.values[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>Project Timeline</h4>
              {scenario.fin.timeline.map((t) => (
                <div key={t.phase} style={{ display: "flex", gap: "10px", fontSize: "10px", marginBottom: "4px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", color: BRAND.ink, minWidth: "90px", fontWeight: 500 }}>{t.phase}</span>
                  <span style={{ color: BRAND.muted }}>{t.milestone}</span>
                </div>
              ))}

              {/* Revenue Scenarios — same for all 3 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginTop: "12px", fontSize: "10px" }}>
                {(["worst", "likely", "best"] as const).map((s) => (
                  <div key={s} style={{ background: BRAND.surface, borderRadius: "6px", padding: "8px", textAlign: "center" }}>
                    <span style={{ display: "block", fontWeight: 600, textTransform: "capitalize", marginBottom: "2px" }}>{s}</span>
                    <span style={{ color: BRAND.ink, fontWeight: 700 }}>{scenario.fin.revenueScenarios[s].total}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SlideFrame>
      ))}

      {/* ═══════════════ SLIDE 13: OUR TEAM ═══════════════ */}
      <SlideFrame slideNumber={13} sectionLabel="Our Team">
        <SectionTitle>Our Team</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {team.map((m) => (
            <div key={m.name} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{
                width: "100%", height: "240px",
                background: BRAND.cool, borderRadius: "10px",
                marginBottom: "10px", overflow: "hidden", position: "relative",
              }}>
                {m.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.image} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "11px", color: BRAND.muted }}>Headshot</span>
                  </div>
                )}
              </div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "2px" }}>{m.name}</h3>
              <p style={{ fontSize: "10px", color: BRAND.inkLight, fontWeight: 500, marginBottom: "6px" }}>{m.role}</p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {m.highlights.slice(0, 2).map((h) => (
                  <li key={h} style={{
                    fontSize: "9px", color: BRAND.muted, marginBottom: "2px", paddingLeft: "8px", position: "relative", lineHeight: 1.4,
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>
                    <span style={{ position: "absolute", left: 0 }}>&#8226;</span>{h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SlideFrame>

      {/* ═══════════════ SLIDE 14: CLOSING — ALL 3 SCENARIOS ═══════════════ */}
      <SlideFrame slideNumber={14} sectionLabel="Closing" dark>
        <h2 style={{ fontSize: "28px", fontWeight: 700, color: "white", marginBottom: "6px" }}>
          Let&apos;s Build Together
        </h2>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", marginBottom: "20px" }}>
          Three investment pathways — choose the scenario that fits your appetite
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {closingScenarios.map((scenario) => (
            <div key={scenario.key} style={{ background: "rgba(255,255,255,0.06)", borderRadius: "10px", padding: "16px" }}>
              <h4 style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {scenario.label}
              </h4>
              <span style={{ fontSize: "24px", fontWeight: 700, color: "white", display: "block", marginBottom: "2px" }}>
                {scenario.capitalAsk}
              </span>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: "12px" }}>
                Min. {scenario.minimumInvestment}
              </span>

              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "3px 10px", fontSize: "10px", marginBottom: "12px" }}>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>Structure</span>
                <span style={{ color: "rgba(255,255,255,0.75)" }}>{scenario.structure}</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>Close</span>
                <span style={{ color: "rgba(255,255,255,0.75)" }}>{scenario.targetClose}</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>Equity</span>
                <span style={{ color: "rgba(255,255,255,0.75)" }}>{scenario.equityOffered}</span>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "8px" }}>
                <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>{scenario.investorTerms}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact footer */}
        <div style={{ position: "absolute", bottom: "40px", left: `${PAD_X}px`, right: `${PAD_X}px` }}>
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "12px" }}>
            <div>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "white", display: "block" }}>{closing.contact.name}</span>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{closing.contact.title}</span>
            </div>
            <div style={{ textAlign: "right", fontSize: "11px", color: "rgba(255,255,255,0.55)" }}>
              <span style={{ display: "block" }}>{closing.contact.email}</span>
              <span style={{ display: "block" }}>{closing.contact.phone}</span>
            </div>
          </div>
          <p style={{ fontSize: "8px", color: "rgba(255,255,255,0.15)", marginTop: "8px" }}>{closing.disclaimer}</p>
        </div>
      </SlideFrame>
    </div>
  );
}
