"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, ChevronDown, Check } from "lucide-react";
import SplitText from "./SplitText";

type FormData = {
  name: string;
  email: string;
  companyName: string;
  url: string;
  userType: string;
  goals: string[];
  bottleneck: string;
  problemDuration: string;
  urgency: string;
  budget: string;
  authority: string;
  serviceType: string;
  source: string;
  trigger: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  companyName: "",
  url: "",
  userType: "",
  goals: [],
  bottleneck: "",
  problemDuration: "",
  urgency: "",
  budget: "",
  authority: "",
  serviceType: "",
  source: "",
  trigger: "",
};

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [step, setStep] = useState(1);
  const totalSteps = 9;
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "redirecting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem("gtmContactDraft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch (e) {}
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem("gtmContactDraft", JSON.stringify(formData));
  }, [formData]);

  const updateForm = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    // Validation rules
    if (step === 1 && (!formData.name || !formData.email)) {
       setErrorMessage("Name and email are required.");
       return;
    }
    if (step === 2 && !formData.userType) {
       setErrorMessage("Please select an option.");
       return;
    }
    if (step === 3 && formData.goals.length === 0) {
      setErrorMessage("Please select at least one goal.");
      return;
    }
    if (step === 4 && (!formData.bottleneck || !formData.problemDuration)) {
      setErrorMessage("Please answer both questions.");
      return;
    }
    if (step === 5 && !formData.urgency) {
      setErrorMessage("Please select your urgency level.");
      return;
    }
    if (step === 6 && !formData.budget) {
      setErrorMessage("Please select your budget range.");
      return;
    }
    if (step === 7 && !formData.authority) {
      setErrorMessage("Please indicate if you are the decision maker.");
      return;
    }
    if (step === 8 && !formData.serviceType) {
      setErrorMessage("Please select what you are looking for.");
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
    if (!formData.source) {
      setErrorMessage("Please tell us where you heard about us.");
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

      localStorage.removeItem("gtmContactDraft");

      // Logic / Automations
      const isHighQuality = 
         (formData.budget === "$2,000–$10,000" || formData.budget === "$10,000+") && 
         formData.urgency === "Urgent (this month)";

      if (isHighQuality) {
         setStatus("redirecting");
         // For demo purposes, delay then you'd redirect
         setTimeout(() => {
            window.open("https://calendly.com/tanmaybhardwaj4444/30min", "_blank");
            setStatus("success");
         }, 1500);
      } else {
         setStatus("success");
      }
      
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  // --- Step Rendering Helpers ---
  const renderOptions = (
    field: keyof FormData,
    options: string[],
    multiple = false,
    maxSelect = 2
  ) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        {options.map((opt) => {
          const isSelected = multiple 
            ? (formData[field] as string[]).includes(opt)
            : formData[field] === opt;
            
          return (
            <button
              key={opt}
              type="button"
              onClick={() => {
                if (multiple) {
                  let arr = [...(formData[field] as string[])];
                  if (isSelected) arr = arr.filter((v) => v !== opt);
                  else if (arr.length < maxSelect) arr.push(opt);
                  updateForm({ [field]: arr } as any);
                } else {
                  updateForm({ [field]: opt } as any);
                }
              }}
              className={`flex items-center justify-between p-4 border text-left transition-all duration-300 ${
                isSelected 
                  ? "border-accent bg-accent/5" 
                  : "border-border/30 hover:border-border bg-border/5"
              }`}
            >
              <span className={`text-sm ${isSelected ? "text-accent font-medium" : "text-fg"}`}>{opt}</span>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                isSelected ? "border-accent bg-accent text-bg" : "border-border"
              }`}>
                {isSelected && <Check size={12} strokeWidth={3} />}
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
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl text-fg mb-4">
              <SplitText>Get Your Growth Plan</SplitText>
            </h2>
            <p className="text-muted text-lg max-w-[500px] mx-auto">
              We only work with a limited number of clients. Let&apos;s see if we&apos;re a fit.
            </p>
          </div>

          <motion.div
            className="bg-bg border border-border overflow-hidden relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          >
            {/* Progress Bar */}
            {status !== "success" && status !== "redirecting" && (
              <div className="bg-border/30 h-1.5 w-full relative">
                <motion.div 
                  className="absolute top-0 left-0 bottom-0 bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  transition={{ ease: "easeInOut", duration: 0.3 }}
                />
              </div>
            )}

            <div className="p-8 md:p-12 min-h-[500px] flex flex-col pt-12">
              {status === "redirecting" ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-16 h-16 rounded-full border-t-2 border-accent animate-spin mb-2" />
                    <h3 className="font-heading text-3xl text-fg">You qualify!</h3>
                    <p className="text-muted">Redirecting you to our calendar to book a strategy call...</p>
                 </div>
              ) : status === "success" ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                    <CheckCircle2 size={32} className="text-accent" />
                  </div>
                  <h3 className="font-heading text-3xl text-fg">Application Received.</h3>
                  <p className="text-muted max-w-[400px]">
                    We&apos;ll send you a custom growth roadmap shortly after reviewing your details.
                  </p>
                  <button 
                    onClick={() => {
                      setStatus("idle");
                      setStep(1);
                      setFormData(initialFormData);
                    }}
                    className="mt-8 text-sm text-accent uppercase tracking-widest hover:text-fg transition-colors inline-block"
                  >
                    Return Home
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono uppercase text-muted tracking-widest">
                      Step {step} of {totalSteps}
                    </span>
                    {step > 1 && (
                      <button 
                        onClick={handleBack}
                        className="text-xs font-mono uppercase text-muted hover:text-fg transition-colors flex items-center gap-1"
                      >
                        <ArrowLeft size={14} /> Back
                      </button>
                    )}
                  </div>

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
                        {step === 1 && (
                          <div className="space-y-6">
                            <h3 className="text-2xl font-heading text-fg mb-2">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-sm text-fg">Full Name *</label>
                                <input 
                                  type="text" 
                                  value={formData.name}
                                  onChange={(e) => updateForm({ name: e.target.value })}
                                  className="w-full bg-border/5 border border-border/30 focus:border-accent focus:bg-border/10 text-fg px-4 py-3 outline-none transition-all"
                                  placeholder="John Doe"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm text-fg">Work Email *</label>
                                <input 
                                  type="email" 
                                  value={formData.email}
                                  onChange={(e) => updateForm({ email: e.target.value })}
                                  className="w-full bg-border/5 border border-border/30 focus:border-accent focus:bg-border/10 text-fg px-4 py-3 outline-none transition-all"
                                  placeholder="john@company.com"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm text-fg">Company Name</label>
                                <input 
                                  type="text" 
                                  value={formData.companyName}
                                  onChange={(e) => updateForm({ companyName: e.target.value })}
                                  className="w-full bg-border/5 border border-border/30 focus:border-accent focus:bg-border/10 text-fg px-4 py-3 outline-none transition-all"
                                  placeholder="Company Inc."
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm text-fg">Website / LinkedIn</label>
                                <input 
                                  type="url" 
                                  value={formData.url}
                                  onChange={(e) => updateForm({ url: e.target.value })}
                                  className="w-full bg-border/5 border border-border/30 focus:border-accent focus:bg-border/10 text-fg px-4 py-3 outline-none transition-all"
                                  placeholder="https://acme.com"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 2 && (
                          <div>
                            <h3 className="text-2xl font-heading text-fg mb-2">Which best describes you?</h3>
                            {renderOptions("userType", [
                              "Founder",
                              "Startup (0–10 employees)",
                              "Growth-stage (10–100 employees)",
                              "Enterprise",
                              "Creator / Personal Brand"
                            ])}
                          </div>
                        )}

                        {step === 3 && (
                          <div>
                            <h3 className="text-2xl font-heading text-fg mb-1">What are you trying to achieve?</h3>
                            <p className="text-sm text-muted mb-4">(Select up to 2)</p>
                            {renderOptions("goals", [
                              "Get first customers",
                              "Increase conversions",
                              "Build brand / positioning",
                              "Launch a new product",
                              "Fix sales funnel",
                              "Build GTM system",
                              "Other"
                            ], true, 2)}
                          </div>
                        )}

                        {step === 4 && (
                          <div className="space-y-8">
                            <div className="space-y-3">
                              <h3 className="text-2xl font-heading text-fg">What&apos;s your biggest bottleneck right now?</h3>
                              <textarea 
                                rows={3}
                                value={formData.bottleneck}
                                onChange={(e) => updateForm({ bottleneck: e.target.value })}
                                className="w-full bg-border/5 border border-border/30 focus:border-accent focus:bg-border/10 text-fg p-4 outline-none transition-all resize-none"
                                placeholder="E.g. We have a great product but struggling to get qualified leads consistently..."
                              ></textarea>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-heading text-fg mb-3">How long has this been a problem?</h4>
                              <div className="flex flex-wrap gap-3">
                                {["Just started", "1–3 months", "3–12 months", "1+ year"].map(opt => (
                                  <button
                                    key={opt}
                                    onClick={() => updateForm({ problemDuration: opt })}
                                    className={`px-5 py-2.5 border text-sm transition-colors ${
                                      formData.problemDuration === opt 
                                        ? "border-accent bg-accent/10 text-accent" 
                                        : "border-border/40 text-fg hover:border-border"
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 5 && (
                          <div>
                            <h3 className="text-2xl font-heading text-fg mb-4">How urgent is solving this?</h3>
                            {renderOptions("urgency", [
                              "Just exploring",
                              "Need a solution soon",
                              "Urgent (this month)"
                            ])}
                          </div>
                        )}

                        {step === 6 && (
                          <div>
                            <h3 className="text-2xl font-heading text-fg mb-4">What&apos;s your budget to solve this?</h3>
                            {renderOptions("budget", [
                              "<$500",
                              "$500–$2,000",
                              "$2,000–$10,000",
                              "$10,000+"
                            ])}
                          </div>
                        )}

                        {step === 7 && (
                          <div>
                            <h3 className="text-2xl font-heading text-fg mb-4">Are you the decision maker?</h3>
                            {renderOptions("authority", [
                              "Yes",
                              "Partially involved",
                              "No, just researching"
                            ])}
                          </div>
                        )}

                        {step === 8 && (
                          <div>
                            <h3 className="text-2xl font-heading text-fg mb-4">What type of help are you looking for?</h3>
                            {renderOptions("serviceType", [
                              "Done-for-you execution",
                              "Strategy / consulting",
                              "Systems / automation",
                              "Not sure yet"
                            ])}
                          </div>
                        )}

                        {step === 9 && (
                          <div className="space-y-6">
                            <h3 className="text-2xl font-heading text-fg mb-4">Final details</h3>
                            
                            <div className="space-y-2">
                              <label className="text-sm text-fg">Where did you hear about us?</label>
                              <div className="relative">
                                <select 
                                  value={formData.source}
                                  onChange={(e) => updateForm({ source: e.target.value })}
                                  className="w-full bg-border/5 border border-border/30 focus:border-accent focus:bg-border/10 text-fg px-4 py-4 outline-none transition-all appearance-none"
                                >
                                  <option value="" disabled>Select an option...</option>
                                  <option value="Twitter / X">Twitter / X</option>
                                  <option value="LinkedIn">LinkedIn</option>
                                  <option value="Google">Google</option>
                                  <option value="Referral">Friend / Referral</option>
                                  <option value="Other">Other</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" size={16} />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm text-fg">What made you reach out today?</label>
                              <input 
                                type="text"
                                value={formData.trigger}
                                onChange={(e) => updateForm({ trigger: e.target.value })}
                                className="w-full bg-border/5 border border-border/30 focus:border-accent focus:bg-border/10 text-fg px-4 py-3 outline-none transition-all"
                                placeholder="I saw your post about X and..."
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="pt-8 mt-auto flex flex-col items-center">
                    {errorMessage && (
                      <p className="text-red-400 text-sm mb-4 bg-red-400/10 py-2 px-4 w-full text-center border border-red-400/20">
                        {errorMessage}
                      </p>
                    )}
                    
                    <button
                      type="button"
                      disabled={status === "loading"}
                      onClick={step < totalSteps ? handleNext : handleSubmit}
                      className="w-full bg-accent text-bg text-[13px] font-bold tracking-[0.15em] uppercase py-4 hover:bg-fg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 group"
                    >
                      {status === "loading" ? (
                        "Transmitting..."
                      ) : step < totalSteps ? (
                        <>Continue <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                      ) : (
                        "Get My Growth Plan"
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

