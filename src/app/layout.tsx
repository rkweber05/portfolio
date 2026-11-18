import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/instrument-sans";
import "./globals.css";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.role}`,
  description:
    "Líder técnico em uma plataforma de pagamentos. PHP, Laravel e Go, com resultados medidos em desempenho, entrega e suporte.",
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: "Resultados medidos em desempenho, entrega e suporte.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf0f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1a1c" },
  ],
};

// Roda antes da primeira pintura: aplica o tema salvo; sem escolha salva, o claro é o padrão.
const themeInit = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {children}
      </body>
    </html>
  );
}
