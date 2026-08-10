import { motion } from "motion/react";
import { Github, Linkedin, Mail, MapPin, Phone, Database, ArrowDown, Sparkles, ExternalLink, FileText } from "lucide-react";

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
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-12 overflow-hidden bg-grid-pattern bg-dark-bg">
      {/* Visual highlights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-4xl z-10">
        
        {/* Intro text */}
        <div className="flex flex-col space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-cyber-blue animate-pulse" />
            <p className="text-cyber-blue font-mono text-xs sm:text-sm tracking-widest uppercase">
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
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-white leading-none select-none flex flex-wrap gap-x-4 sm:gap-x-6"
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
              <span className="inline-flex space-x-0.5 sm:space-x-1 font-serif italic text-cyber-blue font-medium drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]" aria-hidden="true">
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

            {/* Glowing ambient underline sheen */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
              className="h-1 w-32 sm:w-48 bg-gradient-to-r from-cyber-blue via-cyber-purple to-transparent mt-4 rounded-full origin-left"
            />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-400 font-sans max-w-2xl leading-relaxed"
          >
            AI & Machine Learning student and web developer based in India. Passionate about building intelligent, computer-vision enabled systems, high-accuracy neural architectures, and responsive web applications.
          </motion.p>

          {/* Quick Info Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-mono text-gray-400 bg-dark-card/50 p-4 rounded-xl border border-white/10 max-w-2xl"
          >
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-cyber-blue" />
              <span>Mahendragarh, Haryana, India</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-cyber-purple" />
              <a href="mailto:anishyadav872004@gmail.com" className="hover:text-white transition">anishyadav872004@gmail.com</a>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-cyber-green" />
              <a href="tel:+919407055068" className="hover:text-white transition">+91 9407055068</a>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-cyber-blue" />
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
            <button 
              id="cta-resume-btn"
              onClick={onOpenResume}
              className="px-6 py-3 bg-gradient-to-r from-cyber-blue to-blue-600 hover:from-blue-500 hover:to-cyber-blue text-white font-display font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-cyber-blue/25 hover:shadow-cyber-blue/40 flex items-center space-x-2.5 cursor-pointer border border-cyber-blue/40 group"
              title="View Resume"
            >
              <FileText className="w-4 h-4 text-white group-hover:scale-110 transition" />
              <span>Resume</span>
              <ExternalLink className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition" />
            </button>

            <button 
              id="cta-projects-btn"
              onClick={onScrollToProjects}
              className="px-6 py-3 bg-dark-card hover:bg-gray-800 text-gray-200 hover:text-white font-display font-medium rounded-lg border border-white/10 hover:border-cyber-blue/40 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4 text-cyber-blue" />
            </button>

            <button 
              id="cta-contact-btn"
              onClick={onScrollToContact}
              className="px-6 py-3 bg-transparent hover:bg-gray-800/40 text-white font-display border border-gray-700 hover:border-gray-500 rounded-lg transition-all duration-300 cursor-pointer"
            >
              Contact Me
            </button>

            {/* Socials */}
            <div className="flex space-x-3 sm:ml-2">
              <a
                id="social-github-btn"
                href="https://github.com/ANISHYADAV19"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
                className="p-3 bg-dark-card border border-white/10 hover:border-cyber-blue hover:text-cyber-blue rounded-lg transition duration-300 text-gray-400"
                aria-label="GitHub profile (opens in a new tab)"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                id="social-linkedin-btn"
                href="https://linkedin.com/in/anish-yadav-528941333"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
                className="p-3 bg-dark-card border border-white/10 hover:border-cyber-blue hover:text-cyber-blue rounded-lg transition duration-300 text-gray-400"
                aria-label="LinkedIn profile (opens in a new tab)"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
