// Classic voices: public-domain thinkers. Every English quotation below was
// checked word for word on 2026-10-14 against the Project Gutenberg text
// linked in `channel` (the translator is named in `role`), so old spellings
// such as "thyself", "labour" and "equalling" are the source's own.
// The French lines are our free translations of those English texts.
//   quotes: text (verbatim), source (book/section), fr (free translation)

const pg = n => "https://www.gutenberg.org/ebooks/" + n;

export const CLASSICS = [
  {
    id: "aurelius", name: "Marcus Aurelius", kind: "classic",
    role: { en: "Roman emperor and Stoic (121–180). Meditations, trans. George Long", fr: "Empereur romain et stoïcien (121–180). Pensées, trad. anglaise George Long" },
    theme: { en: "Self-command and duty", fr: "Maîtrise de soi et sens du devoir" },
    channel: pg(15877),
    quotes: [
      { text: "No longer talk at all about the kind of man that a good man ought to be, but be such.", source: "Meditations X.16", fr: "Cesse de discourir sur ce que doit être un homme de bien : sois-le." },
      { text: "If it is not right, do not do it: if it is not true, do not say it.", source: "Meditations XII.17", fr: "Si ce n'est pas juste, ne le fais pas ; si ce n'est pas vrai, ne le dis pas." },
      { text: "The best way of avenging thyself is not to become like the wrong-doer.", source: "Meditations VI.6", fr: "La meilleure façon de te venger est de ne pas ressembler à celui qui t'a fait du tort." },
      { text: "Such as are thy habitual thoughts, such also will be the character of thy mind; for the soul is dyed by the thoughts.", source: "Meditations V.16", fr: "Tes pensées habituelles font le caractère de ton esprit, car l'âme se teinte de ses pensées." },
      { text: "Look within. Within is the fountain of good, and it will ever bubble up, if thou wilt ever dig.", source: "Meditations VII.59", fr: "Regarde en toi. En toi est la source du bien, et elle jaillira toujours si tu creuses toujours." },
      { text: "Begin the morning by saying to thyself, I shall meet with the busybody, the ungrateful, arrogant, deceitful, envious, unsocial.", source: "Meditations II.1", fr: "Dis-toi dès le matin : je rencontrerai aujourd'hui un indiscret, un ingrat, un arrogant, un fourbe, un envieux, un insociable." },
      { text: "The art of life is more like the wrestler's art than the dancer's, in respect of this, that it should stand ready and firm to meet onsets which are sudden and unexpected.", source: "Meditations VII.61", fr: "L'art de vivre ressemble plus à celui du lutteur qu'à celui du danseur : il doit se tenir prêt et ferme face aux assauts soudains et imprévus." },
      { text: "How much trouble he avoids who does not look to see what his neighbor says or does or thinks, but only to what he does himself, that it may be just and pure.", source: "Meditations IV.18", fr: "Que de soucis évite celui qui ne regarde pas ce que dit, fait ou pense son voisin, mais seulement ce qu'il fait lui-même, pour que ce soit juste et pur." },
      { text: "Very little indeed is necessary for living a happy life.", source: "Meditations VII.67", fr: "Il faut vraiment très peu de chose pour vivre heureux." },
      { text: "The universe is transformation: life is opinion.", source: "Meditations IV.3", fr: "L'univers est changement ; la vie est opinion." },
      { text: "Let it make no difference to thee whether thou art cold or warm, if thou art doing thy duty.", source: "Meditations VI.2", fr: "Qu'il te soit égal d'avoir froid ou chaud, pourvu que tu fasses ton devoir." }
    ],
    ideas: {
      en: [
        "Prepare each morning for difficult people, so their behaviour does not decide yours.",
        "Judge yourself by your own actions, not by what others say, do or think.",
        "Your habitual thoughts colour your character, so choose what you dwell on.",
        "Stop debating what a good leader is, and act like one today."
      ],
      fr: [
        "Préparez-vous chaque matin aux personnes difficiles, pour que leur conduite ne dicte pas la vôtre.",
        "Jugez-vous sur vos propres actes, non sur ce que les autres disent, font ou pensent.",
        "Vos pensées habituelles colorent votre caractère : choisissez ce sur quoi vous vous attardez.",
        "Cessez de débattre de ce qu'est un bon leader et agissez comme tel dès aujourd'hui."
      ]
    },
    practice: {
      en: "Before your first meeting, name the one reaction you will not let a difficult person provoke in you today.",
      fr: "Avant votre première réunion, nommez la réaction qu'aucune personne difficile ne vous fera avoir aujourd'hui."
    },
    vids: []
  },
  {
    id: "epictetus", name: "Epictetus", kind: "classic",
    role: { en: "Former slave turned Stoic teacher (c. 50–135). Enchiridion, trans. T. W. Higginson; Discourses, trans. George Long", fr: "Ancien esclave devenu maître stoïcien (v. 50–135). Manuel, trad. anglaise T. W. Higginson ; Entretiens, trad. George Long" },
    theme: { en: "What is in our control", fr: "Ce qui dépend de nous" },
    channel: pg(45109),
    quotes: [
      { text: "There are things which are within our power, and there are things which are beyond our power.", source: "Enchiridion I", fr: "Il y a des choses qui dépendent de nous, et d'autres qui ne dépendent pas de nous." },
      { text: "Men are disturbed not by things, but by the views which they take of things.", source: "Enchiridion V", fr: "Ce qui trouble les hommes, ce ne sont pas les choses, mais l'idée qu'ils s'en font." },
      { text: "Demand not that events should happen as you wish; but wish them to happen as they do happen, and you will go on well.", source: "Enchiridion VIII", fr: "N'exige pas que les événements arrivent comme tu le veux ; veuille qu'ils arrivent comme ils arrivent, et tu t'en porteras bien." },
      { text: "If you would improve, be content to be thought foolish and dull with regard to externals.", source: "Enchiridion XIII", fr: "Si tu veux progresser, accepte de passer pour sot et borné quant aux choses extérieures." },
      { text: "He was ignorant of my other faults, else he would not have mentioned these alone.", source: "Enchiridion XXXIII", fr: "Il ignorait mes autres défauts, sinon il n'aurait pas cité seulement ceux-là." },
      { text: "Remember that you are an actor in a drama of such sort as the Author chooses.", source: "Enchiridion XVII", fr: "Souviens-toi que tu es acteur dans une pièce dont l'Auteur choisit la nature." },
      { text: "Be not elated at any excellence not your own.", source: "Enchiridion VI", fr: "Ne t'enorgueillis d'aucun mérite qui ne soit le tien." },
      { text: "It is the action of an uninstructed person to reproach others for his own misfortunes.", source: "Enchiridion V", fr: "C'est le fait d'un ignorant que d'accuser les autres de ses propres malheurs." },
      { text: "Never say of anything, “I have lost it,” but, “I have restored it.”", source: "Enchiridion XI", fr: "Ne dis jamais d'une chose « je l'ai perdue », mais « je l'ai rendue »." },
      { text: "Nothing great is produced suddenly, since not even the grape or the fig is.", source: "Discourses I.15", fr: "Rien de grand ne se fait soudainement, pas même le raisin ou la figue." }
    ],
    ideas: {
      en: [
        "Sort every worry into what you control (your effort, judgement, words) and what you don't.",
        "Your interpretation of an event, not the event itself, is what unsettles you.",
        "Take criticism lightly and with humour; it rarely covers all your faults anyway.",
        "Growth is slow, like fruit ripening, so judge progress over seasons, not days."
      ],
      fr: [
        "Classez chaque souci : ce qui dépend de vous (effort, jugement, paroles) et ce qui n'en dépend pas.",
        "C'est votre interprétation d'un événement, et non l'événement lui-même, qui vous trouble.",
        "Accueillez la critique avec légèreté et humour : elle ne couvre de toute façon pas tous vos défauts.",
        "La croissance est lente, comme un fruit qui mûrit : jugez vos progrès sur des saisons, pas des jours."
      ]
    },
    practice: {
      en: "When something goes wrong this week, write two columns: 'within my power' and 'beyond my power'. Act only on the first.",
      fr: "Quand quelque chose tourne mal cette semaine, écrivez deux colonnes : « dépend de moi » et « ne dépend pas de moi ». N'agissez que sur la première."
    },
    vids: []
  },
  {
    id: "laotzu", name: "Lao Tzu", kind: "classic",
    role: { en: "Chinese sage, traditional author of the Tao Te Ching (6th c. BCE). Trans. James Legge", fr: "Sage chinois, auteur traditionnel du Tao Te King (VIe s. av. J.-C.). Trad. anglaise James Legge" },
    theme: { en: "Humble, quiet leadership", fr: "Leadership humble et discret" },
    channel: pg(216),
    quotes: [
      { text: "The journey of a thousand li commenced with a single step.", source: "Tao Te Ching, ch. 64", fr: "Le voyage de mille li a commencé par un seul pas." },
      { text: "He who knows other men is discerning; he who knows himself is intelligent.", source: "Tao Te Ching, ch. 33", fr: "Celui qui connaît les autres est perspicace ; celui qui se connaît lui-même est éclairé." },
      { text: "He who overcomes others is strong; he who overcomes himself is mighty.", source: "Tao Te Ching, ch. 33", fr: "Celui qui triomphe des autres est fort ; celui qui triomphe de lui-même est puissant." },
      { text: "The highest excellence is like (that of) water.", source: "Tao Te Ching, ch. 8", fr: "La plus haute excellence est semblable à l'eau." },
      { text: "There is nothing in the world more soft and weak than water, and yet for attacking things that are firm and strong there is nothing that can take precedence of it.", source: "Tao Te Ching, ch. 78", fr: "Rien au monde n'est plus souple et plus faible que l'eau, et pourtant rien ne la surpasse pour venir à bout de ce qui est dur et fort." },
      { text: "He who stands on his tiptoes does not stand firm; he who stretches his legs does not walk (easily).", source: "Tao Te Ching, ch. 24", fr: "Qui se dresse sur la pointe des pieds ne tient pas ferme ; qui allonge le pas ne marche pas aisément." },
      { text: "Governing a great state is like cooking small fish.", source: "Tao Te Ching, ch. 60", fr: "Gouverner un grand État, c'est comme faire cuire de petits poissons." },
      { text: "Their work was done and their undertakings were successful, while the people all said, 'We are as we are, of ourselves!'", source: "Tao Te Ching, ch. 17", fr: "L'œuvre était accomplie et les entreprises réussies, et le peuple disait : « Nous sommes ainsi par nous-mêmes ! »" },
      { text: "All difficult things in the world are sure to arise from a previous state in which they were easy, and all great things from one in which they were small.", source: "Tao Te Ching, ch. 63", fr: "Toute chose difficile naît d'un état où elle était facile, et toute grande chose d'un état où elle était petite." },
      { text: "Sincere words are not fine; fine words are not sincere.", source: "Tao Te Ching, ch. 81", fr: "Les paroles sincères ne sont pas belles ; les belles paroles ne sont pas sincères." },
      { text: "He is free from self-display, and therefore he shines; from self-assertion, and therefore he is distinguished.", source: "Tao Te Ching, ch. 22", fr: "Il ne se met pas en avant, c'est pourquoi il brille ; il ne s'impose pas, c'est pourquoi il se distingue." }
    ],
    ideas: {
      en: [
        "The best leaders are barely noticed: when the work succeeds, the team feels it did it themselves.",
        "Handle big problems while they are still small and easy.",
        "Soft persistence, like water, wears down hard resistance.",
        "Don't over-manage: like small fish, a team falls apart if you keep turning it over."
      ],
      fr: [
        "Les meilleurs leaders se remarquent à peine : quand le travail réussit, l'équipe sent qu'elle l'a fait elle-même.",
        "Traitez les grands problèmes tant qu'ils sont encore petits et faciles.",
        "La persévérance souple, comme l'eau, use les résistances les plus dures.",
        "Ne sur-gérez pas : comme les petits poissons, une équipe se défait si on la retourne sans cesse."
      ]
    },
    practice: {
      en: "In your next team success, give the credit away in public and notice what it does to ownership.",
      fr: "Lors du prochain succès de votre équipe, attribuez-lui publiquement le mérite et observez l'effet sur l'appropriation."
    },
    vids: []
  },
  {
    id: "confucius", name: "Confucius", kind: "classic",
    role: { en: "Chinese teacher and philosopher (551–479 BCE). The Analects, trans. James Legge", fr: "Maître et philosophe chinois (551–479 av. J.-C.). Les Entretiens, trad. anglaise James Legge" },
    theme: { en: "Learning, integrity and example", fr: "Apprentissage, intégrité et exemplarité" },
    channel: pg(3330),
    quotes: [
      { text: "Is it not pleasant to learn with a constant perseverance and application?", source: "Analects I.1", fr: "N'est-ce pas un plaisir d'apprendre avec une persévérance et une application constantes ?" },
      { text: "What you do not want done to yourself, do not do to others.", source: "Analects XV.23", fr: "Ce que vous ne voulez pas qu'on vous fasse, ne le faites pas aux autres." },
      { text: "When we see men of worth, we should think of equalling them; when we see men of a contrary character, we should turn inwards and examine ourselves.", source: "Analects IV.17", fr: "Devant un homme de valeur, pensons à l'égaler ; devant son contraire, examinons-nous nous-mêmes." },
      { text: "Learning without thought is labour lost; thought without learning is perilous.", source: "Analects II.15", fr: "Apprendre sans réfléchir est peine perdue ; réfléchir sans apprendre est périlleux." },
      { text: "To see what is right and not to do it is want of courage.", source: "Analects II.24", fr: "Voir ce qui est juste et ne pas le faire, c'est manquer de courage." },
      { text: "When you know a thing, to hold that you know it; and when you do not know a thing, to allow that you do not know it;—this is knowledge.", source: "Analects II.17", fr: "Savoir que l'on sait ce que l'on sait, et reconnaître que l'on ne sait pas ce que l'on ne sait pas : voilà la connaissance." },
      { text: "I will not be afflicted at men's not knowing me; I will be afflicted that I do not know men.", source: "Analects I.16", fr: "Je ne m'afflige pas que les autres ne me connaissent pas ; je m'afflige de ne pas les connaître." },
      { text: "The superior man is modest in his speech, but exceeds in his actions.", source: "Analects XIV.29", fr: "L'homme de bien est modeste dans ses paroles mais va au-delà dans ses actes." },
      { text: "If a man take no thought about what is distant, he will find sorrow near at hand.", source: "Analects XV.11", fr: "Qui ne pense pas au lointain trouvera le chagrin tout près." },
      { text: "When you have faults, do not fear to abandon them.", source: "Analects I.8", fr: "Quand vous avez des défauts, ne craignez pas de vous en défaire." }
    ],
    ideas: {
      en: [
        "Lead by example: say less than you do.",
        "Admitting what you don't know is part of knowing.",
        "Pair study with reflection; one without the other fails.",
        "Worry less about being recognised and more about understanding the people around you."
      ],
      fr: [
        "Montrez l'exemple : dites moins que ce que vous faites.",
        "Reconnaître ce que l'on ignore fait partie du savoir.",
        "Associez l'étude à la réflexion : l'une sans l'autre échoue.",
        "Souciez-vous moins d'être reconnu que de comprendre les personnes qui vous entourent."
      ]
    },
    practice: {
      en: "In your next meeting, say 'I don't know yet, I'll find out' at least once when it is true.",
      fr: "Lors de votre prochaine réunion, dites au moins une fois « Je ne sais pas encore, je vais vérifier » quand c'est vrai."
    },
    vids: []
  },
  {
    id: "suntzu", name: "Sun Tzu", kind: "classic",
    role: { en: "Chinese general and strategist (c. 5th c. BCE). The Art of War, trans. Lionel Giles", fr: "Général et stratège chinois (v. Ve s. av. J.-C.). L'Art de la guerre, trad. anglaise Lionel Giles" },
    theme: { en: "Strategy and preparation", fr: "Stratégie et préparation" },
    channel: pg(132),
    caution: {
      en: "Written about war. Read it here as a book on planning, preparation and care for a team, not on beating colleagues or partners.",
      fr: "Écrit sur la guerre. Lisez-le ici comme un livre sur la planification, la préparation et le soin de l'équipe, non comme un moyen de vaincre collègues ou partenaires."
    },
    quotes: [
      { text: "Supreme excellence consists in breaking the enemy's resistance without fighting.", source: "The Art of War III", fr: "L'excellence suprême consiste à briser la résistance de l'adversaire sans combattre." },
      { text: "If you know the enemy and know yourself, you need not fear the result of a hundred battles.", source: "The Art of War III", fr: "Si tu connais l'adversaire et te connais toi-même, tu n'as pas à craindre le résultat de cent batailles." },
      { text: "Regard your soldiers as your children, and they will follow you into the deepest valleys.", source: "The Art of War X", fr: "Considère tes soldats comme tes enfants, et ils te suivront dans les vallées les plus profondes." },
      { text: "Now the general who wins a battle makes many calculations in his temple ere the battle is fought.", source: "The Art of War I", fr: "Le général qui gagne une bataille a fait de nombreux calculs dans son temple avant qu'elle ne soit livrée." },
      { text: "The control of a large force is the same principle as the control of a few men: it is merely a question of dividing up their numbers.", source: "The Art of War V", fr: "Diriger une grande armée obéit au même principe que diriger quelques hommes : il s'agit seulement de les répartir." },
      { text: "To secure ourselves against defeat lies in our own hands, but the opportunity of defeating the enemy is provided by the enemy himself.", source: "The Art of War IV", fr: "Se prémunir contre la défaite dépend de nous ; l'occasion de vaincre l'adversaire, c'est lui qui la fournit." },
      { text: "There are not more than five musical notes, yet the combinations of these five give rise to more melodies than can ever be heard.", source: "The Art of War V", fr: "Il n'y a que cinq notes de musique, mais leurs combinaisons donnent plus de mélodies qu'on ne pourra jamais en entendre." },
      { text: "Water shapes its course according to the nature of the ground over which it flows.", source: "The Art of War VI", fr: "L'eau façonne son cours selon la nature du terrain qu'elle traverse." },
      { text: "He will win who knows when to fight and when not to fight.", source: "The Art of War III", fr: "Vaincra celui qui sait quand combattre et quand ne pas combattre." },
      { text: "The victorious strategist only seeks battle after the victory has been won, whereas he who is destined to defeat first fights and afterwards looks for victory.", source: "The Art of War IV", fr: "Le stratège victorieux ne cherche la bataille qu'une fois la victoire acquise ; celui qui est voué à la défaite combat d'abord et cherche ensuite la victoire." }
    ],
    ideas: {
      en: [
        "Win most of the battle in preparation, before the meeting or negotiation starts.",
        "Know your own position as well as your counterpart's.",
        "Choose your battles: knowing when not to push is a skill.",
        "Care for your team as people and they will carry hard work with you."
      ],
      fr: [
        "Gagnez l'essentiel de la bataille dans la préparation, avant que la réunion ou la négociation ne commence.",
        "Connaissez votre propre position aussi bien que celle de votre interlocuteur.",
        "Choisissez vos combats : savoir quand ne pas insister est une compétence.",
        "Prenez soin de votre équipe en tant que personnes, et elle portera avec vous les efforts difficiles."
      ]
    },
    practice: {
      en: "Before your next negotiation, write one page: what we need, what they need, where we can both win.",
      fr: "Avant votre prochaine négociation, écrivez une page : ce dont nous avons besoin, ce dont ils ont besoin, où nous pouvons gagner ensemble."
    },
    vids: []
  },
  {
    id: "washington", name: "Booker T. Washington", kind: "classic",
    role: { en: "US educator, born enslaved, founder of Tuskegee Institute (1856–1915). Up from Slavery, 1901", fr: "Éducateur américain né en esclavage, fondateur du Tuskegee Institute (1856–1915). Up from Slavery, 1901" },
    theme: { en: "Building through work and trust", fr: "Bâtir par le travail et la confiance" },
    channel: pg(2376),
    caution: {
      en: "His acceptance of segregation in the 1895 Atlanta address was strongly contested in his time, notably by W. E. B. Du Bois. Read his views on self-help alongside that debate.",
      fr: "Son acceptation de la ségrégation dans le discours d'Atlanta (1895) fut vivement contestée à l'époque, notamment par W. E. B. Du Bois. Lisez ses idées sur l'effort personnel à la lumière de ce débat."
    },
    quotes: [
      { text: "Success is to be measured not so much by the position that one has reached in life as by the obstacles which he has overcome while trying to succeed.", source: "Up from Slavery, ch. II", fr: "La réussite se mesure moins à la position atteinte qu'aux obstacles surmontés pour y parvenir." },
      { text: "Cast down your bucket where you are.", source: "Up from Slavery, ch. XIV (Atlanta address, 1895)", fr: "Jetez votre seau là où vous êtes." },
      { text: "No race can prosper till it learns that there is as much dignity in tilling a field as in writing a poem.", source: "Up from Slavery, ch. XIV", fr: "Aucun peuple ne peut prospérer tant qu'il n'a pas compris qu'il y a autant de dignité à labourer un champ qu'à écrire un poème." },
      { text: "There is no defence or security for any of us except in the highest intelligence and development of all.", source: "Up from Slavery, ch. XIV", fr: "Il n'y a de protection ni de sécurité pour aucun de nous sans le plus haut développement de tous." },
      { text: "I have begun everything with the idea that I could succeed.", source: "Up from Slavery, ch. IV", fr: "J'ai tout commencé avec l'idée que je pouvais réussir." },
      { text: "Few things help an individual more than to place responsibility upon him, and to let him know that you trust him.", source: "Up from Slavery, ch. XI", fr: "Peu de choses aident autant une personne que de lui confier une responsabilité et de lui faire savoir qu'on lui fait confiance." },
      { text: "My race will succeed in proportion as it learns to do a common thing in an uncommon manner.", source: "Up from Slavery, ch. XVI", fr: "Mon peuple réussira dans la mesure où il apprendra à faire une chose ordinaire de manière extraordinaire." },
      { text: "The individual who can do something that the world wants done will, in the end, make his way regardless of race.", source: "Up from Slavery, ch. X", fr: "Celui qui sait faire ce dont le monde a besoin finira par se frayer un chemin, quelle que soit son origine." },
      { text: "Those who are happiest are those who do the most for others.", source: "Up from Slavery, ch. IV", fr: "Les plus heureux sont ceux qui font le plus pour les autres." },
      { text: "There is something in human nature which always makes an individual recognize and reward merit, no matter under what colour of skin merit is found.", source: "Up from Slavery, ch. X", fr: "Il y a dans la nature humaine quelque chose qui fait toujours reconnaître et récompenser le mérite, quelle que soit la couleur de peau de celui qui le porte." }
    ],
    ideas: {
      en: [
        "Start with the resources around you instead of waiting for better ones elsewhere.",
        "Give people real responsibility and tell them you trust them; it helps them grow.",
        "Ordinary tasks done with excellence earn respect.",
        "Measure progress by the obstacles overcome, not only by the title reached."
      ],
      fr: [
        "Commencez avec les ressources qui vous entourent au lieu d'attendre mieux ailleurs.",
        "Confiez de vraies responsabilités et dites que vous faites confiance : cela fait grandir.",
        "Des tâches ordinaires accomplies avec excellence inspirent le respect.",
        "Mesurez les progrès aux obstacles surmontés, pas seulement au poste atteint."
      ]
    },
    practice: {
      en: "This week, hand one team member a task you would usually keep, and tell them plainly that you trust them with it.",
      fr: "Cette semaine, confiez à un membre de l'équipe une tâche que vous gardez d'habitude, en lui disant clairement que vous lui faites confiance."
    },
    vids: []
  },
  {
    id: "emerson", name: "Ralph Waldo Emerson", kind: "classic",
    role: { en: "US essayist and poet (1803–1882). Essays, First Series, 1841", fr: "Essayiste et poète américain (1803–1882). Essais, première série, 1841" },
    theme: { en: "Self-reliance and conviction", fr: "Confiance en soi et conviction" },
    channel: pg(2944),
    quotes: [
      { text: "Trust thyself: every heart vibrates to that iron string.", source: "Self-Reliance", fr: "Aie confiance en toi : tout cœur vibre à cette corde de fer." },
      { text: "To be great is to be misunderstood.", source: "Self-Reliance", fr: "Être grand, c'est être incompris." },
      { text: "A foolish consistency is the hobgoblin of little minds, adored by little statesmen and philosophers and divines.", source: "Self-Reliance", fr: "Une cohérence bornée est le lutin des petits esprits, adorée des petits hommes d'État, philosophes et théologiens." },
      { text: "Insist on yourself; never imitate.", source: "Self-Reliance", fr: "Affirmez-vous ; n'imitez jamais." },
      { text: "Nothing can bring you peace but yourself.", source: "Self-Reliance", fr: "Rien ne peut vous apporter la paix, sinon vous-même." },
      { text: "What I must do is all that concerns me, not what the people think.", source: "Self-Reliance", fr: "Ce que je dois faire est tout ce qui me regarde, non ce que pensent les gens." },
      { text: "An institution is the lengthened shadow of one man.", source: "Self-Reliance", fr: "Une institution est l'ombre allongée d'un seul homme." },
      { text: "Whoso would be a man, must be a nonconformist.", source: "Self-Reliance", fr: "Qui veut être un homme doit être non conformiste." },
      { text: "Nothing great was ever achieved without enthusiasm.", source: "Circles", fr: "Rien de grand ne s'est jamais accompli sans enthousiasme." },
      { text: "The only reward of virtue is virtue; the only way to have a friend is to be one.", source: "Friendship", fr: "La seule récompense de la vertu est la vertu ; la seule façon d'avoir un ami est d'en être un." }
    ],
    ideas: {
      en: [
        "Trust your own considered judgement, even when it is unpopular.",
        "Changing your mind on new evidence is strength, not inconsistency.",
        "Find your own voice rather than copying another speaker's style.",
        "An organisation's culture reflects the habits of the people who lead it."
      ],
      fr: [
        "Faites confiance à votre jugement réfléchi, même quand il est impopulaire.",
        "Changer d'avis face à des faits nouveaux est une force, pas une incohérence.",
        "Trouvez votre propre voix au lieu de copier le style d'un autre orateur.",
        "La culture d'une organisation reflète les habitudes de ceux qui la dirigent."
      ]
    },
    practice: {
      en: "Write down one view you hold that your team may not share, and the evidence behind it. Decide whether to voice it.",
      fr: "Écrivez une opinion que votre équipe ne partage peut-être pas, et les éléments qui la fondent. Décidez si vous l'exprimerez."
    },
    vids: []
  },
  {
    id: "thoreau", name: "Henry David Thoreau", kind: "classic",
    role: { en: "US writer and naturalist (1817–1862). Walden, 1854", fr: "Écrivain et naturaliste américain (1817–1862). Walden, 1854" },
    theme: { en: "Simplicity and living deliberately", fr: "Simplicité et vie réfléchie" },
    channel: pg(205),
    quotes: [
      { text: "I went to the woods because I wished to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived.", source: "Walden, Where I Lived, and What I Lived For", fr: "Je suis allé dans les bois parce que je voulais vivre délibérément, n'affronter que les faits essentiels de la vie, voir si je pouvais apprendre ce qu'elle avait à enseigner, et ne pas découvrir, à l'heure de mourir, que je n'avais pas vécu." },
      { text: "If one advances confidently in the direction of his dreams, and endeavors to live the life which he has imagined, he will meet with a success unexpected in common hours.", source: "Walden, Conclusion", fr: "Si l'on avance avec confiance dans la direction de ses rêves et que l'on s'efforce de vivre la vie que l'on a imaginée, on rencontrera un succès inattendu." },
      { text: "Our life is frittered away by detail.", source: "Walden, Where I Lived, and What I Lived For", fr: "Notre vie se gaspille en détails." },
      { text: "Simplify, simplify.", source: "Walden, Where I Lived, and What I Lived For", fr: "Simplifiez, simplifiez." },
      { text: "The mass of men lead lives of quiet desperation.", source: "Walden, Economy", fr: "La plupart des hommes mènent une vie de tranquille désespoir." },
      { text: "Rather than love, than money, than fame, give me truth.", source: "Walden, Conclusion", fr: "Plutôt que l'amour, l'argent ou la gloire, donnez-moi la vérité." },
      { text: "If you have built castles in the air, your work need not be lost; that is where they should be. Now put the foundations under them.", source: "Walden, Conclusion", fr: "Si vous avez bâti des châteaux en l'air, votre travail n'est pas perdu : c'est là qu'ils doivent être. Mettez maintenant des fondations dessous." },
      { text: "Things do not change; we change.", source: "Walden, Conclusion", fr: "Les choses ne changent pas ; c'est nous qui changeons." },
      { text: "In proportion as he simplifies his life, the laws of the universe will appear less complex.", source: "Walden, Conclusion", fr: "À mesure qu'on simplifie sa vie, les lois de l'univers paraissent moins complexes." },
      { text: "We must learn to reawaken and keep ourselves awake, not by mechanical aids, but by an infinite expectation of the dawn.", source: "Walden, Where I Lived, and What I Lived For", fr: "Nous devons apprendre à nous réveiller et à rester éveillés, non par des moyens mécaniques, mais par une attente infinie de l'aube." }
    ],
    ideas: {
      en: [
        "Cut the detail that eats your time and keep what is essential.",
        "Big visions are fine, as long as you build foundations under them.",
        "Live and work deliberately rather than on autopilot.",
        "When the situation won't change, change your approach to it."
      ],
      fr: [
        "Supprimez les détails qui dévorent votre temps et gardez l'essentiel.",
        "Les grandes visions sont utiles, à condition de bâtir des fondations dessous.",
        "Vivez et travaillez de façon réfléchie plutôt qu'en pilote automatique.",
        "Quand la situation ne change pas, changez votre façon de l'aborder."
      ]
    },
    practice: {
      en: "List your recurring tasks and drop, delegate or shorten one of them this week.",
      fr: "Listez vos tâches récurrentes et supprimez, déléguez ou raccourcissez l'une d'elles cette semaine."
    },
    vids: []
  }
];
