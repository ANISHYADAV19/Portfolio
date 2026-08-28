import { useState, type ReactNode } from "react";
import { Code, Server, Database, Sparkles, HelpCircle, CheckCircle2, MousePointerClick } from "lucide-react";

interface SkillItem {
  name: string;
  level: number;
  info: string;
}

interface SkillCategory {
  title: string;
  icon: ReactNode;
  skills: SkillItem[];
}

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  const categories: SkillCategory[] = [
    {
      title: "AI & ML Specializations",
      icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
      skills: [
        { 
          name: "Edge Computing", 
          level: 85, 
          info: "Completed specialized industrial training at Larsen & Toubro (L&T) focusing on deploying lightweight intelligence on edge hardware for industrial automated scenarios." 
        },
        { 
          name: "Data Visualization", 
          level: 80, 
          info: "Proficient in designing charts and layout architectures to render training metrics, feature maps, and predictive confidences elegantly." 
        },
        { 
          name: "Neural Networks (CNNs)", 
          level: 85, 
          info: "Built customized convolutional architectures for accurate image classification (CIFAR-10) maximizing parameter efficiency and precision." 
        },
        { 
          name: "Generative AI", 
          level: 80, 
          info: "Certified by IBM in Generative AI. Skilled in prompt engineering, leveraging LLMs, and integrating creative generation parameters in apps." 
        }
      ]
    },
    {
      title: "Programming Languages",
      icon: <Code className="w-5 h-5 text-blue-600" />,
      skills: [
        { 
          name: "Python", 
          level: 90, 
          info: "Primary language for data science and deep learning. Skilled in NumPy, Pandas, TensorFlow/Keras, and Flask for serving intelligence." 
        },
        { 
          name: "Java", 
          level: 75, 
          info: "Strong foundational knowledge of Object-Oriented programming, data structures, and algorithms for system software development." 
        },
        { 
          name: "C++", 
          level: 75, 
          info: "Utilized for competitive coding, resource-constrained algorithmic tasks, and hardware-level performance engineering." 
        }
      ]
    },
    {
      title: "Web Development",
      icon: <Server className="w-5 h-5 text-purple-600" />,
      skills: [
        { 
          name: "React.js", 
          level: 80, 
          info: "Built complex single-page apps using modern states, standard Vite hooks, Tailwind responsive grids, and motion animations." 
        },
        { 
          name: "Node.js & RESTful APIs", 
          level: 75, 
          info: "Engineered scalable backends and custom routing endpoints. Experienced in serving models and structured JSON payloads." 
        },
        { 
          name: "HTML5 & CSS3", 
          level: 85, 
          info: "Crafted accessible structures, fluid layouts, custom CSS animations, custom scrollbars, and modern responsive interfaces." 
        }
      ]
    },
    {
      title: "Databases & Tools",
      icon: <Database className="w-5 h-5 text-slate-600" />,
      skills: [
        { 
          name: "SQL & DB Management", 
          level: 80, 
          info: "Knowledgeable in relational queries, structured tables, database normalization, indexing, and persistent schema design." 
        },
        { 
          name: "Git & Version Control", 
          level: 85, 
          info: "Strong expertise in source control, branching, clean commits, rebasing, pull-requests, and collaborating on platforms like GitHub." 
        }
      ]
    }
  ];

  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-24 px-6 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left">
          <p className="text-xs font-mono text-blue-600 font-semibold tracking-wider uppercase mb-2">Technical Capabilities</p>
          <h2 id="skills-heading" className="text-3xl md:text-5xl font-light text-slate-900 tracking-tight">
            Skills & <span className="font-serif italic text-blue-600 font-medium">Specializations</span>
          </h2>
          <div className="h-0.5 w-16 bg-blue-600 mt-4 mx-auto lg:mx-0" />
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Skill Blocks - Left Side (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, catIdx) => (
              <div 
                key={catIdx} 
                className="liquid-glass rounded-2xl p-6 flex flex-col space-y-4 shadow-xs hover:shadow-md transition duration-300"
              >
                <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
                  <span aria-hidden="true">{category.icon}</span>
                  <h3 className="text-sm font-display font-semibold text-slate-900">{category.title}</h3>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill, skIdx) => {
                    const isActive = activeSkill?.name === skill.name;
                    return (
                      <button
                        key={skIdx}
                        onClick={() => setActiveSkill(skill)}
                        aria-pressed={isActive}
                        aria-label={`${skill.name}, ${skill.level} percent — show details`}
                        className={`w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col space-y-2 ${
                          isActive
                            ? "bg-blue-50/90 border-blue-500 shadow-xs"
                            : "bg-white/70 border-slate-200/80 hover:bg-slate-50 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex justify-between items-center text-xs" aria-hidden="true">
                          <span className={`font-mono font-medium ${isActive ? "text-blue-700 font-semibold" : "text-slate-800"}`}>
                            {skill.name}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">{skill.level}%</span>
                        </div>

                        {/* Visual progress bar */}
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden" aria-hidden="true">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isActive ? "bg-blue-600" : "bg-slate-400/80"
                            }`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Skill Detail Card - Right Side (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 p-6 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${activeSkill ? "bg-blue-600 animate-pulse" : "bg-slate-400"}`} />
                  <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-widest">Skill Analyzer</span>
                </div>
                <HelpCircle className="w-4 h-4 text-slate-400" />
              </div>

              {!activeSkill ? (
                <div className="py-6 px-2 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    <MousePointerClick className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-lg font-display font-semibold text-slate-900">
                      Click on a skill to analyze
                    </h4>
                    <p className="text-xs text-slate-600 max-w-xs font-sans leading-relaxed">
                      Select any skill item from the categories on the left to inspect detailed expertise metrics and project context.
                    </p>
                  </div>
                  <div className="text-xs font-mono text-slate-400 border-t border-slate-100 pt-4 w-full flex justify-between">
                    <span>SYSTEM: SKILL_MATRIX</span>
                    <span>STATUS: READY</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="text-2xl font-serif italic font-bold text-slate-900">
                    {activeSkill.name}
                  </h4>

                  <div className="flex items-center space-x-2 font-mono text-xs">
                    <span className="text-slate-500">Expertise Level:</span>
                    <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                      {activeSkill.level}% (Proficient)
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl min-h-[120px] flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-700 font-sans leading-relaxed">
                      {activeSkill.info}
                    </p>
                  </div>

                  <div className="text-xs font-mono text-slate-400 border-t border-slate-100 pt-4 flex justify-between">
                    <span>SYSTEM: SKILL_MATRIX</span>
                    <span>STATUS: ACTIVE</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Guide message */}
            <p className="text-xs text-center text-slate-500 mt-4 font-mono">
              💡 Select any skill item on the left to inspect professional context.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
