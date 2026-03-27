"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, ChevronDown, Check } from "lucide-react";
import SplitText from "./SplitText";
import MagneticButton from "./MagneticButton";

type FormData = {
  name: string;
  contactInfo: string;
  building: string;
  stage: string;
  budget: string;
  timeline: string;
};

const initialFormData: FormData = {
  name: "",
  contactInfo: "",
  building: "",
  stage: "",
  budget: "",
  timeline: "",
};

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("gtmIntakeDraft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gtmIntakeDraft", JSON.stringify(formData));
  }, [formData]);

  const updateForm = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.contactInfo)) {
       setErrorMessage("Name and contact info are required.");
       return;
    }
    if (step === 2 && !formData.building) {
       setErrorMessage("Please tell us what you are building.");
       return;
    }
    if (step === 3 && !formData.stage) {
      setErrorMessage("Please select your current stage.");
      return;
    }
    if (step === 4 && (!formData.budget || !formData.timeline)) {
      setErrorMessage("Please select your budget and timeline.");
      return;
    }
    
    setErrorMessage("");
    window.scrollTo({ top: ref.current?.offsetTop ? ref.current.offsetTop - 100 : 0, behavior: 'smooth' });
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setErrorMessage("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!formData.budget || !formData.timeline) {
      setErrorMessage("Please complete all fields.");
      return;
    }

    setErrorMessage("");
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");

      localStorage.removeItem("gtmIntakeDraft");
      setStatus("success");
      
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const renderOptions = (field: keyof FormData, options: string[]) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        {options.map((opt) => {
          const isSelected = formData[field] === opt;
            
          return (
            <button
              key={opt}
              type="button"
              onClick={() => updateForm({ [field]: opt } as any)}
              className={`flex items-center justify-between p-5 border text-left transition-all duration-300 ${
                isSelected 
                  ? "border-accent bg-accent/5 backdrop-blur-md shadow-[0_0_20px_rgba(232,160,69,0.1)]" 
                  : "border-border/40 hover:border-border bg-bg/50 backdrop-blur-sm"
              }`}
            >
              <span className={`text-sm tracking-wide ${isSelected ? "text-accent font-medium leading-none" : "text-fg leading-none"}`}>{opt}</span>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                isSelected ? "border-accent bg-accent text-bg" : "border-border/50"
              }`}>
                {isSelected && <Check size={10} strokeWidth={4} />}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <section id="contact" ref={ref} className="section-padding py-section relative">
      <div className="container-max">
        <div className="mx-auto max-w-[800px]">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-fg mb-4">
              <SplitText>Founder Intake</SplitText>
            </h2>
            <p className="text-muted text-lg max-w-[500px] mx-auto">
              We partner with serious founders ready to scale. Tell us about what you&apos;re building.
            </p>
          </div>

          <motion.div
            className="bg-bg/40 backdrop-blur-xl border border-border/50 shadow-2xl relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          >
            {/* Progress Bar */}
            {status !== "success" && (
              <div className="bg-border/20 h-1 w-full relative">
                <motion.div 
                  className="absolute top-0 left-0 bottom-0 bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  transition={{ ease: "easeInOut", duration: 0.3 }}
                />
              </div>
            )}

            <div className="p-8 md:p-14 min-h-[450px] flex flex-col">
              {status === "success" ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-2 border border-accent/20">
                    <CheckCircle2 size={32} className="text-accent" />
                  </div>
                  <h3 className="font-heading text-3xl text-fg">Application Received</h3>
                  <p className="text-muted max-w-[400px]">
                    We will review your submission and reach out via your preferred contact method shortly.
                  </p>
                  <button 
                    onClick={() => {
                      setStatus("idle");
                      setStep(1);
                      setFormData(initialFormData);
                    }}
                    className="mt-8 text-xs text-muted uppercase tracking-widest hover:text-accent transition-colors py-2 border-b border-transparent hover:border-accent"
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-10">
                    <span className="text-xs font-mono uppercase text-muted tracking-widest">
                      Step {step} // {totalSteps}
                    </span>
                    {step > 1 && (
                      <button 
                        onClick={handleBack}
                        className="text-xs font-mono uppercase text-muted hover:text-fg transition-colors flex items-center gap-2 group"
                      >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
                      </button>
                    )}
                  </div>

                  <div className="flex-1 relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="space-y-6"
                      >
                        {step === 1 && (
                          <div className="space-y-8">
                            <h3 className="text-2xl font-heading text-fg mb-4">Founder Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-3">
                                <label className="text-sm text-fg/80 uppercase tracking-wide text-xs">Full Name</label>
                                <input 
                                  type="text" 
                                  value={formData.name}
                                  onChange={(e) => updateForm({ name: e.target.value })}
                                  className="w-full bg-transparent border-b border-border/40 focus:border-accent text-fg py-3 outline-none transition-all placeholder:text-muted/50"
                                  placeholder="John Doe"
                                />
                              </div>
                              <div className="space-y-3">
                                <label className="text-sm text-fg/80 uppercase tracking-wide text-xs">Email or Phone</label>
                                <input 
                                  type="text" 
                                  value={formData.contactInfo}
                                  onChange={(e) => updateForm({ contactInfo: e.target.value })}
                                  className="w-full bg-transparent border-b border-border/40 focus:border-accent text-fg py-3 outline-none transition-all placeholder:text-muted/50"
                                  placeholder="john@founder.com"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 2 && (
                          <div className="space-y-8">
                            <h3 className="text-2xl font-heading text-fg mb-2">What are you building?</h3>
                            <p className="text-muted text-sm mb-4">Give us the raw, unfiltered truth of the problem you solve.</p>
                            <textarea 
                              rows={4}
                              value={formData.building}
                              onChange={(e) => updateForm({ building: e.target.value })}
                              className="w-full bg-bg/50 border border-border/40 focus:border-accent text-fg p-5 outline-none transition-all resize-none shadow-inner"
                              placeholder="We are building an AI-powered..."
                            ></textarea>
                          </div>
                        )}

                        {step === 3 && (
                          <div>
                            <h3 className="text-2xl font-heading text-fg mb-6">Current Stage</h3>
                            {renderOptions("stage", [
                              "Idea / Pre-Product",
                              "MVP / Beta Testing",
                              "Early Traction (Pre-Seed/Seed)",
                              "Scaling (Series A+)"
                            ])}
                          </div>
                        )}

                        {step === 4 && (
                          <div className="space-y-10">
                            <div>
                               <h3 className="text-2xl font-heading text-fg mb-6">Execution Timeline</h3>
                               {renderOptions("timeline", [
                                 "ASAP (Next 14 days)",
                                 "This Quarter",
                                 "Just exploring"
                               ])}
                            </div>
                            <div>
                               <h3 className="text-2xl font-heading text-fg mb-6">Budget Range</h3>
                               {renderOptions("budget", [
                                 "Under $2,000",
                                 "$2k - $5k",
                                 "$5k - $10k",
                                 "$10k+"
                               ])}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="pt-12 mt-auto flex flex-col items-center border-t border-border/30 mt-8">
                    {errorMessage && (
                      <p className="text-red-400 text-sm mb-6 w-full text-center">
                        {errorMessage}
                      </p>
                    )}
                    
                    <button
                      type="button"
                      disabled={status === "loading"}
                      onClick={step < totalSteps ? handleNext : handleSubmit}
                      className="w-full bg-accent text-bg text-[13px] font-bold tracking-[0.15em] uppercase py-5 hover:bg-fg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3 group"
                    >
                      {status === "loading" ? (
                        <span className="flex items-center gap-2">Transmitting<span className="animate-pulse">...</span></span>
                      ) : step < totalSteps ? (
                        <>Continue <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                      ) : (
                        "Get Started"
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
