---
description: Open the portal's Voice studio for vocal training (warm-up and drills)
argument-hint: "[warmup|pace|pauses|articulation|projection|pitch|fillers]"
---

Open the Leadership portal's Voice studio so the user can practise their voice.
The studio records and analyses in the browser; you only start the portal and
open the right screen. (Claude Code's own `/voice` is voice dictation, which is
why this command is `/voice-training`.)

Drill requested: `$ARGUMENTS`

1. Choose the drill. Valid drills: `warmup`, `pace`, `pauses`, `articulation`,
   `projection`, `pitch`, `fillers`. Use the requested one if it is valid;
   with no argument use `warmup`; with anything else, say which drills exist
   and use `warmup`.
2. Check whether the portal is running: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3005/`.
   If it does not answer 200, start it from the `leadership-portal` folder with
   `npm run dev` as a background process, then poll the same URL every second
   until it answers 200 (give up after 30 seconds and show the dev server's
   output).
3. Open `http://localhost:3005/#voice/<drill>` in the user's default browser
   (`open` on macOS, `xdg-open` on Linux, `start` on Windows). The user must be
   signed in to the portal; the studio opens right after sign-in.
4. Reply in a few lines: the drill that is open, its target (warm-up 10 min;
   pace 130–165 words per minute; pauses 3 or more of 1.5–3.5 s; articulation
   90% of words recognised; projection volume spread 4 dB or less; pitch range
   4–12 semitones; fillers 2 or fewer per minute), and the other drills they
   can open with `/voice-training <drill>`. Remind them that Chrome or Edge is
   needed for pace, fillers and articulation, and that the audio never leaves
   their browser.
