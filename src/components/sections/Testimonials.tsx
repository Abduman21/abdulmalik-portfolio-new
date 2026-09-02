import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const { testimonials } = usePortfolioContent();

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  useEffect(() => {
    if (paused || testimonials.length < 2) {
      return;
    }

    const timer = window.setInterval(next, 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    setCurrent((value) => Math.min(value, Math.max(testimonials.length - 1, 0)));
  }, [testimonials.length]);

  if (!testimonials.length) {
    return null;
  }

  return (
    <section id="testimonials" className="section-padding relative border-t border-white/[0.06]">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase">Feedback</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border border-white/[0.07] bg-card p-8"
            >
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-6 text-lg leading-relaxed text-foreground">
                "{testimonials[current].content}"
              </p>
              {testimonials[current].avatar ? (
                <img 
                  src={testimonials[current].avatar} 
                  alt={testimonials[current].name}
                  loading="lazy"
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-primary/20"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 mx-auto mb-3 flex items-center justify-center font-heading font-bold text-primary">
                  {testimonials[current].name[0]}
                </div>
              )}
              <p className="font-heading font-semibold">{testimonials[current].name}</p>
              <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => {
                setPaused(true);
                prev();
              }}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary/30 hover:text-primary transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => {
                setPaused(true);
                next();
              }}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary/30 hover:text-primary transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
