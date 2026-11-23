import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

const display = Anton({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Hasnain the Engineer - EXISTENCE.EXE",
  description: "A consciousness, reconstructed. An experimental particle portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plexSans.variable} ${plexMono.variable} ${display.variable}`}>
        <script
          dangerouslySetInnerHTML={{
            __html: 'if(location.pathname==="/")document.documentElement.classList.add("existence-boot");',
          }}
        />
        <Toaster />
        <Navbar />
        <TooltipProvider>{children}</TooltipProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
