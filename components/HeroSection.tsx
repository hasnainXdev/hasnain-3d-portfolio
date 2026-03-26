import { ArrowDown, MessageSquare } from "lucide-react";

const Hero = () => {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow pointer-events-none" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center pt-24 pb-16">
        {/* Left */}
        <div className="space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary text-xs text-muted-foreground font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for work
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
            Building Web & AI{" "}
            <span className="text-gradient">Products that Ship</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Full-Stack AI Developer specializing in Python, FastAPI, RAG
            pipelines, and React/Next.js. From concept to deployment.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => scrollTo("#projects")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors cursor-pointer"
            >
              View My Work
              <ArrowDown size={16} />
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-colors cursor-pointer"
            >
              <MessageSquare size={16} />
              Let's Talk
            </button>
          </div>
        </div>

        {/* Right — terminal illustration */}
        <div className="hidden md:block animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="rounded-xl border border-border bg-card p-6 shadow-xl font-mono text-sm leading-relaxed">
            <div className="flex gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="space-y-1 text-muted-foreground">
              <p>
                <span className="text-primary">const</span>{" "}
                <span className="text-foreground">developer</span> = {"{"}
              </p>
              <p className="pl-4">
                name: <span className="text-green-400">"Hasnain"</span>,
              </p>
              <p className="pl-4">
                stack: <span className="text-green-400">["Python", "FastAPI", "RAG", "React"]</span>,
              </p>
              <p className="pl-4">
                passion: <span className="text-green-400">"Building products"</span>,
              </p>
              <p className="pl-4">
                status: <span className="text-green-400">"Ready to ship 🚀"</span>,
              </p>
              <p>{"}"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;