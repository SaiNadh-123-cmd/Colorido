"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Music, CheckCircle2 } from "lucide-react";

export default function EventDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    async function loadEvent() {
      // In production, fetch from Supabase:
      const { data } = await supabase.from("events").select("*").eq("id", id).single();
      if (data) {
        setEvent(data);
      } else {
        // Fallback for demo if DB isn't seeded yet
        setEvent({
          id,
          name: id === "c-music" ? "Music & Band" : "Basketball",
          category: id?.toString().startsWith("c") ? "Cultural" : "Sports",
          description: "An electrifying event showing off the best talents.",
          rules: "Standard rules apply. 1. Be on time. 2. Respect the judges.",
          venue: "Main Grounds",
          event_time: "2026-10-15T14:00:00Z"
        });
      }
      setLoading(false);
    }
    loadEvent();
  }, [id]);

  const handleRegister = async () => {
    setRegistering(true);
    
    // Check if logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    // Play animation first
    setShowAnimation(true);
    
    // Insert into DB
    const { error } = await supabase.from("registrations").insert([
      { profile_id: user.id, event_id: event.id }
    ]);
    
    if (error && error.code !== '23505') { // Ignore duplicate registration error for smooth UX
      console.error(error);
    }

    // Wait for animation to finish then redirect
    setTimeout(() => {
      router.push("/dashboard");
    }, 2500);
  };

  if (loading || !event) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-24 px-4 flex flex-col items-center relative overflow-hidden">
      
      {/* Registration Success Animation Overlay */}
      <AnimatePresence>
        {showAnimation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 10, mass: 0.75, stiffness: 100 }}
              className="flex flex-col items-center"
            >
              <div className={`p-8 rounded-full ${event.category === 'Sports' ? 'bg-blue-500/20 text-blue-400 border border-blue-500' : 'bg-pink-500/20 text-pink-400 border border-pink-500'}`}>
                {event.category === 'Sports' ? <Trophy size={80} /> : <Music size={80} />}
              </div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl font-bold mt-6 text-white"
              >
                Registered Successfully!
              </motion.h2>
              <p className="text-gray-400 mt-2">Redirecting to dashboard...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-3xl glass-panel p-8 md:p-12 ${event.category === 'Sports' ? 'border-[var(--color-electric-blue)]' : 'border-[var(--color-neon-pink)]'}`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{event.name}</h1>
            <span className={`text-sm px-3 py-1 rounded-full uppercase tracking-wider font-bold ${event.category === 'Sports' ? 'bg-blue-500/20 text-blue-400' : 'bg-pink-500/20 text-pink-400'}`}>
              {event.category} Event
            </span>
          </div>
          <div className="mt-4 md:mt-0 text-right text-gray-300">
            <p>📅 {new Date(event.event_time).toLocaleDateString()}</p>
            <p>📍 {event.venue}</p>
          </div>
        </div>

        <div className="space-y-6 text-gray-300 leading-relaxed mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Description</h3>
            <p>{event.description}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Rules & Guidelines</h3>
            <p className="whitespace-pre-line">{event.rules}</p>
          </div>
        </div>

        <button 
          onClick={handleRegister}
          disabled={registering}
          className={`w-full py-4 rounded-xl text-lg font-bold tracking-widest uppercase transition-all ${event.category === 'Sports' ? 'glass-button-blue' : 'glass-button-pink'}`}
        >
          {registering ? "Processing..." : "Register Now"}
        </button>
      </motion.div>
    </div>
  );
}
