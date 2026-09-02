import { usePortfolioContent } from "@/hooks/use-portfolio-content";

export default function Footer() {
  const { profile } = usePortfolioContent();

  return (
    <footer className="border-t border-white/[0.06] px-4 py-8">
      <div className="container-custom flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="font-heading text-sm font-semibold text-foreground">{profile.name}</p>
        <p className="text-sm text-muted-foreground">
          © 2026. Web, AI, and automation engineering.
        </p>
      </div>
    </footer>
  );
}
