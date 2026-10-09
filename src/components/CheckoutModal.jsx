import React, { useState } from 'react';
import { 
  UtensilsCrossed, Package, Clock, User, Check, 
  ArrowRight, X, AlertCircle, Sparkles 
} from 'lucide-react';
import { placeOrder } from '../services/tableSync.js';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  state, 
  presetTip = 0, 
  presetTax = 0,
  onOrderSuccess 
}) {
  const [orderType, setOrderType] = useState('dine-in'); // 'dine-in' | 'pickup'
  const [tableNumber, setTableNumber] = useState(state.table?.id || 'Table 7');
  const [pickupName, setPickupName] = useState('Alex Rivers');
  const [pickupTimeSlot, setPickupTimeSlot] = useState('Today 7:30 PM');
  const [specialKitchenNotes, setSpecialKitchenNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const cart = state.cart || [];
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = presetTax > 0 ? presetTax : Number((subtotal * 0.085).toFixed(2));
  const tip = presetTip > 0 ? presetTip : Number((subtotal * 0.18).toFixed(2));
  const grandTotal = Number((subtotal + tax + tip).toFixed(2));

  const pickupSlots = [
    'Today 7:15 PM',
    'Today 7:30 PM',
    'Today 7:45 PM',
    'Today 8:00 PM',
    'Today 8:15 PM'
  ];

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    const orderData = {
      type: orderType,
      tableId: orderType === 'dine-in' ? tableNumber : null,
      pickupInfo: orderType === 'pickup' ? { name: pickupName, timeSlot: pickupTimeSlot } : null,
      tip,
      tax,
      notes: specialKitchenNotes
    };

    const newOrder = placeOrder(orderData);
    setIsSubmitting(false);

    if (newOrder) {
      onClose();
      onOrderSuccess(newOrder);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div className="bg-cream-50 dark:bg-charcoal-900 border border-cream-300 dark:border-charcoal-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl my-6">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-cream-200 via-cream-100 to-terracotta-50 dark:from-charcoal-800 dark:via-charcoal-900 dark:to-charcoal-800 border-b border-cream-300 dark:border-charcoal-800 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-terracotta-700 dark:text-terracotta-400">Final Step</span>
            <h2 id="checkout-modal-title" className="text-2xl font-serif font-bold text-charcoal-900 dark:text-cream-100">
              Confirm Order
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-cream-300 dark:hover:bg-charcoal-800 text-stone-600 dark:text-stone-400 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleConfirmOrder} className="p-6 space-y-6">
          {/* Dining Type Selection */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setOrderType('dine-in')}
              className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 ${
                orderType === 'dine-in'
                  ? 'bg-white dark:bg-charcoal-800 border-terracotta-600 ring-2 ring-terracotta-500/20 shadow-sm'
                  : 'bg-cream-100 dark:bg-charcoal-800/60 border-cream-200 dark:border-charcoal-700 opacity-80'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                orderType === 'dine-in' ? 'bg-terracotta-600 text-white' : 'bg-cream-200 dark:bg-charcoal-700 text-stone-600'
              }`}>
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-charcoal-900 dark:text-cream-100">Dine-In Table</p>
                <p className="text-[10px] text-stone-500">{state.table?.id || 'Table 7'}</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setOrderType('pickup')}
              className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 ${
                orderType === 'pickup'
                  ? 'bg-white dark:bg-charcoal-800 border-terracotta-600 ring-2 ring-terracotta-500/20 shadow-sm'
                  : 'bg-cream-100 dark:bg-charcoal-800/60 border-cream-200 dark:border-charcoal-700 opacity-80'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                orderType === 'pickup' ? 'bg-terracotta-600 text-white' : 'bg-cream-200 dark:bg-charcoal-700 text-stone-600'
              }`}>
                <Package className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-charcoal-900 dark:text-cream-100">Artisan Pickup</p>
                <p className="text-[10px] text-stone-500">Scheduled time</p>
              </div>
            </button>
          </div>

          {/* Conditional Fields */}
          {orderType === 'dine-in' ? (
            <div className="bg-cream-100 dark:bg-charcoal-800/70 p-4 rounded-2xl border border-cream-200 dark:border-charcoal-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500 dark:text-stone-400">Assigned Table</span>
                <span className="font-serif font-bold text-sm text-charcoal-900 dark:text-cream-100">
                  {state.table?.id || 'Table 7'} ({state.table?.code})
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-300">
                <span>Table Members Ordering:</span>
                <div className="flex -space-x-1.5">
                  {state.table?.members?.map((m) => (
                    <div
                      key={m.id}
                      className="w-6 h-6 rounded-full border-2 border-white dark:border-charcoal-900 flex items-center justify-center text-[10px] font-bold text-white shadow-xs"
                      style={{ backgroundColor: m.color }}
                      title={m.name}
                    >
                      {m.name[0]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-cream-100 dark:bg-charcoal-800/70 p-4 rounded-2xl border border-cream-200 dark:border-charcoal-700 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Pickup Name
                </label>
                <input
                  type="text"
                  required
                  value={pickupName}
                  onChange={(e) => setPickupName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-cream-300 dark:border-charcoal-600 bg-white dark:bg-charcoal-900 text-xs text-charcoal-900 dark:text-cream-100 focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Pickup Time Slot
                </label>
                <select
                  value={pickupTimeSlot}
                  onChange={(e) => setPickupTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-cream-300 dark:border-charcoal-600 bg-white dark:bg-charcoal-900 text-xs text-charcoal-900 dark:text-cream-100 focus:outline-none focus:border-terracotta-500"
                >
                  {pickupSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Special Kitchen Notes */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
              General Kitchen Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Please bring drinks first, celebrating an anniversary..."
              value={specialKitchenNotes}
              onChange={(e) => setSpecialKitchenNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-xs text-charcoal-900 dark:text-cream-100 focus:outline-none focus:border-terracotta-500"
            />
          </div>

          {/* Cart Brief Summary */}
          <div className="bg-white dark:bg-charcoal-800 p-4 rounded-2xl border border-cream-200 dark:border-charcoal-700 space-y-2 text-xs">
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <span>{cart.reduce((s, i) => s + i.quantity, 0)} items in shared cart</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <span>Tax (8.5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <span>Gratuity (Tip)</span>
              <span>${tip.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-charcoal-900 dark:text-cream-100 pt-2 border-t border-cream-200 dark:border-charcoal-700">
              <span>Total Payment</span>
              <span className="font-serif text-lg text-terracotta-700 dark:text-terracotta-400">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Notice */}
          <div className="flex items-start gap-2 text-xs text-stone-500 dark:text-stone-400 bg-sage-50 dark:bg-sage-950/30 p-3 rounded-xl border border-sage-200 dark:border-sage-800/40">
            <Sparkles className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
            <span>
              Once confirmed, your order goes directly to the kitchen display and the entire table transitions to the live tracker simultaneously.
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || cart.length === 0}
            className="w-full py-3.5 px-4 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            Confirm &amp; Send to Kitchen (${grandTotal.toFixed(2)})
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
