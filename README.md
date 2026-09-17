<div align="center">

# 🏺 AnkhMart

### A Modern Multi-Vendor E-Commerce Marketplace
#### Work in Progress

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Connect-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/connect)
[![Payload CMS](https://img.shields.io/badge/Payload-CMS-000000?style=for-the-badge)](https://payloadcms.com/)

<br/>

> **AnkhMart** is a full-stack, multi-vendor e-commerce marketplace where vendors create custom storefronts, manage products through a powerful CMS, and receive payments securely — while the platform automatically handles fee deductions.

<br/>


</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [🏗 Architecture](#-architecture)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Environment Variables](#️-environment-variables)
- [💳 Stripe Connect Setup](#-stripe-connect-setup)
- [📦 Project Structure](#-project-structure)
- [🔑 Key Workflows](#-key-workflows)
- [🧪 Running Tests](#-running-tests)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🛍️ For Shoppers
- Browse products across multiple vendor storefronts
- Advanced search, filtering, and category navigation
- Secure checkout powered by Stripe
- Order  history
- cart persistence

### 🏪 For Vendors
- **Custom Storefronts** — Personalized branding, banners, and bio
- **Product Management** — Full CRUD via Payload CMS dashboard
- **Stripe Connect Onboarding** — Simple, guided payout setup
- **Automatic Payouts** — Funds deposited directly, platform fee deducted automatically

### 🔧 For Platform Admins
- Centralized Payload CMS admin panel
- Platform-wide fee configuration
- Vendor approval and moderation
- Order management and dispute resolution

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Styling** | TailwindCSS + shadcn/ui |
| **CMS** | Payload CMS v3 |
| **Database** | MongoDB (via Mongoose) |
| **Payments** | Stripe Connect |
| **API Layer** | tRPC |
| **Auth** | Payload CMS built-in auth |
| **Language** | TypeScript |
| **Runtime / Package Manager** | Bun |
| **Deployment** | Vercel (recommended) |

---

## 🏗 Architecture

```
┌────────────────────────────────────────────────────────────┐
│                        Next.js 15                          │
│  ┌─────────────────┐        ┌──────────────────────────┐   │
│  │  Storefront UI  │        │   Payload CMS Admin      │   │
│  │  (App Router)   │        │   /admin                 │   │
│  └────────┬────────┘        └────────────┬─────────────┘   │
│           │                              │                  │
│  ┌────────▼──────────────────────────────▼─────────────┐   │
│  │              Payload CMS (API Layer)                 │   │
│  │         Collections: Products, Vendors, Orders       │   │
│  └────────────────────────┬────────────────────────────┘   │
│                           │                                 │
│       ┌───────────────────┼───────────────────┐            │
│       ▼                   ▼                   ▼            │
│  ┌─────────┐       ┌──────────┐       ┌──────────────┐     │
│  │ MongoDB │       │  Stripe  │       │  File/Media  │     │
│  │         │       │ Connect  │       │   Storage    │     │
│  └─────────┘       └──────────┘       └──────────────┘     │
└────────────────────────────────────────────────────────────┘
```

### Payment Flow

```
Customer Checkout
      │
      ▼
Stripe Payment Intent
      │
      ├─── Platform Fee (%) ──► AnkhMart Platform Account
      │
      └─── Remaining Amount ──► Vendor Connected Account
```

---

## 🚀 Getting Started

### Prerequisites

- **Bun** >= 1.x — [Install Bun](https://bun.sh)
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Stripe Account** with Connect enabled

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/HusseinSaeid/ankhmart.git
cd ankhmart
```

2. **Install dependencies**

```bash
bun install
```

3. **Configure environment variables**

```bash
cp .env.example .env.local
```

Fill in the required values (see [Environment Variables](#️-environment-variables)).

4. **Seed the database** *(optional)*

```bash
bun run src/seed.ts
```

5. **Run the development server**

```bash
bun dev
```

6. **Open in browser**

```
http://localhost:3000        → Storefront
http://localhost:3000/admin  → Payload CMS Admin Panel
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root of the project with the following variables:

```env
# ─── App ──────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ─── Database ─────────────────────────────────────────────
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/ankhmart

# ─── Payload CMS ──────────────────────────────────────────
PAYLOAD_SECRET=your-super-secret-payload-key

# ─── Stripe ───────────────────────────────────────────────
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# ─── Platform Fee ─────────────────────────────────────────
# Percentage taken by the platform on each transaction (e.g., 10 = 10%)
PLATFORM_FEE_PERCENT=10
```

> ⚠️ **Never commit `.env.local` to version control.** It is already included in `.gitignore`.

---

## 💳 Stripe Connect Setup

AnkhMart uses **Stripe Connect (Express)** to route payments directly to vendors while automatically deducting the platform fee.

### 1. Enable Stripe Connect

Go to [Stripe Dashboard → Connect](https://dashboard.stripe.com/connect/accounts/overview) and enable Connect for your account.

### 2. Configure OAuth

In **Settings → Connect Settings**, set your redirect URI:

```
http://localhost:3000/api/stripe/connect/callback
```

### 3. Listen to Webhooks (Local Development)

Install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and forward events:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### Key Stripe Events Handled

| Event | Description |
|---|---|
| `payment_intent.succeeded` | Order confirmed, funds split to vendor |
| `account.updated` | Vendor onboarding status synced |
| `transfer.created` | Payout sent to vendor confirmed |

---

## 📦 Project Structure

```
ankhmart/
├── src/
│   ├── app/
│   │   ├── (app)/                          # Main Next.js App Router
│   │   │   ├── (account-center)/
│   │   │   │   └── account-center/         # User account management
│   │   │   ├── (auth)/                     # Login / Register pages
│   │   │   ├── (home)/                     # Homepage
│   │   │   ├── (library)/
│   │   │   │   └── library/                # Product & vendor browsing
│   │   │   ├── (tenants)/                  # Multi-tenant vendor storefronts
│   │   │   ├── api/                        # API routes (Stripe, webhooks, etc.)
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   └── layout.tsx
│   │   └── (payload)/                      # Payload CMS admin routes
│   │
│   ├── collections/                        # Payload CMS collections
│   │   └── (Products, Vendors, Orders, Users, Media...)
│   ├── components/                         # Shared React components (shadcn/ui + custom)
│   ├── hooks/                              # Custom React hooks
│   ├── lib/                               # Stripe client, Payload client, utils
│   ├── migrations/                        # MongoDB/Payload migrations
│   ├── modules/                           # Feature modules
│   ├── trpc/                              # tRPC router & procedures
│   ├── payload-types.ts                   # Auto-generated Payload types
│   ├── payload.config.ts                  # Payload CMS configuration
│   └── seed.ts                            # Database seed script
│
├── download/                              # File download handling
├── media/                                 # Uploaded media storage
├── public/                                # Static assets
├── .gitignore
├── bun.lock
├── components.json                        # shadcn/ui config
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## 🔑 Key Workflows

### Vendor Onboarding

```
1. Vendor registers → Payload CMS user created
2. Vendor clicks "Connect with Stripe"
3. Redirected to Stripe Express onboarding
4. On return → stripe_account_id saved to Vendor document
5. Vendor can now receive payouts ✅
```

### Checkout & Payment Split

```
1. Customer adds items to cart
2. Checkout → create PaymentIntent with application_fee_amount
3. Stripe collects payment
4. Platform fee retained in AnkhMart account
5. Remainder transferred to vendor's Connected Account
6. Webhook fires → Order document updated in MongoDB
```

---

## 🧪 Running Tests

```bash
# Type checking
bun run type-check

# Linting
bun run lint
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) and ensure all tests pass before submitting.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">


⭐ If you find this project useful, please consider giving it a star!

</div>
