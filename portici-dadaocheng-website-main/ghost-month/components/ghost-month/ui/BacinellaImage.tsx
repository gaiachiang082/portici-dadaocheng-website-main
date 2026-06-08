"use client";

import Image from "next/image";
import { ghostMonthAsset } from "@/lib/paths";
import { useState } from "react";

export function BacinellaImage() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="flex aspect-[3/4] w-full items-center justify-center border border-red-ritual bg-[#14100c] shadow-[0_0_24px_var(--red-glow)]"
        aria-label="Illustrazione bacinella — in arrivo"
      >
        <p className="px-6 text-center font-label text-[10px] font-extralight uppercase tracking-[0.25em] text-ink-secondary">
          Illustrazione
          <br />
          bacinella
        </p>
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden border border-red-ritual shadow-[0_0_24px_var(--red-glow)]">
      <Image
        src={ghostMonthAsset("/images/bacinella.jpg")}
        alt="Bacinella e asciugamano — illustrazione dalla rivista"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 320px"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
