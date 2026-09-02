import { motion } from "framer-motion";
import { ArrowUpRight, MonitorPlay, Play, Video, Youtube } from "lucide-react";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";

const videoIcons = [<Play size={22} />, <Youtube size={22} />, <Video size={22} />];

export default function Videos() {
  const { mediaResources } = usePortfolioContent();
  const [introVideo, ...supportingVideos] = mediaResources;

  if (!introVideo) {
    return null;
  }

  return (
    <section id="videos" className="section-padding relative border-t border-white/[0.06]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-3xl"
        >
          <p className="mb-2 font-mono text-sm uppercase tracking-widest text-primary">YouTube</p>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Intro & <span className="gradient-text">Experience Videos</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            Video references for my introduction, YouTube content, and project experience walkthroughs.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
          <motion.a
            href={introVideo.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-hover group block overflow-hidden"
          >
            <div className="relative aspect-video overflow-hidden bg-background">
              <div className="absolute inset-0 grid-bg opacity-35" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.18),transparent_28rem),linear-gradient(135deg,hsl(var(--card)),hsl(var(--background)))]" />
              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                    <Youtube size={18} />
                    Featured Intro
                  </span>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_18px_45px_hsl(var(--primary)/0.22)] transition-transform duration-300 group-hover:scale-105">
                    <Play size={20} fill="currentColor" />
                  </span>
                </div>

                <div className="max-w-xl">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-primary">
                    <MonitorPlay size={28} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold sm:text-3xl">{introVideo.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {introVideo.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.a>

          <div className="grid gap-6">
            {supportingVideos.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="glass-card-hover group flex min-h-44 flex-col p-6"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 text-primary">
                    {videoIcons[index + 1] ?? <Video size={22} />}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-xs font-medium text-muted-foreground">
                    {item.source}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-semibold transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary">
                  Watch on YouTube
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
