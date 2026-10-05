import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1613] text-stone-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Brand Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif text-2xl font-bold text-white tracking-tight">
              L'Atelier Café
            </span>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              Artisan specialty roastery, hearth sourdough bakery, and neighborhood community café based in SoHo and West Village, New York City.
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-400">
              <span>EST. 2019</span>
              <span aria-hidden="true">·</span>
              <span>Loring Eco-Roasting</span>
              <span aria-hidden="true">·</span>
              <span>100% Direct Trade</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-200">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => scrollTo('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Artisan Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('roastery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Roastery & Sourcing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('brew-guide')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Brew Ratio Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('reservations')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Book a Table
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('locations')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Manhattan Locations
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-200">
              The Roaster's Dispatch
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive notifications when rare micro-lot beans drop, seasonal hearth bakes launch, and private cupping slots open.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-stone-900 border border-stone-700 rounded text-xs text-emerald-400">
                <Check className="w-4 h-4" />
                <span>You are subscribed to the bi-weekly Roaster's Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-stone-900/90 border border-stone-700 rounded text-white placeholder-stone-500 focus:outline-none focus:border-stone-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-amber-100 hover:bg-white rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-stone-500">
              No marketing noise. Unsubscribe at any time with a single click.
            </p>
          </div>

        </div>

        {/* Bottom Legal & Operational Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            &copy; {new Date().getFullYear()} L'Atelier Café & Roastery Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Specialty Coffee Association (SCA) Member</span>
            <span aria-hidden="true">·</span>
            <span>Allergen Transparency</span>
            <span aria-hidden="true">·</span>
            <span>Privacy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
