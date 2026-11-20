// "Which sentence is correct?" items for the Polish Your French quiz. Each
// pairs a correct sentence with a common error in professional French. g is
// the word-bank group the item belongs to (empty: only in mixed quizzes).
// why is [English, French].
const SPOT = [
  { g: "frFautes", ok: "Après que le comité a validé le budget, nous lancerons l'appel.", bad: "Après que le comité ait validé le budget, nous lancerons l'appel.", why: ["« Après que » takes the indicative.", "« Après que » se construit avec l'indicatif."] },
  { g: "frFautes", ok: "Bien que les délais soient courts, l'équipe tiendra ses engagements.", bad: "Malgré que les délais sont courts, l'équipe tiendra ses engagements.", why: ["Use « bien que » + subjunctive.", "Employez « bien que » + subjonctif."] },
  { g: "frFautes", ok: "Je me rappelle cette réunion.", bad: "Je me rappelle de cette réunion.", why: ["« Se rappeler » takes a direct object (« se souvenir de »).", "« Se rappeler » est transitif direct (« se souvenir de »)."] },
  { g: "frFautes", ok: "Quant à la date, elle reste à confirmer.", bad: "Tant qu'à la date, elle reste à confirmer.", why: ["The expression is « quant à ».", "L'expression correcte est « quant à »."] },
  { g: "frAvance", ok: "Ces formations permettront de pallier le manque de personnel.", bad: "Ces formations permettront de pallier au manque de personnel.", why: ["« Pallier » takes a direct object.", "« Pallier » est transitif direct."] },
  { g: "frCourriel", ok: "Je vous saurais gré de bien vouloir confirmer votre présence.", bad: "Je vous serais gré de bien vouloir confirmer votre présence.", why: ["The expression is « savoir gré »: « je vous saurais gré ».", "L'expression est « savoir gré » : « je vous saurais gré »."] },
  { g: "frFaux", ok: "En fait, la réunion a lieu mardi.", bad: "Actuellement, la réunion a lieu mardi (pour dire « actually »).", why: ["« Actuellement » means currently; \"actually\" is « en fait ».", "« Actuellement » signifie « en ce moment » ; « actually » se dit « en fait »."] },
  { g: "frFaux", ok: "Douze partenaires vont assister à la réunion.", bad: "Douze partenaires vont assister la réunion.", why: ["To attend is « assister à »; « assister quelqu'un » means to help.", "Être présent se dit « assister à » ; « assister quelqu'un » signifie l'aider."] },
  { g: "frConnect", ok: "Le taux de réponse a augmenté. En effet, les relances ont été efficaces.", bad: "On pensait que c'était lundi. En effet, c'est mardi.", why: ["« En effet » confirms or explains; to correct, use « en fait ».", "« En effet » confirme ou explique ; pour corriger, on dit « en fait »."] },
  { g: "frRegistre", ok: "Nous proposons de reporter l'atelier.", bad: "On propose de reporter l'atelier (dans une note au ministère).", why: ["In formal writing, « nous » is preferred to « on ».", "À l'écrit soutenu, « nous » est préféré à « on »."] },
  { g: "", ok: "Il faut que nous envoyions le rapport avant vendredi.", bad: "Il faut que nous envoyons le rapport avant vendredi.", why: ["« Il faut que » takes the subjunctive: « que nous envoyions ».", "« Il faut que » appelle le subjonctif : « que nous envoyions »."] },
  { g: "", ok: "Le projet a reçu un financement important.", bad: "Le projet a reçu un financement conséquent.", why: ["« Conséquent » means consistent; for \"large\", say « important ».", "« Conséquent » signifie cohérent ; pour « grand », dites « important »."] },
  { g: "frCourriel", ok: "À la suite de notre entretien, je vous adresse le compte rendu.", bad: "Suite à notre entretien, je vous adresse le compte rendu (dans une lettre officielle).", why: ["In careful writing, « à la suite de » is preferred to « suite à ».", "À l'écrit soigné, « à la suite de » est préféré à « suite à »."] },
  { g: "frReunion", ok: "Trois points sont inscrits à l'ordre du jour.", bad: "Trois points sont inscrits à l'agenda de la réunion.", why: ["A meeting agenda is « l'ordre du jour »; « un agenda » is a diary.", "Les points d'une réunion figurent à « l'ordre du jour » ; « un agenda » est un carnet."] }
];

export default SPOT;
