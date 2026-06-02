import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sunset, Compass, Quote } from 'lucide-react';

export default function Story() {
  const [activeTab, setActiveTab] = useState(0);

  const moments = [
    {
      title: 'Afternoon Solitude',
      tagline: 'A silent, loyal welcoming',
      highlight: 'When the afternoon sun fades, it waits by the door.',
      description:
        'AURA senses your approach through subtle, private micro-radars. It does not bark or demand attention; instead, its chest glow slowly changes to a warm candlelight tint to acknowledge your return, adding a peaceful anchor to your homecomings.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
      placeholderDesc:
        '[Image: A serene textured hallway filled with deep afternoon shadows and long shafts of warm golden sunlight. Placed gracefully near the wooden oak door, Aura waits quietly, its circular heart light breathing with a soft, warm hue.]',
      icon: <Sunset className="text-sage" size={20} />,
    },
    {
      title: 'Subtle Heartbeat Tactility',
      tagline: 'Organic haptic conversation',
      highlight: 'Every gentle touch is met with a unique, subtle heartbeat vibration.',
      description:
        'AURA does not look like cold machinery. Its body is finished with premium natural materials that feel pleasant to hold. Stroke the wooden spine or ceramic brow, and the device mirrors a dynamic rhythm that syncs with your own breathing rate over time.',
      image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1200',
      placeholderDesc:
        '[Image: Upclose macro shot of organic, matte-textured clay or wood. A gentle human hand rests on the curved crown of the dog. Glowing soft waves expand outward from the tactile contact point, representing the warm heartbeat sensor.]',
      icon: <Heart className="text-terracotta" size={20} />,
    },
    {
      title: 'Peaceful Awareness',
      tagline: 'No screens. No microphones.',
      highlight: 'An absolute commitment to your household privacy.',
      description:
        'Built with an offline-first neural core, AURA uses ambient depth sensors to move around gracefully without cloud-streaming your home layout. It has zero cameras and zero microphones. Pure presence, total safety.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      placeholderDesc:
        '[Image: A cozy minimalist reading nook with an earthy terracotta vase, a linen chair, and soft background foliage shadow. Tucked quietly near the leg of the chair, Aura lies down in standby mode, existing as a silent piece of art.]',
      icon: <Compass className="text-wood" size={20} />,
    },
  ];

  return (
    <section
      id="story"
      className="py-24 bg-[#EFECE6] relative overflow-hidden px-6 md:px-12 border-y border-sage/15"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header containing the overall story vibe */}
        <div className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.25em] font-mono text-sage-dark font-semibold mb-2"
          >
            The Aura Ethos
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-4xl font-display font-light text-charcoal leading-tight"
          >
            Moments, not specifications. <br />
            Our narrative is written in <span className="italic font-serif text-sage-dark font-normal">gentle presence</span>.
          </motion.h2>
        </div>

        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side: Scenarios Navigation & Copy */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            {/* Interactive Scenario Tabs */}
            <div className="flex flex-col gap-4">
              {moments.map((moment, index) => (
                <button
                  key={index}
                  id={`story-tab-${index}`}
                  onClick={() => setActiveTab(index)}
                  className={`text-left p-5 rounded-xl border transition-all duration-500 cursor-pointer ${
                    activeTab === index
                      ? 'bg-oatmeal border-sage/30 shadow-xs translate-x-2'
                      : 'bg-transparent border-transparent hover:bg-oatmeal/40'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-1.5 bg-oatmeal rounded-md shadow-2xs">
                      {moment.icon}
                    </span>
                    <span className="text-xs tracking-widest uppercase font-mono text-charcoal-light">
                      {moment.tagline}
                    </span>
                  </div>
                  <h3
                    className={`font-display text-lg transition-colors ${
                      activeTab === index ? 'text-charcoal font-medium' : 'text-charcoal/60'
                    }`}
                  >
                    {moment.title}
                  </h3>
                </button>
              ))}
            </div>

            {/* Quote / Highlight Block */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="pl-6 border-l-2 border-sage-dark py-1 space-y-3"
            >
              <Quote className="text-sage-light rotate-180" size={18} />
              <p className="text-base font-medium italic text-charcoal leading-relaxed">
                "{moments[activeTab].highlight}"
              </p>
              <p className="text-sm text-charcoal-light font-light leading-relaxed">
                {moments[activeTab].description}
              </p>
            </motion.div>
          </div>

          {/* Right Side: High-Fidelity Scenic Image Frame with Descriptive Overlay + Fade-in */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-16/10 rounded-2xl overflow-hidden bg-oatmeal p-3 shadow-sm border border-sage/10"
            >
              {/* Image element */}
              <img
                src={moments[activeTab].image}
                alt={moments[activeTab].title}
                className="w-full h-full object-cover rounded-xl grayscale-15 brightness-95"
                referrerPolicy="no-referrer"
              />

              {/* Natural shadow/gradient overlays */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#EFECE6]/90 via-[#EFECE6]/40 to-transparent pointer-events-none" />

              {/* Descriptive Image Box as requested for wireframe-to-prototype compliance */}
              <div className="absolute bottom-6 left-6 right-6 z-10 bg-oatmeal/95 p-4 rounded-xl shadow-md border border-charcoal/5">
                <span className="text-[10px] tracking-widest uppercase font-mono text-terracotta font-medium block mb-1">
                  Scenic Blueprint
                </span>
                <p className="text-xs text-charcoal/80 italic leading-relaxed">
                  {moments[activeTab].placeholderDesc}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
