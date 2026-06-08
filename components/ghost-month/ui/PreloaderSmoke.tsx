"use client";

const SMOKE_PATHS = [
  "M 38 34 Q 36 24 37 16 Q 38 8 36 2",
  "M 40 34 Q 42 22 41 14 Q 40 6 42 0",
  "M 42 34 Q 43 24 41 16 Q 39 8 41 2",
];

export function PreloaderSmoke() {
  return (
    <g aria-hidden="true">
      {SMOKE_PATHS.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="var(--ink)"
          strokeOpacity={0.3}
          strokeWidth={0.8}
          strokeLinecap="round"
          strokeDasharray="40"
          className="preloader-smoke-path"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </g>
  );
}
