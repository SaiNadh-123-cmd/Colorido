"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Palette, Music, Camera, Gamepad2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function EventTabs() {
  const [activeTab, setActiveTab] = useState<"Cultural" | "Sports">("Cultural");
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function loadEvents() {
      // For now, load dummy data if Supabase isn't hooked up yet, but we try fetching first
      const { data } = await supabase.from("events").select("*").eq("category", activeTab);
      if (data && data.length > 0) {
        setEvents(data);
      } else {
        // Fallback local data if DB is empty
        if (activeTab === "Cultural") {
          setEvents([
            { id: "c-finearts", name: "Fine Arts", venue: "Main Hall", event_time: "2026-10-15T10:00:00Z" },
            { id: "c-music", name: "Music & Band", venue: "Open Air Theatre", event_time: "2026-10-15T14:00:00Z" }
          ]);
        } else {
          setEvents([
            { id: "s-b-basket", name: "Basketball (Boys)", venue: "Main Grounds", event_time: "2026-10-16T09:00:00Z" },
            { id: "s-g-throw", name: "Throwball (Girls)", venue: "Indoor Stadium", event_time: "2026-10-16T11:00:00Z" }
          ]);
        }
      }
    }
    loadEvents();
  }, [activeTab]);

  return (
    <section className="max-w-6xl mx-auto py-20 px-4">
      <div className="flex justify-center mb-12">
        <div className="glass-panel flex p-2 rounded-full overflow-hidden relative">
          <button
            onClick={() => setActiveTab("Cultural")}
            className={`relative z-10 px-8 py-3 rounded-full text-lg font-medium transition-colors ${
              activeTab === "Cultural" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            🎨 Cultural Events
          </button>
          <button
            onClick={() => setActiveTab("Sports")}
            className={`relative z-10 px-8 py-3 rounded-full text-lg font-medium transition-colors ${
              activeTab === "Sports" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            🏆 Sports Events
          </button>
          
          <motion.div
            layoutId="tab-indicator"
            className="absolute top-2 bottom-2 w-[calc(50%-0.5rem)] rounded-full glass-button-blue z-0"
            animate={{
              left: activeTab === "Cultural" ? "0.5rem" : "50%",
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            style={{
               backgroundColor: activeTab === "Sports" ? "rgba(0, 240, 255, 0.2)" : "rgba(255, 42, 133, 0.2)",
               borderColor: activeTab === "Sports" ? "var(--color-electric-blue)" : "var(--color-neon-pink)",
               boxShadow: activeTab === "Sports" ? "0 0 10px rgba(0, 240, 255, 0.4)" : "0 0 10px rgba(255, 42, 133, 0.4)"
            }}
          />
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[300px]">
        <AnimatePresence mode="wait">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-panel p-6 hover:scale-105 transition-transform duration-300 group flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-white text-gray-200 transition-colors">{event.name}</h3>
                <div className="space-y-1 text-sm text-gray-400">
                  <p>🕒 {new Date(event.event_time).toLocaleDateString()}</p>
                  <p>📍 {event.venue}</p>
                </div>
              </div>
              <div className="mt-6">
                <Link href={`/events/${event.id}`}>
                  <button className={`w-full py-3 rounded-lg text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${activeTab === 'Sports' ? 'glass-button-blue' : 'glass-button-pink'}`}>
                    View Details <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
