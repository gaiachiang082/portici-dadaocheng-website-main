"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Footer } from "@/components/ghost-month/Footer";
import { HeroPortal } from "@/components/ghost-month/HeroPortal";
import { LanternsSection } from "@/components/ghost-month/LanternsSection";
import { MagazineSection } from "@/components/ghost-month/MagazineSection";
import { MigrationMap } from "@/components/ghost-month/MigrationMap";
import { PersonalMoment } from "@/components/ghost-month/PersonalMoment";
import { Preloader } from "@/components/ghost-month/Preloader";
import { SogliaSection } from "@/components/ghost-month/SogliaSection";

export function GhostMonthPageContent() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && (
          <Preloader key="preloader" onComplete={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>

      <main className="bg-bg-dark">
        <HeroPortal />
        <SogliaSection />
        <MigrationMap />
        <PersonalMoment />
        <LanternsSection />
        <MagazineSection />
        <Footer />
      </main>
    </>
  );
}
