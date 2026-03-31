# UPICON Command Platform

A production-grade Next.js 14 web application providing agentic intelligence and operational command for UPICON's three core divisions: Banking & Financial Inclusion, Consultancy & G2G, and Training & Skilling.

## 🎯 Overview

The UPICON Command Platform is designed around an **MD Command Center** providing real-time cross-division intelligence, with AI assistants (copilots) embedded throughout each division's workflow.

**Key Features:**
- 📊 Executive dashboard with real-time KPIs and analytics
- 🏦 Banking & Financial Inclusion module (BC lifecycle, kiosk ops, transaction monitoring)
- 📋 Consultancy & G2G module (DPR/TEV production, survey ops, knowledge management)
- 🎓 Training & Skilling module (batch management, outcome tracking, beneficiary support)
- 🤖 Embedded AI assistants for each division
- 📱 Responsive design with dark/light theme support
- 📈 Interactive charts and data visualization

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17.0 or later ([Download](https://nodejs.org/))
- **npm** 9.0.0 or later (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Verify Installation

```bash
node --version   # Should be v18.17.0 or higher
npm --version    # Should be 9.0.0 or higher
git --version    # Any recent version
```

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/KiranSuresha/upicon-platform.git
cd upicon-platform
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages from `package.json` including:
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Radix UI** - Accessible component primitives
- **TanStack React Table** - Advanced table functionality

## 🚀 Running the Application

### Development Server

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at **http://localhost:3000**

### Production Build

Build the application for production:

```bash
npm run build
npm start
```

### Linting

Check code quality:

```bash
npm run lint
```

## 📂 Project Structure

```
upicon-platform/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/             # Authentication pages
│   │   ├── (dashboard)/        # Dashboard layout & routes
│   │   │   ├── banking/        # Banking division
│   │   │   ├── consultancy/    # Consultancy division
│   │   │   ├── training/       # Training division
│   │   │   └── dashboard/      # MD Command Center
│   │   └── layout.tsx          # Root layout
│   ├── components/             # Reusable React components
│   │   ├── ui/                 # Base UI primitives
│   │   ├── layout/             # Layout components (sidebar, topbar)
│   │   ├── shared/             # Shared components (KPI card, data table)
│   │   ├── dashboard/          # Dashboard components
│   │   ├── banking/            # Banking-specific components
│   │   ├── consultancy/        # Consultancy-specific components
│   │   └── training/           # Training-specific components
│   └── lib/
│       ├── types.ts            # TypeScript interfaces
│       ├── utils.ts            # Utility functions
│       └── mock-data.ts        # Sample data (for development)
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── next.config.mjs             # Next.js configuration
└── CLAUDE.md                   # Developer guide with detailed architecture
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS + Tailwind Merge |
| **UI Components** | Radix UI primitives + shadcn/ui patterns |
| **Charts** | Recharts |
| **Tables** | TanStack React Table v8 |
| **Icons** | Lucide React |
| **State** | Zustand |
| **Fonts** | Inter (via next/font/google) |

## 📝 Available npm Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Run ESLint to check code quality |

## 🔑 Key Features by Division

### Banking & Financial Inclusion
- Business Correspondent (BC) lifecycle management
- Lead capture and routing (BC Mobilize)
- Customer onboarding workflows (BC Onboard)
- Hindi-first AI assistant support (BC Assist)
- Activity monitoring and kiosk operations (BC Quality)

### Consultancy & G2G
- DPR drafting with AI copilot assistance
- TEV appraisal workspace
- Field survey operations management
- Knowledge hub and SOP repository

### Training & Skilling
- Trainer-OS for attendance and batch management
- Assessment engine for skill evaluation
- Beneficiary post-training support
- Outcome tracking and market linkage

## 🎨 Design System

The platform uses a custom design system with:
- **Color tokens** for consistent branding
- **Responsive components** built with Radix UI
- **Dark/Light mode** support via next-themes
- **Accessible** components following WCAG guidelines
- **Tailwind CSS** for rapid styling

## 🔄 Development Workflow

1. **Create a feature branch**: `git checkout -b feature/your-feature-name`
2. **Make your changes** in `src/` directory
3. **Test locally**: `npm run dev`
4. **Check code quality**: `npm run lint`
5. **Build and verify**: `npm run build`
6. **Commit and push**: `git add . && git commit -m "feat: description" && git push`
7. **Create a Pull Request** on GitHub

## 📖 For More Details

For comprehensive architecture documentation, design patterns, and implementation guidelines, see [CLAUDE.md](./CLAUDE.md).

## 🚦 Getting Help

- Check [CLAUDE.md](./CLAUDE.md) for detailed architecture and design patterns
- Review component implementations in `src/components/`
- Check mock data in `src/lib/mock-data.ts` for data structure examples
- Review TypeScript types in `src/lib/types.ts`

## 📋 Roadmap

| Phase | Description |
|-------|-------------|
| **Phase 0** (Current) | Skeleton UI with mock data — all pages, navigation, components |
| **Phase 1** | Connect to real APIs — replace mock data with live UPICON systems |
| **Phase 2** | Integrate Claude AI — wire chat interfaces to Anthropic API with streaming |
| **Phase 3** | WhatsApp / PWA layer — add responsive PWA and WhatsApp webhook integration |
| **Phase 4** | Analytics & Reporting — real-time dashboards, scheduled PDF reports |

## 📄 License

This project is proprietary software owned by UPICON.

## 👥 Contributing

UPICON team members can contribute by following the development workflow outlined above. For questions or issues, reach out to the platform team.

---

**Happy coding!** 🎉
