"use client";

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectSection';
import Contact from '@/components/Contact';

const Home = () => {

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection />
      <Contact />
    </>
  );
};

export default Home; 