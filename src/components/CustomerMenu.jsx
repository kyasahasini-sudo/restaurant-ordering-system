import React, { useState } from 'react';
import { 
  Sparkles, Filter, Search, Plus, Check, Clock, 
  MessageSquare, Users, Utensils, Heart, Leaf, Flame 
} from 'lucide-react';
import { MENU_ITEMS } from '../data/menuItems.jsx';
import { addToSharedCart } from '../services/tableSync.js';

export default function CustomerMenu({ 
  state, 
  onOpenSurpriseMe, 
  onOpenGather, 
  onOpenCart 
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [glutenFreeOnly, setGlutenFreeOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [itemNotes, setItemNotes] = useState({});
  const [activeNoteInputId, setActiveNoteInputId] = useState(null);
  const [addedItemAnim, setAddedItemAnim] = useState(null);

  const categories = [
    { id: 'all', label: 'All Dishes', count: MENU_ITEMS.length },
    { id: 'starters', label: 'Starters', count: MENU_ITEMS.filter(i => i.category === 'starters').length },
    { id: 'mains', label: 'Mains', count: MENU_ITEMS.filter(i => i.category === 'mains').length },
    { id: 'desserts', label: 'Desserts', count: MENU_ITEMS.filter(i => i.category === 'desserts').length },
    { id: 'drinks', label: 'Craft Drinks', count: MENU_ITEMS.filter(i => i.category === 'drinks').length },
  ];

  // Filtering
  const filteredItems = MENU_ITEMS.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (vegetarianOnly && !item.dietary?.includes('vegetarian') && !item.dietary?.includes('vegan')) {
      return false;
    }
    if (glutenFreeOnly && !item.dietary?.includes('gluten-free')) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      if (!matchName && !matchDesc) return false;
    }
    return true;
  });

  const handleAddToCart = (item) => {
    const note = itemNotes[item.id] || '';
    addToSharedCart(item, state.currentUser, note);

    // Clear note after adding
    if (note) {
      setItemNotes(prev => ({ ...prev, [item.id]: '' }));
      setActiveNoteInputId(null);
    }

    setAddedItemAnim(item.id);
    setTimeout(() => setAddedItemAnim(null), 1200);
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cream-200 via-cream-100 to-terracotta-100/60 dark:from-charcoal-900 dark:via-charcoal-800 dark:to-terracotta-950/30 border border-cream-300 dark:border-charcoal-700/80 p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-100 dark:bg-terracotta-950/60 border border-terracotta-200 dark:border-terracotta-800 text-terracotta-700 dark:text-terracotta-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-terracotta-600 animate-pulse" />
            <span>Shared Dining Experience</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-charcoal-900 dark:text-cream-50 leading-tight">
            Gather around the table. <br />
            <span className="italic font-normal text-terracotta-700 dark:text-terracotta-400">Order &amp; split together.</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-xl">
            Invite your party with a QR card or code. Every dish added to the cart is tagged with who selected it, synced across screens in real-time.
          </p>

          {/* Active Table Status Pill */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenGather}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white dark:bg-charcoal-800 border border-cream-300 dark:border-charcoal-700 shadow-xs hover:border-terracotta-500 transition group"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                style={{ backgroundColor: state.currentUser?.color || '#C85A32' }}
              >
                {state.currentUser?.name ? state.currentUser.name[0].toUpperCase() : 'U'}
              </div>
              <div className="text-left text-xs">
                <span className="text-stone-500 dark:text-stone-400 block text-[10px]">
                  {state.table?.id || 'Table 7'} • {state.table?.members?.length || 1} Guests
                </span>
                <span className="font-bold text-charcoal-900 dark:text-cream-100 group-hover:text-terracotta-600 transition">
                  Ordering as {state.currentUser?.name || 'You'} (Code: {state.table?.code})
                </span>
              </div>
            </button>

            <button
              onClick={onOpenSurpriseMe}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold shadow-sm transition"
            >
              <Sparkles className="w-4 h-4" />
              Surprise Me (Mood Concierge)
            </button>
          </div>
        </div>

        {/* Decorative corner illustration */}
        <div className="hidden lg:block absolute -right-6 -bottom-6 w-64 h-64 opacity-15 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-terracotta-600">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
            <path d="M50 20 Q55 50 80 50 Q55 50 50 80 Q45 50 20 50 Q45 50 50 20 Z" />
          </svg>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="space-y-4">
        {/* Categories Bar */}
        <div className="flex items-center justify-between gap-3 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shadow-2xs ${
                  selectedCategory === cat.id
                    ? 'bg-charcoal-900 text-white dark:bg-cream-100 dark:text-charcoal-950 shadow-sm'
                    : 'bg-white dark:bg-charcoal-800 text-stone-600 dark:text-stone-300 border border-cream-200 dark:border-charcoal-700 hover:bg-cream-200'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Toggles and Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-charcoal-900 p-3 rounded-2xl border border-cream-200 dark:border-charcoal-800 shadow-xs">
          {/* Dietary Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setVegetarianOnly(!vegetarianOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                vegetarianOnly
                  ? 'bg-sage-600 text-white shadow-xs'
                  : 'bg-cream-100 dark:bg-charcoal-800 text-stone-600 dark:text-stone-300 hover:bg-cream-200'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              Vegetarian Only
            </button>

            <button
              onClick={() => setGlutenFreeOnly(!glutenFreeOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                glutenFreeOnly
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-cream-100 dark:bg-charcoal-800 text-stone-600 dark:text-stone-300 hover:bg-cream-200'
              }`}
            >
              🌾 Gluten-Free Only
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-cream-50 dark:bg-charcoal-800 border border-cream-300 dark:border-charcoal-700 text-charcoal-900 dark:text-cream-100 focus:outline-none focus:border-terracotta-500"
            />
          </div>
        </div>
      </section>

      {/* Dishes Grid */}
      <section>
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-charcoal-900 rounded-3xl border border-cream-200 dark:border-charcoal-800 p-8">
            <Utensils className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-charcoal-900 dark:text-cream-100">
              No dishes match your filter
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Try adjusting dietary filters or search keywords.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isAddedJustNow = addedItemAnim === item.id;
              const isEditingNote = activeNoteInputId === item.id;
              const currentNote = itemNotes[item.id] || '';

              // Count in cart
              const inCartCount = state.cart
                ?.filter(i => i.menuItemId === item.id)
                .reduce((s, i) => s + i.quantity, 0) || 0;

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-charcoal-900 rounded-3xl border border-cream-200 dark:border-charcoal-800 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Illustration Banner */}
                  <div className="relative bg-gradient-to-b from-cream-100 to-cream-50 dark:from-charcoal-800 dark:to-charcoal-850 p-4 pt-6 h-48 flex items-center justify-center overflow-hidden border-b border-cream-200/80 dark:border-charcoal-800">
                    <div className="w-44 h-36 transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
                      {item.illustration}
                    </div>

                    {/* Prep Time Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-charcoal-900/90 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-cream-200 dark:border-charcoal-700 text-[11px] font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1 shadow-2xs">
                      <Clock className="w-3 h-3 text-stone-400" />
                      <span>{item.prepTime} min</span>
                    </div>

                    {/* Quantity Badge if in cart */}
                    {inCartCount > 0 && (
                      <div className="absolute top-3 left-3 bg-terracotta-600 text-white px-2.5 py-0.5 rounded-xl text-xs font-bold shadow-sm">
                        {inCartCount} at table
                      </div>
                    )}
                  </div>

                  {/* Dish Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Dietary Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {item.dietary?.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                              tag === 'vegetarian'
                                ? 'bg-sage-100 text-sage-800 dark:bg-sage-950/60 dark:text-sage-300'
                                : tag === 'vegan'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : tag === 'gluten-free'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                        {item.spicy && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-terracotta-100 text-terracotta-800 dark:bg-terracotta-950/60 dark:text-terracotta-300">
                            Spicy 🔥
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif text-lg font-bold text-charcoal-900 dark:text-cream-100 group-hover:text-terracotta-700 dark:group-hover:text-terracotta-400 transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-serif font-bold text-lg text-terracotta-600 dark:text-terracotta-400 shrink-0">
                          ${item.price}
                        </span>
                      </div>

                      <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Special Instructions Note Expandable */}
                    <div className="pt-2 border-t border-cream-100 dark:border-charcoal-800">
                      {isEditingNote ? (
                        <div className="space-y-1.5">
                          <input
                            type="text"
                            placeholder="Add request (e.g. dressing on side)..."
                            value={currentNote}
                            onChange={(e) => setItemNotes({ ...itemNotes, [item.id]: e.target.value })}
                            className="w-full text-xs px-2.5 py-1.5 rounded-xl border border-cream-300 dark:border-charcoal-700 bg-cream-50 dark:bg-charcoal-800 text-charcoal-900 dark:text-cream-100 focus:outline-none focus:border-terracotta-500"
                            autoFocus
                          />
                          <div className="flex justify-end gap-1">
                            <button
                              onClick={() => setActiveNoteInputId(null)}
                              className="text-[10px] px-2 py-0.5 text-stone-500 hover:text-stone-700"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                          {currentNote ? (
                            <span className="italic text-terracotta-700 dark:text-terracotta-300">
                              Note: "{currentNote}"
                            </span>
                          ) : (
                            <button
                              onClick={() => setActiveNoteInputId(item.id)}
                              className="hover:text-terracotta-600 dark:hover:text-terracotta-400 flex items-center gap-1 transition"
                            >
                              <MessageSquare className="w-3 h-3" />
                              + Special request
                            </button>
                          )}
                          {currentNote && (
                            <button
                              onClick={() => setActiveNoteInputId(item.id)}
                              className="text-stone-400 hover:text-terracotta-600 text-[10px]"
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Add to Shared Cart Button */}
                    <button
                      type="button"
                      onClick={() => handleAddToCart(item)}
                      className={`w-full py-3 px-4 rounded-2xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-xs ${
                        isAddedJustNow
                          ? 'bg-sage-600 text-white'
                          : 'bg-terracotta-600 hover:bg-terracotta-700 text-white hover:shadow-md'
                      }`}
                      aria-label={`Add ${item.name} to shared table cart for $${item.price}`}
                    >
                      {isAddedJustNow ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Table Cart!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add to Table Cart — ${item.price}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
