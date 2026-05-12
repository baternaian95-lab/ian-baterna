import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ArrowUpRight, Briefcase, Sparkles, ExternalLink, FileText, FolderGit2, Wrench, Send, Calendar, Link2, BriefcaseBusiness, Building2, Globe, Sun, Moon } from "lucide-react";
import ianPhoto from "@/assets/ian-baterna.png";
import ianPhotoDark from "@/assets/ian-baterna-dark.jpg";

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return "dark";
  });
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    const t = window.setTimeout(() => root.classList.remove("theme-transition"), 600);
    return () => window.clearTimeout(t);
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

function ThemeToggle({ theme, onToggle }: { theme: "light" | "dark"; onToggle: () => void }) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="relative w-10 h-10 rounded-full border border-border bg-card hover:border-primary/50 hover:text-primary transition-colors duration-300 flex items-center justify-center overflow-hidden group"
    >
      <Sun className={`w-4 h-4 absolute transition-all duration-500 ease-out ${isDark ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`} />
      <Moon className={`w-4 h-4 absolute transition-all duration-500 ease-out ${isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"}`} />
    </button>
  );
}

const RESUME_URL = "https://drive.google.com/file/d/1J0vIVM3MYaZq1ldCUDORgfpVi51m1DPY/view?usp=sharing";

const projects = [
  {
    title: "Sterling International",
    description: "Training & education provider for aged care and disability services. WordPress development, design, and SEO.",
    tags: ["WordPress", "Design", "SEO"],
    url: "https://sterlinginternational.com.au/",
  },
  {
    title: "Momentum College",
    description: "NDIS workforce training college site with funded traineeship pathways, course catalog, and enrolment flows.",
    tags: ["WordPress", "Elementor", "CRM"],
    url: "https://momentumcollege.edu.au/",
  },
  {
    title: "The Marketing Factory",
    description: "Brand and marketing agency portfolio site featuring a dynamic case-study grid and rich media showcase.",
    tags: ["WordPress", "Web Design", "Performance"],
    url: "https://themarketingfactory.com.au/",
  },
  {
    title: "Unicorn CMS",
    description: "Custom compliance management system with secure auth, magic-link login, and Microsoft 365 SSO.",
    tags: ["Full-stack", "Auth", "SaaS"],
    url: "https://unicorn-cms.au/",
  },
];

const skills = [
  "WordPress Development",
  "HTML, CSS, JavaScript",
  "PHP",
  "Elementor Pro",
  "Search Engine Optimization",
  "Yoast SEO",
  "Google Analytics",
  "Google Developer Console",
  "Web Design",
  "Web Management",
  "Supabase Backend",
  "Firebase Studio",
  "Lovable.dev",
  "SiteGround",
  "Microsoft Apps",
  "GitHub",
  "Netlify",
  "Divi Theme",
  "Stripe",
  "aXcelerate",
  "Canva",
];

const employment = [
  {
    period: "2022 — 2026",
    role: "Website Developer",
    company: "Vivacity",
    bullets: [
      "Contributed to IT support and web solutions by developing and maintaining internal and client-facing systems.",
      "Built a custom CRM web application that improved task management and workflow efficiency for the team.",
      "Managed and enhanced WordPress websites — landing pages, blog content, and payment pages — with a focus on SEO and performance.",
      "Supported external users for a smooth platform experience and handled backend database maintenance for security and stability.",
    ],
  },
  {
    period: "2019 — 2021",
    role: "WordPress Developer",
    company: "Onlinejobs.PH",
    bullets: [
      "Delivered high-quality WordPress websites for clients, including e-learning and eCommerce platforms.",
      "Built with Divi, Elementor, plugins, CRM integrations, and custom code in HTML, CSS, JavaScript, and PHP.",
      "Improved website performance and user experience while delivering scalable solutions aligned with business goals.",
      "Handled website maintenance, landing pages, and SEO strategies to support client growth.",
    ],
  },
];

const NAV_ITEMS = [
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "work", label: "Work", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "contact", label: "Contact", icon: Send },
];

function NavMenu({ scrollTo }: { scrollTo: (id: string) => (e: React.MouseEvent) => void }) {
  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const navRect = navRef.current?.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    if (!navRect) return;
    setIndicator({ left: rect.left - navRect.left + rect.width / 2, width: rect.width, opacity: 1 });
  };

  const handleLeave = () => setIndicator((p) => ({ ...p, opacity: 0 }));

  return (
    <nav
      ref={navRef}
      onMouseLeave={handleLeave}
      className="hidden md:flex relative items-center gap-8 text-sm text-muted-foreground h-16"
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={scrollTo(item.id)}
            onMouseEnter={handleEnter}
            className="group relative flex items-center gap-2 h-full cursor-pointer"
          >
            <Icon className="w-4 h-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:text-primary" />
            <span className="inline-block transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:text-primary">{item.label}</span>
          </a>
        );
      })}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-1 w-2 h-2 bg-primary rounded-full transition-all duration-300 ease-out -translate-x-1/2"
        style={{
          left: indicator.left,
          opacity: indicator.opacity,
        }}
      />
    </nav>
  );
}

