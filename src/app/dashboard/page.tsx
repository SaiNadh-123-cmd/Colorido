"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, Calendar, MapPin, QrCode } from "lucide-react";

type Profile = { roll_no: string, full_name: string };
type Event = { id: string, name: string, event_time: string, venue: string, category: string };
type RegistrationData = { event_id: string, events: Event };

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadDashboard() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (profileData) setProfile(profileData);

      const { data: regData } = await supabase.from("registrations").select("event_id, events(*)").eq("profile_id", user.id);
      
      if (regData) {
        // Supabase foreign key join returns events as single object here
        const eventsList = regData.map((row: any) => row.events);
        setRegisteredEvents(eventsList);
      }
      setLoading(false);
    }
    loadDashboard();
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 mb-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden"
      >
        {/* Decorative background glow */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--color-electric-blue)] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

        <div className="flex items-center gap-6 z-10">
          <div className="hidden md:flex p-4 bg-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            <QrCode size={80} className="text-black" />
          </div>
          <div>
            <h2 className="text-sm text-gray-400 uppercase tracking-widest mb-1">Colorido 2K26 Digital Pass</h2>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {profile?.full_name}
            </h1>
            <div className="flex gap-4">
              <p className="text-white font-mono bg-white/10 px-3 py-1 rounded-md">{profile?.roll_no}</p>
              <p className="text-[var(--color-neon-pink)] font-mono text-sm flex items-center">
                ID: {profile?.roll_no.substring(0,4)}-{Math.random().toString(36).substring(2,6).toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-0 text-center z-10 glass-panel px-8 py-4 border-[var(--color-electric-blue)] bg-black/40">
          <div className="text-5xl font-black text-[var(--color-electric-blue)]">{registeredEvents.length}</div>
          <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">Events Registered</div>
        </div>
      </motion.div>

      <h2 className="text-2xl font-bold mb-6">Your Itinerary</h2>
      
      {registeredEvents.length === 0 ? (
        <div className="glass-panel p-12 text-center text-gray-400 border-dashed">
          You haven't registered for any events yet.
          <br/>
          <button onClick={() => router.push("/")} className="mt-4 glass-button-blue px-6 py-2 rounded-full text-white">Browse Events</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {registeredEvents.map((ev, index) => (
             <EventCard key={ev.id} event={ev} delay={index * 0.1} />
          ))}
        </div>
      )}
    </div>
  );
}

function EventCard({ event, delay }: { event: Event, delay: number }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(event.event_time).getTime() - new Date().getTime();
      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const m = Math.floor((difference / 1000 / 60) % 60);
        const s = Math.floor((difference / 1000) % 60);
        setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
      } else {
        setTimeLeft("Event Ended");
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [event.event_time]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`glass-panel p-6 ${event.category === 'Sports' ? 'border-t-[var(--color-electric-blue)]' : 'border-t-[var(--color-neon-pink)]'}`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">{event.name}</h3>
        <span className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold ${event.category === 'Sports' ? 'bg-blue-500/20 text-blue-400' : 'bg-pink-500/20 text-pink-400'}`}>
          {event.category}
        </span>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-gray-300">
          <Calendar size={18} className="text-gray-500" />
          {new Date(event.event_time).toLocaleDateString()} at {new Date(event.event_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <MapPin size={18} className="text-gray-500" />
          {event.venue}
        </div>
      </div>

      <div className="bg-black/40 rounded-lg p-4 flex items-center justify-between border border-white/5">
        <div className="flex items-center gap-2 text-gray-400">
          <Clock size={16} /> Starts In
        </div>
        <div className="font-mono text-lg font-bold text-white tracking-widest animate-pulse">
          {timeLeft}
        </div>
      </div>
    </motion.div>
  );
}
