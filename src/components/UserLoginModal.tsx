import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, LogIn, Sparkles, Key, Battery, Activity, ShieldAlert, Heart, Calendar, LogOut } from 'lucide-react';
import { UserState } from '../types';

interface UserLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserState | null;
  onLogin: (name: string, email: string) => void;
  onLogout: () => void;
}

export default function UserLoginModal({ isOpen, onClose, user, onLogin, onLogout }: UserLoginModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorFlag, setErrorFlag] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorFlag('Please enter both name and email.');
      return;
    }
    if (!email.includes('@')) {
      setErrorFlag('Please provide a valid email structure.');
      return;
    }
    setErrorFlag('');
    onLogin(name, email);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg bg-oatmeal rounded-3xl border border-sage/15 shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-charcoal/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User size={16} className="text-sage" />
                <span className="text-xs font-mono tracking-widest uppercase font-semibold text-charcoal">
                  {user?.isLoggedIn ? 'Tactile Companion Dashboard' : 'Secure Aura Access'}
                </span>
              </div>
              <button
                id="login-modal-close"
                onClick={onClose}
                className="p-1 rounded-full hover:bg-charcoal/5 transition-colors cursor-pointer"
              >
                <X size={18} className="text-charcoal-light" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {user?.isLoggedIn ? (
                /* Logged In Dashboard View */
                <div className="space-y-6">
                  {/* Compact Header Badge */}
                  <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/60 shadow-xs flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-sage/10 text-sage flex items-center justify-center font-serif italic text-lg font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-charcoal">{user.name}</h4>
                      <p className="text-[11px] font-mono text-charcoal-light">{user.email}</p>
                      <span className="inline-block mt-1 text-[9px] font-mono font-bold uppercase tracking-wider text-sage px-1.5 py-0.5 rounded-full bg-sage/10">
                        Bonding Active
                      </span>
                    </div>
                  </div>

                  {/* Robot Status Hub */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono tracking-widest text-[#7C746B] uppercase block">
                      [ Real-Time Aura Feed ]
                    </span>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Sync Vital Card */}
                      <div className="bg-[#EFECE6]/70 p-4 rounded-xl border border-charcoal/5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-charcoal-light uppercase">Resonance Sync</span>
                          <Heart size={12} className="text-[#994D3F] animate-pulse" />
                        </div>
                        <div className="text-lg font-medium text-charcoal flex items-baseline gap-1">
                          <span>{user.companionStatus?.heartbeatSync}</span>
                          <span className="text-[10px] font-mono text-charcoal-light">BPM</span>
                        </div>
                        <div className="text-[9px] text-[#A3B19B] font-semibold uppercase font-mono tracking-wider">
                          Perfect Resonance
                        </div>
                      </div>

                      {/* Power Health Card */}
                      <div className="bg-[#EFECE6]/70 p-4 rounded-xl border border-charcoal/5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-charcoal-light uppercase">Tactile core power</span>
                          <Battery size={13} className="text-sage" />
                        </div>
                        <div className="text-lg font-medium text-charcoal flex items-baseline gap-1">
                          <span>{user.companionStatus?.batteryLevel}%</span>
                        </div>
                        <div className="text-[9px] text-sage-dark font-semibold uppercase font-mono tracking-wider">
                          Gentle Ripple Charge
                        </div>
                      </div>
                    </div>

                    {/* Operational Details Drawer */}
                    <div className="bg-white/50 backdrop-blur-md rounded-xl p-4 border border-white/40 space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-mono text-charcoal-light">
                        <span>INTELLIGENT SERIAL</span>
                        <span className="text-charcoal font-medium">{user.companionStatus?.assignedId}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-charcoal-light">
                        <span>MODEL LINEUP</span>
                        <span className="text-charcoal font-medium">{user.companionStatus?.editionName}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-charcoal-light">
                        <span>LAST SYNCHRONIZATION</span>
                        <span className="text-charcoal font-medium">Just now via skin contact</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-charcoal-light">
                        <span>STATE STATUS</span>
                        <span className="text-sage font-semibold flex items-center gap-1 uppercase tracking-widest text-[9px]">
                          <span className="w-1.5 h-1.5 bg-sage rounded-full animate-ping" /> Serene
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Orders Timeline */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono tracking-widest text-[#7C746B] uppercase block">
                      [ Handcrafting & Shipping ]
                    </span>
                    <div className="bg-white/40 border border-charcoal/5 p-4 rounded-xl space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-sage rounded-full mt-1" />
                        <div>
                          <p className="text-xs font-semibold text-charcoal">Design Specs Locked</p>
                          <p className="text-[10px] text-charcoal-light">Your ceramic casing parameters are cataloged.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 opacity-60">
                        <div className="w-1.5 h-1.5 bg-charcoal-light rounded-full mt-1" />
                        <div>
                          <p className="text-xs font-semibold text-charcoal">Artisan Assembly Step</p>
                          <p className="text-[10px] text-charcoal-light">Cored wooden joint setup initiates.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    id="dashboard-logout-trigger"
                    onClick={onLogout}
                    className="w-full bg-[#F7F5F2] hover:bg-terracotta/5 hover:text-[#994D3F] border border-charcoal/10 hover:border-[#994D3F]/20 py-3.5 rounded-full transition-all duration-300 font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogOut size={12} /> Sever Tactile Connection
                  </button>
                </div>
              ) : (
                /* Login Form View */
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="text-center space-y-1.5 max-w-sm mx-auto">
                    <p className="text-xs font-serif text-charcoal/80 italic">
                      Establish a persistent cognitive uplink to configure features, trace calibration histories, and monitor dispatch stages.
                    </p>
                  </div>

                  {errorFlag && (
                    <div className="p-3 bg-terracotta/10 border border-terracotta/20 text-terracotta text-xs rounded-xl flex items-center gap-2">
                      <ShieldAlert size={14} className="shrink-0" />
                      <span>{errorFlag}</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label id="lbl-name" className="text-[10px] font-mono uppercase tracking-wider text-charcoal-light">
                        Pioneer Name
                      </label>
                      <input
                        id="login-input-name"
                        type="text"
                        placeholder="e.g. Soshin Mori"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#EFECE6]/50 rounded-xl border border-charcoal/5 focus:border-sage focus:outline-hidden text-xs text-charcoal transition-all font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label id="lbl-email" className="text-[10px] font-mono uppercase tracking-wider text-charcoal-light">
                        Email Address
                      </label>
                      <input
                        id="login-input-email"
                        type="email"
                        placeholder="soshin@aura.space"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-[#EFECE6]/50 rounded-xl border border-charcoal/5 focus:border-sage focus:outline-hidden text-xs text-charcoal transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      id="login-submit-trigger"
                      type="submit"
                      className="w-full bg-charcoal hover:bg-sage text-oatmeal hover:text-white py-3.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LogIn size={13} /> Link Tactile Account
                    </button>
                    <p className="text-[9px] text-center text-charcoal-light font-light mt-3 leading-relaxed">
                      By connecting, you agree to secure local synchronization. Your personal biometric state telemetry and account files remain strictly within this sandbox workspace.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
