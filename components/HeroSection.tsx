"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import RotatingCube from "./RotatingCube";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
    );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col lg:flex-row items-center justify-between min-h-screen py-10 md:py-0 px-8 md:px-28 bg-[#111827] overflow-hidden"
    >
      {/* Left Text Section */}
      <div className="flex-1 text-left space-y-6 max-w-xl">
        <h1
          className="font-poppins text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white"
        >
          Building <span className="text-[#7738E0]">Web</span> &{" "}
          <span className="text-[#7738E0]">AI</span> Products that Ship.
        </h1>

        <p
          ref={subtitleRef}
          className="text-gray-300 text-base sm:text-lg md:text-xl font-light leading-relaxed"
        >
          I’m Hasnain, a full stack web developer building reliable SaaS, AI agents,
          and modern web experiences using{" "}
          <span className="text-white font-semibold">Next.js</span>,{" "}
          <span className="text-white font-semibold">Python</span>, and{" "}
          <span className="text-white font-semibold">Tailwind CSS</span>.
        </p>

        <div className="flex gap-4">
          <Link
            href="#projects"
            className="px-6 py-3 bg-[#7738E0] hover:bg-[#692ecc] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-[#7738E0]/40 cursor-none"
          >
            View My Work
          </Link>
          <Link
            href="#contact"
            className="px-6 py-3 border border-[#7738E0] text-white hover:bg-[#7738E0]/10 rounded-xl font-semibold transition-all cursor-none"
          >
            Let's Talk
          </Link>
        </div>
      </div>

      {/* Right Visual Section */}
      <div className="flex-1 flex items-center justify-center lg:justify-end mt-16 lg:mt-0">
        <RotatingCube />
      </div>

      {/* Accent Glow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-[#7738E0]/10 via-transparent to-transparent blur-3xl"></div>
    </section>
  );
};

export default HeroSection;
