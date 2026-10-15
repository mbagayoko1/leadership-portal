// Builds the "portal map" the AI Coach reads: what is in the portal, where
// each item can be opened ([target] = a valid [[open:target]] link), and the
// participant's progress. Generated from the live data so it never drifts.
import { SM, CI, CUR, DDC } from "../data.js";
import { COMPETENCIES } from "../competencies.js";
import { SPEAKERS, PD_PLAN } from "../development.js";
import { SPEECHES, SPEECH_THEMES } from "../speeches.js";
import { SKILLS } from "../skills.js";
import { STR } from "../i18n.js";

export const NAV_TABS = { dashboard: "dashboard", curriculum: "curriculum", study: "study-guide", development: "development", resources: "resources", drive: "drive" };

const TAB_DESC = {
  dashboard: "Dashboard: the participant's progress overview",
  curriculum: "Curriculum: all 4 phases with daily tasks, readings, vocal exercises and checkpoints; modules are marked complete here",
  study: "Study Guide: one page per module with a resource guide, videos, articles, readings and reflection questions",
  development: "Personal Development: a four-week plan (purpose and goals, daily discipline, voice and presence, resilience and legacy); speakers, coaches, researchers, African leaders and classic public-domain thinkers, each with key lessons, verified quotes and practices; a library of 30 original motivational speeches to read, study and deliver; and three skill modules (meeting facilitation; master of ceremonies; money and financial freedom, with savings and debt calculators), each with stage-by-stage tips, sample phrases, templates, quotes and resources",
  resources: "Resources: the 7 coaching and facilitation competencies (with videos, articles and textbooks), vocal training, practice opportunities and common pitfalls",
  drive: "Drive: the programme's Google Drive folders"
};

function vocalTargets() {
  const m = /VOCAL TARGETS\n([\s\S]*)$/.exec(DDC.vocal || "");
  return m ? m[1].split("\n").map(s => s.replace(/^•\s*/, "").trim()).filter(Boolean).join("; ") : "";
}

export function buildPortalMap(user, prog) {
  const done = new Set(Object.keys((prog && prog.mod) || {}).filter(k => prog.mod[k]));
  const total = Object.values(CUR).reduce((n, ph) => n + ph.modules.length, 0);
  const next = SM.find(m => !done.has(m.id));
  const count = o => Object.values(o || {}).filter(Boolean).length;

  const lines = ["PORTAL MAP (link targets in square brackets)", "", "Tabs:"];
  Object.keys(NAV_TABS).forEach(k => lines.push("[tab:" + k + "] " + TAB_DESC[k]));

  lines.push("", "Curriculum modules (each opens its Study Guide page):");
  SM.forEach(m => {
    lines.push("[module:" + m.id + "] Phase " + m.ph + ", " + m.wk + ": " + m.title + (done.has(m.id) ? " (completed)" : "") +
      ". Checkpoint: " + m.cp +
      (m.reads.length ? " Readings: " + m.reads.join("; ") + "." : "") +
      (m.vids.length ? " Videos: " + m.vids.map(v => v.t).join("; ") + "." : ""));
  });
  CI.forEach(m => lines.push("[module:" + m.id + "] Communication track: " + m.title + ". " + m.cp));
  const vt = vocalTargets();
  if (vt) lines.push("Vocal targets used in the programme: " + vt + ".");

  lines.push("", "Coaching and facilitation competencies (Resources tab):");
  COMPETENCIES.forEach((c, i) => lines.push("[competency:" + c.id + "] " + STR.en.compItems[i] + ": " + c.overview.en.split(". ")[0] + "."));

  lines.push("", "Personal Development speakers, researchers, channels and classic thinkers (Personal Development tab). Their ideas are summarised; the only quotations you may give word for word are the ones listed below with their sources, so do not attribute other exact quotations to them. Lines marked \"Widely attributed\" circulate under the person's name without one fixed source; say so if you use them:");
  SPEAKERS.forEach(s => lines.push("[speaker:" + s.id + "] " + s.name + (s.kind === "classic" ? " (classic, public domain)" : "") + " – " + s.theme.en + "." +
    (s.quotes.length ? " Quotes: " + s.quotes.map(q => "\"" + q.text + "\" (" + q.source + ")").join("; ") + "." : "") + " Practice: " + s.practice.en));

  lines.push("", "Speech library (Personal Development tab, original speeches written for this programme, about 1.5 minutes each). Suggest one that fits the participant's occasion, and use it to rehearse delivery:");
  SPEECHES.forEach(s => lines.push("[speech:" + s.id + "] " + s.title.en + " (" + SPEECH_THEMES[s.theme].en + "). Occasion: " + s.occasion.en + " Key message: " + s.key.en));

  lines.push("", "[skill:builder] Speech builder (Personal Development tab): the participant fills in a brief (topic, goal, occasion, audience, length, tone, language, structure, key messages, story, facts, call to action, acknowledgements, techniques) and gets a full draft to edit, refine, read aloud and save. Suggest it when someone needs to prepare a real speech.");
  lines.push("", "Skill modules (Personal Development tab). Each has stages with tips and sample phrases, copyable templates, quotes and resources:");
  lines.push("For the money module: give general financial education only. Do not recommend specific securities, funds, crypto-assets, lenders or amounts, and do not predict markets. For personal decisions, suggest a licensed independent adviser, and the UN Joint Staff Pension Fund for pension questions. UN staff need prior approval for outside occupation or employment.");
  SKILLS.forEach(m => lines.push("[skill:" + m.id + "] " + m.title.en + ": " + m.sub.en + " Stages: " + m.stages.map(st => st.title.en + " (" + st.goal.en + ")").join("; ") + ". Templates: " + m.templates.map(tp => tp.title.en).join(", ") + "."));

  lines.push("", "PARTICIPANT PROGRESS");
  lines.push("Role: " + user.role + ".");
  lines.push("Modules marked complete: " + done.size + " of " + total + (done.size ? " (" + SM.filter(m => done.has(m.id)).map(m => m.id).join(", ") + ")" : "") + ".");
  lines.push(next ? "Next unfinished module: [module:" + next.id + "] " + next.title + " (" + next.wk + ")." : "All modules are marked complete.");
  lines.push("Readings ticked off: " + count(prog && prog.rt) + ". Vocal exercises ticked off: " + count(prog && prog.ve) + ".");
  SKILLS.forEach(m => lines.push(m.title.en + " stages practised: " + m.stages.filter(st => prog && prog.sk && prog.sk[st.id]).map(st => st.title.en).join("; ") + (m.stages.some(st => prog && prog.sk && prog.sk[st.id]) ? "." : "none yet.")));
  lines.push("Speeches marked as delivered: " + count(prog && prog.sp) + " of " + SPEECHES.length + ".");
  lines.push("Personal Development weeks completed: " + PD_PLAN.filter(w => prog && prog.pd && prog.pd[w.id]).map(w => w.title.en).join("; ") + (count(prog && prog.pd) ? "." : "none yet."));
  return lines.join("\n");
}
