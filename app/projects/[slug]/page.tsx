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
            // Hero image animation
            gsap.fromTo(
                heroImageRef.current,
                { opacity: 0, scale: 0.95, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" }
            );

            // Stagger content sections
            gsap.fromTo(
                ".detail-section",
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    delay: 0.4
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen bg-[#111827] flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project not found</h1>
                    <Link
                        href="/"
                        className="text-[#7738E0] hover:text-[#9333ea] transition-colors"
                    >
                        Go back to projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="min-h-screen bg-[#111827] text-white">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 max-w-7xl">
                {/* Back Link */}
                <Link
                    href="/#projects"
                    className="detail-section inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Projects</span>
                </Link>

                {/* Title & Meta */}
                <div className="mb-12">
                    <h1 className="detail-section text-5xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#7738E0] to-white">
                        {project.title}
                    </h1>
                    <p className="detail-section text-xl md:text-2xl text-gray-300 mb-6">
                        {project.tagline}
                    </p>
                    <p className="detail-section text-base md:text-lg text-gray-400 max-w-3xl leading-relaxed">
                        {project.fullDescription}
                    </p>
                </div>

                {/* Hero Image - Single Large Overview */}
                <div
                    ref={heroImageRef}
                    className="mb-20 p-2 border-2 border-[#7738E0] rounded-3xl shadow-2xl shadow-[#7738E0]/30 hover:shadow-[#7738E0]/50 transition-all duration-300 bg-gradient-to-br from-[#7738E0]/5 to-transparent"
                >
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#0a0f1e]">
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
                                className="bg-gradient-to-r from-[#7738E0]/30 to-transparent backdrop-blur-sm text-white px-5 py-2.5 rounded-full border border-white/20 text-base font-medium hover:border-white/40 transition-colors"
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
                                className="detail-section flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-[#7738E0]/10 to-transparent border border-white/5 hover:border-white/20 transition-all duration-300"
                            >
                                <div
                                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                    style={{ backgroundColor: project.color }}
                                />
                                <p className="text-base md:text-lg text-gray-200">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="detail-section pt-12 border-t border-white/10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Interested in this project?
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-2xl">
                        Explore the live application or dive into the source code to see how it was built.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#7738E0] to-[#9333ea] hover:from-[#9333ea] hover:to-[#7738E0] rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#7738E0]/50 hover:scale-105"
                        >
                            <ExternalLink className="w-5 h-5" />
                            View Live Project
                        </Link>
                        {project.github && (
                            <Link
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/20 hover:border-white/40"
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