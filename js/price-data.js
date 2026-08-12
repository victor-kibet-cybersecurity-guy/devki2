/**
 * Centralized Devki Group Product Catalog & 2026 Price List
 * Single source of truth for steel rebar, cement, mabati roofing, steel tubes, and fertilizer.
 * Allows easy future bulk price updates across the platform.
 */

window.DEVKI_PRICE_CATALOG = [
  // --- STEEL REBAR ---
  {
    id: "steel-d8",
    name: "Devki Steel Rebar D8 (8mm Deformed)",
    spec: "BS 4449 Grade 500B High Yield Rebar • 12 Meter Bar",
    category: "steel",
    categoryLabel: "Steel Rebar",
    unit: "bar",
    unitLabel: "Per Bar (12m)",
    price: 490,
    moq: "20 Bars",
    featured: true
  },
  {
    id: "steel-d10",
    name: "Devki Steel Rebar D10 (10mm Deformed)",
    spec: "BS 4449 Grade 500B High Yield Rebar • 12 Meter Bar",
    category: "steel",
    categoryLabel: "Steel Rebar",
    unit: "bar",
    unitLabel: "Per Bar (12m)",
    price: 760,
    moq: "15 Bars",
    featured: true
  },
  {
    id: "steel-d12",
    name: "Devki Steel Rebar D12 (12mm Deformed)",
    spec: "BS 4449 Grade 500B High Yield Rebar • 12 Meter Bar",
    category: "steel",
    categoryLabel: "Steel Rebar",
    unit: "bar",
    unitLabel: "Per Bar (12m)",
    price: 1120,
    moq: "10 Bars",
    featured: true
  },
  {
    id: "steel-d16",
    name: "Devki Steel Rebar D16 (16mm Deformed)",
    spec: "BS 4449 Grade 500B High Yield Rebar • 12 Meter Bar",
    category: "steel",
    categoryLabel: "Steel Rebar",
    unit: "bar",
    unitLabel: "Per Bar (12m)",
    price: 1980,
    moq: "5 Bars",
    featured: false
  },
  {
    id: "steel-d20",
    name: "Devki Steel Rebar D20 (20mm Deformed)",
    spec: "BS 4449 Grade 500B Heavy Structural Rebar • 12 Meter Bar",
    category: "steel",
    categoryLabel: "Steel Rebar",
    unit: "bar",
    unitLabel: "Per Bar (12m)",
    price: 3200,
    moq: "5 Bars",
    featured: false
  },

  // --- CEMENT ---
  {
    id: "simba-cement-32-5r",
    name: "Simba Cement 32.5R (Portland Pozzolana)",
    spec: "General masonry, plastering, walling & domestic foundations • KEBS Certified",
    category: "cement",
    categoryLabel: "Cement",
    unit: "bag",
    unitLabel: "Per 50kg Bag",
    price: 680,
    moq: "50 Bags",
    featured: true
  },
  {
    id: "simba-cement-42-5n",
    name: "Simba Cement 42.5N (High Strength Structural)",
    spec: "High structural strength for columns, suspended slabs & precast bridges",
    category: "cement",
    categoryLabel: "Cement",
    unit: "bag",
    unitLabel: "Per 50kg Bag",
    price: 750,
    moq: "50 Bags",
    featured: true
  },
  {
    id: "rhino-cement-32-5r",
    name: "Rhino Cement 32.5R (National Cement Co.)",
    spec: "Reliable setting time for general masonry & domestic concrete work",
    category: "cement",
    categoryLabel: "Cement",
    unit: "bag",
    unitLabel: "Per 50kg Bag",
    price: 660,
    moq: "50 Bags",
    featured: false
  },
  {
    id: "rhino-cement-42-5n",
    name: "Rhino Cement 42.5N (High Strength)",
    spec: "Engineered for high-load multi-story commercial construction",
    category: "cement",
    categoryLabel: "Cement",
    unit: "bag",
    unitLabel: "Per 50kg Bag",
    price: 730,
    moq: "50 Bags",
    featured: false
  },

  // --- ROOFING MABATI ---
  {
    id: "maisha-box-30g-glossy",
    name: "Maisha Box Profile 30G (Glossy Finish)",
    spec: "Rectangular trapezoidal ridges • 0.25mm thickness",
    category: "roofing",
    categoryLabel: "Roofing",
    unit: "meter",
    unitLabel: "Per Meter",
    price: 400,
    moq: "30 Meters",
    featured: true
  },
  {
    id: "maisha-box-28g-glossy",
    name: "Maisha Box Profile 28G (Glossy Finish)",
    spec: "Rectangular trapezoidal ridges • 0.32mm heavy duty thickness",
    category: "roofing",
    categoryLabel: "Roofing",
    unit: "meter",
    unitLabel: "Per Meter",
    price: 440,
    moq: "30 Meters",
    featured: true
  },
  {
    id: "maisha-box-28g-matte",
    name: "Maisha Box Profile 28G (Matte Finish)",
    spec: "Textured non-glare satin coating • Modern UV protection",
    category: "roofing",
    categoryLabel: "Roofing",
    unit: "meter",
    unitLabel: "Per Meter",
    price: 530,
    moq: "30 Meters",
    featured: true
  },
  {
    id: "maisha-corr-30g-glossy",
    name: "Maisha Corrugated Sheet 30G (Glossy)",
    spec: "Classic 11/3 sinusoidal wavy profile • 0.25mm thickness",
    category: "roofing",
    categoryLabel: "Roofing",
    unit: "meter",
    unitLabel: "Per Meter",
    price: 340,
    moq: "30 Meters",
    featured: false
  },
  {
    id: "maisha-corr-28g-glossy",
    name: "Maisha Corrugated Sheet 28G (Glossy)",
    spec: "Classic 11/3 sinusoidal wavy profile • 0.32mm thickness",
    category: "roofing",
    categoryLabel: "Roofing",
    unit: "meter",
    unitLabel: "Per Meter",
    price: 400,
    moq: "30 Meters",
    featured: false
  },
  {
    id: "maisha-corr-28g-matte",
    name: "Maisha Corrugated Sheet 28G (Matte Finish)",
    spec: "Textured anti-scratch matte coating • 0.32mm thickness",
    category: "roofing",
    categoryLabel: "Roofing",
    unit: "meter",
    unitLabel: "Per Meter",
    price: 480,
    moq: "30 Meters",
    featured: false
  },
  {
    id: "maisha-versatile-30g",
    name: "Maisha Versatile Tile 30G",
    spec: "Step-tile design resembling classic roof clay tiles",
    category: "roofing",
    categoryLabel: "Roofing",
    unit: "meter",
    unitLabel: "Per Meter",
    price: 650,
    moq: "20 Meters",
    featured: false
  },
  {
    id: "maisha-versatile-28g-matte",
    name: "Maisha Versatile Tile 28G (Matte Finish)",
    spec: "Heavy duty step-tile profile with luxury textured matte finish",
    category: "roofing",
    categoryLabel: "Roofing",
    unit: "meter",
    unitLabel: "Per Meter",
    price: 850,
    moq: "20 Meters",
    featured: false
  },
  {
    id: "maisha-roman-30g",
    name: "Maisha Roman Tile 30G",
    spec: "Sleek Mediterranean wavy tile design for modern estates",
    category: "roofing",
    categoryLabel: "Roofing",
    unit: "meter",
    unitLabel: "Per Meter",
    price: 560,
    moq: "20 Meters",
    featured: false
  },
  {
    id: "maisha-roman-28g-matte",
    name: "Maisha Roman Tile 28G (Matte Finish)",
    spec: "Heavy duty Mediterranean wave with textured matte UV protection",
    category: "roofing",
    categoryLabel: "Roofing",
    unit: "meter",
    unitLabel: "Per Meter",
    price: 700,
    moq: "20 Meters",
    featured: false
  },

  // --- STEEL TUBES ---
  {
    id: "devki-shs-25x25",
    name: "Square Hollow Section (SHS) 25mm x 25mm (1.5mm)",
    spec: "Devki Steel Mills • 6 Meter Length",
    category: "tubes",
    categoryLabel: "Steel Tubes",
    unit: "length",
    unitLabel: "Per Length (6m)",
    price: 650,
    moq: "10 Lengths",
    featured: false
  },
  {
    id: "devki-shs-40x40",
    name: "Square Hollow Section (SHS) 40mm x 40mm (1.5mm)",
    spec: "Devki Steel Mills • 6 Meter Length",
    category: "tubes",
    categoryLabel: "Steel Tubes",
    unit: "length",
    unitLabel: "Per Length (6m)",
    price: 1150,
    moq: "5 Lengths",
    featured: false
  },
  {
    id: "devki-shs-50x50",
    name: "Square Hollow Section (SHS) 50mm x 50mm (2.0mm)",
    spec: "Heavy structural hollow section steel • 6 Meter Length",
    category: "tubes",
    categoryLabel: "Steel Tubes",
    unit: "length",
    unitLabel: "Per Length (6m)",
    price: 1580,
    moq: "5 Lengths",
    featured: false
  },

  // --- FERTILIZER ---
  {
    id: "mavuno-npk-10-26-10",
    name: "Mavuno Planting Fertilizer N.P.K 10:26:10 + Trace Elements",
    spec: "Enriched with Calcium, Magnesium & Sulphur for maximum crop yields",
    category: "fertilizer",
    categoryLabel: "Fertilizer",
    unit: "bag",
    unitLabel: "Per 50kg Bag",
    price: 3800,
    moq: "20 Bags",
    featured: false
  },
  {
    id: "mavuno-can-26",
    name: "Mavuno Top Dressing Fertilizer CAN 26% N",
    spec: "Fast-acting nitrogen fertilizer for maize, wheat, and horticultural crops",
    category: "fertilizer",
    categoryLabel: "Fertilizer",
    unit: "bag",
    unitLabel: "Per 50kg Bag",
    price: 2900,
    moq: "20 Bags",
    featured: false
  }
];

// Helper function to get product by ID
window.getDevkiProduct = function (id) {
  return window.DEVKI_PRICE_CATALOG.find(p => p.id === id);
};
