import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Offer from "@/components/Offer";
import Process from "@/components/Process";
import TargetAudience from "@/components/TargetAudience";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. Clear Hero Section */}
        <Hero />
        
        {/* 2. Problem -> Solution Positioning */}
        <ProblemSolution />
        
        {/* 3. Your Offer */}
        <Offer />
        
        {/* 4. Proof */}
        <CaseStudies />
        <Testimonials />
        
        {/* 5. Your Process */}
        <Process />
        
        {/* 6. Who It's For / Not For */}
        <TargetAudience />
        
        {/* 7. Pricing or Entry Point */}
        <Pricing />
        
        {/* 9. Founder Credibility */}
        <About />
        
        {/* 10. Simple Lead Capture */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
