/* ==========================================================================
   BACKGROUND · a quiet field of dots behind the page. Near the cursor they
   wake up as code characters and fade back. Click for a ripple.
   Draws nothing while idle; static with reduced motion.
   ========================================================================== */
(() => {
  "use strict";
  const c = document.getElementById("bg");
  if (!c || !c.getContext) return;
  const ctx = c.getContext("2d");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CELL = 26, RADIUS = 120, CHARS = "01{}<>/\\;=+*#[]$_:".split("");
  let W = 0, H = 0, cols = 0, rows = 0, energy = new Float32Array(0), glyph = new Uint8Array(0);
  const mouse = { x: -9999, y: -9999, on: false };
  let ripples = [], running = false;
  // the highlight follows the page accent (orange for work, teal for life)
  let ACC = "255,90,31";
  const readAcc = () => {
    const h = getComputedStyle(document.body).getPropertyValue("--acc").trim().replace("#", "");
    if (/^[0-9a-f]{6}$/i.test(h)) ACC = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(",");
  };

  function resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    W = innerWidth; H = innerHeight;
    c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(W / CELL) + 1; rows = Math.ceil(H / CELL) + 1;
    energy = new Float32Array(cols * rows);
    glyph = new Uint8Array(cols * rows).map(() => (Math.random() * CHARS.length) | 0);
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.font = '500 12px "Geist Mono", ui-monospace, monospace';
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const blue = document.body.classList.contains("blueprint");
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const k = j * cols + i, e = energy[k], x = i * CELL + CELL / 2, y = j * CELL + CELL / 2;
        if (e < 0.04) {
          ctx.fillStyle = blue ? "rgba(47,111,237,.22)" : "rgba(21,21,21,.13)";
          ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
        } else {
          if (Math.random() < 0.06 * e) glyph[k] = (Math.random() * CHARS.length) | 0;
          ctx.fillStyle = e > 0.55 ? `rgba(${ACC},${Math.min(0.7, e * 0.75).toFixed(3)})` : `rgba(21,21,21,${(0.1 + e * 0.3).toFixed(3)})`;
          ctx.fillText(CHARS[glyph[k]], x, y);
        }
      }
    }
  }

  function step(now) {
    let alive = false;
    for (let k = 0; k < energy.length; k++) { if (energy[k] > 0.004) { energy[k] *= 0.93; alive = true; } else energy[k] = 0; }
    const touch = (cx, cy, r, fn) => {
      const i0 = Math.max(0, Math.floor((cx - r) / CELL)), i1 = Math.min(cols - 1, Math.ceil((cx + r) / CELL));
      const j0 = Math.max(0, Math.floor((cy - r) / CELL)), j1 = Math.min(rows - 1, Math.ceil((cy + r) / CELL));
      for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
        const k = j * cols + i, d = Math.hypot(i * CELL + CELL / 2 - cx, j * CELL + CELL / 2 - cy), v = fn(d);
        if (v > energy[k]) energy[k] = v;
      }
    };
    if (mouse.on) { touch(mouse.x, mouse.y, RADIUS, (d) => (d < RADIUS ? Math.pow(1 - d / RADIUS, 1.6) * 0.95 : 0)); alive = true; }
    ripples = ripples.filter((rp) => {
      const r = (now - rp.t) * 0.55, max = Math.max(W, H) * 0.6;
      if (r > max) return false;
      const fade = 1 - r / max;
      touch(rp.x, rp.y, r + 24, (d) => { const off = Math.abs(d - r); return off < 24 ? (1 - off / 24) * 0.9 * fade : 0; });
      alive = true;
      return true;
    });
    draw();
    if (alive) requestAnimationFrame(step); else running = false;
  }
  const wake = () => { if (!running && !reduced) { running = true; requestAnimationFrame(step); } };

  resize();
  let rz; addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(resize, 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
  readAcc();
  new MutationObserver(() => { readAcc(); if (!running) draw(); }).observe(document.body, { attributes: true, attributeFilter: ["class", "data-mode"] });
  if (reduced) return;

  addEventListener("pointermove", (e) => { if (e.pointerType === "touch") return; mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true; wake(); }, { passive: true });
  document.documentElement.addEventListener("pointerleave", () => { mouse.on = false; });
  addEventListener("blur", () => { mouse.on = false; });
  addEventListener("pointerdown", (e) => {
    if (e.target.closest("input, textarea, .term, .drawer, .hire")) return;
    ripples.push({ x: e.clientX, y: e.clientY, t: performance.now() });
    if (ripples.length > 4) ripples.shift();
    wake();
  }, { passive: true });
})();
