
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FloatingElements = () => {
  const elementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementsRef.current) {
      const elements = elementsRef.current.children;
      
      Array.from(elements).forEach((element, index) => {
        gsap.to(element, {
          y: "random(-20, 20)",
          x: "random(-20, 20)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        });
      });
    }
  }, []);

  return (
    <div ref={elementsRef} className="fixed inset-0 pointer-events-none z-10">
      <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-20"></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-white rounded-full opacity-15"></div>
      <div className="absolute bottom-32 left-40 w-2 h-2 bg-white rounded-full opacity-25"></div>
      <div className="absolute bottom-20 right-20 w-3 h-3 bg-white rounded-full opacity-10"></div>
    </div>
  );
};

export default FloatingElements;