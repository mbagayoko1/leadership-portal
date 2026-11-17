// Coaches, communication teachers and African voices added to the Personal
// Development tab, plus French versions of the quotes that had none.
//
// Quote sourcing, checked 5 November 2026:
//  - A named speech or lecture was matched word for word against its published
//    text where one could be fetched (Nobel lectures, Harvard Gazette, Time to Think).
//  - A named book or TED talk is the commonly documented source; TED transcripts
//    could not be read automatically, so those lines were not machine-matched.
//  - "Widely attributed" means no primary source was found. Keep that label.
//  - Proverbs are as printed in African Proverbs (Comboni Missionary Publications),
//    apart from the Akan council proverb (adinkrasymbols.org).
// Never add a quote without a source label that says how sure we are.

const TED = id => "https://www.ted.com/speakers/" + id;
const YT = id => "https://www.youtube.com/watch?v=" + id;

export const VOICES = [
  {
    id: "whitmore", name: "Sir John Whitmore", kind: "coach",
    role: { en: "British pioneer of executive coaching (1937–2017), author of Coaching for Performance", fr: "Pionnier britannique du coaching de dirigeants (1937–2017), auteur de Coaching for Performance" },
    theme: { en: "The GROW model", fr: "Le modèle GROW" },
    channel: "https://www.performanceconsultants.com/grow-model",
    quotes: [
      { text: "Coaching is unlocking people's potential to maximise their own performance.", fr: "Le coaching consiste à libérer le potentiel des personnes pour qu'elles maximisent leur propre performance.", source: "Coaching for Performance" }
    ],
    ideas: {
      en: ["Coaching builds two things: awareness of what is really happening, and responsibility for what happens next.", "GROW gives a conversation its shape: Goal, Reality, Options, Will.", "Agree the goal first, so the conversation is pulled by what the person wants, not pushed by the problem.", "Ask questions that make people observe and think: what, when, how much. 'Why' tends to make them defend.", "Telling produces compliance. Choosing produces ownership.", "What you believe about someone's potential shapes how you coach them, and what they then achieve."],
      fr: ["Le coaching développe deux choses : la conscience de ce qui se passe réellement et la responsabilité de ce qui suit.", "GROW donne sa forme à la conversation : objectif (Goal), réalité (Reality), options (Options), volonté (Will).", "Fixez d'abord l'objectif : la conversation est alors tirée par ce que la personne veut, et non poussée par le problème.", "Posez des questions qui font observer et réfléchir : quoi, quand, combien. « Pourquoi » pousse plutôt à se défendre.", "Dire quoi faire produit de l'obéissance. Choisir produit de l'engagement.", "Ce que vous croyez du potentiel d'une personne influence votre coaching, puis ce qu'elle accomplit."]
    },
    practice: { en: "Before your next one-to-one, write one question for each letter of GROW. Ask them, and do not give advice until the last five minutes.", fr: "Avant votre prochain entretien individuel, écrivez une question pour chaque lettre de GROW. Posez-les et ne donnez aucun conseil avant les cinq dernières minutes." },
    vids: [{ t: "John Whitmore: Coaching for Performance", u: YT("kODJfacmHsY"), by: "Unlocking Your Career Potential (book overview)" }]
  },
  {
    id: "bungay", name: "Michael Bungay Stanier", kind: "coach",
    role: { en: "Author of The Coaching Habit and The Advice Trap, founder of Box of Crayons", fr: "Auteur de The Coaching Habit et The Advice Trap, fondateur de Box of Crayons" },
    theme: { en: "Say less, ask more", fr: "Moins parler, plus questionner" },
    channel: YT("Kl0rmx7aa0w"),
    quotes: [
      { text: "Stay curious a little longer, and rush to action and advice-giving a little more slowly.", fr: "Restez curieux un peu plus longtemps et précipitez-vous un peu moins vers l'action et le conseil.", source: "The Coaching Habit, 2016" },
      { text: "And what else?", fr: "Et quoi d'autre ?", source: "The Coaching Habit, 2016, which he calls the best coaching question in the world" }
    ],
    ideas: {
      en: ["Your urge to give advice arrives before you have understood the real problem.", "He names three forms of the Advice Monster: Tell-It (I must have the answer), Save-It (I must rescue you) and Control-It (I must stay in charge).", "'And what else?' draws out more options, because the first answer is rarely the only one or the best.", "'What's the real challenge here for you?' moves the conversation from the situation to the person.", "'How can I help?' makes the other person name a clear request and stops you assuming.", "Close with 'What was most useful for you?' so the learning lands."],
      fr: ["L'envie de donner un conseil arrive avant que vous ayez compris le vrai problème.", "Il nomme trois formes du « monstre du conseil » : celui qui doit avoir la réponse, celui qui doit sauver l'autre et celui qui doit garder le contrôle.", "« Et quoi d'autre ? » fait émerger d'autres options, car la première réponse est rarement la seule ni la meilleure.", "« Quel est le vrai défi ici pour vous ? » déplace la conversation de la situation vers la personne.", "« Comment puis-je vous aider ? » amène l'autre à formuler une demande claire et vous évite de supposer.", "Terminez par « Qu'est-ce qui vous a été le plus utile ? » pour ancrer l'apprentissage."]
    },
    practice: { en: "In your next three conversations, ask 'And what else?' at least twice before you offer any view of your own.", fr: "Dans vos trois prochaines conversations, demandez au moins deux fois « Et quoi d'autre ? » avant de donner votre avis." },
    vids: [{ t: "How to tame your Advice Monster", u: YT("Kl0rmx7aa0w"), by: "TEDxUniversityofNevada" }]
  },
  {
    id: "kline", name: "Nancy Kline", kind: "coach",
    role: { en: "Founder of Time to Think, author of Time to Think", fr: "Fondatrice de Time to Think, auteure de Time to Think" },
    theme: { en: "Attention that helps people think", fr: "Une attention qui aide à penser" },
    channel: "https://www.timetothink.com/",
    quotes: [
      { text: "The quality of everything we do depends on the quality of the thinking we do first.", fr: "La qualité de tout ce que nous faisons dépend de la qualité de la réflexion qui précède.", source: "Time to Think, The Ten Components" }
    ],
    ideas: {
      en: ["People think better when they know they will not be interrupted.", "The way you listen affects what the other person is able to think, not only how they feel.", "Her Thinking Environment rests on ten components, including attention, equality, ease and appreciation.", "In a meeting, give everyone a turn to speak without interruption before open debate begins.", "A good question can remove the untrue assumption that is holding someone back.", "Honest appreciation helps people think, so long as it is specific and sincere."],
      fr: ["On pense mieux lorsqu'on sait qu'on ne sera pas interrompu.", "Votre façon d'écouter influence ce que l'autre parvient à penser, et pas seulement ce qu'il ressent.", "Son « environnement de pensée » repose sur dix composantes, dont l'attention, l'égalité, l'aisance et l'appréciation.", "En réunion, donnez à chacun un tour de parole sans interruption avant d'ouvrir le débat.", "Une bonne question peut lever la fausse croyance qui freine une personne.", "Une appréciation honnête aide à penser, à condition d'être précise et sincère."]
    },
    practice: { en: "Open your next meeting with a round: each person speaks once, without interruption, on the main question. Note what you hear that you normally would not.", fr: "Ouvrez votre prochaine réunion par un tour de table : chacun s'exprime une fois, sans interruption, sur la question principale. Notez ce que vous entendez d'habitude moins." },
    vids: [{ t: "The 10 Components of the Thinking Environment: an animation", u: YT("Gjb-faR5S6c"), by: "mtc2 Ltd" }]
  },
  {
    id: "gallwey", name: "W. Timothy Gallwey", kind: "coach",
    role: { en: "US author of The Inner Game of Tennis (1974), whose ideas helped shape modern coaching", fr: "Auteur américain de The Inner Game of Tennis (1974), dont les idées ont contribué à façonner le coaching moderne" },
    theme: { en: "The inner game", fr: "Le jeu intérieur" },
    channel: "https://theinnergame.com/",
    quotes: [
      { text: "The opponent within one's own head is more formidable than the one on the other side of the net.", fr: "L'adversaire que l'on a dans la tête est plus redoutable que celui qui se trouve de l'autre côté du filet.", source: "The Inner Game of Tennis, 1974" },
      { text: "Performance = potential − interference.", fr: "Performance = potentiel − interférences.", source: "His Inner Game formula, widely attributed" }
    ],
    ideas: {
      en: ["Better performance often comes from removing interference, not from adding effort.", "He separates Self 1, the critic giving instructions, from Self 2, the natural ability that does the work.", "Judging yourself while you perform makes you tense and pulls your attention away from the task.", "Noticing without judging lets the body and mind correct themselves.", "A coach's job is to help the person pay attention, not to add more instructions."],
      fr: ["La performance progresse souvent en retirant les interférences, et non en ajoutant de l'effort.", "Il distingue le « Soi 1 », le critique qui donne des ordres, du « Soi 2 », la capacité naturelle qui agit.", "Se juger pendant l'action crée de la tension et détourne l'attention de la tâche.", "Observer sans juger permet au corps et à l'esprit de se corriger d'eux-mêmes.", "Le rôle du coach est d'aider à porter attention, et non d'ajouter des consignes."]
    },
    practice: { en: "Rehearse a short talk twice. The first time, correct yourself as you go. The second time, only notice your pace and breathing. Compare the two recordings.", fr: "Répétez deux fois une courte intervention. La première fois, corrigez-vous au fil de l'eau. La seconde, observez seulement votre rythme et votre respiration. Comparez les deux enregistrements." },
    vids: []
  },
  {
    id: "kimscott", name: "Kim Scott", kind: "coach",
    role: { en: "US author of Radical Candor and Radical Respect, former leader at Google and Apple", fr: "Auteure américaine de Radical Candor et Radical Respect, ancienne dirigeante chez Google et Apple" },
    theme: { en: "Feedback that is kind and clear", fr: "Un feedback bienveillant et clair" },
    channel: "https://www.youtube.com/@RadicalCandor",
    quotes: [
      { text: "Radical Candor is caring personally while challenging directly.", fr: "La franchise radicale, c'est se soucier personnellement de l'autre tout en le challengeant directement.", source: "Radical Candor, 2017" }
    ],
    ideas: {
      en: ["Good feedback needs both: care for the person and directness about the work.", "Care without challenge becomes 'ruinous empathy', where people never hear what they need to hear.", "Challenge without care becomes 'obnoxious aggression'.", "Neither care nor challenge becomes 'manipulative insincerity'.", "Ask for criticism before you give it, and reward it when you receive it.", "Be specific and sincere in praise, and raise problems early and in private."],
      fr: ["Un bon feedback exige les deux : le souci de la personne et la franchise sur le travail.", "Le souci sans exigence devient une « empathie ruineuse » : la personne n'entend jamais ce qu'elle a besoin d'entendre.", "L'exigence sans souci de l'autre devient une « agressivité odieuse ».", "Ni l'un ni l'autre : c'est « l'insincérité manipulatrice ».", "Demandez la critique avant d'en faire, et valorisez-la quand vous la recevez.", "Soyez précis et sincère dans vos compliments, et abordez les problèmes tôt et en privé."]
    },
    practice: { en: "Ask a colleague: 'What is one thing I could do or stop doing that would make it easier to work with me?' Wait through the silence, then thank them.", fr: "Demandez à un collègue : « Quelle est la chose que je pourrais faire ou cesser de faire pour qu'il soit plus facile de travailler avec moi ? » Laissez le silence s'installer, puis remerciez." },
    vids: [
      { t: "Radical Candor: The Surprising Secret to Being a Good Boss", u: YT("MIh_992Nfes"), by: "First Round Capital" },
      { t: "Radical Candor in 6 Minutes", u: YT("YLBDkz0TwLM"), by: "Radical Candor" }
    ]
  },
  {
    id: "treasure", name: "Julian Treasure", kind: "coach",
    role: { en: "British sound and communication expert, TED speaker", fr: "Expert britannique du son et de la communication, conférencier TED" },
    theme: { en: "Voice and listening", fr: "Voix et écoute" },
    channel: TED("julian_treasure"),
    quotes: [
      { text: "The human voice: it's the instrument we all play.", fr: "La voix humaine : c'est l'instrument dont nous jouons tous.", source: "TED talk How to speak so that people want to listen, 2013" },
      { text: "We are losing our listening.", fr: "Nous perdons notre capacité d'écoute.", source: "TED talk 5 ways to listen better, 2011" }
    ],
    ideas: {
      en: ["People stop listening to gossip, judging, negativity, complaining, excuses, exaggeration and dogmatism.", "HAIL gives speech its foundation: Honesty, Authenticity, Integrity, Love.", "Your vocal toolbox includes register, timbre, prosody, pace, pitch and volume. Practise each one on purpose.", "Warm up before you speak in public, as a singer would.", "RASA improves listening: Receive, Appreciate, Summarise, Ask.", "A few minutes of silence a day helps reset your ears and your attention."],
      fr: ["On cesse d'écouter face aux commérages, aux jugements, à la négativité, aux plaintes, aux excuses, à l'exagération et au dogmatisme.", "HAIL fonde la parole : honnêteté, authenticité, intégrité, amour.", "Votre boîte à outils vocale comprend le registre, le timbre, la prosodie, le rythme, la hauteur et le volume. Travaillez chacun délibérément.", "Échauffez votre voix avant de parler en public, comme un chanteur.", "RASA améliore l'écoute : recevoir, apprécier, résumer, interroger.", "Quelques minutes de silence par jour remettent à zéro vos oreilles et votre attention."]
    },
    practice: { en: "Read one paragraph aloud three ways, changing only pace, then pitch, then volume. Record it and pick the version you would listen to.", fr: "Lisez un paragraphe à voix haute de trois façons, en changeant seulement le rythme, puis la hauteur, puis le volume. Enregistrez-vous et choisissez la version que vous aimeriez écouter." },
    vids: [
      { t: "How to speak so that people want to listen", u: YT("eIho2S0ZahI"), by: "TED" },
      { t: "5 ways to listen better", u: "https://www.ted.com/talks/julian_treasure_5_ways_to_listen_better", by: "TED" }
    ]
  },
  {
    id: "abrahams", name: "Matt Abrahams", kind: "coach",
    role: { en: "Stanford Graduate School of Business lecturer, host of the Think Fast, Talk Smart podcast", fr: "Enseignant à la Stanford Graduate School of Business, animateur du podcast Think Fast, Talk Smart" },
    theme: { en: "Speaking without a script", fr: "Parler sans texte" },
    channel: "https://www.gsb.stanford.edu/business-podcasts/think-fast-talk-smart-podcast",
    quotes: [],
    ideas: {
      en: ["Most speaking is unplanned: questions, introductions and feedback. You can practise for it.", "Greet your nerves as normal, then turn your attention to what the audience needs.", "See the moment as a chance to connect, not a test you might fail.", "Use a structure for quick answers: What? So what? Now what?", "Slow down and listen first. The right answer depends on the real question.", "Aim to be useful rather than perfect. Trying too hard to be brilliant gets in the way."],
      fr: ["La plupart de nos prises de parole sont improvisées : questions, présentations, feedback. On peut s'y entraîner.", "Accueillez votre trac comme normal, puis portez votre attention sur ce dont le public a besoin.", "Voyez ce moment comme une occasion de créer un lien, et non comme un examen.", "Utilisez une structure pour répondre vite : quoi ? et alors ? et maintenant ?", "Ralentissez et écoutez d'abord. La bonne réponse dépend de la vraie question.", "Cherchez à être utile plutôt que parfait. Vouloir être brillant à tout prix freine."]
    },
    practice: { en: "Ask someone to give you three surprise questions about your work. Answer each in 60 seconds using What? So what? Now what?", fr: "Demandez à quelqu'un de vous poser trois questions surprises sur votre travail. Répondez à chacune en 60 secondes avec : quoi ? et alors ? et maintenant ?" },
    vids: [{ t: "Think Fast, Talk Smart: Communication Techniques", u: YT("HAnw168huqA"), by: "Stanford Graduate School of Business" }]
  },
  {
    id: "duarte", name: "Nancy Duarte", kind: "coach",
    role: { en: "US presentation expert, author of Resonate and slide:ology", fr: "Experte américaine de la présentation, auteure de Resonate et slide:ology" },
    theme: { en: "The structure of great talks", fr: "La structure des grandes prises de parole" },
    channel: TED("nancy_duarte"),
    quotes: [],
    ideas: {
      en: ["Many great talks share a shape: they move back and forth between what is and what could be.", "That gap creates the tension that keeps an audience listening.", "Treat the audience as the hero of the story and yourself as their mentor.", "Begin by describing the world as it is, so people recognise themselves.", "End with a vivid picture of how much better things will be, and what people must do to get there."],
      fr: ["Beaucoup de grandes interventions ont la même forme : elles alternent entre ce qui est et ce qui pourrait être.", "Cet écart crée la tension qui maintient l'attention.", "Faites du public le héros de l'histoire et de vous-même son mentor.", "Commencez par décrire le monde tel qu'il est, pour que chacun s'y reconnaisse.", "Terminez par une image vivante de ce qui sera meilleur, et de ce que chacun doit faire pour y parvenir."]
    },
    practice: { en: "Take your next presentation and write two columns: what is, and what could be. Rebuild the talk so it moves between them at least three times.", fr: "Pour votre prochaine présentation, écrivez deux colonnes : ce qui est, ce qui pourrait être. Reconstruisez l'intervention pour alterner entre les deux au moins trois fois." },
    vids: [{ t: "The secret structure of great talks", u: "https://www.ted.com/talks/nancy_duarte_the_secret_structure_of_great_talks", by: "TEDxEast" }]
  },
  {
    id: "ury", name: "William Ury", kind: "coach",
    role: { en: "US negotiation adviser, co-founder of Harvard's Program on Negotiation, co-author of Getting to Yes", fr: "Conseiller américain en négociation, cofondateur du Program on Negotiation de Harvard, coauteur de Getting to Yes" },
    theme: { en: "Negotiation and influence", fr: "Négociation et influence" },
    channel: TED("william_ury"),
    quotes: [
      { text: "Go to the balcony.", fr: "Montez au balcon.", source: "Getting Past No, 1991" },
      { text: "The Third Side.", fr: "Le tiers côté.", source: "Book title, 2000" }
    ],
    ideas: {
      en: ["Under pressure, 'go to the balcony': step back mentally and remember what you actually want.", "Look behind positions to interests: what people say they want and why they want it can differ.", "Every conflict has a 'third side': the surrounding community, which can calm things and bring people back to talks.", "Build a golden bridge, so the other side can say yes without losing face.", "Know your best alternative before you negotiate.", "The hardest person to negotiate with is often yourself."],
      fr: ["Sous pression, « montez au balcon » : prenez du recul et rappelez-vous ce que vous voulez vraiment.", "Regardez derrière les positions, vers les intérêts : ce que l'on demande et ce pourquoi on le demande peuvent différer.", "Tout conflit a un « tiers côté » : la communauté environnante, qui peut apaiser et ramener au dialogue.", "Construisez un pont d'or pour que l'autre partie puisse dire oui sans perdre la face.", "Connaissez votre meilleure solution de rechange avant de négocier.", "La personne la plus difficile à convaincre est souvent vous-même."]
    },
    practice: { en: "Before your next difficult partner meeting, write down your interest, their likely interest and your best alternative. Plan one way they could agree and save face.", fr: "Avant votre prochaine réunion difficile avec un partenaire, notez votre intérêt, son intérêt probable et votre meilleure solution de rechange. Prévoyez une façon pour lui d'accepter sans perdre la face." },
    vids: [{ t: "The walk from \"no\" to \"yes\"", u: YT("Hc6yi_FtoNo"), by: "TED" }]
  },
  {
    id: "malala", name: "Malala Yousafzai", kind: "speaker",
    role: { en: "Pakistani advocate for girls' education, youngest Nobel Peace Prize laureate (2014), co-founder of Malala Fund", fr: "Militante pakistanaise de l'éducation des filles, plus jeune lauréate du prix Nobel de la paix (2014), cofondatrice du Malala Fund" },
    theme: { en: "Speaking up for others", fr: "Prendre la parole pour les autres" },
    channel: "https://malala.org/",
    quotes: [
      { text: "One child, one teacher, one pen and one book can change the world.", fr: "Un enfant, un enseignant, un stylo et un livre peuvent changer le monde.", source: "UN Youth Assembly, 2013" },
      { text: "I am not a lone voice, I am many.", fr: "Je ne suis pas une voix isolée, je suis nombreuses.", source: "Nobel Lecture, 2014" },
      { text: "I tell my story, not because it is unique, but because it is not.", fr: "Je raconte mon histoire non parce qu'elle est unique, mais parce qu'elle ne l'est pas.", source: "Nobel Lecture, 2014" }
    ],
    ideas: {
      en: ["A personal story gains its power when it stands for many others.", "Name the people you speak for, then speak as one of them.", "Make your request plain, and say what you want and from whom.", "Calm words can carry great force. Her UN speech rejects revenge and asks for education.", "A concrete image, like a child with a book, stays with an audience longer than a statistic."],
      fr: ["Une histoire personnelle prend sa force lorsqu'elle représente beaucoup d'autres.", "Nommez ceux pour qui vous parlez, puis parlez comme l'un d'eux.", "Formulez clairement votre demande : ce que vous voulez, et de qui.", "Des mots calmes peuvent porter une grande force. Son discours à l'ONU rejette la vengeance et réclame l'éducation.", "Une image concrète, comme un enfant avec un livre, marque plus longtemps qu'une statistique."]
    },
    practice: { en: "Write the story behind one result of your work in five sentences, ending with what you are asking the audience to do. Tell it aloud.", fr: "Racontez en cinq phrases l'histoire derrière un résultat de votre travail, en terminant par ce que vous demandez au public. Dites-la à voix haute." },
    vids: [
      { t: "Malala Yousafzai addresses United Nations Youth Assembly", u: YT("3rNhZu3ttIU"), by: "United Nations" },
      { t: "Nobel Lecture (text), 2014", u: "https://www.nobelprize.org/prizes/peace/2014/yousafzai/lecture/", by: "NobelPrize.org" }
    ]
  },
  {
    id: "edmondson", name: "Amy Edmondson", kind: "research",
    role: { en: "Harvard Business School professor, author of The Fearless Organization", fr: "Professeure à la Harvard Business School, auteure de The Fearless Organization" },
    theme: { en: "Psychological safety", fr: "Sécurité psychologique" },
    channel: TED("amy_edmondson"),
    quotes: [
      { text: "A shared belief that the team is safe for interpersonal risk taking.", fr: "La conviction partagée que l'équipe permet de prendre des risques interpersonnels en sécurité.", source: "Definition of team psychological safety, Administrative Science Quarterly, 1999" }
    ],
    ideas: {
      en: ["Psychological safety means people can speak up, ask or admit a mistake without being punished or humiliated.", "Her early hospital research found that better teams reported more errors: they were more willing to talk about them.", "Frame the work as a learning problem, not only an execution problem.", "Acknowledge your own fallibility: 'I may miss something, so I need to hear from you.'", "Model curiosity by asking a lot of questions.", "Safety is not comfort or lower standards. High standards need it most."],
      fr: ["La sécurité psychologique, c'est pouvoir s'exprimer, poser une question ou admettre une erreur sans être puni ni humilié.", "Ses premières recherches en milieu hospitalier montrent que les meilleures équipes signalaient plus d'erreurs : elles osaient en parler.", "Présentez le travail comme un problème d'apprentissage, pas seulement d'exécution.", "Reconnaissez votre propre faillibilité : « Je peux manquer quelque chose, j'ai besoin de vous entendre. »", "Montrez l'exemple de la curiosité en posant beaucoup de questions.", "La sécurité n'est ni le confort ni une baisse d'exigence. Plus l'exigence est haute, plus elle est nécessaire."]
    },
    practice: { en: "At your next team meeting, say what you are unsure about, then ask: 'What am I missing?' Thank the first person who disagrees.", fr: "À votre prochaine réunion d'équipe, dites ce dont vous n'êtes pas sûr, puis demandez : « Qu'est-ce qui m'échappe ? » Remerciez la première personne en désaccord." },
    vids: [{ t: "Building a psychologically safe workplace", u: YT("LhoLuui9gX8"), by: "TEDxHGSE" }]
  },
  {
    id: "ibarra", name: "Herminia Ibarra", kind: "research",
    role: { en: "London Business School professor, author of Act Like a Leader, Think Like a Leader", fr: "Professeure à la London Business School, auteure de Act Like a Leader, Think Like a Leader" },
    theme: { en: "Growing into a bigger role", fr: "Grandir dans un rôle plus large" },
    channel: "https://herminiaibarra.com/",
    quotes: [
      { text: "Act Like a Leader, Think Like a Leader.", fr: "Agir comme un leader, penser comme un leader.", source: "Book title, 2015" }
    ],
    ideas: {
      en: ["You rarely think your way into a new way of acting. You act your way into a new way of thinking.", "She calls the insight you gain from trying new things 'outsight', and it comes from outside your head.", "Do less of what made you successful, and spend time on work outside your specialty.", "Build networks beyond your team and function before you need them.", "Being authentic does not mean staying as you are. Trying a new style can feel false at first, and still be growth."],
      fr: ["On change rarement sa façon d'agir en y réfléchissant. On change sa façon de penser en agissant.", "Elle appelle « outsight » ce que l'on apprend en essayant du nouveau : cela vient de l'extérieur, pas de la seule réflexion.", "Faites moins de ce qui a fait votre succès et consacrez du temps à ce qui dépasse votre spécialité.", "Construisez des réseaux au-delà de votre équipe et de votre fonction, avant d'en avoir besoin.", "Être authentique ne veut pas dire rester tel quel. Un nouveau style peut sembler faux au début et être pourtant un progrès."]
    },
    practice: { en: "List three things you do at your current level that you could hand over. Replace one with a task from the level above, and meet one person outside your field this month.", fr: "Listez trois tâches de votre niveau actuel que vous pourriez déléguer. Remplacez-en une par une tâche du niveau supérieur et rencontrez ce mois-ci une personne hors de votre domaine." },
    vids: [{ t: "Act Like a Leader, Think Like a Leader", u: YT("WAG2SSf9NQc"), by: "London Business Forum" }]
  },
  {
    id: "hampate", name: "Amadou Hampâté Bâ", kind: "africa",
    role: { en: "Malian writer and scholar of oral tradition (c. 1900–1991), born in Bandiagara, who served at UNESCO", fr: "Écrivain et érudit malien de la tradition orale (v. 1900–1991), né à Bandiagara, qui a siégé à l'UNESCO" },
    theme: { en: "Oral tradition and wisdom", fr: "Tradition orale et sagesse" },
    channel: "https://fr.wikipedia.org/wiki/Amadou_Hamp%C3%A2t%C3%A9_B%C3%A2",
    quotes: [
      { text: "In Africa, when an old man dies, a library burns.", fr: "En Afrique, quand un vieillard meurt, c'est une bibliothèque qui brûle.", source: "Attributed; linked to his UNESCO speech of 1960, and the wording varies", orig: "fr" },
      { text: "There are three truths: my truth, your truth and the Truth.", fr: "Il y a trois vérités : ma vérité, ta vérité et la Vérité.", source: "Words of his teacher Tierno Bokar, in his memoirs Oui mon commandant !, 1994", orig: "fr" }
    ],
    ideas: {
      en: ["Knowledge held by elders is fragile. Record it, and ask for it while you can.", "Speech is a responsibility. In the oral tradition, your word is your record.", "Each person holds part of the truth, so listen before you judge.", "Teaching happens through stories, which people remember and retell.", "Leaders can honour tradition and use it for today's problems, without freezing it.", "His memoirs Amkoullel, l'enfant peul and Oui mon commandant ! show how a life can be told as a lesson."],
      fr: ["Le savoir des anciens est fragile. Recueillez-le et demandez-le tant que vous le pouvez.", "La parole est une responsabilité. Dans la tradition orale, votre parole est votre archive.", "Chacun détient une part de vérité : écoutez avant de juger.", "L'enseignement passe par les récits, que l'on retient et que l'on transmet.", "Un leader peut honorer la tradition et s'en servir pour les problèmes d'aujourd'hui, sans la figer.", "Ses mémoires Amkoullel, l'enfant peul et Oui mon commandant ! montrent comment raconter une vie comme une leçon."]
    },
    practice: { en: "Interview one senior colleague or elder for 20 minutes about a hard decision they made. Write down the lesson, and share it with your team.", fr: "Interrogez pendant 20 minutes un collègue expérimenté ou un aîné sur une décision difficile. Notez la leçon et partagez-la avec votre équipe." },
    vids: []
  },
  {
    id: "proverbs", name: "African proverbs", kind: "africa",
    role: { en: "Traditional sayings from West and Central Africa, as collected in African Proverbs (Comboni Missionary Publications)", fr: "Dictons traditionnels d'Afrique de l'Ouest et du Centre, tirés du recueil African Proverbs (Comboni Missionary Publications)" },
    theme: { en: "Wisdom for leaders and facilitators", fr: "Sagesse pour leaders et animateurs" },
    channel: "https://www.comboni.org.uk/files/African-Proverbs.pdf",
    quotes: [
      { text: "Wisdom is like a baobab tree: a single person's arms cannot embrace it.", fr: "La sagesse est comme un baobab : les bras d'une seule personne ne peuvent l'embrasser.", source: "Akan, Ghana" },
      { text: "One head does not hold council.", fr: "Une seule tête ne tient pas conseil.", source: "Akan, Ghana (Ti koro nko agyina)" },
      { text: "Many heads, much knowledge.", fr: "Beaucoup de têtes, beaucoup de savoir.", source: "Ewé, Ghana" },
      { text: "Many beads form one necklace.", fr: "Beaucoup de perles forment un seul collier.", source: "Fang, Gabon" },
      { text: "Too many captains sink the ship.", fr: "Trop de capitaines font couler le navire.", source: "Wolof, Gambia" },
      { text: "Silence is also a form of speech.", fr: "Le silence est aussi une forme de parole.", source: "Fulani, Burkina Faso" },
      { text: "Judgement must wait to hear all the witnesses.", fr: "Le jugement doit attendre d'avoir entendu tous les témoins.", source: "Mende, Liberia" },
      { text: "The one who asks is not poisoned by mushrooms.", fr: "Celui qui demande n'est pas empoisonné par les champignons.", source: "Mandigo, Guinea" },
      { text: "Not to know is bad, not to wish to know is worse.", fr: "Ne pas savoir est mauvais, ne pas vouloir savoir est pire.", source: "Wolof, Gambia" },
      { text: "A good word removes anger.", fr: "Une bonne parole dissipe la colère.", source: "Ga, Ghana" },
      { text: "Whoever blames your fault is helping you to be wise.", fr: "Celui qui blâme ta faute t'aide à devenir sage.", source: "Basa, Liberia" },
      { text: "A wise person, skilled in the use of proverbs, settles disputes.", fr: "La personne sage, habile à manier les proverbes, règle les différends.", source: "Yoruba, Nigeria" },
      { text: "By coming and going, a bird weaves its nest.", fr: "À force d'aller et venir, l'oiseau tisse son nid.", source: "Ashanti, Ghana" },
      { text: "Two steps forward to advance, a step back to check.", fr: "Deux pas en avant pour progresser, un pas en arrière pour vérifier.", source: "Duala, Cameroon" },
      { text: "You cannot be too late to change.", fr: "Il n'est jamais trop tard pour changer.", source: "Mossi, Mali" },
      { text: "Nothing is impossible to a woman of will.", fr: "Rien n'est impossible à une femme de volonté.", source: "Mandigo, Guinea" },
      { text: "If you wait for tomorrow, tomorrow comes. If you don't wait for tomorrow, tomorrow comes.", fr: "Si tu attends demain, demain vient. Si tu n'attends pas demain, demain vient.", source: "Malinke, West Africa" }
    ],
    ideas: {
      en: ["Proverbs carry authority because they belong to everyone, not to the speaker.", "A well-chosen proverb can open a hard conversation without blaming anyone.", "Check the meaning with people from that community. Proverbs depend on context.", "Name the people a proverb comes from, rather than saying only 'in Africa'.", "Use one proverb, then pause. Explaining it too much takes away its power."],
      fr: ["Les proverbes font autorité parce qu'ils appartiennent à tous, et non à l'orateur.", "Un proverbe bien choisi peut ouvrir une conversation difficile sans accuser personne.", "Vérifiez le sens auprès de personnes de cette communauté. Un proverbe dépend de son contexte.", "Citez le peuple dont vient le proverbe, plutôt que de dire seulement « en Afrique ».", "Citez un proverbe, puis marquez une pause. Trop l'expliquer lui ôte sa force."]
    },
    practice: { en: "Open your next meeting with one proverb that fits its purpose. Ask the group what it means for today's decision, and listen before you add anything.", fr: "Ouvrez votre prochaine réunion par un proverbe adapté à son objet. Demandez au groupe ce qu'il signifie pour la décision du jour, et écoutez avant d'ajouter quoi que ce soit." },
    vids: []
  },
  {
    id: "mandela", name: "Nelson Mandela", kind: "africa",
    role: { en: "President of South Africa (1994–1999), anti-apartheid leader, Nobel Peace Prize laureate (1993)", fr: "Président de l'Afrique du Sud (1994–1999), figure de la lutte contre l'apartheid, prix Nobel de la paix (1993)" },
    theme: { en: "Courage and reconciliation", fr: "Courage et réconciliation" },
    channel: "https://www.nelsonmandela.org/",
    quotes: [
      { text: "I learned that courage was not the absence of fear, but the triumph over it.", fr: "J'ai appris que le courage n'est pas l'absence de peur, mais la victoire sur elle.", source: "Long Walk to Freedom, 1994" },
      { text: "Education is the most powerful weapon which you can use to change the world.", fr: "L'éducation est l'arme la plus puissante que l'on puisse utiliser pour changer le monde.", source: "Launch of the Mindset Network, 2003" },
      { text: "Let a new age dawn!", fr: "Qu'une ère nouvelle se lève !", source: "Nobel Lecture, 1993" },
      { text: "It always seems impossible until it's done.", fr: "Cela semble toujours impossible, jusqu'à ce que ce soit fait.", source: "Widely attributed" }
    ],
    ideas: {
      en: ["Hold firmly to the goal, and be flexible about how you reach it.", "Reconciliation is a choice a leader makes in public, often before others are ready.", "Lead from the back at times: let others take the credit and carry the idea.", "Learn the language and history of people who oppose you. It changes the conversation.", "Discipline and patience can outlast those who hold power over you.", "Symbols count: where you stand and what you wear can say what a speech cannot."],
      fr: ["Tenez fermement à l'objectif et restez souple sur le chemin.", "La réconciliation est un choix qu'un leader fait en public, souvent avant que les autres soient prêts.", "Sachez parfois diriger depuis l'arrière : laissez aux autres le mérite et le portage de l'idée.", "Apprenez la langue et l'histoire de ceux qui s'opposent à vous. Cela change la conversation.", "La discipline et la patience peuvent durer plus longtemps que le pouvoir de ceux qui vous dominent.", "Les symboles comptent : où vous vous placez et ce que vous portez peuvent dire ce qu'un discours ne dit pas."]
    },
    practice: { en: "Think of someone you disagree with at work. Learn one thing that matters to them, and open your next conversation with it.", fr: "Pensez à une personne avec qui vous êtes en désaccord au travail. Apprenez une chose qui compte pour elle et ouvrez votre prochaine conversation par ce sujet." },
    vids: [{ t: "Nobel Lecture (text), 1993", u: "https://www.nobelprize.org/prizes/peace/1993/mandela/lecture/", by: "NobelPrize.org" }]
  },
  {
    id: "maathai", name: "Wangari Maathai", kind: "africa",
    role: { en: "Kenyan environmentalist, founder of the Green Belt Movement, first African woman to win the Nobel Peace Prize (2004)", fr: "Écologiste kényane, fondatrice du Mouvement de la ceinture verte, première Africaine lauréate du prix Nobel de la paix (2004)" },
    theme: { en: "Small acts, wide change", fr: "Petits gestes, grands changements" },
    channel: "https://www.greenbeltmovement.org/",
    quotes: [
      { text: "In the course of history, there comes a time when humanity is called to shift to a new level of consciousness, to reach a higher moral ground.", fr: "Au cours de l'histoire, vient un temps où l'humanité est appelée à passer à un nouveau niveau de conscience, à atteindre un plan moral plus élevé.", source: "Nobel Lecture, 2004" },
      { text: "That time is now.", fr: "Ce temps, c'est maintenant.", source: "Nobel Lecture, 2004" },
      { text: "The tree became a symbol for the democratic struggle in Kenya.", fr: "L'arbre est devenu un symbole de la lutte démocratique au Kenya.", source: "Nobel Lecture, 2004" },
      { text: "I will be a hummingbird.", fr: "Je serai un colibri.", source: "From her telling of the hummingbird story, in the film Dirt! The Movie" }
    ],
    ideas: {
      en: ["Start with an action people can do today: planting a tree is simple, visible and shared.", "Connect issues people see as separate. She linked the environment, democracy and peace.", "Women's practical knowledge can power a national movement.", "Do what you can with what you have, even when the problem looks too large.", "Expect resistance when your work starts to shift power, and keep going."],
      fr: ["Commencez par une action possible dès aujourd'hui : planter un arbre est simple, visible et partagé.", "Reliez les sujets que l'on croit séparés. Elle a lié l'environnement, la démocratie et la paix.", "Le savoir pratique des femmes peut porter un mouvement national.", "Faites ce que vous pouvez avec ce que vous avez, même si le problème paraît trop grand.", "Attendez-vous à de la résistance lorsque votre travail déplace le pouvoir, et continuez."]
    },
    practice: { en: "Find the 'tree' in your programme: one small, visible action any partner can take this week. Describe it in one sentence and ask three people to do it.", fr: "Trouvez « l'arbre » de votre programme : une petite action visible que tout partenaire peut réaliser cette semaine. Décrivez-la en une phrase et demandez à trois personnes de la faire." },
    vids: [
      { t: "I will be a hummingbird", u: YT("IGMW6YWjMxw"), by: "Dirt! The Movie" },
      { t: "Nobel Lecture (text), 2004", u: "https://www.nobelprize.org/prizes/peace/2004/maathai/lecture/", by: "NobelPrize.org" }
    ]
  },
  {
    id: "annan", name: "Kofi Annan", kind: "africa",
    role: { en: "Ghanaian diplomat, UN Secretary-General (1997–2006), Nobel Peace Prize laureate (2001)", fr: "Diplomate ghanéen, Secrétaire général de l'ONU (1997–2006), prix Nobel de la paix (2001)" },
    theme: { en: "Quiet diplomacy", fr: "Diplomatie discrète" },
    channel: "https://www.kofiannanfoundation.org/",
    quotes: [
      { text: "We have entered the third millennium through a gate of fire.", fr: "Nous sommes entrés dans le troisième millénaire par une porte de feu.", source: "Nobel Lecture, 2001" },
      { text: "Today's real borders are not between nations, but between powerful and powerless, free and fettered, privileged and humiliated.", fr: "Les vraies frontières d'aujourd'hui ne séparent pas les nations, mais les puissants et les démunis, les libres et les entravés, les privilégiés et les humiliés.", source: "Nobel Lecture, 2001" },
      { text: "What begins with the failure to uphold the dignity of one life, all too often ends with a calamity for entire nations.", fr: "Ce qui commence par l'incapacité à défendre la dignité d'une seule vie finit trop souvent en calamité pour des nations entières.", source: "Nobel Lecture, 2001" },
      { text: "Peace must be made real and tangible in the daily existence of every individual in need.", fr: "La paix doit devenir réelle et tangible dans la vie quotidienne de chaque personne dans le besoin.", source: "Nobel Lecture, 2001" },
      { text: "There is no tool for development more effective than the empowerment of women.", fr: "Il n'existe pas d'outil de développement plus efficace que l'autonomisation des femmes.", source: "Widely attributed" }
    ],
    ideas: {
      en: ["Calm authority can do more than a raised voice, especially when tension is high.", "Listen to every party, including the ones you disagree with.", "Keep the individual human being at the centre of institutional work.", "Take responsibility in public for institutional failure, and learn from it.", "Build coalitions across governments, business and civil society.", "Speak plainly about hard truths, in language that leaves the door open."],
      fr: ["Une autorité calme obtient plus qu'une voix forte, surtout dans la tension.", "Écoutez toutes les parties, y compris celles avec lesquelles vous êtes en désaccord.", "Gardez la personne humaine au centre du travail institutionnel.", "Assumez publiquement les échecs de l'institution et tirez-en les leçons.", "Construisez des coalitions entre gouvernements, entreprises et société civile.", "Dites clairement les vérités difficiles, dans un langage qui laisse la porte ouverte."]
    },
    practice: { en: "Before your next tense meeting, lower your voice and slow your pace by a third. Name the person affected by the decision before you discuss the numbers.", fr: "Avant votre prochaine réunion tendue, baissez la voix et ralentissez d'un tiers. Nommez la personne touchée par la décision avant de discuter des chiffres." },
    vids: [{ t: "Nobel Lecture (text), 2001", u: "https://www.nobelprize.org/prizes/peace/2001/annan/lecture/", by: "NobelPrize.org" }]
  },
  {
    id: "sirleaf", name: "Ellen Johnson Sirleaf", kind: "africa",
    role: { en: "President of Liberia (2006–2018), Africa's first elected woman head of state, Nobel Peace Prize laureate (2011)", fr: "Présidente du Liberia (2006–2018), première femme élue cheffe d'État en Afrique, prix Nobel de la paix (2011)" },
    theme: { en: "Dreaming beyond your capacity", fr: "Rêver au-delà de ses moyens" },
    channel: "https://news.harvard.edu/gazette/story/2011/05/text-of-ellen-johnson-sirleafs-speech",
    quotes: [
      { text: "The size of your dreams must always exceed your current capacity to achieve them.", fr: "La taille de vos rêves doit toujours dépasser votre capacité actuelle à les réaliser.", source: "Harvard Commencement address, 2011" },
      { text: "If your dreams do not scare you, they are not big enough.", fr: "Si vos rêves ne vous font pas peur, c'est qu'ils ne sont pas assez grands.", source: "Harvard Commencement address, 2011" }
    ],
    ideas: {
      en: ["Set goals larger than your present means, and let them pull you forward.", "Women's leadership can rebuild a country after conflict.", "Expect setbacks along the way. Reversals and exile did not end her career.", "Keep your standards when you are the first or the only one in the room.", "Skills gained in finance and institutions can serve public leadership."],
      fr: ["Fixez des objectifs plus grands que vos moyens actuels et laissez-les vous tirer vers l'avant.", "Le leadership des femmes peut reconstruire un pays après un conflit.", "Attendez-vous à des revers. Les échecs et l'exil n'ont pas mis fin à sa carrière.", "Gardez vos exigences lorsque vous êtes la première ou la seule dans la pièce.", "Les compétences acquises dans la finance et les institutions peuvent servir le leadership public."]
    },
    practice: { en: "Write down the goal for your career you are slightly embarrassed to say aloud. Tell your mentor, and agree one step toward it this month.", fr: "Écrivez l'objectif de carrière que vous n'osez pas dire à voix haute. Dites-le à votre mentor et convenez d'un pas vers lui ce mois-ci." },
    vids: [{ t: "Harvard Commencement address (text), 2011", u: "https://news.harvard.edu/gazette/story/2011/05/text-of-ellen-johnson-sirleafs-speech", by: "Harvard Gazette" }]
  },
  {
    id: "gbowee", name: "Leymah Gbowee", kind: "africa",
    role: { en: "Liberian peace activist who helped lead Women of Liberia Mass Action for Peace, Nobel Peace Prize laureate (2011)", fr: "Militante libérienne pour la paix, l'une des dirigeantes de l'Action de masse des femmes du Liberia pour la paix, prix Nobel de la paix (2011)" },
    theme: { en: "Women organising for peace", fr: "Les femmes s'organisent pour la paix" },
    channel: "https://www.nobelprize.org/prizes/peace/2011/gbowee/lecture/",
    quotes: [
      { text: "We must continue to unite in sisterhood to turn our tears into triumph, our despair into determination and our fear into fortitude.", fr: "Nous devons rester unies dans la sororité pour changer nos larmes en triomphe, notre désespoir en détermination et notre peur en force d'âme.", source: "Nobel Lecture, 2011" },
      { text: "We used our pains, broken bodies and scarred emotions to confront the injustices and terror of our nation.", fr: "Nous avons utilisé nos douleurs, nos corps brisés et nos émotions meurtries pour affronter les injustices et la terreur de notre nation.", source: "Nobel Lecture, 2011" }
    ],
    ideas: {
      en: ["Ordinary people who organise can move those with power.", "A shared identity can bring together people from different faiths and groups.", "Visible, peaceful and sustained presence keeps pressure on decision makers.", "Girls and young women have untapped potential. Invest in it.", "Tell the hard parts of your story, because that is what gives others courage."],
      fr: ["Des gens ordinaires qui s'organisent peuvent faire bouger ceux qui ont le pouvoir.", "Une identité commune peut rassembler des personnes de confessions et de groupes différents.", "Une présence visible, pacifique et durable maintient la pression sur les décideurs.", "Les filles et les jeunes femmes ont un potentiel inexploité. Investissez-y.", "Racontez les moments durs de votre histoire : c'est ce qui donne du courage aux autres."]
    },
    practice: { en: "Identify two groups who rarely work together but want the same outcome from your programme. Bring one person from each to the same conversation.", fr: "Repérez deux groupes qui travaillent rarement ensemble mais veulent le même résultat de votre programme. Réunissez une personne de chacun dans la même conversation." },
    vids: [
      { t: "Unlock the intelligence, passion, greatness of girls", u: "https://www.ted.com/talks/leymah_gbowee_unlock_the_intelligence_passion_greatness_of_girls", by: "TED" },
      { t: "Nobel Lecture (text), 2011", u: "https://www.nobelprize.org/prizes/peace/2011/gbowee/lecture/", by: "NobelPrize.org" }
    ]
  },
  {
    id: "adichie", name: "Chimamanda Ngozi Adichie", kind: "africa",
    role: { en: "Nigerian novelist and essayist, author of Half of a Yellow Sun and We Should All Be Feminists", fr: "Romancière et essayiste nigériane, auteure de L'Autre Moitié du soleil et de Nous sommes tous des féministes" },
    theme: { en: "The power of whose story is told", fr: "Le pouvoir de raconter" },
    channel: TED("chimamanda_ngozi_adichie"),
    quotes: [
      { text: "The single story creates stereotypes, and the problem with stereotypes is not that they are untrue, but that they are incomplete.", fr: "L'histoire unique crée des stéréotypes, et le problème des stéréotypes n'est pas qu'ils sont faux, mais qu'ils sont incomplets.", source: "TED talk The danger of a single story, 2009" },
      { text: "Stories matter. Many stories matter.", fr: "Les histoires comptent. Beaucoup d'histoires comptent.", source: "TED talk The danger of a single story, 2009" },
      { text: "We should all be feminists.", fr: "Nous devrions tous être féministes.", source: "TEDxEuston talk and book title" }
    ],
    ideas: {
      en: ["When only one story is told about a people or place, misunderstanding follows.", "Ask who tells the story, when it starts and what it leaves out.", "Reports about communities should show people's skill and agency, not only their needs.", "Humour and personal stories can carry serious ideas to wide audiences.", "Name what you assumed about someone, and let it be corrected."],
      fr: ["Lorsqu'on ne raconte qu'une histoire sur un peuple ou un lieu, l'incompréhension suit.", "Demandez qui raconte, à partir de quand, et ce qui est laissé de côté.", "Les rapports sur les communautés doivent montrer leurs compétences et leur capacité d'agir, pas seulement leurs besoins.", "L'humour et le récit personnel portent des idées sérieuses vers un large public.", "Nommez ce que vous aviez supposé sur quelqu'un et acceptez d'être corrigé."]
    },
    practice: { en: "Reread your latest report or speech about a community. Add one detail that shows people's own skill or decisions, and check it with someone from that community.", fr: "Relisez votre dernier rapport ou discours sur une communauté. Ajoutez un détail qui montre les compétences ou les décisions de ses membres, et vérifiez-le auprès de l'un d'eux." },
    vids: [
      { t: "The danger of a single story", u: YT("D9Ihs241zeg"), by: "TED" },
      { t: "We should all be feminists", u: YT("hg3umXU_qWc"), by: "TEDxEuston" }
    ]
  }
];

