# UPICON Command Platform — Developer Guide

## Project Overview

The UPICON Command Platform is a production-grade Next.js 14 web application providing agentic intelligence and operational command for UPICON's three core divisions:
- **Banking & Financial Inclusion** — BC lifecycle, kiosk ops, transaction monitoring
- **Consultancy & G2G** — DPR/TEV production, survey ops, knowledge management
- **Training & Skilling** — Batch management, outcome tracking, beneficiary support

The platform is designed around an **MD Command Center** providing real-time cross-division intelligence, with AI assistants (copilots) embedded throughout each division's workflow.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + tailwind-merge |
| UI Components | Custom shadcn/ui-style components (`src/components/ui/`) |
| Charts | Recharts |
| Tables | @tanstack/react-table v8 |
| Icons | Lucide React |
| State | Zustand (for future use) |
| Fonts | Inter (via next/font/google) |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx          # Login page
│   ├── (dashboard)/
│   │   ├── layout.tsx              # Dashboard shell (Sidebar + main)
│   │   ├── dashboard/page.tsx      # MD Command Center
│   │   ├── banking/
│   │   │   ├── page.tsx            # Banking division landing
│   │   │   ├── bc-mobilize/        # Lead capture & routing
│   │   │   ├── bc-onboard/         # Eligibility & document flow
│   │   │   ├── bc-assist/          # Hindi-first AI assistant
│   │   │   └── bc-quality/         # Activity & kiosk monitoring
│   │   ├── consultancy/
│   │   │   ├── page.tsx            # Consultancy landing
│   │   │   ├── dpr-copilot/        # DPR drafting + AI assistance
│   │   │   ├── tev-copilot/        # TEV appraisal workspace
│   │   │   ├── survey-ops/         # Field survey management
│   │   │   └── knowledge-hub/      # Documents & SOPs
│   │   ├── training/
│   │   │   ├── page.tsx            # Training landing
│   │   │   ├── trainer-os/         # Attendance & batch management
│   │   │   ├── assessment/         # Assessment engine
│   │   │   ├── beneficiary/        # Post-training AI support
│   │   │   └── outcome-tracker/    # Business launch & market linkage
│   │   ├── ai-assistants/
│   │   │   ├── page.tsx            # Assistant gallery
│   │   │   └── [assistant]/page.tsx # Dynamic chat interface
│   │   ├── knowledge/page.tsx      # Knowledge base
│   │   ├── workflows/page.tsx      # Approval & SLA engine
│   │   ├── reports/page.tsx        # Reports & analytics
│   │   └── settings/page.tsx       # Platform settings
│   ├── globals.css
│   ├── layout.tsx                  # Root HTML layout
│   └── page.tsx                    # Root redirect → /dashboard
│
├── components/
│   ├── ui/                         # Base UI primitives (Button, Card, Badge, etc.)
│   ├── layout/
│   │   ├── sidebar.tsx             # Collapsible sidebar with navigation
│   │   └── topbar.tsx              # Page header with search & notifications
│   ├── shared/
│   │   ├── kpi-card.tsx            # Metric card with trend indicator
│   │   ├── data-table.tsx          # Sortable, filterable, paginated table
│   │   ├── status-badge.tsx        # Status → color-coded badge mapping
│   │   └── section-header.tsx      # Section title + actions row
│   ├── dashboard/
│   │   ├── command-center-charts.tsx  # Multi-tab recharts dashboard
│   │   ├── top-beneficiary-table.tsx  # Ranked beneficiary watchlist
│   │   └── weekly-activity-feed.tsx   # Activity stream
│   ├── banking/
│   │   └── bc-funnel-chart.tsx     # BC onboarding funnel visualization
│   ├── consultancy/
│   │   └── dpr-status-chart.tsx    # DPR pipeline pie chart
│   └── training/
│       ├── scheme-distribution-chart.tsx
│       ├── outcome-funnel-chart.tsx
│       └── assessment-chart.tsx
│
└── lib/
    ├── utils.ts      # cn(), formatCurrency(), formatNumber(), etc.
    ├── types.ts      # All TypeScript interfaces and types
    └── mock-data.ts  # Realistic mock data for all modules
