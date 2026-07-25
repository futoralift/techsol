"use client";

export default function SvgArcs() {
  const leftArcs = [300, 520, 740, 960, 1180];
  const rightArcs = [300, 520, 740, 960, 1180];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Center Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.65) 45%, rgba(255,255,255,0.15) 70%, transparent 100%)",
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >
        <defs>
          <filter
            id="arcShadow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="2"
              floodColor="#000"
              floodOpacity="0.05"
            />
          </filter>
        </defs>

        {/* LEFT SIDE */}
        {leftArcs.map((cx, i) => (
          <ellipse
            key={`left-${i}`}
            cx={cx}
            cy="540"
            rx="360"
            ry="980"
            fill="none"
            stroke="#E6E6E6"
            strokeWidth="2"
            filter="url(#arcShadow)"
          />
        ))}

        {/* RIGHT SIDE */}
        {rightArcs.map((cx, i) => (
          <ellipse
            key={`right-${i}`}
            cx={1920 - cx}
            cy="540"
            rx="360"
            ry="980"
            fill="none"
            stroke="#E6E6E6"
            strokeWidth="2"
            filter="url(#arcShadow)"
          />
        ))}

        {/* LARGE CENTER RINGS */}
        <ellipse
          cx="960"
          cy="540"
          rx="520"
          ry="460"
          fill="none"
          stroke="#ECECEC"
          strokeWidth="2"
        />

        <ellipse
          cx="960"
          cy="540"
          rx="760"
          ry="620"
          fill="none"
          stroke="#ECECEC"
          strokeWidth="2"
        />
      </svg>

      {/* Edge Fade */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right,
              rgba(248,248,248,0.75) 0%,
              transparent 12%,
              transparent 88%,
              rgba(248,248,248,0.75) 100%
            )
          `,
        }}
      />

      {/* Top & Bottom Fade */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(248,248,248,0.45),
              transparent 18%,
              transparent 82%,
              rgba(248,248,248,0.45)
            )
          `,
        }}
      />
    </div>
  );
}