# Mountain Ride Ooty

A full-stack business website and booking management platform for **Mountain Ride Ooty**
— an Ooty/Nilgiris taxi, sightseeing, airport-transfer and outstation travel business.

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Prisma + PostgreSQL**.

```
                    MOUNTAIN RIDE OOTY
                           │
             ┌─────────────┴─────────────┐
             │                           │
        CUSTOMER SITE               ADMIN PANEL
             │                           │
      Booking / WhatsApp          Manage Bookings
      Vehicles / Packages          Vehicles
      Sightseeing                  Packages
      Gallery / FAQ                Reviews
             │                     Gallery
             └─────────────┬─────────────┘
                           │
                      NEXT.JS BACKEND
                           │
                         PRISMA
                           │
                     POSTGRESQL/NEON
```

---

## 1. Tech stack

| Layer          | Choice                                              |
|------------------|------------------------------------------------------|
| Framework      | Next.js 14 (App Router, Server Actions)              |
| Language       | TypeScript                                            |
| Styling        | Tailwind CSS (custom retro travel-poster theme)       |
| Database ORM   | Prisma                                                 |
| Database       | PostgreSQL (Neon recommended)                          |
| Auth           | Custom — JWT session cookie (`jose`) + `bcryptjs`       |
| Validation     | `zod` (client + server)                                |

No payment gateway is wired up (per spec) — the architecture keeps `Booking` as its own
model so a payment step can be added later without restructuring anything.

---

## 2. Project structure

```
prisma/
  schema.prisma        # All database models
  seed.ts               # Seeds settings, an admin user, and starter content
src/
  app/
    (site)/              # Public website — has its own layout with Navbar/Footer
      page.tsx            # Home
      sightseeing/ vehicles/ packages/ airport-transfer/ outstation/
      custom-tour/ about/ gallery/ reviews/ faq/ booking/ contact/
      privacy-policy/ terms/ cancellation-policy/
    admin/               # Admin dashboard — protected by middleware.ts
      login/
      bookings/ vehicles/ packages/ sightseeing/ reviews/ gallery/ enquiries/ settings/
    layout.tsx           # Root layout (fonts only)
    sitemap.ts robots.ts
  components/            # Shared UI (Navbar, Hero, cards, forms, admin/*)
  lib/                   # prisma client, auth, settings, whatsapp, validation
  middleware.ts          # Protects /admin/* routes
```

---

## 3. Local setup

