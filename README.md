# Cole Harbour Subdivision — Investor Pitch Deck

An interactive investor pitch deck built as a web app with Next.js, styled like a premium brand guidelines site.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 14** with App Router and TypeScript
- **Tailwind CSS 3** for utility-first styling
- **Framer Motion** for transitions, hover states, and scroll animations
- **Recharts** for data visualizations (renders in both web and PDF)
- **Puppeteer** for server-side PDF generation

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main deck with grid + section views
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Tailwind + custom styles
│   ├── print/
│   │   └── page.tsx          # Print-optimized route for PDF export
│   └── api/
│       └── export-pdf/
│           └── route.ts      # Puppeteer PDF generation endpoint
├── components/
│   ├── SectionShell.tsx      # Reusable section wrapper
│   ├── Tile.tsx              # Grid tile component
│   ├── StatBlock.tsx         # Stat display component
│   ├── ComparisonCard.tsx    # Comparable subdivision card
│   ├── FinancialTable.tsx    # Data table component
│   ├── ChartBlock.tsx        # Recharts wrapper (pie, bar, line)
│   ├── HomeCard.tsx          # Home type detail card
│   ├── ImagePlaceholder.tsx  # Placeholder for images
│   ├── Navigation.tsx        # Fixed left sidebar nav
│   ├── Header.tsx            # Top header with utility links
│   ├── MobileNav.tsx         # Mobile slide-out navigation
│   ├── SectionNav.tsx        # Prev/next controls per section
│   └── sections/             # Individual section components
│       ├── CoverSection.tsx
│       ├── TeamSection.tsx
│       ├── OpportunitySection.tsx
│       ├── PropertySection.tsx
│       ├── ComparablesSection.tsx
│       ├── FinancialsSection.tsx
│       ├── HomeTypeSection.tsx
│       └── ClosingSection.tsx
├── data/
│   └── deck.ts               # All content in one file for easy editing
└── lib/
    └── theme.ts               # Theme configuration (typography, colors, spacing)
```

## Editing Content

All deck content lives in `src/data/deck.ts`. Edit this single file to change:
- Section titles and copy
- Team member bios
- Financial figures and projections
- Comparable subdivision data
- Home type specs and pricing
- Contact information

## Customizing the Theme

Edit `src/lib/theme.ts` to adjust:
- Typography scale
- Color palette
- Section background tones
- Spacing system
- Animation timing
- Shadow styles

These values are also reflected in `tailwind.config.ts` for utility class usage.

## Adding Images

Place images in `public/images/` and reference them in `deck.ts`:
- `team-1.jpg`, `team-2.jpg`, `team-3.jpg` — Team headshots
- `site-plan.jpg` — Site plan diagram
- `location-map.jpg` — Location overview map
- `floor-plan-a.jpg`, `floor-plan-b.jpg` — Floor plans
- `exterior-a.jpg`, `exterior-b.jpg` — Exterior renders

The app shows placeholder graphics when images are missing.

## PDF Export

### How It Works

1. The **Download PDF** button (top right, persistent) calls `/api/export-pdf`
2. The API route launches Puppeteer, navigates to `/print`
3. The `/print` route renders all sections as 16:9 landscape slides
4. Puppeteer exports to PDF with proper page sizing
5. The file downloads as `Cole Harbour Subdivision Investor Deck.pdf`

### Local Development

PDF export works out of the box locally since Puppeteer downloads Chromium during `npm install`.

```bash
# Start the dev server
npm run dev

# Click "Download PDF" in the UI, or test directly:
curl http://localhost:3000/api/export-pdf -o deck.pdf
```

### Deployment

#### Vercel

Vercel's serverless functions have a 50MB bundle limit and don't include Chromium. Options:

1. **Recommended: Separate PDF service.** Deploy a small Node/Express server on Railway, Render, or Fly.io that runs the Puppeteer export. Set `NEXT_PUBLIC_BASE_URL` to point to the deployed Next.js app.

2. **Use `@sparticuz/chromium`** (Vercel-compatible Chromium). Install it and modify the API route to use the lightweight binary:
   ```bash
   npm install @sparticuz/chromium puppeteer-core
   ```

3. **Use a third-party PDF API** (e.g., Browserless, PDFShift) instead of self-hosted Puppeteer.

#### Self-Hosted Node Server

```bash
npm run build
npm start
```

Set the `NEXT_PUBLIC_BASE_URL` environment variable to your server's URL.

#### Docker

```dockerfile
FROM node:20-slim
RUN apt-get update && apt-get install -y \
    chromium \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
WORKDIR /app
COPY . .
RUN npm ci && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Keyboard Navigation

- **Arrow Down / Right** — Next section
- **Arrow Up / Left** — Previous section
- **Escape** — Return to grid overview

## Accessibility

- Semantic HTML with proper heading hierarchy
- ARIA labels on navigation and interactive elements
- Keyboard navigable throughout
- Sufficient color contrast ratios
- Focus management on section transitions

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). Scroll snap behavior is progressive — the app works without it on older browsers.
