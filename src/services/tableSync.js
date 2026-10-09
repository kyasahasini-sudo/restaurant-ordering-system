import { INITIAL_ORDERS } from '../data/initialOrders.js';
import { playOrderChime } from './audio.js';

const STORAGE_KEY = 'gather_and_grain_state_v2';
const CHANNEL_NAME = 'gather_and_grain_bus';

// Generate safe IDs
const uid = () => Math.random().toString(36).substring(2, 9);

// Default initial state
const defaultState = {
  table: {
    id: 'Table 7',
    code: 'GRAIN-782',
    tableName: 'Table 7 — Garden Patio',
    hostId: 'user-alex',
    members: [
      { id: 'user-alex', name: 'Alex (You)', color: '#C85A32', isHost: true },
      { id: 'user-maya', name: 'Maya', color: '#5B7065', isHost: false },
      { id: 'user-liam', name: 'Liam', color: '#D9822B', isHost: false },
    ]
  },
  currentUser: {
    id: 'user-alex',
    name: 'Alex (You)',
    color: '#C85A32'
  },
  cart: [
    {
      id: 'cart-1',
      menuItemId: 'starter-burrata',
      name: 'Burrata & Heirloom Peach',
      price: 18,
      quantity: 1,
      notes: 'Extra balsamic drizzle',
      addedBy: { id: 'user-maya', name: 'Maya', color: '#5B7065' },
      prepTime: 10
    },
    {
      id: 'cart-2',
      menuItemId: 'main-tagliatelle',
      name: 'Wood-Fired Truffle Tagliatelle',
      price: 26,
      quantity: 1,
      notes: '',
      addedBy: { id: 'user-alex', name: 'Alex (You)', color: '#C85A32' },
      prepTime: 18
    }
  ],
  orders: INITIAL_ORDERS,
  activeOrderId: null,
  kitchenMuted: false,
  undoStack: [],
  toasts: []
};

// In-memory cache
let state = (() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure orders array exists
      if (!parsed.orders || parsed.orders.length === 0) {
        parsed.orders = INITIAL_ORDERS;
      }
      return parsed;
    }
  } catch (e) {
    console.warn('Storage parse error:', e);
  }
  return defaultState;
})();

// Broadcast channel setup
let channel = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  channel = new BroadcastChannel(CHANNEL_NAME);
  channel.onmessage = (event) => {
    handleIncomingBroadcast(event.data);
  };
}

// Fallback to storage event for browsers/contexts
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY && event.newValue) {
      try {
        const newState = JSON.parse(event.newValue);
        state = newState;
        notifySubscribers();
      } catch (err) {
        console.warn('Storage event sync error:', err);
      }
    }
  });
}

function handleIncomingBroadcast(msg) {
  if (!msg || !msg.type) return;

  if (msg.type === 'SYNC_STATE') {
    state = msg.payload;
    notifySubscribers();
  } else if (msg.type === 'NEW_TOAST') {
    addLocalToast(msg.payload, false);
  } else if (msg.type === 'PLAY_CHIME') {
    playOrderChime(state.kitchenMuted);
  }
}

function persistAndBroadcast(shouldBroadcastToast = null) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('localStorage save failed:', e);
  }

  if (channel) {
    channel.postMessage({ type: 'SYNC_STATE', payload: state });
    if (shouldBroadcastToast) {
      channel.postMessage({ type: 'NEW_TOAST', payload: shouldBroadcastToast });
    }
  }
  notifySubscribers();
}

// Event Listeners / Subscribers
const subscribers = new Set();
export function subscribeToSync(callback) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

function notifySubscribers() {
  subscribers.forEach((cb) => {
    try {
      cb(state);
    } catch (e) {
      console.error('Subscriber callback error:', e);
    }
  });
}

export function getState() {
  return state;
}

// Activity Toasts
export function addLocalToast(toast, broadcast = true) {
  const newToast = {
    id: uid(),
    timestamp: Date.now(),
    ...toast
  };
  state = {
    ...state,
    toasts: [newToast, ...state.toasts.slice(0, 4)]
  };
  notifySubscribers();

  if (broadcast && channel) {
    channel.postMessage({ type: 'NEW_TOAST', payload: newToast });
  }

  // Auto remove after 4.5 seconds
  setTimeout(() => {
    state = {
      ...state,
      toasts: state.toasts.filter(t => t.id !== newToast.id)
    };
    notifySubscribers();
  }, 4500);
}

