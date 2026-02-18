/**
 * All deck content lives here for easy editing.
 * Citra Capital — 34 Craigmore Drive & Lot 3B Craigmore Drive, Halifax, NS
 * Three scenarios: 24 Premium Condos | 38 Condos (Max Density) | 12 Townhomes
 */

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  highlights: string[];
  image: string;
}

export interface FinancialRow {
  label: string;
  values: (string | number)[];
  highlight?: boolean;
}

export interface HomeType {
  id: string;
  name: string;
  tagline: string;
  specs: { label: string; value: string }[];
  floorPlanImage: string;
  exteriorImage: string;
  targetBuyer: string;
  priceBand: string;
  features: string[];
}

export interface ZoningItem {
  label: string;
  value: string;
}

export interface Section {
  id: string;
  navLabel: string;
  title: string;
  subtitle?: string;
  tileIcon: string;
}

export const sections: Section[] = [
  { id: "cover", navLabel: "Cover", title: "Craigmore Drive", subtitle: "A Citra Capital Development", tileIcon: "01" },
  { id: "opportunity", navLabel: "The Opportunity", title: "The Opportunity", subtitle: "Why now, why here", tileIcon: "02" },
  { id: "property", navLabel: "Current Property", title: "The Current Property", subtitle: "Site overview and potential", tileIcon: "03" },
  { id: "zoning", navLabel: "Zoning & Surroundings", title: "Zoning & Surroundings", subtitle: "Entitlements and neighbourhood", tileIcon: "04" },
  { id: "homes", navLabel: "Development Options", title: "Development Options", subtitle: "Three viable pathways", tileIcon: "05" },
  { id: "financials", navLabel: "Financials", title: "Financial Projections", subtitle: "Returns, costs, and timeline", tileIcon: "06" },
  { id: "team", navLabel: "Our Team", title: "Our Team", subtitle: "Experienced developers and operators", tileIcon: "07" },
  { id: "closing", navLabel: "Closing", title: "Let's Build Together", subtitle: "Investment details and next steps", tileIcon: "08" },
];

export const cover = {
  headline: "Craigmore Drive",
  tagline: "A Citra Capital Development",
  date: "February 2026",
  location: "Halifax, Nova Scotia",
  backgroundImage: "/images/craigmore-drone-1.jpg",
};

export const team: TeamMember[] = [
  {
    name: "Sam Gillett",
    role: "Managing Partner",
    bio: "Experienced real estate developer and entrepreneur with a track record of sourcing, structuring, and executing residential development projects across Atlantic Canada. Managing Partner at Citra Capital, overseeing all aspects of acquisition, development strategy, and investor relations.",
    highlights: [
      "Managing Partner at Citra Capital — leading residential development and investment across Nova Scotia",
      "Deep expertise in land acquisition, municipal approvals, and project execution from site selection to delivery",
      "Strong relationships with local contractors, planners, and municipal stakeholders throughout HRM",
    ],
    image: "/images/sam-gillett.png",
  },
  {
    name: "Byron Kavanagh",
    role: "Chief Investment Officer",
    bio: "5+ years immersed in real estate investment and development across Nova Scotia. Co-founder and Chief Investment Officer of Citra Capital, leading acquisition, financing, and execution of residential projects province-wide.",
    highlights: [
      "Chief Investment Officer, Citra Capital — developing, owning, and managing properties across Nova Scotia",
      "Extensive experience in land acquisition, municipal zoning, permit acquisition, pro forma modelling, and capital structuring",
      "Born and raised in Halifax with deep local market knowledge and long-standing relationships across HRM",
    ],
    image: "/images/byron-kavanagh.png",
  },
  {
    name: "Jack Gillett",
    role: "Director of Development",
    bio: "Hands-on development professional with experience managing residential construction projects from pre-development through delivery. Director of Development at Citra Capital, responsible for overseeing construction timelines, contractor relationships, and quality assurance.",
    highlights: [
      "Director of Development at Citra Capital — managing construction timelines, budgets, and on-site execution",
      "Experience coordinating trades, consultants, and municipal inspections across multi-unit residential projects",
      "Detail-oriented approach to quality control and cost management throughout the development lifecycle",
    ],
    image: "/images/jack-gillett.png",
  },
];

