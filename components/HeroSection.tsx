"use client";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full animate-pulse-glow pointer-events-none" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center pt-24 pb-16">
        {/* Left */}
        <div className="space-y-6 animate-fade-in-up">
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-xs text-primary font-medium">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Open for new projects
          </div>

          {/* Outcome-first headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
            I Build AI-Powered Micro SaaS{" "}
            <span className="text-gradient">That Generates Revenue</span>
          </h1>

          {/* Value prop */}
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Full-Stack AI Developer specializing in FastAPI, RAG pipelines, and Next.js.
            <br />
            <span className="text-sm">From concept to production - fast.</span>
          </p>

          {/* Trust signals row */}
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            {["✅ 24h response", "✅ Fixed price", "✅ Remote friendly", "✅ Clean, documented code"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="https://cal.com/hasnaintaken"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <Calendar size={16} />
              Book a Free 30-Min Call
            </Link>
            <button
              onClick={() => scrollTo("#projects")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-colors cursor-pointer"
            >
              See Case Studies
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Right - terminal */}
        <div className="hidden md:block animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="rounded-xl border border-border bg-card p-6 shadow-xl font-mono text-sm leading-relaxed">
            <div className="flex gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="space-y-1 text-muted-foreground">
              <p><span className="text-primary">const</span> <span className="text-foreground">hasnain</span> = {"{"}</p>
              <p className="pl-4">role: <span className="text-green-400">"Full-Stack AI Developer"</span>,</p>
              <p className="pl-4">stack: <span className="text-green-400">["FastAPI", "RAG", "Next.js", "Python"]</span>,</p>
              <p className="pl-4">focus: <span className="text-green-400">"AI-powered SaaS products"</span>,</p>
              <p className="pl-4">delivery: <span className="text-green-400">"concept to production"</span>,</p>
              <p className="pl-4">status: <span className="text-yellow-400">"available"</span>,</p>
              <p>{"}"}</p>
              <p className="mt-3 text-primary/80">▋</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
