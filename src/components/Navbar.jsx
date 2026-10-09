import React from 'react';
import { 
  Users, ShoppingBag, Sun, Moon, ChefHat, 
  Clock, Sparkles, Utensils, HelpCircle 
} from 'lucide-react';

export default function Navbar({ 
  state, 
  darkMode, 
  setDarkMode, 
  onOpenGather, 
  onOpenCart, 
  onOpenKds, 
  onOpenTracker, 
  onOpenDemoGuide 
}) {
  const cartItemCount = state.cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const activeOrder = state.orders?.find(o => o.id === state.activeOrderId) || state.orders?.[0];

  return (
    <header className="sticky top-0 z-40 bg-cream-50/90 dark:bg-charcoal-900/90 backdrop-blur-md border-b border-cream-300 dark:border-charcoal-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-3">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-terracotta-600 text-white flex items-center justify-center shadow-md">
            <svg viewBox="0 0 32 32" className="w-6 h-6 fill-none stroke-current" strokeWidth="2" strokeLinecap="round">
              <path d="M16 4C11 11 9 15 9 20a7 7 0 0014 0c0-5-2-9-7-16z" fill="#FFFDF9" stroke="#B34923" />
              <path d="M16 10v12M13 14l3 3M19 14l-3 3" stroke="#5B7065" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-charcoal-900 dark:text-cream-50 block leading-tight">
              Gather &amp; Grain
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-terracotta-700 dark:text-terracotta-400 block -mt-0.5">
              Shared Hearth &amp; Table
            </span>
          </div>
        </div>

        {/* Center/Right Nav Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Demo Guide Pill for Judges */}
          <button
            onClick={onOpenDemoGuide}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-terracotta-500/20 to-sage-500/15 border border-terracotta-400 text-terracotta-800 dark:text-terracotta-300 text-xs font-bold hover:shadow-sm transition animate-subtle-bounce"
            title="Interactive 6-click walkthrough for hackathon judges"
          >
            <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
            <span>Judge Demo Guide</span>
          </button>

          {/* Table Gather Pill */}
          <button
            onClick={onOpenGather}
            className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white dark:bg-charcoal-800 border border-cream-300 dark:border-charcoal-700 hover:border-terracotta-500 shadow-2xs transition group"
            title="Open Table Gather QR card and connected friends"
          >
            <div
              className="w-5 h-5 rounded-full text-white text-[9px] font-bold flex items-center justify-center shrink-0 shadow-2xs"
              style={{ backgroundColor: state.currentUser?.color || '#C85A32' }}
            >
              {state.currentUser?.name ? state.currentUser.name[0].toUpperCase() : 'U'}
            </div>
            <div className="text-left hidden md:block">
              <span className="text-[11px] font-bold text-charcoal-900 dark:text-cream-100 group-hover:text-terracotta-600 transition">
                {state.table?.id || 'Table 7'}
              </span>
            </div>
            <span className="text-[10px] font-mono bg-cream-200 dark:bg-charcoal-700 text-stone-600 dark:text-stone-300 px-1.5 py-0.5 rounded-md">
              {state.table?.code || 'GRAIN-782'}
            </span>
          </button>

          {/* Active Tracker Pill if order exists */}
          {activeOrder && (
            <button
              onClick={() => onOpenTracker(activeOrder.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-sage-50 dark:bg-sage-950/40 border border-sage-300 dark:border-sage-800 text-sage-900 dark:text-sage-200 text-xs font-bold shadow-2xs hover:bg-sage-100 transition"
              title="Track live order status"
            >
              <Clock className="w-3.5 h-3.5 text-sage-600" />
              <span className="hidden sm:inline">Tracker</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-sage-200 dark:bg-sage-800 text-sage-800 dark:text-sage-200">
                {activeOrder.status}
              </span>
            </button>
          )}

          {/* Kitchen Display (Staff) Button */}
          <button
            onClick={onOpenKds}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-cream-200 dark:bg-charcoal-800 hover:bg-cream-300 dark:hover:bg-charcoal-700 text-charcoal-900 dark:text-cream-100 text-xs font-bold transition border border-cream-300 dark:border-charcoal-700 shadow-2xs"
            title="Open Kitchen Expediter Station (PIN 1234)"
          >
            <ChefHat className="w-4 h-4 text-terracotta-600" />
            <span className="hidden sm:inline">Staff KDS</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold shadow-sm transition"
            aria-label={`Shared Cart containing ${cartItemCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartItemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-terracotta-700 text-[11px] font-bold flex items-center justify-center shadow-xs">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-2xl bg-white dark:bg-charcoal-800 border border-cream-300 dark:border-charcoal-700 hover:bg-cream-100 dark:hover:bg-charcoal-700 text-stone-600 dark:text-stone-300 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
