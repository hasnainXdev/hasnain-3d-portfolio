"use client";

import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

const stages = [
  { step: "01", title: "Commit", detail: "Typed, tested, versioned", meta: "main · a91f", done: true },
  { step: "02", title: "Evaluate", detail: "Checks on every change", meta: "42 checks passed", done: true },
  { step: "03", title: "Deploy", detail: "Shipped behind the scenes", meta: "v1.4 · live", done: true },
  { step: "04", title: "Monitor", detail: "Health tracked after release", meta: "health steady", done: false },
];

const Hero = () => {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-[1440px] items-center gap-12 px-6 pb-16 pt-28 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-40">
        <div>
          <p className="font-mono text-xs text-muted-foreground">Full-stack AI developer</p>

          <p className="mt-6 flex items-center gap-2 font-mono text-xs text-secondary-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-chart-1" aria-hidden="true" />
            Open for new projects
          </p>

          <h1 className="mt-6 max-w-xl text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-[56px]">
            I build AI systems that survive production
          </h1>

          <p className="mt-6 max-w-md text-base leading-6 text-secondary-foreground">
            Full-stack work in FastAPI, RAG pipelines and Next.js, quietly built for early-stage founders before launch
          </p>

          <p className="mt-6 font-mono text-xs text-muted-foreground">
            24h response · Fixed price · Remote friendly · Documented code
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="https://cal.com/hasnaintaken"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-[#0b6b5b]"
            >
              <Calendar size={16} strokeWidth={1.5} />
              Book a free 30-min call
            </Link>
            <button
              type="button"
              onClick={() => scrollTo("#projects")}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-secondary"
            >
              See projects
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_8px_24px_rgba(31,27,22,0.06)]">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-xs text-muted-foreground">Build to production</p>
            <p className="font-mono text-xs text-muted-foreground">4 stages</p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stages.map((stage) => (
              <div key={stage.step} className={`border-t-2 pt-4 ${stage.done ? "border-chart-1" : "border-border"}`}>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs text-muted-foreground">{stage.step}</p>
                  {!stage.done && <span className="h-2 w-2 rounded-full bg-chart-1" aria-hidden="true" />}
                </div>
                <h3 className="mt-3 text-sm font-medium text-foreground">{stage.title}</h3>
                <p className="mt-1 text-xs leading-5 text-secondary-foreground">{stage.detail}</p>
                <p className="mt-3 font-mono text-xs tabular-nums text-muted-foreground">{stage.meta}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-4">
            <p className="text-xs text-secondary-foreground">Quiet while in build</p>
            <p className="font-mono text-xs text-muted-foreground">build 7f3a1c9</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
