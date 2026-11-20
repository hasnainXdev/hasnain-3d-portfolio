"use client";

import { useFadeUp } from "@/hooks/useFadeUp";
import { BrainCircuit, CloudUpload, Layers3 } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: BrainCircuit,
    title: "AI and RAG backends",
    description: "Custom AI pipelines, vector search and LLM integrations built with FastAPI. Production-ready and scalable.",
    price: "$3,000",
    timeline: "1–2 weeks",
  },
  {
    icon: Layers3,
    title: "Micro SaaS",
    description: "End-to-end Micro SaaS with auth, billing, dashboard and a database, ready to launch and charge customers.",
    price: "$4,500",
    timeline: "2–4 weeks",
  },
  {
    icon: CloudUpload,
    title: "Production deployment",
    description: "CI/CD, Docker and deployment to Vercel, Railway, Render, Netlify, Koyeb, VPS or AWS, with monitoring in place.",
    price: "$1,500",
    timeline: "3–5 days",
  },
];

const ServicesSection = () => {
  const ref = useFadeUp();

  return (
    <section id="services" className="border-t border-border py-20 lg:py-24">
      <div ref={ref} className="fade-up mx-auto max-w-[1440px] px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs text-muted-foreground">Services</p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.02em] text-foreground lg:text-4xl">
              Fixed scope, fixed price
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-secondary-foreground">
            Three focused services for early-stage startups, priced before the work starts
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <service.icon size={18} strokeWidth={1.5} className="text-muted-foreground" />
              <h3 className="mt-6 text-base font-medium text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-secondary-foreground">{service.description}</p>
              <div className="mt-auto flex items-baseline justify-between gap-4 border-t border-border pt-4">
                <p className="font-mono text-sm tabular-nums text-foreground">
                  <span className="text-muted-foreground">from </span>
                  {service.price}
                </p>
                <p className="font-mono text-xs tabular-nums text-muted-foreground">{service.timeline}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-secondary-foreground">
          Not sure which fits?{" "}
          <Link href="#contact" className="text-foreground underline decoration-border underline-offset-4 transition-colors duration-150 hover:decoration-primary">
            Book a free 30-min call
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;
