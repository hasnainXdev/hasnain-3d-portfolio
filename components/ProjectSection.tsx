"use client";
import { useFadeUp } from "@/hooks/useFadeUp";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "SaaSJet - Next.js SaaS Starter",
    problem: "Founders waste 3–6 weeks on boilerplate (auth, billing, DB) before writing a single feature.",
    solution: "Production-ready Next.js kit with auth, Stripe billing, Prisma DB, and shadcn UI - clone and launch.",
    result: "Cuts SaaS setup from weeks to hours. Open-source and actively maintained.",
    tags: ["Next.js", "Stripe", "Prisma", "BetterAuth", "Shadcn"],
    live: "https://github.com/hasnainXdev/saasjet",
  },
  {
    title: "Comforty - E-Commerce Marketplace",
    problem: "Furniture brands needed a modern storefront with real checkout, CMS-managed inventory, and webhooks.",
    solution: "Full e-commerce platform with Stripe payments, Sanity CMS for products, and webhook-driven order sync.",
    result: "Fully functional marketplace with live checkout, dynamic product pages, and real-time inventory.",
    tags: ["Next.js", "Stripe", "Sanity", "Tailwind", "Webhooks"],
    live: "https://uiux-hackathon-2024.vercel.app",
  },
  {
    title: "More Coming Soon",
    problem: "AI-powered SaaS projects currently in development.",
    solution: "RAG pipelines, FastAPI backends, and full-stack AI products.",
    result: "Stay tuned - dropping soon.",
    tags: ["FastAPI", "RAG", "Next.js", "Python"],
    live: "#",
  },
];

const Projects = () => {
  const ref = useFadeUp();

  return (
    <section id="projects" className="py-24">
      <div ref={ref} className="container mx-auto px-6 fade-up">
        <div className="text-center mb-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium border border-primary/40 text-primary bg-primary/10 mb-4">
            Case Studies
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Real problems. Real solutions. Real results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {projects.map((p) => (
            <div
              key={p.title}
              className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/60 hover:shadow-[0_0_30px_-8px_rgba(127,119,221,0.4)] transition-all duration-300 flex flex-col"
            >
              <div className="h-1 w-full bg-gradient-to-r from-primary to-primary/30" />

              <div className="p-6 flex flex-col gap-4 flex-1">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {p.title}
                </h3>

                {/* Case study story */}
                <div className="space-y-2 text-xs leading-relaxed flex-1">
                  <div className="flex gap-2">
                    <span className="text-red-400 font-semibold shrink-0">Problem</span>
                    <span className="text-muted-foreground">{p.problem}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary font-semibold shrink-0">Solution</span>
                    <span className="text-muted-foreground">{p.solution}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-400 font-semibold shrink-0">Result</span>
                    <span className="text-muted-foreground">{p.result}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-secondary text-xs text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>

                {p.live !== "#" && (
                  <Link href={p.live} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    <ExternalLink size={14} /> View Project
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