export const opportunity = {
  headline: "The Opportunity",
  subtitle: "34 Craigmore Drive and Lot 3B Craigmore Drive comprise two contiguous parcels totaling 22,000+ square feet in a growing residential corridor of Halifax. The properties have been successfully upzoned to R-3 zoning, permitting up to 38 residential units as-of-right, materially enhancing density and reducing entitlement risk.",
  buildOverview: {
    totalUnits: "Up to 38 units as-of-right",
    composition: "3 development pathways",
    acreage: "22,000+ sq ft (two parcels)",
    timeline: "24–30 months",
    renderImage: "/images/build-at-a-glance.png",
  },
  mapImage: "/images/craigmore-map-site.png",
  locationStats: [
    { icon: "transit", label: "Halifax Transit", detail: "Multiple bus routes within walking distance" },
    { icon: "highway", label: "Highway Access", detail: "Quick connection via major corridors" },
    { icon: "shopping", label: "Retail & Services", detail: "Nearby shopping, dining, and amenities" },
    { icon: "school", label: "Schools Nearby", detail: "Elementary through high school options" },
    { icon: "downtown", label: "Close to Downtown", detail: "Halifax core within easy reach" },
    { icon: "waterfront", label: "Parks & Recreation", detail: "Nearby parks, lakes, and trail systems" },
  ],
  thesis: [
    {
      title: "Zoning Certainty",
      description: "The properties have been successfully upzoned to R-3 zoning, permitting up to 38 residential units as-of-right — eliminating the rezoning risk that typically adds 12–18 months to development timelines.",
      stat: "38",
      statLabel: "Units permitted as-of-right",
      source: "HRM Planning & Development",
    },
    {
      title: "Supply Shortage",
      description: "HRM added 11,600 residents in 2024 but completed only 3,179 new housing units — a growing deficit now estimated at 17,500–20,000 units.",
      stat: "17,500",
      statLabel: "Unit housing deficit in HRM",
      source: "Helio Urban Development, 2024",
    },
    {
      title: "Strong Growth",
      description: "Halifax's population grew 4.4% in 2022 and 4.0% in 2023 — among the fastest rates for any major Canadian metro — driven primarily by international migration.",
      stat: "4.0%",
      statLabel: "HRM population growth (2023)",
      source: "Halifax Partnership, 2024",
    },
    {
      title: "Product Flexibility",
      description: "The site supports three viable development pathways — premium condos, maximum-density condos, or townhomes — allowing the strategy to align with market conditions at time of construction.",
      stat: "3",
      statLabel: "Development scenarios modelled",
      source: "",
    },
  ],
  demandDrivers: [
    "Population growth driven by immigration and interprovincial migration",
    "R-3 as-of-right zoning eliminates approval risk and accelerates timeline",
    "Three executable paths provide strategic flexibility across market conditions",
    "Rising rents pushing tenants toward home ownership",
    "Limited new condo and townhouse supply in established Halifax neighbourhoods",
    "Strong school districts and community amenities nearby",
  ],
};

export const property = {
  location: "Halifax, Nova Scotia",
  address: "34 Craigmore Drive & Lot 3B Craigmore Drive",
  totalAcreage: "22,000+ sq ft (two contiguous parcels)",
  proposedLots: "Up to 38 residential units (R-3 as-of-right)",
  zoning: "R-3 — up to 38 units as-of-right",
  servicing: "Municipal water and sewer available",
  topography: "[TBD — site characteristics]",
  access: "Frontage on Craigmore Drive with neighbourhood road access",
  sitePlanImage: "/images/site-plan.jpg",
  locationImage: "/images/craigmore-map-site.png",
  galleryImages: [
    { src: "/images/craigmore-drone-1.jpg", caption: "Aerial drone view of Craigmore Drive and surrounding neighbourhood" },
    { src: "/images/craigmore-drone-2.jpg", caption: "Drone perspective of the development site and streetscape" },
    { src: "/images/craigmore-map-site.png", caption: "Satellite view with property boundary outlined" },
  ],
  constraints: [
    "Rock-wall / bedrock exposure along the western perimeter of the westernmost lot — may require blasting or engineered foundation solutions",
    "New water line required from the lot at the corner of Joseph Howe Drive and Craigmore Drive — estimated cost $150,000–$175,000",
  ],
  advantages: [
    "R-3 as-of-right zoning for up to 38 units — no rezoning required",
    "Two contiguous parcels totaling 22,000+ sq ft",
    "Established residential corridor with strong desirability",
    "Municipal services available at property line",
    "Proximity to schools, transit, retail, and highway access",
    "Flexible site layout supporting condos or townhome configurations",
  ],
  communalAmenities: [
    "Landscaped common areas and green space",
    "Visitor parking and well-designed circulation",
    "Modern architectural design complementing neighbourhood character",
    "Pedestrian-friendly site layout with walkways",
    "Potential for shared amenity space (fitness, lounge)",
  ],
};

