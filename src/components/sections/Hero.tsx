import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  Instagram,
  Mail,
  MessageCircle,
  Music2,
  Newspaper,
  Youtube,
  Send,
  Sparkles,
  Twitter,
} from "lucide-react";
import abduHeroDark from "@/assets/abdu-hero-dark.png";
import upworkIcon from "@/assets/upwork-icon.png";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";

const titles = [
  "Full-Stack Engineer",
  "Backend Specialist",
  "AI Software Developer",
  "Automation Builder",
];

const getSocialIcon = (platform: string, size: number, upworkSrc: string) => {
  const key = platform.toLowerCase();
  if (key.includes("upwork")) return <img src={upworkSrc} alt="" className="h-5 w-5 object-contain" />;
  if (key.includes("telegram")) return <Send size={size} />;
  if (key.includes("instagram")) return <Instagram size={size} />;
  if (key.includes("whatsapp")) return <MessageCircle size={size} />;
  if (key === "x" || key.includes("twitter")) return <Twitter size={size} />;
  if (key.includes("substack") || key.includes("blog")) return <Newspaper size={size} />;
  if (key.includes("tiktok")) return <Music2 size={size} />;
  if (key.includes("youtube")) return <Youtube size={size} />;
  if (key.includes("github")) return <Github size={size} />;
  return <ArrowUpRight size={size} />;
};

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const { profile, socialLinks } = usePortfolioContent();

  useEffect(() => {
    const current = titles[titleIndex];
    const timeout = deleting ? 30 : 80;

    const timer = setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setCharIndex((c) => c + 1);
      } else if (!deleting && charIndex === current.length) {
        setTimeout(() => setDeleting(true), 1500);
      } else if (deleting && charIndex > 0) {
        setCharIndex((c) => c - 1);
      } else if (deleting && charIndex === 0) {
        setDeleting(false);
        setTitleIndex((i) => (i + 1) % titles.length);
      }
    }, timeout);
    return () => clearTimeout(timer);
  }, [charIndex, deleting, titleIndex]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[90svh] items-center overflow-hidden px-5 py-24 sm:px-7 lg:px-12"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute inset-0 grid-bg z-[1] opacity-25" />

      <div className="relative z-10 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,410px)] lg:gap-14 xl:gap-20"
        >
          <div className="order-2 max-w-3xl lg:order-1">
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles size={14} className="text-primary" />
              {profile.role} available for hire
            </div>

            <h1 className="font-heading text-5xl font-black leading-[0.94] tracking-normal text-foreground sm:text-6xl lg:text-7xl">
              {profile.name.split(" ")[0] ?? profile.name}
              <span className="sr-only"> </span>
              <span className="block">{profile.name.split(" ").slice(1).join(" ") || "Muze"}.</span>
            </h1>

            <p className="mt-5 max-w-2xl font-heading text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
              {profile.headline}
            </p>

            <div className="mt-6 inline-flex h-10 items-center rounded-lg border border-primary/20 bg-primary/5 px-3">
              <span className="mr-2 font-mono text-sm text-primary">&gt;</span>
              <span className="font-mono text-sm text-primary sm:text-base">
                {titles[titleIndex].slice(0, charIndex)}
              </span>
              <span className="ml-1 inline-block h-6 w-0.5 animate-typing-cursor bg-primary" />
            </div>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              {profile.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
              >
                {profile.primaryCta} <ArrowUpRight size={16} />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/5 px-5 py-3 font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                {profile.secondaryCta}
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-3 font-semibold text-foreground transition-all duration-300 hover:border-primary/35 hover:text-primary"
              >
                <Download size={16} /> Resume
              </a>
              <a
                href="https://github.com/Abduman21"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-3 font-semibold text-foreground transition-all duration-300 hover:border-primary/35 hover:text-primary"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-3 font-semibold text-foreground transition-all duration-300 hover:border-primary/35 hover:text-primary"
              >
                <Mail size={16} /> Contact
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-white/[0.07] pt-5 text-sm text-muted-foreground">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-primary"
                >
                  {getSocialIcon(link.platform, 18, upworkIcon)}
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="order-1 relative mx-auto w-full max-w-[280px] sm:max-w-[340px] lg:order-2 lg:mx-0 lg:max-w-none"
          >
            <div className="absolute -inset-3 rounded-[28px] border border-primary/15 bg-primary/[0.045]" />
            <div className="absolute -bottom-4 -right-3 h-32 w-32 rounded-2xl border border-white/[0.08] bg-card/70" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.08] bg-card shadow-[var(--shadow-card)]">
              <img
                src={abduHeroDark}
                alt="Abdulmalik Muze holding a laptop"
                className="h-full w-full object-cover object-[50%_58%]"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.04]" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] text-xs text-muted-foreground">
              <div className="bg-card px-4 py-3">Backend</div>
              <div className="bg-card px-4 py-3">Frontend</div>
              <div className="bg-card px-4 py-3">AI</div>
              <div className="bg-card px-4 py-3">Automation</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 sm:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={20} className="text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}
