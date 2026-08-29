import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import {
  Menu,
  X,
  FileText,
  ExternalLink,
  Search,
  User,
  GraduationCap,
  MapPin,
  Database,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Button from "./components/Button";
import { useLiquidGlass } from "./hooks/useLiquidGlass";

const RESUME_URL = "https://drive.google.com/file/d/1-1WU6cFsLirmsw_ofJd9caE2BrMiznUI/view?usp=sharing";

function RevealSection({
  tilt,
  reduceMotion,
  children
}: {
  tilt: number;
  reduceMotion: boolean | null;
  children: ReactNode;
}) {
  if (reduceMotion) return <div>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, rotateX: tilt }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1000px" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const appContainerRef = useRef<HTMLDivElement>(null);

  // Initialize WebGL Liquid Glass Shader Engine
  useLiquidGlass(appContainerRef, ".liquid-glass-refract", {
    blurAmount: 0.25,
    refraction: 0.75,
    chromAberration: 0.08,
    edgeHighlight: 0.12,
    cornerRadius: 32,
    zRadius: 36,
    shadowOpacity: 0.25
  });

  const handleOpenResume = () => {
    window.open(RESUME_URL, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      const sections = ["hero", "skills", "projects", "certifications", "education", "contact"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const drawer = drawerRef.current;
    const focusables = drawer?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
    );
    focusables?.[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || !focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      (previouslyFocused ?? menuToggleRef.current)?.focus();
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    scrollToSection(id);
    history.replaceState(null, "", `#${id}`);
  };

  const navItems = [
    { id: "skills", label: "Skills", delay: "100ms" },
    { id: "projects", label: "Projects", delay: "150ms" },
    { id: "certifications", label: "Certificates", delay: "200ms" },
    { id: "education", label: "Education", delay: "250ms" },
    { id: "contact", label: "Contact", delay: "300ms" }
  ];

  const firstName = "Anish".split("");
  const lastName = "Yadav".split("");

  const nameContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      rotateX: -60,
      scale: 0.85,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 120
      }
    }
  };

  return (
    <div
      ref={appContainerRef}
      className="min-h-screen text-slate-900 selection:bg-blue-200 selection:text-blue-900 font-sans relative overflow-x-hidden"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-slate-900 focus:text-white focus:font-mono focus:text-sm focus:font-bold shadow-lg"
      >
        Skip to main content
      </a>

      {/* Cinematic Loop Background Video - Persistently Visible Full Site */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-screen h-screen object-cover z-0 pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4"
      />

      {/* Subtle Ambient Glass Tint Layer (Allows continuous video visibility) */}
      <div className="fixed inset-0 w-full h-full bg-slate-950/10 pointer-events-none z-1" />

      {/* Top Scroll Progress Indicator */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 z-50 transition-all duration-100 shadow-xs"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Liquid Glass Navbar */}
      <header className="fixed top-3 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 flex justify-center">
        <nav
          aria-label="Main navigation"
          className="w-full max-w-7xl h-16 md:h-18 liquid-glass-nav rounded-full px-5 sm:px-8 flex items-center justify-between shadow-lg border border-white/60"
        >
          {/* Logo Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="font-mono text-base md:text-lg font-extrabold tracking-wider text-slate-900 hover:text-blue-600 transition cursor-pointer select-none flex items-center space-x-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <span>ANISH YADAV</span>
          </a>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center space-x-2 bg-white/40 p-1.5 rounded-full border border-white/50 backdrop-blur-md">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={activeSection === item.id ? "true" : undefined}
                className={`text-xs font-mono tracking-wider px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? "bg-white text-blue-600 font-bold shadow-xs scale-105"
                    : "text-slate-700 hover:text-slate-950 hover:bg-white/50"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Top Actions Section */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Search Pill */}
            <Button
              variant="glass"
              size="sm"
              className="liquid-glass-refract px-4 py-2 flex items-center space-x-2 shadow-xs"
              onClick={() => scrollToSection("skills")}
              title="Search Portfolio"
            >
              <Search size={15} className="text-slate-700" />
              <span className="text-xs font-mono font-semibold tracking-wide text-slate-800">Search</span>
            </Button>

            {/* Profile Button */}
            <Button
              variant="glass"
              size="sm"
              className="w-9 h-9 rounded-full liquid-glass-refract p-0 flex items-center justify-center shadow-xs"
              onClick={() => scrollToSection("contact")}
              title="View Profile & Contact"
            >
              <User size={16} className="text-slate-700" />
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <Button
            ref={menuToggleRef}
            variant="glass"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-full p-0 flex items-center justify-center shadow-xs"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <X
                size={18}
                className={`absolute transition-all duration-300 ease-out text-slate-900 ${
                  isMobileMenuOpen ? "rotate-0 opacity-100 scale-100" : "rotate-180 opacity-0 scale-50"
                }`}
              />
              <Menu
                size={18}
                className={`absolute transition-all duration-300 ease-out text-slate-900 ${
                  isMobileMenuOpen ? "-rotate-180 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"
                }`}
              />
            </div>
          </Button>
        </nav>
      </header>

      {/* Mobile Drawer Overlay Menu */}
      <div
        id="mobile-menu"
        ref={drawerRef}
        className={`fixed left-4 right-4 top-20 z-40 p-5 rounded-3xl liquid-glass-card shadow-2xl transition-all duration-400 ease-out lg:hidden ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-6 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-2">
          {navItems.map((item, idx) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                handleNavClick(e, item.id);
                setIsMobileMenuOpen(false);
              }}
              className="py-3 px-4 rounded-2xl hover:bg-white/80 font-mono text-sm text-slate-800 hover:text-blue-600 transition-all duration-200 font-semibold"
              style={{
                transitionDelay: `${idx * 40}ms`,
                transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-12px)"
              }}
            >
              {item.label}
            </a>
          ))}

          {/* Mobile Buttons */}
          <div className="sm:hidden pt-4 mt-2 border-t border-slate-200/80 flex items-center justify-between">
            <Button
              variant="glass"
              size="sm"
              className="px-4 py-2 flex items-center space-x-2"
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToSection("skills");
              }}
            >
              <Search size={16} className="text-slate-700" />
              <span className="text-xs font-mono font-semibold text-slate-800">Search Skills</span>
            </Button>

            <Button
              variant="glass"
              size="sm"
              className="w-10 h-10 rounded-full p-0 flex items-center justify-center"
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToSection("contact");
              }}
            >
              <User size={18} className="text-slate-700" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main id="main-content" className="relative z-10">
        
        {/* Full-Viewport Landing Hero Section */}
        <section
          id="hero"
          className="min-h-screen w-full relative flex flex-col justify-center sm:justify-end px-4 sm:px-6 md:px-12 pt-28 pb-12 md:pb-20"
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            
            {/* Left Column: Bio Details & Primary Actions */}
            <div className="flex-1 flex flex-col items-start text-left max-w-3xl">
              
              {/* Metadata Liquid Glass Badges */}
              <div
                className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 md:mb-8 text-xs font-mono animate-blur-fade-up"
                style={{ animationDelay: "200ms" }}
              >
                <div className="flex items-center space-x-2 liquid-glass-pill px-4 py-1.5 rounded-full shadow-xs">
                  <GraduationCap size={15} className="text-blue-600" />
                  <span className="font-semibold uppercase tracking-wider text-xs text-slate-800">VIT Bhopal University</span>
                </div>
                <div className="flex items-center space-x-2 liquid-glass-pill px-4 py-1.5 rounded-full shadow-xs">
                  <MapPin size={15} className="text-emerald-600" />
                  <span className="uppercase tracking-wider text-xs font-semibold text-slate-800">Haryana, India</span>
                </div>
                <div className="flex items-center space-x-2 liquid-glass-pill px-4 py-1.5 rounded-full shadow-xs">
                  <Database size={15} className="text-purple-600" />
                  <span className="uppercase tracking-wider text-xs font-semibold text-slate-800">AI & ML Specialization</span>
                </div>
              </div>

              {/* Title Header with Staggered Split Letters */}
              <motion.div
                className="mb-4 md:mb-6 perspective-1000 animate-blur-fade-up"
                style={{ animationDelay: "300ms" }}
                variants={nameContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <h1
                  aria-label="Anish Yadav"
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-slate-950 leading-none select-none flex flex-wrap gap-x-4 sm:gap-x-6 drop-shadow-xs"
                >
                  {/* First Name: Anish */}
                  <span className="inline-flex space-x-0.5 sm:space-x-1" aria-hidden="true">
                    {firstName.map((char, index) => (
                      <motion.span
                        key={`first-${index}`}
                        variants={letterVariants}
                        whileHover={{
                          y: -6,
                          scale: 1.12,
                          color: "#2563eb",
                          transition: { duration: 0.15 }
                        }}
                        className="inline-block transform-gpu cursor-pointer transition-colors"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>

                  {/* Last Name: Yadav */}
                  <span
                    className="inline-flex space-x-0.5 sm:space-x-1 font-serif italic text-blue-600 font-medium"
                    aria-hidden="true"
                  >
                    {lastName.map((char, index) => (
                      <motion.span
                        key={`last-${index}`}
                        variants={letterVariants}
                        whileHover={{
                          y: -6,
                          scale: 1.12,
                          color: "#1d4ed8",
                          transition: { duration: 0.15 }
                        }}
                        className="inline-block transform-gpu cursor-pointer transition-colors"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                </h1>
              </motion.div>

              {/* Tagline Bio Description in Translucent Liquid Card */}
              <div
                className="liquid-glass-card rounded-2xl p-5 sm:p-6 mb-6 md:mb-10 max-w-2xl animate-blur-fade-up shadow-md border border-white/70"
                style={{ animationDelay: "400ms" }}
              >
                <p className="text-base sm:text-lg text-slate-800 font-sans leading-relaxed">
                  AI & Machine Learning engineer and web developer. Building intelligent computer-vision pipelines, high-accuracy deep neural architectures, and high-performance web applications.
                </p>
              </div>

              {/* Call-to-Action Action Buttons */}
              <div
                className="flex flex-wrap items-center gap-3 sm:gap-4 animate-blur-fade-up"
                style={{ animationDelay: "500ms" }}
              >
                <Button
                  onClick={handleOpenResume}
                  variant="primary"
                  size="lg"
                  className="liquid-glass-refract rounded-full px-7 py-3.5 flex items-center space-x-2.5 text-xs font-mono font-bold tracking-wider shadow-lg hover:shadow-xl bg-slate-950/90 hover:bg-slate-900 border border-slate-700/80 text-white"
                  data-config={JSON.stringify({ button: true, cornerRadius: 28, blurAmount: 0.2 })}
                >
                  <FileText className="w-4 h-4 text-blue-400" aria-hidden="true" />
                  <span>View Resume</span>
                  <ExternalLink className="w-4 h-4 text-white/80" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </Button>

                <Button
                  onClick={() => scrollToSection("contact")}
                  variant="glass"
                  size="lg"
                  className="liquid-glass-refract rounded-full px-7 py-3.5 text-xs font-mono font-bold tracking-wider shadow-md hover:shadow-lg"
                  data-config={JSON.stringify({ button: true, cornerRadius: 28, blurAmount: 0.25 })}
                >
                  <span>Contact Me</span>
                </Button>
              </div>
            </div>

            {/* Right Column: Interactive Liquid Glass Status Lens */}
            <div
              className="hidden md:flex flex-col items-end animate-blur-fade-up"
              style={{ animationDelay: "600ms" }}
            >
              <div
                className="liquid-glass-card liquid-glass-refract rounded-3xl p-6 flex flex-col space-y-3 max-w-xs shadow-xl border border-white/80"
                data-config={JSON.stringify({
                  cornerRadius: 32,
                  zRadius: 32,
                  refraction: 0.9,
                  blurAmount: 0.2,
                  chromAberration: 0.1
                })}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">Available</span>
                  </div>
                  <Sparkles size={16} className="text-blue-600" />
                </div>
                <p className="text-xs text-slate-700 font-sans leading-relaxed">
                  Open for AI/ML engineering internships, research roles, and creative web development projects.
                </p>
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>SPECIALTY</span>
                  <span className="font-semibold text-slate-800">PyTorch & WebGL</span>
                </div>
              </div>

              {/* Scroll down indicator */}
              <button
                onClick={() => scrollToSection("skills")}
                className="mt-6 flex items-center space-x-2 text-xs font-mono text-slate-600 hover:text-blue-600 transition cursor-pointer"
              >
                <span>Scroll to explore</span>
                <ChevronDown size={14} className="animate-bounce" />
              </button>
            </div>

          </div>
        </section>

        {/* Scrollable Portfolio Subsections */}
        <RevealSection tilt={-4} reduceMotion={prefersReducedMotion}>
          <Skills />
        </RevealSection>

        <RevealSection tilt={4} reduceMotion={prefersReducedMotion}>
          <Projects />
        </RevealSection>

        <RevealSection tilt={-4} reduceMotion={prefersReducedMotion}>
          <Certifications />
        </RevealSection>

        <RevealSection tilt={4} reduceMotion={prefersReducedMotion}>
          <Education />
        </RevealSection>

        <RevealSection tilt={-4} reduceMotion={prefersReducedMotion}>
          <Contact />
        </RevealSection>
      </main>

      {/* Floating Liquid Glass Footer */}
      <footer className="py-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto liquid-glass-card rounded-3xl p-8 shadow-xl border border-white/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left font-mono">
            <p className="text-xs text-slate-700">
              &copy; {new Date().getFullYear()} &mdash; Designed & Developed by <span className="text-slate-950 font-bold">Anish Yadav</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              B.Tech in Computer Science (Artificial Intelligence & Machine Learning) &bull; VIT Bhopal
            </p>
          </div>

          <div className="flex space-x-6 text-xs font-mono text-slate-700">
            <a href="mailto:anishyadav872004@gmail.com" className="hover:text-blue-600 transition font-semibold">Mail</a>
            <a href="https://github.com/ANISHYADAV19" target="_blank" referrerPolicy="no-referrer" rel="noreferrer" className="hover:text-blue-600 transition font-semibold">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href="https://www.linkedin.com/in/anish-yadav-dev/" target="_blank" referrerPolicy="no-referrer" rel="noreferrer" className="hover:text-blue-600 transition font-semibold">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
