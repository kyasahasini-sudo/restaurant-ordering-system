# 🌾 Gather & Grain — Shared Table Dining Portal

> A hackathon restaurant portal whose signature feature is **Shared Table Ordering**, engineered to work entirely client-side with **zero external services**.

---

## 🌟 Key Highlights & Signature Features

### 1. 🪑 Table Gather (Signature Shared Table Ordering)
- **Start or Join a Table**: Open a table (e.g. Table 7) and receive a shareable 6-digit join code (`GRAIN-782`) and a custom QR-style card.
- **Color-Coded Friends**: Guests join with custom names and colored avatars (Alex, Maya, Liam, Chloe).
- **One Unified Shared Cart**: Every dish added shows **who added it** (avatar badge & name).
- **Cross-Tab Real-Time Sync**: Synchronized across tabs via `BroadcastChannel` with fallback to `localStorage` storage events. Open two tabs side-by-side to watch cart additions and status changes reflect instantly.
- **Live Activity Toasts**: Non-intrusive toasts like *"🟢 Maya added Burrata & Heirloom Peach"* announce table actions.
- **Split-the-Bill Calculator**:
  - **Equal Split**: Evenly divides total among guests.
  - **Itemized Split (By Person's Items)**: Groups items by who ordered them and calculates per-person dish subtotals, proportional tax (8.5%), and tip with tip selector (0%, 15%, 18%, 20%, 25%).
  - **Copy Receipt**: One-click summary for messaging friends.
- **Synchronized Checkout**: One person confirms order -> the entire table transitions to the **Live Order Tracker** simultaneously.

### 2. 🍽️ Customer Menu
- **17 Artisanal Dishes** across Starters, Mains, Desserts, and Craft Drinks.
- **Custom Inline SVG Illustrations** for every dish (no emojis for food artwork) styled in cream, sage green, and terracotta hues.
- **Dietary Badges**: Vegetarian (V), Vegan (VG), Gluten-Free (GF), and Spicy (🔥).
- **Prep Time Badges**: e.g., 6 min, 10 min, 18 min, 22 min.
- **Category Filters & Dietary Toggles**: Vegetarian-only & Gluten-free filters, instant search.
- **"Surprise Me" Concierge**: Recommends dishes based on your mood (*Light & Fresh*, *Hearty & Warm*, *Sweet & Indulgent*) and dietary requirements.
- **Cart Customization**: Quantity steppers (+/-), item removal, and special kitchen notes.
- **Checkout Options**: Dine-In (Table 7) or Artisan Pickup (Name + scheduled time slot).

### 3. 👨‍🍳 Kitchen Display System (KDS)
- **Staff PIN Gate**: Security locked with PIN `1234` (includes a 1-click Demo Fill shortcut).
- **4 Kanban Columns**: Queued → Cooking → Ready → Completed with real-time counters.
- **Aging Orders**:
  - Normal (< 8 mins)
  - Amber Warning (8-15 mins)
  - Pulsing Red Urgent Alert (> 15 mins) with `animate-pulse-urgent`.
- **Longest Wait Banner**: Priority expedite banner for tickets waiting longest.
- **Kitchen Load Meter**: Dynamically gauges station capacity:
  - *Calm* (1-2 active tickets)
  - *Busy* (3-5 active tickets)
  - *Slammed* (6+ active tickets)
- **New-Order Chime**: Synthesized two-tone bell chime using the **Web Audio API** (no external audio files needed) with mute toggle.
- **Rush Hour Demo**: Generates 3 realistic orders with varying aging states.
- **Undo Last Action**: Reverts the last kitchen status change with a persistent button.

### 4. ⏱️ Live Order Tracker
- Unique order numbers (e.g. `#GG-1028`, `#GG-1032`).
- Animated 4-stage stepper.
- Live queue depth ("Orders ahead in kitchen") and countdown timer.
- **Celebration State**: Burst of colorful confetti (`canvas-confetti`) when order is marked Ready/Completed.

### 5. 🎨 Design, Polish & Accessibility
- **Palette**: Cream (`#FAF7F2`, `#EFE7DE`), Sage Green (`#5B7065`), Terracotta (`#C85A32`), and Charcoal (`#24211E`).
- **Typography**: Playfair Display serif headings paired with Plus Jakarta Sans body.
- **Dark Mode**: Persistent dark mode with warm charcoal tones.
- **Accessibility**: Visible keyboard focus rings, `prefers-reduced-motion` compliance, Esc closes dialogs, and responsive down to 360px without horizontal scroll.
- **Judge Demo Guide**: 6-click walkthrough pill in the navigation header.

---

## 🚀 Running the Project

### Development Server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build:
```bash
npm run build
npm run preview
```

---

## 🧪 Quick 6-Click Judge Testing Path

1. **Step 1 — Table Gather**: Click the Table status pill (`Table 7`) to open the QR card and join code.
2. **Step 2 — Add Dishes**: Add *Burrata & Heirloom Peach* and *Wood-Fired Truffle Tagliatelle*. Note the "Added by [Name]" badges.
3. **Step 3 — Multi-Tab Sync**: Click "Open Demo Tab" to open a second tab. Add a dish in Tab B and see Tab A update immediately with an activity toast.
4. **Step 4 — Split the Bill**: Open the cart and click "Split the Bill". Switch between *Equal Split* and *By Person's Items*.
5. **Step 5 — Place Order & Tracker**: Confirm order to see the synchronized Live Tracker and queue depth.
6. **Step 6 — Kitchen Display**: Click "Staff KDS", enter PIN `1234`, advance orders, test "Rush Hour Demo", and hit "Undo Last".
