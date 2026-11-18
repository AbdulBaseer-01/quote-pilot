// Sample quotations for the homepage visuals, computed from the same sample data
// and calculation code as the live demo, so the numbers always match.
import { sampleBusinesses, type Business } from "./sample-businesses";
import { buildRows, calcTotals, defaultLines, quoteNumber, type Line } from "./quote";

export const SAMPLE_YEAR = 2026;

const customers: Record<string, { name: string; phone: string }> = {
  furniture: { name: "Ravi Kumar", phone: "+91 98765 43210" },
  services: { name: "Meera Iyer", phone: "+91 98201 55340" },
  manufacturer: { name: "Sunrise Foods Pvt Ltd", phone: "+91 99000 12345" },
};

export function business(id: string): Business {
  return sampleBusinesses.find((b) => b.id === id)!;
}

export function sampleQuote(id: string, opts: { lines?: Line[]; seq?: number; gstOn?: boolean } = {}) {
  const b = business(id);
  const lines = opts.lines ?? defaultLines(b);
  const gstOn = opts.gstOn ?? true;
  const rows = buildRows(b, lines);
  const totals = calcTotals(b, rows, 0, gstOn);
  const c = customers[id];
  return {
    business: b,
    rows,
    totals,
    discountPct: 0,
    gstOn,
    number: quoteNumber(b, SAMPLE_YEAR, opts.seq ?? 1),
    date: "14 Nov 2026",
    validTill: `${String(14 + b.validDays > 30 ? 14 + b.validDays - 30 : 14 + b.validDays).padStart(2, "0")} ${14 + b.validDays > 30 ? "Dec" : "Nov"} 2026`,
    customer: c.name,
    phone: c.phone,
  };
}
