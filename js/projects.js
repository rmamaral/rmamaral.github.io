/* ==========================================================================
   PROJECTS · the single source of truth for the site.

   Hide a project:   show: false
   Reorder:          move the object inside its era
   Easier:           open the site with ?curate, flip the switches,
                     click "Download projects.js" and replace this file.

   Optional fields per project:
     roles:     ["dev", "lead", "support"]
     status:    "not-live"
     kind:      "work" | "tool"
     feature:   true   → full spread with a cover (or a demo)
     challenge: true   → "Big challenge" mark
     brand:     { c, c2, bg, grad } → real brand colours for the card's sketch
     stats, links, client, demo ("social" | "live" | "tokens" | "email" | "phone")

   Every text field is { en: "...", pt: "..." }.
   ========================================================================== */

window.PROFILE = {
  name: "Ricardo Amaral",
  role: { en: "Full-Stack Developer & Team Lead", pt: "Programador Full-Stack & Líder de Equipa" },
  location: { en: "Portugal", pt: "Portugal" },
  tagline: {
    en: "At Tinsight since 2017, doing a bit of everything: Facebook apps, national federations, media groups and mobile apps.",
    pt: "Na Tinsight desde 2017, a fazer um pouco de tudo: apps de Facebook, federações nacionais, grupos de media e apps móveis."
  },
  links: [
    { label: "GitHub", url: "https://github.com/rmamaral" },
    { label: "GitLab", url: "https://gitlab.com/rmamaral" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/ricardo-amaral-a504b414b" }
  ],
  skills: {
    "Web": ["WordPress", "ACF blocks", "PHP", "JavaScript", "TypeScript", "SCSS", "Tailwind", "Vue"],
    "Mobile": ["React Native", "Expo", "EAS builds", "Push notifications"],
    "Back-end & infra": ["Strapi", "REST APIs", "MySQL", "Docker", "Nginx", "Azure DevOps"],
    "Platforms": ["Facebook apps", "Spark AR", "HTML email", "Polylang (multilingual)", "Office 365 SSO"],
    "Ways of working": ["Team leadership", "Figma to code", "Design systems", "Long-term client support"]
  }
};

window.ERAS = [
  {
    id: "e1", years: "2017–2018", start: 2017,
    title: { en: "Apps inside Facebook", pt: "Apps dentro do Facebook" },
    unlock: { en: "PHP, Facebook API, campaign apps", pt: "PHP, API do Facebook, apps de campanha" },
    intro: {
      en: "Where it all started. I joined Tinsight and built apps that lived inside brands' Facebook pages, back when that was the place to be.",
      pt: "Onde tudo começou. Entrei na Tinsight e fiz apps que viviam dentro das páginas de Facebook das marcas, na altura em que era lá que tudo acontecia."
    }
  },
  {
    id: "e2", years: "2019–2020", start: 2019,
    title: { en: "The first big challenge", pt: "O primeiro grande desafio" },
    unlock: { en: "WordPress, custom themes, large sites", pt: "WordPress, temas à medida, sites de grande dimensão" },
    intro: {
      en: "Time for full websites. The Portuguese Basketball Federation was the first big one. Then came a new neighbourhood by the river in Lisbon, and my first support client.",
      pt: "Chegou a vez dos sites completos. A Federação Portuguesa de Basquetebol foi o primeiro grande projeto. Depois veio um novo bairro junto ao rio, em Lisboa, e o meu primeiro cliente de suporte."
    }
  },
  {
    id: "e3", years: "2021", start: 2021,
    title: { en: "A bit of everything", pt: "Um pouco de tudo" },
    unlock: { en: "Leading projects, Spark AR", pt: "Liderar projetos, Spark AR" },
    intro: {
      en: "Five websites in one year: sport, coffee, architecture and teeth. My first projects as lead, plus a few augmented-reality filters for Instagram and Facebook.",
      pt: "Cinco sites num ano: desporto, café, arquitetura e dentes. Os primeiros projetos a liderar, e ainda uns filtros de realidade aumentada para o Instagram e o Facebook."
    }
  },
  {
    id: "e4", years: "2022", start: 2022,
    title: { en: "Leading teams", pt: "A liderar equipas" },
    unlock: { en: "ACF blocks, Strapi, internal tools", pt: "Blocos ACF, Strapi, ferramentas internas" },
    intro: {
      en: "The busiest year so far. Sonae Sierra, more projects to lead, an internal tool we still use with clients, and the agency's own website.",
      pt: "O ano mais cheio até hoje. A Sonae Sierra, mais projetos a liderar, uma ferramenta interna que ainda usamos com os clientes e o site da própria agência."
    }
  },
  {
    id: "e5", years: "2023", start: 2023,
    title: { en: "Property", pt: "Imobiliário" },
    unlock: { en: "Static landing pages", pt: "Landing pages estáticas" },
    intro: {
      en: "The first website for VIC Properties, a residential developer, and a landing page for Herdade do Pinheirinho that never saw the light of day.",
      pt: "O primeiro site da VIC Properties, uma promotora imobiliária, e uma landing page para a Herdade do Pinheirinho que nunca chegou a ver a luz do dia."
    }
  },
  {
    id: "e5b", years: "2024", start: 2024,
    title: { en: "Bigger stages", pt: "Palcos maiores" },
    unlock: { en: "Media-scale sites, HTML email, Tailwind", pt: "Sites de grupos de media, email HTML, Tailwind" },
    intro: {
      en: "A national media group, a full rebuild of Prata (this time leading the team), front-end for DECO PROteste, and the email system the agency now runs its campaigns on.",
      pt: "Um grupo de media nacional, o novo Prata (desta vez a liderar a equipa), o front-end para a DECO PROteste e o sistema de email com que a agência faz hoje as campanhas."
    }
  },
  {
    id: "e6", years: "2025", start: 2025,
    title: { en: "Going mobile", pt: "A vez do mobile" },
    unlock: { en: "React Native, Expo, Strapi back-offices", pt: "React Native, Expo, back-offices Strapi" },
    intro: {
      en: "Still leading web teams, now also shipping mobile apps: SportsPlus first, then two travel apps for Cosmos with their own back-office.",
      pt: "Ainda a liderar equipas web, agora também a lançar apps móveis: primeiro a SportsPlus, depois duas apps de viagens para a Cosmos, com back-office próprio."
    }
  },
  {
    id: "e7", years: "2026", start: 2026,
    title: { en: "Now", pt: "Agora" },
    unlock: { en: "Everything so far", pt: "Tudo até aqui" },
    intro: {
      en: "Right now: support on the new VIC Properties website, plus a few projects from earlier years that are still going. The rest of the year is still loading.",
      pt: "Neste momento: suporte ao novo site da VIC Properties e alguns projetos de anos anteriores que continuam. O resto do ano ainda está a carregar."
    }
  }
];

window.PROJECTS = [
  /* ═════════════ 2017–2018 ═════════════ */
  {
    id: "socialmakeit", era: "e1", show: true, year: "2017", kind: "work", roles: ["dev"], feature: true,
    client: "SocialMakeIt, Tinsight",
    title: { en: "SocialMakeIt Facebook apps", pt: "Apps SocialMakeIt para Facebook" },
    context: { en: "Brand apps inside Facebook", pt: "Apps de marca dentro do Facebook" },
    stack: ["PHP", "MVC", "Facebook API", "JavaScript", "CSS"],
    summary: {
      en: "SocialMakeIt was Tinsight's platform for apps inside brands' Facebook pages, and I built a lot of them: photo, video and hashtag contests, quizzes, polls, a slot machine, a tombola and Man of the Match voting. Brands like Nestlé and Adidas ran campaigns on the platform.",
      pt: "A SocialMakeIt era a plataforma da Tinsight para apps dentro das páginas de Facebook das marcas, e fiz muitas: passatempos de fotografia, vídeo e hashtags, quizzes, votações, uma slot machine, uma tômbola e a votação do Homem do Jogo. Marcas como a Nestlé e a Adidas faziam campanhas na plataforma."
    },
    stats: [{ n: 40, plus: true, l: { en: "app types on one engine", pt: "tipos de app num só motor" } }],
    highlights: {
      en: ["Dozens of reusable app types on one shared engine", "A platform used by brands like Nestlé and Adidas", "Back-office for campaigns, prizes, entries and Excel exports"],
      pt: ["Dezenas de tipos de app reutilizáveis num só motor", "Uma plataforma usada por marcas como a Nestlé e a Adidas", "Back-office para campanhas, prémios, participações e exportação para Excel"]
    },
    demo: "social",
    links: []
  },

  /* ═════════════ 2019–2020 ═════════════ */
  {
    id: "fpb", challenge: true, era: "e2", show: true, year: "2019", kind: "work", roles: ["dev"], feature: true,
    client: "Federação Portuguesa de Basquetebol",
    title: { en: "Portuguese Basketball Federation", pt: "Federação Portuguesa de Basquetebol" },
    context: { en: "National federation website", pt: "Site de federação nacional" },
    stack: ["WordPress", "PHP", "JavaScript", "CSS"],
    summary: {
      en: "The official website of the Portuguese Basketball Federation, and the first big challenge of my career. A big public site, used by clubs, players, referees and fans all over the country, with real-time game stats as one of its main features.",
      pt: "O site oficial da Federação Portuguesa de Basquetebol e o primeiro grande desafio da minha carreira. Um site grande, usado por clubes, jogadores, árbitros e adeptos de todo o país, com as estatísticas dos jogos em tempo real como uma das funcionalidades principais."
    },
    highlights: {
      en: ["Real-time game stats: live scores, play-by-play and box scores", "First large-scale website of my career", "Content structure for a whole national sport"],
      pt: ["Estatísticas dos jogos em tempo real: resultados ao vivo, jogada a jogada e fichas de jogo", "O primeiro site de grande dimensão da minha carreira", "Estrutura de conteúdos para uma modalidade inteira"]
    },
    demo: "live",
    links: [{ label: "fpb.pt", url: "https://www.fpb.pt" }]
  },
  {
    id: "prata-2019", era: "e2", show: true, year: "2019", kind: "work", roles: ["dev"],
    client: "Prata Riverside Village",
    title: { en: "Prata Riverside Village", pt: "Prata Riverside Village" },
    context: { en: "Real-estate launch site", pt: "Site de lançamento imobiliário" },
    stack: ["WordPress", "PHP", "JavaScript"],
    summary: {
      en: "The first website for Prata Riverside Village, a new riverside neighbourhood in Lisbon designed by Renzo Piano. In 2024 I got to rebuild it from scratch, this time as team leader.",
      pt: "O primeiro site do Prata Riverside Village, um novo bairro junto ao rio, em Lisboa, desenhado por Renzo Piano. Em 2024 voltei para o refazer de raiz, desta vez como líder de equipa."
    },
    links: []
  },
  {
    id: "jjlouro", era: "e2", show: true, year: "2020", kind: "work", roles: ["support"],
    client: "J.J. Louro Pereira",
    title: { en: "J.J. Louro", pt: "J.J. Louro" },
    context: { en: "Furniture retailer", pt: "Loja de mobiliário" },
    stack: ["WordPress", "PHP"],
    summary: {
      en: "Support and maintenance for J.J. Louro Pereira, a furniture, sofa and mattress store. They handle the comfort, I handled the website.",
      pt: "Suporte e manutenção do site da J.J. Louro Pereira, uma loja de móveis, sofás e colchões. Eles tratam do conforto, eu tratei do site."
    },
    links: [{ label: "jjlouro.pt", url: "https://www.jjlouro.pt" }]
  },

  /* ═════════════ 2021 ═════════════ */
  {
    id: "sparkar", era: "e3", show: true, year: "2021", kind: "work", roles: ["dev"],
    title: { en: "Spark AR filters", pt: "Filtros Spark AR" },
    context: { en: "Instagram and Facebook AR", pt: "Realidade aumentada para Instagram e Facebook" },
    stack: ["Spark AR", "JavaScript", "3D assets"],
    summary: {
      en: "Augmented-reality filters for Instagram and Facebook, built in Spark AR for several partner brands.",
      pt: "Filtros de realidade aumentada para Instagram e Facebook, criados em Spark AR para várias marcas parceiras."
    },
    links: []
  },
  {
    id: "triathlon", era: "e3", show: true, year: "2021", kind: "work", roles: ["dev"],
    title: { en: "World Triathlon, Lisbon", pt: "World Triathlon, Lisboa" },
    context: { en: "International event website", pt: "Site de evento internacional" },
    stack: ["WordPress", "PHP", "JavaScript"],
    summary: {
      en: "Website for the World Triathlon event in Lisbon, made for athletes, teams and spectators from all over the world.",
      pt: "Site da prova mundial de triatlo em Lisboa, feito para atletas, equipas e espectadores de todo o mundo."
    },
    links: []
  },
  {
    id: "abl", era: "e3", show: true, year: "2021", until: "2026", kind: "work", roles: ["lead", "dev"],
    client: "Associação de Basquetebol de Lisboa",
    title: { en: "AB Lisboa", pt: "AB Lisboa" },
    context: { en: "Lisbon Basketball Association", pt: "Associação de Basquetebol de Lisboa" },
    stack: ["WordPress", "PHP"],
    summary: {
      en: "Website for the Lisbon Basketball Association: news, competitions and events like the national Minibasket festival. Yes, basketball again.",
      pt: "Site da Associação de Basquetebol de Lisboa: notícias, competições e eventos como a Festa Nacional do Minibasquete. Sim, outra vez basquetebol."
    },
    links: [{ label: "ablisboa.pt", url: "https://www.ablisboa.pt" }]
  },
  {
    id: "pc-arquitetos", era: "e3", show: true, year: "2021", kind: "work", roles: ["dev"],
    title: { en: "PC Arquitetos", pt: "PC Arquitetos" },
    context: { en: "Architecture studio", pt: "Atelier de arquitetura" },
    stack: ["WordPress", "PHP", "JavaScript"],
    summary: {
      en: "Portfolio website for an architecture studio, where the images come first and the projects speak for themselves.",
      pt: "Site-portefólio de um atelier de arquitetura, onde a imagem vem primeiro e os projetos falam por si."
    },
    links: []
  },
  {
    id: "clinica-luz", era: "e3", show: true, year: "2021", kind: "work", roles: ["lead", "dev"],
    title: { en: "Clínica Médica Dentária da Luz", pt: "Clínica Médica Dentária da Luz" },
    context: { en: "Dental clinic", pt: "Clínica dentária" },
    stack: ["WordPress", "PHP"],
    summary: {
      en: "Website for a dental clinic: treatments, team and contacts. No drilling involved.",
      pt: "Site de uma clínica dentária: tratamentos, equipa e contactos. Sem brocas pelo meio."
    },
    links: []
  },
  {
    id: "belissimo", era: "e3", show: true, year: "2021", kind: "work", roles: ["lead", "dev"],
    client: "Delta Cafés",
    title: { en: "Belíssimo", pt: "Belíssimo" },
    context: { en: "Delta Cafés coffee brand", pt: "Marca de café da Delta Cafés" },
    stack: ["WordPress", "PHP", "JavaScript"],
    summary: {
      en: "Website for Belíssimo, a coffee brand from Delta Cafés. Fuelled by the product, naturally.",
      pt: "Site da Belíssimo, uma marca de café da Delta Cafés. Feito à base de muito café, claro."
    },
    links: []
  },

  /* ═════════════ 2022 ═════════════ */
  {
    id: "sonae-sierra", challenge: true, era: "e4", show: true, year: "2022", until: "2026", kind: "work", roles: ["lead", "dev"], feature: true,
    client: "Sonae Sierra",
    brand: { c: "#460032", c2: "#B40054" },
    title: { en: "Sonae Sierra", pt: "Sonae Sierra" },
    context: { en: "Global corporate website", pt: "Site corporativo global" },
    stack: ["WordPress", "ACF Pro", "Polylang Pro", "Office 365 SSO", "Azure DevOps"],
    summary: {
      en: "The corporate website of an international real-estate group, and a big challenge. Built on a library of custom blocks (KPIs, interactive charts, timelines, case studies), with content in several languages, editorial approval workflows and Microsoft login for staff.",
      pt: "O site corporativo de um grupo imobiliário internacional, e um grande desafio. Feito com uma biblioteca de blocos à medida (KPIs, gráficos interativos, cronologias, casos de estudo), conteúdos em várias línguas, fluxos de aprovação editorial e login Microsoft para os colaboradores."
    },
    stats: [{ n: 87, l: { en: "custom blocks", pt: "blocos à medida" } }, { n: 168, l: { en: "commits by me", pt: "commits meus" } }],
    highlights: {
      en: ["Data-driven KPI and chart blocks", "Revision and approval workflows", "Staff SSO via Office 365, deployed through Azure DevOps"],
      pt: ["Blocos de KPIs e gráficos alimentados por dados", "Fluxos de revisão e aprovação", "Login dos colaboradores com Office 365 e deploy com Azure DevOps"]
    },
    links: [{ label: "sonaesierra.com", url: "https://www.sonaesierra.com" }]
  },
  {
    id: "quinta-da-fonte", era: "e4", show: true, year: "2022", kind: "work", roles: ["lead", "dev"], feature: true,
    client: "Quinta da Fonte",
    brand: { c: "#0A7960", c2: "#2FB88A", bg: "#F4F2EB" },
    title: { en: "Quinta da Fonte", pt: "Quinta da Fonte" },
    context: { en: "Business campus website", pt: "Site de campus empresarial" },
    stack: ["WordPress", "ACF Pro", "Polylang Pro", "SCSS"],
    summary: {
      en: "Website for a business campus: buildings, events, news, brochures and pricing. I was developer and team leader, and we kept improving it for three years.",
      pt: "Site de um campus empresarial: edifícios, eventos, notícias, brochuras e preços. Fui programador e líder de equipa, e fomos melhorando o site durante três anos."
    },
    stats: [{ n: 50, l: { en: "custom blocks", pt: "blocos à medida" } }, { n: 109, l: { en: "commits by me", pt: "commits meus" } }],
    highlights: {
      en: ["Leading the development team", "Buildings and events as structured content", "Three years of continuous evolution"],
      pt: ["Liderança da equipa de desenvolvimento", "Edifícios e eventos como conteúdo estruturado", "Três anos de evolução contínua"]
    },
    links: [{ label: "quintadafonte.com", url: "https://quintadafonte.com" }]
  },
  {
    id: "digital-guidelines", era: "e4", show: true, year: "2022", until: "2026", kind: "tool", roles: ["lead", "dev"], feature: true,
    title: { en: "Digital Guidelines", pt: "Digital Guidelines" },
    context: { en: "Internal tool, used with clients", pt: "Ferramenta interna, usada com clientes" },
    stack: ["Vue", "Strapi", "Docker", "Nginx"],
    summary: {
      en: "A tool I built for Tinsight to share design-system guidelines with clients. The design team fills in a Strapi back-office, and clients browse colours, typography, components and downloadable assets in a Vue front-end.",
      pt: "Uma ferramenta que criei para a Tinsight partilhar com os clientes as regras do seu design system. A equipa de design preenche um back-office em Strapi e os clientes consultam cores, tipografia, componentes e ficheiros para descarregar num front-end em Vue."
    },
    stats: [{ n: 172, l: { en: "commits, all mine", pt: "commits, todos meus" } }],
    highlights: {
      en: ["Built solo, end to end", "Headless: Strapi and Vue, in Docker", "One place for every client's design system"],
      pt: ["Desenvolvida só por mim, do início ao fim", "Headless: Strapi e Vue, em Docker", "Um só sítio para o design system de cada cliente"]
    },
    demo: "tokens",
    links: []
  },
  {
    id: "vasco-da-gama", era: "e4", show: true, year: "2022", kind: "work", roles: ["lead", "dev"], status: "not-live",
    title: { en: "Vasco da Gama Tower", pt: "Torre Vasco da Gama" },
    context: { en: "Lisbon landmark", pt: "Ícone de Lisboa" },
    stack: ["WordPress", "ACF Pro"],
    summary: {
      en: "Website for Lisbon's Vasco da Gama Tower. I led the team and worked on the development. It never went live.",
      pt: "Site da Torre Vasco da Gama, em Lisboa. Liderei a equipa e participei no desenvolvimento. Nunca chegou a ser publicado."
    },
    links: []
  },
  {
    id: "tinsight-site", era: "e4", show: true, year: "2022", kind: "work", roles: ["dev"],
    client: "Tinsight",
    title: { en: "Tinsight website", pt: "Site da Tinsight" },
    context: { en: "The agency's own site", pt: "O site da própria agência" },
    stack: ["WordPress", "ACF Pro", "SCSS"],
    summary: {
      en: "The agency's own website. The first thing every future client looks at, so no pressure.",
      pt: "O site da própria agência. A primeira coisa que qualquer futuro cliente vê, portanto zero pressão."
    },
    links: [{ label: "tinsight.pt", url: "https://www.tinsight.pt" }]
  },
  {
    id: "newsletter-plugin", era: "e4", show: true, year: "2022", kind: "tool", roles: ["lead", "dev"],
    title: { en: "Newsletter plugin", pt: "Plugin de newsletter" },
    context: { en: "WordPress plugin", pt: "Plugin WordPress" },
    stack: ["WordPress", "PHP", "Plugin API"],
    summary: {
      en: "Tinsight's own WordPress plugin for newsletter sign-ups.",
      pt: "O plugin WordPress da própria Tinsight para subscrições de newsletter."
    },
    links: []
  },
  {
    id: "fundacao-gil", era: "e4", show: true, year: "2022", kind: "work", roles: ["dev"], status: "not-live",
    title: { en: "Fundação do Gil", pt: "Fundação do Gil" },
    context: { en: "Children's foundation", pt: "Fundação de apoio à infância" },
    stack: ["WordPress", "PHP"],
    summary: {
      en: "Website for Fundação do Gil, a Portuguese foundation that supports children and their families. Built, but never released.",
      pt: "Site da Fundação do Gil, que apoia crianças e as suas famílias. Ficou pronto, mas não chegou a ser publicado."
    },
    links: []
  },
  {
    id: "proenvi", era: "e4", show: true, year: "2022", kind: "work", roles: ["support"],
    title: { en: "Proenvi", pt: "Proenvi" },
    context: { en: "Environmental consulting", pt: "Consultoria ambiental" },
    stack: ["WordPress", "PHP"],
    summary: {
      en: "Support and maintenance for an environmental consulting company's website.",
      pt: "Suporte e manutenção do site de uma empresa de consultoria ambiental."
    },
    links: [{ label: "proenvi.pt", url: "https://www.proenvi.pt" }]
  },

  /* ═════════════ 2023 · 2024 ═════════════ */
  {
    id: "vic-properties", era: "e5", show: true, year: "2023", kind: "work", roles: ["lead", "dev"],
    client: "VIC Properties",
    title: { en: "VIC Properties", pt: "VIC Properties" },
    context: { en: "Residential developer", pt: "Promotora imobiliária" },
    stack: ["WordPress", "ACF Pro", "SCSS"],
    summary: {
      en: "Website for VIC Properties, the residential developer behind Prata Riverside Village.",
      pt: "Site da VIC Properties, a promotora imobiliária por trás do Prata Riverside Village."
    },
    links: []
  },
  {
    id: "herdade-pinheirinho", era: "e5", show: true, year: "2023", kind: "work", roles: ["lead", "dev"], status: "not-live",
    title: { en: "Herdade do Pinheirinho", pt: "Herdade do Pinheirinho" },
    context: { en: "Landing page", pt: "Landing page" },
    stack: ["HTML", "SCSS", "JavaScript"],
    summary: { en: "Landing page for Herdade do Pinheirinho. Built, but never released.", pt: "Landing page para a Herdade do Pinheirinho. Ficou pronta, mas não chegou a ser publicada." },
    links: []
  },
  {
    id: "medialivre", challenge: true, era: "e5b", show: true, year: "2024", kind: "work", roles: ["lead", "dev"], feature: true,
    brand: { c: "#3B47FA", c2: "#FF00AC", grad: ["#3B47FA", "#FF00AC", "#00B7FF"] },
    client: "Medialivre",
    title: { en: "Medialivre", pt: "Medialivre" },
    context: { en: "National media group", pt: "Grupo de media nacional" },
    stack: ["WordPress", "ACF Pro", "SCSS", "JavaScript"],
    summary: {
      en: "Corporate website of Medialivre, the Portuguese media group behind Correio da Manhã, CMTV, Record and Jornal de Negócios. A big challenge.",
      pt: "Site corporativo da Medialivre, o grupo de media por trás do Correio da Manhã, CMTV, Record e Jornal de Negócios. Um grande desafio."
    },
    highlights: {
      en: ["Corporate presence for a whole media group", "Followed by the group's intranet in 2025"],
      pt: ["Presença corporativa de um grupo de media inteiro", "Em 2025 seguiu-se a intranet do grupo"]
    },
    links: [{ label: "medialivre.pt", url: "https://www.medialivre.pt" }]
  },
  {
    id: "prata-2024", era: "e5b", show: true, year: "2024", until: "2026", kind: "work", roles: ["lead", "dev"], feature: true,
    brand: { c: "#00A23E", c2: "#2E96B6" },
    client: "Prata Riverside Village",
    title: { en: "Prata Riverside Village, new site", pt: "Prata Riverside Village, novo site" },
    context: { en: "Full rebuild", pt: "Novo site de raiz" },
    stack: ["WordPress", "ACF Pro", "WooCommerce", "Maps", "Polylang Pro"],
    summary: {
      en: "Five years after the first one, a full rebuild, this time leading the team as well as building it. Live apartment availability, building maps with filters, an events programme with bookings and a magazine archive.",
      pt: "Cinco anos depois do primeiro, um site novo de raiz, desta vez a liderar a equipa e também a programar. Disponibilidade de apartamentos em tempo real, mapas dos edifícios com filtros, agenda de eventos com reservas e arquivo da revista."
    },
    stats: [{ n: 48, l: { en: "custom blocks", pt: "blocos à medida" } }, { n: 160, l: { en: "commits by me", pt: "commits meus" } }],
    highlights: {
      en: ["Availability tables for sales", "Filterable building and event maps", "Event bookings"],
      pt: ["Tabelas de disponibilidade para a equipa comercial", "Mapas de edifícios e eventos com filtros", "Reservas para eventos"]
    },
    links: [{ label: "pratariversidevillage.com", url: "https://pratariversidevillage.com" }]
  },
  {
    id: "email-modules", era: "e5b", show: true, year: "2024", until: "2026", kind: "tool", roles: ["lead", "dev"], feature: true,
    title: { en: "Email Marketing Module System", pt: "Sistema de módulos de email marketing" },
    context: { en: "Internal tool", pt: "Ferramenta interna" },
    stack: ["PHP", "Grunt", "HTML email"],
    summary: {
      en: "Built for internal use: a library of email modules in each client's branding. The team stacks them into campaigns and exports HTML that survives every inbox (yes, even Outlook).",
      pt: "Feito para uso interno: uma biblioteca de módulos de email com a imagem de cada cliente. A equipa junta-os em campanhas e exporta HTML que sobrevive a qualquer caixa de correio (sim, até ao Outlook)."
    },
    highlights: { en: ["Per-client module libraries", "Compose, preview, export"], pt: ["Bibliotecas de módulos por cliente", "Compor, pré-visualizar, exportar"] },
    demo: "email",
    links: []
  },
  {
    id: "deco", era: "e5b", show: true, year: "2024", kind: "work", roles: ["lead", "dev"],
    client: "DECO PROteste",
    title: { en: "DECO PROteste", pt: "DECO PROteste" },
    context: { en: "Consumer association", pt: "Associação de consumidores" },
    stack: ["Tailwind", "Splide", "JavaScript"],
    summary: {
      en: "The front-end for DECO PROteste pages, with no back-end integration: Tailwind, carousels and scroll animations, handed over ready to plug in.",
      pt: "O front-end de páginas da DECO PROteste, sem integração com back-end: Tailwind, carrosséis e animações ao fazer scroll, entregue pronto a integrar."
    },
    links: []
  },
  {
    id: "sixfloor", era: "e5b", show: true, year: "2024", kind: "work", roles: ["lead", "dev"],
    title: { en: "SixFloor", pt: "SixFloor" },
    context: { en: "Company website", pt: "Site institucional" },
    stack: ["WordPress", "PHP"],
    summary: { en: "Website for SixFloor.", pt: "Site da SixFloor." },
    links: []
  },

  /* ═════════════ 2025 ═════════════ */
  {
    id: "sportsplus", challenge: true, era: "e6", show: true, year: "2025", kind: "work", roles: ["lead", "dev"], feature: true,
    brand: { c: "#10253B", c2: "#FED32C" },
    title: { en: "SportsPlus app", pt: "App SportsPlus" },
    context: { en: "My first mobile app", pt: "A minha primeira app móvel" },
    stack: ["React Native", "Expo", "TypeScript"],
    summary: {
      en: "My first mobile app challenge: a sports app built with React Native and Expo, for iOS and Android. Turns out a phone is not just a small browser.",
      pt: "O meu primeiro desafio no mobile: uma app de desporto feita em React Native e Expo, para iOS e Android. Afinal, um telemóvel não é só um browser pequeno."
    },
    highlights: { en: ["From web to native", "Expo and EAS build pipeline"], pt: ["Da web para o nativo", "Pipeline de builds com Expo e EAS"] },
    links: []
  },
  {
    id: "cosmos", challenge: true, era: "e6", show: true, year: "2025", until: "2026", kind: "work", roles: ["lead", "dev"], feature: true,
    brand: { c: "#48AC34", c2: "#326528", flavours: [{ name: "Travel4Sports", c: "#48AC34", g1: "#326528", g2: "#1D1F1C" }, { name: "Cosmos Incentives", c: "#EFDBB2", g1: "#6B756C", g2: "#233B39" }] },
    client: "Cosmos Travel & Events",
    title: { en: "Cosmos apps and back-office", pt: "Apps Cosmos e back-office" },
    context: { en: "iOS and Android", pt: "iOS e Android" },
    stack: ["React Native", "Expo", "TypeScript", "Strapi 5", "Push notifications"],
    summary: {
      en: "Two travel apps from one codebase: Travel4Sports, for fans heading to sports events, and Cosmos Incentives, for company trips. Plus the Strapi back-office that runs them. Flights, hotels, trains and transfers, documents, chat, surveys, tips, a currency converter and the weather, all in one place.",
      pt: "Duas apps de viagens a partir do mesmo código: a Travel4Sports, para adeptos que vão a eventos desportivos, e a Cosmos Incentives, para viagens de empresa. E ainda o back-office em Strapi que as gere. Voos, hotéis, comboios e transfers, documentos, chat, inquéritos, dicas, conversor de moeda e meteorologia, tudo no mesmo sítio."
    },
    stats: [{ n: 585, l: { en: "commits by me, app and back-office", pt: "commits meus, entre app e back-office" } }, { n: 2, l: { en: "branded apps", pt: "apps de marca" } }],
    highlights: {
      en: ["Two app flavours from one codebase", "Strapi back-office with push notifications", "Portuguese and English, built and submitted with EAS"],
      pt: ["Duas versões da app a partir do mesmo código", "Back-office em Strapi com notificações push", "Em português e inglês, com builds e publicação nas lojas via EAS"]
    },
    demo: "phone",
    links: []
  },
  {
    id: "medialivre-intranet", era: "e6", show: true, year: "2025", kind: "work", roles: ["lead", "dev"],
    brand: { c: "#3B47FA", c2: "#FF00AC", grad: ["#3B47FA", "#FF00AC", "#00B7FF"] },
    client: "Medialivre",
    title: { en: "Medialivre Intranet", pt: "Intranet Medialivre" },
    context: { en: "Internal portal", pt: "Portal interno" },
    stack: ["WordPress", "ACF Pro", "SCSS"],
    summary: {
      en: "The intranet for Medialivre's staff, right after the corporate site. I was developer and team leader.",
      pt: "A intranet dos colaboradores da Medialivre, logo a seguir ao site corporativo. Fui programador e líder de equipa."
    },
    links: []
  },
  {
    id: "movielight", era: "e6", show: true, year: "2025", kind: "work", roles: ["lead"], status: "not-live",
    title: { en: "MovieLight", pt: "MovieLight" },
    context: { en: "Company website", pt: "Site institucional" },
    stack: ["WordPress", "ACF Pro"],
    summary: { en: "Website for MovieLight, where I led the team. It never made it to launch.", pt: "Site da MovieLight, onde liderei a equipa. Acabou por não ser publicado." },
    links: []
  },

  /* ═════════════ 2026 ═════════════ */
  {
    id: "vic-2026", era: "e7", show: true, year: "2026", kind: "work", roles: ["support"],
    client: "VIC Properties",
    title: { en: "VIC Properties, new site", pt: "VIC Properties, novo site" },
    context: { en: "New website", pt: "Novo site" },
    stack: ["WordPress", "ACF Pro", "Ultimate Member", "Polylang Pro"],
    summary: {
      en: "Support on the new VIC Properties website: locations with maps, investments, leadership, community events and a private investor area.",
      pt: "Suporte ao novo site da VIC Properties: localizações com mapas, investimentos, equipa de gestão, eventos da comunidade e uma área privada para investidores."
    },
    links: []
  }
];
