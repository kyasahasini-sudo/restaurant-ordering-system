import React, { useState } from 'react';
import { 
  Split, Users, Receipt, Check, Copy, DollarSign, 
  ArrowRight, X, Percent, PieChart, ShieldCheck 
} from 'lucide-react';

export default function SplitBillModal({ isOpen, onClose, state, onProceedToCheckout }) {
  const [splitMode, setSplitMode] = useState('itemized'); // 'equal' | 'itemized'
  const [tipPercent, setTipPercent] = useState(18);
  const [customTip, setCustomTip] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);

  if (!isOpen) return null;

  const cart = state.cart || [];
  const members = state.table?.members || [
    { id: '1', name: 'You', color: '#C85A32' }
  ];

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const effectiveTipPercent = customTip !== '' ? Number(customTip) || 0 : tipPercent;
  const tipAmount = Number(((subtotal * effectiveTipPercent) / 100).toFixed(2));
  const taxAmount = Number((subtotal * 0.085).toFixed(2));
  const grandTotal = Number((subtotal + tipAmount + taxAmount).toFixed(2));

  // Equal Split Calculations
  const splitCount = Math.max(members.length, 1);
  const perPersonEqual = Number((grandTotal / splitCount).toFixed(2));

  // Itemized Split Calculations (by person)
  // 1. Group cart items by addedBy.name
  const memberBuckets = {};
  members.forEach(m => {
    memberBuckets[m.name] = {
      member: m,
      items: [],
      itemsSubtotal: 0
    };
  });

  cart.forEach(item => {
    const ownerName = item.addedBy?.name || members[0]?.name || 'Guest';
    if (!memberBuckets[ownerName]) {
      memberBuckets[ownerName] = {
        member: { name: ownerName, color: item.addedBy?.color || '#C85A32' },
        items: [],
        itemsSubtotal: 0
      };
    }
    memberBuckets[ownerName].items.push(item);
    memberBuckets[ownerName].itemsSubtotal += item.price * item.quantity;
  });

  const itemizedBreakdown = Object.values(memberBuckets).map(bucket => {
    const personItemsTotal = bucket.itemsSubtotal;
    const proportion = subtotal > 0 ? personItemsTotal / subtotal : 1 / splitCount;
    const personTax = Number((taxAmount * proportion).toFixed(2));
    const personTip = Number((tipAmount * proportion).toFixed(2));
    const personTotal = Number((personItemsTotal + personTax + personTip).toFixed(2));

    return {
      member: bucket.member,
      items: bucket.items,
      itemsSubtotal: personItemsTotal,
      tax: personTax,
      tip: personTip,
      total: personTotal
    };
  });

  const handleCopyBreakdown = () => {
    let text = `🌾 Gather & Grain — Table Bill Split (${state.table?.id || 'Table 7'})\n`;
    text += `Subtotal: $${subtotal.toFixed(2)} | Tax: $${taxAmount.toFixed(2)} | Tip (${effectiveTipPercent}%): $${tipAmount.toFixed(2)}\n`;
    text += `Grand Total: $${grandTotal.toFixed(2)}\n\n`;

    if (splitMode === 'equal') {
      text += `--- EQUAL SPLIT (${splitCount} Guests) ---\n`;
      text += `Each person pays: $${perPersonEqual.toFixed(2)}\n`;
    } else {
      text += `--- ITEMIZED SPLIT (By Person's Items) ---\n`;
      itemizedBreakdown.forEach(b => {
        text += `• ${b.member.name}: $${b.total.toFixed(2)} (Dishes: $${b.itemsSubtotal.toFixed(2)}, Tax: $${b.tax.toFixed(2)}, Tip: $${b.tip.toFixed(2)})\n`;
        b.items.forEach(i => {
          text += `    - ${i.quantity}x ${i.name} ($${(i.price * i.quantity).toFixed(2)})\n`;
        });
      });
    }

    navigator.clipboard?.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="split-bill-title"
    >
      <div className="bg-cream-50 dark:bg-charcoal-900 border border-cream-300 dark:border-charcoal-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-6">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-cream-200 via-cream-100 to-sage-50 dark:from-charcoal-800 dark:via-charcoal-900 dark:to-charcoal-800 border-b border-cream-300 dark:border-charcoal-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sage-600 text-white flex items-center justify-center shadow-md">
              <Split className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-sage-700 dark:text-sage-400">Fair &amp; Transparent</span>
              <h2 id="split-bill-title" className="text-2xl font-serif font-bold text-charcoal-900 dark:text-cream-100">
                Split the Bill
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-cream-300 dark:hover:bg-charcoal-800 text-stone-600 dark:text-stone-400 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Split Mode Toggle Tabs */}
          <div className="grid grid-cols-2 p-1.5 bg-cream-200 dark:bg-charcoal-800 rounded-2xl border border-cream-300 dark:border-charcoal-700">
            <button
              onClick={() => setSplitMode('itemized')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                splitMode === 'itemized'
                  ? 'bg-white dark:bg-charcoal-900 text-terracotta-700 dark:text-terracotta-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-cream-100'
              }`}
            >
              <PieChart className="w-4 h-4" />
              By Person's Items (Itemized)
            </button>
            <button
              onClick={() => setSplitMode('equal')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                splitMode === 'equal'
                  ? 'bg-white dark:bg-charcoal-900 text-terracotta-700 dark:text-terracotta-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-cream-100'
              }`}
            >
              <Users className="w-4 h-4" />
              Equal Split ({splitCount} Guests)
            </button>
          </div>

          {/* Tip Selector */}
          <div className="bg-white dark:bg-charcoal-800/80 p-4 rounded-2xl border border-cream-200 dark:border-charcoal-700">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-terracotta-600" />
                Select Gratuity / Tip
              </label>
              <span className="text-xs font-bold font-serif text-terracotta-600 dark:text-terracotta-400">
                ${tipAmount.toFixed(2)} ({effectiveTipPercent}%)
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {[0, 15, 18, 20, 25].map((pct) => (
                <button
                  key={pct}
                  onClick={() => {
                    setTipPercent(pct);
                    setCustomTip('');
                  }}
                  className={`py-2 rounded-xl text-xs font-bold transition ${
                    effectiveTipPercent === pct && customTip === ''
                      ? 'bg-terracotta-600 text-white shadow-sm'
                      : 'bg-cream-100 dark:bg-charcoal-700 text-stone-700 dark:text-stone-300 hover:bg-cream-200'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Bill Summary Banner */}
          <div className="grid grid-cols-4 gap-2 text-center p-3.5 bg-cream-100 dark:bg-charcoal-800 rounded-2xl border border-cream-200 dark:border-charcoal-700 text-xs">
            <div>
              <span className="text-stone-400 block text-[10px]">Subtotal</span>
              <strong className="text-charcoal-900 dark:text-cream-100 font-serif font-bold">${subtotal.toFixed(2)}</strong>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px]">Tax (8.5%)</span>
              <strong className="text-charcoal-900 dark:text-cream-100 font-serif font-bold">${taxAmount.toFixed(2)}</strong>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px]">Tip ({effectiveTipPercent}%)</span>
              <strong className="text-charcoal-900 dark:text-cream-100 font-serif font-bold">${tipAmount.toFixed(2)}</strong>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px]">Grand Total</span>
              <strong className="text-terracotta-600 dark:text-terracotta-400 font-serif font-bold text-sm">${grandTotal.toFixed(2)}</strong>
            </div>
          </div>

          {/* Breakdown Display */}
          {splitMode === 'equal' ? (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-sage-50 dark:bg-sage-950/40 border border-sage-200 dark:border-sage-800 text-center">
                <span className="text-xs text-sage-800 dark:text-sage-300 font-medium">Each guest contributes:</span>
                <p className="text-3xl font-serif font-bold text-sage-900 dark:text-sage-200 mt-1">
                  ${perPersonEqual.toFixed(2)}
                </p>
                <p className="text-[11px] text-stone-500 mt-1">
                  Divided equally across {splitCount} table members
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {members.map((m) => (
                  <div key={m.id} className="p-3 bg-white dark:bg-charcoal-800 rounded-xl border border-cream-200 dark:border-charcoal-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: m.color }}>
                        {m.name[0]}
                      </div>
                      <span className="text-xs font-semibold text-charcoal-900 dark:text-cream-100 truncate">{m.name}</span>
                    </div>
                    <span className="text-xs font-bold font-serif text-charcoal-900 dark:text-cream-100">${perPersonEqual.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Itemized Breakdown */
            <div className="space-y-3">
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Each member pays for their exact selected items plus proportional tax &amp; tip:
              </p>

              <div className="space-y-3">
                {itemizedBreakdown.map((person) => (
                  <div
                    key={person.member.name}
                    className="p-4 bg-white dark:bg-charcoal-800 rounded-2xl border border-cream-200 dark:border-charcoal-700 shadow-xs space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs"
                          style={{ backgroundColor: person.member.color || '#C85A32' }}
                        >
                          {person.member.name[0].toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-charcoal-900 dark:text-cream-100">
                            {person.member.name}
                          </h4>
                          <span className="text-[10px] text-stone-400">
                            {person.items.length} dishes ordered
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-serif font-bold text-terracotta-700 dark:text-terracotta-400">
                          ${person.total.toFixed(2)}
                        </span>
                        <p className="text-[10px] text-stone-400">
                          Dishes: ${person.itemsSubtotal.toFixed(2)} + Tip/Tax: ${(person.tip + person.tax).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Dish list */}
                    {person.items.length > 0 ? (
                      <div className="pl-10 space-y-1 pt-1 border-t border-cream-100 dark:border-charcoal-700/60">
                        {person.items.map((it) => (
                          <div key={it.id} className="flex justify-between text-xs text-stone-600 dark:text-stone-300">
                            <span className="truncate pr-2">
                              {it.quantity}x {it.name}
                            </span>
                            <span className="font-medium shrink-0">
                              ${(it.price * it.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="pl-10 text-xs text-stone-400 italic">
                        No dishes selected yet by {person.member.name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopyBreakdown}
              className="flex-1 py-3 px-4 rounded-xl border border-cream-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-xs font-bold text-charcoal-900 dark:text-cream-100 hover:bg-cream-100 dark:hover:bg-charcoal-700 transition flex items-center justify-center gap-2"
            >
              {copiedSummary ? <Check className="w-4 h-4 text-sage-600" /> : <Copy className="w-4 h-4 text-stone-500" />}
              {copiedSummary ? 'Receipt Summary Copied!' : 'Copy Receipt for Friends'}
            </button>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout(tipAmount, taxAmount, effectiveTipPercent);
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2"
            >
              Proceed to Table Checkout (${grandTotal.toFixed(2)})
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
