
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const PassionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [currentWord, setCurrentWord] = useState('building');
  
  const words = ['building', 'automating', 'solving', 'creating'];
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
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <p ref={textRef} className="text-3xl md:text-5xl font-light leading-relaxed">
            I{' '}
            <span className="font-bold text-white transition-all duration-500">
              {currentWord}
            </span>{' '}
            agentic AI tools and shipping fast SaaS ideas.
          </p>
          
          <div className="mt-12 bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-semibold mb-4">Current Mission</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Bridging the gap between complex AI capabilities and real-world business solutions. 
              Every project is an opportunity to push the boundaries of what's possible with 
              modern web technologies and artificial intelligence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PassionSection;