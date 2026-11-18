// Small stroke icons for the demo app (Astryx's semantic icon set does not include these).
import type { SVGProps } from "react";

function base(props: SVGProps<SVGSVGElement>) {
  return {
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    width: 16,
    height: 16,
    ...props,
  };
}

export const PrintIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M5.5 7.5V3h9v4.5M5.5 14H3.5v-5a1.5 1.5 0 0 1 1.5-1.5h10A1.5 1.5 0 0 1 16.5 9v5h-2" />
    <path d="M5.5 11.5h9V17h-9z" />
  </svg>
);

export const HistoryIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3.5 10a6.5 6.5 0 1 0 1.9-4.6M3.5 3.5v2.9h2.9" />
    <path d="M10 6.5V10l2.5 1.5" />
  </svg>
);

export const ResetIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M16.5 10A6.5 6.5 0 1 1 14.6 5.4M16.5 3.5v2.9h-2.9" />
  </svg>
);

export const TrashIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M4 6h12M8 6V4h4v2M5.5 6l.7 10h7.6l.7-10M8.5 9v4.5M11.5 9v4.5" />
  </svg>
);

export const SaveIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M4 3.5h9.5L16.5 6.5V16.5H4z" />
    <path d="M7 3.5v4h6v-4M7 16.5v-5h6v5" />
  </svg>
);

export const ArrowLeftIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M16 10H4M9 5l-5 5 5 5" />
  </svg>
);
