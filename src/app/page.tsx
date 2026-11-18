import Link from "next/link";
import ContactForm from "@/components/site/ContactForm";
import Motion from "@/components/site/Motion";
import SiteHeader from "@/components/site/SiteHeader";
import {
  CustomerCard,
  FeatureSheet,
  HeroVisual,
  HistoryCard,
  PricingSetup,
  StepBusiness,
  StepItems,
  StepPrices,
  StepQuotes,
} from "@/components/site/visuals";

const wrap = "mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12";

function SectionLabel({ n, children, tone = "light" }: { n: string; children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-[12px] tracking-[0.14em] uppercase ${
        tone === "dark" ? "text-paper/60" : "text-muted"
      }`}
    >
      <span className="text-brand">{n}</span>
      <span aria-hidden className={`h-px w-6 ${tone === "dark" ? "bg-paper/30" : "bg-line"}`} />
      {children}
    </p>
  );
}

const steps = [
  { title: "Set up your business", text: "Your business name, GST number, quotation number style, validity and terms.", visual: <StepBusiness /> },
  { title: "Add your products or services", text: "Everything you sell, priced per piece, per hour, per month or per project.", visual: <StepItems /> },
  { title: "Set your prices", text: "Your own prices, options that change the price, and discounts for bigger orders.", visual: <StepPrices /> },
  { title: "Create and manage quotations", text: "Pick items for a customer. Prices, tax and totals fill in. Every quotation is saved.", visual: <StepQuotes /> },
];

const industries = [
  { name: "Product sellers & distributors", how: "Price per piece or per box, with discounts on bigger orders" },
  { name: "Manufacturers", how: "Made-to-order items, printing or finish options, bulk rates", demo: true },
  { name: "Service providers", how: "Fixed project prices, monthly charges and hourly rates", demo: true },
  { name: "Interior & furniture businesses", how: "Per piece, with finish and fabric options, plus delivery", demo: true },
  { name: "Custom order businesses", how: "Items with choices that each change the final price" },
  { name: "Agencies", how: "Packages, retainers and one-time work in one quotation" },
];

const faqs = [
  {
    q: "Is QuotePilot only for one type of business?",
    a: "No. QuotePilot works for any business that sends quotations to customers: shops, distributors, manufacturers, service providers, furniture and interior businesses, agencies and more. It is set up around what you sell.",
  },
  {
    q: "My prices work differently from other businesses. Will it still work for me?",
    a: "Yes. You can charge per piece, per hour, per month or per project, add options that change the price, give bulk discounts, or add fixed charges like delivery. QuotePilot is set up to follow your pricing.",
  },
  {
    q: "Who sets up my products and prices?",
    a: "We help you set it up. You share your products or services, your prices and how you like your quotations to look, and we configure QuotePilot for your business.",
  },
  {
    q: "Can I change my products and prices later?",
    a: "Yes. Items and prices can be added, removed or updated whenever your business needs it.",
  },
  {
    q: "Can I print the quotation or send it as a PDF?",
    a: "Yes. Every quotation can be printed, or saved as a PDF from your browser and then shared on WhatsApp or email.",
  },
  {
    q: "Are the prices in the live demo real?",
    a: "No. The businesses, products and prices in the demo are made up to show how QuotePilot works. Your setup will use your own details.",
  },
  {
    q: "Do I need technical knowledge?",
    a: "No. If you can fill in a simple form, you can make a quotation in QuotePilot.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-paper">
      <Motion />
      <SiteHeader />

      <main className="flex-1">
        {/* ============================== HERO ============================== */}
        <section className="pt-8 pb-20 sm:pt-12 lg:pb-28">
          <div className={wrap}>
            <p
              data-hero="intro"
              className="flex items-start gap-3 border-b border-line pb-5 text-[17px] leading-snug font-medium tracking-[-0.01em] text-ink sm:items-center sm:text-[19px]"
            >
              <span aria-hidden className="mt-[7px] h-2 w-2 shrink-0 bg-brand sm:mt-0" />
              Configured for your business, your products and the prices you set.
            </p>

            <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-10 sm:mt-14 lg:grid-cols-12 lg:items-end lg:gap-10">
              <div className="lg:col-span-8">
                <p data-hero="copy" className="font-mono text-[12px] tracking-[0.18em] text-brand uppercase">
                  Quotations, made simple
                </p>
                <h1 className="mt-5 text-[clamp(2.5rem,6vw,5.6rem)] leading-[0.96] font-semibold tracking-tightest text-ink">
                  {["Create professional", "quotations without", "doing everything", "manually."].map((l) => (
                    <span key={l} className="block overflow-hidden pb-[0.06em]">
                      <span data-hero="line" className="block">
                        {l}
                      </span>
                    </span>
                  ))}
                </h1>
              </div>
              <div className="lg:col-span-4 lg:pb-3">
                <p data-hero="copy" className="max-w-[36ch] text-[18px] leading-[1.6] text-ink-soft">
                  QuotePilot works around your business. Set up your products, services and prices once. Then create,
                  manage and track customer quotations from one simple place.
                </p>
                <div data-hero="copy" className="mt-8 flex flex-col gap-3 whitespace-nowrap sm:flex-row lg:flex-col xl:flex-row">
                  <Link
                    href="/demo"
                    className="group inline-flex items-center justify-center gap-2 rounded-[4px] bg-brand px-6 py-4 text-[15px] font-medium text-white transition-colors hover:bg-brand-deep"
                  >
                    Try Live Demo
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                  <a
                    href="#get-quotepilot"
                    className="inline-flex items-center justify-center rounded-[4px] border border-ink/80 px-6 py-4 text-[15px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    Get QuotePilot
                  </a>
                </div>
                <p data-hero="copy" className="mt-5 text-[13.5px] leading-6 text-muted">
                  The demo uses made-up sample businesses. No sign-up needed.
                </p>
              </div>
            </div>
            <div data-hero="visual" className="mt-14 min-w-0 lg:mt-20">
              <HeroVisual />
            </div>
          </div>
        </section>

        {/* ========================= WHAT IS QUOTEPILOT ========================= */}
        <section className="border-t border-line py-20 lg:py-32">
          <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-12`}>
            <div className="lg:col-span-3">
              <SectionLabel n="01">What it is</SectionLabel>
            </div>
            <div className="lg:col-span-9" data-reveal>
              <p className="text-[clamp(1.6rem,3.3vw,3rem)] leading-[1.18] font-medium tracking-[-0.025em] text-ink">
                QuotePilot is set up according to your business.{" "}
                <span className="text-muted">
                  Add your products or services, set your prices, and customise your quotation format.
                </span>{" "}
                Your team can then create professional quotations, save customer details and manage all your quotations
                in one place.
              </p>
              <div className="mt-14 grid gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:mt-20">
                <p className="text-[17px] leading-[1.65] text-ink-soft">
                  Your business has its own products, services and pricing. QuotePilot is configured around those
                  things, so you can create quotations the way your business needs them.
                </p>
                <p className="text-[17px] leading-[1.65] text-ink-soft">
                  No more copying prices from a list, working out totals on a calculator, and retyping the same details
                  for every customer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================ HOW IT WORKS ============================ */}
        <section id="how-it-works" className="bg-paper-deep py-20 lg:py-32">
          <div className={wrap}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <SectionLabel n="02">How it works</SectionLabel>
              </div>
              <h2
                data-reveal
                className="max-w-[18ch] text-[clamp(2rem,4.6vw,4.25rem)] leading-[1] font-semibold tracking-[-0.035em] text-ink lg:col-span-9"
              >
                Set up once. Then just create quotations.
              </h2>
            </div>

            <ol className="mt-16 grid border-t border-ink/80 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  data-reveal
                  className={`flex flex-col border-b border-line pt-7 pb-10 sm:px-6 lg:border-b-0 lg:pb-2 ${
                    i % 2 === 1 ? "sm:border-l" : "sm:pl-0"
                  } ${i > 0 ? "lg:border-l lg:pl-6" : "lg:pl-0"} ${i === 3 ? "lg:pr-0" : ""}`}
                >
                  <span className="num font-mono text-[13px] text-brand">0{i + 1}</span>
                  <h3 className="mt-6 text-[22px] leading-tight font-semibold tracking-[-0.02em] text-ink lg:min-h-[2.5em]">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[32ch] text-[15.5px] leading-[1.6] text-ink-soft lg:min-h-[6.4em]">{s.text}</p>
                  <div className="mt-8 rounded-[4px] border border-line bg-sheet px-4 py-2">{s.visual}</div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============================== FEATURES ============================== */}
        <section id="features" className="py-20 lg:py-32">
          <div className={wrap}>
            <SectionLabel n="03">What you can do</SectionLabel>

            {/* Pricing */}
            <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5" data-reveal>
                <h2 className="max-w-[14ch] text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-ink">
                  Your prices. Your rules.
                </h2>
                <p className="mt-6 max-w-[42ch] text-[17px] leading-[1.65] text-ink-soft">
                  Every business prices differently, so QuotePilot follows yours. Once your prices are in, the correct
                  amount is worked out on every quotation.
                </p>
                <ul className="mt-8 grid grid-cols-2 gap-x-6 text-[15px] text-ink">
                  {[
                    "Per piece, hour, month or project",
                    "Options that change the price",
                    "Discounts for bigger orders",
                    "Delivery and other charges",
                    "GST added for you",
                    "Extra discount when you need it",
                  ].map((t) => (
                    <li key={t} className="border-t border-line py-3">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-7" data-reveal>
                <PricingSetup />
              </div>
            </div>
          </div>

          {/* Professional quotation (dark band) */}
          <div className="mt-24 bg-ink py-20 text-paper lg:mt-36 lg:py-28">
            <div className={`${wrap} grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10`}>
              <div className="lg:col-span-5" data-reveal>
                <h2 className="max-w-[13ch] text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
                  A quotation you are proud to send.
                </h2>
                <p className="mt-6 max-w-[40ch] text-[17px] leading-[1.65] text-paper/70">
                  Clean, clear and correct. Print it, or save it as a PDF from your browser and share it on WhatsApp
                  or email.
                </p>
                <dl className="mt-10 grid gap-x-8 sm:grid-cols-2">
                  {[
                    ["Your details", "Business name, address, phone and GST number"],
                    ["Numbered", "Quotation number, date and valid-till date"],
                    ["Clear items", "Description, quantity, rate and amount"],
                    ["Correct totals", "Discounts, extra charges, GST and final total"],
                  ].map(([t, d]) => (
                    <div key={t} className="border-t border-paper/15 py-4">
                      <dt className="text-[15px] font-medium">{t}</dt>
                      <dd className="mt-1 text-[14px] leading-6 text-paper/60">{d}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="lg:col-span-6 lg:col-start-7" data-reveal>
                <div className="mx-auto max-w-[560px] lg:rotate-[1.5deg]">
                  <FeatureSheet />
                </div>
              </div>
            </div>
          </div>

          {/* Customers + history */}
          <div className={`${wrap} mt-24 grid grid-cols-1 gap-16 lg:mt-36 lg:grid-cols-2 lg:gap-0`}>
            <div className="lg:border-r lg:border-line lg:pr-12" data-reveal>
              <h3 className="text-[28px] leading-tight font-semibold tracking-[-0.025em] text-ink sm:text-[34px]">
                Customer details, kept with each quotation
              </h3>
              <p className="mt-4 max-w-[44ch] text-[16.5px] leading-[1.65] text-ink-soft">
                Enter the name and phone number once. They appear on the quotation and stay saved with it.
              </p>
              <div className="mt-10">
                <CustomerCard />
              </div>
            </div>
            <div className="lg:pl-12" data-reveal>
              <h3 className="text-[28px] leading-tight font-semibold tracking-[-0.025em] text-ink sm:text-[34px]">
                Old quotations, one click away
              </h3>
              <p className="mt-4 max-w-[44ch] text-[16.5px] leading-[1.65] text-ink-soft">
                Every saved quotation is listed with its number, customer and total. Open one to check it or make a
                new version.
              </p>
              <div className="mt-10">
                <HistoryCard />
              </div>
            </div>
          </div>
        </section>

        {/* ============================ WHO IT'S FOR ============================ */}
        <section id="who-its-for" className="border-t border-line py-20 lg:py-32">
          <div className={wrap}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <SectionLabel n="04">Who it&apos;s for</SectionLabel>
              </div>
              <div className="lg:col-span-9" data-reveal>
                <h2 className="max-w-[20ch] text-[clamp(2rem,4.6vw,4.25rem)] leading-[1] font-semibold tracking-[-0.035em] text-ink">
                  For any business that sends quotations.
                </h2>
                <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-ink-soft">
                  Small shop or growing company, products or services. If you send prices to customers, QuotePilot can
                  be set up for you.
                </p>
              </div>
            </div>

            <ul className="mt-16 border-t border-ink/80 lg:mt-20">
              {industries.map((ind, i) => (
                <li
                  key={ind.name}
                  data-reveal
                  className="group grid gap-2 border-b border-line py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6 lg:py-8"
                >
                  <span className="num hidden font-mono text-[13px] text-muted sm:col-span-1 sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.1] font-medium tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-brand sm:col-span-6">
                    {ind.name}
                  </span>
                  <span className="text-[15.5px] leading-[1.55] text-ink-soft sm:col-span-4">{ind.how}</span>
                  <span className="sm:col-span-1 sm:text-right">
                    {ind.demo && (
                      <span className="font-mono text-[11px] tracking-[0.1em] text-brand uppercase">In demo</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============================== DEMO BAND ============================= */}
        <section className="bg-brand text-white">
          <div className={`${wrap} grid grid-cols-1 gap-10 py-20 lg:grid-cols-12 lg:items-end lg:py-28`}>
            <h2
              data-reveal
              className="text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.98] font-semibold tracking-tightest lg:col-span-8"
            >
              Make a sample quotation in under a minute.
            </h2>
            <div className="lg:col-span-4" data-reveal>
              <p className="max-w-[36ch] text-[17px] leading-[1.6] text-white/85">
                Pick a sample business, add items, and watch the quotation fill in. Then print it or save it as a PDF.
              </p>
              <Link
                href="/demo"
                className="group mt-8 inline-flex items-center gap-2 rounded-[4px] bg-white px-6 py-4 text-[15px] font-medium text-ink transition-colors hover:bg-ink hover:text-white"
              >
                Try Live Demo
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ================================ FAQ ================================ */}
        <section id="faq" className="py-20 lg:py-32">
          <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-12`}>
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <SectionLabel n="05">Questions</SectionLabel>
                <h2 className="mt-8 text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-ink">
                  Common questions
                </h2>
                <p className="mt-5 max-w-[30ch] text-[16px] leading-[1.6] text-ink-soft">
                  Something else on your mind?{" "}
                  <a href="#get-quotepilot" className="border-b border-current text-ink hover:text-brand">
                    Ask us directly.
                  </a>
                </p>
              </div>
            </div>
            <div className="border-t border-ink/80 lg:col-span-7 lg:col-start-6">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-[18px] leading-snug font-medium tracking-[-0.01em] text-ink transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden className="relative mt-2 h-3 w-3 shrink-0">
                      <span className="absolute top-[5px] left-0 h-[1.5px] w-3 bg-current" />
                      <span className="absolute top-0 left-[5px] h-3 w-[1.5px] bg-current transition-transform duration-300 group-open:scale-y-0" />
                    </span>
                  </summary>
                  <p className="max-w-[60ch] pb-7 text-[16px] leading-[1.7] text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ GET QUOTEPILOT ============================ */}
        <section id="get-quotepilot" className="border-t border-line bg-paper-deep py-20 lg:py-32">
          <div className={`${wrap} grid grid-cols-1 gap-14 lg:grid-cols-12`}>
            <div className="lg:col-span-5">
              <SectionLabel n="06">Get QuotePilot</SectionLabel>
              <h2 className="mt-8 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4.25rem)] leading-[1] font-semibold tracking-[-0.035em] text-ink">
                Get QuotePilot set up for your business.
              </h2>
              <p className="mt-6 max-w-[40ch] text-[17px] leading-[1.65] text-ink-soft">
                Tell us a little about your business. We will talk to you about your products, services and prices, and
                show you how your quotations can look.
              </p>
              <ol className="mt-10 max-w-[40ch] text-[15.5px] text-ink">
                {["Tell us what you sell and how you price it", "We set QuotePilot up around your business", "Your team starts making quotations"].map(
                  (t, i) => (
                    <li key={t} className="flex gap-4 border-t border-line py-4">
                      <span className="num font-mono text-[13px] text-brand">0{i + 1}</span>
                      {t}
                    </li>
                  )
                )}
              </ol>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* ================================ FOOTER ================================ */}
      <footer className="bg-ink text-paper">
        <div className={`${wrap} pt-16 pb-10`}>
          <div className="flex flex-col justify-between gap-10 border-b border-paper/15 pb-12 sm:flex-row">
            <p className="max-w-[28ch] text-[22px] leading-snug font-medium tracking-[-0.02em]">
              Simple quotations for every kind of business.
            </p>
            <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 text-[15px] text-paper/70">
              <a href="#how-it-works" className="hover:text-paper">How it works</a>
              <Link href="/demo" className="hover:text-paper">Live demo</Link>
              <a href="#features" className="hover:text-paper">Features</a>
              <a href="#faq" className="hover:text-paper">FAQ</a>
              <a href="#who-its-for" className="hover:text-paper">Who it&apos;s for</a>
              <a href="#get-quotepilot" className="hover:text-paper">Get QuotePilot</a>
            </nav>
          </div>
          <p
            aria-hidden
            className="mt-10 text-[clamp(4rem,17vw,15.5rem)] leading-[0.8] font-semibold tracking-[-0.055em] text-paper/[0.92] select-none"
          >
            QuotePilot
          </p>
          <div className="mt-8 flex flex-col justify-between gap-2 text-[13px] text-paper/50 sm:flex-row">
            <span>© QuotePilot</span>
            <span>Sample businesses and prices on this site are for illustration only.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
