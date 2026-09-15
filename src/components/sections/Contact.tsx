import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle,
  Github,
  Instagram,
  Linkedin,
  MessageCircle,
  Music2,
  Newspaper,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";
import upworkIcon from "@/assets/upwork-icon.png";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";
import { toast } from "@/components/ui/sonner";

const CONTACT_EMAIL = "abdulmalikmuze@gmail.com";
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const getSocialIcon = (platform: string) => {
  const key = platform.toLowerCase();
  if (key.includes("github")) return <Github size={20} />;
  if (key.includes("linkedin")) return <Linkedin size={20} />;
  if (key.includes("upwork")) return <img src={upworkIcon} alt="" className="h-5 w-5 object-contain" />;
  if (key.includes("telegram")) return <Send size={20} />;
  if (key.includes("instagram")) return <Instagram size={20} />;
  if (key.includes("whatsapp")) return <MessageCircle size={20} />;
  if (key === "x" || key.includes("twitter")) return <Twitter size={20} />;
  if (key.includes("substack") || key.includes("blog")) return <Newspaper size={20} />;
  if (key.includes("tiktok")) return <Music2 size={20} />;
  if (key.includes("youtube")) return <Youtube size={20} />;
  return <ArrowUpRight size={20} />;
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { socialLinks } = usePortfolioContent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
      window.open(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`, "_self");
      toast("Email app opened", {
        description: "Add VITE_WEB3FORMS_ACCESS_KEY to send messages directly from the form.",
      });
      return;
    }

    setSending(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio Contact from ${form.name}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
          to: CONTACT_EMAIL,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Message could not be sent");
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setForm({ name: "", email: "", message: "" });
      toast.success("Message sent", {
        description: `Delivered to ${CONTACT_EMAIL}`,
      });
    } catch {
      toast.error("Message not sent", {
        description: "Please try again, or email me directly.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative border-t border-white/[0.06] bg-card/45">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase">Get in Touch</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            Send a project note, collaboration idea, or role opportunity. The message is delivered
            directly to my email inbox.
          </p>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card p-6"
          >
            <p className="font-heading text-xl font-semibold">Available for focused builds</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Best fit: portfolio sites, dashboards, API-backed products, AI integrations,
              automation scripts, and MVPs that need a careful developer.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href="mailto:abdulmalikmuze@gmail.com"
                className="group inline-flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-primary group-hover:border-primary/30">
                  <Send size={13} />
                </span>
                abdulmalikmuze@gmail.com
              </a>
              <a
                href="https://github.com/Abduman21"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-primary group-hover:border-primary/30">
                  <Github size={13} />
                </span>
                github.com/Abduman21
              </a>
              <a
                href="https://www.linkedin.com/in/abdulmalik-muze-819951319"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-primary group-hover:border-primary/30">
                  <Linkedin size={13} />
                </span>
                LinkedIn profile
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-5 bg-card p-6 sm:p-8"
          >
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-white/[0.08] bg-background/35 px-4 py-3 text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/40 focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-white/[0.08] bg-background/35 px-4 py-3 text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/40 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-lg border border-white/[0.08] bg-background/35 px-4 py-3 text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/40 focus:outline-none"
                placeholder="Tell me what you want to build..."
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-[0_18px_45px_hsl(var(--primary)/0.18)] transition-all duration-300 hover:opacity-95"
            >
              {sending ? (
                <>
                  <Send size={18} /> Sending...
                </>
              ) : submitted ? (
                <>
                  <CheckCircle size={18} /> Sent!
                </>
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </button>
          </motion.form>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary"
            >
              {getSocialIcon(s.platform)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
