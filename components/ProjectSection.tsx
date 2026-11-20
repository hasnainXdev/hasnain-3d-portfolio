"use client";

import { projects } from "@/app/constants";
import { useFadeUp } from "@/hooks/useFadeUp";
import Image from "next/image";
import Link from "next/link";

const ProjectSection = () => {
  const ref = useFadeUp();

  return (
    <section id="projects" className="border-t border-border py-20 lg:py-24">
      <div ref={ref} className="fade-up mx-auto max-w-[1440px] px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs text-muted-foreground">Selected work</p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.02em] text-foreground lg:text-4xl">
              Products I have shipped
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-secondary-foreground">
            Four projects, from a SaaS starter kit to a furniture marketplace
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-150 hover:border-foreground/20 ${
                index === 0 ? "lg:col-span-3" : ""
              }`}
            >
              <div
                className={`relative w-full overflow-hidden bg-secondary ${
                  index === 0 ? "aspect-[16/9] lg:aspect-[2.4/1]" : "aspect-video"
                }`}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} interface`}
                  fill
                  className="object-cover object-top"
                  sizes={index === 0 ? "(max-width: 1024px) 100vw, 80vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                />
              </div>

              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="text-base font-medium text-foreground">{project.title}</h3>
                <p className="text-xs text-muted-foreground">{project.tagline}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-3">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="rounded-md bg-secondary px-2 py-1 font-mono text-xs text-secondary-foreground">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="rounded-md bg-secondary px-2 py-1 font-mono text-xs tabular-nums text-secondary-foreground">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
