// Product visuals for the homepage. Every figure comes from the demo's sample data
// and calculation code (src/lib), so the site and the demo always agree.
import QuoteSheet from "@/components/QuoteSheet";
import { calcLine, inr, type Line } from "@/lib/quote";
import { business, sampleQuote } from "@/lib/showcase";

/* ------------------------------------------------------------------ */
/* Small shared bits                                                   */
/* ------------------------------------------------------------------ */

export function Mark({ className = "" }: { className?: string }) {
  // QuotePilot mark: a sheet with a folded corner
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={className}>
      <path d="M3 2h10l4 4v12H3z" fill="currentColor" />
      <path d="M13 2v4h4" fill="none" stroke="var(--qp-paper)" strokeWidth="1.4" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className="h-3 w-3">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WindowBar({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-line bg-sheet px-4 py-2.5 text-[13px]">
      <span className="flex items-center gap-1.5 font-semibold text-ink">
        <Mark className="h-3.5 w-3.5 text-brand" />
        QuotePilot
      </span>
      <span className="h-3.5 w-px bg-line" />
      <span className="truncate text-muted">{title}</span>
      {meta && <span className="num ml-auto hidden font-mono text-[12px] text-muted sm:block">{meta}</span>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero: price list → QuotePilot → quotation                           */
/* ------------------------------------------------------------------ */

const heroLines: Line[] = [
  { key: 1, itemId: "dining", qty: 1, choiceIdx: 1 },
  { key: 2, itemId: "chair", qty: 4, choiceIdx: 0 },
  { key: 3, itemId: "sofa", qty: 1, choiceIdx: 1 },
];

export function HeroVisual() {
  const q = sampleQuote("furniture", { lines: heroLines });
  const b = q.business;

  return (
    <figure className="m-0" aria-label="How QuotePilot turns your price list into a quotation">
      {/* Flow caption */}
      <ol className="mb-4 flex flex-col gap-2 font-mono text-[11.5px] tracking-[0.08em] text-muted uppercase sm:flex-row sm:items-center sm:gap-4">
        <li className="flex shrink-0 items-center gap-2">
          <span className="text-brand">01</span> Your products &amp; prices
        </li>
        <li aria-hidden className="hidden h-px flex-1 bg-line sm:block" />
        <li className="flex shrink-0 items-center gap-2">
          <span className="text-brand">02</span> QuotePilot does the maths
        </li>
        <li aria-hidden className="hidden h-px flex-1 bg-line sm:block" />
        <li className="flex shrink-0 items-center gap-2">
          <span className="text-brand">03</span> Your quotation
        </li>
      </ol>

      <div className="overflow-hidden rounded-md border border-line bg-sheet shadow-[0_1px_0_rgba(23,21,19,0.04),0_30px_60px_-30px_rgba(23,21,19,0.25)]">
        <WindowBar title={`${b.name} · New quotation`} meta={q.number} />
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          {/* Price list */}
          <div className="flex flex-col border-b border-line md:border-r md:border-b-0">
            <div className="flex items-baseline justify-between px-5 pt-5 pb-3">
              <p className="text-[13px] font-semibold text-ink">Price list</p>
              <p className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">Set by you</p>
            </div>
            <ul className="border-t border-line-soft">
              {b.items.map((item) => {
                const idx = heroLines.findIndex((l) => l.itemId === item.id);
                const picked = idx >= 0;
                return (
                  <li
                    key={item.id}
                    {...(picked ? { "data-flow-row": idx } : {})}
                    className={`flex items-center gap-3 border-b border-line-soft px-5 py-3 ${picked ? "bg-brand/[0.09]" : ""}`}
                  >
                    <span
                      {...(picked ? { "data-flow-check": "" } : {})}
                      className={`grid h-4 w-4 shrink-0 place-items-center rounded-[3px] ${
                        picked ? "bg-brand text-white" : "border border-line"
                      }`}
                    >
                      {picked && <Check />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] text-ink">{item.name}</span>
                      {item.option && (
                        <span className="block truncate text-[11.5px] text-muted">
                          {item.option.choices.map((c) => c.label).join(" / ")}
                        </span>
                      )}
                    </span>
                    <span className="num text-right text-[13px] whitespace-nowrap text-ink">
                      {inr.format(item.price)}
                      <span className="block text-[11px] text-muted">per {item.unit}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <dl className="grid grid-cols-2 gap-px border-b border-line-soft bg-line-soft text-[12.5px]">
              <div className="bg-sheet px-5 py-3.5">
                <dt className="text-muted">Customer</dt>
                <dd className="mt-0.5 font-medium text-ink">{q.customer}</dd>
              </div>
              <div className="bg-sheet px-5 py-3.5">
                <dt className="text-muted">Added for you</dt>
                <dd className="mt-0.5 font-medium text-ink">Delivery · GST 18%</dd>
              </div>
            </dl>
            <div className="mt-auto flex items-end justify-between gap-4 px-5 pt-8 pb-5" data-flow-totals>
              <div>
                <p className="text-[12.5px] text-muted">Total for {q.customer.split(" ")[0]}</p>
                <p className="num mt-1 text-[clamp(1.6rem,2.4vw,2.1rem)] leading-none font-semibold tracking-[-0.03em] text-ink">
                  {inr.format(q.totals.total)}
                </p>
              </div>
              <p className="num pb-1 font-mono text-[11.5px] text-muted">{q.number}</p>
            </div>
          </div>

          {/* Quotation */}
          <div className="relative bg-paper-deep px-5 pt-6 sm:px-10 sm:pt-9">
            <div className="qs-frame relative mx-auto aspect-[100/88] max-w-[640px] overflow-hidden rounded-t-[3px] shadow-[0_0_0_1px_rgba(23,21,19,0.06),0_18px_40px_-20px_rgba(23,21,19,0.35)]">
              <QuoteSheet {...q} animate />
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* How it works: one small interface fragment per step                 */
/* ------------------------------------------------------------------ */

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line-soft py-2 last:border-b-0">
      <span className="text-muted">{label}</span>
      <span className="truncate text-right text-ink">{value}</span>
    </div>
  );
}

export function StepBusiness() {
  const b = business("furniture");
  return (
    <div className="text-[12.5px]">
      <Field label="Business" value={b.name.replace(" (Sample)", "")} />
      <Field label="GSTIN" value="Your GST number" />
      <Field label="Quote no." value={`${b.quotePrefix}-2026-001`} />
      <Field label="Valid for" value={`${b.validDays} days`} />
    </div>
  );
}

export function StepItems() {
  const b = business("services");
  return (
    <ul className="text-[12.5px]">
      {b.items.map((it) => (
        <li key={it.id} className="flex justify-between gap-3 border-b border-line-soft py-2 last:border-b-0">
          <span className="truncate text-ink">{it.name}</span>
          <span className="shrink-0 text-muted">per {it.unit}</span>
        </li>
      ))}
    </ul>
  );
}

export function StepPrices() {
  const it = business("manufacturer").items[0];
  return (
    <div className="text-[12.5px]">
      <div className="flex items-baseline justify-between border-b border-line-soft py-2">
        <span className="text-ink">{it.name}</span>
        <span className="num text-ink">{inr.format(it.price)}</span>
      </div>
      {it.option?.choices.slice(1).map((c) => (
        <div key={c.label} className="flex justify-between border-b border-line-soft py-2">
          <span className="text-muted">{c.label}</span>
          <span className="num text-muted">+ {inr.format(c.extra)}</span>
        </div>
      ))}
      {it.slabs?.map((s) => (
        <div key={s.minQty} className="flex justify-between border-b border-line-soft py-2 last:border-b-0">
          <span className="text-muted">From {s.minQty.toLocaleString("en-IN")} pcs</span>
          <span className="num text-brand">{s.discountPct}% off</span>
        </div>
      ))}
    </div>
  );
}

export function StepQuotes() {
  const list = [sampleQuote("furniture"), sampleQuote("services"), sampleQuote("manufacturer")];
  return (
    <ul className="text-[12.5px]">
      {list.map((q) => (
        <li key={q.number} className="grid grid-cols-[auto_1fr_auto] gap-3 border-b border-line-soft py-2 last:border-b-0">
          <span className="num font-mono text-[11.5px] text-muted">{q.number}</span>
          <span className="truncate text-ink">{q.customer}</span>
          <span className="num text-ink">{inr.format(q.totals.total)}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Features                                                            */
/* ------------------------------------------------------------------ */

/** How one item's pricing is set up: base price, an option and bulk slabs. */
export function PricingSetup() {
  const b = business("manufacturer");
  const it = b.items[0];
  const qtys = [500, 2000, 6000];
  return (
    <div className="overflow-hidden rounded-md border border-line bg-sheet">
      <WindowBar title={`${b.name} · Price list`} />
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="border-b border-line p-5 sm:border-r sm:border-b-0 sm:p-6">
          <p className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase">Item</p>
          <p className="mt-1 text-[17px] font-semibold tracking-[-0.01em] text-ink">{it.name}</p>
          <dl className="mt-5 space-y-0 text-[13px]">
            <Field label="Price" value={`${inr.format(it.price)} per ${it.unit}`} />
            {it.option && (
              <Field
                label={it.option.name}
                value={it.option.choices.map((c) => (c.extra ? `${c.label} +${inr.format(c.extra)}` : c.label)).join(", ")}
              />
            )}
            {it.slabs?.map((s) => (
              <Field key={s.minQty} label={`${s.minQty.toLocaleString("en-IN")}+ pcs`} value={`${s.discountPct}% off`} />
            ))}
          </dl>
        </div>
        <div className="p-5 sm:p-6">
          <p className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase">What the customer pays</p>
          <table className="num mt-3 w-full text-[13px]">
            <thead>
              <tr className="border-b border-line text-left text-muted">
                <th className="py-2 font-normal">Quantity</th>
                <th className="py-2 text-right font-normal">Amount</th>
              </tr>
            </thead>
            <tbody>
              {qtys.map((qty) => {
                const r = calcLine(it, { qty, choiceIdx: 1 });
                return (
                  <tr key={qty} className="border-b border-line-soft last:border-b-0">
                    <td className="py-2.5 text-ink">
                      {qty.toLocaleString("en-IN")} pcs
                      {r.slabPct > 0 && <span className="ml-2 text-[11.5px] text-brand">−{r.slabPct}%</span>}
                    </td>
                    <td className="py-2.5 text-right text-ink">{inr.format(r.amount)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-3 text-[12px] text-muted">With 1-colour print. Worked out for you, every time.</p>
        </div>
      </div>
    </div>
  );
}

export function CustomerCard() {
  const q = sampleQuote("services");
  return (
    <div className="overflow-hidden rounded-md border border-line bg-sheet text-[13px]">
      <WindowBar title="New quotation · Customer" />
      <div className="space-y-4 p-5 sm:p-6">
        {[
          ["Customer name", q.customer],
          ["Phone", q.phone],
        ].map(([label, value]) => (
          <label key={label} className="block">
            <span className="text-[12px] font-medium text-ink-soft">{label}</span>
            <span className="mt-1.5 flex h-10 items-center rounded-[4px] border border-line bg-white px-3 text-ink">
              {value}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function HistoryCard() {
  const list = [
    sampleQuote("manufacturer", { seq: 3 }),
    sampleQuote("services", { seq: 2 }),
    sampleQuote("furniture", { seq: 1 }),
  ];
  return (
    <div className="overflow-hidden rounded-md border border-line bg-sheet text-[13px]">
      <WindowBar title="Old quotations" meta={`${list.length} saved`} />
      <ul>
        {list.map((q) => (
          <li
            key={q.number}
            className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-0.5 border-b border-line-soft px-5 py-3.5 last:border-b-0 sm:grid-cols-[auto_1fr_auto_auto] sm:px-6"
          >
            <span className="num font-mono text-[12px] text-muted">{q.number}</span>
            <span className="truncate text-ink max-sm:col-start-1 max-sm:row-start-2">{q.customer}</span>
            <span className="num text-right text-ink">{inr.format(q.totals.total)}</span>
            <span className="text-right text-[12px] font-medium text-brand max-sm:row-start-2">Open</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The service-provider quotation, used large in the "professional quotation" section. */
export function FeatureSheet() {
  const q = sampleQuote("services");
  return (
    <div className="qs-frame shadow-[0_0_0_1px_rgba(23,21,19,0.08),0_40px_80px_-40px_rgba(0,0,0,0.6)]">
      <QuoteSheet {...q} />
    </div>
  );
}
