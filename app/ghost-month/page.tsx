import type { Metadata } from "next";
import { GhostMonthPageContent } from "@/components/ghost-month/GhostMonthPageContent";

export const metadata: Metadata = {
  title: "Il Mese dell'Ospitalità Invisibile · Portici DaDaocheng N°2",
  description:
    "Un viaggio tra soglie, offerte e rituali del settimo mese lunare — Vol.2, Estate 2026.",
};

export default function GhostMonthPage() {
  return <GhostMonthPageContent />;
}
