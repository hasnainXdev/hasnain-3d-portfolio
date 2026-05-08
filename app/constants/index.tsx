export const projectsData = {
    // 'pinggenius-backend': {
    //     id: 'pinggenius-backend',
    //     title: "PingGenius Backend",
    //     tagline: "AI-Assisted LinkedIn Outreach Engine",
    //     description: "Production-ready FastAPI backend for hyper-personalized, guarded LinkedIn DMs.",
    //     fullDescription: "PingGenius is a robust, production-ready FastAPI backend tailored for automated yet carefully guarded LinkedIn outreach. It transforms raw profile data into context-aware connection notes, direct messages, and custom follow-up sequences. The system enforces strict deterministic output controls, rate-limiting, idempotency keys, and GDPR-compliant data processing, all governed by a mandatory human-in-the-loop flow to guarantee no message is dispatched without manual review.",
    //     tech: ["FastAPI", "Python", "Pydantic", "OpenAI API", "Redis", "PostgreSQL"],
    //     image: "/pinggenius-backend.png",
    //     mockups: ["/pinggenius-backend.png", "/pinggenius-backend.png", "/pinggenius-backend.png"],
    //     link: "https://github.com/hasnainxdev/pinggenius_backend",
    //     github: "https://github.com/hasnainxdev/pinggenius_backend",
    //     features: [
    //         "AI-powered generation of connection notes, DMs, and follow-ups",
    //         "Strict hallucination guards with deterministic output handling",
    //         "Idempotency keys, API timeouts, and robust rate limiting",
    //         "GDPR-minded processing of sensitive profile details",
    //         "Human-in-the-loop approval workflow to prevent accidental auto-sending"
    //     ],
    //     color: "#2563EB"
    // },
    'saasjet': {
        id: 'saasjet',
        title: "SaaSJet Boilerplate",
        tagline: "Lean SaaS Starter Kit for Solo Founders",
        description: "An unopinionated open-source boilerplate to launch fast without enterprise bloat.",
        fullDescription: "SaaSJet is a minimalist, open-source SaaS starter kit designed specifically for solo developers and indie hackers. It provides a complete, modern baseline for web applications without forcing unnecessary abstractions. Features include standard authentication, Prisma ORM with PostgreSQL, a sleek user dashboard, built-in Stripe subscriptions/billing workflows, and a streamlined API structure.",
        tech: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS", "NextAuth"],
        image: "/saasjet.png",
        mockups: ["/saasjet.png", "/saasjet.png", "/saasjet.png"],
        link: "https://github.com/hasnainxdev/saasjet",
        github: "https://github.com/hasnainxdev/saasjet",
        features: [
            "Lightweight foundation with minimal enterprise complexity",
            "Ready-to-use authentication and secure user routing",
            "Pre-configured Prisma ORM mapped to PostgreSQL schemas",
            "Seamless Stripe subscription plans and customer portal billing",
            "Clean dashboard UI without upsells or paywalled features"
        ],
        color: "#EC4899"
    },
    'todo-spec-driven': {
        id: 'todo-spec-driven',
        title: "Spec-Driven Todo Evolution",
        tagline: "Multi-Phase Cloud-Native Roadmap",
        description: "A progressive todo application evolving across five architectural phases.",
        fullDescription: "This project serves as an evolutionary architectural blueprint, demonstrating a todo application growing across five distinct development phases: an in-memory Python console app, a modern full-stack web application with Next.js/FastAPI/SQLModel/Neon, an AI-powered todo chatbot leveraging OpenAI agents, a local Kubernetes container deployment, and a cloud-native event-driven system leveraging Kafka, Dapr, and DigitalOcean Kubernetes.",
        tech: ["Next.js", "FastAPI", "SQLModel", "OpenAI SDK", "Kafka", "Dapr", "Kubernetes", "Neon"],
        image: "/todo-spec-driven.png",
        mockups: ["/todo-spec-driven.png", "/todo-spec-driven.png", "/todo-spec-driven.png"],
        link: "https://github.com/hasnainxdev/Hackathon-II-Todo-Spec-Driven",
        github: "https://github.com/hasnainxdev/Hackathon-II-Todo-Spec-Driven",
        features: [
            "Phase-based evolution from a simple CLI app to a microservices architecture",
            "Full-stack implementation using Next.js, FastAPI, SQLModel, and Neon Serverless Postgres",
            "Intelligent Todo AI Agent integrating advanced OpenAI tool-calling capabilities",
            "Local containerization and deployment orchestration with Kubernetes",
            "Advanced event-driven orchestration layer utilizing Kafka and Dapr"
        ],
        color: "#F59E0B"
    },
    'comforty': {
        id: 'comforty',
        title: "Comforty - Furniture Marketplace",
        tagline: "Elegant E-Commerce & CMS Platform",
        description: "A specialized furniture e-commerce platform and schema-driven CMS implementation.",
        fullDescription: "Comforty is a furniture-focused e-commerce marketplace highlighting custom-architected database schemas and Sanity CMS integration. The project showcases robust schema modeling for users, shipping zones, categories, discount coupons, and item catalogs, supported by backend endpoints for product details, authentication, and order handling.",
        tech: ["Next.js", "Tailwind CSS", "Sanity.io", "Stripe", "NextAuth", "TypeScript"],
        image: "/furniture-store.png",
        mockups: ["/furniture-store.png", "/furniture-store.png", "/furniture-store.png"],
        link: "https://uiux-hackathon-2024.vercel.app",
        github: "https://github.com/hasnainxdev/Comforty",
        features: [
            "Custom database schemas designed for products, categories, coupons, and orders",
            "Seamless headless content management using Sanity CMS",
            "Structured API routes for fast product catalog delivery and checkout processing",
            "Fully functional dynamic shopping cart with modern UI elements",
            "Extensible scaffolding for payment gateway and shipping integrations"
        ],
        color: "#7738E0"
    },
    'shoprr': {
        id: 'shoprr',
        title: "Shoprr Storefront",
        tagline: "Modern High-Performance Shopping Experience",
        description: "A sleek, consumer-oriented storefront powered by Clerk, Stripe, and Sanity.",
        fullDescription: "Shoprr is a modern e-commerce storefront designed for fast page loads and high conversions. Built with a modern tech stack containing Next.js, React, and Tailwind CSS, it integrates Clerk for user authentication, Stripe for payment processing, Sanity for inventory content management, and MongoDB with Redux Toolkit for clean client state management.",
        tech: ["Next.js", "React", "Clerk", "Stripe", "Sanity.io", "MongoDB", "Redux Toolkit", "Zod"],
        image: "/shoprr.png",
        mockups: ["/shoprr.png", "/shoprr.png", "/shoprr.png"],
        link: "https://github.com/hasnainxdev/ecommerce-shop-build",
        github: "https://github.com/hasnainxdev/ecommerce-shop-build",
        features: [
            "Highly interactive UI built with React, Tailwind CSS, and shadcn/ui",
            "Seamless third-party identity management and social logins with Clerk",
            "Secure payment routing and checkout handling via Stripe",
            "Global client-side state management using Redux Toolkit",
            "Robust runtime API data validation using Zod schemas"
        ],
        color: "#10B981"
    }
};

export const projects = [
//   {
//     ...projectsData['pinggenius-backend'],
//     slug: 'pinggenius-backend'
//   },
  {
    ...projectsData['saasjet'],
    slug: 'saasjet'
  },
  {
    ...projectsData['todo-spec-driven'],
    slug: 'todo-spec-driven'
  },
  {
    ...projectsData['comforty'],
    slug: 'comforty'
  },
  {
    ...projectsData['shoprr'],
    slug: 'shoprr'
  }
];