import { motion } from "framer-motion";
import { Code2, Cpu, Gauge, ShieldCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

export default function About() {
  return (
    <section id="about" className="section-padding relative border-t border-white/[0.05]">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid items-start gap-12 lg:grid-cols-[1fr_0.95fr]"
        >
          <div>
            <motion.p variants={fadeUp} custom={0} className="text-primary font-mono text-sm mb-2 tracking-widest uppercase">
              About Me
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="mb-6 font-heading text-3xl font-bold leading-tight sm:text-4xl">
              Practical engineering for{" "}
              <span className="gradient-text">real product momentum</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground leading-relaxed mb-4">
              I am a full-stack developer focused on React, Node.js, automation, and AI-assisted
              product workflows. My work sits where user experience, reliable APIs, and useful
              business systems meet.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-muted-foreground leading-relaxed">
              I care about clean interfaces, maintainable code, and software that solves a specific
              problem without making the team carry extra complexity.
            </motion.p>
            <motion.div variants={fadeUp} custom={4} className="mt-8 grid grid-cols-3 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07]">
              {[
                ["25+", "Projects built"],
                ["10+", "Skills"],
                ["15+", "Certifications"],
              ].map(([value, label]) => (
                <div key={label} className="bg-card p-4">
                  <div className="font-heading text-2xl font-bold text-foreground">{value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} custom={2} className="grid gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07]">
            {[
              { icon: <Code2 size={24} />, title: "Clean Architecture", desc: "Modular, testable, and maintainable codebases built to scale." },
              { icon: <Cpu size={24} />, title: "AI-Ready Workflows", desc: "LLM integrations and automation that support real business tasks." },
              { icon: <Gauge size={24} />, title: "Performance Mindset", desc: "Fast loading, responsive layouts, and interfaces that feel smooth." },
              { icon: <ShieldCheck size={24} />, title: "Reliable Delivery", desc: "Clear scope, pragmatic tooling, and deployable outcomes." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i + 3}
                className="flex items-start gap-4 bg-card p-5 transition-colors duration-300 hover:bg-secondary/80"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 text-primary">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
