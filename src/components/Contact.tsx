import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, ShieldAlert, Cpu, Mail } from "lucide-react";
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

  const handleMailtoFallback = () => {
    const mailtoSubject = encodeURIComponent(subject ? `[Portfolio] ${subject}` : `Portfolio Contact from ${name}`);
    const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:anishyadav872004@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSendStatus("mail_client_opened");
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 px-6 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-3xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-mono text-blue-600 font-semibold tracking-wider uppercase mb-2">Initialize Contact</p>
          <h2 id="contact-heading" className="text-3xl md:text-5xl font-light text-slate-900 tracking-tight">
            Connect <span className="font-serif italic text-blue-600 font-medium">With Me</span>
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Send me a direct message. Email: <a href="mailto:anishyadav872004@gmail.com" className="text-blue-600 font-mono font-medium hover:underline">anishyadav872004@gmail.com</a>
          </p>
          <div className="h-0.5 w-16 bg-blue-600 mt-4 mx-auto" />
        </div>

        {/* Form Container */}
        <div className="liquid-glass p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 bg-white">
          <h3 className="text-lg font-display font-semibold text-slate-900 mb-6 border-b border-slate-100 pb-3 flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-blue-600" />
            <span>Messaging Portal</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono text-slate-600 mb-1.5 uppercase font-medium">Full Name *</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSending}
                  placeholder="Enter full name"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 transition duration-200"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono text-slate-600 mb-1.5 uppercase font-medium">Email Address *</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSending}
                  placeholder="Enter email address"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 transition duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-mono text-slate-600 mb-1.5 uppercase font-medium">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isSending}
                placeholder="Enter subject theme"
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 transition duration-200"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-mono text-slate-600 mb-1.5 uppercase font-medium">Message Contents *</label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSending}
                placeholder="Write message details..."
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 transition duration-200 resize-none"
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-start gap-4">
              <Button
                type="submit"
                disabled={isSending}
                variant="primary"
                size="md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSending ? "Sending..." : "Send Message"}</span>
              </Button>

              <Button
                type="button"
                onClick={handleMailtoFallback}
                variant="ghost"
                size="md"
                title="Opens your default email application"
              >
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>Open in Email App</span>
              </Button>
            </div>
          </form>

          {/* Notifications */}
          <div role="status" aria-live="polite">
          <AnimatePresence>
            {sendStatus === "success" && (
              <motion.div
                className="mt-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl flex items-start space-x-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                <div>
                  <p className="font-bold font-mono text-sm">MESSAGE SENT SUCCESSFULLY</p>
                  <p className="text-slate-700 font-sans mt-1">
                    Thank you for reaching out! Your message has been sent directly to <strong className="text-emerald-700">anishyadav872004@gmail.com</strong>.
                  </p>
                </div>
              </motion.div>
            )}
            {sendStatus === "mail_client_opened" && (
              <motion.div
                className="mt-6 p-4 bg-blue-50 border border-blue-200 text-blue-900 text-xs rounded-xl flex items-start space-x-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                <div>
                  <p className="font-bold font-mono text-sm">DRAFT OPENED IN YOUR EMAIL APP</p>
                  <p className="text-slate-700 font-sans mt-1">
                    Your message is not sent yet — press send in your email app to deliver it to{" "}
                    <strong className="text-blue-700">anishyadav872004@gmail.com</strong>.
                  </p>
                </div>
              </motion.div>
            )}
            {sendStatus === "error" && (
              <motion.div 
                className="mt-6 p-4 bg-red-50 border border-red-200 text-red-900 text-xs rounded-xl flex items-start space-x-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
                <div>
                  <p className="font-bold font-mono text-sm">REQUIRED FIELDS MISSING</p>
                  <p className="text-slate-700 font-sans mt-1">Please fill out your Name, Email, and Message before sending.</p>
                </div>
              </motion.div>
            )}
            {sendStatus === "network_error" && (
              <motion.div
                className="mt-6 p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-xl flex items-start space-x-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" />
                <div>
                  <p className="font-bold font-mono text-sm">MESSAGE NOT SENT</p>
                  <p className="text-slate-700 font-sans mt-1">
                    Your message could not be delivered — the email service is unreachable. Use{" "}
                    <strong className="text-slate-900">Open in Email App</strong> above, or write directly to{" "}
                    <a href="mailto:anishyadav872004@gmail.com" className="text-blue-600 underline font-mono">
                      anishyadav872004@gmail.com
                    </a>.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
