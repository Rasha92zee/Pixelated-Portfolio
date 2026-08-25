export const player = {
  name: "Rasha Hasoon",
  handle: "RASHA.EXE",
  className: "BUILDER",
  specialization: "TECHNOLOGY + COMMUNITY",
  location: "Kozhikode, Kerala, India",
  status: "ONLINE",
  title: "Front-End Developer | Project Manager | Community Builder | AI & Technology Enthusiast",
  tagline: "Started with code. Somehow ended up building communities.",
  bio: [
    "Some people collect certificates. I collect side quests.",
    "I write front-end code, run projects across timezones, and build the kind of rooms where other people start building too. My work sits at the intersection of Technology x Education x Community x Leadership x Impact.",
    "Currently deep in AI and Data Science. Permanently curious.",
  ],
  links: {
    github: "https://github.com/Rasha92zee",
    linkedin: "https://www.linkedin.com/in/rasha-hasoon/",
    email: "",  // not provided — contact via LinkedIn
  },
} as const;

export type Skill = {
  name: string;
  level: number; // 0-10
  detail: string;
};

export const skills: Skill[] = [
  {
    name: "Front-End",
    level: 9,
    detail:
      "JavaScript, React.js, HTML/CSS. Shipped production ERP & CRM interfaces at CyberSquare Professional, with code reviews and delivery ownership.",
  },
  {
    name: "Project Management",
    level: 8,
    detail:
      "Led a 30-member international remote team for the AI+Compassion Global Relay Project across 8 regions and 60+ speakers.",
  },
  {
    name: "Community Building",
    level: 9,
    detail:
      "TinkerHub Campus Lead (550+ participants reached, Campus Council of 62 campuses) and MuLearn PM Interest Group Lead.",
  },
  {
    name: "AI / Technology",
    level: 7,
    detail:
      "AI Mentor at Interval Learning — introduced AI tools into teacher workflows across 20+ training sessions. Currently exploring AI & Data Science.",
  },
  {
    name: "Communication",
    level: 9,
    detail:
      "Workshops, bootcamps, mentoring, and acting as a strategic liaison between students and industry.",
  },
  {
    name: "Teaching / Mentoring",
    level: 8,
    detail:
      "Curiosity Coach at iLAB — designed a Digital Tech Literacy curriculum for 65+ students from Kerala's coastal communities.",
  },
];

export type Mission = {
  id: string;
  level: number;
  code: string;
  role: string;
  org: string;
  period: string;
  blurb: string;
  objectives: string[];
  tags: string[];
};

export const missions: Mission[] = [
  {
    id: "digital-awakening",
    level: 7,
    code: "MISSION: DIGITAL AWAKENING",
    role: "Curiosity Coach",
    org: "iLAB Innovation Laboratory, India",
    period: "Jul 2025 – Present",
    blurb: "Teach the first line of code to people the internet forgot.",
    objectives: [
      "Designed and executed a Digital Tech Literacy Program curriculum",
      "Worked with 65+ students",
      "Conducted hands-on sessions",
      "Worked with young learners from Kerala's coastal communities",
      "Focused on foundational digital and creative technology skills",
    ],
    tags: ["EDUCATION", "CURRICULUM", "IMPACT"],
  },
  {
    id: "global-relay",
    level: 8,
    code: "MISSION: GLOBAL RELAY",
    role: "Project Manager",
    org: "AI+Compassion",
    period: "Sep 2024 – Present",
    blurb: "Eight regions. One relay. Zero shared timezone.",
    objectives: [
      "Led a 30-member international remote team",
      "Worked on the AI+Compassion Global Relay Project",
      "Coordinated a project involving 60+ speakers",
      "Spanned Osaka, South Asia, GCC/Europe, Africa, Latin America, North America, Oceania and Kyoto",
      "Managed digital workflow and coordination",
      "Worked with international stakeholders",
    ],
    tags: ["LEADERSHIP", "REMOTE", "AI"],
  },
  {
    id: "guild-of-builders",
    level: 6,
    code: "THE GUILD OF BUILDERS",
    role: "Intern / Associate",
    org: "MuLearn Foundation",
    period: "May 2025 – July 2026",
    blurb: "Turn a Discord full of students into a pipeline of project managers.",
    objectives: [
      "Project Management Interest Group Lead",
      "Created structured learning roadmaps",
      "Created practical PM tasks based on real-world scenarios",
      "Conducted workshops",
      "Led / supported large interest groups",
      "Worked as a strategic liaison between students and industry",
      "Helped drive high-impact projects",
    ],
    tags: ["COMMUNITY", "PM", "MENTORING"],
  },
  {
    id: "build-the-guild",
    level: 6,
    code: "MISSION: BUILD THE GUILD",
    role: "Campus Lead",
    org: "TinkerHub Foundation",
    period: "Jun 2025 – Apr 2026",
    blurb: "Hackathons are just dungeons with pizza.",
    objectives: [
      "Hosted hackathons, learning programs and events",
      "Reached 550+ participants",
      "Served on the Campus Council representing 62 campuses",
      "Helped drive community projects",
      "Volunteered for Women Maker Celebration 2026",
      "Involved with Tink-Her-Hack 4.0",
    ],
    tags: ["COMMUNITY", "EVENTS", "LEADERSHIP"],
  },
  {
    id: "second-start",
    level: 5,
    code: "MISSION: SECOND START",
    role: "AI Mentor",
    org: "Interval Learning",
    period: "Nov 2024 – Mar 2025",
    blurb: "Give 50 teachers a second start in the digital workforce.",
    objectives: [
      "Mentored 50 teachers",
      "Helped people re-enter the digital workforce",
      "Introduced AI tools into learning workflows",
      "Conducted 20+ training sessions",
    ],
    tags: ["AI", "MENTORING", "EDUCATION"],
  },
  {
    id: "scale-the-idea",
    level: 5,
    code: "MISSION: SCALE THE IDEA",
    role: "Operations Lead",
    org: "NoteAI",
    period: "Sep 2024 – Apr 2025",
    blurb: "A student-led AI EdTech startup aiming at 1 lakh students.",
    objectives: [
      "Operations for a student-led AI EdTech startup",
      "Goal of teaching 1 lakh students by 2026",
      "Already impacted 25,000 students",
      "Lead generation and database management",
      "Sessions, bootcamps and team coordination",
      "Strategic planning and research",
    ],
    tags: ["OPERATIONS", "EDTECH", "STRATEGY"],
  },
  {
    id: "ship-the-system",
    level: 4,
    code: "MISSION: SHIP THE SYSTEM",
    role: "Front-End Developer Intern",
    org: "CyberSquare Professional",
    period: "Jun 2023 – Nov 2024",
    blurb: "Where the class 'Developer' was unlocked.",
    objectives: [
      "Developed front-end applications with JavaScript and React.js",
      "Built production ERP / CRM systems",
      "Team Lead responsibilities",
      "Code reviews",
      "Developer workflow coordination",
      "Owned delivery timelines",
    ],
    tags: ["REACT", "JAVASCRIPT", "ERP/CRM"],
  },
];

