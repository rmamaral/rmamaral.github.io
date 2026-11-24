/* ==========================================================================
   EGGS · seven secrets. Found ones are remembered in this browser.
   (If you're reading the source: hello. Type hello() in the console.)
   ========================================================================== */
(() => {
  "use strict";
  const A = window.APP;
  const $ = (s, r = document) => r.querySelector(s);
  const pt = () => A.lang() === "pt";
  const tx = (en, p) => (pt() ? p : en);

  const LIST = [
    { id: "hidden", name: ["Hidden file", "Ficheiro escondido"], hint: ["The terminal has a hidden file. ls has a flag for that.", "O terminal tem um ficheiro escondido. O ls tem uma opção para o mostrar."] },
    { id: "blueprint", name: ["Blueprint", "Planta"], hint: ["A very old cheat code still works here.", "Um código de batota dos jogos antigos ainda funciona aqui."] },
    { id: "console", name: ["Hello, developer", "Olá, programador"], hint: ["Developers should open the console.", "Se és programador, abre a consola."] },
    { id: "away", name: ["Come back", "Volta"], hint: ["Leave this tab for a moment.", "Sai deste separador por um momento."] },
    { id: "ball", name: ["Free throw", "Lance livre"], hint: ["Basketball shows up in 2019 and 2021. Double-click a year.", "O basquetebol aparece em 2019 e 2021. Faz duplo clique num ano."] },
    { id: "jackpot", name: ["Jackpot", "Jackpot"], hint: ["Win something in 2017.", "Ganha alguma coisa em 2017."] },
    { id: "hire", name: ["Straight to the point", "Direto ao assunto"], hint: ["Type what you came here to do.", "Escreve aquilo que vieste cá fazer."] }
  ];
  let found = new Set(A.store.get("ra.eggs", []));

  function render() {
    const el = $("#eggsCount"); if (!el) return;
    el.innerHTML = `${tx("secrets found", "segredos encontrados")}: ${found.size}/${LIST.length}${found.size === LIST.length ? ` · ${tx("all of them. Thanks for looking this closely.", "todos. Obrigado por olhares com tanta atenção.")}` : ""}`;
  }
  function find(id) {
    const egg = LIST.find((e) => e.id === id);
    if (!egg || found.has(id)) return;
    found.add(id); A.store.set("ra.eggs", [...found]);
    A.toast(tx("Secret found", "Segredo encontrado"), `${egg.name[pt() ? 1 : 0]} · ${found.size} / ${LIST.length}`);
    render();
  }
  document.addEventListener("egg", (e) => find(e.detail));
  document.addEventListener("lang:change", render);
  render();
  window.EGGS = { list: () => LIST.map((e) => ({ id: e.id, name: e.name[pt() ? 1 : 0], hint: e.hint[pt() ? 1 : 0], found: found.has(e.id) })), find, reset: () => { found = new Set(); A.store.del("ra.eggs"); render(); } };

  /* 1 · console */
  console.log("%c>_ ricardo", "font-family:ui-monospace,monospace;font-size:24px;font-weight:700;color:#ff5a1f");
  console.log("%cYou opened the console, so you're probably one of us.\nType hello() and press Enter.", "font-family:ui-monospace,monospace;font-size:12px;color:#8a8a85");
  window.hello = () => { find("console"); return pt() ? "Olá. Há mais seis segredos por aqui. No terminal, escreve secrets." : "Hi. There are six more secrets around here. In the terminal, type secrets."; };

  /* 2 · leaving the tab */
  const title = document.title;
  let leftAt = 0;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { leftAt = Date.now(); document.title = tx("> still here when you're back_", "> continuo aqui quando voltares_"); }
    else { document.title = title; if (leftAt && Date.now() - leftAt > 1500) find("away"); }
  });

  /* 3 · Konami → blueprint mode (the grid behind the layout) */
  const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let recent = [], typed = "";
  function blueprint() {
    const on = document.body.classList.toggle("blueprint");
    A.toast("Blueprint", on ? tx("Every box on the page, outlined. Same code to switch off.", "Todas as caixas da página, à vista. O mesmo código para desligar.") : tx("Back to normal.", "De volta ao normal."));
    find("blueprint");
    return on;
  }
  const LEGACY = { Up: "ArrowUp", Down: "ArrowDown", Left: "ArrowLeft", Right: "ArrowRight" };
  document.addEventListener("keydown", (e) => {
    if (!e.key) return; // autofill and some IMEs fire keydown without a key
    const el = e.target instanceof Element ? e.target : document.body;
    // match the last 10 keys anywhere (extra presses, Shift/Caps and the terminal all work);
    // B and A are read by physical key too, so other keyboard layouts work
    const key = e.code === "KeyB" ? "b" : e.code === "KeyA" ? "a" : LEGACY[e.key] || (e.key.length === 1 ? e.key.toLowerCase() : e.key);
    if (!["Shift", "CapsLock", "Meta", "Control", "Alt"].includes(key)) recent = [...recent, key].slice(-KONAMI.length);
    if (recent.join() === KONAMI.join()) {
      recent = [];
      const inp = el.closest("input");
      if (inp) { e.preventDefault(); inp.value = inp.value.replace(/b$/i, ""); inp.dispatchEvent(new Event("input")); }
      blueprint();
    }
    /* 4 · typing "hire" */
    if (e.key.length === 1 && !el.closest("input, textarea, select")) { typed = (typed + e.key.toLowerCase()).slice(-8); if (typed.endsWith("hire") || typed.endsWith("contratar")) { typed = ""; openHire(); find("hire"); } }
  });

  /* 5 · free throw: double-click a year to drop a basketball */
  const balls = [];
  document.addEventListener("dblclick", (e) => {
    const y = e.target.closest("[data-egg-year]"); if (!y) return;
    window.getSelection && window.getSelection().removeAllRanges();
    spawnBall(e.clientX, e.clientY);
    find("ball");
  });
  function spawnBall(x, y) {
    if (balls.length >= 3) { const old = balls.shift(); old.el.remove(); }
    const el = document.createElement("div");
    el.className = "ball";
    el.innerHTML = `<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="#f0782c"/><g fill="none" stroke="#151515" stroke-width="1.4"><path d="M1 20h38M20 1v38"/><path d="M6.5 6.5c5 4 7 8.5 7 13.5s-2 9.5-7 13.5M33.5 6.5c-5 4-7 8.5-7 13.5s2 9.5 7 13.5"/></g></svg>`;
    document.body.appendChild(el);
    const b = { el, x: x - 20, y: y - 20, vx: (Math.random() - 0.5) * 14, vy: -10, rot: 0, drag: null, life: performance.now() };
    balls.push(b);
    el.addEventListener("pointerdown", (ev) => { b.drag = { ox: ev.clientX - b.x, oy: ev.clientY - b.y, lx: ev.clientX, ly: ev.clientY, t: performance.now() }; el.setPointerCapture(ev.pointerId); b.life = performance.now(); });
    el.addEventListener("pointermove", (ev) => { if (!b.drag) return; const now = performance.now(), dt = Math.max(16, now - b.drag.t); b.vx = ((ev.clientX - b.drag.lx) / dt) * 16; b.vy = ((ev.clientY - b.drag.ly) / dt) * 16; b.drag.lx = ev.clientX; b.drag.ly = ev.clientY; b.drag.t = now; b.x = ev.clientX - b.drag.ox; b.y = ev.clientY - b.drag.oy; });
    el.addEventListener("pointerup", () => { b.drag = null; });
    if (balls.length === 1) requestAnimationFrame(step);
  }
  function step(now) {
    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i];
      if (!b.drag) {
        b.vy += 0.55; b.x += b.vx; b.y += b.vy; b.vx *= 0.995;
        const max = innerHeight - 40;
        if (b.y > max) { b.y = max; b.vy *= -0.72; b.vx *= 0.92; if (Math.abs(b.vy) < 1.2) b.vy = 0; }
        if (b.x < 0) { b.x = 0; b.vx *= -0.8; }
        if (b.x > innerWidth - 40) { b.x = innerWidth - 40; b.vx *= -0.8; }
        if (b.y < 0) { b.y = 0; b.vy *= -0.6; }
      }
      b.rot += b.vx * 2.2;
      b.el.style.transform = `translate3d(${b.x}px,${b.y}px,0) rotate(${b.rot}deg)`;
      if (now - b.life > 14000) { b.el.classList.add("gone"); if (now - b.life > 14600) { b.el.remove(); balls.splice(i, 1); } }
    }
    if (balls.length) requestAnimationFrame(step);
  }

  /* 6 · the contact card */
  const hire = $("#hire");
  function openHire() {
    hire.innerHTML = `
      <div class="hire-card">
        <p class="mono hire-k">→ hire</p>
        <h2>${tx("Let's build something.", "Vamos construir alguma coisa.")}</h2>
        <p>${tx("Full-stack developer and team lead, at Tinsight since 2017. Websites, WordPress at scale, mobile apps, and calm teams that ship them.", "Programador full-stack e líder de equipa, na Tinsight desde 2017. Sites, WordPress em grande escala, apps móveis e equipas tranquilas que os põem no ar.")}</p>
        <p class="hire-links">${window.PROFILE.links.map((l) => `<a class="ext" href="${A.esc(l.url)}" target="_blank" rel="noopener">${A.esc(l.label)} <span>↗</span></a>`).join("")}</p>
        <button class="btn btn-dark btn-sm" data-hire-close>${A.esc(A.t("close"))}</button>
      </div>`;
    hire.hidden = false;
    requestAnimationFrame(() => hire.classList.add("show"));
    $("[data-hire-close]", hire).focus();
  }
  const closeHire = () => { hire.classList.remove("show"); setTimeout(() => (hire.hidden = true), 400); };
  hire.addEventListener("click", (e) => { if (e.target === hire || e.target.closest("[data-hire-close]")) closeHire(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !hire.hidden) closeHire(); });
  window.EGGS.hire = openHire;
  window.EGGS.blueprint = blueprint;
})();
