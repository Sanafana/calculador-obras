import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calculador de Custos & Gerador de Orçamentos de Obras",
  description: "Software simples e rápido para cálculo de custos de construção, margens de lucro e geração de propostas comerciais em PDF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
