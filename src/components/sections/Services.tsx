import { motion } from "framer-motion";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";
import { Bot, Braces, Layers3, MonitorSmartphone, Smartphone, Workflow } from "lucide-react";

const iconMap = {
  web: <Braces size={24} />,
  stack: <Layers3 size={24} />,
  ai: <Bot size={24} />,
  automation: <Workflow size={24} />,
  ui: <MonitorSmartphone size={24} />,
  mobile: <Smartphone size={24} />,
};

export default function Services() {
  const { services } = usePortfolioContent();

  return (
    <section id="services" className="section-padding relative border-t border-white/[0.05]">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase">What I Offer</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            Support for founders, small teams, and businesses that need working software without
            heavy process overhead.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover group p-6"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 text-primary transition-transform duration-300 group-hover:-translate-y-0.5">
                {iconMap[service.icon as keyof typeof iconMap]}
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
