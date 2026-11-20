"use client";

import { useFadeUp } from "@/hooks/useFadeUp";
import { ArrowUpRight, Calendar, Github, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

const primary = {
  icon: Calendar,
  title: "Book a free 30-min call",
  detail: "For project scope and a plan",
  meta: "cal.com/hasnaintaken",
  href: "https://cal.com/hasnaintaken",
};

const channels = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    detail: "For quick questions",
    meta: "Open chat",
    href: "https://wa.me/923132225220",
  },
  {
    icon: Mail,
    title: "Email",
    detail: "For formal project briefs",
    meta: "hasnain.codes0@gmail.com",
    href: "mailto:hasnain.codes0@gmail.com",
  },
  {
    icon: Github,
    title: "GitHub",
    detail: "Code and open-source work",
    meta: "github.com/hasnainxdev",
    href: "https://github.com/hasnainxdev",
  },
];

const Contact = () => {
  const ref = useFadeUp();

  return (
    <section id="contact" className="border-t border-border py-20 lg:py-24">
      <div ref={ref} className="fade-up mx-auto max-w-[1440px] px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs text-muted-foreground">Contact</p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.02em] text-foreground lg:text-4xl">
              Tell me about the product
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-secondary-foreground">
            Pick the channel that works best. I reply within 24 hours
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-2">
          <Link
            href={primary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-primary p-6 transition-colors duration-150 hover:bg-[#0b6b5b]"
          >
            <primary.icon size={18} strokeWidth={1.5} className="text-primary-foreground" />
            <h3 className="mt-8 text-xl font-medium text-primary-foreground">{primary.title}</h3>
            <p className="mt-2 text-sm text-primary-foreground">{primary.detail}</p>
            <p className="mt-6 font-mono text-xs text-primary-foreground">{primary.meta}</p>
          </Link>

          <div className="divide-y divide-border rounded-2xl border border-border bg-card px-6">
            {channels.map((channel) => (
              <Link
                key={channel.title}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-4"
              >
                <channel.icon size={18} strokeWidth={1.5} className="shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-foreground">{channel.title}</h3>
                  <p className="mt-1 truncate font-mono text-xs text-muted-foreground">{channel.meta}</p>
                </div>
                <span className="hidden text-xs text-secondary-foreground sm:block">{channel.detail}</span>
                <ArrowUpRight size={16} strokeWidth={1.5} className="shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
