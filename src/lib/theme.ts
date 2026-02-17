/**
 * Theme configuration for the pitch deck.
 * Kings Row Brand Guidelines — deep greens, soft accent, Bounded typeface style.
 */

export const theme = {
  typography: {
    displayFont: "'Inter', system-ui, -apple-system, sans-serif",
    bodyFont: "'Inter', system-ui, -apple-system, sans-serif",
    monoFont: "'JetBrains Mono', ui-monospace, monospace",
    scale: {
      displayXl: "4.5rem",
      displayLg: "3.5rem",
      displayMd: "2.5rem",
      displaySm: "1.875rem",
      headingLg: "1.5rem",
      headingMd: "1.25rem",
      bodyLg: "1.125rem",
      bodyMd: "1rem",
      bodySm: "0.875rem",
      caption: "0.75rem",
    },
  },

  spacing: {
    sectionPadding: "6rem",
    sectionPaddingSm: "4rem",
    gutter: "2rem",
    gutterSm: "1rem",
    cardPadding: "2rem",
    tilePadding: "1.5rem",
  },

  colors: {
    ink: "#023E40",
    inkLight: "#124546",
    inkMuted: "#5a7e7f",
    surfaceWhite: "#ffffff",
    surfaceWarm: "#f0fafa",
    surfaceCool: "#D0ECED",
    surfaceDark: "#023E40",
    accent: "#124546",
    accentSoft: "#D0ECED",
    success: "#16a34a",
    warning: "#d97706",
  },

  /** Section background tones - alternate between these for visual rhythm */
  sectionBackgrounds: [
    "#ffffff",     // 0 Cover - white
    "#ffffff",     // 1 The Opportunity - white
    "#D0ECED",     // 2 Current Property - soft teal
    "#ffffff",     // 3 Zoning & Surroundings - white
    "#023E40",     // 4 Home Types / Dev Options - dark (own bg handling)
    "#f0fafa",     // 5 Financials - warm teal tint
    "#f0fafa",     // 6 Our Team - warm teal tint
    "#023E40",     // 7 Closing - dark (brand primary)
  ] as const,

  shadows: {
    card: "0 1px 3px rgba(2,62,64,0.06), 0 4px 12px rgba(2,62,64,0.04)",
    cardHover: "0 2px 8px rgba(2,62,64,0.08), 0 8px 24px rgba(2,62,64,0.06)",
    subtle: "0 1px 2px rgba(2,62,64,0.04)",
  },

  motion: {
    durationFast: 0.2,
    durationMedium: 0.4,
    durationSlow: 0.6,
    easeSmooth: [0.25, 0.1, 0.25, 1] as const,
    easeOut: [0, 0, 0.2, 1] as const,
  },

  layout: {
    maxWidth: "1400px",
    navWidth: "240px",
    headerHeight: "56px",
    slideAspectRatio: "16/9",
  },
} as const;

export type Theme = typeof theme;
