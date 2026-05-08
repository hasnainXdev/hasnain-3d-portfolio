"use client";
import { projects } from "@/app/constants";
import { useFadeUp } from "@/hooks/useFadeUp";
import Image from "next/image";
import Link from "next/link";

const ProjectSection = () => {
  const ref = useFadeUp();

  return (
    <section id="projects" className="py-24">
      <div ref={ref} className="container mx-auto px-6 fade-up">
        <div className="text-center mb-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium border border-primary/40 text-primary bg-primary/10 mb-4">
            Projects
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Real problems. Real solutions. Real results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/60 hover:shadow-[0_0_30px_-8px_rgba(127,119,221,0.4)] transition-all duration-300 flex flex-col"
            >
              {/* Project Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="font-display text-base font-semibold text-foreground leading-snug">
                  {project.title}
                </h3>

                {/* Main tech stack — first 3 tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-secondary text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-0.5 rounded-md bg-secondary text-xs text-muted-foreground">
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
