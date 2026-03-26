import { useFadeUp } from "@/hooks/useFadeUp";
import { Quote } from "lucide-react";

const testimonials = [
    {
        quote:
            "Hasnain delivered our MVP in record time. Clean code, great communication, and a product that our users love.",
        name: "Alex Chen",
        role: "Founder, StartupXYZ",
    },
    {
        quote:
            "One of the best developers I've worked with. Understood our requirements perfectly and shipped ahead of schedule.",
        name: "Sarah Mitchell",
        role: "CTO, DataFlow Inc.",
    },
    {
        quote:
            "Professional, reliable, and incredibly skilled. The AI integration he built transformed our workflow completely.",
        name: "James Park",
        role: "Product Lead, TechVentures",
    },
];

const Testimonials = () => {
    const ref = useFadeUp();

    return (
        <section id="testimonials" className="py-24">
            <div ref={ref} className="container mx-auto px-6 fade-up">
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">
                    Client <span className="text-gradient">Testimonials</span>
                </h2>
                <p className="text-muted-foreground text-center max-w-lg mx-auto mb-14">
                    What people say about working with me.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <div
                            key={t.name}
                            className="rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-all duration-300 flex flex-col"
                        >
                            <Quote size={24} className="text-primary/40 mb-4" />
                            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                                "{t.quote}"
                            </p>
                            <div className="mt-6 pt-4 border-t border-border">
                                <p className="font-display font-semibold text-foreground text-sm">
                                    {t.name}
                                </p>
                                <p className="text-xs text-muted-foreground">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;