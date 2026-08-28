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
  Database
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Button from "./components/Button";

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
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans relative overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-slate-900 focus:text-white focus:font-mono focus:text-sm focus:font-bold shadow-lg"
      >
        Skip to main content
      </a>

      {/* Ambient Luminous Background Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-indigo-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      </div>

      {/* Top Scroll Progress indicator */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 z-50 transition-all duration-100 shadow-xs"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Glass Navbar */}
      <nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 h-16 md:h-20 bg-white/85 backdrop-blur-md border-b border-slate-200/80 z-50 px-4 sm:px-6 md:px-12 flex items-center shadow-xs"
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="font-mono text-base md:text-lg font-bold tracking-wider text-slate-900 hover:text-blue-600 transition cursor-pointer select-none animate-blur-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            ANISH YADAV
          </a>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={activeSection === item.id ? "true" : undefined}
                className={`text-xs font-mono tracking-wider transition-all cursor-pointer animate-blur-fade-up ${
                  activeSection === item.id
                    ? "text-blue-600 font-bold scale-105"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                style={{ animationDelay: item.delay }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Top Actions Section */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Search Pill */}
            <Button
              variant="ghost"
              className="rounded-full liquid-glass px-4 py-2 flex items-center space-x-2 animate-blur-fade-up"
              style={{ animationDelay: "350ms" }}
              onClick={() => scrollToSection("skills")}
              title="Search Portfolio"
            >
              <Search size={18} className="text-slate-600" />
              <span className="text-xs font-mono font-medium tracking-wide text-slate-700">Search</span>
            </Button>

            {/* Profile Button */}
            <Button
              variant="ghost"
              className="w-10 h-10 rounded-full liquid-glass p-0 flex items-center justify-center animate-blur-fade-up"
              style={{ animationDelay: "400ms" }}
              onClick={() => scrollToSection("contact")}
              title="View Profile Info"
            >
              <User size={18} className="text-slate-600" />
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <Button
            ref={menuToggleRef}
            variant="ghost"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-full liquid-glass p-0 flex items-center justify-center animate-blur-fade-up"
            style={{ animationDelay: "350ms" }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <X
                size={18}
                className={`absolute transition-all duration-500 ease-out text-slate-900 ${
                  isMobileMenuOpen ? "rotate-0 opacity-100 scale-100" : "rotate-180 opacity-0 scale-50"
                }`}
              />
              <Menu
                size={18}
                className={`absolute transition-all duration-500 ease-out text-slate-900 ${
                  isMobileMenuOpen ? "-rotate-180 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"
                }`}
              />
            </div>
          </Button>
        </div>
      </nav>

      {/* Mobile drawer overlay menu */}
      <div
        id="mobile-menu"
        ref={drawerRef}
        className={`fixed left-0 right-0 top-[64px] md:top-[80px] z-40 p-5 border-t border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-2xl transition-all duration-500 ease-out lg:hidden ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-4 opacity-0 pointer-events-none"
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
              className="py-3 px-4 rounded-xl hover:bg-slate-100 font-mono text-sm text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium"
              style={{
                transitionDelay: `${idx * 50}ms`,
                transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-16px)"
              }}
            >
              {item.label}
            </a>
          ))}

          {/* Mobile buttons below sm breakpoint */}
          <div className="sm:hidden pt-4 mt-2 border-t border-slate-200 flex items-center justify-between">
            <Button
              variant="ghost"
              className="rounded-full liquid-glass px-4 py-2 flex items-center space-x-2"
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToSection("skills");
              }}
            >
              <Search size={18} className="text-slate-600" />
              <span className="text-xs font-mono font-medium text-slate-700">Search</span>
            </Button>

            <Button
              variant="ghost"
              className="w-10 h-10 rounded-full liquid-glass p-0 flex items-center justify-center"
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToSection("contact");
              }}
            >
              <User size={18} className="text-slate-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main id="main-content" className="relative z-10">
        
        {/* Full-Viewport Landing Hero Section */}
        <section
          id="hero"
          className="min-h-screen w-full relative flex flex-col justify-center sm:justify-end px-4 sm:px-6 md:px-12 pt-24 pb-12 md:pb-20"
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            {/* Left Column: Bio Details & Primary Actions */}
            <div className="flex-1 flex flex-col items-start text-left max-w-3xl">
              
              {/* Metadata Row */}
              <div
                className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-6 md:mb-8 text-xs sm:text-sm text-slate-700 font-mono animate-blur-fade-up"
                style={{ animationDelay: "300ms" }}
              >
                <div className="flex items-center space-x-2 bg-white/90 border border-slate-200/90 shadow-xs px-3.5 py-1.5 rounded-full">
                  <GraduationCap size={16} className="text-blue-600" />
                  <span className="font-semibold uppercase tracking-wider text-xs">VIT Bhopal University</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/90 border border-slate-200/90 shadow-xs px-3.5 py-1.5 rounded-full">
                  <MapPin size={16} className="text-emerald-600" />
                  <span className="uppercase tracking-wider text-xs font-semibold">Haryana, India</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/90 border border-slate-200/90 shadow-xs px-3.5 py-1.5 rounded-full">
                  <Database size={16} className="text-purple-600" />
                  <span className="uppercase tracking-wider text-xs font-semibold">AI & ML Specialization</span>
                </div>
              </div>

              {/* Title Header with Staggered Split Letters */}
              <motion.div
                className="mb-4 md:mb-6 perspective-1000 animate-blur-fade-up"
                style={{ animationDelay: "400ms" }}
                variants={nameContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <h1
                  aria-label="Anish Yadav"
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-slate-950 leading-none select-none flex flex-wrap gap-x-4 sm:gap-x-6"
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

              {/* Tagline Bio Description */}
              <p
                className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 md:mb-12 max-w-2xl font-sans leading-relaxed animate-blur-fade-up"
                style={{ animationDelay: "500ms" }}
              >
                AI & Machine Learning student and web developer based in India. Passionate about building intelligent,
                computer-vision enabled systems, high-accuracy neural architectures, and responsive web applications.
              </p>

              {/* Call-to-Action Action Buttons */}
              <div
                className="flex flex-wrap gap-3 sm:gap-4 animate-blur-fade-up"
                style={{ animationDelay: "600ms" }}
              >
                <Button
                  onClick={handleOpenResume}
                  variant="primary"
                  className="bg-slate-900 text-white hover:bg-slate-800 border-none rounded-full px-6 sm:px-8 py-2.5 sm:py-3 flex items-center space-x-2.5 text-xs font-mono font-bold tracking-wider shadow-md hover:shadow-lg"
                >
                  <FileText className="w-4 h-4 text-white" aria-hidden="true" />
                  <span>Resume</span>
                  <ExternalLink className="w-4 h-4 text-white/80" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </Button>

                <Button
                  onClick={() => scrollToSection("contact")}
                  variant="ghost"
                  className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-xs font-mono font-bold tracking-wider bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 shadow-xs"
                  style={{ animationDelay: "700ms" }}
                >
                  <span>Contact Me</span>
                </Button>
              </div>
            </div>

          </div>
        </section>

        {/* Scrollable Portfolio Subsections */}
        <RevealSection tilt={-6} reduceMotion={prefersReducedMotion}>
          <Skills />
        </RevealSection>

        <RevealSection tilt={6} reduceMotion={prefersReducedMotion}>
          <Projects />
        </RevealSection>

        <RevealSection tilt={-6} reduceMotion={prefersReducedMotion}>
          <Certifications />
        </RevealSection>

        <RevealSection tilt={6} reduceMotion={prefersReducedMotion}>
          <Education />
        </RevealSection>

        <RevealSection tilt={-6} reduceMotion={prefersReducedMotion}>
          <Contact />
        </RevealSection>
      </main>

      {/* Clean Light Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left font-mono">
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} &mdash; Developed by <span className="text-slate-900 font-bold">Anish</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              B.Tech in Computer Science (Artificial Intelligence & Machine Learning)
            </p>
          </div>

          <div className="flex space-x-6 text-xs font-mono text-slate-500">
            <a href="mailto:anishyadav872004@gmail.com" className="hover:text-blue-600 transition font-medium">Mail</a>
            <a href="https://github.com/ANISHYADAV19" target="_blank" referrerPolicy="no-referrer" rel="noreferrer" className="hover:text-blue-600 transition font-medium">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href="https://www.linkedin.com/in/anish-yadav-dev/" target="_blank" referrerPolicy="no-referrer" rel="noreferrer" className="hover:text-blue-600 transition font-medium">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
