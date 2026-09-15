import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";

export default function Blog() {
  const { blogPosts } = usePortfolioContent();
  const visibleBlogPosts = blogPosts.slice(0, 6);

  return (
    <section id="blog" className="section-padding relative border-t border-white/[0.06] bg-card/45">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-3xl"
        >
          <p className="mb-2 font-mono text-sm uppercase tracking-widest text-primary">Blog</p>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Notes & <span className="gradient-text">Insights</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            Short writing on development, product thinking, automation, and the lessons behind the work.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {visibleBlogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card-hover group flex min-h-[260px] flex-col p-6"
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 text-primary">
                  <BookOpen size={22} />
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-xs font-medium text-muted-foreground">
                  {post.source}
                </span>
              </div>

              <h3 className="font-heading text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>

              <div className="mt-auto flex items-center justify-between border-t border-white/[0.07] pt-5 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} /> {post.readTime}
                </span>
                <a href={post.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary">
                  Read <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
