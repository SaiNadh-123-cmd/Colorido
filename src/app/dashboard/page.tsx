"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, MapPin, QrCode, User, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

type Profile = { roll_no: string, full_name: string };
type Event = { id: string, name: string, event_time: string, venue: string, category: string };

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Helper to extract branch and year from Roll No (e.g., Y20CS123)
  const getStudentDetails = (rollNo: string) => {
    const yearCode = rollNo.substring(1, 3);
    const branchCode = rollNo.substring(3, 5).toUpperCase();
    const branchMap: Record<string, string> = {
      'CS': 'Computer Science Engineering',
      'IT': 'Information Technology',
      'EC': 'Electronics & Communication',
      'EE': 'Electrical Engineering',
      'ME': 'Mechanical Engineering',
      'CE': 'Civil Engineering'
    };
    return {
      batch: `20${yearCode}`,
      branch: branchMap[branchCode] || 'B.Tech Engineering'
    };
  };

  useEffect(() => {
    async function loadDashboard() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      // 1. Fetch Profile
      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (profileData) setProfile(profileData);

      // 2. Fetch Registrations Safely
      const { data: regData, error: regError } = await supabase
        .from("registrations")
        .select(`event_id, events(*)`)
        .eq("profile_id", user.id);

      if (regError) {
        console.error("Error fetching registrations:", regError);
      }
      
      if (regData && regData.length > 0) {
        // Handle cases where the foreign key join might not have returned the object cleanly
        const validEvents = regData
          .map((row: any) => row.events)
          .filter((ev: any) => ev !== null && ev !== undefined);
        
        setRegisteredEvents(validEvents);
      }
      setLoading(false);
    }
    loadDashboard();
  }, [router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-[var(--color-electric-blue)] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const studentInfo = profile ? getStudentDetails(profile.roll_no) : { batch: 'N/A', branch: 'N/A' };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-[80vh] relative z-10">
      {/* 3D Dashboard Header Area */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-panel p-1 mb-16 rounded-3xl overflow-hidden relative shadow-[0_0_50px_rgba(0,240,255,0.1)]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-pink-900/40 opacity-50 blur-3xl"></div>
        
        <div className="relative bg-black/60 backdrop-blur-2xl rounded-[23px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
          
          {/* Identity Card Section */}
          <div className="flex-1 flex flex-col md:flex-row items-center gap-8 w-full">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(255,42,133,0.15)] relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-electric-blue)] to-[var(--color-neon-pink)] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <QrCode size={120} className="text-white relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
            
            <div className="text-center md:text-left space-y-4 flex-1">
              <div>
                <h2 className="text-sm text-[var(--color-electric-blue)] uppercase tracking-[0.3em] font-bold mb-2">Colorido 2K26 Digital Pass</h2>
                <h1 className="text-4xl md:text-5xl font-black mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-400">
                  {profile?.full_name}
                </h1>
                <p className="text-xl text-gray-400 font-mono tracking-widest">{profile?.roll_no}</p>
              </div>

              {/* Student Details Grid */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex items-center gap-3">
                  <BookOpen size={18} className="text-[var(--color-neon-pink)]" />
                  <div className="text-sm">
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Branch</p>
                    <p className="font-semibold text-gray-200">{studentInfo.branch}</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex items-center gap-3">
                  <GraduationCap size={18} className="text-[var(--color-electric-blue)]" />
                  <div className="text-sm">
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Batch</p>
                    <p className="font-semibold text-gray-200">{studentInfo.batch}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="w-full md:w-auto flex flex-col items-center justify-center p-8 glass-panel border-[var(--color-glass-border)] rounded-2xl bg-gradient-to-b from-white/5 to-transparent">
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-blue-600 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              {registeredEvents.length}
            </div>
            <div className="text-sm uppercase tracking-[0.2em] text-gray-400 mt-3 font-semibold text-center">Events<br/>Registered</div>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
        <h2 className="text-3xl font-bold tracking-tight">Your Event Itinerary</h2>
        <Link href="/events" className="text-sm font-bold uppercase tracking-wider text-[var(--color-electric-blue)] hover:text-white transition flex items-center gap-2">
          Browse More <ArrowRight size={16} />
        </Link>
      </div>
      
      {registeredEvents.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="glass-panel p-16 text-center border-dashed border-white/20 bg-white/5"
        >
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar size={32} className="text-gray-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No Registrations Yet</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">Your itinerary is currently empty. Explore the cultural and sports events to secure your spot!</p>
          <Link href="/events" className="glass-button-blue px-8 py-4 rounded-full text-white font-bold tracking-widest uppercase">
            Explore Events
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {registeredEvents.map((ev, index) => (
               <EventCard key={ev.id} event={ev} delay={index * 0.15} />
            ))}
          </AnimatePresence>
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
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className={`relative glass-panel overflow-hidden group ${event.category === 'Sports' ? 'hover:border-[var(--color-electric-blue)]' : 'hover:border-[var(--color-neon-pink)]'}`}
    >
      {/* Dynamic Background Glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] opacity-20 pointer-events-none transition-opacity group-hover:opacity-40 ${event.category === 'Sports' ? 'bg-[var(--color-electric-blue)]' : 'bg-[var(--color-neon-pink)]'}`}></div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
            {event.name}
          </h3>
          <span className={`text-xs px-4 py-1.5 rounded-full uppercase tracking-widest font-bold shadow-lg ${event.category === 'Sports' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-pink-500/20 text-pink-400 border border-pink-500/30'}`}>
            {event.category}
          </span>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5">
            <div className="bg-black/50 p-2 rounded-md"><Calendar size={20} className="text-gray-400" /></div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Date & Time</p>
              <p className="font-semibold">{new Date(event.event_time).toLocaleDateString()} at {new Date(event.event_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5">
            <div className="bg-black/50 p-2 rounded-md"><MapPin size={20} className="text-gray-400" /></div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Venue Location</p>
              <p className="font-semibold">{event.venue}</p>
            </div>
          </div>
        </div>

        <div className="bg-black/60 rounded-xl p-5 flex items-center justify-between border border-white/10 shadow-inner backdrop-blur-md">
          <div className="flex items-center gap-3 text-gray-400 font-medium">
            <Clock size={18} className={timeLeft !== "Event Ended" ? "animate-spin-slow" : ""} />
            <span className="uppercase tracking-widest text-sm text-gray-500">Starts In</span>
          </div>
          <div className="font-mono text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-[0.1em]">
            {timeLeft}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
