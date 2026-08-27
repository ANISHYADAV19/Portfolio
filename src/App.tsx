import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Menu, X, ChevronRight, FileText, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Background3D from "./components/Background3D";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Button from "./components/Button";

const RESUME_URL = "https://drive.google.com/file/d/1-1WU6cFsLirmsw_ofJd9caE2BrMiznUI/view?usp=sharing";

// Scroll-reveal wrapper. Renders a plain div when the visitor has asked for
// reduced motion, so content is simply present instead of animating in.
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
      initial={{ opacity: 0, y: 40, rotateX: tilt }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
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

  // Direct Resume Link Handler (opens Google Drive link in a new tab)
  const handleOpenResume = () => {
    window.open(RESUME_URL, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    // Tracking scroll progress & current active section
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

  // Mobile drawer: lock scroll, close on Escape, trap focus, restore focus on close
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

  // Anchor links stay real links (shareable, middle-clickable); we only intercept
  // the left-click to keep the smooth scroll.
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    scrollToSection(id);
    history.replaceState(null, "", `#${id}`);
  };

  const navItems = [
    { id: "hero", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certificates" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 selection:bg-cyber-blue selection:text-dark-bg font-sans relative overflow-x-hidden">

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-cyber-blue focus:text-dark-bg focus:font-mono focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Interactive 3D WebGL Background Canvas */}
      <Background3D activeSection={activeSection} scrollProgress={scrollProgress} />

      {/* Top Scroll Progress indicator */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Futuristic Navbar */}
      <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 h-16 bg-dark-bg/80 backdrop-blur-md border-b border-white/10 z-40 px-6">
        <div className="h-full w-full max-w-6xl mx-auto flex items-center justify-between">

          {/* Logo Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="flex items-center space-x-2.5 group cursor-pointer"
            aria-label="Anish Yadav — back to top"
          >
            <div className="w-8 h-8 rounded overflow-hidden flex items-center justify-center border border-white/10 shadow-lg shadow-cyber-blue/20 group-hover:border-cyber-blue/50 transition-all duration-300">
              <img
                src="/logo.jpg"
                alt=""
                width={32}
                height={32}
                aria-hidden="true"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left font-mono">
              <span className="text-white font-semibold text-sm group-hover:text-cyber-blue transition">Anish Yadav</span>
            </div>
          </a>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={activeSection === item.id ? "true" : undefined}
                className={`text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeSection === item.id
                    ? "text-cyber-blue font-semibold scale-105"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Top Resume CTA */}
          <div className="hidden md:flex items-center text-[11px] font-mono text-gray-500">
            <Button
              onClick={handleOpenResume}
              variant="primary"
              size="sm"
              title="View Resume"
            >
              <FileText className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              <span>Resume</span>
              <ExternalLink className="w-3 h-3 text-white/80" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            ref={menuToggleRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white cursor-pointer"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 top-16 bg-dark-bg/95 backdrop-blur-lg z-35 flex flex-col p-6 border-b border-white/10 lg:hidden"
        >
          <div className="flex flex-col space-y-5 pt-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={activeSection === item.id ? "true" : undefined}
                className={`text-left text-lg font-mono tracking-wide py-2 border-b border-white/10 flex items-center justify-between cursor-pointer ${
                  activeSection === item.id ? "text-cyber-blue font-semibold" : "text-gray-400"
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-gray-600" aria-hidden="true" />
              </a>
            ))}

            {/* Mobile Resume CTA */}
            <Button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleOpenResume();
              }}
              variant="primary"
              size="lg"
              className="w-full mt-2"
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span>Resume</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </Button>

            {/* Mobile system status metadata */}
            <div className="pt-8 text-xs font-mono text-gray-500">
              <p>📍 Location: Mahendragarh, Haryana, India</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Sections Body with 3D Spatial Transitions */}
      <main id="main-content" className="relative z-10">
        <Hero
          onScrollToContact={() => scrollToSection("contact")}
          onScrollToProjects={() => scrollToSection("projects")}
          onOpenResume={handleOpenResume}
        />

        {/* 3D Section Transition Dividers */}
        <RevealSection tilt={-10} reduceMotion={prefersReducedMotion}>
          <Skills />
        </RevealSection>

        <RevealSection tilt={10} reduceMotion={prefersReducedMotion}>
          <Projects />
        </RevealSection>

        <RevealSection tilt={-10} reduceMotion={prefersReducedMotion}>
          <Certifications />
        </RevealSection>

        <RevealSection tilt={10} reduceMotion={prefersReducedMotion}>
          <Education />
        </RevealSection>

        <RevealSection tilt={-10} reduceMotion={prefersReducedMotion}>
          <Contact />
        </RevealSection>
      </main>

      {/* Clean high-contrast futuristic Footer */}
      <footer className="bg-dark-bg border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left font-mono">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} &mdash; Developed by <span className="text-white font-bold">Anish</span>
            </p>
            <p className="text-[10px] text-gray-500 mt-1">
              B.Tech in Computer Science (Artificial Intelligence & Machine Learning)
            </p>
          </div>

          <div className="flex space-x-6 text-xs font-mono text-gray-500">
            <a href="mailto:anishyadav872004@gmail.com" className="hover:text-cyber-blue transition">Mail</a>
            <a href="https://github.com/ANISHYADAV19" target="_blank" referrerPolicy="no-referrer" rel="noreferrer" className="hover:text-cyber-blue transition">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href="https://www.linkedin.com/in/anish-yadav-dev/" target="_blank" referrerPolicy="no-referrer" rel="noreferrer" className="hover:text-cyber-blue transition">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
