import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portici DaDaocheng",
  description:
    "Rivista culturale — da Bologna a Taipei, sotto gli stessi tetti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${fontVariables} h-full antialiased`}>
      <body className="noise-overlay min-h-full">{children}</body>
    </html>
  );
}
