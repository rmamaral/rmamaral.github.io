# Ricardo Amaral · Work

A static site (no build step, no frameworks) with every project I worked on at Tinsight, from 2017 to today.

- **The terminal** is the hero. It types its own intro and you can type into it (`help`). From anywhere
  else, the `>_ Terminal` button or the <kbd>`</kbd> key slides the same terminal up as a dock.
- **The work** is grouped by year, with filters (team lead, big challenges, mobile, internal tools, support).
  Click any card for the details; use ← → in the drawer to browse.
- **The stack** is a `package.json`: hover a dependency to see the years and projects that used it,
  click "Show in the work" to filter. `scripts.hire` and `scripts.terminal` are clickable.
- **The background** is a faint field of dots that turn into code characters around the cursor
  ([`js/bg.js`](js/bg.js)). Click anywhere for a ripple. It stays static with reduced motion.
- **Work | life.** The toggle in the top bar (or `cd ~/life` in the terminal) swaps to the personal side:
  where I'm from, sport, games and music. Its content lives in [`js/personal.js`](js/personal.js);
  `#life` links straight to it.
- The site grows with the years: 2017 is plain, then hover states, lift, scroll reveals, a cursor light,
  live demos, and 2026 goes dark.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Choose which projects appear

Everything lives in [`js/projects.js`](js/projects.js).

1. **Edit the file.** Every project has `show: true | false`. Reorder by moving entries inside a year.
2. **Curate mode.** Open the site with `?curate`. Flip the switches (saved only in your browser),
   then **Download projects.js**, replace the file and commit.

Fields: `roles` (`dev`, `lead`, `support`), `status: "not-live"`, `kind: "tool"`, `feature` (large card
with a demo or a wireframe), `challenge`, `until` (last year for projects that carry on, e.g. `"2026"`), `client`, `brand` (`{ c, c2, bg, grad, flavours }`, real colours for the card's sketch), `stats`, `links`, and `demo` (`social`, `live`, `tokens`,
`email`, `phone`; needs `feature: true`). A project counts as mobile when its stack has React Native or Expo.

## Secrets (spoilers)

The footer counts how many have been found. In the terminal, `secrets` gives hints.

1. `ls -a` in the terminal shows a hidden file. `cat .secret`.
2. Konami code (↑ ↑ ↓ ↓ ← → ← → B A) toggles blueprint mode.
3. Type `hello()` in the browser console.
4. Leave the tab and come back.
5. Double-click a year to drop a basketball you can throw.
6. Win the SocialMakeIt slot machine.
7. Type `hire` anywhere for a contact card.

## Deploy to GitHub Pages

Push to a repo named `rmamaral.github.io` (served at `https://rmamaral.github.io`), or any repo with
Pages enabled on the `main` branch, root folder.
