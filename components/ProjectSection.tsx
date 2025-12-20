import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { projects } from '@/app/constants';

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ".project-card",
      {
        y: 100,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
      const element = card as HTMLElement;

      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out"
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id='projects'
      className="py-20 bg-[#111827] text-white min-h-screen"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#7738E0] to-[#FFFFFF]">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Link
              href={`/projects/${project.slug}`}
              key={index}
              className="project-card relative overflow-hidden rounded-2xl cursor-pointer block"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;