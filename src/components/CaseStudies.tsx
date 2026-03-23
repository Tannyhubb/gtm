"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SplitText from "./SplitText";
import MagneticCard from "./MagneticCard";

const caseStudies = [
  {
    id: "tripvexa",
    client: "Tripvexa",
    industry: "Travel Tech",
    metric: "300% Booking Increase",
    description: "Revamped their checkout flow and implemented a multi-touchpoint re-engagement campaign, capturing abandoned bookings.",
    image: "/images/tripvexa.png",
    gradient: "from-blue-500/20 to-purple-500/20",
    mockupPattern: "bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:16px_16px]",
  },
  {
    id: "verage",
    client: "Verage Bags",
    industry: "E-Commerce / D2C",
    metric: "4.5x ROAS in 30 Days",
    description: "Overhauled their performance marketing creative and optimized Shopify conversion funnels for peak aesthetic appeal.",
    image: "/images/verage.png",
    gradient: "from-orange-500/20 to-red-500/20",
    mockupPattern: "bg-[linear-gradient(45deg,#ffffff11_25%,transparent_25%,transparent_75%,#ffffff11_75%,#ffffff11)] [background-size:20px_20px]",
  },
  {
    id: "turing",
    client: "Turing Community",
    industry: "Community / Education",
    metric: "10k+ Active Members",
    description: "Scaled their college community into a nationwide tech hub using viral engineering ambassador loops and gamified Discord events.",
    image: "/images/turing.png",
    gradient: "from-emerald-500/20 to-teal-500/20",
    mockupPattern: "bg-[linear-gradient(90deg,#ffffff11_1px,transparent_1px),linear-gradient(#ffffff11_1px,transparent_1px)] [background-size:20px_20px]",
  },
  {
    id: "ffc",
    client: "Fun Friend Chicken",
    industry: "F&B / Local Brand",
    metric: "Fully Booked Launch",
    description: "Designed a localized hyper-targeted social media blast combined with heavy influencer activations across Delhi NCR.",
    image: "/images/ffc.png",
    gradient: "from-yellow-500/20 to-orange-500/20",
    mockupPattern: "bg-[repeating-linear-gradient(45deg,#ffffff05,#ffffff05_10px,transparent_10px,transparent_20px)]",
  },
];

