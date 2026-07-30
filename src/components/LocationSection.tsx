import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle, Send, Navigation, Check, Copy } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const LocationSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('2');
  const [time, setTime] = useState('19:30');
  const [submitted, setSubmitted] = useState(false);
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
    }, 4000);
  };

  const copyPlusCode = () => {
    if (RESTAURANT_INFO.plusCode) {
      navigator.clipboard.writeText(RESTAURANT_INFO.plusCode);
      setCopiedPlusCode(true);
      setTimeout(() => setCopiedPlusCode(false), 2500);
    }
  };

  return (
    <section id="location" className="relative py-24 bg-[#0D0D0D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/30">
            <MapPin className="w-4 h-4 text-[#F5A623]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">
              Adama, Oromia, Ethiopia
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-wide uppercase text-white">
            FIND US & <span className="text-[#FF3B2F]">RESERVE</span>
          </h2>

          <p className="text-sm sm:text-base text-[#F2ECE4]/75">
            Located on the main thoroughfare near Post Office in Adama. Open late for dine-in & fast delivery!
          </p>
        </div>

        {/* Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Info & Reservation Form */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bento-item space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#E63324]/10 border border-[#E63324]/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#E63324]" />
                </div>
                <h4 className="text-lg font-display text-white">Hours of Operation</h4>
                <p className="text-xs text-[#F5A623] font-mono font-bold">{RESTAURANT_INFO.hours}</p>
                <p className="text-[11px] text-white/50">Late night kitchen & bar open 7 days</p>
              </div>

              <div className="p-5 bento-item space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/30 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#F5A623]" />
                </div>
                <h4 className="text-lg font-display text-white">Address & Plus Code</h4>
                <p className="text-xs text-white/90">{RESTAURANT_INFO.address}</p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={copyPlusCode}
                    className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#F5A623]/15 border border-[#F5A623]/40 text-[#F5A623] hover:bg-[#F5A623]/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Click to copy Google Plus Code"
                  >
                    <span>{RESTAURANT_INFO.plusCode}</span>
                    {copiedPlusCode ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3 h-3 opacity-70" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="p-4 rounded-xl bg-[#1A1A1A] hover:bg-[#222222] border border-white/10 flex items-center justify-center gap-3 text-white font-bold text-xs uppercase tracking-wider transition-all hover:border-[#22C55E]/50"
              >
                <div className="w-7 h-7 rounded-full bg-[#22C55E]/20 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-[#22C55E]" />
                </div>
                <span>Call {RESTAURANT_INFO.phone}</span>
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi%20Yo%20Burger!%20I'd%20like%20to%20place%20an%20order`}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </a>
            </div>

            {/* Table Reservation Box */}
            <div className="p-6 bento-item border-[#E63324]/30 space-y-4 shadow-xl bg-[#161616]">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                  <span>Table / Booth Reservation</span>
                </h3>
                <span className="text-[11px] text-[#F5A623] font-mono font-bold bg-[#F5A623]/10 px-2 py-0.5 rounded border border-[#F5A623]/20">
                  Instant Confirmation
                </span>
              </div>

              {submitted ? (
                <div className="p-4 rounded-xl bg-green-950/80 border border-green-500/80 text-green-300 text-sm flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <div>
                    <div className="font-bold">Reservation Request Sent!</div>
                    <div className="text-xs text-green-200">Our Adama restaurant manager will confirm your table shortly via phone call.</div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-white/60 uppercase font-bold block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Abebe Bikila"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-white/60 uppercase font-bold block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+251 91 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-white/60 uppercase font-bold block mb-1">Guests</label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs focus:outline-none focus:border-[#F5A623]"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 People Booth</option>
                        <option value="4">4 People Table</option>
                        <option value="6">6+ Large Group</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-white/60 uppercase font-bold block mb-1">Preferred Time</label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#121212] border border-white/10 text-white text-xs focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#E63324] hover:bg-[#F5A623] text-white hover:text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Request Table Booking</span>
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Right Map Card */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 min-h-[440px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#121212] group flex flex-col">
              {/* Interactive Functional Google Map Embed */}
              <iframe
                title="Yo Burger Adama Map Location (G7Q5+QPG)"
                src="https://maps.google.com/maps?q=G7Q5%2BQPG%2C%20Adama%2C%20Ethiopia&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[380px] filter invert-[90%] hue-rotate-180 contrast-125 opacity-85 transition-opacity duration-300 hover:opacity-100"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Location Overlay Badge */}
              <div className="absolute top-4 left-4 right-4 bg-black/90 backdrop-blur-md p-4 rounded-xl border border-white/15 flex flex-wrap items-center justify-between gap-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E63324] flex items-center justify-center text-white shadow-[0_0_12px_#E63324] flex-shrink-0">
                    <Navigation className="w-5 h-5 animate-bounce" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Yo Burger & Restaurant</h4>
                    <p className="text-xs text-[#F5A623] font-mono font-bold">G7Q5+QPG, Adama, Ethiopia</p>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=G7Q5%2BQPG%2C+Adama%2C+Ethiopia"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-[#E63324] hover:bg-[#F5A623] text-white hover:text-black text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open Maps</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
