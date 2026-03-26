import { useFadeUp } from "@/hooks/useFadeUp";
import {
  Code2,
  Server,
  Brain,
  Database,
  Wrench,
} from "lucide-react";

const categories = [
  {
    icon: Code2,
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    icon: Server,
    title: "Backend",
    skills: ["Python", "FastAPI", "Node.js", "secure APIs"],
  },
  {
    icon: Brain,
    title: "AI / RAG",
    skills: ["LangChain", "AI Models APIs", "RAG Pipelines", "Vector DBs", "Prompt Engineering"],
  },
  {
    icon: Database,
    title: "Database",
    skills: ["Postgres", "MongoDB", "Supabase", "Pinecone"],
  },
  {
    icon: Wrench,
    title: "Tools",
    skills: ["Git", "AWS deployment", "Docker", "Vercel", "Ubuntu", "Postman"],
  },
];

const Skills = () => {
  const ref = useFadeUp();

  return (
    <section id="skills" className="py-24">
      <div ref={ref} className="container mx-auto px-6 fade-up">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">
          Skills & <span className="text-gradient">Expertise</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-lg mx-auto mb-14">
          Technologies I use daily to build fast, reliable products.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="group rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <cat.icon size={20} />
                </div>
                <h3 className="font-display font-semibold text-foreground">
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-md bg-secondary text-xs text-muted-foreground hover:text-gray-300 transition-colors ease-in duration-100 cursor-pointer"
                  >
                    {s}
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