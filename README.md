# Leadership Development Portal

Cohort 1 · 2026 Strategic Growth Plan — a leadership & communication
development dashboard for a 12-month mentorship programme.

**Open the portal:** <https://mbagayoko1.github.io/leadership-portal/>

## Run

```bash
npm install
npm run dev        # http://localhost:3005
npm run build      # production build to dist/
```

## Checks

```bash
npm run check         # content (EN/FR parity, quote sources, ids) + Gemini client unit tests
npm run check:links   # opens every external link; about a minute, needs internet
```

`check:links` lists Google Drive links without opening them (they need a
sign-in) and reports sites that block scripts (HTTP 403) so they can be checked
by hand. Last full run: 12 November 2026.

## Demo accounts

| Role   | Username      | Password    |
|--------|---------------|-------------|
| Admin  | `admin`       | `passw0rd`  |
| Mentor (Moussa Bagayoko) | `moussa.bagayoko` | `mentor2026`|

New participants can self-register via **Request Access** on the sign-in screen.

## Features

- **Dashboard** — role-aware: participants/admins see progress stats and quick access;
  mentors get a coaching dashboard (participants, session log, goals, coaching notes)
- **Curriculum** — 4 phases / 11 modules with daily tasks, readings, vocal training,
  and checkpoint tracking (click to mark complete)
- **Study Guide** — a **Learn** tab for each module (definition and outcomes, key
  concepts, eight vocabulary terms with real-world examples, five worked
  examples set around the world, a step-by-step guide with a copyable template, and
  a self-check), plus resource guides, TED/YouTube videos, HBR/CCL articles,
  required readings and reflection questions. The guides live in
  [`src/guides/`](src/guides) (EN and FR, loaded on demand) and follow the
  templates in [`prompts/module-guide.md`](prompts/module-guide.md) and
  [`prompts/vocabulary.md`](prompts/vocabulary.md). Two ongoing tracks sit beside
  the 11 modules: Vocal Training and **Polish Your English** (clear, accurate,
  natural professional English, written from
  [`prompts/polish-english.md`](prompts/polish-english.md)), whose concepts link to
  lessons from the Accurate English YouTube channel. Its **Videos** tab is a
  library of the channel's lessons grouped by theme, with an eight-week path; its
  **Word bank** tab has about 110 words and expressions grouped by theme, each with
  pronunciation, meaning, an example and the lesson that teaches it; its
  **Practice** tab has a ten-question quiz and a word-matching game built from the
  word bank and [`src/guides/englishQuiz.js`](src/guides/englishQuiz.js). Run
  `npm run pull:english` to refresh the library from the channel: it keeps only
  the channel's own videos, leaves out partisan politics, and assigns each video
  one theme ([`scripts/pull-accurate-english.mjs`](scripts/pull-accurate-english.mjs)
  writes [`src/englishVideos.js`](src/englishVideos.js); themes and the path are in
  [`src/englishLibrary.js`](src/englishLibrary.js), the word bank in
  [`src/guides/wordbank.js`](src/guides/wordbank.js));
  `npm run check` compares the two languages. Named origins, definitions and
  real-world figures were checked against primary sources; see
  [`docs/source-check.md`](docs/source-check.md). Steps ticked off are saved per user
- **Resources** — a searchable vocabulary glossary of every module's terms
  (each shown with its equivalent in the other language), vocal training routine, practice opportunities, common pitfalls
- **Drive** — navigable mirror of the Google Drive folder tree with direct links
- **Users** (admin only) — full CRUD with roles, search, filters, profile photos

## Language

The interface is bilingual — use the EN/FR switch in the top bar (or on the
sign-in screen). The choice is remembered per browser.

Curriculum text in French (module titles, daily tasks, vocal exercises,
checkpoints, reflection questions) lives in
[`src/curriculumFr.js`](src/curriculumFr.js); `src/data.js` stays the English
source. Book titles stay in their original language.

## Shared data with Supabase (optional)

By default all data lives in each visitor's browser (localStorage), so users
on different devices don't see each other. To share the user directory and
progress across devices:

