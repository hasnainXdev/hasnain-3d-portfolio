export const projectsData = {
    'trakwise': {
        id: 'trakwise',
        title: "Trakwise - Finance Made Easy",
        tagline: "Your Personal Finance Companion",
        description: "Full-stack application with Next.js",
        fullDescription: "Trakwise is a comprehensive finance management platform that helps users track expenses, manage budgets, and gain insights into their spending patterns. Built with modern technologies for optimal performance and user experience.",
        tech: ["Next.js", "MongoDB", "Tailwind CSS", "LemmonSqueezy", "Clerk"],
        image: "/trakwise-project.png",
        mockups: ["/trakwise-project.png", "/trakwise-project.png", "/trakwise-project.png"],
        link: "https://trakwise.vercel.app",
        github: "https://github.com/yourusername/trakwise",
        features: [
            "Real-time expense tracking",
            "Budget management and alerts",
            "Visual analytics and reports",
            "Secure authentication with Clerk",
            "Payment processing integration"
        ],
        color: "#10B981"
    },
    'furniture-store': {
        id: 'furniture-store',
        title: "Farniture E-Store + CMS",
        tagline: "Modern E-Commerce Excellence",
        description: "Modern e-store with payment processing and inventory management",
        fullDescription: "A fully-featured e-commerce platform with integrated CMS capabilities. Features include real-time inventory management, secure payment processing, and an intuitive admin dashboard for complete control.",
        tech: ["Next.js", "Tailwind CSS", "NextAuth", "Sanity.io", "Stripe"],
        image: "/furniture-store.png",
        mockups: ["/furniture-store.png", "/furniture-store.png", "/furniture-store.png"],
        link: "https://uiux-hackathon-2024.vercel.app",
        github: "https://github.com/yourusername/furniture-store",
        features: [
            "Complete CMS with Sanity.io",
            "Stripe payment integration",
            "Admin dashboard",
            "Product catalog management",
            "Order tracking system"
        ],
        color: "#7738E0"
    },
    'ai-assistant': {
        id: 'ai-assistant',
        title: "AI Assistant Agents - Chatbot",
        tagline: "Intelligent Conversation Platform",
        description: "Real-time chat application with AI-powered responses",
        fullDescription: "An advanced AI chatbot built with OpenAI's Agents SDK, providing intelligent, context-aware responses in real-time. Features natural language processing and seamless user interactions.",
        tech: ["Python", "OpenAI Agents SDK", "Streamlit"],
        image: "/personal-assistant.png",
        mockups: ["/personal-assistant.png", "/personal-assistant.png", "/personal-assistant.png"],
        link: "https://github.com/hasnainXdev/personal-aiagent",
        github: "https://github.com/hasnainXdev/personal-aiagent",
        features: [
            "AI-powered responses",
            "Real-time chat interface",
            "Context-aware conversations",
            "Multi-turn dialogue support",
            "Streamlit UI framework"
        ],
        color: "#3B82F6"
    }
};


export const projects = [
  {
    ...projectsData['trakwise'],
    slug: 'trakwise'
  },
  {
    ...projectsData['furniture-store'],
    slug: 'furniture-store'
  },
  {
    ...projectsData['ai-assistant'],
    slug: 'ai-assistant'
  }
];