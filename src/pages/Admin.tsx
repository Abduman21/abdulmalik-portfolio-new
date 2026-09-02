import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Check,
  Database,
  Eye,
  FileText,
  FolderKanban,
  Link as LinkIcon,
  ListVideo,
  Lock,
  MessageSquareQuote,
  Newspaper,
  Plus,
  RotateCcw,
  Save,
  Settings2,
  Sparkles,
  Trash2,
  Wrench,
} from "lucide-react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import {
  hasLocalPortfolioContent,
  loadLocalPortfolioContent,
  resetLocalPortfolioContent,
  saveLocalPortfolioContent,
} from "@/lib/local-portfolio";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import { loadPortfolioContent, savePortfolioContent } from "@/lib/firebase-portfolio";
import { toast } from "@/components/ui/sonner";
import type {
  BlogPost,
  Experience,
  MediaResource,
  PortfolioContent,
  Project,
  Service,
  Skill,
  SkillCategory,
  SocialLink,
  Testimonial,
} from "@/types/portfolio";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "";

type AdminSection =
  | "profile"
  | "skills"
  | "projects"
  | "experience"
  | "services"
  | "testimonials"
  | "videos"
  | "blog"
  | "social";

const nextId = (items: Array<{ id: number }>) => Math.max(0, ...items.map((item) => item.id)) + 1;
const splitCsv = (value: string) => value.split(",").map((item) => item.trim()).filter(Boolean);
const focusNewestEditor = () => {
  window.setTimeout(() => {
    const fields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("[data-admin-field]");
    fields[fields.length - 1]?.focus();
  }, 50);
};

