// Interactive calculators for the "Money & financial freedom" module:
// compound growth (with an optional inflation adjustment) and a debt payoff
// planner comparing the avalanche and snowball methods. Amounts are in
// whatever currency the participant uses; nothing is stored or sent anywhere.
import { useState } from "react";

const num = v => { const n = parseFloat(String(v).replace(/\s/g, "").replace(",", ".")); return isFinite(n) && n >= 0 ? n : 0; };

// Future value with monthly compounding and a monthly contribution.
export function growth(start, monthly, ratePct, years) {
  const n = Math.round(years * 12), r = ratePct / 100 / 12;
  const f = Math.pow(1 + r, n);
  const fv = r ? start * f + monthly * (f - 1) / r : start + monthly * n;
  return { fv, paid: start + monthly * n };
}

// Month-by-month payoff. Every debt gets its minimum; the extra amount, plus
// the minimums of debts already cleared, goes to the target debt: highest
// rate first (avalanche) or smallest balance first (snowball).
export function payoff(debts, extra, method) {
  let ds = debts.filter(d => d.bal > 0).map(d => ({ ...d }));
  if (!ds.length) return { months: 0, interest: 0 };
  const budget = ds.reduce((s, d) => s + d.min, 0) + extra;
  let months = 0, interest = 0;
  while (ds.some(d => d.bal > 0.005)) {
    if (++months > 600) return { months: Infinity, interest };
    ds.forEach(d => { const i = d.bal * d.rate / 100 / 12; d.bal += i; interest += i; });
    let left = budget;
    ds.forEach(d => { const p = Math.min(d.bal, d.min); d.bal -= p; left -= p; });
    const order = ds.filter(d => d.bal > 0.005).sort(method === "avalanche" ? (a, b) => b.rate - a.rate : (a, b) => a.bal - b.bal);
    for (const d of order) { if (left <= 0) break; const p = Math.min(d.bal, left); d.bal -= p; left -= p; }
  }
  return { months, interest };
}

function Field({ label, value, onChange, suffix }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-gray-600 mb-1">{label}</span>
      <span className="flex items-center gap-1">
        <input inputMode="decimal" value={value} onChange={e => onChange(e.target.value)} className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none" />
        {suffix && <span className="text-xs text-gray-500">{suffix}</span>}
      </span>
    </label>
  );
}

export default function MoneyTools({ k, lang }) {
  const fmt = n => Math.round(n).toLocaleString(lang === "fr" ? "fr-FR" : "en-GB");
  const [g, setG] = useState({ start: "100000", monthly: "50000", rate: "7", years: "20", infl: "3" });
  const gr = growth(num(g.start), num(g.monthly), num(g.rate), num(g.years));
  const real = gr.fv / Math.pow(1 + num(g.infl) / 100, num(g.years));
  const gainShare = gr.fv > 0 ? Math.max(0, Math.min(1, (gr.fv - gr.paid) / gr.fv)) : 0;

  const [debts, setDebts] = useState([
    { bal: "500000", rate: "24", min: "25000" },
    { bal: "150000", rate: "12", min: "10000" },
    { bal: "1200000", rate: "9", min: "40000" }
  ]);
  const [extra, setExtra] = useState("30000");
  const parsed = debts.map(d => ({ bal: num(d.bal), rate: num(d.rate), min: num(d.min) }));
  const av = payoff(parsed, num(extra), "avalanche");
  const sn = payoff(parsed, num(extra), "snowball");
  const setDebt = (i, f, v) => setDebts(ds => ds.map((d, j) => j === i ? { ...d, [f]: v } : d));
  const when = r => r.months === Infinity ? k.never : k.months(r.months);

  return (
    <div className="ldp-card p-4 space-y-5">
      <div>
        <h4 className="text-sm font-bold text-gray-700">{k.title}</h4>
        <p className="text-xs text-gray-500">{k.sub}</p>
      </div>

      <section className="space-y-3">
        <h5 className="text-sm font-semibold text-gray-800">{k.growthTitle}</h5>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <Field label={k.start} value={g.start} onChange={v => setG({ ...g, start: v })} />
          <Field label={k.monthly} value={g.monthly} onChange={v => setG({ ...g, monthly: v })} />
          <Field label={k.rate} value={g.rate} onChange={v => setG({ ...g, rate: v })} suffix="%" />
          <Field label={k.years} value={g.years} onChange={v => setG({ ...g, years: v })} />
          <Field label={k.infl} value={g.infl} onChange={v => setG({ ...g, infl: v })} suffix="%" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-green-50 border border-green-200 p-2"><p className="text-xs text-green-800">{k.fv}</p><p className="font-mono text-lg font-semibold text-gray-800">{fmt(gr.fv)}</p></div>
          <div className="rounded-lg bg-gray-50 border border-gray-200 p-2"><p className="text-xs text-gray-600">{k.paid}</p><p className="font-mono text-lg font-semibold text-gray-800">{fmt(gr.paid)}</p></div>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-2"><p className="text-xs text-yellow-900">{k.real}</p><p className="font-mono text-lg font-semibold text-gray-800">{fmt(real)}</p></div>
        </div>
        <div aria-hidden="true" className="h-3 rounded-full bg-gray-200 overflow-hidden flex">
          <div className="bg-gray-400" style={{ width: (100 - gainShare * 100) + "%" }} />
          <div className="bg-green-500" style={{ width: gainShare * 100 + "%" }} />
        </div>
        <p className="text-xs text-gray-500">{k.split(Math.round(gainShare * 100))}</p>
      </section>

      <section className="space-y-3">
        <h5 className="text-sm font-semibold text-gray-800">{k.debtTitle}</h5>
        <div className="space-y-2">
          {debts.map((d, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-end">
              <Field label={k.balance + " " + (i + 1)} value={d.bal} onChange={v => setDebt(i, "bal", v)} />
              <Field label={k.apr} value={d.rate} onChange={v => setDebt(i, "rate", v)} suffix="%" />
              <Field label={k.min} value={d.min} onChange={v => setDebt(i, "min", v)} />
              <button onClick={() => setDebts(ds => ds.filter((_, j) => j !== i))} disabled={debts.length <= 1} aria-label={k.remove + " " + (i + 1)} className="mb-0.5 text-xs px-2 py-1.5 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30">✕</button>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-3">
          {debts.length < 6 && <button onClick={() => setDebts(ds => [...ds, { bal: "", rate: "", min: "" }])} className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">{k.add}</button>}
          <div className="w-40"><Field label={k.extra} value={extra} onChange={setExtra} /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[["avalanche", av], ["snowball", sn]].map(([m, r]) => {
            const best = av.interest !== sn.interest && r.interest === Math.min(av.interest, sn.interest) && r.months !== Infinity;
            return (
              <div key={m} className={"rounded-lg border p-3 " + (best ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200")}>
                <p className="text-sm font-semibold text-gray-800">{k[m]}{best && <span className="ml-2 text-xs text-green-700">{k.cheapest}</span>}</p>
                <p className="text-xs text-gray-600">{k[m + "How"]}</p>
                <p className="text-sm mt-1">{k.debtFree} <strong>{when(r)}</strong></p>
                <p className="text-sm">{k.interestPaid} <strong className="font-mono">{r.months === Infinity ? "—" : fmt(r.interest)}</strong></p>
              </div>
            );
          })}
        </div>
        {av.months === Infinity && <p className="text-xs text-red-700">{k.neverHint}</p>}
      </section>
      <p className="text-[11px] text-gray-400">{k.note}</p>
    </div>
  );
}
