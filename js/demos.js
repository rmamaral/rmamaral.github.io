/* ==========================================================================
   DEMOS · small interactive pieces mounted inside feature cards.
   A project gets one with  demo: "<name>"  (and feature: true) in js/projects.js.
   Available: social, live, tokens, email, phone
   ========================================================================== */
(() => {
  "use strict";
  const A = window.APP;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = A.esc;
  const tx = (en, pt) => (A.lang() === "pt" ? pt : en);
  const wait = (ms) => new Promise((r) => setTimeout(r, A.reduced ? Math.min(ms, 60) : ms));

  const D = {};
  const I = (n, c) => A.icon(n, c);

  /* ---------- 2017 · SocialMakeIt: an app inside a Facebook page ---------- */
  D.social = (el) => {
    let tab = "slot", liked = false, votes = [41, 27, 33, 19], voted = new Set(), busy = false;
    const sym = ["coffee", "ball", "gift", "star", "bell"];
    const reel = (s) => `<i class="sym sym-${s}">${I(s)}</i>`;
    const views = {
      slot: () => `
        <div class="fb-slot"><div class="reels">${[0, 1, 2].map((i) => `<span data-reel="${i}">${reel(sym[i])}</span>`).join("")}</div>
        <button class="btn" data-spin>${tx("Spin", "Rodar")}</button><p class="fb-msg" data-msg>${tx("Three in a row wins a voucher.", "Três iguais dão direito a um voucher.")}</p></div>`,
      trivia: () => `
        <div class="fb-trivia"><p class="fb-q">${tx("How many app types did SocialMakeIt run on one engine?", "Quantos tipos de app corriam no motor da SocialMakeIt?")}</p>
        ${["5", "12", "40+"].map((a) => `<button class="fb-ans" data-ans="${a}">${a}</button>`).join("")}<p class="fb-msg" data-msg></p></div>`,
      photo: () => `
        <div class="fb-photo">${liked ? "" : `<div class="fb-gate"><p>${tx("Like the page to vote", "Faz gosto na página para votar")}</p><button class="btn" data-like>${I("like")} ${tx("Like", "Gosto")}</button></div>`}
        <div class="fb-grid ${liked ? "" : "locked"}">${["umbrella", "cake", "paw", "mountain"].map((e, i) => `<button class="fb-entry fb-e${i}" data-vote="${i}" ${liked ? "" : "tabindex=-1"}><span>${I(e)}</span><b>${votes[i]} ${I("heart")}</b></button>`).join("")}</div></div>`
    };
    const draw = () => {
      el.innerHTML = `
        <div class="fb">
          <div class="fb-bar"><span class="fb-logo">f</span><span>${tx("Brand page", "Página da marca")} › Apps</span><span class="fb-dots">•••</span></div>
          <div class="seg">${[["slot", "Slot machine"], ["trivia", "Trivia"], ["photo", tx("Photo contest", "Passatempo")]].map(([k, n]) => `<button class="${k === tab ? "on" : ""}" data-tab="${k}">${n}</button>`).join("")}</div>
          <div class="fb-body">${views[tab]()}</div>
        </div>`;
    };
    el.addEventListener("click", async (e) => {
      const tb = e.target.closest("[data-tab]"); if (tb && !busy) { tab = tb.dataset.tab; draw(); return; }
      if (e.target.closest("[data-spin]") && !busy) {
        busy = true;
        const reels = $$("[data-reel]", el), msg = $("[data-msg]", el);
        const win = Math.random() < 0.35, pick = sym[(Math.random() * sym.length) | 0];
        const final = win ? [pick, pick, pick] : [0, 1, 2].map(() => sym[(Math.random() * sym.length) | 0]);
        if (!win && final[0] === final[1] && final[1] === final[2]) final[2] = sym[(sym.indexOf(final[2]) + 1) % sym.length];
        for (let i = 0; i < 12; i++) { reels.forEach((r, j) => { r.innerHTML = reel(i < 6 + j * 3 ? sym[(Math.random() * sym.length) | 0] : final[j]); }); await wait(70); }
        reels.forEach((r, j) => (r.innerHTML = reel(final[j])));
        msg.textContent = win ? tx("You won a voucher!", "Ganhaste um voucher!") : tx("So close. Try again tomorrow.", "Quase. Tenta outra vez amanhã.");
        msg.classList.toggle("win", win); busy = false;
        if (win) document.dispatchEvent(new CustomEvent("egg", { detail: "jackpot" }));
        return;
      }
      const ans = e.target.closest("[data-ans]");
      if (ans) {
        const ok = ans.dataset.ans === "40+";
        $$("[data-ans]", el).forEach((b) => b.classList.toggle("right", b.dataset.ans === "40+"));
        ans.classList.toggle("wrong", !ok);
        $("[data-msg]", el).textContent = ok ? tx("Correct: contests, polls, quizzes, tombolas…", "Certo: passatempos, votações, quizzes, tômbolas…") : tx("More than that!", "Mais do que isso!");
        return;
      }
      if (e.target.closest("[data-like]")) { liked = true; draw(); return; }
      const v = e.target.closest("[data-vote]");
      if (v && liked) { const i = +v.dataset.vote; if (!voted.has(i)) { voted.add(i); votes[i]++; draw(); } }
    });
    draw();
  };

  /* ---------- 2022 · Digital Guidelines: design-token explorer ---------- */
  D.tokens = (el) => {
    const brands = {
      Coastline: { c: ["#0e3b5c", "#1f7a99", "#8fd3e8", "#f2efe6", "#ff7a59"], head: "Instrument Serif", body: "Inter", r: 2 },
      Terra: { c: ["#3b2a1e", "#8a5a3b", "#d9a57a", "#f4ece2", "#2f6b4f"], head: "Space Grotesk", body: "Inter", r: 14 },
      Nova: { c: ["#120d24", "#5b3df5", "#b9a6ff", "#f5f3ff", "#2fd4b8"], head: "Inter", body: "Roboto", r: 999 }
    };
    let b = "Coastline";
    const draw = () => {
      const k = brands[b];
      el.innerHTML = `
        <div class="tok" style="--t0:${k.c[0]};--t1:${k.c[1]};--t2:${k.c[2]};--t3:${k.c[3]};--t4:${k.c[4]};--tr:${k.r}px;--th:'${k.head}';--tb:'${k.body}'">
          <div class="seg">${Object.keys(brands).map((n) => `<button class="${n === b ? "on" : ""}" data-b="${n}">${n}</button>`).join("")}</div>
          <p class="tok-label mono">${tx("Colours · click to copy", "Cores · clica para copiar")}</p>
          <div class="tok-sw">${k.c.map((c) => `<button data-hex="${c}" style="background:${c}" aria-label="${c}"><span>${c}</span></button>`).join("")}</div>
          <div class="tok-row">
            <div class="tok-type"><span class="tok-aa">Aa</span><span class="mono">${esc(k.head)} / ${esc(k.body)}</span></div>
            <div class="tok-comp"><p class="tok-h">${tx("Book a visit", "Marcar visita")}</p><p class="tok-p">${tx("Components inherit the brand's tokens.", "Os componentes herdam os tokens da marca.")}</p><span class="tok-btn">${tx("Get started", "Começar")} →</span></div>
          </div>
        </div>`;
    };
    el.addEventListener("click", async (e) => {
      const bb = e.target.closest("[data-b]"); if (bb) { b = bb.dataset.b; draw(); return; }
      const h = e.target.closest("[data-hex]");
      if (h) { try { await navigator.clipboard.writeText(h.dataset.hex); } catch { /* clipboard blocked */ } const s = $("span", h); const o = s.textContent; s.textContent = tx("copied", "copiado"); setTimeout(() => (s.textContent = o), 900); }
    });
    draw();
  };

  /* ---------- 2024 · Email module system ---------- */
  D.email = (el) => {
    const mods = [["header", "Header"], ["hero", "Hero"], ["text", tx("Text", "Texto")], ["products", tx("Products", "Produtos")], ["cta", "CTA"], ["footer", "Footer"]];
    let mail = ["header", "hero", "cta", "footer"], fresh = -1;
    const sk = {
      header: `<div class="em em-header"><b>BRAND</b><i></i></div>`,
      hero: `<div class="em em-hero"><i class="l w70"></i><i class="l w40"></i></div>`,
      text: `<div class="em em-text"><i class="l w90"></i><i class="l w80"></i><i class="l w60"></i></div>`,
      products: `<div class="em em-prod">${"<div><span></span><i class='l w70'></i></div>".repeat(3)}</div>`,
      cta: `<div class="em em-cta"><span></span></div>`,
      footer: `<div class="em em-footer"><i class="l w50"></i><i class="l w30"></i></div>`
    };
    const draw = (out = "") => {
      el.innerHTML = `
        <div class="ems">
          <div class="ems-pal">${mods.map(([k, n]) => `<button data-add="${k}">+ ${n}</button>`).join("")}</div>
          <div class="ems-mail"><div class="ems-head mono">${tx("Subject: Spring campaign", "Assunto: Campanha de primavera")}</div>
            <div class="ems-body">${mail.map((k, i) => `<div class="ems-mod ${i === fresh ? "new" : ""}" data-rm="${i}" title="${tx("remove", "remover")}">${sk[k]}</div>`).join("") || `<p class="ems-empty">${tx("Add a module", "Adiciona um módulo")}</p>`}</div></div>
          <div class="ems-foot"><button class="btn" data-export>${tx("Export HTML", "Exportar HTML")}</button><span class="mono" data-out>${out}</span></div>
        </div>`;
      fresh = -1;
    };
    el.addEventListener("click", (e) => {
      const a = e.target.closest("[data-add]"); if (a) { if (mail.length >= 8) mail.shift(); const fi = mail.indexOf("footer"); const at = fi >= 0 && a.dataset.add !== "footer" ? fi : mail.length; mail.splice(at, 0, a.dataset.add); fresh = at; draw(); return; }
      const r = e.target.closest("[data-rm]"); if (r) { mail.splice(+r.dataset.rm, 1); draw(); return; }
      if (e.target.closest("[data-export]")) draw(`${I("check")} ${(mail.length * 2.1 + 1.4).toFixed(1)} KB · ${tx("table layout · inline CSS", "layout em tabelas · CSS inline")}`);
    });
    draw();
  };

  /* ---------- 2025 · Cosmos phone ---------- */
  D.phone = (el) => {
    let tab = "trip", ctimer;
    // the app's real themes (js/projects.js → brand.flavours); one codebase, two brands
    const proj = A.byId(el.dataset.project || ""), FL = (proj && proj.brand && proj.brand.flavours) || [{ name: "App", c: "#0f5cff", g1: "#0f5cff", g2: "#00a991" }];
    let fl = 0;
    const lum = (h) => { const n = parseInt(h.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; };
    const sports = () => fl === 0;
    const rates = { GBP: 0.85, USD: 1.08, BRL: 6.1 };
    const screens = {
      trip: () => `
        <p class="ph-h">${tx("Your trip", "A tua viagem")}</p>
        <div class="ph-event">${sports() ? `<b>Champions Final</b><span>Madrid · 30 ${tx("MAY", "MAI")}</span>` : `<b>${tx("Incentive trip", "Viagem de incentivo")}</b><span>Madeira · 30 ${tx("MAY", "MAI")}</span>`}<div class="ph-count" data-countdown></div></div>
        <ol class="ph-itin">
          <li><i>${I("plane")}</i><div><b>LIS → ${sports() ? "MAD" : "FNC"}</b><span>08:10 · ${tx("Gate", "Porta")} 14</span></div></li>
          <li><i>${I("van")}</i><div><b>Transfer</b><span>10:40 · ${tx("Meeting point", "Ponto de encontro")} T4</span></div></li>
          <li><i>${I("bed")}</i><div><b>Hotel</b><span>Check-in 14:00</span></div></li>
          ${sports() ? `<li><i>${I("stadium")}</i><div><b>${tx("Match", "Jogo")}</b><span>21:00 · ${tx("Gate", "Porta")} 7</span></div></li>` : `<li><i>${I("dinner")}</i><div><b>${tx("Gala dinner", "Jantar de gala")}</b><span>20:30 · ${tx("Main hall", "Salão principal")}</span></div></li>`}
        </ol>`,
      fx: () => `
        <p class="ph-h">${tx("Converter", "Conversor")}</p>
        <label class="ph-in"><span>EUR</span><input type="number" value="50" min="0" data-eur inputmode="decimal"></label>
        <div class="ph-rates">${Object.keys(rates).map((k) => `<div><span>${k}</span><b data-cur="${k}"></b></div>`).join("")}</div>
        <p class="ph-note">${I("sun")} ${sports() ? "Madrid 27°" : "Funchal 23°"}</p>`,
      chat: () => `<p class="ph-h">${tx("Group chat", "Chat do grupo")}</p><div class="ph-chat" data-chat></div>`
    };
    const draw = () => {
      el.innerHTML = `
        <div class="phone-wrap">
        ${FL.length > 1 ? `<div class="seg ph-flavours">${FL.map((f, i) => `<button class="${i === fl ? "on" : ""}" data-fl="${i}">${esc(f.name)}</button>`).join("")}</div>` : ""}
        <div class="phone" style="--ph-acc:${FL[fl].c};--ph-g1:${FL[fl].g1};--ph-g2:${FL[fl].g2};--ph-on:${lum(FL[fl].c) > 0.6 ? "#1D1F1C" : "#fff"}">
          <div class="ph-notch"></div>
          <div class="ph-screen">${screens[tab]()}</div>
          <nav class="ph-nav">${[["trip", "compass", tx("Trip", "Viagem")], ["fx", "exchange", tx("Tools", "Ferramentas")], ["chat", "chat", "Chat"]].map(([k, i, n]) => `<button class="${k === tab ? "on" : ""}" data-tab="${k}"><span>${I(i)}</span>${n}</button>`).join("")}</nav>
        </div><p class="ph-caption mono">${esc(A.t("phoneTitle"))} · ${tx("tap the tabs", "toca nos separadores")}</p></div>`;
      if (tab === "fx") conv();
      if (tab === "chat") chat();
      if (tab === "trip") countdown();
    };
    const conv = () => { const v = +$("[data-eur]", el).value || 0; Object.entries(rates).forEach(([k, r]) => { $(`[data-cur="${k}"]`, el).textContent = (v * r).toFixed(2); }); };
    const countdown = () => {
      clearInterval(ctimer);
      const now = new Date(), target = new Date(now.getFullYear() + (now.getMonth() > 4 ? 1 : 0), 4, 30, 21).getTime();
      const tick = () => {
        const c = $("[data-countdown]", el); if (!c) return clearInterval(ctimer);
        const s = Math.max(0, Math.floor((target - Date.now()) / 1000));
        c.textContent = `${Math.floor(s / 86400)}d ${String(Math.floor(s / 3600) % 24).padStart(2, "0")}:${String(Math.floor(s / 60) % 60).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
      };
      tick(); ctimer = setInterval(tick, 1000);
    };
    const chat = async () => {
      const box = $("[data-chat]", el);
      const msgs = sports() ? [["g", tx("Bus leaves the hotel at 18:30.", "O autocarro sai do hotel às 18:30.")], ["me", tx("Can I bring a flag?", "Posso levar uma bandeira?")], ["g", tx("Yes! Max 1×1.5m. See Tips → Stadium.", "Sim! Máx. 1×1,5m. Vê Dicas → Estádio.")], ["me", tx("Perfect, thanks!", "Perfeito, obrigado!")]] : [["g", tx("Bus leaves the hotel at 18:30.", "O autocarro sai do hotel às 18:30.")], ["me", tx("Is there a dress code for the gala?", "Há dress code para o jantar de gala?")], ["g", tx("Smart casual. See Tips → Gala.", "Smart casual. Vê Dicas → Gala.")], ["me", tx("Got it.", "Combinado.")]];
      for (const [who, m] of msgs) {
        if (!box.isConnected) return;
        const p = document.createElement("p"); p.className = `ph-msg ${who} typing`; p.textContent = "•••";
        box.appendChild(p); await wait(650); p.classList.remove("typing"); p.textContent = m; await wait(350);
      }
    };
    el.addEventListener("click", (e) => {
      const f = e.target.closest("[data-fl]"); if (f) { fl = +f.dataset.fl; draw(); return; }
      const b = e.target.closest("[data-tab]"); if (b) { tab = b.dataset.tab; draw(); }
    });
    el.addEventListener("input", (e) => { if (e.target.matches("[data-eur]")) conv(); });
    draw();
  };

  /* ---------- 2019 · FPB: a live game centre (simulated, made-up teams) ---------- */
  D.live = (el) => {
    const pt = () => A.lang() === "pt";
    const mk = (names, nos) => names.map((n, i) => ({ n, no: nos[i], pts: 0, reb: 0, ast: 0 }));
    const T = [
      { name: "Lobos", c: "#e8590c", pl: mk(["Silva", "Costa", "Martins", "Rocha", "Neves"], [4, 7, 10, 12, 23]) },
      { name: "Ursos", c: "#2f6fed", pl: mk(["Santos", "Ferreira", "Lopes", "Almeida", "Pinto"], [5, 8, 11, 14, 31]) }
    ];
    const st = () => ({ fgm: 0, fga: 0, tpm: 0, tpa: 0, ftm: 0, fta: 0, reb: 0, ast: 0, to: 0 });
    let S, tab = "live", running = true, visible = false, timer = null;
    const reset = () => { T.forEach((t) => t.pl.forEach((p) => { p.pts = p.reb = p.ast = 0; })); S = { score: [0, 0], q: 1, clock: 600, feed: [], stats: [st(), st()], over: false }; };
    const R = Math.random, pick = (a) => a[(R() * a.length) | 0];
    const who = (p) => `#${p.no} ${p.n}`;
    const clk = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
    const qLabel = (q) => (pt() ? `${q}.º P` : `Q${q}`);

    function event(quiet) {
      if (S.over) return;
      S.clock -= 6 + R() * 10; // ~11s per possession, ~40 points a quarter
      if (S.clock <= 0) {
        S.feed.unshift({ q: S.q, clock: 0, sys: true, text: S.q < 4 ? tx(`End of Q${S.q}`, `Fim do ${S.q}.º período`) : tx("Final", "Final") });
        if (S.q >= 4) { S.over = true; return; }
        S.q++; S.clock = 600; return;
      }
      const t = R() < 0.5 ? 0 : 1, o = 1 - t, team = T[t], p = pick(team.pl), s = S.stats[t];
      const mate = () => pick(team.pl.filter((x) => x !== p));
      const rebound = () => { const def = R() < 0.7, side = def ? o : t, r = pick(T[side].pl); r.reb++; S.stats[side].reb++; return { side, text: `${who(r)} · ${def ? tx("defensive rebound", "ressalto defensivo") : tx("offensive rebound", "ressalto ofensivo")}` }; };
      const r = R(); let text, pts = 0, extra = null;
      if (r < 0.6) {
        const three = r >= 0.4; s.fga++; if (three) s.tpa++;
        if (R() < (three ? 0.36 : 0.52)) {
          pts = three ? 3 : 2; s.fgm++; if (three) s.tpm++;
          text = three ? tx("3-pointer!", "Triplo!") : tx("2-pointer", "lançamento de 2");
          if (R() < 0.55) { const m = mate(); m.ast++; s.ast++; text += ` · ${tx("assist", "assistência")} ${who(m)}`; }
        } else { text = three ? tx("misses from three", "falha o triplo") : tx("misses a 2", "falha lançamento de 2"); extra = rebound(); }
      } else if (r < 0.7) {
        let made = 0; for (let i = 0; i < 2; i++) { s.fta++; if (R() < 0.75) { made++; s.ftm++; } }
        pts = made; text = `${made}/2 ${tx("free throws", "lances livres")}`;
      } else if (r < 0.82) { s.to++; text = R() < 0.5 ? tx("turnover", "perda de bola") : `${tx("loses it, steal by", "perde a bola, roubo de")} ${who(pick(T[o].pl))}`; }
      else if (r < 0.96) { text = tx("personal foul", "falta pessoal"); }
      else { S.feed.unshift({ q: S.q, clock: S.clock, sys: true, text: `${tx("Timeout", "Desconto de tempo")} · ${team.name}` }); return; }
      p.pts += pts; S.score[t] += pts;
      S.feed.unshift({ q: S.q, clock: S.clock, t, pts, text: `${who(p)} · ${text}`, score: S.score.join("–") });
      if (extra) S.feed.unshift({ q: S.q, clock: S.clock, t: extra.side, text: extra.text });
      S.feed.length = Math.min(S.feed.length, 40);
      if (!quiet) flash(t, pts);
    }

    function flash(t, pts) {
      if (!pts) return;
      const sc = $(`[data-sc="${t}"]`, el); if (!sc) return;
      sc.classList.remove("hit"); void sc.offsetWidth; sc.classList.add("hit");
    }

    const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
    function panel() {
      if (tab === "live") return `<ol class="lv-feed">${S.feed.slice(0, 9).map((f, i) => `
        <li class="${f.sys ? "sys" : ""} ${i === 0 ? "new" : ""}"><span class="lv-t mono">${qLabel(f.q)} ${clk(f.clock)}</span>${f.sys ? `<span>${esc(f.text)}</span>` : `<i style="background:${T[f.t].c}"></i><span>${esc(f.text)}</span>${f.score ? `<b class="mono">${f.score}</b>` : ""}`}</li>`).join("")}</ol>`;
      if (tab === "box") return T.map((tm) => `
        <table class="lv-box"><caption><i style="background:${tm.c}"></i>${esc(tm.name)}</caption>
          <thead><tr><th></th><th>PTS</th><th>${tx("REB", "RES")}</th><th>${tx("AST", "ASS")}</th></tr></thead>
          <tbody>${tm.pl.slice().sort((a, b) => b.pts - a.pts).map((p) => `<tr><td><span class="mono">#${p.no}</span> ${esc(p.n)}</td><td>${p.pts}</td><td>${p.reb}</td><td>${p.ast}</td></tr>`).join("")}</tbody></table>`).join("");
      const [a, b] = S.stats, rows = [
        [tx("Points", "Pontos"), S.score[0], S.score[1], ""],
        [tx("Field goals", "Lançamentos"), pct(a.fgm, a.fga), pct(b.fgm, b.fga), "%"],
        [tx("3-pointers", "Triplos"), pct(a.tpm, a.tpa), pct(b.tpm, b.tpa), "%"],
        [tx("Free throws", "Lances livres"), pct(a.ftm, a.fta), pct(b.ftm, b.fta), "%"],
        [tx("Rebounds", "Ressaltos"), a.reb, b.reb, ""],
        [tx("Assists", "Assistências"), a.ast, b.ast, ""],
        [tx("Turnovers", "Perdas de bola"), a.to, b.to, ""]
      ];
      return `<div class="lv-cmp">${rows.map(([l, x, y, u]) => `
        <div class="lv-row"><b class="mono">${x}${u}</b><div class="lv-bar"><span>${esc(l)}</span><i style="--a:${x + y ? (x / (x + y)) * 100 : 50}%;--c1:${T[0].c};--c2:${T[1].c}"></i></div><b class="mono">${y}${u}</b></div>`).join("")}</div>`;
    }

    function draw() {
      el.innerHTML = `
        <div class="lv">
          <div class="lv-top"><span class="lv-dot ${S.over ? "off" : running ? "" : "paused"}">${S.over ? tx("Final", "Final") : running ? tx("Live", "Ao vivo") : tx("Paused", "Em pausa")}</span><span class="mono lv-league">${tx("Demo league", "Liga demo")}</span>
            <span class="lv-ctrl"><button data-lv="toggle" aria-label="${running ? "Pause" : "Play"}">${I(running ? "pause" : "play")}</button><button data-lv="reset" aria-label="Restart">${I("restart")}</button></span></div>
          <div class="lv-score">
            <div class="lv-team"><span class="lv-crest" style="background:${T[0].c}">${T[0].name[0]}</span><span class="lv-name">${esc(T[0].name)}</span></div>
            <b class="lv-pts mono" data-sc="0">${S.score[0]}</b>
            <div class="lv-clock mono"><b>${S.over ? "FT" : qLabel(S.q)}</b><span>${S.over ? "" : clk(S.clock)}</span></div>
            <b class="lv-pts mono" data-sc="1">${S.score[1]}</b>
            <div class="lv-team"><span class="lv-crest" style="background:${T[1].c}">${T[1].name[0]}</span><span class="lv-name">${esc(T[1].name)}</span></div>
          </div>
          <div class="seg">${[["live", tx("Play-by-play", "Jogada a jogada")], ["box", tx("Box score", "Ficha de jogo")], ["team", tx("Team stats", "Equipas")]].map(([k, n]) => `<button class="${k === tab ? "on" : ""}" data-tab="${k}">${n}</button>`).join("")}</div>
          <div class="lv-panel">${panel()}</div>
          <p class="lv-note mono">${tx("Simulated game, made-up teams. On the FPB site this ran on real games.", "Jogo simulado, equipas inventadas. No site da FPB isto corria com jogos reais.")}</p>
        </div>`;
    }
    function tick() { if (!running || !visible) return; event(); draw(); if (S.over) stop(); }
    const start = () => { clearInterval(timer); timer = setInterval(tick, A.reduced ? 4000 : 1700); };
    const stop = () => { clearInterval(timer); timer = null; };

    reset();
    for (let i = 0; i < 80; i++) event(true); // start mid-game, with numbers on the board
    draw();
    el.addEventListener("click", (e) => {
      const b = e.target.closest("[data-tab]"); if (b) { tab = b.dataset.tab; draw(); return; }
      const c = e.target.closest("[data-lv]"); if (!c) return;
      if (c.dataset.lv === "toggle") { running = !running; if (S.over) { reset(); running = true; } running ? start() : stop(); draw(); }
      if (c.dataset.lv === "reset") { reset(); running = true; start(); draw(); }
    });
    new IntersectionObserver((en) => { visible = en[0].isIntersecting; if (visible && running && !timer) start(); if (!visible) stop(); }).observe(el);
  };

  /* ---------- mount ---------- */
  function mount(root) {
    $$("[data-demo]", root).forEach((el) => {
      if (el.dataset.mounted) return;
      const fn = D[el.dataset.demo];
      if (fn) { el.dataset.mounted = "1"; try { fn(el); } catch (err) { console.error("demo", el.dataset.demo, err); } }
    });
  }
  document.addEventListener("timeline:rendered", (e) => mount(e.detail.root));
  mount(document);
  window.DEMOS = D;
})();
