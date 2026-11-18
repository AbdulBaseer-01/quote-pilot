"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Homepage motion, all in one place:
 *  - hero entrance ([data-hero])
 *  - the hero "price list → quotation" sequence ([data-flow-row] / [data-flow-line] / [data-flow-totals])
 *  - gentle reveals for [data-reveal] blocks as they scroll in
 *
 * Only runs when the visitor has not asked for reduced motion. The `motion` class on
 * <html> (set by an inline script before paint) is what hides hero elements initially,
 * so nothing flashes and nothing stays hidden when motion is off.
 */
export default function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ease = "power3.out";

      // ---- Hero entrance
      const tl = gsap.timeline({ defaults: { ease, duration: 0.9 } });
      tl.fromTo("[data-hero='intro']", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6 })
        .fromTo(
          "[data-hero='line']",
          { yPercent: 105 },
          { yPercent: 0, duration: 1.05, stagger: 0.09, ease: "power4.out" },
          0.1
        )
        .fromTo("[data-hero='copy']", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, stagger: 0.08 }, 0.55)
        .fromTo(
          "[data-hero='visual']",
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 1.1, ease: "power4.out" },
          0.5
        );

      // ---- Price list → quotation, played once after the visual lands
      const rows = gsap.utils.toArray<HTMLElement>("[data-flow-row]");
      const lines = gsap.utils.toArray<HTMLElement>("[data-flow-line]");
      if (rows.length && lines.length) {
        gsap.set(lines, { autoAlpha: 0, y: 8 });
        gsap.set("[data-flow-totals]", { autoAlpha: 0 });
        gsap.set("[data-flow-check]", { scale: 0, autoAlpha: 0 });
        lines.forEach((line, i) => {
          const row = rows.find((r) => r.dataset.flowRow === String(i));
          const at = 1.5 + i * 0.55;
          if (row) {
            tl.fromTo(row, { backgroundColor: "rgba(184,70,27,0)" }, { backgroundColor: "rgba(184,70,27,0.09)", duration: 0.3 }, at)
              .to(row.querySelector("[data-flow-check]"), { scale: 1, autoAlpha: 1, duration: 0.35, ease: "back.out(2)" }, at);
          }
          tl.to(line, { autoAlpha: 1, y: 0, duration: 0.5 }, at + 0.2);
        });
        tl.to("[data-flow-totals]", { autoAlpha: 1, duration: 0.6 }, 1.5 + lines.length * 0.55 + 0.1);
      }

      // ---- Section reveals (only for blocks that start below the fold)
      const blocks = gsap.utils
        .toArray<HTMLElement>("[data-reveal]")
        .filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
      gsap.set(blocks, { autoAlpha: 0, y: 28 });
      ScrollTrigger.batch(blocks, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease, stagger: 0.08 }),
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });

    // Motion not allowed (or ended): make sure nothing is left hidden.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      root.classList.remove("motion");
    });

    return () => mm.revert();
  }, []);

  return null;
}
