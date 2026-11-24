/* ==========================================================================
   LIFE · renders the personal side from js/personal.js.
   Where I'm from (a small map), sport (a weekend picker), games (cartridge
   shelves) and music (a silent player).
   ========================================================================== */
(() => {
  "use strict";
  const A = window.APP, D = window.LIFE;
  if (!A || !D) return;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const { esc, L } = A;
  const root = $("#life"), nav = $("#lifeNav");
  const CART = ["#e8590c", "#2f6fed", "#0c8a6a", "#b5338a", "#6741d9", "#c2410c", "#0b7285", "#a61e4d", "#5c940d"];

  /* The coast from Cabo da Roca to Sines, roughly to scale (lon/lat projected by hand). */
  const COAST = "M40 0 L33 29 L59 67 L115 71 L155 59 L214 21 L231 63 L181 80 L142 71 L119 92 L125 185 L165 172 L234 139 L280 150 L275 175 L245 168 L232 152 L237 189 L257 202 L267 294 L264 315 L238 378 L264 441 L400 441 L400 0 Z";
  const ROUTE = "M160 62 C 205 110, 300 190, 276 310";
  function map() {
    const motion = A.reduced ? "" : `<circle r="5" class="m-car"><animateMotion dur="5s" repeatCount="indefinite" path="${ROUTE}" keyPoints="0;1" keyTimes="0;1" calcMode="linear"/></circle>`;
    return `
      <svg class="map" viewBox="0 0 400 441" preserveAspectRatio="xMaxYMid meet" role="img" aria-label="Map: Lisbon to Lagoa de Santo André">
        <rect class="m-sea" width="400" height="441"/>
        <path class="m-land" d="${COAST}"/>
        <ellipse class="m-lagoon" cx="276" cy="310" rx="9" ry="4.5" transform="rotate(-20 276 310)"/>
        <path class="m-route" d="${ROUTE}"/>
        ${motion}
        <circle class="m-pin" cx="160" cy="62" r="6"/>
        <path class="m-tent" d="M276 296 l9 14 h-18 z"/>
        <text class="m-label" x="172" y="54">Lisboa</text>
        <text class="m-label" x="292" y="314">Lagoa de</text>
        <text class="m-label" x="292" y="330">Santo André</text>
        <text class="m-sea-label" x="40" y="300">Atlântico</text>
      </svg>`;
  }

  function render() {
    const o = D.origin, s = D.sport, g = D.games, m = D.music;
    let n = 0;
    root.innerHTML = `
      <article class="l-card l-wide l-origin" id="l-origin">
        <div>
          <p class="eyebrow mono">${esc(L(o.title).toLowerCase())}</p>
          <h3>${esc(L(o.title))}</h3>
          <p class="l-text">${esc(L(o.text))}</p>
          <ul class="places">${o.places.map((p, i) => `<li><span class="pl-dot ${i ? "pl-tent" : ""}"></span><b>${esc(p.name)}</b><span class="mono">${esc(L(p.note))}</span></li>`).join("")}</ul>
        </div>
        <div class="map-wrap">${map()}</div>
      </article>

      <article class="l-card l-sport" id="l-sport">
        <p class="eyebrow mono">${esc(L(s.title).toLowerCase())}</p>
        <h3>${esc(L(s.title))}</h3>
        <p class="l-text">${esc(L(s.text))}</p>
        <ul class="sports">${s.list.map((x, i) => `<li class="sport" data-i="${i}">${esc(L(x))}</li>`).join("")}</ul>
        <div class="pick-row"><button class="btn btn-dark btn-sm" data-pick>${esc(L(s.pick))} ${A.icon("restart")}</button><p class="pick-out mono" aria-live="polite"></p></div>
      </article>

      <article class="l-card l-music" id="l-music">
        <p class="eyebrow mono">${esc(L(m.title).toLowerCase())}</p>
        <h3>${esc(L(m.title))}</h3>
        <p class="l-text">${esc(L(m.text))}</p>
        <div class="player">
          <div class="np">
            <div class="np-cover"><span class="eq">${"<i></i>".repeat(5)}</span></div>
            <div class="np-meta"><span class="np-state mono"></span><b class="np-name"></b><span class="np-genre mono">${esc(L(m.genre))}</span></div>
          </div>
          <div class="np-track"><i class="np-fill"></i></div>
          <div class="np-ctrls">
            <button data-pl="prev" aria-label="Previous">${A.icon("prev")}</button>
            <button data-pl="toggle" class="np-play" aria-label="Play">${A.icon("play")}</button>
            <button data-pl="next" aria-label="Next">${A.icon("next")}</button>
          </div>
          <ol class="tracks">${m.bands.map((b, i) => `<li><button data-band="${i}"><span class="mono">${String(i + 1).padStart(2, "0")}</span>${esc(b)}<span class="eq eq-mini">${"<i></i>".repeat(3)}</span></button></li>`).join("")}</ol>
          <p class="np-note mono">${esc(L(m.note))}</p>
        </div>
      </article>

      <article class="l-card l-wide l-games" id="l-games">
        <div class="l-games-head">
          <div>
            <p class="eyebrow mono">${esc(L(g.title).toLowerCase())}</p>
            <h3>${esc(L(g.title))}</h3>
            <p class="l-text">${esc(L(g.text))}</p>
          </div>
          <p class="board mono">${esc(L(g.board))}</p>
        </div>
        ${g.shelves.map((sh) => `
          <div class="shelf">
            <p class="shelf-label mono">${esc(L(sh.label))}</p>
            <div class="carts">${sh.items.map((it) => `<button class="cart" style="--c:${CART[n++ % CART.length]}" aria-label="${esc(it)}"><span class="cart-label">${esc(it)}</span></button>`).join("")}</div>
          </div>`).join("")}
      </article>`;
    nav.innerHTML = [["l-origin", o.title], ["l-sport", s.title], ["l-games", g.title], ["l-music", m.title]]
      .map(([id, tt]) => `<button data-goto="${id}" data-lnav="${id}">${esc(L(tt))}</button>`).join("");
    paint();
  }

  /* ---------------- sport: pick one for the weekend ---------------- */
  let picking = false;
  root.addEventListener("click", async (e) => {
    if (!e.target.closest("[data-pick]") || picking) return;
    picking = true;
    const items = $$(".sport", root), out = $(".pick-out", root);
    const end = (Math.random() * items.length) | 0, laps = items.length * 2 + end;
    out.textContent = "";
    for (let k = 0; k <= laps; k++) {
      items.forEach((el, i) => el.classList.toggle("hot", i === k % items.length));
      await new Promise((r) => setTimeout(r, A.reduced ? 0 : 50 + k * 5));
    }
    items.forEach((el, i) => { el.classList.remove("hot"); el.classList.toggle("picked", i === end); });
    out.textContent = `${L(D.sport.picked)} ${L(D.sport.list[end])}`;
    picking = false;
  });

  /* ---------------- music: a silent player ---------------- */
  const P = { i: 0, playing: false, p: 0, timer: null };
  function paint() {
    const pl = $(".player", root); if (!pl) return;
    pl.classList.toggle("playing", P.playing);
    $(".np-name", pl).textContent = D.music.bands[P.i];
    $(".np-state", pl).textContent = L(P.playing ? D.music.now : D.music.paused);
    $(".np-fill", pl).style.width = `${P.p}%`;
    const btn = $(".np-play", pl); btn.innerHTML = A.icon(P.playing ? "pause" : "play"); btn.setAttribute("aria-label", P.playing ? "Pause" : "Play");
    $$("[data-band]", pl).forEach((b) => b.classList.toggle("on", +b.dataset.band === P.i));
  }
  function play(on) {
    P.playing = on; clearInterval(P.timer);
    if (on) P.timer = setInterval(() => { P.p += 0.6; if (P.p >= 100) { P.p = 0; P.i = (P.i + 1) % D.music.bands.length; } paint(); }, 120);
    paint();
  }
  root.addEventListener("click", (e) => {
    const b = e.target.closest("[data-band]");
    if (b) { P.i = +b.dataset.band; P.p = 0; play(true); return; }
    const c = e.target.closest("[data-pl]"); if (!c) return;
    const n = D.music.bands.length;
    if (c.dataset.pl === "toggle") play(!P.playing);
    if (c.dataset.pl === "next") { P.i = (P.i + 1) % n; P.p = 0; paint(); }
    if (c.dataset.pl === "prev") { P.i = (P.i - 1 + n) % n; P.p = 0; paint(); }
  });

  /* ---------------- nav highlight + mode ---------------- */
  function onScroll() {
    if (A.mode() !== "life") return;
    let cur = null;
    $$(".l-card", root).forEach((c) => { if (c.getBoundingClientRect().top < innerHeight * 0.45) cur = c.id; });
    $$("[data-lnav]", nav).forEach((b) => b.classList.toggle("on", b.dataset.lnav === cur));
  }
  addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("mode:change", (e) => { if (e.detail.mode !== "life") play(false); onScroll(); });
  document.addEventListener("lang:change", render);
  render();
  window.LIFEUI = { render };
})();
