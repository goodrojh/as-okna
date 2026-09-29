"use client";
import LeadProvider from "@/components/lead/LeadProvider";
import Hero from "@/components/site/Hero";
import Diagnose from "@/components/site/Diagnose";
import Features from "@/components/site/Features";
import Services from "@/components/site/Services";
import HowItWorks from "@/components/site/HowItWorks";
import QuizSection from "@/components/site/QuizSection";
import Brands from "@/components/site/Brands";
import Pricing from "@/components/site/Pricing";
import Reviews from "@/components/site/Reviews";
import FAQ from "@/components/site/FAQ";
import Blog from "@/components/site/Blog";
import Footer from "@/components/site/Footer";
import StickyCta from "@/components/site/StickyCta";

export default function Home() {
  return (
    <LeadProvider>
      <main className="min-h-screen overflow-x-clip">
        <Hero />
        <Diagnose />
        <Features />
        <Services />
        <HowItWorks />
        <QuizSection />
        <Brands />
        <Pricing />
        <Reviews />
        <FAQ />
        <Blog />
        <Footer />
      </main>
      <StickyCta />
    </LeadProvider>
  );
}
