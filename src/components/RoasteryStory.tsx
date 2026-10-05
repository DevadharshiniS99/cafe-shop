import React from 'react';
import { Flame, Compass, Wheat, ShieldCheck } from 'lucide-react';

export const RoasteryStory: React.FC = () => {
  return (
    <section id="roastery" className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#A06D3B]">
              Direct Trade & Clean Craft
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 leading-tight [text-wrap:balance]">
              Roasted with precision. Leavened with patience.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              We founded L'Atelier with a singular commitment: never mask the origin terroir. Every green coffee lot is sourced directly from smallholder washing stations in Ethiopia, Colombia, and Guatemala at prices 2.5× above Fair Trade minimums.
            </p>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              In our adjoining bakery kitchen, stone-milled regional grains undergo a slow 48-hour cold fermentation. The result is sourdough loaves with golden blistered crusts, caramelized crumb structures, and unmatched digestibility.
            </p>

            {/* Direct Trade Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white rounded-lg border border-stone-200">
                <Flame className="w-5 h-5 text-[#A06D3B] mb-2" />
                <h4 className="font-serif text-base font-semibold text-stone-900">
                  Loring S35 Roasting
                </h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Convection air roasting preserves delicate floral aroma compounds with 80% lower greenhouse emissions.
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-stone-200">
                <Wheat className="w-5 h-5 text-[#A06D3B] mb-2" />
                <h4 className="font-serif text-base font-semibold text-stone-900">
                  Living Heirloom Starters
                </h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Our sourdough mother culture has been continuously nurtured since 2018 using 100% organic Hudson Valley rye flour.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Roastery Metrics & Transparency */}
          <div className="lg:col-span-6 bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Current Roastery Harvest Data
              </span>
              <span className="text-xs font-mono text-stone-400">BATCH 2026.Q4</span>
            </div>

            {/* Micro-Lot Row 1 */}
            <div className="space-y-1.5 pb-4 border-b border-stone-100">
              <div className="flex justify-between items-baseline">
                <h5 className="font-serif text-base font-semibold text-stone-900">
                  Ethiopia Guji Hambela G1
                </h5>
                <span className="font-mono text-xs text-emerald-700 font-medium">91.5 SCA Score</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span>Natural Process</span>
                <span aria-hidden="true">·</span>
                <span>2,100m Altitude</span>
                <span aria-hidden="true">·</span>
                <span>Heirloom Varietals</span>
              </div>
              <p className="text-xs text-stone-600 italic">
                Candied blueberry, bergamot blossoms, wildflower honey finish.
              </p>
            </div>

            {/* Micro-Lot Row 2 */}
            <div className="space-y-1.5 pb-4 border-b border-stone-100">
              <div className="flex justify-between items-baseline">
                <h5 className="font-serif text-base font-semibold text-stone-900">
                  Colombia Finca El Paraiso
                </h5>
                <span className="font-mono text-xs text-emerald-700 font-medium">89.75 SCA Score</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span>Anaerobic Thermal Shock</span>
                <span aria-hidden="true">·</span>
                <span>1,900m Altitude</span>
                <span aria-hidden="true">·</span>
                <span>Pink Bourbon</span>
              </div>
              <p className="text-xs text-stone-600 italic">
                Ripe passionfruit curd, red berries, white chocolate velvet.
              </p>
            </div>

            {/* Farmer Transparency Statement */}
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Direct Farm Equity Guarantee
              </div>
              <p>
                We publish green coffee export receipts publicly. 100% of our supply chain is trace-verified to farm GPS coordinates.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
