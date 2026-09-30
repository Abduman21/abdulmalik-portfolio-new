import { portfolioContent } from "@/data/portfolio-data";
import type { PortfolioContent } from "@/types/portfolio";

const STORAGE_KEY = "abdulmalik-portfolio-content";
const MAX_BLOG_POSTS = 6;

export const limitBlogPosts = (content: PortfolioContent): PortfolioContent => ({
  ...content,
  blogPosts: content.blogPosts.slice(0, MAX_BLOG_POSTS),
});

export const getDefaultPortfolioContent = (): PortfolioContent =>
  limitBlogPosts(JSON.parse(JSON.stringify(portfolioContent)) as PortfolioContent);

export const loadLocalPortfolioContent = (): PortfolioContent => {
  if (typeof window === "undefined") {
    return getDefaultPortfolioContent();
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return getDefaultPortfolioContent();
  }

  try {
    const defaults = getDefaultPortfolioContent();
    const parsed = JSON.parse(stored) as Partial<PortfolioContent>;
    if (parsed.socialLinks) {
      parsed.socialLinks = parsed.socialLinks.map((link) => {
        if (link.platform === "youtube" || link.label.toLowerCase() === "youtube") {
          return { ...link, url: "https://www.youtube.com/@abdu_tech2" };
        }
        return link;
      });
    }
    if (parsed.mediaResources) {
      parsed.mediaResources = parsed.mediaResources
        .filter((m) => !m.title.toLowerCase().includes("channel") && !m.url.includes("/@"))
        .map((m, idx) => {
          if (idx === 0 && (m.url.includes("/@") || !m.url.includes("mcZ3ef1rOHk"))) {
            return { ...m, url: defaults.mediaResources[0]?.url || "https://youtu.be/mcZ3ef1rOHk" };
          }
          if (idx === 1 && (m.url.includes("/@") || !m.url.includes("pUAkQTl7Paw"))) {
            return { ...m, url: defaults.mediaResources[1]?.url || "https://youtu.be/pUAkQTl7Paw" };
          }
          return m;
        });

      if (parsed.mediaResources.length < 2 && defaults.mediaResources.length >= 2) {
        parsed.mediaResources = defaults.mediaResources;
      }
    }
    if (parsed.profile?.resumeUrl && parsed.profile.resumeUrl.includes("1OIGsfbxcg6wtFYJaJajP19ll6MEZ0ffj")) {
      parsed.profile.resumeUrl = defaults.profile.resumeUrl;
    }
    return limitBlogPosts({
      ...defaults,
      ...parsed,
      profile: {
        ...defaults.profile,
        ...parsed.profile,
      },
    });
  } catch {
    return getDefaultPortfolioContent();
  }
};

export const saveLocalPortfolioContent = (content: PortfolioContent) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(limitBlogPosts(content)));
  window.dispatchEvent(new Event("portfolio-content-updated"));
};

export const hasLocalPortfolioContent = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return Boolean(window.localStorage.getItem(STORAGE_KEY));
};

export const resetLocalPortfolioContent = () => {
  window.localStorage.removeItem(STORAGE_KEY);
};
