import { useState, ReactNode } from "react";
import { motion } from "motion/react";
import { Code, Server, Database, Sparkles, HelpCircle, CheckCircle2, MousePointerClick } from "lucide-react";

interface SkillItem {
  name: string;
  level: number;
  info: string;
}

interface SkillCategory {
  title: string;
  icon: ReactNode;
  colorClass: string;
  skills: SkillItem[];
}

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  const categories: SkillCategory[] = [
    {
      title: "AI & ML Specializations",
      icon: <Sparkles className="w-5 h-5 text-cyber-green" />,
      colorClass: "border-cyber-green/30 hover:border-cyber-green/80 text-cyber-green",
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
      icon: <Code className="w-5 h-5 text-cyber-blue" />,
      colorClass: "border-cyber-blue/30 hover:border-cyber-blue/80 text-cyber-blue",
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
      icon: <Server className="w-5 h-5 text-cyber-purple" />,
      colorClass: "border-cyber-purple/30 hover:border-cyber-purple/80 text-cyber-purple",
      skills: [
        { 
          name: "React.js", 
          level: 80, 
          info: "Built complex single-page apps using modern states, standard Vite hooks, Tailwind responsive grids, and framer motion layers." 
        },
        { 
          name: "Node.js & RESTful APIs", 
          level: 75, 
          info: "Engineered scalable backends and custom routing endpoints. Experienced in serving models and structured JSON payloads." 
        },
        { 
          name: "HTML5 & CSS3", 
          level: 85, 
          info: "Crafted accessible structures, fluid layouts, custom CSS animations, custom scrollbars, and modern design interfaces." 
        }
      ]
    },
    {
      title: "Databases & Tools",
      icon: <Database className="w-5 h-5 text-gray-400" />,
      colorClass: "border-gray-700 hover:border-gray-500 text-gray-300",
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
    <section id="skills" className="py-24 px-6 bg-dark-bg border-t border-white/10 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-blue/5 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left">
          <p className="text-xs font-mono text-cyber-blue tracking-wider uppercase mb-2">Technical Capabilities</p>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Skills & <span className="font-serif italic text-cyber-blue">Specializations</span>
          </h2>
          <div className="h-0.5 w-16 bg-cyber-blue mt-4 mx-auto lg:mx-0" />
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Skill Blocks - Left Side (8 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, catIdx) => (
              <div 
                key={catIdx} 
                className="bg-dark-card border border-white/10 p-6 rounded-xl hover:border-white/20 transition duration-300 flex flex-col space-y-4"
              >
                <div className="flex items-center space-x-2 pb-2 border-b border-white/10">
                  {category.icon}
                  <h3 className="text-sm font-display font-medium text-white">{category.title}</h3>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill, skIdx) => {
                    const isActive = activeSkill?.name === skill.name;
                    return (
                      <button
                        key={skIdx}
                        onClick={() => setActiveSkill(skill)}
                        className={`w-full text-left p-2.5 rounded-lg border transition duration-200 cursor-pointer flex flex-col space-y-1.5 ${
                          isActive 
                            ? "bg-cyber-blue/10 border-cyber-blue" 
                            : "bg-dark-bg/40 border-transparent hover:bg-white/5 hover:border-white/10"
                        }`}
                      >
                        <div className="flex justify-between items-center text-xs">
                          <span className={`font-mono font-medium ${isActive ? "text-cyber-blue" : "text-gray-300"}`}>
                            {skill.name}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono">{skill.level}%</span>
                        </div>
                        
                        {/* Custom visual progress bar */}
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              isActive ? "bg-cyber-blue" : "bg-white/20"
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
            <div className="bg-dark-card border border-cyber-blue/30 p-6 rounded-xl shadow-xl relative overflow-hidden tech-glow">
              {/* Scanline overlay for that tech aesthetic */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-blue/[0.01] to-transparent pointer-events-none" />

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${activeSkill ? "bg-cyber-blue animate-pulse" : "bg-gray-500"}`} />
                  <span className="text-xs font-mono text-cyber-blue uppercase tracking-widest">Skill Analyzer</span>
                </div>
                <HelpCircle className="w-4 h-4 text-gray-600" />
              </div>

              {!activeSkill ? (
                <div className="py-6 px-2 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center text-cyber-blue animate-bounce">
                    <MousePointerClick className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-lg font-display font-medium text-white">
                      Click on a skill to analyze
                    </h4>
                    <p className="text-xs text-gray-400 max-w-xs font-sans leading-relaxed">
                      Select any skill item from the categories on the left to inspect detailed expertise metrics and project context.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 border-t border-white/10 pt-4 w-full flex justify-between">
                    <span>SYSTEM: SKILL_MATRIX</span>
                    <span>STATUS: AWAITING_SELECTION</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="text-2xl font-serif italic font-bold text-white">
                    {activeSkill.name}
                  </h4>

                  <div className="flex items-center space-x-2 font-mono text-xs">
                    <span className="text-gray-500">Expertise Level:</span>
                    <span className="text-cyber-green bg-cyber-green/10 border border-cyber-green/20 px-2 py-0.5 rounded">
                      {activeSkill.level}% (Active)
                    </span>
                  </div>

                  <div className="p-4 bg-dark-bg border border-white/10 rounded-lg min-h-[120px] flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-cyber-blue mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-300 font-sans leading-relaxed">
                      {activeSkill.info}
                    </p>
                  </div>

                  <div className="text-[10px] font-mono text-gray-500 border-t border-white/10 pt-4 flex justify-between">
                    <span>SYSTEM: SKILL_MATRIX</span>
                    <span>STATUS: OPTIMIZED</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Guide message */}
            <p className="text-xs text-center text-gray-500 mt-4 font-mono">
              💡 Select any skill item on the left to inspect professional context.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
