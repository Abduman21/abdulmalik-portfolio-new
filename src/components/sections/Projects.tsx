import { useState } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";
import {
  ArrowUpRight,
  Bot,
  Boxes,
  CalendarDays,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  Film,
  Gauge,
  Github,
  GraduationCap,
  HeartPulse,
  Layers3,
  Pizza,
  Search,
  Users,
  Workflow,
  X,
} from "lucide-react";
import type { Project } from "@/types/portfolio";

const projectIcons: Record<string, ReactNode> = {
  "AI Product": <Bot size={26} />,
  "Full Stack": <Layers3 size={26} />,
  DevOps: <Cloud size={26} />,
  Automation: <Workflow size={26} />,
  Frontend: <Code2 size={26} />,
  Records: <Database size={26} />,
  Learning: <GraduationCap size={26} />,
  "HR System": <Users size={26} />,
  "Job Platform": <Search size={26} />,
  EdTech: <GraduationCap size={26} />,
  Operations: <Workflow size={26} />,
  "Health Commerce": <HeartPulse size={26} />,
  "Food Menu": <Pizza size={26} />,
  "Media App": <Film size={26} />,
};

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const { projects } = usePortfolioContent();

  return (
    <section id="projects" className="section-padding relative border-t border-white/[0.06] bg-card/45">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase">Portfolio</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            A focused set of app patterns I build across product interfaces, backend systems,
            automation, and AI-enabled workflows.
          </p>
        </motion.div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelected(project)}
                className="glass-card-hover group flex min-h-[420px] cursor-pointer flex-col p-4"
              >
                <div className="mb-5 overflow-hidden rounded-lg border border-white/[0.07] bg-background/45">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} interface preview`}
                      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center text-primary">
                      {projectIcons[project.category] ?? <Boxes size={34} />}
                    </div>
                  )}
                </div>

                <div className="mb-4 flex items-center justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-background/40 text-primary">
                    {projectIcons[project.category] ?? <Boxes size={26} />}
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-xs font-medium text-muted-foreground">
                    {project.category}
                  </div>
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="font-heading font-semibold text-lg mb-2 transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mb-5 grid gap-px overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.07] text-xs">
                    <div className="flex items-center gap-2 bg-background/35 px-3 py-2 text-muted-foreground">
                      <Gauge size={14} className="text-primary" />
                      <span>{project.impact}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-px bg-white/[0.07]">
                      <div className="flex items-center gap-2 bg-background/35 px-3 py-2 text-muted-foreground">
                        <CalendarDays size={14} className="text-primary" />
                        <span>{project.timeline}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-background/35 px-3 py-2 text-muted-foreground">
                        <CheckCircle2 size={14} className="text-primary" />
                        <span>{project.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="rounded border border-primary/15 bg-primary/5 px-2 py-0.5 text-xs text-primary">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    View case notes
                    <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card relative max-h-[90vh] w-full max-w-3xl overflow-y-auto p-6 sm:p-7"
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Close project details"
                >
                  <X size={20} />
                </button>

                <div className="mb-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
                  <div>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
                      {selected.category}
                    </div>
                    <h3 className="pr-10 font-heading text-2xl font-bold sm:text-3xl">
                      {selected.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                      {selected.description}
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-secondary/60">
                    {selected.image ? (
                      <img
                        src={selected.image}
                        alt={`${selected.title} interface preview`}
                        className="h-full min-h-48 w-full object-cover object-top"
                      />
                    ) : (
                      <div className="flex min-h-48 items-center justify-center text-primary">
                        {projectIcons[selected.category] ?? <Boxes size={34} />}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-6 grid gap-px overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3">
                  {[
                    ["Impact", selected.impact],
                    ["Timeline", selected.timeline],
                    ["Status", selected.status],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-background/35 p-4">
                      <div className="mb-1 font-mono text-[11px] uppercase tracking-widest text-primary">
                        {label}
                      </div>
                      <div className="text-sm font-medium text-foreground">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="mb-6 grid gap-4 md:grid-cols-3">
                  {[
                    ["Challenge", selected.challenge],
                    ["Solution", selected.solution],
                    ["Result", selected.result],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-lg border border-white/[0.07] bg-white/[0.025] p-4">
                      <h4 className="mb-2 font-heading text-sm font-semibold text-foreground">
                        {label}
                      </h4>
                      <p className="text-sm leading-6 text-muted-foreground">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                  {selected.tech.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {selected.liveUrl && (
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  {selected.githubUrl && (
                    <a
                      href={selected.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold transition hover:border-primary/30"
                    >
                      <Github size={14} /> Source Code
                    </a>
                  )}
                  <a
                    href="#contact"
                    onClick={() => setSelected(null)}
                    className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                  >
                    Discuss a similar build <ArrowUpRight size={14} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
