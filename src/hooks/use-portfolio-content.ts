import { useEffect, useState } from "react";
import { loadLocalPortfolioContent } from "@/lib/local-portfolio";
import type { PortfolioContent } from "@/types/portfolio";

export const usePortfolioContent = (): PortfolioContent => {
  const [content, setContent] = useState<PortfolioContent>(() => loadLocalPortfolioContent());

  useEffect(() => {
    const refresh = () => setContent(loadLocalPortfolioContent());
    import("@/lib/firebase-portfolio")
      .then(({ loadPortfolioContent }) => loadPortfolioContent())
      .then(setContent)
      .catch(() => setContent(loadLocalPortfolioContent()));
    window.addEventListener("storage", refresh);
    window.addEventListener("portfolio-content-updated", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("portfolio-content-updated", refresh);
    };
  }, []);

  return content;
};