/* ── Zoning & Surroundings ── */

export const zoning = {
  headline: "Zoning & Surroundings",
  subtitle: "34 Craigmore Drive and Lot 3B Craigmore Drive have been upzoned to R-3 zoning, permitting up to 38 residential units as-of-right — a significant entitlement that eliminates rezoning risk and accelerates the development timeline.",
  classification: "R-3 Residential (as-of-right)",
  maxUnits: "38 units",
  entitlements: [
    { label: "Zoning Classification", value: "R-3 Residential" },
    { label: "Zoning Status", value: "Upzoned — as-of-right for 38 units" },
    { label: "Permitted Use", value: "Multi-unit residential (condos or townhomes)" },
    { label: "Max Units", value: "38 residential units" },
    { label: "Total Site Area", value: "22,000+ sq ft (two parcels)" },
    { label: "Parcels", value: "34 Craigmore Dr + Lot 3B Craigmore Dr" },
  ] as ZoningItem[],
  surroundings: [
    "Established single-family residential neighbourhood",
    "Walking distance to schools and community facilities",
    "Access to highway corridors and public transit",
    "Proximity to retail, dining, and professional services",
    "Nearby parks, lakes, and trail systems for recreation",
    "Well-maintained streetscape with mature tree canopy",
  ],
  mapImage: "/images/craigmore-map-site.png",
  advantages: [
    "No rezoning application required — saves 12–18 months",
    "R-3 as-of-right status reduces approval uncertainty to near zero",
    "Municipal infrastructure already in place",
    "Neighbourhood supports higher-density residential",
    "Flexible zoning accommodates condos, premium condos, and townhome formats",
  ],
};

/* ── Scenario A: 24 Premium Condo Units (12 Townhomes × 2 Units Each) ── */

export const premiumCondoUnit: HomeType = {
  id: "premium-condo",
  name: "Premium Condo (24 Units)",
  tagline: "12 two-storey townhomes yielding 24 saleable units (12×1BR + 12×2BR) with seller-friendly pricing, 18-month build timeline, and strong investor returns via LP/GP waterfall structure",
  specs: [
    { label: "Buildings", value: "12 townhomes" },
    { label: "Saleable Units", value: "24 (12×1BR + 12×2BR)" },
    { label: "2BR Price Range", value: "$745,000 – $889,000" },
    { label: "1BR Price Range", value: "$445,000 – $539,000" },
    { label: "Target Schedule", value: "18 months" },
    { label: "Construction Loan", value: "70% LTC" },
    { label: "Investor Structure", value: "LP equity, 8% pref + 60/40 split" },
    { label: "Infrastructure", value: "New water line included" },
  ],
  floorPlanImage: "",
  exteriorImage: "/images/townhome-exterior.jpg",
  targetBuyer: "Young professionals, downsizers, and families seeking modern 1BR or 2BR townhome-style condo units priced between $445K–$889K in a desirable Halifax neighbourhood — with long-term rental conversion optionality providing downside protection.",
  priceBand: "$445,000 – $889,000",
  features: [
    "24 saleable units across 12 townhome buildings — 12 one-bedroom and 12 two-bedroom (2-storey)",
    "Projected revenue of $14.3M – $17.1M with stress-tested downside still delivering 16.2% IRR",
    "LP investor structure with 8% preferred return and 60/40 LP/GP profit split",
    "All units convertible to long-term rentals for downside protection and regulatory flexibility",
    "New water line installation and full site infrastructure included in budget",
    "18-month construction timeline with presale campaign option to de-risk",
  ],
};

/* ── Scenario B: 38 Luxury Condo Units (Maximum Density) ── */

