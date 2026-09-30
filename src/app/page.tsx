"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import EventTabs from "@/components/EventTabs";
import InteractiveSchedule from "@/components/InteractiveSchedule";
import RegistrationModal from "@/components/RegistrationModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen">
      {/* Floating CTA Button */}
      <div className="fixed top-6 right-6 z-40">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="glass-button-pink px-6 py-3 rounded-full font-bold text-white tracking-widest text-sm uppercase shadow-lg hover:scale-105 transition-transform"
        >
          Register Now
        </button>
      </div>

      <Hero />
      
      <div className="relative z-10 bg-black/40 backdrop-blur-3xl border-t border-[var(--color-glass-border)]">
        <EventTabs />
        <InteractiveSchedule />
      </div>

      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <footer className="text-center py-8 text-gray-500 border-t border-[var(--color-glass-border)] bg-black/60 backdrop-blur-xl">
        <p>© 2026 Colorido. R.V.R. & J.C. College of Engineering.</p>
      </footer>
    </main>
  );
}
