import { CONTACT_EMAIL, CONTACT_PHONE } from './assets/brand'
import type { Locale } from './i18n/locales'

const en = {
  seo: {
    title: 'ZTech Prime | IT Consulting, Custom Software & SaaS Development',
    description:
      'ZTech Prime helps businesses solve complex IT challenges, build reliable custom software, modernize systems, and develop scalable SaaS products.',
  },
  aria: {
    brand: 'ZTech Prime, powered by ztech solutions',
    primary: 'Primary',
    sections: 'Sections',
    footer: 'Footer',
    language: 'Language',
  },
  headerCta: 'Discuss your project',
  nav: [
    { href: '#expertise', label: 'Expertise' },
    { href: '#how-we-work', label: 'How we work' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ],
  hero: {
    eyebrow: 'IT CONSULTING · SOFTWARE ENGINEERING · SAAS DEVELOPMENT',
    title: 'Turn complex technology into business momentum.',
    body: 'ZTech Prime helps businesses solve critical IT challenges, build reliable custom software, and turn SaaS ideas into scalable products—from strategy and architecture to delivery.',
    primary: { href: '#contact', label: 'Discuss your project' },
    secondary: { href: '#expertise', label: 'Explore our expertise' },
    trust: 'Direct senior expertise · Practical solutions · End-to-end delivery',
  },
  expertise: {
    id: 'expertise',
    label: 'What we do',
    title: 'Technology expertise focused on real business outcomes.',
    intro:
      'We connect strategy, engineering, and product thinking to solve the problems that slow businesses down and build the systems that move them forward.',
    services: [
      {
        title: 'IT Strategy & Systems',
        body: 'Identify technical risks, simplify complex infrastructure, improve reliability, and create a practical roadmap for modernization.',
      },
      {
        title: 'Custom Software Development',
        body: 'Design and build secure, maintainable software shaped around your workflows, users, and long-term business goals.',
      },
      {
        title: 'SaaS Product Engineering',
        body: 'Turn a product idea into a working SaaS platform—from architecture and MVP development to integrations, scaling, and continuous improvement.',
      },
      {
        title: 'Integrations & Modernization',
        body: 'Connect disconnected systems, modernize legacy applications, and remove the technical bottlenecks limiting your operations.',
      },
    ],
  },
  about: {
    id: 'about',
    label: 'Why ZTech Prime',
    title: 'Senior technical thinking without unnecessary complexity.',
    body: 'You work directly with experienced technical leadership that understands both software and the business behind it. We start by identifying the real problem, define the right solution, and stay close to delivery until it works in practice.',
    benefits: [
      'Direct communication with senior technical expertise',
      'Clear recommendations before major investment',
      'Architecture designed for maintainability and growth',
      'Business, product, and engineering considered together',
      'Flexible collaboration—from focused consultation to complete delivery',
    ],
    credibility:
      'Experience across business-critical platforms, complex integrations, healthcare workflows, operational systems, and SaaS product development.',
  },
  process: {
    id: 'how-we-work',
    label: 'How we work',
    title: 'A clear path from challenge to working solution.',
    steps: [
      {
        n: '01',
        title: 'Understand',
        body: 'We examine the current system, business goal, constraints, and the problem behind the initial request.',
      },
      {
        n: '02',
        title: 'Shape',
        body: 'We define the right technical direction, priorities, architecture, and a realistic delivery plan.',
      },
      {
        n: '03',
        title: 'Build & Improve',
        body: 'We implement, integrate, test, and refine the solution with clear communication throughout delivery.',
      },
    ],
    note: 'No oversized process. No unnecessary layers. Just the right expertise applied to the right problem.',
  },
  contact: {
    id: 'contact',
    title: 'Have a technology challenge or a product worth building?',
    body: 'Tell us where you are today and where you need to go. We’ll help you identify the clearest next step.',
    primary: { href: '#project-form', label: 'Discuss your project' },
    call: `Call ${CONTACT_PHONE}`,
    email: `Email ${CONTACT_EMAIL}`,
    form: {
      name: 'Name',
      email: 'Work email',
      company: 'Company — optional',
      message: 'What are you looking to solve or build?',
      placeholder: 'Briefly describe your goal, current challenge, and any important timeline.',
      submit: 'Send project details',
      support: 'Share as much or as little as you have. We’ll get back to you with a clear next step.',
      sending: 'Sending…',
      success: 'Received. We’ll reply with a clear next step.',
      error: 'The message could not be sent from the site. Use email or try again.',
      fallback: `Email ${CONTACT_EMAIL}`,
      invalid: 'Add your name, a work email, and a short description of the work.',
      mailtoSubject: 'Project inquiry — {name}',
    },
  },
}

export type Copy = typeof en

const bs: Copy = {
  seo: {
    title: 'ZTech Prime | IT konsalting, custom software i SaaS razvoj',
    description:
      'ZTech Prime pomaže kompanijama da riješe složene IT izazove, izgrade pouzdan custom software, modernizuju sisteme i razviju SaaS proizvode koji mogu rasti.',
  },
  aria: {
    brand: 'ZTech Prime, powered by ztech solutions',
    primary: 'Glavna navigacija',
    sections: 'Sekcije',
    footer: 'Podnožje',
    language: 'Jezik',
  },
  headerCta: 'Razgovarajmo o projektu',
  nav: [
    { href: '#expertise', label: 'Ekspertiza' },
    { href: '#how-we-work', label: 'Kako radimo' },
    { href: '#about', label: 'O nama' },
    { href: '#contact', label: 'Kontakt' },
  ],
  hero: {
    eyebrow: 'IT KONSALTING · SOFTWARE ENGINEERING · SAAS RAZVOJ',
    title: 'Pretvorite složenu tehnologiju u poslovni zamah.',
    body: 'ZTech Prime pomaže kompanijama da riješe kritične IT izazove, izgrade pouzdan custom software i pretvore SaaS ideje u proizvode koji skaliraju — od strategije i arhitekture do isporuke.',
    primary: { href: '#contact', label: 'Razgovarajmo o projektu' },
    secondary: { href: '#expertise', label: 'Pogledajte ekspertizu' },
    trust: 'Direktna seniorska ekspertiza · Praktična rješenja · Isporuka od početka do kraja',
  },
  expertise: {
    id: 'expertise',
    label: 'Šta radimo',
    title: 'Tehnološka ekspertiza usmjerena na stvarne poslovne rezultate.',
    intro:
      'Povezujemo strategiju, inženjering i product razmišljanje da riješimo probleme koji usporavaju poslovanje i izgradimo sisteme koji ga pomjeraju naprijed.',
    services: [
      {
        title: 'IT strategija i sistemi',
        body: 'Identifikujte tehničke rizike, pojednostavite složenu infrastrukturu, poboljšajte pouzdanost i dobijte praktičan plan modernizacije.',
      },
      {
        title: 'Custom software development',
        body: 'Dizajniramo i gradimo siguran, održiv software prilagođen vašim procesima, korisnicima i dugoročnim poslovnim ciljevima.',
      },
      {
        title: 'SaaS product engineering',
        body: 'Pretvorite ideju u SaaS platformu koja radi — od arhitekture i MVP-a do integracija, skaliranja i stalnog unapređenja.',
      },
      {
        title: 'Integracije i modernizacija',
        body: 'Povežite nepovezane sisteme, modernizujte naslijeđene aplikacije i uklonite tehnička uska grla koja koče operacije.',
      },
    ],
  },
  about: {
    id: 'about',
    label: 'Zašto ZTech Prime',
    title: 'Seniorsko tehničko razmišljanje, bez nepotrebne složenosti.',
    body: 'Radite direktno sa iskusnim tehničkim vodstvom koje razumije i software i posao iza njega. Krećemo od pravog problema, definišemo pravo rješenje i ostajemo uz isporuku dok ne proradi u praksi.',
    benefits: [
      'Direktna komunikacija sa seniorskom tehničkom ekspertizom',
      'Jasne preporuke prije veće investicije',
      'Arhitektura osmišljena za održavanje i rast',
      'Biznis, product i inženjering se gledaju zajedno',
      'Fleksibilna saradnja — od fokusiranog konsaltinga do kompletne isporuke',
    ],
    credibility:
      'Iskustvo na poslovno kritičnim platformama, složenim integracijama, healthcare tokovima, operativnim sistemima i razvoju SaaS proizvoda.',
  },
  process: {
    id: 'how-we-work',
    label: 'Kako radimo',
    title: 'Jasan put od izazova do rješenja koje radi.',
    steps: [
      {
        n: '01',
        title: 'Razumijevanje',
        body: 'Pregledamo trenutni sistem, poslovni cilj, ograničenja i problem iza prvog zahtjeva.',
      },
      {
        n: '02',
        title: 'Oblikovanje',
        body: 'Definišemo pravi tehnički smjer, prioritete, arhitekturu i realan plan isporuke.',
      },
      {
        n: '03',
        title: 'Izgradnja i unapređenje',
        body: 'Implementiramo, integrišemo, testiramo i dorađujemo rješenje, uz jasnu komunikaciju tokom cijele isporuke.',
      },
    ],
    note: 'Bez prevelikog procesa. Bez nepotrebnih slojeva. Prava ekspertiza na pravom problemu.',
  },
  contact: {
    id: 'contact',
    title: 'Imate tehnološki izazov ili proizvod koji vrijedi graditi?',
    body: 'Recite nam gdje ste danas i kuda trebate stići. Pomoći ćemo vam da vidite najjasniji sljedeći korak.',
    primary: { href: '#project-form', label: 'Razgovarajmo o projektu' },
    call: `Pozovite ${CONTACT_PHONE}`,
    email: `Pišite na ${CONTACT_EMAIL}`,
    form: {
      name: 'Ime',
      email: 'Poslovni email',
      company: 'Kompanija — opcionalno',
      message: 'Šta želite riješiti ili izgraditi?',
      placeholder: 'Ukratko opišite cilj, trenutni izazov i bitan rok, ako ga ima.',
      submit: 'Pošaljite detalje projekta',
      support: 'Pošaljite koliko imate — malo ili više. Javit ćemo se sa jasnim sljedećim korakom.',
      sending: 'Šaljemo…',
      success: 'Primljeno. Javit ćemo se sa jasnim sljedećim korakom.',
      error: 'Poruka nije mogla biti poslana sa sajta. Koristite email ili pokušajte ponovo.',
      fallback: `Pišite na ${CONTACT_EMAIL}`,
      invalid: 'Unesite ime, poslovni email i kratak opis posla.',
      mailtoSubject: 'Upit za projekat — {name}',
    },
  },
}

const sr: Copy = {
  seo: {
    title: 'ZTech Prime | IT консалтинг, custom software и SaaS развој',
    description:
      'ZTech Prime помаже компанијама да реше сложене IT изазове, изграде поуздан custom software, модернизују системе и развију SaaS производе који могу да расту.',
  },
  aria: {
    brand: 'ZTech Prime, powered by ztech solutions',
    primary: 'Главна навигација',
    sections: 'Секције',
    footer: 'Подножје',
    language: 'Језик',
  },
  headerCta: 'Разговарајмо о пројекту',
  nav: [
    { href: '#expertise', label: 'Експертиза' },
    { href: '#how-we-work', label: 'Како радимо' },
    { href: '#about', label: 'О нама' },
    { href: '#contact', label: 'Контакт' },
  ],
  hero: {
    eyebrow: 'IT КОНСАЛТИНГ · SOFTWARE ENGINEERING · SAAS РАЗВОЈ',
    title: 'Претворите сложену технологију у пословни замах.',
    body: 'ZTech Prime помаже компанијама да реше критичне IT изазове, изграде поуздан custom software и претворе SaaS идеје у производе који скалирају — од стратегије и архитектуре до испоруке.',
    primary: { href: '#contact', label: 'Хајде да разговарамо о пројекту' },
    secondary: { href: '#expertise', label: 'Погледајте експертизу' },
    trust: 'Директна сениорска експертиза · Практична решења · Испорука од почетка до краја',
  },
  expertise: {
    id: 'expertise',
    label: 'Шта радимо',
    title: 'Технолошка експертиза усмерена на стварне пословне резултате.',
    intro:
      'Повезујемо стратегију, инжењеринг и product размишљање да решимо проблеме који успоравају пословање и изградимо системе који га померају напред.',
    services: [
      {
        title: 'IT стратегија и системи',
        body: 'Идентификујте техничке ризике, поједноставите сложену инфраструктуру, побољшајте поузданост и добијте практичан план модернизације.',
      },
      {
        title: 'Custom software development',
        body: 'Дизајнирамо и градимо сигуран, одржив software прилагођен вашим процесима, корисницима и дугорочним пословним циљевима.',
      },
      {
        title: 'SaaS product engineering',
        body: 'Претворите идеју у SaaS платформу која ради — од архитектуре и MVP-а до интеграција, скалирања и сталног унапређења.',
      },
      {
        title: 'Интеграције и модернизација',
        body: 'Повежите неповезане системе, модернизујте наслеђене апликације и уклоните техничка уска грла која коче операције.',
      },
    ],
  },
  about: {
    id: 'about',
    label: 'Зашто ZTech Prime',
    title: 'Сениорско техничко размишљање, без непотребне сложености.',
    body: 'Радите директно са искусним техничким руководством које разуме и software и посао иза њега. Крећемо од правог проблема, дефинишемо право решење и остајемо уз испоруку док не проради у пракси.',
    benefits: [
      'Директна комуникација са сениорском техничком експертизом',
      'Јасне препоруке пре веће инвестиције',
      'Архитектура осмишљена за одржавање и раст',
      'Бизнис, product и инжењеринг се гледају заједно',
      'Флексибилна сарадња — од фокусираног консалтинга до комплетне испоруке',
    ],
    credibility:
      'Искуство на пословно критичним платформама, сложеним интеграцијама, healthcare токовима, оперативним системима и развоју SaaS производа.',
  },
  process: {
    id: 'how-we-work',
    label: 'Како радимо',
    title: 'Јасан пут од изазова до решења које ради.',
    steps: [
      {
        n: '01',
        title: 'Разумевање',
        body: 'Прегледамо тренутни систем, пословни циљ, ограничења и проблем иза првог захтева.',
      },
      {
        n: '02',
        title: 'Обликовање',
        body: 'Дефинишемо прави технички смер, приоритете, архитектуру и реалан план испоруке.',
      },
      {
        n: '03',
        title: 'Изградња и унапређење',
        body: 'Имплементирамо, интегришемо, тестирамо и дорађујемо решење, уз јасну комуникацију током целе испоруке.',
      },
    ],
    note: 'Без превеликог процеса. Без непотребних слојева. Права експертиза на правом проблему.',
  },
  contact: {
    id: 'contact',
    title: 'Имате технолошки изазов или производ који вреди градити?',
    body: 'Реците нам где сте данас и куда треба да стигнете. Помоћи ћемо вам да видите најјаснији следећи корак.',
    primary: { href: '#project-form', label: 'Хајде да разговарамо о пројекту' },
    call: `Позовите ${CONTACT_PHONE}`,
    email: `Пишите на ${CONTACT_EMAIL}`,
    form: {
      name: 'Име',
      email: 'Пословни имејл',
      company: 'Компанија — опционално',
      message: 'Шта желите да решите или изградите?',
      placeholder: 'Укратко опишите циљ, тренутни изазов и битан рок, ако га има.',
      submit: 'Пошаљите детаље пројекта',
      support: 'Пошаљите колико имате — мало или више. Јавићемо се са јасним следећим кораком.',
      sending: 'Шаљемо…',
      success: 'Примљено. Јавићемо се са јасним следећим кораком.',
      error: 'Порука није могла да буде послата са сајта. Користите имејл или покушајте поново.',
      fallback: `Пишите на ${CONTACT_EMAIL}`,
      invalid: 'Унесите име, пословни имејл и кратак опис посла.',
      mailtoSubject: 'Упит за пројекат — {name}',
    },
  },
}

export const copies: Record<Locale, Copy> = { en, bs, sr }
