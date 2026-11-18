import type { Business } from "@/lib/sample-businesses";
import { GST_RATE, inr, type Row, type calcTotals } from "@/lib/quote";

type Totals = ReturnType<typeof calcTotals>;

export type QuoteSheetProps = {
  business: Business;
  rows: Row[];
  totals: Totals;
  discountPct: number;
  gstOn: boolean;
  number: string;
  date: string;
  validTill: string;
  customer: string;
  phone: string;
  id?: string;
  className?: string;
  /** data-flow attributes for the homepage animation */
  animate?: boolean;
};

/**
 * The printable A4 quotation. Pure markup, no state: the demo renders it live,
 * the homepage renders it with sample data. Wrap it in an element with `.qs-frame`.
 */
export default function QuoteSheet({
  business,
  rows,
  totals,
  discountPct,
  gstOn,
  number,
  date,
  validTill,
  customer,
  phone,
  id,
  className = "",
  animate = false,
}: QuoteSheetProps) {
  return (
    <article
      id={id}
      aria-label={`Quotation ${number}`}
      className={`qs flex flex-col bg-white text-ink ${className}`}
    >
      {/* Letterhead */}
      <header className="flex items-start justify-between gap-[2em]">
        <div>
          <p className="text-[2.1em] leading-[1.05] font-semibold tracking-[-0.03em]">{business.name}</p>
          <p className="mt-[0.4em] text-muted">{business.tagline}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[0.85em] font-medium tracking-[0.2em] text-brand uppercase">Quotation</p>
          <p className="num mt-[0.35em] font-mono text-[1.15em]">{number}</p>
        </div>
      </header>

      <div className="mt-[2.2em] h-[0.17em] bg-ink" />

      {/* Meta */}
      <dl className="mt-[1.6em] grid grid-cols-[1.6fr_1fr_1fr] gap-[2em]">
        <div>
          <dt className="font-mono text-[0.75em] tracking-[0.12em] text-muted uppercase">Quotation for</dt>
          <dd className="mt-[0.45em] text-[1.15em] font-medium">{customer || "—"}</dd>
          {phone && <dd className="num mt-[0.15em] text-muted">{phone}</dd>}
        </div>
        <div>
          <dt className="font-mono text-[0.75em] tracking-[0.12em] text-muted uppercase">Date</dt>
          <dd className="num mt-[0.45em]">{date}</dd>
        </div>
        <div>
          <dt className="font-mono text-[0.75em] tracking-[0.12em] text-muted uppercase">Valid till</dt>
          <dd className="num mt-[0.45em]">{validTill}</dd>
        </div>
      </dl>

      {/* Items */}
      <table className="mt-[2.4em] w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-ink/80 font-mono text-[0.72em] tracking-[0.12em] text-muted uppercase">
            <th className="w-[2.6em] py-[0.8em] font-normal">#</th>
            <th className="py-[0.8em] font-normal">Description</th>
            <th className="py-[0.8em] text-right font-normal">Qty</th>
            <th className="py-[0.8em] text-right font-normal">Rate</th>
            <th className="py-[0.8em] text-right font-normal">Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr className="border-b border-line">
              <td colSpan={5} className="py-[2.5em] text-center text-muted">
                No items added yet
              </td>
            </tr>
          )}
          {rows.map(({ line, item, unitPrice, slabPct, amount }, i) => (
            <tr
              key={line.key}
              className="border-b border-line align-top"
              {...(animate ? { "data-flow-line": i } : {})}
            >
              <td className="num py-[0.95em] text-muted">{String(i + 1).padStart(2, "0")}</td>
              <td className="py-[0.95em] pr-[1em]">
                <span className="font-medium">{item.name}</span>
                {item.option && (
                  <span className="block text-[0.9em] text-muted">
                    {item.option.name}: {item.option.choices[line.choiceIdx]?.label}
                  </span>
                )}
                {slabPct > 0 && (
                  <span className="block text-[0.9em] text-brand">Bulk discount {slabPct}% applied</span>
                )}
              </td>
              <td className="num py-[0.95em] text-right whitespace-nowrap">
                {line.qty.toLocaleString("en-IN")} {item.unit}
                {line.qty > 1 ? "s" : ""}
              </td>
              <td className="num py-[0.95em] pl-[1em] text-right whitespace-nowrap">{inr.format(unitPrice)}</td>
              <td className="num py-[0.95em] pl-[1em] text-right whitespace-nowrap">{inr.format(amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <dl className="num mt-[1.4em] ml-auto w-[48%] space-y-[0.55em]" {...(animate ? { "data-flow-totals": "" } : {})}>
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd>{inr.format(totals.subtotal)}</dd>
        </div>
        {totals.discount > 0 && (
          <div className="flex justify-between">
            <dt className="text-muted">Discount ({discountPct}%)</dt>
            <dd>− {inr.format(totals.discount)}</dd>
          </div>
        )}
        {totals.extra > 0 && business.extraCharge && (
          <div className="flex justify-between">
            <dt className="text-muted">{business.extraCharge.label}</dt>
            <dd>{inr.format(totals.extra)}</dd>
          </div>
        )}
        {gstOn && (
          <div className="flex justify-between">
            <dt className="text-muted">GST ({GST_RATE}%)</dt>
            <dd>{inr.format(totals.gst)}</dd>
          </div>
        )}
        <div className="flex items-baseline justify-between border-t-[0.17em] border-ink pt-[0.7em]">
          <dt className="font-medium">Total</dt>
          <dd className="text-[1.75em] font-semibold tracking-[-0.02em]">{inr.format(totals.total)}</dd>
        </div>
      </dl>

      {/* Terms */}
      <section className="mt-[3em] max-w-[70%]">
        <h4 className="font-mono text-[0.75em] font-normal tracking-[0.12em] text-muted uppercase">Terms</h4>
        <ol className="mt-[0.6em] list-decimal space-y-[0.25em] pl-[1.2em] text-[0.95em] text-ink-soft">
          {business.terms.map((t) => (
            <li key={t}>{t}</li>
          ))}
          <li>This quotation is valid for {business.validDays} days.</li>
        </ol>
      </section>

      {/* Footer */}
      <footer className="num mt-auto flex flex-wrap justify-between gap-x-[2em] gap-y-[0.3em] border-t border-line pt-[1.2em] text-[0.85em] text-muted">
        <span>{business.address}</span>
        <span>
          {business.phone} · GSTIN {business.gstin}
        </span>
      </footer>
    </article>
  );
}
