// Word bank for the "Polish Your French" module, grouped by theme: false
// friends, connectors, formal register, email formulas, meetings and
// facilitation, leadership and communication, advanced words, expressions,
// proverbs, quotations, common mistakes and pronunciation. Definitions are
// [English, French]; entries and examples are in French. Pronunciation is in
// the International Phonetic Alphabet. An entry links to a video (v) only when
// that video's title names it. Quotations carry their source (by); proverbs
// of uncertain origin say so. Group keys start with "fr" so "learned" ticks
// never collide with the English word bank.
//
// Entry: { w, say?, d: [en, fr], ex (with the term in **bold**), tip?: [en, fr], care?: 1, v?, by? }

const GROUPS = [
  {
    k: "frFaux", theme: "errors", v: ["zyzP4zFq3uA"],
    t: ["False friends", "Faux amis"],
    i: ["French words that look like English words but mean something else.", "Des mots français qui ressemblent à des mots anglais mais ont un autre sens."],
    e: [
      { w: "actuellement", d: ["Currently, at present (not \"actually\", which is « en fait »).", "En ce moment, à présent (et non « en fait »)."], ex: "Le projet est **actuellement** en phase pilote dans trois régions." },
      { w: "éventuellement", d: ["Possibly, if need be (not \"eventually\", which is « finalement » or « à terme »).", "Peut-être, le cas échéant (et non « finalement »)."], ex: "Nous pourrons **éventuellement** prolonger la mission si le budget le permet." },
      { w: "assister à", d: ["To attend (« assister quelqu'un » means to help them).", "Être présent à (« assister quelqu'un » signifie l'aider)."], ex: "Douze partenaires vont **assister à** la réunion de lancement." },
      { w: "une formation", d: ["A training course (not a \"formation\").", "Un stage, un cours, un apprentissage."], ex: "Toute l'équipe suivra une **formation** sur la protection des données." },
      { w: "un délai", d: ["A time limit or deadline (a delay is « un retard »).", "Un temps accordé pour faire quelque chose ; une échéance (≠ retard)."], ex: "Le **délai** de dépôt des candidatures est fixé au 15 mars.", tip: ["« Dans les meilleurs délais » means as soon as possible.", "« Dans les meilleurs délais » signifie le plus tôt possible."] },
      { w: "un agenda", d: ["A diary or planner (a meeting agenda is « l'ordre du jour »).", "Un carnet de rendez-vous (l'agenda d'une réunion se dit « ordre du jour »)."], ex: "Je note la date dans mon **agenda** et je vous envoie l'ordre du jour." },
      { w: "sensible", d: ["Sensitive (\"sensible\" in English is « raisonnable » or « sensé »).", "Qui réagit facilement ; délicat (≠ raisonnable)."], ex: "Ce sujet est **sensible** : abordons-le en petit comité." },
      { w: "prétendre", d: ["To claim (to pretend is « faire semblant »).", "Affirmer, soutenir (≠ faire semblant)."], ex: "Le rapport **prétend** que les objectifs sont atteints ; vérifions les données." },
      { w: "définitivement", d: ["Permanently, for good (\"definitely\" is « certainement » or « sans aucun doute »).", "Pour toujours, de façon définitive (≠ certainement)."], ex: "Le bureau de terrain a fermé **définitivement** en juin." },
      { w: "achever", d: ["To finish, complete (to achieve is « atteindre » or « réaliser »).", "Terminer (≠ atteindre un objectif)."], ex: "Nous devons **achever** la collecte des données avant la fin du mois." },
      { w: "supporter", d: ["To bear, tolerate (to support is « soutenir »).", "Endurer, tolérer (≠ soutenir)."], ex: "L'équipe a dû **supporter** des conditions difficiles pendant la mission." },
      { w: "une librairie", d: ["A bookshop (a library is « une bibliothèque »).", "Un magasin de livres (≠ bibliothèque)."], ex: "Vous trouverez le guide dans toutes les **librairies** de la ville." }
    ]
  },
  {
    k: "frConnect", theme: "writing", v: ["evgNfvtVWsI", "ZLhwIjpssyM"],
    t: ["Logical connectors", "Connecteurs logiques"],
    i: ["The words that structure an argument in a note, a report or a speech.", "Les mots qui structurent une argumentation dans une note, un rapport ou une intervention."],
    e: [
      { w: "en effet", v: "ZLhwIjpssyM", d: ["Indeed: confirms or explains what was just said (not \"in fact\").", "Confirme ou explique ce qui précède (≠ « en fait »)."], ex: "Le taux de réponse a augmenté. **En effet**, les relances par SMS ont été efficaces." },
      { w: "en fait", v: "Q8ZcL-232rU", d: ["Actually, in fact: corrects or nuances what was said.", "Introduit une correction ou une précision."], ex: "On pensait que la réunion était lundi ; **en fait**, elle a lieu mardi." },
      { w: "en revanche", d: ["On the other hand: introduces a contrast.", "Introduit une opposition."], ex: "Le volet santé avance bien ; **en revanche**, le volet éducation prend du retard." },
      { w: "toutefois", d: ["However: a formal way to introduce a reservation.", "Introduit une réserve, dans un registre soutenu."], ex: "Les résultats sont encourageants ; **toutefois**, l'échantillon reste limité." },
      { w: "néanmoins", d: ["Nevertheless: despite what was just said.", "Malgré ce qui vient d'être dit."], ex: "Le budget est serré ; nous maintiendrons **néanmoins** les trois ateliers." },
      { w: "par conséquent", d: ["Consequently, therefore.", "Introduit une conséquence."], ex: "Les données arrivent en retard ; **par conséquent**, le rapport sera publié en mai." },
      { w: "en outre", d: ["Furthermore, in addition (formal).", "De plus (registre soutenu)."], ex: "Le projet a formé 200 enseignants ; il a **en outre** équipé dix écoles." },
      { w: "d'ailleurs", d: ["Besides, moreover: adds a supporting point.", "Ajoute un argument qui renforce le précédent."], ex: "Cette approche est efficace ; elle est **d'ailleurs** recommandée par le ministère." },
      { w: "or", d: ["Yet, now: introduces a fact that changes the reasoning.", "Introduit un fait qui fait rebondir le raisonnement."], ex: "Le plan suppose une hausse du budget. **Or**, les financements sont gelés.", tip: ["Not to be confused with « ou » (or).", "À ne pas confondre avec « ou »."] },
      { w: "certes… mais", d: ["Admittedly… but: concedes a point before contradicting it.", "Concède un point avant de le nuancer."], ex: "**Certes**, le calendrier est ambitieux, **mais** il reste réaliste." },
      { w: "ainsi", d: ["Thus, in this way: gives a result or an example.", "Introduit une conséquence ou un exemple."], ex: "Les équipes ont été formées ; **ainsi**, elles peuvent assurer le suivi seules." },
      { w: "à cet égard", d: ["In this respect, on this point (formal).", "Sur ce point, à ce sujet (registre soutenu)."], ex: "La sécurité des données est prioritaire ; **à cet égard**, un audit est prévu." }
    ]
  },
  {
    k: "frRegistre", theme: "writing", v: ["3LG8SwY7B5w", "Hm3bPVgcdb8"],
    t: ["From everyday to formal", "Du courant au soutenu"],
    i: ["Formal equivalents of everyday words, for notes, letters and official meetings.", "Des équivalents soutenus de mots courants, pour les notes, les lettres et les réunions officielles."],
    e: [
      { w: "effectuer", d: ["Formal for « faire »: to carry out.", "Soutenu pour « faire »."], ex: "La mission a **effectué** trois visites de terrain." },
      { w: "solliciter", d: ["Formal for « demander »: to request.", "Soutenu pour « demander »."], ex: "Je me permets de **solliciter** un entretien." },
      { w: "procéder à", d: ["Formal for « faire » or « mener »: to carry out a step.", "Soutenu pour « faire », « mener »."], ex: "Nous allons **procéder à** l'évaluation des candidatures." },
      { w: "s'avérer", d: ["To prove to be, turn out.", "Se révéler, apparaître finalement."], ex: "La solution **s'est avérée** plus coûteuse que prévu." },
      { w: "convenir de", d: ["To agree on.", "Se mettre d'accord sur."], ex: "Nous avons **convenu d'**une nouvelle date." },
      { w: "faire part de", d: ["Formal for « dire » or « informer de »: to inform of.", "Soutenu pour « informer de »."], ex: "Je vous **fais part de** nos observations." },
      { w: "être en mesure de", d: ["Formal for « pouvoir »: to be able to.", "Soutenu pour « pouvoir »."], ex: "Nous **sommes en mesure de** livrer le rapport vendredi." },
      { w: "mettre en œuvre", d: ["To implement.", "Appliquer, réaliser."], ex: "Le ministère va **mettre en œuvre** la nouvelle stratégie." },
      { w: "à l'issue de", d: ["At the end of, following.", "À la fin de."], ex: "**À l'issue de** la réunion, un relevé de décisions sera diffusé." },
      { w: "s'enquérir de", d: ["To inquire about (formal).", "Se renseigner sur (soutenu)."], ex: "Le directeur **s'est enquis de** l'avancement des travaux." },
      { w: "requérir", d: ["To require, call for (formal).", "Demander, exiger (soutenu)."], ex: "Cette décision **requiert** l'accord du conseil." },
      { w: "nous (au lieu de « on »)", d: ["Use « nous » rather than « on » in formal writing and speech.", "Employez « nous » plutôt que « on » à l'écrit et à l'oral soutenus."], ex: "**Nous** proposons de reporter l'atelier." }
    ]
  },
  {
    k: "frCourriel", theme: "writing", v: ["lbfHJrlB3QA", "lKPvnJ4lXOk"],
    t: ["Email and letter formulas", "Formules de courriel et de lettre"],
    i: ["Set phrases that open, carry and close a professional message.", "Les tournures consacrées pour ouvrir, développer et conclure un message professionnel."],
    e: [
      { w: "Madame, Monsieur,", d: ["Formal opening when you do not know the recipient's name.", "Formule d'appel quand on ne connaît pas le nom du destinataire."], ex: "**Madame, Monsieur,** Je vous écris au sujet de l'appel à projets." },
      { w: "Je me permets de", d: ["A polite way to introduce a request or initiative.", "Introduit poliment une demande ou une démarche."], ex: "**Je me permets de** vous relancer au sujet de notre demande." },
      { w: "à la suite de", d: ["Following (preferred to « suite à » in careful writing).", "Après, en conséquence de (préférable à « suite à » dans un écrit soigné)."], ex: "**À la suite de** notre entretien, je vous adresse le compte rendu.", tip: ["« Suite à » is common in administrative French but criticised by many style guides.", "« Suite à » est courant dans la langue administrative mais critiqué par de nombreux guides de style."] },
      { w: "Veuillez trouver ci-joint", d: ["Please find attached.", "Formule pour signaler une pièce jointe."], ex: "**Veuillez trouver ci-joint** le rapport annuel." },
      { w: "Je vous serais reconnaissant de bien vouloir", d: ["A courteous way to make a request.", "Formule courtoise pour formuler une demande."], ex: "**Je vous serais reconnaissant de bien vouloir** me transmettre les données." },
      { w: "Je reste à votre disposition", d: ["I remain available (for any further information).", "Je reste disponible (pour tout complément)."], ex: "**Je reste à votre disposition** pour tout complément d'information." },
      { w: "Dans l'attente de votre retour", d: ["Looking forward to your reply.", "En attendant votre réponse."], ex: "**Dans l'attente de votre retour**, je vous prie d'agréer mes salutations distinguées." },
      { w: "Pour rappel", d: ["As a reminder.", "Pour mémoire."], ex: "**Pour rappel**, la réunion débutera à 9 heures." },
      { w: "Bien cordialement", d: ["Kind regards: friendly but professional.", "Formule de fin cordiale et professionnelle."], ex: "Merci pour votre aide. **Bien cordialement**, Awa" },
      { w: "Je vous prie d'agréer l'expression de mes salutations distinguées", d: ["Formal closing for a letter to someone you do not know well.", "Formule de politesse soutenue pour une lettre officielle."], ex: "**Je vous prie d'agréer, Madame, l'expression de mes salutations distinguées.**", tip: ["To a senior official, « l'expression de ma haute considération ».", "Envers une haute autorité : « l'expression de ma haute considération »."] },
      { w: "Je vous saurais gré de", d: ["I would be grateful if you would (very formal).", "Je vous serais reconnaissant de (très soutenu)."], ex: "**Je vous saurais gré de** bien vouloir confirmer votre présence.", tip: ["« Saurais » (from savoir gré), not « serais ».", "« Saurais » (de savoir gré), et non « serais »."] }
    ]
  },
  {
    k: "frReunion", theme: "vocab", v: ["otolVUVBETg"],
    t: ["Meetings and facilitation", "Réunions et facilitation"],
    i: ["The vocabulary for preparing, chairing and following up a meeting or workshop.", "Le vocabulaire pour préparer, animer et assurer le suivi d'une réunion ou d'un atelier."],
    e: [
      { w: "l'ordre du jour", d: ["The meeting agenda.", "La liste des points à traiter en réunion."], ex: "Trois points sont inscrits à **l'ordre du jour**." },
      { w: "animer une réunion", d: ["To chair or facilitate a meeting.", "Conduire les échanges d'une réunion."], ex: "Fatou va **animer la réunion** de coordination." },
      { w: "le tour de table", d: ["A round in which each participant speaks in turn.", "Chaque participant prend la parole à son tour."], ex: "Commençons par un **tour de table** pour nous présenter." },
      { w: "donner la parole", d: ["To give someone the floor.", "Inviter quelqu'un à parler."], ex: "Je **donne la parole** à la représentante du ministère." },
      { w: "prendre la parole", d: ["To take the floor, speak.", "Intervenir, parler en public."], ex: "Elle a **pris la parole** au nom des partenaires." },
      { w: "reformuler", d: ["To restate in other words, to check understanding.", "Redire autrement pour vérifier la compréhension."], ex: "Si je **reformule**, vous proposez de reporter la phase deux ?" },
      { w: "recadrer le débat", d: ["To bring a discussion back to its purpose.", "Ramener la discussion à son objet."], ex: "Le facilitateur a **recadré le débat** sur les priorités.", tip: ["« Recadrer quelqu'un » also means to call someone to order.", "« Recadrer quelqu'un » signifie aussi le rappeler à l'ordre."] },
      { w: "faire le point", d: ["To review where things stand.", "Dresser un état de la situation."], ex: "**Faisons le point** sur les engagements pris en janvier." },
      { w: "synthétiser", d: ["To summarise the main points.", "Résumer l'essentiel."], ex: "Avant de conclure, je vais **synthétiser** nos échanges." },
      { w: "trancher", d: ["To decide between options.", "Prendre une décision entre plusieurs options."], ex: "Il revient au comité de **trancher**." },
      { w: "le compte rendu", d: ["The minutes or report of a meeting.", "Le résumé écrit d'une réunion."], ex: "Le **compte rendu** sera diffusé sous 48 heures." },
      { w: "le relevé de décisions", d: ["A record of decisions and actions only.", "La liste des décisions et des actions, sans le détail des échanges."], ex: "Un **relevé de décisions** suffit pour cette réunion." },
      { w: "les points divers", d: ["Any other business, at the end of the agenda.", "Les questions traitées en fin d'ordre du jour."], ex: "Avez-vous des **points divers** ?" },
      { w: "une activité brise-glace", d: ["An icebreaker activity.", "Une activité pour détendre l'atmosphère en début de séance."], ex: "L'atelier commence par une **activité brise-glace** de dix minutes." }
    ]
  },
  {
    k: "frLeader", theme: "vocab",
    t: ["Leadership and communication", "Leadership et communication"],
    i: ["Verbs and nouns French-speaking organisations use about leading people and projects.", "Les verbes et noms qu'emploient les organisations francophones pour parler de la conduite des équipes et des projets."],
    e: [
      { w: "fédérer", d: ["To unite people around a shared goal.", "Rassembler autour d'un objectif commun."], ex: "La nouvelle directrice a su **fédérer** les partenaires autour du plan." },
      { w: "piloter", d: ["To steer or manage a project.", "Diriger, conduire un projet."], ex: "Il **pilote** le programme dans quatre pays." },
      { w: "impulser", d: ["To drive, give impetus to.", "Donner l'élan, lancer une dynamique."], ex: "Le comité doit **impulser** la réforme." },
      { w: "déléguer", d: ["To entrust a task or authority to someone.", "Confier une tâche ou un pouvoir à quelqu'un."], ex: "Apprenez à **déléguer** pour vous concentrer sur l'essentiel." },
      { w: "responsabiliser", d: ["To give people responsibility and accountability.", "Rendre quelqu'un responsable, lui donner de l'autonomie."], ex: "Elle **responsabilise** chaque membre de l'équipe." },
      { w: "rendre compte", d: ["To report on, be accountable for.", "Informer de ce qu'on a fait ; rendre des comptes."], ex: "Nous **rendons compte** au conseil chaque trimestre." },
      { w: "arbitrer", d: ["To decide between competing demands.", "Trancher entre des demandes concurrentes."], ex: "La direction a dû **arbitrer** entre deux projets." },
      { w: "mobiliser", d: ["To rally people or resources.", "Rassembler des personnes ou des moyens."], ex: "Il faut **mobiliser** les communautés dès le début." },
      { w: "porter un projet", d: ["To champion and carry a project.", "Défendre et faire avancer un projet."], ex: "C'est elle qui **porte le projet** depuis trois ans." },
      { w: "prendre du recul", d: ["To step back and see the bigger picture.", "Se détacher pour mieux juger une situation."], ex: "Avant de répondre, **prenons du recul**." },
      { w: "l'écoute active", d: ["Active listening.", "Une écoute attentive qui vérifie la compréhension."], ex: "L'**écoute active** apaise souvent les tensions en réunion." },
      { w: "la bienveillance", d: ["Goodwill, kindness towards others.", "Disposition favorable envers les autres."], ex: "Elle donne ses retours avec **bienveillance** et précision." }
    ]
  },
  {
    k: "frAvance", theme: "vocab", v: ["g5IN5B4gGIc"],
    t: ["Advanced words", "Dictionnaire des mots avancés"],
    i: ["Precise, formal words that raise the level of a note or a speech.", "Des mots précis et soutenus qui élèvent le niveau d'une note ou d'une intervention."],
    e: [
      { w: "pérenniser", d: ["To make lasting, sustain.", "Rendre durable."], ex: "Comment **pérenniser** les acquis après la fin du financement ?" },
      { w: "pallier", d: ["To make up for, remedy (takes a direct object).", "Compenser, remédier à (verbe transitif direct)."], ex: "Des formations sont prévues pour **pallier** le manque de personnel.", tip: ["« Pallier un manque », not « pallier à un manque ».", "« Pallier un manque », et non « pallier à un manque »."] },
      { w: "étayer", d: ["To support (an argument) with evidence.", "Appuyer par des preuves."], ex: "Merci d'**étayer** cette recommandation avec des données." },
      { w: "corroborer", d: ["To confirm, back up.", "Confirmer, appuyer."], ex: "Les visites de terrain **corroborent** les résultats de l'enquête." },
      { w: "entériner", d: ["To ratify, formally approve.", "Approuver officiellement."], ex: "Le conseil a **entériné** le budget révisé." },
      { w: "préconiser", d: ["To recommend.", "Recommander."], ex: "L'évaluation **préconise** un suivi trimestriel." },
      { w: "appréhender", d: ["To grasp, understand; also to dread.", "Comprendre, saisir ; aussi redouter."], ex: "Il faut **appréhender** le problème dans sa globalité." },
      { w: "endiguer", d: ["To contain, stem.", "Contenir, freiner."], ex: "Des mesures ont été prises pour **endiguer** l'épidémie." },
      { w: "dorénavant", v: "UyMx93bKbQc", d: ["From now on.", "À partir de maintenant."], ex: "**Dorénavant**, les rapports seront soumis en ligne." },
      { w: "idoine", d: ["Appropriate, suitable (formal).", "Approprié (soutenu)."], ex: "Nous chercherons la solution **idoine**." },
      { w: "prépondérant", d: ["Predominant, decisive.", "Qui a le plus de poids."], ex: "Le rôle des communautés est **prépondérant**." },
      { w: "tributaire de", d: ["Dependent on.", "Qui dépend de."], ex: "Le calendrier est **tributaire des** financements." },
      { w: "inhérent à", d: ["Inherent in.", "Qui appartient par nature à."], ex: "Ces risques sont **inhérents à** tout projet pilote." },
      { w: "incontournable", d: ["Unavoidable, essential.", "Qu'on ne peut ignorer ; essentiel."], ex: "Ce partenaire est devenu **incontournable** dans la région." }
    ]
  },
  {
    k: "frExpr", theme: "expressions", v: ["n1J4BMWJ-wc"],
    t: ["Idiomatic expressions", "Expressions idiomatiques"],
    i: ["Expressions that make your French sound natural. Those marked \"use with care\" are informal.", "Des expressions qui rendent votre français naturel. Celles marquées « avec prudence » sont familières."],
    e: [
      { w: "avoir du pain sur la planche", d: ["To have a lot of work ahead.", "Avoir beaucoup de travail à faire."], ex: "Avec trois rapports à rendre, nous **avons du pain sur la planche**." },
      { w: "mettre la main à la pâte", d: ["To pitch in, take part in the work.", "Participer concrètement au travail."], ex: "Toute la direction a **mis la main à la pâte** pour l'événement." },
      { w: "prendre le taureau par les cornes", d: ["To tackle a problem head-on.", "Affronter une difficulté avec détermination."], ex: "Elle a **pris le taureau par les cornes** et réglé le conflit." },
      { w: "mettre les points sur les i", v: "2ot-qFvvDlo", d: ["To make things perfectly clear, firmly.", "Préciser les choses sans ambiguïté, avec fermeté."], ex: "Le directeur a **mis les points sur les i** à propos des délais." },
      { w: "revenons à nos moutons", d: ["Let's get back to the point.", "Revenons au sujet."], ex: "Bon, **revenons à nos moutons** : le budget." },
      { w: "être dans le même bateau", d: ["To be in the same situation.", "Partager la même situation."], ex: "Partenaires et ministère, nous **sommes dans le même bateau**." },
      { w: "couper la poire en deux", d: ["To split the difference, compromise.", "Faire un compromis."], ex: "Pour la date, **coupons la poire en deux** : mi-mai." },
      { w: "faire d'une pierre deux coups", d: ["To kill two birds with one stone.", "Obtenir deux résultats par une seule action."], ex: "En combinant les deux missions, nous **faisons d'une pierre deux coups**." },
      { w: "tourner autour du pot", v: "JqEySTmG_IY", d: ["To beat around the bush.", "Ne pas aller droit au but."], ex: "Ne **tournons pas autour du pot** : le projet a pris du retard." },
      { w: "au pied levé", d: ["At short notice, without preparation.", "Sans préparation, à l'improviste."], ex: "Il a remplacé l'oratrice **au pied levé**." },
      { w: "tirer son épingle du jeu", d: ["To come out well from a difficult situation.", "Se sortir habilement d'une situation difficile."], ex: "Malgré la crise, l'organisation a **tiré son épingle du jeu**." },
      { w: "c'est la croix et la bannière", care: 1, d: ["It's a real hassle (informal).", "C'est très compliqué (familier)."], ex: "Obtenir un visa, **c'est la croix et la bannière**." }
    ]
  },
  {
    k: "frProverbes", theme: "expressions",
    t: ["Proverbs", "Proverbes"],
    i: ["Proverbs useful in leadership and communication, with their meaning.", "Des proverbes utiles en leadership et en communication, avec leur sens."],
    e: [
      { w: "Les paroles s'envolent, les écrits restent.", d: ["Spoken words are forgotten; written words remain (from the Latin verba volant, scripta manent).", "Ce qui est dit s'oublie, ce qui est écrit demeure (du latin verba volant, scripta manent)."], ex: "Confirmez l'accord par courriel : **les paroles s'envolent, les écrits restent.**" },
      { w: "Qui ne dit mot consent.", d: ["Silence means consent.", "Se taire, c'est accepter."], ex: "Personne ne s'oppose ? **Qui ne dit mot consent** : la proposition est adoptée." },
      { w: "La nuit porte conseil.", d: ["Sleep on it before deciding.", "Mieux vaut attendre le lendemain avant de décider."], ex: "Ne répondez pas ce soir : **la nuit porte conseil.**" },
      { w: "Il faut tourner sept fois sa langue dans sa bouche avant de parler.", d: ["Think carefully before you speak.", "Il faut réfléchir avant de parler."], ex: "En négociation, **il faut tourner sept fois sa langue dans sa bouche avant de parler.**" },
      { w: "L'union fait la force.", d: ["Unity is strength (the motto of Belgium and Haiti).", "L'unité rend fort (devise de la Belgique et d'Haïti)."], ex: "Face au bailleur, présentons une position commune : **l'union fait la force.**" },
      { w: "C'est en forgeant qu'on devient forgeron.", d: ["Practice makes perfect.", "C'est par la pratique qu'on apprend."], ex: "Vous animerez la prochaine réunion : **c'est en forgeant qu'on devient forgeron.**" },
      { w: "Petit à petit, l'oiseau fait son nid.", d: ["Step by step, patient effort succeeds.", "Avec de la patience, on arrive à ses fins."], ex: "Trois écoles cette année, dix l'an prochain : **petit à petit, l'oiseau fait son nid.**" },
      { w: "Il ne faut pas vendre la peau de l'ours avant de l'avoir tué.", d: ["Don't count your chickens before they hatch.", "Il ne faut pas se réjouir d'un succès avant qu'il soit acquis."], ex: "Le financement n'est pas signé : **il ne faut pas vendre la peau de l'ours avant de l'avoir tué.**" },
      { w: "Mieux vaut prévenir que guérir.", d: ["Prevention is better than cure.", "Il vaut mieux éviter un problème que devoir le réparer."], ex: "Vérifions les contrats maintenant : **mieux vaut prévenir que guérir.**" },
      { w: "Chacun voit midi à sa porte.", d: ["Everyone sees things from their own point of view.", "Chacun juge selon son propre intérêt ou point de vue."], ex: "Chaque service défend sa priorité ; **chacun voit midi à sa porte.**" },
      { w: "Le bâton a beau séjourner dans l'eau, il ne se transformera jamais en caïman.", d: ["You cannot change your true nature (a West African proverb, quoted in several versions).", "On ne change pas sa nature profonde (proverbe d'Afrique de l'Ouest, cité sous plusieurs formes)."], ex: "Il a changé de poste, mais pas de méthode : **le bâton a beau séjourner dans l'eau, il ne se transformera jamais en caïman.**" },
      { w: "Si tu veux aller vite, marche seul ; si tu veux aller loin, marchons ensemble.", d: ["Speed comes alone; lasting results come together (often described as African; origin uncertain).", "Seul, on va vite ; ensemble, on va loin (souvent présenté comme africain ; origine incertaine)."], ex: "Associons les ministères dès le départ : **si tu veux aller vite, marche seul ; si tu veux aller loin, marchons ensemble.**" }
    ]
  },
  {
    k: "frCitations", theme: "culture",
    t: ["Quotations on leadership and communication", "Citations sur le leadership et la communication"],
    i: ["Verified quotations from French and francophone authors, with their source.", "Des citations vérifiées d'auteurs français et francophones, avec leur source."],
    e: [
      { w: "Ce que l'on conçoit bien s'énonce clairement, et les mots pour le dire arrivent aisément.", by: "Nicolas Boileau, L'Art poétique, chant I (1674)", d: ["Clear thinking produces clear speech.", "Une pensée claire produit un discours clair."], ex: "Avant de rédiger, clarifiez votre message : **ce que l'on conçoit bien s'énonce clairement.**" },
      { w: "Je n'ai fait celle-ci plus longue que parce que je n'ai pas eu le loisir de la faire plus courte.", by: "Blaise Pascal, Les Provinciales, lettre XVI (1656)", d: ["Brevity takes time and effort.", "Faire court demande du temps et du travail."], ex: "Votre note fait dix pages ? Pascal l'avait dit : « **Je n'ai fait celle-ci plus longue que parce que je n'ai pas eu le loisir de la faire plus courte.** »" },
      { w: "Mal nommer un objet, c'est ajouter au malheur de ce monde.", by: "Albert Camus, « Sur une philosophie de l'expression », Poésie 44 (1944)", d: ["Imprecise words create confusion and harm.", "Les mots imprécis créent confusion et tort."], ex: "Choisissons nos termes avec soin : **mal nommer un objet, c'est ajouter au malheur de ce monde.**", tip: ["Often quoted as « Mal nommer les choses, c'est ajouter au malheur du monde ».", "Souvent citée sous la forme « Mal nommer les choses, c'est ajouter au malheur du monde »."] },
      { w: "Être homme, c'est précisément être responsable.", by: "Antoine de Saint-Exupéry, Terre des hommes (1939)", d: ["Responsibility is at the heart of being human.", "La responsabilité est au cœur de la condition humaine."], ex: "Pour lui, diriger commence par cette idée : « **Être homme, c'est précisément être responsable.** »" },
      { w: "On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux.", by: "Antoine de Saint-Exupéry, Le Petit Prince, chapitre XXI (1943)", d: ["What matters most cannot be measured at a glance.", "Ce qui compte le plus ne se voit pas au premier regard."], ex: "Les indicateurs ne disent pas tout : « **On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux.** »" },
      { w: "Rien ne sert de courir ; il faut partir à point.", by: "Jean de La Fontaine, « Le Lièvre et la Tortue », Fables (1668)", d: ["Starting on time matters more than rushing.", "Mieux vaut commencer à temps que se précipiter."], ex: "Lançons la préparation dès maintenant : **rien ne sert de courir ; il faut partir à point.**" },
      { w: "On a souvent besoin d'un plus petit que soi.", by: "Jean de La Fontaine, « Le Lion et le Rat », Fables (1668)", d: ["Everyone, however powerful, may need help from others.", "Même les puissants ont besoin des autres."], ex: "Le ministère a sollicité l'appui des associations locales : **on a souvent besoin d'un plus petit que soi.**" },
      { w: "Le bon sens est la chose du monde la mieux partagée.", by: "René Descartes, Discours de la méthode (1637)", d: ["Everyone has good sense; what differs is how we use it.", "Chacun a du bon sens ; ce qui diffère, c'est l'usage qu'on en fait."], ex: "Écoutons aussi le terrain : **le bon sens est la chose du monde la mieux partagée.**" },
      { w: "Le mieux est l'ennemi du bien.", by: "Voltaire, « La Bégueule » (1772), reprenant un proverbe italien", d: ["Chasing perfection can spoil what is already good.", "Chercher la perfection peut gâcher ce qui est déjà bien."], ex: "Le rapport est prêt ; ne le retouchons plus : **le mieux est l'ennemi du bien.**" },
      { w: "Plutôt la tête bien faite que bien pleine.", by: "D'après Michel de Montaigne, Essais, livre I, chapitre 26 (1580)", d: ["A well-trained mind matters more than a mind full of facts.", "Mieux vaut savoir réfléchir qu'accumuler des connaissances."], ex: "Dans nos formations, préférons **plutôt la tête bien faite que bien pleine.**", tip: ["Often quoted as « Mieux vaut une tête bien faite que bien pleine ».", "Souvent citée sous la forme « Mieux vaut une tête bien faite que bien pleine »."] },
      { w: "En Afrique, quand un vieillard meurt, c'est une bibliothèque qui brûle.", by: "Amadou Hampâté Bâ, attribuée ; liée à son discours à l'UNESCO de 1960 (la formulation varie)", d: ["Elders' knowledge must be passed on before it is lost.", "Le savoir des aînés doit être transmis avant d'être perdu."], ex: "Documentons l'expérience des anciens du programme : « **En Afrique, quand un vieillard meurt, c'est une bibliothèque qui brûle.** »" }
    ]
  },
  {
    k: "frFautes", theme: "errors", v: ["tWY43ko_VJs", "unVsmRkramQ"],
    t: ["Common mistakes", "Fautes fréquentes"],
    i: ["Errors that learners and native speakers make in professional French.", "Des fautes que font les apprenants comme les francophones en français professionnel."],
    e: [
      { w: "après que + indicatif", d: ["« Après que » takes the indicative, not the subjunctive.", "« Après que » se construit avec l'indicatif, et non le subjonctif."], ex: "**Après que** le comité **a validé** le budget, nous lancerons l'appel." },
      { w: "bien que (et non « malgré que »)", d: ["Use « bien que » + subjunctive; « malgré que » is criticised.", "Employez « bien que » + subjonctif ; « malgré que » est critiqué."], ex: "**Bien que** les délais **soient** courts, l'équipe a tenu ses engagements." },
      { w: "se rappeler quelque chose", v: "JUpvjvgim8g", d: ["« Se rappeler » takes a direct object; « se souvenir de » takes « de ».", "« Se rappeler » est transitif direct ; « se souvenir » se construit avec « de »."], ex: "Je **me rappelle** cette réunion ; je **me souviens de** ses conclusions." },
      { w: "quant à", v: "Wq6YHaikKCc", d: ["As for (not « tant qu'à » or « quand à »).", "En ce qui concerne (et non « tant qu'à » ni « quand à »)."], ex: "**Quant à** la date, elle reste à confirmer." },
      { w: "merci de / merci pour", v: "Y6IW-rWWU5c", d: ["« Merci de » + infinitive; « merci pour » or « merci de » + noun.", "« Merci de » + infinitif ; « merci pour » ou « merci de » + nom."], ex: "**Merci de** confirmer votre présence et **merci pour** votre réponse rapide." },
      { w: "aujourd'hui (et non « au jour d'aujourd'hui »)", d: ["« Au jour d'aujourd'hui » is a redundancy; say « aujourd'hui » or « à ce jour ».", "« Au jour d'aujourd'hui » est un pléonasme ; dites « aujourd'hui » ou « à ce jour »."], ex: "**À ce jour**, 80 % des écoles ont reçu le matériel." },
      { w: "important (et non « conséquent »)", d: ["« Conséquent » means consistent; for \"large\", say « important » or « considérable ».", "« Conséquent » signifie cohérent ; pour « grand », dites « important » ou « considérable »."], ex: "Le projet a reçu un financement **important**." },
      { w: "résoudre (plutôt que « solutionner »)", d: ["« Résoudre » is preferred to « solutionner » in careful French.", "« Résoudre » est préféré à « solutionner » dans un français soigné."], ex: "Nous devons **résoudre** ce problème avant la mission." },
      { w: "je vous prie de m'excuser", v: "yE2rd7knKSo", d: ["A careful way to apologise; « je m'excuse » is common but criticised by purists.", "Une façon soignée de s'excuser ; « je m'excuse » est courant mais critiqué par les puristes."], ex: "**Je vous prie de m'excuser** pour ce retard." },
      { w: "de manière que (plutôt que « de manière à ce que »)", d: ["« De manière que » or « de sorte que » are preferred in careful writing.", "« De manière que » ou « de sorte que » sont préférés à l'écrit soigné."], ex: "Organisons la salle **de manière que** chacun voie l'écran." },
      { w: "en matière de (plutôt que « au niveau de »)", d: ["Avoid the overused « au niveau de » when you mean \"regarding\".", "Évitez « au niveau de », trop employé, quand vous voulez dire « concernant »."], ex: "**En matière de** santé, les indicateurs progressent." },
      { w: "un délai (et non « un retard ») pour une échéance", d: ["A deadline is « un délai » or « une échéance »; « un retard » is a delay.", "Une date limite se dit « délai » ou « échéance » ; « retard » signifie être en retard."], ex: "Le **délai** est court, mais nous n'avons pas de **retard**." }
    ]
  },
  {
    k: "frPron", theme: "pronunciation", v: ["rmJdERjlEa8", "qeTlUTYYyys"],
    t: ["Sounds and liaisons", "Sons et liaisons"],
    i: ["Sounds, liaisons and words that are often mispronounced, in phonetic notation.", "Sons, liaisons et mots souvent mal prononcés, en notation phonétique."],
    e: [
      { w: "les enfants", say: "[lezɑ̃fɑ̃]", v: "rmJdERjlEa8", d: ["Liaison after a determiner is obligatory.", "La liaison après un déterminant est obligatoire."], ex: "**Les enfants** du quartier participent au programme." },
      { w: "et un ami", say: "[e œ̃nami]", d: ["Never make a liaison after « et ».", "On ne fait jamais la liaison après « et »."], ex: "Elle est venue avec sa collègue **et un ami**." },
      { w: "les héros / les hommes", say: "[le eʁo] / [lezɔm]", v: "qeTlUTYYyys", d: ["No liaison before an aspirated h; liaison before a silent h.", "Pas de liaison devant un h aspiré ; liaison devant un h muet."], ex: "**Les héros** du jour sont **les hommes** et les femmes du terrain." },
      { w: "rue / roue", say: "[ʁy] / [ʁu]", v: "-sJmce-keso", d: ["The French u and ou are different sounds; mixing them changes the word.", "Le u et le ou sont deux sons distincts ; les confondre change le mot."], ex: "La **rue** est fermée : une **roue** du camion s'est cassée." },
      { w: "le r français", say: "[ʁ]", v: "q5WjHCp4ueM", d: ["Pronounced at the back of the throat, not rolled or as in English.", "Prononcé au fond de la gorge, ni roulé ni à l'anglaise."], ex: "Répétez lentement : « **rapport**, **résultat**, **recommandation** »." },
      { w: "plus", say: "[ply] / [plys]", v: "hGPqRSGnlgU", d: ["Silent s in « ne… plus » (no more); pronounced s when it means more or plus.", "S muet dans « ne… plus » ; s prononcé quand il signifie « davantage » ou l'addition."], ex: "Je n'en veux **plus** [ply] ; il en faut **plus** [plys]." },
      { w: "un fait / il fait", say: "[fɛt] / [fɛ]", v: "AtDC5Yl0zLM", d: ["The t of the noun « fait » is often pronounced; the t of the verb never is.", "Le t du nom « fait » est souvent prononcé ; celui du verbe jamais."], ex: "C'est **un fait** [fɛt] : **il fait** [fɛ] tout pour réussir." },
      { w: "monsieur", say: "[məsjø]", d: ["The first syllable sounds like « me », not « mon ».", "La première syllabe se prononce « me », pas « mon »."], ex: "Bonjour **monsieur** le Directeur." },
      { w: "femme", say: "[fam]", d: ["Pronounced like « fam », not « fem ».", "Se prononce « fam », pas « fème »."], ex: "Une **femme** sur deux a répondu à l'enquête." },
      { w: "second", say: "[səɡɔ̃]", d: ["The c is pronounced like g.", "Le c se prononce comme un g."], ex: "Le **second** semestre commence en juillet." },
      { w: "fils", say: "[fis]", d: ["The l is silent and the s is pronounced.", "Le l est muet et le s se prononce."], ex: "Son **fils** étudie à Dakar." },
      { w: "deux cents écoles", say: "[døsɑ̃zekɔl]", d: ["« Cents » takes a liaison in z before a vowel.", "« Cents » se lie en z devant une voyelle."], ex: "Le programme couvre **deux cents écoles**." }
    ]
  }
];

export default GROUPS;