// TABLE ACTIONS
export function createTable(tableNumber, hostName, hostColor = '#C85A32') {
  const code = 'GRAIN-' + Math.floor(100 + Math.random() * 900);
  const hostId = 'user-' + uid();
  const host = {
    id: hostId,
    name: hostName || 'Host',
    color: hostColor,
    isHost: true
  };

  state = {
    ...state,
    table: {
      id: `Table ${tableNumber || 7}`,
      tableName: `Table ${tableNumber || 7}`,
      code: code,
      hostId: hostId,
      members: [host]
    },
    currentUser: host,
    cart: [],
    activeOrderId: null
  };

  const toast = {
    message: `${host.name} opened Table ${tableNumber || 7} (${code})`,
    userColor: host.color,
    userName: host.name
  };
  addLocalToast(toast, true);
  persistAndBroadcast();
}

export function joinTable(joinCode, memberName, memberColor = '#5B7065') {
  const newMemberId = 'user-' + uid();
  const newMember = {
    id: newMemberId,
    name: memberName || 'Guest',
    color: memberColor,
    isHost: false
  };

  // If table exists, add member if not already there
  const members = [...(state.table?.members || [])];
  const exists = members.some(m => m.name.toLowerCase() === memberName.toLowerCase());
  if (!exists) {
    members.push(newMember);
  }

  state = {
    ...state,
    table: {
      ...(state.table || { id: 'Table 7', tableName: 'Table 7', code: joinCode }),
      members
    },
    currentUser: newMember
  };

  const toast = {
    message: `${newMember.name} pulled up a chair to ${state.table.id}`,
    userColor: newMember.color,
    userName: newMember.name
  };
  addLocalToast(toast, true);
  persistAndBroadcast();
}

export function simulateFriendJoin(friendName, friendColor) {
  const newMember = {
    id: 'user-' + uid(),
    name: friendName,
    color: friendColor,
    isHost: false
  };

  const currentMembers = state.table?.members || [];
  if (currentMembers.some(m => m.name.toLowerCase() === friendName.toLowerCase())) {
    return; // Already exists
  }

  state = {
    ...state,
    table: {
      ...state.table,
      members: [...currentMembers, newMember]
    }
  };

  const toast = {
    message: `${newMember.name} joined the table!`,
    userColor: newMember.color,
    userName: newMember.name
  };
  addLocalToast(toast, true);
  persistAndBroadcast();
}

export function setCurrentUser(user) {
  state = { ...state, currentUser: user };
  persistAndBroadcast();
}

// CART ACTIONS
export function addToSharedCart(item, user, notes = '') {
  const activeUser = user || state.currentUser;
  const newCartItem = {
    id: 'cart-' + uid(),
    menuItemId: item.id,
    name: item.name,
    price: item.price,
    quantity: 1,
    notes: notes || '',
    addedBy: {
      id: activeUser.id,
      name: activeUser.name,
      color: activeUser.color
    },
    prepTime: item.prepTime
  };

  state = {
    ...state,
    cart: [...state.cart, newCartItem]
  };

  const toast = {
    message: `${activeUser.name} added ${item.name}`,
    userColor: activeUser.color,
    userName: activeUser.name
  };
  addLocalToast(toast, true);
  persistAndBroadcast(toast);
}

export function updateCartItemQuantity(cartItemId, delta) {
  const targetItem = state.cart.find(i => i.id === cartItemId);
  if (!targetItem) return;

  const newQty = targetItem.quantity + delta;

  if (newQty <= 0) {
    removeCartItem(cartItemId);
    return;
  }

  state = {
    ...state,
    cart: state.cart.map(i => i.id === cartItemId ? { ...i, quantity: newQty } : i)
  };

  persistAndBroadcast();
}

export function updateCartItemNotes(cartItemId, notes) {
  state = {
    ...state,
    cart: state.cart.map(i => i.id === cartItemId ? { ...i, notes } : i)
  };
  persistAndBroadcast();
}

