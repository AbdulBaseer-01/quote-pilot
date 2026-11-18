"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Mark } from "./visuals";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#who-its-for", label: "Who it's for" },
  { href: "#faq", label: "FAQ" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-[17px] font-semibold tracking-[-0.02em] text-ink ${className}`}>
      <Mark className="h-[18px] w-[18px] text-brand" />
      QuotePilot
    </Link>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-paper/92 backdrop-blur-sm transition-colors duration-300 ${
        scrolled || open ? "border-line" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center gap-8 px-5 sm:px-8 lg:px-12">
        <Logo />
        <nav aria-label="Main" className="hidden flex-1 items-center gap-7 text-[14.5px] text-ink-soft lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-brand">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-5 lg:flex">
          <Link href="/demo" className="group text-[14.5px] font-medium text-ink transition-colors hover:text-brand">
            Try Live Demo <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <a
            href="#get-quotepilot"
            className="rounded-[4px] bg-ink px-4 py-2.5 text-[14px] font-medium text-paper transition-colors hover:bg-brand"
          >
            Get QuotePilot
          </a>
        </div>
        <button
          type="button"
          className="ml-auto -mr-2 flex h-10 items-center gap-2 px-2 text-[14px] font-medium text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden className="relative block h-3 w-4">
            <span className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-transform duration-300 ${open ? "top-[5px] rotate-45" : "top-0.5"}`} />
            <span className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-transform duration-300 ${open ? "top-[5px] -rotate-45" : "top-2"}`} />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-paper px-5 pt-2 pb-6 sm:px-8 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-line-soft py-4 text-[22px] font-medium tracking-[-0.02em] text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="mt-6 grid gap-3">
          <Link href="/demo" className="rounded-[4px] border border-ink py-3.5 text-center text-[15px] font-medium text-ink">
            Try Live Demo
          </Link>
          <a
            href="#get-quotepilot"
            onClick={() => setOpen(false)}
            className="rounded-[4px] bg-ink py-3.5 text-center text-[15px] font-medium text-paper"
          >
            Get QuotePilot
          </a>
        </div>
      </div>
    </header>
  );
}
