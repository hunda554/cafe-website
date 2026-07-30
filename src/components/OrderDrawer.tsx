import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Trash2, Plus, Minus, X, MessageCircle, CheckCircle, Smartphone, User, Phone, MapPin, FileText, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Telebirr' | 'Cash'>('Telebirr');
  const [specialNote, setSpecialNote] = useState('');
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);

  const subtotal = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);
  const deliveryFee = cart.length > 0 ? 50 : 0; // 50 ETB local Adama delivery
  const total = subtotal + deliveryFee;

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    // Trigger celebration confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Build formatted message
    let msg = `*NEW ORDER - YO BURGER ADAMA*\n\n`;
    msg += `👤 *Customer Name:* ${customerName || 'Adama Guest'}\n`;
    msg += `📞 *Phone:* ${customerPhone || 'Not provided'}\n`;
    msg += `📍 *Delivery Address:* ${deliveryAddress || 'Pick-up at Restaurant'}\n`;
    msg += `💳 *Payment Method:* ${paymentMethod}\n\n`;
    msg += `📋 *ORDER ITEMS:*\n`;

    cart.forEach((c, idx) => {
      msg += `${idx + 1}. ${c.item.name} (${c.quantity}x) - ${c.item.price * c.quantity} ETB`;
      if (c.selectedOption) msg += ` [Option: ${c.selectedOption}]`;
      msg += `\n`;
    });

    if (specialNote) {
      msg += `\n📝 *Notes:* ${specialNote}\n`;
    }

    msg += `\n───────────────\n`;
    msg += `Subtotal: ${subtotal} ETB\n`;
    msg += `Delivery Fee (Adama): ${deliveryFee} ETB\n`;
    msg += `*TOTAL AMOUNT:* ${total} ETB\n\n`;
    msg += `Thank you! Please confirm prep & delivery time.`;

    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodedMsg}`;

    window.open(whatsappUrl, '_blank');

    setIsOrderCompleted(true);
  };

  const handleCloseAndReset = () => {
    setIsOrderCompleted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#121212] border-l border-white/10 shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#181818]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#F5A623]/15 border border-[#F5A623]/30 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-[#F5A623]" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider">
                    Your Food Cart
                  </h3>
                  <p className="text-[11px] text-white/50 font-mono">
                    {cart.reduce((a, b) => a + b.quantity, 0)} items selected
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            {isOrderCompleted ? (
              <div className="p-8 text-center space-y-6 my-auto">
                <div className="w-20 h-20 rounded-full bg-[#22C55E]/15 text-[#22C55E] mx-auto flex items-center justify-center border border-[#22C55E]/40 shadow-[0_0_25px_rgba(34,197,94,0.4)]">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-display text-white">Order Sent via WhatsApp!</h4>
                  <p className="text-xs text-[#F2ECE4]/80 leading-relaxed">
                    We received your order specifications. Our Adama kitchen team will reply in WhatsApp immediately to confirm delivery.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/10 text-left text-xs space-y-2">
                  <div className="flex justify-between items-center text-[#F5A623] font-mono font-bold text-sm pb-1 border-b border-white/5">
                    <span>Total Order</span>
                    <span>{total} ETB</span>
                  </div>
                  <div className="text-white/70">Payment Method: <span className="text-white font-semibold">{paymentMethod}</span></div>
                  <div className="text-white/70">Prep & Delivery: <span className="text-white font-semibold">15–25 mins</span></div>
                </div>

                <button
                  onClick={() => {
                    onClearCart();
                    handleCloseAndReset();
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#E63324] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#F5A623] hover:text-black transition-colors cursor-pointer"
                >
                  Close & Clear Cart
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="p-8 text-center space-y-4 my-auto text-white/50">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 text-white/30" />
                </div>
                <p className="text-xl font-display text-white">Your Cart is Empty</p>
                <p className="text-xs max-w-xs mx-auto text-white/60">
                  Explore our double monster burgers, Ethiopian fusion pizzas, and wraps, then add them to your order!
                </p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                
                {/* Cart Items List */}
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/60 block">
                    Order Items
                  </span>
                  {cart.map((c, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#181818] border border-white/10 hover:border-white/20 transition-all"
                    >
                      <img
                        src={c.item.image}
                        alt={c.item.name}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-white truncate">{c.item.name}</h4>
                        {c.selectedOption && (
                          <p className="text-[10px] text-[#F5A623] font-mono">{c.selectedOption}</p>
                        )}
                        <p className="text-xs text-[#F5A623] font-mono font-bold mt-0.5">
                          {c.item.price * c.quantity} ETB
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/5">
                        <button
                          onClick={() => onUpdateQuantity(idx, -1)}
                          className="p-1 rounded hover:bg-white/10 text-white cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-white w-5 text-center">{c.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(idx, 1)}
                          className="p-1 rounded hover:bg-white/10 text-white cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="p-1 text-red-400 hover:text-red-300 ml-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery & Checkout Details Form */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5A623] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Adama Delivery Details
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] text-white/60 font-bold uppercase mb-1 block">Full Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#181818] border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#F5A623]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-white/60 font-bold uppercase mb-1 block">Phone Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          placeholder="+251 9... or 09..."
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#181818] border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#F5A623]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-white/60 font-bold uppercase mb-1 block">Delivery Location in Adama</label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="e.g. Near Post Office, Kebele 04, G7Q5+QPG"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#181818] border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#F5A623]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-white/60 font-bold uppercase mb-1 block">Special Requests / Notes</label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-white/40 absolute left-3 top-3" />
                        <textarea
                          placeholder="e.g., extra burger sauce, well done patty, no onions..."
                          rows={2}
                          value={specialNote}
                          onChange={(e) => setSpecialNote(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#181818] border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#F5A623]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[10px] font-bold uppercase text-white/70 block flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-[#F5A623]" /> Payment Method:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('Telebirr')}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          paymentMethod === 'Telebirr'
                            ? 'border-[#F5A623] bg-[#F5A623]/15 text-[#F5A623]'
                            : 'border-white/10 text-white/70 hover:bg-white/5'
                        }`}
                      >
                        <Smartphone className="w-3.5 h-3.5" /> Telebirr Mobile
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('Cash')}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          paymentMethod === 'Cash'
                            ? 'border-[#F5A623] bg-[#F5A623]/15 text-[#F5A623]'
                            : 'border-white/10 text-white/70 hover:bg-white/5'
                        }`}
                      >
                        💵 Cash on Delivery
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* Drawer Footer Total & WhatsApp Action */}
            {!isOrderCompleted && cart.length > 0 && (
              <div className="p-5 bg-[#181818] border-t border-white/10 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span className="font-mono">{subtotal} ETB</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Adama Delivery Fee</span>
                    <span className="font-mono">{deliveryFee} ETB</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                    <span>Total Amount</span>
                    <span className="font-mono-price text-[#F5A623]">{total} ETB</span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order via WhatsApp</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
