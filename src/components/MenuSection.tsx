import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Sparkles, Flame, Check, Info, Edit3, EyeOff } from 'lucide-react';
import { MenuItem, MenuCategory } from '../types';

interface MenuSectionProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem, option?: string) => void;
  isAdminMode?: boolean;
  onUpdateItem?: (updatedItem: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onAddToCart,
  isAdminMode = false,
  onUpdateItem
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDishModal, setSelectedDishModal] = useState<MenuItem | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  // Editing state for Admin Mode
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  const categories: MenuCategory[] = [
    'All',
    'Burgers',
    'Ethiopian Fusion',
    'Pizza',
    'Wraps & Sandwiches',
    'Pasta',
    'Breakfast',
    'Drinks & Shakes'
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      
      // Hide unavailable items unless in admin mode
      const matchesAvailability = isAdminMode ? true : item.isAvailable !== false;

      return matchesCategory && matchesSearch && matchesAvailability;
    });
  }, [items, selectedCategory, searchQuery, isAdminMode]);

  const handleAddClick = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
    setAddedAnimationId(item.id);
    setTimeout(() => setAddedAnimationId(null), 1200);
  };

  const openDishModal = (item: MenuItem) => {
    setSelectedDishModal(item);
    if (item.options && item.options.length > 0) {
      setSelectedOption(item.options[0]);
    } else {
      setSelectedOption('');
    }
  };

  const handleModalAdd = () => {
    if (selectedDishModal) {
      onAddToCart(selectedDishModal, selectedOption || undefined);
      setSelectedDishModal(null);
    }
  };

  const handlePriceSave = (item: MenuItem) => {
    if (onUpdateItem && tempPrice > 0) {
      onUpdateItem({ ...item, price: tempPrice });
    }
    setEditingPriceId(null);
  };

  const handleToggleStock = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUpdateItem) {
      onUpdateItem({ ...item, isAvailable: !item.isAvailable });
    }
  };

  return (
    <section id="menu" className="relative py-20 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E63324]/10 border border-[#E63324]/30">
            <Flame className="w-4 h-4 text-[#E63324]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">
              Artisanal Ethiopian Fusion & Gourmet Burgers
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-wide uppercase text-white">
            EXPLORE OUR <span className="text-[#FF3B2F]">MENU</span>
          </h2>
          
          <p className="text-sm sm:text-base text-[#F2ECE4]/80">
            Crafted fresh daily with 100% Ethiopian beef patties, house sauces, and authentic spices in Adama.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F2ECE4]/40" />
            <input
              type="text"
              placeholder="Search burgers, pizzas, wraps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-[#1A1A1A] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#F5A623] text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Smooth Inline Category Quick-Nav Pills (Non-sticky for fluid scroll) */}
        <div className="py-2 mb-8 border-y border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 max-w-7xl mx-auto">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F5A623] to-[#E63324] text-white shadow-md'
                      : 'bg-[#1A1A1A] text-[#F2ECE4]/80 border border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dish Cards Grid with Smooth Crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredItems.map((dish) => {
              const isJustAdded = addedAnimationId === dish.id;
              const isOut = dish.isAvailable === false;

              return (
                <div
                  key={dish.id}
                  onClick={() => openDishModal(dish)}
                  className={`group relative bento-item overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(230,51,36,0.3)] hover:border-[#E63324]/60 cursor-pointer ${
                    isOut ? 'opacity-60 grayscale-[40%]' : ''
                  }`}
                >
                  {/* Image Container with Gradient Overlay */}
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-black/40">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Shadow overlay gradient for smooth text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/50" />

                    {/* Tags Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      {dish.isPopular && (
                        <span className="bg-[#E63324] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-[0_0_8px_#E63324]">
                          ★ Popular
                        </span>
                      )}
                      {dish.isSpicy && (
                        <span className="bg-[#F5A623] text-black text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full">
                          🌶️ Spicy
                        </span>
                      )}
                      {isOut && (
                        <span className="bg-gray-800 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-red-500">
                          Sold Out
                        </span>
                      )}
                    </div>

                    {/* Price Monospace Tag */}
                    <div className="absolute bottom-3 right-3 z-10">
                      {isAdminMode && editingPriceId === dish.id ? (
                        <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 bg-black p-1 rounded-lg">
                          <input
                            type="number"
                            value={tempPrice}
                            onChange={(e) => setTempPrice(Number(e.target.value))}
                            className="w-20 bg-gray-900 text-yellow-400 font-mono text-sm px-2 py-1 rounded border border-yellow-500"
                          />
                          <button
                            onClick={() => handlePriceSave(dish)}
                            className="bg-green-600 text-white text-xs px-2 py-1 rounded font-bold"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          {isAdminMode && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingPriceId(dish.id);
                                setTempPrice(dish.price);
                              }}
                              className="p-1 bg-white/10 hover:bg-yellow-500 hover:text-black rounded text-white"
                              title="Edit Price"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <span className="font-mono-price font-bold text-lg text-[#F5A623] bg-black/80 px-3 py-1 rounded-lg border border-[#F5A623]/40 shadow-md">
                            {dish.price} ETB
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-display font-bold text-white group-hover:text-[#F5A623] transition-colors">
                        {dish.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#F2ECE4]/70 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>

                    {/* Category & Tags */}
                    {dish.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {dish.tags.map((t, i) => (
                          <span key={i} className="text-[10px] text-[#F2ECE4]/60 bg-white/5 px-2 py-0.5 rounded">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Bottom Action Footer */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-[#F5A623] font-semibold flex items-center gap-1">
                        <Info className="w-3.5 h-3.5" /> Tap for details
                      </span>

                      {/* Admin Quick Stock Toggle or User Add Button */}
                      {isAdminMode ? (
                        <button
                          onClick={(e) => handleToggleStock(dish, e)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer ${
                            dish.isAvailable !== false
                              ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                              : 'bg-green-500/20 text-green-400 border border-green-500/40'
                          }`}
                        >
                          <EyeOff className="w-3.5 h-3.5" />
                          {dish.isAvailable !== false ? 'Mark Out of Stock' : 'Mark Available'}
                        </button>
                      ) : (
                        <button
                          onClick={(e) => handleAddClick(dish, e)}
                          disabled={isOut}
                          className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                            isJustAdded
                              ? 'bg-green-600 text-white shadow-[0_0_10px_#22c55e]'
                              : isOut
                              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                              : 'bg-[#E63324] hover:bg-[#F5A623] text-white hover:text-black shadow-[0_0_10px_rgba(230,51,36,0.5)] hover:scale-105'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-4 h-4" /> Added!
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" /> Add
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-[#F2ECE4]/60 space-y-3">
            <p className="text-xl font-display">No items found matching "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-[#E63324] text-white rounded-lg text-sm font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Dish Detail Modal */}
      <AnimatePresence>
        {selectedDishModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDishModal(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141414] border border-[#E63324]/50 rounded-2xl max-w-lg w-full overflow-hidden shadow-[0_0_50px_rgba(230,51,36,0.4)]"
            >
              <div className="relative h-64">
                <img
                  src={selectedDishModal.image}
                  alt={selectedDishModal.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedDishModal(null)}
                  className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white p-2 rounded-full border border-white/20"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-4 font-mono-price font-bold text-2xl text-[#F5A623] bg-black/80 px-4 py-1.5 rounded-xl border border-[#F5A623]/50">
                  {selectedDishModal.price} ETB
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    {selectedDishModal.name}
                  </h3>
                  <p className="text-xs text-[#F5A623] font-semibold uppercase tracking-wider mt-1">
                    {selectedDishModal.category}
                  </p>
                </div>

                <p className="text-sm text-[#F2ECE4]/80 leading-relaxed">
                  {selectedDishModal.description}
                </p>

                {/* Option Variations */}
                {selectedDishModal.options && selectedDishModal.options.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <label className="text-xs font-bold uppercase tracking-wider text-white">
                      Select Size / Option:
                    </label>
                    <div className="flex flex-col gap-2">
                      {selectedDishModal.options.map((opt) => (
                        <label
                          key={opt}
                          onClick={() => setSelectedOption(opt)}
                          className={`flex items-center justify-between p-3 rounded-xl border text-sm cursor-pointer transition-colors ${
                            selectedOption === opt
                              ? 'border-[#F5A623] bg-[#F5A623]/10 text-[#F5A623]'
                              : 'border-white/10 text-white hover:bg-white/5'
                          }`}
                        >
                          <span>{opt}</span>
                          <input
                            type="radio"
                            name="dishOption"
                            checked={selectedOption === opt}
                            onChange={() => setSelectedOption(opt)}
                            className="accent-[#F5A623]"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedDishModal(null)}
                    className="px-4 py-2.5 text-xs uppercase font-bold text-white/70 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleModalAdd}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#E63324] text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(230,51,36,0.5)] hover:scale-105 transition-transform"
                  >
                    Add to Cart
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
