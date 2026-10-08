# उपसरपंच — Product-Grade HQ Operating Platform

A large, usable local build of the Tea + Bakery Franchise HQ product experience described in the master build specification.

## What this build is
This is no longer a static UI mockup. It is a **functional local product surface** with persistent browser state, transaction forms, drawers, workflow transitions, filtering, search, bulk actions, detail views, audit events, notification events, AI decision actions, franchise self-service ordering, receiving, finance and driver delivery screens.

The production architecture remains PostgreSQL + Prisma + server-side authorization and transaction services; this package keeps the local sample self-contained so the full UX can be walked through without external services.

## Brand and visual system
- Business: **उपसरपंच**
- Official logo: `public/upsarpanch-logo.webp`
- Primary design language: **White + Orange Glass Morphism**
- Additional depth: cool blue ambient layers, frosted translucent surfaces, blur, saturation, glass borders, soft elevation and light-refraction highlights.
- HQ is desktop-first; franchise/driver experiences are mobile-first.

## HQ workspaces
Control Tower, Franchise Network, Orders, Products & Recipes, Procurement, Warehouses, Inventory, Production, Logistics, Finance, Quality, Support, Analytics & Reports, Intelligence, Notifications and Administration.

## Franchise workspace
Dashboard, New Material Order, My Orders, Receiving, Stock, Invoices & Payments, Support and Profile.

## Core interactions already wired
- Create HQ-assisted franchise order and progress it through order states.
- Create purchase requisition and inspect PR/PO/GRN workflow context.
- Adjust / transfer / count inventory through operational drawers.
- Record finance transactions in the local store.
- Create quality/support cases tied to franchises.
- Accept/ignore AI recommendations with audit entries.
- Search across common entity types from the global HQ bar.
- Filter and switch module views, select rows and invoke bulk actions.
- Open focused detail drawers with operating fields, workflow, activity and audit context.
- Use browser-persistent sample state and reset the seed dataset from Administration.
- Switch entry workspace between HQ, Franchise Portal and Driver Delivery on the login screen.

## Run locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Production configuration
`.env.example` contains the intended local PostgreSQL connection and optional adapter configuration for email, WhatsApp, SMS, AI, payments and maps. Missing optional credentials should remain **Not Configured** and must not block core operations.

## Validation note
The source tree has been checked for TypeScript syntax and non-dependency type issues using the global TypeScript compiler available in the build environment. Full Next.js build/typecheck could not be completed here because package installation repeatedly timed out, so `node_modules` is intentionally not included in the ZIP.


## Product behavior
This package is intentionally usable without a hosted backend: transactional demo state is persisted in browser local storage so workflows can be exercised locally. The UI is structured around the HQ control tower, master data, procurement, warehouse/inventory, production, orders/fulfilment, logistics, finance, quality/support, analytics, intelligence, notifications and administration. The franchise experience stays intentionally smaller. For production deployment, the included Prisma schema and environment configuration are the foundation for PostgreSQL-backed APIs and server-side authorization.

## Visual direction
The interface uses a deliberately visible cool-blue/white frosted glass layer with orange brand accents: translucent surfaces, 38-46px backdrop blur, soft blue ambient orbs, white highlight edges, restrained orange actions, generous spacing and readable enterprise typography.
