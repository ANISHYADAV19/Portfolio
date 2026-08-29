import { Github, ExternalLink, FolderGit2 } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  technologies: string[];
  githubUrl: string;
}

export default function Projects() {
  const projects: ProjectItem[] = [
    {
      id: "say-pay",
      title: "Say & Pay",
      description: "A voice-driven shopping list manager and assistant that uses a hybrid intent parser combining a fast offline rule engine and a serverless Google Gemini LLM proxy.",
      bullets: [
        "Implemented hands-free voice control utilizing the Web Speech API with live transcript overlays and a typed fallback system",
        "Developed a hybrid parsing engine combining an offline rule-based parser with a serverless Gemini API proxy for multilingual and free-form NLP",
        "Created an auto-categorized inventory model featuring semantic voice search, smart product suggestions, and local state management",
        "Designed the system to be secure by design with server-side LLM key hosting and client-side command contract validation"
      ],
      technologies: ["React", "Gemini API", "Web Speech API", "Natural Language Processing", "Local Storage"],
      githubUrl: "https://github.com/ANISHYADAV19/Say-Pay"
    },
    {
      id: "nutriscan",
      title: "NutriScan",
      description: "A real-time, multi-threaded webcam barcode and QR code reader featuring a non-blocking asynchronous architecture and a 2-stage cascading database lookup.",
      bullets: [
        "Engineered a multi-threaded Python application with a non-blocking background queue to maintain 30+ FPS during network lookups",
        "Implemented a 2-stage cascading API lookup using Open Food Facts and Open Pet Food Facts to resolve food and pet items",
        "Designed a focused scanning viewport with live sizing controls and dual-engine fallback (pyzbar and OpenCV) for high accuracy"
      ],
      technologies: ["Python", "OpenCV", "Pyzbar", "APIs", "Multithreading"],
      githubUrl: "https://github.com/ANISHYADAV19/NutriScan"
    },
    {
      id: "story-gen",
      title: "AI Story Generator",
      description: "A creative AI-powered application that leverages deep generation pipelines to compose customizable stories with adjustable parameters and an elegant responsive user interface.",
      bullets: [
        "Developed AI-powered story generation application using Python/Flask with modern web frontend",
        "Integrated artificial intelligence algorithms for creative content generation with customizable parameters",
        "Built responsive user interface for seamless story creation and management experience"
      ],
      technologies: ["Python", "Flask", "Artificial Intelligence", "HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/ANISHYADAV19/AI-Story-Generator"
    },
    {
      id: "object-rec",
      title: "Object-Recognition-in-Images",
      description: "A custom Convolutional Neural Network (CNN) trained and optimized to classify objects across ten distinct categories using the benchmark CIFAR-10 dataset.",
      bullets: [
        "Implements a Convolutional Neural Network (CNN) for object recognition using the CIFAR-10 dataset",
        "Designed to classify images across ten distinct categories with high accuracy and parameter efficiency",
        "Utilized deep learning methodologies including custom convolution kernels, max-pooling, and dropout grids"
      ],
      technologies: ["Python", "TensorFlow", "CNN", "OpenCV", "NumPy", "Matplotlib"],
      githubUrl: "https://github.com/ANISHYADAV19/Object-Recognition-in-Images"
    },
    {
      id: "traffic-density",
      title: "Smart Traffic Density Estimator",
      description: "A real-time intelligent traffic management solution leveraging computer vision and deep learning to detect vehicles, measure traffic density, and optimize signal timing.",
      bullets: [
        "Developed an automated computer vision pipeline using OpenCV and object detection (YOLO) to analyze vehicle movement",
        "Estimates vehicle count and density per lane in real-time to compute dynamic signal control logic and reduce congestion",
        "Features visual bounding box tracking, lane queue analysis, and traffic flow monitoring across multi-lane camera feeds"
      ],
      technologies: ["Python", "OpenCV", "YOLO", "Computer Vision", "Deep Learning", "NumPy"],
      githubUrl: "https://github.com/ANISHYADAV19/Smart-Traffic-Density-Estimator"
    }
  ];

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24 px-4 sm:px-6 md:px-12 relative">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 liquid-glass-pill px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <FolderGit2 size={14} className="text-blue-600" />
            <span className="text-xs font-mono text-blue-700 font-bold tracking-wider uppercase">Engineered Software</span>
          </div>
          <h2 id="projects-heading" className="text-3xl md:text-5xl font-light text-slate-950 tracking-tight">
            Featured <span className="font-serif italic text-blue-600 font-medium">Projects</span>
          </h2>
          <p className="text-sm text-slate-600 font-sans mt-2 max-w-xl">
            Selected machine learning architectures, computer vision pipelines, and intelligent interactive web applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <article 
              key={project.id}
              className="liquid-glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl border border-white/80 group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-200/70">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-semibold text-slate-950 group-hover:text-blue-600 transition duration-250">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-blue-600 font-bold mt-1 uppercase tracking-wider">
                      Repository &bull; Open Source
                    </p>
                  </div>

                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    referrerPolicy="no-referrer"
                    aria-label={`View ${project.title} on GitHub (opens in new tab)`}
                    className="p-3 rounded-full liquid-glass-pill text-slate-700 hover:text-white hover:bg-slate-950 transition-all duration-300 shadow-xs group-hover:scale-110 shrink-0"
                  >
                    <Github className="w-5 h-5" aria-hidden="true" />
                  </a>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-700 font-sans leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Highlights List */}
                <ul className="space-y-2 mb-6">
                  {project.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-600 flex items-start space-x-2">
                      <span className="text-blue-600 font-bold mt-0.5 flex-shrink-0">&bull;</span>
                      <span className="leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Tech Stack & Link */}
              <div className="pt-4 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
                  {project.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/70 border border-white/90 text-slate-800 shadow-2xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-blue-600 hover:text-blue-800 transition whitespace-nowrap"
                >
                  <span>Source Code</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
