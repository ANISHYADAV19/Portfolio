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
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
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
      icon: <Code className="w-5 h-5 text-cyan-400" />,
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
          level: 70, 
          info: "Solid understanding of computational complexity, memory management, algorithms, and core procedural constructs." 
        },
        { 
          name: "JavaScript", 
          level: 80, 
          info: "Modern ES6+ JavaScript, asynchronous operations, event-driven interfaces, and DOM manipulation for responsive web applications." 
        }
      ]
    },
    {
      title: "Frameworks & Web Stack",
      icon: <Server className="w-5 h-5 text-purple-400" />,
      skills: [
        { 
          name: "TensorFlow & Keras", 
          level: 85, 
          info: "Extensive experience designing, training, pruning, and evaluating deep convolutional and recurrent networks." 
        },
        { 
          name: "React & Vite", 
          level: 85, 
          info: "Building fast, dynamic single-page applications with TypeScript, reusable functional components, and custom hooks." 
        },
        { 
          name: "Tailwind CSS", 
          level: 90, 
          info: "Crafting fluid, modern responsive layouts, custom design systems, liquid glass effects, and accessible UI components." 
        },
        { 
          name: "Flask", 
          level: 75, 
          info: "Developing lightweight REST APIs, microservices, and serving machine learning inferences for real-time applications." 
        }
      ]
    },
    {
      title: "Data & Developer Tools",
      icon: <Database className="w-5 h-5 text-blue-400" />,
      skills: [
        { 
          name: "MySQL & MongoDB", 
          level: 75, 
          info: "Designing relational database schemas, writing complex SQL queries, and handling unstructured document stores in MongoDB." 
        },
        { 
          name: "OpenCV", 
          level: 85, 
          info: "Real-time computer vision, webcam frame processing, barcode scanning, filtering, and bounding box detections." 
        },
        { 
          name: "NumPy & Pandas", 
          level: 90, 
          info: "High-performance data manipulation, multidimensional array computing, dataset cleansing, and exploratory data analysis." 
        },
        { 
          name: "Git & GitHub", 
          level: 85, 
          info: "Strong expertise in source control, branching, clean commits, rebasing, pull-requests, and collaborating on platforms like GitHub." 
        }
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
            Interactive skill matrix across Artificial Intelligence, Machine Learning, Web Engineering, and Core Technologies.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Skill Blocks - Left Side (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, catIdx) => (
              <div 
                key={catIdx} 
                className="liquid-glass-card rounded-3xl p-6 flex flex-col space-y-4 shadow-xl border border-white/20"
              >
                <div className="flex items-center space-x-3 pb-3 border-b border-white/10">
                  <div className="p-2 rounded-2xl bg-white/10 border border-white/15 shadow-xs">
                    <span aria-hidden="true">{category.icon}</span>
                  </div>
                  <h3 className="text-base font-display font-semibold text-white">{category.title}</h3>
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
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-250 cursor-pointer flex flex-col space-y-2 ${
                          isActive
                            ? "bg-blue-600/30 border-cyan-400 shadow-lg scale-[1.02] text-white"
                            : "bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/25 text-slate-200 shadow-xs"
                        }`}
                      >
                        <div className="flex justify-between items-center text-xs" aria-hidden="true">
                          <span className={`font-mono font-semibold ${isActive ? "text-cyan-300 font-bold" : "text-slate-100"}`}>
                            {skill.name}
                          </span>
                          <span className="text-xs text-slate-300 font-mono font-bold">{skill.level}%</span>
                        </div>

                        {/* Visual progress bar */}
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden" aria-hidden="true">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isActive ? "bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" : "bg-slate-400/60"
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
            <div className="liquid-glass-card rounded-3xl p-6 md:p-8 shadow-2xl border border-white/25 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/15">
                <div className="flex items-center space-x-2.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${activeSkill ? "bg-cyan-400 animate-ping" : "bg-slate-400"}`} />
                  <span className="text-xs font-mono text-cyan-300 font-extrabold uppercase tracking-widest">Skill Analyzer</span>
                </div>
                <HelpCircle className="w-4 h-4 text-slate-400" />
              </div>

              {!activeSkill ? (
                <div className="py-8 px-2 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-cyan-400 shadow-inner">
                    <MousePointerClick className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-lg font-display font-semibold text-white">
                      Click on a skill to analyze
                    </h4>
                    <p className="text-xs text-slate-300 max-w-xs font-sans leading-relaxed">
                      Select any skill item on the left to inspect practical applications, specialized coursework, and technical proficiency.
                    </p>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 border-t border-white/15 pt-4 w-full flex justify-between">
                    <span>ENGINE: LIQUID_ANALYSIS</span>
                    <span className="text-emerald-400 font-bold">STATUS: READY</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="text-2xl md:text-3xl font-serif italic font-bold text-white">
                    {activeSkill.name}
                  </h4>

                  <div className="flex items-center space-x-2 font-mono text-xs">
                    <span className="text-slate-300">Proficiency:</span>
                    <span className="text-emerald-300 bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-0.5 rounded-full font-bold">
                      {activeSkill.level}% (High Mastery)
                    </span>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/15 rounded-2xl min-h-[120px] flex items-start space-x-3 shadow-inner">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-200 font-sans leading-relaxed">
                      {activeSkill.info}
                    </p>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 border-t border-white/15 pt-4 flex justify-between">
                    <span>ENGINE: LIQUID_ANALYSIS</span>
                    <span className="text-cyan-300 font-bold">STATUS: INSPECTING</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Guide message */}
            <p className="text-xs text-center text-slate-300 mt-4 font-mono font-medium">
              💡 Select any skill item on the left to inspect professional context.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
