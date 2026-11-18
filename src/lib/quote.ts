// Quotation maths and formatting, shared by the demo app and the homepage visuals
// so every number on the site comes from the same calculation.
import type { Business, Item } from "./sample-businesses";

export type Line = { key: number; itemId: string; qty: number; choiceIdx: number };

export type SavedQuote = {
  number: string;
  businessId: string;
  customer: string;
  phone: string;
  date: string;
  total: number;
  lines: Line[];
  discountPct: number;
  gstOn: boolean;
};

export const GST_RATE = 18;

export const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function calcLine(item: Item, line: Pick<Line, "qty" | "choiceIdx">) {
  const extra = item.option?.choices[line.choiceIdx]?.extra ?? 0;
  const unitPrice = item.price + extra;
  const slabPct =
    item.slabs?.filter((s) => line.qty >= s.minQty).reduce((m, s) => Math.max(m, s.discountPct), 0) ?? 0;
  const gross = unitPrice * line.qty;
  return { unitPrice, slabPct, amount: gross * (1 - slabPct / 100) };
}

export function defaultLines(b: Business): Line[] {
  return b.items.slice(0, 2).map((it, i) => ({ key: i + 1, itemId: it.id, qty: it.defaultQty, choiceIdx: 0 }));
}

export type Row = { line: Line; item: Item; unitPrice: number; slabPct: number; amount: number };

export function buildRows(business: Business, lines: Line[]): Row[] {
  return lines.flatMap((l) => {
    const item = business.items.find((i) => i.id === l.itemId);
    return item ? [{ line: l, item, ...calcLine(item, l) }] : [];
  });
}

export function calcTotals(business: Business, rows: Row[], discountPct: number, gstOn: boolean) {
  const subtotal = rows.reduce((s, r) => s + r.amount, 0);
  const discount = (subtotal * discountPct) / 100;
  const extra = rows.length && business.extraCharge ? business.extraCharge.amount : 0;
  const taxable = subtotal - discount + extra;
  const gst = gstOn ? (taxable * GST_RATE) / 100 : 0;
  return { subtotal, discount, extra, taxable, gst, total: taxable + gst };
}

export function quoteNumber(business: Business, year: number | string, seq: number) {
  return `${business.quotePrefix}-${year}-${String(seq).padStart(3, "0")}`;
}
