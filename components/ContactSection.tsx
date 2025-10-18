
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
    <section ref={sectionRef} className="py-20 relative overflow-hidden bg-[#111827]" id='contact'>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center max-w-4xl mx-auto mb-16">
          <div className="order-1 lg:order-2 w-full">
            <div
              ref={cardRef}
              className="bg-gradient-to-br from-[#895AF3] to-[#2E1E58] backdrop-blur-xl p-10 rounded-2xl text-center shadow-[0_0_30px_rgba(137,90,243,0.2)]"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide leading-relaxed">
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/60">
                  Got a Vision?
                </span>
              </h2>

              <p className="text-lg font-medium text-gray-300 px-10 mt-4 mb-8 leading-relaxed">
                Whether you need a full-stack web application, AI integration,
                or SaaS development — I bring your ideas to life with precision and speed.
              </p>

              <button
                className="bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 cursor-none"
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
                Let’s build something legendary.
              </button>

              <div className="mt-8 space-y-2 text-gray-400 text-sm md:text-base">
                <p>
                  <Link
                    href="mailto:codewithhasnainbro@gmail.com"
                    referrerPolicy="no-referrer"
                    target="_blank"
                    className="hover:text-[#895AF3] transition-colors"
                  >
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
        <p className="font-light tracking-wide">
          © 2024 Muhammad Hasnain • Crafted with passion and precision ⚙️
        </p>
      </footer>
    </section>
  );
};

export default ContactSection;