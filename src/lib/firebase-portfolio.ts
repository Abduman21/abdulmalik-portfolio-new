import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase";
import {
  getDefaultPortfolioContent,
  limitBlogPosts,
  loadLocalPortfolioContent,
  saveLocalPortfolioContent,
} from "@/lib/local-portfolio";
import type { PortfolioContent } from "@/types/portfolio";

const PORTFOLIO_DOC_PATH = ["portfolio", "content"] as const;

export const loadPortfolioContent = async (): Promise<PortfolioContent> => {
  const db = getFirebaseDb();
  if (!isFirebaseConfigured || !db) {
    return loadLocalPortfolioContent();
  }

  try {
    const snapshot = await getDoc(doc(db, ...PORTFOLIO_DOC_PATH));
    if (!snapshot.exists()) {
      return loadLocalPortfolioContent();
    }

    const defaults = getDefaultPortfolioContent();
    const data = snapshot.data().content as Partial<PortfolioContent> | undefined;
    if (!data) {
      return loadLocalPortfolioContent();
    }

    if (data.mediaResources) {
      data.mediaResources = data.mediaResources
        .filter((m) => !m.title.toLowerCase().includes("channel") && !m.url.includes("/@"))
        .map((m, idx) => {
          if (idx === 0 && (m.url.includes("/@") || !m.url.includes("h9UnTWtTZlk"))) {
            return { ...m, url: defaults.mediaResources[0]?.url || "https://youtu.be/h9UnTWtTZlk" };
          }
          return m;
        });
    }

    const content = limitBlogPosts({
      ...defaults,
      ...data,
      profile: {
        ...defaults.profile,
        ...data.profile,
      },
    });

    saveLocalPortfolioContent(content);
    return content;
  } catch (error) {
    console.error("Failed to load Firebase portfolio content", error);
    return loadLocalPortfolioContent();
  }
};

export const savePortfolioContent = async (content: PortfolioContent) => {
  const cleanContent = limitBlogPosts(content);
  saveLocalPortfolioContent(cleanContent);

  const db = getFirebaseDb();
  if (!isFirebaseConfigured || !db) {
    return { savedRemote: false };
  }

  await setDoc(
    doc(db, ...PORTFOLIO_DOC_PATH),
    {
      content: cleanContent,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );

  return { savedRemote: true };
};
