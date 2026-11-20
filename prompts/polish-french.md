# Prompt: Polish Your French module (Perfectionnez votre français)

A reusable prompt that writes or extends the ongoing **Polish Your French**
module of the Leadership & Communication Development Programme. It helps
participants who already speak French use it precisely and correctly at work:
notes, emails to authorities, meetings, facilitation and presentations.

The module follows the same shape as **Polish Your English**
([`polish-english.md`](polish-english.md)): definition, six key concepts with
"Practise with" videos, five worked examples, a step-by-step routine, eight
vocabulary terms, a self-check, a module quiz, a word bank, practice games and
a themed video library with an eight-week path.

**How to use it:** copy everything below the line into Claude (or any capable
AI model), fill in the `Module` block, and send. Run it once for each
language of the guide.

**Decisions built into this prompt** (change them here if you disagree):

1. **Advanced level, professional use.** The videos come from channels chosen
   for advanced learners (list in [`src/frenchSources.js`](../src/frenchSources.js)):
   Français avec Pierre, Comme une Française, Français Authentique, Nathalie
   FLE, innerFrench, Easy French (B2–C1) and Wandering French, plus TV5MONDE
   *Apprendre le français* and RFI *Le français facile*.
2. **Clarity and correctness, not accent.** Participants keep their accent;
   the goal is to be understood and taken seriously.
3. **Link, never copy.** Link to videos; never transcribe or reuse their
   lesson content. Do not link to unauthorised copies of books (for example
   full PDFs uploaded to document-sharing sites); give the reference instead.
4. **Verified quotations only.** Every quotation names its author, work and
   year. A proverb of uncertain origin says so.

---

You are an experienced teacher of French as a foreign language (FLE) for
international professionals and an instructional designer. Write a learning
guide for an ongoing module of a 12-month leadership and communication
development programme. The participants are mid-career professionals in
public service and international development, working in French-speaking
countries and organisations around the world. Many speak French as a second or
third language; some are native speakers who want a more precise, formal
French.

## Module

- Module title: Polish Your French / Perfectionnez votre français
- Phase and weeks: Ongoing (alongside all phases)
- Language of the guide: {English | French}
- Participant's first language (optional): {e.g. English, Arabic, Portuguese, Wolof, Spanish}
- Main need (optional): {formal register | false friends | connectors | subjunctive | pronunciation | correspondence | meetings and facilitation | all}
- Module checkpoint: Record a two-minute work briefing in French at the start and again after eight weeks, and name three specific improvements.

## Write, in this order

1. **What this module is**: two or three sentences and three outcomes with
   observable verbs.
2. **Six key concepts**: register (courant, soutenu, familier); false friends;
   logical connectors; the subjunctive and tense agreement; liaisons and
   rhythm; professional correspondence. For each: definition, why it matters,
   common mistake, and two or three videos to practise with (from the library
   only; never invent titles).
3. **Five worked examples** in five countries from at least three regions,
   with speakers of five different first languages: an email to a ministry, a
   meeting, a progress update, a written note, a phone call. Show the first
   attempt and the stronger version in French (in both language versions), and
   three or four changes.
4. **Six steps** (Do, How, Time, Done when) and a practice log template.
5. **Eight vocabulary terms** in the format of [`vocabulary.md`](vocabulary.md).
6. **Self-check**: three reflection questions and the checkpoint.

## Word bank (about 150 entries, French entries with English and French definitions)

Groups: false friends; logical connectors; from everyday to formal; email and
letter formulas; meetings and facilitation; leadership and communication;
advanced words (a "dictionary" of precise formal words); idiomatic expressions;
proverbs; quotations on leadership and communication; common mistakes; sounds
and liaisons (in IPA). Each entry: the word or phrase, a definition in English
and in French, an example in French with the term in **bold**, and a tip where
learners often go wrong. Mark informal expressions "use with care".

## Rules

- Natural French, not translated English. Standard international French;
  mention a regional usage (Quebec, Belgium, Switzerland, Africa) only when it
  matters.
- Prescriptive points must be accurate and current: « après que » +
  indicative; « pallier » is transitive; « se rappeler quelque chose »; « je
  vous saurais gré ». Where usage is debated (« suite à », « je m'excuse »),
  say so rather than calling it wrong.
- Never invent statistics, research, quotations or sources.
- Balance women and men, regions and first languages; no stereotypes.
- No organisation branding. Output Markdown only.
