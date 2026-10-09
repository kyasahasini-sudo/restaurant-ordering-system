export const INITIAL_ORDERS = [
  {
    id: 'ord-1028',
    orderNumber: '#GG-1028',
    type: 'dine-in',
    tableId: 'Table 4',
    pickupInfo: null,
    status: 'cooking',
    createdAt: Date.now() - 11 * 60 * 1000, // 11 mins ago (Amber aging)
    updatedAt: Date.now() - 4 * 60 * 1000,
    items: [
      { id: 'c1', name: 'Cast-Iron Roasted Half Chicken', price: 28, quantity: 1, notes: 'Extra crispy skin please', addedBy: { name: 'Julian', color: '#D9822B' } },
      { id: 'c2', name: 'Burrata & Heirloom Peach', price: 18, quantity: 1, notes: '', addedBy: { name: 'Elena', color: '#5B7065' } },
      { id: 'c3', name: 'Sage & Wildflower Spritz', price: 12, quantity: 2, notes: 'Light ice', addedBy: { name: 'Julian', color: '#D9822B' } }
    ],
    subtotal: 70,
    tax: 5.95,
    tip: 12.60,
    total: 88.55,
    estimatedPrepMins: 20,
    notes: 'Anniversary celebration'
  },
  {
    id: 'ord-1029',
    orderNumber: '#GG-1029',
    type: 'pickup',
    tableId: null,
    pickupInfo: { name: 'Clara Chen', timeSlot: 'Today 7:45 PM' },
    status: 'queued',
    createdAt: Date.now() - 16 * 60 * 1000, // 16 mins ago (Red pulsing - Longest wait!)
    updatedAt: Date.now() - 16 * 60 * 1000,
    items: [
      { id: 'c4', name: 'Wood-Fired Truffle Tagliatelle', price: 26, quantity: 2, notes: 'Sauce well emulsified', addedBy: { name: 'Clara', color: '#7A1C3E' } },
      { id: 'c5', name: 'Dark Chocolate & Maldon Salt Tart', price: 15, quantity: 1, notes: '', addedBy: { name: 'Clara', color: '#7A1C3E' } }
    ],
    subtotal: 67,
    tax: 5.70,
    tip: 10.05,
    total: 82.75,
    estimatedPrepMins: 18,
    notes: 'Curbside pickup — silver Subaru'
  },
  {
    id: 'ord-1030',
    orderNumber: '#GG-1030',
    type: 'dine-in',
    tableId: 'Table 12',
    pickupInfo: null,
    status: 'ready',
    createdAt: Date.now() - 7 * 60 * 1000, // 7 mins ago
    updatedAt: Date.now() - 1 * 60 * 1000,
    items: [
      { id: 'c6', name: 'Cedar Plank Wild King Salmon', price: 32, quantity: 1, notes: 'Medium rare', addedBy: { name: 'Marcus', color: '#C85A32' } },
      { id: 'c7', name: 'Roasted Beet Tartare & Chèvre', price: 16, quantity: 1, notes: '', addedBy: { name: 'Sophie', color: '#234E52' } }
    ],
    subtotal: 48,
    tax: 4.08,
    tip: 8.64,
    total: 60.72,
    estimatedPrepMins: 18,
    notes: ''
  },
  {
    id: 'ord-1031',
    orderNumber: '#GG-1031',
    type: 'dine-in',
    tableId: 'Table 2',
    pickupInfo: null,
    status: 'completed',
    createdAt: Date.now() - 35 * 60 * 1000,
    updatedAt: Date.now() - 12 * 60 * 1000,
    items: [
      { id: 'c8', name: 'Charred Heritage Sourdough', price: 12, quantity: 1, notes: '', addedBy: { name: 'Devon', color: '#4A5568' } },
      { id: 'c9', name: 'Smoked Rosemary Olive Oil Cake', price: 14, quantity: 1, notes: '', addedBy: { name: 'Devon', color: '#4A5568' } }
    ],
    subtotal: 26,
    tax: 2.21,
    tip: 5.00,
    total: 33.21,
    estimatedPrepMins: 12,
    notes: 'Paid'
  }
];
