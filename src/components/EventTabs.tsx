"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Palette, Music, Camera, Gamepad2 } from "lucide-react";

const sportsEvents = [
  { id: "s1", name: "Cricket", icon: Trophy, time: "10:00 AM", venue: "Main Grounds" },
  { id: "s2", name: "Volleyball", icon: Trophy, time: "11:30 AM", venue: "Indoor Stadium" },
  { id: "s3", name: "Badminton", icon: Trophy, time: "02:00 PM", venue: "Indoor Stadium" },
];

const culturalEvents = [
  { id: "c1", name: "Dance Off", icon: Music, time: "05:00 PM", venue: "Open Air Theatre" },
  { id: "c2", name: "Fashion Show", icon: Palette, time: "07:30 PM", venue: "Open Air Theatre" },
  { id: "c3", name: "Anime Video Creation", icon: Camera, time: "All Day", venue: "SJB Seminar Hall" },
];

export default function EventTabs() {
  const [activeTab, setActiveTab] = useState<"sports" | "culturals">("culturals");

  const events = activeTab === "sports" ? sportsEvents : culturalEvents;

  return (
    <section className="max-w-6xl mx-auto py-20 px-4">
      <div className="flex justify-center mb-12">
        <div className="glass-panel flex p-2 rounded-full overflow-hidden relative">
          <button
            onClick={() => setActiveTab("sports")}
            className={`relative z-10 px-8 py-3 rounded-full text-lg font-medium transition-colors ${
              activeTab === "sports" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            🏆 Sports Events
          </button>
          <button
            onClick={() => setActiveTab("culturals")}
            className={`relative z-10 px-8 py-3 rounded-full text-lg font-medium transition-colors ${
              activeTab === "culturals" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            🎨 Cultural Events
          </button>
          
          <motion.div
            layoutId="tab-indicator"
            className="absolute top-2 bottom-2 w-[calc(50%-0.5rem)] rounded-full glass-button-blue z-0"
            animate={{
              left: activeTab === "sports" ? "0.5rem" : "50%",
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            style={{
               backgroundColor: activeTab === "sports" ? "rgba(0, 240, 255, 0.2)" : "rgba(255, 42, 133, 0.2)",
               borderColor: activeTab === "sports" ? "var(--color-electric-blue)" : "var(--color-neon-pink)",
               boxShadow: activeTab === "sports" ? "0 0 10px rgba(0, 240, 255, 0.4)" : "0 0 10px rgba(255, 42, 133, 0.4)"
            }}
          />
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-panel p-6 hover:scale-105 transition-transform duration-300 group cursor-pointer"
            >
              <div className={`p-4 rounded-full w-fit mb-4 ${activeTab === 'sports' ? 'bg-[#00f0ff]/10 text-[#00f0ff]' : 'bg-[#ff2a85]/10 text-[#ff2a85]'}`}>
                <event.icon size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-2 group-hover:text-white text-gray-200 transition-colors">{event.name}</h3>
              <div className="space-y-1 text-sm text-gray-400">
                <p>🕒 {event.time}</p>
                <p>📍 {event.venue}</p>
              </div>
              <div className="mt-6">
                <button className={`w-full py-2 rounded-lg text-sm font-semibold uppercase tracking-wider ${activeTab === 'sports' ? 'glass-button-blue' : 'glass-button-pink'}`}>
                  Register
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
