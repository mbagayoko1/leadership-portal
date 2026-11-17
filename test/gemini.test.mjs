// Unit checks for the Gemini client with a mocked fetch: no network, no real key.
// Run: npm run test:gemini
const { GeminiError, checkGeminiKey, geminiComplete, geminiStream, GEMINI_MODELS } = await import("../src/coach/geminiClient.js");
const sse = (...chunks) => new Response(new ReadableStream({ start(c) { const e = new TextEncoder(); chunks.forEach(x => c.enqueue(e.encode(x))); c.close(); } }), { status: 200 });
const json = (o, status = 200) => new Response(JSON.stringify(o), { status });
const tk = "MOCK";
let calls = [];
const mock = fn => { calls = []; globalThis.fetch = async (u, o) => { calls.push({ u, o }); return fn(u, o, calls.length); }; };
let pass = 0, fail = 0; const ok = (n, c, x = "") => { c ? pass++ : (fail++, console.log("FAIL", n, x)); };
const kindOf = async p => { try { await p; return "none"; } catch (e) { return e.kind || e.name; } };
const part = t => `data: ${JSON.stringify({ candidates: [{ content: { parts: [{ text: t }] } }] })}\n\n`;

mock(() => sse(part("Hel"), part("lo")));
let got = ""; let r = await geminiStream(tk, "m", "sys", [{ role: "user", content: "hi" }, { role: "assistant", content: "yo" }, { role: "user", content: "q" }], d => got += d);
ok("stream joins", r === "Hello" && got === "Hello");
const body = JSON.parse(calls[0].o.body);
ok("roles mapped", body.contents.map(c => c.role).join() === "user,model,user");
ok("system sent", body.systemInstruction.parts[0].text === "sys");
ok("key in header not url", calls[0].o.headers["x-goog-api-key"] === tk && !calls[0].u.includes(tk));
ok("stream url", calls[0].u.endsWith("/models/m:streamGenerateContent?alt=sse"));

const whole = part("split across chunks"); const mid = Math.floor(whole.length / 2);
mock(() => sse(whole.slice(0, mid), whole.slice(mid)));
ok("sse split mid-json", await geminiStream(tk, "m", "s", [], () => {}) === "split across chunks");

mock(() => sse(`data: ${JSON.stringify({ candidates: [{ content: { parts: [{ text: "secret", thought: true }, { text: "shown" }] } }] })}\r\n\r\n`));
ok("thoughts hidden + CRLF", await geminiStream(tk, "m", "s", [], () => {}) === "shown");

mock(() => sse(`data: ${JSON.stringify({ promptFeedback: { blockReason: "SAFETY" } })}\n\n`));
ok("blocked stream = refusal", await kindOf(geminiStream(tk, "m", "s", [], () => {})) === "refusal");
mock(() => json({ candidates: [{ finishReason: "SAFETY" }] }));
ok("blocked complete = refusal", await kindOf(geminiComplete(tk, "m", "s", [])) === "refusal");
mock(() => json({ candidates: [{ content: { parts: [{ text: " ans " }] } }] }));
ok("complete trims", await geminiComplete(tk, "m", "s", [{ role: "user", content: "x" }]) === "ans");

