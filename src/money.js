// "Money & financial freedom" skill module (Personal Development tab), shown
// by SkillModule like the facilitation and MC modules. General financial
// education for UN staff in West and Central Africa: NOT personal investment
// advice (see `disclaimer`). Classic quotes were checked word for word against
// Project Gutenberg texts (Franklin's The Way to Wealth, Hamlet, David
// Copperfield, the King James Bible); resources were checked live on
// 2026-10-14 (YouTube via oEmbed, TED durations from the talk pages).

const yt = id => "https://www.youtube.com/watch?v=" + id;
const ted = slug => "https://www.ted.com/talks/" + slug;

export const MONEY = {
  id: "money",
  title: { en: "Money & financial freedom", fr: "Argent et liberté financière" },
  sub: {
    en: "How money works, a spending plan you can keep, living free of debt, recovering from loans, making money work for you, investing safely in the age of AI, and designing your rich life.",
    fr: "Comprendre l'argent, tenir un plan de dépenses, vivre sans dettes, se relever d'un crédit, faire travailler son argent, investir prudemment à l'ère de l'IA et concevoir sa vie riche."
  },
  sayLabel: { en: "Ask yourself", fr: "Questions à vous poser" },
  disclaimer: {
    en: "General financial education, not personal investment, tax or legal advice. Rules, products and taxes differ by country. For decisions about your own money, speak to a licensed, independent adviser, and for your pension, to the UN Joint Staff Pension Fund.",
    fr: "Éducation financière générale, et non un conseil personnalisé en investissement, fiscalité ou droit. Les règles, produits et impôts varient selon les pays. Pour vos décisions personnelles, consultez un conseiller agréé et indépendant, et pour votre pension, la Caisse commune des pensions du personnel des Nations Unies."
  },
  stages: [
    {
      id: "money-basics",
      title: { en: "How money works", fr: "Comment fonctionne l'argent" },
      goal: { en: "Understand the few forces that shape your financial life.", fr: "Comprendre les quelques forces qui façonnent votre vie financière." },
      tips: {
        en: [
          "Think of your finances as a flow: income comes in, spending goes out. The gap you keep (your savings rate) matters more than the size of your income.",
          "Compound growth means returns earn returns. A rough guide, the rule of 72: divide 72 by the yearly rate to find how many years it takes to double (about 10 years at 7%). The same maths works against you on debt.",
          "Inflation quietly shrinks cash: at 4% a year, money kept in cash loses about a third of its buying power in ten years.",
          "Assets put money in your pocket over time (savings, investments, a productive business, a rented property); liabilities take it out (consumer debt, a car bought on credit).",
          "Every spending choice has an opportunity cost: what that money could have become.",
          "Risk and return travel together. An offer of high returns with \"no risk\" is a warning sign, not an opportunity.",
          "Early in a career, your biggest asset is your earning power: skills, health and reputation. Invest in it."
        ],
        fr: [
          "Voyez vos finances comme un flux : les revenus entrent, les dépenses sortent. L'écart que vous conservez (votre taux d'épargne) compte plus que le montant de vos revenus.",
          "Les intérêts composés font fructifier les gains eux-mêmes. Repère simple, la règle de 72 : divisez 72 par le taux annuel pour connaître le nombre d'années nécessaires pour doubler (environ 10 ans à 7 %). Le même calcul joue contre vous avec les dettes.",
          "L'inflation grignote l'argent liquide : à 4 % par an, l'argent gardé en espèces perd environ un tiers de son pouvoir d'achat en dix ans.",
          "Les actifs vous rapportent de l'argent avec le temps (épargne, placements, activité productive, bien loué) ; les passifs vous en coûtent (crédit à la consommation, voiture achetée à crédit).",
          "Chaque dépense a un coût d'opportunité : ce que cet argent aurait pu devenir.",
          "Le risque et le rendement vont ensemble. Une offre de rendement élevé « sans risque » est un signal d'alarme, pas une opportunité.",
          "En début de carrière, votre premier actif est votre capacité à gagner un revenu : compétences, santé et réputation. Investissez-y."
        ]
      },
      say: {
        en: ["\"What share of my income did I keep this month?\"", "\"Is this purchase an asset or a liability?\"", "\"What would this amount become in ten years if I invested it instead?\""],
        fr: ["« Quelle part de mes revenus ai-je gardée ce mois-ci ? »", "« Cet achat est-il un actif ou un passif ? »", "« Que deviendrait cette somme dans dix ans si je la plaçais ? »"]
      }
    },
    {
      id: "money-plan",
      title: { en: "Spending plan and emergency fund", fr: "Plan de dépenses et épargne de précaution" },
      goal: { en: "Give every unit of income a job, and build a cushion before anything else.", fr: "Donner une mission à chaque franc gagné et constituer un coussin de sécurité avant tout." },
      tips: {
        en: [
          "Track every expense for 30 days before changing anything; awareness comes first.",
          "Pay yourself first: move savings automatically on payday, before you start spending.",
          "Start from a simple split, such as 50% needs, 30% wants and 20% savings and debt repayment, then adjust it to your reality.",
          "Build an emergency fund of three to six months of essential expenses; aim higher if your income is irregular or your contract is short.",
          "Keep the emergency fund separate, safe and easy to reach, in a savings account rather than in shares.",
          "Plan for predictable \"surprises\" (school fees, festivals, family events, car repairs) by setting a little aside each month.",
          "Spend generously on what you value most and cut hard on what you don't; this is the idea behind Ramit Sethi's conscious spending plan."
        ],
        fr: [
          "Notez chaque dépense pendant 30 jours avant de changer quoi que ce soit : la prise de conscience vient d'abord.",
          "Payez-vous en premier : virez automatiquement votre épargne le jour de la paie, avant de dépenser.",
          "Partez d'une répartition simple, par exemple 50 % besoins, 30 % envies et 20 % épargne et remboursements, puis adaptez-la à votre réalité.",
          "Constituez une épargne de précaution de trois à six mois de dépenses essentielles ; visez plus si vos revenus sont irréguliers ou votre contrat court.",
          "Gardez cette épargne à part, en sécurité et facile d'accès, sur un compte d'épargne plutôt qu'en actions.",
          "Anticipez les « imprévus » prévisibles (frais de scolarité, fêtes, événements familiaux, réparations) en mettant un peu de côté chaque mois.",
          "Dépensez largement pour ce qui compte le plus pour vous et coupez fermement le reste : c'est l'idée du plan de dépenses conscient de Ramit Sethi."
        ]
      },
      say: {
        en: ["\"If my income stopped tomorrow, how many months could I cover?\"", "\"Which three expenses bring me the most joy, and which three the least?\"", "\"What will I automate this month?\""],
        fr: ["« Si mes revenus s'arrêtaient demain, combien de mois pourrais-je tenir ? »", "« Quelles trois dépenses me rendent le plus heureux, et lesquelles le moins ? »", "« Qu'est-ce que je vais automatiser ce mois-ci ? »"]
      }
    },
    {
      id: "money-debt",
      title: { en: "Live free of debt", fr: "Vivre sans dettes" },
      goal: { en: "Pay off what you owe in a planned order and stop new debt from replacing it.", fr: "Rembourser vos dettes dans un ordre planifié et empêcher de nouvelles dettes de les remplacer." },
      tips: {
        en: [
          "List every debt: lender, balance, interest rate, monthly payment and end date.",
          "Avalanche: pay the minimum on all debts and put every extra amount on the highest-interest one; it saves the most money. Snowball: clear the smallest balance first; quick wins keep you motivated. Choose the one you will stick with.",
          "Stop adding new debt while you pay down the old.",
          "Borrow only for things that raise your income or your net worth, never for lifestyle. Avoid salary advances and informal lenders who charge very high rates.",
          "Be careful with \"buy now, pay later\" and instalment offers: small payments hide the total cost.",
          "Before signing, read the effective annual rate and all fees, and compare at least two lenders.",
          "Never co-sign or stand guarantor for a loan you could not repay yourself.",
          "When a debt is cleared, move its payment to the next debt, then to savings, and celebrate the milestone."
        ],
        fr: [
          "Listez toutes vos dettes : prêteur, solde, taux d'intérêt, mensualité et date de fin.",
          "Avalanche : payez le minimum partout et mettez chaque surplus sur la dette au taux le plus élevé ; c'est la méthode la plus économique. Boule de neige : soldez d'abord le plus petit solde ; les victoires rapides motivent. Choisissez celle que vous tiendrez.",
          "Arrêtez de contracter de nouvelles dettes pendant que vous remboursez les anciennes.",
          "N'empruntez que pour ce qui augmente vos revenus ou votre patrimoine, jamais pour votre train de vie. Évitez les avances sur salaire et les prêteurs informels aux taux très élevés.",
          "Méfiez-vous du « achetez maintenant, payez plus tard » et des paiements échelonnés : de petites mensualités cachent le coût total.",
          "Avant de signer, lisez le taux annuel effectif et tous les frais, et comparez au moins deux prêteurs.",
          "Ne vous portez jamais garant d'un prêt que vous ne pourriez pas rembourser vous-même.",
          "Quand une dette est soldée, reportez sa mensualité sur la suivante, puis sur l'épargne, et fêtez l'étape."
        ]
      },
      say: {
        en: ["\"What is the total I owe, and at what rates?\"", "\"Which debt goes first: the highest rate or the smallest balance?\"", "\"Would I still buy this if I had to pay cash today?\""],
        fr: ["« Combien je dois au total, et à quels taux ? »", "« Quelle dette en premier : le taux le plus élevé ou le plus petit solde ? »", "« Achèterais-je encore ceci si je devais payer comptant aujourd'hui ? »"]
      }
    },
    {
      id: "money-recover",
      title: { en: "Loan recovery: both sides", fr: "Recouvrement et redressement : des deux côtés" },
      goal: { en: "Get back on track if you owe, and recover money you lent without losing the relationship.", fr: "Se redresser quand on doit de l'argent, et récupérer l'argent prêté sans perdre la relation." },
      tips: {
        en: [
          "If you are struggling to repay, contact your lender before you miss a payment; rescheduling or reduced payments are easier to obtain early.",
          "Put essential payments first (housing, food, health, school) and secured loans, then the most expensive debts.",
          "Consolidate only if the new loan costs less in total and you close the old credit lines.",
          "Beware of debt-relief offers that charge upfront fees or promise to \"erase\" your debt.",
          "Lenders and collectors must not harass or threaten you; keep a record of every call and message.",
          "If you lend money, lend only what you can afford to lose, and write down the amount, schedule and signatures of both parties.",
          "Follow up early and kindly, propose instalments, and ask for repayment by mobile money or bank transfer so it is traceable.",
          "If talks fail, ask a respected mediator (an elder, a faith leader, a colleague). Use formal legal steps only when the amount justifies the cost and the strain on the relationship.",
          "Decide in advance how much you give (not lend) to family each month; a giving budget protects both your relationships and your plans."
        ],
        fr: [
          "Si vous avez du mal à rembourser, contactez votre prêteur avant un impayé : un rééchelonnement ou des mensualités réduites s'obtiennent plus facilement tôt.",
          "Priorisez les paiements essentiels (logement, alimentation, santé, école) et les prêts garantis, puis les dettes les plus chères.",
          "Ne regroupez vos crédits que si le nouveau prêt coûte moins cher au total et que vous fermez les anciennes lignes.",
          "Méfiez-vous des offres de désendettement qui exigent des frais d'avance ou promettent d'« effacer » vos dettes.",
          "Les prêteurs et agents de recouvrement ne doivent ni vous harceler ni vous menacer ; gardez une trace de chaque appel et message.",
          "Si vous prêtez, ne prêtez que ce que vous pouvez vous permettre de perdre, et écrivez le montant, l'échéancier et les signatures des deux parties.",
          "Relancez tôt et avec bienveillance, proposez des échéances, et demandez un remboursement par mobile money ou virement pour en garder la trace.",
          "Si le dialogue échoue, sollicitez un médiateur respecté (un aîné, un responsable religieux, un collègue). N'engagez une procédure que si le montant justifie le coût et la tension sur la relation.",
          "Fixez à l'avance ce que vous donnez (et non prêtez) chaque mois à la famille : un budget de solidarité protège vos relations et vos projets."
        ]
      },
      say: {
        en: ["\"Have I told my lender early, and in writing?\"", "\"Is this a loan or a gift? Am I ready if it is never repaid?\"", "\"What schedule can the borrower realistically keep?\""],
        fr: ["« Ai-je prévenu mon prêteur tôt, et par écrit ? »", "« Est-ce un prêt ou un don ? Suis-je prêt s'il n'est jamais remboursé ? »", "« Quel échéancier l'emprunteur peut-il réellement tenir ? »"]
      }
    },
    {
      id: "money-invest",
      title: { en: "Make money work for you", fr: "Faire travailler son argent" },
      goal: { en: "Invest for the long term, simply, cheaply and diversified.", fr: "Investir sur le long terme, simplement, à faible coût et de façon diversifiée." },
      tips: {
        en: [
          "Invest only money you won't need for at least five years, after your emergency fund is in place and expensive debt is cleared.",
          "Diversify: spread your money across many companies, sectors and countries rather than betting on a few.",
          "For most people, low-cost index funds are the simplest way to own a whole market. Fees compound too, so keep them low. Warren Buffett's 2013 letter to shareholders gives this advice for his own family's money.",
          "Invest a fixed amount regularly, for example monthly, whatever the market does; this smooths the price you pay.",
          "Choose your mix of shares, bonds and cash by when you need the money and how much of a fall you could live through without selling in panic; rebalance once a year.",
          "Property can provide income, but check the title deed, the land registry and the seller's identity before paying anything; land fraud is common.",
          "Savings groups (tontines) build discipline and community. Agree written rules and join only groups you trust.",
          "Mind currency risk: if you save in one currency and will spend in another (CFA franc, naira, cedi, dollar, euro), exchange rates change your results.",
          "Know your pension: learn how your UN Joint Staff Pension Fund benefits work and keep your beneficiary details up to date."
        ],
        fr: [
          "N'investissez que l'argent dont vous n'aurez pas besoin avant au moins cinq ans, une fois l'épargne de précaution constituée et les dettes coûteuses soldées.",
          "Diversifiez : répartissez votre argent entre de nombreuses entreprises, secteurs et pays plutôt que de parier sur quelques-uns.",
          "Pour la plupart des gens, les fonds indiciels à faibles frais sont le moyen le plus simple de détenir tout un marché. Les frais aussi se capitalisent : gardez-les bas. La lettre aux actionnaires de Warren Buffett de 2013 donne ce conseil pour l'argent de sa propre famille.",
          "Investissez un montant fixe à intervalles réguliers, par exemple chaque mois, quoi que fasse le marché : cela lisse le prix d'achat.",
          "Choisissez votre répartition entre actions, obligations et liquidités selon l'échéance de vos besoins et la baisse que vous pourriez supporter sans vendre dans la panique ; rééquilibrez une fois par an.",
          "L'immobilier peut générer des revenus, mais vérifiez le titre foncier, le cadastre et l'identité du vendeur avant tout paiement : la fraude foncière est fréquente.",
          "Les tontines développent la discipline et la solidarité. Convenez de règles écrites et ne rejoignez que des groupes de confiance.",
          "Attention au risque de change : si vous épargnez dans une monnaie et dépensez dans une autre (franc CFA, naira, cedi, dollar, euro), les taux de change modifient vos résultats.",
          "Connaissez votre pension : comprenez le fonctionnement de vos droits auprès de la Caisse commune des pensions du personnel des Nations Unies et tenez vos bénéficiaires à jour."
        ]
      },
      say: {
        en: ["\"When will I need this money?\"", "\"If my investments fell 30% next year, would I sell or hold?\"", "\"How much am I paying in fees each year?\""],
        fr: ["« Quand aurai-je besoin de cet argent ? »", "« Si mes placements baissaient de 30 % l'an prochain, vendrais-je ou garderais-je ? »", "« Combien me coûtent les frais chaque année ? »"]
      }
    },
    {
      id: "money-ai",
      title: { en: "Investing in the age of AI", fr: "Investir à l'ère de l'IA" },
      goal: { en: "Use AI as a learning tool while avoiding the new scams and hype it brings.", fr: "Utiliser l'IA pour apprendre tout en évitant les nouvelles arnaques et l'engouement qu'elle suscite." },
      tips: {
        en: [
          "No AI tool can reliably predict markets. An \"AI trading bot\" promising guaranteed returns is a classic scam pattern, as US regulators (the SEC and FINRA) warn.",
          "Deepfake videos and cloned voices now imitate famous investors, officials and even relatives. Verify through a second, independent channel before sending any money.",
          "Beware of hype: companies labelled \"AI\" can be overpriced. Don't put a large share of your savings into one theme or one company.",
          "A broadly diversified index fund already gives you a share in the companies building and using AI.",
          "Use AI assistants to learn concepts, compare options and draft a budget, but check facts against official sources; they can be wrong and sound sure.",
          "Never share passwords, PINs, one-time codes or full account numbers with a chatbot or an \"AI adviser\".",
          "Your earning power is your best protection: keep building the skills AI complements, such as judgement, relationships, facilitation and data analysis.",
          "Crypto-assets and \"AI tokens\" are highly volatile and weakly regulated in many countries. If you take part, use only money you can afford to lose entirely."
        ],
        fr: [
          "Aucun outil d'IA ne prédit les marchés de façon fiable. Un « robot de trading IA » promettant des gains garantis est un schéma d'arnaque classique, comme le rappellent les régulateurs américains (SEC et FINRA).",
          "Des vidéos truquées et des voix clonées imitent désormais des investisseurs célèbres, des responsables et même des proches. Vérifiez par un second canal indépendant avant tout envoi d'argent.",
          "Méfiez-vous de l'engouement : des entreprises estampillées « IA » peuvent être surévaluées. Ne placez pas une grande part de votre épargne sur un seul thème ou une seule entreprise.",
          "Un fonds indiciel largement diversifié vous donne déjà une part des entreprises qui développent et utilisent l'IA.",
          "Servez-vous des assistants IA pour comprendre des notions, comparer des options et ébaucher un budget, mais vérifiez auprès de sources officielles : ils peuvent se tromper avec assurance.",
          "Ne communiquez jamais mots de passe, codes PIN, codes à usage unique ou numéros de compte complets à un chatbot ou à un « conseiller IA ».",
          "Votre capacité à gagner un revenu est votre meilleure protection : développez les compétences que l'IA complète, comme le jugement, les relations, l'animation et l'analyse de données.",
          "Les crypto-actifs et « jetons IA » sont très volatils et peu encadrés dans de nombreux pays. Si vous y participez, n'utilisez que de l'argent que vous pouvez perdre entièrement."
        ]
      },
      say: {
        en: ["\"Who regulates this platform, and can I verify that independently?\"", "\"Is someone pressing me to act fast or keep it secret?\"", "\"Which of my skills will be worth more with AI, not less?\""],
        fr: ["« Qui régule cette plateforme, et puis-je le vérifier de façon indépendante ? »", "« Quelqu'un me pousse-t-il à agir vite ou en secret ? »", "« Lesquelles de mes compétences vaudront plus avec l'IA, et non moins ? »"]
      }
    },
    {
      id: "money-protect",
      title: { en: "Protect what you build", fr: "Protéger ce que vous construisez" },
      goal: { en: "Make sure one bad event cannot undo years of effort.", fr: "Faire en sorte qu'un seul coup dur ne puisse pas effacer des années d'efforts." },
      tips: {
        en: [
          "Health cover comes first: one medical emergency can wipe out years of saving.",
          "If others depend on your income, consider life and disability cover sized to their needs.",
          "Write a will and keep beneficiary details (pension, insurance, bank) up to date; tell a trusted person where your documents are.",
          "Turn on two-factor authentication for banking and mobile money, and never share codes.",
          "Scam warning signs: urgency, secrecy, guaranteed returns, payment by gift card or crypto, and contact you didn't ask for.",
          "Before depositing money, check that the bank, microfinance institution or investment firm is licensed by the regulator.",
          "Keep copies of key documents (IDs, deeds, contracts, policies) in a safe, backed-up place."
        ],
        fr: [
          "La couverture santé d'abord : une seule urgence médicale peut anéantir des années d'épargne.",
          "Si d'autres personnes dépendent de vos revenus, envisagez une assurance décès et invalidité adaptée à leurs besoins.",
          "Rédigez un testament et tenez vos bénéficiaires à jour (pension, assurance, banque) ; indiquez à une personne de confiance où se trouvent vos documents.",
          "Activez la double authentification pour la banque et le mobile money, et ne partagez jamais vos codes.",
          "Signaux d'arnaque : urgence, secret, gains garantis, paiement en cartes cadeaux ou en crypto, et sollicitation non demandée.",
          "Avant de déposer de l'argent, vérifiez que la banque, l'institution de microfinance ou la société d'investissement est agréée par le régulateur.",
          "Conservez des copies de vos documents importants (pièces d'identité, titres, contrats, polices) dans un endroit sûr et sauvegardé."
        ]
      },
      say: {
        en: ["\"If I couldn't work for six months, what would happen to my family?\"", "\"Is my will up to date?\"", "\"Who regulates the institution holding my money?\""],
        fr: ["« Si je ne pouvais pas travailler pendant six mois, qu'arriverait-il à ma famille ? »", "« Mon testament est-il à jour ? »", "« Qui régule l'institution qui détient mon argent ? »"]
      }
    },
    {
      id: "money-rich",
      title: { en: "Grow your income and your rich life", fr: "Augmenter ses revenus et vivre sa vie riche" },
      goal: { en: "Earn more with integrity and spend in line with what matters to you.", fr: "Gagner davantage avec intégrité et dépenser selon ce qui compte pour vous." },
      tips: {
        en: [
          "Define your rich life in specifics: what you want your days, home, family and giving to look like. Money is the tool, not the goal.",
          "Avoid lifestyle creep: when your income rises, raise your savings before your spending.",
          "Negotiate salary, rent, fees and interest rates; one conversation can be worth years of saving.",
          "Build skills that raise your value: certifications, languages, leadership, data.",
          "Before taking on any side work, check your organisation's rules: UN staff regulations require prior approval for any outside occupation or employment, paid or unpaid.",
          "Spending on experiences and on other people tends to bring more happiness than buying things, as Michael Norton's research shows.",
          "Review your money for 30 minutes each month, and once a year review your goals, net worth, insurance and will.",
          "Give with a plan: generosity belongs in a rich life when it doesn't put your own future at risk."
        ],
        fr: [
          "Définissez précisément votre vie riche : à quoi doivent ressembler vos journées, votre logement, votre famille et vos dons. L'argent est l'outil, pas le but.",
          "Évitez l'inflation du train de vie : quand vos revenus augmentent, augmentez votre épargne avant vos dépenses.",
          "Négociez salaire, loyer, frais et taux d'intérêt : une seule conversation peut valoir des années d'épargne.",
          "Développez des compétences qui augmentent votre valeur : certifications, langues, leadership, données.",
          "Avant toute activité complémentaire, vérifiez les règles de votre organisation : le statut du personnel des Nations Unies exige une autorisation préalable pour toute activité ou emploi extérieur, rémunéré ou non.",
          "Dépenser pour des expériences et pour les autres rend en général plus heureux qu'acheter des objets, comme le montrent les recherches de Michael Norton.",
          "Faites le point sur vos finances 30 minutes par mois et, une fois par an, revoyez vos objectifs, votre patrimoine, vos assurances et votre testament.",
          "Donnez avec méthode : la générosité a sa place dans une vie riche tant qu'elle ne met pas votre avenir en danger."
        ]
      },
      say: {
        en: ["\"What does my rich life look like in five years?\"", "\"Where did my last pay rise go?\"", "\"Which one skill would most increase my income?\""],
        fr: ["« À quoi ressemble ma vie riche dans cinq ans ? »", "« Où est passée ma dernière augmentation ? »", "« Quelle compétence augmenterait le plus mes revenus ? »"]
      }
    }
  ],
  templates: [
    {
      title: { en: "Monthly spending plan", fr: "Plan de dépenses mensuel" },
      text: {
        en: `SPENDING PLAN – [month]            Net income: [ ]

1. PAY YOURSELF FIRST (on payday, automatic)
   Emergency fund            [ ]   (target: [3–6] months = [ ])
   Long-term investing       [ ]
   Debt repayment (extra)    [ ]
2. FIXED NEEDS
   Housing [ ]  Utilities [ ]  Transport [ ]  Food [ ]
   Health/insurance [ ]  School fees (monthly share) [ ]
3. FAMILY AND GIVING (decided in advance)   [ ]
4. SINKING FUNDS (yearly costs ÷ 12)
   Festivals/events [ ]  Repairs [ ]  Travel [ ]
5. GUILT-FREE SPENDING (what I love)        [ ]

Total planned [ ]  = Net income? [yes / adjust]
Savings rate = (1) ÷ net income = [ ]%`,
        fr: `PLAN DE DÉPENSES – [mois]          Revenu net : [ ]

1. SE PAYER EN PREMIER (jour de paie, automatique)
   Épargne de précaution     [ ]   (objectif : [3–6] mois = [ ])
   Placement long terme      [ ]
   Remboursement anticipé    [ ]
2. BESOINS FIXES
   Logement [ ]  Charges [ ]  Transport [ ]  Alimentation [ ]
   Santé/assurance [ ]  Scolarité (part mensuelle) [ ]
3. FAMILLE ET DONS (décidés à l'avance)     [ ]
4. PROVISIONS (coûts annuels ÷ 12)
   Fêtes/événements [ ]  Réparations [ ]  Voyages [ ]
5. DÉPENSES PLAISIR SANS CULPABILITÉ        [ ]

Total prévu [ ]  = Revenu net ? [oui / ajuster]
Taux d'épargne = (1) ÷ revenu net = [ ] %`
      }
    },
    {
      title: { en: "Debt list and payoff plan", fr: "Liste des dettes et plan de remboursement" },
      text: {
        en: `DEBT LIST – [date]
#  Lender        Balance   Rate (yearly)  Minimum/month  End date
1  [ ]           [ ]       [ ]%           [ ]            [ ]
2  [ ]           [ ]       [ ]%           [ ]            [ ]
3  [ ]           [ ]       [ ]%           [ ]            [ ]
TOTAL            [ ]                      [ ]

METHOD: [ ] Avalanche (highest rate first)  [ ] Snowball (smallest balance first)
Extra amount each month: [ ]  → goes to debt #[ ]
When a debt is cleared, its payment moves to the next one.
NO NEW DEBT UNTIL: [date / condition]
Milestones and rewards: [ ]`,
        fr: `LISTE DES DETTES – [date]
#  Prêteur       Solde     Taux (annuel)  Minimum/mois   Fin
1  [ ]           [ ]       [ ] %          [ ]            [ ]
2  [ ]           [ ]       [ ] %          [ ]            [ ]
3  [ ]           [ ]       [ ] %          [ ]            [ ]
TOTAL            [ ]                      [ ]

MÉTHODE : [ ] Avalanche (taux le plus élevé d'abord)  [ ] Boule de neige (plus petit solde d'abord)
Montant supplémentaire mensuel : [ ]  → affecté à la dette n°[ ]
Une dette soldée : sa mensualité passe à la suivante.
AUCUNE NOUVELLE DETTE JUSQU'À : [date / condition]
Étapes et récompenses : [ ]`
      }
    },
    {
      title: { en: "Personal loan agreement (family or friends)", fr: "Reconnaissance de dette (famille ou amis)" },
      text: {
        en: `PERSONAL LOAN AGREEMENT
Date: [ ]   Place: [ ]
Lender: [full name, ID number, phone]
Borrower: [full name, ID number, phone]

Amount lent: [ ] ([amount in words]), paid on [date] by [cash / mobile money / transfer, reference].
Repayment: [number] instalments of [ ] on the [day] of each month, from [date] to [date],
by [mobile money / bank transfer] to [number / account].
Interest: [none / [ ]% per year].
If a payment will be late, the borrower informs the lender before the due date and both agree a new date in writing.

Signatures:  Lender [ ]   Borrower [ ]   Witness (optional) [ ]

Note: this is a simple template, not legal advice. For large amounts, ask a lawyer or notary.`,
        fr: `RECONNAISSANCE DE DETTE
Date : [ ]   Lieu : [ ]
Prêteur : [nom complet, n° de pièce d'identité, téléphone]
Emprunteur : [nom complet, n° de pièce d'identité, téléphone]

Montant prêté : [ ] ([montant en lettres]), versé le [date] par [espèces / mobile money / virement, référence].
Remboursement : [nombre] échéances de [ ] le [jour] de chaque mois, du [date] au [date],
par [mobile money / virement] au [numéro / compte].
Intérêts : [aucun / [ ] % par an].
En cas de retard prévu, l'emprunteur prévient le prêteur avant l'échéance et une nouvelle date est convenue par écrit.

Signatures :  Prêteur [ ]   Emprunteur [ ]   Témoin (facultatif) [ ]

Note : modèle simple, pas un conseil juridique. Pour un montant important, consultez un avocat ou un notaire.`
      }
    },
    {
      title: { en: "Net worth statement", fr: "Bilan patrimonial" },
      text: {
        en: `NET WORTH – [date]   (update once a year)
WHAT I OWN (assets)                 WHAT I OWE (liabilities)
Cash and savings        [ ]         Loans                 [ ]
Emergency fund          [ ]         Credit cards / BNPL   [ ]
Investments             [ ]         Family/informal loans [ ]
Pension (if known)      [ ]         Other                 [ ]
Property (market value) [ ]
Business                [ ]
TOTAL ASSETS            [ ]         TOTAL LIABILITIES     [ ]

NET WORTH = assets − liabilities = [ ]     Change since last year: [ ]`,
        fr: `PATRIMOINE NET – [date]   (à mettre à jour une fois par an)
CE QUE JE POSSÈDE (actifs)          CE QUE JE DOIS (passifs)
Liquidités et épargne   [ ]         Prêts                     [ ]
Épargne de précaution   [ ]         Cartes / paiements différés [ ]
Placements              [ ]         Prêts familiaux/informels [ ]
Pension (si connue)     [ ]         Autres                    [ ]
Immobilier (valeur)     [ ]
Entreprise              [ ]
TOTAL ACTIFS            [ ]         TOTAL PASSIFS             [ ]

PATRIMOINE NET = actifs − passifs = [ ]     Évolution sur un an : [ ]`
      }
    },
    {
      title: { en: "My one-page investment plan", fr: "Mon plan d'investissement en une page" },
      text: {
        en: `MY INVESTMENT PLAN – [date]
Goals and dates: [retirement / children's education / home] by [year]
Before investing: emergency fund done? [ ]  Expensive debt cleared? [ ]
Monthly amount: [ ]   Automatic on: [day]
Mix: shares [ ]%  bonds [ ]%  cash [ ]%   (why: time horizon and how much fall I can bear)
Vehicles: [low-cost diversified funds / pension / other], total yearly fees: [ ]%
Currency: I will spend in [ ]; I save in [ ].
Rules: I rebalance every [month]. I don't sell in a panic. I never invest in anything
I don't understand, that promises guaranteed returns, or that pressures me to act fast.
Review date: [ ]   Adviser consulted (licensed, independent): [ ]`,
        fr: `MON PLAN D'INVESTISSEMENT – [date]
Objectifs et échéances : [retraite / études des enfants / logement] d'ici [année]
Avant d'investir : épargne de précaution constituée ? [ ]  Dettes coûteuses soldées ? [ ]
Montant mensuel : [ ]   Automatique le : [jour]
Répartition : actions [ ] %  obligations [ ] %  liquidités [ ] %   (pourquoi : échéance et baisse supportable)
Supports : [fonds diversifiés à faibles frais / pension / autre], frais annuels totaux : [ ] %
Monnaie : je dépenserai en [ ] ; j'épargne en [ ].
Règles : je rééquilibre chaque [mois]. Je ne vends pas dans la panique. Je n'investis jamais dans ce que
je ne comprends pas, qui promet des gains garantis ou qui me presse d'agir vite.
Date de revue : [ ]   Conseiller consulté (agréé, indépendant) : [ ]`
      }
    }
  ],
  quotes: [
    { text: "Beware of little expences; \"A small leak will sink a great ship.\"", fr: "Méfiez-vous des petites dépenses ; « Une petite voie d'eau suffit à couler un grand navire. »", by: "Benjamin Franklin", source: "The Way to Wealth, 1758 (verified)" },
    { text: "If you would know the value of money, go and try to borrow some; for he that goes a borrowing, goes a sorrowing.", fr: "Si vous voulez connaître la valeur de l'argent, essayez d'en emprunter ; car qui va emprunter va s'attrister.", by: "Benjamin Franklin", source: "The Way to Wealth, 1758 (verified)" },
    { text: "Creditors have better memories than debtors.", fr: "Les créanciers ont meilleure mémoire que les débiteurs.", by: "Benjamin Franklin", source: "The Way to Wealth, 1758 (verified)" },
    { text: "Neither a borrower nor a lender be: For loan oft loses both itself and friend.", fr: "Ne sois ni emprunteur ni prêteur : car le prêt fait souvent perdre et l'argent et l'ami.", by: "William Shakespeare", source: "Hamlet, Act I, Scene III (verified)" },
    { text: "Annual income twenty pounds, annual expenditure nineteen nineteen and six, result happiness. Annual income twenty pounds, annual expenditure twenty pounds ought and six, result misery.", fr: "Revenu annuel vingt livres, dépenses annuelles dix-neuf livres dix-neuf shillings et six pence : résultat, bonheur. Revenu annuel vingt livres, dépenses annuelles vingt livres et six pence : résultat, misère.", by: "Charles Dickens (Mr Micawber)", source: "David Copperfield, 1850 (verified)" },
    { text: "The rich ruleth over the poor, and the borrower is servant to the lender.", fr: "Le riche domine sur les pauvres, et celui qui emprunte est l'esclave de celui qui prête.", by: "Proverbs 22:7", source: "King James Bible (verified)" },
    { text: "Don't look for the needle in the haystack. Just buy the haystack!", fr: "Ne cherchez pas l'aiguille dans la botte de foin. Achetez toute la botte !", by: "John C. Bogle", source: "The Little Book of Common Sense Investing, 2007" },
    { text: "Wealth is what you don't see.", fr: "La richesse, c'est ce que l'on ne voit pas.", by: "Morgan Housel", source: "The Psychology of Money, 2020 (chapter title)" },
    { text: "Spend extravagantly on the things you love, and cut costs mercilessly on the things you don't.", fr: "Dépensez sans compter pour ce que vous aimez, et coupez sans pitié dans ce qui ne compte pas.", by: "Ramit Sethi", source: "I Will Teach You to Be Rich (widely quoted)" }
  ],
  resources: [
    { t: "Compound interest introduction", u: yt("Rm6UdfRs3gw"), by: "Khan Academy · 7 min", kind: "video" },
    { t: "What is inflation? Economics explained", u: yt("HQ-Kg_xgdhE"), by: "The Guardian · 2 min", kind: "video" },
    { t: "Oliver Elfenbaum: How does the stock market work?", u: ted("oliver_elfenbaum_how_does_the_stock_market_work"), by: "TED-Ed · 4 min", kind: "video" },
    { t: "Snowball vs avalanche: which debt payoff method is right for you?", u: yt("uuKo9a38xxk"), by: "Clever Girl Finance · 5 min", kind: "video" },
    { t: "Warren Buffett: buying and holding index funds has worked", u: yt("10QoUi2PmNs"), by: "CNBC · 3 min", kind: "video" },
    { t: "Why not all index funds are created equal", u: yt("8dkq4EwIawg"), by: "Ben Felix · 6 min", kind: "video" },
    { t: "Shlomo Benartzi: Saving for tomorrow, tomorrow", u: ted("shlomo_benartzi_saving_for_tomorrow_tomorrow"), by: "TED · 17 min", kind: "video" },
    { t: "Michael Norton: How to buy happiness", u: ted("michael_norton_how_to_buy_happiness"), by: "TED · 11 min", kind: "video" },
    { t: "I Will Teach You to Be Rich (Ramit Sethi)", u: yt("BmAwa1nnB6w"), by: "Talks at Google · 50 min", kind: "video" },
    { t: "Morgan Housel on getting rich, staying rich and being happy", u: yt("zEx_IGVfi7Y"), by: "The Knowledge Project · 94 min", kind: "video" },
    { t: "Artificial Intelligence (AI) and Investment Fraud: investor alert", u: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-alerts/artificial-intelligence-fraud", by: "US SEC, Investor.gov", kind: "article" },
    { t: "Artificial Intelligence (AI) and Investment Fraud", u: "https://www.finra.org/investors/insights/artificial-intelligence-and-investment-fraud", by: "FINRA", kind: "article" },
    { t: "The Psychology of Money (the original free essay)", u: "https://www.collaborativefund.com/blog/the-psychology-of-money/", by: "Morgan Housel, Collaborative Fund", kind: "article" },
    { t: "The Stock Series: a simple path to wealth (free)", u: "https://jlcollinsnh.com/stock-series/", by: "JL Collins", kind: "article" },
    { t: "Berkshire Hathaway shareholder letter 2013 (index fund advice for his family)", u: "https://www.berkshirehathaway.com/letters/2013ltr.pdf", by: "Warren Buffett", kind: "article" },
    { t: "Debt collection: know your rights", u: "https://www.consumerfinance.gov/consumer-tools/debt-collection/", by: "US Consumer Financial Protection Bureau", kind: "article" },
    { t: "Personal finance course (free)", u: "https://www.khanacademy.org/college-careers-more/personal-finance", by: "Khan Academy", kind: "tool" },
    { t: "Compound interest calculator", u: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator", by: "US SEC, Investor.gov", kind: "tool" },
    { t: "United Nations Joint Staff Pension Fund", u: "https://www.unjspf.org/", by: "UNJSPF", kind: "tool" },
    { t: "United Nations Federal Credit Union", u: "https://www.unfcu.org/", by: "UNFCU", kind: "tool" },
    { t: "FinTech et digitalisation des services financiers dans l'UEMOA", u: "https://www.bceao.int/fr/content/fintech-et-digitalisation-des-services-financiers-dans-luemoa", by: "BCEAO (in French)", kind: "tool" },
    { t: "Réglementation des systèmes financiers décentralisés (microfinance)", u: "https://www.bceao.int/fr/reglementations/reglementation-des-systemes-financiers-decentralises", by: "BCEAO (in French)", kind: "tool" },
    { t: "Franklin's The Way to Wealth (free ebook)", u: "https://www.gutenberg.org/ebooks/43855", by: "Project Gutenberg", kind: "book" },
    { t: "The Psychology of Money (Morgan Housel, 2020)", by: "Harriman House", kind: "book" },
    { t: "I Will Teach You to Be Rich, 2nd ed. (Ramit Sethi, 2019)", by: "Workman", kind: "book" },
    { t: "The Little Book of Common Sense Investing (John C. Bogle, updated 2017)", by: "Wiley", kind: "book" },
    { t: "The Simple Path to Wealth (JL Collins, 2016)", by: "Self-published", kind: "book" },
    { t: "Your Money or Your Life (Vicki Robin and Joe Dominguez, revised 2018)", by: "Penguin", kind: "book" },
    { t: "Die With Zero (Bill Perkins, 2020)", by: "Houghton Mifflin Harcourt", kind: "book" },
    { t: "The Total Money Makeover (Dave Ramsey, 2003): the debt snowball", by: "Thomas Nelson", kind: "book" },
    { t: "Rich Dad Poor Dad (Robert Kiyosaki, 1997): a popular mindset book, light on practical detail", by: "Plata Publishing", kind: "book" }
  ]
};
