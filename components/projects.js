import img1 from "../images/library-manager.png";
import img2 from "../images/easy-market.png";
import img3 from "../images/end-game.png";
import img4 from "../images/tenzies.png";
import img5 from "../images/meme-generator.png";
import img6 from "../images/travel-journal.png";
import img7 from "../images/shopcart.png";
import img8 from "../images/phix.png";
import phix1 from "../images/phix1.png";
import phix2 from "../images/phix2.png";
import phix3 from "../images/phix3.png";
import phix4 from "../images/phix4.png";
import phix5 from "../images/phix5.png";
import phix6 from "../images/phix6.png";
import phix7 from "../images/phix7.png";
import phix8 from "../images/phix8.png";
import phix9 from "../images/phix9.png";
import phix10 from "../images/phix10.png";
import phix11 from "../images/phix11.png";
import phix12 from "../images/phix12.png";

export const projects = [
  {
    name: "Phix",
    slug: "phix",
    description:
      "A real-time, multi-role maintenance reporting platform for a hospital maintenance department. It takes reports from submission through approval, procurement, assignment, and completion, with automated push notifications throughout.",
    technologies: [
      "React",
      "Firebase Auth",
      "Firestore",
      "Firebase Functions",
      "OneSignal",
    ],
    role: "Full-stack developer",
    challenge:
      "Replace fragmented maintenance follow-up with a secure, role-aware workflow that keeps every request visible from intake to closure.",
    problem:
      "Hospital maintenance requests can be delayed or lost when staff, estate managers, workers, procurement, and administrators rely on disconnected updates. The team needed one system for submitting work, coordinating decisions, tracking costs, and confirming quality.",
    approach:
      "I translated the operational process into explicit role-based states: Incoming, Approved or Denied, Materials Request, Confirmed, Procured, Assigned, Accepted or Rejected, Completed, and Closed or Reopened. I enforced those boundaries with Firestore rules and server-side PIN claiming, then used live listeners and targeted push notifications to keep the right people informed. I also treated overdue detection, audit-friendly history, photo storage, and mobile navigation as first-class parts of the workflow.",
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
    outcome:
      "Production deployment supporting the complete maintenance reporting workflow.",
    status: "In production",
    link: "https://phix-hfch.vercel.app/",
    img: img8,
    screenshots: [
      phix1,
      phix2,
      phix3,
      phix4,
      phix5,
      phix6,
      phix7,
      phix8,
      phix9,
      phix10,
      phix11,
      phix12,
    ],
    priority: "high",
  },
  {
    name: "Library Manager",
    description:
      "A web-based library management system that allows students to browse books, borrow and share book links, receive alerts, and manage accounts with secure authentication.",
    technologies: ["React", "Firebase", "JavaScript"],
    role: "Frontend and backend developer",
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
    status: "Prototype",
    link: "https://library-manager-rho-coral.vercel.app/",
    img: img1,
    screenshots: [img1],
  },
  {
    name: "EasyMarket",
    description:
      "An offline shopping list app that lets users add, track, and manage items, calculate totals, and save or share their basket.",
    technologies: ["React", "JavaScript", "CSS"],
    role: "Frontend developer",
    challenge:
      "Make everyday shopping-list management useful even when an internet connection is unavailable.",
    outcome:
      "Prototype for creating and managing baskets with automatic total calculations.",
    status: "Prototype",
    link: "https://easy-market-2q6w.vercel.app/",
    img: img2,
  },
  {
    name: "Life EndGame",
    description:
      "A word-guessing game where players try to save themselves from a lonely world. Each incorrect guess carries a penalty.",
    technologies: ["React", "JavaScript", "CSS"],
    role: "Frontend developer",
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
    status: "Prototype",
    link: "https://life-endgame-jvuv.vercel.app/",
    img: img3,
    screenshots: [img3],
  },
  {
    name: "Tenzies",
    description:
      "A dice game where players roll until all dice match, freezing individual dice between rolls to build a winning combination.",
    technologies: ["React", "JavaScript", "CSS"],
    role: "Frontend developer",
    challenge:
      "Manage dice state and player interactions while keeping the rules immediately understandable.",
    outcome:
      "Prototype with interactive dice, freeze controls, and win-state feedback.",
    status: "Prototype",
    link: "https://tenzies-fubr.vercel.app/",
    img: img4,
  },
  {
    name: "Meme Generator",
    description:
      "A meme generator that lets users create memes from a collection of popular images.",
    technologies: ["React", "JavaScript", "CSS"],
    role: "Frontend developer",
    challenge:
      "Provide a quick, approachable flow for selecting an image and generating personalized meme content.",
    outcome: "Prototype for creating memes from a curated image collection.",
    status: "Prototype",
    link: "https://meme-generator-rho-ivory.vercel.app/",
    img: img5,
  },

  {
    name: "My Travel Journal",
    description:
      "A travel journal for recording visited places, dates, times, and Google Maps links to each location.",
    technologies: ["React", "JavaScript", "CSS"],
    role: "Frontend developer",
    challenge:
      "Present travel memories and location details in a simple format that is easy to browse.",
    outcome: "Prototype for documenting trips with dates and map links.",
    status: "Prototype",
    link: "https://travel-journal-y8nn.vercel.app/",
    img: img6,
  },

  {
    name: "Shopcart",
    description:
      "A shopping-list app where users can add items to a cart, track what they need to buy, and double-click completed items to remove them.",
    technologies: ["React", "JavaScript", "CSS"],
    role: "Frontend developer",
    challenge:
      "Keep shopping-list interactions fast and simple for repeated use on a small screen.",
    outcome:
      "Prototype with add-to-cart, tracking, and item-removal interactions.",
    status: "Prototype",
    link: "https://mummy-silk.vercel.app/",
    img: img7,
  },
];
