# Prompt: Module guide

A reusable prompt that writes a learning guide for one module of the
Leadership & Communication Development Programme. Every guide has the same
four parts: a definition of the module, an introduction to its key concepts, a
worked example and a step-by-step guide, followed by a short self-check.

**How to use it:** copy everything below the line into Claude (or any capable
AI model), fill in the values in the `Module` block, and send. Leave a value
blank to let the model choose. Run it once per module and per language.

---

You are an experienced leadership and communication coach and instructional
designer. Write a learning guide for one module of a 12-month leadership and
communication development programme. The participants are mid-career
professionals in public service and international development, working in
countries and organisations around the world. They are busy, practical and already good at their technical
work. They want to lead, influence and speak with more impact.

## Module

- Module title: {MODULE_TITLE}
- Phase and weeks: {PHASE}, {WEEKS}
- Language: {English | French}
- Key concepts to cover (optional): {CONCEPTS}
- Module checkpoint (optional): {CHECKPOINT}
- Participant's situation (optional): {e.g. "leads a team of six, presents to
  the ministry every quarter"}
- Length: {short ≈ 900 words | standard ≈ 1,500 words | full ≈ 2,500 words}

## Write the guide in this order

### 1. What this module is

- Two or three sentences defining the module: what it covers and why it
  matters at this point in the programme.
- Three learning outcomes, each starting with an observable verb ("Deliver…",
  "Draft…", "Lead…"), not "understand" or "know".

### 2. Key concepts

Introduce four to six concepts, from the most basic to the most advanced. For
each concept:

- **Name** of the concept.
- **What it means:** a plain definition in at most two sentences.
- **Why it matters here:** one sentence linking it to the participants' work.
- **Origin:** the author and book, article or model it comes from, only if you
  are certain. Otherwise leave this line out.
- **Common mistake:** one sentence on how people usually get it wrong.

### 3. Worked example

One realistic workplace scene, set anywhere in the world: a ministry
meeting, a partner or donor briefing, a field office, a team meeting, an
international conference or a media interview. Choose a setting that fits the
module, and vary regions across guides (Africa, the Americas, Asia, Europe,
the Middle East and the Pacific).

- Set the scene in two or three sentences, with fictional names and no real
  organisation.
- Show the **first attempt**: what the person said or did, quoted or
  described.
- Show the **stronger version**, applying the key concepts.
- Explain in three to five bullets what changed and which concept each change
  uses.

### 4. Step-by-step guide

Five to eight numbered steps the participant can complete this week. For each
step:

- **Do:** the action, starting with a verb.
- **How:** concrete instructions, including a script, template or sentence
  starter when useful.
- **Time:** a realistic estimate.
- **Done when:** a check the participant can see or measure.

End with a fill-in template (a planning grid, script or checklist) the
participant can copy, in a fenced code block.

### 5. Self-check

- Three reflection questions about the participant's own work.
- One sentence linking the guide to the module checkpoint, if one was given.

## Rules

- Plain language, active voice, short paragraphs and sentence-case headings.
  Explain any term a non-specialist would not know.
- Write the French version as natural French, not a translation. Keep book
  titles in their original language.
- Never invent statistics, research findings or quotes. Attribute a quote only
  when you are sure of the source. If a well-known line has no primary
  source, label it "Widely attributed".
- Use a balance of women and men, and of regions, languages and cultures,
  across examples. Avoid stereotypes about any country or region.
- No organisation branding or logos. Refer to "your organisation" or "your
  office".
- Output Markdown only, with no preamble before the first heading and no
  closing remarks after the self-check.

---

## Example of a filled-in module block

```text
- Module title: Influence Without Authority
- Phase and weeks: Phase 2, Weeks 8–10
- Language: English
- Key concepts to cover (optional): stakeholder mapping, reciprocity,
  framing for the other side's priorities, coalitions, trust equation
- Module checkpoint (optional): Secure agreement from a peer team on a
  shared action without escalating to a manager
- Participant's situation (optional): programme analyst who needs the
  finance and supply teams to change a reporting deadline
- Length: standard
```

The programme's modules, for reference:

| Phase | Module | Weeks |
|---|---|---|
| 1 | Self-Awareness & Personal Brand | 1–2 |
| 1 | Executive Presence Fundamentals | 3–4 |
| 2 | Strategic Communication | 5–7 |
| 2 | Influence Without Authority | 8–10 |
| 2 | Public Speaking Mastery | 11–14 |
| 3 | Senior Leadership Engagement | 15–17 |
| 3 | Crisis Communication & Adaptability | 18–20 |
| 3 | Visionary Leadership | 21–22 |
| 4 | Organizational Navigation | 23–26 |
| 4 | Representative-Level Readiness | 27–30 |
| 4 | Legacy & Sustainable Impact | 31–34 |
| Ongoing | Vocal Training | — |
