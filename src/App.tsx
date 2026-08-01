import { useEffect, useState } from "react";
import { Cpu, Mail, Globe, Menu, X, ChevronRight, Layers, FileText, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import Background3D from "./components/Background3D";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Contact from "./components/Contact";

const RESUME_URL = "https://drive.google.com/file/d/1-1WU6cFsLirmsw_ofJd9caE2BrMiznUI/view?usp=sharing";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
      
      {/* Interactive 3D WebGL Background Canvas */}
      <Background3D activeSection={activeSection} scrollProgress={scrollProgress} />

      {/* Top Scroll Progress indicator */}
      <div 
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Futuristic Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-dark-bg/80 backdrop-blur-md border-b border-white/10 z-40 px-6">
        <div className="h-full w-full max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand */}
          <button 
            onClick={() => scrollToSection("hero")}
            className="flex items-center space-x-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded overflow-hidden flex items-center justify-center border border-white/10 shadow-lg shadow-cyber-blue/20 group-hover:border-cyber-blue/50 transition-all duration-300">
              <img 
                src="/logo.jpg" 
                alt="AY" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left font-mono">
              <span className="text-white font-semibold text-sm group-hover:text-cyber-blue transition">Anish Yadav</span>
            </div>
          </button>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeSection === item.id 
                    ? "text-cyber-blue font-semibold scale-105" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Top Resume CTA */}
          <div className="hidden md:flex items-center text-[11px] font-mono text-gray-500">
            <button
              onClick={handleOpenResume}
              className="px-3.5 py-1.5 bg-cyber-blue/10 hover:bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30 rounded-lg transition font-mono text-xs flex items-center space-x-1.5 cursor-pointer hover:border-cyber-blue shadow-sm"
              title="View Resume"
            >
              <FileText className="w-3.5 h-3.5 text-cyber-blue" />
              <span className="font-semibold">Resume</span>
              <ExternalLink className="w-3 h-3 text-cyber-blue/80" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-dark-bg/95 backdrop-blur-lg z-35 flex flex-col p-6 border-b border-white/10 lg:hidden">
          <div className="flex flex-col space-y-5 pt-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left text-lg font-mono tracking-wide py-2 border-b border-white/10 flex items-center justify-between cursor-pointer ${
                  activeSection === item.id ? "text-cyber-blue font-semibold" : "text-gray-400"
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            ))}
            
            {/* Mobile Resume CTA */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleOpenResume();
              }}
              className="w-full py-3 mt-2 bg-gradient-to-r from-cyber-blue to-blue-600 text-white font-display font-semibold rounded-lg flex items-center justify-center space-x-2 shadow-lg shadow-cyber-blue/20 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
              <ExternalLink className="w-4 h-4" />
            </button>
            
            {/* Mobile system status metadata */}
            <div className="pt-8 text-xs font-mono text-gray-500">
              <p>📍 Location: Mahendragarh, Haryana, India</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Sections Body with 3D Spatial Transitions */}
      <main className="relative z-10">
        <Hero 
          onScrollToContact={() => scrollToSection("contact")}
          onScrollToProjects={() => scrollToSection("projects")}
          onOpenResume={handleOpenResume}
        />

        {/* 3D Section Transition Dividers */}
        <motion.div 
          initial={{ opacity: 0, y: 40, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ perspective: "1000px" }}
        >
          <Skills />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ perspective: "1000px" }}
        >
          <Projects />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ perspective: "1000px" }}
        >
          <Certifications />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ perspective: "1000px" }}
        >
          <Education />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ perspective: "1000px" }}
        >
          <Contact />
        </motion.div>
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
            <a href="https://github.com/ANISHYADAV19" target="_blank" referrerPolicy="no-referrer" rel="noreferrer" className="hover:text-cyber-blue transition">GitHub</a>
            <a href="https://linkedin.com/in/anish-yadav-528941333" target="_blank" referrerPolicy="no-referrer" rel="noreferrer" className="hover:text-cyber-blue transition">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
