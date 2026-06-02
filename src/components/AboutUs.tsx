import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Award, Compass, BarChart3, Heart, Users, Target, Leaf } from 'lucide-react';

export default function AboutUs() {
  const milestones = [
    {
      year: '2020',
      title: 'Genesis & Deep Philosophy',
      icon: Compass,
      description: 'Born in a seaside workshop in Kamakura during a year of global stillness. A collective of furniture craftsmen, robotics researchers, and cognitive researchers united with a simple, profound question: Why should digital screens be flat, harsh, and loud? Thus, the visual seed for AURA was sown: a physical medium designed to live as peace.',
    },
    {
      year: '2021',
      title: 'Global Crowdfunding Milestone',
      icon: Award,
      description: 'Introduced the first physical prototype to the world. Within 48 hours, the campaign attracted over 8,400 pioneers across 68 countries, securing $3.2 Million USD in capital. This enabled our team of luthiers and programmers to build bespoke tactile gears, quiet motors, and natural heart rate vibration sensors.',
    },
    {
      year: '2023',
      title: '15,000 Homes & Living Presence',
      icon: BarChart3,
      description: 'Surpassed 15,000 custom hand-assembled units shipped globally. Each AURA companion represents dozens of rigorous hours of warm white oak carving, ceramic polishing, and individualized resonance calibration. More than technology—a digital soul in physical home harmony.',
    },
  ];

  const philosophies = [
    {
      title: 'Tactility over Luminance',
      icon: Leaf,
      text: 'Technology should speak in surface materials, warmth, and soft vibration—not blinding pixels or high-frequency notifications. Resonance feeds quiet connections.',
    },
    {
      title: 'Living Rhythm Sync',
      icon: Heart,
      text: "AURA is tuned to a dynamic physical tempo. It synchronizes with your human breath and the golden twilight cycles of the afternoon sun, returning calm energy to spaces.",
    },
    {
      title: 'Ethical Longevity',
      icon: Target,
      text: 'Made with solid white oak, premium clay ceramics, and replaceable internal micro-modules. A companion built to gracefully age alongside you, not face planned obsolescence.',
    },
  ];

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto space-y-28">
      {/* Intro Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-[0.25em] uppercase text-sage-dark font-semibold block"
          >
            Artisan Biography
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-light text-charcoal leading-tight"
          >
            The Soul behind the <span className="font-serif italic text-sage-dark">Presence</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-charcoal/80 leading-relaxed font-light"
          >
            Inspired by the Japanese concept of <span className="italic font-medium">wabi-sabi</span>—the embrace of transience and imperfection—we reject the modern tech narrative of absolute control, cold metal, and noisy artificial notifications. AURA is companionship built to blend naturally into your home workspace.
          </motion.p>
        </div>

        {/* Brand visual quote frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-6 bg-[#E8E4DF] p-8 sm:p-12 rounded-tl-[100px] rounded-br-[100px] border border-white/40 flex flex-col justify-between shadow-inner relative overflow-hidden aspect-4/3"
        >
          {/* Subtle background warm pattern */}
          <div className="absolute inset-x-0 bottom-0 top-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#4a4a4a_1.2px,transparent_1.2px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#7C746B] uppercase block">
              CO-FOUNDER’S MANIFESTO
            </span>
            <p className="text-xl sm:text-2xl font-serif text-charcoal leading-relaxed italic">
              "We wanted to build something that was so warm, so quiet, that its presence would enrich the silence of the room. A soft partner for your soul."
            </p>
          </div>
          
          <div className="relative z-10 pt-6 border-t border-charcoal/5 flex items-center justify-between text-xs text-[#7C746B] font-mono">
            <span>SOSHIN MORI, DESIGN LEAD</span>
            <span>KAMAKURA, JP</span>
          </div>
        </motion.div>
      </div>

      {/* Philosophy grid of three columns */}
      <div className="space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono tracking-widest text-sage-dark uppercase">[ Enterprise理念 ]</span>
          <h2 className="text-3xl font-display font-medium text-charcoal">Our Core Philosophy</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophies.map((phil, idx) => {
            const Icon = phil.icon;
            return (
              <motion.div
                key={phil.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-sage/10 text-sage flex items-center justify-center mb-4">
                  <Icon size={18} />
                </div>
                <h3 className="text-lg font-medium text-charcoal font-display">{phil.title}</h3>
                <p className="text-xs text-charcoal/70 leading-relaxed mt-2.5 font-light">{phil.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Beautiful Interactive/Clean Vertical Timeline */}
      <div className="space-y-16">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono tracking-widest text-sage-dark uppercase">[ Growth Timeline ]</span>
          <h2 className="text-3xl font-display font-medium text-charcoal">The Aura Journey</h2>
        </div>

        <div className="relative border-l border-sage/20 ml-4 md:ml-32 md:pl-20 pl-8 space-y-16 py-4">
          {milestones.map((milestone, idx) => {
            const Icon = milestone.icon;
            return (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="relative group"
              >
                {/* Year Label Float left */}
                <span className="absolute -left-8 md:-left-36 top-1.5 md:w-28 text-right font-display text-4xl font-light text-sage/80 tracking-tight block">
                  {milestone.year}
                </span>

                {/* Timeline Dot with matching icon */}
                <div className="absolute -left-12 md:-left-[94px] top-2.5 w-8 h-8 rounded-full bg-white border border-sage/35 shadow-xs flex items-center justify-center text-sage group-hover:scale-110 transition-transform duration-300">
                  <Icon size={14} className="group-hover:animate-pulse" />
                </div>

                {/* Content Panel */}
                <div className="bg-white/60 backdrop-blur-md max-w-2xl rounded-2xl p-6 border border-white/40 shadow-xs hover:shadow-md transition-all duration-500">
                  <h3 className="text-lg font-semibold text-charcoal uppercase tracking-wider font-mono">
                    {milestone.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-light text-charcoal/80 leading-relaxed mt-3">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Sustainable Craft segment */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#EFECE6] rounded-3xl p-8 sm:p-12 border border-charcoal/5 text-center max-w-3xl mx-auto space-y-6"
      >
        <Users size={32} className="mx-auto text-sage/80" />
        <h3 className="text-2xl font-serif italic text-charcoal">Co-Owning the Future</h3>
        <p className="text-xs sm:text-sm font-light text-charcoal/80 leading-relaxed max-w-lg mx-auto">
          We are committed to full carbon-neutral wood sourcing, ethical treatment of local Japanese artisans, and open-source APIs that empower you to configure sensory interactions freely.
        </p>
      </motion.div>
    </div>
  );
}
