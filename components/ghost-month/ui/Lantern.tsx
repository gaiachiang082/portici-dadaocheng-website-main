"use client";

type LanternProps = {
  lit?: boolean;
  className?: string;
  width?: number;
  height?: number;
};

export function Lantern({
  lit = false,
  className = "",
  width = 48,
  height = 64,
}: LanternProps) {
  return (
    <svg
      viewBox="0 0 48 64"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      style={
        lit
          ? {
              filter: "drop-shadow(0 0 8px var(--gold-incense))",
            }
          : undefined
      }
    >
      {/* Roof */}
      <polygon
        points="10,24 24,8 38,24"
        fill={lit ? "var(--gold-incense)" : "none"}
        fillOpacity={lit ? 0.8 : 0}
        stroke="var(--ink)"
        strokeOpacity={lit ? 0.6 : 0.4}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />

      {/* Body */}
      <rect
        x="12"
        y="24"
        width="24"
        height="34"
        rx="2"
        fill={lit ? "var(--gold-incense)" : "none"}
        fillOpacity={lit ? 0.8 : 0}
        stroke="var(--ink)"
        strokeOpacity={lit ? 0.6 : 0.4}
        strokeWidth={1.2}
      />

      {/* Decorative side lines */}
      <line
        x1="16"
        y1="30"
        x2="16"
        y2="52"
        stroke="var(--ink)"
        strokeOpacity={lit ? 0.5 : 0.35}
        strokeWidth={0.8}
      />
      <line
        x1="32"
        y1="30"
        x2="32"
        y2="52"
        stroke="var(--ink)"
        strokeOpacity={lit ? 0.5 : 0.35}
        strokeWidth={0.8}
      />

      {/* Base */}
      <rect
        x="18"
        y="58"
        width="12"
        height="4"
        rx="1"
        fill={lit ? "var(--gold-incense)" : "none"}
        fillOpacity={lit ? 0.8 : 0}
        stroke="var(--ink)"
        strokeOpacity={lit ? 0.6 : 0.4}
        strokeWidth={1.2}
      />

      {/* Flame — visible when lit */}
      {lit && (
        <g className="lantern-flame" transform="translate(24, 6)">
          <ellipse cx="0" cy="4" rx="3" ry="2" fill="var(--gold-incense)" opacity={0.5} />
          <path
            d="M 0 6 C -2 2 -1 -2 0 -4 C 1 -2 2 2 0 6 Z"
            fill="var(--red-ritual)"
          />
          <path
            d="M 0 5 C -0.8 1.5 -0.4 -1 0 -2.5 C 0.4 -1 0.8 1.5 0 5 Z"
            fill="var(--gold-incense)"
          />
        </g>
      )}
    </svg>
  );
}
