"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@astryxdesign/core/Button";
import { Dialog, DialogHeader } from "@astryxdesign/core/Dialog";
import { Drawer, DrawerHeader } from "@astryxdesign/core/Drawer";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { NumberInput } from "@astryxdesign/core/NumberInput";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { Selector } from "@astryxdesign/core/Selector";
import { Switch } from "@astryxdesign/core/Switch";
import { Table, pixel, proportional } from "@astryxdesign/core/Table";
import { TextInput } from "@astryxdesign/core/TextInput";
import { Token } from "@astryxdesign/core/Token";
import { useToast } from "@astryxdesign/core/Toast";

import QuoteSheet from "@/components/QuoteSheet";
import { Mark } from "@/components/site/visuals";
import { sampleBusinesses, type Business } from "@/lib/sample-businesses";
import {
  GST_RATE,
  buildRows,
  calcTotals,
  defaultLines,
  formatDate,
  inr,
  quoteNumber,
  type Line,
  type Row,
  type SavedQuote,
} from "@/lib/quote";
import { ArrowLeftIcon, HistoryIcon, PrintIcon, ResetIcon, SaveIcon, TrashIcon } from "./icons";

const STORAGE_KEY = "quotepilot-demo-quotes";
const DEFAULT_CUSTOMER = "Ravi Kumar";
const DEFAULT_PHONE = "+91 98765 43210";

const shortName: Record<string, string> = {
  furniture: "Furniture",
  services: "Services",
  manufacturer: "Manufacturer",
};

interface LineRow extends Record<string, unknown> {
  id: number;
  row: Row;
}

/* ---------------------------------------------------------------- */

function Section({ n, title, aside, children }: { n: string; title: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-6 pb-9">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="num font-mono text-[12px] text-brand">{n}</span>
        <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">{title}</h2>
        {aside && <div className="ml-auto text-[13px] text-muted">{aside}</div>}
      </div>
      {children}
    </section>
  );
}

function OptionSelect({ row, onChange }: { row: Row; onChange: (idx: number) => void }) {
  const { item, line } = row;
  if (!item.option) return null;
  return (
    <Selector
      label={`${item.option.name} for ${item.name}`}
      isLabelHidden
      size="sm"
      value={String(line.choiceIdx)}
      onChange={(v) => onChange(Number(v))}
      options={item.option.choices.map((c, i) => ({
        value: String(i),
        label: `${item.option!.name}: ${c.label}`,
        description: c.extra ? `+ ${inr.format(c.extra)} per ${item.unit}` : "No extra charge",
      }))}
    />
  );
}

function QtyInput({ row, onChange }: { row: Row; onChange: (qty: number) => void }) {
  return (
    <NumberInput
      label={`Quantity of ${row.item.name}`}
      isLabelHidden
      size="sm"
      value={row.line.qty}
      min={1}
      isIntegerOnly
      hasNumberSteppers
      onChange={(v) => onChange(Math.max(1, Math.round(v || 1)))}
      width="100%"
    />
  );
}

/* ---------------------------------------------------------------- */

