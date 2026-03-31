// ─── Centralized Chat Configuration ─────────────────────────────────────────
// All questions, categories, and AI responses live here.
// To add a new question: add an entry to CHAT_RESPONSES, then reference its
// key inside the appropriate QUESTION_CATEGORY.

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ResponseImage {
  src: string;
  alt: string;
}

export interface ChatResponseConfig {
  text: string;
  images?: ResponseImage[];
}

export interface ChatQuestion {
  key: string;
  label: string;
}

export interface QuestionCategory {
  id: string;
  label: string;
  emoji: string;
  questions: ChatQuestion[];
}

// ─── Responses ──────────────────────────────────────────────────────────────
// Maps a question key → { text, images? }.
// Keys are kebab-case identifiers; the label shown to the user comes from
// QUESTION_CATEGORIES or QUICK_SUGGESTIONS below.

export const CHAT_RESPONSES: Record<string, ChatResponseConfig> = {
  // ── Me ──
  "who-are-you": {
    text: `Hey! I'm Tamerlan Kangarli — a full-stack developer from Baku, Azerbaijan 🇦🇿 currently based in Paris.

I build modern web applications with React, Next.js, Node.js, and TypeScript. I'm a graduate of École 42 Paris, one of the most innovative coding schools in the world — no teachers, no classes, just peer-to-peer learning and real projects.

I love turning complex problems into elegant, user-friendly solutions. This portfolio itself is a good example of my approach: interactive, polished, and a little unconventional.`,
    images: [{ src: "/images/me.jpg", alt: "Tamerlan Kangarli" }],
  },

  "your-passions": {
    text: `Where do I start? 😄

Code is obviously a big one — I genuinely enjoy the craft of building things. There's something deeply satisfying about writing clean, performant code that creates real experiences for people.

Outside of tech, I'm a mountain biker 🚵 — I love the combination of nature, adrenaline, and focus it requires. I'm also into exploring new cultures and cuisines when I travel.

And honestly? I'm passionate about learning itself. Whether it's a new framework, a new language, or even a new cooking technique — that feeling of "clicking" with something new never gets old.`,
  },

  "started-in-tech": {
    text: `My journey into tech started with curiosity — I was always the kid who wanted to know how things worked behind the screen.

I started teaching myself to code as a teenager, building small projects and breaking things along the way (mostly breaking things, honestly). That self-taught foundation led me to discover École 42 in Paris.

42 was a game-changer. The peer-to-peer model forced me to learn deeply, collaborate constantly, and solve problems I never thought I could tackle. It shaped my approach to engineering: resourceful, collaborative, and always hungry to learn more.`,
  },

  "five-year-vision": {
    text: `In five years, I see myself leading engineering teams that build products people actually love using.

I want to be at the intersection of technical excellence and product thinking — not just writing great code, but making decisions about what to build and why. Whether that's as a tech lead at an innovative company or building my own product, the goal is the same: create meaningful impact through technology.

I also want to keep contributing to the developer community — through open source, mentoring, or sharing what I've learned along the way.`,
  },

  // ── Professional ──
  "see-resume": {
    text: `I'd be happy to share my resume! You can download it here:

📄 [Download Resume (PDF)](/resume.pdf)

But honestly, this chat might give you a better sense of who I am than a PDF ever could. Feel free to ask me anything about my experience, skills, or projects!`,
  },

  "valuable-team-member": {
    text: `Three things set me apart:

**1. Full-stack versatility** — I can jump between a React frontend, a Node.js API, and a PostgreSQL database without missing a beat. I don't just "know" both sides — I genuinely enjoy working across the stack.

**2. Product mindset** — I don't just implement specs. I ask "why?" and "for whom?" I think about user experience, performance implications, and long-term maintainability before writing a single line of code.

**3. Ownership culture** — When I take on something, I own it end-to-end. I communicate proactively, I flag risks early, and I don't consider something done until it's polished and shipped.

Oh, and I make really good coffee for the team. ☕`,
  },

  "working-now": {
    text: `I'm currently open to new opportunities and actively looking for roles where I can make a real impact.

Previously, I've worked on various projects spanning web applications, real-time systems, and developer tools. I thrive in environments that value clean code, thoughtful architecture, and a great user experience.

If you're building something exciting and need a developer who cares deeply about quality — let's talk! 🚀`,
  },

  "why-hire": {
    text: `Here's the honest pitch:

You should hire me if you want someone who treats your product like their own. I don't do "just enough" — I obsess over the details because that's where great software lives.

I bring strong technical skills (React, Next.js, TypeScript, Node.js, and more), but more importantly, I bring judgment. I know when to move fast and when to slow down and get it right. I know when to use a library and when to build from scratch.

And I'm genuinely fun to work with. Engineering is a team sport, and I believe great culture leads to great products.`,
  },

  education: {
    text: `My main education is from **École 42 Paris** — a revolutionary coding school founded by Xavier Niel. No teachers, no tuition, no traditional classes.

Instead, it's project-based, peer-to-peer learning. You learn by doing — building everything from a shell interpreter to a web server from scratch. The curriculum is designed to teach you how to learn, not just what to learn.

Before 42, I studied in Azerbaijan and was always drawn to STEM subjects. But 42 is where I truly became an engineer. The experience taught me resilience, collaboration, and how to solve problems I've never seen before — which is basically the job description of a developer. 😄`,
  },

  // ── Projects ──
  "proud-projects": {
    text: `A few projects I'm especially proud of:

🎨 **This Portfolio** — The one you're using right now! Built with Next.js, Framer Motion, and a lot of love. I wanted to create something that feels alive and personal, not just another static portfolio page.

🔧 **42 Projects** — At École 42, I built everything from low-level C programs (like my own printf and shell) to full-stack web applications. Each one pushed me to understand computing at a deeper level.

💡 **Various Client Projects** — I've built web applications for startups and businesses, focusing on clean architecture, performance, and great UX.

I'm always working on something new — feel free to check out my GitHub for the latest!`,
    images: [
      {
        src: "/images/projects/portfolio.png",
        alt: "Portfolio project screenshot",
      },
    ],
  },

  // ── Skills ──
  "your-skills": {
    text: `Here's my tech stack at a glance:

**Frontend:** React, Next.js, TypeScript, Tailwind CSS, Framer Motion, HTML/CSS
**Backend:** Node.js, Express, REST APIs, GraphQL
**Database:** PostgreSQL, MongoDB, Prisma
**DevOps:** Docker, Git, CI/CD, Vercel, Linux
**Languages:** JavaScript/TypeScript, C, C++, Python, Bash

Beyond the tools, I focus on fundamentals: clean architecture, performance optimization, accessibility, responsive design, and writing code that other developers actually enjoy reading.

I'm always adding to this list — right now I'm diving deeper into AI/ML integration and advanced animation techniques.`,
  },

  "ecole-42": {
    text: `École 42 was one of the most intense and rewarding experiences of my life.

Imagine a coding school with no teachers, no lectures, no tuition — just you, your peers, and increasingly complex projects. You have to figure everything out yourself (or with your peers), and the school is open 24/7.

The projects range from recreating standard C library functions to building a fully functional web application. I learned C, C++, networking, algorithms, and system programming from the ground up.

But the biggest thing 42 taught me wasn't any specific technology — it was how to learn. How to face a problem I have zero idea how to solve and methodically break it down until I do. That skill transfers to everything.

It's not for everyone, but it was perfect for me. 🎯`,
    images: [{ src: "/images/42.jpg", alt: "École 42 Paris campus" }],
  },

  // ── Fun ──
  "mountain-bike": {
    text: `Oh, you want to see the bike life? 🚵‍♂️

I'm a huge mountain biking enthusiast! There's nothing quite like hitting a trail early in the morning — the combination of nature, speed, and technical challenge is unmatched.

I mostly ride trails around the Île-de-France region, but I've also done some amazing rides in the mountains. It's my way of disconnecting from screens and reconnecting with the real world.

Plus, it turns out the problem-solving mindset from coding actually helps on the trail — you're constantly reading the terrain and making split-second decisions. Same energy, different medium! 😄`,
    images: [{ src: "/images/mtb.jpg", alt: "Mountain biking on a trail" }],
  },

  "craziest-thing": {
    text: `That's a dangerous question... 😅

Let me put it this way: moving from Azerbaijan to Paris to attend a coding school with no teachers, no guaranteed outcome, and where I knew almost nobody — that was pretty wild.

But honestly? The craziest thing might be building this AI-powered portfolio at 2 AM and thinking "yes, this is a perfectly normal thing to do." The line between passion and obsession gets blurry sometimes.

I tend to say yes to things that scare me a little. That's usually where the best stories come from. 🚀`,
  },

  "mac-or-pc": {
    text: `Mac. And I'll die on this hill. 🍎

The Unix-based terminal, the build quality, the ecosystem, the trackpad — it's the full package for development. I run my entire workflow on macOS: VS Code, iTerm2, Docker, and about 47 browser tabs.

That said, I have deep respect for the Linux gang. And I spent enough time in 42's Linux labs to be comfortable in any environment. But when it's my choice? Mac all day.

(Please don't @ me, Windows users. I'm sure WSL is great.) 😄`,
  },

  "contrarian-take": {
    text: `Here's one: **Most developers over-optimize too early and under-invest in UX.**

90% of engineers I meet will spend days shaving milliseconds off a database query but won't spend 30 minutes making a loading state feel good. Users don't notice your clever indexing strategy — they notice when your app feels snappy, responsive, and delightful.

Performance matters, but perception of performance matters more. A well-crafted skeleton loader can make a 2-second wait feel instant, while a janky instant-load makes fast feel slow.

Build for humans first, benchmarks second. 📊`,
  },

  // ── Contact & Future ──
  "reach-me": {
    text: `I'd love to hear from you! Here's how to reach me:

📧 **Email:** tamerlan@tamerlan.dev
💼 **LinkedIn:** linkedin.com/in/tamerlankangarli
🐙 **GitHub:** github.com/tamerlankangarli
🌐 **Website:** tamerlan.dev

I'm most responsive on email and LinkedIn. Don't be a stranger — whether it's a job opportunity, a collaboration idea, or just to say hi, my inbox is always open! 📬`,
  },

  "dream-project": {
    text: `I'd say "yes" immediately to a project that:

🎯 **Solves a real problem** — Not another todo app. Something that genuinely makes people's lives better or easier.

🛠️ **Demands technical excellence** — Complex frontend interactions, real-time data, beautiful animations, performance challenges. Give me the hard problems.

🤝 **Has a great team** — Smart, kind people who care about what they're building. Culture isn't a buzzword for me — it's the difference between a job and a mission.

🚀 **Ships to real users** — I want to build things people actually use, not prototypes that live in a repo forever.

Bonus points if it involves any of: developer tools, creative tech, education, or anything that makes the web a more interesting place. 💡`,
  },

  location: {
    text: `I'm currently based in **Paris, France** 🇫🇷 — originally from **Baku, Azerbaijan** 🇦🇿.

Paris is an amazing city for tech — great startup ecosystem, incredible food (fuel for coding sessions), and a growing developer community. Plus, being in the CET timezone makes collaboration with both US and Asian teams feasible.

I'm open to remote work, hybrid setups, or on-site positions in Paris. For the right opportunity, I'm also open to relocating.

Wherever the best problems are — that's where I want to be! 🌍`,
  },

  // ── Fallback ──
  default: {
    text: `That's a great question! I'm Tamerlan — a full-stack developer passionate about building polished web experiences.

Feel free to explore the suggested questions, or ask me anything about my skills, projects, or experience. I'm here to chat! 🚀`,
  },
};

