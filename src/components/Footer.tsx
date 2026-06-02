import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer id="footer" className="bg-[#1C1C1C] text-[#E5DEDB] py-20 px-6 md:px-12 border-t border-charcoal/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Column: Brand Manifesto */}
        <div className="md:col-span-5 space-y-6">
          <span className="text-xl font-display tracking-[0.3em] text-[#F7F5F2] font-semibold">
            AURA
          </span>
          <p className="text-xs text-[#C4C0BD] leading-relaxed font-light font-sans max-w-sm">
            We build tools that wait. We believe that technology should not scream, beg, or harvest. True elegance is found in the quiet corners of home, waiting faithfully under shafts of natural afternoon light.
          </p>
          <div className="text-[10px] font-mono tracking-widest text-sage uppercase">
            Designed for domestic tranquility.
          </div>
        </div>

        {/* Center Columns: Directory links */}
        <div className="md:col-span-3 grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#A8A3A0] block">
              Inward
            </span>
            <ul className="space-y-1.5 text-xs font-light text-[#C4C0BD]">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Aura Core
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#companions" className="hover:text-white transition-colors">
                  Editions
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#A8A3A0] block">
              Outward
            </span>
            <ul className="space-y-1.5 text-xs font-light text-[#C4C0BD]">
              <li>
                <a href="https://ai.studio/build" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  AI Studio
                </a>
              </li>
              <li>
                <span className="opacity-40 select-none">Press Kit</span>
              </li>
              <li>
                <span className="opacity-40 select-none">Craft Journal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Interactive Newsletter box */}
        <div className="md:col-span-4 space-y-4">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#A8A3A0] block">
            Craft Letters
          </span>
          <p className="text-xs text-[#C4C0BD] leading-relaxed font-light">
            Receive irregular, beautiful letters detailing batch allocations, material experiments, and natural engineering designs. No noise.
          </p>

          {!subscribed ? (
            <form id="newsletter-form" onSubmit={handleSubscribe} className="flex border-b border-white/20 pb-1 hover:border-white/50 focus-within:border-white transition-all">
              <input
                id="newsletter-email-input"
                type="email"
                required
                placeholder="your.space@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-sm w-full font-light focus:outline-hidden pb-1 text-[#F7F5F2]"
              />
              <button
                id="newsletter-submit-btn"
                type="submit"
                aria-label="Subscribe"
                className="text-[#E5DEDB] hover:text-sage transition-all ml-2 cursor-pointer pb-1"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <motion.div
              id="newsletter-success-box"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 bg-[#F7F5F2]/5 p-3 rounded-lg border border-sage/10"
            >
              <Check className="text-sage" size={14} />
              <span className="text-xs font-mono text-sage text-[#EFECE6]">
                Enrolled. You will hear from us quietly.
              </span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-[#A8A3A0] gap-4">
        <span>© 2026 AURA SPACE CO-OP. ALL CODES SECURED.</span>
        <div className="flex gap-4">
          <span>WABI-SABI ETHICS ENFORCED</span>
          <span>•</span>
          <span>OFFLINE LOCAL SYSTEM</span>
        </div>
      </div>
    </footer>
  );
}