export default function DemoApp() {
  const toast = useToast();

  const [businessId, setBusinessId] = useState(sampleBusinesses[0].id);
  const business = sampleBusinesses.find((b) => b.id === businessId)!;

  const [customer, setCustomer] = useState(DEFAULT_CUSTOMER);
  const [phone, setPhone] = useState(DEFAULT_PHONE);
  const [lines, setLines] = useState<Line[]>(() => defaultLines(sampleBusinesses[0]));
  const [nextKey, setNextKey] = useState(10);
  const [discountPct, setDiscountPct] = useState(0);
  const [gstOn, setGstOn] = useState(true);
  const [saved, setSaved] = useState<SavedQuote[]>([]);
  const [today, setToday] = useState<Date | null>(null);
  const [triedSave, setTriedSave] = useState(false);
  const [addValue, setAddValue] = useState("");

  const [view, setView] = useState<"edit" | "preview">("edit");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  // Read today's date and saved quotations (stored only in this browser) after mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- date must be read on the client
    setToday(new Date());
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch {
      /* storage unavailable: start empty */
    }
  }, []);

  function persist(list: SavedQuote[]) {
    setSaved(list);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      /* ignore */
    }
  }

  function switchBusiness(id: string) {
    const b = sampleBusinesses.find((x) => x.id === id)!;
    setBusinessId(id);
    setLines(defaultLines(b));
    setDiscountPct(0);
  }

  function updateLine(key: number, patch: Partial<Line>) {
    setLines((ls) => ls.map((l) => (l.key === key ? { ...l, ...patch } : l)));
  }

  function removeLine(key: number) {
    setLines((ls) => ls.filter((l) => l.key !== key));
  }

  function addLine(itemId: string) {
    const item = business.items.find((i) => i.id === itemId);
    if (!item) return;
    setLines((ls) => [...ls, { key: nextKey, itemId, qty: item.defaultQty, choiceIdx: 0 }]);
    setNextKey((k) => k + 1);
    setAddValue("");
  }

  const rows = useMemo(() => buildRows(business, lines), [business, lines]);
  const totals = calcTotals(business, rows, discountPct, gstOn);

  const savedForBusiness = saved.filter((q) => q.businessId === business.id);
  const validTill = today ? new Date(today.getTime() + business.validDays * 86400000) : null;
  const number = quoteNumber(business, today ? today.getFullYear() : "", savedForBusiness.length + 1);

  // Validation (shown after the first save attempt)
  const digits = phone.replace(/\D/g, "");
  const nameError = triedSave && !customer.trim() ? "Enter the customer's name" : undefined;
  const phoneError = triedSave && phone.trim() && digits.length < 10 ? "Enter a phone number with at least 10 digits" : undefined;
  const itemsError = triedSave && rows.length === 0;

  function saveQuote() {
    setTriedSave(true);
    const ok = customer.trim() && rows.length > 0 && !(phone.trim() && digits.length < 10);
    if (!ok) {
      setView("edit");
      return;
    }
    const q: SavedQuote = {
      number,
      businessId: business.id,
      customer: customer.trim(),
      phone,
      date: new Date().toISOString(),
      total: totals.total,
      lines,
      discountPct,
      gstOn,
    };
    persist([q, ...saved]);
    setTriedSave(false);
    toast({ body: `Quotation ${q.number} saved`, uniqueID: "save" });
  }

  function openQuote(q: SavedQuote) {
    setBusinessId(q.businessId);
    setCustomer(q.customer);
    setPhone(q.phone);
    setLines(q.lines);
    setNextKey(Math.max(10, ...q.lines.map((l) => l.key + 1)));
    setDiscountPct(q.discountPct);
    setGstOn(q.gstOn);
    setHistoryOpen(false);
    toast({ body: `Opened ${q.number}. Saving makes a new quotation.`, uniqueID: "open" });
  }

  function resetDemo() {
    setBusinessId(sampleBusinesses[0].id);
    setCustomer(DEFAULT_CUSTOMER);
    setPhone(DEFAULT_PHONE);
    setLines(defaultLines(sampleBusinesses[0]));
    setDiscountPct(0);
    setGstOn(true);
    setTriedSave(false);
    setView("edit");
    persist([]);
    setResetOpen(false);
    toast({ body: "Demo reset to the start", uniqueID: "reset" });
  }

  function printQuote() {
    // The preview pane must be laid out for printing; on phones it may be hidden.
    setView("preview");
    requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
  }

  const tableData: LineRow[] = rows.map((r) => ({ id: r.line.key, row: r }));
  const addOptions = business.items.map((it) => ({
    value: it.id,
    label: it.name,
    description: `${inr.format(it.price)} per ${it.unit}`,
  }));

  return (
    <div className="flex min-h-dvh flex-col bg-paper text-ink lg:h-dvh lg:overflow-hidden print:block print:h-auto print:min-h-0 print:bg-white">
      {/* ============================ TOP BAR ============================ */}
      <header className="z-30 flex h-14 shrink-0 items-center gap-3 border-b border-line bg-sheet px-4 sm:px-6 print:hidden">
        <Link href="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em]" aria-label="QuotePilot home">
          <Mark className="h-4 w-4 text-brand" />
          <span className="max-sm:hidden">QuotePilot</span>
        </Link>
        <span aria-hidden className="h-5 w-px bg-line max-sm:hidden" />
        <Token label="Demo mode" color="orange" size="sm" />
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Button
            label={`Old quotations${saved.length ? ` (${saved.length})` : ""}`}
            variant="ghost"
            size="sm"
            icon={<HistoryIcon />}
            onClick={() => setHistoryOpen(true)}
          >
            <span className="max-md:hidden">Old quotations</span>
            {saved.length > 0 && <span className="num ml-1 text-muted">{saved.length}</span>}
          </Button>
          <Button label="Reset demo" variant="ghost" size="sm" icon={<ResetIcon />} onClick={() => setResetOpen(true)}>
            <span className="max-md:hidden">Reset demo</span>
          </Button>
          <span aria-hidden className="mx-1 h-5 w-px bg-line max-sm:hidden" />
          <Button label="Print / Save as PDF" variant="secondary" size="sm" icon={<PrintIcon />} onClick={printQuote}>
            <span className="max-sm:hidden">Print / Save as PDF</span>
          </Button>
        </div>
      </header>

      {/* Sample-data notice */}
      <div className="flex shrink-0 items-center gap-3 border-b border-line bg-brand-tint/60 px-4 py-2 text-[13px] text-ink-soft sm:px-6 print:hidden">
        <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-brand" />
        <p className="min-w-0 flex-1">
          <strong className="font-medium text-ink">Sample data.</strong>
          <span className="sm:hidden"> Businesses and prices here are made up.</span>
          <span className="max-sm:hidden"> These businesses, products and prices are made up. Your QuotePilot uses your own.</span>
        </p>
        <Link href="/" className="flex shrink-0 items-center gap-1.5 text-ink hover:text-brand max-sm:hidden">
          <ArrowLeftIcon width={14} height={14} /> Back to website
        </Link>
      </div>

      {/* Phone/tablet: switch between editing and the A4 preview */}
      <div className="sticky top-0 z-20 shrink-0 border-b border-line bg-paper/95 px-4 py-2.5 backdrop-blur-sm sm:px-6 lg:hidden print:hidden">
        <SegmentedControl label="View" value={view} onChange={(v) => setView(v as "edit" | "preview")} layout="fill" size="sm">
          <SegmentedControlItem value="edit" label="Edit quotation" />
          <SegmentedControlItem value="preview" label="Preview" />
        </SegmentedControl>
      </div>

      <main className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] print:block">
        {/* ============================ EDITOR ============================ */}
        <div className={`flex min-h-0 flex-col border-line lg:border-r print:hidden ${view === "edit" ? "" : "max-lg:hidden"}`}>
          <div className="min-h-0 flex-1 lg:overflow-y-auto">
            <div className="mx-auto w-full max-w-[720px] px-4 pt-7 pb-6 sm:px-8 lg:pt-9">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                <div>
                  <p className="font-mono text-[12px] tracking-[0.12em] text-muted uppercase">New quotation</p>
                  <h1 className="num mt-1.5 text-[28px] leading-none font-semibold tracking-[-0.03em]">{number}</h1>
                </div>
                <p className="num text-[13px] text-muted">
                  {today ? `${formatDate(today)} · valid ${business.validDays} days` : " "}
                </p>
              </div>

              <Section n="01" title="Sample business">
                {(["md", "sm"] as const).map((size) => (
                  <div key={size} className={size === "md" ? "max-sm:hidden" : "sm:hidden"}>
                    <SegmentedControl label="Sample business" value={businessId} onChange={switchBusiness} layout="fill" size={size}>
                      {sampleBusinesses.map((b) => (
                        <SegmentedControlItem key={b.id} value={b.id} label={shortName[b.id] ?? b.type} />
                      ))}
                    </SegmentedControl>
                  </div>
                ))}
                <BusinessSummary business={business} />
              </Section>

              <Section n="02" title="Customer">
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    label="Customer name"
                    isRequired
                    value={customer}
                    onChange={(v) => setCustomer(v)}
                    autoComplete="off"
                    status={nameError ? { type: "error", message: nameError } : undefined}
                    statusVariant="detached"
                  />
                  <TextInput
                    label="Phone"
                    isOptional
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(v) => setPhone(v)}
                    autoComplete="off"
                    status={phoneError ? { type: "error", message: phoneError } : undefined}
                    statusVariant="detached"
                  />
                </div>
              </Section>

              <Section
                n="03"
                title="Items"
                aside={rows.length > 0 ? `${rows.length} item${rows.length > 1 ? "s" : ""}` : undefined}
              >
                {rows.length === 0 ? (
                  <div className={`rounded-[4px] border border-dashed ${itemsError ? "border-[var(--color-error)]" : "border-line"}`}>
                    <EmptyState
                      isCompact
                      headingLevel={3}
                      title="No items yet"
                      description={
                        itemsError
                          ? "Add at least one item before saving the quotation."
                          : "Choose an item from the price list below. Its price fills in for you."
                      }
                    />
                  </div>
                ) : (
                  <>
                    {/* Tablet & desktop: table */}
                    <div className="max-sm:hidden">
                      <Table<LineRow>
                        data={tableData}
                        idKey="id"
                        density="balanced"
                        verticalAlign="top"
                        columns={[
                          {
                            key: "item",
                            header: "Item",
                            width: proportional(1, { minWidth: 180 }),
                            renderCell: ({ row }) => (
                              <div className="flex flex-col gap-2 py-0.5">
                                <div>
                                  <p className="text-[14px] font-medium text-ink">{row.item.name}</p>
                                  <p className="num text-[12.5px] text-muted">
                                    {inr.format(row.unitPrice)} per {row.item.unit}
                                    {row.slabPct > 0 && <span className="text-brand"> · {row.slabPct}% bulk discount</span>}
                                  </p>
                                </div>
                                <OptionSelect row={row} onChange={(idx) => updateLine(row.line.key, { choiceIdx: idx })} />
                              </div>
                            ),
                          },
                          {
                            key: "qty",
                            header: "Qty",
                            width: pixel(124),
                            renderCell: ({ row }) => (
                              <QtyInput row={row} onChange={(qty) => updateLine(row.line.key, { qty })} />
                            ),
                          },
                          {
                            key: "amount",
                            header: "Amount",
                            width: pixel(112),
                            align: "end",
                            renderCell: ({ row }) => (
                              <span className="num block pt-1.5 text-[14px] font-medium text-ink">{inr.format(row.amount)}</span>
                            ),
                          },
                          {
                            key: "remove",
                            header: "",
                            width: pixel(48),
                            align: "end",
                            renderCell: ({ row }) => (
                              <Button
                                label={`Remove ${row.item.name}`}
                                isIconOnly
                                variant="ghost"
                                size="sm"
                                icon={<TrashIcon />}
                                onClick={() => removeLine(row.line.key)}
                              />
                            ),
                          },
                        ]}
                      />
                    </div>

                    {/* Phone: stacked */}
                    <ul className="border-t border-line sm:hidden">
                      {rows.map((row) => (
                        <li key={row.line.key} className="border-b border-line py-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-[15px] font-medium text-ink">{row.item.name}</p>
                              <p className="num text-[13px] text-muted">
                                {inr.format(row.unitPrice)} per {row.item.unit}
                                {row.slabPct > 0 && <span className="text-brand"> · {row.slabPct}% off</span>}
                              </p>
                            </div>
                            <Button
                              label={`Remove ${row.item.name}`}
                              isIconOnly
                              variant="ghost"
                              size="sm"
                              icon={<TrashIcon />}
                              onClick={() => removeLine(row.line.key)}
                            />
                          </div>
                          {row.item.option && (
                            <div className="mt-3">
                              <OptionSelect row={row} onChange={(idx) => updateLine(row.line.key, { choiceIdx: idx })} />
                            </div>
                          )}
                          <div className="mt-3 flex items-center justify-between gap-4">
                            <div className="w-[140px]">
                              <QtyInput row={row} onChange={(qty) => updateLine(row.line.key, { qty })} />
                            </div>
                            <span className="num text-[15px] font-medium text-ink">{inr.format(row.amount)}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <div className="mt-5">
                  <Selector
                    label="Add an item"
                    description={`From the ${business.type.toLowerCase()} price list`}
                    placeholder="Choose an item to add…"
                    value={addValue}
                    onChange={(v) => v && addLine(v)}
                    options={addOptions}
                    hasSearch={addOptions.length > 6}
                  />
                </div>
              </Section>

              <Section n="04" title="Discount and tax">
                <div className="flex flex-wrap items-end gap-x-10 gap-y-5">
                  <NumberInput
                    label="Extra discount"
                    value={discountPct}
                    onChange={(v) => setDiscountPct(Math.min(100, Math.max(0, v || 0)))}
                    min={0}
                    max={100}
                    units="%"
                    hasNumberSteppers
                    width={160}
                  />
                  <div className="pb-2">
                    <Switch label={`Add GST (${GST_RATE}%)`} value={gstOn} onChange={(v) => setGstOn(v)} />
                  </div>
                </div>
                {business.extraCharge && (
                  <p className="mt-4 text-[13px] text-muted">
                    {business.extraCharge.label} of {inr.format(business.extraCharge.amount)} is added automatically for
                    this business.
                  </p>
                )}
              </Section>
            </div>
          </div>

          {/* Totals + save, always in reach */}
          <div className="sticky bottom-0 z-10 shrink-0 border-t border-line bg-sheet/95 backdrop-blur-sm">
            <div className="mx-auto flex w-full max-w-[720px] items-center gap-4 px-4 py-3 sm:px-8">
              <div className="min-w-0">
                <p className="text-[12px] text-muted">
                  Total {gstOn ? "incl. GST" : "(no GST)"}
                </p>
                <p className="num text-[22px] leading-tight font-semibold tracking-[-0.02em] text-ink">
                  {inr.format(totals.total)}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="max-sm:hidden lg:hidden">
                  <Button label="Preview" variant="secondary" onClick={() => setView("preview")} />
                </span>
                <Button label="Save quotation" variant="primary" icon={<SaveIcon />} onClick={saveQuote} />
              </div>
            </div>
          </div>
        </div>

        {/* ============================ PREVIEW ============================ */}
        <div
          className={`min-h-0 bg-paper-deep lg:overflow-y-auto print:block print:bg-white ${
            view === "preview" ? "" : "max-lg:hidden"
          }`}
        >
          <div className="mx-auto w-full max-w-[820px] px-4 pt-5 pb-10 sm:px-8 lg:pt-7 print:max-w-none print:p-0">
            <div className="mb-4 flex items-center gap-3 print:hidden">
              <p className="text-[13px] font-medium text-ink">Preview</p>
              <span className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase">A4<span className="max-sm:hidden"> · updates as you type</span></span>
            </div>
            <div className="qs-frame shadow-[0_0_0_1px_rgba(23,21,19,0.07),0_24px_48px_-24px_rgba(23,21,19,0.35)] print:shadow-none">
              <QuoteSheet
                id="quote-sheet"
                business={business}
                rows={rows}
                totals={totals}
                discountPct={discountPct}
                gstOn={gstOn}
                number={number}
                date={today ? formatDate(today) : "—"}
                validTill={validTill ? formatDate(validTill) : "—"}
                customer={customer}
                phone={phone}
              />
            </div>
            <p className="mt-4 text-center text-[12.5px] text-muted lg:hidden print:hidden">
              Pinch to zoom, or use Print / Save as PDF for a full-size copy.
            </p>
          </div>
        </div>
      </main>

      {/* ============================ OLD QUOTATIONS ============================ */}
      <Drawer label="Old quotations" isOpen={historyOpen} onOpenChange={setHistoryOpen} width={480}>
        <DrawerHeader
          title="Old quotations"
          subtitle="Saved in this browser for the demo"
          onOpenChange={setHistoryOpen}
          hasDivider
        />
        {saved.length === 0 ? (
          <div className="py-6">
            <EmptyState
              title="No saved quotations yet"
              description="Quotations you save will be listed here, so you can open them again later."
              actions={<Button label="Close" variant="secondary" onClick={() => setHistoryOpen(false)} />}
            />
          </div>
        ) : (
          <div className="flex min-h-0 flex-col">
            <ul>
              {saved.map((q) => {
                const b = sampleBusinesses.find((x) => x.id === q.businessId);
                return (
                  <li key={q.number + q.date} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => openQuote(q)}
                      className="group -mx-3 grid w-[calc(100%+1.5rem)] grid-cols-[1fr_auto] gap-x-4 gap-y-1 rounded-[4px] px-3 py-4 text-left transition-colors hover:bg-paper focus-visible:bg-paper focus-visible:outline-none"
                    >
                      <span className="num font-mono text-[12.5px] text-muted">{q.number}</span>
                      <span className="num text-right text-[15px] font-medium text-ink">{inr.format(q.total)}</span>
                      <span className="truncate text-[15px] text-ink">{q.customer}</span>
                      <span className="text-right text-[13px] font-medium text-brand opacity-70 transition-opacity group-hover:opacity-100">
                        Open →
                      </span>
                      <span className="col-span-2 text-[12.5px] text-muted">
                        {b?.type} · {formatDate(new Date(q.date))}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="py-5">
              <Button
                label="Delete all demo quotations"
                variant="ghost"
                size="sm"
                icon={<TrashIcon />}
                onClick={() => {
                  persist([]);
                  toast({ body: "Demo quotations deleted", uniqueID: "clear" });
                }}
              />
            </div>
          </div>
        )}
      </Drawer>

      {/* ============================ RESET ============================ */}
      <Dialog isOpen={resetOpen} onOpenChange={setResetOpen} width={440}>
        <DialogHeader title="Reset the demo?" onOpenChange={setResetOpen} hasDivider={false} />
        <div className="px-4 pb-4">
          <p className="text-[15px] leading-6 text-ink-soft">
            This puts the demo back to how it started and deletes the quotations saved in this browser.
          </p>
          <div className="mt-6 flex justify-end gap-2">
            <Button label="Cancel" variant="secondary" onClick={() => setResetOpen(false)} />
            <Button label="Reset demo" variant="destructive" onClick={resetDemo} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

function BusinessSummary({ business }: { business: Business }) {
  return (
    <dl className="mt-5 grid gap-x-8 gap-y-3 text-[13.5px] sm:grid-cols-[auto_1fr]">
      <dt className="text-muted">Business</dt>
      <dd className="text-ink">
        {business.name} <span className="text-muted">· {business.tagline}</span>
      </dd>
      <dt className="text-muted">Pricing</dt>
      <dd className="text-ink">{business.pricingNote}</dd>
    </dl>
  );
}
