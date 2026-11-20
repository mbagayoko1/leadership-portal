// Worked examples 2–5 for each module guide (English). The first example
// of each module is in en.js. Settings are spread around the world; names
// and organisations are fictional. fr.js has the same examples in the same
// order (npm run check:data compares them).

const MORE = {
  m1: [
    {
      t: "Hearing difficult feedback",
      scene: "Tomás, a project manager in Lima, asks his team for feedback. One colleague writes: \"You often interrupt people in meetings before they finish.\"",
      first: "He replies at once: \"That's not fair. I only step in when meetings run late. Someone has to keep us on time.\"",
      better: "He replies: \"Thank you for telling me. Can you give me an example from a recent meeting?\" He learns it happened twice in Monday's planning session. He tells the team he will wait for people to finish and asks one colleague to signal him if he slips.",
      changes: [
        "Thanking first keeps feedback coming; defending stops it.",
        "Asking for a specific situation turns a general comment into something he can act on.",
        "Telling the team moves the issue from his blind spot to the open area of the Johari window."
      ]
    },
    {
      t: "A value tested by a deadline",
      scene: "Leila, a reporting officer in Beirut, is asked to submit a donor report tonight with a beneficiary figure that has not yet been verified. Her core value is accuracy.",
      first: "She submits the unverified figure without comment and worries about it all week.",
      better: "She tells her manager: \"Accuracy matters to me and to our credibility. I can submit tonight with the confirmed figure and a note that the final number follows on Friday.\" The manager agrees, and the donor thanks them for the transparency.",
      changes: [
        "She names her value openly instead of acting against it silently.",
        "She offers a solution that meets the deadline and the value.",
        "Acting on a value under pressure is what makes it real to others."
      ]
    },
    {
      t: "Writing a speaker biography",
      scene: "Grace, a health adviser in Kampala, must send a three-line biography for an international conference programme.",
      first: "\"Grace holds a master's degree in public health and a diploma in project management. She has worked for several organisations and has attended many international trainings.\"",
      better: "\"Grace helps health systems keep essential medicines on the shelf. Her work on supply tracking cut stock-outs in 120 clinics by half. She speaks on turning data into faster decisions.\"",
      changes: [
        "It leads with what she does for others, not her qualifications.",
        "One result makes her expertise credible.",
        "The last line tells organisers and audiences what to expect from her."
      ]
    },
    {
      t: "A blind spot from a 360 review",
      scene: "Arjun, a team leader in Kathmandu, reads his 360 review. Several people say he is hard to reach and that they hesitate to bring him problems.",
      first: "He tells his manager the team does not understand how busy he is, and changes nothing.",
      better: "At the next team meeting he says: \"You told me I'm hard to reach. I hadn't seen that. From now on I'll keep Tuesday and Thursday afternoons open, and I'll ask you in a month whether it helps.\"",
      changes: [
        "He accepts the gap between how he sees himself and how others experience him.",
        "Sharing it openly builds trust and invites more feedback.",
        "A concrete change with a review date shows the feedback was heard."
      ]
    }
  ],

  m2: [
    {
      t: "Challenged by a senior colleague",
      scene: "Nadia, an economist in Cairo, presents cost estimates. A senior colleague interrupts: \"These numbers are simply wrong.\"",
      first: "She flushes, speaks faster, apologises several times and starts recalculating aloud in front of everyone.",
      better: "She pauses, then says: \"Thank you. The figures come from the ministry's 2025 price list. If something is off, I want to find it. Could you show me which line concerns you after the meeting? I'll send a corrected version by tomorrow if needed.\"",
      changes: [
        "The pause and steady tone show composure under challenge.",
        "Stating the source shows competence without defensiveness.",
        "She moves the detailed check out of the meeting and commits to a clear next step."
      ]
    },
    {
      t: "Presence in an online meeting",
      scene: "Linh, a policy analyst in Hanoi, joins a regional video call with twenty participants. She has an important update.",
      first: "She keeps her camera off, waits until the last five minutes, and begins: \"Sorry, just a small thing, if there's time…\"",
      better: "She turns her camera on at eye level, raises her hand early, and says: \"One update and one request. The policy review is approved. I need two country volunteers to test it by June.\"",
      changes: [
        "Being visible and speaking early signals she belongs in the conversation.",
        "She removes the apology that weakened her contribution.",
        "Bottom line up front fits the short attention span of online meetings."
      ]
    },
    {
      t: "First meeting with a minister's adviser",
      scene: "Yao, a programme specialist in Abidjan, meets a minister's new adviser for the first time.",
      first: "Right after the handshake, he opens his laptop and starts presenting indicators and technical options.",
      better: "He thanks the adviser for her time, asks about the minister's priorities for the year and listens. Then he says: \"That fits well with two things we can offer,\" and presents them in three minutes.",
      changes: [
        "Warmth comes before competence, which makes the expertise easier to accept.",
        "Listening first lets him link his offer to her priorities.",
        "Brevity shows respect for a senior person's time."
      ]
    },
    {
      t: "Saying \"I don't know\" well",
      scene: "Sofía, a finance lead in Quito, is asked during a board meeting for a figure she doesn't have.",
      first: "She guesses a number to avoid looking unprepared. It turns out to be wrong, and the board questions the rest of her report.",
      better: "\"I don't have that figure with me. What I can tell you is that spending is on track for the year. I'll send the exact number by Thursday.\"",
      changes: [
        "Admitting a gap calmly protects credibility; a wrong guess damages it.",
        "She bridges to what she does know.",
        "A specific follow-up date turns the gap into reliability."
      ]
    }
  ],

  m3: [
    {
      t: "An email to a busy director",
      scene: "Mehmet, a programme officer in Istanbul, needs his director to approve a change to a training plan.",
      first: "His email has five paragraphs of background. The request is in the last line. The director replies a week later asking what he needs.",
      better: "Subject: \"Approval needed by Friday: move training to April.\" First line: \"Can you approve moving the training from March to April? It lets us include the new curriculum.\" Below it, three bullets with the reasons, cost and risk.",
      changes: [
        "The subject line states the action and the deadline.",
        "The request comes first, following the pyramid principle.",
        "Three bullets replace paragraphs of background."
      ]
    },
    {
      t: "One message, two audiences",
      scene: "Wanjiru, a programme lead in Nairobi, must explain a new maternal health project to community elders in the morning and to a donor in the afternoon.",
      first: "She uses the same slide deck for both, full of indicators and logframe terms.",
      better: "With the elders, she talks about mothers reaching a clinic in under an hour and asks how the community can help. With the donor, she shows the cost per mother reached and the results framework. The core message is the same: safer births, closer to home.",
      changes: [
        "She starts from what each audience cares about.",
        "The language changes; the main message does not.",
        "Each audience gets a different action to take."
      ]
    },
    {
      t: "A chart with a message",
      scene: "Carlos, a data analyst in Mexico City, prepares a chart for a planning meeting.",
      first: "Title: \"Indicator trends 2019–2025\". Eight coloured lines, no explanation.",
      better: "Title: \"Teen pregnancies fell everywhere except the two southern states.\" Two lines are highlighted and the rest are grey. A note under the chart says: \"Recommendation: focus next year's outreach on these two states.\"",
      changes: [
        "The title states the conclusion, not the topic.",
        "Highlighting shows the audience where to look.",
        "The chart ends with what to do about it."
      ]
    },
    {
      t: "From jargon to a picture",
      scene: "Thandiwe, a project coordinator in Lusaka, writes a project summary for a newsletter.",
      first: "\"The project strengthened institutional capacity and enhanced service delivery mechanisms across target facilities.\"",
      better: "\"Nurses in 40 clinics can now spot early signs of complications and call a doctor by phone. Last year, that meant 300 women got help in time.\"",
      changes: [
        "Concrete people and actions replace abstract terms.",
        "A number makes the result credible.",
        "Readers can picture the change, so they remember it."
      ]
    }
  ],

  m4: [
    {
      t: "Getting a busy team to prioritise your request",
      scene: "Ahmed, a monitoring officer in Rabat, needs the IT team to fix a reporting form. They have a long queue and no reason to put him first.",
      first: "He sends three reminders marked \"urgent\" and copies his director. The IT team becomes less helpful.",
      better: "He asks the IT lead what makes their work hardest and learns it is unclear requests. He offers to write precise specifications, test the fix himself and document it for other users. The fix is done in a week.",
      changes: [
        "He found the IT team's currency: clear requests and less rework.",
        "Offering value first made it easy to help him.",
        "Escalating had damaged trust; reciprocity rebuilt it."
      ]
    },
    {
      t: "Winning over a cautious government counterpart",
      scene: "Bilal, a technical adviser in Islamabad, proposes a new data system to a ministry department. The department head fears losing control of the data.",
      first: "He presents the system's technical advantages again, with more slides.",
      better: "He asks what worries the department head most, then proposes that the ministry hosts the system, owns the data and presents the first results itself. The department head agrees to a pilot.",
      changes: [
        "He addressed the interest behind the objection: control and recognition.",
        "Giving credit and ownership to the counterpart cost him nothing and won support.",
        "A pilot lowered the risk of saying yes."
      ]
    },
    {
      t: "Rebuilding trust after a missed deadline",
      scene: "Marie, a partnerships officer in Brussels, missed a deadline for a partner, who now doubts her team.",
      first: "She sends a long email explaining all the reasons for the delay.",
      better: "She calls the partner, takes responsibility in one sentence and gives a new date she is sure to meet. For the next two months she confirms every small commitment in writing and delivers early.",
      changes: [
        "Owning the mistake briefly is more credible than many explanations.",
        "Trust is rebuilt through reliability on small promises.",
        "Delivering early shows the change is real."
      ]
    },
    {
      t: "Building a coalition before a vote",
      scene: "Rosa, a regional adviser in Santiago, wants a regional meeting to adopt a common youth employment indicator.",
      first: "She presents the idea for the first time at the meeting. Two countries raise objections and the decision is postponed.",
      better: "A month before, she calls three country focal points one-to-one, asks for their views and adjusts the indicator to include their concerns. At the meeting, all three speak in support, and the indicator is adopted.",
      changes: [
        "She built a coalition before the formal meeting.",
        "Asking for input made allies co-owners of the idea.",
        "Several respected voices are harder to dismiss than one."
      ]
    }
  ],

  m5: [
    {
      t: "Opening a technical webinar",
      scene: "Dewi, a nutrition specialist in Jakarta, opens a webinar for 200 participants on child growth data.",
      first: "\"Good morning. Today's topic is anthropometric indicators. First, let me go through the agenda and the objectives.\"",
      better: "\"Think of a child you know who is two years old. In some districts, one in three children that age is too short for their age, and it can't be undone later. In the next 40 minutes, we'll look at three ways data can change that.\"",
      changes: [
        "A question that makes the audience picture a child gets attention.",
        "One striking fact shows the need.",
        "She promises a clear benefit before the agenda."
      ]
    },
    {
      t: "Answering on a panel",
      scene: "Samuel, a youth specialist in Addis Ababa, is on a panel. The moderator asks: \"What works to keep girls in school?\" He has two minutes.",
      first: "He lists eight programmes, talks for four minutes and is cut off by the moderator.",
      better: "\"One thing works best in our experience: cash support tied to attendance. In one region, it kept nine in ten girls in school. If I could ask one thing of this audience, it would be to fund it at scale.\"",
      changes: [
        "One point, one example, one ask fits a short panel slot.",
        "The number makes the claim memorable.",
        "He finishes on time, which makes the audience want to hear more."
      ]
    },
    {
      t: "Speaking through an interpreter",
      scene: "Bat-Erdene, a programme manager in Ulaanbaatar, gives a speech in English with simultaneous interpretation into three languages.",
      first: "He speaks quickly, uses idioms like \"move the needle\" and tells a joke based on wordplay. Half the room looks confused.",
      better: "He sends the text to the interpreters a day early, speaks in short sentences, pauses between ideas and replaces idioms with plain words. He uses a story instead of a joke.",
      changes: [
        "Short sentences and pauses give interpreters time.",
        "Plain language translates; idioms and wordplay do not.",
        "Sharing the text early improves accuracy."
      ]
    },
    {
      t: "Closing a talk",
      scene: "Fatimetou, a gender adviser in Nouakchott, ends a talk to local leaders on girls' education.",
      first: "\"So, that's all from me. Thank you. Any questions?\"",
      better: "\"Three things to remember: girls who stay in school marry later, earn more and raise healthier children. I ask each of you to visit one school this term. (Questions.) Let me finish where I started: every year in school changes a girl's life.\"",
      changes: [
        "A short summary repeats the one message.",
        "The call to action is specific and doable.",
        "Ending with her own words after questions keeps control of the final impression."
      ]
    }
  ],

  m6: [
    {
      t: "Bringing bad news early",
      scene: "Ravi, a project manager in Colombo, sees in May that his project will overspend by 15% because of rising fuel costs.",
      first: "He hopes to fix it quietly and tells his director only at the end-of-year review.",
      better: "He books 15 minutes with the director that week: \"We are heading for a 15% overspend because of fuel prices. Here are two options to bring it back on track, and I recommend the first.\"",
      changes: [
        "Senior leaders trust people who warn them early.",
        "He brings options and a recommendation, not just a problem.",
        "Early news gives the director room to act."
      ]
    },
    {
      t: "Thirty seconds with a regional director",
      scene: "Clara, a technical officer in Geneva, finds herself in the lift with the regional director, who asks: \"What are you working on?\"",
      first: "\"Oh, lots of things, the usual. Reports mostly.\"",
      better: "\"I'm leading the new training on data for decisions. Six countries have signed up. If you could open the first session in March, it would show leadership support.\"",
      changes: [
        "She is ready with one clear update.",
        "A number makes progress concrete.",
        "She turns a chance meeting into a specific, easy ask."
      ]
    },
    {
      t: "Disagreeing with a senior leader",
      scene: "Emmanuel, a planning officer in Kigali, thinks his director's six-week deadline for a national survey is unrealistic.",
      first: "He says nothing in the meeting, then complains to colleagues and misses the deadline.",
      better: "In private, he says: \"I want this survey to succeed. Based on the last two rounds, data collection alone takes eight weeks. We could meet your date with a smaller sample, or keep the full sample and deliver in ten weeks. Which matters more to you?\" The director chooses, and Emmanuel commits fully.",
      changes: [
        "He disagrees privately and respectfully, starting from the shared goal.",
        "Evidence and options make the disagreement useful.",
        "Once the decision is made, he commits to it."
      ]
    },
    {
      t: "Briefing your representative before a ministerial meeting",
      scene: "Mariana, a programme specialist in Panama City, prepares her representative for a meeting with the health minister.",
      first: "She sends a twelve-page background document the night before.",
      better: "She sends a one-page note two days before: the purpose of the meeting, three key messages, the minister's likely concerns with suggested answers, and the one outcome to aim for.",
      changes: [
        "One page respects the senior leader's time.",
        "Anticipating the minister's concerns makes the brief decision-ready.",
        "Sending it early gives time to ask questions."
      ]
    }
  ],

  m7: [
    {
      t: "Keeping staff safe during unrest",
      scene: "Jean, an operations manager in Port-au-Prince, learns that roads to two field sites have been blocked by protests. Six staff are on the road.",
      first: "He sends a long email to all staff about the general situation and asks them to be careful.",
      better: "Within 15 minutes, he calls each of the six staff, tells them where to stop safely, and sends all staff a short message: what is happening, what to do now, and when the next update will come. He checks in every two hours until everyone is home.",
      changes: [
        "Safety messages must be short, specific and actionable.",
        "Direct contact with those at risk comes before general communication.",
        "Regular updates reduce anxiety and rumours."
      ]
    },
    {
      t: "Correcting an error in a published report",
      scene: "Tarek, a research officer in Tunis, discovers that a published report overstated a key figure by mistake.",
      first: "The team quietly uploads a corrected file and hopes no one notices.",
      better: "They publish a short correction note: what was wrong, the correct figure, why it happened and what they have changed in their review process. They inform the partners who used the figure.",
      changes: [
        "Being open about mistakes protects long-term credibility.",
        "Explaining the fix shows the problem is under control.",
        "Telling those affected respects them."
      ]
    },
    {
      t: "A hostile interview question",
      scene: "Lerato, a country spokesperson in Johannesburg, is asked live on radio: \"Isn't your programme just wasting public money?\"",
      first: "She gets defensive and spends three minutes listing budget details. The clip shared online shows her saying \"we are not wasting money\".",
      better: "\"I understand why people ask that. Every rand must count. Last year this programme trained 2,000 midwives, and maternal deaths fell in every district where they work.\"",
      changes: [
        "She acknowledges the concern instead of repeating the accusation.",
        "She bridges to a key message with evidence.",
        "A short answer is harder to quote out of context."
      ]
    },
    {
      t: "A sudden funding cut",
      scene: "Paulo, a country manager in Maputo, learns that funding will drop by 30% next year.",
      first: "He announces that all trainings are cancelled and asks the team to carry on as before with fewer resources.",
      better: "He tells the team: \"This is not only a budget problem. We have to rethink how we work, and I need your ideas.\" He sets up three short working groups, reviews progress every two weeks and adjusts the plan as funding becomes clearer.",
      changes: [
        "He treats the cut as an adaptive challenge, not just a technical fix.",
        "Involving the team builds ownership of hard choices.",
        "Short review cycles suit an uncertain environment."
      ]
    }
  ],

  m8: [
    {
      t: "A vision for a small team",
      scene: "Isabel leads a four-person data team in Montevideo. She feels a vision is only for senior leaders.",
      first: "Her team plan lists tasks: update the database, produce quarterly reports, run two trainings.",
      better: "She writes: \"In two years, every decision in this office will use data that is less than a week old.\" The team then chooses the tasks that move toward it and drops two that do not.",
      changes: [
        "A vision works at any level, including a small team.",
        "A clear picture helps the team decide what to stop doing.",
        "Tasks now serve a purpose people understand."
      ]
    },
    {
      t: "A town hall after a setback",
      scene: "Rahul, an office director in Delhi, holds a town hall after a major programme was not renewed.",
      first: "\"Unfortunately the programme ended. We must move on and focus on other priorities.\"",
      better: "\"I joined this work because I saw what one good health worker can do for a village (self). Many of you joined for the same reason (us). The programme ended, but the need did not. This month we will decide together which two projects carry that work forward (now).\"",
      changes: [
        "The public narrative links personal purpose to the team's shared purpose.",
        "Honesty about the setback keeps him credible.",
        "A concrete next step turns disappointment into action."
      ]
    },
    {
      t: "Creating urgency for change",
      scene: "Agnes, a health records manager in Lilongwe, wants to move clinics from paper to digital records. Staff are comfortable with paper.",
      first: "She sends a memo announcing the new system and the training dates.",
      better: "She shares the story of a patient whose paper file was lost during a referral. She forms a small group of respected nurses to test the system and tell others what they found. Early wins are shared at every staff meeting.",
      changes: [
        "A real story creates urgency better than a memo.",
        "A guiding coalition of trusted peers carries the change.",
        "Short-term wins keep momentum."
      ]
    },
    {
      t: "Hope with honesty",
      scene: "Tevita, a climate resilience adviser in Nuku'alofa, presents a ten-year vision to island community leaders.",
      first: "\"In ten years, all our islands will be fully safe from the effects of climate change.\"",
      better: "\"We cannot stop the sea from rising. But in ten years, every island can have an early warning system and a safe shelter within walking distance. It will take funding and hard choices about where we build. Here is where we start this year.\"",
      changes: [
        "Naming obstacles honestly makes the vision credible.",
        "The vision is specific and achievable.",
        "A first step makes it real now."
      ]
    }
  ],

  m9: [
    {
      t: "Learning the informal network at headquarters",
      scene: "Chloé, a policy officer newly posted to a headquarters office in New York, struggles to get her briefs read by senior staff.",
      first: "She sends her briefs through the official channel and waits.",
      better: "She asks experienced colleagues who drafts the director's talking points, meets the two advisers who do, and learns the format they prefer. Her next brief is used in a speech the same week.",
      changes: [
        "Informal networks often shape what reaches senior leaders.",
        "Learning preferred formats is part of navigating the system.",
        "Building relationships with advisers multiplies her reach."
      ]
    },
    {
      t: "Overlapping mandates in a joint programme",
      scene: "Ousmane, a programme coordinator in Niamey, works on a joint programme with three agencies. Meetings keep stalling over who leads what.",
      first: "He proposes that his organisation leads every component because it has the most staff.",
      better: "He maps each agency's mandate and strengths in a one-page table and proposes a division of roles based on it. The other agencies accept, because each leads where its mandate is strongest.",
      changes: [
        "Knowing mandates turns a turf battle into a practical discussion.",
        "A neutral tool depersonalises the decision.",
        "Each partner gets a role that fits its identity."
      ]
    },
    {
      t: "Reading a culture where no one disagrees in public",
      scene: "Mei, a new team leader in Kuala Lumpur, notices that in meetings everyone agrees, but decisions are later quietly ignored.",
      first: "She asks for open debate in meetings and is frustrated when no one speaks.",
      better: "She understands the underlying assumption: public disagreement with a leader is seen as disrespect. She consults people one-to-one before meetings and invites written comments. Real concerns surface, and decisions are carried out.",
      changes: [
        "She looked beneath behaviour to the basic assumption.",
        "She adapted her method to the culture rather than fighting it.",
        "Respecting the culture gave her the input she needed."
      ]
    },
    {
      t: "Timing a request to the budget cycle",
      scene: "Diego, a technical adviser in San José, needs extra funds for an evaluation.",
      first: "He submits a request in August, after the budget is set. It is refused.",
      better: "He learns there is a mid-year review in June when unspent funds are reallocated. He prepares a short, costed proposal in May, links it to a priority in the strategic plan, and it is funded in June.",
      changes: [
        "Knowing the calendar is as important as having a good idea.",
        "Linking the request to official priorities makes it easier to approve.",
        "Preparing in advance means being ready when the window opens."
      ]
    }
  ],

  m10: [
    {
      t: "A television interview as head of office",
      scene: "Amara, a newly appointed head of office in Freetown, is interviewed on national television about a teenage pregnancy campaign.",
      first: "The presenter asks about a political controversy. She answers at length and the campaign is barely mentioned.",
      better: "\"That's a question for the government. What I can tell you is that one in three girls here becomes a mother before 20, and this campaign gives families the information to change that.\"",
      changes: [
        "She avoids a political topic that is not hers to answer.",
        "She bridges back to her key message.",
        "One clear fact supports the message."
      ]
    },
    {
      t: "Negotiating a joint work plan",
      scene: "Farid, a deputy representative in Dushanbe, negotiates an annual work plan with the ministry of education. The ministry insists on funding buildings; his organisation funds teacher training.",
      first: "Both sides repeat their positions for an hour, and the meeting ends without agreement.",
      better: "He asks what the ministry needs the buildings for and learns the real interest is visible results before an election. He proposes training linked to the opening of new schools funded by another partner, with joint events. Both sides get what they need.",
      changes: [
        "He looked behind the position to the interest.",
        "He created an option that serves both sides.",
        "Separating the people from the problem kept the relationship good."
      ]
    },
    {
      t: "Speaking for your organisation at a high-level event",
      scene: "Claudine, a representative in Antananarivo, speaks at a national conference opened by the prime minister.",
      first: "She forgets to acknowledge the dignitaries in the right order, speaks for twelve minutes instead of five and reads a technical text.",
      better: "She checks the protocol order with the organisers, prepares a five-minute speech with three messages, one story and a clear commitment, and rehearses it twice.",
      changes: [
        "Protocol shows respect and avoids offence.",
        "Keeping to time is part of representing an organisation well.",
        "A short, structured speech is remembered."
      ]
    },
    {
      t: "The first 90 days in a new office",
      scene: "Hugo arrives in Port Moresby as head of office. The team is tired after a difficult year.",
      first: "In his first week, he announces a restructuring based on what worked in his last post.",
      better: "He spends his first month meeting each staff member, key partners and government counterparts and asking: \"What should I keep, start and stop?\" He shares what he heard, then sets three priorities with the team.",
      changes: [
        "Listening first shows respect and gives him real information.",
        "Sharing what he heard builds trust.",
        "Priorities set with the team are easier to carry out."
      ]
    }
  ],

  m11: [
    {
      t: "Coaching instead of answering",
      scene: "Zainab, a senior officer in Kano, is asked by a junior colleague: \"What should I do about a partner who never sends reports on time?\"",
      first: "She gives a full solution in two minutes. The colleague applies it, and next month asks her the same kind of question.",
      better: "She asks: \"What do you want to happen? What have you tried? What else could you do? What will you try first?\" The colleague decides to agree a reporting calendar with the partner and reports back that it worked.",
      changes: [
        "The GROW questions build the colleague's own problem solving.",
        "Owning the solution makes it more likely to be applied.",
        "Over time, coaching saves the leader time."
      ]
    },
    {
      t: "Handing over a key partnership",
      scene: "Pierre, a partnerships manager in Cotonou, has built a strong relationship with a foundation over five years. He is moving to another country.",
      first: "He leaves the foundation's contact details in his handover note.",
      better: "Two months before leaving, he introduces his successor in person, brings her to two meetings, writes down the history and sensitivities of the partnership, and tells the foundation she has his full confidence.",
      changes: [
        "Relationships are transferred in person, not by email.",
        "Recording history and sensitivities passes on what is never in files.",
        "Endorsing the successor transfers trust."
      ]
    },
    {
      t: "Anchoring a practice in team culture",
      scene: "Seo-yeon, a team leader in Seoul, started weekly 20-minute learning sessions where team members share one lesson from their work.",
      first: "She runs every session herself. When she is away on mission, the sessions stop.",
      better: "She rotates the facilitation, puts the sessions in the team calendar, mentions good lessons in the team newsletter and includes sharing lessons in performance conversations. The sessions continue while she is away.",
      changes: [
        "Rotation removes dependency on one person.",
        "Routines and recognition anchor the practice in the culture.",
        "A practice that survives your absence is a legacy."
      ]
    },
    {
      t: "Testing a leadership philosophy with the team",
      scene: "Marcus, a manager in Toronto, writes in his leadership philosophy: \"My door is always open.\"",
      first: "He shares the document by email and moves on.",
      better: "He asks the team: \"Is this how I lead?\" They tell him he often cancels one-to-one meetings. He rewrites the line as \"I keep my one-to-one meetings with you, and if I must move one, I rebook it the same week\", and keeps that promise.",
      changes: [
        "A philosophy is tested against behaviour, not intentions.",
        "Asking the team makes it honest.",
        "A specific commitment is easier to keep and to check."
      ]
    }
  ],

  vocal: [
    {
      t: "A voice that shakes with nerves",
      scene: "Aroha, a policy adviser in Wellington, notices that her voice shakes during the first minute of every presentation.",
      first: "She takes quick, shallow breaths and starts speaking immediately as she reaches the lectern.",
      better: "Before standing up, she breathes low into her belly for one minute. At the lectern, she pauses, breathes out slowly, makes eye contact and then begins. Her voice is steady from the first sentence.",
      changes: [
        "Breath support steadies the voice.",
        "A pause before the first word calms the body.",
        "The audience reads the pause as confidence."
      ]
    },
    {
      t: "A large room without a microphone",
      scene: "Adebayo, a trainer in Ibadan, must speak to 80 people in a hall when the sound system fails.",
      first: "He shouts from his throat. After 20 minutes his voice is hoarse and the back rows still struggle to hear.",
      better: "He stands still, breathes low, opens his mouth more, speaks to the back wall and slows down. He uses resonance rather than force, and moves closer to the back half of the room when taking questions.",
      changes: [
        "Projection comes from breath and resonance, not from the throat.",
        "Slower, clearer speech carries further than louder speech.",
        "Moving towards listeners helps when amplification fails."
      ]
    },
    {
      t: "Presenting in a second language",
      scene: "Sylvie, a French-speaking economist in Montreal, presents in English at an international meeting.",
      first: "She speeds up to hide her accent and swallows the ends of words. Listeners ask her to repeat key points.",
      better: "She slows to about 130 words per minute, finishes every word ending clearly and stresses key numbers. She is understood the first time, and her accent becomes part of her presence rather than a barrier.",
      changes: [
        "Clear articulation matters more than accent.",
        "A slower pace helps listeners, many of whom also use a second language.",
        "Stressing key words guides attention."
      ]
    },
    {
      t: "Reading a speech without sounding flat",
      scene: "Pedro, a communications officer in Lisbon, must read a prepared statement at a ceremony.",
      first: "He reads every sentence at the same pitch and speed, with his eyes on the page.",
      better: "He marks the script beforehand: pauses after key sentences, underlined words to stress, and a falling pitch at the end of statements. He looks up at the end of each paragraph. The statement sounds like he means it.",
      changes: [
        "Marking a script makes pitch variety deliberate.",
        "Pauses and stressed words carry the meaning.",
        "Looking up connects the speaker with the audience."
      ]
    }
  ]
};

export default MORE;
