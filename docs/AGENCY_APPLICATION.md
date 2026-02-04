# Agency Application System

This document outlines the architecture of the agency application/listing system for Bridgemark.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                        │
├─────────────────────────────────────────────────────────────────┤
│  /agency-application                                             │
│  ├── Step 1: Agency Details (profile info, images via UploadThing)│
│  ├── Step 2: Portfolio & Services (case studies, testimonials)   │
│  ├── Step 3: Pricing (budget range, pricing model)              │
│  └── Step 4: Payment (listing fee → triggers data submission)    │
├─────────────────────────────────────────────────────────────────┤
│                     ApplicationContext                           │
│  (Holds all form data in memory until payment is completed)      │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ After payment success
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Convex Backend                              │
├─────────────────────────────────────────────────────────────────┤
│  Tables:                                                         │
│  ├── agencies: Main agency listings                              │
│  ├── payments: Payment transaction logs                          │
│  └── reviews: Client reviews for agencies                        │
│                                                                  │
│  Functions:                                                      │
│  ├── agencies.createAgency: Create listing after payment        │
│  ├── agencies.listAgencies: Query with filters                   │
│  ├── agencies.getAgencyBySlug: Public profile lookup            │
│  └── payments.*: Payment record management                       │
└─────────────────────────────────────────────────────────────────┘
```

## File Structure

```
app/
├── agency-application/
│   └── page.tsx              # Multi-step form page
├── api/
│   └── uploadthing/
│       ├── core.ts           # UploadThing file routes
│       └── route.ts          # API route handler

components/
├── agency-application/
│   ├── index.ts              # Exports
│   ├── AgencyDetailsStep.tsx # Step 1: Basic info & images
│   ├── PortfolioStep.tsx     # Step 2: Services & case studies
│   ├── PricingStep.tsx       # Step 3: Budget & pricing model
│   ├── PaymentStep.tsx       # Step 4: Payment & submission
│   └── SuccessStep.tsx       # Confirmation page
├── providers/
│   └── ConvexClientProvider.tsx

convex/
├── schema.ts                 # Database schema definitions
├── agencies.ts               # Agency CRUD operations
└── payments.ts               # Payment record operations

lib/
├── context/
│   └── ApplicationContext.tsx # Form state management
├── validators/
│   └── agencySchema.ts       # Zod validation schemas
└── uploadthing.ts            # UploadThing client helpers
```

## Data Flow

### 1. Form Data Collection (No Backend Calls)
- User fills out all 4 steps
- Data is stored in React context (ApplicationContext)
- Images are uploaded to UploadThing, URLs stored in context
- **No data is sent to Convex until payment**

### 2. Payment Processing (ZendFi Embedded Checkout)
- User initiates payment on Step 4
- ZendFi embedded checkout appears inline (no redirects)
- User pays 20 USDC via Solana wallet (Phantom, Solflare, Backpack) or QR code
- On success, `paymentId` and `transactionSignature` are captured

### 3. Agency Creation (After Payment)
```typescript
// Only called after payment succeeds
const result = await createAgency({
  // All form data from context
  ...agencyDetails,
  ...portfolio,
  ...pricing,
  paymentId: confirmedPaymentId,
  listingFeeAmount: 20,
  listingFeeCurrency: "USDC",
});
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install convex uploadthing @uploadthing/react @zendfi/sdk --legacy-peer-deps
```

### 2. Configure Convex
```bash
npx convex dev
```

### 3. Configure UploadThing
1. Create account at https://uploadthing.com
2. Get your API token
3. Add to `.env.local`:
```
UPLOADTHING_TOKEN=your_token_here
```

### 4. Configure ZendFi (Crypto Payments)

ZendFi enables embedded crypto payments via USDC on Solana.

1. Create account at https://dashboard.zendfi.tech
2. Get your API key (starts with `zfi_test_` for test mode or `zfi_live_` for production)
3. Add to `.env.local`:
```
# Server-side API key (keep secret!)
ZENDFI_API_KEY=zfi_test_your_api_key_here

# Mode: 'test' for development, 'live' for production
ZENDFI_MODE=test
NEXT_PUBLIC_ZENDFI_MODE=test
```

**How it works:**
- User clicks "Continue to Payment" after agreeing to terms
- API route (`/api/zendfi/create-checkout`) creates a payment link server-side
- ZendFi embedded checkout renders inline with QR code + wallet buttons
- User pays 20 USDC via Phantom, Solflare, Backpack, or QR scan
- On success, agency is created in Convex database

### 5. Add Webhook for Payment Verification (Optional but Recommended)
Create an API route to handle payment webhooks:

```typescript
// app/api/webhooks/payment/route.ts
export async function POST(req: Request) {
  // 1. Verify webhook signature
  // 2. Update payment status in Convex
  // 3. Trigger any post-payment actions
}
```

## Schema Reference

### agencies table
| Field | Type | Description |
|-------|------|-------------|
| name | string | Agency name |
| email | string | Contact email |
| slug | string | URL-friendly ID |
| category | string | Primary category |
| status | string | pending_review, approved, rejected, suspended |
| paymentStatus | string | pending, completed, failed |
| paymentId | string | External payment reference |
| verified | boolean | Admin verification status |
| ... | ... | See schema.ts for full list |

## Security Notes

1. **Payment First**: No agency data is persisted until payment succeeds
2. **Email Uniqueness**: One agency listing per email address
3. **Review Required**: New listings have `status: "pending_review"`
4. **Payment Verification**: Always verify payments server-side via webhooks
