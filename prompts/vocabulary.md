# Prompt: Vocabulary list

A reusable prompt that writes the key vocabulary for one module of the
Leadership & Communication Development Programme. Each entry has a term, a
plain definition and a real-world example of the term in use at work.

**How to use it:** copy everything below the line into Claude (or any capable
AI model), fill in the values in the `Module` block, and send. Leave a value
blank to let the model choose. Run it once per module. For a bilingual list,
choose "English and French".

---

You are an experienced leadership and communication coach and a language
teacher for professionals. Write the key vocabulary for one module of a
12-month leadership and communication development programme. The participants
are mid-career professionals in public service and international development,
working in countries and organisations around the world. Many of them work in
their second or third language, so the vocabulary must be precise, practical
and easy to use in a meeting tomorrow.

## Module

- Module title: {MODULE_TITLE}
- Key concepts already taught (optional, avoid repeating them): {CONCEPTS}
- Number of terms: {8 | 12 | 20}
- Language: {English | French | English and French}
- Level: {working professional | senior leader}
- Terms to include (optional): {TERMS}

## Choose the terms

- Pick the words and phrases a participant needs to **talk about** this topic
  and to **do** it at work: nouns ("talking points"), verbs ("escalate"),
  and short expressions ("read the room").
- Mix everyday workplace terms with a few specialist ones. Skip words any
  professional already knows.
- Don't repeat terms from the concepts listed above. If a term is essential
  anyway, give it a new angle.
- Order the terms from the most basic to the most advanced.

## For each term, write

1. **Term**: the word or phrase as people say it. Add the part of speech in
   brackets when it helps, e.g. "escalate (verb)".
2. **Definition**: one plain sentence, at most 20 words. Don't use the term
   itself, or a harder word, to define it.
3. **Real-world example**: one or two sentences showing the term used in a
   real work situation: who, where, what they did or said, and what happened.
   Set examples in different countries and kinds of organisations (ministry,
   NGO, international organisation, private company, community group). Use
   fictional names and no real organisation. Put the term in **bold** inside
   the example.
4. **Watch out** (optional): one short line on a common misuse, a false
   friend between English and French, or a nuance of tone. Include it only
   when it is genuinely useful.

For a bilingual list, give the French term, definition and example after the
English ones. Write natural French, not a word-for-word translation, and use
the French term people actually use at work. Where the English term is
commonly used in French workplaces (for example "feedback"), say so.

## Rules

- Never invent statistics or attribute quotes. Numbers in examples must
  clearly be part of the fictional scene.
- Balance women and men, and regions and cultures, across examples. Avoid
  stereotypes about any country or region.
- No organisation branding.
- Output as a Markdown table with the columns Term, Definition and Real-world
  example (plus Watch out if used), sorted in the order chosen above. No
  preamble before the table and no closing remarks.

---

## Example of a filled-in module block

```text
- Module title: Crisis Communication & Adaptability
- Key concepts already taught (optional, avoid repeating them): crisis
  communication principles, holding statement, adaptive challenges, VUCA,
  after-action review
- Number of terms: 8
- Language: English and French
- Level: working professional
- Terms to include (optional): spokesperson, misinformation
```

## Example of the output (two entries)

| Term | Definition | Real-world example | Watch out |
|---|---|---|---|
| spokesperson (noun) | The one person authorised to speak for an organisation on a topic. | When floods hit the coast, the agency in Manila named Ana as its only **spokesperson**, so every journalist heard the same facts. | Not the same as a press officer, who organises interviews but may not speak publicly. |
| misinformation (noun) | False or misleading information, shared whether or not people know it is false. | A health office in Lima answered vaccine **misinformation** on social media within hours, with a short video from a local nurse. | "Disinformation" is false information spread on purpose. |