export function removeCartItem(cartItemId) {
  const targetItem = state.cart.find(i => i.id === cartItemId);
  if (!targetItem) return;

  state = {
    ...state,
    cart: state.cart.filter(i => i.id !== cartItemId)
  };

  const toast = {
    message: `${state.currentUser.name} removed ${targetItem.name}`,
    userColor: state.currentUser.color,
    userName: state.currentUser.name
  };
  addLocalToast(toast, true);
  persistAndBroadcast(toast);
}

export function clearCart() {
  state = { ...state, cart: [] };
  persistAndBroadcast();
}

// ORDER & CHECKOUT ACTIONS
export function placeOrder({ type = 'dine-in', pickupInfo = null, tip = 0, tax = 0, notes = '' }) {
  if (state.cart.length === 0) return null;

  const orderNumInt = 1032 + state.orders.length;
  const orderNumber = `#GG-${orderNumInt}`;
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = Number((subtotal + tax + tip).toFixed(2));

  // Max prep time of items in cart
  const maxPrep = Math.max(...state.cart.map(i => i.prepTime || 15));

  const newOrder = {
    id: 'ord-' + uid(),
    orderNumber,
    type,
    tableId: type === 'dine-in' ? (state.table?.id || 'Table 7') : null,
    pickupInfo: type === 'pickup' ? pickupInfo : null,
    status: 'queued', // Queued -> Cooking -> Ready -> Completed
    createdAt: Date.now(),
    updatedAt: Date.now(),
    items: [...state.cart],
    subtotal,
    tax,
    tip,
    total,
    estimatedPrepMins: maxPrep,
    notes: notes || '',
    placedBy: state.currentUser
  };

  // Clear cart, add to orders, set active order for tracking
  state = {
    ...state,
    orders: [newOrder, ...state.orders],
    cart: [],
    activeOrderId: newOrder.id
  };

  // Play chime for staff
  playOrderChime(state.kitchenMuted);
  if (channel) {
    channel.postMessage({ type: 'PLAY_CHIME' });
  }

  const toast = {
    message: `Order ${orderNumber} placed for ${newOrder.tableId || newOrder.pickupInfo?.name}!`,
    userColor: '#C85A32',
    userName: 'Kitchen'
  };
  addLocalToast(toast, true);
  persistAndBroadcast(toast);

  return newOrder;
}

// KITCHEN ACTIONS
export function updateOrderStatus(orderId, newStatus) {
  const currentOrder = state.orders.find(o => o.id === orderId);
  if (!currentOrder) return;

  const previousStatus = currentOrder.status;

  // Save to undo stack
  const undoEntry = {
    orderId,
    previousStatus,
    newStatus,
    timestamp: Date.now(),
    orderNumber: currentOrder.orderNumber
  };

  state = {
    ...state,
    undoStack: [undoEntry, ...state.undoStack.slice(0, 9)],
    orders: state.orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: newStatus,
          updatedAt: Date.now()
        };
      }
      return o;
    })
  };

  const statusLabels = {
    cooking: 'Cooking in Kitchen',
    ready: 'Ready for Serving/Pickup',
    completed: 'Completed & Served',
    queued: 'Queued'
  };

  const toast = {
    message: `${currentOrder.orderNumber} advanced to ${statusLabels[newStatus] || newStatus}`,
    userColor: '#5B7065',
    userName: 'Kitchen Staff'
  };
  addLocalToast(toast, true);
  persistAndBroadcast(toast);
}

export function undoLastKitchenAction() {
  if (state.undoStack.length === 0) return null;

  const [lastAction, ...remainingStack] = state.undoStack;
  const order = state.orders.find(o => o.id === lastAction.orderId);

  if (!order) return null;

  state = {
    ...state,
    undoStack: remainingStack,
    orders: state.orders.map(o => {
      if (o.id === lastAction.orderId) {
        return {
          ...o,
          status: lastAction.previousStatus,
          updatedAt: Date.now()
        };
      }
      return o;
    })
  };

  const toast = {
    message: `Undid change: ${order.orderNumber} reverted to ${lastAction.previousStatus}`,
    userColor: '#D9822B',
    userName: 'Kitchen Undo'
  };
  addLocalToast(toast, true);
  persistAndBroadcast(toast);

  return lastAction;
}

