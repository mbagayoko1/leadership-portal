// Content for the coaching & facilitation competencies, in the same order as
// STR[lang].compItems. Every link was checked live on 2026-10-12.
// Resource titles stay in their original language; overview/practice are EN/FR.
//   vids:  t title, s speaker, d duration, u url, g tag
//   arts:  t title, u url, s tag (articles, guides and downloadable tools)
//   books: t title, a author(s), y edition year
const LFG = "Lead For Good";

export const COMPETENCIES = [
  {
    id: "exec",
    overview: {
      en: "One-to-one coaching that helps a leader clarify goals, see their own patterns and turn insight into action. The coach asks more than advises: the leader owns the agenda, and progress is reviewed against agreed outcomes.",
      fr: "Un coaching individuel qui aide un leader à clarifier ses objectifs, à repérer ses propres schémas et à transformer ses prises de conscience en actions. Le coach questionne plus qu'il ne conseille : le leader fixe l'agenda, et les progrès sont mesurés au regard des résultats convenus."
    },
    practice: {
      en: [
        "Agree three development goals linked to your Representative-level ambition and review them monthly",
        "Use a GROW conversation (Goal, Reality, Options, Way forward) before high-stakes meetings",
        "Collect 360° feedback at the start and end of the programme to measure change"
      ],
      fr: [
        "Fixez trois objectifs de développement liés à votre ambition de niveau Représentant et faites-en le point chaque mois",
        "Utilisez une conversation GROW (Objectif, Réalité, Options, Voie à suivre) avant les réunions à fort enjeu",
        "Recueillez un feedback à 360° au début et à la fin du programme pour mesurer l'évolution"
      ]
    },
    vids: [
      { t: "Want to get great at something? Get a coach", s: "Atul Gawande", d: "17 min", u: "https://www.ted.com/talks/atul_gawande_want_to_get_great_at_something_get_a_coach", g: "TED" }
    ],
    arts: [
      { t: "The Leadership Growth Cycle – a regenerative approach to building leadership capacity", u: "https://www.leadforgood.co/resources/2021/03/08/2021-3-8-lgc", s: LFG },
      { t: "Leadership Growth Cycle – one-page tool (PDF)", u: "https://www.leadforgood.co/s/Leadership-Growth-Cycle_One-Page_Final.pdf", s: LFG },
      { t: "Define Your Core Values in 3 Steps", u: "https://www.leadforgood.co/resources/2019/04/23/corevalues", s: LFG },
      { t: "HBR: The Leader as Coach", u: "https://hbr.org/2019/11/the-leader-as-coach", s: "HBR" },
      { t: "HBR: What Can Coaches Do for You?", u: "https://hbr.org/2009/01/what-can-coaches-do-for-you", s: "HBR" },
      { t: "ICF Core Competencies (2025 model)", u: "https://coachingfederation.org/credentialing/coaching-competencies/icf-core-competencies/", s: "ICF" }
    ],
    books: [
      { t: "The Coaching Habit", a: "Michael Bungay Stanier", y: "2016" },
      { t: "Coaching for Performance", a: "Sir John Whitmore", y: "5th ed., 2017" },
      { t: "Co-Active Coaching", a: "Kimsey-House, Kimsey-House, Sandahl & Whitworth", y: "4th ed., 2018" },
      { t: "What Got You Here Won't Get You There", a: "Marshall Goldsmith", y: "2007" }
    ]
  },
  {
    id: "team",
    overview: {
      en: "Coaching the team as a whole, not just its members, so it can see how it works together and improve it. Facilitation gives meetings a clear structure so every voice is heard and decisions stick.",
      fr: "Coacher l'équipe dans son ensemble, et pas seulement ses membres, pour qu'elle voie comment elle fonctionne et puisse s'améliorer. La facilitation donne aux réunions une structure claire, pour que chacun soit entendu et que les décisions tiennent."
    },
    practice: {
      en: [
        "Co-design a team alliance: how we communicate, decide and handle conflict",
        "Hold a short monthly check-in on how the team is working, not only on what it is doing",
        "Rotate facilitation so every member practises structuring a discussion"
      ],
      fr: [
        "Co-construisez une alliance d'équipe : comment nous communiquons, décidons et gérons les désaccords",
        "Organisez chaque mois un court point sur la manière dont l'équipe travaille, pas seulement sur ce qu'elle fait",
        "Faites tourner la facilitation pour que chaque membre s'exerce à structurer une discussion"
      ]
    },
    vids: [
      { t: "How to turn a group of strangers into a team", s: "Amy Edmondson", d: "13 min", u: "https://www.ted.com/talks/amy_edmondson_how_to_turn_a_group_of_strangers_into_a_team", g: "TED" },
      { t: "Build a tower, build a team", s: "Tom Wujec", d: "7 min", u: "https://www.ted.com/talks/tom_wujec_build_a_tower_build_a_team", g: "TED" }
    ],
    arts: [
      { t: "Team Coaching Program – 12 months for social impact and global health teams", u: "https://www.leadforgood.co/team-coaching", s: LFG },
      { t: "Designing a Team Alliance – team agreement template (image)", u: "https://www.leadforgood.co/s/Designing-a-Team-Alliance.png", s: LFG },
      { t: "Leading the virtual call – 3 tips to keep your team engaged", u: "https://www.leadforgood.co/resources/2020/03/20/2020-3-19-leading-the-virtual-team-call-7-radical-ways-keep-your-team-engaged", s: LFG },
      { t: "HBR: The Secrets of Great Teamwork", u: "https://hbr.org/2016/06/the-secrets-of-great-teamwork", s: "HBR" },
      { t: "HBR: High-Performing Teams Need Psychological Safety", u: "https://hbr.org/2017/08/high-performing-teams-need-psychological-safety-heres-how-to-create-it", s: "HBR" },
      { t: "Google re:Work – Understand team effectiveness", u: "https://rework.withgoogle.com/guides/understanding-team-effectiveness/", s: "Google" }
    ],
    books: [
      { t: "Leadership Team Coaching", a: "Peter Hawkins", y: "4th ed., 2021" },
      { t: "Facilitator's Guide to Participatory Decision-Making", a: "Sam Kaner", y: "3rd ed., 2014" },
      { t: "The Fearless Organization", a: "Amy C. Edmondson", y: "2018" }
    ]
  },
  {
    id: "retreat",
    overview: {
      en: "Dedicated time away from daily operations to agree direction, priorities and ways of working. A good retreat has a clear purpose, a designed agenda and commitments that are followed up afterwards.",
      fr: "Un temps dédié, à l'écart des opérations quotidiennes, pour s'accorder sur l'orientation, les priorités et les modes de travail. Une bonne retraite a un objectif clair, un programme conçu avec soin et des engagements suivis par la suite."
    },
    practice: {
      en: [
        "Start from one purpose statement: what must be different after the retreat?",
        "Mix strategy sessions with team-building exercises that reveal how the team actually collaborates",
        "Close with an owner and a date for each commitment, and review them at the next quarterly meeting"
      ],
      fr: [
        "Partez d'un objectif unique : qu'est-ce qui doit être différent après la retraite ?",
        "Alternez sessions stratégiques et exercices de cohésion qui révèlent comment l'équipe collabore réellement",
        "Concluez en attribuant un responsable et une échéance à chaque engagement, et faites-en le bilan à la réunion trimestrielle suivante"
      ]
    },
    vids: [
      { t: "3 steps to turn everyday get-togethers into transformative gatherings", s: "Priya Parker", d: "10 min", u: "https://www.ted.com/talks/priya_parker_3_steps_to_turn_everyday_get_togethers_into_transformative_gatherings", g: "TED" },
      { t: "How to save the world (or at least yourself) from bad meetings", s: "David Grady", d: "7 min", u: "https://www.ted.com/talks/david_grady_how_to_save_the_world_or_at_least_yourself_from_bad_meetings", g: "TED" }
    ],
    arts: [
      { t: "Mid-Year Review – Reflect, Align, Plan", u: "https://www.leadforgood.co/resources/2019/06/19/2019-6-19-midyearreview", s: LFG },
      { t: "Liberating Structures – 33 facilitation methods", u: "https://www.liberatingstructures.com/", s: "Tool" },
      { t: "SessionLab – library of workshop exercises", u: "https://www.sessionlab.com/library/", s: "Tool" },
      { t: "HBR: Stop Wasting Money on Team Building", u: "https://hbr.org/2018/09/stop-wasting-money-on-team-building", s: "HBR" }
    ],
    books: [
      { t: "The Art of Gathering", a: "Priya Parker", y: "2018" },
      { t: "Playing to Win: How Strategy Really Works", a: "A.G. Lafley & Roger L. Martin", y: "2013" },
      { t: "The Surprising Power of Liberating Structures", a: "Henri Lipmanowicz & Keith McCandless", y: "2013" },
      { t: "Gamestorming", a: "Dave Gray, Sunni Brown & James Macanufo", y: "2010" }
    ]
  },
  {
    id: "diagnostics",
    overview: {
      en: "Understanding what is really holding a team back (unclear roles, low trust, conflicting priorities) before choosing a fix. Diagnostics combine interviews, short surveys and observation, then lead to a small number of concrete actions.",
      fr: "Comprendre ce qui freine réellement une équipe (rôles flous, manque de confiance, priorités contradictoires) avant de choisir une solution. Le diagnostic combine entretiens, courts questionnaires et observation, puis débouche sur un petit nombre d'actions concrètes."
    },
    practice: {
      en: [
        "Run confidential interviews or a short survey on trust, clarity and accountability",
        "Share the findings with the whole team and agree the two or three priorities to tackle",
        "Use committed conversations to make agreements explicit, then revisit them"
      ],
      fr: [
        "Menez des entretiens confidentiels ou un court questionnaire sur la confiance, la clarté et la responsabilisation",
        "Restituez les résultats à toute l'équipe et convenez des deux ou trois priorités à traiter",
        "Utilisez des conversations d'engagement pour rendre les accords explicites, puis revenez-y régulièrement"
      ]
    },
    vids: [
      { t: "Building a psychologically safe workplace", s: "Amy Edmondson", d: "", u: "https://www.youtube.com/watch?v=LhoLuui9gX8", g: "YouTube" },
      { t: "Dare to disagree", s: "Margaret Heffernan", d: "13 min", u: "https://www.ted.com/talks/margaret_heffernan_dare_to_disagree", g: "TED" }
    ],
    arts: [
      { t: "Committed Conversations – relational accountability guide (PDF)", u: "https://www.leadforgood.co/s/Committed-Conversations.pdf", s: LFG },
      { t: "Ground Truthing Resilience – 3 Reflections", u: "https://www.leadforgood.co/resources/2020/05/07/2020-5-6-resilience", s: LFG },
      { t: "6 Practices for Living with Chaos", u: "https://www.leadforgood.co/resources/2020/04/13/6practices", s: LFG },
      { t: "HBR: Why Teams Don't Work – interview with J. Richard Hackman", u: "https://hbr.org/2009/05/why-teams-dont-work", s: "HBR" }
    ],
    books: [
      { t: "The Five Dysfunctions of a Team", a: "Patrick Lencioni", y: "2002" },
      { t: "Leading Teams: Setting the Stage for Great Performances", a: "J. Richard Hackman", y: "2002" },
      { t: "Team of Teams", a: "Gen. Stanley McChrystal et al.", y: "2015" }
    ]
  },
  {
    id: "career",
    overview: {
      en: "Coaching on career direction that treats work, wellbeing and communication as one system. It helps you clarify your values, plan your next move and present your story with confidence.",
      fr: "Un coaching d'orientation professionnelle qui considère le travail, le bien-être et la communication comme un tout. Il vous aide à clarifier vos valeurs, à préparer votre prochaine étape et à présenter votre parcours avec assurance."
    },
    practice: {
      en: [
        "Write down your core values and test career options against them",
        "Protect time for recovery: plan your energy, not only your calendar",
        "Prepare a two-minute career narrative for interviews and senior conversations"
      ],
      fr: [
        "Formulez vos valeurs fondamentales et confrontez-y vos options de carrière",
        "Préservez du temps pour récupérer : planifiez votre énergie, pas seulement votre agenda",
        "Préparez un récit de carrière de deux minutes pour les entretiens et les échanges avec la hiérarchie"
      ]
    },
    vids: [
      { t: "How to make work-life balance work", s: "Nigel Marsh", d: "10 min", u: "https://www.ted.com/talks/nigel_marsh_how_to_make_work_life_balance_work", g: "TED" },
      { t: "Why you will fail to have a great career", s: "Larry Smith", d: "15 min", u: "https://www.ted.com/talks/larry_smith_why_you_will_fail_to_have_a_great_career", g: "TED" }
    ],
    arts: [
      { t: "Run Your Day", u: "https://www.leadforgood.co/resources/2019/04/15/runyourday", s: LFG },
      { t: "Pocket Productivity – get things done and refocus on strategy in 30 minutes", u: "https://www.leadforgood.co/resources/2020/09/03/30minutes", s: LFG },
      { t: "Perfectionism is Not Your Friend", u: "https://www.leadforgood.co/resources/2019/05/14/2019-5-14-perfectionism", s: LFG },
      { t: "Self-Compassion and Leadership – 3 practices to support leaders", u: "https://www.leadforgood.co/resources/2020/04/01/2020-4-1-self-compassion-leadership-and-covid-19-3-practices-to-support-leaders-right-now", s: LFG },
      { t: "HBR: Manage Your Energy, Not Your Time", u: "https://hbr.org/2007/10/manage-your-energy-not-your-time", s: "HBR" }
    ],
    books: [
      { t: "Designing Your Life", a: "Bill Burnett & Dave Evans", y: "2016" },
      { t: "Working Identity", a: "Herminia Ibarra", y: "2003" },
      { t: "The Power of Full Engagement", a: "Jim Loehr & Tony Schwartz", y: "2003" }
    ]
  },
  {
    id: "partnerships",
    overview: {
      en: "Building and sustaining partnerships among donors, governments and NGOs around shared results. Strong partnerships rest on aligned interests, clear roles, mutual accountability and regular, honest dialogue.",
      fr: "Construire et entretenir des partenariats entre bailleurs, gouvernements et ONG autour de résultats communs. Les partenariats solides reposent sur des intérêts alignés, des rôles clairs, une redevabilité mutuelle et un dialogue régulier et franc."
    },
    practice: {
      en: [
        "Map each partner's interests, constraints and decision-makers before proposing collaboration",
        "Agree a shared results framework, and who reports what and when",
        "Schedule regular partnership reviews so problems surface early"
      ],
      fr: [
        "Cartographiez les intérêts, contraintes et décideurs de chaque partenaire avant de proposer une collaboration",
        "Convenez d'un cadre de résultats commun, et de qui rend compte de quoi et quand",
        "Planifiez des revues de partenariat régulières pour que les problèmes apparaissent tôt"
      ]
    },
    vids: [
      { t: "The case for letting business solve social problems", s: "Michael Porter", d: "16 min", u: "https://www.ted.com/talks/michael_porter_why_business_can_be_good_at_solving_social_problems", g: "TED" },
      { t: "The way we think about charity is dead wrong", s: "Dan Pallotta", d: "19 min", u: "https://www.ted.com/talks/dan_pallotta_the_way_we_think_about_charity_is_dead_wrong", g: "TED" }
    ],
    arts: [
      { t: "Purpose-driven projects – three approaches for rapid scale-up and implementation", u: "https://www.leadforgood.co/resources/2020/10/19/2020-10-19-purpose-driven-projects-three-approaches-to-support-rapid-scale-up-and-implementation", s: LFG },
      { t: "SSIR: Collective Impact", u: "https://ssir.org/articles/entry/collective_impact", s: "SSIR" },
      { t: "UN SDG 17 – Partnerships for the Goals", u: "https://sdgs.un.org/goals/goal17", s: "UN" },
      { t: "The Partnering Initiative – cross-sector partnership tools", u: "https://thepartneringinitiative.org/", s: "Tool" }
    ],
    books: [
      { t: "Collaborating with the Enemy", a: "Adam Kahane", y: "2017" },
      { t: "The Partnering Toolbook", a: "Ros Tennyson (The Partnering Initiative)", y: "2011" },
      { t: "Leading Across Boundaries", a: "Russell M. Linden", y: "2010" }
    ]
  },
  {
    id: "activation",
    overview: {
      en: "Short, energising talks and workshops designed for a specific organization, to launch an initiative, shift a mindset or rally people around a goal. They combine a clear message, stories from the audience's own context and a call to action.",
      fr: "Des interventions et ateliers courts et mobilisateurs, conçus pour une organisation précise, afin de lancer une initiative, faire évoluer les mentalités ou rassembler autour d'un objectif. Ils associent un message clair, des récits issus du contexte du public et un appel à l'action."
    },
    practice: {
      en: [
        "Build the talk around one idea and one call to action",
        "Use stories from West and Central Africa that the audience recognises",
        "Follow the talk with a short workshop so people turn inspiration into a first step"
      ],
      fr: [
        "Construisez l'intervention autour d'une idée et d'un appel à l'action",
        "Utilisez des récits d'Afrique de l'Ouest et du Centre que le public reconnaît",
        "Prolongez l'intervention par un court atelier pour transformer l'inspiration en un premier pas"
      ]
    },
    vids: [
      { t: "The danger of a single story", s: "Chimamanda Ngozi Adichie", d: "19 min", u: "https://www.ted.com/talks/chimamanda_ngozi_adichie_the_danger_of_a_single_story", g: "TED" },
      { t: "The transformative power of classical music", s: "Benjamin Zander", d: "20 min", u: "https://www.ted.com/talks/benjamin_zander_the_transformative_power_of_classical_music", g: "TED" }
    ],
    arts: [
      { t: "HBR: Storytelling That Moves People – Robert McKee", u: "https://hbr.org/2003/06/storytelling-that-moves-people", s: "HBR" },
      { t: "Duarte – presentation and storytelling resources", u: "https://www.duarte.com/resources/", s: "Tool" },
      { t: "Weekend Boost – weekly reflection and practice from Shannon Salentine", u: "https://shannonsalentine.substack.com/", s: LFG }
    ],
    books: [
      { t: "Resonate", a: "Nancy Duarte", y: "2010" },
      { t: "The Art of Possibility", a: "Rosamund Stone Zander & Benjamin Zander", y: "2000" },
      { t: "TED Talks: The Official TED Guide to Public Speaking", a: "Chris Anderson", y: "2016" }
    ]
  }
];