// Short lines for existing voices that had no quote. These are talk titles.
export const EXTRA_QUOTES = {
  swaniker: [{ text: "The leaders who ruined Africa, and the generation who can fix it.", fr: "Les dirigeants qui ont ruiné l'Afrique, et la génération qui peut réparer.", source: "TED talk title, 2014" }],
  okonjo: [{ text: "Want to help Africa? Do business here.", fr: "Vous voulez aider l'Afrique ? Faites-y des affaires.", source: "TED talk title, 2007" }]
};

// Free French versions of the quotes first added in English only, by exact text.
export const QUOTE_FR = {
  "Work harder on yourself than you do on your job.": "Travaillez davantage sur vous-même que sur votre emploi.",
  "Discipline is the bridge between goals and accomplishment.": "La discipline est le pont entre les objectifs et leur accomplissement.",
  "Either you run the day, or the day runs you.": "Ou bien vous dirigez la journée, ou bien c'est la journée qui vous dirige.",
  "Don't wish it were easier; wish you were better.": "Ne souhaitez pas que ce soit plus facile ; souhaitez être meilleur.",
  "Your attitude, not your aptitude, will determine your altitude.": "C'est votre attitude, et non votre aptitude, qui déterminera votre altitude.",
  "You can have everything in life you want, if you will just help enough other people get what they want.": "Vous pouvez avoir tout ce que vous voulez dans la vie, si vous aidez assez d'autres personnes à obtenir ce qu'elles veulent.",
  "People often say that motivation doesn't last. Well, neither does bathing – that's why we recommend it daily.": "On dit souvent que la motivation ne dure pas. La toilette non plus : c'est pourquoi on la recommande chaque jour.",
  "You don't have to be great to start, but you have to start to be great.": "Il n'est pas nécessaire d'être excellent pour commencer, mais il faut commencer pour devenir excellent.",
  "Someone's opinion of you does not have to become your reality.": "L'opinion de quelqu'un sur vous n'a pas à devenir votre réalité.",
  "Too many of us are not living our dreams because we are living our fears.": "Trop d'entre nous ne vivent pas leurs rêves parce qu'ils vivent leurs peurs.",
  "It's not over until I win.": "Ce n'est pas fini tant que je n'ai pas gagné.",
  "Set a goal that makes you want to jump out of bed in the morning.": "Fixez-vous un objectif qui vous donne envie de sauter du lit le matin.",
  "Faith and fear both demand you believe in something you cannot see. You choose.": "La foi et la peur exigent toutes deux de croire en quelque chose que l'on ne voit pas. À vous de choisir.",
  "Where focus goes, energy flows.": "L'énergie va là où va votre attention.",
  "It is in your moments of decision that your destiny is shaped.": "C'est dans vos moments de décision que se façonne votre destin.",
  "Setting goals is the first step in turning the invisible into the visible.": "Se fixer des objectifs est le premier pas pour rendre visible l'invisible.",
  "The greatest tragedy in life is not death, but a life without a purpose.": "La plus grande tragédie de la vie n'est pas la mort, mais une vie sans but.",
  "Success without a successor is failure.": "Le succès sans successeur est un échec.",
  "When purpose is not known, abuse is inevitable.": "Quand on ne connaît pas la raison d'être d'une chose, l'abus est inévitable.",
  "People don't buy what you do; they buy why you do it.": "Les gens n'achètent pas ce que vous faites ; ils achètent la raison pour laquelle vous le faites.",
  "Leadership is not about being in charge. It is about taking care of those in your charge.": "Le leadership, ce n'est pas être aux commandes. C'est prendre soin de ceux dont on a la charge.",
  "Leaders eat last.": "Les leaders mangent en dernier.",
  "Seek first to understand, then to be understood.": "Cherchez d'abord à comprendre, puis à être compris.",
  "Begin with the end in mind.": "Commencez en gardant la fin à l'esprit.",
  "The key is not to prioritize what's on your schedule, but to schedule your priorities.": "La clé n'est pas de hiérarchiser votre agenda, mais d'inscrire vos priorités à l'agenda.",
  "Leadership is influence. Nothing more, nothing less.": "Le leadership, c'est l'influence. Rien de plus, rien de moins.",
  "Everything rises and falls on leadership.": "Tout monte et tout tombe en fonction du leadership.",
  "A leader is one who knows the way, goes the way, and shows the way.": "Un leader est celui qui connaît le chemin, emprunte le chemin et montre le chemin.",
  "What got you here won't get you there.": "Ce qui vous a mené ici ne vous mènera pas là-bas.",
  "Successful people become great leaders when they learn to shift the focus from themselves to others.": "Les personnes qui réussissent deviennent de grands leaders lorsqu'elles apprennent à déplacer l'attention d'elles-mêmes vers les autres.",
  "Own your morning. Elevate your life.": "Maîtrisez votre matin. Élevez votre vie.",
  "Victims recite problems. Leaders present solutions.": "Les victimes récitent les problèmes. Les leaders présentent des solutions.",
  "Lead Without a Title.": "Diriger sans titre.",
  "Let them.": "Laissez-les.",
  "You are one decision away from a totally different life.": "Vous êtes à une décision d'une vie totalement différente.",
  "Don't leave before you leave.": "Ne partez pas avant de partir.",
  "Done is better than perfect.": "Fait vaut mieux que parfait.",
  "What would you do if you weren't afraid?": "Que feriez-vous si vous n'aviez pas peur ?",
  "There is no such thing as failure. Failure is just life trying to move us in another direction.": "L'échec n'existe pas. L'échec, c'est simplement la vie qui essaie de nous orienter dans une autre direction.",
  "Do you see me? Do you hear me? Does what I say mean anything to you?": "Me voyez-vous ? M'entendez-vous ? Ce que je dis compte-t-il pour vous ?",
  "A new day is on the horizon!": "Un jour nouveau se lève à l'horizon !",
  "Doing the best at this moment puts you in the best place for the next moment.": "Faire de son mieux à cet instant vous place au mieux pour l'instant suivant.",
  "Turn your wounds into wisdom.": "Transformez vos blessures en sagesse.",
  "You get in life what you have the courage to ask for.": "On obtient dans la vie ce que l'on a le courage de demander.",
  "When you want to succeed as bad as you want to breathe, then you'll be successful.": "Quand vous voudrez réussir autant que vous voulez respirer, alors vous réussirez.",
  "The obstacle is the way.": "L'obstacle est le chemin.",
  "Ego is the enemy.": "L'ego est l'ennemi.",
  "Stillness is the key.": "Le calme est la clé.",
  "Vulnerability is the birthplace of innovation, creativity and change.": "La vulnérabilité est le berceau de l'innovation, de la créativité et du changement.",
  "Clear is kind. Unclear is unkind.": "Être clair, c'est être bienveillant. Ne pas l'être, c'est manquer de bienveillance.",
  "Becoming is better than being.": "Devenir vaut mieux qu'être.",
  "Enthusiasm is common. Endurance is rare.": "L'enthousiasme est courant. L'endurance est rare.",
  "Talent counts, but effort counts twice.": "Le talent compte, mais l'effort compte deux fois.",
  "Argue like you're right and listen like you're wrong.": "Argumentez comme si vous aviez raison et écoutez comme si vous aviez tort."
};