export default function Portfolio() {
  const { theme, toggle } = useTheme();
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" onClick={scrollTo("top")} className="font-display font-bold text-lg tracking-tight cursor-pointer">
            Ian<span className="text-primary">.</span>
          </a>
          <NavMenu scrollTo={scrollTo} />

          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={toggle} />
            <Button asChild className="rounded-full group">
              <a href="mailto:baternaian95@gmail.com">
                Get in touch <ArrowUpRight className="w-4 h-4 ml-1 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:scale-110" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-32 md:pb-32 relative">
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs text-muted-foreground mb-6">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Available for new projects
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
                Hi, I'm Ian.<br />
                I build <span className="text-primary">websites</span>.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
                Website Developer with 5+ years of experience across full-stack development,
                WordPress, SEO, and system integration — crafting user-centered experiences that drive real results.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full" onClick={scrollTo("work")}>
                  View my work
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full group">
                  <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-1 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110" /> View Resume
                  </a>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" /> Central Visayas, PH</span>
                <a href="mailto:baternaian95@gmail.com" className="inline-flex items-center gap-2 hover:text-foreground"><Mail className="w-4 h-4" /> baternaian95@gmail.com</a>
                <a href="tel:+639684044242" className="inline-flex items-center gap-2 hover:text-foreground"><Phone className="w-4 h-4" /> +63 968 404 4242</a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative justify-self-center md:justify-self-end"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-transparent rounded-[2rem] blur-2xl" />
              <div className="relative w-64 h-80 md:w-80 md:h-[26rem] rounded-[2rem] overflow-hidden border-4 border-card shadow-2xl bg-gradient-to-br from-primary/20 via-muted to-card flex items-end justify-center">
                <img src={ianPhoto} alt="Ian Baterna" className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-out ${theme === "dark" ? "opacity-0" : "opacity-100"}`} />
                <img src={ianPhotoDark} alt="" aria-hidden="true" className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-out ${theme === "dark" ? "opacity-100" : "opacity-0"}`} />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card border border-border shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold">5+ years</div>
                  <div className="text-xs text-muted-foreground">building the web</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="text-sm uppercase tracking-widest text-primary font-semibold">Employment</div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Where I've worked</h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              Five plus years building and maintaining sites and<br className="hidden md:inline" />
              {" "}tools across web development, SEO, and integrations.
            </p>
          </div>

          <div className="space-y-6">
            {employment.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-card border border-border rounded-3xl p-8 md:p-10 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display font-bold" style={{ fontSize: '23px' }}>
                      {job.role} <span className="inline-flex items-center gap-1.5 text-primary align-middle" style={{ fontSize: '16px' }}>· <Building2 className="w-4 h-4" />{job.company}</span>
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide">
                      <Calendar className="w-3.5 h-3.5" />
                      {job.period}
                    </span>
                  </div>
                  <div className="h-px w-full bg-border" />
                  <ul className="space-y-3">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-muted-foreground leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-20 border-t border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="text-sm uppercase tracking-widest text-primary font-semibold">Selected Work</div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Recent projects</h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              A handful of websites and platforms I've built and maintained for clients across training, marketing, and SaaS.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <motion.a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-card border border-border rounded-3xl p-8 hover:shadow-xl hover:border-primary/40 transition-[box-shadow,border-color,color] duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display font-bold group-hover:text-primary transition" style={{ fontSize: '23px' }}>
                    {p.title}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition flex-shrink-0 mt-1" />
                </div>
                <p className="mt-3 text-muted-foreground leading-relaxed">{p.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-card border border-border text-xs font-medium text-muted-foreground transition-colors duration-300 hover:border-primary hover:text-primary">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-muted-foreground group-hover:text-primary transition" style={{ fontSize: '15px' }}>
                  <Link2 className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-sm uppercase tracking-widest text-primary font-semibold">Skills</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Tools & technologies</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                className="px-5 py-2.5 rounded-full bg-card border border-border text-sm font-medium hover:border-primary hover:text-primary transition-colors duration-300 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative overflow-hidden py-24 border-t border-border bg-foreground text-background">
        <div className="absolute inset-0 pointer-events-none hidden dark:block">
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-32 w-[520px] h-[520px] rounded-full bg-primary/15 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            Let's build something great.
          </h2>
          <p className="mt-6 text-lg opacity-70 max-w-xl mx-auto">
            Have a project in mind, or just want to say hello? My inbox is always open.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground group">
              <a href="mailto:baternaian95@gmail.com">
                <Mail className="w-4 h-4 mr-2 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110" /> baternaian95@gmail.com
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent border-background/30 text-background hover:bg-background hover:text-foreground group">
              <a href="tel:+639684044242">
                <Phone className="w-4 h-4 mr-2 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110" /> +63 968 404 4242
              </a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Ian Baterna · Website Developer
      </footer>
    </div>
  );
}
