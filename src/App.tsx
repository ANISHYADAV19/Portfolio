import { useEffect, useRef, useState, useTransition, type MouseEvent } from "react";
import {
  Menu,
  X,
  User,
  Github,
  Linkedin,
  Mail,
  Home as HomeIcon
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Button from "./components/Button";
import PageNavigation, { PAGES } from "./components/PageNavigation";
import { useLiquidGlass } from "./hooks/useLiquidGlass";

const RESUME_URL = "https://drive.google.com/file/d/1-1WU6cFsLirmsw_ofJd9caE2BrMiznUI/view?usp=sharing";

// Helper to normalize path from window.location
const normalizePath = (pathname: string, hash: string): string => {
  if (hash && hash.startsWith("#/")) {
    return hash.slice(1);
  }
  if (hash && hash.startsWith("#")) {
    const hashClean = hash.slice(1);
    if (PAGES.some((p) => p.id === hashClean)) {
      return `/${hashClean}`;
    }
  }
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  if (PAGES.some((p) => p.path === cleanPath)) {
    return cleanPath;
  }
  return "/";
};

// 3D Perspective Depth Transition Variants
const perspective3DVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    rotateY: direction >= 0 ? 12 : -12,
    rotateX: 4,
    scale: 0.94,
    z: -100,
    y: direction >= 0 ? 25 : -25,
    filter: "blur(6px)",
  }),
  animate: {
    opacity: 1,
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    z: 0,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1], // snappy cubic bezier
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    rotateY: direction >= 0 ? -12 : 12,
    rotateX: -4,
    scale: 0.94,
    z: -100,
    y: direction >= 0 ? -25 : 25,
    filter: "blur(6px)",
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => 
    normalizePath(window.location.pathname, window.location.hash)
  );
  const [direction, setDirection] = useState<number>(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [, startTransition] = useTransition();

  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const appContainerRef = useRef<HTMLDivElement>(null);

  // Initialize WebGL Liquid Glass Shader Engine
  useLiquidGlass(appContainerRef, ".liquid-glass-refract", {
    blurAmount: 0.15,
    refraction: 0.85,
    chromAberration: 0.1,
    edgeHighlight: 0.2,
    cornerRadius: 32,
    zRadius: 36,
    shadowOpacity: 0.35,
    brightness: -0.1
  });

  // Calculate current page index
  const getCurrentIndex = (path: string) => {
    const idx = PAGES.findIndex((p) => p.path === path || (path === "" && p.path === "/"));
    return idx === -1 ? 0 : idx;
  };

  const handleOpenResume = () => {
    window.open(RESUME_URL, "_blank", "noopener,noreferrer");
  };

  // Navigate to a new page with 3D direction calculation
  const navigateTo = (targetPath: string) => {
    const cleanTarget = normalizePath(targetPath, "");
    if (cleanTarget === currentPath) return;

    const oldIndex = getCurrentIndex(currentPath);
    const newIndex = getCurrentIndex(cleanTarget);
    const newDirection = newIndex >= oldIndex ? 1 : -1;

    setDirection(newDirection);
    setIsMobileMenuOpen(false);

    // Update browser history URL
    try {
      window.history.pushState({ path: cleanTarget }, "", cleanTarget);
    } catch {
      window.location.hash = `#${cleanTarget}`;
    }

    startTransition(() => {
      setCurrentPath(cleanTarget);
    });

    // Reset scroll smoothly to top
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const target = normalizePath(window.location.pathname, window.location.hash);
      const oldIndex = getCurrentIndex(currentPath);
      const newIndex = getCurrentIndex(target);
      setDirection(newIndex >= oldIndex ? 1 : -1);
      setCurrentPath(target);
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [currentPath]);

  // Update document title based on active page
  useEffect(() => {
    const activePage = PAGES.find((p) => p.path === currentPath);
    if (activePage && activePage.path !== "/") {
      document.title = `${activePage.label} | Anish Yadav Portfolio`;
    } else {
      document.title = "Anish Yadav | AI & ML Engineer | Portfolio";
    }
  }, [currentPath]);

  // Mobile drawer keyboard & accessibility handling
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

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigateTo(path);
  };

  // Render the active page component
  const renderActivePage = () => {
    switch (currentPath) {
      case "/skills":
        return <Skills />;
      case "/projects":
        return <Projects />;
      case "/certifications":
        return <Certifications />;
      case "/education":
        return <Education />;
      case "/contact":
        return <Contact />;
      case "/":
      default:
        return <Home onNavigate={navigateTo} onOpenResume={handleOpenResume} />;
    }
  };


  return (
    <div
      ref={appContainerRef}
      className="min-h-screen text-slate-100 selection:bg-blue-600 selection:text-white font-sans relative overflow-x-hidden flex flex-col justify-between"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-blue-600 focus:text-white focus:font-mono focus:text-sm focus:font-bold shadow-lg"
      >
        Skip to main content
      </a>

      {/* Cinematic Persistent Loop Background Video - 100% visible across page transitions */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-screen h-screen object-cover z-0 pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4"
      />

      {/* Ambient Tint Layer */}
      <div className="fixed inset-0 w-full h-full bg-slate-950/20 pointer-events-none z-1" />

      {/* Floating Crystal Transparent Glass Navbar */}
      <header className="fixed top-3 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 flex justify-center">
        <nav
          aria-label="Main navigation"
          className="w-full max-w-7xl h-16 md:h-18 liquid-glass-nav rounded-full px-4 sm:px-6 md:px-8 flex items-center justify-between shadow-2xl"
        >
          {/* Brand Logo / Home link */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center space-x-2 text-white font-semibold group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50 transition-all">
              <HomeIcon className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-mono text-sm tracking-wider font-bold hidden sm:inline text-white">
              AY<span className="text-cyan-400">.</span>
            </span>
          </a>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center space-x-1.5 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {PAGES.map((item) => {
              const isActive = currentPath === item.path || (currentPath === "" && item.path === "/");
              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-xs font-mono tracking-wider px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer relative ${
                    isActive
                      ? "text-cyan-300 font-bold scale-105"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-white/20 rounded-full border border-white/25 shadow-xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Top Actions Section */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* LinkedIn Button */}
            <Button
              variant="glass"
              size="sm"
              href="https://www.linkedin.com/in/anish-yadav-dev/"
              target="_blank"
              rel="noreferrer"
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full liquid-glass-refract p-0 flex items-center justify-center shadow-xs text-cyan-400 hover:text-cyan-300"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </Button>

            {/* GitHub Button */}
            <Button
              variant="glass"
              size="sm"
              href="https://github.com/ANISHYADAV19"
              target="_blank"
              rel="noreferrer"
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full liquid-glass-refract p-0 flex items-center justify-center shadow-xs text-slate-300 hover:text-white"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github size={16} />
            </Button>

            {/* Gmail / Mail Contact Button */}
            <Button
              variant="glass"
              size="sm"
              href="mailto:anishyadav872004@gmail.com"
              className="w-9 h-9 rounded-full liquid-glass-refract p-0 flex items-center justify-center shadow-xs text-emerald-400 hover:text-emerald-300"
              title="Email (anishyadav872004@gmail.com)"
              aria-label="Email Anish Yadav"
            >
              <Mail size={16} />
            </Button>

            {/* Profile / Contact Page Button */}
            <Button
              variant="glass"
              size="sm"
              className={`w-9 h-9 rounded-full liquid-glass-refract p-0 flex items-center justify-center shadow-xs cursor-pointer ${
                currentPath === "/contact" ? "border-cyan-400 bg-white/20" : ""
              }`}
              onClick={() => navigateTo("/contact")}
              title="View Contact Page"
              aria-label="View Contact Page"
            >
              <User size={16} className="text-cyan-300" />
            </Button>

            {/* Mobile Menu Toggle Button */}
            <Button
              ref={menuToggleRef}
              variant="glass"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full p-0 flex items-center justify-center shadow-xs ml-1"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <X
                  size={18}
                  className={`absolute transition-all duration-300 ease-out text-white ${
                    isMobileMenuOpen ? "rotate-0 opacity-100 scale-100" : "rotate-180 opacity-0 scale-50"
                  }`}
                />
                <Menu
                  size={18}
                  className={`absolute transition-all duration-300 ease-out text-white ${
                    isMobileMenuOpen ? "-rotate-180 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"
                  }`}
                />
              </div>
            </Button>
          </div>
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
        <div className="flex flex-col space-y-1.5">
          {PAGES.map((item, idx) => {
            const isActive = currentPath === item.path || (currentPath === "" && item.path === "/");
            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => {
                  handleNavClick(e, item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`py-3 px-4 rounded-2xl font-mono text-sm transition-all duration-200 font-semibold flex items-center justify-between ${
                  isActive
                    ? "bg-white/20 text-cyan-300 border border-white/20 shadow-xs"
                    : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
                style={{
                  transitionDelay: `${idx * 30}ms`,
                  transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-12px)"
                }}
              >
                <span>{item.label}</span>
                {item.subtitle && (
                  <span className="text-[11px] text-slate-400 font-normal">{item.subtitle}</span>
                )}
              </a>
            );
          })}

          {/* Mobile Profile & Social Links */}
          <div className="pt-4 mt-2 border-t border-white/15 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <a
                href="https://www.linkedin.com/in/anish-yadav-dev/"
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full liquid-glass-pill flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/ANISHYADAV19"
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full liquid-glass-pill flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href="mailto:anishyadav872004@gmail.com"
                className="w-10 h-10 rounded-full liquid-glass-pill flex items-center justify-center text-emerald-400 hover:text-emerald-300 transition-colors"
                aria-label="Send Email"
              >
                <Mail size={18} />
              </a>
            </div>
            <Button
              variant="glass"
              size="sm"
              className="w-10 h-10 rounded-full p-0 flex items-center justify-center cursor-pointer"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigateTo("/contact");
              }}
              title="View Contact Page"
              aria-label="View Contact Page"
            >
              <User size={18} className="text-cyan-300" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area with 3D Perspective Transitions */}
      <main
        id="main-content"
        className="relative z-10 flex-1 flex flex-col justify-between"
        style={{ perspective: "1400px" }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPath}
            custom={direction}
            variants={prefersReducedMotion ? undefined : perspective3DVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex-1 flex flex-col justify-between transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Page Sub-component */}
            <div className="flex-1">
              {renderActivePage()}
            </div>

            {/* Bottom Page Navigation (Previous / Next / Page Indicator) */}
            <PageNavigation currentPath={currentPath} onNavigate={navigateTo} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Crystal Transparent Liquid Glass Footer */}
      <footer className="py-8 px-6 relative z-10">
        <div className="max-w-7xl mx-auto liquid-glass-card rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 border border-white/10">
          <div className="text-center md:text-left font-mono">
            <p className="text-xs text-slate-300">
              &copy; {new Date().getFullYear()} &mdash; Designed & Developed by <span className="text-white font-bold">Anish Yadav</span>
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              B.Tech Computer Science (AI & ML) &bull; VIT Bhopal University
            </p>
          </div>

          <div className="flex items-center space-x-6 text-xs font-mono text-slate-300">
            <button
              onClick={() => navigateTo("/")}
              className="hover:text-cyan-400 transition font-semibold cursor-pointer"
            >
              Home
            </button>
            <a href="mailto:anishyadav872004@gmail.com" className="hover:text-cyan-400 transition font-semibold">
              Email
            </a>
            <a href="https://github.com/ANISHYADAV19" target="_blank" referrerPolicy="no-referrer" rel="noreferrer" className="hover:text-cyan-400 transition font-semibold">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href="https://www.linkedin.com/in/anish-yadav-dev/" target="_blank" referrerPolicy="no-referrer" rel="noreferrer" className="hover:text-cyan-400 transition font-semibold">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
