import { motion } from "framer-motion";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";
import {
  Atom,
  Bot,
  Boxes,
  BrainCircuit,
  Cloud,
  Code2,
  Container,
  Database,
  Figma,
  Flame,
  GitBranch,
  Globe,
  KeyRound,
  Layers3,
  LockKeyhole,
  Network,
  Palette,
  PanelTop,
  Rocket,
  SearchCode,
  Server,
  ShieldCheck,
  Terminal,
  Workflow,
} from "lucide-react";

const getSkillIcon = (skillName: string) => {
  const name = skillName.toLowerCase();

  if (name.includes("react")) return <Atom size={15} />;
  if (name.includes("typescript")) return <Code2 size={15} />;
  if (name.includes("tailwind")) return <Palette size={15} />;
  if (name.includes("node")) return <Server size={15} />;
  if (name.includes("python") || name.includes("fastapi")) return <Terminal size={15} />;
  if (name.includes("express")) return <Network size={15} />;
  if (name.includes("rest")) return <Globe size={15} />;
  if (name.includes("mongodb")) return <Database size={15} />;
  if (name.includes("supabase")) return <Database size={15} />;
  if (name.includes("firebase")) return <Flame size={15} />;
  if (name.includes("docker")) return <Container size={15} />;
  if (name.includes("ci/cd") || name.includes("github actions")) return <Workflow size={15} />;
  if (name.includes("aws")) return <Cloud size={15} />;
  if (name.includes("linux")) return <Terminal size={15} />;
  if (name.includes("nginx")) return <Server size={15} />;
  if (name.includes("deployment")) return <Rocket size={15} />;
  if (name.includes("openai") || name.includes("llm")) return <Bot size={15} />;
  if (name.includes("tensorflow")) return <BrainCircuit size={15} />;
  if (name.includes("scraping")) return <SearchCode size={15} />;
  if (name.includes("automation")) return <Workflow size={15} />;
  if (name.includes("wordpress")) return <PanelTop size={15} />;
  if (name.includes("responsive")) return <Boxes size={15} />;
  if (name.includes("seo")) return <SearchCode size={15} />;
  if (name.includes("git")) return <GitBranch size={15} />;
  if (name.includes("postman")) return <Network size={15} />;
  if (name.includes("figma")) return <Figma size={15} />;
  if (name.includes("authentication")) return <KeyRound size={15} />;
  if (name.includes("error")) return <ShieldCheck size={15} />;
  if (name.includes("security")) return <LockKeyhole size={15} />;

  return <Layers3 size={15} />;
};

export default function Skills() {
  const { skillCategories } = usePortfolioContent();

  return (
    <section id="skills" className="section-padding relative border-t border-white/[0.05]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase">Expertise</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            The stack I use to move from idea to deployable product, with a bias toward
            readable code and practical delivery.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="glass-card-hover p-5"
            >
              <h3 className="mb-5 font-heading text-lg font-semibold text-foreground">{cat.title}</h3>
              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm flex items-center gap-2">
                        <span className="inline-flex min-w-9 items-center justify-center rounded border border-primary/15 bg-primary/5 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary">
                          {getSkillIcon(skill.name)}
                        </span>
                        {skill.name}
                      </span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