export const maxDensityCondoUnit: HomeType = {
  id: "max-density-condo",
  name: "Luxury Condo (38 Units)",
  tagline: "Full utilization of R-3 zoning with luxury positioning — 38 premium two-bedroom plus den units averaging 1,415 sq ft with high-end amenities including fitness center, pool, guest suite, and underground parking",
  specs: [
    { label: "Bedrooms", value: "2 + Den" },
    { label: "Bathrooms", value: "2" },
    { label: "Unit Size", value: "1,415 sq ft" },
    { label: "Total Units", value: "38" },
    { label: "Building Area", value: "82,636 sq ft" },
    { label: "Parking", value: "Underground (38 spaces)" },
    { label: "Amenities", value: "7,500 sq ft (gym, pool, guest suite)" },
    { label: "Common Areas", value: "8,066 sq ft" },
  ],
  floorPlanImage: "",
  exteriorImage: "/images/38-unit-craigmore-render.jpeg",
  targetBuyer: "Downsizers, professionals, and empty nesters seeking premium 2-bed+den units in Halifax's luxury residential segment with high-end amenities and underground parking.",
  priceBand: "$1,195,000 – $1,895,000",
  features: [
    "Premium 1,415 sq ft two-bedroom plus den layouts with luxury finishes",
    "Tiered pricing strategy: Standard, Mid-Tier, and Premium floor levels",
    "Full amenity package including pool, fitness center, and guest suite",
    "Secure underground parking garage with 38 dedicated spaces",
    "High-performance building envelope with energy-efficient systems",
    "Average $1,047/sq ft positions in Halifax's premium market segment",
  ],
};

/* ── Scenario C: 12 Townhomes ── */

export const townhomeUnit: HomeType = {
  id: "townhome",
  name: "Townhome (12 Units)",
  tagline: "Lower density, end-user focused product — spacious 3-bedroom, 3-bathroom townhomes with in-law suite potential arranged in two rows of attached units",
  specs: [
    { label: "Bedrooms", value: "3" },
    { label: "Bathrooms", value: "3" },
    { label: "Total Units", value: "12" },
    { label: "Configuration", value: "Two rows of attached townhomes" },
    { label: "Special Feature", value: "In-law suite potential" },
    { label: "Cost per Unit", value: "$500,000 construction" },
    { label: "Sale Price", value: "$950,000 per unit" },
    { label: "Infrastructure", value: "New water line included" },
  ],
  floorPlanImage: "",
  exteriorImage: "/images/craigmore-12-townhouses.jpg",
  targetBuyer: "Families, multi-generational households, and move-up buyers seeking spacious 3-bed/3-bath townhomes with in-law suite flexibility at $950K in a desirable Halifax neighbourhood.",
  priceBand: "$950,000",
  features: [
    "Spacious 3-bedroom, 3-bathroom layout with multi-generational flexibility",
    "In-law suite potential for rental income or extended family living",
    "Two rows of attached townhomes with modern architectural design",
    "New water line installation and full site infrastructure included",
    "Cost-efficient construction at $500K per unit delivering strong margins",
    "Market-aligned $950K price point in Halifax's premium townhouse segment",
  ],
};

/* ── Financials: Scenario A — 24 Premium Condos (12 Townhomes × 2 Units) ── */

