"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "./SplitText";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    name: "",
    stage: "",
    bottleneck: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.stage || !formData.bottleneck) {
      alert("Please fill in all coordinates before deploying.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");
      
      setStatus("success");
      setFormData({ name: "", stage: "", bottleneck: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={ref} className="section-padding py-section">
      <div className="container-wide">
        <div className="divider mb-20" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="text-sm text-accent tracking-widest uppercase mb-4">
              Initialize Command
            </p>
            <h2 className="font-heading text-display text-fg mb-8">
              <SplitText>Deploy your revenue engine.</SplitText>
            </h2>
            <motion.p
              className="text-muted text-lg leading-relaxed mb-8 max-w-[500px]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.3 }}
            >
              Submit your coordinates. If your product is a fit for our scaling protocol, we&apos;ll schedule a brutal, no-BS teardown.
            </motion.p>
          </div>

          <motion.div
            className="bg-bg border border-border p-8 md:p-10 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="font-heading text-3xl text-fg">Coordinates Received.</h3>
                <p className="text-muted">We will intercept your transmission shortly.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-sm text-accent uppercase tracking-widest hover:text-fg transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm text-fg mb-2">System Name & URL</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Acme Inc (acme.com)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-border/30 border border-transparent focus:border-accent text-fg p-4 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-fg mb-2">Operational Phase</label>
                  <select 
                    className="w-full bg-[#1A1A1A] border border-transparent focus:border-accent text-fg p-4 outline-none transition-colors appearance-none" 
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                  >
                    <option value="" disabled>Select stage...</option>
                    <option value="Pre-Launch / Building">Pre-Launch / Building</option>
                    <option value="MVP Ready">MVP Ready</option>
                    <option value="Early Traction (1-5 customers)">Early Traction (1-5 customers)</option>
                    <option value="Scaling (10+ customers)">Scaling (10+ customers)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-fg mb-2">Primary Bottleneck</label>
                  <textarea 
                    rows={3}
                    placeholder="What's killing your growth right now?"
                    value={formData.bottleneck}
                    onChange={(e) => setFormData({ ...formData, bottleneck: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-transparent focus:border-accent text-fg p-4 outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-accent text-bg text-sm font-medium tracking-wide uppercase py-4 hover:bg-fg transition-colors duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {status === "loading" ? "Transmitting..." : "Deploy Protocol"}
                </button>
                {status === "error" && (
                  <p className="text-red-500 text-sm mt-2 text-center">Transmission failed. Please check your connection.</p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
