"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const timelineData = [
  {
    quarter: 'Q1',
    title: 'Web Development Foundation',
    description: 'HTML, CSS, JavaScript, TypeScript fundamentals',
    status: 'completed'
  },
  {
    quarter: 'Q2',
    title: 'React & Next.js Mastery',
    description: 'Advanced React patterns, Next.js, full-stack development',
    status: 'completed'
  },
  {
    quarter: 'Q3',
    title: 'Agentic AI',
    description: 'Python, OpenAI Agents SDK, Custom Agentic Workflows.',
    status: 'in-progress'
  },
  {
    quarter: 'Q4',
    title: 'Advanced AI Agents Workflow',
    description: 'Agentic AI, autonomous systems, advanced integrations.',
    status: 'upcoming'
  }
];

const EducationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ".timeline-item",
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    gsap.fromTo(
      ".certificate-card",
      { y: 50, opacity: 0, rotateY: 45 },
      {
        y: 0,
        opacity: 1,
        rotateY: 0,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      }
    );
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-20"
      style={{
        background: "linear-gradient(135deg, #7738E0, #2E1E58)"
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white">
          Learning Journey
        </h2>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-8 text-center text-gray-200">
            Governor's Initiative for AI & Computing (GIAIC)
          </h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 transform md:-translate-x-0.5"></div>

            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`timeline-item relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Quarter badge */}
                <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm transform md:-translate-x-1/2 z-10">
                  {item.quarter}
                </div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                    <h4 className="text-xl font-semibold mb-2 text-white">{item.title}</h4>
                    <p className="text-gray-300 mb-3">{item.description}</p>
                    <span className={`inline-block px-3 py-1 rounded text-sm ${item.status === 'completed' ? 'bg-green-900 text-green-300' :
                        item.status === 'in-progress' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-gray-700 text-gray-300'
                      }`}>
                      {item.status === 'completed' ? 'Completed' :
                        item.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certificates */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold mb-8 text-center text-gray-200">
              Achievements⚜
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {['Web Development', 'React & Next.js'].map((cert, index) => (
                <div
                  key={index}
                  className="certificate-card bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-600 text-center transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-black font-bold text-lg">🏆</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-white">{cert}</h4>
                  <div className='flex justify-center'>
                    <p className="text-green-400 bg-[#0D542B] px-2 py-1.5 rounded-lg text-sm">completed</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
