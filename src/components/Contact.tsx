"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Check } from "lucide-react";
import SplitText from "./SplitText";

type FormData = {
  name: string;
  email: string;
  phone: string;
  building: string;
  stage: string;
  timeline: string;
  budget: string;
  needs: string[];
  context: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  building: "",
  stage: "",
  timeline: "",
  budget: "",
  needs: [],
  context: "",
};

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [step, setStep] = useState(1);
  const totalSteps = 7;
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("gtmContactBuilder");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gtmContactBuilder", JSON.stringify(formData));
  }, [formData]);

  const updateForm = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    // Validation
    if (step === 1 && (!formData.name || !formData.email)) {
       setErrorMessage("Please share your name and email.");
       return;
    }
    if (step === 2 && !formData.building) {
       setErrorMessage("Please tell us what you're building.");
       return;
    }
    if (step === 3 && !formData.stage) {
      setErrorMessage("Please select your current stage.");
      return;
    }
    if (step === 4 && !formData.timeline) {
      setErrorMessage("Please select your timeline.");
      return;
    }
    if (step === 5 && !formData.budget) {
      setErrorMessage("Please select a rough budget.");
      return;
    }
    if (step === 6 && formData.needs.length === 0) {
      setErrorMessage("Please select at least one way we can help.");
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
    setErrorMessage("");
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");

      localStorage.removeItem("gtmContactBuilder");
      setStatus("success");
      
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("There was a problem sending your details. Please try again.");
    }
  };

  const renderSingleSelect = (field: keyof FormData, options: string[]) => {
    return (
      <div className="space-y-3 mt-6">
        {options.map((opt) => {
          const isSelected = formData[field] === opt;
            
          return (
            <button
              key={opt}
              type="button"
              onClick={() => updateForm({ [field]: opt } as Partial<FormData>)}
              className={`w-full flex items-center justify-between p-5 border text-left transition-all duration-300 rounded-sm ${
                isSelected 
                  ? "border-accent bg-accent/5 backdrop-blur-md" 
                  : "border-border/30 hover:border-border bg-transparent shadow-sm"
              }`}
            >
              <span className={`text-base ${isSelected ? "text-accent font-medium" : "text-fg/80"}`}>{opt}</span>
              <div className={`w-5 h-5 rounded-full border flex flex-shrink-0 items-center justify-center transition-colors ${
                isSelected ? "border-accent bg-accent text-bg" : "border-border/60"
              }`}>
                {isSelected && <Check size={12} strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const renderMultiSelect = (field: keyof FormData, options: string[]) => {
    return (
      <div className="space-y-3 mt-6">
        {options.map((opt) => {
          const arr = formData[field] as string[];
          const isSelected = arr.includes(opt);
            
          return (
            <button
              key={opt}
              type="button"
              onClick={() => {
                let newArr = [...arr];
                if (isSelected) newArr = newArr.filter(i => i !== opt);
                else newArr.push(opt);
                updateForm({ [field]: newArr } as Partial<FormData>);
              }}
              className={`w-full flex items-center gap-4 p-5 border text-left transition-all duration-300 rounded-sm ${
                isSelected 
                  ? "border-accent bg-accent/5 backdrop-blur-md" 
                  : "border-border/30 hover:border-border bg-transparent shadow-sm"
              }`}
            >
              <div className={`w-5 h-5 rounded-[4px] border flex flex-shrink-0 items-center justify-center transition-colors ${
                isSelected ? "border-accent bg-accent text-bg" : "border-border/60"
              }`}>
                {isSelected && <Check size={12} strokeWidth={3} />}
              </div>
              <span className={`text-base ${isSelected ? "text-accent font-medium" : "text-fg/80"}`}>{opt}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <section id="contact" ref={ref} className="section-padding py-24 bg-bg relative">
      <div className="container-wide">
        <div className="max-w-[700px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-[3rem] text-fg mb-4 leading-tight">
              <SplitText>Tell us what you&apos;re building.</SplitText>
            </h2>
            <p className="text-muted text-lg leading-relaxed max-w-[500px] mx-auto text-balance">
              We help turn ideas into real, working companies. Share a few details so we can understand how to help you best.
            </p>
          </div>

          <motion.div
            className="bg-bg border border-border/40 shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-12 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Progress indicator */}
            {status !== "success" && (
              <div className="absolute top-0 left-0 w-full h-[2px] bg-border/20">
                <motion.div 
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  transition={{ ease: "easeInOut", duration: 0.3 }}
                />
              </div>
            )}

            <div className="min-h-[400px] flex flex-col pt-4">
              {status === "success" ? (
                <motion.div 
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-2 border border-accent/20">
                    <CheckCircle2 size={32} className="text-accent" />
                  </div>
                  <h3 className="font-heading text-3xl text-fg">Application Received</h3>
                  <p className="text-muted max-w-[400px] leading-relaxed">
                    We will review your details and get back to you soon.
                  </p>
                  <button 
                    onClick={() => {
                      setStatus("idle");
                      setStep(1);
                      setFormData(initialFormData);
                    }}
                    className="mt-8 text-sm text-fg/60 hover:text-fg transition-colors border-b border-transparent hover:border-fg/30 pb-1"
                  >
                    Submit another response
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="flex-1 relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="space-y-6"
                      >
                        {/* 1. Basic Details */}
                        {step === 1 && (
                          <div className="space-y-8">
                            <div className="space-y-1 mb-8">
                              <h3 className="text-2xl font-heading text-fg">Basic Details</h3>
                              <p className="text-muted text-sm">How can we reach you?</p>
                            </div>
                            
                            <div className="space-y-6">
                              <div className="space-y-3">
                                <label className="text-sm font-medium text-fg/80">Full Name</label>
                                <input 
                                  type="text" 
                                  value={formData.name}
                                  onChange={(e) => updateForm({ name: e.target.value })}
                                  className="w-full bg-transparent border border-border/40 focus:border-accent text-fg px-4 py-3.5 outline-none transition-all placeholder:text-muted/50 rounded-sm"
                                  placeholder="Jane Doe"
                                />
                              </div>
                              <div className="space-y-3">
                                <label className="text-sm font-medium text-fg/80">Email Address</label>
                                <input 
                                  type="email" 
                                  value={formData.email}
                                  onChange={(e) => updateForm({ email: e.target.value })}
                                  className="w-full bg-transparent border border-border/40 focus:border-accent text-fg px-4 py-3.5 outline-none transition-all placeholder:text-muted/50 rounded-sm"
                                  placeholder="jane@founder.com"
                                />
                              </div>
                              <div className="space-y-3">
                                <label className="text-sm font-medium text-fg/80">Phone / WhatsApp <span className="text-muted font-normal">(optional)</span></label>
                                <input 
                                  type="tel" 
                                  value={formData.phone}
                                  onChange={(e) => updateForm({ phone: e.target.value })}
                                  className="w-full bg-transparent border border-border/40 focus:border-accent text-fg px-4 py-3.5 outline-none transition-all placeholder:text-muted/50 rounded-sm"
                                  placeholder="+1 (555) 000-0000"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 2. Your Idea */}
                        {step === 2 && (
                          <div className="space-y-8">
                            <div className="space-y-1 mb-6">
                              <h3 className="text-2xl font-heading text-fg">Your Idea</h3>
                              <p className="text-muted text-sm">What are you building?</p>
                            </div>
                            <textarea 
                              rows={5}
                              value={formData.building}
                              onChange={(e) => updateForm({ building: e.target.value })}
                              className="w-full bg-bg border border-border/40 focus:border-accent text-fg p-5 outline-none transition-all resize-none shadow-sm rounded-sm"
                              placeholder="Keep it simple — just explain your idea in your own words."
                            ></textarea>
                          </div>
                        )}

                        {/* 3. Where You Are */}
                        {step === 3 && (
                          <div>
                            <div className="space-y-1 mb-2">
                              <h3 className="text-2xl font-heading text-fg">Where You Are</h3>
                              <p className="text-muted text-sm">What stage are you at?</p>
                            </div>
                            {renderSingleSelect("stage", [
                              "Just an idea",
                              "Working on it",
                              "MVP ready",
                              "Already launched"
                            ])}
                          </div>
                        )}

                        {/* 4. Timeline */}
                        {step === 4 && (
                          <div>
                            <div className="space-y-1 mb-2">
                              <h3 className="text-2xl font-heading text-fg">Timeline</h3>
                              <p className="text-muted text-sm">When would you like to launch?</p>
                            </div>
                            {renderSingleSelect("timeline", [
                              "As soon as possible",
                              "Within a month",
                              "1–3 months",
                              "Just exploring"
                            ])}
                          </div>
                        )}

                        {/* 5. Budget */}
                        {step === 5 && (
                          <div>
                            <div className="space-y-1 mb-2">
                              <h3 className="text-2xl font-heading text-fg">Budget</h3>
                              <p className="text-muted text-sm">Do you have a rough budget in mind?</p>
                            </div>
                            {renderSingleSelect("budget", [
                              "Under ₹25K",
                              "₹25K–₹50K",
                              "₹50K–₹1L",
                              "₹1L+",
                              "Not sure yet"
                            ])}
                          </div>
                        )}

                        {/* 6. What You Need */}
                        {step === 6 && (
                          <div>
                            <div className="space-y-1 mb-2">
                              <h3 className="text-2xl font-heading text-fg">What You Need</h3>
                              <p className="text-muted text-sm">How can we help you? (Select all that apply)</p>
                            </div>
                            {renderMultiSelect("needs", [
                              "Website / Landing Page",
                              "Product / MVP",
                              "Branding",
                              "Strategy / GTM",
                              "End-to-end support"
                            ])}
                          </div>
                        )}

                        {/* 7. Context */}
                        {step === 7 && (
                          <div className="space-y-8">
                            <div className="space-y-1 mb-6">
                              <h3 className="text-2xl font-heading text-fg">Context</h3>
                              <p className="text-muted text-sm">Anything else we should know?</p>
                            </div>
                            <textarea 
                              rows={5}
                              value={formData.context}
                              onChange={(e) => updateForm({ context: e.target.value })}
                              className="w-full bg-bg border border-border/40 focus:border-accent text-fg p-5 outline-none transition-all resize-none shadow-sm rounded-sm"
                              placeholder="Optional context, links, or specific challenges..."
                            ></textarea>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation / Footer Footer */}
                  <div className="pt-10 mt-auto flex items-center justify-between border-t border-border/30 mt-8">
                    {step > 1 ? (
                      <button 
                        type="button"
                        onClick={handleBack}
                        className="text-sm font-medium text-muted hover:text-fg transition-colors flex items-center gap-2"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                    ) : <div></div>} {/* Spacer */}

                    <div className="flex flex-col items-end">
                      <button
                        type="button"
                        disabled={status === "loading"}
                        onClick={step < totalSteps ? handleNext : handleSubmit}
                        className="bg-fg text-bg text-[14px] font-medium tracking-wide py-3.5 px-8 hover:bg-accent hover:text-bg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 rounded-sm"
                      >
                        {status === "loading" ? (
                          <span className="flex items-center gap-2">Submitting...</span>
                        ) : step < totalSteps ? (
                          <>Next <ArrowRight size={16} /></>
                        ) : (
                          "Get Started"
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Global Error Space */}
                  {errorMessage && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-4 text-right"
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
