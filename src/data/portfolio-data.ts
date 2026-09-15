import { Project, SkillCategory, Experience, Service, Testimonial, PortfolioContent, BlogPost } from "@/types/portfolio";
import employeeManagementImage from "@/assets/projects/employee-management-system.webp";
import ethiopianJobSearchImage from "@/assets/projects/ethiopian-job-search.webp";
import mintRmsImage from "@/assets/projects/mint-rms.webp";
import moviePortalImage from "@/assets/projects/movie-portal.webp";
import onlineLearningImage from "@/assets/projects/online-learning-platform.webp";
import pizzaMenuImage from "@/assets/projects/pizza-menu.webp";
import skillProgressTrackerImage from "@/assets/projects/skill-progress-tracker.webp";
import unifyOmsImage from "@/assets/projects/unify-oms.webp";
import wecarePharmaceuticalsImage from "@/assets/projects/wecare-pharmaceuticals.webp";

export const profile = {
  name: "Abdulmalik Muze",
  headline: "builds fast digital products.",
  role: "Full-Stack Developer",
  summary:
    "I design and ship practical software: responsive websites, full-stack systems, AI-assisted workflows, and automation tools that help teams move faster.",
  primaryCta: "Hire Me",
  secondaryCta: "View Projects",
  resumeUrl: "https://drive.google.com/file/d/1OIGsfbxcg6wtFYJaJajP19ll6MEZ0ffj/view?usp=drivesdk",
};