### Prerequisites
- Node.js 18.18+ (Node 20 LTS recommended)
- A PostgreSQL database — the fastest path is a free [Neon](https://neon.tech) project

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Copy the environment file and fill in real values
cp .env.example .env
# - DATABASE_URL: paste your Neon (or any Postgres) connection string
# - SESSION_SECRET: generate with `openssl rand -base64 32`
# - SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD: your first admin login

# 3. Generate the Prisma client
npx prisma generate

# 4. Push the schema to your database (first-time setup)
npx prisma db push
#   — or, if you prefer tracked migrations:
# npx prisma migrate dev --name init

# 5. Seed the database (creates the SiteSettings row, an admin user,
#    and starter vehicles/services/sightseeing/packages/FAQ content)
npm run db:seed

# 6. Run the dev server
npm run dev
```

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/admin/login` for the admin dashboard, using the
`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` you set in `.env`.

**Change the seeded admin password after your first login** (there is no
in-app "change password" screen yet — for now, update it directly via
`npx prisma studio` by replacing the `passwordHash` with a new bcrypt hash,
or extend `/admin/settings` with a password-change form).

---

## 4. Available scripts

| Command               | What it does                                      |
|------------------------|----------------------------------------------------|
| `npm run dev`          | Start the dev server                               |
| `npm run build`        | Production build                                   |
| `npm run start`        | Start the production server (after `build`)         |
| `npm run lint`         | Run ESLint                                          |
| `npm run db:push`      | Push `schema.prisma` to the database (no migration) |
| `npm run db:migrate`   | Create/apply a tracked migration                    |
| `npm run db:seed`      | Seed settings, admin user, and starter content      |
| `npm run db:studio`    | Open Prisma Studio (visual DB browser)              |

`postinstall` automatically runs `prisma generate` after `npm install`.

---

## 5. Deploying (Vercel + Neon)

This app is built to deploy cleanly on **Vercel** with a **Neon** Postgres database.

### 5.1 Create the database
1. Create a free project at [neon.tech](https://neon.tech).
2. Copy the **pooled connection string** it gives you — that's your `DATABASE_URL`.

### 5.2 Deploy to Vercel
1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected).
4. Add environment variables in the Vercel project settings (Settings → Environment
   Variables) — copy every key from `.env.example` with real values:
   - `DATABASE_URL`
   - `SESSION_SECRET`
   - `NEXT_PUBLIC_SITE_URL` (your production domain, e.g. `https://mountainrideooty.com`)
   - `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` (only needed when you run the seed script)
   - SMTP variables if you've wired up email notifications
5. Deploy. Vercel will run `npm install` (which triggers `prisma generate` via
   `postinstall`) and then `npm run build`.

### 5.3 Apply the schema and seed the production database
Vercel's build step does **not** run migrations automatically (this is intentional —
you don't want a bad deploy to touch production data unattended). Run this once,
locally, pointed at your production `DATABASE_URL`:

```bash
# Point your local .env at the production database temporarily, or prefix inline:
DATABASE_URL="your-production-connection-string" npx prisma migrate deploy
DATABASE_URL="your-production-connection-string" npm run db:seed
```

`prisma migrate deploy` applies any migrations in `prisma/migrations/` without
prompting — this is the command to run on every future deploy that changes the
schema. If you used `db push` locally instead of `migrate dev`, run
`db push` against production instead:

```bash
DATABASE_URL="your-production-connection-string" npx prisma db push
```

### 5.4 Custom domain
Add your domain in Vercel's project settings and update `NEXT_PUBLIC_SITE_URL`
to match (redeploy after changing env vars).

---

## 6. Database migrations going forward

Whenever you change `prisma/schema.prisma`:

```bash
npx prisma migrate dev --name describe_your_change   # locally, creates a migration file
git add prisma/migrations && git commit -m "..."      # commit the migration
git push                                                # deploy via Vercel as usual
DATABASE_URL="prod-url" npx prisma migrate deploy       # apply it to production
```

---

## 7. Content & admin editing

Everything customer-facing is editable from `/admin` without touching code:

- **Bookings** — search, filter, sort, update status (`NEW → CONTACTED → CONFIRMED →
  COMPLETED` / `CANCELLED`), add internal notes, call/WhatsApp the customer directly.
- **Vehicles** — add/edit/hide, set availability, capacity, description, image URL.
- **Packages** — add/edit/publish, attractions, duration, starting price (leave blank
  to show "Contact for Price" — prices are never invented).
- **Sightseeing** — destinations shown on the homepage and `/sightseeing`.
- **Reviews** — add a review and mark it approved to publish it; reviews are hidden
  until approved. Nothing is auto-generated.
- **Gallery** — add images by URL (host photos anywhere — Cloudinary, S3, etc. — and
  paste the resulting URL).
- **Enquiries** — contact-form submissions, mark handled/open.
- **Settings** — business name, tagline, both phone numbers, WhatsApp number, email,
  location, business hours, social links, logo/hero image URLs, primary CTA text.
  The WhatsApp number used throughout the site (nav, hero, booking form, mobile bar)
  comes from this single setting — change it here, not in code.

### Note on images
This build stores image **URLs**, not uploaded files, to keep the architecture simple
and avoid needing object storage credentials out of the box. Host photos wherever you
like (Cloudinary's free tier, S3 + CloudFront, Vercel Blob, etc.) and paste the URL
into the relevant admin form. Any page without a real image URL yet shows a tasteful
vintage-style placeholder panel instead of a broken image.

---

## 8. Notifications

Email notifications on new bookings are stubbed out at `src/lib/notifications.ts` and
intentionally **not** wired to a specific provider, so the app deploys without extra
dependencies. To enable:

1. `npm install nodemailer`
2. Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `NOTIFY_TO_EMAIL` in your
   environment variables.
3. Uncomment the implementation in `src/lib/notifications.ts` and call
   `notifyNewBooking(...)` from `src/app/(site)/booking/actions.ts` after a booking is
   created.

All bookings are always saved to the database and visible in `/admin/bookings`
regardless of whether email notifications are configured.

---

## 9. Security notes

- Admin passwords are hashed with `bcryptjs` (12 rounds) — never stored in plain text.
- Admin sessions are signed JWTs in an `httpOnly`, `sameSite=lax` cookie, verified on
  every request to `/admin/*` by `src/middleware.ts`.
- All public forms are validated with `zod` on the server (not just the client).
- Prisma's query builder is used throughout — no raw SQL, so no SQL injection surface
  from user input.
- Secrets (`DATABASE_URL`, `SESSION_SECRET`, SMTP credentials) are only ever read from
  `process.env` on the server; nothing is exposed to client-side JavaScript.

---

## 10. What's intentionally not included (per spec)

- **Online payments** — not implemented. The `Booking` model is decoupled from any
  payment logic so this can be added later (e.g. Razorpay for an Indian business)
  without a rebuild.
- **Fabricated content** — no invented prices, reviews, establishment year, or exact
  street address. Where information wasn't supplied, the UI shows honest placeholders
  ("Contact for Price") or omits the field.

---

## 11. Known limitations / next steps

- No in-app "change admin password" UI yet — see section 3 for a manual workaround,
  or add a small form to `/admin/settings` that hashes a new password with
  `hashPassword()` from `src/lib/auth.ts`.
- No file-upload widget for images — URLs only (see section 7).
- No rate limiting is wired up yet on public POST endpoints (booking/contact forms).
  For production, consider adding a lightweight IP-based rate limiter (e.g. via
  Vercel's Edge Config or a small in-memory/Upstash Redis limiter) in front of the
  server actions in `src/app/(site)/booking/actions.ts`,
  `src/app/(site)/airport-transfer/actions.ts`,
  `src/app/(site)/custom-tour/actions.ts`, and `src/app/(site)/contact/actions.ts`.
