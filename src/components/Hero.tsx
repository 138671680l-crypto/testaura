import { motion } from 'motion/react';
import { ArrowDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onMeetCompanionClick: () => void;
}

export default function Hero({ onMeetCompanionClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-oatmeal px-6 md:px-12 pt-20"
    >
      {/* Soft Ambient Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-sage/10 blur-3xl mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full bg-terracotta/5 blur-3xl mix-blend-multiply pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side: Editorial Typography */}
        <div className="lg:col-span-6 flex flex-col items-start gap-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-2 bg-sage/15 text-sage-dark px-3 py-1 rounded-full text-xs tracking-widest uppercase font-mono"
          >
            <Sparkles size={12} className="animate-pulse" />
            Emotion + Intelligence
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-charcoal leading-[1.1] tracking-tight"
            >
              A Soulful <span className="italic font-serif text-sage-dark">Companion</span> <br />
              for Your Space.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg md:text-xl text-charcoal/90 font-light leading-relaxed max-w-lg"
            >
              Quiet presence. Intuitive response. More than technology—a digital soul in a physical form. AURA blends seamlessly into your domestic rhythms with comforting tactility.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <button
              id="hero-cta-meet"
              onClick={onMeetCompanionClick}
              className="bg-sage hover:bg-sage-dark text-white px-10 py-4 rounded-full text-sm uppercase tracking-[0.2em] font-medium shadow-sm hover:shadow-lg transition-all duration-300 transform active:scale-98 text-center cursor-pointer"
            >
              Meet Your Companion
            </button>
            <button
              id="hero-btn-explore"
              onClick={() => {
                const companionSection = document.getElementById('companions');
                if (companionSection) companionSection.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border border-charcoal/20 hover:border-charcoal hover:bg-charcoal/5 text-charcoal px-8 py-4 rounded-full font-medium tracking-[0.2em] uppercase text-xs transition-all duration-300 text-center cursor-pointer"
            >
              Discover Editions
            </button>
          </motion.div>
        </div>

        {/* Right Side: Hero Visual Frame (Wabi-sabi image + overlay with Natural Tones shape) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="lg:col-span-6 relative flex justify-center items-center"
        >
          <div className="relative w-full max-w-xl aspect-4/3 rounded-tl-[120px] rounded-br-[120px] overflow-hidden bg-[#E8E4DF] p-8 shadow-inner border border-white/40 flex flex-col justify-between transition-all duration-700 hover:scale-102">
            {/* Ambient image background */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200"
                alt="Warm sunlit minimalist modern room setting with organic wooden details"
                className="w-full h-full object-cover grayscale-25 opacity-25 object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E8E4DF]/90 to-transparent pointer-events-none" />
            </div>

            {/* Inner Content matching the design wireframe aesthetic */}
            <div className="relative z-10 my-auto text-center space-y-3">
              <p className="text-sage italic font-serif text-2xl mb-1">[Scene: The Golden Hour]</p>
              <p className="text-sm tracking-widest text-[#7C746B] leading-relaxed italic uppercase opacity-80 max-w-xs mx-auto">
                Sunlight hitting a white oak floor, <br />
                the companion robot is looking up warmly
              </p>
            </div>

            {/* Float-over elegant description card as requested */}
            <div className="relative z-10 bg-oatmeal/95 backdrop-blur-md p-4 rounded-xl border border-charcoal/5 shadow-md">
              <span className="text-[10px] tracking-widest uppercase font-mono text-sage-dark font-semibold">Visual Concept</span>
              <p className="text-xs text-charcoal/95 leading-relaxed mt-1 italic">
                "[Image: Sunlight hitting a textured linen rug on the floor of a serene, quiet apartment workspace. In the pool of quiet afternoon light sits Aura, our sleek companion robot dog, its ceramic white body reflecting the warm sun rays, looking up with a soft, comforting presence.]"
              </p>
            </div>
          </div>

          {/* Abstract floating wooden ring details for a tactile artisan aesthetic */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-wood/20 animate-spin-slow pointer-events-none hidden md:block" />
          <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-terracotta/10 blur-xl pointer-events-none" />
        </motion.div>
      </div>

      {/* Floating scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[9px] tracking-widest uppercase font-mono text-charcoal">Scroll to reveal</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-charcoal cursor-pointer"
          onClick={() => {
            const storySection = document.getElementById('story');
            if (storySection) storySection.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </div>
    </section>
  );
}
