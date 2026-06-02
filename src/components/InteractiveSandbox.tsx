import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Volume2, VolumeX, Eye, Flame, ShieldAlert, Sliders } from 'lucide-react';

export default function InteractiveSandbox() {
  const [mood, setMood] = useState<'serene' | 'warm' | 'intellectual'>('serene');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [interactionActive, setInteractionActive] = useState<string | null>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [heartbeatActive, setHeartbeatActive] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const rippleIdCounter = useRef(0);

  // Initialize Audio Context on user request
  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const toggleAudio = () => {
    if (!audioEnabled) {
      initAudio();
      setAudioEnabled(true);
      playSynthNote(440, 'sine', 0.15, 0.05); // feedback beep
    } else {
      setAudioEnabled(false);
    }
  };

  // Helper function to synthesize custom premium audio sounds on-the-fly
  const playSynthNote = (freq: number, type: OscillatorType, duration: number, maxGain: number = 0.1) => {
    if (!audioEnabled) return;
    try {
      initAudio();
      if (!audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(maxGain, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio Context error: ', e);
    }
  };

  // 1. PET Interaction (Low soothing purr/hum)
  const triggerPet = (e?: React.MouseEvent<HTMLDivElement>) => {
    setInteractionActive('pet');
    playSynthNote(120, 'triangle', 0.8, 0.4); // purr

    // Generate ripple coords relative to visual container
    let x = 160;
    let y = 140;
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    const newRipple = { id: rippleIdCounter.current++, x, y };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setInteractionActive(null);
    }, 1000);
  };

  // Remove ripple after transition
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  // 2. HEARTBEAT Interaction (Lub-dub bump, plays soft thuds)
  const triggerHeartbeat = () => {
    if (heartbeatActive) return;
    setHeartbeatActive(true);
    setInteractionActive('heartbeat');

    // First lub-dub thud
    playSynthNote(75, 'sine', 0.3, 0.45);
    setTimeout(() => {
      // Second thud
      playSynthNote(68, 'sine', 0.3, 0.4);
    }, 150);

    setTimeout(() => {
      setHeartbeatActive(false);
      setInteractionActive(null);
    }, 800);
  };

  // 3. GAZE Shift (Crystalline chime)
  const handleShiftMood = (newMood: 'serene' | 'warm' | 'intellectual') => {
    setMood(newMood);
    setInteractionActive('mood');

    if (newMood === 'serene') {
      playSynthNote(329.63, 'sine', 1.2, 0.1); // E4 calming
    } else if (newMood === 'warm') {
      playSynthNote(392.00, 'sine', 1.0, 0.12); // G4 bright
    } else {
      playSynthNote(220.00, 'triangle', 1.5, 0.08); // A3 deep
    }

    setTimeout(() => {
      setInteractionActive(null);
    }, 1200);
  };

  // Autostart comforting micro-pulses
  useEffect(() => {
    const pulseTimer = setInterval(() => {
      if (mood === 'serene') {
        playSynthNote(55, 'sine', 0.4, 0.04);
      }
    }, 4500);
    return () => clearInterval(pulseTimer);
  }, [mood, audioEnabled]);

  const moodColors = {
    serene: {
      themeClass: 'bg-sage',
      glowShadow: '0 0 35px rgba(163, 177, 155, 0.55)',
      hex: '#A3B19B',
      desc: 'Ambient Sage: Calmed frequencies, 4.5s long breathing cycle.',
    },
    warm: {
      themeClass: 'bg-terracotta',
      glowShadow: '0 0 35px rgba(211, 139, 112, 0.55)',
      hex: '#D38B70',
      desc: 'Soothed Terracotta: Touch-sensitive feedback, cozy sparks.',
    },
    intellectual: {
      themeClass: 'bg-wood',
      glowShadow: '0 0 35px rgba(197, 155, 120, 0.55)',
      hex: '#C59B78',
      desc: 'Steady Oak: Stable golden presence, deep grounding hums.',
    },
  };

  return (
    <section id="interactive-sand" className="py-24 bg-[#EFECE6] px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Detail */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-sage-dark font-semibold">
              Live Simulation
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-light text-charcoal leading-tight">
              Interact with Aura
            </h2>
            <p className="text-sm font-light text-charcoal/80 leading-relaxed">
              Experience’s Aura’s physical presence directly from your browser. Interact with the digital node below to trigger organic tactile heartbeat rhythms and sensory light adjustments.
            </p>

            {/* Audio Consent Banner */}
            <div className="flex items-center justify-between bg-oatmeal p-3 rounded-lg border border-charcoal/5 gap-3">
              <span className="text-[11px] font-mono text-charcoal-light flex items-center gap-1.5">
                {audioEnabled ? <Volume2 size={14} className="text-sage" /> : <VolumeX size={14} className="text-terracotta" />}
                Procedural Sound Engine
              </span>
              <button
                id="toggle-audio-btn"
                onClick={toggleAudio}
                className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-widest cursor-pointer transition-all duration-300 ${
                  audioEnabled
                    ? 'bg-sage text-white'
                    : 'bg-charcoal/5 hover:bg-charcoal/10 text-charcoal'
                }`}
              >
                {audioEnabled ? 'Active' : 'Enable sound'}
              </button>
            </div>

            {/* Interactive Control Console */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-charcoal-light block">
                Simulator Triggers
              </span>

              <div id="sim-controls" className="grid grid-cols-2 gap-3">
                <button
                  id="sandbox-btn-pet"
                  onClick={() => triggerPet()}
                  className="p-3 bg-oatmeal rounded-xl border border-charcoal/5 hover:border-charcoal hover:bg-oatmeal-light text-left transition-all duration-300 group cursor-pointer"
                >
                  <span className="text-[10px] font-mono text-charcoal-light block">Trigger</span>
                  <span className="text-sm font-semibold text-charcoal flex items-center gap-1.5 mt-0.5">
                    <Sparkles size={14} className="text-sage group-hover:scale-115 transition-transform" /> Stroke Back
                  </span>
                </button>

                <button
                  id="sandbox-btn-heartbeat"
                  onClick={triggerHeartbeat}
                  disabled={heartbeatActive}
                  className={`p-3 bg-oatmeal rounded-xl border border-charcoal/5 hover:border-charcoal hover:bg-oatmeal-light text-left transition-all duration-300 group cursor-pointer ${
                    heartbeatActive ? 'opacity-70 scale-98 border-sage/40' : ''
                  }`}
                >
                  <span className="text-[10px] font-mono text-charcoal-light block">Haptic</span>
                  <span className="text-sm font-semibold text-charcoal flex items-center gap-1.5 mt-0.5">
                    <Heart id="sim-icon-heart" size={14} className={`text-terracotta ${heartbeatActive ? 'animate-ping' : 'group-hover:scale-115 transition-transform'}`} /> Touch Heart
                  </span>
                </button>
              </div>

              {/* Mood Color Shifter */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-charcoal-light block">
                  Select Resonance Light Wavelength
                </span>
                <div id="mood-tabs" className="flex gap-2">
                  {(['serene', 'warm', 'intellectual'] as const).map((m) => (
                    <button
                      key={m}
                      id={`mood-tab-${m}`}
                      onClick={() => handleShiftMood(m)}
                      className={`px-4 py-2 rounded-full text-xs font-mono capitalize transition-all cursor-pointer ${
                        mood === m
                          ? 'bg-charcoal text-oatmeal shadow-xs scale-102 font-medium'
                          : 'bg-oatmeal hover:bg-oatmeal-light text-charcoal/70 border border-charcoal/5'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-charcoal-light italic font-light mt-1">
                  {moodColors[mood].desc}
                </p>
              </div>
            </div>
          </div>

          {/* Right Sandbox Container */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-lg aspect-square bg-[#E8E4DF] rounded-tl-[100px] rounded-br-[100px] p-8 border border-white/40 shadow-inner flex flex-col justify-between relative overflow-hidden">
              {/* Outer wooden structural accent lines representing raw materials casing */}
              <div className="absolute top-4 left-4 h-4 w-4 border-t border-l border-wood/30" />
              <div className="absolute top-4 right-4 h-4 w-4 border-t border-r border-wood/30" />
              <div className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-wood/30" />
              <div className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-wood/30" />

              {/* Display Area Labels */}
              <div className="flex justify-between items-center text-[10px] font-mono text-charcoal-light relative z-10">
                <span>MODEL REF: AURA_1.0_PROT</span>
                <span className="flex items-center gap-1">
                  <span className={`h-1.5 w-1.5 rounded-full animate-ping ${moodColors[mood].themeClass}`} />
                  {mood === 'serene' ? 'PULSING' : mood === 'warm' ? 'HEARTBEAT' : 'STEADY'}
                </span>
              </div>

              {/* Central Interactive Aura Canvas Dog representation */}
              <div
                id="interactive-canvas"
                onClick={triggerPet}
                className="my-auto h-64 relative flex items-center justify-center cursor-pointer select-none"
              >
                {/* Background ripples */}
                <AnimatePresence>
                  {ripples.map((rip) => (
                    <motion.div
                      key={rip.id}
                      className="absolute rounded-full border border-sage pointer-events-none"
                      initial={{
                        width: 0,
                        height: 0,
                        opacity: 0.9,
                        left: rip.x,
                        top: rip.y,
                        transform: 'translate(-50%, -50%)',
                      }}
                      animate={{
                        width: 180,
                        height: 180,
                        opacity: 0,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  ))}
                </AnimatePresence>

                {/* Aura breathing glow halo */}
                <motion.div
                  animate={{
                    scale: mood === 'serene' ? [1, 1.05, 1] : mood === 'warm' ? [1, 1.02, 1] : [1, 1.01, 1],
                    opacity: mood === 'serene' ? [0.6, 0.9, 0.6] : [0.7, 0.85, 0.7],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: mood === 'serene' ? 4.5 : mood === 'warm' ? 3.0 : 6.0,
                    ease: 'easeInOut',
                  }}
                  className={`absolute rounded-full pointer-events-none transition-all duration-700`}
                  style={{
                    width: '140px',
                    height: '140px',
                    boxShadow: moodColors[mood].glowShadow,
                    background: `radial-gradient(circle, ${moodColors[mood].hex}22 0%, transparent 70%)`,
                  }}
                />

                {/* Minimalist 2D Architectural Robot Silhouette SVG */}
                <svg
                  width="180"
                  height="180"
                  viewBox="0 0 100 100"
                  className="relative z-10 transition-colors duration-1000 select-none pointer-events-none"
                >
                  {/* Subtle Shadow */}
                  <ellipse cx="50" cy="85" rx="30" ry="6" fill="#4A4A4A" opacity="0.06" />

                  {/* Organic Body Shell */}
                  <path
                    d="M 25 80 C 25 50, 75 50, 75 80 Z"
                    fill="#F7F5F2"
                    stroke="#4A4A4A"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />

                  {/* Spinal / Neck Wood accent line */}
                  <path
                    d="M 45 55 Q 50 65 50 80"
                    fill="none"
                    stroke={moodColors[mood].hex}
                    strokeWidth="1.5"
                    className="transition-colors duration-700"
                  />

                  {/* Sleek architectural head dome */}
                  <path
                    d="M38 46 C38 32, 62 32, 62 46 Z"
                    fill="#F7F5F2"
                    stroke="#4A4A4A"
                    strokeWidth="1.2"
                  />

                  {/* Chest Heart Glowing Core */}
                  <motion.circle
                    cx="50"
                    cy="68"
                    r={heartbeatActive ? 6.5 : 4}
                    fill={moodColors[mood].hex}
                    animate={{
                      scale: heartbeatActive ? [1, 1.4, 1] : [1, 1.08, 1],
                    }}
                    transition={{
                      duration: heartbeatActive ? 0.3 : 1.5,
                      repeat: heartbeatActive ? 0 : Infinity,
                      ease: 'easeInOut',
                    }}
                    className="transition-colors duration-1000"
                  />

                  {/* Expressive minimal ears back */}
                  <path d="M37 38 L28 42 M63 38 L72 42" stroke="#4A4A4A" strokeWidth="1.2" strokeLinecap="round" />
                </svg>

                {/* Simulated Touch Overlay Prompt */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
                  <span className="text-[10px] font-mono text-charcoal/20 select-none">
                    [ Click to pet ]
                  </span>
                </div>
              </div>

              {/* Status and instruction prompt */}
              <div className="text-center text-[11px] text-charcoal-light font-light relative z-10 flex flex-col items-center gap-1">
                <span>STROKE SILHOUETTE TO TRIGGER RIPPLE FREQUENCY</span>
                <span className="text-[9px] font-mono text-sage-dark">
                  ACTIVE MODERATION: OFFLINE LOCAL RADAR ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
