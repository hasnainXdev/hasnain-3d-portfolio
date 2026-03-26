"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleClick = (href: string) => {
        setMobileOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg" : "bg-transparent"
                }`}
        >
            <div className="container mx-auto flex items-center justify-between h-16 px-6">
                <Link href="/" className="text-xl font-bold tracking-tight font-sans text-center mb-0 text-white">
                    Hasnain<span className="text-gradient"> .</span>
                </Link>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((l) => (
                        <button
                            key={l.href}
                            onClick={() => handleClick(l.href)}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                            {l.label}
                        </button>
                    ))}
                    <button
                        onClick={() => handleClick("#contact")}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                        Hire Me
                    </button>
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-foreground cursor-pointer"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden glass border-t border-border/50 px-6 py-4 space-y-3">
                    {navLinks.map((l) => (
                        <button
                            key={l.href}
                            onClick={() => handleClick(l.href)}
                            className="block w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                            {l.label}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;