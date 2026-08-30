import { type ReactNode } from "react";
import { Code, Server, Database, Sparkles, Check } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: ReactNode;
  skills: string[];
}

export default function Skills() {
  const categories: SkillCategory[] = [
    {
      title: "AI & ML Specializations",
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      skills: [
        "Edge Computing (L&T Industrial Training)",
        "Data Visualization & Model Metrics",
        "Neural Networks (CNNs & CIFAR-10)",
        "Generative AI & Prompt Engineering"
      ]
    },
    {
      title: "Programming Languages",
      icon: <Code className="w-5 h-5 text-cyan-400" />,
      skills: [
        "Python (NumPy, Pandas, TensorFlow)",
        "Java (OOP & Data Structures)",
        "C++ (Algorithms & Complexity)",
        "JavaScript (ES6+ & Asynchronous DOM)"
      ]
    },
    {
      title: "Frameworks & Web Stack",
      icon: <Server className="w-5 h-5 text-purple-400" />,
      skills: [
        "TensorFlow & Keras",
        "React & Vite (TypeScript)",
        "Tailwind CSS & Liquid Glass UI",
        "Flask & REST API Microservices"
      ]
    },
    {
      title: "Data & Developer Tools",
      icon: <Database className="w-5 h-5 text-blue-400" />,
      skills: [
        "MySQL & MongoDB",
        "OpenCV & Computer Vision",
        "NumPy & Pandas",
        "Git & GitHub Version Control"
      ]
    }
  ];

  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-24 px-4 sm:px-6 md:px-12 relative">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 liquid-glass-pill px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-xs font-mono text-cyan-300 font-bold tracking-wider uppercase">Technical Capabilities</span>
          </div>
          <h2 id="skills-heading" className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Skills & <span className="font-serif italic text-cyan-400 font-medium drop-shadow-[0_0_20px_rgba(6,182,212,0.35)]">Specializations</span>
          </h2>
          <p className="text-sm text-slate-300 font-sans mt-2 max-w-xl">
            Core technical proficiencies across Artificial Intelligence, Deep Learning, Software Development, and Modern Web Systems.
          </p>
        </div>

        {/* Responsive Grid - 2x2 Clean Crystal Transparent Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, catIdx) => (
            <div 
              key={catIdx} 
              className="liquid-glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl border border-white/20 group hover:border-white/35 transition-all duration-300"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center space-x-3.5 pb-4 mb-6 border-b border-white/10">
                  <div className="p-2.5 rounded-2xl bg-white/10 border border-white/15 shadow-xs group-hover:scale-105 transition-transform duration-300">
                    <span aria-hidden="true">{category.icon}</span>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-white tracking-wide">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {category.skills.map((skill, skIdx) => (
                    <div
                      key={skIdx}
                      className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-200 flex items-center space-x-3 shadow-xs"
                    >
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-cyan-300" />
                      </div>
                      <span className="font-mono text-xs sm:text-sm font-medium text-slate-100 leading-snug">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
