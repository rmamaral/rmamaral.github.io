/* ==========================================================================
   PERSONAL · the "life" side of the site (toggle work | life in the top bar,
   or `cd ~/life` in the terminal). Edit freely; every text is { en, pt }.
   ========================================================================== */

window.LIFE = {
  born: 1994,
  hi: { en: "Off the clock.", pt: "Fora do trabalho." },
  title: {
    en: "Born in Lisbon in 1994. Raised between the city and a campsite by a lagoon.",
    pt: "Nasci em Lisboa em 1994. Cresci entre a cidade e um parque de campismo à beira de uma lagoa."
  },
  sub: {
    en: "Outside work: sport, games of every kind and a lot of alternative rock and punk.",
    pt: "Fora do trabalho: desporto, jogos de todo o tipo e muito rock alternativo e punk."
  },
  cta: { en: "See what I'm into", pt: "Ver do que gosto" },
  facts: {
    born: { en: "born in Lisbon", pt: "nasci em Lisboa" },
    sports: { en: "sports", pt: "desportos" },
    games: { en: "favourite games", pt: "jogos favoritos" },
    bands: { en: "favourite bands", pt: "bandas favoritas" }
  },

  origin: {
    title: { en: "Where I'm from", pt: "De onde sou" },
    text: {
      en: "I was born in Lisbon in 1994. My childhood was split between the city and the campsite at Lagoa de Santo André, where I spent my holidays.",
      pt: "Nasci em Lisboa em 1994. A minha infância foi dividida entre a cidade e o parque de campismo da Lagoa de Santo André, onde passava as férias."
    },
    places: [
      { name: "Lisboa", note: { en: "the rest of the year", pt: "o resto do ano" } },
      { name: "Lagoa de Santo André", note: { en: "the holidays", pt: "as férias" } }
    ]
  },

  sport: {
    title: { en: "Sport", pt: "Desporto" },
    text: { en: "Always been into sport, pretty much any kind.", pt: "Sempre gostei de desporto, de quase todo o tipo." },
    list: [
      { en: "Football", pt: "Futebol" },
      { en: "Futsal", pt: "Futsal" },
      { en: "Volleyball", pt: "Voleibol" },
      { en: "Padel", pt: "Padel" },
      { en: "Bouldering", pt: "Bouldering" },
      { en: "Running", pt: "Corrida" },
      { en: "Gym", pt: "Ginásio" }
    ],
    pick: { en: "Pick one for the weekend", pt: "Escolhe um para o fim de semana" },
    picked: { en: "This weekend:", pt: "Este fim de semana:" }
  },

  games: {
    title: { en: "Games", pt: "Jogos" },
    text: {
      en: "Any kind of game, really: on a computer, on a console or around a table.",
      pt: "Qualquer tipo de jogo, na verdade: no computador, na consola ou à volta de uma mesa."
    },
    shelves: [
      { label: { en: "On the PC", pt: "No computador" }, items: ["League of Legends", "Rocket League", "Counter-Strike", "Grand Theft Auto"] },
      { label: { en: "Growing up", pt: "Em miúdo" }, items: ["The Sims", "Diablo II", "The Legend of Zelda", "Super Mario 64", "Mario Kart"] }
    ],
    board: { en: "And board games. Any of them, really.", pt: "E jogos de tabuleiro. Qualquer um, a sério." }
  },

  music: {
    title: { en: "Music", pt: "Música" },
    text: { en: "Mostly alternative rock and punk.", pt: "Sobretudo rock alternativo e punk." },
    genre: { en: "Alternative rock · Punk", pt: "Rock alternativo · Punk" },
    bands: ["The Offspring", "Muse", "The Strokes", "Queen", "Linkin Park", "Green Day"],
    now: { en: "Now playing", pt: "A tocar" },
    paused: { en: "Paused", pt: "Em pausa" },
    note: { en: "No audio, just the vibe.", pt: "Sem som, só a vibe." }
  }
};
