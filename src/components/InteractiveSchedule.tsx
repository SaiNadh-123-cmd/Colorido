"use client";

import { motion } from "framer-motion";

const scheduleData = [
  { time: "09:00 AM", event: "Inauguration Ceremony", venue: "Main Auditorium", status: "Completed" },
  { time: "11:00 AM", event: "Cricket Semi-Finals", venue: "Main Grounds", status: "Happening Now" },
  { time: "02:00 PM", event: "Battle of Bands", venue: "Open Air Theatre", status: "Upcoming" },
  { time: "06:00 PM", event: "EDM Night", venue: "Main Grounds", status: "Upcoming" },
];

export default function InteractiveSchedule() {
  return (
    <section className="max-w-4xl mx-auto py-20 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{
            background: "linear-gradient(to right, #00f0ff, #ff2a85)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
        }}>Event Timeline</h2>
        <p className="text-gray-400">Track all events live as they happen.</p>
      </div>

      <div className="relative border-l-2 border-[var(--color-glass-border)] ml-6 md:ml-12">
        {scheduleData.map((item, index) => {
          const isLive = item.status === "Happening Now";
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="mb-12 relative pl-8 md:pl-12 group"
            >
              {/* Timeline dot */}
              <div 
                className={`absolute w-6 h-6 rounded-full -left-[13px] top-1 border-4 border-black transition-all duration-300 ${
                  isLive ? "bg-[var(--color-neon-pink)] shadow-[0_0_15px_var(--color-neon-pink)]" : "bg-gray-600 group-hover:bg-[var(--color-electric-blue)]"
                }`} 
              />

              <div className={`glass-panel p-6 transition-all duration-300 ${isLive ? 'border-[var(--color-neon-pink)] scale-[1.02]' : 'hover:border-[var(--color-electric-blue)]'}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{item.event}</h3>
                  <div className="flex items-center gap-3 mt-2 md:mt-0">
                    <span className="text-lg font-mono text-gray-300 bg-white/5 px-3 py-1 rounded-md">{item.time}</span>
                    <span className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold ${
                      item.status === 'Completed' ? 'bg-gray-500/20 text-gray-400' :
                      isLive ? 'bg-pink-500/20 text-pink-400 border border-pink-500/50 animate-pulse' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 flex items-center gap-2">
                  📍 {item.venue}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
