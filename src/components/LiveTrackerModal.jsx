import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, Clock, ChefHat, Sparkles, X, 
  UtensilsCrossed, Package, Bell, PartyPopper 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LiveTrackerModal({ isOpen, onClose, state, orderId }) {
  const [hasCelebrated, setHasCelebrated] = useState(false);

  // Find target order
  const order = state.orders?.find(o => o.id === (orderId || state.activeOrderId)) || state.orders?.[0];

  const status = order?.status || 'queued';

  // Trigger celebration confetti when order hits 'ready' or 'completed'
  useEffect(() => {
    if ((status === 'ready' || status === 'completed') && !hasCelebrated) {
      setHasCelebrated(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C85A32', '#5B7065', '#D9822B', '#EFE7DE']
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [status, hasCelebrated]);

  if (!isOpen || !order) return null;

  // Stages configuration
  const stages = [
    { key: 'queued', label: 'Queued', sub: 'Order received by station' },
    { key: 'cooking', label: 'Cooking', sub: 'Chef firing dishes at wood hearth' },
    { key: 'ready', label: 'Ready', sub: 'Garnished, plated & expediting' },
    { key: 'completed', label: 'Served', sub: 'Enjoy your table experience' }
  ];

  const statusIndexMap = {
    queued: 0,
    cooking: 1,
    ready: 2,
    completed: 3
  };

  const currentStageIndex = statusIndexMap[status] ?? 0;

  // Calculate orders ahead of you in kitchen
  const ordersAhead = state.orders.filter(o => 
    (o.status === 'queued' || o.status === 'cooking') && 
    o.createdAt < order.createdAt && 
    o.id !== order.id
  ).length;

  // Calculate elapsed & remaining minutes
  const elapsedMinutes = Math.max(0, Math.floor((Date.now() - order.createdAt) / 60000));
  const estimatedTotalMins = order.estimatedPrepMins || 18;
  const remainingMins = Math.max(1, estimatedTotalMins - elapsedMinutes);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="live-tracker-title"
    >
      <div className="bg-cream-50 dark:bg-charcoal-900 border border-cream-300 dark:border-charcoal-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl my-6">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-cream-200 via-cream-100 to-sage-50 dark:from-charcoal-800 dark:via-charcoal-900 dark:to-charcoal-800 border-b border-cream-300 dark:border-charcoal-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-terracotta-600 text-white flex items-center justify-center shadow-md">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-terracotta-700 dark:text-terracotta-400">Live Table Tracker</span>
              <h2 id="live-tracker-title" className="text-2xl font-serif font-bold text-charcoal-900 dark:text-cream-100">
                {order.orderNumber}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-cream-300 dark:hover:bg-charcoal-800 text-stone-600 dark:text-stone-400 transition"
            aria-label="Close tracker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Target & Time banner */}
          <div className="flex items-center justify-between p-3.5 bg-cream-100 dark:bg-charcoal-800 rounded-2xl border border-cream-200 dark:border-charcoal-700">
            <div>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Destination</span>
              <strong className="text-sm text-charcoal-900 dark:text-cream-100 font-serif">
                {order.type === 'dine-in' ? `${order.tableId || 'Table 7'} (Dine-In)` : `Pickup: ${order.pickupInfo?.name} (${order.pickupInfo?.timeSlot})`}
              </strong>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Time Elapsed</span>
              <strong className="text-sm font-mono text-terracotta-700 dark:text-terracotta-400">
                {elapsedMinutes}m ago
              </strong>
            </div>
          </div>

          {/* Celebration State Banner if Ready/Completed */}
          {(status === 'ready' || status === 'completed') && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-terracotta-500/15 to-sage-500/10 border-2 border-terracotta-500/40 text-center animate-slide-up">
              <div className="w-12 h-12 rounded-full bg-terracotta-600 text-white flex items-center justify-center mx-auto mb-2 shadow-md">
                <PartyPopper className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900 dark:text-cream-100">
                {status === 'ready' ? '🔔 Your Dishes are Plated & Ready!' : '✨ Order Complete & Served!'}
              </h3>
              <p className="text-xs text-stone-600 dark:text-cream-300 mt-1 max-w-sm mx-auto">
                {order.type === 'dine-in' 
                  ? `Your expediter is presenting the course to ${order.tableId || 'Table 7'}. Bon appétit!`
                  : `Your takeout parcel is at the expediter counter for pickup.`}
              </p>
            </div>
          )}

          {/* Animated Stage Stepper */}
          <div className="relative pt-2 pb-4">
            {/* Progress line */}
            <div className="absolute top-6 left-6 right-6 h-1 bg-cream-300 dark:bg-charcoal-700 -z-0">
              <div
                className="h-full bg-gradient-to-r from-terracotta-600 via-amber-500 to-sage-600 transition-all duration-700"
                style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
              />
            </div>

            <div className="flex justify-between relative z-10">
              {stages.map((stage, idx) => {
                const isPassed = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div key={stage.key} className="flex flex-col items-center text-center max-w-[80px]">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                        isCurrent
                          ? 'bg-terracotta-600 text-white ring-4 ring-terracotta-500/30 scale-110'
                          : isPassed
                          ? 'bg-sage-600 text-white'
                          : 'bg-cream-200 dark:bg-charcoal-800 text-stone-400 border border-cream-300 dark:border-charcoal-700'
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : isCurrent ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                      ) : (
                        idx + 1
                      )}
                    </div>
                    <span className={`text-xs font-bold mt-2 ${
                      isCurrent ? 'text-terracotta-700 dark:text-terracotta-400 font-serif' : 'text-stone-600 dark:text-stone-400'
                    }`}>
                      {stage.label}
                    </span>
                    <span className="text-[9px] text-stone-400 hidden sm:block mt-0.5 line-clamp-2">
                      {stage.sub}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kitchen Intelligence Cards (Wait time + Orders Ahead) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-charcoal-800 border border-cream-200 dark:border-charcoal-700 text-center">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Estimated Remaining Wait</span>
              <p className="text-2xl font-serif font-bold text-terracotta-700 dark:text-terracotta-400 mt-1">
                {status === 'ready' || status === 'completed' ? '0 min' : `~${remainingMins} mins`}
              </p>
              <span className="text-[10px] text-stone-400">
                Heated to order at wood hearth
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-charcoal-800 border border-cream-200 dark:border-charcoal-700 text-center">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Orders Ahead in Kitchen</span>
              <p className="text-2xl font-serif font-bold text-sage-700 dark:text-sage-400 mt-1">
                {ordersAhead} ahead
              </p>
              <span className="text-[10px] text-stone-400">
                Live queue depth
              </span>
            </div>
          </div>

          {/* Items in this order */}
          <div className="border-t border-cream-200 dark:border-charcoal-800 pt-4">
            <h4 className="text-xs font-bold text-charcoal-900 dark:text-cream-100 uppercase tracking-wider mb-2.5">
              Course Details ({order.items?.length || 0} items)
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {order.items?.map((it, i) => (
                <div key={i} className="flex items-center justify-between text-xs p-2 rounded-xl bg-cream-100 dark:bg-charcoal-800/60">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cream-300 dark:bg-charcoal-700 text-[10px] font-bold flex items-center justify-center">
                      {it.quantity}
                    </span>
                    <span className="font-semibold text-charcoal-900 dark:text-cream-100">{it.name}</span>
                    {it.addedBy?.name && (
                      <span className="text-[10px] text-stone-500">
                        (for {it.addedBy.name})
                      </span>
                    )}
                  </div>
                  <span className="font-serif font-bold text-stone-700 dark:text-stone-300">
                    ${(it.price * it.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
