// Module guides (English). One per curriculum module, written from the
// template in prompts/module-guide.md: definition and outcomes, key concepts,
// five worked examples (the first here, four more in examples-en.js), step-by-step guide, self-check. Example scenes are set
// around the world (Africa, the Americas, Asia, Europe, the Middle East). The French version in
// fr.js must keep the same modules and the same number of items in each list
// (npm run check:data compares them). Names in examples are fictional.
// A concept's `src` is set only when the origin is certain.

import MORE from "./examples-en.js";
import VOCAB from "./vocab-en.js";
import { conceptLinks, LINKED_MODULES } from "./conceptLinks.js";

const GUIDES = {
  m1: {
    def: "This module helps you see yourself the way others experience you, and decide how you want to be known. Self-awareness comes first in the programme because every later skill, from presence to influence, depends on knowing your strengths, your blind spots and the values you lead from.",
    outcomes: [
      "Name your three core leadership values and give an example of each from your work.",
      "Compare how you see yourself with how colleagues see you, using structured feedback.",
      "Deliver a five-minute introduction that states who you are, what you stand for and what you offer."
    ],
    concepts: [
      { n: "Internal and external self-awareness", d: "Internal self-awareness is knowing your own values, feelings and patterns. External self-awareness is knowing how other people see you.", why: "Many capable professionals are strong on one and weak on the other, which is why their impact differs from their intention.", src: "Tasha Eurich, Insight (2017)", miss: "Assuming that reflecting alone is enough, without asking others." },
      { n: "The Johari window", d: "A four-part grid: what you and others both know about you, what only others see (blind spot), what only you know (hidden) and what nobody knows yet.", why: "It shows that feedback shrinks your blind spot and sharing shrinks your hidden area.", src: "Joseph Luft and Harrington Ingham (1955)", miss: "Treating it as a personality test instead of a prompt to ask and share." },
      { n: "Core values", d: "The few principles you will not trade away, even under pressure.", why: "Values make your decisions predictable, and predictability builds trust in a team.", miss: "Listing ten values. If everything is a value, nothing guides a decision." },
      { n: "Situation, behaviour, impact (SBI)", d: "A way to give and request feedback: describe the situation, the observable behaviour and its impact.", why: "It turns vague comments such as \"be more confident\" into something you can act on.", src: "Center for Creative Leadership", miss: "Describing a person's character instead of what they did." },
      { n: "Personal brand", d: "The consistent impression people hold of what you are good at and what you can be trusted with.", why: "In a large organisation, opportunities often go to people whose strengths are known, not only to the strongest.", miss: "Confusing brand with self-promotion. A credible brand is built from repeated behaviour, then stated." }
    ],
    examples: [{
      t: "Introducing yourself at a workshop",
      scene: "Aminata, a monitoring and evaluation analyst in Dakar, is asked to introduce herself at a regional workshop with partners from five countries. She has two minutes.",
      first: "\"Good morning, I'm Aminata, I work in monitoring and evaluation. I've been here for six years. I do a lot of things: reports, data, some trainings. Happy to be here.\"",
      better: "\"Good morning, I'm Aminata. For six years I've helped teams turn field data into decisions. Last year our district dashboards cut reporting delays from two months to two weeks. What I care about is evidence that reaches the people who decide. Today I'd like to learn how your countries use data in budget talks.\"",
      changes: [
        "She leads with what she does for others, not her job title: that is her personal brand.",
        "One concrete result replaces a list of tasks, which makes the claim believable.",
        "\"Evidence that reaches the people who decide\" states a core value in one line.",
        "She ends with a question for the room, which shows curiosity and invites connection."
      ]
    }],
    steps: [
      { do: "List your values", how: "Write down ten values, then cut to three by asking: which would I keep if it cost me something?", time: "20 minutes", done: "Three values, each with a one-line example from the last year." },
      { do: "Ask for feedback", how: "Send three colleagues one question: \"What is one thing I do that helps the team, and one thing that would make me more effective?\" Ask them to use situation, behaviour, impact.", time: "15 minutes to send", done: "At least two replies received." },
      { do: "Fill in your Johari window", how: "Put what you already knew in the open area, and anything surprising from the feedback in the blind spot.", time: "20 minutes", done: "One blind spot you will work on, written down." },
      { do: "Draft your introduction", how: "Use the template below: what you do for others, one result, one value, one question.", time: "30 minutes", done: "A script that takes under two minutes to read aloud." },
      { do: "Record a five-minute talk", how: "Expand the introduction into a five-minute talk and record it on your phone. Watch it once with sound off, once with sound on.", time: "45 minutes", done: "You can name two things to keep and one to change." },
      { do: "Share and adjust", how: "Show the recording to your mentor or a trusted colleague and ask whether it sounds like you at your best.", time: "20 minutes", done: "A final version you are ready to present." }
    ],
    template: "MY INTRODUCTION\nWhat I do for others: I help ____ to ____.\nOne result: Last year, ____ (number or change).\nWhat I stand for: I care about ____.\nWhat I want from this room: I'd like to learn ____.\n\nMY THREE VALUES\n1. ____ — example: ____\n2. ____ — example: ____\n3. ____ — example: ____",
    reflect: [
      "Which piece of feedback surprised you most, and what does it tell you about your blind spot?",
      "When did one of your values last cost you something? What did you choose?",
      "What would you like colleagues to say about you when you are not in the room?"
    ],
    checkpoint: "Your recorded talk from step 5 is the draft of the Week 2 checkpoint: a five-minute presentation at your highest standard."
  },

  m2: {
    def: "Executive presence is the impression that you are ready for more responsibility: that you stay calm, speak clearly and can be trusted with difficult situations. This module breaks it into behaviours you can practise, so presence stops being a mystery and becomes a skill.",
    outcomes: [
      "Open any meeting contribution with your main point in one sentence.",
      "Stay composed when challenged, using a pause and a bridging phrase.",
      "Assess your own presence against a simple rubric and set one improvement goal."
    ],
    concepts: [
      { n: "Gravitas, communication, appearance", d: "Three pillars of executive presence: how you act under pressure, how you speak, and how you present yourself.", why: "Gravitas weighs most. Clear thinking under pressure matters more than polish.", src: "Sylvia Ann Hewlett, Executive Presence (2014)", miss: "Spending effort on appearance while ignoring composure." },
      { n: "Warmth and competence", d: "People judge others quickly on two questions: does this person mean well, and can they deliver?", why: "Leaders who show only competence can seem cold. Showing warmth first makes your competence easier to accept.", src: "Susan Fiske, Amy Cuddy and Peter Glick (2007)", miss: "Trying to impress before connecting." },
      { n: "Bottom line up front", d: "Say your conclusion or request first, then the supporting detail.", why: "Senior people listen for the point. If it comes last, they may have stopped listening.", miss: "Telling the story in the order it happened." },
      { n: "Composure", d: "Staying steady in voice, body and words when challenged or surprised.", why: "People read composure as confidence and competence.", miss: "Answering instantly. A two-second pause looks thoughtful, not weak." },
      { n: "Presence through listening", d: "Giving full attention, asking good questions and building on what others say.", why: "In many settings, the most respected person speaks last and briefly.", miss: "Thinking presence means speaking the most." }
    ],
    examples: [{
      t: "Answering your director in front of a partner",
      scene: "Lucía, a programme officer in Bogotá, is asked by her director during a team meeting why a training was postponed. A partner is in the room.",
      first: "\"Well, there were a lot of issues. First the venue, then the consultant had visa problems, and also the participants list wasn't ready, so we thought maybe it was better to wait, and...\"",
      better: "(Pause.) \"We moved it to 14 March so the right participants can attend. The list is now confirmed and the venue booked. The one risk is the consultant's visa; I'll know by Friday and have a local backup ready.\"",
      changes: [
        "The pause gives her a moment to organise her answer and signals calm.",
        "The first sentence gives the bottom line: the new date and why.",
        "She names the remaining risk herself, which builds trust in front of the partner.",
        "She ends with a plan, so the director does not need to ask a follow-up."
      ]
    }],
    steps: [
      { do: "Score yourself", how: "Rate yourself from 1 to 5 on composure, clarity, brevity, listening and appearance, using the rubric below.", time: "15 minutes", done: "Five scores and your lowest area circled." },
      { do: "Ask one observer", how: "Ask a colleague to score you on the same rubric after your next meeting.", time: "5 minutes to ask", done: "You can compare their scores with yours." },
      { do: "Practise bottom line up front", how: "Before each meeting this week, write your main point in one sentence and say it first.", time: "5 minutes per meeting", done: "Three meetings where you opened with your point." },
      { do: "Practise the pause", how: "When asked a question, breathe in, pause two seconds, then answer. Ask a colleague to note whether you rushed.", time: "During meetings", done: "You paused before at least five answers." },
      { do: "Prepare a hard question", how: "Write the toughest question you could get on your work and a three-sentence answer: point, reason, next step.", time: "20 minutes", done: "You can answer it aloud without notes." },
      { do: "Present and self-assess", how: "Present a short update to your team and score yourself again on the rubric.", time: "30 minutes", done: "Your lowest score has improved by at least one point." }
    ],
    template: "EXECUTIVE PRESENCE RUBRIC (1 = rarely, 5 = consistently)\nComposure — I stay calm when challenged: __\nClarity — my main point is clear in one sentence: __\nBrevity — I stop when I've made my point: __\nListening — I build on what others say: __\nAppearance — my appearance fits the setting: __\n\nMY ONE-SENTENCE POINT FOR THE NEXT MEETING\n____",
    reflect: [
      "Think of someone whose presence you admire. Which specific behaviours create that impression?",
      "In which situations do you lose composure, and what happens just before?",
      "What would change if you spoke less but more clearly in meetings?"
    ],
    checkpoint: "Use the rubric when you present to your team for the Week 4 checkpoint, then compare your score with an observer's."
  },

  m3: {
    def: "Strategic communication means shaping a message so that a specific audience understands it, remembers it and acts on it. This module teaches you to structure ideas from the conclusion down, turn data into messages and make them stick.",
    outcomes: [
      "Structure a briefing or presentation with the main message first and three supporting points.",
      "Turn a table of data into one clear message with a recommended action.",
      "Adapt the same content for two different audiences."
    ],
    concepts: [
      { n: "The pyramid principle", d: "Start with the answer, then group supporting arguments beneath it, each backed by evidence.", why: "Busy readers get the message even if they stop after the first paragraph.", src: "Barbara Minto, The Pyramid Principle", miss: "Building up to the conclusion as in an academic paper." },
      { n: "Situation, complication, question, answer", d: "A short opening that sets the context, names the problem, raises the question and gives your answer.", why: "It frames why your message matters before you give detail.", src: "Barbara Minto", miss: "Spending most of the time on the situation." },
      { n: "Audience first", d: "Before writing, ask: who is this for, what do they already know, what do they care about, and what do I want them to do?", why: "The same facts need a different message for a minister, a donor and a community leader.", miss: "Writing one version for everyone." },
      { n: "From data to \"so what\"", d: "Each chart or number should come with the conclusion it supports and what to do about it.", why: "Data does not speak for itself. Audiences remember messages, not tables.", miss: "Showing every number you have." },
      { n: "Sticky messages", d: "Messages are remembered when they are simple, unexpected, concrete, credible, emotional and told as stories.", why: "A memorable message travels further after the meeting ends.", src: "Chip Heath and Dan Heath, Made to Stick (2007)", miss: "Abstract language like \"strengthen capacity\" with no concrete picture." }
    ],
    examples: [{
      t: "Presenting survey results to a ministry",
      scene: "Priya, a data specialist in Dhaka, must present new survey results to the health ministry's planning team. She has ten minutes and twenty slides.",
      first: "She opens with the survey methodology, then shows fourteen charts in the order of the questionnaire. Her recommendation appears on the last slide, which she reaches as time runs out.",
      better: "She opens: \"In three northern districts, one woman in four who wants to avoid pregnancy has no access to modern contraception. Closing that gap in the next budget would cost less than treating the complications it causes. I'll show you three reasons and one option.\" She shows three charts, each with a headline that states its message, and spends the last four minutes on the option and questions.",
      changes: [
        "The answer and the recommendation come first, following the pyramid principle.",
        "Twenty slides become three, each with a message headline instead of a topic title.",
        "\"One woman in four\" is concrete and easier to remember than a percentage table.",
        "The methodology moves to an annex, available if anyone asks."
      ]
    }],
    steps: [
      { do: "Define the audience and action", how: "Write one sentence: \"After this, [audience] will [action].\"", time: "10 minutes", done: "The sentence names a person or group and a verb." },
      { do: "Write the main message", how: "Write your answer in under 25 words. Read it aloud. If it needs explaining, rewrite it.", time: "15 minutes", done: "A colleague can repeat it back after hearing it once." },
      { do: "Build the pyramid", how: "Add three supporting points under the message, each with its strongest evidence.", time: "30 minutes", done: "A one-page outline using the template below." },
      { do: "Rewrite chart titles", how: "Replace topic titles (\"Contraceptive use by region\") with message headlines (\"Use is lowest in the north\").", time: "20 minutes", done: "Every chart title states a conclusion." },
      { do: "Add one concrete image", how: "Find a story, comparison or number that makes the message real for this audience.", time: "15 minutes", done: "Your opening contains something people can picture." },
      { do: "Test with a colleague", how: "Present in five minutes, then ask: \"What is the one thing you'll remember? What would you do next?\"", time: "20 minutes", done: "Their answer matches your main message." }
    ],
    template: "MESSAGE PYRAMID\nAudience: ____\nAfter this, they will: ____\n\nMain message (under 25 words):\n____\n\nSupporting point 1: ____ | evidence: ____\nSupporting point 2: ____ | evidence: ____\nSupporting point 3: ____ | evidence: ____\n\nConcrete image or story: ____\nThe ask: ____",
    reflect: [
      "Think of your last presentation. Could someone repeat your main message a week later?",
      "Which audience do you find hardest to communicate with, and what do they care about most?",
      "Where in your work do you show data without saying what it means?"
    ],
    checkpoint: "Build your Week 7 data-driven presentation with the message pyramid, and test it with a colleague first."
  },

  m4: {
    def: "Influence without authority is getting things done through people who do not report to you: peers, partners, other teams and senior colleagues. This module shows you how to understand what others value, build trust and form alliances so that people choose to work with you.",
    outcomes: [
      "Map the stakeholders for a goal by their influence and interest.",
      "Frame a request in terms of what the other side values.",
      "Lead a cross-team meeting to an agreed action without escalating."
    ],
    concepts: [
      { n: "Currencies of exchange", d: "People cooperate when they get something they value in return: information, recognition, support, resources or a sense of contributing to the mission.", why: "If you know someone's currency, you can offer value before you ask.", src: "Allan Cohen and David Bradford, Influence Without Authority (1990)", miss: "Assuming everyone values what you value." },
      { n: "Stakeholder mapping", d: "Placing people on a grid by their power over your goal and their interest in it, then deciding how to engage each group.", why: "It shows where to spend your limited time.", src: "Adapted from Aubrey Mendelow (1981)", miss: "Only engaging the people who already agree with you." },
      { n: "Reciprocity", d: "People feel a pull to return help they have received.", why: "Helping others early creates goodwill you can draw on later.", src: "Robert Cialdini, Influence (1984)", miss: "Helping only when you need something; people notice." },
      { n: "The trust equation", d: "Trust grows with credibility, reliability and closeness, and shrinks when people think you are serving yourself.", why: "Without positional power, trust is your main source of influence.", src: "David Maister, Charles Green and Robert Galford, The Trusted Advisor (2000)", miss: "Focusing on expertise and neglecting reliability on small promises." },
      { n: "Coalitions", d: "A small group of allies who support an idea before it is proposed widely.", why: "Proposals backed by several respected voices are hard to dismiss.", miss: "Presenting a new idea for the first time in a big meeting." }
    ],
    examples: [{
      t: "Moving a deadline owned by other teams",
      scene: "Fatou, a programme analyst in Bamako, needs the finance and supply teams to move a quarterly reporting deadline by one week so field data can be included. Neither team reports to her.",
      first: "She sends an email to both team leads: \"The current deadline doesn't work for programmes. Please move it by one week from next quarter.\" Finance replies that the deadline is fixed by headquarters.",
      better: "She first meets the finance lead to ask what makes the deadline hard for them, and learns they also struggle with late corrections. She proposes: \"If we include field data in one submission, you'll get fewer corrections afterwards. Could we test a one-week shift for one quarter and measure the corrections?\" The supply lead, who suffers from the same corrections, agrees to co-sign. Together they present a joint proposal.",
      changes: [
        "She asked about the other team's problems before making her request.",
        "The request is framed in finance's currency: fewer corrections.",
        "A one-quarter trial lowers the risk of saying yes.",
        "She built a coalition with supply before the formal proposal."
      ]
    }],
    steps: [
      { do: "Define the goal", how: "Write the specific change you need and by when.", time: "10 minutes", done: "One sentence with an outcome and a date." },
      { do: "Map stakeholders", how: "List everyone affected and place them on the influence/interest grid below.", time: "30 minutes", done: "Each person is in a quadrant with a plan: manage closely, keep satisfied, keep informed or monitor." },
      { do: "Find their currency", how: "For the three most important people, note what they care about. If unsure, ask them in a short conversation.", time: "One conversation each", done: "A currency next to each name." },
      { do: "Reframe your request", how: "Rewrite your ask so it starts with what the other side gains.", time: "15 minutes", done: "The first sentence of your ask mentions their benefit." },
      { do: "Build a coalition", how: "Share the idea one-to-one with two allies before any group meeting, and invite their changes.", time: "Two short meetings", done: "Two people ready to speak in support." },
      { do: "Lead the meeting", how: "Open with the shared problem, present the proposal, invite objections, and end with an owner and a date for each action.", time: "45 minutes", done: "Written agreement on at least one action." }
    ],
    template: "INFLUENCE PLAN\nGoal and date: ____\n\nStakeholder | Influence (H/L) | Interest (H/L) | Their currency | My approach\n____ | __ | __ | ____ | ____\n____ | __ | __ | ____ | ____\n____ | __ | __ | ____ | ____\n\nMy ask, framed for them:\n\"So that you ____, could we ____?\"\n\nAllies to brief first: ____, ____",
    reflect: [
      "Who has helped you recently without having to? What did you give them in return?",
      "Which stakeholder do you avoid, and what might they value that you could offer?",
      "Where have you relied on escalation when influence could have worked?"
    ],
    checkpoint: "Use your influence plan to prepare the regional task team meeting for Week 10, and ask for 360 feedback afterwards."
  },

  m5: {
    def: "Public speaking mastery is the ability to hold a room, deliver a clear message and move people to act, whether you speak for five minutes or forty. This module covers structure, openings and closings, stories, delivery and managing nerves.",
    outcomes: [
      "Structure a talk around one message using a proven sequence.",
      "Open with a hook and close with a clear call to action.",
      "Deliver a 15-minute talk with notes on one card or fewer."
    ],
    concepts: [
      { n: "One message", d: "A talk should leave the audience with a single idea they can repeat.", why: "Audiences forget much of a talk within days. One clear idea survives.", miss: "Covering everything you know about the topic." },
      { n: "The motivated sequence", d: "Five steps: get attention, show a need, present your solution, help the audience visualise the result, and call them to act.", why: "It moves listeners from interest to action, which suits advocacy.", src: "Alan H. Monroe", miss: "Skipping the visualisation step, which is where people feel the result." },
      { n: "The rule of three", d: "Grouping ideas, examples or phrases in threes.", why: "Three items feel complete and are easy to remember.", miss: "Forcing four or five points into a structure built for three." },
      { n: "Stories with a point", d: "A short story with a person, a challenge and a change, linked clearly to your message.", why: "Stories make abstract issues human and memorable.", miss: "A story that is moving but does not connect to the ask." },
      { n: "Reframing nerves as excitement", d: "Telling yourself \"I am excited\" rather than \"I am calm\" before speaking.", why: "Research found that people who reframed anxiety as excitement performed better than those who tried to calm down.", src: "Alison Wood Brooks (2014)", miss: "Trying to eliminate nerves completely; some energy helps." }
    ],
    examples: [{
      t: "A 15-minute speech at a youth forum",
      scene: "Jean-Baptiste, a youth programme coordinator in Kinshasa, has 15 minutes at an international youth forum to argue for investing in young people's skills.",
      first: "\"Thank you to the organisers. Today I'll talk about youth. There are more than a billion young people aged 15 to 24. There are many challenges: unemployment, education, health. Our programme works in many areas...\" He reads from his slides for 15 minutes.",
      better: "He opens: \"Grace is 19. She finished school top of her class, and for two years she has had no work.\" He names the need with one number, presents three proven solutions, describes Grace three years later with a skill and an income, and closes: \"Before you leave today, commit one internship place in your organisation. Write it on the card on your chair.\"",
      changes: [
        "The story of one person replaces a general statement about \"youth\".",
        "The talk follows the motivated sequence: attention, need, solution, visualisation, action.",
        "Three solutions follow the rule of three.",
        "The close asks for a specific, immediate action."
      ]
    }],
    steps: [
      { do: "Write your one message", how: "Complete: \"I want this audience to believe ____ and to ____.\"", time: "15 minutes", done: "A sentence under 25 words." },
      { do: "Outline with the sequence", how: "Fill in the five steps of the template below, one or two lines each.", time: "30 minutes", done: "Every step has content." },
      { do: "Find your story", how: "Choose a real (anonymised) or composite story with a person, a challenge and a change.", time: "20 minutes", done: "You can tell it in under 90 seconds." },
      { do: "Reduce to one card", how: "Rehearse until your notes fit on one card: opening line, three key words, closing line.", time: "Three rehearsals", done: "You deliver the talk using the card only." },
      { do: "Rehearse on video", how: "Record a full run. Check pace, pauses and eye contact. Use the Voice studio for pace.", time: "40 minutes", done: "Your pace is between 130 and 160 words per minute." },
      { do: "Prepare your nerves", how: "Before speaking, breathe slowly for one minute and say \"I'm excited to share this.\"", time: "2 minutes", done: "You start the talk with a pause and eye contact, not with an apology." }
    ],
    template: "TALK PLAN\nOne message: ____\n\n1. Attention (story or question): ____\n2. Need (one number or fact): ____\n3. Solution (three points): ____ / ____ / ____\n4. Visualise (what the world looks like if they act): ____\n5. Action (specific ask, today): ____\n\nOpening line: ____\nClosing line: ____",
    reflect: [
      "Which speaker has moved you to act, and what did they do in the first minute?",
      "What story from your own work best shows why it matters?",
      "What do you do with your nerves today, and what will you try next time?"
    ],
    checkpoint: "Your talk plan is the outline for the Week 14 keynote at a regional event."
  },

  m6: {
    def: "Senior leadership engagement is working effectively with people several levels above you: briefing them, earning their trust and getting decisions. This module helps you prepare decision-ready briefings, understand senior priorities and follow through so they come back to you.",
    outcomes: [
      "Write a one-page brief that states the decision needed in the first line.",
      "Prepare a ten-minute meeting with a senior leader around their priorities.",
      "Follow up within 48 hours with agreed actions."
    ],
    concepts: [
      { n: "Decision-ready", d: "A brief or meeting that gives a senior leader what they need to decide: the question, options, a recommendation and the risks.", why: "Senior leaders value people who save them time.", miss: "Bringing problems without options." },
      { n: "Their agenda first", d: "Connecting your issue to what the senior leader is already accountable for.", why: "People give attention to what helps them meet their own goals.", miss: "Explaining why your issue matters to you." },
      { n: "Bottom line up front", d: "State the decision you need in the first sentence, then the reasoning.", why: "Senior time is often cut short. The most important part must come first.", miss: "Background before the request." },
      { n: "Managing up", d: "Working with your manager and senior leaders deliberately: understanding their style, keeping them informed and avoiding surprises.", why: "Leaders who are never surprised by bad news trust the person who told them early.", miss: "Hiding a problem until it is solved." },
      { n: "Follow-through", d: "Confirming in writing what was agreed and delivering on time.", why: "Reliability on small commitments earns larger responsibilities.", miss: "Leaving the meeting without owners and dates." }
    ],
    examples: [{
      t: "Asking a director for budget",
      scene: "Omar, a technical specialist in Amman, gets ten minutes with the country director to ask for budget for a new data system.",
      first: "He opens with the history of data problems over five years, explains the technical options in detail, and at minute nine asks for $80,000. The director says she needs to think and leaves for another meeting.",
      better: "He opens: \"I'm asking you to approve $80,000 for a data system that will let us report to donors in days instead of weeks, which supports your goal of faster donor reporting this year.\" He shows two options on one page, recommends one, names the main risk and mitigation, and asks: \"Can you approve today, or what would you need to decide by Friday?\" He emails a three-line summary that afternoon.",
      changes: [
        "The decision and the amount are in the first sentence.",
        "The request is linked to the director's own priority.",
        "Two options and a recommendation make it decision-ready.",
        "A same-day written follow-up confirms the next step."
      ]
    }],
    steps: [
      { do: "Research their priorities", how: "Read the senior leader's recent speeches, plans or emails. Note their top three priorities.", time: "30 minutes", done: "Three priorities written down." },
      { do: "Write the one-page brief", how: "Use the template below: decision needed, why now, options, recommendation, risks.", time: "45 minutes", done: "The page fits on one side and the decision is in line 1." },
      { do: "Prepare for questions", how: "List the three hardest questions and a two-sentence answer for each.", time: "20 minutes", done: "You can answer each aloud." },
      { do: "Rehearse ten minutes", how: "Rehearse the meeting in five minutes, leaving five for discussion.", time: "20 minutes", done: "Your opening takes under 60 seconds." },
      { do: "Hold the meeting", how: "Open with the decision, listen more than you talk, and confirm next steps before leaving.", time: "10 minutes", done: "You leave with a decision or a date for one." },
      { do: "Follow up in 48 hours", how: "Email a summary: what was agreed, who does what, by when.", time: "10 minutes", done: "Email sent within two days." }
    ],
    template: "ONE-PAGE BRIEF\nDecision needed: ____ (by date: ____)\nWhy it matters to you: ____ (link to their priority)\nBackground (three lines max): ____\nOption A: ____ | cost | benefit | risk\nOption B: ____ | cost | benefit | risk\nRecommendation: ____\nMain risk and mitigation: ____\nNext step if approved: ____",
    reflect: [
      "What are your senior leaders most worried about this year?",
      "When did you last bring a senior leader a problem without a recommendation?",
      "Which senior relationship would help your work most, and how could you add value to it?"
    ],
    checkpoint: "Prepare each of your three Week 17 senior leader meetings with a one-page brief, and record what you learn in your journal."
  },

  m7: {
    def: "Crisis communication is how you speak and act when something goes wrong suddenly: an incident, a public accusation, a security event or a programme failure. Adaptability is how you lead when plans no longer fit reality. This module prepares you to communicate fast, honestly and calmly.",
    outcomes: [
      "Draft a holding statement within one hour of an incident.",
      "Apply crisis communication principles to a realistic scenario.",
      "Lead an after-action review that turns a crisis into lessons."
    ],
    concepts: [
      { n: "Crisis communication principles", d: "Be first, be right, be credible, express empathy, promote action and show respect.", why: "In the first hours, trust is won or lost faster than facts are gathered.", src: "US Centers for Disease Control and Prevention, Crisis and Emergency Risk Communication (CERC)", miss: "Waiting for all the facts before saying anything." },
      { n: "Holding statement", d: "A short first statement that acknowledges the situation, shows concern, says what you are doing and when you will update.", why: "It fills the silence before rumours do.", miss: "Speculating about causes or blame." },
      { n: "Technical and adaptive challenges", d: "Technical problems have known solutions. Adaptive challenges require people to change values, habits or beliefs.", why: "Crises often mix both. Treating an adaptive challenge as technical makes it worse.", src: "Ronald Heifetz, Leadership Without Easy Answers (1994)", miss: "Announcing a quick fix to a problem that needs people to change." },
      { n: "Volatility, uncertainty, complexity, ambiguity (VUCA)", d: "A description of environments where change is fast and unpredictable.", why: "In such settings, short planning cycles and clear principles serve better than detailed long plans.", src: "US Army War College (late 1980s)", miss: "Using the term as an excuse rather than a reason to adapt." },
      { n: "After-action review", d: "A short, blame-free discussion: what was supposed to happen, what happened, why, and what we will do differently.", why: "It turns a crisis into learning and rebuilds team trust.", src: "US Army", miss: "Turning it into a search for someone to blame." }
    ],
    examples: [{
      t: "A false video goes viral",
      scene: "Ana, a communications lead in Manila, learns at 9 a.m. that a video circulating on social media falsely claims her organisation's clinics distribute expired medicines. Journalists are calling.",
      first: "The office says nothing while it investigates. By evening the video has thousands of shares, and a radio station reports that the organisation \"refused to comment\".",
      better: "By 10:30 she publishes a holding statement: \"We are aware of a video about medicines in our partner clinics. The safety of every patient is our priority. We are checking stock in all facilities with the health ministry today and will share the results by 6 p.m.\" At 6 p.m. she shares the inspection results, thanks the health workers and explains how patients can check expiry dates.",
      changes: [
        "Speaking within 90 minutes follows \"be first\".",
        "The statement shows empathy and action without speculating.",
        "A specific update time makes the organisation credible.",
        "The final message gives the public a useful action."
      ]
    }],
    steps: [
      { do: "List likely crises", how: "With your team, list five events that could hit your work, and rate each for likelihood and impact.", time: "30 minutes", done: "Top two risks chosen." },
      { do: "Draft holding statements", how: "Write a holding statement for each top risk using the template below.", time: "30 minutes", done: "Two statements, each under 80 words." },
      { do: "Agree roles", how: "Decide who approves statements, who speaks to media and who informs partners and staff.", time: "20 minutes", done: "A contact list everyone has." },
      { do: "Practise under pressure", how: "Ask a colleague to play a journalist and ask hostile questions for five minutes.", time: "20 minutes", done: "You stayed on your three key messages." },
      { do: "Run a mock scenario", how: "Simulate a crisis with your team, including a timed holding statement.", time: "One hour", done: "Statement drafted within 60 minutes." },
      { do: "Hold an after-action review", how: "Ask the four questions and record three changes you will make.", time: "30 minutes", done: "Three changes, each with an owner." }
    ],
    template: "HOLDING STATEMENT\nWe are aware of ____ (what happened, facts only).\nOur first concern is ____ (people affected).\nRight now we are ____ (actions).\nWe will share an update by ____ (time).\nContact: ____\n\nAFTER-ACTION REVIEW\nWhat was supposed to happen? ____\nWhat actually happened? ____\nWhy was there a difference? ____\nWhat will we do differently? ____",
    reflect: [
      "How did you react in the last crisis you faced, and what would you change?",
      "Which crisis in your area of work worries you most, and are you prepared for it?",
      "When have you treated a people problem as a technical one?"
    ],
    checkpoint: "Bring your holding statements and role list to the Week 20 mock crisis scenario with the panel."
  },

  m8: {
    def: "Visionary leadership is the ability to describe a better future so clearly that others want to help build it. This module helps you find the purpose behind your work, express it in a short vision and turn it into a story that mobilises people.",
    outcomes: [
      "Write a one-paragraph personal leadership vision.",
      "Tell a public narrative that links your story, your team's story and the need for action now.",
      "Connect your vision to concrete first steps."
    ],
    concepts: [
      { n: "Start with why", d: "Explain why you do something before what you do and how.", why: "People commit to purpose more than to activities.", src: "Simon Sinek, Start with Why (2009)", miss: "A \"why\" that is too general to guide choices, like \"to make a difference\"." },
      { n: "Vision", d: "A vivid, specific picture of the future you want to create, usually five to ten years away.", why: "A shared picture helps people make aligned decisions without being told.", miss: "Writing a list of activities instead of a picture of results." },
      { n: "Public narrative", d: "A story in three parts: the story of self (why you care), the story of us (what we share) and the story of now (why we must act today).", why: "It connects personal motivation to collective action.", src: "Marshall Ganz", miss: "Telling only your own story without inviting others into it." },
      { n: "Leading change", d: "An eight-step model for change, starting with a sense of urgency and a guiding coalition, and ending with anchoring change in the culture.", why: "Vision without a plan to bring people along stays a speech.", src: "John Kotter, Leading Change (1996)", miss: "Announcing the vision and assuming change will follow." },
      { n: "Optimism with realism", d: "Showing belief that the future can be better while naming the obstacles honestly.", why: "People follow leaders who are hopeful and credible at the same time.", miss: "Ignoring the difficulties, which makes the vision sound naive." }
    ],
    examples: [{
      t: "Sharing a vision with a new team",
      scene: "Sophie, a team leader in Yaoundé, is asked to share her leadership vision with a new team.",
      first: "\"My vision is to strengthen our capacity, improve coordination, and achieve our results in line with the strategic plan.\"",
      better: "\"When I was twelve, my aunt died giving birth in a village two hours from the nearest clinic. That's why I'm here. Every one of you has a reason too. Mine is a future where no woman in this region dies giving life. In five years, I want every district we support to have a midwife within one hour of every village. This year, that means three districts, and it starts with the plan we'll build together this month.\"",
      changes: [
        "A personal story (story of self) explains why she cares.",
        "She invites the team's own reasons (story of us).",
        "The vision is a specific picture, not a list of activities.",
        "She links the vision to this year's goal and an immediate step (story of now)."
      ]
    }],
    steps: [
      { do: "Find your why", how: "Write about a moment that made you care about this work. Ask: what did I see, and what did I decide?", time: "30 minutes", done: "A half-page story." },
      { do: "Picture the future", how: "Describe what will be different in five to ten years if your work succeeds: who, where, what changes.", time: "30 minutes", done: "A paragraph someone could draw." },
      { do: "Name the obstacles", how: "List the two biggest obstacles honestly, and one way to address each.", time: "15 minutes", done: "Obstacles and responses written." },
      { do: "Build your narrative", how: "Use the template: self, us, now. Keep it under three minutes spoken.", time: "40 minutes", done: "A script timed at under three minutes." },
      { do: "Link to first steps", how: "Name three actions for the next 90 days that move toward the vision.", time: "20 minutes", done: "Three dated actions." },
      { do: "Share and refine", how: "Tell your narrative to two colleagues and ask what moved them and what felt unclear.", time: "30 minutes", done: "A revised version." }
    ],
    template: "MY LEADERSHIP MANIFESTO\nStory of self (why I care): ____\nStory of us (what we share): ____\nStory of now (why today): ____\n\nMy vision in five to ten years: ____\nTwo obstacles and how we'll face them: ____ / ____\nThree steps in the next 90 days:\n1. ____ (by ____)\n2. ____ (by ____)\n3. ____ (by ____)",
    reflect: [
      "What moment first made you care about this work?",
      "Would your team describe the same future you do?",
      "What are you doing this month that moves toward your vision?"
    ],
    checkpoint: "Your manifesto template is the draft of the Leadership Manifesto you present to the cohort in Week 22."
  },

  m9: {
    def: "Organisational navigation is understanding how your organisation and the wider system really work: who decides, how money and plans move, and which unwritten rules shape behaviour. This module helps you read the culture, map networks and plan your path through the system.",
    outcomes: [
      "Describe your organisation's culture at three levels.",
      "Map the formal and informal networks around a decision.",
      "Write a personal roadmap for mastering the system you work in."
    ],
    concepts: [
      { n: "Three levels of culture", d: "Artefacts (what you see), espoused values (what people say) and basic assumptions (what people take for granted).", why: "Change efforts fail when they address artefacts but not assumptions.", src: "Edgar Schein, Organizational Culture and Leadership (1985)", miss: "Taking the values statement as a description of how things actually work." },
      { n: "Formal and informal structure", d: "The organisation chart shows who reports to whom. Informal networks show who people actually consult and trust.", why: "Decisions often move through informal channels before they are formalised.", miss: "Only working through official channels and being surprised by outcomes." },
      { n: "Planning and budget cycles", d: "The annual calendar when priorities are set, budgets decided and plans approved.", why: "Proposals that arrive after the cycle closes wait a year.", miss: "Bringing good ideas at the wrong time." },
      { n: "Mandate and governance", d: "What your organisation is authorised to do, who oversees it, and how it relates to governments and partners.", why: "Knowing the mandate helps you frame proposals that fit and avoid ones that will be blocked.", miss: "Proposing work that is valuable but outside the mandate." },
      { n: "Political awareness", d: "Understanding interests, relationships and power without becoming cynical.", why: "Effective leaders work with organisational politics for good outcomes.", miss: "Avoiding politics altogether, which leaves the field to others." }
    ],
    examples: [{
      t: "A proposal rejected twice",
      scene: "Hiroshi, a technical officer in Bangkok, has a well-designed proposal for a new youth programme. It was rejected twice without clear reasons.",
      first: "He submits a revised version to the formal review committee in October, adding more data. It is rejected again because \"funds are committed\".",
      better: "He maps the decision. He learns that priorities are effectively set in a June planning retreat, that the deputy director's views carry great weight, and that the committee values alignment with the government's youth strategy. In May he shares a two-page concept with the deputy director, links it to the government strategy, and asks for advice. The idea enters the June retreat as a priority, and the October submission is approved.",
      changes: [
        "He learned the planning cycle and arrived before decisions were made.",
        "He used the informal network: the deputy director's advice before the formal process.",
        "He framed the proposal in terms of the mandate and partner priorities.",
        "Asking for advice instead of approval built an ally."
      ]
    }],
    steps: [
      { do: "Describe the culture", how: "Write three lines for each level: what you see, what people say, what people assume.", time: "30 minutes", done: "One assumption that surprises a newcomer." },
      { do: "Map one decision", how: "Pick a recent decision and trace who was consulted, formally and informally, and when.", time: "30 minutes", done: "A sketch showing at least one informal influence." },
      { do: "Learn the calendar", how: "Find out when plans, budgets and reviews happen, and mark them.", time: "20 minutes", done: "A year calendar with key dates." },
      { do: "Read the mandate", how: "Read your organisation's mandate and current strategic plan. Note three priorities your work supports.", time: "One hour", done: "Three links between your work and the plan." },
      { do: "Talk to a navigator", how: "Ask a respected colleague with long experience: \"What do you wish you had known about how things work here?\"", time: "30 minutes", done: "Three insights noted." },
      { do: "Write your roadmap", how: "Use the template to plan what you need to learn, who to connect with and which moments to prepare for.", time: "45 minutes", done: "A one-page roadmap." }
    ],
    template: "SYSTEM NAVIGATION ROADMAP\nCulture — what I see: ____ / what people say: ____ / what people assume: ____\nKey dates this year: planning ____ | budget ____ | review ____\nMandate priorities my work supports: ____\nPeople whose advice shapes decisions: ____\nWhat I need to learn next: ____\nRelationships to build (and how I'll add value): ____\nMoments to prepare for: ____",
    reflect: [
      "What unwritten rule did you learn the hard way?",
      "Whose advice do decision makers in your organisation seek before deciding?",
      "Which of your ideas came at the wrong moment in the cycle?"
    ],
    checkpoint: "Your roadmap is the basis of the system mastery roadmap you present to your mentor in Week 26."
  },

  m10: {
    def: "Representative-level readiness is preparing to lead an office and represent your organisation with governments, partners and the public. This module covers the role, competency-based interviews, key messages for external audiences and negotiation.",
    outcomes: [
      "Describe the main responsibilities of a country representative or head of office.",
      "Answer competency interview questions with structured examples.",
      "Deliver three key messages and return to them under pressure."
    ],
    concepts: [
      { n: "The representative's roles", d: "A head of office leads the team, represents the organisation, advocates with government, manages partners and resources, and is accountable for results.", why: "The job is mostly external and political, not technical.", miss: "Preparing only to show technical expertise." },
      { n: "Competency-based interviews", d: "Interviews that ask for real examples of past behaviour to predict future performance.", why: "Senior selection panels judge evidence, not intentions.", miss: "Answering with what you would do instead of what you did." },
      { n: "Situation, task, action, result", d: "A structure for interview examples: the context, your responsibility, what you did and what changed.", why: "It keeps answers specific and focused on your contribution.", miss: "Spending most of the answer on the situation and too little on your actions." },
      { n: "Key messages and bridging", d: "Three short points you want any audience to remember, and phrases to return to them from difficult questions.", why: "Representatives speak to ministers, media and partners who may push other agendas.", miss: "Answering every question on its own terms and losing your message." },
      { n: "Principled negotiation", d: "Separating the people from the problem, focusing on interests rather than positions, inventing options for mutual gain and insisting on objective criteria.", why: "Representatives negotiate constantly with governments and partners.", src: "Roger Fisher and William Ury, Getting to Yes (1981)", miss: "Defending a position without understanding what the other side needs." }
    ],
    examples: [{
      t: "A competency interview question",
      scene: "Elena, a deputy representative in Tbilisi, is asked in a mock interview: \"Tell us about a time you managed a difficult relationship with a government partner.\"",
      first: "\"Government relations are very important. I always believe in respect and dialogue. In general, I try to understand their needs and find common ground, and I think that's the key to good partnerships.\"",
      better: "\"In 2024, the ministry suspended a joint programme after a dispute over data ownership (situation). As deputy, I was asked to restore the partnership within three months (task). I met the secretary general to understand his concerns, proposed a data-sharing agreement that gave the ministry co-ownership, and set up a monthly joint review (action). The programme restarted in seven weeks, and the ministry now presents the data itself (result).\"",
      changes: [
        "A real example replaces general principles.",
        "The structure makes the story easy to follow.",
        "Most of the answer describes her own actions.",
        "The result is concrete and measurable."
      ]
    }],
    steps: [
      { do: "Study the role", how: "Read a head-of-office job description and list the competencies it asks for.", time: "30 minutes", done: "Six competencies listed." },
      { do: "Build an example bank", how: "Write one example for each competency using the template below.", time: "Two hours", done: "Six examples, each under two minutes spoken." },
      { do: "Draft key messages", how: "Write three messages about your office's work for a minister, each under 20 words.", time: "30 minutes", done: "Three messages you can say from memory." },
      { do: "Practise bridging", how: "Ask a colleague to ask off-topic or hostile questions; answer briefly and bridge back: \"What matters most here is…\"", time: "20 minutes", done: "You returned to a key message every time." },
      { do: "Prepare a negotiation", how: "For one real negotiation, list both sides' positions and the interests behind them, and three possible options.", time: "30 minutes", done: "At least one option that serves both sides." },
      { do: "Do a mock interview", how: "Ask your mentor or two colleagues to interview you for 30 minutes and score each answer.", time: "One hour", done: "Feedback on your two weakest answers." }
    ],
    template: "INTERVIEW EXAMPLE (one per competency)\nCompetency: ____\nSituation (when, where, what was at stake): ____\nTask (my responsibility): ____\nAction (what I did — use \"I\"): ____\nResult (what changed, with a number if possible): ____\nWhat I learned: ____\n\nMY THREE KEY MESSAGES\n1. ____\n2. ____\n3. ____\nBridging phrase: \"____\"",
    reflect: [
      "Which part of a representative's role feels most natural to you, and which least?",
      "Which competency has the weakest examples in your bank?",
      "When did you last lose your message in a difficult conversation?"
    ],
    checkpoint: "Use your example bank and key messages in the Week 30 mock Representative interview with the panel."
  },

  m11: {
    def: "Legacy and sustainable impact is about what continues after you move on: the people you developed, the systems you left and the culture you shaped. This final module helps you coach others, plan for succession and write your leadership philosophy.",
    outcomes: [
      "Run a coaching conversation using a simple model.",
      "Write a handover plan that keeps key work going without you.",
      "Write and present a one-page leadership philosophy."
    ],
    concepts: [
      { n: "Coaching with the GROW model", d: "A conversation in four stages: goal, reality, options and way forward.", why: "Coaching builds others' ability to solve problems, which multiplies your impact.", src: "Graham Alexander, Alan Fine and John Whitmore; first published in Whitmore, Coaching for Performance (1992)", miss: "Giving advice instead of asking questions." },
      { n: "Succession", d: "Preparing others to take over your responsibilities.", why: "Work that depends on one person stops when they leave.", miss: "Seeing succession as a threat rather than as a sign of good leadership." },
      { n: "Knowledge transfer", d: "Recording and sharing what you know: contacts, processes, lessons and context.", why: "Much know-how is never written down and is lost at each handover.", miss: "Leaving a handover note written in the last week." },
      { n: "Anchoring change in culture", d: "Making new ways of working part of everyday norms, routines and recognition.", why: "Changes that are not anchored fade when their champion leaves.", src: "John Kotter, Leading Change (1996)", miss: "Assuming a successful project will continue by itself." },
      { n: "Leadership philosophy", d: "A short statement of your beliefs about leading, what people can expect from you and what you expect from them.", why: "Sharing it makes you predictable and gives your team a standard to hold you to.", miss: "Writing ideals you do not practise." }
    ],
    examples: [{
      t: "Handing over a practice before leaving",
      scene: "Sione, a unit manager in Suva, will move to a new post in six months. His unit's monthly data review was his initiative, and he runs every session himself.",
      first: "In his last week, he writes a two-page note describing the review and sends it to his team. Three months after he leaves, the reviews have stopped.",
      better: "Six months before leaving, he asks two team members to co-facilitate the review, coaches them after each session with the GROW model, and hands them full responsibility for the last two months while he only observes. The review is added to the unit's work plan and the team's performance goals. It continues after he leaves, and one of the facilitators presents it at a regional meeting.",
      changes: [
        "He started succession early, not in the final week.",
        "Coaching after real sessions built others' capability.",
        "Adding the review to the work plan and goals anchored it in routines.",
        "The practice outlived him, which is the measure of legacy."
      ]
    }],
    steps: [
      { do: "List what must continue", how: "Write the five things you do that would stop or suffer if you left tomorrow.", time: "20 minutes", done: "Five items." },
      { do: "Name successors", how: "For each item, name who could take it on with support.", time: "15 minutes", done: "A name next to each item." },
      { do: "Coach one person", how: "Hold a 30-minute GROW conversation with one successor. Ask more than you tell.", time: "30 minutes", done: "They leave with their own next step." },
      { do: "Write knowledge down", how: "For your top item, record contacts, steps, pitfalls and the reasons behind key decisions.", time: "One hour", done: "Someone else could run it from your notes." },
      { do: "Draft your philosophy", how: "Use the template below. Keep it to one page and test each line against your behaviour.", time: "One hour", done: "Every line has an example of you doing it." },
      { do: "Share it", how: "Share your philosophy with your team and ask: \"Does this match how I lead? Where do I fall short?\"", time: "30 minutes", done: "One change you'll make based on their answers." }
    ],
    template: "MY LEADERSHIP PHILOSOPHY\nI believe leadership is ____.\nWhat you can expect from me: ____\nWhat I expect from you: ____\nHow I make decisions: ____\nHow I handle mistakes (mine and yours): ____\nWhat I want to leave behind: ____\n\nGROW COACHING QUESTIONS\nGoal: What do you want to achieve?\nReality: What is happening now? What have you tried?\nOptions: What could you do? What else?\nWay forward: What will you do, and by when?",
    reflect: [
      "Who developed you most in your career, and what did they do?",
      "If you left next month, what would stop?",
      "What do you want people to say you left behind?"
    ],
    checkpoint: "Your leadership philosophy is the core of the Week 34 capstone, My Leadership Philosophy."
  },

  vocal: {
    def: "Vocal training builds a voice that carries, stays steady under pressure and keeps listeners engaged. This ongoing module covers breathing, resonance, articulation, pace, pauses and pitch, through a short daily routine you practise alongside every other module.",
    outcomes: [
      "Complete a ten-minute vocal warm-up from memory.",
      "Speak at a pace between 130 and 160 words per minute, with deliberate pauses.",
      "Vary pitch and volume to emphasise key words."
    ],
    concepts: [
      { n: "Breath support", d: "Breathing low into the abdomen and controlling the out-breath while speaking.", why: "Supported breath gives a fuller, steadier voice and helps control nerves.", miss: "Shallow chest breathing, which makes the voice thin and shaky." },
      { n: "Resonance", d: "How the voice is amplified in the throat, mouth and nose.", why: "A resonant voice carries in a room without shouting.", miss: "Pushing volume from the throat, which strains the voice." },
      { n: "Articulation", d: "Clear shaping of consonants and vowels with lips, tongue and jaw.", why: "Clear speech is easier to follow, especially for listeners in their second or third language.", miss: "Dropping word endings when speaking fast." },
      { n: "Pace and pause", d: "The speed of speech and the silences between ideas.", why: "Pauses give listeners time to absorb a point and make you sound in control.", miss: "Filling every silence with \"um\" or \"so\"." },
      { n: "Pitch variety", d: "Moving the voice up and down to show meaning and emotion.", why: "A monotone voice loses attention, even when the content is strong.", miss: "Ending statements with a rising tone, which sounds like a question." }
    ],
    examples: [{
      t: "A fast, flat budget update",
      scene: "Daniel, a finance officer in London, is told after a presentation that he was hard to follow. A recording shows he spoke at 190 words per minute with no pauses and a flat tone.",
      first: "\"Soourbudgetexecutionisat62percentwhichisbelowtargetsowe'llneedtoaccelerateinthelastquarteranduh...\" (fast, flat, no pauses)",
      better: "\"Our budget execution is at 62 percent. (pause) That's below target. (pause) So in the last quarter, we will focus on three things.\" He stresses \"62\" and \"three\", lowers his pitch at the end of each sentence and breathes at each pause.",
      changes: [
        "Pauses split the message into units listeners can absorb.",
        "Slowing to about 140 words per minute made each number clear.",
        "Stress on key words guides attention.",
        "Falling pitch at sentence ends sounds confident and final."
      ]
    }],
    steps: [
      { do: "Measure your baseline", how: "Open the Voice studio and record the pace drill. Note your words per minute and filler count.", time: "10 minutes", done: "Baseline numbers saved." },
      { do: "Learn the warm-up", how: "Follow the guided ten-minute warm-up in the Voice studio: jaw release, breathing, lip trills, sirens, articulation, projection.", time: "10 minutes daily", done: "You can do it without the guide." },
      { do: "Practise breath support", how: "Lie down with a book on your stomach. Breathe in so the book rises, then count aloud to 20 on one breath.", time: "5 minutes daily", done: "You reach 20 without strain." },
      { do: "Mark a script", how: "Take a paragraph from your next presentation. Mark pauses (/), stressed words (underline) and falling pitch at sentence ends.", time: "15 minutes", done: "A marked script." },
      { do: "Drill pace and pauses", how: "Read the marked script into the Voice studio until your pace is 130–160 words per minute.", time: "15 minutes", done: "Two takes within the target." },
      { do: "Track progress", how: "Repeat the baseline drill weekly and compare your numbers.", time: "10 minutes weekly", done: "A trend over four weeks." }
    ],
    template: "DAILY VOCAL ROUTINE (10 minutes)\n1. Jaw and neck release — 1 min\n2. Low breathing, count to 20 on one breath — 2 min\n3. Lip trills and sirens, low to high — 2 min\n4. Tongue twisters, slow then fast — 2 min\n5. Read a paragraph projecting to the back wall — 2 min\n6. One sentence said five ways (pitch variety) — 1 min\n\nWEEKLY CHECK\nPace: ___ wpm (target 130–160)\nFillers per minute: ___\nPauses: ___",
    reflect: [
      "How does your voice change when you are nervous?",
      "Which speaker's voice do you find easiest to listen to, and why?",
      "What did your baseline recording tell you that surprised you?"
    ],
    checkpoint: "Practise the routine daily; your weekly numbers in the Voice studio show your progress across all modules."
  },
  eng: {
    def: "Polish Your English helps you speak and write professional English that is clear, accurate and natural, so that people remember your ideas rather than your mistakes. This ongoing module covers sounds, word stress, rhythm, grammar accuracy, professional vocabulary and natural expressions, with practice videos from Accurate English (YouTube). The goal is to be understood easily and to sound confident. You keep your own accent.",
    outcomes: [
      "Deliver a two-minute work briefing with clear word stress and a natural, linked rhythm.",
      "Find and correct your three most frequent grammar errors in emails and reports.",
      "Use five professional expressions naturally in meetings, and choose plain words when an idiom would not travel."
    ],
    concepts: [
      { n: "Intelligibility before accent", d: "Intelligibility is how easily listeners understand what you say. It is not the same as accent: a speaker with a noticeable accent can be perfectly easy to understand.", why: "Colleagues and partners judge your ideas by what they understand, not by where your accent comes from.", src: "Murray Munro and Tracey Derwing, \"Foreign accent, comprehensibility, and intelligibility in the speech of second language learners\" (1995)", miss: "Trying to remove your accent instead of fixing the few features that actually cause misunderstanding." },
      { n: "Sounds that change meaning", d: "Some vowels and consonants separate one word from another, as in ship and sheep, think and sink, or light and right. Practising them in pairs trains both the ear and the mouth.", why: "One wrong sound in a key word, such as policy said as \"bolicy\", can make a listener lose the thread.", miss: "Practising sounds in isolation but never in the words you use at work." },
      { n: "Word stress and sentence rhythm", d: "In English, a stressed syllable is longer, louder and higher: PHOtograph, phoTOgraphy, deVELopment. In a sentence, content words are stressed and small words are reduced, often to the short vowel called schwa.", why: "Listeners recognise words by their stress pattern; the wrong stress can make a familiar word sound unknown.", miss: "Giving every syllable and every word the same weight, which sounds flat and is harder to follow." },
      { n: "Linking", d: "In natural speech, words flow into each other: a final consonant joins the next vowel, so \"pick it up\" sounds like \"pi-ki-tup\" and \"turn off\" like \"tur-noff\".", why: "Linking makes speech smoother and helps you understand fast speakers in meetings.", miss: "Separating every word, or adding a small vowel after final consonants, which makes speech sound choppy." },
      { n: "Accuracy in grammar", d: "The small, frequent errors that readers and listeners notice: articles, verb tenses, prepositions, and uncountable nouns such as information, advice and equipment.", why: "In a report or an email to a donor, a few repeated errors can weaken trust in the content.", miss: "Translating structures from your first language, such as \"we are working here since 2023\" instead of \"we have been working here since 2023\"." },
      { n: "Natural, professional expression", d: "Collocations (words that naturally go together, such as meet a deadline or raise a concern) and expressions that sound fluent. Part of the skill is knowing when an idiom is too informal or too local for an international audience.", why: "The right expression makes you sound precise and at ease; the wrong idiom can confuse half the room.", miss: "Using sports or slang idioms, such as \"a slam dunk\" or \"a home run\", with colleagues who may not know them." }
    ],
    examples: [{
      t: "Stressing the words that matter",
      scene: "Thi Lan, a programme analyst in Hanoi whose first language is Vietnamese, briefs a vice-minister's team in English during a joint review. Afterwards a colleague says the content was strong but hard to follow.",
      first: "\"WE NEED TO FI-NISH THE RE-PORT BE-FORE THE COM-MIT-TEE MEETS.\" (every syllable equally strong, short pauses between all the words)",
      better: "\"We need to FINish the rePORT before the comMITtee MEETS.\" (content words stressed, small words light, falling tone at the end)",
      changes: [
        "Stress falls on the content words (finish, report, committee, meets), so the key information stands out.",
        "Small words such as to and the are said lightly, with a schwa, which gives English its rhythm.",
        "Each word has its correct stress: rePORT, comMITtee.",
        "A falling tone at the end signals a clear, finished statement."
      ]
    }],
    steps: [
      { do: "Record a baseline", how: "Record a two-minute briefing on a real work topic on your phone. Listen once and note three things that make you harder to follow.", time: "15 minutes", done: "A saved recording and three notes." },
      { do: "Choose one focus for the week", how: "Follow the eight-week path in the Videos tab, or pick one area yourself: a sound, word stress, linking, a grammar error or a set of expressions. Choose what most affects understanding, not what bothers you most.", time: "5 minutes", done: "One focus written at the top of your practice log." },
      { do: "Watch and note the rule", how: "Watch one video from the matching theme in the Videos tab, or one listed under \"Practise with\". Write the rule in your own words, with two examples from your own work, and check new words in the Word bank.", time: "10 minutes", done: "A rule and two examples in your log." },
      { do: "Shadow", how: "Play a short passage, pause, and repeat it aloud with the same stress, rhythm and intonation. Then say three of your own work sentences the same way.", time: "10 minutes daily", done: "You can say the passage smoothly without pausing the video." },
      { do: "Use it at work", how: "Use your focus in one real meeting, call or email this week. Before sending an important email, check it for your three most frequent errors.", time: "During the week", done: "One real use noted in your log." },
      { do: "Re-record and compare", how: "Record the same briefing again and listen to both versions. Ask a trusted colleague which is easier to follow.", time: "15 minutes weekly", done: "One improvement noted and next week's focus chosen." }
    ],
    template: "WEEKLY PRACTICE LOG\nWeek | Focus | Playlist | Real-work use | What improved\n1    |       |          |               |\n2    |       |          |               |\n3    |       |          |               |\n4    |       |          |               |\n\nMY THREE MOST FREQUENT ERRORS\n1. I write/say: ________  Correct: ________\n2. I write/say: ________  Correct: ________\n3. I write/say: ________  Correct: ________\n\nFIVE EXPRESSIONS I AM ADOPTING\n1. ________ 2. ________ 3. ________ 4. ________ 5. ________",
    reflect: [
      "When do people ask you to repeat yourself, and what do you think causes it?",
      "Which three errors appear most often in your emails, and how will you catch them before you send?",
      "Which expressions do respected colleagues use that you could adopt, and which idioms might confuse an international audience?"
    ],
    checkpoint: "Record a two-minute work briefing at the start and again after eight weeks, and name three specific improvements."
  },
  fra: {
    def: "Polish Your French helps you speak and write professional French that is precise, correct and suited to the situation: emails to a ministry, notes, meetings and presentations. It covers register, false friends, logical connectors, the subjunctive, pronunciation and the conventions of professional correspondence, with videos from seven advanced-level French channels. The goal is to be understood easily and taken seriously, whatever your accent.",
    outcomes: [
      "Write a formal email or note in French with the right opening, register and closing formula.",
      "Structure a two-minute briefing in French with clear logical connectors.",
      "Avoid the false friends and subjunctive errors that most often undermine credibility."
    ],
    concepts: [
      { n: "Register: everyday, formal and informal", d: "French separates everyday language (courant), formal language (soutenu) and informal language (familier). Notes, emails to authorities and official meetings call for the formal register.", why: "In many French-speaking administrations, an informal tone reads as a lack of respect, even when the content is good.", miss: "Using informal words such as « super », « OK » or « on » in a note to a ministry, or « tu » with a senior counterpart who has not invited it." },
      { n: "False friends (faux amis)", d: "Words that look like English words but mean something else: actuellement (currently), éventuellement (possibly), assister à (to attend), une formation (a training course).", why: "One false friend can change a commitment: « nous allons éventuellement financer » means we might fund, not that we will in the end.", miss: "Assuming that a word which looks familiar means the same thing in French." },
      { n: "Logical connectors", d: "Words that show how ideas relate: cause (car, en effet), contrast (en revanche, toutefois), consequence (par conséquent, donc) and addition (en outre, de plus).", why: "French readers expect an explicit line of argument; connectors make a note easy to follow and convincing.", miss: "Linking every idea with « et » or « mais », or using « en effet » to mean \"in fact\": it confirms or explains what was just said." },
      { n: "The subjunctive and tense agreement", d: "The subjunctive follows expressions of necessity, wish and doubt and some conjunctions: il faut que, souhaiter que, bien que, pour que, avant que. « Après que » takes the indicative.", why: "Subjunctive errors are among the first things readers notice in formal French.", miss: "« Il faut que nous allons » instead of « il faut que nous allions », or « après qu'il soit parti » instead of « après qu'il est parti »." },
      { n: "Liaisons and rhythm", d: "French groups words into rhythmic units stressed on their last syllable. Within a group, liaisons join words (les‿enfants), and the nasal vowels an, on and in must stay distinct.", why: "Correct liaisons and nasal vowels make you easier to follow, especially with figures, names and dates.", miss: "Stressing the first syllable of words as in English, or making a liaison after « et »." },
      { n: "Professional correspondence", d: "French professional letters and emails follow conventions: a formal opening (Madame, Monsieur), set phrases (je me permets de…, je vous remercie de…) and a closing formula suited to the relationship.", why: "These conventions show respect and competence before the reader even reaches your request.", miss: "Ending a formal email with « À plus » or with no closing formula, or translating \"Dear Paul\" as « Cher Paul » to an official you have never met." }
    ],
    examples: [{
      t: "An email to a ministry",
      scene: "James, a programme officer in Dakar whose first language is English, needs a meeting with a director at the Ministry of Health. His French is fluent, but his first email gets no reply.",
      first: "« Bonjour, je voudrais demander une réunion avec vous la semaine prochaine pour parler du projet. Merci de me répondre vite. James »",
      better: "« Madame la Directrice, Je me permets de solliciter un entretien la semaine prochaine afin de vous présenter l'état d'avancement du projet. Je me tiens à votre disposition pour convenir d'un créneau. Je vous prie d'agréer, Madame la Directrice, l'expression de ma haute considération. James Miller, chargé de programme »",
      changes: [
        "The opening uses the recipient's title, « Madame la Directrice », instead of a casual « Bonjour ».",
        "« Je me permets de solliciter un entretien » is the formal register expected for a request to a senior official.",
        "« Je me tiens à votre disposition » replaces « Merci de me répondre vite », which reads as pressure.",
        "The closing formula repeats the title and shows respect; the signature gives his function."
      ]
    }],
    steps: [
      { do: "Record a baseline", how: "Record a two-minute briefing in French on a real work topic. Listen once and note three things that make you harder to follow or less formal than you intended.", time: "15 minutes", done: "A saved recording and three notes." },
      { do: "Choose one focus for the week", how: "Follow the eight-week path in the Videos tab, or choose one area yourself: register, false friends, connectors, the subjunctive, liaisons or correspondence.", time: "5 minutes", done: "One focus written at the top of your practice log." },
      { do: "Watch and note the rule", how: "Watch one video from the matching theme, or one listed under \"Practise with\". Write the rule in your own words with two examples from your work, and check new words in the Word bank.", time: "10 minutes", done: "A rule and two examples in your log." },
      { do: "Shadow", how: "Play a short passage, pause, and repeat it aloud with the same rhythm, liaisons and intonation. Then say three of your own work sentences the same way.", time: "10 minutes daily", done: "You can say the passage smoothly without pausing the video." },
      { do: "Use it at work", how: "Use your focus in one real email, meeting or call this week. Before sending an important email in French, check its opening, register and closing formula.", time: "During the week", done: "One real use noted in your log." },
      { do: "Re-record and compare", how: "Record the same briefing again and compare. Ask a French-speaking colleague which version sounds more professional.", time: "15 minutes weekly", done: "One improvement noted and next week's focus chosen." }
    ],
    template: "CARNET D'ENTRAÎNEMENT / PRACTICE LOG\nSemaine | Axe | Vidéo | Utilisation au travail | Progrès\n1       |     |       |                        |\n2       |     |       |                        |\n3       |     |       |                        |\n4       |     |       |                        |\n\nMES TROIS FAUTES LES PLUS FRÉQUENTES\n1. J'écris : ________  Correct : ________\n2. J'écris : ________  Correct : ________\n3. J'écris : ________  Correct : ________\n\nCINQ FORMULES QUE J'ADOPTE\n1. ________ 2. ________ 3. ________ 4. ________ 5. ________",
    reflect: [
      "In which situations does your French feel less formal or less precise than your English?",
      "Which false friends or grammar errors appear most often in your French emails?",
      "Which expressions do respected French-speaking colleagues use that you could adopt?"
    ],
    checkpoint: "Record a two-minute work briefing in French at the start and again after eight weeks, and name three specific improvements."
  }
};

// Four more worked examples per module, kept in a separate file.
for (const [id, list] of Object.entries(MORE)) GUIDES[id].examples.push(...list);
// Eight vocabulary terms per module, kept in a separate file.
for (const [id, list] of Object.entries(VOCAB)) GUIDES[id].vocab = list;

// Language modules: each concept links to specific videos in the themed library.
for (const id of LINKED_MODULES) GUIDES[id].concepts.forEach((c, i) => { c.pw = conceptLinks(id, i); });

export default GUIDES;
