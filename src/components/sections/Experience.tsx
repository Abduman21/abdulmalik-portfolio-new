import { motion } from "framer-motion";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";
import { Briefcase, Award, Code, GraduationCap, UserCheck } from "lucide-react";

const iconMap = {
  work: <Briefcase size={16} />,
  freelance: <Code size={16} />,
  certification: <Award size={16} />,
  education: <GraduationCap size={16} />,
  internship: <UserCheck size={16} />,
};

export default function Experience() {
  const { experiences } = usePortfolioContent();

  return (
    <section id="experience" className="section-padding relative border-t border-white/[0.05]">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase">Journey</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            Experience & <span className="gradient-text">Timeline</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            A path through software development, AI training, university study, and hands-on
            product work.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-16"
              >
                <div className="absolute left-4 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>

                <div className="rounded-lg border border-white/[0.07] bg-card p-5 transition-colors duration-300 hover:bg-secondary/80">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-primary">{iconMap[exp.type]}</span>
                    <span className="text-xs font-mono text-muted-foreground">{exp.period}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg">{exp.title}</h3>
                  <p className="text-sm text-primary/80 mb-2">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
