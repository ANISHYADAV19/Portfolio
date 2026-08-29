import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, ShieldAlert, Mail, MapPin, Github, Linkedin, MessageSquare } from "lucide-react";
import Button from "./Button";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<
    "idle" | "success" | "error" | "network_error" | "mail_client_opened"
  >("idle");

  useEffect(() => {
    if (sendStatus !== "success") return;
    const timer = setTimeout(() => setSendStatus("idle"), 4000);
    return () => clearTimeout(timer);
  }, [sendStatus]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setSendStatus("error");
      return;
    }

    setIsSending(true);
    setSendStatus("idle");

    try {
      const response = await fetch("https://formsubmit.co/ajax/anishyadav872004@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          _subject: subject ? `[Portfolio] ${subject}` : `Portfolio Message from ${name}`,
          message,
          _replyto: email,
          _template: "table",
          _captcha: "false"
        })
      });

      const data = await response.json();

      if (response.ok && (data.success === "true" || data.success === true)) {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setSendStatus("success");
      } else {
        setSendStatus("network_error");
      }
    } catch {
      setSendStatus("network_error");
    } finally {
      setIsSending(false);
    }
  };

  const handleOpenMailClient = () => {
    const encodedSubject = encodeURIComponent(subject ? `[Portfolio] ${subject}` : "Portfolio Inquiry");
    const encodedBody = encodeURIComponent(
      `Hi Anish,\n\nName: ${name || "[Your Name]"}\nEmail: ${email || "[Your Email]"}\n\nMessage:\n${
        message || "[Your Message]"
      }\n\nRegards,`
    );
    window.location.href = `mailto:anishyadav872004@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
    setSendStatus("mail_client_opened");
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 px-4 sm:px-6 md:px-12 relative">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 liquid-glass-pill px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <MessageSquare size={14} className="text-cyan-400" />
            <span className="text-xs font-mono text-cyan-300 font-bold tracking-wider uppercase">Let's Connect</span>
          </div>
          <h2 id="contact-heading" className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Get in <span className="font-serif italic text-cyan-400 font-medium drop-shadow-[0_0_20px_rgba(6,182,212,0.35)]">Touch</span>
          </h2>
          <p className="text-sm text-slate-300 font-sans mt-2 max-w-xl">
            Have a project in mind, an opportunity to discuss, or just want to connect? Send a direct message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 space-y-6">
              <h3 className="text-xl font-display font-semibold text-white">
                Contact Coordinates
              </h3>
              
              <div className="space-y-4">
                <a
                  href="mailto:anishyadav872004@gmail.com"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 hover:border-cyan-400 transition duration-200 group shadow-2xs"
                >
                  <div className="p-3 rounded-xl bg-white/10 text-cyan-400 group-hover:bg-blue-600 group-hover:text-white transition">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block font-medium">Direct Email</span>
                    <span className="text-sm font-mono font-bold text-slate-100 group-hover:text-cyan-300 transition">
                      anishyadav872004@gmail.com
                    </span>
                  </div>
                </a>

                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-2xs">
                  <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block font-medium">Location</span>
                    <span className="text-sm font-sans font-bold text-slate-100">
                      Haryana, India &bull; Open for Remote / Relocation
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-white/10 flex items-center space-x-3">
                <a
                  href="https://github.com/ANISHYADAV19"
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-2xl liquid-glass-pill text-slate-200 font-mono text-xs font-bold hover:text-white hover:bg-blue-600 transition-all shadow-xs"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/anish-yadav-dev/"
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-2xl liquid-glass-pill text-slate-200 font-mono text-xs font-bold hover:text-white hover:bg-blue-600 transition-all shadow-xs"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="liquid-glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full liquid-glass-input rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Your Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full liquid-glass-input rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Subject (Optional)
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Project Collaboration / Job Inquiry"
                  className="w-full liquid-glass-input rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your project, team opportunity, or inquiry..."
                  className="w-full liquid-glass-input rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none resize-none"
                />
              </div>

              {/* Status alerts */}
              <AnimatePresence>
                {sendStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-200 text-xs font-mono flex items-center space-x-2.5"
                  >
                    <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                    <span>Message delivered successfully! I will respond promptly.</span>
                  </motion.div>
                )}

                {sendStatus === "network_error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-2xl bg-amber-500/20 border border-amber-400 text-amber-200 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center space-x-2">
                      <ShieldAlert size={16} className="text-amber-400 flex-shrink-0" />
                      <span>Direct form delivery timed out. Try sending via mail client.</span>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleOpenMailClient}
                      className="text-[11px] rounded-full whitespace-nowrap"
                    >
                      Open Mail Client
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Button
                  type="submit"
                  disabled={isSending}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-8 py-3.5 bg-blue-600/80 hover:bg-blue-500 text-white flex items-center justify-center space-x-2.5 shadow-xl border border-blue-400/40"
                >
                  <Send size={15} className={isSending ? "animate-spin" : ""} />
                  <span>{isSending ? "Transmitting..." : "Send Message"}</span>
                </Button>

                <p className="text-[11px] font-mono text-slate-400 text-center sm:text-right">
                  Responses typically sent within 24 hours.
                </p>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
