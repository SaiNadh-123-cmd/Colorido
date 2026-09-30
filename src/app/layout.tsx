import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { User } from "lucide-react";

export const metadata: Metadata = {
  title: "Colorido 2K26 | Mega Culturals & Sports Fest",
  description: "Annual college festival of R.V.R. & J.C. College of Engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white selection:bg-neon-pink selection:text-white">
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black"></div>
        
        {/* Global Navbar */}
        <nav className="sticky top-0 z-50 glass-panel rounded-none border-t-0 border-l-0 border-r-0 border-b border-[var(--color-glass-border)] bg-black/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-tighter" style={{
              background: "linear-gradient(to right, #ff2a85, #00f0ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              COLORIDO 2K26
            </Link>
            
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link href="/events" className="text-gray-300 hover:text-white transition">Events</Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</Link>
              <Link href="/login" className="flex items-center gap-2 glass-button-blue px-4 py-2 rounded-full">
                <User size={16} /> Login
              </Link>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
