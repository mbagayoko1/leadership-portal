# Leadership Development Portal

UNFPA WCARO · Cohort 1 · 2026 Strategic Growth Plan — a leadership & communication
development dashboard for a 12-month mentorship programme.

## Run

```bash
npm install
npm run dev        # http://localhost:3005
npm run build      # production build to dist/
```

## Demo accounts

| Role   | Username      | Password    |
|--------|---------------|-------------|
| Admin  | `admin`       | `passw0rd`  |
| Mentor | `james.wanki` | `mentor2026`|

New participants can self-register via **Request Access** on the sign-in screen.

## Features

- **Dashboard** — role-aware: participants/admins see progress stats and quick access;
  mentors get a coaching dashboard (participants, session log, goals, coaching notes)
- **Curriculum** — 4 phases / 11 modules with daily tasks, readings, vocal training,
  and checkpoint tracking (click to mark complete)
- **Study Guide** — per-module resource guides, TED/YouTube videos, HBR/CCL articles,
  required readings, and reflection questions
- **Resources** — vocal training routine, practice opportunities, common pitfalls
- **Drive** — navigable mirror of the Google Drive folder tree with direct links
- **Users** (admin only) — full CRUD with roles, search, filters, profile photos

## Language

The interface is bilingual — use the EN/FR switch in the top bar (or on the
sign-in screen). The choice is remembered per browser.

## Shared data with Supabase (optional)

By default all data lives in each visitor's browser (localStorage), so users
on different devices don't see each other. To share the user directory and
progress across devices:

1. Create a free project at [supabase.com](https://supabase.com)
2. In the project's **SQL Editor**, run [`supabase/schema.sql`](supabase/schema.sql)
3. Copy `.env.example` to `.env` and fill in the URL and anon key from
   **Settings → API**
4. Rebuild and redeploy: `npm run build && npx gh-pages -d dist`

Without the env vars the app silently falls back to localStorage, and remote
failures fall back to the local copy, so it works offline either way.
Note: the anon key grants read/write to the shared table at the application
level — fine for a cohort-internal tool, but move to Supabase Auth with
per-user policies before storing anything sensitive.

## Stack & architecture

- Vite + React 18 + Tailwind CSS v3 + lucide-react
- `src/data.js` — all programme content (curriculum, modules, Drive tree, doc text)
- `src/storage.js` — localStorage persistence (users, session, per-user progress)
- `src/App.jsx` — the entire UI (ported from a Claude artifact)

All state persists in `localStorage` under `ldp_*` keys: the user directory, the
signed-in session, and per-user progress/sessions/goals/notes. There is no backend;
passwords are stored in plain text in the browser — suitable for demo/prototype use
only, not production authentication.