// ─── Quick suggestions (shown on landing & in chat) ─────────────────────────

export interface QuickSuggestion {
  responseKey: string;
  query: string;
}

export const QUICK_SUGGESTION_MAP: Record<string, QuickSuggestion> = {
  Skills: { responseKey: "your-skills", query: "What are your skills?" },
  Experience: {
    responseKey: "ecole-42",
    query: "How was your experience at École 42?",
  },
  Projects: {
    responseKey: "proud-projects",
    query: "What projects are you most proud of?",
  },
  Education: {
    responseKey: "education",
    query: "What's your educational background?",
  },
  Contact: { responseKey: "reach-me", query: "How can I reach you?" },
};

// ─── Drawer categories ──────────────────────────────────────────────────────

export const QUESTION_CATEGORIES: QuestionCategory[] = [
  {
    id: "me",
    label: "Me",
    emoji: "👤",
    questions: [
      { key: "who-are-you", label: "Who are you?" },
      { key: "your-passions", label: "What are your passions?" },
      { key: "started-in-tech", label: "How did you get started in tech?" },
      {
        key: "five-year-vision",
        label: "Where do you see yourself in 5 years?",
      },
    ],
  },
  {
    id: "professional",
    label: "Professional",
    emoji: "💼",
    questions: [
      { key: "see-resume", label: "Can I see your resume?" },
      {
        key: "valuable-team-member",
        label: "What makes you a valuable team member?",
      },
      { key: "working-now", label: "Where are you working now?" },
      { key: "why-hire", label: "Why should I hire you?" },
      { key: "education", label: "What's your educational background?" },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    emoji: "🚀",
    questions: [
      { key: "proud-projects", label: "What projects are you most proud of?" },
    ],
  },
  {
    id: "skills",
    label: "Skills",
    emoji: "🛠️",
    questions: [
      { key: "your-skills", label: "What are your skills?" },
      { key: "ecole-42", label: "How was your experience at École 42?" },
    ],
  },
  {
    id: "fun",
    label: "Fun",
    emoji: "🎉",
    questions: [
      { key: "mountain-bike", label: "Mountain Bike you said?? Show me!" },
      {
        key: "craziest-thing",
        label: "What's the craziest thing you've ever done?",
      },
      { key: "mac-or-pc", label: "Mac or PC?" },
      {
        key: "contrarian-take",
        label: "What are you certain about that 90% get wrong?",
      },
    ],
  },
  {
    id: "contact",
    label: "Contact & Future",
    emoji: "📬",
    questions: [
      { key: "reach-me", label: "How can I reach you?" },
      {
        key: "dream-project",
        label: "What kind of project would make you say 'yes' immediately?",
      },
      { key: "location", label: "Where are you located?" },
    ],
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Resolve a full response config from either a known key or a free-text query. */
export function getResponse(queryOrKey: string): ChatResponseConfig {
  // Direct key match
  if (CHAT_RESPONSES[queryOrKey]) return CHAT_RESPONSES[queryOrKey];

  // Check if it matches a quick suggestion query
  for (const suggestion of Object.values(QUICK_SUGGESTION_MAP)) {
    if (suggestion.query === queryOrKey) {
      return CHAT_RESPONSES[suggestion.responseKey] ?? CHAT_RESPONSES.default;
    }
  }

  // Check drawer questions
  for (const category of QUESTION_CATEGORIES) {
    for (const q of category.questions) {
      if (q.label === queryOrKey) {
        return CHAT_RESPONSES[q.key] ?? CHAT_RESPONSES.default;
      }
    }
  }

  return CHAT_RESPONSES.default;
}

/** Get a subset of questions for the inline chat suggestions. */
export function getInlineSuggestions(): { label: string; query: string }[] {
  return QUESTION_CATEGORIES.flatMap((cat) =>
    cat.questions.slice(0, 2).map((q) => ({
      label: q.label,
      query: q.label,
    }))
  ).slice(0, 6);
}
