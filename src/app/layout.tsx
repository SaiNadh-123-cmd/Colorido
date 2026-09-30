import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Colorido | Mega Culturals & Sports Fest",
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
        {children}
      </body>
    </html>
  );
}
