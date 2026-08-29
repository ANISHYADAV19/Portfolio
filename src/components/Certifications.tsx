import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
import { Sparkles, Cpu, Calendar, Award, Cloud, Wifi, Brain, Eye, X, ShieldCheck } from "lucide-react";
import Button from "./Button";

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: number;
  bullets: string[];
  imageUrl?: string;
}

export default function Certifications() {
  const [selectedCertImage, setSelectedCertImage] = useState<{ title: string; url: string } | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedCertImage) {
      const previouslyFocused = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
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
      imageUrl: "https://res.cloudinary.com/mjob3d9y/image/upload/v1784737466/Coursera_TJ0LEUE5XU3L_page-0001_1_h5j9t7.jpg"
    },
    {
      id: "aws-cloud",
      title: "AWS Cloud Certification",
      issuer: "Amazon Web Services",
      year: 2024,
      bullets: [
        "In-depth architectural training on cloud computing paradigms, Amazon EC2, S3 storage tiers, IAM security, and auto-scaling.",
        "Explored serverless compute integrations and deploying resilient multi-tier microservice infrastructures."
      ],
      imageUrl: "https://res.cloudinary.com/mjob3d9y/image/upload/v1784737452/AWS_ACADEMY_CLOUD_SECURITY_BADGE_page-0001_a83v6y.jpg"
    },
    {
      id: "postman-api",
      title: "Postman API Fundamentals Student Expert",
      issuer: "Postman",
      year: 2024,
      bullets: [
        "Mastered REST API prototyping, dynamic mock servers, automated testing suites, and webhook validation.",
        "Built and debugged HTTP requests with custom headers, authentication payloads, and automated test runners."
      ],
      imageUrl: "https://res.cloudinary.com/mjob3d9y/image/upload/v1784737463/postman_student_expert_badge_page-0001_k7173e.jpg"
    },
    {
      id: "lt-edge",
      title: "Industrial Edge AI & IoT Training",
      issuer: "Larsen & Toubro (L&T)",
      year: 2024,
      bullets: [
        "Hands-on industrial engineering on sensor telemetry collection, edge inference acceleration, and microcontroller integration.",
        "Designed edge pipelines connecting edge intelligence with central telemetry dashboards."
      ],
      imageUrl: "https://res.cloudinary.com/mjob3d9y/image/upload/v1784737458/L_T_INTERNSHIP_CERTIFICATE_page-0001_c5fuxl.jpg"
    },
    {
      id: "stanford-ml",
      title: "Machine Learning Specialization",
      issuer: "DeepLearning.AI / Stanford Online",
      year: 2023,
      bullets: [
        "Foundational mastery of linear regression, logistic regression, cost gradient descent, and regularization techniques.",
        "Built anomaly detection models, recommender systems, and reinforcement learning policy gradients."
      ],
      imageUrl: "https://res.cloudinary.com/mjob3d9y/image/upload/v1784737460/ML_BY_ANDREW_NG_page-0001_1_u8o0om.jpg"
    }
  ];

  return (
    <section id="certifications" aria-labelledby="certifications-heading" className="py-24 px-4 sm:px-6 md:px-12 relative">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 liquid-glass-pill px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <ShieldCheck size={14} className="text-blue-600" />
            <span className="text-xs font-mono text-blue-700 font-bold tracking-wider uppercase">Accreditations</span>
          </div>
          <h2 id="certifications-heading" className="text-3xl md:text-5xl font-light text-slate-950 tracking-tight">
            Verified <span className="font-serif italic text-blue-600 font-medium">Certifications</span>
          </h2>
          <p className="text-sm text-slate-600 font-sans mt-2 max-w-xl">
            Formal technical certifications issued by IBM, Stanford Online, AWS, University of Michigan, and Larsen & Toubro.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certificates.map((cert) => (
            <div 
              key={cert.id}
              className="liquid-glass-card p-6 sm:p-8 rounded-3xl shadow-xl border border-white/80 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-slate-200/70">
                  <div className="flex items-start space-x-3.5">
                    <div className="p-2.5 rounded-2xl bg-blue-50/90 border border-blue-200 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition duration-300 shadow-2xs" aria-hidden="true">
                      {cert.id.startsWith("ibm") ? (
                        <Sparkles className="w-5 h-5" />
                      ) : cert.id.includes("ml") ? (
                        <Brain className="w-5 h-5" />
                      ) : cert.id.includes("cloud") ? (
                        <Cloud className="w-5 h-5" />
                      ) : cert.id.includes("iot") || cert.id.includes("edge") ? (
                        <Wifi className="w-5 h-5" />
                      ) : (
                        <Cpu className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-semibold text-slate-950 leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-mono text-slate-600 mt-1">
                        Issuer: <span className="text-blue-700 font-bold">{cert.issuer}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full liquid-glass-pill text-xs font-mono text-slate-800 font-bold shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                    <span>{cert.year}</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {cert.bullets.map((bullet, idx) => (
                    <p key={idx} className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                      &bull; {bullet}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs font-mono">
                <span className="flex items-center space-x-1.5 text-emerald-700 font-bold">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Verified</span>
                </span>

                {cert.imageUrl ? (
                  <Button
                    id={`view-cert-${cert.id}`}
                    onClick={() => setSelectedCertImage({ title: cert.title, url: cert.imageUrl! })}
                    variant="glass"
                    size="sm"
                    className="shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </Button>
                ) : (
                  <span className="text-xs text-slate-500 uppercase tracking-widest">{cert.issuer}</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Dialog for Certificate Preview with Frosted Glass Backdrop */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedCertImage && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label={`Certificate preview: ${selectedCertImage.title}`}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xl animate-fade-in"
                onClick={() => setSelectedCertImage(null)}
              >
                <div
                  className="relative max-w-4xl w-full liquid-glass-card rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/80"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/70">
                    <h3 className="text-lg font-display font-semibold text-slate-950 truncate pr-4">
                      {selectedCertImage.title}
                    </h3>
                    <button
                      ref={closeButtonRef}
                      onClick={() => setSelectedCertImage(null)}
                      className="p-2 rounded-full liquid-glass-pill text-slate-700 hover:text-slate-950 transition cursor-pointer"
                      aria-label="Close certificate preview"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="overflow-hidden rounded-2xl bg-slate-100 flex items-center justify-center max-h-[75vh]">
                    <img
                      src={selectedCertImage.url}
                      alt={`Certificate for ${selectedCertImage.title}`}
                      className="max-h-[75vh] w-auto object-contain rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
