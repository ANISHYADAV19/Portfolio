import { Calendar, CircleDot } from "lucide-react";

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
    <section id="education" aria-labelledby="education-heading" className="py-24 px-6 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="text-xs font-mono text-blue-600 font-semibold tracking-wider uppercase mb-2">My Foundation</p>
          <h2 id="education-heading" className="text-3xl md:text-5xl font-light text-slate-900 tracking-tight">
            Education <span className="font-serif italic text-blue-600 font-medium">Timeline</span>
          </h2>
          <div className="h-0.5 w-16 bg-blue-600 mt-4 mx-auto" />
        </div>

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto relative pl-6 md:pl-12 border-l-2 border-slate-200 space-y-12">
          {educationHistory.map((item, idx) => (
            <div key={idx} className="relative group">
              
              {/* Timeline dot */}
              <div className="absolute -left-[32px] md:-left-[57px] top-2 p-1 bg-white border-2 border-blue-600 rounded-full shadow-xs">
                <CircleDot className="w-4 h-4 text-blue-600 animate-pulse" />
              </div>

              {/* Box Content */}
              <div className="liquid-glass p-6 md:p-8 rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 border border-slate-200 bg-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-mono text-blue-600 uppercase tracking-wider block mb-1 font-semibold">
                      Undergraduate Program
                    </span>
                    <h3 className="text-lg md:text-2xl font-display font-semibold text-slate-900 group-hover:text-blue-600 transition duration-300">
                      {item.institution}
                    </h3>
                    <p className="text-sm font-sans text-slate-700 font-medium mt-1">
                      {item.degree}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-mono text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-md self-start md:self-center">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {item.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="text-xs md:text-sm text-slate-600 flex items-start space-x-2">
                      <span className="text-blue-600 font-bold mt-1 flex-shrink-0">▪</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Academic Metrics Bar */}
                <div className="pt-4 border-t border-slate-100 max-w-md">
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-slate-500 uppercase">{item.gradeLabel} Rating:</span>
                    <span className="text-slate-900 font-bold">{item.gradeValue}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-1000" 
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