export type Quest = {
  id: string;
  no: string;
  name: string;
  difficulty: number; // 1-5
  questClass: string;
  objective: string;
  challenge: string;
  solution: string;
  outcome: string;
  tech: string[];
  repo?: string;
  demo?: string;
};

export const quests: Quest[] = [
  {
    id: "berry-basket",
    no: "QUEST 01",
    name: "BERRY BASKET",
    difficulty: 3,
    questClass: "FULL-STACK / MOBILE",
    objective: "Build an e-commerce ecosystem for micro-retailers.",
    challenge:
      "Micro-retailers need admin, seller and customer flows in one app — inventory, orders and discovery — without enterprise tooling.",
    solution:
      "A Flutter client backed by Django REST Framework: admin, seller and customer modules, JWT authentication, Provider state management, and a glassmorphic UI with adaptive light/dark themes.",
    outcome:
      "A three-sided mobile commerce app with inventory management, order management and location-based discovery.",
    tech: ["Flutter", "Django REST Framework", "JWT", "Provider"],
  },
  {
    id: "pygame-platformer",
    no: "QUEST 02",
    name: "PYGAME_PLATFORMER",
    difficulty: 3,
    questClass: "GAME DEV",
    objective: "Build a 2D platformer engine from scratch.",
    challenge: "Physics, collisions and level state with no engine to lean on.",
    solution: "A Pygame loop handling tile collision, movement and level progression.",
    outcome: "A playable platformer — and the reason this portfolio is a game.",
    tech: ["Python", "Pygame"],
    repo: "https://github.com/Rasha92zee/PygamePlatformer",
  },
  {
    id: "vertical-platformer",
    no: "QUEST 03",
    name: "VERTICAL_PLATFORMER",
    difficulty: 2,
    questClass: "GAME DEV",
    objective: "Take the platformer upward instead of sideways.",
    challenge: "Vertical camera logic and ascending level generation.",
    solution: "A vertical-scrolling variant with climb-focused level design.",
    outcome: "A second game prototype exploring a different movement axis.",
    tech: ["Python", "Pygame"],
    repo: "https://github.com/Rasha92zee/Vertical-Platformer",
  },
  {
    id: "indian-cricket-team",
    no: "QUEST 04",
    name: "INDIAN_CRICKET_TEAM",
    difficulty: 2,
    questClass: "FRONT-END",
    objective: "Present a team roster as a clean, structured web interface.",
    challenge: "Turning raw roster data into a readable, responsive layout.",
    solution: "A front-end build focused on layout, structure and presentation.",
    outcome: "A published front-end project on GitHub.",
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/Rasha92zee/Indian-Cricket-Team",
  },
  {
    id: "countdown-buddy",
    no: "QUEST 05",
    name: "COUNTDOWN_BUDDY",
    difficulty: 2,
    questClass: "FRONT-END / UTILITY",
    objective: "Ship a small tool that counts down to what matters.",
    challenge: "Time math, persistence and a UI that stays legible at a glance.",
    solution: "A lightweight countdown utility built with web fundamentals.",
    outcome: "A small, finished, useful thing. Underrated skill.",
    tech: ["JavaScript", "HTML", "CSS"],
    repo: "https://github.com/Rasha92zee/Countdown-buddy",
  },
  {
    id: "dolce-pizza",
    no: "QUEST 06",
    name: "DOLCE_PIZZA",
    difficulty: 2,
    questClass: "FRONT-END",
    objective: "Build a storefront experience for a pizza brand.",
    challenge: "Menu structure, visual appetite appeal and responsive layout.",
    solution: "A front-end storefront with menu presentation and responsive design.",
    outcome: "A polished front-end project on GitHub.",
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/Rasha92zee/DolcePizza",
  },
];

