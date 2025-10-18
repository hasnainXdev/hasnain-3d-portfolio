"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const text = titleRef.current.textContent || "";
      titleRef.current.innerHTML = text
        .split("")
        .map(
          (char) =>
            `<span class="inline-block">${char === " " ? "&nbsp;" : char}</span>`
        )
        .join("");

      gsap.fromTo(
        titleRef.current.children,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 2.5, stagger: 0.05, ease: "back.out(1.7)" }
      );
    }

    gsap.fromTo(
      subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: "power2.out" }
    );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center bg-[#111827] overflow-hidden"
    >
      <h1
        ref={titleRef}
        className="font-poppins text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white"
      >
        Building Web & AI Products that{" "}
        <span className="font-handwriting text-secondary text-8xl inline-block translate-y-2">
          Ship
        </span>.
      </h1>


      <p
        ref={subtitleRef}
        className="mt-6 max-w-2xl text-gray-300 text-base sm:text-lg md:text-xl font-light leading-relaxed"
      >
        I’m Hasnain — a full-stack developer crafting reliable SaaS, AI agents,
        and modern web experiences using{" "}
        <span className="text-white font-semibold">Next.js</span>,{" "}
        <span className="text-white font-semibold">Python</span>, and{" "}
        <span className="text-white font-semibold">Tailwind CSS</span>.
      </p>

      <div className="mt-10 flex gap-4">
        <a
          href="#projects"
          className="px-6 py-3 bg-[#7738E0] hover:bg-[#692ecc] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-[#7738E0]/40"
        >
          View My Work
        </a>
        <a
          href="#contact"
          className="px-6 py-3 border border-[#7738E0] text-white hover:bg-[#7738E0]/10 rounded-xl font-semibold transition-all"
        >
          Let's Talk
        </a>
      </div>

      {/* Subtle accent ring */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-[#7738E0]/10 via-transparent to-transparent blur-3xl"></div>
    </section>
  );
};

export default HeroSection;
