"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "./SplitText";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
              Submit your coordinates. If your product is a fit for our scaling protocol, we'll schedule a brutal, no-BS teardown.
            </motion.p>
          </div>

          <motion.div
            className="bg-[#0F0F0F] border border-border p-8 md:p-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm text-fg mb-2">System Name & URL</label>
                <input 
                  type="text" 
                  placeholder="e.g. Acme Inc (acme.com)"
                  className="w-full bg-[#1A1A1A] border border-transparent focus:border-accent text-fg p-4 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-fg mb-2">Operational Phase</label>
                <select className="w-full bg-[#1A1A1A] border border-transparent focus:border-accent text-fg p-4 outline-none transition-colors appearance-none" defaultValue="">
                  <option value="" disabled>Select stage...</option>
                  <option value="idea">Pre-Launch / Building</option>
                  <option value="mvp">MVP Ready</option>
                  <option value="early_traction">Early Traction (1-5 customers)</option>
                  <option value="scaling">Scaling (10+ customers)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-fg mb-2">Primary Bottleneck</label>
                <textarea 
                  rows={3}
                  placeholder="What's killing your growth right now?"
                  className="w-full bg-[#1A1A1A] border border-transparent focus:border-accent text-fg p-4 outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-bg text-sm font-medium tracking-wide uppercase py-4 hover:bg-fg transition-colors duration-300 mt-4"
              >
                Deploy Protocol
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
