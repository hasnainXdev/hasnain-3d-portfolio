import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { ArrowUp, ArrowUpCircle } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: "Trakwise - Finance Made Easy",
    description: "Full-stack application with Next.js",
    tech: ["Next.js", "MongoDB", "Tailwind CSS", "LemmonSqueezy", "Clerk"],
    image: "/trakwise-project.png",
    link: "https://trakwise.vercel.app"
  },
  {
    title: "Farniture E-Store + CMS",
    description: "Modern e-store with payment processing and inventory management",
    tech: ["Next.js", "Tailwind CSS", "NextAuth", "Sanity.io", "Stripe"],
    image: "/furniture-store.png",
    link: "https://uiux-hackathon-2024.vercel.app"
  },
  {
    title: "AI Assistant Agents - Chatbot",
    description: "Real-time chat application with AI-powered responses",
    tech: ["Python", "OpenAI Agents SDK", "Streamlit"],
    image: "/personal-assistant.png",
    link: "https://github.com/hasnainXdev/personal-aiagent"
  }
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ".project-card",
      {
        y: 100,
        opacity: 0,
        rotationX: -45,
        z: -150
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        z: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
      const element = card as HTMLElement;
      const showcaseImage = element.querySelector('.showcase-image') as HTMLElement;

      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          rotationY: 10,
          rotationX: 5,
          scale: 1.05,
          z: 50,
          duration: 0.5,
          ease: "power2.out"
        });

        if (showcaseImage) {
          gsap.set(showcaseImage, { display: 'block' });
          gsap.fromTo(showcaseImage,
            { y: -50, opacity: 0, scale: 0.8 },
            { y: -20, opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
          );
        }
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          z: 0,
          duration: 0.5,
          ease: "power2.out"
        });

        if (showcaseImage) {
          gsap.to(showcaseImage, {
            y: -50,
            opacity: 0,
            scale: 0.8,
            duration: 0.2,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(showcaseImage, { display: 'none' });
            }
          });
        }
      });

      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        gsap.to(element, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.2,
          ease: "power2.out"
        });

        if (showcaseImage) {
          const imageX = x - 180;
          const imageY = y - 180;

          gsap.to(showcaseImage, {
            x: imageX,
            y: imageY,
            duration: 0.1,
            ease: "power2.out"
          });
        }
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id='projects'
      className="py-20 bg-[#111827] text-white"
      style={{ perspective: "1200px" }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#7738E0] to-[#FFFFFF]">
          Featured Projects
        </h2>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            
            <div
                key={index}
                className="project-card bg-gradient-to-br from-[#7738E0]/70 to-[#111827] p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#7738E0]/40 relative overflow-hidden group"
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  transform: "translateZ(0)",
                }}
              >
                <Link href={project.link} target='_blank'>
                <ArrowUpCircle className='rotate-60 absolute right-3 top-3 w-8 h-8 group-hover:text-white/65 transition-colors duration-200' />
                {/* Floating showcase image */}
                <div
                  className="showcase-image absolute top-0 left-0 pointer-events-none z-50 hidden"
                  style={{ transform: "translateZ(100px)" }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-72 h-48 object-cover rounded-lg shadow-2xl border border-white/20"
                  />
                </div>

                {/* Title */}
                <div style={{ transform: "translateZ(30px)" }}>
                  <h3 className="text-xl font-bold mb-3 text-white drop-shadow-lg">
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <div style={{ transform: "translateZ(20px)" }}>
                  <p className="text-gray-100/90 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div
                  className="flex flex-wrap gap-2"
                  style={{ transform: "translateZ(10px)" }}
                >
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-white/10 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full border border-white/20 hover:bg-white/20 hover:border-white/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Glow overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"
                  style={{ transform: "translateZ(5px)" }}
                />
            </Link>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
