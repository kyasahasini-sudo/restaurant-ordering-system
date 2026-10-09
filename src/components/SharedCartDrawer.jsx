import React, { useState } from 'react';
import { 
  ShoppingBag, X, Plus, Minus, Trash2, MessageSquare, 
  Split, ArrowRight, Sparkles, AlertCircle 
} from 'lucide-react';
import { 
  updateCartItemQuantity, 
  updateCartItemNotes, 
  removeCartItem, 
  clearCart 
} from '../services/tableSync.js';

export default function SharedCartDrawer({ 
  isOpen, 
  onClose, 
  state, 
  onOpenSplitBill, 
  onOpenCheckout 
}) {
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [tempNotes, setTempNotes] = useState('');

  if (!isOpen) return null;

  const cart = state.cart || [];
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Number((subtotal * 0.085).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  const handleStartEditNotes = (item) => {
    setEditingNotesId(item.id);
    setTempNotes(item.notes || '');
  };

  const handleSaveNotes = (itemId) => {
    updateCartItemNotes(itemId, tempNotes);
    setEditingNotesId(null);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <div className="w-full max-w-md bg-cream-50 dark:bg-charcoal-900 border-l border-cream-300 dark:border-charcoal-800 h-full flex flex-col shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="p-5 bg-cream-100 dark:bg-charcoal-800 border-b border-cream-200 dark:border-charcoal-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-terracotta-600 text-white flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="cart-drawer-title" className="text-lg font-serif font-bold text-charcoal-900 dark:text-cream-100">
                  Shared Table Cart
                </h3>
                <span className="text-xs bg-terracotta-100 dark:bg-terracotta-900/60 text-terracotta-700 dark:text-terracotta-300 font-bold px-2 py-0.5 rounded-full">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)} items
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {state.table?.id || 'Table 7'} • Real-time across all friends
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-cream-200 dark:hover:bg-charcoal-700 text-stone-600 dark:text-stone-400 transition"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live sync banner */}
        <div className="bg-sage-50 dark:bg-sage-950/40 px-4 py-2 border-b border-sage-200 dark:border-sage-800/40 flex items-center justify-between text-xs text-sage-800 dark:text-sage-300">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live sync active across table tabs
          </span>
          {cart.length > 0 && (
            <button
              onClick={() => clearCart()}
              className="text-stone-400 hover:text-red-600 transition"
              title="Clear all items"
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500 dark:text-stone-400">
              <div className="w-16 h-16 rounded-full bg-cream-200 dark:bg-charcoal-800 flex items-center justify-center mb-3">
                <ShoppingBag className="w-8 h-8 text-stone-400" />
              </div>
              <p className="font-serif text-lg font-bold text-charcoal-900 dark:text-cream-200">
                The Table Cart is Empty
              </p>
              <p className="text-xs mt-1 max-w-xs">
                Explore our starters, wood-fired mains, and drinks. Dishes added by any table member appear here instantly.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-charcoal-800/90 border border-cream-200 dark:border-charcoal-700 rounded-2xl p-3.5 shadow-sm space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-charcoal-900 dark:text-cream-100 truncate">
                      {item.name}
                    </h4>
                    {/* Added By attribution badge */}
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        className="w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center shrink-0"
                        style={{ backgroundColor: item.addedBy?.color || '#C85A32' }}
                      >
                        {item.addedBy?.name ? item.addedBy.name[0].toUpperCase() : 'U'}
                      </span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400">
                        Added by <strong className="font-semibold text-charcoal-800 dark:text-cream-200">{item.addedBy?.name || 'Table Guest'}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold font-serif text-terracotta-700 dark:text-terracotta-400">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <p className="text-[10px] text-stone-400">
                      ${item.price} each
                    </p>
                  </div>
                </div>

                {/* Special Instructions note */}
                {editingNotesId === item.id ? (
                  <div className="mt-2 pt-2 border-t border-cream-100 dark:border-charcoal-700/80">
                    <input
                      type="text"
                      placeholder="e.g. Extra sauce, no onions, well done..."
                      value={tempNotes}
                      onChange={(e) => setTempNotes(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-cream-300 dark:border-charcoal-600 bg-cream-50 dark:bg-charcoal-900 text-charcoal-900 dark:text-cream-100 focus:outline-none focus:border-terracotta-500"
                    />
                    <div className="flex justify-end gap-1.5 mt-1.5">
                      <button
                        onClick={() => setEditingNotesId(null)}
                        className="text-[10px] px-2 py-0.5 rounded text-stone-500 hover:bg-stone-100 dark:hover:bg-charcoal-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveNotes(item.id)}
                        className="text-[10px] px-2 py-0.5 rounded bg-terracotta-600 text-white font-semibold"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                    {item.notes ? (
                      <span className="italic text-terracotta-700 dark:text-terracotta-300 bg-terracotta-50 dark:bg-terracotta-950/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        "{item.notes}"
                      </span>
                    ) : (
                      <button
                        onClick={() => handleStartEditNotes(item)}
                        className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 flex items-center gap-1 hover:underline"
                      >
                        <MessageSquare className="w-3 h-3" />
                        + Add kitchen note
                      </button>
                    )}
                    {item.notes && (
                      <button
                        onClick={() => handleStartEditNotes(item)}
                        className="text-[10px] text-stone-400 hover:text-terracotta-600"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                )}

                {/* Quantity Controls and Remove */}
                <div className="flex items-center justify-between pt-2 border-t border-cream-100 dark:border-charcoal-700/80">
                  <button
                    onClick={() => removeCartItem(item.id)}
                    className="p-1 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2 bg-cream-100 dark:bg-charcoal-700/80 rounded-xl px-2 py-1">
                    <button
                      onClick={() => updateCartItemQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-lg bg-white dark:bg-charcoal-800 text-stone-700 dark:text-cream-200 flex items-center justify-center hover:bg-cream-200 transition shadow-xs text-xs font-bold"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center text-charcoal-900 dark:text-cream-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartItemQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-lg bg-white dark:bg-charcoal-800 text-stone-700 dark:text-cream-200 flex items-center justify-center hover:bg-cream-200 transition shadow-xs text-xs font-bold"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Totals and Actions */}
        {cart.length > 0 && (
          <div className="p-4 bg-cream-100 dark:bg-charcoal-800/90 border-t border-cream-300 dark:border-charcoal-700 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Estimated Tax (8.5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-charcoal-900 dark:text-cream-100 pt-1 border-t border-cream-200 dark:border-charcoal-700">
                <span>Estimated Total</span>
                <span className="font-serif text-base text-terracotta-700 dark:text-terracotta-400">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Split Bill & Checkout Buttons */}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSplitBill();
                }}
                className="flex-1 py-3 px-3 rounded-xl border border-terracotta-400 bg-white dark:bg-charcoal-800 text-terracotta-700 dark:text-terracotta-400 hover:bg-terracotta-50 dark:hover:bg-terracotta-950/40 text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <Split className="w-4 h-4" />
                Split the Bill
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="flex-1 py-3 px-3 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-md"
              >
                Checkout (${total.toFixed(2)})
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
