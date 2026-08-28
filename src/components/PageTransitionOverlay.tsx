import { motion, AnimatePresence } from "motion/react";
import { Terminal, Shield, Zap, Compass } from "lucide-react";

interface PageTransitionOverlayProps {
  isTransitioning: boolean;
  targetSector: string;
}

const sectorDetails: Record<string, { label: string; sectorCode: string; icon: typeof Terminal; accent: string }> = {
  hero: {
    label: "NEXUS // HOME",
    sectorCode: "SEC-00 // SYSTEM_ROOT",
    icon: Shield,
    accent: "text-cyber-blue"
  },
  skills: {
    label: "CAPABILITIES // SKILL_MATRIX",
    sectorCode: "SEC-01 // NEURAL_SPECS",
    icon: Zap,
    accent: "text-cyber-blue"
  },
  projects: {
    label: "PROJECTS // REPOSITORIES",
    sectorCode: "SEC-02 // CORE_BUILDS",
    icon: Terminal,
    accent: "text-cyber-purple"
  },
  certifications: {
    label: "CREDENTIALS // AUTH_KEYS",
    sectorCode: "SEC-03 // VERIFIED_CREDS",
    icon: Compass,
    accent: "text-cyber-green"
  },
  education: {
    label: "FOUNDATION // TIMELINE",
    sectorCode: "SEC-04 // ACADEMIC_LOGS",
    icon: Compass,
    accent: "text-cyber-blue"
  },
  contact: {
    label: "COMMUNICATION // PORTAL",
    sectorCode: "SEC-05 // TRANSMISSION",
    icon: Terminal,
    accent: "text-cyber-purple"
  }
};

export default function PageTransitionOverlay({
  isTransitioning,
  targetSector
}: PageTransitionOverlayProps) {
  const currentSector = sectorDetails[targetSector] || {
    label: "WARP SYNC // SECTOR_JUMP",
    sectorCode: "SEC-XX // ROUTING",
    icon: Terminal,
    accent: "text-cyber-blue"
  };

  const SectorIcon = currentSector.icon;

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[10000] pointer-events-none flex flex-col justify-center items-center overflow-hidden"
        >
          {/* Shutter Blade 1 - Deep Background Veil */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-black/95 origin-top backdrop-blur-2xl"
          />

          {/* Shutter Blade 2 - Cyber Blue Blade */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-purple-950/20 to-black/90 origin-bottom"
          />

          {/* Cyber Grid Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-grid-pattern opacity-30"
          />

          {/* High-speed Scanning Laser Beam */}
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: ["-100%", "200%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.65, ease: "easeInOut", repeat: 1 }}
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#38bdf8]"
          />

          {/* Central Holographic HUD Telemetry Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative z-10 px-8 py-6 rounded-2xl bg-black/80 border border-cyber-blue/40 backdrop-blur-xl shadow-[0_0_50px_rgba(59,130,246,0.3)] max-w-md mx-4 text-center"
          >
            {/* Top HUD Badge */}
            <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-cyber-blue animate-ping" />
                <span className="text-cyber-blue font-bold tracking-widest">QUANTUM ROUTER</span>
              </div>
              <span className="text-gray-500">INIT: 0x884F</span>
            </div>

            {/* Main Sector Title */}
            <div className="flex items-center justify-center space-x-3 my-2">
              <div className={`p-2 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30 ${currentSector.accent}`}>
                <SectorIcon className="w-5 h-5 animate-pulse" />
              </div>
              <div className="text-left">
                <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">{currentSector.sectorCode}</p>
                <h3 className="text-lg md:text-xl font-display font-bold text-white tracking-wide">
                  {currentSector.label}
                </h3>
              </div>
            </div>

            {/* Cyber Telemetry Bar */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-500">
              <span>WARP_SPEED: 99.9%</span>
              <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green"
                />
              </div>
              <span className="text-cyber-blue font-bold">LOCKED</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
