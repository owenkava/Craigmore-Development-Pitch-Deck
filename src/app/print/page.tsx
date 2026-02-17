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
import {
  PieChart,
  Pie,
  Cell,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  ComposedChart,
} from "recharts";

/**
 * Print route: renders each section as a 16:9 landscape slide
 * for PDF export via Puppeteer. 14 slides total.
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
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 14px", fontSize: "11px" }}>
      {specs.map((s) => (
        <div key={s.label} style={{ display: "contents" }}>
          <span style={{ color: dark ? "rgba(255,255,255,0.45)" : BRAND.muted }}>{s.label}</span>
          <span style={{ fontWeight: 500, textAlign: "right", color: dark ? "#fff" : BRAND.ink }}>{s.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */

export default function PrintPage() {
  /* Alias the primary financials (38 Luxury Condo — best numbers) */
  const financials = financialsMaxDensity;

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
                ["Topography", property.topography],
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

      {/* ═══════════════ SLIDE 5: PROPERTY — GALLERY & AMENITIES ═══════════════ */}
      <SlideFrame slideNumber={5} sectionLabel="Current Property" bgColor={BRAND.cool}>
        <SectionTitle>Gallery &amp; Community Amenities</SectionTitle>
        {/* Gallery strip */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "24px" }}>
          {property.galleryImages.slice(0, 3).map((img) => (
            <div key={img.src} style={{ borderRadius: "10px", overflow: "hidden", height: "200px", position: "relative" }}>
              <SlideImage src={img.src} alt={img.caption} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
                padding: "8px 12px",
              }}>
                <span style={{ fontSize: "9px", color: "white" }}>{img.caption}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Amenities */}
        <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "12px" }}>Communal Amenities</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {property.communalAmenities.map((a) => (
            <div key={a} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: BRAND.inkLight }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: BRAND.ink, flexShrink: 0 }} />
              {a}
            </div>
          ))}
        </div>
      </SlideFrame>

      {/* ═══════════════ SLIDE 6: ZONING & SURROUNDINGS ═══════════════ */}
      <SlideFrame slideNumber={6} sectionLabel="Zoning & Surroundings">
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

      {/* ═══════════════ SLIDE 7: HOME TYPE — 24 PREMIUM CONDOS ═══════════════ */}
      <SlideFrame slideNumber={7} sectionLabel="Development Options" dark>
        <SectionTitle dark sub={premiumCondoUnit.tagline}>{premiumCondoUnit.name}</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginTop: "8px" }}>
          {/* Left: image + features */}
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

          {/* Right: specs + price + buyer */}
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

      {/* ═══════════════ SLIDE 8: HOME TYPE — 38 LUXURY CONDOS ═══════════════ */}
      <SlideFrame slideNumber={8} sectionLabel="Development Options" dark>
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

      {/* ═══════════════ SLIDE 9: HOME TYPE — 12 TOWNHOMES ═══════════════ */}
      <SlideFrame slideNumber={9} sectionLabel="Development Options" bgColor={BRAND.cool}>
        <SectionTitle sub={townhomeUnit.tagline}>{townhomeUnit.name}</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginTop: "8px" }}>
          <div>
            <div style={{ display: "grid", gridTemplateColumns: townhomeUnit.floorPlanImage ? "1fr 1fr" : "1fr", gap: "12px", marginBottom: "16px" }}>
              <div style={{ borderRadius: "10px", overflow: "hidden", height: "200px", position: "relative" }}>
                {townhomeUnit.exteriorImage ? <SlideImage src={townhomeUnit.exteriorImage} alt="Townhome exterior" /> :
                  <div style={{ background: "rgba(255,255,255,0.6)", width: "100%", height: "100%" }} />}
              </div>
              {townhomeUnit.floorPlanImage && (
                <div style={{ borderRadius: "10px", overflow: "hidden", height: "200px", position: "relative", background: "rgba(255,255,255,0.4)" }}>
                  <SlideImage src={townhomeUnit.floorPlanImage} alt="Townhome floor plan" />
                </div>
              )}
            </div>
            <h4 style={{ fontSize: "11px", fontWeight: 600, marginBottom: "8px" }}>Key Features</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {townhomeUnit.features.map((f) => (
                <Bullet key={f}>{f}</Bullet>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 600, marginBottom: "12px" }}>Specifications</h4>
            <SpecGrid specs={townhomeUnit.specs} />
            <div style={{ background: "rgba(255,255,255,0.5)", borderRadius: "8px", padding: "14px", marginTop: "20px", marginBottom: "20px" }}>
              <span style={{ fontSize: "10px", color: BRAND.muted, display: "block" }}>Price Band</span>
              <span style={{ fontSize: "20px", fontWeight: 700 }}>{townhomeUnit.priceBand}</span>
            </div>
            <h4 style={{ fontSize: "11px", fontWeight: 600, marginBottom: "6px" }}>Target Buyer</h4>
            <p style={{ fontSize: "10px", color: BRAND.inkLight, lineHeight: 1.5 }}>{townhomeUnit.targetBuyer}</p>
          </div>
        </div>
      </SlideFrame>

      {/* ═══════════════ SLIDE 10: FINANCIALS — 38 LUXURY CONDO (CHARTS + SENSITIVITY) ═══════════════ */}
      <SlideFrame slideNumber={10} sectionLabel="Financials">
        <SectionTitle sub="38-Unit Luxury Condo — Primary Scenario">Financial Projections</SectionTitle>

        {/* Key metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "20px" }}>
          {[
            { stat: financials.summary.projectedIRR, label: "Projected IRR" },
            { stat: financials.summary.equityMultiple, label: "Equity Multiple" },
            { stat: financials.summary.netProfit, label: "Net Profit" },
            { stat: financials.summary.projectTimeline, label: "Timeline" },
          ].map((m) => (
            <div key={m.label} style={{ background: BRAND.surface, borderRadius: "10px", padding: "14px" }}>
              <span style={{ fontSize: "24px", fontWeight: 700, display: "block" }}>{m.stat}</span>
              <span style={{ fontSize: "10px", color: BRAND.muted }}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Charts + Sensitivity */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>
          {/* Cost Pie */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 600, marginBottom: "8px" }}>Cost Distribution</h4>
            <PieChart width={340} height={220}>
              <Pie
                data={financials.chartData.costPie}
                cx={170} cy={100}
                innerRadius={50} outerRadius={85}
                paddingAngle={2} dataKey="value"
                isAnimationActive={false}
                label={({ percent }: { percent?: number }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {financials.chartData.costPie.map((e, i) => (
                  <Cell key={i} fill={e.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px", marginTop: "2px" }}>
              {financials.chartData.costPie.map((e) => (
                <div key={e.name} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: e.color, flexShrink: 0 }} />
                  <span style={{ fontSize: "9px", color: BRAND.muted }}>{e.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Pie */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 600, marginBottom: "8px" }}>Revenue Sources</h4>
            <PieChart width={340} height={220}>
              <Pie
                data={financials.chartData.revenuePie}
                cx={170} cy={100}
                innerRadius={50} outerRadius={85}
                paddingAngle={2} dataKey="value"
                isAnimationActive={false}
                label={({ percent }: { percent?: number }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {financials.chartData.revenuePie.map((e, i) => (
                  <Cell key={i} fill={e.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px", marginTop: "2px" }}>
              {financials.chartData.revenuePie.map((e) => (
                <div key={e.name} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: e.color, flexShrink: 0 }} />
                  <span style={{ fontSize: "9px", color: BRAND.muted }}>{e.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sensitivity */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 600, marginBottom: "8px" }}>Sensitivity Analysis</h4>
            <table style={{ width: "100%", fontSize: "11px", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${BRAND.cool}` }}>
                  <th style={{ textAlign: "left", paddingBottom: "6px", fontSize: "9px", color: BRAND.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Scenario</th>
                  <th style={{ textAlign: "right", paddingBottom: "6px", fontSize: "9px", color: BRAND.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>IRR</th>
                  <th style={{ textAlign: "right", paddingBottom: "6px", fontSize: "9px", color: BRAND.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Multiple</th>
                  <th style={{ textAlign: "right", paddingBottom: "6px", fontSize: "9px", color: BRAND.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Profit</th>
                </tr>
              </thead>
              <tbody>
                {financials.sensitivity.map((r) => (
                  <tr key={r.scenario} style={{
                    borderBottom: `1px solid ${BRAND.surface}`,
                    ...(r.scenario === "Base Case" ? { fontWeight: 600, background: BRAND.surface } : {}),
                  }}>
                    <td style={{ padding: "7px 0" }}>{r.scenario}</td>
                    <td style={{ padding: "7px 0", textAlign: "right" }}>{r.irr}</td>
                    <td style={{ padding: "7px 0", textAlign: "right" }}>{r.multiple}</td>
                    <td style={{ padding: "7px 0", textAlign: "right" }}>{r.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Timeline compact */}
            <h4 style={{ fontSize: "12px", fontWeight: 600, marginTop: "20px", marginBottom: "8px" }}>Project Timeline</h4>
            {financials.timeline.map((t) => (
              <div key={t.phase} style={{ display: "flex", gap: "8px", fontSize: "10px", marginBottom: "4px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: BRAND.ink, minWidth: "68px", fontWeight: 500 }}>{t.phase}</span>
                <span style={{ color: BRAND.muted }}>{t.milestone}</span>
              </div>
            ))}
          </div>
        </div>
      </SlideFrame>

      {/* ═══════════════ SLIDE 11: FINANCIAL DETAILS — 38 LUXURY CONDO ═══════════════ */}
      <SlideFrame slideNumber={11} sectionLabel="Financials">
        <SectionTitle sub="38-Unit Luxury Condo — Cost &amp; Revenue Detail">Financial Detail</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "20px" }}>
          {/* Cost Breakdown */}
          <div>
            <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "10px" }}>Cost Breakdown</h4>
            <table style={{ width: "100%", fontSize: "11px", borderCollapse: "collapse" }}>
              <tbody>
                {financials.costBreakdown.map((row) => (
                  <tr key={row.label} style={{
                    borderBottom: `1px solid ${BRAND.surface}`,
                    ...(row.highlight ? { fontWeight: 700, background: BRAND.surface } : {}),
                  }}>
                    <td style={{ padding: "5px 0", color: row.highlight ? BRAND.ink : BRAND.inkLight }}>{row.label}</td>
                    <td style={{ padding: "5px 0", textAlign: "right", fontWeight: 500 }}>{row.values[0]}</td>
                    <td style={{ padding: "5px 0", textAlign: "right", color: BRAND.muted, width: "50px" }}>{row.values[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Revenue Breakdown */}
          <div>
            <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "10px" }}>Revenue Breakdown</h4>
            <table style={{ width: "100%", fontSize: "11px", borderCollapse: "collapse" }}>
              <tbody>
                {financials.revenueBreakdown.map((row) => (
                  <tr key={row.label} style={{
                    borderBottom: `1px solid ${BRAND.surface}`,
                    ...(row.highlight ? { fontWeight: 700, background: BRAND.surface } : {}),
                  }}>
                    <td style={{ padding: "5px 0", color: row.highlight ? BRAND.ink : BRAND.inkLight }}>{row.label}</td>
                    <td style={{ padding: "5px 0", textAlign: "right", fontWeight: 500 }}>{row.values[0]}</td>
                    <td style={{ padding: "5px 0", textAlign: "right", color: BRAND.muted, width: "50px" }}>{row.values[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Revenue scenarios */}
            <h4 style={{ fontSize: "11px", fontWeight: 600, marginTop: "16px", marginBottom: "8px" }}>Revenue Scenarios</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", fontSize: "10px" }}>
              {(["worst", "likely", "best"] as const).map((s) => (
                <div key={s} style={{ background: BRAND.surface, borderRadius: "6px", padding: "8px", textAlign: "center" }}>
                  <span style={{ display: "block", fontWeight: 600, textTransform: "capitalize", marginBottom: "2px" }}>{s}</span>
                  <span style={{ color: BRAND.ink, fontWeight: 700 }}>{financials.revenueScenarios[s].total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cashflow Chart */}
        <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>Quarterly Cash Flow ($K)</h4>
        <ComposedChart width={1100} height={170} data={financials.chartData.cashflow}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
          <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: BRAND.muted }} axisLine={{ stroke: "#e5e5e5" }} />
          <YAxis tick={{ fontSize: 10, fill: BRAND.muted }} axisLine={{ stroke: "#e5e5e5" }} tickFormatter={(v: number) => `$${v}K`} />
          <Bar dataKey="inflow" fill={BRAND.ink} name="Inflows" radius={[3, 3, 0, 0]} isAnimationActive={false} />
          <Bar dataKey="outflow" fill="#d4d4d4" name="Outflows" radius={[3, 3, 0, 0]} isAnimationActive={false} />
          <Line type="monotone" dataKey="cumulative" stroke={BRAND.inkLight} strokeWidth={2} dot={{ r: 3, fill: BRAND.inkLight }} name="Cumulative" isAnimationActive={false} />
        </ComposedChart>
      </SlideFrame>

      {/* ═══════════════ SLIDE 12: SCENARIO COMPARISON ═══════════════ */}
      <SlideFrame slideNumber={12} sectionLabel="Financials">
        <SectionTitle sub="Side-by-side comparison of all three development pathways">Scenario Comparison</SectionTitle>

        <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse", marginTop: "16px" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${BRAND.ink}` }}>
              <th style={{ textAlign: "left", padding: "10px 12px", fontSize: "10px", color: BRAND.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Metric</th>
              <th style={{ textAlign: "center", padding: "10px 12px", fontSize: "10px", color: BRAND.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>24 Premium Condos</th>
              <th style={{ textAlign: "center", padding: "10px 12px", fontSize: "10px", color: BRAND.muted, textTransform: "uppercase", letterSpacing: "0.08em", background: BRAND.surface }}>38 Luxury Condos</th>
              <th style={{ textAlign: "center", padding: "10px 12px", fontSize: "10px", color: BRAND.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>12 Townhomes</th>
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
              { metric: "Timeline", a: financialsPremiumCondos.summary.projectTimeline, b: financialsMaxDensity.summary.projectTimeline, c: financialsTownhomes.summary.projectTimeline },
            ] as { metric: string; a: string; b: string; c: string; bold?: boolean }[]).map((row) => (
              <tr key={row.metric} style={{ borderBottom: `1px solid ${BRAND.cool}`, ...(row.bold ? { fontWeight: 700 } : {}) }}>
                <td style={{ padding: "10px 12px", color: BRAND.inkLight }}>{row.metric}</td>
                <td style={{ padding: "10px 12px", textAlign: "center", fontWeight: row.bold ? 700 : 500 }}>{row.a}</td>
                <td style={{ padding: "10px 12px", textAlign: "center", fontWeight: row.bold ? 700 : 500, background: BRAND.surface }}>{row.b}</td>
                <td style={{ padding: "10px 12px", textAlign: "center", fontWeight: row.bold ? 700 : 500 }}>{row.c}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Scenario sensitivity comparison */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginTop: "28px" }}>
          {([
            { label: "24 Premium Condos", data: financialsPremiumCondos.sensitivity },
            { label: "38 Luxury Condos", data: financialsMaxDensity.sensitivity, highlight: true },
            { label: "12 Townhomes", data: financialsTownhomes.sensitivity },
          ]).map((scenario) => (
            <div key={scenario.label} style={{ background: scenario.highlight ? BRAND.surface : "transparent", borderRadius: "8px", padding: "12px" }}>
              <h4 style={{ fontSize: "11px", fontWeight: 600, marginBottom: "8px" }}>{scenario.label} — Sensitivity</h4>
              <table style={{ width: "100%", fontSize: "10px", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BRAND.cool}` }}>
                    <th style={{ textAlign: "left", paddingBottom: "4px", fontSize: "9px", color: BRAND.muted }}>Case</th>
                    <th style={{ textAlign: "right", paddingBottom: "4px", fontSize: "9px", color: BRAND.muted }}>IRR</th>
                    <th style={{ textAlign: "right", paddingBottom: "4px", fontSize: "9px", color: BRAND.muted }}>Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {scenario.data.map((r) => (
                    <tr key={r.scenario} style={{ borderBottom: `1px solid ${BRAND.surface}` }}>
                      <td style={{ padding: "4px 0" }}>{r.scenario}</td>
                      <td style={{ padding: "4px 0", textAlign: "right" }}>{r.irr}</td>
                      <td style={{ padding: "4px 0", textAlign: "right" }}>{r.profit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </SlideFrame>

      {/* ═══════════════ SLIDE 13: OUR TEAM ═══════════════ */}
      <SlideFrame slideNumber={13} sectionLabel="Our Team">
        <SectionTitle>Our Team</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
          {team.map((m) => (
            <div key={m.name}>
              <div style={{
                width: "100%", aspectRatio: "16/10",
                background: BRAND.cool, borderRadius: "10px",
                marginBottom: "14px", overflow: "hidden", position: "relative",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {m.image ? <SlideImage src={m.image} alt={m.name} /> :
                  <span style={{ fontSize: "11px", color: BRAND.muted }}>Headshot</span>
                }
              </div>
              <h3 style={{ fontSize: "15px", fontWeight: 600 }}>{m.name}</h3>
              <p style={{ fontSize: "11px", color: BRAND.inkLight, fontWeight: 500, marginBottom: "8px" }}>{m.role}</p>
              <p style={{
                fontSize: "10px", color: BRAND.inkLight, marginBottom: "8px", lineHeight: 1.5,
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
              }}>
                {m.bio}
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {m.highlights.slice(0, 2).map((h) => (
                  <li key={h} style={{
                    fontSize: "10px", color: BRAND.muted, marginBottom: "3px", paddingLeft: "10px", position: "relative",
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

      {/* ═══════════════ SLIDE 14: CLOSING ═══════════════ */}
      <SlideFrame slideNumber={14} sectionLabel="Closing" dark>
        <h2 style={{ fontSize: "32px", fontWeight: 700, color: "white", marginBottom: "24px" }}>
          Let&apos;s Build Together
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
          {/* Capital Ask */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 600, color: "white", marginBottom: "16px" }}>Capital Ask</h4>
            <span style={{ fontSize: "36px", fontWeight: 700, color: "white", display: "block", marginBottom: "4px" }}>
              {closingScenarios[0].capitalAsk}
            </span>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "16px" }}>
              Min. investment: {closingScenarios[0].minimumInvestment}
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 12px", fontSize: "11px" }}>
              <span style={{ color: "rgba(255,255,255,0.45)" }}>Structure</span>
              <span style={{ color: "rgba(255,255,255,0.8)" }}>{closingScenarios[0].structure}</span>
              <span style={{ color: "rgba(255,255,255,0.45)" }}>Target Close</span>
              <span style={{ color: "rgba(255,255,255,0.8)" }}>{closingScenarios[0].targetClose}</span>
              <span style={{ color: "rgba(255,255,255,0.45)" }}>Equity Offered</span>
              <span style={{ color: "rgba(255,255,255,0.8)" }}>{closingScenarios[0].equityOffered}</span>
            </div>
            <div style={{ marginTop: "12px", padding: "10px", background: "rgba(255,255,255,0.08)", borderRadius: "6px" }}>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{closingScenarios[0].investorTerms}</p>
            </div>
          </div>

          {/* Use of Funds */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 600, color: "white", marginBottom: "16px" }}>Use of Funds</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "6px 12px", fontSize: "11px" }}>
              {closingScenarios[0].useOfFunds.map((item: { label: string; amount: string; percent: string }) => (
                <div key={item.label} style={{ display: "contents" }}>
                  <span style={{ color: "rgba(255,255,255,0.45)" }}>{item.label}</span>
                  <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500, textAlign: "right" }}>{item.amount}</span>
                  <span style={{ color: "rgba(255,255,255,0.35)", textAlign: "right" }}>{item.percent}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Dates */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 600, color: "white", marginBottom: "16px" }}>Key Dates</h4>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 12px", fontSize: "11px" }}>
              {closingScenarios[0].timeline.map((item: { date: string; event: string }) => (
                <div key={item.date + item.event} style={{ display: "contents" }}>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>{item.date}</span>
                  <span style={{ color: "rgba(255,255,255,0.55)" }}>{item.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact footer */}
        <div style={{ position: "absolute", bottom: "48px", left: `${PAD_X}px`, right: `${PAD_X}px` }}>
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px" }}>
            <div>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "white", display: "block" }}>{closing.contact.name}</span>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{closing.contact.title}</span>
            </div>
            <div style={{ textAlign: "right", fontSize: "11px", color: "rgba(255,255,255,0.55)" }}>
              <span style={{ display: "block" }}>{closing.contact.email}</span>
              <span style={{ display: "block" }}>{closing.contact.phone}</span>
            </div>
          </div>
          <p style={{ fontSize: "8px", color: "rgba(255,255,255,0.15)", marginTop: "12px" }}>{closing.disclaimer}</p>
        </div>
      </SlideFrame>
    </div>
  );
}