export const socialLinks = [
  { id: 1, label: "GitHub", platform: "github", url: "https://github.com/Abduman21" },
  { id: 2, label: "LinkedIn", platform: "linkedin", url: "https://www.linkedin.com/in/abdulmalik-muze-819951319" },
  { id: 3, label: "Upwork", platform: "upwork", url: "https://www.upwork.com/freelancers/~0180d2e62cd90bd3cc" },
  { id: 4, label: "Telegram", platform: "telegram", url: "https://t.me/malik21muze" },
  { id: 5, label: "Instagram", platform: "instagram", url: "https://www.instagram.com/abdu_tech21?igsh=MThqdWc3a2lnZ3lm" },
  { id: 6, label: "WhatsApp", platform: "whatsapp", url: "https://wa.me/251969836321" },
  { id: 7, label: "X", platform: "x", url: "https://x.com/abduTech21" },
  { id: 8, label: "Substack", platform: "substack", url: "https://substack.com/@abdulmalikmuze?utm_source=share&utm_medium=android&r=7pkruy" },
  { id: 9, label: "TikTok", platform: "tiktok", url: "https://www.tiktok.com/@abdu_tech21?_r=1&_t=ZS-990onYRfnFv" },
  { id: 10, label: "YouTube", platform: "youtube", url: "https://youtube.com/@abdulmalik_muze?si=l_U71erh0HdBuch-" },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "MiNT Record Management System",
    description: "A record management dashboard for organizing documents, categories, users, storage usage, and secure access across desktop, tablet, and mobile views.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Dashboard UI"],
    category: "Records",
    status: "Repository",
    timeline: "Full app UI",
    impact: "Organize, secure, search, and access records from one workspace",
    challenge: "Record-heavy teams need a cleaner way to create, categorize, protect, and retrieve documents without scattered folder structures.",
    solution: "Designed a responsive RMS interface with dashboard metrics, recent records, category views, role-aware access cues, and mobile-first record browsing.",
    result: "The project presents a clear workflow for document creation, organization, secure storage, search, and anywhere access.",
    githubUrl: "https://github.com/Abduman21/MiNT-RMS.git",
    image: mintRmsImage,
  },
  {
    id: 2,
    title: "Skill Progress Tracker",
    description: "A learning analytics app for tracking skill growth, habits, achievements, goals, streaks, milestones, and recommended next skills.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Progress UI"],
    category: "Learning",
    status: "Repository",
    timeline: "Responsive app concept",
    impact: "Turns learning progress into visible goals, streaks, and milestones",
    challenge: "Learners often lose motivation because progress across skills, habits, and goals is hard to see in one place.",
    solution: "Built a dashboard-style tracker with overall progress, per-skill bars, learning streaks, achievements, milestones, and goal cards.",
    result: "Users can understand their growth path quickly and stay focused on consistent improvement.",
    githubUrl: "https://github.com/Abduman21/Skill-Progress-Tracker.git",
    image: skillProgressTrackerImage,
  },
  {
    id: 3,
    title: "Employee Management System",
    description: "A smart HR dashboard for employee profiles, attendance, payroll, performance, leave requests, departments, and task assignments.",
    tech: ["React", "TypeScript", "Tailwind CSS", "HR Dashboard"],
    category: "HR System",
    status: "Repository",
    timeline: "Multi-device dashboard",
    impact: "Centralizes team, attendance, payroll, and performance workflows",
    challenge: "HR teams need one reliable place to manage employees, attendance, leave, payroll, performance, and department activity.",
    solution: "Created a responsive EMS dashboard with employee metrics, attendance overview, leave request cards, payroll summary, task tracking, and mobile screens.",
    result: "The interface communicates a complete HR operations experience that works across laptop and phone contexts.",
    githubUrl: "https://github.com/Abduman21/Employee-Management-System.git",
    image: employeeManagementImage,
  },
  {
    id: 4,
    title: "Ethiopian Job Search",
    description: "A localized job discovery landing page for Ethiopian opportunities with search, categories, featured jobs, company trust signals, and bilingual cues.",
    tech: ["React", "Tailwind CSS", "Responsive Design", "Job Search UX"],
    category: "Job Platform",
    status: "Repository",
    timeline: "Landing + listings",
    impact: "Makes Ethiopian job discovery feel focused, modern, and local",
    challenge: "Job seekers need a quick way to search by role, keyword, company, and location while trusting the platform.",
    solution: "Designed a job portal homepage with prominent search, popular terms, category browsing, featured listings, and Ethiopian company signals.",
    result: "The page gives job seekers a clear starting point and communicates credibility for local hiring.",
    githubUrl: "https://github.com/Abduman21/Ethiopian-Job-Search.git",
    image: ethiopianJobSearchImage,
  },
  {
    id: 5,
    title: "Online Learning Platform",
    description: "An e-learning dashboard concept with courses, live classes, quizzes, certificates, progress analytics, video learning, and community support.",
    tech: ["React", "TypeScript", "Tailwind CSS", "EdTech UI"],
    category: "EdTech",
    status: "Repository",
    timeline: "Learning dashboard",
    impact: "Combines lessons, live learning, progress, and certificates in one experience",
    challenge: "Online learners need a central place for classes, quizzes, certificates, progress tracking, and support.",
    solution: "Built a polished learning interface with course cards, live video, chat, quiz flow, progress widgets, and certificate highlights.",
    result: "The project presents a full learning journey from enrollment and study to assessment and achievement.",
    githubUrl: "https://github.com/Abduman21/Online-Learning-platfrom.git",
    image: onlineLearningImage,
  },
  {
    id: 6,
    title: "Unify OMS",
    description: "An operation management system dashboard for projects, tasks, reports, reminders, recent activity, team members, and progress analytics.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Operations UI"],
    category: "Operations",
    status: "Repository",
    timeline: "Admin dashboard",
    impact: "Brings project progress, tasks, reports, and team activity into one admin view",
    challenge: "Operations teams need to monitor projects, task completion, reminders, reports, and team status without jumping between tools.",
    solution: "Built a clean OMS dashboard with project charts, task status, reminders, activity feed, employee metrics, and report counters.",
    result: "Managers can scan operational health, track deadlines, and understand team activity from a single screen.",
    githubUrl: "https://github.com/Abduman21/Unify-OMS.git",
    image: unifyOmsImage,
  },
  {
    id: 7,
    title: "WeCare Pharmaceuticals",
    description: "A pharmacy storefront experience with medicine search, categories, prescription upload, best sellers, health offers, cart actions, and trust badges.",
    tech: ["React", "Tailwind CSS", "E-commerce UI", "Healthcare UX"],
    category: "Health Commerce",
    status: "Repository",
    timeline: "Storefront dashboard",
    impact: "Creates a trusted pharmacy shopping flow with support and delivery cues",
    challenge: "Healthcare shoppers need fast search, clear medicine categories, prescription support, and trust signals before purchasing.",
    solution: "Designed a pharmacy portal with category navigation, featured products, best sellers, prescription upload, cart actions, and support panels.",
    result: "The interface feels trustworthy, organized, and ready for pharmacy e-commerce workflows.",
    githubUrl: "https://github.com/Abduman21/weCareParmaticles.git",
    image: wecarePharmaceuticalsImage,
  },
  {
    id: 8,
    title: "Pizza Menu",
    description: "A visual restaurant menu for pizza items, sizes, prices, lunch/family/party deals, sides, drinks, delivery prompts, and brand presentation.",
    tech: ["HTML", "CSS", "Responsive Design", "Restaurant UI"],
    category: "Food Menu",
    status: "Repository",
    timeline: "Menu concept",
    impact: "Presents food, prices, deals, and ordering information in one visual menu",
    challenge: "Restaurant menus need to be appetizing, readable, and clear about sizes, prices, deals, and ordering options.",
    solution: "Created a detailed pizza menu layout with item photography, size pricing, deal panels, side/drink sections, and delivery messaging.",
    result: "Customers can compare options quickly while the brand still feels warm, visual, and polished.",
    githubUrl: "https://github.com/Abduman21/pizza-menu.git",
    image: pizzaMenuImage,
  },
  {
    id: 9,
    title: "Movie Portal",
    description: "A streaming-style movie discovery interface with sidebar navigation, hero feature, continue-watching cards, genres, trending titles, and premium prompts.",
    tech: ["React", "Tailwind CSS", "Media UI", "Responsive Layout"],
    category: "Media App",
    status: "Repository",
    timeline: "Streaming dashboard",
    impact: "Turns movie browsing into a polished entertainment dashboard",
    challenge: "A movie portal needs strong visual hierarchy for featured titles, categories, watch progress, and discovery sections.",
    solution: "Built a dark streaming UI with hero promotion, trending rows, continue-watching progress, genre cards, and account/sidebar navigation.",
    result: "The project demonstrates rich entertainment UI composition with strong imagery and clear browsing flows.",
    githubUrl: "https://github.com/Abduman21/movie-portal.git",
    image: moviePortalImage,
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", level: 80, icon: "UI" },
      { name: "TypeScript", level: 90, icon: "TS" },
      { name: "Tailwind CSS", level: 92, icon: "CSS" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 90, icon: "JS" },
      { name: "Python / FastAPI", level: 75, icon: "PY" },
      { name: "ExpressJS", level: 70, icon: "API" },
      { name: "REST APIs", level: 78, icon: "REST" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", level: 80, icon: "MDB" },
      { name: "Supabase", level: 79, icon: "SB" },
      { name: "Firebase", level: 90, icon: "FB" },
    ],
  },
  {
    title: "DevOps & Cloud",
    skills: [
      { name: "Docker", level: 75, icon: "DOC" },
      { name: "CI/CD (GitHub Actions)", level: 72, icon: "CI" },
      { name: "AWS / Firebase", level: 85, icon: "AWS" },
      { name: "Linux Server Basics", level: 78, icon: "LNX" },
      { name: "Nginx", level: 70, icon: "NGX" },
      { name: "Deployment", level: 80, icon: "OPS" },
    ],
  },
  {
    title: "AI / Automation",
    skills: [
      { name: "OpenAI / LLMs", level: 93, icon: "AI" },
      { name: "TensorFlow", level: 75, icon: "ML" },
      { name: "Web Scraping", level: 77, icon: "BOT" },
      { name: "Task Automation", level: 92, icon: "AUTO" },
    ],
  },
  {
    title: "MERN Stack",
    skills: [
      { name: "MongoDB", level: 80, icon: "MDB" },
      { name: "ExpressJS", level: 70, icon: "EXP" },
      { name: "React", level: 80, icon: "R" },
      { name: "Node.js", level: 90, icon: "N" },
    ],
  },
  {
    title: "CMS & Websites",
    skills: [
      { name: "WordPress", level: 85, icon: "WP" },
      { name: "Responsive Design", level: 90, icon: "RWD" },
      { name: "SEO Basics", level: 75, icon: "SEO" },
    ],
  },
  {
    title: "Tools & Workflow",
    skills: [
      { name: "Git / GitHub", level: 86, icon: "GIT" },
      { name: "Postman", level: 82, icon: "API" },
      { name: "Figma Handoff", level: 78, icon: "FIG" },
    ],
  },
  {
    title: "Production Practices",
    skills: [
      { name: "Authentication", level: 78, icon: "AUTH" },
      { name: "Error Handling", level: 82, icon: "ERR" },
      { name: "API Security", level: 76, icon: "SEC" },
    ],
  },
];

