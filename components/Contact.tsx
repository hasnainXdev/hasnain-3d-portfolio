import { useFadeUp } from "@/hooks/useFadeUp";
import { Mail, Globe, Zap, Linkedin } from "lucide-react";
import { SiGithub, SiX, SiInstagram } from "react-icons/si";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

const socials = [
  { icon: SiGithub, href: "https://github.com/hasnainxdev", label: "GitHub", bg: "#000", iconColor: "#ffffff" },
  { icon: Linkedin, href: "https://linkedin.com/in/hasnainxdev", label: "LinkedIn", bg: "#0A66C2", iconColor: "#ffffff" },
  { icon: SiX, href: "https://x.com/hasnainxdev", label: "X (Twitter)", bg: "#000000", iconColor: "#ffffff" },
  { icon: SiInstagram, href: "https://www.instagram.com/hasnainxdominate", label: "Instagram", bg: "#d62976", iconColor: "#ffffff" },
];

const Contact = () => {
  const ref = useFadeUp();

  return (
    <section id="contact" className="py-24">
      <div ref={ref} className="container mx-auto px-6 fade-up">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">
          Let's <span className="text-gradient">Work Together</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-lg mx-auto mb-14">
          Have a project in mind? Drop me an email I respond fast.
        </p>

        <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
          {/* Email card */}
          <Link
            href="mailto:hasnaindev@example.com"
            className="col-span-full rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-all duration-300 flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
              <Mail size={22} />
            </div>
            <div>
              <p className="font-display font-semibold text-foreground">
                codewithhasnainbro@gmail.com
              </p>
              <p className="text-xs text-muted-foreground">
                Click to send an email
              </p>
            </div>
          </Link>

          {/* Badges */}
          <div className="rounded-xl border border-border bg-card p-5 flex items-center gap-3">
            <Globe size={18} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Available Worldwide
              </p>
              <p className="text-xs text-muted-foreground">Remote friendly</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 flex items-center gap-3">
            <Zap size={18} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Fast Response
              </p>
              <p className="text-xs text-muted-foreground">
                Usually within 24h
              </p>
            </div>
          </div>
        </div>

        {/* Social links */}
        <TooltipProvider>
          <div className="flex justify-center gap-4 mt-8">
            {socials.map((s) => (
              <Tooltip key={s.label}>
                <TooltipTrigger asChild>
                  <Link
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-lg flex items-center justify-center hover:opacity-80 transition-all"
                    style={{ backgroundColor: s.bg }}
                  >
                    <s.icon size={18} style={{ color: s.iconColor }} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{s.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default Contact;