"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Lenis from 'lenis';
import IntroAnimation from '../components/IntroAnimation';
import HeroSection from '../components/HeroSection';
import SkillsSection from '../components/SkillsSection';
import EducationSection from '../components/EducationSection';
import ProjectsSection from '../components/ProjectSection';
import PassionSection from '../components/PassionSection';
import ContactSection from '../components/ContactSection';
import CustomCursor from '../components/CustomCursor';
import FloatingElements from '../components/FloatingElements';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.2,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // GSAP ScrollTrigger integration
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(() => { });
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden">
      <CustomCursor />

      <FloatingElements />

      <IntroAnimation />

      <HeroSection />

      <SkillsSection />

      <EducationSection />

      <ProjectsSection />

      <PassionSection />

      <ContactSection />
    </div>
  );
};

export default Index;