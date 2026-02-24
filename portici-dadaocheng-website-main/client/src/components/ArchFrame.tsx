/**
 * ArchFrame — Portici 圓拱門造型元件
 *
 * 圓拱門（Portici）是品牌名稱的核心意象：義大利波隆納的拱廊，
 * 象徵「通道」「相遇」「跨越」。此元件提供三種使用方式：
 *
 * 1. <ArchFrame> — 圓拱門外框，包裹子內容（圖片、文字）
 * 2. <ArchImage> — 圓拱門 clip-path 圖片
 * 3. <ArchDecor> — 純裝飾性圓拱門線條
 */

import React from "react";

/* ── 1. ArchFrame：圓拱門外框，包裹任意內容 ── */
interface ArchFrameProps {
  children: React.ReactNode;
  className?: string;
  width?: number | string;
  height?: number | string;
  borderColor?: string;
  borderWidth?: number;
}

export function ArchFrame({
  children,
  className = "",
  width = 280,
  height = 380,
  borderColor = "oklch(55.0% 0.075 55)",
  borderWidth = 1,
}: ArchFrameProps) {
  const w = typeof width === "number" ? `${width}px` : width;
  const h = typeof height === "number" ? `${height}px` : height;
  // Arch radius = half of width
  const r = typeof width === "number" ? width / 2 : "50%";

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: w, height: h }}
    >
      {/* SVG arch border */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 136"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Arch path: semicircle top + rectangle bottom */}
        <path
          d="M 2 136 L 2 50 A 48 48 0 0 1 98 50 L 98 136 Z"
          stroke={borderColor}
          strokeWidth={borderWidth * 1.5}
          fill="none"
        />
      </svg>
      {/* Content clipped to arch shape */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: "path('M 0 100% L 0 36.76% A 50% 50% 0 0 1 100% 36.76% L 100% 100% Z')",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── 2. ArchImage：圓拱門 clip-path 圖片 ── */
interface ArchImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string; // e.g. "3/4", "2/3"
  showBorder?: boolean;
  borderColor?: string;
}

export function ArchImage({
  src,
  alt,
  className = "",
  aspectRatio = "3/4",
  showBorder = true,
  borderColor = "oklch(55.0% 0.075 55 / 0.4)",
}: ArchImageProps) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio }}>
      {/* Image with arch clip */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius: "9999px 9999px 0 0",
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      {/* Decorative border overlay */}
      {showBorder && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: "9999px 9999px 0 0",
            border: `1px solid ${borderColor}`,
          }}
        />
      )}
    </div>
  );
}

/* ── 3. ArchDecor：純裝飾性圓拱門線條 ── */
interface ArchDecorProps {
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  filled?: boolean;
  opacity?: number;
}

const archSizes = {
  sm: { width: 48, height: 64 },
  md: { width: 80, height: 108 },
  lg: { width: 120, height: 160 },
  xl: { width: 200, height: 268 },
};

export function ArchDecor({
  className = "",
  color = "oklch(55.0% 0.075 55)",
  size = "md",
  filled = false,
  opacity = 1,
}: ArchDecorProps) {
  const { width, height } = archSizes[size];
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 134"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      <path
        d="M 2 134 L 2 50 A 48 48 0 0 1 98 50 L 98 134 Z"
        stroke={color}
        strokeWidth="2"
        fill={filled ? `${color}` : "none"}
        fillOpacity={filled ? 0.08 : 0}
      />
    </svg>
  );
}

/* ── 4. ArchDivider：圓拱門分隔線（用於 section 之間） ── */
interface ArchDividerProps {
  className?: string;
  color?: string;
  count?: number;
}

export function ArchDivider({
  className = "",
  color = "oklch(55.0% 0.075 55)",
  count = 3,
}: ArchDividerProps) {
  return (
    <div className={`flex items-end justify-center gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <ArchDecor
          key={i}
          color={color}
          size="sm"
          opacity={i === Math.floor(count / 2) ? 1 : 0.35}
        />
      ))}
    </div>
  );
}
