import { Calendar, CircleDot } from "lucide-react";

interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  gradeLabel: string;
  gradeValue: string;
  percentageProgress: number; // For rendering visual score bars
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
    <section id="education" aria-labelledby="education-heading" className="py-24 px-6 bg-dark-bg border-t border-white/10 relative">
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-cyber-blue/5 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="text-xs font-mono text-cyber-blue tracking-wider uppercase mb-2">My Foundation</p>
          <h2 id="education-heading" className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Education <span className="font-serif italic text-cyber-blue">Timeline</span>
          </h2>
          <div className="h-0.5 w-16 bg-cyber-blue mt-4 mx-auto" />
        </div>

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto relative pl-6 md:pl-12 border-l border-white/10 space-y-12">
          {educationHistory.map((item, idx) => (
            <div key={idx} className="relative group">
              
              {/* Timeline dot */}
              <div className="absolute -left-[31px] md:-left-[55px] top-1.5 p-1 bg-dark-bg border border-white/10 rounded-full group-hover:border-cyber-blue transition duration-300">
                <CircleDot className="w-4 h-4 text-cyber-blue animate-pulse" />
              </div>

              {/* Box Content */}
              <div className="liquid-glass p-6 md:p-8 rounded-xl shadow-lg hover:bg-white/5 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-cyber-blue uppercase tracking-wider block mb-1">
                      Undergraduate Program
                    </span>
                    <h3 className="text-lg md:text-2xl font-display font-medium text-white group-hover:text-cyber-blue transition duration-300">
                      {item.institution}
                    </h3>
                    <p className="text-sm font-sans text-gray-300 font-medium mt-1">
                      {item.degree}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-mono text-gray-400 bg-dark-bg/80 border border-white/10 p-2 rounded self-start md:self-center">
                    <Calendar className="w-3.5 h-3.5 text-cyber-blue" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {item.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="text-xs md:text-sm text-gray-400 flex items-start space-x-2">
                      <span className="text-cyber-blue mt-1.5 flex-shrink-0">▪</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Academic Metrics Bar */}
                <div className="pt-4 border-t border-white/10 max-w-md">
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-gray-500 uppercase">{item.gradeLabel} Rating:</span>
                    <span className="text-white font-bold">{item.gradeValue}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div 
                      className="h-full bg-cyber-blue rounded-full transition-all duration-1000" 
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
