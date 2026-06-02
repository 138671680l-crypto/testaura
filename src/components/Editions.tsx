import { motion } from 'motion/react';
import { Calendar, Layers, ShieldCheck, HeartPulse } from 'lucide-react';
import { Edition } from '../types';

interface EditionsProps {
  onSelectEdition: (edition: Edition) => void;
}

export const editionsList: Edition[] = [
  {
    id: 'desk-spirit',
    name: 'The Desk Spirit',
    tagline: 'Maple Wood Edition',
    description:
      'A compact, focusing companion. Sculpted from organic solid Canadian Maple with fine brushed-gold joints. Perfect for workspaces, helping to ground focus through silent breathing pulses.',
    material: 'Canadian Maple & Satin Brass',
    colorHex: 'text-wood',
    imageAlt: 'Slick miniature wooden robot dog posing near an open books pile',
    unsplashUrl: 'https://images.unsplash.com/photo-1544207627-2c12b704c311?auto=format&fit=crop&q=80&w=800',
    features: ['Real Wood Finish', 'In-spine Wireless Charger', 'Focus Co-breather'],
  },
  {
    id: 'home-guardian',
    name: 'The Home Guardian',
    tagline: 'Matte Ceramic Edition',
    description:
      'A serene, architectural sentinel. Features a warm matte ivory porcelain casing that handles like premium stoneware. Features extensive proximity awareness for larger living environments.',
    material: 'Stoneware Ceramic & Brushed Titanium',
    colorHex: 'text-sage-dark',
    imageAlt: 'Textured white ceramic sculpture look robotic pet sits near a large plant',
    unsplashUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800',
    features: ['Matte Stoneware Casing', 'Multi-room Radar Nodes', 'Rhythmic Heartbeats'],
  },
  {
    id: 'hearth-friend',
    name: 'The Hearth Friend',
    tagline: 'Terracotta Slate Edition',
    description:
      'A rustic, highly cozy presence. Imbued with a baked terracotta shale texture and soft raw wool accents around the touch panels. Evokes a grounding fireside warmth in cozy study rooms.',
    material: 'Baked Terracotta & Organic Virgin Wool',
    colorHex: 'text-terracotta',
    imageAlt: 'Textured earthy terracotta art object and robot dog side by side by a fireplace',
    unsplashUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    features: ['Earthy Clay Texture', 'Intense Thermal warm pads', 'Warm Hearth breathing'],
  },
];

export default function Editions({ onSelectEdition }: EditionsProps) {
  return (
    <section id="companions" className="py-24 bg-oatmeal px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] font-mono text-sage-dark font-semibold mb-2">
              Adoption Catalog
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-light text-charcoal leading-tight">
              Aura Personalities
            </h2>
            <p className="text-base font-light text-charcoal/80 mt-2">
              AURA does not come in SKUs or tech specs. Adopt the edition whose material, weight, and energetic resonance align with the rhythm of your environment.
            </p>
          </div>
          <div className="flex gap-6 text-xs text-charcoal/60 font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-sage" /> Late Autumn 2026 Batch
            </span>
            <span className="flex items-center gap-1.5">
              <Layers size={14} className="text-terracotta" /> Total 300 Certified
            </span>
          </div>
        </div>

        {/* Floating Cards Grid styled according to the Natural Tones Design instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-6">
          {editionsList.map((edition, index) => {
            // Distinct backdrop colors per Natural Tones Design specification
            const distinctBgs = ['bg-[#D4C9B9]/30', 'bg-[#A3B19B]/25', 'bg-[#4A4A4A]/10'];
            
            return (
              <motion.div
                key={edition.id}
                id={`edition-card-${edition.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ y: index === 1 ? -16 : -8 }}
                className={`flex flex-col justify-between p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm transition-all duration-500 group relative overflow-hidden ${
                  index === 1 ? 'lg:translate-y-[-10px] bg-white/85 shadow-md border-sage-light/20' : ''
                }`}
              >
                {/* Soft decorative accent background glow */}
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-sage/5 group-hover:bg-sage/10 blur-xl transition-all duration-500" />

                <div>
                  {/* Visual Image Miniature Frame with distinct Natural Tone backgrounds */}
                  <div className={`w-full aspect-4/3 rounded-xl overflow-hidden mb-6 relative border border-white/40 shadow-inner flex items-center justify-center p-3 ${distinctBgs[index]}`}>
                    <img
                      src={edition.unsplashUrl}
                      alt={edition.imageAlt}
                      className="w-full h-full object-cover rounded-lg grayscale-15 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-104 shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                    {/* Blueprint description layer */}
                    <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-xs p-3 border-t border-charcoal/5 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300">
                      <p className="text-[10px] text-charcoal/80 leading-relaxed italic text-center">
                        "{edition.imageAlt}"
                      </p>
                    </div>
                  </div>

                  {/* Typography consistent with Natural Tones design */}
                  <span className="text-[11px] font-mono tracking-widest uppercase text-sage-dark font-medium block">
                    {edition.tagline}
                  </span>
                  <h3 className="text-xl font-display font-medium text-charcoal mt-1 group-hover:text-sage-dark transition-colors">
                    {edition.name}
                  </h3>
                  <p className="text-xs font-light text-charcoal/80 mt-3 leading-relaxed">
                    {edition.description}
                  </p>

                  {/* Tactile Highlights List */}
                  <div className="mt-5 pt-5 border-t border-charcoal/5 grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-mono text-charcoal-light flex items-center gap-1">
                        <Layers size={10} /> Tactile Core
                      </span>
                      <span className="text-xs text-charcoal font-medium block">
                        {edition.material.split('&')[0].trim()}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-mono text-charcoal-light flex items-center gap-1">
                        <HeartPulse size={10} /> Sync Feature
                      </span>
                      <span className="text-xs text-charcoal font-medium block">
                        {edition.features[2]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Adoption CTA Button matching design's low-saturation soft buttons */}
                <div className="mt-8 pt-4">
                  <button
                    id={`adopt-btn-${edition.id}`}
                    onClick={() => onSelectEdition(edition)}
                    className="w-full py-3 rounded-full bg-[#F7F5F2] hover:bg-[#A3B19B] text-charcoal hover:text-white border border-[#4A4A4A]/10 hover:border-transparent font-mono text-[10px] uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-xs hover:shadow-sm"
                  >
                    Configure &amp; Adopt
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Artisan Guarantee seal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-4 bg-[#EFECE6]/50 p-6 rounded-2xl border border-charcoal/5"
        >
          <div className="p-2 rounded-full bg-oatmeal border border-sage/10 text-sage-dark">
            <ShieldCheck size={20} />
          </div>
          <p className="text-xs text-charcoal/80 font-mono tracking-wide text-center md:text-left max-w-xl leading-relaxed">
            Every Aura is handmade to order by a local material craft guild using regional timber, recycled ceramic powder, and certified non-toxic organic polymers. Fully repairable. Offline forever.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
