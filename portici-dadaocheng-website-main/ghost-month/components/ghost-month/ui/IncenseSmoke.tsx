"use client";

const SMOKE_PATHS = [
  "M 98 95 Q 92 70 96 45 Q 100 20 94 0",
  "M 100 95 Q 108 68 102 42 Q 98 18 104 -2",
  "M 102 95 Q 106 72 100 48 Q 94 22 100 2",
];

export function IncenseSmoke() {
  return (
    <g className="incense-smoke" aria-hidden="true">
      {SMOKE_PATHS.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="var(--ink-secondary)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity={0.35 + i * 0.1}
          strokeDasharray="200"
          className="incense-smoke-path"
          style={{ animationDelay: `${i * 1.2}s` }}
        />
      ))}
    </g>
  );
}
