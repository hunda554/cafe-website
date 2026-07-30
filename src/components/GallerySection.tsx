import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Instagram, X, ChevronLeft, ChevronRight, ExternalLink, Sparkles } from 'lucide-react';
import { GALLERY_PHOTOS, RESTAURANT_INFO } from '../data/restaurantData';
import { GalleryPhoto } from '../types';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories = ['All', 'Atmosphere', 'Food', 'Neon'];

  const filteredPhotos = GALLERY_PHOTOS.filter(
    (photo) => activeFilter === 'All' || photo.category === activeFilter
  );

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section id="gallery" className="relative py-24 bg-[#0D0D0D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E63324]/10 border border-[#E63324]/30">
            <Camera className="w-4 h-4 text-[#E63324]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">
              Visual Showcase
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-wide uppercase text-white">
            INSTAGRAM & <span className="neon-text-red">GALLERY</span>
          </h2>

          <p className="text-base sm:text-lg text-[#F2ECE4]/80">
            Catch a glimpse of our glowing neon atmosphere, gourmet burgers, and dining energy.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#E63324] text-white shadow-[0_0_12px_#E63324]'
                  : 'bg-[#1A1A1A] text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Clean Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="relative rounded-2xl overflow-hidden bg-[#141414] border border-white/10 group cursor-pointer shadow-lg hover:border-[#F5A623]/60 transition-all"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[11px] font-mono text-[#F5A623] uppercase font-bold">
                  {photo.category}
                </span>
                <h3 className="text-lg font-display text-white tracking-wide font-bold">
                  {photo.title}
                </h3>
                <p className="text-xs text-[#F2ECE4]/80 line-clamp-2 mt-1 font-light">
                  {photo.caption}
                </p>
                <div className="mt-2 flex items-center text-xs text-[#E63324] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 mr-1" /> Tap to expand
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Feed Promo Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#181818] via-[#141414] to-[#181818] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-tr from-[#F5A623] to-[#E63324] text-white shadow-[0_0_20px_rgba(230,51,36,0.6)]">
              <Instagram className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-display text-white tracking-wide">
                Follow Us on Instagram
              </h3>
              <p className="text-sm text-[#F5A623] font-semibold">
                {RESTAURANT_INFO.instagram} • Adama Food Culture
              </p>
              <p className="text-xs text-[#F2ECE4]/60 mt-1">
                Tag @yo_burger_adama in your stories to get featured on our wall!
              </p>
            </div>
          </div>

          <a
            href="https://instagram.com/yo_burger_adama"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#E63324] hover:bg-[#F5A623] text-white hover:text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(230,51,36,0.5)] cursor-pointer"
          >
            <span>Visit Instagram Profile</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#141414] border border-[#E63324]/50 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(230,51,36,0.5)] flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-20 bg-black/80 hover:bg-[#E63324] text-white p-2 rounded-full border border-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Display */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[350px] md:min-h-[500px]">
                <img
                  src={filteredPhotos[selectedPhotoIndex].image}
                  alt={filteredPhotos[selectedPhotoIndex].title}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />

                {/* Left/Right Navigation Controls */}
                <button
                  onClick={prevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#F5A623] hover:text-black text-white p-3 rounded-full border border-white/20 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#F5A623] hover:text-black text-white p-3 rounded-full border border-white/20 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Sidebar Info */}
              <div className="w-full md:w-80 p-6 space-y-4 bg-[#141414] border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[#F5A623] uppercase font-bold bg-[#F5A623]/10 px-2.5 py-1 rounded-full border border-[#F5A623]/30">
                    {filteredPhotos[selectedPhotoIndex].category}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white tracking-wide">
                    {filteredPhotos[selectedPhotoIndex].title}
                  </h3>
                  <p className="text-sm text-[#F2ECE4]/80 leading-relaxed font-light">
                    {filteredPhotos[selectedPhotoIndex].caption}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                  <span>Image {selectedPhotoIndex + 1} of {filteredPhotos.length}</span>
                  <a
                    href="https://instagram.com/yo_burger_adama"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#E63324] hover:underline font-semibold"
                  >
                    View on Instagram
                  </a>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