export default function CaseStudies() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  // Lock scroll when modal is open (fail-safe over Lenis)
  useEffect(() => {
    if (selectedCase) document.documentElement.style.overflow = "hidden";
    else document.documentElement.style.overflow = "";
  }, [selectedCase]);

  const toggleModal = (id: string | null) => {
    setSelectedCase(id);
  };

  const columns = [
    caseStudies.filter((_, i) => i % 2 === 0), // Even index
    caseStudies.filter((_, i) => i % 2 !== 0), // Odd index
  ];

  const activeCaseData = caseStudies.find(c => c.id === selectedCase);

  return (
    <section id="work" ref={ref} className="section-padding py-section relative">
      <div className="container-wide">
        {/* Section Header */}
        <div className="mb-20">
          <p className="text-sm text-accent tracking-widest uppercase mb-4">Selected Work</p>
          <h2 className="font-heading text-display text-fg max-w-[800px]">
            <SplitText>Proof of Work</SplitText>
          </h2>
        </div>

        {/* Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {columns.map((column, colIndex) => (
            <div 
              key={colIndex} 
              className={`flex flex-col gap-8 ${colIndex === 1 ? 'md:mt-24' : ''}`}
            >
              {column.map((cs, itemIndex) => (
                <MagneticCard key={cs.id} className="w-full">
                  <motion.div
                    layoutId={`card-container-${cs.id}`}
                    onClick={() => toggleModal(cs.id)}
                    data-cursor-text="View Project"
                    className="group border border-border p-6 md:p-8 hover:border-accent/30 transition-all duration-500 cursor-pointer bg-[#0A0A0A]/40 backdrop-blur-xl hover:bg-[#111111]/80 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 20,
                      delay: itemIndex * 0.15 + colIndex * 0.2,
                    }}
                  >
                    {/* Simulated Screenshot Frame (now rendering images) */}
                    <motion.div 
                      layoutId={`card-image-${cs.id}`}
                      className={`w-full aspect-video bg-gradient-to-br ${cs.gradient} rounded-md relative flex items-center justify-center overflow-hidden mb-8 bg-[#111]`}
                    >
                      {/* Base Image with hover-reveal */}
                      <img 
                        src={cs.image} 
                        alt={cs.client} 
                        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-500 z-0"
                        onError={(e) => {
                          // Fallback if image doesn't exist yet
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      
                      <div className={`absolute inset-0 ${cs.mockupPattern} opacity-30 z-0 pointer-events-none group-hover:opacity-0 transition-opacity duration-500`}></div>
                      <div className="absolute inset-0 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all duration-500 z-0 pointer-events-none"></div>
                      
                      {/* Name fades out when hovering over the image */}
                      <h4 className="font-heading text-3xl text-fg/80 mix-blend-overlay z-10 font-bold group-hover:opacity-0 transition-opacity duration-500 drop-shadow-2xl">{cs.client}</h4>
                    </motion.div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted tracking-widest uppercase">
                        {cs.industry}
                      </span>
                    </div>
                    
                    <motion.h3 
                      layoutId={`card-title-${cs.id}`}
                      className="font-heading text-heading text-fg mb-2 group-hover:text-accent transition-colors duration-300"
                    >
                      {cs.client}
                    </motion.h3>
                    <p className="font-heading text-subheading text-accent mb-4">{cs.metric}</p>
                    <p className="text-muted text-sm leading-relaxed line-clamp-2">{cs.description}</p>
                  </motion.div>
                </MagneticCard>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedCase && activeCaseData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => toggleModal(null)}
              className="fixed inset-0 z-[100] bg-bg/80 backdrop-blur-md cursor-pointer"
              data-cursor-text="Close"
            />
            
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-12 pointer-events-none">
              <motion.div
                layoutId={`card-container-${activeCaseData.id}`}
                className="w-full max-w-5xl bg-[#0A0A0A] border border-border overflow-hidden pointer-events-auto shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative"
                style={{ maxHeight: "90vh", display: "flex", flexDirection: "column" }}
              >
                {/* Modal Header */}
                <div className="p-4 flex justify-between items-center border-b border-border absolute top-0 w-full z-20">
                  <span className="text-sm text-muted tracking-widest uppercase">{activeCaseData.industry}</span>
                  <button 
                    onClick={() => toggleModal(null)}
                    className="text-muted hover:text-fg transition-colors hover-target"
                  >
                    [ Close ]
                  </button>
                </div>

                {/* Simulated Full Screenshot */}
                <motion.div 
                  layoutId={`card-image-${activeCaseData.id}`}
                  className={`w-full h-[50vh] shrink-0 bg-gradient-to-br ${activeCaseData.gradient} relative flex flex-col items-center justify-center mt-12 bg-[#0A0A0A] overflow-hidden`}
                >
                  <img 
                    src={activeCaseData.image} 
                    alt={activeCaseData.client} 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 z-0 mix-blend-lighten"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  
                  <div className={`absolute inset-0 ${activeCaseData.mockupPattern} opacity-10 z-0 pointer-events-none`}></div>
                  
                  {/* Bottom Vignette for text legibility */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 pointer-events-none"></div>

                  <h4 className="font-heading text-5xl md:text-7xl text-fg/80 mix-blend-overlay z-20 font-bold mb-4 drop-shadow-2xl">{activeCaseData.client}</h4>
                  
                  <div className="w-1/2 h-1/2 bg-[#0A0A0A]/80 backdrop-blur-md border border-fg/10 rounded overflow-hidden shadow-2xl relative z-20 flex flex-col items-center p-8 gap-4 justify-center">
                     <p className="text-accent text-lg">System Active</p>
                     <p className="text-fg text-2xl font-heading">{activeCaseData.metric}</p>
                  </div>
                </motion.div>

                {/* Modal Content */}
                <div className="p-8 md:p-12 overflow-y-auto">
                  <motion.h3 
                    layoutId={`card-title-${activeCaseData.id}`}
                    className="font-heading text-display-sm text-fg mb-4"
                  >
                    {activeCaseData.client}
                  </motion.h3>
                  
                  <div className="inline-block px-4 py-2 border border-accent/30 bg-accent/5 text-accent text-sm tracking-widest uppercase mb-8">
                    {activeCaseData.metric}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     <div>
                        <h4 className="text-fg mb-3 font-medium">The Challenge</h4>
                        <p className="text-muted leading-relaxed mb-6">Before we engaged, the client was burning capital on generic brand awareness. They lacked a systemic acquisition funnel tailored to their precise ideal customer profile.</p>
                     </div>
                     <div>
                        <h4 className="text-fg mb-3 font-medium">The Execution</h4>
                        <p className="text-muted leading-relaxed">We stripped the frontend complexity, mapped out a singular high-leverage entry point, and executed the campaign. {activeCaseData.description}</p>
                     </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
