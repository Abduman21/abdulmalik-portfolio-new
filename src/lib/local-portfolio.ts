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
