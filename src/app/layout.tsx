import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // must stay the first stylesheet: declares cascade layer order
import AstryxProvider from "./components/AstryxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "QuotePilot – Quotations, made simple",
    template: "%s – QuotePilot",
  },
  description:
    "QuotePilot is set up for your business, your products and the prices you set. Create professional quotations, save customer details and manage all your quotations in one place.",
};

export const viewport: Viewport = {
  themeColor: "#f4f0e8",
};

// Runs before first paint: marks that motion is allowed, so the hero can start hidden
// without a flash. Never set when the visitor prefers reduced motion.
const motionScript = `try{if(matchMedia('(prefers-reduced-motion: no-preference)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <AstryxProvider>{children}</AstryxProvider>
      </body>
    </html>
  );
}
