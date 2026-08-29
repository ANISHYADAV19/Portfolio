import { motion } from "motion/react";
import { Github, Linkedin, Mail, MapPin, Phone, Database, ArrowDown, Sparkles, ExternalLink, FileText } from "lucide-react";
import Button from "./Button";

interface HeroProps {
  onScrollToContact: () => void;
  onScrollToProjects: () => void;
  onOpenResume: () => void;
}

export default function Hero({ onScrollToContact, onScrollToProjects, onOpenResume }: HeroProps) {
  const firstName = "Anish".split("");
  const lastName = "Yadav".split("");

  const nameContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 45,
      rotateX: -80,
      scale: 0.8,
      filter: "blur(10px)",
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
        stiffness: 110,
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 pt-28 pb-16 overflow-hidden">
      <div className="w-full max-w-5xl z-10 mx-auto">
        
        {/* Intro text */}
        <div className="flex flex-col space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 liquid-glass-pill px-4 py-1.5 rounded-full self-start shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <p className="text-cyan-300 font-mono text-xs sm:text-sm tracking-widest uppercase font-bold">
              B.Tech Artificial Intelligence & Machine Learning
            </p>
          </motion.div>

          {/* Animated 3D Staggered Name: Anish Yadav */}
          <motion.div
            className="relative py-2 perspective-1000"
            variants={nameContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1
              aria-label="Anish Yadav"
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-white leading-none select-none flex flex-wrap gap-x-4 sm:gap-x-6 drop-shadow-lg"
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
                      color: "#60a5fa",
                      textShadow: "0 0 25px rgba(96, 165, 250, 0.9)",
                      transition: { duration: 0.15 }
                    }}
                    className="inline-block transform-gpu cursor-pointer transition-colors"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>

              {/* Last Name: Yadav */}
              <span className="inline-flex space-x-0.5 sm:space-x-1 font-serif italic text-cyan-400 font-medium drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]" aria-hidden="true">
                {lastName.map((char, index) => (
                  <motion.span
                    key={`last-${index}`}
                    variants={letterVariants}
                    whileHover={{
                      y: -8,
                      scale: 1.15,
                      color: "#38bdf8",
                      textShadow: "0 0 30px rgba(56, 189, 248, 0.9)",
                      transition: { duration: 0.15 }
                    }}
                    className="inline-block transform-gpu cursor-pointer transition-colors"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Glowing ambient underline sheen */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
              className="h-1 w-32 sm:w-48 bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent mt-4 rounded-full origin-left"
            />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-slate-200 font-sans max-w-2xl leading-relaxed"
          >
            AI & Machine Learning student and web developer based in India. Passionate about building intelligent, computer-vision enabled systems, high-accuracy neural architectures, and responsive web applications.
          </motion.p>

          {/* Quick Info Grid - Crystal Transparent Glass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-mono text-slate-200 liquid-glass-card p-5 rounded-2xl border border-white/20 max-w-2xl shadow-xl"
          >
            <div className="flex items-center space-x-2.5">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Mahendragarh, Haryana, India</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <a href="mailto:anishyadav872004@gmail.com" className="hover:text-white hover:underline transition">
                anishyadav872004@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-purple-400 shrink-0" />
              <a href="tel:+919407055068" className="hover:text-white hover:underline transition">
                +91 9407055068
              </a>
            </div>
            <div className="flex items-center space-x-2.5">
              <Database className="w-4 h-4 text-blue-400 shrink-0" />
              <span>VIT Bhopal University</span>
            </div>
          </motion.div>

          {/* Call to Actions & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap gap-4 items-center pt-2"
          >
            <Button 
              id="cta-resume-btn"
              onClick={onOpenResume}
              variant="primary"
              size="lg"
              className="liquid-glass-refract group rounded-full px-7 py-3.5 shadow-xl bg-blue-600/80 hover:bg-blue-500 border border-blue-400/50 text-white"
              title="View Resume"
              data-config={JSON.stringify({ button: true, cornerRadius: 28, blurAmount: 0.15 })}
            >
              <FileText className="w-4 h-4 text-cyan-200 group-hover:scale-110 transition" />
              <span>Resume</span>
              <ExternalLink className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition" />
            </Button>

            <Button 
              id="cta-projects-btn"
              onClick={onScrollToProjects}
              variant="glass"
              size="lg"
              className="liquid-glass-refract rounded-full px-7 py-3.5 shadow-md hover:shadow-xl"
              data-config={JSON.stringify({ button: true, cornerRadius: 28, blurAmount: 0.15 })}
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4 text-cyan-400" />
            </Button>

            <Button 
              id="cta-contact-btn"
              onClick={onScrollToContact}
              variant="glass"
              size="lg"
              className="liquid-glass-refract rounded-full px-7 py-3.5 shadow-md hover:shadow-xl"
              data-config={JSON.stringify({ button: true, cornerRadius: 28, blurAmount: 0.15 })}
            >
              Contact Me
            </Button>

            {/* Socials */}
            <div className="flex space-x-3 sm:ml-2">
              <Button
                id="social-github-btn"
                href="https://github.com/ANISHYADAV19"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
                variant="glass"
                className="p-3 text-slate-200 hover:text-white hover:border-cyan-400"
                aria-label="GitHub profile (opens in a new tab)"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </Button>
              <Button
                id="social-linkedin-btn"
                href="https://www.linkedin.com/in/anish-yadav-dev/"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
                variant="glass"
                className="p-3 text-slate-200 hover:text-white hover:border-cyan-400"
                aria-label="LinkedIn profile (opens in a new tab)"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
