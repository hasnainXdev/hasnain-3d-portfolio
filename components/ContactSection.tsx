
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ContactForm from './ContactForm';
import Link from 'next/link';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 100, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
          <div className="order-2 lg:order-1">
            <div className="h-96 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border-2 border-white opacity-20 animate-pulse"></div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div
              ref={cardRef}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg p-8 rounded-2xl border border-gray-700 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Build?
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Whether you need a full-stack web application, AI integration, 
                or SaaS development, I'm here to turn your vision into reality.
              </p>
              
              <button
                className="bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    boxShadow: "0 20px 40px rgba(255,255,255,0.3)",
                    duration: 0.3
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    boxShadow: "0 0px 0px rgba(255,255,255,0)",
                    duration: 0.3
                  });
                }}
              >
                Let's build something legendary.
              </button>
              
              <div className="mt-8 space-y-2 text-gray-400">
                <p>
                  <Link href="mailto:codewithhasnainbro@gmail.com" referrerPolicy='no-referrer' target="_blank" >
                  codewithhasnainbro@gmail.com
                  </Link>
                  </p>
                <p>🟢 Available worldwide</p>
                <p>⚡ Fast response guaranteed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-20">
          <ContactForm />
        </div>
      </div>
      
      <footer className="mt-20 text-center text-gray-500 border-t border-gray-800 pt-8">
        <p className="typewriter">
          © 2024 Muhammad Hasnain • Crafted with passion and precision
        </p>
      </footer>
    </section>
  );
};

export default ContactSection;