/* ==========================================================================
   APP · rendering, filters, scroll, project drawer, i18n, curate.
   Content lives in js/projects.js.

   Every year uses the same layout. The craft grows quietly (.lvl-1 … .lvl-7):
   2017 is plain, then hover states, lift, scroll reveals, a cursor light,
   live demos, and 2026 goes dark.
   ========================================================================== */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
    del(k) { try { localStorage.removeItem(k); } catch { /* storage unavailable */ } }
  };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const params = new URLSearchParams(location.search);

  /* ---------------- i18n ---------------- */
  const UI = {
    en: {
      skip: "Skip to the work", terminal: "Terminal", seeWork: "See the work", tryTerm: "Try the terminal", openTerm: "Open the terminal",
      hi: "Hi, I'm Ricardo.",
      heroTitle: "I build websites and apps, and lead the teams that ship them.",
      heroSub: "Full-stack developer and team lead at Tinsight, based in Portugal.",
      fYears: "years at Tinsight", fProjects: "projects", fLead: "as project lead", fApps: "mobile apps",
      workEyebrow: "the work", workTitle: "Year by year",
      workSub: "Every project I've worked on at Tinsight, oldest first. The site levels up as you scroll, a bit like I did.",
      skillsEyebrow: "the stack", skillsTitle: "What I build with", skillsSub: "My package.json, give or take. Hover a dependency to see when and where I used it.",
      pkgVersion: "years at Tinsight", pkgOnce: "once each", pkgRun: "click to run", more: "more", showIn: "Show these projects",
      endTitle: "Let's talk.", endSub: "I'm on GitHub, GitLab and LinkedIn.", print: "Print as CV",
      colophon: "Hand-written HTML, CSS and JavaScript. No frameworks were harmed.",
      all: "All", fLeadF: "Project lead", fChallenge: "Big challenges", fMobile: "Mobile", fTool: "Internal tools", fSupport: "Support",
      empty: "Nothing here with that filter. Try another one.", clear: "Clear",
      newIn: "New this year", details: "Details", close: "Close", prev: "Previous", next: "Next",
      year: "Year", role: "Role", client: "Client", stack: "Stack", highlights: "Highlights", links: "Links",
      dev: "Developer", lead: "Project lead", support: "Support", notLive: "Not live", challenge: "Big challenge", tool: "Internal tool", stillGoing: "Still going", since: "since",
      projects: "projects", project: "project", also: "Also", phoneTitle: "Live preview",
      curateTitle: "Curate", curateSub: "Switch projects on or off. Changes stay in this browser until you download the file and replace js/projects.js.",
      download: "Download projects.js", reset: "Reset"
    },
    pt: {
      skip: "Saltar para o trabalho", terminal: "Terminal", seeWork: "Ver o trabalho", tryTerm: "Experimenta o terminal", openTerm: "Abrir o terminal",
      hi: "Olá, sou o Ricardo.",
      heroTitle: "Faço sites e apps, e lidero as equipas que os põem no ar.",
      heroSub: "Programador full-stack e líder de equipa na Tinsight, em Portugal.",
      fYears: "anos na Tinsight", fProjects: "projetos", fLead: "como líder de projeto", fApps: "apps móveis",
      workEyebrow: "o trabalho", workTitle: "Ano a ano",
      workSub: "Todos os projetos em que trabalhei na Tinsight, do mais antigo para o mais recente. O site vai evoluindo à medida que desces, um pouco como eu.",
      skillsEyebrow: "a stack", skillsTitle: "Com que trabalho", skillsSub: "O meu package.json, mais coisa menos coisa. Passa o rato por uma dependência para ver quando e onde a usei.",
      pkgVersion: "anos na Tinsight", pkgOnce: "usadas uma vez", pkgRun: "clica para executar", more: "mais", showIn: "Ver estes projetos",
      endTitle: "Vamos falar.", endSub: "Estou no GitHub, no GitLab e no LinkedIn.", print: "Imprimir como CV",
      colophon: "HTML, CSS e JavaScript escritos à mão. Nenhuma framework foi magoada.",
      all: "Todos", fLeadF: "Líder de projeto", fChallenge: "Grandes desafios", fMobile: "Mobile", fTool: "Ferramentas internas", fSupport: "Suporte",
      empty: "Nada por aqui com esse filtro. Experimenta outro.", clear: "Limpar",
      newIn: "Novidades deste ano", details: "Detalhes", close: "Fechar", prev: "Anterior", next: "Seguinte",
      year: "Ano", role: "Função", client: "Cliente", stack: "Stack", highlights: "Destaques", links: "Links",
      dev: "Programador", lead: "Líder de projeto", support: "Suporte", notLive: "Não publicado", challenge: "Grande desafio", tool: "Ferramenta interna", stillGoing: "Ainda em curso", since: "desde",
      projects: "projetos", project: "projeto", also: "E ainda", phoneTitle: "Pré-visualização",
      curateTitle: "Escolher", curateSub: "Liga ou desliga projetos. As alterações ficam guardadas neste browser até descarregares o ficheiro e substituíres o js/projects.js.",
      download: "Descarregar projects.js", reset: "Repor"
    }
  };

  let lang = store.get("ra.lang", (navigator.language || "en").toLowerCase().startsWith("pt") ? "pt" : "en");
  if (params.get("lang") === "pt" || params.get("lang") === "en") lang = params.get("lang");
  let mode = location.hash === "#life" ? "life" : "work"; // work | life (js/personal.js)
  const t = (k) => (UI[lang] && UI[lang][k]) ?? UI.en[k] ?? k;
  const L = (o) => (o == null ? "" : typeof o === "string" ? o : (o[lang] ?? o.en ?? ""));

  /* ---------------- data ---------------- */
  const ERAS = window.ERAS;
  const ALL = window.PROJECTS;
  const curating = params.has("curate");
  let overrides = curating ? store.get("ra.curate", {}) : {};
  const isShown = (p) => (p.id in overrides ? overrides[p.id] : p.show !== false);
  const visible = (eraId) => ALL.filter((p) => (!eraId || p.era === eraId) && isShown(p));
  const eraOf = (id) => ERAS.find((e) => e.id === id);
  const byId = (id) => ALL.find((p) => p.id === id);
  const lvlOf = (id) => Math.max(1, ERAS.findIndex((e) => e.id === id) + 1);
  const isMobile = (p) => p.stack.some((s) => /react native|expo/i.test(s));
  const skillName = (s) => s.replace(/\s+\d+$/, "").replace(/ Pro$/, "");

  const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  const rng = (seed) => () => { seed = (seed + 0x6d2b79f5) | 0; let x = Math.imul(seed ^ (seed >>> 15), 1 | seed); x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x; return ((x ^ (x >>> 14)) >>> 0) / 4294967296; };
  const PALETTE = ["#2f6fed", "#e8590c", "#0c8a6a", "#b5338a", "#6741d9", "#c2410c", "#0b7285", "#a61e4d"];
  const colorOf = (p) => PALETTE[hash(p.id) % PALETTE.length];


  /* ---------------- icons · one line set, drawn in currentColor (no emoji anywhere) ---------------- */
  const ICONS = {
    star: '<path class="f" d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    play: '<path class="f" d="M8 5.5v13l10.5-6.5z"/>',
    pause: '<path class="f" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/>',
    prev: '<path d="M6 5v14"/><path class="f" d="M19 5.5v13L9 12z"/>',
    next: '<path d="M18 5v14"/><path class="f" d="M5 5.5v13L15 12z"/>',
    restart: '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4.5 4.5v4h4"/>',
    heart: '<path class="f" d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>',
    like: '<path d="M7 10.5V20H4v-9.5zM7 10.5L11 3c1.6 0 2.6 1.1 2.3 2.7L12.6 9.5h5.6a2 2 0 0 1 2 2.4l-1.3 6.4a2 2 0 0 1-2 1.7H7"/>',
    plane: '<path d="M21 3L3 10.5l7.2 2.3L12.5 20z"/><path d="M10.2 12.8L21 3"/>',
    van: '<path d="M3 6.5h12l3.5 4.5H21v5.5H3z"/><path d="M15 6.5V11h3.5M3 11h12"/><circle cx="7.5" cy="17" r="1.8"/><circle cx="16.5" cy="17" r="1.8"/>',
    bed: '<path d="M3 19V6M3 14h18v5M21 14a3.5 3.5 0 0 0-3.5-3.5H11V14"/><circle cx="7" cy="11" r="1.7"/>',
    stadium: '<ellipse cx="12" cy="9.5" rx="9" ry="3.5"/><path d="M3 9.5v5c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5v-5"/><path d="M8 12.6v5.2M16 12.6v5.2"/>',
    dinner: '<path d="M6 3v6a2 2 0 0 0 4 0V3M8 11v10M8 3v5"/><path d="M17 21V3c-2.2 1.2-3.5 3.5-3.5 7 0 2.4 1.2 3.5 3.5 3.5"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path class="f" d="M15.8 8.2l-2.3 5.3-5.3 2.3 2.3-5.3z"/>',
    exchange: '<path d="M4 8.5h14l-3.5-3.5M20 15.5H6l3.5 3.5"/>',
    chat: '<path d="M4 5.5h16v11H10l-6 4z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
    coffee: '<path d="M4 9h12v4.5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5v2.5M12 3.5v2.5"/>',
    ball: '<circle cx="12" cy="12" r="9"/><path class="f" d="M12 7.6l3.6 2.6-1.4 4.3H9.8l-1.4-4.3z"/><path d="M12 3v4.6M21 10.5l-5.4-.3M17.6 19.3l-3.4-4.8M6.4 19.3l3.4-4.8M3 10.5l5.4-.3"/>',
    gift: '<path d="M4.5 11h15v9.5h-15zM3 7.5h18V11H3zM12 7.5v13"/><path d="M12 7.5C10.5 4 7 4 7 6s3 1.5 5 1.5zM12 7.5C13.5 4 17 4 17 6s-3 1.5-5 1.5z"/>',
    bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l2 2H4z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    umbrella: '<path d="M3.5 12a8.5 8.5 0 0 1 17 0z"/><path d="M12 12v6.5a2 2 0 0 0 4 0M12 3.5V2.5"/>',
    cake: '<path d="M4 20.5h16M5.5 20.5V13h13v7.5"/><path d="M5.5 16c2 1.4 4.3 1.4 6.5 0s4.5-1.4 6.5 0M12 13V9.5"/><path class="f" d="M12 5.2c.9 1 1.2 1.8.6 2.6-.4.4-1 .4-1.3 0-.6-.8-.2-1.6.7-2.6z"/>',
    paw: '<path class="f" d="M12 12.5c2.8 0 5 2.5 5 4.8 0 1.6-1.4 2.2-2.6 2.2-1 0-1.5-.5-2.4-.5s-1.4.5-2.4.5C8.4 19.5 7 18.9 7 17.3c0-2.3 2.2-4.8 5-4.8z"/><circle class="f" cx="6" cy="10.5" r="1.8"/><circle class="f" cx="9.5" cy="6.8" r="1.8"/><circle class="f" cx="14.5" cy="6.8" r="1.8"/><circle class="f" cx="18" cy="10.5" r="1.8"/>',
    mountain: '<path d="M2.5 19.5l6.5-11 4.5 7 2.5-3.5 5.5 7.5z"/><circle cx="17.5" cy="6" r="2"/>'
  };
  const icon = (name, cls = "") => `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`;

  /* ---------------- filters ---------------- */
  const FILTERS = [
    ["all", "all", () => true],
    ["lead", "fLeadF", (p) => (p.roles || []).includes("lead")],
    ["challenge", "fChallenge", (p) => !!p.challenge],
    ["mobile", "fMobile", isMobile],
    ["tool", "fTool", (p) => p.kind === "tool"],
    ["support", "fSupport", (p) => (p.roles || []).includes("support")]
  ];
  let filter = "all", skill = null;
  const matches = (p) => FILTERS.find((f) => f[0] === filter)[2](p) && (!skill || p.stack.some((s) => skillName(s) === skill));

  // projects that run past their year: { year: "2025", until: "2026" }
  const yearsOf = (p) => { const out = []; for (let y = +p.year; y <= +(p.until || p.year); y++) out.push(y); return out; };
  const yearLabel = (p) => (p.until && p.until !== p.year ? `${p.year}–${p.until}` : p.year);

  /* ---------------- little builders ---------------- */
  function tags(p, withYear = true) {
    const out = [];
    if (withYear) out.push(`<span class="tag tag-year mono">${esc(yearLabel(p))}</span>`);
    if (p.challenge) out.push(`<span class="tag tag-challenge">${icon("star")} ${esc(t("challenge"))}</span>`);
    (p.roles || []).forEach((r) => out.push(`<span class="tag tag-${r}">${esc(t(r))}</span>`));
    if (p.kind === "tool") out.push(`<span class="tag tag-tool">${esc(t("tool"))}</span>`);
    if (p.status === "not-live") out.push(`<span class="tag tag-off">${esc(t("notLive"))}</span>`);
    return `<div class="tags">${out.join("")}</div>`;
  }
  const chips = (list) => `<ul class="chips">${list.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`;
  const roleText = (p) => [...(p.roles || []).map((r) => t(r)), ...(p.status === "not-live" ? [t("notLive")] : [])].join(", ");

  /* A wireframe of the thing, not a fake screenshot: a browser for sites, a phone for apps. */
  function mock(p) {
    const r = rng(hash(p.id)), b = p.brand || {}, c = b.c || colorOf(p);
    // real brand colours when the project has them (brand: { c, c2, bg }), generated ones otherwise
    const vars = `--c:${c};--hero:${b.grad ? `linear-gradient(120deg, ${b.grad.join(", ")})` : c};--logo:${b.c2 || c};--btn:${b.c2 || "#fff"};--tile:${b.c2 || c};--pg:${b.bg || "#fff"}`;
    const name = esc(p.client ? p.client.split(",")[0] : L(p.title));
    if (isMobile(p)) {
      return `<div class="mock mock-phone" style="${vars}"><div class="mp-notch"></div>
        <div class="mp-hero"><i class="l w60"></i><b>${name}</b></div>
        ${[0, 1, 2].map(() => `<div class="mp-row"><span></span><div><i class="l w${[70, 50, 80][(r() * 3) | 0]}"></i><i class="l w40"></i></div></div>`).join("")}
        <div class="mp-nav"><i></i><i></i><i></i><i></i></div></div>`;
    }
    const url = p.links && p.links[0] ? p.links[0].label : p.status === "not-live" ? "staging" : "";
    const v = (r() * 3) | 0;
    const nav = `<div class="mw-nav"><span class="mw-logo"></span><i></i><i></i><i></i><i></i></div>`;
    const hero = v === 1
      ? `<div class="mw-split"><div><b>${name}</b><i class="l w80"></i><i class="l w60"></i><span class="mw-btn"></span></div><div class="mw-img"></div></div>`
      : `<div class="mw-hero ${v === 2 ? "center" : ""}"><b>${name}</b><i class="l w50"></i><span class="mw-btn"></span></div>`;
    const grid = `<div class="mw-grid">${[0, 1, 2].map(() => `<div><span></span><i class="l w${[60, 80, 70][(r() * 3) | 0]}"></i><i class="l w40"></i></div>`).join("")}</div>`;
    return `<div class="mock mock-web ${p.brand ? "branded" : ""}" style="${vars}"><div class="mw-bar"><span class="mw-dots"><i></i><i></i><i></i></span><span class="mw-url mono">${esc(url)}</span></div><div class="mw-page">${nav}${hero}${grid}</div></div>`;
  }

  function card(p) {
    return `
      <article class="card" id="${p.id}" data-open="${p.id}" tabindex="0" aria-label="${esc(L(p.title))}">
        ${tags(p)}
        <h3 class="card-title">${esc(L(p.title))}</h3>
        <p class="card-ctx">${esc(L(p.context))}</p>
        <p class="card-sum">${esc(L(p.summary))}</p>
        <div class="card-foot">${chips(p.stack.slice(0, 4))}<span class="card-go" aria-hidden="true">→</span></div>
      </article>`;
  }

  function feature(p) {
    const link = p.links && p.links[0];
    return `
      <article class="card card--feature" id="${p.id}">
        <div class="f-text">
          ${tags(p)}
          <h3 class="card-title">${esc(L(p.title))}</h3>
          <p class="card-ctx">${esc(L(p.context))}</p>
          <p class="f-sum">${esc(L(p.summary))}</p>
          ${p.stats ? `<div class="stats">${p.stats.map((s) => `<div><b><span data-count="${s.n}">${s.n}</span>${s.plus ? "+" : ""}</b><span>${esc(L(s.l))}</span></div>`).join("")}</div>` : ""}
          ${chips(p.stack)}
          <div class="f-actions">
            <button class="btn btn-dark btn-sm" data-open="${p.id}">${esc(t("details"))} <span aria-hidden="true">→</span></button>
            ${link ? `<a class="ext" href="${esc(link.url)}" target="_blank" rel="noopener">${esc(link.label)} ↗</a>` : ""}
          </div>
        </div>
        <div class="f-media">${p.demo ? `<div class="demo" data-demo="${p.demo}" data-project="${p.id}"></div>` : mock(p)}</div>
      </article>`;
  }

  const carried = (era) => {
    const [a, b] = era.years.split("–").map(Number);
    return visible().filter((p) => p.until && p.era !== era.id && matches(p) && +p.year < a && +p.until >= a && +p.until <= (b || a)).sort((x, y) => x.year - y.year);
  };
  function renderYear(era, ps, idx) {
    // 2023 and 2024 share a level; the last year is always the dark one
    const lvl = idx === ERAS.length - 1 ? 7 : Math.min(6, idx + 1);
    const feats = ps.filter((p) => p.feature), rest = ps.filter((p) => !p.feature);
    const [y1, y2] = era.years.split("–");
    return `
      <section class="yr lvl-${lvl}" id="${era.id}" data-era="${era.id}" aria-label="${esc(era.years)}">
        <header class="yr-side">
          <div class="yr-sticky">
            <p class="yr-year" data-egg-year="${era.id}">${esc(y1)}${y2 ? `<span>–${esc(y2.slice(-2))}</span>` : ""}</p>
            <h3 class="yr-title">${esc(L(era.title))}</h3>
            <p class="yr-intro">${esc(L(era.intro))}</p>
            <p class="yr-new mono">${esc(t("newIn"))}</p>
            <ul class="chips chips-new">${L(era.unlock).split(/,\s*/).map((s) => `<li>+ ${esc(s)}</li>`).join("")}</ul>
          </div>
        </header>
        <div class="yr-cards">
          ${feats.map(feature).join("")}
          ${rest.length ? `<div class="grid">${rest.map(card).join("")}</div>` : ""}
          ${(() => { const cs = carried(era); return cs.length ? `<div class="yr-conts"><p class="yr-new mono">${esc(t("stillGoing"))} <span>${cs.length}</span></p>${cs.map((p) => `<button class="yr-cont" data-open="${p.id}"><span class="mono">${esc(t("since"))} ${esc(p.year)}</span><b>${esc(L(p.title))}</b><span class="yr-cont-ctx">${esc(L(p.context))}</span><span class="yr-cont-go" aria-hidden="true">→</span></button>`).join("")}</div>` : ""; })()}
        </div>
      </section>`;
  }

  /* ---------------- render ---------------- */
  const timeline = $("#timeline");
  function renderTimeline() {
    timeline.innerHTML = ERAS.map((era, i) => { const ps = visible(era.id).filter(matches); return ps.length ? renderYear(era, ps, i) : ""; }).join("");
    const n = visible().filter(matches).length;
    $("#empty").hidden = n > 0;
    $("#empty").innerHTML = `${esc(t("empty"))} <button class="ext" data-filter="all">${esc(t("clear"))}</button>`;
    bindTimeline();
    renderYearsNav();
    layout();
    document.dispatchEvent(new CustomEvent("timeline:rendered", { detail: { root: timeline } }));
  }

  function renderFilters() {
    const base = visible();
    $("#filters").innerHTML = FILTERS.map(([id, key, fn]) => {
      const n = base.filter(fn).length; if (!n && id !== "all") return "";
      return `<button class="filter ${filter === id ? "on" : ""}" data-filter="${id}" aria-pressed="${filter === id}">${esc(t(key))} <span class="mono">${n}</span></button>`;
    }).join("") + (skill ? `<button class="filter on filter-skill" data-skill-clear>${esc(skill)} <span aria-hidden="true">×</span></button>` : "");
  }

  function setFilter(f, s = skill) {
    filter = FILTERS.some((x) => x[0] === f) ? f : "all";
    skill = s;
    renderFilters(); renderTimeline(); renderStack();
  }

  function renderYearsNav() {
    // every calendar year gets a button; years inside a combined block (2018, 2020) jump to it
    const shown = ERAS.filter((e) => visible(e.id).some(matches));
    const span = (e) => { const [a, b] = e.years.split("–").map(Number); return [a, b || a]; };
    const out = [];
    if (shown.length) for (let y = span(shown[0])[0]; y <= span(shown[shown.length - 1])[1]; y++) {
      const e = shown.find((x) => y >= span(x)[0] && y <= span(x)[1]);
      if (e) out.push(`<button data-goto="${e.id}" data-nav="${e.id}">${y}</button>`);
    }
    $("#years").innerHTML = out.join("");
  }

  function renderHero() {
    const ps = visible(), Lf = mode === "life" && window.LIFE;
    let facts;
    if (Lf) {
      $("#heroHi").textContent = L(Lf.hi);
      $("#heroTitle").textContent = L(Lf.title);
      $("#heroSub").textContent = L(Lf.sub);
      facts = [
        [Lf.born, L(Lf.facts.born)],
        [Lf.sport.list.length, L(Lf.facts.sports)],
        [Lf.games.shelves.reduce((n, sh) => n + sh.items.length, 0), L(Lf.facts.games)],
        [Lf.music.bands.length, L(Lf.facts.bands)]
      ];
    } else {
      $("#heroHi").textContent = t("hi");
      $("#heroTitle").textContent = t("heroTitle");
      $("#heroSub").textContent = t("heroSub");
      facts = [
        [new Date().getFullYear() - 2017, t("fYears")],
        [ps.length, t("fProjects")],
        [ps.filter((p) => (p.roles || []).includes("lead")).length, t("fLead")],
        [ps.filter(isMobile).length, t("fApps")]
      ];
    }
    $("#facts").innerHTML = facts.map(([n, l]) => `<div><dt>${n}</dt><dd>${esc(l)}</dd></div>`).join("");
    $("#heroCta").dataset.goto = Lf ? "life" : "work";
    $("#heroCtaL").textContent = Lf ? L(Lf.cta) : t("seeWork");
  }

  /* ---------------- work | life ---------------- */
  function applyMode() {
    document.body.dataset.mode = mode;
    $$("[data-set-mode]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.setMode === mode)));
    if (!location.hash || location.hash === "#life") history.replaceState(null, "", location.pathname + location.search + (mode === "life" ? "#life" : ""));
  }
  function setMode(m) {
    if ((m !== "work" && m !== "life") || m === mode) return Promise.resolve();
    return new Promise((done) => {
      const swap = () => {
        mode = m; applyMode(); renderHero();
        document.dispatchEvent(new CustomEvent("mode:change", { detail: { mode } }));
        window.scrollTo(0, 0); layout();
      };
      if (reduced) { swap(); done(); return; }
      document.body.classList.add("swapping");
      setTimeout(() => { swap(); requestAnimationFrame(() => { document.body.classList.remove("swapping"); done(); }); }, 240);
    });
  }


  /* the stack, as a package.json. Hover a dependency to see when and where. */
  let stackSel = null;
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  function stackEntries() {
    const ps = visible(), map = new Map();
    ps.forEach((p) => new Set(p.stack.map(skillName)).forEach((s) => { if (!map.has(s)) map.set(s, []); map.get(s).push(p); }));
    const deps = [...map].map(([s, list]) => ({ id: s, key: slug(s), list }));
    const lead = ps.filter((p) => (p.roles || []).includes("lead"));
    if (lead.length) deps.push({ id: "@lead", key: "project-lead", list: lead, label: t("lead") });
    return deps.sort((a, b) => b.list.length - a.list.length || a.key.localeCompare(b.key));
  }
  const range = (list) => { const ys = list.flatMap(yearsOf); const a = Math.min(...ys), b = Math.max(...ys); return a === b ? `${a}` : `${a} → ${b}`; };

  function renderStack() {
    const deps = stackEntries(), main = deps.filter((d) => d.list.length > 1), once = deps.filter((d) => d.list.length === 1);
    if (!deps.some((d) => d.id === stackSel)) stackSel = main[0] ? main[0].id : null;
    const S = (x) => `<span class="s">"${esc(x)}"</span>`, K = (x) => `<span class="k">"${esc(x)}"</span>`, P = (x) => `<span class="p">${x}</span>`, C = (x) => `<span class="c">// ${esc(x)}</span>`;
    const years = new Date().getFullYear() - 2017;
    const width = Math.max(...main.map((d) => d.key.length + range(d.list).length)) + 9;
    const lines = [
      P("{"),
      `  ${K("name")}${P(":")} ${S("ricardo-amaral")}${P(",")}`,
      `  ${K("version")}${P(":")} ${S(`${years}.0.0`)}${P(",")}   ${C(t("pkgVersion"))}`,
      `  ${K("description")}${P(":")} ${S(L(window.PROFILE.role))}${P(",")}`,
      `  ${K("dependencies")}${P(": {")}`,
      ...main.map((d, i) => {
        const txt = `"${d.key}": "${range(d.list)}"${i < main.length - 1 ? "," : ""}`;
        return { dep: d.id, html: `    ${K(d.key)}${P(":")} ${S(range(d.list))}${i < main.length - 1 ? P(",") : ""}${" ".repeat(Math.max(2, width - txt.length))}${C(`${d.list.length} ${t("projects")}`)}` };
      }),
      `  ${P("},")}`,
      once.length ? { wrap: true, html: `  ${K("alsoUsed")}${P(": [")} ${once.map((d, i) => `<span class="nw"><button type="button" class="dep-inline" data-dep="${esc(d.id)}">${S(d.key)}</button>${i < once.length - 1 ? P(",") : ""}</span>`).join(" ")} ${P("],")}  ${C(t("pkgOnce"))}` } : "",
      { wrap: true, html: `  ${K("workflow")}${P(": [")} ${(window.PROFILE.skills["Ways of working"] || []).filter((x) => !/leader/i.test(x)).map((x, i, arr) => `<span class="nw">${S(slug(x))}${i < arr.length - 1 ? P(",") : ""}</span>`).join(" ")} ${P("],")}` },
      `  ${K("scripts")}${P(": {")}`,
      { run: "hire", html: `    ${K("hire")}${P(":")} ${S("open ./contact")}${P(",")}  ${C(t("pkgRun"))}` },
      { run: "terminal", html: `    ${K("terminal")}${P(":")} ${S("open ./terminal")}` },
      `  ${P("}")}`,
      P("}")
    ].filter(Boolean);
    $("#code").innerHTML = lines.map((l) => {
      if (typeof l === "string") return `<div class="ln">${l}</div>`;
      if (l.dep) return `<button type="button" class="ln ln-dep ${l.dep === stackSel ? "on" : ""}" data-dep="${esc(l.dep)}">${l.html}</button>`;
      if (l.run) return `<button type="button" class="ln ln-run" data-run="${l.run}" title="npm run ${l.run}">${l.html}</button>`;
      return `<div class="ln ${l.wrap ? "ln-wrap" : ""}">${l.html}</div>`;
    }).join("");
    renderPreview();
  }

  function renderPreview() {
    const d = stackEntries().find((x) => x.id === stackSel);
    const box = $("#stackPreview");
    if (!d) { box.innerHTML = ""; return; }
    const all = visible(), y0 = 2017, y1 = Math.max(...all.flatMap(yearsOf));
    const by = {}; d.list.forEach((p) => yearsOf(p).forEach((y) => (by[y] = (by[y] || 0) + 1)));
    const max = Math.max(...Object.values(by));
    const bars = []; for (let y = y0; y <= y1; y++) bars.push(`<div class="pv-bar ${by[y] ? "has" : ""}" title="${y}: ${by[y] || 0}"><b><i style="height:${by[y] ? 18 + (by[y] / max) * 82 : 4}%"></i></b><span>${String(y).slice(-2)}</span></div>`);
    const list = d.list.slice().sort((a, b) => b.year - a.year), shown = list.slice(0, 6);
    box.innerHTML = `
      <p class="pv-k mono">${esc(d.key)}</p>
      <h3 class="pv-name">${esc(d.label || d.id)}</h3>
      <p class="pv-meta">${esc(range(d.list))} · ${d.list.length} ${esc(t(d.list.length === 1 ? "project" : "projects"))}</p>
      <div class="pv-bars">${bars.join("")}</div>
      <ul class="pv-list">${shown.map((p) => `<li><button data-open="${p.id}"><span class="mono">${esc(yearLabel(p))}</span>${esc(L(p.title))}<span class="pv-go" aria-hidden="true">→</span></button></li>`).join("")}</ul>
      ${list.length > shown.length ? `<p class="pv-more mono">+ ${list.length - shown.length} ${esc(t("more"))}</p>` : ""}
      <button class="btn btn-dark btn-sm" data-stack-go="${esc(d.id)}">${esc(t("showIn"))} <span aria-hidden="true">→</span></button>`;
  }
  function selectDep(id) {
    if (!id || id === stackSel) return;
    stackSel = id;
    $$("#code [data-dep]").forEach((b) => b.classList.toggle("on", b.dataset.dep === id));
    renderPreview();
  }
  $("#code").addEventListener("mouseover", (e) => { const b = e.target.closest("[data-dep]"); if (b) selectDep(b.dataset.dep); });
  $("#code").addEventListener("focusin", (e) => { const b = e.target.closest("[data-dep]"); if (b) selectDep(b.dataset.dep); });
  $("#code").addEventListener("click", (e) => {
    const b = e.target.closest("[data-dep]"); if (b) { selectDep(b.dataset.dep); if (innerWidth < 900) $("#stackPreview").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" }); return; }
    const r = e.target.closest("[data-run]");
    if (r && r.dataset.run === "hire" && window.EGGS) window.EGGS.hire();
    if (r && r.dataset.run === "terminal" && window.TERM) window.TERM.open();
  });

  function bindTimeline() {
    // scroll reveal, from 2022 on
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    $$(".lvl-4 .card, .lvl-5 .card, .lvl-6 .card, .lvl-7 .card", timeline).forEach((el) => (reduced ? el.classList.add("in") : (el.classList.add("rv"), io.observe(el))));

    // numbers count up, from 2022 on
    const co = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        co.unobserve(e.target);
        const el = e.target, to = +el.dataset.count, t0 = performance.now();
        const step = (now) => { const k = clamp((now - t0) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 4))); if (k < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    if (!reduced) $$(".lvl-4 [data-count], .lvl-5 [data-count], .lvl-6 [data-count], .lvl-7 [data-count]", timeline).forEach((el) => { el.textContent = "0"; co.observe(el); });
  }

  // a soft light that follows the cursor on cards, from 2023 on
  timeline.addEventListener("pointermove", (e) => {
    const c = e.target.closest(".lvl-5 .card, .lvl-6 .card, .lvl-7 .card"); if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", `${e.clientX - r.left}px`);
    c.style.setProperty("--my", `${e.clientY - r.top}px`);
  });

  /* ---------------- interactions ---------------- */
  document.addEventListener("click", (e) => {
    const sm = e.target.closest("[data-set-mode]");
    if (sm) { setMode(sm.dataset.setMode); return; }
    if (e.target.closest(".demo")) { /* demos handle their own clicks */ if (!e.target.closest("[data-open]")) return; }
    if (e.target.closest("a[href]")) return;
    const opener = e.target.closest("[data-open]");
    if (opener) { e.preventDefault(); openModal(opener.dataset.open); return; }
    const go = e.target.closest("[data-goto]");
    if (go) { e.preventDefault(); goto(go.dataset.goto); return; }
    const f = e.target.closest("[data-filter]");
    if (f) { setFilter(f.dataset.filter, null); return; }
    if (e.target.closest("[data-skill-clear]")) { setFilter(filter, null); return; }
    const sg = e.target.closest("[data-stack-go]");
    if (sg) { const id = sg.dataset.stackGo; id === "@lead" ? setFilter("lead", null) : setFilter("all", id); goto("work"); }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.matches(".card[data-open]")) openModal(e.target.dataset.open); });

  function goto(id) {
    const el = id === "top" ? null : document.getElementById(id);
    const y = el ? el.getBoundingClientRect().top + scrollY - 64 : 0;
    window.scrollTo({ top: Math.max(0, y), behavior: reduced ? "auto" : "smooth" });
  }

  /* ---------------- scroll ---------------- */
  const prog = $("#barProgress");
  let current = null, sections = [];
  function layout() { sections = $$(".yr", timeline); onScroll(); }
  function onScroll() {
    const vh = window.innerHeight;
    prog.style.transform = `scaleX(${clamp(scrollY / (document.documentElement.scrollHeight - vh))})`;
    $("#bar").classList.toggle("scrolled", scrollY > 8);
    let active = null;
    for (const s of sections) if (s.getBoundingClientRect().top <= vh * 0.4) active = s;
    const workTop = $("#work").getBoundingClientRect().top, skillsTop = $("#skills").getBoundingClientRect().top;
    if (workTop > vh * 0.4 || skillsTop < vh * 0.4) active = null;
    const id = active ? active.id : null;
    if (id !== current) {
      current = id;
      $$("[data-nav]").forEach((b) => b.classList.toggle("on", b.dataset.nav === id));
      document.dispatchEvent(new CustomEvent("era:change", { detail: { id } }));
    }
    document.dispatchEvent(new CustomEvent("app:scroll"));
  }
  let ticking = false;
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); } }, { passive: true });
  let rz; window.addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(layout, 120); });

  /* ---------------- project drawer ---------------- */
  const drawer = $("#drawer"), dcard = $("#drawerCard");
  let lastFocus = null;
  function openModal(id) {
    const p = byId(id); if (!p) return;
    const list = visible(), i = list.findIndex((x) => x.id === id);
    const prev = list[i - 1], next = list[i + 1];
    if (drawer.hidden) lastFocus = document.activeElement;
    dcard.innerHTML = `
      <div class="d-bar"><span class="mono">${esc(eraOf(p.era).years)} · ${esc(L(eraOf(p.era).title))}</span><button class="d-x" data-close aria-label="${esc(t("close"))}">${icon("x")}</button></div>
      <div class="d-body">
        ${tags(p)}
        <h2 id="dTitle">${esc(L(p.title))}</h2>
        <p class="card-ctx">${esc(L(p.context))}</p>
        <dl class="d-meta">
          <div><dt>${esc(t("year"))}</dt><dd>${esc(yearLabel(p))}</dd></div>
          <div><dt>${esc(t("role"))}</dt><dd>${esc(roleText(p))}</dd></div>
          ${p.client ? `<div><dt>${esc(t("client"))}</dt><dd>${esc(p.client)}</dd></div>` : ""}
        </dl>
        <p class="d-sum">${esc(L(p.summary))}</p>
        ${p.stats ? `<div class="stats">${p.stats.map((s) => `<div><b>${s.n}${s.plus ? "+" : ""}</b><span>${esc(L(s.l))}</span></div>`).join("")}</div>` : ""}
        ${(L(p.highlights) || []).length ? `<h4 class="mono">${esc(t("highlights"))}</h4><ul class="d-list">${L(p.highlights).map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
        <h4 class="mono">${esc(t("stack"))}</h4>${chips(p.stack)}
        ${p.links && p.links.length ? `<h4 class="mono">${esc(t("links"))}</h4><p class="d-links">${p.links.map((l) => `<a class="ext" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}</p>` : ""}
      </div>
      <div class="d-nav">
        ${prev ? `<button data-open="${prev.id}"><span class="mono">← ${esc(t("prev"))}</span>${esc(L(prev.title))}</button>` : "<span></span>"}
        ${next ? `<button data-open="${next.id}" class="d-next"><span class="mono">${esc(t("next"))} →</span>${esc(L(next.title))}</button>` : "<span></span>"}
      </div>`;
    dcard.scrollTop = 0;
    if (drawer.hidden) {
      drawer.hidden = false;
      document.documentElement.classList.add("modal-open");
      requestAnimationFrame(() => drawer.classList.add("show"));
    }
    $(".d-x", dcard).focus();
    history.replaceState(null, "", `#${p.id}`);
    document.dispatchEvent(new CustomEvent("case:open", { detail: { id } }));
  }
  function closeModal() {
    if (drawer.hidden) return;
    drawer.classList.remove("show");
    document.documentElement.classList.remove("modal-open");
    setTimeout(() => { drawer.hidden = true; }, 350);
    history.replaceState(null, "", location.pathname + location.search + (mode === "life" ? "#life" : ""));
    lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
  }
  drawer.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (drawer.hidden) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") { const b = $(e.key === "ArrowRight" ? ".d-next" : ".d-nav button:not(.d-next)", dcard); if (b) openModal(b.dataset.open); }
    if (e.key === "Tab") {
      const f = $$("button, a[href]", dcard); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------------- static text / language ---------------- */
  function applyStatic() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $("#langBtn").textContent = lang === "en" ? "PT" : "EN";
    $("#yr").textContent = new Date().getFullYear();
    $("#endLinks").innerHTML = window.PROFILE.links.map((l) => `<a class="end-link" href="${esc(l.url)}" target="_blank" rel="noopener"><span>${esc(l.label)}</span><span class="mono">${esc(l.url.replace(/^https?:\/\/(www\.)?/, ""))} ↗</span></a>`).join("");
    renderHero();
    renderPrint();
  }
  function setLang(l) {
    if (l !== "en" && l !== "pt") return;
    lang = l; store.set("ra.lang", l);
    applyStatic(); renderFilters(); renderTimeline(); renderStack();
    if (curating) renderCurate();
    document.dispatchEvent(new CustomEvent("lang:change", { detail: { lang } }));
  }
  $("#langBtn").addEventListener("click", () => setLang(lang === "en" ? "pt" : "en"));

  /* ---------------- print CV ---------------- */
  function renderPrint() {
    const P = window.PROFILE;
    $("#printCv").innerHTML = `
      <h1>${esc(P.name)}</h1><p>${esc(L(P.role))} · ${esc(L(P.location))} · ${P.links.map((l) => esc(l.url.replace(/^https?:\/\//, ""))).join(" · ")}</p>
      ${[...ERAS].reverse().map((e) => { const ps = visible(e.id); return ps.length ? `<h2>${esc(e.years)} · ${esc(L(e.title))}</h2>${ps.map((p) => `<div class="pc"><b>${esc(L(p.title))}</b> <i>${esc(L(p.context))} · ${esc(yearLabel(p))} · ${esc(roleText(p))}</i><p>${esc(L(p.summary))}</p><small>${p.stack.map(esc).join(" · ")}</small></div>`).join("")}` : ""; }).join("")}
      <h2>${esc(t("stack"))}</h2>${Object.entries(P.skills).map(([k, v]) => `<p><b>${esc(k)}:</b> ${v.map(esc).join(", ")}</p>`).join("")}`;
  }

  /* ---------------- curate ---------------- */
  const curate = $("#curate");
  function renderCurate() {
    curate.hidden = false;
    curate.innerHTML = `
      <div class="cu-head"><b>${esc(t("curateTitle"))}</b><button class="ext" data-cu="min">–</button></div>
      <p class="cu-sub">${esc(t("curateSub"))}</p>
      <div class="cu-list">${ERAS.map((e) => `
        <div class="cu-era"><p class="mono">${esc(e.years)}</p>
        ${ALL.filter((p) => p.era === e.id).map((p) => `
          <label class="cu-item"><input type="checkbox" data-cu-id="${p.id}" ${isShown(p) ? "checked" : ""}><span class="sw"></span><span class="cu-name">${esc(L(p.title))}</span>${p.id in overrides && overrides[p.id] !== (p.show !== false) ? `<em>●</em>` : ""}</label>`).join("")}
        </div>`).join("")}
      </div>
      <div class="cu-actions"><button class="btn btn-dark btn-sm" data-cu="download">${esc(t("download"))} ↓</button><button class="ext" data-cu="reset">${esc(t("reset"))}</button></div>`;
  }
  const refresh = () => { renderHero(); renderFilters(); renderTimeline(); renderStack(); renderCurate(); renderPrint(); document.dispatchEvent(new CustomEvent("projects:change")); };
  curate.addEventListener("change", (e) => { const id = e.target.dataset.cuId; if (!id) return; overrides[id] = e.target.checked; store.set("ra.curate", overrides); refresh(); });
  curate.addEventListener("click", (e) => {
    const a = e.target.closest("[data-cu]"); if (!a) return;
    if (a.dataset.cu === "min") curate.classList.toggle("min");
    if (a.dataset.cu === "reset") { overrides = {}; store.del("ra.curate"); refresh(); }
    if (a.dataset.cu === "download") downloadProjects();
  });
  function downloadProjects() {
    const projects = ALL.map((p) => ({ ...p, show: isShown(p) }));
    const header = "/* PROJECTS · the single source of truth for the site. See README.md for every field. */\n\n";
    const body = `window.PROFILE = ${JSON.stringify(window.PROFILE, null, 2)};\n\nwindow.ERAS = ${JSON.stringify(ERAS, null, 2)};\n\nwindow.PROJECTS = ${JSON.stringify(projects, null, 2)};\n`;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([header + body], { type: "text/javascript" }));
    a.download = "projects.js";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  /* ---------------- toast (used by the secrets) ---------------- */
  function toast(title, body) {
    const box = $("#toasts");
    box.innerHTML = "";
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<b class="mono">${esc(title)}</b><span>${esc(body)}</span>`;
    box.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 500); }, 3600);
  }

  /* ---------------- boot ---------------- */
  window.APP = {
    t, L, esc, lang: () => lang, setLang, goto, openModal, closeModal, visible, byId, eraOf, isShown, yearLabel, yearsOf, lvlOf, toast, store,
    eras: ERAS, all: ALL, reduced, current: () => current, setFilter, skillName, isMobile, mode: () => mode, setMode, icon,
    curate: () => { if (!curating) location.search = "?curate"; else { renderCurate(); curate.classList.remove("min"); } }
  };

  addEventListener("hashchange", () => { if (location.hash === "#life") setMode("life"); else if (!location.hash) setMode("work"); });
  applyMode();
  applyStatic();
  renderFilters();
  renderTimeline();
  renderStack();
  if (curating) { renderCurate(); if (window.innerWidth < 700) curate.classList.add("min"); }
  if (location.hash && byId(location.hash.slice(1))) setTimeout(() => openModal(location.hash.slice(1)), 300);
  window.addEventListener("load", layout);
})();
