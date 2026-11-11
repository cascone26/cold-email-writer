# ColdDraft

AI cold-email writer SaaS. Describe your product and your target audience, get back multiple
email variants (different styles, subject + body) written by Claude, ready to send.

## How it works

1. Fill in product name, product description, target audience, and sender info
2. Claude generates several distinct email variants from that input
3. Free tier is rate-limited; Stripe-backed Pro tier removes the limit

## Stack

Next.js (App Router), TypeScript, Anthropic API for generation, Stripe for billing, a simple
auth/session layer, and in-memory rate limiting on the free tier.

## Setup

```bash
npm install
cp .env.local.example .env.local  # add Anthropic + Stripe keys
npm run dev
```
