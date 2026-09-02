export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: string;
  status: string;
  timeline: string;
  impact: string;
  challenge: string;
  solution: string;
  result: string;
  liveUrl?: string;
  githubUrl?: string;
  image: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  type: 'work' | 'freelance' | 'certification' | 'education' | 'internship';
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface ProfileInfo {
  name: string;
  headline: string;
  role: string;
  summary: string;
  primaryCta: string;
  secondaryCta: string;
  resumeUrl: string;
}

export interface SocialLink {
  id: number;
  label: string;
  platform: string;
  url: string;
}

export interface MediaResource {
  id: number;
  title: string;
  source: string;
  description: string;
  url: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  source: "Substack" | "LinkedIn" | "Website";
  category: string;
  date: string;
  readTime: string;
  url: string;
}

export interface PortfolioContent {
  profile: ProfileInfo;
  projects: Project[];
  skillCategories: SkillCategory[];
  experiences: Experience[];
  services: Service[];
  testimonials: Testimonial[];
  mediaResources: MediaResource[];
  blogPosts: BlogPost[];
  socialLinks: SocialLink[];
}
