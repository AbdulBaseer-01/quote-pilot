"use client";

import { useState } from "react";

// NOTE: this form is not connected to a backend yet — submitting only shows the
// confirmation below. Wire `onSubmit` to an email service, CRM or API route before launch.
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const field =
    "mt-2 block w-full rounded-none border-0 border-b border-ink/25 bg-transparent px-0 py-2.5 text-[16px] text-ink placeholder:text-muted/70 transition-colors focus:border-brand focus:ring-0 focus:outline-none";
  const label = "block text-[13px] font-medium tracking-[0.01em] text-ink-soft";

  if (sent) {
    return (
      <div role="status" className="border-t-2 border-brand pt-8">
        <p className="text-[28px] leading-tight font-semibold tracking-[-0.02em] text-ink">Thank you. We have your details.</p>
        <p className="mt-4 max-w-md text-[16px] leading-7 text-ink-soft">
          We will contact you to understand your products, services and prices, and show you how QuotePilot can be set
          up for your business.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-x-8 gap-y-7 sm:grid-cols-2"
    >
      <label className={label}>
        Your name
        <input required name="name" className={field} autoComplete="name" />
      </label>
      <label className={label}>
        Business name
        <input required name="business" className={field} autoComplete="organization" />
      </label>
      <label className={label}>
        Phone / WhatsApp
        <input required name="phone" type="tel" inputMode="tel" className={field} autoComplete="tel" />
      </label>
      <label className={label}>
        Email <span className="font-normal text-muted">(optional)</span>
        <input name="email" type="email" className={field} autoComplete="email" />
      </label>
      <label className={`${label} sm:col-span-2`}>
        What does your business sell?
        <select name="sells" className={`${field} appearance-none`} defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          <option>Products</option>
          <option>Services</option>
          <option>Both products and services</option>
          <option>Custom or made-to-order items</option>
        </select>
      </label>
      <label className={`${label} sm:col-span-2`}>
        Tell us a little about your quotations <span className="font-normal text-muted">(optional)</span>
        <textarea
          name="details"
          rows={3}
          className={`${field} resize-none`}
          placeholder="What you sell, how you set your prices, and roughly how many quotations you make in a month."
        />
      </label>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-muted">We only use these details to contact you about QuotePilot.</p>
        <button
          type="submit"
          className="group rounded-[4px] bg-brand px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-brand-deep"
        >
          Send my details <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>
    </form>
  );
}
