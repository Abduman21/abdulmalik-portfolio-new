import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import abduHeroDark from "@/assets/abdu-hero-dark.png";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";

const techStack = [
  "TypeScript",
  "React / Next.js",
  "Node.js / Python",
  "Tailwind CSS",
];

const stats = [
  { value: "3+", label: "Years experience" },
  { value: "15+", label: "Projects shipped" },
  { value: "Full-stack", label: "Product-minded" },
];

export default function Hero() {
  const { profile } = usePortfolioContent();

  const firstName = profile.name.split(" ")[0] ?? profile.name;
  const lastName = profile.name.split(" ").slice(1).join(" ") || "Muze";

  return (
    <section
      id="hero"
      className="relative flex min-h-[90svh] items-center overflow-hidden px-5 py-24 sm:px-7 lg:px-12"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 grid-bg z-[1] opacity-20" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 container-custom w-full flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-12 lg:gap-16 max-w-4xl w-full"
        >
          {/* ── LEFT: Portrait ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
            className="flex-shrink-0 w-[200px] sm:w-[240px] md:w-[260px] lg:w-[300px]"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
              {/* Photo card */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/50">
                <img
                  src={abduHeroDark}
                  alt={`${profile.name} – ${profile.role}`}
                  className="h-full w-full object-cover object-top grayscale contrast-105"
                  loading="eager"
                />
                {/* Inner ring overlay */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06] rounded-3xl" />
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Content ── */}
          <div className="flex-1 text-center">

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              {firstName}{" "}
              <span className="whitespace-nowrap">{lastName}</span>
            </motion.h1>

            {/* Role — lime accent, clearly visible */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-2 font-mono text-base font-semibold tracking-widest text-primary sm:text-lg"
            >
              {profile.role}
            </motion.p>

            {/* Tech stack — dot-separated */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="mt-2 text-sm text-muted-foreground sm:text-base"
            >
              {techStack.map((tech, i) => (
                <span key={tech}>
                  {tech}
                  {i < techStack.length - 1 && (
                    <span className="mx-2 text-primary/40">·</span>
                  )}
                </span>
              ))}
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base md:max-w-lg lg:max-w-xl"
            >
              {profile.summary}
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58 }}
              className="mt-7 flex flex-wrap justify-center gap-8"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                    {stat.value}
                  </span>
                  <span className="mt-0.5 text-xs text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.66 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-primary/40"
              >
                {profile.secondaryCta}
                <ArrowRight size={16} />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 text-sm font-semibold text-foreground backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white/[0.08]"
              >
                About Me
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