const Admin = () => {
  const [unlocked, setUnlocked] = useState(() => window.sessionStorage.getItem("admin-unlocked") === "true");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [content, setContent] = useState<PortfolioContent>(() => loadLocalPortfolioContent());
  const [active, setActive] = useState<AdminSection>("profile");
  const [status, setStatus] = useState("Local draft ready");
  const [readyForLocalAutosave, setReadyForLocalAutosave] = useState(false);

  const counts = useMemo(
    () => [
      ["Skills", content.skillCategories.reduce((total, category) => total + category.skills.length, 0)],
      ["Projects", content.projects.length],
      ["Experience", content.experiences.length],
      ["Services", content.services.length],
      ["Testimonials", content.testimonials.length],
      ["Videos", content.mediaResources.length],
      ["Blog", content.blogPosts.length],
      ["Social", content.socialLinks.length],
    ],
    [content],
  );

  useEffect(() => {
    if (hasLocalPortfolioContent()) {
      setStatus("Local draft loaded. Click Save to publish to Firebase.");
      setReadyForLocalAutosave(true);
      return;
    }

    loadPortfolioContent()
      .then(setContent)
      .finally(() => setReadyForLocalAutosave(true));
  }, []);

  useEffect(() => {
    if (!readyForLocalAutosave) {
      return;
    }

    saveLocalPortfolioContent(content);
  }, [content, readyForLocalAutosave]);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      return;
    }

    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUnlocked(true);
        setStatus(`Signed in as ${currentUser.email}`);
      }
    });
  }, []);

  const handleUnlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === ADMIN_PASSWORD) {
      window.sessionStorage.setItem("admin-unlocked", "true");
      setUnlocked(true);
      setStatus("Admin unlocked");
      return;
    }
    setStatus("Wrong temporary password");
  };

  const handleFirebaseLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const auth = getFirebaseAuth();
    if (!auth) {
      setStatus("Firebase is not configured yet. Add your .env values first.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setStatus("Firebase admin login successful");
    } catch {
      setStatus("Firebase login failed. Check email/password and Firebase Auth settings.");
    }
  };

  const saveDraft = async () => {
    try {
      const result = await savePortfolioContent(content);
      setStatus(result.savedRemote ? "Saved to Firebase Firestore" : "Saved locally. Firebase is not configured yet.");
      toast.success(result.savedRemote ? "Portfolio updates saved" : "Saved locally", {
        description: result.savedRemote ? "Your admin changes are now in Firestore." : "Firebase is not configured yet.",
      });
    } catch {
      setStatus("Save failed. Check Firestore rules and your Firebase login.");
      toast.error("Save failed", {
        description: "Check your Firebase login and Firestore rules.",
      });
    }
  };

  const resetDraft = async () => {
    setReadyForLocalAutosave(false);
    resetLocalPortfolioContent();
    const freshContent = await loadPortfolioContent();
    setContent(freshContent);
    setReadyForLocalAutosave(true);
    setStatus("Local draft reset from Firebase/default content");
    toast("Local draft reset", {
      description: "The editor reloaded the latest Firebase/default content.",
    });
  };

  const logout = async () => {
    const auth = getFirebaseAuth();
    if (auth) {
      await signOut(auth);
    }
    window.sessionStorage.removeItem("admin-unlocked");
    setUnlocked(false);
    setUser(null);
    setEmail("");
    setPassword("");
    setStatus("Signed out");
  };

  const updateProfile = (field: keyof PortfolioContent["profile"], value: string) => {
    setContent((current) => ({ ...current, profile: { ...current.profile, [field]: value } }));
  };

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-background px-5 py-20 text-foreground">
        <div className="mx-auto flex min-h-[70vh] max-w-md items-center">
          <form
            onSubmit={isFirebaseConfigured ? handleFirebaseLogin : handleUnlock}
            className="w-full rounded-xl border border-white/[0.08] bg-card p-6 shadow-[var(--shadow-card)]"
            autoComplete="off"
          >
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 text-primary">
              <Lock size={22} />
            </div>
            <h1 className="font-heading text-2xl font-bold">Portfolio Admin</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {isFirebaseConfigured ? "Sign in with the Firebase admin user you create in Firebase Authentication." : (
                <>
                  Firebase is not configured yet, so local temporary access is active. Use your private admin password from the environment settings.
                </>
              )}
            </p>
            {isFirebaseConfigured ? (
              <>
                <label className="mt-6 block text-sm text-muted-foreground" htmlFor="email">
                  Admin Email
                </label>
                <input
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-white/[0.08] bg-background/40 px-4 py-3 outline-none transition-colors focus:border-primary/40"
                  type="email"
                  autoComplete="off"
                />
              </>
            ) : null}
            <label className="mt-6 block text-sm text-muted-foreground" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-lg border border-white/[0.08] bg-background/40 px-4 py-3 outline-none transition-colors focus:border-primary/40"
              type="password"
              autoComplete="new-password"
            />
            <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground">
              {isFirebaseConfigured ? "Sign In" : "Unlock Admin"}
            </button>
            <p className="mt-4 text-sm text-muted-foreground">{status}</p>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-background/90 backdrop-blur-xl">
        <div className="container-custom flex h-16 items-center justify-between px-5 sm:px-7 lg:px-0">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 text-primary">
              <Settings2 size={18} />
            </span>
            <div>
              <p className="font-heading text-sm font-semibold">Portfolio Admin</p>
              <p className="text-xs text-muted-foreground">{status}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <Eye size={15} /> Preview
            </Link>
            <button onClick={saveDraft} className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">
              <Save size={15} /> Save
            </button>
            <button onClick={logout} className="hidden rounded-lg border border-white/10 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex">
              {user ? "Sign Out" : "Lock"}
            </button>
          </div>
        </div>
      </header>

      <div className="container-custom grid gap-6 px-5 py-8 sm:px-7 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-0">
        <aside className="space-y-4">
          <div className="rounded-xl border border-white/[0.08] bg-card p-4">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
              <Database size={16} className="text-primary" />
              Local Content
            </div>
            <div className="space-y-2">
              {counts.map(([label, count]) => (
                <div key={label} className="flex items-center justify-between rounded-lg bg-background/35 px-3 py-2 text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-mono text-primary">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <nav className="grid gap-2 rounded-xl border border-white/[0.08] bg-card p-3">
            {[
              ["profile", "Profile & Resume", FileText],
              ["skills", "Skills & Tech", Sparkles],
              ["projects", "Featured Projects", FolderKanban],
              ["experience", "Experience Timeline", Briefcase],
              ["services", "Services", Wrench],
              ["testimonials", "Testimonials", MessageSquareQuote],
              ["videos", "Intro & Experience Videos", ListVideo],
              ["blog", "Blog Notes", Newspaper],
              ["social", "Social Links", LinkIcon],
            ].map(([key, label, Icon]) => (
              <button
                key={key as string}
                onClick={() => setActive(key as AdminSection)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  active === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                }`}
              >
                <Icon size={16} /> {label as string}
              </button>
            ))}
          </nav>

          <button onClick={resetDraft} className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <RotateCcw size={15} /> Reset Local Draft
          </button>
        </aside>

        <section className="space-y-6">
          {active === "profile" && (
            <Panel title="Profile, Hero & Resume" kicker="Identity">
              <div className="grid gap-4 md:grid-cols-2">
                <AdminField label="Name" value={content.profile.name} onChange={(value) => updateProfile("name", value)} />
                <AdminField label="Primary Role" value={content.profile.role} onChange={(value) => updateProfile("role", value)} />
                <AdminField label="Headline" value={content.profile.headline} onChange={(value) => updateProfile("headline", value)} />
                <AdminField label="Primary CTA" value={content.profile.primaryCta} onChange={(value) => updateProfile("primaryCta", value)} />
                <AdminField label="Secondary CTA" value={content.profile.secondaryCta} onChange={(value) => updateProfile("secondaryCta", value)} />
                <AdminField label="Resume Link" value={content.profile.resumeUrl} onChange={(value) => updateProfile("resumeUrl", value)} />
                <AdminTextarea label="Summary" value={content.profile.summary} onChange={(value) => updateProfile("summary", value)} className="md:col-span-2" />
              </div>
            </Panel>
          )}

          {active === "skills" && (
            <SkillsEditor content={content} setContent={setContent} />
          )}

          {active === "projects" && (
            <ProjectsEditor content={content} setContent={setContent} />
          )}

          {active === "experience" && (
            <ExperienceEditor content={content} setContent={setContent} />
          )}

          {active === "services" && (
            <ServicesEditor content={content} setContent={setContent} />
          )}

          {active === "testimonials" && (
            <TestimonialsEditor content={content} setContent={setContent} />
          )}

          {active === "videos" && (
            <VideosEditor content={content} setContent={setContent} />
          )}

          {active === "blog" && (
            <BlogEditor content={content} setContent={setContent} />
          )}

          {active === "social" && (
            <SocialEditor content={content} setContent={setContent} />
          )}
        </section>
      </div>
    </main>
  );
};

type EditorProps = {
  content: PortfolioContent;
  setContent: Dispatch<SetStateAction<PortfolioContent>>;
};

const SkillsEditor = ({ content, setContent }: EditorProps) => {
  const addCategory = () => {
    setContent((current) => ({
      ...current,
      skillCategories: [...current.skillCategories, { title: "New Skill Category", skills: [] }],
    }));
    toast.success("Category added", { description: "Draft saved locally. Click Save to publish to Firebase." });
    focusNewestEditor();
  };

  const updateCategory = (index: number, value: SkillCategory) => setContent((current) => ({
    ...current,
    skillCategories: current.skillCategories.map((category, i) => (i === index ? value : category)),
  }));

  const deleteCategory = (index: number) => {
    setContent((current) => ({
      ...current,
      skillCategories: current.skillCategories.filter((_, i) => i !== index),
    }));
    toast("Category deleted");
  };

  return (
    <Panel title="Skills & Technologies" kicker="Stack" action={<AddButton onClick={addCategory} label="Add Category" />}>
      <div className="space-y-4">
        {content.skillCategories.map((category, index) => (
          <div key={`skill-category-${index}`} className="rounded-lg border border-white/[0.07] bg-background/25 p-4">
            <div className="mb-4 flex items-center gap-3">
              <AdminField label="Category" value={category.title} onChange={(value) => updateCategory(index, { ...category, title: value })} className="flex-1" />
              <IconButton label="Delete category" onClick={() => deleteCategory(index)} />
            </div>
            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <div key={`skill-${index}-${skillIndex}`} className="grid gap-3 md:grid-cols-[1fr_120px_100px_42px]">
                  <AdminField label="Skill" value={skill.name} onChange={(value) => {
                    const skills = category.skills.map((item, i) => (i === skillIndex ? { ...item, name: value } : item));
                    updateCategory(index, { ...category, skills });
                  }} />
                  <AdminField label="Level" type="number" value={String(skill.level)} onChange={(value) => {
                    const skills = category.skills.map((item, i) => (i === skillIndex ? { ...item, level: Number(value) || 0 } : item));
                    updateCategory(index, { ...category, skills });
                  }} />
                  <AdminField label="Icon Text" value={skill.icon} onChange={(value) => {
                    const skills = category.skills.map((item, i) => (i === skillIndex ? { ...item, icon: value } : item));
                    updateCategory(index, { ...category, skills });
                  }} />
                  <div className="pt-7"><IconButton label="Delete skill" onClick={() => {
                    updateCategory(index, { ...category, skills: category.skills.filter((_, i) => i !== skillIndex) });
                    toast("Skill deleted");
                  }} /></div>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                updateCategory(index, { ...category, skills: [...category.skills, { name: "New Skill", level: 80, icon: "SK" }] });
                toast.success("Skill added", { description: "Draft saved locally. Click Save to publish to Firebase." });
                focusNewestEditor();
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Plus size={15} /> Add Skill
            </button>
          </div>
        ))}
      </div>
    </Panel>
  );
};

const ProjectsEditor = ({ content, setContent }: EditorProps) => {
  const update = (id: number, patch: Partial<Project>) => setContent((current) => ({
    ...current,
    projects: current.projects.map((project) => (project.id === id ? { ...project, ...patch } : project)),
  }));

  return (
    <Panel title="Featured Projects" kicker="Portfolio" action={<AddButton label="Add Project" onClick={() => {
      setContent((current) => ({
        ...current,
        projects: [...current.projects, {
          id: nextId(current.projects),
          title: "New Project",
          description: "",
          tech: ["React"],
          category: "Frontend",
          status: "Draft",
          timeline: "",
          impact: "",
          challenge: "",
          solution: "",
          result: "",
          githubUrl: "",
          liveUrl: "",
          image: "",
        }],
      }));
      toast.success("Project added", { description: "Draft saved locally. Click Save to publish to Firebase." });
      focusNewestEditor();
    }} />}>
      <div className="space-y-4">
        {content.projects.map((project) => (
          <Card key={project.id} title={project.title} onDelete={() => {
            setContent((current) => ({ ...current, projects: current.projects.filter((item) => item.id !== project.id) }));
            toast("Project deleted");
          }}>
            <div className="grid gap-4 md:grid-cols-2">
              <AdminField label="Title" value={project.title} onChange={(value) => update(project.id, { title: value })} />
              <AdminField label="Category" value={project.category} onChange={(value) => update(project.id, { category: value })} />
              <AdminField label="Status" value={project.status} onChange={(value) => update(project.id, { status: value })} />
              <AdminField label="Timeline" value={project.timeline} onChange={(value) => update(project.id, { timeline: value })} />
              <AdminField label="Technologies (comma separated)" value={project.tech.join(", ")} onChange={(value) => update(project.id, { tech: splitCsv(value) })} />
              <AdminField label="Image URL or imported path" value={project.image} onChange={(value) => update(project.id, { image: value })} />
              <AdminField label="GitHub URL" value={project.githubUrl ?? ""} onChange={(value) => update(project.id, { githubUrl: value })} />
              <AdminField label="Live Demo URL" value={project.liveUrl ?? ""} onChange={(value) => update(project.id, { liveUrl: value })} />
              <AdminTextarea label="Description" value={project.description} onChange={(value) => update(project.id, { description: value })} />
              <AdminTextarea label="Impact" value={project.impact} onChange={(value) => update(project.id, { impact: value })} />
              <AdminTextarea label="Challenge" value={project.challenge} onChange={(value) => update(project.id, { challenge: value })} />
              <AdminTextarea label="Solution" value={project.solution} onChange={(value) => update(project.id, { solution: value })} />
              <AdminTextarea label="Result" value={project.result} onChange={(value) => update(project.id, { result: value })} className="md:col-span-2" />
            </div>
          </Card>
        ))}
      </div>
    </Panel>
  );
};

const ExperienceEditor = ({ content, setContent }: EditorProps) => {
  const update = (index: number, patch: Partial<Experience>) => setContent((current) => ({
    ...current,
    experiences: current.experiences.map((item, i) => (i === index ? { ...item, ...patch } : item)),
  }));

  return (
    <Panel title="Experience & Timeline" kicker="Journey" action={<AddButton label="Add Experience" onClick={() => {
      setContent((current) => ({
        ...current,
        experiences: [...current.experiences, { title: "New Experience", company: "", period: "", description: "", type: "work" }],
      }));
      toast.success("Experience added");
      focusNewestEditor();
    }} />}>
      <SimpleCards items={content.experiences} title={(item) => item.title} onDelete={(index) => {
        setContent((current) => ({ ...current, experiences: current.experiences.filter((_, i) => i !== index) }));
        toast("Experience deleted");
      }}>
        {(item, index) => (
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="Title" value={item.title} onChange={(value) => update(index, { title: value })} />
            <AdminField label="Company / School" value={item.company} onChange={(value) => update(index, { company: value })} />
            <AdminField label="Period" value={item.period} onChange={(value) => update(index, { period: value })} />
            <AdminSelect label="Type" value={item.type} options={["work", "freelance", "certification", "education", "internship"]} onChange={(value) => update(index, { type: value as Experience["type"] })} />
            <AdminTextarea label="Description" value={item.description} onChange={(value) => update(index, { description: value })} className="md:col-span-2" />
          </div>
        )}
      </SimpleCards>
    </Panel>
  );
};

const ServicesEditor = ({ content, setContent }: EditorProps) => (
  <CollectionEditor<Service>
    title="My Services"
    kicker="Offer"
    addLabel="Add Service"
    itemLabel="Service"
    items={content.services}
    setItems={(items) => setContent((current) => ({ ...current, services: items }))}
    create={() => ({ title: "New Service", description: "", icon: "web" })}
    render={(service, update) => (
      <div className="grid gap-4 md:grid-cols-2">
        <AdminField label="Title" value={service.title} onChange={(value) => update({ title: value })} />
        <AdminField label="Icon Key" value={service.icon} onChange={(value) => update({ icon: value })} />
        <AdminTextarea label="Description" value={service.description} onChange={(value) => update({ description: value })} className="md:col-span-2" />
      </div>
    )}
  />
);

const TestimonialsEditor = ({ content, setContent }: EditorProps) => (
  <CollectionEditor<Testimonial>
    title="Client Testimonials"
    kicker="Feedback"
    addLabel="Add Testimonial"
    itemLabel="Testimonial"
    items={content.testimonials}
    setItems={(items) => setContent((current) => ({ ...current, testimonials: items }))}
    create={() => ({ name: "New Client", role: "", content: "", rating: 5, avatar: "" })}
    render={(testimonial, update) => (
      <div className="grid gap-4 md:grid-cols-2">
        <AdminField label="Name" value={testimonial.name} onChange={(value) => update({ name: value })} />
        <AdminField label="Role" value={testimonial.role} onChange={(value) => update({ role: value })} />
        <AdminField label="Rating" type="number" value={String(testimonial.rating)} onChange={(value) => update({ rating: Number(value) || 5 })} />
        <AdminField label="Avatar URL" value={testimonial.avatar} onChange={(value) => update({ avatar: value })} />
        <AdminTextarea label="Content" value={testimonial.content} onChange={(value) => update({ content: value })} className="md:col-span-2" />
      </div>
    )}
  />
);

const VideosEditor = ({ content, setContent }: EditorProps) => (
  <CollectionEditor<MediaResource>
    title="Intro & Experience Video Links"
    kicker="YouTube"
    addLabel="Add Video Link"
    itemLabel="Video link"
    items={content.mediaResources}
    setItems={(items) => setContent((current) => ({ ...current, mediaResources: items }))}
    create={() => ({ id: nextId(content.mediaResources), title: "New Video", source: "YouTube", description: "", url: "" })}
    render={(resource, update) => (
      <div className="grid gap-4 md:grid-cols-2">
        <AdminField label="Title" value={resource.title} onChange={(value) => update({ title: value })} />
        <AdminField label="Source" value={resource.source} onChange={(value) => update({ source: value })} />
        <AdminField label="Video / Channel URL" value={resource.url} onChange={(value) => update({ url: value })} className="md:col-span-2" />
        <AdminTextarea label="Description" value={resource.description} onChange={(value) => update({ description: value })} className="md:col-span-2" />
      </div>
    )}
  />
);

const BlogEditor = ({ content, setContent }: EditorProps) => (
  <CollectionEditor<BlogPost>
    title="Blog Notes & Insights"
    kicker="Writing"
    addLabel="Add Blog Post"
    itemLabel="Blog post"
    items={content.blogPosts}
    setItems={(items) => setContent((current) => ({ ...current, blogPosts: items.slice(0, 6) }))}
    create={() => ({ id: nextId(content.blogPosts), title: "New Note", excerpt: "", source: "Website", category: "", date: "Coming soon", readTime: "4 min read", url: "" })}
    render={(post, update) => (
      <div className="grid gap-4 md:grid-cols-2">
        <AdminField label="Title" value={post.title} onChange={(value) => update({ title: value })} />
        <AdminSelect label="Source" value={post.source} options={["Substack", "LinkedIn", "Website"]} onChange={(value) => update({ source: value as BlogPost["source"] })} />
        <AdminField label="Category" value={post.category} onChange={(value) => update({ category: value })} />
        <AdminField label="Date" value={post.date} onChange={(value) => update({ date: value })} />
        <AdminField label="Read Time" value={post.readTime} onChange={(value) => update({ readTime: value })} />
        <AdminField label="URL" value={post.url} onChange={(value) => update({ url: value })} />
        <AdminTextarea label="Excerpt" value={post.excerpt} onChange={(value) => update({ excerpt: value })} className="md:col-span-2" />
      </div>
    )}
  />
);

const SocialEditor = ({ content, setContent }: EditorProps) => (
  <CollectionEditor<SocialLink>
    title="Social Media Links"
    kicker="Links"
    addLabel="Add Social Link"
    itemLabel="Social link"
    items={content.socialLinks}
    setItems={(items) => setContent((current) => ({ ...current, socialLinks: items }))}
    create={() => ({ id: nextId(content.socialLinks), label: "New Link", platform: "website", url: "" })}
    render={(link, update) => (
      <div className="grid gap-4 md:grid-cols-3">
        <AdminField label="Label" value={link.label} onChange={(value) => update({ label: value })} />
        <AdminField label="Platform Key" value={link.platform} onChange={(value) => update({ platform: value })} />
        <AdminField label="URL" value={link.url} onChange={(value) => update({ url: value })} />
      </div>
    )}
  />
);

type CollectionEditorProps<T> = {
  title: string;
  kicker: string;
  addLabel: string;
  itemLabel: string;
  items: T[];
  setItems: (items: T[]) => void;
  create: () => T;
  render: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
};

const CollectionEditor = <T,>({ title, kicker, addLabel, itemLabel, items, setItems, create, render }: CollectionEditorProps<T>) => (
  <Panel title={title} kicker={kicker} action={<AddButton label={addLabel} onClick={() => {
    setItems([...items, create()]);
    toast.success(`${itemLabel} added`, { description: "Draft saved locally. Click Save to publish to Firebase." });
    focusNewestEditor();
  }} />}>
    <SimpleCards items={items} title={(item) => "title" in (item as object) ? String((item as { title: string }).title) : "name" in (item as object) ? String((item as { name: string }).name) : "Item"} onDelete={(index) => {
      setItems(items.filter((_, i) => i !== index));
      toast(`${itemLabel} deleted`);
    }}>
      {(item, index) => render(item, (patch) => setItems(items.map((current, i) => (i === index ? { ...current, ...patch } : current))))}
    </SimpleCards>
  </Panel>
);

const SimpleCards = <T,>({ items, title, onDelete, children }: {
  items: T[];
  title: (item: T) => string;
  onDelete: (index: number) => void;
  children: (item: T, index: number) => ReactNode;
}) => (
  <div className="space-y-4">
    {items.map((item, index) => (
      <Card key={"id" in (item as object) ? `item-${String((item as { id: number }).id)}` : `item-${index}`} title={title(item)} onDelete={() => onDelete(index)}>
        {children(item, index)}
      </Card>
    ))}
  </div>
);

const Panel = ({ title, kicker, action, children }: { title: string; kicker: string; action?: ReactNode; children: ReactNode }) => (
  <div className="rounded-xl border border-white/[0.08] bg-card p-5">
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <p className="font-mono text-sm uppercase tracking-widest text-primary">{kicker}</p>
        <h1 className="mt-2 font-heading text-2xl font-bold">{title}</h1>
      </div>
      <span className="hidden items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary sm:inline-flex">
        <Check size={13} /> Local
      </span>
    </div>
    {action ? <div className="mb-5">{action}</div> : null}
    {children}
  </div>
);

const Card = ({ title, onDelete, children }: { title: string; onDelete: () => void; children: ReactNode }) => (
  <div className="rounded-lg border border-white/[0.07] bg-background/25 p-4">
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="font-heading text-lg font-semibold">{title || "Untitled"}</h2>
      <IconButton label="Delete item" onClick={onDelete} />
    </div>
    {children}
  </div>
);

type AdminFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
};

const AdminField = ({ label, value, onChange, type = "text", className = "" }: AdminFieldProps) => (
  <label className={className}>
    <span className="text-sm text-muted-foreground">{label}</span>
    <input
      data-admin-field
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
              onBlur={() => toast.success("Draft updated", { description: "Click Save to publish to Firebase.", duration: 1400 })}
      className="mt-2 w-full rounded-lg border border-white/[0.08] bg-background/35 px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
    />
  </label>
);

const AdminTextarea = ({ label, value, onChange, className = "" }: Omit<AdminFieldProps, "type">) => (
  <label className={className}>
    <span className="text-sm text-muted-foreground">{label}</span>
    <textarea
      data-admin-field
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={() => toast.success("Draft updated", { description: "Click Save to publish to Firebase.", duration: 1400 })}
      className="mt-2 min-h-28 w-full rounded-lg border border-white/[0.08] bg-background/35 px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
    />
  </label>
);

const AdminSelect = ({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) => (
  <label>
    <span className="text-sm text-muted-foreground">{label}</span>
    <select
      data-admin-field
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={() => toast.success("Draft updated", { description: "Click Save to publish to Firebase.", duration: 1400 })}
      className="mt-2 w-full rounded-lg border border-white/[0.08] bg-background/35 px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
    >
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </label>
);

const AddButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button onClick={onClick} className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">
    <Plus size={15} /> {label}
  </button>
);

const IconButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    title={label}
    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-muted-foreground transition-colors hover:border-destructive/30 hover:text-destructive"
  >
    <Trash2 size={16} />
  </button>
);

export default Admin;
