
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const PassionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [currentWord, setCurrentWord] = useState('building');
  
  const words = ['building', 'automating', 'solving', 'shipping'];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
      setCurrentWord(words[(wordIndex + 1) % words.length]);
    }, 2000);

    return () => clearInterval(interval);
  }, [wordIndex, words]);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
  <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-[#111827] text-white"
    >

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <p
            ref={textRef}
            className="text-3xl md:text-5xl font-medium leading-relaxed text-gray-100"
          >
            I{" "}
            <span className="font-bold text-[#895AF3] transition-all duration-500">
              {currentWord}
            </span>{" "}
            Agentic AI workflows and ship SaaS ideas fast.
          </p>

          <div className="mt-12 bg-gradient-to-bl from-[#7738E0] to-[#2E1E58] p-8 rounded-2xl border border-white/10 shadow-lg shadow-[#7738E0]/20">
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Current Mission
            </h3>
            <p className="text-gray-200 text-lg leading-relaxed">
              Bridging the gap between complex AI capabilities and real-world
              business solutions. Every project is a step toward creating
              intelligent systems that work seamlessly with human creativity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PassionSection;