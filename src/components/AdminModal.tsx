import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Plus, RotateCcw, ShieldCheck, X } from 'lucide-react';
import { MenuItem, MenuCategory } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdminMode: boolean;
  onToggleAdminMode: (enabled: boolean) => void;
  onAddNewDish: (item: MenuItem) => void;
  onResetMenu: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  isAdminMode,
  onToggleAdminMode,
  onAddNewDish,
  onResetMenu
}) => {
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // New item form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<MenuCategory>('Burgers');
  const [price, setPrice] = useState(350);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80');

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234' || pin === 'admin') {
      onToggleAdminMode(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: MenuItem = {
      id: 'yb-custom-' + Date.now(),
      name: name.trim(),
      category,
      price: Number(price),
      description: description.trim() || 'Fresh gourmet addition to Yo Burger Adama menu.',
      image: image.trim(),
      isAvailable: true,
      tags: ['New Addition']
    };

    onAddNewDish(newItem);
    setName('');
    setDescription('');
    alert('New dish added to menu successfully!');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#141414] border border-[#F5A623] rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-[0_0_50px_rgba(245,166,35,0.4)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#F5A623]" />
                <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">
                  Manager CMS & Menu Editor
                </h3>
              </div>
              <button onClick={onClose} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isAdminMode ? (
              /* PIN Unlock Screen */
              <form onSubmit={handlePinSubmit} className="space-y-4 text-center py-4">
                <div className="w-14 h-14 rounded-full bg-[#F5A623]/20 text-[#F5A623] mx-auto flex items-center justify-center border border-[#F5A623]/40">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Enter Manager PIN</h4>
                  <p className="text-xs text-[#F2ECE4]/70">Enter PIN (Default: <code className="text-[#F5A623]">1234</code>) to enable live price editing.</p>
                </div>

                <div className="max-w-xs mx-auto space-y-2">
                  <input
                    type="password"
                    maxLength={6}
                    placeholder="Enter 1234"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full text-center tracking-widest text-lg font-mono py-2.5 rounded-xl bg-[#1E1E1E] border border-white/20 text-white focus:outline-none focus:border-[#F5A623]"
                  />
                  {pinError && <p className="text-xs text-red-400">Incorrect PIN! Try 1234.</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#F5A623] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
                >
                  Unlock Admin Edit Mode
                </button>
              </form>
            ) : (
              /* Admin Manager Controls */
              <div className="space-y-6">
                <div className="p-3 rounded-xl bg-green-950/60 border border-green-500/40 text-green-300 text-xs flex items-center justify-between">
                  <span>✓ Admin Mode Active! Inline price editing enabled on menu cards.</span>
                  <button
                    onClick={() => onToggleAdminMode(false)}
                    className="text-[10px] bg-red-900/80 hover:bg-red-800 text-white px-2 py-1 rounded font-bold"
                  >
                    Lock CMS
                  </button>
                </div>

                {/* Add New Dish Form */}
                <form onSubmit={handleCreateItem} className="space-y-3 bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
                  <h4 className="text-xs font-bold text-[#F5A623] uppercase tracking-wider flex items-center gap-1.5">
                    <Plus className="w-4 h-4" /> Add New Menu Item
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Item Name (e.g. Avocado Cheeseburger)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#262626] border border-white/10 text-white text-xs placeholder-white/40"
                    />

                    <input
                      type="number"
                      required
                      placeholder="Price in ETB"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-[#262626] border border-white/10 text-white text-xs placeholder-white/40"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as MenuCategory)}
                      className="w-full px-3 py-2 rounded-lg bg-[#262626] border border-white/10 text-white text-xs"
                    >
                      <option value="Burgers">Burgers</option>
                      <option value="Ethiopian Fusion">Ethiopian Fusion</option>
                      <option value="Pizza">Pizza</option>
                      <option value="Wraps & Sandwiches">Wraps & Sandwiches</option>
                      <option value="Pasta">Pasta</option>
                      <option value="Breakfast">Breakfast</option>
                      <option value="Drinks & Shakes">Drinks & Shakes</option>
                    </select>

                    <input
                      type="url"
                      placeholder="Image URL"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#262626] border border-white/10 text-white text-xs placeholder-white/40"
                    />
                  </div>

                  <textarea
                    placeholder="Dish Description & Ingredients..."
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#262626] border border-white/10 text-white text-xs placeholder-white/40"
                  />

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[#E63324] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#F5A623] hover:text-black transition-colors"
                  >
                    Add Dish to Live Menu
                  </button>
                </form>

                {/* Reset to Original Defaults */}
                <div className="pt-2 flex justify-between items-center border-t border-white/10">
                  <span className="text-xs text-white/60">Reset menu prices to default values?</span>
                  <button
                    type="button"
                    onClick={onResetMenu}
                    className="px-3 py-1.5 rounded-lg bg-red-950 hover:bg-red-900 border border-red-500/40 text-red-300 text-xs font-bold flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset Menu
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
