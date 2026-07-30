import React from 'react';
import { Instagram, Phone, MapPin, Clock, MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { Logo } from './Logo';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onNavClick: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-white/10 pt-16 pb-12 text-[#F2ECE4]/80 overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#E63324] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Logo size="lg" showTagline={true} />
            <p className="text-xs text-[#F2ECE4]/70 leading-relaxed font-light">
              Adama's premier late-night burger & Ethiopian fusion restaurant. Double juicy beef patties, Habesha pizzas, and glowing neon vibes.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/yo_burger_adama"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#1A1A1A] text-white hover:text-[#F5A623] hover:bg-white/10 border border-white/10 transition-colors shadow-[0_0_10px_rgba(230,51,36,0.3)]"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#1A1A1A] text-white hover:text-[#22C55E] hover:bg-white/10 border border-white/10 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-display uppercase tracking-widest text-[#F5A623] font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {['home', 'menu', 'about', 'gallery', 'reviews', 'location', 'order'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavClick(item)}
                    className="capitalize hover:text-[#E63324] transition-colors cursor-pointer"
                  >
                    {item === 'about' ? 'About Story' : item === 'order' ? 'Order Online' : item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours & Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-display uppercase tracking-widest text-[#F5A623] font-bold">
              Opening Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-4 h-4 text-[#E63324]" />
                <span>{RESTAURANT_INFO.hours}</span>
              </div>
              <p className="text-white/50 text-[11px]">Dine-in, Takeout & Delivery available across Adama.</p>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-display uppercase tracking-widest text-[#F5A623] font-bold">
              Contact & Address
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-white">
                <MapPin className="w-4 h-4 text-[#F5A623] flex-shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}, {RESTAURANT_INFO.city}</span>
              </div>
              <div className="flex items-center gap-2 text-white pt-1">
                <Phone className="w-4 h-4 text-[#22C55E]" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:underline font-mono">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="space-y-1 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Yo Burger & Restaurant, Adama. All Rights Reserved.</p>
            <p className="text-[11px] text-white/60">
              Developed by <span className="text-white font-medium">Mihreteab & Hundaol</span> at{' '}
              <a
                href="https://horizonweb.horizonweb.workers.dev/"
                target="_blank"
                rel="noreferrer"
                className="text-[#F5A623] hover:text-[#FF3B2F] font-semibold underline underline-offset-2 transition-colors"
              >
                Horizon Web Development
              </a>
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-[#F5A623] hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
