import { motion } from "motion/react";

interface CyberHUDNavigatorProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const sectors = [
  { id: "hero", code: "00", name: "Nexus" },
  { id: "skills", code: "01", name: "Skills" },
  { id: "projects", code: "02", name: "Projects" },
  { id: "certifications", code: "03", name: "Certificates" },
  { id: "education", code: "04", name: "Education" },
  { id: "contact", code: "05", name: "Contact" }
];

export default function CyberHUDNavigator({
  activeSection,
  onNavigate
}: CyberHUDNavigatorProps) {
  return (
    <aside
      aria-label="Sector navigation"
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center space-y-3 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-2xl"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue/60 mb-1 animate-pulse" />

      {sectors.map((sector) => {
        const isActive = activeSection === sector.id;

        return (
          <button
            key={sector.id}
            onClick={() => onNavigate(sector.id)}
            aria-label={`Jump to ${sector.name} sector`}
            className="group relative flex items-center justify-center p-1.5 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-blue"
          >
            {/* Active Radar Blip Indicator */}
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-cyber-blue scale-125 shadow-[0_0_12px_#3b82f6]"
                  : "bg-white/20 group-hover:bg-white/60 scale-100"
              }`}
            />

            {/* Glowing Ring when active */}
            {isActive && (
              <motion.div
                layoutId="active-hud-ring"
                className="absolute inset-0 rounded-full border border-cyber-blue/80"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}

            {/* Futuristic Hover Tooltip */}
            <div className="absolute right-8 px-2.5 py-1 rounded-md bg-dark-card/95 border border-cyber-blue/30 backdrop-blur-md shadow-xl text-right opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-x-2 group-hover:translate-x-0 whitespace-nowrap">
              <span className="text-[10px] font-mono text-cyber-blue font-bold mr-1.5">{sector.code}</span>
              <span className="text-xs font-mono text-white">{sector.name}</span>
            </div>
          </button>
        );
      })}

      <div className="w-1.5 h-1.5 rounded-full bg-cyber-purple/60 mt-1" />
    </aside>
  );
}
