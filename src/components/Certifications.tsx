import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Cpu, Calendar, Award, Cloud, Wifi, Brain, Eye, ExternalLink, X } from "lucide-react";

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: number;
  bullets: string[];
  glowColor: string;
  imageUrl?: string;
}

export default function Certifications() {
  const [selectedCertImage, setSelectedCertImage] = useState<{ title: string; url: string } | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedCertImage) {
      const previouslyFocused = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      // Move focus into the dialog so keyboard users are not left behind it.
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedCertImage(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
        previouslyFocused?.focus();
      };
    }
  }, [selectedCertImage]);

  const certificates: CertificateItem[] = [
    {
      id: "ibm-gen-ai",
      title: "Generative AI Certification",
      issuer: "IBM",
      year: 2025,
      bullets: [
        "Comprehensive certification covering state-of-the-art generative AI technologies, transformer modules, and neural weights.",
        "Hands-on expertise in advanced Prompt Engineering, fine-tuning structures, and AI model production implementation."
      ],
      glowColor: "hover:border-cyber-blue/40 hover:shadow-cyber-blue/10",
      imageUrl: "https://res.cloudinary.com/mjob3d9y/image/upload/v1784737446/IBM_Certificate__page-0001_a37gm2.jpg"
    },
    {
      id: "umich-ml-python",
      title: "Applied Machine Learning in Python",
      issuer: "University of Michigan (Coursera)",
      year: 2025,
      bullets: [
        "Authorized online course certification by the University of Michigan covering supervised & unsupervised learning, model evaluation, and feature engineering.",
        "Applied scikit-learn, decision trees, support vector machines, and neural networks to practical Python machine learning challenges (Verify Code: TJ0LEUE5XU3L)."
      ],
      glowColor: "hover:border-cyber-blue/40 hover:shadow-cyber-blue/10",
      imageUrl: "https://res.cloudinary.com/mjob3d9y/image/upload/v1784829072/Coursera_certificate__page-0001_ummtux.jpg"
    },
    {
      id: "nptel-cloud-computing",
      title: "Cloud Computing (Elite Certification)",
      issuer: "IIT Kharagpur / NPTEL",
      year: 2025,
      bullets: [
        "Awarded 'Elite' certification by IIT Kharagpur & NPTEL (MoE, Govt. of India) for completing 12-week Cloud Computing course with 64% score.",
        "Mastered key concepts in cloud architectures, virtualization, distributed storage, and task scheduling (Roll No: NPTEL25CS11S953703821)."
      ],
      glowColor: "hover:border-cyber-blue/40 hover:shadow-cyber-blue/10"
    },
    {
      id: "nptel-iot",
      title: "Introduction to Internet of Things (Elite Certification)",
      issuer: "IIT Kharagpur / NPTEL",
      year: 2026,
      bullets: [
        "Awarded 'Elite' certification by IIT Kharagpur & NPTEL (MoE, Govt. of India) for completing 12-week IoT course with an 80% score.",
        "Mastered IoT architecture, sensor networks, communication protocols, cloud/edge integration, and smart systems (Roll No: NPTEL26CS37S852403156)."
      ],
      glowColor: "hover:border-cyber-blue/40 hover:shadow-cyber-blue/10",
      imageUrl: "https://res.cloudinary.com/mjob3d9y/image/upload/v1784737681/NPTEL_-_Introduction_to_Internet_of_Things_page-0001_jwjncs.jpg"
    },
    {
      id: "lt-edge-ai",
      title: "Certificate in AI & Edge Computing for Industry Applications",
      issuer: "Larsen & Toubro (L&T)",
      year: 2025,
      bullets: [
        "Specialized academic training in implementing artificial intelligence models on localized edge hardware modules.",
        "Engineered industrial edge solutions for computer vision-guided sorting, sensory forecasting, and automated pipelines."
      ],
      glowColor: "hover:border-cyber-green/40 hover:shadow-cyber-green/10",
      imageUrl: "https://res.cloudinary.com/mjob3d9y/image/upload/v1784737468/L_T_Certificate_page-0001_tbjvib.jpg"
    }
  ];

  return (
    <section id="certifications" aria-labelledby="certifications-heading" className="py-24 px-6 bg-dark-bg border-t border-white/10 relative">
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="text-xs font-mono text-cyber-blue tracking-wider uppercase mb-2">Credentials & Certifications</p>
          <h2 id="certifications-heading" className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Professional <span className="font-serif italic text-cyber-blue">Certifications</span>
          </h2>
          <div className="h-0.5 w-16 bg-cyber-blue mt-4 mx-auto" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certificates.map((cert) => (
            <div 
              key={cert.id}
              className={`bg-dark-card border border-white/10 p-6 md:p-8 rounded-xl shadow-lg transition-all duration-300 ${cert.glowColor} flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-start space-x-3.5">
                    <div className="p-2.5 rounded bg-dark-bg border border-white/10 text-gray-400 group-hover:text-cyber-blue transition duration-300" aria-hidden="true">
                      {cert.id.startsWith("ibm") ? (
                        <Sparkles className="w-5 h-5 text-cyber-blue" />
                      ) : cert.id.includes("ml") ? (
                        <Brain className="w-5 h-5 text-cyber-blue" />
                      ) : cert.id.includes("cloud") ? (
                        <Cloud className="w-5 h-5 text-cyber-blue" />
                      ) : cert.id.includes("iot") ? (
                        <Wifi className="w-5 h-5 text-cyber-blue" />
                      ) : (
                        <Cpu className="w-5 h-5 text-cyber-blue" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-display font-medium text-white leading-tight">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-mono text-gray-400 mt-1">
                        Issuer: <span className="text-white font-semibold">{cert.issuer}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-dark-bg border border-white/10 text-xs font-mono text-gray-400 shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-cyber-blue" aria-hidden="true" />
                    <span>{cert.year}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {cert.bullets.map((bullet, idx) => (
                    <p key={idx} className="text-sm text-gray-400 leading-relaxed font-sans">
                      • {bullet}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-500">
                <span className="flex items-center space-x-1.5 text-gray-400">
                  <Award className="w-4 h-4 text-cyber-blue" />
                  <span>Verified Credential</span>
                </span>

                {cert.imageUrl ? (
                  <button
                    id={`view-cert-${cert.id}`}
                    onClick={() => setSelectedCertImage({ title: cert.title, url: cert.imageUrl! })}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-cyber-blue/10 hover:bg-cyber-blue/20 border border-cyber-blue/30 text-cyber-blue hover:text-white text-xs font-mono font-medium transition duration-200 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>
                ) : (
                  <span className="text-[10px] text-gray-600 uppercase tracking-widest">{cert.issuer}</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Certificate Image Full-Window Modal Lightbox via React Portal */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedCertImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedCertImage.title} certificate`}
              className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 w-screen h-screen overflow-y-auto"
              onClick={() => setSelectedCertImage(null)}
            >
              {/* Top Navigation Bar */}
              <div 
                className="flex items-center justify-between px-4 py-3 bg-dark-card/90 border border-white/15 rounded-xl backdrop-blur-md shadow-2xl shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue shrink-0">
                    <Award className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="truncate">
                    <h3 className="text-sm sm:text-base md:text-lg font-display font-medium text-white truncate">
                      {selectedCertImage.title}
                    </h3>
                    <p className="text-[11px] font-mono text-cyber-blue/80 hidden sm:block">
                      Verified Credential Document • Click anywhere outside or press ESC to close
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 shrink-0">
                  <a
                    href={selectedCertImage.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-300 hover:text-white transition"
                    title="Open high-resolution original in new tab"
                  >
                    <ExternalLink className="w-4 h-4 text-cyber-blue" aria-hidden="true" />
                    <span className="hidden sm:inline">Open Original</span>
                    <span className="sr-only">Open original certificate (opens in a new tab)</span>
                  </a>

                  <button
                    ref={closeButtonRef}
                    onClick={() => setSelectedCertImage(null)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 transition cursor-pointer flex items-center justify-center"
                    aria-label="Close certificate viewer"
                    title="Close (ESC)"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Main Full Window Image Preview */}
              <div 
                className="flex-1 min-h-0 w-full flex items-center justify-center my-1 sm:my-2 relative overflow-auto p-1 sm:p-2"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  src={selectedCertImage.url}
                  alt={selectedCertImage.title}
                  className="max-w-full max-h-[calc(100vh-85px)] object-contain rounded-xl shadow-2xl border border-white/20 select-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
