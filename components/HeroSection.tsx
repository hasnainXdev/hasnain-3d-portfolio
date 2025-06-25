
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Split text animation
    if (titleRef.current) {
      const text = titleRef.current.textContent || '';
      titleRef.current.innerHTML = text
        .split('')
        .map(char => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

      gsap.fromTo(
        titleRef.current.children,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
          }
        }
      );
    }

    gsap.fromTo(
      subtitleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 70%",
        }
      }
    );

    // Animate spotlight with brighter effect
    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        rotation: 360,
        duration: 15,
        repeat: -1,
        ease: "none"
      });
    }

    // Animate floating code elements
    if (floatingElementsRef.current) {
      const elements = floatingElementsRef.current.children;
      
      Array.from(elements).forEach((element, index) => {
        // Random initial position
        gsap.set(element, {
          x: `random(-50, 50)`,
          y: `random(-30, 30)`,
          rotation: `random(-15, 15)`,
          opacity: 0
        });

        // Fade in animation
        gsap.to(element, {
          opacity: 1,
          duration: 1,
          delay: 1 + index * 0.2,
          ease: "power2.out"
        });

        // Continuous floating animation
        gsap.to(element, {
          y: `random(-40, 40)`,
          x: `random(-40, 40)`,
          rotation: `random(-20, 20)`,
          duration: `random(4, 8)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3
        });

        // Add subtle scaling animation
        gsap.to(element, {
          scale: `random(0.8, 1.2)`,
          duration: `random(3, 6)`,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.5
        });
      });
    }
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black"></div>
        {/* Brighter spotlight effect */}
        <div 
          ref={spotlightRef}
          className="absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(ellipse 1000px 700px at 50% 40%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 20%, rgba(255, 255, 255, 0.08) 40%, transparent 70%)`
          }}
        ></div>
        {/* Additional brighter moving spotlight */}
        <div 
          className="absolute inset-0 opacity-40 animate-pulse"
          style={{
            background: `radial-gradient(ellipse 800px 500px at 30% 70%, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.15) 30%, rgba(59, 130, 246, 0.05) 50%, transparent 70%)`
          }}
        ></div>
        {/* Extra bright center glow */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle 400px at 50% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)`
          }}
        ></div>
      </div>

      {/* Floating Code Elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 z-5 pointer-events-none">
        {/* Code Brackets */}
        <div className="absolute top-20 left-20 text-blue-400 text-4xl font-mono opacity-30">{'{'}</div>
        <div className="absolute top-32 right-24 text-green-400 text-4xl font-mono opacity-30">{'}'}</div>
        <div className="absolute bottom-40 left-32 text-purple-400 text-3xl font-mono opacity-25">{'['}</div>
        <div className="absolute bottom-52 right-40 text-purple-400 text-3xl font-mono opacity-25">{']'}</div>

        {/* Code Symbols */}
        <div className="absolute top-40 left-1/4 text-cyan-400 text-2xl font-mono opacity-30">{'</'}<span>{'>'}</span></div>
        <div className="absolute bottom-60 right-1/4 text-yellow-400 text-2xl font-mono opacity-25">{'()'}</div>
        <div className="absolute top-60 right-1/3 text-pink-400 text-xl font-mono opacity-30">{';'}</div>
        <div className="absolute bottom-32 left-1/3 text-orange-400 text-xl font-mono opacity-25">{'&&'}</div>

        {/* Tech Symbols */}
        <div className="absolute top-1/4 left-16 text-blue-500 text-3xl opacity-20">⚛️</div>
        <div className="absolute top-1/3 right-16 text-black text-2xl opacity-25 bg-white rounded px-1">▲</div>
        <div className="absolute bottom-1/4 left-1/6 text-green-500 text-2xl opacity-20">🐍</div>
        <div className="absolute bottom-1/3 right-1/6 text-purple-500 text-2xl opacity-25">🤖</div>

        {/* Code Snippets */}
        <div className="absolute top-1/2 left-8 text-gray-400 text-sm font-mono opacity-20 rotate-12">
          const code = () =<span>{'>'}</span> {'{}'}
        </div>
        <div className="absolute bottom-1/2 right-8 text-gray-400 text-sm font-mono opacity-20 -rotate-12">
          import React from 'react'
        </div>
        <div className="absolute top-3/4 left-1/5 text-gray-400 text-xs font-mono opacity-15 rotate-6">
          npm install
        </div>
        <div className="absolute bottom-1/5 right-1/5 text-gray-400 text-xs font-mono opacity-15 -rotate-6">
          git commit -m
        </div>

        {/* Additional Symbols */}
        {/* <div className="absolute top-16 left-1/2 text-red-400 text-xl font-mono opacity-20">{'#'}</div>
        <div className="absolute bottom-16 left-1/2 text-indigo-400 text-xl font-mono opacity-20">{'$'}</div>
        <div className="absolute top-1/6 right-1/2 text-teal-400 text-lg font-mono opacity-25">{'@'}</div>
        <div className="absolute bottom-1/6 right-1/2 text-amber-400 text-lg font-mono opacity-25">{'*'}</div> */}
      </div>
      
      <div className="text-center z-10 max-w-4xl">
        <h1
          ref={titleRef}
          className="font-poppins text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Building SaaS, AI, and Next-Gen Web Experiences.
        </h1>
        
        <p
          ref={subtitleRef}
          className="font-poppins text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          I help startups and clients turn ideas into full-stack reality using{' '}
          <span className="text-white font-semibold">Next.js</span>,{' '}
          <span className="text-white font-semibold">Python</span>,{' '}
          <span className="text-white font-semibold">Stripe</span>,{' '}
          <span className="text-white font-semibold">MongoDB</span>, and{' '}
          <span className="text-white font-semibold">Agentic AI</span>.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;