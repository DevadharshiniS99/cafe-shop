import React, { useState } from 'react';
import { CartItem } from '../types/cafe';
import { X, Trash2, ArrowRight, CheckCircle2, Clock, MapPin, Coffee, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'dine-in' | 'delivery'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    pickupTime: string;
    total: number;
    itemsCount: number;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const tax = subtotal * 0.08875; // NYC sales tax
  const deliveryFee = fulfillmentType === 'delivery' ? (subtotal >= 35 ? 0 : 3.5) : 0;
  const grandTotal = subtotal + tax + deliveryFee;

  const freePerkThreshold = 35;
  const progressToPerk = Math.min(100, (subtotal / freePerkThreshold) * 100);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      alert('Please enter your name for pickup order callout.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const readyDate = new Date(Date.now() + 14 * 60 * 1000);
      const timeStr = readyDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

      setConfirmedOrder({
        orderId: `ATL-${Math.floor(1000 + Math.random() * 9000)}`,
        pickupTime: timeStr,
        total: grandTotal,
        itemsCount: cartItems.reduce((acc, i) => acc + i.quantity, 0),
      });
      onClearCart();
    }, 700);
  };

  const handleReset = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/50 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-[#A06D3B]" />
            <h2 className="font-serif text-lg font-semibold text-stone-900">
              {confirmedOrder ? 'Order Confirmed' : 'Your Order Bag'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close bag drawer"
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-md hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmed Order State */}
        {confirmedOrder ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">
                Order Received · Handcrafted to Order
              </span>
              <h3 className="font-serif text-2xl font-semibold text-stone-900">
                Thank you, {customerName}!
              </h3>
              <p className="text-xs text-stone-600">
                Our barista team has queued your tickets. Freshly pulling espresso and plating baked goods now.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="bg-white p-5 rounded-lg border border-stone-200 text-left space-y-3">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-stone-100">
                <span className="text-stone-500">Order Reference</span>
                <span className="font-mono font-bold text-stone-900 text-sm">
                  #{confirmedOrder.orderId}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs pb-2 border-b border-stone-100">
                <span className="text-stone-500">Estimated Ready Time</span>
                <span className="font-medium text-emerald-700 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  ~{confirmedOrder.pickupTime} (12–15 mins)
                </span>
              </div>

              <div className="flex justify-between items-center text-xs pb-2 border-b border-stone-100">
                <span className="text-stone-500">Pickup Counter</span>
                <span className="text-stone-800 font-medium">42 Mercer St, Soho Barista Bar</span>
              </div>

              <div className="flex justify-between items-center text-xs font-semibold pt-1">
                <span className="text-stone-900">Paid Total</span>
                <span className="font-mono tabular-nums text-stone-900">
                  ${confirmedOrder.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="text-xs text-stone-500 p-3 bg-stone-100 rounded border border-stone-200">
              SMS dispatch alert will be sent to <span className="font-mono text-stone-800">{customerPhone || 'your contact'}</span> once packed.
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors"
            >
              Done & Return to Menu
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Bag State */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-stone-200/60 flex items-center justify-center text-stone-400">
              <Coffee className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-semibold text-stone-800">Your bag is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs">
                Explore our signature espresso drinks, cold brew bottles, warm croissants, or single-origin beans.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-stone-200 hover:bg-stone-300 rounded-md transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          /* Active Cart Items View */
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            
            {/* Complimentary Perk Bar */}
            <div className="bg-white p-3 rounded-lg border border-stone-200 space-y-1.5">
              <div className="flex justify-between text-[11px] font-medium text-stone-700">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#A06D3B]" />
                  {subtotal >= freePerkThreshold
                    ? 'Unlocked: Complimentary roasted drip coffee sample!'
                    : `Add $${(freePerkThreshold - subtotal).toFixed(2)} for complimentary sample`}
                </span>
                <span className="font-mono">{Math.round(progressToPerk)}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#A06D3B] transition-all duration-300"
                  style={{ width: `${progressToPerk}%` }}
                />
              </div>
            </div>

            {/* Fulfillment Selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block">
                Fulfillment Option
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-stone-200/80 p-1 rounded-md text-xs">
                <button
                  type="button"
                  onClick={() => setFulfillmentType('pickup')}
                  className={`py-1.5 px-2 rounded font-medium transition-all ${
                    fulfillmentType === 'pickup'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Pickup (~12m)
                </button>
                <button
                  type="button"
                  onClick={() => setFulfillmentType('dine-in')}
                  className={`py-1.5 px-2 rounded font-medium transition-all ${
                    fulfillmentType === 'dine-in'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Dine-In
                </button>
                <button
                  type="button"
                  onClick={() => setFulfillmentType('delivery')}
                  className={`py-1.5 px-2 rounded font-medium transition-all ${
                    fulfillmentType === 'delivery'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Courier
                </button>
              </div>
            </div>

            {/* Itemized List */}
            <div className="space-y-3 divide-y divide-stone-200/80">
              {cartItems.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex gap-3 items-start">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-14 h-14 rounded-md object-cover bg-stone-200 shrink-0 border border-stone-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-sm font-semibold text-stone-900 truncate">
                        {item.menuItem.name}
                      </h4>
                      <span className="font-mono tabular-nums text-xs font-semibold text-stone-900 shrink-0">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Unboxed Customization Options */}
                    <div className="text-[11px] text-stone-500 mt-0.5 space-x-1">
                      {item.selectedSize && <span>{item.selectedSize}</span>}
                      {item.selectedMilk && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{item.selectedMilk}</span>
                        </>
                      )}
                      {item.selectedGrind && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{item.selectedGrind}</span>
                        </>
                      )}
                      {item.selectedTemp && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{item.selectedTemp}</span>
                        </>
                      )}
                    </div>

                    {item.specialNote && (
                      <p className="text-[11px] text-stone-400 italic mt-0.5 truncate">
                        "{item.specialNote}"
                      </p>
                    )}

                    {/* Quantity Stepper & Remove */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-200 rounded bg-white">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono tabular-nums text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-red-700 p-1 transition-colors"
                        aria-label={`Remove ${item.menuItem.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Checkout Form */}
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="pt-4 border-t border-stone-200 space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block">
                Guest Information
              </span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 focus:border-stone-900 text-stone-800"
                />
                <input
                  type="tel"
                  placeholder="Mobile for SMS"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 focus:border-stone-900 text-stone-800"
                />
              </div>

              {fulfillmentType === 'dine-in' && (
                <input
                  type="text"
                  placeholder="Table Number (Optional if already seated)"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 focus:border-stone-900 text-stone-800"
                />
              )}
            </form>

          </div>
        )}

        {/* Drawer Bottom Bar */}
        {!confirmedOrder && cartItems.length > 0 && (
          <div className="p-5 bg-white border-t border-stone-200 space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-stone-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated NY Tax (8.875%)</span>
                <span className="font-mono tabular-nums text-stone-900">
                  ${tax.toFixed(2)}
                </span>
              </div>
              {fulfillmentType === 'delivery' && (
                <div className="flex justify-between">
                  <span>Courier Delivery</span>
                  <span className="font-mono tabular-nums text-stone-900">
                    {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm font-semibold text-stone-900 pt-2 border-t border-stone-100">
                <span>Estimated Total</span>
                <span className="font-mono tabular-nums">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              form="checkout-form"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Dispatching Order...</span>
              ) : (
                <>
                  <span>Place Order & Pay at Bar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-stone-400">
              Pay upon pickup via Apple Pay, contactless card, or cash.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
