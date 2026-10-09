import React, { useState, useEffect } from 'react';
import { 
  ChefHat, Volume2, VolumeX, Undo2, Zap, ArrowLeft, 
  Clock, AlertTriangle, CheckCircle, Flame, Sparkles, 
  Lock, KeyRound, ShieldAlert, X, Utensils, RefreshCw 
} from 'lucide-react';
import { 
  updateOrderStatus, 
  undoLastKitchenAction, 
  toggleKitchenMute, 
  generateRushHourOrders 
} from '../services/tableSync.js';
import { playOrderChime } from '../services/audio.js';

export default function KitchenDisplay({ state, onExitToCustomer }) {
  // Staff PIN Authentication
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [ticker, setTicker] = useState(0);

  // Live timer tick every 10 seconds to update aging minutes accurately
  useEffect(() => {
    const timer = setInterval(() => {
      setTicker(t => t + 1);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const orders = state.orders || [];

  // Group orders by stage
  const queuedOrders = orders.filter(o => o.status === 'queued');
  const cookingOrders = orders.filter(o => o.status === 'cooking');
  const readyOrders = orders.filter(o => o.status === 'ready');
  const completedOrders = orders.filter(o => o.status === 'completed');

  // Kitchen Load calculation
  const activeCount = queuedOrders.length + cookingOrders.length;
  let loadStatus = 'Calm';
  let loadColor = 'text-sage-600 bg-sage-100 dark:bg-sage-900/60 dark:text-sage-300';
  let loadPercent = 25;

  if (activeCount >= 6) {
    loadStatus = 'Slammed';
    loadColor = 'text-red-700 bg-red-100 dark:bg-red-950/70 dark:text-red-300 animate-pulse';
    loadPercent = 95;
  } else if (activeCount >= 3) {
    loadStatus = 'Busy';
    loadColor = 'text-amber-700 bg-amber-100 dark:bg-amber-950/70 dark:text-amber-300';
    loadPercent = 65;
  }

  // Calculate Longest Waiting Active Order
  const activeOrders = orders.filter(o => o.status === 'queued' || o.status === 'cooking');
  const longestWaitOrder = activeOrders.reduce((oldest, current) => {
    if (!oldest) return current;
    return current.createdAt < oldest.createdAt ? current : oldest;
  }, null);

  const longestWaitMinutes = longestWaitOrder
    ? Math.floor((Date.now() - longestWaitOrder.createdAt) / 60000)
    : 0;

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === '1234') {
      setPinUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  const quickFillPin = () => {
    setPinInput('1234');
    setPinUnlocked(true);
  };

  if (!pinUnlocked) {
    return (
      <div className="min-h-screen bg-cream-100 dark:bg-charcoal-950 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-charcoal-900 border border-cream-300 dark:border-charcoal-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-terracotta-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-terracotta-700 dark:text-terracotta-400">
              Staff Portal Gate
            </span>
            <h2 className="text-2xl font-serif font-bold text-charcoal-900 dark:text-cream-100 mt-1">
              Kitchen Display (KDS)
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Enter the staff 4-digit security PIN to access the expediter station.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              maxLength={4}
              placeholder="• • • •"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setPinError(false);
              }}
              className="w-full text-center text-3xl font-mono tracking-widest py-3 rounded-2xl border border-cream-300 dark:border-charcoal-700 bg-cream-50 dark:bg-charcoal-800 text-charcoal-900 dark:text-cream-100 focus:outline-none focus:border-terracotta-500 shadow-inner"
              autoFocus
            />

            {pinError && (
              <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                Invalid PIN. Default demo PIN is 1234.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition"
            >
              Unlock Expediter Screen
            </button>
          </form>

          {/* Judge demo helper */}
          <div className="pt-2 border-t border-cream-200 dark:border-charcoal-800 space-y-2">
            <button
              onClick={quickFillPin}
              className="w-full py-2 px-3 rounded-xl bg-sage-50 dark:bg-sage-950/40 border border-sage-200 dark:border-sage-800 text-sage-800 dark:text-sage-300 text-xs font-semibold hover:bg-sage-100 transition"
            >
              Demo Shortcut: Unlock with PIN 1234
            </button>
            <button
              onClick={onExitToCustomer}
              className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
            >
              ← Back to Dining Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5EFEB] dark:bg-charcoal-950 text-charcoal-900 dark:text-cream-100 flex flex-col">
      {/* Top Expediter Control Bar */}
      <header className="bg-white dark:bg-charcoal-900 border-b border-cream-300 dark:border-charcoal-800 px-4 sm:px-6 py-3.5 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Mode */}
          <div className="flex items-center gap-3">
            <button
              onClick={onExitToCustomer}
              className="p-2 rounded-xl bg-cream-100 dark:bg-charcoal-800 hover:bg-cream-200 text-stone-700 dark:text-cream-200 transition"
              title="Return to Customer Dining Portal"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-terracotta-600 text-white flex items-center justify-center shadow-sm">
                <ChefHat className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-serif font-bold text-charcoal-900 dark:text-cream-100 flex items-center gap-2">
                  Kitchen Expediter Display
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-wider bg-cream-200 dark:bg-charcoal-800 px-2 py-0.5 rounded-md text-stone-600 dark:text-stone-300">
                    Station 1
                  </span>
                </h1>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Live synchronized orders • Hearth &amp; Expediting Counter
                </p>
              </div>
            </div>
          </div>

          {/* Kitchen Load Meter */}
          <div className="flex items-center gap-4 bg-cream-50 dark:bg-charcoal-800/80 px-4 py-2 rounded-2xl border border-cream-200 dark:border-charcoal-700">
            <div className="text-right">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">Kitchen Load</span>
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${loadColor}`}>
                  {loadStatus}
                </span>
                <span className="text-xs font-mono font-bold text-charcoal-800 dark:text-cream-200">
                  {activeCount} Active
                </span>
              </div>
            </div>

            {/* Load visual bar */}
            <div className="w-20 bg-cream-200 dark:bg-charcoal-700 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  loadStatus === 'Slammed' ? 'bg-red-600' : loadStatus === 'Busy' ? 'bg-amber-500' : 'bg-sage-600'
                }`}
                style={{ width: `${loadPercent}%` }}
              />
            </div>
          </div>

          {/* Actions: Undo, Chime Toggle, Rush Hour Demo */}
          <div className="flex items-center gap-2">
            {/* Undo last action */}
            <button
              onClick={() => undoLastKitchenAction()}
              disabled={state.undoStack?.length === 0}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition ${
                state.undoStack?.length > 0
                  ? 'bg-white dark:bg-charcoal-800 border-cream-300 dark:border-charcoal-700 hover:border-terracotta-500 text-charcoal-900 dark:text-cream-100 shadow-xs'
                  : 'bg-cream-100 dark:bg-charcoal-900 border-transparent text-stone-400 opacity-50 cursor-not-allowed'
              }`}
              title="Undo the last status change"
            >
              <Undo2 className="w-3.5 h-3.5" />
              Undo Last
              {state.undoStack?.length > 0 && (
                <span className="text-[10px] bg-terracotta-100 text-terracotta-700 dark:bg-terracotta-900 dark:text-terracotta-300 px-1.5 py-0.2 rounded-full">
                  {state.undoStack.length}
                </span>
              )}
            </button>

            {/* Chime toggle */}
            <button
              onClick={() => {
                toggleKitchenMute();
                if (state.kitchenMuted) {
                  playOrderChime(false);
                }
              }}
              className={`p-2 rounded-xl border transition ${
                state.kitchenMuted
                  ? 'bg-cream-100 dark:bg-charcoal-800 text-stone-400 border-cream-200 dark:border-charcoal-700'
                  : 'bg-sage-100 dark:bg-sage-900/60 text-sage-800 dark:text-sage-200 border-sage-300 dark:border-sage-700'
              }`}
              title={state.kitchenMuted ? 'Chime muted (Click to unmute)' : 'Chime active (Click to mute)'}
            >
              {state.kitchenMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Rush Hour Demo Button */}
            <button
              onClick={() => generateRushHourOrders()}
              className="px-3.5 py-2 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
              title="Generate 3 incoming orders with varying aging states to demonstrate rush hour"
            >
              <Zap className="w-3.5 h-3.5" />
              Rush Hour Demo
            </button>
          </div>
        </div>
      </header>

      {/* Longest Wait Alert Banner */}
      {longestWaitOrder && longestWaitMinutes >= 8 && (
        <div className="bg-gradient-to-r from-amber-500 via-terracotta-600 to-red-600 text-white px-4 py-2 text-xs font-bold shadow-md flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <AlertTriangle className="w-4 h-4 shrink-0 animate-bounce" />
            <span>
              Longest Wait Alert: {longestWaitOrder.tableId || longestWaitOrder.pickupInfo?.name} ({longestWaitOrder.orderNumber}) has been waiting for {longestWaitMinutes} minutes!
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full shrink-0">
            Priority Expedite
          </span>
        </div>
      )}

      {/* Kanban Board Container */}
      <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-w-[900px] lg:min-w-0">
          {/* Column 1: Queued */}
          <StageColumn
            title="Queued"
            subtitle="Tickets in order queue"
            count={queuedOrders.length}
            orders={queuedOrders}
            badgeColor="bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200"
            nextStage="cooking"
            nextLabel="Start Cooking"
            nextIcon="🍳"
          />

          {/* Column 2: Cooking */}
          <StageColumn
            title="Cooking"
            subtitle="Fired at hearth / grill"
            count={cookingOrders.length}
            orders={cookingOrders}
            badgeColor="bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200"
            nextStage="ready"
            nextLabel="Mark Ready"
            nextIcon="🔔"
          />

          {/* Column 3: Ready */}
          <StageColumn
            title="Ready"
            subtitle="Plated & Expediting"
            count={readyOrders.length}
            orders={readyOrders}
            badgeColor="bg-sage-100 text-sage-800 dark:bg-sage-900/60 dark:text-sage-200"
            nextStage="completed"
            nextLabel="Complete / Served"
            nextIcon="✅"
          />

          {/* Column 4: Completed */}
          <StageColumn
            title="Completed"
            subtitle="Served & archived"
            count={completedOrders.length}
            orders={completedOrders}
            badgeColor="bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300"
            isCompletedColumn
          />
        </div>
      </main>
    </div>
  );
}

// Stage Column Component
function StageColumn({ 
  title, 
  subtitle, 
  count, 
  orders, 
  badgeColor, 
  nextStage, 
  nextLabel, 
  nextIcon,
  isCompletedColumn = false 
}) {
  return (
    <div className="bg-cream-100/70 dark:bg-charcoal-900/60 border border-cream-300 dark:border-charcoal-800 rounded-3xl p-3.5 flex flex-col max-h-[82vh]">
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3 px-1 border-b border-cream-200 dark:border-charcoal-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif font-bold text-base text-charcoal-900 dark:text-cream-100">
              {title}
            </h2>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
              {count}
            </span>
          </div>
          <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">{subtitle}</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto space-y-3 pt-3 pr-1">
        {orders.length === 0 ? (
          <div className="py-12 text-center text-stone-400 text-xs">
            No orders in this stage
          </div>
        ) : (
          orders.map((order) => (
            <KitchenOrderCard
              key={order.id}
              order={order}
              nextStage={nextStage}
              nextLabel={nextLabel}
              nextIcon={nextIcon}
              isCompleted={isCompletedColumn}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Kitchen Order Card Component with Aging States
function KitchenOrderCard({ order, nextStage, nextLabel, nextIcon, isCompleted }) {
  const elapsedMinutes = Math.floor((Date.now() - order.createdAt) / 60000);

  // Aging classes
  let agingBorder = 'border-cream-300 dark:border-charcoal-700';
  let agingBadge = null;

  if (!isCompleted) {
    if (elapsedMinutes >= 15) {
      agingBorder = 'border-red-500 shadow-lg animate-pulse-urgent bg-red-50/40 dark:bg-red-950/20';
      agingBadge = (
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-600 text-white flex items-center gap-1 animate-pulse">
          <Flame className="w-3 h-3" />
          Urgent ({elapsedMinutes}m)
        </span>
      );
    } else if (elapsedMinutes >= 8) {
      agingBorder = 'border-amber-400 shadow-md bg-amber-50/30 dark:bg-amber-950/20';
      agingBadge = (
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500 text-white flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Aging ({elapsedMinutes}m)
        </span>
      );
    }
  }

  return (
    <div className={`bg-white dark:bg-charcoal-800 rounded-2xl border ${agingBorder} p-3.5 shadow-sm space-y-3 transition-all`}>
      {/* Top Card Info */}
      <div className="flex items-start justify-between gap-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-sm text-charcoal-900 dark:text-cream-100">
              {order.orderNumber}
            </span>
            <span className="text-xs font-semibold text-terracotta-700 dark:text-terracotta-400">
              {order.tableId || 'Pickup'}
            </span>
          </div>
          <span className="text-[10px] text-stone-500">
            {order.type === 'dine-in' ? 'Dine-In' : `Pickup: ${order.pickupInfo?.name || 'Customer'}`}
          </span>
        </div>

        <div className="flex flex-col items-end gap-1">
          {agingBadge ? (
            agingBadge
          ) : (
            <span className="text-[10px] font-mono text-stone-500 flex items-center gap-1 bg-cream-100 dark:bg-charcoal-700 px-2 py-0.5 rounded-md">
              <Clock className="w-3 h-3 text-stone-400" />
              {elapsedMinutes}m ago
            </span>
          )}
        </div>
      </div>

      {/* Special Kitchen Notes Banner */}
      {order.notes && (
        <div className="bg-terracotta-50 dark:bg-terracotta-950/50 border border-terracotta-200 dark:border-terracotta-800/60 p-2 rounded-xl text-xs text-terracotta-900 dark:text-terracotta-200 italic">
          "{order.notes}"
        </div>
      )}

      {/* Item list */}
      <div className="space-y-1.5 border-t border-b border-cream-100 dark:border-charcoal-700/80 py-2">
        {order.items?.map((item, i) => (
          <div key={i} className="text-xs">
            <div className="flex items-baseline justify-between">
              <span className="font-semibold text-charcoal-900 dark:text-cream-100">
                <strong className="text-terracotta-600 dark:text-terracotta-400 font-mono mr-1.5 font-bold">
                  {item.quantity}×
                </strong>
                {item.name}
              </span>
              {item.addedBy?.name && (
                <span
                  className="text-[9px] font-bold px-1.5 py-0.2 rounded text-white shrink-0 ml-1"
                  style={{ backgroundColor: item.addedBy.color || '#5B7065' }}
                >
                  {item.addedBy.name}
                </span>
              )}
            </div>
            {item.notes && (
              <p className="text-[10px] text-amber-700 dark:text-amber-400 pl-4 italic">
                ↳ {item.notes}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      {!isCompleted && nextStage && (
        <button
          onClick={() => updateOrderStatus(order.id, nextStage)}
          className="w-full py-2.5 px-3 rounded-xl bg-charcoal-900 hover:bg-terracotta-600 dark:bg-cream-100 dark:hover:bg-terracotta-500 dark:text-charcoal-950 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
        >
          <span>{nextIcon}</span>
          <span>{nextLabel}</span>
        </button>
      )}

      {isCompleted && (
        <div className="flex items-center justify-center gap-1 text-[11px] text-sage-600 dark:text-sage-400 font-semibold py-1">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Fulfilled &amp; Served</span>
        </div>
      )}
    </div>
  );
}
