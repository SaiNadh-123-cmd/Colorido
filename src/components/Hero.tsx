"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAntigravityState } from "@/hooks/useAntigravityState";

export default function Hero() {
  const { totalRegistrations } = useAntigravityState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Immersive Particle/Glow Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-neon-pink)] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--color-electric-blue)] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

      {/* Floating 3D-like elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-24 h-24 rounded-2xl glass-panel border border-[var(--color-electric-blue)] opacity-50 hidden md:block"
      />
      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full glass-panel border border-[var(--color-neon-pink)] opacity-50 hidden md:block"
      />

      <div className="z-10 text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-7xl md:text-9xl font-black tracking-tighter"
          style={{
            background: "linear-gradient(to right, #ff2a85, #00f0ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 20px rgba(255, 42, 133, 0.3))",
          }}
        >
          COLORIDO
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-3xl text-gray-300 font-light tracking-wide uppercase"
        >
          A Mega Culturals & Sports Fest
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-panel inline-flex flex-col items-center p-6 mt-8"
        >
          <span className="text-sm uppercase tracking-widest text-gray-400 mb-2">Live Registrations</span>
          <div className="text-5xl font-bold font-mono text-[var(--color-electric-blue)] flex items-center gap-4">
            <span className="animate-pulse h-3 w-3 bg-green-500 rounded-full inline-block"></span>
            {mounted ? totalRegistrations.toLocaleString() : "..."}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
