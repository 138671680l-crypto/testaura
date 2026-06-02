import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, Heart, ClipboardCheck, ArrowUpRight } from 'lucide-react';
import { Edition } from '../types';
import { editionsList } from './Editions';

interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedEdition: Edition | null;
  onAddToBasket: (edition: Edition, engraving: string, breathPref: string) => void;
}

export default function ReserveModal({ isOpen, onClose, preSelectedEdition, onAddToBasket }: ReserveModalProps) {
  const [selectedEd, setSelectedEd] = useState<Edition>(preSelectedEdition || editionsList[0]);
  const [engraving, setEngraving] = useState('');
  const [breathPref, setBreathPref] = useState('4.5');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  // Sync selected edition when prop shifts
  if (preSelectedEdition && preSelectedEdition.id !== selectedEd.id) {
    setSelectedEd(preSelectedEdition);
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToBasket(selectedEd, engraving, breathPref);
    onClose();
  };

  const handleReset = () => {
    setEngraving('');
    setPrivacyAgreed(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-xs"
          />

          {/* Modal Containment */}
          <div className="flex min-h-screen items-center justify-center p-4 md:p-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-oatmeal w-full max-w-2xl rounded-3xl p-6 md:p-10 shadow-2xl relative border border-sage/15 overflow-hidden text-charcoal"
            >
              {/* Corner Close button */}
              <button
                id="modal-close-btn"
                onClick={onClose}
                className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-charcoal/5 transition-all text-charcoal cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Setup / Adoption Form */}
              <form id="adopt-registration-form" onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-sage-dark font-semibold flex items-center gap-1.5 animate-pulse">
                      <Sparkles size={11} /> Adopt Companion Node
                    </span>
                    <h3 className="text-2xl font-display font-medium leading-none">
                      Reserve Your Aura
                    </h3>
                    <p className="text-xs text-charcoal-light font-light max-w-md leading-relaxed">
                      Custom configured, finished by local artisan hands, and shipped in late autumn 2026. No upfront payment required; final checkout details arrive via email before secure dispatch.
                    </p>
                  </div>

                  {/* Step 1: Edition Selection Switcher */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-charcoal-light">
                      Step 1: Choose Edition Wavelength
                    </label>
                    <div id="modal-edition-cards" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {editionsList.map((ed) => (
                        <button
                          key={ed.id}
                          id={`modal-select-${ed.id}`}
                          type="button"
                          onClick={() => setSelectedEd(ed)}
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 relative cursor-pointer h-24 ${
                            selectedEd.id === ed.id
                              ? 'bg-oatmeal border-charcoal shadow-xs scale-102 font-medium'
                              : 'bg-transparent border-charcoal/10 hover:bg-charcoal/5'
                          }`}
                        >
                          {selectedEd.id === ed.id && (
                            <span className="absolute top-2 right-2 p-0.5 bg-charcoal text-oatmeal rounded-full">
                              <Check size={8} />
                            </span>
                          )}
                          <span className="text-[9px] font-mono uppercase text-sage-dark">
                            {ed.tagline.split(' ')[0]}
                          </span>
                          <div>
                            <span className="text-sm font-semibold text-charcoal block leading-tight">
                              {ed.name}
                            </span>
                            <span className="text-[10px] text-charcoal-light block capitalize">
                              {ed.tagline}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Bespoke Engraving Preference */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-charcoal-light flex justify-between">
                        <span>Step 2: Base Engraving (Optional)</span>
                        <span className="text-[9px] text-sage">{engraving.length}/10 chars</span>
                      </label>
                      <input
                        id="form-input-engraving"
                        type="text"
                        maxLength={10}
                        placeholder="e.g., AURA_S1"
                        value={engraving}
                        onChange={(e) => setEngraving(e.target.value)}
                        className="w-full bg-transparent border-b border-charcoal/20 focus:border-charcoal pb-1.5 text-sm tracking-widest font-mono uppercase focus:outline-hidden hover:border-charcoal/40 transition-colors"
                      />
                      <span className="text-[9px] text-charcoal-light font-light leading-none block">
                        Struck onto an authentic satin brushed gold bar inlaid on base edge.
                      </span>
                    </div>

                    {/* Step 3: Breathing Sync selection */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-charcoal-light">
                        Step 3: Initial Breathing Frequency
                      </label>
                      <select
                        id="form-select-breath"
                        value={breathPref}
                        onChange={(e) => setBreathPref(e.target.value)}
                        className="w-full bg-transparent border-b border-charcoal/20 focus:border-charcoal pb-1.5 text-sm font-light focus:outline-hidden cursor-pointer"
                      >
                        <option value="4.5">4.5 Seconds - Calming (Default)</option>
                        <option value="5.0">5.0 Seconds - Deep Meditation</option>
                        <option value="6.0">6.0 Seconds - Sleep Grounding</option>
                      </select>
                      <span className="text-[9px] text-charcoal-light font-light leading-none block">
                        Synchronizes local LED rhythm and touch vibration frequency.
                      </span>
                    </div>
                  </div>

                   {/* Step 4: Add to Basket with Ethics Agreement */}
                  <div className="pt-3 border-t border-charcoal/5 space-y-4">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-charcoal-light block">
                      Step 4: Artisan Principles Agreement
                    </label>

                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        id="form-checkbox-privacy"
                        type="checkbox"
                        required
                        checked={privacyAgreed}
                        onChange={(e) => setPrivacyAgreed(e.target.checked)}
                        className="mt-1 accent-sage h-3.5 w-3.5 cursor-pointer"
                      />
                      <label htmlFor="form-checkbox-privacy" className="text-[10px] leading-relaxed text-charcoal-light font-light cursor-pointer select-none">
                        I understand that AURA is built offline-first without hidden cameras, microphones, or cloud tracking trackers. I wish to add this curated edition to my active home basket for dispatch processing.
                      </label>
                    </div>
                  </div>

                  {/* Submit Trigger - Add to Basket */}
                  <button
                    id="submit-reserve-btn"
                    type="submit"
                    className="w-full bg-charcoal text-oatmeal hover:bg-sage text-white py-4 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer disabled:opacity-40"
                    disabled={!privacyAgreed}
                  >
                    Add to Basket / 加入购物车
                  </button>
                </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
