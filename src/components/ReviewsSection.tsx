import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquarePlus, Quote, CheckCircle2, User } from 'lucide-react';
import { REVIEWS } from '../data/restaurantData';
import { CustomerReview } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newDish, setNewDish] = useState('Yo Signature Double Monster');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: CustomerReview = {
      id: 'rev-' + Date.now(),
      author: newAuthor.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rating: newRating,
      comment: newComment.trim(),
      date: 'Just now',
      favoriteDish: newDish
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsModalOpen(false);
    setNewAuthor('');
    setNewComment('');
  };

  return (
    <section id="reviews" className="relative py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E63324]/10 border border-[#E63324]/30">
              <Star className="w-4 h-4 text-[#F5A623] fill-[#F5A623]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">
                Customer Love in Adama
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-wide uppercase text-white">
              WHAT PEOPLE <span className="text-[#FFB020]">SAY</span>
            </h2>

            <p className="text-sm sm:text-base text-[#F2ECE4]/80 max-w-xl">
              Rated 4.9/5 stars by foodies and burger lovers in Adama, Ethiopia.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3.5 rounded-xl bg-[#E63324] hover:bg-[#F5A623] text-white hover:text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Leave a Review</span>
          </button>
        </div>

        {/* Scrollable / Swipeable Cards */}
        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {reviewsList.map((review) => (
            <div
              key={review.id}
              className="flex-shrink-0 w-[290px] sm:w-[360px] bento-item p-6 space-y-4 relative flex flex-col justify-between hover:border-[#F5A623]/40"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[#E63324]/20 pointer-events-none" />

              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'text-[#F5A623] fill-[#F5A623]' : 'text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-white/50 ml-2 font-mono">{review.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#F2ECE4]/90 italic leading-relaxed font-light">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#F5A623]/50"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1">
                      {review.author}
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                    </h4>
                    <p className="text-[11px] text-[#F5A623] font-mono">
                      Fav: {review.favoriteDish}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Leave a Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141414] border border-[#E63324] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-[0_0_40px_rgba(230,51,36,0.5)]"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-display font-bold text-white">
                  Write Your Review
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white/60 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-white block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Abebe Bikila"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1E1E1E] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#F5A623] text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-white block mb-1">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating ? 'text-[#F5A623] fill-[#F5A623]' : 'text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-white block mb-1">
                    Favorite Dish
                  </label>
                  <select
                    value={newDish}
                    onChange={(e) => setNewDish(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1E1E1E] border border-white/10 text-white focus:outline-none focus:border-[#F5A623] text-sm"
                  >
                    <option value="Yo Signature Double Monster">Yo Signature Double Monster</option>
                    <option value="Adama Fire Crack Burger">Adama Fire Crack Burger</option>
                    <option value="Yo Special Ethiopian Fusion Pizza">Yo Special Ethiopian Fusion Pizza</option>
                    <option value="Gourmet Beef & Cheese Wrap Platter">Gourmet Beef & Cheese Wrap Platter</option>
                    <option value="Triple-Decker Yo Club Sandwich">Triple-Decker Yo Club Sandwich</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-white block mb-1">
                    Review Comment
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us about the juicy patties, pizza, or neon vibes..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1E1E1E] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#F5A623] text-sm"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs uppercase font-bold text-white/60 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#E63324] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-transform"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
