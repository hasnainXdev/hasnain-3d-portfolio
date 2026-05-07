"use client";
import { useFadeUp } from "@/hooks/useFadeUp";
import Link from "next/link";

const services = [
  {
    icon: "🤖",
    title: "AI / RAG Backends",
    description: "Custom AI pipelines, vector search, and LLM integrations built with FastAPI. Production-ready and scalable.",
    price: "From $3K",
    timeline: "1–2 weeks",
  },
  {
    icon: "⚡",
    title: "Micro SaaS",
    description: "End-to-end Micro SaaS with auth, billing, dashboard, and DB - everything you need to launch and charge customers.",
    price: "From $4.5K",
    timeline: "2–4 weeks",
  },
  {
    icon: "🚀",
    title: "Production Deployment",
    description: "CI/CD pipelines, Docker, Vercel/Railway/Render/Netlify/Koyeb/VPS or AWS - your app live, monitored, and ready to scale.",
    price: "From $1.5K",
    timeline: "3–5 days",
  },
];

const ServicesSection = () => {
  const ref = useFadeUp();

  return (
    <section id="services" className="py-24">
      <div ref={ref} className="container mx-auto px-6 fade-up">
        <div className="text-center mb-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium border border-primary/40 text-primary bg-primary/10 mb-4">
            What I Offer
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Services & <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Three focused services for early-stage startups. Fixed scope, fixed price, fast delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-xl border border-border bg-card p-6 hover:border-primary/60 hover:shadow-[0_0_30px_-8px_rgba(127,119,221,0.4)] transition-all duration-300 flex flex-col gap-4"
            >
              <div className="text-3xl">{s.icon}</div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                <span className="text-primary font-bold text-sm">{s.price}</span>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                  ⏱ {s.timeline}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Not sure which fits? <Link href="#contact" className="text-primary hover:underline">Book a free 30-min call</Link> and we'll figure it out together.
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;
