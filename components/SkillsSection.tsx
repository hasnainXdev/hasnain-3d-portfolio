"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'Next.js', logo: '▲', color: '#000000' },
      { name: 'React', logo: '⚛️', color: '#61DAFB' },
      { name: 'TailwindCSS', logo: '🎨', color: '#06B6D4' },
      { name: 'ShadCN', logo: '🎯', color: '#000000' }
    ]
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', logo: '🟢', color: '#339933' },
      { name: 'Express.js', logo: '🚀', color: '#339933' },
      { name: 'FastAPI', logo: '⚡', color: '#009688' },
      { name: 'Python', logo: '🐍', color: '#3776AB' }
    ]
  },
  {
    category: 'AI',
    items: [
      { name: 'OpenAI Agents SDK', logo: '🤖', color: '#412991' },
      { name: 'Chainlit', logo: '⛓️', color: '#FF6B35' }
    ]
  },
  {
    category: 'Database',
    items: [
      { name: 'MongoDB', logo: '🍃', color: '#47A248' },
      { name: "Supabase", logo: "🟢", color: "#3ECF8E" },
    ]
  },
  {
    category: 'Tools',
    items: [
      { name: 'Vercel', logo: '▲', color: '#000000' },
      { name: 'Stripe', logo: '💳', color: '#635BFF' },
      { name: 'LemmonSqeezy', logo: '🍋', color: '#FFFFED' },
      { name: 'GitHub', logo: '🐙', color: '#181717' }
    ]
  },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current && window.innerWidth >= 768) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const containerWidth = scrollContainerRef.current.offsetWidth;

      gsap.to(scrollContainerRef.current, {
        x: -(scrollWidth - containerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    }

    gsap.fromTo(
      ".skill-item",
      {
        scale: 0.8,
        opacity: 0,
        rotationX: -90,
        z: -200
      },
      {
        scale: 1,
        opacity: 1,
        rotationX: 0,
        z: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "back.out(1)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item) => {
      const element = item as HTMLElement;

      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          rotationY: 15,
          rotationX: 10,
          scale: 1.1,
          z: 100,
          duration: 0.1,
          ease: "power2.inOut"
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          z: 0,
          duration: 0.4,
          ease: "power2.inOut"
        });
      });

      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -20;
        const rotateY = ((x - centerX) / centerX) * 20;

        gsap.to(element, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.1,
          ease: "power2.inOut"
        });
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-bl from-[#7434E0] to-[#0F0F1B] overflow-hidden font-[poppins]"
      style={{ perspective: '1200px' }}
    >
      <div className="container mx-auto md:px-4 p-0">
        
        {/* Main Title with Gradient */}
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-gray-200 via-white to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
          Technical Skills
        </h2>

        <div ref={scrollContainerRef} className="flex flex-wrap gap-8 justify-center md:justify-start">
          {skills.map((skillGroup, groupIndex) => (
            <div key={groupIndex} className="flex-shrink-0 w-full sm:w-[300px] px-20 sm:p-0">
              
              {/* Category Title */}
              <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-300 via-purple-100 to-purple-400 bg-clip-text text-transparent">
                {skillGroup.category}
              </h3>

              <div className="space-y-4">
                {skillGroup.items.map((skill, index) => (
                  <div
                    key={index}
                    className="skill-item px-6 py-4 rounded-lg border border-gray-700/40 bg-white/5 backdrop-blur-lg hover:border-purple-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 cursor-none flex items-center space-x-4"
                    style={{
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)'
                    }}
                  >
                    <div
                      className="text-2xl font-bold flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full"
                      style={{
                        background: `radial-gradient(circle at center, ${skill.color}30, transparent)`,
                        color: skill.color,
                        textShadow: `0 0 15px ${skill.color}70`,
                        transform: 'translateZ(20px)'
                      }}
                    >
                      {skill.logo}
                    </div>
                    <span
                      className="text-lg font-medium text-gray-200"
                      style={{ transform: 'translateZ(10px)' }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
