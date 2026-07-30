import React from 'react';
import { motion } from 'motion/react';
import { Flame, ShieldCheck, Heart, Award, Utensils, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

import neonSignImg from '../assets/images/yo_burger_neon_hero_1785284479784.jpg';
import chalkboardImg from '../assets/images/yo_burger_club_sandwich_1785284512093.jpg';
import diningImg from '../assets/images/yo_burger_ambiance_1785284537438.jpg';
import burgerOutdoorImg from '../assets/images/yo_burger_gourmet_burger_1785284522971.jpg';

export const AboutSection: React.FC = () => {
  const storySteps = [
    {
      step: "01",
      title: "The Neon Glow Manifesto",
      subtitle: "Lighting up Adama's Nightlife",
      description: "Born out of a passionate obsession with gourmet comfort food, Yo Burger & Restaurant opened its doors in Adama, Ethiopia, to create a sanctuary where energetic music, vibrant neon lights, and extraordinary food collide.",
      image: neonSignImg,
      badge: "In-Store Atmosphere"
    },
    {
      step: "02",
      title: "Our Way, Not McDonald's Way",
      subtitle: "100% Ethiopian Beef & House Craft",
      description: "We strictly reject generic, mass-produced fast food. Every single patty is hand-ground daily from prime Ethiopian beef, seasoned with artisanal Habesha herbs, flame-seared on high heat, and served on warm bakery-fresh brioche.",
      image: chalkboardImg,
      badge: "Artisanal Craftsmanship"
    },
    {
      step: "03",
      title: "Ethiopian Fusion Pioneers",
      subtitle: "Where Tradition Meets Innovation",
      description: "From our signature egg-topped fusion pizzas to berbere-infused pasta reductions and spicy wraps, we craft unique flavor profiles that honor traditional Ethiopian culinary heritage with a modern urban twist.",
      image: diningImg,
      badge: "Adama Original"
    },
    {
      step: "04",
      title: "Taste is Everything",
      subtitle: "Community & Late-Night Vibes",
      description: "Whether you're dining under our warm wood booths or relaxing on our balcony terrace over cold drinks and fries, Yo Burger is designed to feel alive, welcoming, and unforgettable every single night.",
      image: burgerOutdoorImg,
      badge: "The Full Experience"
    }
  ];

  return (
    <section id="about" className="relative py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/30">
            <Award className="w-4 h-4 text-[#F5A623]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">
              The Yo Burger Story
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-wide uppercase text-white">
            WE CRAFT BURGERS <span className="text-[#FFB020]">WITH SOUL</span>
          </h2>

          <p className="text-sm sm:text-base text-[#F2ECE4]/80">
            More than a restaurant — an energetic late-night sanctuary in the heart of Adama.
          </p>
        </div>

        {/* Clean Pull-Quote Box */}
        <div
          className="relative rounded-3xl bg-[#0A0A0A] border border-white/15 p-8 sm:p-12 text-center space-y-5 overflow-hidden shadow-xl"
        >
          <div className="inline-block bg-[#E63324]/20 text-[#E63324] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-[#E63324]/30">
            Our Kitchen Philosophy
          </div>

          <blockquote className="font-chalk text-2xl sm:text-4xl lg:text-5xl text-white tracking-wide leading-snug">
            "{RESTAURANT_INFO.quote}"
          </blockquote>

          <div className="flex items-center justify-center gap-2 text-[#F5A623] text-xs sm:text-sm font-semibold pt-1">
            <Star className="w-4 h-4 fill-[#F5A623]" />
            <span>Adama, Ethiopia • Est. Premium Quality</span>
            <Star className="w-4 h-4 fill-[#F5A623]" />
          </div>
        </div>

        {/* Vertical Storytelling Sequence with Alternating Slides */}
        <div className="space-y-16 sm:space-y-24">
          {storySteps.map((step, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={step.step}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`lg:col-span-6 space-y-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono-price text-3xl sm:text-4xl font-extrabold text-[#E63324] neon-text-red">
                      {step.step}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#F5A623] bg-[#F5A623]/10 px-3 py-1 rounded-full border border-[#F5A623]/30">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wide">
                    {step.title}
                  </h3>

                  <p className="text-sm font-semibold text-[#F5A623] uppercase tracking-wider">
                    {step.subtitle}
                  </p>

                  <p className="text-base text-[#F2ECE4]/80 leading-relaxed font-light">
                    {step.description}
                  </p>
                </motion.div>

                {/* Photo Card */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)] group">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-80 sm:h-96 object-cover transform transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/10">
          <div className="p-6 bento-item space-y-3">
            <Utensils className="w-8 h-8 text-[#E63324]" />
            <h4 className="text-xl font-display text-white">Always Fresh Beef</h4>
            <p className="text-xs text-[#F2ECE4]/70">Zero frozen imported patties. 100% locally sourced premium Ethiopian beef.</p>
          </div>

          <div className="p-6 bento-item space-y-3">
            <ShieldCheck className="w-8 h-8 text-[#F5A623]" />
            <h4 className="text-xl font-display text-white">Hygiene Certified</h4>
            <p className="text-xs text-[#F2ECE4]/70">Pristine open kitchen standards with strict temperature & cleanliness protocols.</p>
          </div>

          <div className="p-6 bento-item space-y-3">
            <Heart className="w-8 h-8 text-[#E63324]" />
            <h4 className="text-xl font-display text-white">Adama Late-Night Spot</h4>
            <p className="text-xs text-[#F2ECE4]/70">Open until 11:30 PM daily for your midnight cravings and gatherings.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
