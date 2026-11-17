# Prompt: Voice studio and the `/voice` command

Paste everything below the line into Claude Code, started in the
`leadership-portal` folder.

---

Build a **Voice studio** for vocal training in the Leadership & Communication
portal, and a project slash command `/voice` that opens it. Claude Code runs in
a terminal and cannot hear audio, so the listening happens in the browser: the
studio uses the microphone, and `/voice` starts the portal and opens the
studio at the right drill.

## What the participant gets

A daily voice practice that measures delivery and gives one specific tip at a
time, in English and French:

- **Warm-up**: the programme's 10-minute routine (jaw release, breathing, lip
  trills, sirens, articulation, projection), one guided step at a time with a
  timer and spoken cues.
- **Drills**, each a short exercise with a clear target:
  - *Pace*: read a passage aloud aiming for about 150 words per minute.
  - *Pauses*: deliver a passage with deliberate 2–3 second pauses.
  - *Articulation*: tongue twisters (EN and FR).
  - *Projection and steadiness*: hold an even volume across a passage.
  - *Pitch variety*: say one sentence five ways.
  - *Fillers*: speak 60 seconds on a random topic with as few fillers as possible.
- **Feedback after each take**: pace, filler words, pauses, volume steadiness
  and pitch variety, each against its target, then one drill to try next. The
  participant can play their take back.
- **Progress**: a short history of takes per drill, so improvement is visible.
  The curriculum's vocal exercises (the `ve` items on each module) link to the
  matching drill.

## Build on what exists

Reuse these; extend rather than duplicate:

- `src/coach/companion.js`: `speechMeta`, `mergeSpeech` and `speechNote` already
  count words, pace and fillers (EN/FR filler lists).
- `src/coach/AICoachModule.jsx`: `getRecognitionCtor`, `voicesFor` and
  `speakText` wrap speech recognition and synthesis.
- `src/readAloud.js`: sentence-by-sentence read-aloud.
- `src/data.js` and `src/curriculumFr.js`: the vocal exercises per module, in
  English and French.
- `src/storage.js` (`USER_PREFIXES`) and the `prog` categories: per-user saving.
- `src/i18n.js`: every visible string, with the same keys in `en` and `fr`.

Move shared helpers into a small module (for example `src/voice/`) when two
places need them, and import from there.

## Rules

- **Audio stays on the device.** Record and analyse in the browser
  (`getUserMedia`, `MediaRecorder`, Web Audio `AnalyserNode`). Keep takes in
  memory for playback, and save only the numbers and the date. If the AI Coach
  is connected, it may receive the metrics and the transcript to write a tip;
  it never receives audio. Say this in one line on the studio screen.
- **Graceful fallbacks.** Without speech recognition (Firefox, some Safari
  versions), still measure pauses, volume and pitch, and say that pace and
  fillers need Chrome or Edge. If the microphone is refused, explain how to
  allow it, and keep the warm-up usable.
- **Honest feedback.** Label the figures as estimates; the README already notes
  that browser speech recognition often drops hesitations such as "um".
- Match the portal's design (`ldp-*` classes, Newsreader / Public Sans), keep
  it usable on a phone and by keyboard, and add no new dependencies.

## Steps

1. **Read the voice code above** and list what you will reuse and what is new.
   Done when every metric in "Feedback" maps to an existing helper or a new
   function you have named.

2. **Write the analysis as pure functions** (no React, no browser APIs) that
   take samples or a transcript and return numbers: pause count and lengths
   from an RMS envelope, volume steadiness (variation of RMS while speaking),
   and pitch variety (autocorrelation pitch track, spread in semitones). Add
   `test/voice.test.mjs` with synthetic signals: silence, a steady 220 Hz tone,
   a tone that glides one octave, and tone-silence-tone. Wire it into
   `npm run check`. Done when the tests pass and each one would fail if its
   function returned a constant.

3. **Build the studio** as a new Personal Development view (`voice`, label
   "Voice studio" / "Studio vocal") with the warm-up, drills, feedback, playback
   and progress described above. Open it from the URL hash `#voice`, and
   `#voice/<drill>` for a drill (for example `#voice/pace`). Done when every
   drill can be started, recorded, scored and replayed, and the hash opens the
   right drill on load.

4. **Link the curriculum.** Each module's vocal exercise in the Curriculum tab
   gets a "Practise in the Voice studio" link to the matching drill. Done when
   every `ve` item of every module, in both languages, points to a drill.

5. **Add `/voice`** as `.claude/commands/voice.md`. When run, it:
   - starts the dev server with `npm run dev` (port 3005) if it is not already
     answering;
   - opens `http://localhost:3005/#voice` in the default browser (`open` on
     macOS), or `#voice/<drill>` when given an argument such as
     `/voice pace` or `/voice articulation`;
   - prints the drills available and today's warm-up in a few lines.

   Give the file a `description` and an `argument-hint` in its frontmatter.
   If your Claude Code version already has a built-in `/voice`, name the file
   `voice-training.md` and say so in the README. Done when `/voice` and
   `/voice pace` open the right screen from a fresh terminal.

6. **Verify.** Run `npm run build` and `npm run check`. Open the studio in the
   browser in English and French, at desktop and phone widths, and check the
   console is clean. Test the real microphone flow yourself in a browser that
   allows it; the Claude Code browser pane blocks the microphone, so there use
   the pure-function tests and the fallback screens. Done when all of this
   passes and you have recorded one real take in Chrome.

7. **Document** the studio and `/voice` in `README.md` (what it measures, the
   privacy rule, browser support). Commit only when asked; publish with
   `npm run deploy`.

## Finish with a report

List what was built, what was tested and how, anything not tested (say so
plainly), and any browser where a metric is unavailable.
