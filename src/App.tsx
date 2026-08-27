import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import {
  Menu,
  X,
  ChevronRight,
  FileText,
  ExternalLink,
  Search,
  User,
  GraduationCap,
  MapPin,
  Database,
  ChevronLeft,
  ArrowDown
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
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
      y: 45,
      rotateX: -80,
      scale: 0.8,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 110
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 selection:bg-cyber-blue selection:text-dark-bg font-sans relative overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-cyber-blue focus:text-dark-bg focus:font-mono focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Cinematic Loop Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-screen h-screen object-cover z-0 pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4"
      />

      {/* Bottom Blur Overlay Mask */}
      <div className="fixed inset-0 w-full h-full backdrop-blur-xl bottom-blur-overlay pointer-events-none z-1" />

      {/* Top Scroll Progress indicator */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Cinematic Glass Navbar */}
      <nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 h-16 md:h-20 bg-black/30 backdrop-blur-md border-b border-white/5 z-50 px-4 sm:px-6 md:px-12 flex items-center"
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="font-mono text-base md:text-lg font-bold tracking-wider text-white hover:text-cyber-blue transition cursor-pointer select-none animate-blur-fade-up"
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
                    ? "text-cyber-blue font-semibold scale-105"
                    : "text-gray-300 hover:text-white"
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
              <Search size={18} className="text-gray-300" />
              <span className="text-xs font-mono font-medium tracking-wide">Search</span>
            </Button>

            {/* Profile Button */}
            <Button
              variant="ghost"
              className="w-10 h-10 rounded-full liquid-glass p-0 flex items-center justify-center animate-blur-fade-up"
              style={{ animationDelay: "400ms" }}
              onClick={() => scrollToSection("contact")}
              title="View Profile Info"
            >
              <User size={18} className="text-gray-300" />
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
                className={`absolute transition-all duration-500 ease-out ${
                  isMobileMenuOpen ? "rotate-0 opacity-100 scale-100" : "rotate-180 opacity-0 scale-50"
                }`}
              />
              <Menu
                size={18}
                className={`absolute transition-all duration-500 ease-out ${
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
        className={`fixed left-0 right-0 top-[64px] md:top-[80px] z-40 p-5 border-t border-b border-gray-800 bg-gray-950/95 backdrop-blur-xl shadow-2xl transition-all duration-500 ease-out lg:hidden ${
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
              className="py-3 px-4 rounded-lg hover:bg-gray-800/40 font-mono text-sm text-gray-300 hover:text-white transition-all duration-300"
              style={{
                transitionDelay: `${idx * 50}ms`,
                transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-16px)"
              }}
            >
              {item.label}
            </a>
          ))}

          {/* Mobile buttons below sm breakpoint */}
          <div className="sm:hidden pt-4 mt-2 border-t border-gray-800 flex items-center justify-between">
            <Button
              variant="ghost"
              className="rounded-full liquid-glass px-4 py-2 flex items-center space-x-2"
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToSection("skills");
              }}
            >
              <Search size={18} className="text-gray-300" />
              <span className="text-xs font-mono font-medium">Search</span>
            </Button>

            <Button
              variant="ghost"
              className="w-10 h-10 rounded-full liquid-glass p-0 flex items-center justify-center"
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToSection("contact");
              }}
            >
              <User size={18} className="text-gray-300" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main id="main-content" className="relative z-10">
        
        {/* Full-Viewport Landing Hero Section */}
        <section
          id="hero"
          className="h-screen w-full relative flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16"
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8">
            {/* Left Column: Bio Details & Primary Actions */}
            <div className="flex-1 flex flex-col items-start text-left max-w-3xl">
              
              {/* Metadata Row */}
              <div
                className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm text-gray-200 font-mono animate-blur-fade-up drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                style={{ animationDelay: "300ms" }}
              >
                <div className="flex items-center space-x-2">
                  <GraduationCap size={16} className="text-cyber-blue fill-cyber-blue/20" />
                  <span className="font-semibold uppercase tracking-wider">VIT Bhopal University</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-cyber-green" />
                  <span className="uppercase tracking-wider">Haryana, India</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Database size={16} className="text-cyber-purple" />
                  <span className="uppercase tracking-wider">AI & ML Specialization</span>
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
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-white leading-none select-none flex flex-wrap gap-x-4 sm:gap-x-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
                >
                  {/* First Name: Anish */}
                  <span className="inline-flex space-x-0.5 sm:space-x-1" aria-hidden="true">
                    {firstName.map((char, index) => (
                      <motion.span
                        key={`first-${index}`}
                        variants={letterVariants}
                        whileHover={{
                          y: -8,
                          scale: 1.15,
                          color: "#3b82f6",
                          textShadow: "0 0 25px rgba(59, 130, 246, 0.8)",
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
                    className="inline-flex space-x-0.5 sm:space-x-1 font-serif italic text-cyber-blue font-medium drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    aria-hidden="true"
                  >
                    {lastName.map((char, index) => (
                      <motion.span
                        key={`last-${index}`}
                        variants={letterVariants}
                        whileHover={{
                          y: -8,
                          scale: 1.15,
                          color: "#60a5fa",
                          textShadow: "0 0 30px rgba(96, 165, 250, 0.9)",
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
                className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-12 max-w-2xl font-sans leading-relaxed animate-blur-fade-up drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
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
                  className="bg-white text-black hover:bg-gray-200 border-none rounded-full px-6 sm:px-8 py-2.5 sm:py-3 flex items-center space-x-2.5 text-xs font-mono font-bold tracking-wider"
                >
                  <FileText className="w-4 h-4 text-black" aria-hidden="true" />
                  <span>Resume</span>
                  <ExternalLink className="w-4 h-4 text-black/80" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </Button>

                <Button
                  onClick={() => scrollToSection("contact")}
                  variant="ghost"
                  className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-xs font-mono font-bold tracking-wider"
                  style={{ animationDelay: "700ms" }}
                >
                  <span>Contact Me</span>
                </Button>
              </div>
            </div>

          </div>
        </section>

        {/* Scrollable Portfolio Subsections */}
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
      <footer className="bg-black/90 border-t border-white/10 py-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left font-mono">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} &mdash; Developed by <span className="text-white font-bold">Anish</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
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
