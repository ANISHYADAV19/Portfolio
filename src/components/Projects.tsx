import { Github } from "lucide-react";

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
    <section id="projects" aria-labelledby="projects-heading" className="py-24 px-6 bg-dark-bg border-t border-white/10 relative">
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-cyber-blue/5 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-mono text-cyber-blue tracking-wider uppercase mb-2">My Craft</p>
          <h2 id="projects-heading" className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Featured <span className="font-serif italic text-cyber-blue">Projects</span>
          </h2>
          <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
            Explore my machine learning, deep learning, and software engineering projects.
          </p>
          <div className="h-0.5 w-16 bg-cyber-blue mt-4 mx-auto" />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-dark-card border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col h-full group"
            >
              {/* Card visual accent */}
              <div className="h-1 w-full bg-gradient-to-r from-cyber-blue to-cyber-purple opacity-40 group-hover:opacity-100 transition duration-300" />
              
              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex justify-end items-center mb-4">
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      referrerPolicy="no-referrer"
                      rel="noreferrer"
                      className="text-gray-500 hover:text-white transition"
                      title={`${project.title} on GitHub`}
                      aria-label={`${project.title} source code on GitHub`}
                    >
                      <Github className="w-5 h-5" aria-hidden="true" />
                    </a>
                  </div>

                  <h3 className="text-2xl font-display font-medium text-white mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {project.bullets.map((b, idx) => (
                      <li key={idx} className="text-xs text-gray-400 flex items-start space-x-2">
                        <span className="text-cyber-blue mt-1" aria-hidden="true">▪</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-dark-bg border border-white/10 text-[10px] font-mono text-gray-400">
                        {t}
                      </span>
                    ))}
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

