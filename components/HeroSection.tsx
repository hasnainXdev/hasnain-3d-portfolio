"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Split text animation
    if (titleRef.current) {
      const text = titleRef.current.textContent || "";
      titleRef.current.innerHTML = text
        .split("")
        .map(
          (char) =>
            `<span class="inline-block">${char === " " ? "&nbsp;" : char
            }</span>`
        )
        .join("");

      gsap.fromTo(
        titleRef.current.children,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
          },
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
        },
      }
    );

    // Animate spotlight
    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        rotation: 360,
        duration: 15,
        repeat: -1,
        ease: "none",
      });
    }

    // Floating code elements
    if (floatingElementsRef.current) {
      const elements = floatingElementsRef.current.children;

      Array.from(elements).forEach((element, index) => {
        gsap.set(element, {
          x: `random(-50, 50)`,
          y: `random(-30, 30)`,
          rotation: `random(-15, 15)`,
          opacity: 0,
        });

        gsap.to(element, {
          opacity: 1,
          duration: 1,
          delay: 1 + index * 0.2,
          ease: "power2.out",
        });

        gsap.to(element, {
          y: `random(-40, 40)`,
          x: `random(-40, 40)`,
          rotation: `random(-20, 20)`,
          duration: `random(4, 8)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
        });

        gsap.to(element, {
          scale: `random(0.8, 1.2)`,
          duration: `random(3, 6)`,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.5,
        });
      });
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-bl from-[#7C3AED] via-[#5B21B6] to-[#0F0F1B]"></div>

        {/* Rotating spotlight */}
        <div
          ref={spotlightRef}
          className="absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(ellipse 1000px 700px at 50% 40%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)`,
          }}
        ></div>

        {/* Purple glow */}
        <div
          className="absolute inset-0 opacity-40 animate-pulse"
          style={{
            background: `radial-gradient(ellipse 800px 500px at 30% 70%, rgba(124,58,237,0.3) 0%, rgba(124,58,237,0.1) 40%, transparent 70%)`,
          }}
        ></div>

        {/* Subtle white center glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle 400px at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          }}
        ></div>
      </div>

      {/* Floating Code Elements (Purple Theme) */}
      <div
        ref={floatingElementsRef}
        className="absolute inset-0 z-5 pointer-events-none"
      >
        <div className="absolute top-20 left-20 text-purple-400 text-4xl font-mono opacity-30">
          {"{"}
        </div>
        <div className="absolute top-32 right-24 text-purple-300 text-4xl font-mono opacity-30">
          {"}"}
        </div>
        <div className="absolute bottom-40 left-32 text-purple-400 text-3xl font-mono opacity-25">
          {"["}
        </div>
        <div className="absolute bottom-52 right-40 text-purple-400 text-3xl font-mono opacity-25">
          {"]"}
        </div>
        <div className="absolute top-40 left-1/4 text-purple-300 text-2xl font-mono opacity-30">
          {"</"}<span>{">"}</span>
        </div>
        <div className="absolute bottom-60 right-1/4 text-purple-400 text-2xl font-mono opacity-25">
          {"()"}
        </div>
        <div className="absolute top-60 right-1/3 text-purple-200 text-xl font-mono opacity-30">
          {";"}
        </div>
        <div className="absolute bottom-32 left-1/3 text-purple-300 text-xl font-mono opacity-25">
          {"&&"}
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center z-10 lg:max-w-5xl">
        <h1
          ref={titleRef}
          className="font-poppins text-xl sm:text-3xl md:text-4xl lg:text-7xl font-bold mb-6 leading-tight lg:tracking-tight text-white"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-white/60 via-white/90 to-white/60">
            Hi, I'm a Full-Stack Developer
            <br /> & aspiring Founder
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="font-poppins text-base md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          I help startups and clients turn ideas into full-stack reality using{" "}
          <span className="text-white font-semibold border-b-4 pb-0.5 border-purple-500">
            Next.js
          </span>
          ,{" "}
          <span className="text-white font-semibold border-b-4 pb-0.5 border-purple-500">
            Python
          </span>
          ,{" "}
          <span className="text-white font-semibold border-b-4 pb-0.5 border-purple-500">
            Tailwind CSS
          </span>
          ,{" "}
          <span className="text-white font-semibold border-b-4 pb-0.5 border-purple-500">
            MongoDB
          </span>
          , and{" "}
          <span className="text-white font-semibold border-b-4 pb-0.5 border-purple-500">
            AI Agents
          </span>
          .
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
