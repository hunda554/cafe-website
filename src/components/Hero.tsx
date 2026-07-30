import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Flame, Clock, MapPin, Instagram, Sparkles, ChevronRight, Star, Zap } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import heroBg from '../assets/images/yo_burger_neon_hero_1785284479784.jpg';
import burgerImg from '../assets/images/yo_burger_gourmet_burger_1785284522971.jpg';
import pizzaImg from '../assets/images/yo_burger_fusion_pizza_1785284501474.jpg';

interface HeroProps {
  onExploreMenu: () => void;
  onOrderNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOrderNow }) => {
  // Carousel signatures for the spotlight bento card
  const signatures = [
    { title: "The Yo Double Monster", price: "480 ETB", tag: "Best Seller", image: burgerImg, desc: "Double beef patties, melted gouda & spicy secret sauce." },
    { title: "Ethiopian Fusion Pizza", price: "580 ETB", tag: "House Favorite", image: pizzaImg, desc: "Spiced minced beef, fresh herbs & Habesha blend cheese." }
  ];

  const [activeSig, setActiveSig] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSig((prev) => (prev + 1) % signatures.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [signatures.length]);

  return (
    <section id="home" className="relative pt-24 pb-12 overflow-hidden bg-[#0D0D0D] burger-pattern min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-4">
        
        {/* Top Bento Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Main Hero Highlight Bento Card (Col 7, Row 4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 bento-item p-8 sm:p-12 flex flex-col justify-between bg-gradient-to-br from-[#1A1A1A] via-[#141414] to-black min-h-[420px]"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E63324]/10 border border-[#E63324]/40 mb-6 shadow-[0_0_15px_rgba(230,51,36,0.3)]">
                <Flame className="w-4 h-4 text-[#E63324] animate-pulse" />
                <span className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-[#F5A623]">
                  Taste is Everything
                </span>
                <span className="text-white/30">•</span>
                <span className="text-xs font-bold text-white/70 uppercase tracking-widest">
                  Adama, Ethiopia
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase leading-[0.9] tracking-tight mb-4">
                <span className="block text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  UNFORGETTABLE
                </span>
                <span className="relative inline-block mt-1">
                  <span className="absolute -inset-1 bg-gradient-to-r from-[#E63324] via-[#F5A623] to-[#E63324] rounded-xl blur-sm opacity-35"></span>
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B2F] via-[#FFB020] to-[#FF8C00] font-extrabold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    FLAVORS.
                  </span>
                </span>
              </h1>

              <p className="max-w-xl text-[#F2ECE4]/85 text-xs sm:text-sm leading-relaxed mb-5 font-medium">
                Experience local Adama spice fused with flame-grilled perfection — double-monster burgers, artisanal fusion pizzas, and late-night feasts.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-black/40 border border-[#E63324]/30 text-[11px] font-bold text-[#F5A623] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#E63324]" /> Flame-Grilled Beef
                </span>
                <span className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] font-bold text-white/90 flex items-center gap-1.5">
                  🌶️ Local Ethiopian Spice Blend
                </span>
                <span className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] font-bold text-white/90 flex items-center gap-1.5">
                  🌙 Late Night Dining
                </span>
              </div>

            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOrderNow}
                className="cta-glow px-7 py-3.5 rounded-xl text-white font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
              >
                <span>Order Online Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreMenu}
                className="px-7 py-3.5 border border-white/20 rounded-xl uppercase text-xs tracking-widest font-bold hover:bg-white/10 transition-colors cursor-pointer text-white"
              >
                Explore Menu
              </button>
            </div>
          </motion.div>

          {/* Daily Special Spotlight Bento Card (Col 5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5 bento-item group min-h-[420px] flex flex-col justify-end p-6"
          >
            {/* Background Image Carousel with Overlay */}
            <div className="absolute inset-0">
              <img
                src={signatures[activeSig].image}
                alt={signatures[activeSig].title}
                className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="mono text-[#F5A623] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E63324]" /> Daily Special Spotlight
                </span>
                <span className="bg-[#E63324] text-white text-[10px] px-2.5 py-0.5 rounded font-extrabold uppercase tracking-wider shadow-[0_0_10px_#E63324]">
                  {signatures[activeSig].tag}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white tracking-wide">
                {signatures[activeSig].title}
              </h3>
              
              <p className="text-xs text-[#F2ECE4]/70 max-w-sm">
                {signatures[activeSig].desc}
              </p>

              <div className="flex items-center justify-between pt-3">
                <div className="flex items-center gap-3">
                  <span className="mono text-2xl text-[#E63324] font-extrabold font-mono-price">
                    {signatures[activeSig].price}
                  </span>
                </div>

                <div className="flex gap-1.5">
                  {signatures.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSig(idx)}
                      className={`w-2.5 h-1.5 rounded-full transition-all ${
                        idx === activeSig ? 'w-6 bg-[#F5A623]' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bento Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* Quick Order / Menu Numbers Bento Block (Col 8) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-8 bento-item p-6 border-l-4 border-[#E63324] flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="uppercase font-display font-extrabold tracking-widest text-xl text-white">
                Quick<br />Order Specials
              </h4>
              <div className="w-9 h-9 rounded-full bg-[#E63324]/20 flex items-center justify-center border border-[#E63324]/40">
                <Zap className="w-4 h-4 text-[#E63324]" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-white/80 text-xs font-medium block truncate">Yo Signature Double</span>
                <span className="mono font-bold text-[#F5A623] text-sm block">480 ETB</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-white/80 text-xs font-medium block truncate">Ethiopian Fusion Pizza</span>
                <span className="mono font-bold text-[#F5A623] text-sm block">580 ETB</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-white/80 text-xs font-medium block truncate">Habesha Club Sandwich</span>
                <span className="mono font-bold text-[#E63324] text-sm block">360 ETB</span>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-white/50 font-bold">
                ⚡ Fast Adama Delivery
              </span>
              <button
                onClick={onOrderNow}
                className="text-xs text-[#F5A623] font-bold hover:underline"
              >
                Order Now →
              </button>
            </div>
          </motion.div>

          {/* Interactive Map Jump Bento Card (Col 4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            onClick={() => {
              const el = document.getElementById('location');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="md:col-span-4 bento-item flex flex-col items-center justify-center gap-2 bg-[#F5A623] hover:bg-white text-black group cursor-pointer p-6 transition-all min-h-[180px]"
          >
            <MapPin className="w-8 h-8 text-black group-hover:scale-110 transition-transform" />
            <span className="text-black font-display font-black text-3xl leading-none uppercase tracking-wide group-hover:scale-105 transition-transform">
              MAP
            </span>
            <span className="text-black/70 text-[10px] font-extrabold uppercase tracking-widest text-center">
              Visit Us in Adama
            </span>
          </motion.div>

        </div>

        {/* Key Metrics Bento Banner (Col 12) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="bento-item p-6 bg-gradient-to-r from-[#161616] via-[#1A1A1A] to-[#161616]"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="mono text-2xl sm:text-3xl font-extrabold text-[#F5A623]">10k+</span>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-white/60 font-bold">Happy Guests</p>
            </div>
            <div className="space-y-1 border-l border-white/10">
              <span className="mono text-2xl sm:text-3xl font-extrabold text-[#E63324]">100%</span>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-white/60 font-bold">Ethiopian Beef</p>
            </div>
            <div className="space-y-1 border-l border-white/10">
              <span className="mono text-2xl sm:text-3xl font-extrabold text-white">4.9 ★</span>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-white/60 font-bold">Adama Rating</p>
            </div>
            <div className="space-y-1 border-l border-white/10">
              <span className="mono text-2xl sm:text-3xl font-extrabold text-[#F5A623]">11:30 PM</span>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-white/60 font-bold">Late Night Kitchen</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

