import React, { useState } from 'react';
import { ShoppingBag, Calendar, Menu as MenuIcon, X } from 'lucide-react';
import { CartItem } from '../types/cafe';

interface HeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItems,
  onOpenCart,
  onOpenReservation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 hover:text-stone-700 transition-colors"
          >
            L'Atelier Café
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
            <button
              onClick={() => scrollToSection('menu')}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              Artisan Menu
            </button>
            <button
              onClick={() => scrollToSection('roastery')}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              Roastery & Sourcing
            </button>
            <button
              onClick={() => scrollToSection('brew-guide')}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              Brew Calculator
            </button>
            <button
              onClick={() => scrollToSection('reservations')}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              Table Reservations
            </button>
            <button
              onClick={() => scrollToSection('locations')}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              Locations & Hours
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors border border-stone-300/80 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-stone-600" />
              <span>Reserve Table</span>
            </button>

            <button
              onClick={onOpenCart}
              aria-label={`Shopping bag with ${totalItemCount} items`}
              className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors cursor-pointer shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Order Bag</span>
              <span className="tabular-nums font-mono font-medium text-stone-300">
                ({totalItemCount})
              </span>
              {cartSubtotal > 0 && (
                <span className="hidden lg:inline text-stone-300 font-mono tabular-nums text-xs border-l border-stone-700 pl-2">
                  ${cartSubtotal.toFixed(2)}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-950 rounded-md hover:bg-stone-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF8F5] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-base font-medium text-stone-800">
            <button
              onClick={() => scrollToSection('menu')}
              className="text-left py-2 hover:text-stone-950 transition-colors"
            >
              Artisan Menu
            </button>
            <button
              onClick={() => scrollToSection('roastery')}
              className="text-left py-2 hover:text-stone-950 transition-colors"
            >
              Roastery & Sourcing
            </button>
            <button
              onClick={() => scrollToSection('brew-guide')}
              className="text-left py-2 hover:text-stone-950 transition-colors"
            >
              Brew Ratio Calculator
            </button>
            <button
              onClick={() => scrollToSection('reservations')}
              className="text-left py-2 hover:text-stone-950 transition-colors"
            >
              Table Reservations
            </button>
            <button
              onClick={() => scrollToSection('locations')}
              className="text-left py-2 hover:text-stone-950 transition-colors"
            >
              Locations & Hours
            </button>
          </div>
          <div className="pt-4 border-t border-stone-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold tracking-wide uppercase text-stone-900 bg-stone-200 hover:bg-stone-300 rounded-md transition-colors text-center"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
