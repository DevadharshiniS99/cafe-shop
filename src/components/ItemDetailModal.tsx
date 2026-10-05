import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types/cafe';
import { X, Check, Coffee, Sparkles } from 'lucide-react';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (customizedItem: {
    menuItem: MenuItem;
    selectedMilk?: string;
    selectedSize?: string;
    selectedTemp?: string;
    selectedGrind?: string;
    specialNote?: string;
    quantity: number;
    unitPrice: number;
  }) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [selectedMilk, setSelectedMilk] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedTemp, setSelectedTemp] = useState<string>('');
  const [selectedGrind, setSelectedGrind] = useState<string>('');
  const [specialNote, setSpecialNote] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Reset states when item opens
  useEffect(() => {
    if (item) {
      setSelectedMilk(item.customization?.milks?.[0] || '');
      setSelectedSize(item.customization?.sizes?.[0]?.name || '');
      setSelectedTemp(item.customization?.temps?.[0] || '');
      setSelectedGrind(item.customization?.grinds?.[0] || '');
      setSpecialNote('');
      setQuantity(1);
    }
  }, [item]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  // Calculate unit price with size modifier
  const sizeExtra =
    item.customization?.sizes?.find((s) => s.name === selectedSize)?.extraPrice || 0;
  const unitPrice = item.price + sizeExtra;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart({
      menuItem: item,
      selectedMilk: selectedMilk || undefined,
      selectedSize: selectedSize || undefined,
      selectedTemp: selectedTemp || undefined,
      selectedGrind: selectedGrind || undefined,
      specialNote: specialNote.trim() || undefined,
      quantity,
      unitPrice,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full transition-colors cursor-pointer shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Header Image + Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {item.isSeasonal && (
                <div className="absolute top-3 left-3 bg-stone-900 text-white text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded">
                  Limited Roast
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                {item.category.replace('-', ' ')}
                {item.elevation && ` · ${item.elevation}`}
              </div>
              <h2 className="font-serif text-2xl font-semibold text-stone-900 leading-tight">
                {item.name}
              </h2>
              <div className="text-xl font-mono tabular-nums font-semibold text-stone-900">
                ${unitPrice.toFixed(2)}
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {item.description}
              </p>

              {item.origin && (
                <div className="text-xs text-stone-600 bg-stone-100 p-2.5 rounded border border-stone-200">
                  <span className="font-semibold text-stone-900">Origin Terroir: </span>
                  {item.origin}
                </div>
              )}
            </div>
          </div>

          {/* Tasting Notes */}
          {item.tastingNotes && item.tastingNotes.length > 0 && (
            <div className="bg-white p-4 rounded-lg border border-stone-200 space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A06D3B]">
                Cupping & Flavor Profile
              </span>
              <p className="text-sm font-serif italic text-stone-800">
                {item.tastingNotes.join(' · ')}
              </p>
            </div>
          )}

          {/* Customizations Section */}
          {item.customization && (
            <div className="space-y-5 pt-2 border-t border-stone-200">
              
              {/* Milk Option */}
              {item.customization.milks && item.customization.milks.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                    Choose Dairy / Plant Milk
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {item.customization.milks.map((milk) => (
                      <button
                        key={milk}
                        type="button"
                        onClick={() => setSelectedMilk(milk)}
                        className={`text-left px-3 py-2 text-xs rounded border transition-all cursor-pointer ${
                          selectedMilk === milk
                            ? 'border-stone-900 bg-stone-900 text-white font-medium'
                            : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {milk}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Option */}
              {item.customization.sizes && item.customization.sizes.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                    Cup Size
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {item.customization.sizes.map((s) => (
                      <button
                        key={s.name}
                        type="button"
                        onClick={() => setSelectedSize(s.name)}
                        className={`text-center px-3 py-2 text-xs rounded border transition-all cursor-pointer ${
                          selectedSize === s.name
                            ? 'border-stone-900 bg-stone-900 text-white font-medium'
                            : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        <div>{s.name}</div>
                        {s.extraPrice > 0 && (
                          <span className="text-[11px] opacity-80 font-mono">
                            +${s.extraPrice.toFixed(2)}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Coffee Grind Option (For Beans) */}
              {item.customization.grinds && item.customization.grinds.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                    Whole Bean or Grind Specification
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.customization.grinds.map((grind) => (
                      <button
                        key={grind}
                        type="button"
                        onClick={() => setSelectedGrind(grind)}
                        className={`text-left px-3 py-2 text-xs rounded border transition-all cursor-pointer ${
                          selectedGrind === grind
                            ? 'border-stone-900 bg-stone-900 text-white font-medium'
                            : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {grind}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Temperature Option */}
              {item.customization.temps && item.customization.temps.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                    Temperature Preparation
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {item.customization.temps.map((temp) => (
                      <button
                        key={temp}
                        type="button"
                        onClick={() => setSelectedTemp(temp)}
                        className={`text-center px-3 py-2 text-xs rounded border transition-all cursor-pointer ${
                          selectedTemp === temp
                            ? 'border-stone-900 bg-stone-900 text-white font-medium'
                            : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {temp}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Barista Notes */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
              Barista Instructions (Optional)
            </label>
            <input
              type="text"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="e.g. extra hot, half decaf, cinnamon on foam..."
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 focus:border-stone-900 text-stone-800"
              maxLength={100}
            />
          </div>

        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div className="p-4 sm:p-6 bg-white border-t border-stone-200 flex items-center justify-between gap-4">
          
          {/* Quantity Counter */}
          <div className="flex items-center border border-stone-300 rounded-md overflow-hidden bg-stone-50">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="px-3 py-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 text-sm font-semibold disabled:opacity-40 cursor-pointer"
            >
              -
            </button>
            <span className="px-4 py-2 text-xs font-mono font-semibold tabular-nums text-stone-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 text-sm font-semibold cursor-pointer"
            >
              +
            </button>
          </div>

          {/* Add to Bag CTA */}
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-all shadow-sm flex items-center justify-between cursor-pointer"
          >
            <span>Add to Order Bag</span>
            <span className="font-mono tabular-nums text-sm font-medium">
              ${totalPrice.toFixed(2)}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
};
