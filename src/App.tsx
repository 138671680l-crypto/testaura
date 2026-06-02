import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Story from './components/Story';
import Editions from './components/Editions';
import InteractiveSandbox from './components/InteractiveSandbox';
import Footer from './components/Footer';
import ReserveModal from './components/ReserveModal';
import AboutUs from './components/AboutUs';
import CartDrawer from './components/CartDrawer';
import UserLoginModal from './components/UserLoginModal';
import { Edition, CartItem, UserState } from './types';
import { Sparkles, Power, Heart } from 'lucide-react';

export default function App() {
  const [logoIntro, setLogoIntro] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState<Edition | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [introTransitioned, setIntroTransitioned] = useState(false);

  // Nav, Cart, & Profile layout states
  const [currentView, setCurrentView] = useState<'home' | 'about'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<UserState>({
    isLoggedIn: false,
    name: '',
    email: '',
  });

  const statusLogs = [
    'Aligning local neural core...',
    'Calibrating haptic resonance sensors...',
    'Winding maple & ceramic joint guides...',
    'Stabilizing breathing frequency...',
    'AURA is peaceful and ready.',
  ];

  // 1. Scroll Position Tracker (Scroll progress indicator)
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrolled = (window.scrollY / docHeight) * 100;
        setScrollProgress(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Immersive Progressive Loading Simulation
  useEffect(() => {
    if (!logoIntro) return;

    let currentProgress = 0;
    const interval = setInterval(() => {
      // Simulate natural progressive hardware-boot speeds
      const increment = Math.floor(Math.random() * 8) + 4;
      currentProgress = Math.min(currentProgress + increment, 100);
      setLoadingProgress(currentProgress);

      // Transition the narrative logs based on current progress
      if (currentProgress < 25) {
        setActiveLogIndex(0);
      } else if (currentProgress < 50) {
        setActiveLogIndex(1);
      } else if (currentProgress < 75) {
        setActiveLogIndex(2);
      } else if (currentProgress < 100) {
        setActiveLogIndex(3);
      } else {
        setActiveLogIndex(4);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [logoIntro]);

  const handleAwaken = () => {
    setIntroTransitioned(true);
    // Slight timeout for transition click feedback wave
    setTimeout(() => {
      setLogoIntro(false);
    }, 600);
  };

  const handleOpenReserve = (edition?: Edition) => {
    if (edition) {
      setSelectedEdition(edition);
    } else {
      setSelectedEdition(null);
    }
    setIsReserveOpen(true);
  };

  const handleScrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart & Basket callbacks
  const handleAddToBasket = (edition: Edition, engraving: string, breathPref: string) => {
    const newItem: CartItem = {
      edition,
      quantity: 1,
      engraving,
      frequency: breathPref,
    };
    setCart((prev) => [...prev, newItem]);
    // Gently auto-open cart so the addition is confirmed visually
    setTimeout(() => {
      setIsCartOpen(true);
    }, 300);
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleCheckout = () => {
    if (!user.isLoggedIn) {
      // Prompt credentials first
      setIsProfileOpen(true);
    } else {
      // User is logged in, link the first cart item as active adopted companion!
      if (cart.length > 0) {
        const primaryAdopted = cart[0];
        setUser((prev) => ({
          ...prev,
          companionStatus: {
            assignedId: `AURA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            editionName: primaryAdopted.edition.name,
            heartbeatSync: Number(primaryAdopted.frequency) === 4.5 ? 65 : 55,
            batteryLevel: 100,
            status: 'serene',
          },
        }));
      }
      setCart([]);
      setIsProfileOpen(true);
    }
  };

  // Profile Login & Logout callbacks
  const handleLogin = (name: string, email: string) => {
    setUser({
      isLoggedIn: true,
      name,
      email,
      companionStatus: {
        assignedId: 'AURA-X-9081',
        editionName: 'Satin Clay Alpha Node',
        heartbeatSync: 60,
        batteryLevel: 94,
        status: 'serene',
      },
    });
    setIsProfileOpen(false);

    // If there is anything in the cart, trigger auto-reserve allocation checkout linking!
    if (cart.length > 0) {
      setTimeout(() => {
        // Redo checkout process under active session
        const primaryAdopted = cart[0];
        setUser((prev) => ({
          ...prev,
          companionStatus: {
            assignedId: `AURA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            editionName: primaryAdopted.edition.name,
            heartbeatSync: Number(primaryAdopted.frequency) === 4.5 ? 65 : 55,
            batteryLevel: 100,
            status: 'serene',
          },
        }));
        setCart([]);
        setIsProfileOpen(true);
      }, 500);
    }
  };

  const handleLogout = () => {
    setUser({
      isLoggedIn: false,
      name: '',
      email: '',
    });
  };

  return (
    <div className="relative min-h-screen bg-oatmeal overflow-x-hidden select-none">
      {/* Scroll Progress Indicator Bar at the very top of viewports */}
      <div 
        id="scroll-progress-bar"
        className="fixed top-0 left-0 w-full h-[4px] bg-[#E5DEDB]/40 z-[100] pointer-events-none"
      >
        <div 
          className="h-full bg-sage transition-all duration-150 ease-out shadow-xs" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        {logoIntro ? (
          /* High-Fidelity Luxurious, Animated Intro Screen (Looi style) */
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-100 bg-oatmeal flex flex-col justify-center items-center text-center px-6 overflow-hidden"
          >
            {/* Visual background ambient circles for organic feeling */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-sage/5 blur-3xl pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="space-y-12 max-w-md w-full relative z-10 flex flex-col items-center"
            >
              {/* Giant pulsing architectural aura logo circle */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                {/* Simulated circular progress ring */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="72"
                    stroke="#E5DEDB"
                    strokeWidth="1.5"
                    fill="transparent"
                    className="opacity-45"
                  />
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="72"
                    stroke="#A3B19B"
                    strokeWidth="2"
                    fill="transparent"
                    strokeDasharray={452}
                    strokeDashoffset={452 - (452 * loadingProgress) / 100}
                    className="transition-all duration-300 ease-out"
                  />
                </svg>

                {/* Inner breathing orb representing Aura's center heart */}
                <AnimatePresence mode="wait">
                  {loadingProgress < 100 ? (
                    <motion.div
                      key="loader-percent"
                      className="text-lg font-mono tracking-widest text-[#4A4A4A] font-light"
                    >
                      {loadingProgress}%
                    </motion.div>
                  ) : (
                    <motion.button
                      key="awaken-btn"
                      id="intro-awaken-trigger"
                      onClick={handleAwaken}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                      transition={{ 
                        scale: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
                        opacity: { duration: 0.5 }
                      }}
                      className="w-24 h-24 rounded-full bg-sage text-white flex flex-col justify-center items-center cursor-pointer shadow-lg hover:shadow-xl hover:bg-sage-dark transition-all duration-500 group border border-white/20"
                    >
                      <Power size={22} className="group-hover:rotate-12 transition-transform mb-1" />
                      <span className="text-[9px] uppercase tracking-widest font-mono font-bold">Awaken</span>
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Micro Ripple Wave on trigger click */}
                {introTransitioned && (
                  <motion.div
                    initial={{ scale: 0.6, opacity: 1 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="absolute w-32 h-32 rounded-full border-2 border-sage z-0 pointer-events-none"
                  />
                )}
              </div>

              {/* Title & Logs narratives */}
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-display font-light tracking-[0.4em] text-charcoal leading-none">
                  AURA
                </h2>
                <div className="h-[1px] w-28 bg-sage/35 mx-auto" />
                
                {/* Sliding log feedback representing boot mechanics */}
                <div className="h-6 overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeLogIndex}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 0.8, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="text-[10px] sm:text-xs tracking-widest font-mono text-sage-dark uppercase text-center"
                    >
                      {statusLogs[activeLogIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* Custom micro interaction label */}
              {loadingProgress === 100 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-[9px] font-mono text-charcoal-light uppercase tracking-widest pointer-events-none"
                >
                  [ Press button to establish tactile link ]
                </motion.span>
              )}
            </motion.div>
          </motion.div>
        ) : (
          /* Core Page Structure */
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col min-h-screen"
          >
            {/* Header / Navbar */}
            <Navbar
              onReserveClick={() => handleOpenReserve()}
              onExploreClick={() => handleScrollToSection('companions')}
              onStoryClick={() => handleScrollToSection('story')}
              onAboutClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              onCartClick={() => setIsCartOpen(true)}
              onProfileClick={() => setIsProfileOpen(true)}
              cartSize={cart.length}
              userLoggedIn={user.isLoggedIn}
              currentView={currentView}
              onViewChange={(view) => setCurrentView(view)}
            />

            {/* Page Sections */}
            <main className="flex-1 pt-16">
              <AnimatePresence mode="wait">
                {currentView === 'home' ? (
                  <motion.div
                    key="home-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* 1. Hero Experience (Full height) */}
                    <Hero onMeetCompanionClick={() => handleScrollToSection('interactive-sand')} />

                    {/* 2. Storytelling & Scenarios (Split structure) */}
                    <Story />

                    {/* 3. High-Fidelity Interactive Sandbox */}
                    <InteractiveSandbox />

                    {/* 4. Elegant Collections Grid (Editions) */}
                    <Editions onSelectEdition={(edition) => handleOpenReserve(edition)} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="about-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5 }}
                  >
                    <AboutUs />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* Footer Workspace */}
            <Footer />

            {/* Config & Adoption Side Panel / Modal Sheet */}
            <ReserveModal
              isOpen={isReserveOpen}
              onClose={() => setIsReserveOpen(false)}
              preSelectedEdition={selectedEdition}
              onAddToBasket={handleAddToBasket}
            />

            {/* Basket Cart Drawer */}
            <CartDrawer
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              cart={cart}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
            />

            {/* User Dashboard & Link profile */}
            <UserLoginModal
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
              user={user}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

