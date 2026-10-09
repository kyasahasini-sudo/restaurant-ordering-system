import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import CustomerMenu from './components/CustomerMenu.jsx';
import TableGatherModal from './components/TableGatherModal.jsx';
import SharedCartDrawer from './components/SharedCartDrawer.jsx';
import SplitBillModal from './components/SplitBillModal.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import LiveTrackerModal from './components/LiveTrackerModal.jsx';
import KitchenDisplay from './components/KitchenDisplay.jsx';
import SurpriseMeModal from './components/SurpriseMeModal.jsx';
import DemoGuideModal from './components/DemoGuideModal.jsx';
import ToastContainer from './components/ToastContainer.jsx';
import { getState, subscribeToSync } from './services/tableSync.js';
import { Sparkles, ShoppingBag, Users, Split, ChefHat, Heart } from 'lucide-react';

export default function App() {
  const [syncState, setSyncState] = useState(getState());
  const [currentView, setCurrentView] = useState('customer'); // 'customer' | 'kitchen'
  
  // Modals & Drawers
  const [isGatherOpen, setIsGatherOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSplitBillOpen, setIsSplitBillOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isSurpriseMeOpen, setIsSurpriseMeOpen] = useState(false);
  const [isDemoGuideOpen, setIsDemoGuideOpen] = useState(false);
  const [trackerOrderId, setTrackerOrderId] = useState(null);

  // Split bill carryover data to checkout
  const [checkoutPresetTip, setCheckoutPresetTip] = useState(0);
  const [checkoutPresetTax, setCheckoutPresetTax] = useState(0);

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gather_grain_dark') === 'true';
    }
    return false;
  });

  // Dark mode class sync
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('gather_grain_dark', darkMode.toString());
  }, [darkMode]);

  // Subscribe to real-time sync (BroadcastChannel & storage events)
  useEffect(() => {
    const unsubscribe = subscribeToSync((newState) => {
      setSyncState({ ...newState });
    });
    return () => unsubscribe();
  }, []);

  // Keyboard shortcut: Esc closes all open modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsGatherOpen(false);
        setIsCartOpen(false);
        setIsSplitBillOpen(false);
        setIsCheckoutOpen(false);
        setIsTrackerOpen(false);
        setIsSurpriseMeOpen(false);
        setIsDemoGuideOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle proceed from split bill to checkout
  const handleProceedFromSplit = (tipAmount, taxAmount) => {
    setCheckoutPresetTip(tipAmount);
    setCheckoutPresetTax(taxAmount);
    setIsCheckoutOpen(true);
  };

  // Handle successful order placement
  const handleOrderSuccess = (newOrder) => {
    setTrackerOrderId(newOrder.id);
    setIsTrackerOpen(true);
  };

  const cartCount = syncState.cart?.reduce((s, i) => s + i.quantity, 0) || 0;
  const cartSubtotal = syncState.cart?.reduce((s, i) => s + i.price * i.quantity, 0) || 0;

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
      {/* Toast Notifications */}
      <ToastContainer toasts={syncState.toasts} />

      {/* Main Screen Switcher */}
      {currentView === 'kitchen' ? (
        <KitchenDisplay
          state={syncState}
          onExitToCustomer={() => setCurrentView('customer')}
        />
      ) : (
        <div className="flex-1 flex flex-col animate-fade-in">
          {/* Main Navigation */}
          <Navbar
            state={syncState}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onOpenGather={() => setIsGatherOpen(true)}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenKds={() => setCurrentView('kitchen')}
            onOpenTracker={(id) => {
              setTrackerOrderId(id);
              setIsTrackerOpen(true);
            }}
            onOpenDemoGuide={() => setIsDemoGuideOpen(true)}
          />

          {/* Main Page Content */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
            <CustomerMenu
              state={syncState}
              onOpenSurpriseMe={() => setIsSurpriseMeOpen(true)}
              onOpenGather={() => setIsGatherOpen(true)}
              onOpenCart={() => setIsCartOpen(true)}
            />
          </main>

          {/* Mobile Bottom Sticky Bar (Always accessible, no 360px overflow) */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-md border-t border-cream-300 dark:border-charcoal-800 p-2.5 px-4 flex items-center justify-between shadow-lg">
            <button
              onClick={() => setIsGatherOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300"
            >
              <div
                className="w-4 h-4 rounded-full text-[8px] text-white flex items-center justify-center font-bold"
                style={{ backgroundColor: syncState.currentUser?.color || '#C85A32' }}
              >
                {syncState.currentUser?.name ? syncState.currentUser.name[0] : 'U'}
              </div>
              <span>{syncState.table?.id || 'Table 7'}</span>
            </button>

            <button
              onClick={() => setIsDemoGuideOpen(true)}
              className="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 text-[11px] font-bold flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-600" />
              Demo Guide
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-terracotta-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Cart ({cartCount})</span>
            </button>
          </div>

          {/* Elegant Footer */}
          <footer className="mt-16 bg-cream-200/60 dark:bg-charcoal-900 border-t border-cream-300 dark:border-charcoal-800 py-10 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="space-y-1">
                <span className="font-serif text-lg font-bold text-charcoal-900 dark:text-cream-100 block">
                  Gather &amp; Grain
                </span>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md">
                  A hackathon restaurant portal engineered with zero external services. Real-time shared table dining powered by BroadcastChannel and client-side reactive state.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-stone-600 dark:text-stone-300">
                <button
                  onClick={() => setIsGatherOpen(true)}
                  className="hover:text-terracotta-600 transition"
                >
                  Table Gather
                </button>
                <span>•</span>
                <button
                  onClick={() => setIsDemoGuideOpen(true)}
                  className="hover:text-terracotta-600 transition"
                >
                  6-Click Judge Tour
                </button>
                <span>•</span>
                <button
                  onClick={() => setCurrentView('kitchen')}
                  className="hover:text-terracotta-600 transition"
                >
                  Staff Expediter (PIN 1234)
                </button>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* MODALS */}
      <TableGatherModal
        isOpen={isGatherOpen}
        onClose={() => setIsGatherOpen(false)}
        state={syncState}
      />

      <SharedCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        state={syncState}
        onOpenSplitBill={() => setIsSplitBillOpen(true)}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <SplitBillModal
        isOpen={isSplitBillOpen}
        onClose={() => setIsSplitBillOpen(false)}
        state={syncState}
        onProceedToCheckout={handleProceedFromSplit}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        state={syncState}
        presetTip={checkoutPresetTip}
        presetTax={checkoutPresetTax}
        onOrderSuccess={handleOrderSuccess}
      />

      <LiveTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        state={syncState}
        orderId={trackerOrderId}
      />

      <SurpriseMeModal
        isOpen={isSurpriseMeOpen}
        onClose={() => setIsSurpriseMeOpen(false)}
        currentUser={syncState.currentUser}
      />

      <DemoGuideModal
        isOpen={isDemoGuideOpen}
        onClose={() => setIsDemoGuideOpen(false)}
        onOpenGather={() => setIsGatherOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSplitBill={() => setIsSplitBillOpen(true)}
        onOpenKds={() => setCurrentView('kitchen')}
        onOpenTracker={() => {
          setTrackerOrderId(syncState.orders?.[0]?.id);
          setIsTrackerOpen(true);
        }}
        currentUser={syncState.currentUser}
      />
    </div>
  );
}
