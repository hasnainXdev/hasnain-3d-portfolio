import type { Metadata } from "next";
import { Caveat, Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const caveat = Caveat({ subsets: ["latin"], weight: ["700"], variable: "--font-handwriting" });

export const metadata: Metadata = {
  title: "Hasnain's Portfolio - Full Stack Developer",
  description: "Explore Hasnain's portfolio showcasing expertise in full stack development, Agentic AI, and innovative web solutions. Discover projects, skills, and contact information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${caveat.variable} antialiased`}>
        <Toaster />
        <Navbar />
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

