"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type PortalArcProps = {
  isLit: boolean;
};

export function PortalArc({ isLit }: PortalArcProps) {
  return (
    <motion.div
      className="relative mx-auto aspect-[4/3] w-full max-w-[320px] sm:max-w-[360px]"
      aria-hidden="true"
      animate={
        isLit
          ? {
              filter: [
                "drop-shadow(0 0 0px transparent)",
                "drop-shadow(0 0 24px var(--red-ritual))",
                "drop-shadow(0 0 48px var(--red-glow))",
              ],
            }
          : { filter: "drop-shadow(0 0 0px transparent)" }
      }
      transition={{ duration: 0.9, ease: "easeInOut" }}
      whileHover={
        !isLit
          ? { filter: "drop-shadow(0 0 16px var(--red-glow))" }
          : undefined
      }
    >
      <Image
        src="/ghost-month/images/ghost-gate.png"
        alt=""
        fill
        priority
        className="object-contain"
        sizes="(max-width: 640px) 320px, 360px"
      />
    </motion.div>
  );
}
