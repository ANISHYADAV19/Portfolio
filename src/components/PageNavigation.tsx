import { ArrowLeft, ArrowRight, Home as HomeIcon } from "lucide-react";

export interface NavPage {
  id: string;
  path: string;
  label: string;
  subtitle?: string;
}

export const PAGES: NavPage[] = [
  { id: "home", path: "/", label: "Home", subtitle: "Introduction & Bio" },
  { id: "skills", path: "/skills", label: "Skills", subtitle: "Tech Stack & Proficiencies" },
  { id: "projects", path: "/projects", label: "Projects", subtitle: "Featured Software & Models" },
  { id: "certifications", path: "/certifications", label: "Certificates", subtitle: "Industry Verifications" },
  { id: "education", path: "/education", label: "Education", subtitle: "Academic Milestones" },
  { id: "contact", path: "/contact", label: "Contact", subtitle: "Get in Touch" },
];

interface PageNavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function PageNavigation({ currentPath, onNavigate }: PageNavigationProps) {
  const currentIndex = PAGES.findIndex(
    (p) => p.path === currentPath || (currentPath === "" && p.path === "/")
  );

  const activeIndex = currentIndex === -1 ? 0 : currentIndex;
  const prevPage = activeIndex > 0 ? PAGES[activeIndex - 1] : null;
  const nextPage = activeIndex < PAGES.length - 1 ? PAGES[activeIndex + 1] : null;

  return (
    <nav
      aria-label="Pagination Navigation"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 mt-6 relative z-20"
    >
      <div className="liquid-glass-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/15 shadow-xl">
        
        {/* Previous Page Button */}
        <div className="w-full sm:w-auto flex justify-start">
          {prevPage ? (
            <button
              onClick={() => onNavigate(prevPage.path)}
              className="group flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-cyan-400/40 text-slate-200 hover:text-white transition-all cursor-pointer text-left"
              title={`Go to previous page: ${prevPage.label}`}
            >
              <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Previous</span>
                <span className="text-xs sm:text-sm font-semibold text-cyan-300">{prevPage.label}</span>
              </div>
            </button>
          ) : (
            <div className="hidden sm:block opacity-0 pointer-events-none px-4 py-2.5 text-xs font-mono">
              Placeholder
            </div>
          )}
        </div>

        {/* Center Progress & Step Dots */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2">
            {PAGES.map((page, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={page.id}
                  onClick={() => onNavigate(page.path)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? "w-8 h-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-sm shadow-cyan-400/50"
                      : "w-2.5 h-2.5 bg-white/20 hover:bg-white/50"
                  }`}
                  aria-label={`Jump to page ${index + 1}: ${page.label}`}
                  title={`${page.label} (${index + 1}/${PAGES.length})`}
                />
              );
            })}
          </div>
          <span className="text-[11px] font-mono text-slate-300">
            Page <span className="text-cyan-300 font-bold">{activeIndex + 1}</span> of {PAGES.length} &bull; {PAGES[activeIndex].label}
          </span>
        </div>

        {/* Next Page Button */}
        <div className="w-full sm:w-auto flex justify-end">
          {nextPage ? (
            <button
              onClick={() => onNavigate(nextPage.path)}
              className="group flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-cyan-400/40 text-slate-200 hover:text-white transition-all cursor-pointer text-right"
              title={`Go to next page: ${nextPage.label}`}
            >
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Next</span>
                <span className="text-xs sm:text-sm font-semibold text-cyan-300">{nextPage.label}</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ) : (
            <button
              onClick={() => onNavigate("/")}
              className="group flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-400/30 text-slate-200 hover:text-white transition-all cursor-pointer"
              title="Return to Home page"
            >
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300">Finished</span>
                <span className="text-xs sm:text-sm font-semibold text-white">Back to Home</span>
              </div>
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300">
                <HomeIcon className="w-4 h-4" />
              </div>
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}
