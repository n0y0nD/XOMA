# XoMA — Video Editor Marketplace

> A hyperlocal marketplace connecting creators with skilled video editors from Northeast India.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## What is XoMA?

Creators in Northeast India have no reliable way to find skilled local video editors. They either overpay on Fiverr or rely on random WhatsApp referrals with no accountability.

**XoMA fixes that.**

Editors get verified profiles, portfolios, and ratings. Creators get quality work from people who understand local content culture — gaming edits, anime AMVs, wedding films, reels, and more.

---

## Features

- **Editor Profiles** — Skills, bio, hourly rate, ratings, and reviews
- **Search & Filter** — Filter by skill, service type, and max rate
- **Contact Form** — Message editors directly from their profile
- **Login & Signup** — Creator / Editor role toggle on signup
- **Dashboard** — Editor portal with gig management and portfolio upload
- **Atmospheric UI** — Dark minimal design with crosshatch background, 3D tilted cards, and smooth animations
- **Fully Responsive** — Works on mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Data | Local JSON (no database required) |
| Font | Syne + DM Sans (Google Fonts) |

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOURUSERNAME/xoma.git

# Navigate into the project
cd xoma

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
xoma/
├── src/
│   ├── app/                    # Pages (App Router)
│   │   ├── page.tsx            # Homepage
│   │   ├── editors/            # Browse editors + individual profiles
│   │   ├── login/              # Login page
│   │   ├── signup/             # Signup page
│   │   ├── dashboard/          # Editor & client dashboards
│   │   └── api/                # API routes
│   │       ├── editors/        # GET all editors, GET by ID
│   │       └── contact/        # POST contact form
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── TiltedCardStack.tsx # 3D animated editor cards
│   │   ├── AtmosphericBg.tsx   # Crosshatch + glow background
│   │   ├── EditorCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Categories.tsx
│   │   ├── ReviewSlider.tsx
│   │   ├── ContactForm.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   ├── store.ts            # Data access layer
│   │   └── data/
│   │       ├── editors.json    # Editor data
│   │       └── contacts.json   # Contact form submissions
│   └── types/
│       └── index.ts            # TypeScript interfaces
├── public/
│   └── images/                 # Static images
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/editors` | Fetch all editors (supports `?search=`, `?service=`, `?maxRate=`) |
| GET | `/api/editors/[id]` | Fetch a single editor by ID |
| POST | `/api/contact` | Submit a contact form message |

### Example

```bash
# Get all editors
GET /api/editors

# Search by skill
GET /api/editors?search=gaming

# Filter by max rate
GET /api/editors?maxRate=500

# Get a specific editor
GET /api/editors/1
```

---

## Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

For production, replace with your deployed URL.

---

---

## Roadmap

- [ ] Real image uploads for editor portfolios
- [ ] Authentication with NextAuth.js
- [ ] Payments via Razorpay
- [ ] Real-time messaging between creators and editors
- [ ] Mobile app (React Native)
- [ ] Editor onboarding flow

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

---

## Author

Built by **Nayanjyoti Das** — Assam, India 🇮🇳

> *XoMA started as a personal project to solve a real problem I saw in the Northeast Indian creator community.*

---

<p align="center">Made with ❤️ in Assam, India</p>
