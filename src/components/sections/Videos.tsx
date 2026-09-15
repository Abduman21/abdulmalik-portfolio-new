import { motion } from "framer-motion";
import { ArrowUpRight, Play, Video, Youtube } from "lucide-react";
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
      <div className="container-custom max-w-4xl">
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

        <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
          {/* ── Featured Intro: actual embedded player ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-white/[0.07] bg-card"
          >
            {/* Header label */}
            <div className="flex items-center px-5 py-3 border-b border-white/[0.06]">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                <Youtube size={16} />
                Featured Intro
              </span>
            </div>

            {/* Embedded player — aspect-video = 16:9 on all screens */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src={`https://www.youtube.com/embed/${
                  introVideo.url.includes("watch?v=")
                    ? introVideo.url.split("watch?v=")[1]?.split("&")[0]
                    : introVideo.url.includes("youtu.be/")
                    ? introVideo.url.split("youtu.be/")[1]?.split("?")[0]
                    : ""
                }?rel=0&modestbranding=1&playsinline=1`}
                title={introVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
              />
            </div>

            {/* Caption */}
            <div className="px-5 py-4">
              <h3 className="font-heading text-base font-semibold text-foreground">{introVideo.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{introVideo.description}</p>
            </div>
          </motion.div>

          {/* ── Supporting video cards ── */}
          <div className="flex flex-col gap-5">
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
                className="glass-card-hover group flex flex-1 flex-col p-5"
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 text-primary">
                    {videoIcons[index + 1] ?? <Video size={20} />}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-xs font-medium text-muted-foreground">
                    {item.source}
                  </span>
                </div>

                <h3 className="font-heading text-base font-semibold transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary">
                  Watch on YouTube
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