export const financialsPremiumCondos = {
  summary: {
    totalProjectCost: "$11.7M",
    totalRevenue: "$14.3M – $17.1M",
    netProfit: "$2.6M – $5.4M",
    equityRequired: "$3.5M",
    debtFinancing: "$8.2M (70% LTC)",
    projectedIRR: "30.9% – 57.2%",
    equityMultiple: "1.50x – 1.97x",
    projectTimeline: "18 months",
  },
  costBreakdown: [
    { label: "Land Acquisition", values: ["$2,000,000", "17%"] },
    { label: "Vertical Construction", values: ["$6,000,000", "51%"] },
    { label: "Site Prep & Civil", values: ["$500,000", "4%"] },
    { label: "Water Line / Infrastructure", values: ["$162,500", "1%"] },
    { label: "Hard Cost Contingency (10%)", values: ["$666,250", "6%"] },
    { label: "GC / Developer Fee (15%)", values: ["$999,375", "9%"] },
    { label: "Permits & Municipal Fees", values: ["$432,000", "4%"] },
    { label: "Financing Costs", values: ["$400,000", "3%"] },
    { label: "Sales & Marketing (3.5%)", values: ["$549,780", "5%"] },
    { label: "Total Project Cost", values: ["$11,709,905", "100%"], highlight: true },
  ] as FinancialRow[],
  revenueBreakdown: [
    { label: "2BR Units (12 × $745K–$889K)", values: ["$8,940,000 – $10,668,000", "63%"] },
    { label: "1BR Units (12 × $445K–$539K)", values: ["$5,340,000 – $6,468,000", "37%"] },
    { label: "Total Revenue (Low – High)", values: ["$14,280,000 – $17,136,000", "100%"], highlight: true },
  ] as FinancialRow[],
  timeline: [
    { phase: "Q1–Q2 2026", milestone: "Land closing, planning, permits & financing" },
    { phase: "Q2–Q3 2026", milestone: "Presale campaign launch ($50K marketing)" },
    { phase: "Q3 2026–Q4 2027", milestone: "Construction — 18-month build" },
    { phase: "Q1 2028", milestone: "Unit closings and investor distributions" },
  ],
  sensitivity: [
    { scenario: "Stress (−10% vs Low)", irr: "16.2%", multiple: "1.25x", profit: "$1.2M" },
    { scenario: "Low Case", irr: "30.9%", multiple: "1.50x", profit: "$2.6M" },
    { scenario: "Mid Case", irr: "44.3%", multiple: "1.73x", profit: "$4.0M" },
    { scenario: "High Case", irr: "57.2%", multiple: "1.97x", profit: "$5.4M" },
  ],
  revenueScenarios: {
    worst:  { units: "$12,852,000", total: "$12,852,000" },
    likely: { units: "$15,708,000", total: "$15,708,000" },
    best:   { units: "$17,136,000", total: "$17,136,000" },
  },
  waterfall: {
    prefReturn: "8% annually (12% total over 18 months)",
    lpGpSplit: "60% LP / 40% GP after pref",
    investorEquity: "$3,497,978",
    scenarios: [
      { scenario: "Low", lpProfit: "$1,739,948", gpProfit: "$880,127", lpTotal: "$5,237,925" },
      { scenario: "Mid", lpProfit: "$2,566,760", gpProfit: "$1,431,335", lpTotal: "$6,064,737" },
      { scenario: "High", lpProfit: "$3,393,572", gpProfit: "$1,982,543", lpTotal: "$6,891,549" },
      { scenario: "Stress", lpProfit: "$883,148", gpProfit: "$308,927", lpTotal: "$4,381,125" },
    ],
  },
  capitalStack: {
    investorEquity: "$3,497,978",
    constructionLoan: "$8,161,947",
    totalCapital: "$11,659,925",
  },
  chartData: {
    costPie: [
      { name: "Land", value: 2000000, color: "#023E40" },
      { name: "Construction", value: 6000000, color: "#124546" },
      { name: "Site & Infrastructure", value: 662500, color: "#2a6b6d" },
      { name: "Contingency", value: 666250, color: "#3d8586" },
      { name: "GC / Developer Fee", value: 999375, color: "#5a7e7f" },
      { name: "Permits", value: 432000, color: "#8aacad" },
      { name: "Marketing", value: 549780, color: "#a3d9db" },
      { name: "Financing", value: 400000, color: "#D0ECED" },
    ],
    revenuePie: [
      { name: "2BR Units (12)", value: 9804000, color: "#023E40" },
      { name: "1BR Units (12)", value: 5904000, color: "#2a6b6d" },
    ],
    cashflow: [
      { quarter: "Q1 '26", inflow: 0, outflow: -2000, cumulative: -2000 },
      { quarter: "Q2 '26", inflow: 0, outflow: -1200, cumulative: -3200 },
      { quarter: "Q3 '26", inflow: 0, outflow: -2000, cumulative: -5200 },
      { quarter: "Q4 '26", inflow: 1500, outflow: -2000, cumulative: -5700 },
      { quarter: "Q1 '27", inflow: 3000, outflow: -2000, cumulative: -4700 },
      { quarter: "Q2 '27", inflow: 4500, outflow: -1500, cumulative: -1700 },
      { quarter: "Q3 '27", inflow: 4500, outflow: -1000, cumulative: 1800 },
      { quarter: "Q4 '27", inflow: 2200, outflow: -500, cumulative: 3500 },
    ],
  },
};

/* ── Financials: Scenario B — 38 Luxury Condos (Max Density) ── */

