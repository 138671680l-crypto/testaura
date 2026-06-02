import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShoppingCart, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onReserveClick: () => void;
  onExploreClick: () => void;
  onStoryClick: () => void;
  onAboutClick: () => void;
  onCartClick: () => void;
  onProfileClick: () => void;
  cartSize: number;
  userLoggedIn: boolean;
  currentView: 'home' | 'about';
  onViewChange: (view: 'home' | 'about') => void;
}

export default function Navbar({
  onReserveClick,
  onExploreClick,
  onStoryClick,
  onAboutClick,
  onCartClick,
  onProfileClick,
  cartSize,
  userLoggedIn,
  currentView,
  onViewChange,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-[80] transition-all duration-500 ${
          scrolled
            ? 'bg-oatmeal/90 backdrop-blur-md py-4 shadow-xs border-b border-sage/10'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Brand Logo */}
          <button
            id="nav-logo"
            onClick={() => {
              onViewChange('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-2xl font-display font-medium tracking-[0.25em] text-charcoal hover:opacity-80 transition-opacity cursor-pointer"
          >
            AURA
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              id="nav-link-companions"
              onClick={() => {
                onViewChange('home');
                onExploreClick();
              }}
              className={`text-xs tracking-widest uppercase hover:text-sage-dark transition-colors duration-300 font-medium cursor-pointer ${
                currentView === 'home' ? 'text-charcoal' : 'text-charcoal/60'
              }`}
            >
              Companions
            </button>
            <button
              id="nav-link-story"
              onClick={() => {
                onViewChange('home');
                onStoryClick();
              }}
              className={`text-xs tracking-widest uppercase hover:text-sage-dark transition-colors duration-300 font-medium cursor-pointer ${
                currentView === 'home' ? 'text-charcoal' : 'text-charcoal/60'
              }`}
            >
              The Story
            </button>
            <button
              id="nav-link-about"
              onClick={() => {
                onViewChange('about');
                onAboutClick();
              }}
              className={`text-xs tracking-widest uppercase hover:text-sage-dark transition-colors duration-300 font-medium cursor-pointer ${
                currentView === 'about' ? 'text-sage-dark font-semibold' : 'text-charcoal/60'
              }`}
            >
              About Us / 理念
            </button>
          </div>

          {/* Core interactive buttons (Cart + Profile + Reserve) */}
          <div className="hidden md:flex items-center gap-5">
            {/* User Icon Button */}
            <button
              id="nav-btn-profile"
              onClick={onProfileClick}
              className="p-2.5 rounded-full hover:bg-charcoal/5 text-charcoal relative transition-colors cursor-pointer flex items-center justify-center"
              title="Aura Account Hub"
            >
              <User size={18} />
              {userLoggedIn && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-sage rounded-full ring-2 ring-oatmeal" />
              )}
            </button>

            {/* Shopping Cart Icon Button with Badge */}
            <button
              id="nav-btn-cart"
              onClick={onCartClick}
              className="p-2.5 rounded-full hover:bg-charcoal/5 text-charcoal relative transition-colors cursor-pointer flex items-center justify-center"
              title="Your Allocations"
            >
              <ShoppingCart size={18} />
              {cartSize > 0 && (
                <span className="absolute -top-1 -right-1 bg-sage text-white text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {cartSize}
                </span>
              )}
            </button>

            <button
              id="nav-btn-reserve"
              onClick={onReserveClick}
              className="text-xs tracking-widest uppercase bg-charcoal text-oatmeal px-5 py-2.5 rounded-full hover:bg-sage-dark hover:text-white transition-all duration-300 shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              Reserve <ArrowRight size={12} />
            </button>
          </div>

          {/* Mobile Right Utilities Side */}
          <div className="flex md:hidden items-center gap-3">
            {/* Mobile User Profile Trigger */}
            <button
              id="nav-mobile-btn-profile"
              onClick={onProfileClick}
              className="p-2 text-charcoal relative cursor-pointer"
            >
              <User size={20} />
              {userLoggedIn && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-sage rounded-full" />
              )}
            </button>

            {/* Mobile Cart Trigger */}
            <button
              id="nav-mobile-btn-cart"
              onClick={onCartClick}
              className="p-2 text-charcoal relative cursor-pointer"
            >
              <ShoppingCart size={20} />
              {cartSize > 0 && (
                <span className="absolute top-0 right-0 bg-sage text-white text-[8px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartSize}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="nav-mobile-hamburger"
              onClick={() => setIsOpen(!isOpen)}
              className="text-charcoal focus:outline-none p-1 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="nav-mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[70] bg-oatmeal flex flex-col justify-center items-center gap-6 md:hidden px-6 pt-20"
          >
            <button
              id="nav-mobile-link-companions"
              onClick={() => {
                setIsOpen(false);
                onViewChange('home');
                onExploreClick();
              }}
              className="text-lg tracking-widest uppercase text-charcoal hover:text-sage-dark transition-colors font-medium"
            >
              Companions
            </button>
            <button
              id="nav-mobile-link-story"
              onClick={() => {
                setIsOpen(false);
                onViewChange('home');
                onStoryClick();
              }}
              className="text-lg tracking-widest uppercase text-charcoal hover:text-sage-dark transition-colors font-medium"
            >
              The Story
            </button>
            <button
              id="nav-mobile-link-about"
              onClick={() => {
                setIsOpen(false);
                onViewChange('about');
                onAboutClick();
              }}
              className="text-lg tracking-widest uppercase text-sage-dark font-semibold transition-colors"
            >
              About Us / 理念
            </button>
            
            <div className="h-[1px] w-24 bg-charcoal/10" />

            <button
              id="nav-mobile-btn-reserve"
              onClick={() => {
                setIsOpen(false);
                onReserveClick();
              }}
              className="text-sm tracking-widest uppercase bg-charcoal text-oatmeal px-8 py-3 rounded-full hover:bg-sage-dark hover:text-white transition-all shadow-sm flex items-center gap-2"
            >
              Reserve <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
