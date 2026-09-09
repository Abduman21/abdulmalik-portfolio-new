import { ArrowUpRight, Download, Github, Instagram, Linkedin, Mail, MessageCircle, Music2, Newspaper, Send, Twitter, Youtube } from "lucide-react";
import abduPhoto from "@/assets/abdu-photo.jpg";
import upworkIcon from "@/assets/upwork-icon.png";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";

const stack = ["TypeScript", "React / Next.js", "Node.js / Express", "Firebase"];

const highlights = [
  ["3+", "Years experience"],
  ["15+", "Projects shipped"],
  ["Full-stack", "Frontend, backend, cloud"],
];

const getSocialIcon = (platform: string) => {
  const key = platform.toLowerCase();
  if (key.includes("upwork")) return <img src={upworkIcon} alt="" className="h-5 w-5 object-contain" />;
  if (key.includes("linkedin")) return <Linkedin size={18} />;
  if (key.includes("telegram")) return <Send size={18} />;
  if (key.includes("instagram")) return <Instagram size={18} />;
  if (key.includes("whatsapp")) return <MessageCircle size={18} />;
  if (key === "x" || key.includes("twitter")) return <Twitter size={18} />;
  if (key.includes("substack") || key.includes("blog")) return <Newspaper size={18} />;
  if (key.includes("tiktok")) return <Music2 size={18} />;
  if (key.includes("youtube")) return <Youtube size={18} />;
  if (key.includes("github")) return <Github size={18} />;
  return <ArrowUpRight size={18} />;
};

export default function Hero() {
  const { profile, socialLinks } = usePortfolioContent();
  const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background";

  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative bg-background px-5 pb-16 pt-28 sm:px-7 sm:pb-20 sm:pt-32 lg:flex lg:min-h-[85svh] lg:items-center lg:px-12">
      <div className="container-custom grid items-center gap-10 md:grid-cols-[minmax(240px,0.82fr)_minmax(0,1.35fr)] md:gap-12 lg:gap-16 xl:gap-20">
        <div className="mx-auto w-full max-w-[300px] sm:max-w-[360px] md:mx-0 md:max-w-[390px]">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.09] bg-card shadow-[var(--shadow-card)]">
            <img src={abduPhoto} alt={`${profile.name} portrait`} className="h-full w-full object-cover object-[50%_28%] grayscale" loading="eager" fetchPriority="high" />
          </div>
        </div>

        <div className="min-w-0">
          <p className="font-mono text-sm font-semibold uppercase tracking-normal text-primary">Available for full-stack work</p>
          <h1 id="hero-heading" className="mt-3 font-heading text-5xl font-bold leading-[0.98] tracking-normal text-foreground sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-5 font-mono text-2xl font-semibold text-primary sm:text-3xl">{profile.role}</p>
          <p className="mt-3 max-w-3xl font-mono text-base leading-7 text-muted-foreground sm:text-lg">
            {stack.join(" · ")}
          </p>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
            I build reliable web applications with clear interfaces, practical backend logic, and deployment-ready foundations for teams that need software people can use quickly.
          </p>

          <dl className="mt-9 grid max-w-3xl grid-cols-1 gap-5 border-y border-border py-6 sm:grid-cols-3 sm:gap-8">
            {highlights.map(([value, label]) => (
              <div key={value}>
                <dt className="font-heading text-3xl font-bold leading-none text-foreground sm:text-4xl">{value}</dt>
                <dd className="mt-2 text-sm font-medium text-muted-foreground sm:text-base">{label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 ${focusRing}`}>
              View Projects <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href="#about" className={`inline-flex min-h-12 items-center justify-center rounded-full border border-border px-7 py-3 font-semibold text-foreground transition-colors hover:border-primary hover:text-primary ${focusRing}`}>
              About Me
            </a>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border px-7 py-3 font-semibold text-foreground transition-colors hover:border-primary hover:text-primary ${focusRing}`}>
              <Download size={18} aria-hidden="true" /> Resume
            </a>
            <a href="#contact" className={`inline-flex min-h-12 items-center gap-2 rounded-full px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary ${focusRing}`}>
              <Mail size={18} aria-hidden="true" /> Hire Me
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-border pt-4">
            {socialLinks.map((link) => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label} className={`inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors hover:text-primary ${focusRing}`}>
                {getSocialIcon(link.platform)} {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
