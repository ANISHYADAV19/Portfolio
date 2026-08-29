import { Calendar, CircleDot, GraduationCap } from "lucide-react";

interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  gradeLabel: string;
  gradeValue: string;
  percentageProgress: number;
  bullets: string[];
}

export default function Education() {
  const educationHistory: EducationItem[] = [
    {
      institution: "VIT Bhopal University",
      degree: "B.Tech in Computer Science Engineering (Specializing in AI & ML)",
      duration: "2023 – 2027 (Ongoing)",
      gradeLabel: "CGPA",
      gradeValue: "8.23 / 10.0",
      percentageProgress: 82.3,
      bullets: [
        "Focused heavily on Core Algorithms, Machine Learning Architectures, Deep Learning Layers, and Web Application design.",
        "Active member of the technical computing societies, organizing and building deep learning pipelines."
      ]
    }
  ];

  return (
    <section id="education" aria-labelledby="education-heading" className="py-24 px-4 sm:px-6 md:px-12 relative">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 liquid-glass-pill px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <GraduationCap size={14} className="text-cyan-400" />
            <span className="text-xs font-mono text-cyan-300 font-bold tracking-wider uppercase">Academic Background</span>
          </div>
          <h2 id="education-heading" className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Education <span className="font-serif italic text-cyan-400 font-medium drop-shadow-[0_0_20px_rgba(6,182,212,0.35)]">Timeline</span>
          </h2>
          <p className="text-sm text-slate-300 font-sans mt-2 max-w-xl">
            Undergraduate engineering coursework, theoretical foundations, and ongoing academic milestones.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto relative pl-6 md:pl-12 border-l-2 border-white/20 space-y-12">
          {educationHistory.map((item, idx) => (
            <div key={idx} className="relative group">
              
              {/* Timeline dot */}
              <div className="absolute -left-[33px] md:-left-[57px] top-4 p-1.5 liquid-glass-pill rounded-full shadow-md">
                <CircleDot className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>

              {/* Box Content */}
              <div className="liquid-glass-card p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider block mb-1 font-bold">
                      Undergraduate Program
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-semibold text-white group-hover:text-cyan-300 transition duration-300">
                      {item.institution}
                    </h3>
                    <p className="text-sm font-sans text-slate-200 font-medium mt-1">
                      {item.degree}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-mono text-slate-100 font-bold liquid-glass-pill px-4 py-1.5 rounded-full self-start md:self-center shadow-2xs">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {item.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="text-xs sm:text-sm text-slate-300 flex items-start space-x-2">
                      <span className="text-cyan-400 font-bold mt-0.5 flex-shrink-0">&bull;</span>
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Academic Metrics Bar */}
                <div className="pt-4 border-t border-white/10 max-w-md">
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-slate-400 uppercase font-semibold">{item.gradeLabel} Rating:</span>
                    <span className="text-cyan-300 font-extrabold">{item.gradeValue}</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden border border-white/15">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(6,182,212,0.8)]" 
                      style={{ width: `${item.percentageProgress}%` }}
                    />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