```

---

## Design System

### Colors
- **Primary (UPICON brand):** Indigo — `upicon-600` (#4F46E5)
- **Success:** Emerald (`emerald-500/600`)
- **Warning:** Amber (`amber-500`)
- **Danger:** Red (`red-500/600`)
- **Info:** Blue (`blue-500/600`)
- **Neutral:** Slate scale

### Typography
- Font: Inter (loaded via `next/font/google`)
- Page title: `text-base font-semibold` in TopBar
- Section headers: `text-base font-semibold` via `SectionHeader`
- Body: `text-sm text-slate-700`
- Labels/meta: `text-xs text-slate-400/500`

### Layout Pattern
Every dashboard page follows:
```tsx
<div className="flex flex-col h-full">
  <TopBar title="..." subtitle="..." actions={<>...</>} />
  <div className="flex-1 p-6 space-y-6">
    {/* KPI row */}
    {/* Content sections */}
  </div>
</div>
```

---

## Key Shared Components

### `<TopBar title subtitle actions />`
Page-level header. `actions` renders right-aligned buttons.

### `<KPICard title value change changeLabel icon iconBg iconColor />`
Metric card with trend arrow. `change` is a percentage. Set `trendPositive={false}` when a reduction is good.

### `<DataTable columns data searchPlaceholder pageSize />`
TanStack Table v8 wrapper with global filter, column sort, and pagination.

### `<StatusBadge status />`
Maps ~30 status strings to appropriate colored `<Badge>`.

### `<SectionHeader title description actions />`
Two-column header for content sections.

---

## Running the Project

```bash
cd upicon-platform

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
# → Redirects to /dashboard/login
# → Use any credentials and click Sign In
```

---

## Data Layer

Currently uses **static mock data** in `src/lib/mock-data.ts`. All data reflects realistic UPICON operations:
- 6 sample BCs across districts with full lifecycle state
- 5 DPR projects in various stages
- 3 TEV projects
- 4 training batches across schemes
- 4 beneficiaries with post-training outcomes
- 5 top beneficiary rankings

### Adding Real Data
Replace mock imports with API calls. Suggested pattern:
```ts
// src/lib/api/banking.ts
export async function getBCs(): Promise<BusinessCorrespondent[]> {
  const res = await fetch("/api/bc");
  return res.json();
}
```

Use `React.use()` or `fetch` in Server Components, or SWR/React Query in Client Components.

---

## AI Assistants

The platform has 8 AI assistant personas defined in `aiAssistants` mock data:
- `bc-assist` — Hindi-first BC support
- `dpr-copilot` — DPR first-draft generation
- `tev-copilot` — TEV appraisal workspace
- `trainer-os` — Training management
- `beneficiary-clone` — Post-training support
- `franchise-advisor` — Franchise model guidance
- `consulting-clone` — MSME Hindi advisor
- `credit-prep` — Credit application prep

**To wire up real AI:** Connect the chat interfaces in `bc-assist/page.tsx`, `beneficiary/page.tsx`, and `ai-assistants/[assistant]/page.tsx` to the Anthropic Claude API using `@anthropic-ai/sdk` with streaming.

---

## Navigation Structure

The `Sidebar` in `src/components/layout/sidebar.tsx` defines the full navigation tree. It:
- Highlights the active route
- Shows collapsible sections for each division
- Displays live badge counts for pending actions
- Collapses to icon-only mode

---

## Adding a New Module

1. Create the page: `src/app/(dashboard)/[division]/[module]/page.tsx`
2. Export `metadata` and a default page component
3. Add a nav entry in `src/components/layout/sidebar.tsx` under the relevant division
4. Add mock types to `src/lib/types.ts`
5. Add mock data to `src/lib/mock-data.ts`

---

## Phase Roadmap

| Phase | Description |
|-------|-------------|
| **Phase 0** (Current) | Skeleton UI with mock data — all pages, navigation, components |
| **Phase 1** | Connect to real APIs — replace mock data with live UPICON systems |
| **Phase 2** | Integrate Claude AI — wire chat interfaces to Anthropic API with streaming |
| **Phase 3** | WhatsApp / PWA layer — add responsive PWA and WhatsApp webhook integration |
| **Phase 4** | Analytics & Reporting — real-time dashboards, scheduled PDF reports |

---

## Notes for Developers

- All chart components are `"use client"` — they must be in separate files from Server Components
- The sidebar uses `usePathname()` — it is a Client Component
- TopBar is a Client Component (handles dropdowns)
- All data pages are Server Components by default
- Use `cn()` from `@/lib/utils` for all className merging
- Prefer `@/` path aliases over relative imports
