"use client";
import { useFadeUp } from "@/hooks/useFadeUp";
import { Calendar, Mail, Github } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import Link from "next/link";

const channels = [
  {
    icon: Calendar,
    title: "Book a Free 30-Min Call",
    subtitle: "Best for discussing your project scope",
    cta: "Schedule Now →",
    href: "https://cal.com/hasnaintaken",
    primary: true,
  },
  {
    icon: SiWhatsapp,
    title: "WhatsApp Me",
    subtitle: "Best for quick questions",
    cta: "Open Chat →",
    href: "https://wa.me/923132225220", // replace with real number
  },
  {
    icon: Mail,
    title: "Send an Email",
    subtitle: "Best for formal project briefs",
    cta: "hasnain.codes0@gmail.com",
    href: "mailto:hasnain.codes0@gmail.com",
  },
  {
    icon: Github,
    title: "View GitHub",
    subtitle: "Check my code quality",
    cta: "github.com/hasnainxdev →",
    href: "https://github.com/hasnainxdev",
  },
];

const Contact = () => {
  const ref = useFadeUp();

  return (
    <section id="contact" className="py-24">
      <div ref={ref} className="container mx-auto px-6 fade-up">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium border border-primary/40 text-primary bg-primary/10 mb-4">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Let's <span className="text-gradient">Work Together</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Pick the channel that works best for you. I respond within 24 hours.
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
          {channels.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.title}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-xl border p-6 flex items-start gap-4 transition-all duration-300 group ${
                  c.primary
                    ? "bg-primary border-primary hover:bg-primary/90 col-span-full"
                    : "bg-card border-border hover:border-primary/60 hover:shadow-[0_0_20px_-8px_rgba(127,119,221,0.4)]"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  c.primary ? "bg-white/20" : "bg-primary/10"
                }`}>
                  <Icon size={20} className={c.primary ? "text-white" : "text-primary"} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${c.primary ? "text-white" : "text-foreground"}`}>
                    {c.title}
                  </p>
                  <p className={`text-xs mt-0.5 ${c.primary ? "text-white/70" : "text-muted-foreground"}`}>
                    {c.subtitle}
                  </p>
                  <p className={`text-xs mt-2 font-medium truncate ${c.primary ? "text-white" : "text-primary"}`}>
                    {c.cta}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
