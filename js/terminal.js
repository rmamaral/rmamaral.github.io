/* ==========================================================================
   TERMINAL · lives in the hero; from anywhere else (the >_ button or the `
   key) it slides up as a dock at the bottom, keeping its history.
   Type `help`. Some files are hidden.
   ========================================================================== */
(() => {
  "use strict";
  const A = window.APP;
  const $ = (s, r = document) => r.querySelector(s);
  const term = $("#term"), slot = $("#termSlot"), dock = $("#dock");
  const out = $("#termOut"), form = $("#termForm"), input = $("#termInput"), ghost = $("#termHint");
  const esc = A.esc, L = A.L;
  const hist = []; let hi = 0;
  const tx = (en, pt) => (A.lang() === "pt" ? pt : en);
  const shown = () => A.all.filter(A.isShown);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const print = (html, cls = "") => {
    const p = document.createElement("div");
    p.className = `tl ${cls}`; p.innerHTML = html;
    out.appendChild(p); out.scrollTop = out.scrollHeight;
  };
  const link = (id, label = id) => `<a href="#${esc(id)}" data-term-open="${esc(id)}">${esc(label)}</a>`;
  const run$ = (cmd, label = cmd) => `<button type="button" class="t-run" data-term-run="${esc(cmd)}">${esc(label)}</button>`;
  const pad = (s, n) => String(s) + " ".repeat(Math.max(1, n - String(s).length));

  /* ---------------- life side (js/personal.js) ---------------- */
  const life = () => A.mode && A.mode() === "life";
  const LF = () => window.LIFE;
  const LIFE_FILES = ["origin", "sport", "games", "music"];
  function catLife(f) {
    const D = LF(); if (!D) return false;
    const key = f.replace(/\.md$/, "");
    if (key === "origin") print(`<b>${esc(L(D.origin.title))}</b>\n${esc(L(D.origin.text))}`);
    else if (key === "sport") print(`<b>${esc(L(D.sport.title))}</b>  <span class="t-dim">${esc(L(D.sport.text))}</span>\n${D.sport.list.map((x) => `<span class="t-acc">●</span> ${esc(L(x))}`).join("  ")}`);
    else if (key === "games") print(`<b>${esc(L(D.games.title))}</b>  <span class="t-dim">${esc(L(D.games.text))}</span>\n${D.games.shelves.map((sh) => `<span class="t-acc">${esc(pad(L(sh.label), 15))}</span>${sh.items.map(esc).join(", ")}`).join("\n")}\n<span class="t-dim">${esc(L(D.games.board))}</span>`);
    else if (key === "music") print(`<b>${esc(L(D.music.title))}</b>  <span class="t-dim">${esc(L(D.music.genre))}</span>\n${D.music.bands.map((b, i) => `<span class="t-dim">${String(i + 1).padStart(2, "0")}</span> ${esc(b)}`).join("\n")}`);
    else return false;
    return true;
  }
  function setTitle() { const t = $("#termTitle"); if (t) t.textContent = life() ? "ricardo@home: ~/life" : "ricardo@tinsight: ~/work"; }
  const toWork = (then) => { if (life()) A.setMode("work").then(then); else then(); };

  /* ---------------- commands ---------------- */
  const cmds = {
    help: () => print(`<span class="t-dim">${tx("click a command or type it", "clica num comando ou escreve-o")}</span>
${run$("whoami")}         ${tx("the short version", "a versão curta")}
${run$("neofetch")}       ${tx("the slightly longer version", "a versão um pouco mais longa")}
${run$("ls")}             ${tx("the work, by year", "o trabalho, por ano")}
ls <span class="t-acc">2022</span>        ${tx("one year", "um ano")}
open <span class="t-acc">fpb</span>       ${tx("open a project", "abrir um projeto")}
cat <span class="t-acc">cosmos</span>     ${tx("read it right here", "ler aqui mesmo")}
grep <span class="t-acc">strapi</span>    ${tx("projects that used something", "projetos que usaram algo")}
filter <span class="t-acc">lead</span>    ${tx("lead · challenge · mobile · tool · support · all", "lead · challenge · mobile · tool · support · all")}
goto <span class="t-acc">2025</span>      ${tx("scroll to a year", "saltar para um ano")}
${run$("cd ~/life")}      ${tx("the other side: sport, games, music", "o outro lado: desporto, jogos, música")}
${run$("skills")}  ${run$("links")}  ${run$("hire")}  ${run$("secrets")}  ${run$("clear")}
lang <span class="t-acc">en|pt</span>     <span class="t-dim">tab ${tx("completes", "completa")} · ↑↓ ${tx("history", "histórico")}</span>`),

    whoami: () => life() ? print(`<b>${esc(window.PROFILE.name)}</b> · Lisboa, ${LF().born}\n<span class="t-dim">${esc(L(LF().sub))}</span>`) : print(`<b>${esc(window.PROFILE.name)}</b> · ${esc(L(window.PROFILE.role))} @ Tinsight\n<span class="t-dim">${esc(L(window.PROFILE.tagline))}</span>`),

    neofetch: () => {
      const ps = shown(), y = new Date().getFullYear() - 2017;
      const top = {};
      ps.forEach((p) => new Set(p.stack.map(A.skillName)).forEach((s) => (top[s] = (top[s] || 0) + 1)));
      const stack = Object.entries(top).sort((a, b) => b[1] - a[1]).slice(0, 5).map((x) => x[0]).join(", ");
      const art = [" ____  ", "|  _ \\ ", "| |_) |", "|  _ < ", "|_| \\_\\", "       ", "       "];
      const info = [
        `<b class="t-acc">ricardo</b>@<b class="t-acc">tinsight</b>`,
        `<span class="t-dim">────────────────</span>`,
        `<b>${tx("role", "função")}</b>      ${esc(L(window.PROFILE.role))}`,
        `<b>${tx("uptime", "uptime")}</b>    ${y} ${tx("years at Tinsight", "anos na Tinsight")}`,
        `<b>${tx("projects", "projetos")}</b>  ${ps.length} (${ps.filter((p) => (p.roles || []).includes("lead")).length} ${tx("as project lead", "como líder de projeto")})`,
        `<b>stack</b>     ${esc(stack)}`,
        `<b>${tx("shell", "shell")}</b>     ${tx("this one, hand-written", "esta, escrita à mão")}`,
        `          <span class="sw1">██</span><span class="sw2">██</span><span class="sw3">██</span><span class="sw4">██</span><span class="sw5">██</span><span class="sw6">██</span>`
      ];
      const narrow = out.clientWidth < 560;
      print(info.map((l, i) => (narrow ? l.replace(/^ {10}/, "") : `<span class="t-acc">${esc(art[i] || "       ")}</span>   ${l}`)).join("\n"));
    },

    ls: (arg) => {
      const all = arg === "-a" || arg === "-la" || arg === "-al";
      if (life() && (!arg || all)) {
        const D = LF(), titles = { origin: D.origin.title, sport: D.sport.title, games: D.games.title, music: D.music.title };
        return print(`${all ? `<span class="t-dim">.</span>  <span class="t-dim">..</span>  <span class="t-hid">.secret</span>\n` : ""}${LIFE_FILES.map((f) => `${run$(`cat ${f}`, pad(`${f}.md`, 12))}<span class="t-dim">${esc(L(titles[f]))}</span>`).join("\n")}\n<span class="t-dim">${tx("back to work:", "voltar ao trabalho:")}</span> ${run$("cd ~/work")}`);
      }
      const year = all ? null : arg;
      if (year && year !== "-l") {
        const ps = shown().filter((p) => p.year === year || A.eraOf(p.era).years.includes(year) || A.yearsOf(p).includes(+year));
        if (!ps.length) return print(`ls: ${esc(year)}: ${tx("no such year. Try ls", "esse ano não existe. Experimenta ls")}`, "t-err");
        return print(ps.map((p) => `<span class="t-dim">${esc(pad(A.yearLabel(p), 9))}</span>${link(p.id, pad(p.id, 22))}${esc(L(p.title))}`).join("\n"));
      }
      if (year === "-l") return print(shown().map((p) => `<span class="t-dim">${esc(pad(A.yearLabel(p), 9))}</span>${link(p.id, pad(p.id, 22))}<span class="t-dim">${esc((p.roles || []).join(","))}</span>`).join("\n"));
      const lines = A.eras.map((e) => {
        const n = A.visible(e.id).length; if (!n) return "";
        return `${run$(`ls ${e.start}`, pad(e.start, 6))}<span class="t-dim">${pad(`${n} ${n === 1 ? tx("project", "projeto") : tx("projects", "projetos")}`, 13)}</span>${esc(L(e.title))}`;
      }).filter(Boolean);
      if (all) lines.unshift(`<span class="t-dim">.</span>  <span class="t-dim">..</span>  <span class="t-hid">.secret</span>`);
      print(lines.join("\n"));
    },

    open: (id) => {
      const p = A.byId(id || "");
      if (!p || !A.isShown(p)) return print(`open: ${esc(id || "")}: ${tx("not found. Try ls", "não existe. Experimenta ls")}`, "t-err");
      undock(); A.openModal(p.id);
    },

    cat: (id) => {
      if (id === ".secret") {
        print(`<span class="t-acc">${tx("You looked where most people don't.", "Olhaste onde quase ninguém olha.")}</span>
${tx("That's most of the job, honestly: reading the parts nobody else reads.", "É boa parte do trabalho, sinceramente: ler as partes que mais ninguém lê.")}
<span class="t-dim">${tx("There are 6 more secrets on this page. Try", "Há mais 6 segredos nesta página. Experimenta")} ${run$("secrets")}</span>`);
        document.dispatchEvent(new CustomEvent("egg", { detail: "hidden" }));
        return;
      }
      if (id && LIFE_FILES.includes(id.replace(/\.md$/, "")) && catLife(id)) return;
      const p = A.byId(id || "");
      if (!p || !A.isShown(p)) return print(`cat: ${esc(id || "")}: ${tx("no such file", "esse ficheiro não existe")}`, "t-err");
      print(`<b>${esc(L(p.title))}</b>  <span class="t-dim">${esc(A.yearLabel(p))} · ${esc(L(p.context))}</span>\n${esc(L(p.summary))}\n<span class="t-acc">${p.stack.map(esc).join(" · ")}</span>  ${link(p.id, tx("open →", "abrir →"))}`);
    },

    grep: (...q) => {
      const s = q.join(" ").toLowerCase();
      if (!s) return print(tx("grep &lt;something&gt;, e.g. grep wordpress", "grep &lt;algo&gt;, p. ex. grep wordpress"), "t-err");
      const hits = shown().filter((p) => p.stack.some((x) => x.toLowerCase().includes(s)) || L(p.summary).toLowerCase().includes(s) || L(p.title).toLowerCase().includes(s));
      print(hits.length ? `${hits.map((p) => `<span class="t-dim">${esc(pad(A.yearLabel(p), 9))}</span>${link(p.id)}`).join("\n")}\n<span class="t-dim">${hits.length} ${tx("matches", "resultados")}</span>` : `<span class="t-dim">${tx("no matches", "sem resultados")}</span>`);
    },

    filter: (f = "all") => {
      const ok = ["all", "lead", "challenge", "mobile", "tool", "support"];
      if (!ok.includes(f)) return print(`filter ${ok.join("|")}`, "t-err");
      print(`<span class="t-dim">ok · ${esc(f)}</span>`);
      undock(); toWork(() => { A.setFilter(f, null); A.goto("work"); });
    },

    skills: () => print(Object.entries(window.PROFILE.skills).map(([k, v]) => `<span class="t-acc">${esc(pad(k, 18))}</span>${v.map(esc).join(", ")}`).join("\n")),
    goto: (y) => {
      const e = A.eras.find((x) => x.years.includes(y || "") || String(x.start) === y);
      if (!e) return print(`goto: ${esc(y || "")}? ${tx("try goto 2022", "experimenta goto 2022")}`, "t-err");
      undock(); toWork(() => { A.setFilter("all", null); A.goto(e.id); });
    },
    links: () => print(window.PROFILE.links.map((l) => `${esc(pad(l.label, 10))}<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.url)}</a>`).join("\n")),
    secrets: () => {
      const l = window.EGGS ? window.EGGS.list() : [];
      print(`${l.map((e) => (e.found ? `<span class="t-acc">●</span> ${esc(e.name)}` : `<span class="t-dim">○ ${esc(e.hint)}</span>`)).join("\n")}\n<span class="t-dim">${l.filter((e) => e.found).length} / ${l.length}</span>`);
    },
    hire: () => { undock(); window.EGGS && window.EGGS.hire(); document.dispatchEvent(new CustomEvent("egg", { detail: "hire" })); },
    lang: (l) => { if (l !== "en" && l !== "pt") return print("lang en|pt", "t-err"); A.setLang(l); print(`ok · ${l}`); },
    curate: () => { undock(); A.curate(); },
    clear: () => { out.innerHTML = ""; },
    history: () => print(hist.map((h, i) => `<span class="t-dim">${pad(i + 1, 4)}</span>${esc(h)}`).join("\n") || `<span class="t-dim">${tx("empty", "vazio")}</span>`),
    echo: (...a) => print(esc(a.join(" "))),
    pwd: () => print(life() ? "/home/ricardo/life" : "/home/ricardo/work"),
    cd: (dir = "~") => {
      const d = dir.toLowerCase();
      const target = /life|vida/.test(d) ? "life" : /work|trabalho/.test(d) ? "work" : null;
      if (!target) return print(d === "~" || d === ".." ? `${run$("cd ~/work")}  ${run$("cd ~/life")}` : `cd: ${esc(dir)}: ${tx("no such directory. Try", "essa pasta não existe. Experimenta")} ${run$("cd ~/life")}`, d === "~" || d === ".." ? "" : "t-err");
      if (target === A.mode()) return print(`<span class="t-dim">${tx("already in", "já estás em")} ~/${target}</span>`);
      print(`<span class="t-dim">~/${target}</span>`);
      A.setMode(target);
    },
    date: () => print(new Date().toString()),
    exit: () => (docked() ? close() : print(tx("You're in the hero. Scroll down to leave.", "Estás no topo da página. Faz scroll para sair."), "t-dim")),
    sudo: (...a) => print(a.join(" ") === "hire" || a.join(" ") === "hire ricardo" ? tx("No sudo needed. Just type hire.", "Não é preciso sudo. Escreve só hire.") : tx("Nice try. You're not in the sudoers file.", "Boa tentativa. Não estás no ficheiro sudoers."), "t-err"),
    blueprint: () => { const on = window.EGGS && window.EGGS.blueprint(); print(`<span class="t-dim">blueprint ${on ? "on" : "off"}</span>`); },
    rm: () => print(tx("rm: the past is read-only.", "rm: o passado é só de leitura."), "t-err"),
    vim: () => print(tx("Opening vim on a résumé is how people get stuck forever. Not today.", "Abrir o vim num currículo é meio caminho para nunca mais sair. Hoje não."), "t-dim"),
    git: (a) => print(a === "log" ? shown().slice().reverse().slice(0, 8).map((p) => `<span class="t-acc">${(((A.all.indexOf(p) + 1) * 2654435761) >>> 0).toString(16).padStart(8, "0").slice(0, 7)}</span> ${esc(A.yearLabel(p))} ${tx("ship", "entrega")}: ${link(p.id)}`).join("\n") : "git log", a === "log" ? "" : "t-dim")
  };
  cmds.about = cmds.whoami; cmds.ll = () => cmds.ls("-l"); cmds.man = cmds.help; cmds.nano = cmds.vim; cmds.emacs = cmds.vim;

  function run(line, echo = true) {
    if (echo) print(`<span class="t-prompt">→</span> ${esc(line)}`, "t-cmd");
    const [c, ...args] = line.trim().split(/\s+/);
    if (!c) return;
    const fn = cmds[c.toLowerCase()];
    fn ? fn(...args) : print(`${esc(c)}: ${tx("command not found. Try", "comando não encontrado. Experimenta")} ${run$("help")}`, "t-err");
  }

  /* ---------------- ghost completion (monospace, so ch units line up) ---------------- */
  const visibleCmds = ["help", "whoami", "neofetch", "ls", "open", "cat", "cd", "grep", "filter", "goto", "skills", "links", "secrets", "hire", "lang", "clear", "history"];
  function suggestion(v) {
    if (!v) return "";
    const parts = v.split(/\s+/);
    if (parts.length === 1) { const m = visibleCmds.find((k) => k.startsWith(v.toLowerCase()) && k !== v); return m ? m.slice(v.length) : ""; }
    const [c, a = ""] = parts;
    let pool = [];
    if (["open", "cat"].includes(c)) pool = c === "cat" && life() ? LIFE_FILES : shown().map((p) => p.id);
    if (c === "cd") pool = ["~/life", "~/work"];
    if (c === "filter") pool = ["lead", "challenge", "mobile", "tool", "support", "all"];
    if (c === "goto" || c === "ls") pool = A.eras.map((e) => String(e.start));
    if (c === "lang") pool = ["en", "pt"];
    if (!a || parts.length > 2) return "";
    const m = pool.find((x) => x.startsWith(a) && x !== a);
    return m ? m.slice(a.length) : "";
  }
  function paintGhost() {
    const v = input.value, s = suggestion(v);
    ghost.innerHTML = s ? `<span class="g-pad">${esc(v)}</span>${esc(s)}<span class="g-key">tab</span>` : v ? "" : `<span class="g-key">${tx("type help", "escreve help")}</span>`;
  }

  /* ---------------- dock ---------------- */
  const docked = () => term.parentElement === dock;
  const heroVisible = () => { const r = slot.getBoundingClientRect(); return r.bottom > 80 && r.top < innerHeight - 120; };
  function open() {
    skipIntro();
    if (!docked() && heroVisible()) { input.focus({ preventScroll: true }); return; }
    if (!docked()) { dock.appendChild(term); slot.classList.add("docked"); dock.hidden = false; requestAnimationFrame(() => dock.classList.add("show")); }
    setTimeout(() => input.focus({ preventScroll: true }), 60);
  }
  function close() {
    if (!docked()) { input.blur(); return; }
    dock.classList.remove("show");
    setTimeout(() => { if (!dock.classList.contains("show")) { slot.appendChild(term); slot.classList.remove("docked"); dock.hidden = true; out.scrollTop = out.scrollHeight; } }, 280);
  }
  const undock = () => { if (docked()) close(); };

  /* ---------------- intro: it types its own first commands ---------------- */
  let skip = false, introDone = false;
  const skipIntro = () => { skip = true; };
  async function typeOut(cmd) {
    for (let i = 1; i <= cmd.length; i++) {
      if (skip) break;
      input.value = cmd.slice(0, i); paintGhost();
      await sleep(55 + Math.random() * 60);
    }
    input.value = ""; paintGhost();
    run(cmd);
    if (!skip) await sleep(450);
  }
  async function intro() {
    if (A.reduced) skip = true;
    await sleep(skip ? 0 : 700);
    await typeOut("whoami");
    await typeOut("ls");
    print(`<span class="t-dim">${tx("Try", "Experimenta")} ${run$("open fpb")} · ${run$("grep strapi")} · ${run$("neofetch")} · ${tx("or", "ou")} ${run$("help")}</span>`);
    introDone = true; paintGhost();
  }

  /* ---------------- events ---------------- */
  form.addEventListener("submit", (e) => {
    e.preventDefault(); skipIntro();
    const v = input.value;
    if (v.trim()) { hist.push(v); hi = hist.length; }
    input.value = ""; paintGhost(); run(v);
  });
  input.addEventListener("input", paintGhost);
  input.addEventListener("focus", () => { if (!introDone) skipIntro(); term.classList.add("focused"); });
  input.addEventListener("blur", () => term.classList.remove("focused"));
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") { e.preventDefault(); hi = Math.max(0, hi - 1); input.value = hist[hi] || ""; paintGhost(); }
    if (e.key === "ArrowDown") { e.preventDefault(); hi = Math.min(hist.length, hi + 1); input.value = hist[hi] || ""; paintGhost(); }
    if (e.key === "Tab" || (e.key === "ArrowRight" && input.selectionStart === input.value.length)) {
      const s = suggestion(input.value);
      if (s) { e.preventDefault(); input.value += s + (input.value.includes(" ") ? "" : " "); paintGhost(); }
      else if (e.key === "Tab") e.preventDefault();
    }
    if (e.key === "l" && e.ctrlKey) { e.preventDefault(); cmds.clear(); }
    if (e.key === "Escape" || e.key === "`") { e.preventDefault(); close(); }
  });
  term.addEventListener("click", (e) => {
    const o = e.target.closest("[data-term-open]");
    if (o) { e.preventDefault(); undock(); A.openModal(o.dataset.termOpen); return; }
    const r = e.target.closest("[data-term-run]");
    if (r) { skipIntro(); const c = r.dataset.termRun; hist.push(c); hi = hist.length; run(c); if (matchMedia("(hover: hover)").matches) input.focus({ preventScroll: true }); return; }
    if (e.target.closest("[data-term-close]")) { close(); return; }
    if (e.target.closest("a")) return;
    if (!String(window.getSelection && window.getSelection())) input.focus({ preventScroll: true });
  });
  document.addEventListener("click", (e) => { if (e.target.closest("[data-term-focus]")) open(); });
  $("#termBtn").addEventListener("click", () => (docked() ? close() : open()));
  document.addEventListener("keydown", (e) => {
    if ((e.key === "`" || e.key === "~") && !e.target.closest("input,textarea,select")) { e.preventDefault(); docked() ? close() : open(); }
  });
  document.addEventListener("lang:change", paintGhost);
  document.addEventListener("mode:change", setTitle);
  setTitle();

  intro();
  window.TERM = { open, close, run };
})();
