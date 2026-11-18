import type { Metadata } from "next";
import DemoApp from "@/components/demo/DemoApp";

export const metadata: Metadata = {
  title: "Live demo",
  description:
    "Try QuotePilot with a sample business: add items, see the quotation fill in, save it, and print or save it as a PDF.",
};

export default function DemoPage() {
  return <DemoApp />;
}
