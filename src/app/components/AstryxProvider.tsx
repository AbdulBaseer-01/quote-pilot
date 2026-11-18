"use client";

import { Theme } from "@astryxdesign/core/theme";
import { themes, defaultThemeSlug } from "../../astryx-themes";

// Applies the Astryx theme to the whole app. Kept as a client component so the
// theme object never has to cross the server → client boundary as a prop.
// mode="light": the site is light-only (see color-scheme in globals.css).
export default function AstryxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Theme theme={themes[defaultThemeSlug]} mode="light">
      {children}
    </Theme>
  );
}
