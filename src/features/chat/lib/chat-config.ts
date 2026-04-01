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
    text: `Hey! I'm Tamerlan Kangarli — a Fullstack JavaScript Developer from Azerbaijan 🇦🇿.

I have over 3 years of experience building scalable and user-friendly web applications, specializing in React, Next.js, TypeScript, and modern frontend architecture. I also work with Node.js and NestJS to build secure and performant backend services.

I’ve worked with companies like Andersen Lab and Millisoft, where I built complex systems including warehouse management platforms, medical applications, and HR/accounting tools.

I focus on clean code, performance, and building products that actually deliver value — not just features.

This portfolio reflects how I approach development: interactive, thoughtful, and a bit different.`,
    images: [{ src: "/images/me.jpg", alt: "Tamerlan Kangarli" }],
  },

  "your-passions": {
    text: `I genuinely enjoy building things — especially when they solve real problems.

I like working on complex systems where architecture, performance, and UX all matter. There's something really satisfying about turning messy requirements into clean, scalable solutions.

Outside of tech, I enjoy exploring new places, learning new things, and pushing myself into unfamiliar territory — that’s where the growth happens.

And honestly, I just like getting better at what I do every day.`,
  },

  "started-in-tech": {
    text: `I started with curiosity — wanting to understand how things work behind the screen.

That turned into building small projects, then more complex applications, and eventually working on real production systems with teams.

My academic background in Information Assurance and Cybersecurity gave me strong fundamentals, but most of my growth came from hands-on experience — building, breaking, fixing, and improving real systems.`,
  },

  "five-year-vision": {
    text: `In five years, I see myself as a senior or lead engineer working on high-impact products.

I want to be deeply involved not just in coding, but in architectural decisions, performance strategy, and product direction.

I also want to mentor other developers, contribute to strong engineering culture, and build systems that are both scalable and enjoyable to use.`,
  },

  // ── Professional ──
  "see-resume": {
    text: `You can download my resume here:

📄 [Download Resume (PDF)](/resume.pdf)

But honestly, this chat gives a more complete picture of how I think and work. Feel free to ask me anything!`,
  },

  "valuable-team-member": {
    text: `Three things make me a strong team member:

**1. Experience with complex systems**  
I’ve worked on large-scale applications like warehouse management and HR systems with complex data flows and real-world constraints.

**2. Fullstack capability**  
Strong frontend expertise with React + solid backend experience with Node.js and NestJS — I understand how the whole system fits together.

**3. Real impact**  
• Improved performance by 30–35%  
• Increased test coverage from 40% to 85%  
• Mentored junior developers and led code reviews  

I don’t just write code — I improve systems and contribute to the team.`,
  },

  "working-now": {
    text: `I'm currently open to new opportunities as a Fullstack or Frontend Developer.

Most recently at Andersen Lab, I:
• Built scalable UI for a warehouse management system using React + Redux  
• Developed backend services with NestJS for a medical app  
• Increased test coverage from 40% to 85%  
• Mentored junior developers  

Before that, at Millisoft, I worked on a large HR & accounting system with 30+ modules.

I'm looking for a team that values clean architecture, performance, and real product impact.`,
  },

  "why-hire": {
    text: `Here’s the honest answer:

You should hire me if you want someone who:
• Writes clean, maintainable, production-ready code  
• Understands both frontend and backend systems  
• Cares about performance and user experience  
• Takes ownership and delivers results  

I’ve already worked on real-world systems with measurable impact — improving performance, scalability, and reliability.

And I’m easy to work with. That matters more than people think.`,
  },

  education: {
    text: `I have a strong academic background in technology:

🎓 Master’s in Cybersecurity  
Azerbaijan State University of Economics  

🎓 Bachelor’s in Information Assurance  
Azerbaijan State Oil and Industry University  

This gave me a solid foundation in systems, security, and problem-solving — which I apply in real-world development.`,
  },

  // ── Projects ──
  "proud-projects": {
    text: `Here are some projects I’m proud of:

🏭 **Warehouse Management System (Andersen Lab)**  
Built scalable frontend architecture with React + Redux for complex logistics workflows.

🏥 **Medical Care Application**  
Developed secure backend services using NestJS.

📊 **HR & Accounting System (Millisoft)**  
Worked on 30+ modules with complex forms, filtering, and reusable components.

🎨 **This Portfolio**  
A more creative project — built to showcase both personality and engineering approach.

I enjoy both: complex enterprise systems and polished UI experiences.`,
    images: [
      {
        src: "/images/projects/portfolio.png",
        alt: "Portfolio project screenshot",
      },
    ],
  },

  // ── Skills ──
  "your-skills": {
    text: `Here's my stack:

**Frontend:**  
React, Next.js, TypeScript, JavaScript (ES6+)  
HTML5, CSS3, Tailwind, SCSS, Material UI, Ant Design  

**State & Data:**  
Redux Toolkit, Context API, Zustand, React Query  

**Backend:**  
Node.js, Express, NestJS  

**Databases:**  
MongoDB, PostgreSQL  

**Testing:**  
Jest, React Testing Library  

**Performance:**  
Code splitting, lazy loading, memoization  

**Tools:**  
Git, Docker (basic), Vite, Webpack, ESLint, Prettier  

I focus on clean architecture, scalability, and maintainability.`,
  },

  // ── Fun ──
  "mountain-bike": {
    text: `I like activities that require focus and control — same as coding, just in a different form.

It’s a good way to reset, clear your head, and come back sharper.`,
  },

  "craziest-thing": {
    text: `Probably pushing myself into real production environments early in my career.

Working on complex systems, taking ownership, mentoring others — all while still growing fast myself.

I tend to say yes to challenges and figure things out along the way.`,
  },

  "mac-or-pc": {
    text: `Mac — mainly for the Unix environment and development workflow.

But honestly, I’m comfortable anywhere: Linux, Mac, doesn’t matter. Tools are tools.`,
  },

  "contrarian-take": {
    text: `Most developers focus too much on implementation and not enough on user experience.

You can have perfect code, but if the product feels slow or confusing — it fails.

Performance and UX should always go together.`,
  },

  // ── Contact & Future ──
  "reach-me": {
    text: `You can reach me here:

📧 Email: tamerlankengerli2002@gmail.com  
🐙 GitHub: https://github.com/TamerlanK  
💬 Telegram: @tamerlankangarli  

I’m open to opportunities, collaborations, or just a quick chat.`,
  },

  "dream-project": {
    text: `A project where:

• The problem is real and impactful  
• The system is complex enough to require good architecture  
• The team cares about quality  
• The product is actually used by people  

Bonus if it involves performance challenges or complex frontend interactions.`,
  },

  location: {
    text: `I'm currently based in Azerbaijan 🇦🇿 and open to remote opportunities.

I’m flexible with remote, hybrid, or relocation depending on the role.`,
  },

  // ── Fallback ──
  default: {
    text: `Good question — I’m Tamerlan, a Fullstack JavaScript Developer.

Feel free to ask about my experience, skills, or projects — I’ll give you a real answer, not a generic one.`,
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
