// Starter content. The public site falls back to this until Firestore has content,
// and the dashboard can import it into Firestore in one click.

export const seedProfile = {
  name: "Azumah Mpopiin Ernest",
  shortName: "Azumah",
  role: "Full-stack developer",
  location: "Kumasi, Ghana",
  headline: "I build software that keeps real operations moving.",
  intro:
    "Telecommunications Engineering student at KNUST and self-taught full-stack developer. I turn messy, multi-person workflows into products people rely on every day.",
  about:
    "I'm a Telecommunications Engineering student at KNUST, Kumasi, and a self-taught full-stack developer. Outside the code, I bring strong people skills and an ease in team settings that I've built deliberately, through reading, practice, and reflection. I lead with love in everything I do: for the craft, for the people I build with, and for work that actually matters. I'm always open to new knowledge, collaboration, and opportunities to grow.",
  availability: "Open to roles, freelance work and collaboration",
  photoUrl: "/profile.png",
  resumeUrl: "/resume.pdf",
  contacts: [
    {
      label: "Email",
      value: "teslajunior0552@gmail.com",
      href: "mailto:teslajunior0552@gmail.com",
    },
    {
      label: "WhatsApp",
      value: "+233 55 741 0587",
      href: "https://wa.me/233557410587",
    },
    {
      label: "LinkedIn",
      value: "ernest-azumah",
      href: "https://www.linkedin.com/in/ernest-azumah-48b3a5308/",
    },
    {
      label: "GitHub",
      value: "Azumah-Mpopiin-Ernest",
      href: "https://github.com/Azumah-Mpopiin-Ernest",
    },
  ],
  skills: [
    {
      group: "Frontend",
      items: [
        { name: "JavaScript", note: "Scrimba, June 2025" },
        { name: "React", note: "Scrimba React course" },
        { name: "HTML & CSS", note: "KNUST and personal practice" },
        { name: "Tailwind CSS", note: "YouTube and personal projects" },
      ],
    },
    {
      group: "Backend",
      items: [
        { name: "Node.js", note: "YouTube and personal projects" },
        { name: "Express", note: "YouTube and personal projects" },
        { name: "PostgreSQL", note: "YouTube and Prisma docs" },
        { name: "Prisma", note: "Official Prisma docs" },
        { name: "OAuth 2.0", note: "YouTube and hands-on projects" },
      ],
    },
    {
      group: "Firebase",
      items: [
        { name: "Auth", note: "Built into Phix" },
        { name: "Firestore", note: "Built into Phix" },
        { name: "Cloud Functions", note: "Built into Phix" },
      ],
    },
  ],
};

const phixShots = Array.from(
  { length: 12 },
  (_, i) => `/images/phix${i + 1}.png`,
);