const bad = () => json({ error: { code: 400, message: "API key not valid.", status: "INVALID_ARGUMENT", details: [{ reason: "API_KEY_INVALID" }] } }, 400);
mock(bad); ok("bad key = auth", await kindOf(checkGeminiKey(tk)) === "auth");
mock(() => json({ error: { message: "x" } }, 403)); ok("403 = auth", await kindOf(geminiComplete(tk, "m", "s", [])) === "auth");
mock((u, o, n) => n < 3 ? json({ error: { message: "slow down" } }, 429) : json({ candidates: [{ content: { parts: [{ text: "ok" }] } }] }));
ok("429 retried then ok", await geminiComplete(tk, "m", "s", []) === "ok" && calls.length === 3);
mock(() => json({ error: { message: "overloaded" } }, 503));
ok("503 busy after 3 tries per model", await kindOf(geminiComplete(tk, "m", "s", [])) === "busy" && calls.length === 9, calls.length);
const okAns = () => json({ candidates: [{ content: { parts: [{ text: "ok" }] } }] });
mock(u => /\/models\/(m|busy):/.test(u) ? json({ error: { message: "This model is currently experiencing high demand." } }, 503) : okAns());
ok("busy model moves to next", await geminiComplete(tk, "busy", "s", []) === "ok" && calls.length === 7 && calls[6].u.includes(GEMINI_MODELS[0]), calls.map(c => c.u).join());
mock(okAns); await geminiComplete(tk, "busy", "s", []);
ok("working model remembered", calls.length === 1 && calls[0].u.includes(GEMINI_MODELS[0]), calls[0].u);
mock(u => u.includes(GEMINI_MODELS[0]) ? json({ error: { message: "models/x is not found" } }, 404) : okAns());
ok("missing model moves to next", await geminiComplete(tk, GEMINI_MODELS[0], "s", []) === "ok");
mock(() => json({ error: { message: "You exceeded your current quota, please check your plan and billing details." } }, 429));
ok("quota 429 is busy, not billing", await kindOf(geminiComplete(tk, "m", "s", [])) === "busy");
mock(() => json({ error: { message: "Your prepayment credits are depleted." } }, 429));
ok("depleted 429 = billing, no retry", await kindOf(geminiComplete(tk, "m", "s", [])) === "billing" && calls.length === 1, calls.length);
mock(() => json({ error: { message: "Free tier unavailable. Please enable billing on your project." } }, 400));
ok("enable billing = billing", await kindOf(geminiComplete(tk, "m", "s", [])) === "billing");
mock(() => json({ error: { message: "This project requires billing to be enabled." } }, 403));
ok("403 billing = billing", await kindOf(geminiComplete(tk, "m", "s", [])) === "billing");
mock(() => json({ error: { message: "User location is not supported for the API use." } }, 400));
let msg = ""; try { await checkGeminiKey(tk); } catch (e) { msg = e.kind + ":" + e.message; }
ok("region error keeps Google's message", msg === "other:User location is not supported for the API use.");
mock((u, o, n) => n === 1 ? json({ error: { message: "models/x is not found" } }, 404) : json({ name: "ok" }));
ok("falls back to next model", await checkGeminiKey(tk) === GEMINI_MODELS[1]);
globalThis.fetch = async () => { throw new TypeError("Failed to fetch"); };
ok("offline = network", await kindOf(geminiComplete(tk, "m", "s", [])) === "network");
globalThis.fetch = async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; };
ok("abort passes through", await kindOf(geminiComplete(tk, "m", "s", [])) === "AbortError");
const realTimeout = globalThis.setTimeout;
globalThis.setTimeout = (f, ms) => realTimeout(f, ms >= 30000 ? 5 : ms);
const hangs = (u, o) => new Promise((_, rej) => o.signal.addEventListener("abort", () => { const e = new Error("aborted"); e.name = "AbortError"; rej(e); }));
calls = []; globalThis.fetch = (u, o) => { calls.push(u); return u.includes(GEMINI_MODELS[1]) ? hangs(u, o) : Promise.resolve(okAns()); };
ok("hung model times out to next", await geminiComplete(tk, GEMINI_MODELS[1], "s", []) === "ok" && calls.length === 2 && calls[1].includes(GEMINI_MODELS[0]), calls.join());
globalThis.fetch = hangs;
ok("all hung = busy", await kindOf(geminiComplete(tk, "m", "s", [])) === "busy");
globalThis.setTimeout = realTimeout;
const stop = new AbortController(); globalThis.fetch = hangs; realTimeout(() => stop.abort(), 5);
ok("user cancel stays an abort", await kindOf(geminiComplete(tk, "m", "s", [], stop.signal)) === "AbortError");
console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