1. Create a free project at [supabase.com](https://supabase.com)
2. In the project's **SQL Editor**, run [`supabase/schema.sql`](supabase/schema.sql)
3. Copy `.env.example` to `.env` and fill in the URL and anon key from
   **Settings → API**
4. Rebuild and redeploy: `npm run deploy`

Without the env vars the app silently falls back to localStorage, and remote
failures fall back to the local copy, so it works offline either way.
Note: the anon key grants read/write to the shared table at the application
level — fine for a cohort-internal tool, but move to Supabase Auth with
per-user policies before storing anything sensitive.

## AI Coach

The **AI Coach** tab (`src/coach/`) adds coaching sessions, a practice studio
with scored role-plays, a growth plan, progress tracking, weekly check-ins,
voice conversation and full-screen live calls, in English and French. It
follows the portal's EN/FR switch and calls Claude (`claude-sonnet-4-6`)
through the official Anthropic SDK. The tab is code-split, so its bundle only
loads when opened.

The default session type, **Leadership companion**, knows the portal. Its
prompt ([`src/coach/companion.js`](src/coach/companion.js)) receives a map of
every module, competency and tab plus the participant's progress
([`src/coach/portalContext.js`](src/coach/portalContext.js), generated from
the live data). It suggests next steps, adds buttons that open the right
module or competency, runs short spoken practice rounds, and coaches voice
and vocabulary. When the participant speaks instead of typing, the portal
measures pace (words per minute) and likely filler words in English and
French, shows them under the message, and passes them to the coach and to
practice-scene scoring. These are estimates: browser speech recognition often
drops hesitations such as "um".

Privacy: coaching conversations, practice and check-ins are stored in the
user's browser and mentors cannot see them. What goes into an AI request is
sent to the connected provider. On Gemini's free tier, Google may use it to
improve its products and human reviewers may read it, and
[its terms](https://aistudio.google.com/docs/terms) say not to submit sensitive,
confidential or personal information. On a paid key, Google says it does not
use prompts or responses to improve its products and logs them for a limited
time to detect policy violations. Only a participant's opt-in growth-plan
summary (goals, progress, practice scores) is shared, and it syncs through
Supabase when configured, so mentors and admins see it under **Mentor view**.

Connecting it to an AI model, either way:

- **Shared key behind the proxy (for the cohort).**
  [`supabase/functions/ai-coach`](supabase/functions/ai-coach/index.ts) is a
  Supabase Edge Function that keeps the Anthropic key as a server secret and
  pins the model and token limits. Because the portal's sign-in is
  browser-only, the proxy is gated by a **cohort access code**: the mentor
  sets it as a secret and gives it to participants, who enter it once in the
  AI Coach tab (kept in that browser as `ldp_ai_code`). The code is never in
  the repo or the built site. If it leaks, set a new one and participants
  re-enter it. Cost is bounded three ways: the proxy refuses more than 400
  requests or 800k output tokens per UTC day (counter in the private
  `ai_usage` table, [migration](supabase/migrations)), a per-connection rate
  limit, and a monthly spend limit you set in the Anthropic Console.
  Run the guided setup, which creates the project, stores the secrets,
  deploys and writes `VITE_AI_PROXY_URL` to `.env`:

  ```bash
  scripts/setup-ai-proxy.sh
  ```

  The site must be rebuilt after that (`.env` is read at build time). This
  is still weaker than real accounts: anyone with the code can use the budget.
  Moving sign-in to Supabase Auth and verifying the caller's session in the
  function remains the next hardening step.
- **Personal key.** With no proxy configured, each user can paste their own
  Gemini key (from Google AI Studio) or Anthropic key in the tab. The portal
  works out the provider from the key. It is kept in that browser only and sent
  straight to that provider. Never commit a key or set one at build time: this
  repository and the published site are public. Google advises against
  client-side keys in production, so restrict the key and set a budget alert.

The Web Speech API powers voice: listening works in Chrome, Edge and Safari,
and it needs microphone permission. Reading aloud works in all modern browsers.

## Personal Development

The **Personal Development** tab has nine views:

- **Plan and voices**: a four-week plan, plus speakers, coaches, researchers,
  African leaders and classic public-domain thinkers, each with key lessons,
  quotes, a practice and checked videos ([`src/development.js`](src/development.js),
  [`src/developmentExtra.js`](src/developmentExtra.js), [`src/voicesExtra.js`](src/voicesExtra.js),
  [`src/classics.js`](src/classics.js)). Classic quotes are verbatim from Project
  Gutenberg translations. Each modern quote carries a source label, and any line
  without a primary source says "Widely attributed" (see the note at the top of
  `voicesExtra.js`). The Resources tab holds a public reference library
  ([`src/library.js`](src/library.js)).
- **Speech library**: 30 original speeches with quotes, analogies, techniques,
  delivery notes and read-aloud ([`src/speeches.js`](src/speeches.js)).
- **Voice studio**: a guided 10-minute warm-up and six drills (pace, pauses,
  articulation, projection, pitch variety, filler words). Each take is
  recorded and analysed in the browser and scored against a target, with one
  tip, playback and a history. See [Voice studio](#voice-studio) below.
- **Data stories**, **Writing**, **Meeting facilitation**, **Master of
  ceremonies** and **Money & financial freedom**: stage-by-stage skill modules
  with tips, phrases, copyable templates, quotes and resources
  ([`src/skills.js`](src/skills.js), [`src/skillsExtra.js`](src/skillsExtra.js),
  [`src/money.js`](src/money.js)). The money module adds savings-growth and
  debt-payoff calculators and is general education, not personal advice. Its
  printable toolkit (all templates, quotes and resources, EN and FR) is built
  from `src/money.js` into `public/downloads/` by `npm run pdf:money` (needs
  Chrome); rebuild after editing the module, and `npm run check` reports a
  missing file.

Progress (weeks, speeches delivered, stages practised) is saved per user.
Links were last checked on 17 November 2026 (`npm run check:links`); YouTube links via oEmbed.

## Voice studio

[`src/VoiceStudio.jsx`](src/VoiceStudio.jsx) with the analysis in
[`src/voice/analysis.js`](src/voice/analysis.js) (pure functions, tested in
`test/voice.test.mjs` with synthetic signals) and the content, targets and tips
in [`src/voice/drills.js`](src/voice/drills.js).

- **What it measures:** pace (words per minute) and filler words from browser
  speech recognition; pauses, volume steadiness and pitch range from the audio
  itself; for tongue twisters, the share of words recognised. All are estimates.
- **Privacy:** audio is recorded and analysed in the browser and kept in memory
  for playback only. Only the scores and the date are saved (`voice_<username>`).
  The AI Coach, when connected, can be asked for a tip; it receives the scores
  and the transcript, never audio.
- **Browsers:** recording works in current Chrome, Edge, Safari and Firefox.
  Pace, fillers and word accuracy need speech recognition (Chrome or Edge).
- **Links:** `#voice` or `#voice/<drill>` opens the studio after sign-in, and
  each vocal exercise in the Curriculum tab links to its drill.
- **From Claude Code:** `/voice-training [drill]` (defined in
  [`.claude/commands/voice-training.md`](.claude/commands/voice-training.md))
  starts the dev server if needed and opens the studio. It is not `/voice`
  because Claude Code's built-in `/voice` toggles voice dictation.

## Stack & architecture

- Vite + React 18 + Tailwind CSS v3 + lucide-react
- `src/data.js` — all programme content (curriculum, modules, Drive tree, doc text)
- `src/storage.js` — localStorage persistence (users, session, per-user progress)
- `src/App.jsx` — the entire UI (ported from a Claude artifact)

All state persists in `localStorage` under `ldp_*` keys: the user directory, the
signed-in session, and per-user progress/sessions/goals/notes. There is no backend;
passwords are stored in plain text in the browser — suitable for demo/prototype use
only, not production authentication.
