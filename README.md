# Sustain Terra Green Ventures — site redesign

A rebuild of [sustainterra.com](https://sustainterra.com) as a React + Tailwind application with a
Supabase backend for both site content and lead capture.

## Stack

- **Vite 6 + React 18 + TypeScript**
- **Tailwind CSS v4** — design tokens live in `src/index.css` under `@theme`
- **react-router 7** — five routes, client-rendered
- **Supabase** — Postgres content tables + insert-only lead tables, all under RLS
- **motion** — scroll reveals, disabled under `prefers-reduced-motion`

## Running it

```bash
pnpm install
pnpm dev          # http://localhost:5180
pnpm build        # typecheck + production build
pnpm sync:content # refresh src/data/content.json from Supabase
```

`.env.local` holds the Supabase URL and publishable key. See `.env.example`.

## How content works

Copy is **not** hardcoded in components. Every list on the site — programmes, services, team,
testimonials, values, statistics, differentiators — is a row in Postgres.

1. `pnpm sync:content` writes a snapshot to `src/data/content.json`.
2. The snapshot renders on first paint, so the site never shows an empty skeleton.
3. `ContentProvider` then refetches from Supabase and swaps in live rows.

The practical effect: the team edits copy in the Supabase dashboard and the change appears without a
deploy, while the committed snapshot keeps the site working if the database is unreachable.

### Tables

| Table | Purpose | Public access |
|---|---|---|
| `stats` | The six framing statistics | read |
| `core_values` | Four values | read |
| `services` | Five consulting practices | read |
| `programs` | Six L&D programmes | read (where `is_active`) |
| `team_members` | Leadership | read |
| `testimonials` | Participant quotes | read (where `is_published`) |
| `differentiators` | "Why choose us" | read |
| `consultation_requests` | Contact form | **insert only** |
| `program_registrations` | Programme sign-ups | **insert only** |
| `brochure_downloads` | Brochure email capture | **insert only** |

Lead tables have an insert policy and no select policy, so the publishable key can write a submission
but cannot read any submission back. Verified: a direct REST `select` with the publishable key returns
zero rows while the table has data.

Read submissions in the Supabase dashboard, or wire an authenticated internal view later.

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/learning-and-development` | Training programmes, accordion + registration dialog |
| `/consulting` | Five practices, advantage, complementary L&D |
| `/about` | Story, values, approach, leadership, why us |
| `/contact` | Consultation form + direct channels |

## Design system

Tokens in `src/index.css`:

- `ink` `#0a1710`, `bark`, `forest` `#14603f`, `moss`, `lichen` — the green range, dark to light
- `clay` `#c4652f` — the only CTA colour, warm against the greens
- `paper` `#fbfaf7`, `sand`, `line` — light grounds
- Display type: Fraunces. Body: Inter.

Bands alternate paper → sand → ink → forest to give each page a rhythm without needing photography.

## Content decisions carried over from the old site

- Home and About previously listed **different** sets of core values. Reconciled to one set of four;
  "Pursuit of Excellence" and "Kaizen" were near-duplicates and merged.
- The consulting practice titled "Science Based" was retitled **Carbon Accounting & Target Setting** —
  its bullets were all about GHG inventories and targets.
- Typo fixes: `counsulting` → `consulting` (URL), "Assesment", "Expartise", "Collabrative".
- The old page rendered broken icon fonts as literal `@` and `9` characters in bullet lists.
- Statistics keep their original sources (Nielsen, Bloomberg, Axios, EY, LinkedIn, McKinsey).

## Not done yet

- The brochure form records the request but no email is actually sent — wire an edge function or
  Resend/SendGrid webhook to deliver the PDF.
- `hello@sustainterra.com` is a placeholder; confirm the real address.
- No analytics, sitemap, or `robots.txt`.
- Client-rendered only. If SEO on the programme pages matters, consider prerendering.
