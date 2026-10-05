import React, { useMemo } from 'react';
import { HERO_IMAGE } from '../data/cafeData';
import { Clock, MapPin, ArrowDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onReserveTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onReserveTable }) => {
  // Compute open status based on current time
  const storeStatus = useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTimeInMinutes = hours * 60 + minutes;

    // Weekend (Sat=6, Sun=0) 7:30 AM (450m) - 8:00 PM (1200m)
    // Weekday 6:30 AM (390m) - 7:00 PM (1140m)
    const isWeekend = day === 0 || day === 6;
    const openTime = isWeekend ? 7 * 60 + 30 : 6 * 60 + 30;
    const closeTime = isWeekend ? 20 * 60 : 19 * 60;

    const isOpen = currentTimeInMinutes >= openTime && currentTimeInMinutes <= closeTime;

    return {
      isOpen,
      todayHours: isWeekend ? '7:30 AM – 8:00 PM' : '6:30 AM – 7:00 PM',
      closingText: isWeekend ? '8:00 PM' : '7:00 PM',
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Status & Location Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-stone-200/80 text-xs text-stone-600">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span
                className={`w-2 h-2 rounded-full ${
                  storeStatus.isOpen ? 'bg-emerald-600 ring-4 ring-emerald-100' : 'bg-amber-600 ring-4 ring-amber-100'
                }`}
              />
              <span className="text-stone-900 font-semibold">
                {storeStatus.isOpen ? 'Open Now' : 'Opening Soon'}
              </span>
              <span className="text-stone-400">·</span>
              <span>Serving today until {storeStatus.closingText}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-500" />
              <span>42 Mercer St, Soho, NY</span>
            </span>
            <span className="text-stone-400">·</span>
            <span className="hidden sm:inline">Daily In-House Roasting</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-10">
          
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#A06D3B]">
                Specialty Coffee & Artisan Bakery
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-stone-900 leading-[1.12] [text-wrap:balance]">
                Where craft coffee meets the sourdough hearth.
              </h1>
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
                Single-origin micro-lots roasted slowly in small batches on our cast-iron roaster, paired with 48-hour cold-fermented laminated pastries and warm sourdough kitchen tartines.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Artisan Menu</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              
              <button
                onClick={onReserveTable}
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-[#EAE3D9] hover:bg-[#DFCDBB] rounded-md transition-colors border border-stone-300/60 cursor-pointer"
              >
                Reserve a Table
              </button>
            </div>

            {/* Quantitative Craft Pillars */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200 text-stone-800">
              <div>
                <p className="font-serif text-2xl font-semibold text-stone-900 tabular-nums">1,950m</p>
                <p className="text-xs text-stone-500 mt-0.5">High-altitude lots</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-stone-900 tabular-nums">48h</p>
                <p className="text-xs text-stone-500 mt-0.5">Cold dough ferment</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-stone-900 tabular-nums">100%</p>
                <p className="text-xs text-stone-500 mt-0.5">Direct-trade beans</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden shadow-xl aspect-16/10 bg-stone-200 border border-stone-300/40">
              <img
                src={HERO_IMAGE}
                alt="L'Atelier Café sunlit artisanal espresso bar with barista and wooden counter"
                className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white pointer-events-none">
                <div className="flex items-center gap-2 text-xs font-medium text-amber-200/90 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Soho Flagship Bar & Roastery</span>
                </div>
                <p className="font-serif text-lg sm:text-xl font-medium text-stone-100">
                  Morning light, fresh roast aromatics, and warm hearth bread.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
