# Bridgemark

A premium agency marketplace built with Next.js 16, connecting businesses with top-tier marketing agencies through AI-powered matching.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)

## Features

- 🎨 **Modern UI** - Dark theme with neon accents, glass morphism effects
- 🤖 **AI Matching** - Connect with agencies tailored to your needs
- 📊 **Google Sheets Integration** - Form submissions saved automatically
- 📧 **Email Notifications** - Admin alerts and user confirmations via Resend
- ⚡ **Fast Performance** - Static generation with Next.js App Router
- 📱 **Fully Responsive** - Optimized for all device sizes

## Pages

- `/` - Landing page with hero, stats, features, and featured agencies
- `/get-matched` - Agency matching form with services, budget, timeline
- `/about` - Company information, values, and team

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Validation:** Zod
- **Database:** Google Sheets API
- **Email:** Resend
- **Font:** Space Grotesk

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bridgemark.git
cd bridgemark

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

See [.env.example](.env.example) for required configuration:

| Variable | Description |
|----------|-------------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Google Cloud service account email |
| `GOOGLE_PRIVATE_KEY` | Service account private key |
| `GOOGLE_SHEET_ID` | Target Google Sheet ID |
| `RESEND_API_KEY` | Resend API key for emails |
| `ADMIN_EMAIL` | Email for admin notifications |
| `FROM_EMAIL` | Sender email address |

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
├── app/
│   ├── api/form/submit/   # Form submission API
│   ├── about/             # About page
│   ├── get-matched/       # Matching form page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # UI components (shadcn)
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Stats.tsx
│   ├── Features.tsx
│   ├── FeaturedAgencies.tsx
│   └── Footer.tsx
├── lib/
│   ├── email/             # Resend email service
│   ├── services/          # Business logic
│   ├── sheets/            # Google Sheets integration
│   ├── validators/        # Zod schemas
│   └── utils.ts
└── public/                # Static assets
```

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/bridgemark)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

```bash
npm run build
npm run start
```

## License

MIT License - see [LICENSE](LICENSE) for details.
