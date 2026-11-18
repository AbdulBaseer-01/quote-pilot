// Fictional sample setups used by the live demo.
// In a real QuotePilot setup, these are replaced with the customer's own
// business details, products or services, prices and quotation format.

export type Choice = { label: string; extra: number };

export type Item = {
  id: string;
  name: string;
  unit: string; // "piece", "hour", "month", "project" ...
  price: number;
  defaultQty: number;
  option?: { name: string; choices: Choice[] };
  // Quantity discount slabs, e.g. 5% off from 1,000 pieces
  slabs?: { minQty: number; discountPct: number }[];
};

export type Business = {
  id: string;
  type: string; // shown on the switcher
  name: string;
  tagline: string;
  address: string;
  phone: string;
  gstin: string;
  quotePrefix: string;
  validDays: number;
  pricingNote: string;
  extraCharge?: { label: string; amount: number };
  items: Item[];
  terms: string[];
};

export const sampleBusinesses: Business[] = [
  {
    id: "furniture",
    type: "Furniture seller",
    name: "Woodline Furniture (Sample)",
    tagline: "Home and office furniture",
    address: "12 Sample Market Road, Your City",
    phone: "+91 90000 00001",
    gstin: "SAMPLE-GSTIN-0001",
    quotePrefix: "WF",
    validDays: 15,
    pricingNote: "Price per piece, with finish and fabric options. Fixed delivery charge.",
    extraCharge: { label: "Delivery and fitting", amount: 1500 },
    items: [
      {
        id: "dining",
        name: "Sheesham wood dining table (6-seater)",
        unit: "piece",
        price: 38500,
        defaultQty: 1,
        option: {
          name: "Finish",
          choices: [
            { label: "Natural", extra: 0 },
            { label: "Walnut polish", extra: 2500 },
          ],
        },
      },
      {
        id: "sofa",
        name: "3-seater sofa",
        unit: "piece",
        price: 42000,
        defaultQty: 1,
        option: {
          name: "Fabric",
          choices: [
            { label: "Standard", extra: 0 },
            { label: "Premium", extra: 6000 },
          ],
        },
      },
      { id: "chair", name: "Office chair", unit: "piece", price: 7800, defaultQty: 4 },
      { id: "wardrobe", name: "2-door wardrobe", unit: "piece", price: 24500, defaultQty: 1 },
    ],
    terms: [
      "50% advance to confirm the order.",
      "Delivery within 10–15 working days.",
    ],
  },
  {
    id: "services",
    type: "Service provider",
    name: "BrightPath Digital (Sample)",
    tagline: "Websites, design and social media",
    address: "4th Floor, Sample Business Centre, Your City",
    phone: "+91 90000 00002",
    gstin: "SAMPLE-GSTIN-0002",
    quotePrefix: "BP",
    validDays: 30,
    pricingNote: "Mix of fixed project prices, monthly charges and hourly rates.",
    items: [
      { id: "website", name: "Business website (up to 8 pages)", unit: "project", price: 25000, defaultQty: 1 },
      {
        id: "social",
        name: "Social media management",
        unit: "month",
        price: 15000,
        defaultQty: 3,
        option: {
          name: "Plan",
          choices: [
            { label: "12 posts", extra: 0 },
            { label: "20 posts + reels", extra: 7000 },
          ],
        },
      },
      { id: "logo", name: "Logo and brand design", unit: "project", price: 6000, defaultQty: 1 },
      { id: "consult", name: "Consultation", unit: "hour", price: 1200, defaultQty: 2 },
    ],
    terms: [
      "Monthly services are billed at the start of each month.",
      "Two rounds of changes included in design work.",
    ],
  },
  {
    id: "manufacturer",
    type: "Product manufacturer",
    name: "Apex Packaging Works (Sample)",
    tagline: "Cartons and boxes made to order",
    address: "Plot 7, Sample Industrial Area, Your City",
    phone: "+91 90000 00003",
    gstin: "SAMPLE-GSTIN-0003",
    quotePrefix: "AP",
    validDays: 7,
    pricingNote: "Price per piece with printing options and bulk-order discounts.",
    items: [
      {
        id: "box3",
        name: "Corrugated box, 3-ply",
        unit: "piece",
        price: 18,
        defaultQty: 2000,
        option: {
          name: "Printing",
          choices: [
            { label: "Plain", extra: 0 },
            { label: "1-colour print", extra: 3 },
          ],
        },
        slabs: [
          { minQty: 1000, discountPct: 5 },
          { minQty: 5000, discountPct: 10 },
        ],
      },
      {
        id: "box5",
        name: "Corrugated box, 5-ply",
        unit: "piece",
        price: 29,
        defaultQty: 1000,
        slabs: [
          { minQty: 1000, discountPct: 5 },
          { minQty: 5000, discountPct: 10 },
        ],
      },
      { id: "carton", name: "Custom printed carton", unit: "piece", price: 42, defaultQty: 500 },
    ],
    terms: [
      "Bulk discount applied automatically: 5% from 1,000 pcs, 10% from 5,000 pcs.",
      "Dispatch in 7 working days after artwork approval.",
    ],
  },
];
