import React from 'react';
import { 
  Sparkles, Check, ArrowRight, ExternalLink, 
  Users, ShoppingBag, Split, ChefHat, Clock, PartyPopper, X 
} from 'lucide-react';
import { simulateFriendJoin, addToSharedCart, generateRushHourOrders } from '../services/tableSync.js';
import { MENU_ITEMS } from '../data/menuItems.jsx';

export default function DemoGuideModal({ 
  isOpen, 
  onClose, 
  onOpenGather, 
  onOpenCart, 
  onOpenSplitBill, 
  onOpenKds,
  onOpenTracker,
  currentUser 
}) {
  if (!isOpen) return null;

  const steps = [
    {
      step: 1,
      title: 'Table Gather & QR Card',
      icon: Users,
      desc: 'Open Table 7, copy the join code (e.g. GRAIN-782), view the botanical QR card, and see connected table friends.',
      actionText: 'Open Table Gather Modal',
      onAction: () => {
        onClose();
        onOpenGather();
      }
    },
    {
      step: 2,
      title: 'Shared Cart & Person Badges',
      icon: ShoppingBag,
      desc: 'Browse 17 dishes with custom inline SVGs. Notice how each dish added to the cart displays WHO added it (e.g., Maya, Alex).',
      actionText: 'Add 2 Dishes as Maya & Alex',
      onAction: () => {
        simulateFriendJoin('Maya', '#5B7065');
        addToSharedCart(MENU_ITEMS[0], { id: 'user-maya', name: 'Maya', color: '#5B7065' }, 'Extra balsamic');
        addToSharedCart(MENU_ITEMS[4], currentUser, 'Al dente pasta please');
        onClose();
        onOpenCart();
      }
    },
    {
      step: 3,
      title: 'Cross-Tab Sync & Live Toasts',
      icon: Sparkles,
      desc: 'Open a second browser tab (or window) side-by-side. Any item added in Tab A produces a live toast and updates Tab B instantly via BroadcastChannel.',
      actionText: 'Open 2nd Window to Test Sync',
      onAction: () => {
        window.open(window.location.href, '_blank');
      }
    },
    {
      step: 4,
      title: 'Itemized vs Equal Bill Splitting',
      icon: Split,
      desc: 'Switch between Equal Split (divided among guests) and Itemized Split (calculates exact dish totals per person + proportional tip & tax).',
      actionText: 'Launch Split-the-Bill View',
      onAction: () => {
        onClose();
        onOpenSplitBill();
      }
    },
    {
      step: 5,
      title: 'Live Synchronized Order Tracker',
      icon: Clock,
      desc: 'Track the order through Queued → Cooking → Ready → Completed, with live queue depth ("Orders ahead") and ready celebration confetti.',
      actionText: 'View Live Order Tracker',
      onAction: () => {
        onClose();
        onOpenTracker();
      }
    },
    {
      step: 6,
      title: 'Kitchen Display (KDS) & Rush Hour',
      icon: ChefHat,
      desc: 'Enter PIN 1234 to access the expediter station. Test the Kitchen Load meter (Calm/Busy/Slammed), aging orders (amber/pulsing red), Web Audio chime, and Undo last action.',
      actionText: 'Open Kitchen Expediter Screen',
      onAction: () => {
        onClose();
        onOpenKds();
      }
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-guide-title"
    >
      <div className="bg-cream-50 dark:bg-charcoal-900 border border-cream-300 dark:border-charcoal-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-6">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-cream-200 via-cream-100 to-terracotta-50 dark:from-charcoal-800 dark:via-charcoal-900 dark:to-charcoal-800 border-b border-cream-300 dark:border-charcoal-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-terracotta-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-terracotta-700 dark:text-terracotta-400">
                Hackathon Judge Guide
              </span>
              <h2 id="demo-guide-title" className="text-2xl font-serif font-bold text-charcoal-900 dark:text-cream-100">
                6-Click Interactive Demo Tour
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

        {/* Steps List */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <p className="text-xs text-stone-600 dark:text-stone-300">
            Follow this 6-step path to experience all signature features of <strong>Gather &amp; Grain</strong>: real-time shared table dining, itemized splitting, and live kitchen expediting without any external service dependency.
          </p>

          <div className="space-y-3">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="bg-white dark:bg-charcoal-800 rounded-2xl border border-cream-200 dark:border-charcoal-700 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs hover:border-terracotta-400 transition"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-terracotta-100 dark:bg-terracotta-900/60 text-terracotta-700 dark:text-terracotta-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                      #{s.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-charcoal-900 dark:text-cream-100 flex items-center gap-1.5">
                        <Icon className="w-4 h-4 text-terracotta-600" />
                        {s.title}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 max-w-md">
                        {s.desc}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={s.onAction}
                    className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-cream-100 hover:bg-terracotta-600 hover:text-white dark:bg-charcoal-700 dark:hover:bg-terracotta-600 text-charcoal-900 dark:text-cream-100 text-xs font-bold shrink-0 transition flex items-center justify-center gap-1.5 border border-cream-300 dark:border-charcoal-600"
                  >
                    <span>{s.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
