"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const GlitchText = ({ text, onComplete }: { text: string; onComplete: () => void }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * 26)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <h1 className="text-6xl md:text-8xl font-bold text-center tracking-wider font-[poppins]">
      {displayText}
    </h1>
  );
};

const IntroAnimation = () => {
  const introRef = useRef<HTMLDivElement>(null);
  const [showText, setShowText] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleTextComplete = () => {
    if (introRef.current) {
      gsap.to(introRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => setIntroComplete(true)
      });
    }
  };

  if (introComplete) return null;

  return (
    <div
      ref={introRef}
      className="fixed inset-0 z-50 bg-gradient-to-bl from-[#2f0c6c] to-[#1d0c3b] flex flex-col items-center justify-center"
    >
      <div className="w-full h-full flex flex-col items-center justify-center space-y-8">
        <div className="w-64 h-64 mb-8 flex items-center justify-center">
          <div className="w-32 h-32 border-2 border-white rounded-full animate-spin"></div>
        </div>
        
        {showText && (
          <div className="text-center space-y-4">
            <GlitchText text="MUHAMMAD HASNAIN" onComplete={handleTextComplete} />
            <p className="text-xl text-gray-400 animate-pulse">
              Full-Stack Developer & Aspiring Founder
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroAnimation;