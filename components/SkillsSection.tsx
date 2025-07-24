"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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

    // Animate skill items on scroll with 3D effects
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

    // Add interactive 3D hover animations to each skill item
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item) => {
      const element = item as HTMLElement;

      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          rotationY: 15,
          rotationX: 10,
          scale: 1.1,
          z: 100,
          duration: 0.4,
          ease: "power2.out"
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          z: 0,
          duration: 0.4,
          ease: "power2.out"
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
          ease: "power2.out"
        });
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden" style={{ perspective: '1200px' }}>
      <div className="container mx-auto md:px-4 p-0">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
          Technical Arsenal
        </h2>

        <div ref={scrollContainerRef} className="flex flex-wrap gap-8 justify-center md:justify-start">
          {skills.map((skillGroup, groupIndex) => (
            <div key={groupIndex} className="flex-shrink-0 w-full sm:w-[300px] px-20 sm:p-0">
              <h3 className="text-2xl font-semibold mb-6 text-gray-300">
                {skillGroup.category}
              </h3>
              <div className="space-y-4">
                {skillGroup.items.map((skill, index) => (
                  <div
                    key={index}
                    className="skill-item bg-gray-900 px-6 py-4 rounded-lg border border-gray-700 hover:border-white transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 cursor-pointer flex items-center space-x-4"
                    style={{
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)'
                    }}
                  >
                    <div
                      className="text-2xl font-bold flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full"
                      style={{
                        backgroundColor: `${skill.color}20`,
                        color: skill.color,
                        textShadow: `0 0 15px ${skill.color}70`,
                        transform: 'translateZ(20px)'
                      }}
                    >
                      {skill.logo}
                    </div>
                    <span
                      className="text-lg font-medium"
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