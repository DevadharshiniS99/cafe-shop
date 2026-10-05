import React, { useState } from 'react';
import { CAFE_LOCATIONS } from '../data/cafeData';
import { MapPin, Phone, Clock, Wifi, Check, Copy } from 'lucide-react';

export const LocationsSection: React.FC = () => {
  const [selectedLocationId, setSelectedLocationId] = useState(CAFE_LOCATIONS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeLocation =
    CAFE_LOCATIONS.find((loc) => loc.id === selectedLocationId) || CAFE_LOCATIONS[0];

  const handleCopyAddress = (loc: (typeof CAFE_LOCATIONS)[0]) => {
    navigator.clipboard.writeText(loc.address);
    setCopiedId(loc.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <section id="locations" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#A06D3B]">
              Visit Us in Manhattan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 mt-1 [text-wrap:balance]">
              Café Bars & Roastery Outposts
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-xl">
              Two distinctive neighborhood spaces designed for quiet morning rituals, lively neighborhood conversation, and sensory coffee flights.
            </p>
          </div>

          {/* Location Switcher Segmented Control */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg">
            {CAFE_LOCATIONS.map((loc) => {
              const isActive = loc.id === selectedLocationId;
              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocationId(loc.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {loc.name.split('&')[0].trim()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Location Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 items-stretch">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-10 rounded-xl border border-stone-200 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#A06D3B]">
                  {activeLocation.neighborhood}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
                  {activeLocation.name}
                </h3>
              </div>

              {/* Address & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" />
                    Address
                  </div>
                  <p className="text-sm text-stone-800">{activeLocation.address}</p>
                  <button
                    onClick={() => handleCopyAddress(activeLocation)}
                    className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 pt-1 cursor-pointer"
                  >
                    {copiedId === activeLocation.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied to clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy address</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    <Phone className="w-3.5 h-3.5 text-stone-500" />
                    Phone & Inquiries
                  </div>
                  <p className="text-sm font-mono text-stone-800">{activeLocation.phone}</p>
                  <p className="text-xs text-stone-500 pt-1">hello@lateliercafe.com</p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  Service Hours
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  <div className="p-3 bg-white rounded border border-stone-200">
                    <span className="text-stone-500 block">Monday – Friday</span>
                    <span className="font-medium text-stone-900 mt-0.5 block">
                      {activeLocation.hours.monFri}
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded border border-stone-200">
                    <span className="text-stone-500 block">Saturday – Sunday</span>
                    <span className="font-medium text-stone-900 mt-0.5 block">
                      {activeLocation.hours.satSun}
                    </span>
                  </div>
                </div>
              </div>

              {/* Space Features */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                  Space Amenities & Atmosphere
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeLocation.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-stone-700 bg-white border border-stone-200 px-3 py-1.5 rounded-md"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Google Maps link */}
            <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500">
                Subway: N, Q, R, W at Prince St or 6 at Spring St
              </span>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  activeLocation.address
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-stone-200 hover:bg-stone-300 rounded-md transition-colors"
              >
                Open in Maps &rarr;
              </a>
            </div>

          </div>

          {/* Right Column: Architectural Atmosphere Card */}
          <div className="lg:col-span-5 bg-stone-900 text-stone-100 p-8 rounded-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-amber-200">
                The Guest Code
              </span>
              <h4 className="font-serif text-2xl font-normal text-white leading-snug">
                Designed for slow presence in a fast city.
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Whether you drop in for a quick 90-second espresso at our standing zinc counter or spend an autumn afternoon working alongside our skylight garden, our baristas craft every beverage with mindful deliberation.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-stone-800 text-xs">
              <div className="flex items-center gap-2 text-stone-300">
                <Wifi className="w-4 h-4 text-emerald-400" />
                <span>Ultra-fast fiber network for morning work (Laptops welcome until 2 PM)</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Oat, almond, and macadamia milks always steamed at zero surcharge</span>
              </div>
            </div>

            <div className="p-4 bg-stone-800/80 rounded-lg border border-stone-700 text-xs text-stone-300">
              <span className="font-semibold text-white block mb-0.5">Private Salons & Cuppings:</span>
              Our roastery mezzanine is available for private team breakfasts and weekend sensory cupping sessions. Inquire at events@lateliercafe.com.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