export const financialsMaxDensity = {
  summary: {
    totalProjectCost: "$35.6M",
    totalRevenue: "$56.3M",
    netProfit: "$20.7M",
    equityRequired: "$12.5M",
    debtFinancing: "$23.1M",
    projectedIRR: "50–55%",
    equityMultiple: "2.66x",
    projectTimeline: "30–42 months",
  },
  costBreakdown: [
    { label: "Land Acquisition", values: ["$2,000,000", "6%"] },
    { label: "Construction (82,636 sq ft × $325/sf)", values: ["$26,856,700", "75%"] },
    { label: "Contingency (10%)", values: ["$2,685,670", "8%"] },
    { label: "Marketing & Sales (4%)", values: ["$2,252,000", "6%"] },
    { label: "Financing Costs", values: ["$1,800,000", "5%"] },
    { label: "Total Project Cost", values: ["$35,594,370", "100%"], highlight: true },
  ] as FinancialRow[],
  revenueBreakdown: [
    { label: "Premium Units (8 × $1,895,000)", values: ["$15,160,000", "27%"] },
    { label: "Mid-Tier Units (15 × $1,545,000)", values: ["$23,175,000", "41%"] },
    { label: "Standard Units (15 × $1,195,000)", values: ["$17,925,000", "32%"] },
    { label: "Total Revenue", values: ["$56,300,000", "100%"], highlight: true },
  ] as FinancialRow[],
  timeline: [
    { phase: "Q1–Q2 2026", milestone: "Land closing, planning, permits & financing" },
    { phase: "Q3 2026–Q2 2028", milestone: "Construction — groundbreaking to completion" },
    { phase: "Q3 2028–Q1 2029", milestone: "Unit closings and final payouts" },
  ],
  sensitivity: [
    { scenario: "Conservative (−10%)", irr: "35–40%", multiple: "2.21x", profit: "$15.1M" },
    { scenario: "Base Case", irr: "50–55%", multiple: "2.66x", profit: "$20.7M" },
    { scenario: "Optimistic (+10%)", irr: "65–70%", multiple: "3.11x", profit: "$26.3M" },
  ],
  revenueScenarios: {
    worst:  { units: "$50,670,000", total: "$50,670,000" },
    likely: { units: "$56,300,000", total: "$56,300,000" },
    best:   { units: "$61,930,000", total: "$61,930,000" },
  },
  chartData: {
    costPie: [
      { name: "Land", value: 2000000, color: "#023E40" },
      { name: "Construction", value: 26856700, color: "#124546" },
      { name: "Contingency", value: 2685670, color: "#2a6b6d" },
      { name: "Marketing", value: 2252000, color: "#5a7e7f" },
      { name: "Financing", value: 1800000, color: "#a3d9db" },
    ],
    revenuePie: [
      { name: "Premium (8)", value: 15160000, color: "#023E40" },
      { name: "Mid-Tier (15)", value: 23175000, color: "#2a6b6d" },
      { name: "Standard (15)", value: 17925000, color: "#5a7e7f" },
    ],
    cashflow: [
      { quarter: "Q1 '26", inflow: 0, outflow: -2000, cumulative: -2000 },
      { quarter: "Q2 '26", inflow: 0, outflow: -3200, cumulative: -5200 },
      { quarter: "Q3 '26", inflow: 0, outflow: -4800, cumulative: -10000 },
      { quarter: "Q4 '26", inflow: 2800, outflow: -4800, cumulative: -12000 },
      { quarter: "Q1 '27", inflow: 5600, outflow: -4800, cumulative: -11200 },
      { quarter: "Q2 '27", inflow: 8400, outflow: -4800, cumulative: -7600 },
      { quarter: "Q3 '27", inflow: 11200, outflow: -3600, cumulative: 0 },
      { quarter: "Q4 '27", inflow: 11200, outflow: -2400, cumulative: 8800 },
      { quarter: "Q1 '28", inflow: 11200, outflow: -1200, cumulative: 18800 },
      { quarter: "Q2 '28", inflow: 5600, outflow: -600, cumulative: 23800 },
    ],
  },
};

/* ── Financials: Scenario C — 12 Townhomes ── */

