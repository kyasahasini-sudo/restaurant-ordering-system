import React, { useState } from 'react';
import { Sparkles, RefreshCw, X, Check, Flame, Feather, Candy } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuItems.jsx';
import { addToSharedCart } from '../services/tableSync.js';

export default function SurpriseMeModal({ isOpen, onClose, currentUser }) {
  const [selectedMood, setSelectedMood] = useState('light');
  const [dietaryPref, setDietaryPref] = useState('all'); // 'all' | 'vegetarian' | 'gluten-free'
  const [recommendedItem, setRecommendedItem] = useState(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!isOpen) return null;

  const moods = [
    { id: 'light', label: 'Light & Fresh', icon: Feather, desc: 'Botanical, crisp, garden-inspired bites' },
    { id: 'hearty', label: 'Hearty & Warm', icon: Flame, desc: 'Wood-fired, rich comforting centerpieces' },
    { id: 'sweet', label: 'Sweet & Indulgent', icon: Candy, desc: 'Artisanal confections & fragrant sips' },
  ];

  const handleRecommend = (moodOverride = null) => {
    const moodToUse = moodOverride || selectedMood;
    let candidates = MENU_ITEMS.filter(item => item.mood === moodToUse);

    if (dietaryPref === 'vegetarian') {
      candidates = candidates.filter(item => item.dietary?.includes('vegetarian') || item.dietary?.includes('vegan'));
    } else if (dietaryPref === 'gluten-free') {
      candidates = candidates.filter(item => item.dietary?.includes('gluten-free'));
    }

    if (candidates.length === 0) {
      candidates = MENU_ITEMS.filter(item => item.mood === moodToUse);
    }

    const randomPick = candidates[Math.floor(Math.random() * candidates.length)] || MENU_ITEMS[0];
    setRecommendedItem(randomPick);
    setAddedSuccess(false);
  };

  const handleAddToCart = () => {
    if (!recommendedItem) return;
    addToSharedCart(recommendedItem, currentUser);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="surprise-modal-title"
    >
      <div className="bg-cream-50 dark:bg-charcoal-900 border border-cream-300 dark:border-charcoal-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-cream-200 to-terracotta-50 dark:from-charcoal-800 dark:to-charcoal-900 border-b border-cream-300 dark:border-charcoal-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-terracotta-500 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-terracotta-600 dark:text-terracotta-400">Culinary Concierge</span>
              <h3 id="surprise-modal-title" className="text-xl font-serif font-bold text-charcoal-900 dark:text-cream-100">
                Surprise Me
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-cream-300 dark:hover:bg-charcoal-800 text-stone-600 dark:text-stone-400 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!recommendedItem ? (
            <>
              {/* Question 1: Mood */}
              <div>
                <label className="block text-sm font-semibold text-charcoal-900 dark:text-cream-100 mb-2">
                  What kind of mood are you in?
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {moods.map((m) => {
                    const Icon = m.icon;
                    const isSelected = selectedMood === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedMood(m.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
                          isSelected
                            ? 'bg-cream-100 dark:bg-charcoal-800 border-terracotta-600 ring-2 ring-terracotta-500/20 shadow-sm'
                            : 'bg-white dark:bg-charcoal-800/60 border-cream-200 dark:border-charcoal-700 hover:border-stone-400'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-terracotta-600 text-white' : 'bg-cream-200 dark:bg-charcoal-700 text-stone-600 dark:text-stone-300'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-charcoal-900 dark:text-cream-100">{m.label}</p>
                          <p className="text-xs text-stone-500 dark:text-stone-400">{m.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dietary Filter */}
              <div>
                <label className="block text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                  Dietary Filter
                </label>
                <div className="flex gap-2">
                  {['all', 'vegetarian', 'gluten-free'].map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setDietaryPref(pref)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                        dietaryPref === pref
                          ? 'bg-sage-600 text-white'
                          : 'bg-cream-200 dark:bg-charcoal-800 text-stone-700 dark:text-stone-300 hover:bg-cream-300'
                      }`}
                    >
                      {pref === 'all' ? 'All Dishes' : pref === 'vegetarian' ? 'Vegetarian' : 'Gluten-Free'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => handleRecommend()}
                className="w-full py-3.5 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Find My Match
              </button>
            </>
          ) : (
            /* Recommended Item Result */
            <div className="space-y-4 animate-slide-up">
              <div className="bg-white dark:bg-charcoal-800 border border-cream-300 dark:border-charcoal-700 rounded-2xl p-4 flex flex-col items-center text-center shadow-sm">
                <div className="w-40 h-28 my-1 flex items-center justify-center">
                  {recommendedItem.illustration}
                </div>
                <div className="flex gap-2 my-2">
                  {recommendedItem.dietary?.map(tag => (
                    <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sage-100 text-sage-800 dark:bg-sage-900/60 dark:text-sage-300">
                      {tag}
                    </span>
                  ))}
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-cream-200 dark:bg-charcoal-700 text-stone-600 dark:text-stone-300">
                    ⏱️ {recommendedItem.prepTime} min prep
                  </span>
                </div>
                <h4 className="text-xl font-serif font-bold text-charcoal-900 dark:text-cream-100 mt-1">
                  {recommendedItem.name}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 max-w-sm line-clamp-3">
                  {recommendedItem.description}
                </p>
                <div className="mt-3 text-lg font-serif font-bold text-terracotta-600 dark:text-terracotta-400">
                  ${recommendedItem.price}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleRecommend()}
                  className="flex-1 py-3 px-4 rounded-xl border border-cream-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-xs font-semibold text-stone-700 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-charcoal-700 transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Spin Again
                </button>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={addedSuccess}
                  className={`flex-1 py-3 px-4 rounded-xl text-white text-xs font-semibold shadow-md transition flex items-center justify-center gap-2 ${
                    addedSuccess ? 'bg-sage-600' : 'bg-terracotta-600 hover:bg-terracotta-700'
                  }`}
                >
                  {addedSuccess ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  {addedSuccess ? 'Added to Table Cart!' : `Add to Table - $${recommendedItem.price}`}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
