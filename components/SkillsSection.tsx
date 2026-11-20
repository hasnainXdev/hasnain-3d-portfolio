import { useFadeUp } from "@/hooks/useFadeUp";
import { Brain, Code2, Database, Server, Wrench } from "lucide-react";

const categories = [
  { icon: Code2, title: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { icon: Server, title: "Backend", skills: ["Python", "FastAPI", "Node.js", "Secure APIs"] },
  { icon: Brain, title: "AI and RAG", skills: ["LangChain", "LLM APIs", "RAG pipelines", "Vector databases", "Prompt design"] },
  { icon: Database, title: "Database", skills: ["Postgres", "MongoDB", "Supabase", "Pinecone"] },
  { icon: Wrench, title: "Tools", skills: ["Git", "AWS", "Docker", "Vercel", "Ubuntu", "Postman"] },
];

const Skills = () => {
  const ref = useFadeUp();

  return (
    <section id="skills" className="border-t border-border py-20 lg:py-24">
      <div ref={ref} className="fade-up mx-auto max-w-[1440px] px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs text-muted-foreground">Skills</p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.02em] text-foreground lg:text-4xl">
              The stack I work in
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-secondary-foreground">
            The tools I reach for when taking a product from idea to deployment
          </p>
        </header>

        <div className="divide-y divide-border rounded-2xl border border-border bg-card px-6">
          {categories.map((category) => (
            <div
              key={category.title}
              className="grid gap-3 py-4 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-center sm:gap-6"
            >
              <div className="flex items-center gap-3">
                <category.icon size={18} strokeWidth={1.5} className="shrink-0 text-muted-foreground" />
                <h3 className="text-sm font-medium text-foreground">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="rounded-md bg-secondary px-2 py-1 font-mono text-xs text-secondary-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