export const financialsTownhomes = {
  summary: {
    totalProjectCost: "$9.5M",
    totalRevenue: "$11.4M",
    netProfit: "$1.9M",
    equityRequired: "$2.9M",
    debtFinancing: "$6.7M",
    projectedIRR: "22–25%",
    equityMultiple: "1.49x",
    projectTimeline: "22–33 months",
  },
  costBreakdown: [
    { label: "Land Acquisition", values: ["$2,000,000", "21%"] },
    { label: "Building Construction (12 × $500K)", values: ["$6,000,000", "63%"] },
    { label: "Water Line Installation", values: ["$150,000", "2%"] },
    { label: "Site Work & Infrastructure", values: ["$200,000", "2%"] },
    { label: "Architecture & Engineering", values: ["$150,000", "2%"] },
    { label: "Permits & Development Charges", values: ["$100,000", "1%"] },
    { label: "Legal & Accounting", values: ["$75,000", "1%"] },
    { label: "Marketing & Sales (3%)", values: ["$342,000", "4%"] },
    { label: "Insurance & Contingency", values: ["$125,000", "1%"] },
    { label: "Financing Costs", values: ["$400,000", "4%"] },
    { label: "Total Project Cost", values: ["$9,542,000", "100%"], highlight: true },
  ] as FinancialRow[],
  revenueBreakdown: [
    { label: "12 Townhouses @ $950,000 each", values: ["$11,400,000", "100%"] },
    { label: "Total Revenue", values: ["$11,400,000", "100%"], highlight: true },
  ] as FinancialRow[],
  timeline: [
    { phase: "Q1–Q2 2026", milestone: "Planning, permits, financing, water line install" },
    { phase: "Q3 2026–Q4 2027", milestone: "Construction — groundbreaking to completion" },
    { phase: "Q1–Q3 2028", milestone: "Unit closings and final payouts" },
  ],
  sensitivity: [
    { scenario: "Conservative (−10%)", irr: "10–14%", multiple: "1.25x", profit: "$718K" },
    { scenario: "Base Case", irr: "22–25%", multiple: "1.49x", profit: "$1.9M" },
    { scenario: "Optimistic (+10%)", irr: "35–40%", multiple: "2.05x", profit: "$3.0M" },
  ],
  revenueScenarios: {
    worst:  { units: "$10,260,000", total: "$10,260,000" },
    likely: { units: "$11,400,000", total: "$11,400,000" },
    best:   { units: "$12,540,000", total: "$12,540,000" },
  },
  chartData: {
    costPie: [
      { name: "Land", value: 2000000, color: "#023E40" },
      { name: "Construction", value: 6000000, color: "#124546" },
      { name: "Water Line", value: 150000, color: "#2a6b6d" },
      { name: "Site Work", value: 200000, color: "#3d8586" },
      { name: "Soft Costs", value: 325000, color: "#5a7e7f" },
      { name: "Marketing", value: 342000, color: "#8aacad" },
      { name: "Insurance & Contingency", value: 125000, color: "#a3d9db" },
      { name: "Financing", value: 400000, color: "#D0ECED" },
    ],
    revenuePie: [
      { name: "Townhouses (12)", value: 11400000, color: "#023E40" },
    ],
    cashflow: [
      { quarter: "Q1 '26", inflow: 0, outflow: -2000, cumulative: -2000 },
      { quarter: "Q2 '26", inflow: 0, outflow: -550, cumulative: -2550 },
      { quarter: "Q3 '26", inflow: 0, outflow: -1200, cumulative: -3750 },
      { quarter: "Q4 '26", inflow: 950, outflow: -1500, cumulative: -4300 },
      { quarter: "Q1 '27", inflow: 1900, outflow: -1500, cumulative: -3900 },
      { quarter: "Q2 '27", inflow: 2850, outflow: -1200, cumulative: -2250 },
      { quarter: "Q3 '27", inflow: 2850, outflow: -800, cumulative: -200 },
      { quarter: "Q4 '27", inflow: 1900, outflow: -400, cumulative: 1300 },
      { quarter: "Q1 '28", inflow: 950, outflow: -200, cumulative: 2050 },
    ],
  },
};

export interface ClosingScenario {
  key: string;
  label: string;
  capitalAsk: string;
  minimumInvestment: string;
  targetClose: string;
  structure: string;
  equityOffered: string;
  investorTerms: string;
  useOfFunds: { label: string; amount: string; percent: string }[];
  timeline: { date: string; event: string }[];
}