export function toggleKitchenMute() {
  state = {
    ...state,
    kitchenMuted: !state.kitchenMuted
  };
  persistAndBroadcast();
}

export function generateRushHourOrders() {
  const rushOrders = [
    {
      id: 'ord-rush-1',
      orderNumber: `#GG-${1035 + Math.floor(Math.random() * 50)}`,
      type: 'dine-in',
      tableId: 'Table 9',
      pickupInfo: null,
      status: 'queued',
      createdAt: Date.now() - 4 * 60 * 1000,
      updatedAt: Date.now(),
      items: [
        { id: 'r1', name: 'Slow-Braised Heritage Short Rib', price: 34, quantity: 2, notes: 'Polenta extra warm', addedBy: { name: 'Oliver', color: '#7A1C3E' } },
        { id: 'r2', name: 'Smoked Ceylon Cinnamon Latte', price: 8, quantity: 2, notes: '', addedBy: { name: 'Emma', color: '#5B7065' } }
      ],
      subtotal: 84,
      tax: 7.14,
      tip: 15.12,
      total: 106.26,
      estimatedPrepMins: 22,
      notes: 'VIP Birthday Table'
    },
    {
      id: 'ord-rush-2',
      orderNumber: `#GG-${1036 + Math.floor(Math.random() * 50)}`,
      type: 'pickup',
      tableId: null,
      pickupInfo: { name: 'Liam Sterling', timeSlot: 'Today 8:15 PM' },
      status: 'cooking',
      createdAt: Date.now() - 13 * 60 * 1000, // Amber aging
      updatedAt: Date.now() - 5 * 60 * 1000,
      items: [
        { id: 'r3', name: 'Wood-Fired Truffle Tagliatelle', price: 26, quantity: 1, notes: 'Gluten sensitivity', addedBy: { name: 'Liam', color: '#D9822B' } },
        { id: 'r4', name: 'Crispy Truffle Polenta Fries', price: 15, quantity: 1, notes: '', addedBy: { name: 'Liam', color: '#D9822B' } }
      ],
      subtotal: 41,
      tax: 3.48,
      tip: 7.38,
      total: 51.86,
      estimatedPrepMins: 18,
      notes: 'Pickup at expediter counter'
    },
    {
      id: 'ord-rush-3',
      orderNumber: `#GG-${1037 + Math.floor(Math.random() * 50)}`,
      type: 'dine-in',
      tableId: 'Table 3',
      pickupInfo: null,
      status: 'queued',
      createdAt: Date.now() - 17 * 60 * 1000, // Red urgent aging!
      updatedAt: Date.now() - 17 * 60 * 1000,
      items: [
        { id: 'r5', name: "Pan-Seared Oyster 'Scallops'", price: 24, quantity: 2, notes: 'No cilantro', addedBy: { name: 'Hannah', color: '#234E52' } },
        { id: 'r6', name: 'Mountain Sage & White Peach Spritz', price: 12, quantity: 2, notes: '', addedBy: { name: 'Hannah', color: '#234E52' } }
      ],
      subtotal: 72,
      tax: 6.12,
      tip: 12.96,
      total: 91.08,
      estimatedPrepMins: 16,
      notes: 'Table requested speedy course'
    }
  ];

  state = {
    ...state,
    orders: [...rushOrders, ...state.orders]
  };

  playOrderChime(state.kitchenMuted);
  if (channel) {
    channel.postMessage({ type: 'PLAY_CHIME' });
  }

  const toast = {
    message: `Rush Hour simulated: 3 incoming orders added!`,
    userColor: '#C85A32',
    userName: 'Kitchen Expediter'
  };
  addLocalToast(toast, true);
  persistAndBroadcast(toast);
}

export function setActiveOrder(orderId) {
  state = { ...state, activeOrderId: orderId };
  persistAndBroadcast();
}

export function resetDemoState() {
  state = {
    ...defaultState,
    orders: INITIAL_ORDERS
  };
  persistAndBroadcast();
}
