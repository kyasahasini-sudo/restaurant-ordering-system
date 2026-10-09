import React from 'react';
import { Bell, Sparkles, User, ShoppingBag } from 'lucide-react';

export default function ToastContainer({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div 
      className="fixed bottom-20 left-4 sm:left-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-md border border-cream-300 dark:border-charcoal-800 shadow-xl rounded-xl p-3 flex items-center gap-3 transition-all duration-300 transform translate-y-0 animate-slide-up"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0"
            style={{ backgroundColor: toast.userColor || '#C85A32' }}
          >
            {toast.userName ? toast.userName[0].toUpperCase() : <User className="w-4 h-4" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-charcoal-900 dark:text-cream-100 truncate">
              {toast.userName || 'Table Activity'}
            </p>
            <p className="text-xs text-stone-600 dark:text-cream-300 line-clamp-2">
              {toast.message}
            </p>
          </div>
          <span className="text-[10px] text-stone-400 dark:text-stone-500 shrink-0">
            just now
          </span>
        </div>
      ))}
    </div>
  );
}