export const closingScenarios: ClosingScenario[] = [
  {
    key: "premium-condos",
    label: "24 Premium Condos",
    capitalAsk: "$3,497,978",
    minimumInvestment: "$250,000",
    targetClose: "Q1 2026",
    structure: "Limited Partnership (LP/GP)",
    equityOffered: "60% LP / 40% GP after 8% pref",
    investorTerms:
      "8% preferred return (12% total over 18 months). Remaining profit split 60/40 LP/GP. Full capital returned before any profit distributions.",
    useOfFunds: [
      { label: "Land Acquisition", amount: "$2,000,000", percent: "17%" },
      { label: "Construction & Site Work", amount: "$6,500,000", percent: "56%" },
      { label: "GC / Developer Fee", amount: "$999,375", percent: "9%" },
      { label: "Permits & Municipal Fees", amount: "$432,000", percent: "4%" },
      { label: "Marketing & Sales", amount: "$549,780", percent: "5%" },
      { label: "Financing & Contingency", amount: "$1,066,250", percent: "9%" },
    ],
    timeline: [
      { date: "Q1 2026", event: "Capital raise close & land acquisition" },
      { date: "Q1–Q2 2026", event: "Planning, permits & financing" },
      { date: "Q2–Q3 2026", event: "Presale campaign launch" },
      { date: "Q3 2026", event: "Construction commences (18-month build)" },
      { date: "Q4 2027", event: "Unit closings begin" },
      { date: "Q1 2028", event: "Final distributions to investors" },
    ],
  },
  {
    key: "max-density",
    label: "38 Luxury Condos",
    capitalAsk: "$12,458,029",
    minimumInvestment: "$250,000",
    targetClose: "Q1 2026",
    structure: "Limited Partnership",
    equityOffered: "75% Investor / 25% Developer",
    investorTerms:
      "Full capital returned to investors before any profit distributions. 75/25 profit split (investor/developer).",
    useOfFunds: [
      { label: "Land Acquisition", amount: "$2,000,000", percent: "6%" },
      { label: "Construction (82,636 sq ft)", amount: "$26,856,700", percent: "75%" },
      { label: "Contingency (10%)", amount: "$2,685,670", percent: "8%" },
      { label: "Marketing & Sales (4%)", amount: "$2,252,000", percent: "6%" },
      { label: "Financing Costs", amount: "$1,800,000", percent: "5%" },
    ],
    timeline: [
      { date: "Q1 2026", event: "Capital raise close & land acquisition" },
      { date: "Q1–Q2 2026", event: "Planning, permits & financing" },
      { date: "Q3 2026", event: "Construction commences" },
      { date: "Q3 2028", event: "Unit closings begin" },
      { date: "Q1 2029", event: "Project completion & final distributions" },
    ],
  },
  {
    key: "townhomes",
    label: "12 Townhomes",
    capitalAsk: "$2,867,000",
    minimumInvestment: "$250,000",
    targetClose: "Q1 2026",
    structure: "Limited Partnership",
    equityOffered: "75% Investor / 25% Developer",
    investorTerms:
      "Full capital returned to investors before any profit distributions. 75/25 profit split (investor/developer).",
    useOfFunds: [
      { label: "Land Acquisition", amount: "$2,000,000", percent: "21%" },
      { label: "Building Construction", amount: "$6,000,000", percent: "63%" },
      { label: "Water Line & Site Work", amount: "$350,000", percent: "4%" },
      { label: "Soft Costs (Arch, Eng, Legal)", amount: "$325,000", percent: "3%" },
      { label: "Marketing & Sales", amount: "$342,000", percent: "4%" },
      { label: "Insurance, Contingency & Financing", amount: "$525,000", percent: "6%" },
    ],
    timeline: [
      { date: "Q1 2026", event: "Capital raise close & land acquisition" },
      { date: "Q1–Q2 2026", event: "Planning, permits & water line install" },
      { date: "Q3 2026", event: "Construction commences" },
      { date: "Q4 2027", event: "Construction completion" },
      { date: "Q1–Q3 2028", event: "Unit closings & final distributions" },
    ],
  },
];

export const closing = {
  contact: {
    name: "Sam Gillett",
    title: "Managing Partner, Citra Capital",
    email: "sam@citracapital.ca",
    phone: "(902) 555-0100",
    address: "Halifax, NS",
  },
  disclaimer:
    "This document is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities. Investment involves risk. Past performance is not indicative of future results.",
};
