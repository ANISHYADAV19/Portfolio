import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, ShieldAlert, Cpu, Mail } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<
    "idle" | "success" | "error" | "network_error" | "mail_client_opened"
  >("idle");

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
        // The service rejected the request — say so instead of claiming delivery.
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
    // A draft is only opened here — it is not sent until the visitor sends it.
    setSendStatus("mail_client_opened");
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 px-6 bg-dark-bg border-t border-white/10 relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-3xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-mono text-cyber-blue tracking-wider uppercase mb-2">Initialize Contact</p>
          <h2 id="contact-heading" className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Connect <span className="font-serif italic text-cyber-blue">With Me</span>
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Send me a direct message. Email: <a href="mailto:anishyadav872004@gmail.com" className="text-cyber-blue font-mono hover:underline">anishyadav872004@gmail.com</a>
          </p>
          <div className="h-0.5 w-16 bg-cyber-blue mt-4 mx-auto" />
        </div>

        {/* Form Container */}
        <div className="bg-dark-card border border-white/10 p-6 md:p-8 rounded-xl shadow-xl">
          <h3 className="text-lg font-display font-medium text-white mb-6 border-b border-white/10 pb-3 flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-cyber-blue" />
            <span>Messaging Portal</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Full Name *</label>
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
                  className="w-full bg-dark-bg border border-white/10 focus:border-cyber-blue text-base md:text-xs text-white rounded p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-blue/60 transition duration-200"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Email Address *</label>
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
                  className="w-full bg-dark-bg border border-white/10 focus:border-cyber-blue text-base md:text-xs text-white rounded p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-blue/60 transition duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isSending}
                placeholder="Enter subject theme"
                className="w-full bg-dark-bg border border-white/10 focus:border-cyber-blue text-base md:text-xs text-white rounded p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-blue/60 transition duration-200"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Message Contents *</label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSending}
                placeholder="Write message details..."
                className="w-full bg-dark-bg border border-white/10 focus:border-cyber-blue text-base md:text-xs text-white rounded p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-blue/60 transition duration-200 resize-none"
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                type="submit"
                disabled={isSending}
                className="px-6 py-2.5 bg-cyber-blue hover:bg-cyber-blue/90 disabled:bg-white/5 disabled:text-gray-500 text-dark-bg text-xs font-mono font-bold rounded transition-all cursor-pointer flex items-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSending ? "Sending..." : "Send Message"}</span>
              </button>

              <button
                type="button"
                onClick={handleMailtoFallback}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-mono rounded transition-all cursor-pointer flex items-center space-x-2"
                title="Opens your default email application"
              >
                <Mail className="w-3.5 h-3.5 text-cyber-blue" />
                <span>Open in Email App</span>
              </button>
            </div>
          </form>

          {/* Notifications */}
          <div role="status" aria-live="polite">
          <AnimatePresence>
            {sendStatus === "success" && (
              <motion.div
                className="mt-6 p-4 bg-cyber-blue/10 border border-cyber-blue/40 text-cyber-blue text-xs rounded-lg flex items-start space-x-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyber-blue" />
                <div>
                  <p className="font-bold font-mono text-sm">MESSAGE SENT SUCCESSFULLY</p>
                  <p className="text-gray-300 font-sans mt-1">
                    Thank you for reaching out! Your message has been sent directly to <strong className="text-cyber-blue">anishyadav872004@gmail.com</strong>.
                  </p>
                </div>
              </motion.div>
            )}
            {sendStatus === "mail_client_opened" && (
              <motion.div
                className="mt-6 p-4 bg-cyber-blue/10 border border-cyber-blue/40 text-cyber-blue text-xs rounded-lg flex items-start space-x-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyber-blue" />
                <div>
                  <p className="font-bold font-mono text-sm">DRAFT OPENED IN YOUR EMAIL APP</p>
                  <p className="text-gray-300 font-sans mt-1">
                    Your message is not sent yet — press send in your email app to deliver it to{" "}
                    <strong className="text-cyber-blue">anishyadav872004@gmail.com</strong>.
                  </p>
                </div>
              </motion.div>
            )}
            {sendStatus === "error" && (
              <motion.div 
                className="mt-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg flex items-start space-x-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                <div>
                  <p className="font-bold font-mono text-sm">REQUIRED FIELDS MISSING</p>
                  <p className="text-gray-300 font-sans mt-1">Please fill out your Name, Email, and Message before sending.</p>
                </div>
              </motion.div>
            )}
            {sendStatus === "network_error" && (
              <motion.div
                className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs rounded-lg flex items-start space-x-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400" />
                <div>
                  <p className="font-bold font-mono text-sm">MESSAGE NOT SENT</p>
                  <p className="text-gray-300 font-sans mt-1">
                    Your message could not be delivered — the email service is unreachable. Use{" "}
                    <strong className="text-white">Open in Email App</strong> above, or write directly to{" "}
                    <a href="mailto:anishyadav872004@gmail.com" className="text-cyber-blue underline font-mono">
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

