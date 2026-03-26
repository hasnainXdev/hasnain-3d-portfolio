import { useFadeUp } from "@/hooks/useFadeUp";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "SaaSJet Nextjs Kit",
    description:
      "A lean, prod-ready open-source SaaS starter that lets you launch your idea in days, not weeks built with modern tools, minimal overhead, and real-world priorities in mind.",
    tags: ["Next", "Shadcn", "Node.js", "Stripe", "Prisma", "BetterAuth"],
    live: "https://github.com/hasnainXdev/saasjet",
    github: "#",
  },
  {
    title: "Comforty Farniture Store",
    description:
      "Comforty is a fully functional e-commerce marketplace targeting the furniture market. This platform specializes in selling sofas, tables, beds, and other furniture-related items, offering a seamless shopping experience to users.",
    tags: ["Next.js", "Stripe", "Sanity", "Tailwind", "MongoDB", "Webhooks"],
    live: "uiux-hackathon-2024.vercel.app",
    github: "#",
  },
  {
    title: "Coming Soon",
    description:
      "more projects are on the way! Stay tuned for updates as I continue to build and share exciting new projects in the near future.",
    tags: ["N/A"],
    live: "#",
    github: "#",
  },
];

const Projects = () => {
  const ref = useFadeUp();

  return (
    <section id="projects" className="py-24">
      <div ref={ref} className="container mx-auto px-6 fade-up">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-lg mx-auto mb-14">
          A selection of recent work from SaaS platforms to AI tools.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className="group relative rounded-xl border border-border bg-card overflow-hidden hover:border-primary/60 transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Gradient top accent */}
              <div className="h-1 w-full bg-gradient-to-r from-primary to-primary/50" />

              <div className="p-6 space-y-4">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-secondary text-xs text-muted-foreground hover:text-gray-300 transition-colors ease-in duration-100 cursor-pointer"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <Link
                    href={p.live}
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    <ExternalLink size={14} /> Learn More
                  </Link>
                  {/* <Link
                    href={p.github}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github size={14} /> Code
                  </Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;