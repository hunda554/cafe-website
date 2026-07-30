import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu as MenuIcon, X, Phone, MapPin, Sparkles, Settings } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  cartCount,
  onOpenCart,
  onOpenAdmin
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About Story' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'location', label: 'Location & Map' },
    { id: 'order', label: 'Order Online' }
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#121212]/95 backdrop-blur-md border-b border-[#262626] py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <div onClick={() => handleNavClick('home')} className="flex items-center">
            <Logo size="md" showTagline={!isScrolled} />
          </div>

          {/* Desktop Navigation Links with animated active indicator */}
          <nav className="hidden lg:flex items-center gap-1 bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
                    isActive ? 'text-[#F5A623] neon-text-yellow' : 'text-[#F2ECE4]/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#E63324] rounded-full shadow-[0_0_10px_#E63324]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Cart, Admin, Order CTA */}
          <div className="flex items-center gap-3">
            {/* Admin Manager Button */}
            <button
              onClick={onOpenAdmin}
              title="Manager CMS Mode"
              className="p-2 text-white/70 hover:text-[#F5A623] bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors cursor-pointer"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-white bg-[#1A1A1A] hover:bg-[#262626] border border-white/15 rounded-full transition-all duration-200 cursor-pointer group hover:scale-105"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#F5A623] group-hover:text-[#E63324] transition-colors" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#E63324] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_#E63324]"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Glowing Order Now CTA Button */}
            <button
              onClick={() => handleNavClick('order')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F5A623] to-[#E63324] text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(230,51,36,0.8)] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Order Now</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-white bg-[#1A1A1A] hover:bg-[#262626] border border-white/15 rounded-lg cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-[#E63324]" /> : <MenuIcon className="w-6 h-6 text-[#F5A623]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#0D0D0D]/98 backdrop-blur-xl flex flex-col justify-between p-6 lg:hidden pt-24"
          >
            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-widest text-[#F5A623] font-bold border-b border-white/10 pb-2">
                Navigation Menu
              </div>

              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center justify-between text-left py-3 px-4 rounded-xl text-xl font-display tracking-wider transition-all ${
                      isActive
                        ? 'bg-[#E63324]/20 border border-[#E63324] text-[#F5A623] neon-text-yellow pl-6'
                        : 'text-[#F2ECE4] hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <div className="w-2.5 h-2.5 rounded-full bg-[#E63324] shadow-[0_0_8px_#E63324]" />}
                  </button>
                );
              })}
            </div>

            {/* Mobile Footer Info */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <button
                onClick={() => handleNavClick('order')}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#E63324] text-white font-bold text-lg tracking-wider uppercase text-center shadow-[0_0_20px_rgba(230,51,36,0.6)] cursor-pointer"
              >
                🔥 Order Now via WhatsApp
              </button>

              <div className="flex items-center justify-between text-xs text-[#F2ECE4]/70">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#E63324]" /> Adama, Ethiopia
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[#F5A623]" /> +251 91 123 4567
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