export type Trophy = {
  id: string;
  icon: string;
  title: string;
  detail: string;
};

export const trophies: Trophy[] = [
  {
    id: "world-bank",
    icon: "◍",
    title: "GLOBAL PLAYER",
    detail: "World Bank Group Youth Summit 2026 — Delegate representing India",
  },
  {
    id: "beyond-borders",
    icon: "▲",
    title: "BEYOND BORDERS",
    detail: "Beyond Borders Fellowship 2026 — The Growth Sphere",
  },
  {
    id: "ghci",
    icon: "⚡",
    title: "GHCI SCHOLAR",
    detail: "Grace Hopper Celebration India Scholar — 2025",
  },
  {
    id: "nss",
    icon: "✦",
    title: "EXCELLENCE",
    detail: "Excellence Award by NSS MAMOC",
  },
  {
    id: "tinkherhack",
    icon: "★",
    title: "WORLD BUILDER",
    detail: "Top project at AWH Engineering College as part of Tink-Her-Hack 3.0",
  },
  {
    id: "mgmt-fest",
    icon: "♛",
    title: "FIRST PLACE",
    detail: "First in Management Fest conducted by NSKL Education at MAMOC",
  },
  {
    id: "code-to-eve",
    icon: "▮",
    title: "CODE CRAFTER",
    detail: "Second in Code To Eve as part of illu'mate 2024",
  },
];

export const education = {
  degree: "Bachelor of Science in Computer Science",
  school: "Muhammed Abdurahiman Memorial Orphanage College",
  place: "Kozhikode, India",
  period: "June 2023 – April 2026",
  arc: [
    { year: "2023", label: "TRAINING BEGINS", note: "Enrolled in B.Sc Computer Science. Front-end internship starts in parallel." },
    { year: "2024", label: "SKILL BRANCHING", note: "React + production systems by day, community and operations by night." },
    { year: "2025", label: "MENTOR CLASS UNLOCKED", note: "Teaching teachers, coastal-community learners and campus builders." },
    { year: "2026", label: "GRADUATION QUEST", note: "Degree completes April 2026. Next area: AI & Data Science." },
  ],
};

export const communityNodes = [
  { id: "mulearn", label: "MuLearn", x: 20, y: 26, note: "PM Interest Group Lead — roadmaps, workshops, industry liaison." },
  { id: "tinkerhub", label: "TinkerHub", x: 52, y: 14, note: "Campus Lead — 550+ participants, Campus Council of 62 campuses." },
  { id: "ilab", label: "iLAB", x: 80, y: 30, note: "Curiosity Coach — digital literacy for 65+ coastal-community students." },
  { id: "aic", label: "AI+Compassion", x: 68, y: 62, note: "Project Manager — 30-member global team, 60+ speakers." },
  { id: "interval", label: "Interval Learning", x: 34, y: 72, note: "AI Mentor — 50 teachers, 20+ training sessions." },
  { id: "noteai", label: "NoteAI", x: 12, y: 56, note: "Operations Lead — 25,000 students impacted so far." },
  { id: "hub", label: "RASHA", x: 46, y: 44, note: "Technology becomes more powerful when people build together." },
];

export const communityLinks: [string, string][] = [
  ["hub", "mulearn"],
  ["hub", "tinkerhub"],
  ["hub", "ilab"],
  ["hub", "aic"],
  ["hub", "interval"],
  ["hub", "noteai"],
  ["mulearn", "tinkerhub"],
  ["ilab", "aic"],
  ["interval", "noteai"],
];

export const futureZone = [
  { title: "AI & DATA SCIENCE", note: "Currently the main grind. Models, data, and what they do to learning." },
  { title: "COMMUNITY AS INFRASTRUCTURE", note: "Building ecosystems that keep producing builders after I leave the room." },
  { title: "DIGITAL LITERACY AT SCALE", note: "Taking coastal-community programs further than one classroom." },
  { title: "GAME-SHAPED INTERFACES", note: "You are standing inside this one." },
];
