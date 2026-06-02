import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ isOpen, onClose, cart, onRemoveItem, onCheckout }: CartDrawerProps) {
  const totalPrice = cart.length * 2400; // Estimated adoption reservation deposit tier or price if listed

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/30 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-oatmeal border-l border-sage/15 flex flex-col shadow-2xl h-full text-charcoal relative"
            >
              <div className="p-6 border-b border-charcoal/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-sage" />
                  <span className="text-sm font-mono tracking-widest uppercase font-semibold">Adopt Basket</span>
                  <span className="px-2 py-0.5 bg-sage/10 text-sage-dark rounded-full text-[10px] font-mono">
                    {cart.length}
                  </span>
                </div>
                <button
                  id="cart-drawer-close"
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-charcoal/5 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Cart items list */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full border border-dashed border-charcoal/20 flex items-center justify-center opacity-60">
                      <ShoppingBag size={20} className="text-charcoal-light" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-charcoal">Your basket is quiet</p>
                      <p className="text-xs text-charcoal-light mt-1">
                        Explore and select physical editions to begin companion bonding.
                      </p>
                    </div>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <motion.div
                      key={`${item.edition.id}-${idx}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 p-4 bg-white/50 rounded-xl border border-white/40 shadow-xs relative group"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-oatmeal/80 border border-charcoal/5 shrink-0">
                        <img
                          src={item.edition.unsplashUrl}
                          alt={item.edition.name}
                          className="w-full h-full object-cover grayscale-10"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-mono text-sage-dark tracking-widest uppercase block">
                          {item.edition.tagline}
                        </span>
                        <h4 className="text-sm font-semibold text-charcoal truncate">{item.edition.name}</h4>
                        
                        <div className="mt-1.5 space-y-0.5 text-[10px] text-charcoal-light font-mono">
                          {item.engraving && (
                            <div className="flex items-center gap-1">
                              <span className="opacity-60">Engrave:</span>
                              <span className="uppercase text-charcoal font-medium">"{item.engraving}"</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <span className="opacity-60">Frequency:</span>
                            <span className="text-charcoal font-medium">{item.frequency || '4.5'}s pulse</span>
                          </div>
                        </div>

                        <div className="mt-2 text-xs font-semibold text-sage-dark">
                          Reservation tier: $2,400 <span className="text-[9px] text-charcoal-light font-light">(pay later)</span>
                        </div>
                      </div>

                      <button
                        id={`cart-delete-btn-${idx}`}
                        onClick={() => onRemoveItem(idx)}
                        className="absolute right-4 top-4 p-1 text-charcoal-light hover:text-terracotta hover:bg-terracotta/5 rounded-md transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Checkout / bottom summary footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-charcoal/5 bg-[#EFECE6]/40 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-charcoal-light font-mono">ESTIMATED VALUATION</span>
                      <span className="font-semibold text-charcoal">${totalPrice.toLocaleString()} USD</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-sage font-semibold uppercase tracking-wider flex items-center gap-1">
                        <Sparkles size={10} className="animate-pulse" /> Allocation Tier Guarantee
                      </span>
                      <span className="text-charcoal-light">LATE AUTUMN 2026 DISPATCH</span>
                    </div>
                  </div>

                  <button
                    id="cart-checkout-trigger"
                    onClick={() => {
                      onClose();
                      onCheckout();
                    }}
                    className="w-full bg-charcoal text-oatmeal hover:bg-sage-dark hover:text-white py-4 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    Confirm Allocation Registry <ArrowRight size={14} />
                  </button>
                  
                  <p className="text-[9px] text-center text-charcoal-light font-light leading-relaxed">
                    No credit card is required today. You will receive handcrafted authentication codes and build timeline updates prior to courier shipping.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
