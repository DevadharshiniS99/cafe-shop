import React, { useState, useMemo } from 'react';
import { MenuItem, MenuCategory } from '../types/cafe';
import { MENU_ITEMS } from '../data/cafeData';
import { Search, Plus, Eye, Check, SlidersHorizontal, Sparkles } from 'lucide-react';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

const CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: 'all', label: 'All Offerings' },
  { id: 'espresso', label: 'Espresso & Slow Drips' },
  { id: 'cold-brew', label: 'Cold Brew & Elixirs' },
  { id: 'bakery', label: 'Heirloom Bakery' },
  { id: 'kitchen', label: 'Sourdough Kitchen' },
  { id: 'beans', label: 'Whole Bean Bags' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [addedItemAnimationId, setAddedItemAnimationId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (selectedDietary !== 'all') {
        if (!item.dietary || !item.dietary.includes(selectedDietary as any)) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesNotes = item.tastingNotes?.some((note) =>
          note.toLowerCase().includes(query)
        );
        const matchesOrigin = item.origin?.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesNotes || matchesOrigin;
      }
      return true;
    });
  }, [selectedCategory, selectedDietary, searchQuery]);

  const handleQuickAddClick = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    onQuickAdd(item);
    setAddedItemAnimationId(item.id);
    setTimeout(() => {
      setAddedItemAnimationId(null);
    }, 1200);
  };

  return (
    <section id="menu" className="py-16 lg:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#A06D3B]">
              Handcrafted Everyday
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 mt-1 [text-wrap:balance]">
              The Seasonal Tasting Menu
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-xl">
              Freshly pulled double-origin espresso, slow origami pour-overs, layered French pastries, and warm hearth tartines prepared to order.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search brews, beans, notes..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 focus:border-stone-900 text-stone-800 placeholder-stone-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Controls & Filters */}
        <div className="flex flex-col gap-4 pt-6 pb-8">
          
          {/* Category Tabs (Segmented Control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Secondary Sub-filters: Dietary & Signature */}
          <div className="flex items-center gap-3 text-xs text-stone-500 overflow-x-auto">
            <span className="font-medium text-stone-700 flex items-center gap-1 shrink-0">
              <SlidersHorizontal className="w-3 h-3" />
              Filter by:
            </span>
            <button
              onClick={() => setSelectedDietary('all')}
              className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                selectedDietary === 'all'
                  ? 'text-stone-950 font-semibold underline underline-offset-4'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              All Items
            </button>
            <span className="text-stone-300">/</span>
            <button
              onClick={() => setSelectedDietary('signature')}
              className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                selectedDietary === 'signature'
                  ? 'text-stone-950 font-semibold underline underline-offset-4'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              House Signatures
            </button>
            <span className="text-stone-300">/</span>
            <button
              onClick={() => setSelectedDietary('vegan')}
              className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                selectedDietary === 'vegan'
                  ? 'text-stone-950 font-semibold underline underline-offset-4'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Plant-Based / Vegan
            </button>
            <span className="text-stone-300">/</span>
            <button
              onClick={() => setSelectedDietary('organic')}
              className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                selectedDietary === 'organic'
                  ? 'text-stone-950 font-semibold underline underline-offset-4'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Organic Single-Origin
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white border border-stone-200 rounded-lg">
            <p className="font-serif text-lg text-stone-800">No items match your search.</p>
            <p className="text-xs text-stone-500 mt-1">Try clearing your filters or changing search keywords.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDietary('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold uppercase text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const isAdded = addedItemAnimationId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="group relative flex flex-col bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-stone-400 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  {/* Lead with Imagery (65-75% height) */}
                  <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />

                    {/* Seasonal Indicator */}
                    {item.isSeasonal && (
                      <div className="absolute top-3 left-3 bg-stone-900/90 text-white text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded shadow-xs backdrop-blur-xs">
                        Seasonal Lot
                      </div>
                    )}

                    {/* View Details Quick Action Overlay */}
                    <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 text-stone-900 text-xs font-medium rounded shadow-sm">
                        <Eye className="w-3.5 h-3.5" />
                        Details & Options
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                    
                    <div>
                      {/* Quiet 1-line text kicker (Origin or Category) - Zero pill */}
                      <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                        <span className="uppercase tracking-wider text-[11px]">
                          {item.category.replace('-', ' ')}
                        </span>
                        {item.origin && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="truncate">{item.origin}</span>
                          </>
                        )}
                      </div>

                      {/* Product Name & Price Row */}
                      <div className="flex items-start justify-between gap-3 mt-1.5">
                        <h3 className="font-serif text-lg font-semibold text-stone-900 leading-snug group-hover:text-[#A06D3B] transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-mono tabular-nums text-base font-semibold text-stone-900 shrink-0">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Tasting Notes as clean unboxed metadata with separators */}
                      {item.tastingNotes && item.tastingNotes.length > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-3 pt-3 border-t border-stone-100">
                          <span className="text-stone-400 font-medium text-[11px]">Notes:</span>
                          <span className="italic text-stone-700">
                            {item.tastingNotes.join(' · ')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Row */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectItem(item);
                        }}
                        className="text-xs font-medium text-stone-600 hover:text-stone-900 underline underline-offset-2"
                      >
                        Customize Options
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleQuickAddClick(e, item)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-700 text-white'
                            : 'bg-stone-900 text-white hover:bg-stone-800'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added to Bag</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