export const experiences: Experience[] = [
  { title: "MERN-Stack Development & Network Configuration", company: "Unify Technology", period: "Sep 2025 — Present", description: "Onsite full-stack development using MongoDB, Express, React, and Node.js with network configuration.", type: "work" },
  { title: "AI Software Development Bootcamp", company: "Cepheus Tech", period: "July 2025", description: "Certification in AI software development, Ethiopia.", type: "certification" },
  { title: "Bachelor of Science in Business Management", company: "Haramaya University, Ethiopia", period: "2023 — 2026", description: "Pursuing undergraduate degree in business management.", type: "education" },
  { title: "Bachelor of Science in Information Systems", company: "Haramaya University, Ethiopia", period: "2022 — 2025", description: "GPA: 3.29/4.0. Graduated with degree in information systems.", type: "education" },
  { title: "Software Development Internship", company: "Ministry of Innovation and Technologies", period: "2024", description: "Onsite internship focused on software development, Ethiopia.", type: "internship" },
  { title: "Preparatory School", company: "Addis Ketema Preparatory School, Ethiopia", period: "2020 — 2022", description: "Grade 11 and 12. Score: 488/700.", type: "education" },
  { title: "Secondary School", company: "Grade 9 and 10", period: "2018 — 2020", description: "GPA: 3.25/4.0.", type: "education" },
];

