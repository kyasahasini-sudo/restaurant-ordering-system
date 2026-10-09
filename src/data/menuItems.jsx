import React from 'react';

export const MENU_ITEMS = [
  // --- STARTERS ---
  {
    id: 'starter-burrata',
    name: 'Burrata & Heirloom Peach',
    category: 'starters',
    price: 18,
    prepTime: 10,
    calories: 420,
    mood: 'light',
    dietary: ['vegetarian', 'gluten-free'],
    description: 'Fresh Puglia burrata, wood-grilled yellow peaches, 12-yr aged Modena balsamic, cold-pressed basil oil, and toasted pistachios.',
    illustration: (
      <svg viewBox="0 0 160 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="65" r="50" fill="#EFE7DE" className="dark:fill-[#2D2A26]" />
        <ellipse cx="80" cy="65" rx="44" ry="34" fill="#FAF7F2" className="dark:fill-[#38332E]" stroke="#D5C4B0" strokeWidth="1.5" />
        {/* Burrata Ball */}
        <ellipse cx="76" cy="62" rx="22" ry="18" fill="#FFFDF9" stroke="#E2D6C6" strokeWidth="1.5" />
        <path d="M72 46 C74 42, 80 42, 82 46 C80 49, 74 49, 72 46 Z" fill="#D5C4B0" />
        {/* Grilled Peach crescents */}
        <path d="M96 55 C108 58, 112 72, 102 80 C94 80, 92 68, 96 55 Z" fill="#E27E58" />
        <path d="M98 60 Q106 66 102 75" stroke="#963816" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M52 68 C44 75, 48 86, 58 84 C64 80, 60 70, 52 68 Z" fill="#D96B43" />
        <path d="M52 72 Q56 78 56 82" stroke="#963816" strokeWidth="1.2" strokeLinecap="round" />
        {/* Basil leaves */}
        <path d="M68 50 C62 48, 62 55, 68 54 C74 53, 72 48, 68 50 Z" fill="#5B7065" />
        <path d="M88 72 C94 70, 94 77, 88 77 C82 77, 84 70, 88 72 Z" fill="#71887B" />
        {/* Balsamic Drops */}
        <circle cx="82" cy="74" r="2.5" fill="#4A1907" />
        <circle cx="70" cy="72" r="1.8" fill="#4A1907" />
        <circle cx="89" cy="58" r="2" fill="#4A1907" />
      </svg>
    )
  },
  {
    id: 'starter-sourdough',
    name: 'Charred Heritage Sourdough',
    category: 'starters',
    price: 12,
    prepTime: 6,
    calories: 360,
    mood: 'hearty',
    dietary: ['vegetarian'],
    description: '36-hour fermented spelt & einkorn loaf grilled over pecan embers. Served with whipped sea-salt cultured butter and wild honeycomb.',
    illustration: (
      <svg viewBox="0 0 160 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="72" rx="55" ry="32" fill="#E4D8C8" className="dark:fill-[#2A2622]" />
        {/* Wooden Board */}
        <rect x="25" y="45" width="110" height="42" rx="10" fill="#B38D65" stroke="#8C6843" strokeWidth="1.5" />
        <path d="M25 60 L135 60" stroke="#9C7750" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
        {/* Bread Slice 1 */}
        <path d="M42 66 C42 48, 70 45, 80 58 C85 64, 82 74, 76 74 C62 74, 42 74, 42 66 Z" fill="#D9A86E" stroke="#8C5020" strokeWidth="1.5" />
        <path d="M48 64 C48 53, 68 50, 74 60 C76 64, 74 70, 70 70 C60 70, 48 70, 48 64 Z" fill="#F4DFC3" />
        {/* Char marks */}
        <path d="M50 56 L58 53 M62 55 L70 52" stroke="#4A2508" strokeWidth="1.8" strokeLinecap="round" />
        {/* Whipped Butter Quenelle */}
        <ellipse cx="104" cy="62" rx="14" ry="9" fill="#FFF2B2" stroke="#E5C766" strokeWidth="1.2" />
        <path d="M96 61 Q104 57 114 62" stroke="#D1B045" strokeWidth="1" />
        <circle cx="106" cy="59" r="1.5" fill="#FAF7F2" />
      </svg>
    )
  },
  {
    id: 'starter-polenta',
    name: 'Crispy Truffle Polenta Fries',
    category: 'starters',
    price: 15,
    prepTime: 12,
    calories: 410,
    mood: 'hearty',
    dietary: ['vegetarian', 'gluten-free'],
    description: 'Golden polenta batons crisped in cold-pressed olive oil, sprinkled with pecorino romano and accompanied by black garlic aioli.',
    illustration: (
      <svg viewBox="0 0 160 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="75" rx="52" ry="30" fill="#EFE7DE" className="dark:fill-[#2D2A26]" />
        {/* Stack of Polenta Batons */}
        <rect x="45" y="60" width="46" height="11" rx="3" fill="#E5B338" stroke="#B8861B" strokeWidth="1.2" transform="rotate(-8 45 60)" />
        <rect x="52" y="52" width="44" height="11" rx="3" fill="#F0C34F" stroke="#B8861B" strokeWidth="1.2" transform="rotate(6 52 52)" />
        <rect x="48" y="44" width="42" height="10" rx="3" fill="#FAD169" stroke="#B8861B" strokeWidth="1.2" transform="rotate(-3 48 44)" />
        {/* Herbs */}
        <circle cx="56" cy="46" r="1.2" fill="#5B7065" />
        <circle cx="68" cy="48" r="1.2" fill="#5B7065" />
        <circle cx="75" cy="45" r="1.2" fill="#5B7065" />
        {/* Aioli Ramekin */}
        <circle cx="112" cy="62" r="16" fill="#C85A32" />
        <circle cx="112" cy="62" r="12" fill="#FAF7F2" stroke="#D5C4B0" strokeWidth="1" />
        <circle cx="112" cy="62" r="5" fill="#44594E" opacity="0.7" />
      </svg>
    )
  },
  {
    id: 'starter-beet-tartare',
    name: 'Roasted Beet Tartare & Chèvre',
    category: 'starters',
    price: 16,
    prepTime: 8,
    calories: 290,
    mood: 'light',
    dietary: ['vegetarian', 'gluten-free'],
    description: 'Salt-baked ruby and golden beets hand-diced with shallots, caperberries, whipped goat chèvre, baby sorrel, and pistachio crumb.',
    illustration: (
      <svg viewBox="0 0 160 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="70" rx="48" ry="32" fill="#FAF7F2" className="dark:fill-[#302B27]" stroke="#DCE6DF" strokeWidth="1.5" />
        {/* Tartare Ring Mound */}
        <ellipse cx="80" cy="65" rx="26" ry="16" fill="#7A1C3E" stroke="#520F27" strokeWidth="1.2" />
        <rect x="66" y="60" width="5" height="5" rx="1" fill="#C85A32" />
        <rect x="76" y="58" width="6" height="6" rx="1" fill="#9B234D" />
        <rect x="85" y="62" width="5" height="5" rx="1" fill="#E5B338" />
        {/* Chèvre Dollop */}
        <circle cx="80" cy="56" r="9" fill="#FFFDF9" stroke="#E2D6C6" strokeWidth="1" />
        <path d="M78 50 Q80 44 82 50" stroke="#8DA396" strokeWidth="1.2" />
        {/* Microgreens */}
        <path d="M74 54 Q72 46 76 45" stroke="#5B7065" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M84 53 Q88 47 84 44" stroke="#71887B" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  },

  // --- MAINS ---
  {
    id: 'main-tagliatelle',
    name: 'Wood-Fired Truffle Tagliatelle',
    category: 'mains',
    price: 26,
    prepTime: 18,
    calories: 680,
    mood: 'hearty',
    dietary: ['vegetarian'],
    description: 'Hand-rolled egg yolk ribbon pasta, forest chanterelles, black summer truffle emulsion, 30-month Parmigiano-Reggiano.',
    illustration: (
      <svg viewBox="0 0 160 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="68" rx="54" ry="34" fill="#FAF7F2" className="dark:fill-[#2E2B27]" stroke="#C85A32" strokeWidth="1.8" />
        <ellipse cx="80" cy="68" rx="38" ry="24" fill="#EFE7DE" className="dark:fill-[#3B3631]" />
        {/* Pasta ribbons nest */}
        <path d="M58 66 C65 52, 85 54, 96 62 C104 68, 92 78, 78 76 C66 74, 62 62, 74 60 C84 58, 96 66, 92 74" stroke="#F0C34F" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M64 72 C74 76, 88 74, 94 66 C98 60, 86 54, 76 56" stroke="#E5B338" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Chanterelles */}
        <ellipse cx="72" cy="64" rx="5" ry="3" fill="#D9822B" />
        <ellipse cx="90" cy="60" rx="4" ry="3" fill="#C06C18" />
        {/* Shaved Truffle */}
        <ellipse cx="82" cy="62" rx="6" ry="4" fill="#24211E" stroke="#524A42" strokeWidth="0.8" transform="rotate(-15 82 62)" />
        <ellipse cx="74" cy="72" rx="5" ry="3.5" fill="#24211E" stroke="#524A42" strokeWidth="0.8" transform="rotate(20 74 72)" />
        {/* Parsley flakes */}
        <circle cx="68" cy="58" r="1.5" fill="#5B7065" />
        <circle cx="86" cy="68" r="1.5" fill="#5B7065" />
      </svg>
    )
  },
  {
    id: 'main-oyster-scallops',
    name: "Pan-Seared Oyster 'Scallops'",
    category: 'mains',
    price: 24,
    prepTime: 16,
    calories: 450,
    mood: 'light',
    dietary: ['vegan', 'gluten-free', 'vegetarian'],
    description: 'Thick rounds of king oyster mushroom caramelized in hazelnut oil, silky parsnip silk, crispy frizzled leeks, and lovage broth.',
    illustration: (
      <svg viewBox="0 0 160 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="68" rx="52" ry="32" fill="#FAF7F2" className="dark:fill-[#2A2724]" stroke="#5B7065" strokeWidth="1.5" />
        {/* Parsnip Silk swirl */}
        <path d="M52 74 C62 60, 98 56, 110 70" stroke="#F5EFEB" strokeWidth="10" strokeLinecap="round" opacity="0.9" />
        {/* 3 Mushroom rounds */}
        <ellipse cx="66" cy="66" rx="10" ry="8" fill="#F4DFC3" stroke="#8C5020" strokeWidth="1.4" />
        <ellipse cx="66" cy="65" rx="7" ry="5" fill="#C68A4C" />
        <ellipse cx="86" cy="62" rx="11" ry="8.5" fill="#F4DFC3" stroke="#8C5020" strokeWidth="1.4" />
        <ellipse cx="86" cy="61" rx="8" ry="5.5" fill="#C68A4C" />
        <ellipse cx="102" cy="70" rx="9" ry="7" fill="#F4DFC3" stroke="#8C5020" strokeWidth="1.4" />
        <ellipse cx="102" cy="69" rx="6.5" ry="4.5" fill="#C68A4C" />
        {/* Frizzled Leeks */}
        <path d="M78 56 Q84 48 88 54" stroke="#8DA396" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M82 54 Q86 46 90 52" stroke="#5B7065" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'main-short-rib',
    name: 'Slow-Braised Heritage Short Rib',
    category: 'mains',
    price: 34,
    prepTime: 22,
    calories: 820,
    mood: 'hearty',
    dietary: ['gluten-free'],
    description: '14-hour red wine braised bone-in beef short rib with stone-ground saffron polenta, bone marrow jus, and lemon gremolata.',
    illustration: (
      <svg viewBox="0 0 160 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="70" rx="55" ry="34" fill="#FAF7F2" className="dark:fill-[#2B2724]" stroke="#5B7065" strokeWidth="2" />
        {/* Saffron Polenta Base */}
        <ellipse cx="80" cy="72" rx="38" ry="22" fill="#F5C344" />
        {/* Short rib block */}
        <path d="M62 60 L94 56 L100 70 L66 76 Z" fill="#4A1E14" stroke="#2B1009" strokeWidth="1.5" />
        <path d="M62 60 L78 52 L110 50 L94 56 Z" fill="#6A2E20" />
        {/* Bone */}
        <ellipse cx="104" cy="54" rx="4" ry="6" fill="#FBF9F5" stroke="#C4B49F" strokeWidth="1" />
        {/* Glaze sheen */}
        <path d="M70 62 Q82 58 92 63" stroke="#C85A32" strokeWidth="2" strokeLinecap="round" />
        {/* Gremolata parsley + lemon zest */}
        <circle cx="76" cy="58" r="1.5" fill="#5B7065" />
        <circle cx="82" cy="56" r="1.5" fill="#E5B338" />
        <circle cx="88" cy="60" r="1.5" fill="#5B7065" />
      </svg>
    )
  },
  {
    id: 'main-cast-iron-chicken',
    name: 'Cast-Iron Roasted Half Chicken',
    category: 'mains',
    price: 28,
    prepTime: 20,
    calories: 740,
    mood: 'hearty',
    dietary: ['gluten-free'],
    description: 'Pasture-raised chicken slow-roasted under cast-iron press with Meyer lemon, charred thyme, schmaltz roasted fingerlings, and pan drippings.',
    illustration: (
      <svg viewBox="0 0 160 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Skillet Handle and rim */}
        <rect x="18" y="63" width="22" height="7" rx="3" fill="#2E2A27" />
        <circle cx="85" cy="67" r="44" fill="#3A3531" stroke="#24211E" strokeWidth="2.5" />
        <circle cx="85" cy="67" r="38" fill="#2E2A27" />
        {/* Golden Roast Chicken */}
        <ellipse cx="82" cy="66" rx="24" ry="18" fill="#C6772E" stroke="#874712" strokeWidth="1.5" />
        <ellipse cx="80" cy="64" rx="20" ry="14" fill="#D98A3B" />
        {/* Crispy skin blisters */}
        <circle cx="74" cy="62" r="2" fill="#753809" />
        <circle cx="86" cy="60" r="2.5" fill="#753809" />
        <circle cx="82" cy="70" r="1.8" fill="#753809" />
        {/* Charred Lemon half */}
        <circle cx="104" cy="66" r="9" fill="#E5B338" stroke="#9E7618" strokeWidth="1" />
        <path d="M98 66 L110 66 M104 60 L104 72" stroke="#4A3406" strokeWidth="1" />
        {/* Herb sprig */}
        <path d="M64 54 Q72 58 78 52" stroke="#5B7065" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'main-cedar-salmon',
    name: 'Cedar Plank Wild King Salmon',
    category: 'mains',
    price: 32,
    prepTime: 18,
    calories: 610,
    mood: 'hearty',
    dietary: ['gluten-free', 'spicy'],
    description: 'Pacific Northwest wild salmon roasted on aromatic cedar plank with smoked chili honey glaze, charred asparagus, and lemon dill crème.',
    illustration: (
      <svg viewBox="0 0 160 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="74" rx="56" ry="30" fill="#FAF7F2" className="dark:fill-[#282522]" stroke="#D5C4B0" strokeWidth="1.2" />
        {/* Cedar Plank */}
        <rect x="34" y="52" width="92" height="34" rx="4" fill="#8C5020" stroke="#5E310F" strokeWidth="1.5" />
        <path d="M34 62 L126 62 M34 72 L126 72" stroke="#703C14" strokeWidth="1" />
        {/* Salmon Fillet */}
        <path d="M48 64 C54 55, 96 54, 108 62 C108 72, 98 76, 50 74 Z" fill="#E26D5C" stroke="#A74132" strokeWidth="1.2" />
        {/* Grill marks */}
        <path d="M58 58 L68 74 M74 57 L84 73 M90 58 L100 72" stroke="#5C1F16" strokeWidth="1.8" strokeLinecap="round" />
        {/* Asparagus tips */}
        <rect x="42" y="76" width="38" height="5" rx="2.5" fill="#5B7065" transform="rotate(-5 42 76)" />
        <rect x="84" y="74" width="34" height="5" rx="2.5" fill="#71887B" transform="rotate(4 84 74)" />
      </svg>
    )
  },

  // --- DESSERTS ---
  {
    id: 'dessert-olive-oil-cake',
    name: 'Smoked Rosemary Olive Oil Cake',
    category: 'desserts',
    price: 14,
    prepTime: 8,
    calories: 430,
    mood: 'sweet',
    dietary: ['vegetarian'],
    description: 'Castelvetrano olive oil sponge infused with smoked rosemary, orange blossom syrup, quenelle of whipped mascarpone, and candied peel.',
    illustration: (
      <svg viewBox="0 0 160 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="72" rx="50" ry="30" fill="#FAF7F2" className="dark:fill-[#2B2825]" stroke="#C85A32" strokeWidth="1.5" />
        {/* Cake Slice Triangle */}
        <path d="M50 74 L88 44 L114 68 L50 74 Z" fill="#E5B338" stroke="#A87A13" strokeWidth="1.2" />
        <path d="M50 74 L114 68 L112 76 L48 82 Z" fill="#BF8D1B" />
        {/* Mascarpone Dollop */}
        <circle cx="78" cy="56" r="10" fill="#FFFDF9" stroke="#E2D6C6" strokeWidth="1.2" />
        {/* Rosemary Sprig */}
        <path d="M72 44 Q76 48 84 46" stroke="#5B7065" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M76 46 L74 42 M80 47 L82 43" stroke="#5B7065" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'dessert-chocolate-tart',
    name: 'Dark Chocolate & Maldon Salt Tart',
    category: 'desserts',
    price: 15,
    prepTime: 10,
    calories: 520,
    mood: 'sweet',
    dietary: ['vegetarian'],
    description: '74% single-estate Madagascar cacao silk, toasted hazelnut crust, smoked caramel ribbon, and flaked Maldon sea salt pyramids.',
    illustration: (
      <svg viewBox="0 0 160 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="70" rx="48" ry="30" fill="#FAF7F2" className="dark:fill-[#2D2926]" stroke="#5B7065" strokeWidth="1.4" />
        {/* Fluted Dark Tart Slice */}
        <path d="M54 74 L84 46 L112 70 L54 74 Z" fill="#24140E" stroke="#120A07" strokeWidth="1.2" />
        <path d="M54 74 L112 70 L110 77 L52 81 Z" fill="#8C5020" />
        {/* Mirror Gloss shine */}
        <path d="M74 56 Q84 52 96 62" stroke="#4A2818" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        {/* Maldon Salt Pyramids */}
        <rect x="80" y="58" width="4" height="4" fill="#FFFFFF" transform="rotate(45 80 58)" />
        <rect x="89" y="61" width="3" height="3" fill="#FFFFFF" transform="rotate(30 89 61)" />
        <rect x="73" y="64" width="3.5" height="3.5" fill="#FFFFFF" transform="rotate(15 73 64)" />
      </svg>
    )
  },
  {
    id: 'dessert-panna-cotta',
    name: 'Vanilla Bean & Blackberry Panna Cotta',
    category: 'desserts',
    price: 13,
    prepTime: 6,
    calories: 340,
    mood: 'sweet',
    dietary: ['gluten-free', 'vegetarian'],
    description: 'Chilled Piedmontese cream infused with Tahitian vanilla pods, wild mountain blackberry coulis, and crystalized violet petals.',
    illustration: (
      <svg viewBox="0 0 160 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="85" rx="36" ry="16" fill="#E4D8C8" className="dark:fill-[#282522]" />
        {/* Glass Tumbler */}
        <path d="M60 40 L64 80 Q80 86 96 80 L100 40 Z" fill="rgba(240, 245, 243, 0.4)" stroke="#8DA396" strokeWidth="1.2" />
        {/* Cream Panna Cotta layer */}
        <path d="M63 56 L64 78 Q80 83 96 78 L97 56 Z" fill="#FFFDF9" />
        {/* Vanilla specks */}
        <circle cx="75" cy="65" r="0.8" fill="#4A4135" />
        <circle cx="84" cy="72" r="0.8" fill="#4A4135" />
        {/* Blackberry Coulis layer */}
        <ellipse cx="80" cy="54" rx="16.5" ry="6" fill="#5E1236" />
        <circle cx="76" cy="52" r="3" fill="#3D0B23" />
        <circle cx="82" cy="51" r="3.2" fill="#3D0B23" />
        {/* Mint garnish */}
        <path d="M80 44 Q86 42 85 48" stroke="#5B7065" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'dessert-fig-gelato',
    name: 'Roasted Fig & Wildflower Gelato',
    category: 'desserts',
    price: 11,
    prepTime: 5,
    calories: 310,
    mood: 'sweet',
    dietary: ['vegetarian', 'gluten-free'],
    description: 'Slow-churned pasture milk gelato swirled with caramelized black mission figs, clover honey drizzle, and candied pine nuts.',
    illustration: (
      <svg viewBox="0 0 160 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Terracotta Dish */}
        <ellipse cx="80" cy="78" rx="42" ry="20" fill="#FAF7F2" className="dark:fill-[#282522]" />
        <path d="M52 64 C52 82, 108 82, 108 64 Z" fill="#C85A32" stroke="#963816" strokeWidth="1.5" />
        {/* Two Gelato Scoops */}
        <circle cx="72" cy="58" r="14" fill="#F7EADB" stroke="#D5C4B0" strokeWidth="1.2" />
        <circle cx="88" cy="56" r="15" fill="#F7EADB" stroke="#D5C4B0" strokeWidth="1.2" />
        {/* Fig swirls & slice */}
        <path d="M68 54 Q74 60 72 64" stroke="#7A1C3E" strokeWidth="2" strokeLinecap="round" />
        <path d="M84 50 Q92 56 88 62" stroke="#7A1C3E" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M80 44 C84 40, 88 44, 85 48 Z" fill="#9B234D" />
      </svg>
    )
  },

  // --- DRINKS ---
  {
    id: 'drink-sage-spritz',
    name: 'Mountain Sage & White Peach Spritz',
    category: 'drinks',
    price: 12,
    prepTime: 4,
    calories: 140,
    mood: 'light',
    dietary: ['vegan', 'gluten-free'],
    description: 'Clarified orchard peach puree, bruised mountain sage, artisanal tonic, and prosecco (or zero-proof botanical sparkling).',
    illustration: (
      <svg viewBox="0 0 160 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="98" rx="16" ry="6" fill="#D5C4B0" />
        {/* Wine/Spritz Glass stem */}
        <line x1="80" y1="74" x2="80" y2="98" stroke="#8DA396" strokeWidth="2" />
        {/* Goblet Bowl */}
        <path d="M64 42 C64 74, 96 74, 96 42 Z" fill="rgba(245, 223, 213, 0.55)" stroke="#71887B" strokeWidth="1.4" />
        {/* Liquid */}
        <path d="M65 48 C65 72, 95 72, 95 48 Z" fill="#F5DFD5" />
        {/* Ice Cubes */}
        <rect x="73" y="52" width="7" height="7" rx="1.5" fill="#FFFFFF" opacity="0.7" />
        <rect x="79" y="58" width="8" height="8" rx="1.5" fill="#FFFFFF" opacity="0.7" />
        {/* Sage Leaf */}
        <path d="M84 34 C80 40, 88 44, 86 52" stroke="#5B7065" strokeWidth="2.5" strokeLinecap="round" />
        {/* Effervescence */}
        <circle cx="76" cy="64" r="1.2" fill="#FFFFFF" />
        <circle cx="84" cy="66" r="1.2" fill="#FFFFFF" />
        <circle cx="78" cy="48" r="1.2" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: 'drink-cinnamon-latte',
    name: 'Smoked Ceylon Cinnamon Latte',
    category: 'drinks',
    price: 8,
    prepTime: 5,
    calories: 190,
    mood: 'sweet',
    dietary: ['vegetarian', 'gluten-free'],
    description: 'Single-origin espresso, steamed organic oat milk, house-smoked Ceylon cinnamon syrup, and grated whole nutmeg.',
    illustration: (
      <svg viewBox="0 0 160 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Saucer */}
        <ellipse cx="80" cy="85" rx="38" ry="12" fill="#EFE7DE" className="dark:fill-[#2B2724]" stroke="#D5C4B0" strokeWidth="1.2" />
        {/* Mug */}
        <path d="M58 52 L62 80 Q80 84 98 80 L102 52 Z" fill="#FAF7F2" className="dark:fill-[#38332E]" stroke="#C85A32" strokeWidth="1.5" />
        {/* Mug handle */}
        <path d="M100 58 C112 58, 112 74, 98 74" stroke="#C85A32" strokeWidth="2" fill="none" />
        {/* Latte surface */}
        <ellipse cx="80" cy="54" rx="20" ry="7" fill="#C68A4C" />
        {/* Latte foam rosetta */}
        <ellipse cx="80" cy="54" rx="14" ry="4.5" fill="#FFFDF9" />
        <path d="M80 51 L80 57" stroke="#A86E35" strokeWidth="1" strokeLinecap="round" />
        {/* Cinnamon stick */}
        <line x1="86" y1="42" x2="96" y2="58" stroke="#8C5020" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'drink-blackberry-shrub',
    name: 'Fermented Blackberry Botanical Shrub',
    category: 'drinks',
    price: 10,
    prepTime: 4,
    calories: 120,
    mood: 'light',
    dietary: ['vegan', 'gluten-free'],
    description: 'Wild heirloom blackberries macerated with raw apple cider vinegar, thyme, sparkling spring water, and crushed ice.',
    illustration: (
      <svg viewBox="0 0 160 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Highball Glass */}
        <path d="M66 38 L68 88 Q80 92 92 88 L94 38 Z" fill="rgba(240, 245, 243, 0.4)" stroke="#71887B" strokeWidth="1.4" />
        {/* Deep Ruby liquid */}
        <path d="M67 48 L68 87 Q80 90 92 87 L93 48 Z" fill="#7A1C3E" />
        {/* Crushed Ice */}
        <rect x="72" y="52" width="6" height="6" rx="1.5" fill="#FAF7F2" opacity="0.6" />
        <rect x="80" y="56" width="6" height="6" rx="1.5" fill="#FAF7F2" opacity="0.6" />
        <rect x="74" y="66" width="7" height="7" rx="1.5" fill="#FAF7F2" opacity="0.6" />
        {/* Fresh Berries on top */}
        <circle cx="76" cy="46" r="3.5" fill="#3D0B23" />
        <circle cx="84" cy="45" r="3.2" fill="#3D0B23" />
        {/* Straw */}
        <line x1="88" y1="28" x2="78" y2="84" stroke="#E27E58" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'drink-stonefruit-cider',
    name: 'Orchard Stonefruit Sparkling Cider',
    category: 'drinks',
    price: 11,
    prepTime: 5,
    calories: 160,
    mood: 'light',
    dietary: ['vegan', 'gluten-free'],
    description: 'Estate-pressed heirloom apples, white nectarines, cloves, and elderflower fermented dry with gentle natural carbonation.',
    illustration: (
      <svg viewBox="0 0 160 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="95" rx="18" ry="6" fill="#D5C4B0" />
        <line x1="80" y1="72" x2="80" y2="95" stroke="#71887B" strokeWidth="2" />
        {/* Coupe bowl */}
        <path d="M54 50 C54 72, 106 72, 106 50 Z" fill="rgba(240, 230, 200, 0.4)" stroke="#71887B" strokeWidth="1.4" />
        <path d="M56 52 C56 70, 104 70, 104 52 Z" fill="#F0C34F" opacity="0.85" />
        {/* Dehydrated Apple Wheel */}
        <circle cx="72" cy="46" r="8" fill="#E5B338" stroke="#8C5020" strokeWidth="1" />
        <circle cx="72" cy="46" r="2.5" fill="#8C5020" />
        {/* Bubbles */}
        <circle cx="78" cy="62" r="1.2" fill="#FFFDF9" />
        <circle cx="84" cy="58" r="1.5" fill="#FFFDF9" />
        <circle cx="88" cy="64" r="1" fill="#FFFDF9" />
      </svg>
    )
  }
];
