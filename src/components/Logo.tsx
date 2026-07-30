import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showTagline = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-20'
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* SVG Circular Burger + Arrow Logo Mark matching Yo Burger exactly */}
      <div className={`relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${sizeClasses[size]}`}>
        <svg
          viewBox="0 0 240 240"
          className="h-full w-auto drop-shadow-[0_0_12px_rgba(230,51,36,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Black background circle glow */}
          <circle cx="100" cy="120" r="95" fill="#0D0D0D" />

          {/* Top Yellow/Orange Ring Arch */}
          <path
            d="M 15 120 A 85 85 0 0 1 185 120"
            stroke="#F5A623"
            strokeWidth="22"
            strokeLinecap="round"
          />

          {/* Bottom Fiery Red Ring Arch with key bottom extension */}
          <path
            d="M 185 120 A 85 85 0 0 1 15 120"
            stroke="#E63324"
            strokeWidth="22"
            strokeLinecap="round"
          />
          {/* Bottom vertical stem key marker */}
          <rect x="91" y="195" width="18" height="28" rx="4" fill="#E63324" />

          {/* Directional Golden Arrow Pointing Right */}
          <path
            d="M 160 100 L 215 120 L 160 140 L 160 128 L 135 128 L 135 112 L 160 112 Z"
            fill="#F5A623"
          />

          {/* Burger Icon inside circle */}
          {/* Top Bun */}
          <path
            d="M 48 102 C 48 76, 152 76, 152 102 Z"
            fill="#F5A623"
          />
          {/* Sesame seeds */}
          <circle cx="75" cy="88" r="2" fill="#FFFFFF" opacity="0.9" />
          <circle cx="100" cy="82" r="2.2" fill="#FFFFFF" opacity="0.9" />
          <circle cx="125" cy="89" r="2" fill="#FFFFFF" opacity="0.9" />

          {/* Lettuce wavy layer */}
          <path
            d="M 45 106 Q 58 114 70 106 Q 85 114 100 106 Q 115 114 130 106 Q 145 114 155 106"
            stroke="#22C55E"
            strokeWidth="6"
            strokeLinecap="round"
           fill="none"
          />

          {/* Melted Cheese Layer */}
          <path
            d="M 46 114 L 154 114 L 140 126 L 115 118 L 90 128 L 65 118 Z"
            fill="#FACC15"
          />

          {/* Double Juicy Beef Patty */}
          <rect x="44" y="126" width="112" height="12" rx="6" fill="#6B21A8" opacity="0" />
          <rect x="44" y="125" width="112" height="14" rx="6" fill="#542618" />
          <rect x="44" y="142" width="112" height="12" rx="6" fill="#3D1A10" />

          {/* Bottom Bun */}
          <path
            d="M 48 156 C 48 168, 152 168, 152 156 Z"
            fill="#D97706"
          />
        </svg>
      </div>

      {/* Typography Wordmark */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1">
          <span className="font-display text-2xl sm:text-3xl tracking-wide neon-text-red font-bold">
            YO
          </span>
          <span className="font-display text-2xl sm:text-3xl tracking-wider neon-text-yellow font-bold ml-1">
            BURGER
          </span>
        </div>
        <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-[#F2ECE4] opacity-90 uppercase mt-0.5">
          & RESTAURANT
        </span>
        {showTagline && (
          <span className="text-[9px] font-display text-[#F5A623] tracking-[0.18em] opacity-80 mt-1 uppercase">
            @yo_burger_adama
          </span>
        )}
      </div>
    </div>
  );
};
