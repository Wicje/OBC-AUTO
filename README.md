# 🚀 Client Onboarding Automaton (OBC-AUTO)

> **Terminal-first & Minimalist Intake Questionnaire → Structured Executive Brand Brief Generator**  
> *Built for global creative agencies, SaaS platforms, and enterprise design studios.*

![Client Onboarding Automaton Banner](public/dashboard_cover.jpg)

---

## 🌟 Overview

**Client Onboarding Automaton** is a high-performance, pixel-perfect client intake and brand strategy generator. It converts raw client responses into a comprehensive, executive-ready **Brand Brief** complete with AI positioning statements, target demographics, color swatches, pain points, and deliverables scope.

Designed for **global enterprise deployment**, it features multi-language localization (including native Right-to-Left Arabic support), multi-currency budget allocation, client-side encrypted state persistence, and full WCAG 2.1 AA accessibility compliance.

---

## ✨ Key Features

- 🎨 **Pixel-Perfect Minimalist Survey UI**: Inspired by high-end modern UI design benchmarks. Features a clean off-white card canvas (`#f3f3f5`), red highlight title badge (`[ Protocol ]`), step node slider progress track, and custom red double-circle radio option cards (`🔴`).
- 🌍 **Global Enterprise i18n & RTL Engine**: Supports 6 languages out-of-the-box:
  - 🇺🇸 **English** (en)
  - 🇪🇸 **Español** (es)
  - 🇫🇷 **Français** (fr)
  - 🇩🇪 **Deutsch** (de)
  - 🇯🇵 **日本語** (ja)
  - 🇸🇦 **العربية** (ar — *Native Right-to-Left RTL Mirroring*)
- 💱 **Multi-Currency Budget Allocation**: Dynamic currency selector supporting **USD ($)**, **EUR (€)**, **GBP (£)**, **JPY (¥)**, and **AUD (A$)**.
- 🔐 **Encrypted Local Persistence**: Automatically syncs client progress to `localStorage` with base64 encryption and checksum verification to protect proprietary strategy data on corporate devices.
- ⚡ **Real-Time Executive Brand Brief**: Live-updating preview of the compiled brief with AI positioning synthesis, target persona, color direction swatches, and deliverables.
- 📄 **Multi-Format Export Suite**: One-click export to **Markdown (.md)**, **JSON payload**, and **Print-Ready PDF**.
- ⚙️ **Production Backend & Database Docs**: Includes interactive architecture documentation detailing REST API endpoints (`/api/v1/intake/session`), Prisma / PostgreSQL database schemas, and CRM webhook dispatches (Notion, HubSpot, Slack, Airtable).
- ♿ **WCAG 2.1 AA Accessibility**: Full ARIA roles (`role="radiogroup"`, `role="radio"`, `aria-checked="true"`), screen reader announcements, high contrast ratios (>4.5:1), and keyboard navigation traps (`Space`/`Enter` keys).
- 🔊 **Synthesized Web Audio SFX**: Audio click and completion chimes synthesized on-the-fly using the browser's Web Audio API.

---

## 🛠️ Tech Stack

- **Core**: React 18, Vite 5
- **Styling**: Tailwind CSS v4, Custom Design Tokens
- **Icons & Effects**: Lucide React, Canvas Confetti
- **Audio**: Web Audio API (Synthesized Synthesizer)
- **State & Storage**: Custom Hooks, LocalStorage Encrypted Sync
- **i18n & l10n**: Custom Internationalization Engine with RTL layout support

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Local Setup

```bash
# 1. Clone the repository
git clone git@github.com:Wicje/OBC-AUTO.git

# 2. Navigate to project folder
cd OBC-AUTO

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open `http://localhost:3000` (or `http://localhost:3001`) in your browser.

---

## 📦 Production Build

To test or generate a production build:

```bash
# Build the production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
archievr/
├── public/
│   └── dashboard_cover.jpg       # Studio Ghibli landscape cover image
├── src/
│   ├── components/
│   │   ├── SurveyCard.jsx        # Pixel-perfect questionnaire step card
│   │   ├── BrandBriefView.jsx    # Live executive brief preview & export bar
│   │   ├── BackendModal.jsx      # Production REST API & Database docs modal
│   │   ├── GlobalAuditModal.jsx  # 5 Pillars of Global Enterprise Usability audit
│   │   ├── PresetModal.jsx       # Client preset profile loader (SaaS, Fashion, Gaming)
│   │   ├── HelpModal.jsx         # Keyboard shortcuts & onboarding guide
│   │   └── Toast.jsx             # Notification toast component
│   ├── data/
│   │   └── questions.js          # Multi-language question dictionaries & presets
│   ├── utils/
│   │   ├── i18n.js               # Multi-language translation engine & RTL support
│   │   ├── storage.js            # Encrypted LocalStorage persistence manager
│   │   ├── briefGenerator.js     # Markdown compiler & positioning synthesizer
│   │   ├── backendDocs.js        # REST API endpoints & PostgreSQL schema specs
│   │   └── soundEffects.js       # Synthesized Web Audio sound effects
│   ├── App.jsx                   # Main application shell & tab router
│   ├── index.css                 # Global CSS design tokens & animations
│   └── main.jsx                  # React application entry point
├── vite.config.js                # Vite build & Tailwind CSS plugin setup
├── package.json                  # Dependencies & script declarations
└── README.md                     # Documentation
```

---

## ⚙️ Backend Integration & Webhooks

When a client completes the intake questionnaire, the payload is structured as follows for server-side processing:

### Sample Payload

```json
{
  "meta": {
    "generator": "Automaton Intake Subsystem v3.0",
    "generatedAt": "2026-08-17T23:50:00.000Z",
    "locale": "en",
    "currency": "USD"
  },
  "answers": {
    "companyName": "Apex Intelligence",
    "tagline": "Autonomous predictive engine for enterprise supply chain resilience.",
    "industry": "B2B SaaS / Enterprise Tech",
    "targetAudience": "VP of Logistics & CSCOs at Fortune 500 manufacturing firms.",
    "customerPainPoints": [
      "Slow execution & time wasted in workflows",
      "High operational & software costs"
    ],
    "toneOfVoice": ["Minimalist & Elegant", "High-Tech & Cyber"],
    "colorVibe": "Electric Emerald & Cyber Mint (Tech & High-Energy)",
    "deliverables": ["Complete Visual Brand Identity System", "Design System & Component Library"],
    "timeline": "🚀 Standard Fast-Track (3 - 4 Weeks)",
    "budgetTier": "Tier II: 10,000 - 25,000 (Full Brand + Web)"
  }
}
```

### PostgreSQL Schema (Prisma ORM)

```prisma
model ClientSession {
  id               String   @id @default(uuid())
  agencyId         String
  companyName      String?
  industry         String?
  answers          Json     // Stores complete step-by-step intake state
  completedSteps   Int      @default(0)
  isSubmitted      Boolean  @default(false)
  pdfBriefUrl      String?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}
```

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more details.

---

<p center>
  Made with ❤️ by <strong>Wicje</strong> for agencies and studios worldwide.
</p>
