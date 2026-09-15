import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { navLinks } from "@/data/portfolio-data";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";
import { Menu, X, Download } from "lucide-react";
import logo from "@/assets/abdu-logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { profile } = usePortfolioContent();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/[0.08] bg-background/88 py-3 shadow-sm shadow-black/20 backdrop-blur-xl" : "py-4"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="#" className="group flex items-center gap-3" aria-label="Abdulmalik Muze home">
          <img
            src={logo}
            alt="Abdu Tech Logo"
            className="h-9 w-9 rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-heading text-sm font-semibold tracking-wide text-foreground transition-colors duration-300 group-hover:text-primary">
            {profile.name}
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1 rounded-lg border border-white/[0.06] bg-white/[0.03] p-1">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-[13px] font-medium tracking-tight text-muted-foreground transition-colors duration-300 hover:bg-white/[0.05] hover:text-foreground"
            >
              <span className="mr-1.5 font-mono text-[10px] text-primary/70">0{index + 1}</span>
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            <Download size={14} /> Resume
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card mx-4 mt-2 flex flex-col gap-1 p-3 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:opacity-95"
          >
            <Download size={14} /> Resume
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
