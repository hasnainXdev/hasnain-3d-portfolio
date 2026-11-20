"use client";

import { projectsData } from "@/app/constants";
import { useFadeUp } from "@/hooks/useFadeUp";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const ProjectDetails = () => {
  const params = useParams();
  const projectId = params.slug as string;
  const project = projectsData[projectId as keyof typeof projectsData];
  const ref = useFadeUp();

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-foreground">Project not found</h1>
          <Link href="/#projects" className="mt-4 inline-block text-sm text-secondary-foreground underline decoration-border underline-offset-4">
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div ref={ref} className="fade-up mx-auto max-w-[1440px] px-6 pb-24 pt-28 lg:px-8 lg:pt-40">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs text-secondary-foreground transition-colors duration-150 hover:text-foreground"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Back to projects
        </Link>

        <header className="mt-10 border-b border-border pb-10">
          <p className="font-mono text-xs text-muted-foreground">{project.tagline}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-foreground lg:text-[44px]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-secondary-foreground">{project.fullDescription}</p>
        </header>

        <div className="mt-10 rounded-2xl border border-border bg-card p-2">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-secondary">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} overview`}
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
            ) : (
              <div className="flex h-full flex-col justify-between p-6">
                <p className="font-mono text-xs text-muted-foreground">repository</p>
                <p className="font-mono text-base text-foreground">{project.id}</p>
                <p className="font-mono text-xs text-secondary-foreground">{project.tech.join(" · ")}</p>
              </div>
            )}
          </div>
        </div>

        <section className="mt-16">
          <h2 className="font-mono text-xs text-muted-foreground">Tech stack</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="rounded-md bg-secondary px-3 py-1.5 font-mono text-xs text-secondary-foreground">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-mono text-xs text-muted-foreground">Key features</h2>
          <ul className="mt-4 space-y-3">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" aria-hidden="true" />
                <p className="text-sm leading-6 text-secondary-foreground">{feature}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 border-t border-border pt-10">
          <h2 className="text-2xl font-medium tracking-[-0.02em] text-foreground">
            Interested in this project
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-secondary-foreground">
            Explore the live application or read the source code to see how it was built
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={project.live || project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-[#0b6b5b]"
            >
              {project.live ? <ExternalLink size={16} strokeWidth={1.5} /> : <Github size={16} strokeWidth={1.5} />}
              {project.live ? "View live project" : "View source"}
            </Link>
            {project.live && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-secondary"
              >
                <Github size={16} strokeWidth={1.5} />
                View on GitHub
                <ArrowUpRight size={16} strokeWidth={1.5} className="text-muted-foreground" />
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectDetails;
