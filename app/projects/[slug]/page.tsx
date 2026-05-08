"use client";

import { projectsData } from "@/app/constants";
import gsap from "gsap";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

const ProjectDetails = () => {
  const params = useParams();
  const projectId = params.slug as string;
  const project = projectsData[projectId as keyof typeof projectsData];
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroImageRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );

      gsap.fromTo(
        ".detail-section",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.4,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <Link href="/" className="text-primary hover:underline">
            Go back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 max-w-7xl">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="detail-section inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </Link>

        {/* Title & Meta */}
        <div className="mb-12">
          <h1 className="detail-section text-5xl md:text-7xl font-extrabold mb-4 text-gradient">
            {project.title}
          </h1>
          <p className="detail-section text-xl md:text-2xl text-foreground/80 mb-6">
            {project.tagline}
          </p>
          <p className="detail-section text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* Hero Image */}
        <div
          ref={heroImageRef}
          className="mb-20 p-2 border-2 border-primary rounded-3xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 bg-gradient-to-br from-primary/5 to-transparent"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
            <Image
              src={project.image}
              alt={`${project.title} overview`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-20">
          <h2 className="detail-section text-3xl md:text-4xl font-bold mb-6">
            Tech Stack
          </h2>
          <div className="detail-section flex flex-wrap gap-3">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="bg-gradient-to-r from-primary/30 to-transparent backdrop-blur-sm px-5 py-2.5 rounded-full border border-border text-base font-medium hover:border-primary/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2 className="detail-section text-3xl md:text-4xl font-bold mb-8">
            Key Features
          </h2>
          <div className="space-y-4">
            {project.features.map((feature, index) => (
              <div
                key={index}
                className="detail-section flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-transparent border border-border hover:border-primary/20 transition-all duration-300"
              >
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: project.color }}
                />
                <p className="text-base md:text-lg text-foreground/90">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="detail-section pt-12 border-t border-border">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Interested in this project?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Explore the live application or dive into the source code to see how
            it was built.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/50 hover:scale-105"
            >
              <ExternalLink className="w-5 h-5" />
              View Live Project
            </Link>
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary hover:bg-secondary/80 rounded-xl font-semibold text-lg transition-all duration-300 border border-border hover:border-primary/40"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
