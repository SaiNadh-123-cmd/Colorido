"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, X, CheckCircle2 } from "lucide-react";

export default function RegistrationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", college: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setStep(2);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-md p-8 glass-panel border-[var(--color-electric-blue)] shadow-[0_0_40px_rgba(0,240,255,0.2)]"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
              <X size={24} />
            </button>

            {step === 1 ? (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Register for Event
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-electric-blue)] transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-electric-blue)] transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">College/University</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-electric-blue)] transition-colors"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    />
                  </div>
                  
                  <div className="pt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-sm text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
                      <CheckCircle2 size={16} /> Zero Fee Event
                    </span>
                    <button type="submit" className="glass-button-blue px-6 py-3 rounded-lg font-bold text-white tracking-wide">
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/50">
                  <CheckCircle2 size={40} className="text-green-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-white">Registration Confirmed!</h2>
                <p className="text-gray-400 mb-8">Your zero-fee pass is ready. Show this QR code at the venue.</p>
                
                <div className="bg-white p-4 rounded-xl inline-block shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  <QrCode size={150} className="text-black" />
                </div>
                
                <p className="mt-6 text-sm text-[var(--color-electric-blue)] animate-pulse">
                  Pass ID: CLR-{Math.random().toString(36).substring(2, 8).toUpperCase()}
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
