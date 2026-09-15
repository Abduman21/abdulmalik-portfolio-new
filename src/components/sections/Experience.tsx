import { motion } from "framer-motion";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";
import { Briefcase, Award, Code, GraduationCap, UserCheck } from "lucide-react";

const iconMap = {
  work: <Briefcase size={14} />,
  freelance: <Code size={14} />,
  certification: <Award size={14} />,
  education: <GraduationCap size={14} />,
  internship: <UserCheck size={14} />,
};

const colorMap = {
  work: "text-primary border-primary/30 bg-primary/10",
  freelance: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  certification: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  education: "text-sky-400 border-sky-400/30 bg-sky-400/10",
  internship: "text-purple-400 border-purple-400/30 bg-purple-400/10",
};

export default function Experience() {
  const { experiences } = usePortfolioContent();

  const workItems = experiences.filter(
    (e) => e.type === "work" || e.type === "freelance" || e.type === "internship" || e.type === "certification"
  );
  const educationItems = experiences.filter((e) => e.type === "education");

  return (
    <section id="experience" className="section-padding relative border-t border-white/[0.05]">
      <div className="container-custom flex flex-col items-center">

        {/* Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase">Journey</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            Experience &amp; <span className="gradient-text">Education</span>
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base max-w-xl mx-auto">
            A path through software development, AI training, university study, and hands-on product work.
          </p>
        </motion.div>

        {/* Two columns side by side */}
        <div className="grid w-full max-w-4xl gap-8 md:grid-cols-2">

          {/* ── LEFT: Experience ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-5 flex items-center gap-2 font-heading text-base font-semibold text-foreground">
              <span className="inline-flex items-center justify-center rounded-lg border border-primary/25 bg-primary/10 p-1.5 text-primary">
                <Briefcase size={14} />
              </span>
              Experience
            </h3>
            <div className="space-y-3">
              {workItems.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-lg border border-white/[0.07] bg-card p-4 transition-colors duration-300 hover:bg-secondary/60"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${colorMap[exp.type]}`}>
                      {iconMap[exp.type]}
                      {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap">{exp.period}</span>
                  </div>
                  <h4 className="font-heading text-sm font-semibold leading-snug text-foreground">{exp.title}</h4>
                  <p className="mt-0.5 text-xs text-primary/80">{exp.company}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Education ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-5 flex items-center gap-2 font-heading text-base font-semibold text-foreground">
              <span className="inline-flex items-center justify-center rounded-lg border border-sky-400/25 bg-sky-400/10 p-1.5 text-sky-400">
                <GraduationCap size={14} />
              </span>
              Education
            </h3>
            <div className="space-y-3">
              {educationItems.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-lg border border-white/[0.07] bg-card p-4 transition-colors duration-300 hover:bg-secondary/60"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${colorMap[exp.type]}`}>
                      {iconMap[exp.type]}
                      Education
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap">{exp.period}</span>
                  </div>
                  <h4 className="font-heading text-sm font-semibold leading-snug text-foreground">{exp.title}</h4>
                  <p className="mt-0.5 text-xs text-sky-400/80">{exp.company}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