export const services: Service[] = [
  { title: "Web Development", description: "Responsive web apps with fast rendering, accessible interfaces, and tidy component systems.", icon: "web" },
  { title: "Full-Stack Systems", description: "End-to-end application architecture from database design to secure deployment workflows.", icon: "stack" },
  { title: "AI Solutions", description: "Custom AI assistants, retrieval workflows, automation layers, and model-serving integrations.", icon: "ai" },
  { title: "Automation Tools", description: "Workflow automation, scraping, background jobs, and process optimization for busy teams.", icon: "automation" },
  { title: "UI Engineering", description: "Polished product interfaces with design systems, motion, responsive states, and clean handoff.", icon: "ui" },
  { title: "Mobile App Development", description: "Cross-platform app experiences with modern flows, APIs, and performance-minded interfaces.", icon: "mobile" },
];

export const testimonials: Testimonial[] = [
  { name: "Umer Sami", role: "Graphic Designer, Unify Technology", content: "Abdulmalik is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding.", rating: 5, avatar: "/src/assets/umer.png" },
  { name: "Salah Abdu", role: "Flutter Developer, Unify Technology", content: "Working with Abdulmalik was a pleasure. He brought fresh ideas to our project and his technical expertise helped us overcome several challenges.", rating: 5, avatar: "/src/assets/salah.png" },
  { name: "Salim Ebrahim", role: "UX/UI Designer, Unify Technology", content: "Abdulmalik has excellent communication skills and was able to perfectly implement our design requirements. The final product exceeded our expectations.", rating: 5, avatar: "/src/assets/salim.png" },
  { name: "Fethi", role: "General Manager, Unify Technology", content: "Exceptional developer who delivers production-ready code with incredible attention to detail. The AI integration transformed our product.", rating: 5, avatar: "" },
  { name: "Mehdi Feethi", role: "Technical Manager, Unify Technology", content: "Remarkable ability to translate complex requirements into elegant solutions. A true full-stack expert.", rating: 5, avatar: "" },
];

export const mediaResources = [
  {
    id: 1,
    title: "Introduction Video",
    source: "YouTube",
    description: "A short personal intro covering who I am, what I build, and how I approach software projects.",
    url: "https://youtu.be/h9UnTWtTZlk",
  },
  {
    id: 2,
    title: "Experience Videos",
    source: "YouTube",
    description: "Walkthroughs and stories from dashboards, portfolio builds, UI work, and full-stack learning.",
    url: "https://youtube.com/@abdulmalik_muze?si=l_U71erh0HdBuch-",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How I approach full-stack product builds",
    excerpt: "A practical look at planning the frontend, backend, database, and deployment flow before writing code.",
    source: "Substack",
    category: "Full Stack",
    date: "Coming soon",
    readTime: "4 min read",
    url: "#",
  },
  {
    id: 2,
    title: "Building useful AI automation without overcomplicating it",
    excerpt: "Notes on choosing where AI helps, where normal software is better, and how to keep workflows reliable.",
    source: "LinkedIn",
    category: "AI Automation",
    date: "Coming soon",
    readTime: "5 min read",
    url: "#",
  },
  {
    id: 3,
    title: "What makes a developer portfolio trustworthy",
    excerpt: "A breakdown of the proof, structure, and presentation that helps clients and hiring teams understand your work.",
    source: "Substack",
    category: "Career",
    date: "Coming soon",
    readTime: "3 min read",
    url: "#",
  },
  {
    id: 4,
    title: "Backend decisions that make frontend work easier",
    excerpt: "Notes on API shape, data contracts, validation, and the small backend choices that improve the whole product.",
    source: "LinkedIn",
    category: "Backend",
    date: "Coming soon",
    readTime: "4 min read",
    url: "#",
  },
  {
    id: 5,
    title: "Lessons from building client-ready websites",
    excerpt: "A simple checklist for turning a portfolio, landing page, or business site into something ready to share.",
    source: "Substack",
    category: "Web Development",
    date: "Coming soon",
    readTime: "4 min read",
    url: "#",
  },
  {
    id: 6,
    title: "From idea to deployed MVP",
    excerpt: "How I break down a product idea into screens, APIs, database structure, and a first working release.",
    source: "LinkedIn",
    category: "Product",
    date: "Coming soon",
    readTime: "5 min read",
    url: "#",
  },
];

export const portfolioContent: PortfolioContent = {
  profile,
  projects,
  skillCategories,
  experiences,
  services,
  testimonials,
  mediaResources,
  blogPosts,
  socialLinks,
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Videos", href: "#videos" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];
