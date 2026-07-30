import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const directWhatsAppUrl = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi%20Yo%20Burger%20Adama!%20I'd%20like%20to%20ask%20a%20question%20or%20place%20an%20order`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-72 p-4 rounded-2xl bg-[#141414] border border-[#22C55E]/60 shadow-[0_0_30px_rgba(34,197,94,0.4)] text-left space-y-3 animate-fade-in">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-ping" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Yo Burger WhatsApp
              </span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#F2ECE4]/80 leading-relaxed">
            👋 Hi there! Want to order directly or ask about table availability in Adama? Chat with us live!
          </p>

          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Start WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact via WhatsApp"
        className="relative group p-3.5 rounded-full bg-[#22C55E] text-white shadow-[0_4px_20px_rgba(34,197,94,0.5)] hover:bg-[#16a34a] transition-all hover:scale-105 cursor-pointer flex items-center justify-center"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#22C55E]" />

        {/* Tooltip on Hover */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/90 text-[#22C55E] border border-[#22C55E]/40 px-3 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          WhatsApp Order & Support
        </span>
      </button>
    </div>
  );
};
