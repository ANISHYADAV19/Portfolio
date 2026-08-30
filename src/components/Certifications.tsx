import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
import { Sparkles, Cpu, Calendar, Award, Wifi, Brain, Eye, X, ShieldCheck, AlertCircle, ExternalLink } from "lucide-react";
import Button from "./Button";

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: number;
  bullets: string[];
  imageUrl?: string;
  verifyUrl?: string;
}

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [imgHasError, setImgHasError] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedCert) {
      setImgHasError(false);
      const previouslyFocused = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedCert(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
        previouslyFocused?.focus();
      };
    }
  }, [selectedCert]);

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
      imageUrl: "https://res.cloudinary.com/mjob3d9y/image/upload/v1784829072/Coursera_certificate__page-0001_ummtux.jpg",
      verifyUrl: "https://coursera.org/verify/TJ0LEUE5XU3L"
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
      imageUrl: "https://res.cloudinary.com/mjob3d9y/image/upload/v1784737468/L_T_Certificate_page-0001_tbjvib.jpg"
    }
  ];

  return (
    <section id="certifications" aria-labelledby="certifications-heading" className="py-24 px-4 sm:px-6 md:px-12 relative">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 liquid-glass-pill px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span className="text-xs font-mono text-cyan-300 font-bold tracking-wider uppercase">Accreditations</span>
          </div>
          <h2 id="certifications-heading" className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Verified <span className="font-serif italic text-cyan-400 font-medium drop-shadow-[0_0_20px_rgba(6,182,212,0.35)]">Certifications</span>
          </h2>
          <p className="text-sm text-slate-300 font-sans mt-2 max-w-xl">
            Formal technical certifications issued by IBM, University of Michigan, and Larsen & Toubro.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certificates.map((cert) => (
            <div 
              key={cert.id}
              className="liquid-glass-card p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-white/10">
                  <div className="flex items-start space-x-3.5">
                    <div className="p-2.5 rounded-2xl bg-white/10 border border-white/15 text-cyan-400 group-hover:bg-blue-600 group-hover:text-white transition duration-300 shadow-2xs" aria-hidden="true">
                      {cert.id.startsWith("ibm") ? (
                        <Sparkles className="w-5 h-5" />
                      ) : cert.id.includes("ml") ? (
                        <Brain className="w-5 h-5" />
                      ) : cert.id.includes("iot") || cert.id.includes("edge") ? (
                        <Wifi className="w-5 h-5" />
                      ) : (
                        <Cpu className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-semibold text-white leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-mono text-cyan-300 mt-1">
                        Issuer: <span className="text-slate-100 font-bold">{cert.issuer}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full liquid-glass-pill text-xs font-mono text-slate-200 font-bold shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                    <span>{cert.year}</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {cert.bullets.map((bullet, idx) => (
                    <p key={idx} className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      &bull; {bullet}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Verified</span>
                </span>

                {cert.imageUrl ? (
                  <Button
                    id={`view-cert-${cert.id}`}
                    onClick={() => setSelectedCert(cert)}
                    variant="glass"
                    size="sm"
                    className="shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </Button>
                ) : (
                  <span className="text-xs text-slate-400 uppercase tracking-widest">{cert.issuer}</span>
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
            {selectedCert && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label={`Certificate preview: ${selectedCert.title}`}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-fade-in"
                onClick={() => setSelectedCert(null)}
              >
                <div
                  className="relative max-w-4xl w-full liquid-glass-card rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/30"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15">
                    <h3 className="text-lg font-display font-semibold text-white truncate pr-4">
                      {selectedCert.title}
                    </h3>
                    <button
                      ref={closeButtonRef}
                      onClick={() => setSelectedCert(null)}
                      className="p-2 rounded-full liquid-glass-pill text-slate-200 hover:text-white transition cursor-pointer"
                      aria-label="Close certificate preview"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="overflow-hidden rounded-2xl bg-black/40 flex items-center justify-center min-h-[300px] max-h-[75vh] p-4">
                    {imgHasError ? (
                      <div className="flex flex-col items-center justify-center text-center p-8 space-y-4 max-w-md">
                        <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                          <AlertCircle className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-base font-display font-semibold text-white">
                            Image Document Unavailable
                          </h4>
                          <p className="text-xs text-slate-300 font-sans leading-relaxed">
                            The cloud host returned 404 for this image file. Please place the image in the <code className="text-cyan-300 font-mono">public/</code> folder or update the link.
                          </p>
                        </div>
                        {selectedCert.verifyUrl && (
                          <a
                            href={selectedCert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-blue-600/80 hover:bg-blue-500 text-white text-xs font-mono font-bold transition shadow-lg"
                          >
                            <span>Verify on Coursera</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    ) : (
                      <img
                        src={selectedCert.imageUrl}
                        alt={`Certificate for ${selectedCert.title}`}
                        onError={() => setImgHasError(true)}
                        className="max-h-[75vh] w-auto object-contain rounded-2xl"
                      />
                    )}
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