export const seedProjects = [
  {
    name: "Phix",
    slug: "phix",
    summary:
      "A real-time, multi-role maintenance reporting platform for a hospital maintenance department. It takes reports from submission through approval, procurement, assignment, and completion, with automated push notifications throughout.",
    technologies: [
      "React",
      "Firebase Auth",
      "Firestore",
      "Firebase Functions",
      "OneSignal",
    ],
    role: "Full-stack developer",
    status: "In production",
    link: "https://phix-hfch.vercel.app/",
    repo: "",
    cover: "/images/phix.png",
    screenshots: phixShots,
    deviceFrame: "phone",
    featured: true,
    published: true,
    problem:
      "Hospital maintenance requests can be delayed or lost when staff, estate managers, workers, procurement, and administrators rely on disconnected updates. The team needed one system for submitting work, coordinating decisions, tracking costs, and confirming quality.",
    challenge:
      "Replace fragmented maintenance follow-up with a secure, role-aware workflow that keeps every request visible from intake to closure.",
    approach:
      "I translated the operational process into explicit role-based states: Incoming, Approved or Denied, Materials Request, Confirmed, Procured, Assigned, Accepted or Rejected, Completed, and Closed or Reopened. I enforced those boundaries with Firestore rules and server-side PIN claiming, then used live listeners and targeted push notifications to keep the right people informed. I also treated overdue detection, audit-friendly history, photo storage, and mobile navigation as first-class parts of the workflow.",
    outcome:
      "Production deployment supporting the complete maintenance reporting workflow.",
    features: [
      "Secure registration with role-scoped six-digit PINs",
      "Verified email authentication and account recovery",
      "Six role-based dashboards and protected routes",
      "Maintenance reports with priority, due dates, photos, and locations",
      "Full approval, materials, procurement, assignment, and completion lifecycle",
      "Worker accept, reject, and drop-job flows with reason capture",
      "Before-and-after photos, feedback, ratings, and job reopening",
      "Real-time in-app and OneSignal push notifications",
      "Overdue flags, countdown timers, and emergency alerts",
      "Searchable, filterable report history and user management",
      "Cost, quality, risk, worker, and resolution-time analytics",
      "Downloadable work-order and dashboard PDF reports",
      "Responsive mobile navigation with light and dark mode",
    ],
    featureGroups: [
      {
        name: "Security & access",
        details:
          "Email verification, password recovery, login lockout, role-scoped registration PINs, Firebase App Check, server-side rate limiting, granular Firestore rules, and live account deactivation enforcement.",
      },
      {
        name: "Report intake",
        details:
          "Staff can submit category, priority, location, description, and optional photo details. Images are validated and compressed before upload, with Emergency, Urgent, and Routine priorities driving due dates.",
      },
      {
        name: "Workflow lifecycle",
        details:
          "Reports move through approval, materials, procurement, assignment, worker acceptance, completion, closure, reopening, and reassignment with reasons captured at the important decision points.",
      },
      {
        name: "Notifications & quality",
        details:
          "Live notifications, targeted push deep links, overdue detection, countdown timers, emergency banners, before-and-after evidence, staff feedback, and one-to-five-star technician ratings.",
      },
      {
        name: "Operations & analytics",
        details:
          "Role-specific report lists, history filters, user management, KPI dashboards, cost trends, denial and reassignment rates, first-time-fix rate, stage duration, location hotspots, and worker performance.",
      },
      {
        name: "Documents & experience",
        details:
          "Detailed report timelines, quick-call actions, downloadable work-order PDFs, dashboard summaries, responsive mobile layouts, role themes, and persistent light/dark mode.",
      },
    ],
  },
  {
    name: "Library Manager",
    slug: "library-manager",
    summary:
      "A web-based library management system that allows students to browse books, borrow and share book links, receive alerts, and manage accounts with secure authentication.",
    technologies: ["React", "Firebase", "JavaScript"],
    role: "Frontend and backend developer",
    status: "Prototype",
    link: "https://library-manager-rho-coral.vercel.app/",
    cover: "/images/library-manager.png",
    screenshots: ["/images/library-manager.png"],
    deviceFrame: "phone",
    challenge:
      "Bring book discovery, borrowing, sharing, alerts, and account management into one focused experience.",
    problem:
      "Students needed a simpler way to find available books, manage borrowing activity, and share useful resources without switching between disconnected library tasks.",
    approach:
      "I separated the experience into discover, borrow, share, and account flows. Firebase authentication and data storage provided the foundation for personalized access and a consistent experience across sessions.",
    features: [
      "Book browsing and discovery",
      "Borrowing and account management",
      "Book-link sharing",
      "Student alerts",
      "Secure authentication",
    ],
    outcome:
      "Prototype demonstrating authenticated library workflows and student-facing book management.",
  },
  {
    name: "Life EndGame",
    slug: "life-endgame",
    summary:
      "A word-guessing game where players try to save themselves from a lonely world. Each incorrect guess carries a penalty.",
    technologies: ["React", "JavaScript", "CSS"],
    role: "Frontend developer",
    status: "Prototype",
    link: "https://life-endgame-jvuv.vercel.app/",
    cover: "/images/end-game.png",
    screenshots: ["/images/end-game.png"],
    deviceFrame: "browser",
    challenge:
      "Turn a simple word-guessing mechanic into a clear, tense, and replayable game experience.",
    problem:
      "A word-guessing game needs to communicate rules, progress, and consequences immediately so players can focus on making their next decision.",
    approach:
      "I organized the game around explicit state for the hidden word, guessed letters, remaining chances, and penalty feedback. The interface reveals progress as the player acts while keeping the visual language focused on the story.",
    features: [
      "Hidden-word guessing mechanic",
      "Incorrect-guess penalties",
      "Progress and remaining-chance feedback",
      "Win and loss states",
      "Replayable game flow",
    ],
    outcome:
      "Prototype with interactive game state, feedback, and penalty mechanics.",
  },
  {
    name: "EasyMarket",
    slug: "easymarket",
    summary:
      "An offline shopping list app that lets users add, track, and manage items, calculate totals, and save or share their basket.",
    technologies: ["React", "JavaScript", "CSS"],
    role: "Frontend developer",
    status: "Prototype",
    link: "https://easy-market-2q6w.vercel.app/",
    cover: "/images/easy-market.png",
    deviceFrame: "phone",
    challenge:
      "Make everyday shopping-list management useful even when an internet connection is unavailable.",
    outcome:
      "Prototype for creating and managing baskets with automatic total calculations.",
  },
  {
    name: "Tenzies",
    slug: "tenzies",
    summary:
      "A dice game where players roll until all dice match, freezing individual dice between rolls to build a winning combination.",
    technologies: ["React", "JavaScript", "CSS"],
    role: "Frontend developer",
    status: "Prototype",
    link: "https://tenzies-fubr.vercel.app/",
    cover: "/images/tenzies.png",
    deviceFrame: "browser",
    challenge:
      "Manage dice state and player interactions while keeping the rules immediately understandable.",
    outcome:
      "Prototype with interactive dice, freeze controls, and win-state feedback.",
  },
  {
    name: "Meme Generator",
    slug: "meme-generator",
    summary:
      "A meme generator that lets users create memes from a collection of popular images.",
    technologies: ["React", "JavaScript", "CSS"],
    role: "Frontend developer",
    status: "Prototype",
    link: "https://meme-generator-rho-ivory.vercel.app/",
    cover: "/images/meme-generator.png",
    deviceFrame: "browser",
    challenge:
      "Provide a quick, approachable flow for selecting an image and generating personalized meme content.",
    outcome: "Prototype for creating memes from a curated image collection.",
  },
  {
    name: "My Travel Journal",
    slug: "travel-journal",
    summary:
      "A travel journal for recording visited places, dates, times, and Google Maps links to each location.",
    technologies: ["React", "JavaScript", "CSS"],
    role: "Frontend developer",
    status: "Prototype",
    link: "https://travel-journal-y8nn.vercel.app/",
    cover: "/images/travel-journal.png",
    deviceFrame: "browser",
    challenge:
      "Present travel memories and location details in a simple format that is easy to browse.",
    outcome: "Prototype for documenting trips with dates and map links.",
  },
  {
    name: "Shopcart",
    slug: "shopcart",
    summary:
      "A shopping-list app where users can add items to a cart, track what they need to buy, and double-click completed items to remove them.",
    technologies: ["React", "JavaScript", "CSS"],
    role: "Frontend developer",
    status: "Prototype",
    link: "https://mummy-silk.vercel.app/",
    cover: "/images/shopcart.png",
    deviceFrame: "phone",
    challenge:
      "Keep shopping-list interactions fast and simple for repeated use on a small screen.",
    outcome:
      "Prototype with add-to-cart, tracking, and item-removal interactions.",
  },
].map((project, index) => normalizeProject({ ...project, order: index }));

export function normalizeProject(p = {}) {
  return {
    name: p.name || "",
    slug: p.slug || "",
    summary: p.summary || "",
    technologies: p.technologies || [],
    role: p.role || "",
    status: p.status || "",
    link: p.link || "",
    repo: p.repo || "",
    cover: p.cover || "",
    screenshots: p.screenshots || [],
    deviceFrame: p.deviceFrame || "browser",
    featured: Boolean(p.featured),
    published: p.published ?? true,
    order: p.order ?? 0,
    problem: p.problem || "",
    challenge: p.challenge || "",
    approach: p.approach || "",
    outcome: p.outcome || "",
    features: p.features || [],
    featureGroups: p.featureGroups || [],
    ...(p.id ? { id: p.id } : {}),
  };
}

export function normalizeProfile(p = {}) {
  return { ...seedProfile, ...p };
}

// A project gets its own case-study page when it has a story to tell.
export function hasCaseStudy(p) {
  return Boolean(
    p.problem ||
      p.approach ||
      p.features?.length ||
      p.featureGroups?.length ||
      p.screenshots?.length > 1,
  );
}
