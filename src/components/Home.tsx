import { motion } from "motion/react";
import { 
  FileText, 
  ExternalLink, 
  GraduationCap, 
  MapPin, 
  Database, 
  Sparkles, 
  Code2, 
  FolderGit2, 
  Award, 
  ArrowRight,
  Send
} from "lucide-react";
import Button from "./Button";

interface HomeProps {
  onNavigate: (route: string) => void;
  onOpenResume: () => void;
}

export default function Home({ onNavigate, onOpenResume }: HomeProps) {
  const firstName = "Anish".split("");
  const lastName = "Yadav".split("");

  const nameContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 24,
      scale: 0.96
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const quickPillars = [
    {
      title: "Core Skills",
      desc: "Deep Learning, Agentic AI, Computer Vision & Web Systems",
      icon: <Code2 className="w-5 h-5 text-emerald-400" />,
      route: "/skills",
      badge: "4 Categories"
    },
    {
      title: "Featured Projects",
      desc: "Say & Pay, NutriScan, AI Story Generator & CNNs",
      icon: <FolderGit2 className="w-5 h-5 text-cyan-400" />,
      route: "/projects",
      badge: "6 Projects"
    },
    {
      title: "Certifications",
      desc: "AWS Certified AI & Cloud, Oracle Agentic AI & IBM",
      icon: <Award className="w-5 h-5 text-purple-400" />,
      route: "/certifications",
      badge: "4 Credentials"
    },
    {
      title: "Education",
      desc: "B.Tech CSE with AI & ML at VIT Bhopal (8.25 CGPA)",
      icon: <GraduationCap className="w-5 h-5 text-blue-400" />,
      route: "/education",
      badge: "2023 – 2027"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-28 pb-16 flex flex-col justify-center min-h-[calc(100vh-140px)]">
      {/* Top Hero Column */}
      <div className="flex flex-col items-start text-left max-w-4xl mb-12">
        
        {/* Title Header with Staggered Split Letters */}
        <motion.div
          className="mb-4 md:mb-6"
          variants={nameContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1
            aria-label="Anish Yadav"
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-white leading-none select-none flex flex-wrap gap-x-4 sm:gap-x-6 drop-shadow-md"
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
                    color: "#60a5fa",
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
              className="inline-flex space-x-0.5 sm:space-x-1 font-serif italic text-cyan-400 font-medium drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]"
              aria-hidden="true"
            >
              {lastName.map((char, index) => (
                <motion.span
                  key={`last-${index}`}
                  variants={letterVariants}
                  whileHover={{
                    y: -6,
                    scale: 1.12,
                    color: "#38bdf8",
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

        {/* Tagline Bio in Crystal Transparent Glass Card */}
        <div
          className="liquid-glass-card rounded-3xl p-5 sm:p-6 mb-6 max-w-3xl animate-blur-fade-up shadow-xl"
          style={{ animationDelay: "200ms" }}
        >
          <p className="text-base sm:text-lg text-slate-200 font-sans leading-relaxed">
            AI & Machine Learning engineer and modern web developer. Building intelligent computer-vision pipelines, high-accuracy deep neural architectures, and high-performance web applications.
          </p>
        </div>

        {/* Metadata Badges */}
        <div
          className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-8 text-xs font-mono animate-blur-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          <div className="flex items-center space-x-2 liquid-glass-pill px-4 py-1.5 rounded-full shadow-xs">
            <GraduationCap size={15} className="text-cyan-400" />
            <span className="font-semibold uppercase tracking-wider text-xs text-slate-200">VIT Bhopal University</span>
          </div>
          <div className="flex items-center space-x-2 liquid-glass-pill px-4 py-1.5 rounded-full shadow-xs">
            <MapPin size={15} className="text-emerald-400" />
            <span className="uppercase tracking-wider text-xs font-semibold text-slate-200">Haryana, India</span>
          </div>
          <div className="flex items-center space-x-2 liquid-glass-pill px-4 py-1.5 rounded-full shadow-xs">
            <Database size={15} className="text-purple-400" />
            <span className="uppercase tracking-wider text-xs font-semibold text-slate-200">AI & ML Specialization</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div
          className="flex flex-wrap items-center gap-3 sm:gap-4 animate-blur-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          <Button
            onClick={onOpenResume}
            variant="primary"
            size="lg"
            className="liquid-glass-refract rounded-full px-7 py-3.5 flex items-center space-x-2.5 text-xs font-mono font-bold tracking-wider shadow-lg hover:shadow-2xl bg-blue-600/80 hover:bg-blue-500 border border-blue-400/50 text-white cursor-pointer"
            data-config={JSON.stringify({ button: true, cornerRadius: 28, blurAmount: 0.15 })}
          >
            <FileText className="w-4 h-4 text-cyan-200" aria-hidden="true" />
            <span>View Resume</span>
            <ExternalLink className="w-4 h-4 text-white/80" aria-hidden="true" />
            <span className="sr-only">(opens in new tab)</span>
          </Button>

          <Button
            onClick={() => onNavigate("/projects")}
            variant="glass"
            size="lg"
            className="liquid-glass-refract rounded-full px-7 py-3.5 text-xs font-mono font-bold tracking-wider shadow-md hover:shadow-xl cursor-pointer"
            data-config={JSON.stringify({ button: true, cornerRadius: 28, blurAmount: 0.15 })}
          >
            <FolderGit2 className="w-4 h-4 text-cyan-300 mr-2" />
            <span>Explore Projects</span>
          </Button>

          <Button
            onClick={() => onNavigate("/contact")}
            variant="glass"
            size="lg"
            className="liquid-glass-refract rounded-full px-7 py-3.5 text-xs font-mono font-bold tracking-wider shadow-md hover:shadow-xl cursor-pointer"
            data-config={JSON.stringify({ button: true, cornerRadius: 28, blurAmount: 0.15 })}
          >
            <Send className="w-4 h-4 text-emerald-300 mr-2" />
            <span>Get in Touch</span>
          </Button>
        </div>
      </div>

      {/* Quick Showcase Grid / Interactive Cards */}
      <div className="w-full max-w-7xl animate-blur-fade-up" style={{ animationDelay: "500ms" }}>
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
            Portfolio Highlights & Sections
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickPillars.map((pillar) => (
            <button
              key={pillar.route}
              onClick={() => onNavigate(pillar.route)}
              className="liquid-glass-card rounded-2xl p-5 text-left transition-all duration-300 hover:scale-[1.03] hover:border-cyan-400/40 hover:shadow-cyan-500/10 hover:shadow-xl group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40 transition-colors">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-cyan-300 border border-white/10">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors mb-1.5 flex items-center justify-between">
                  <span>{pillar.title}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-400" />
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
