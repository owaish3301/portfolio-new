export default function IsometricServerGraphic({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b1329] via-[#0f172a] to-[#050914] p-6 text-white shadow-inner ${className}`}
    >
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-12 -left-12 h-44 w-44 rounded-full bg-accent/25 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-blue-500/20 blur-2xl" />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <svg
        viewBox="0 0 360 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 h-full w-full max-w-[340px] drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="serverGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e2df6" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="serverGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#1e2df6" />
          </linearGradient>
          <linearGradient id="diskTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="diskSide" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* --- LEFT TIER: Server Cubes --- */}
        {/* Bottom Block */}
        <g transform="translate(60, 130)">
          {/* Top Face */}
          <polygon
            points="0,-20 40,-40 80,-20 40,0"
            fill="#1e3a8a"
            stroke="#60a5fa"
            strokeWidth="0.8"
          />
          {/* Left Face */}
          <polygon
            points="0,-20 40,0 40,30 0,10"
            fill="#0f172a"
            stroke="#3b82f6"
            strokeWidth="0.5"
          />
          {/* Right Face */}
          <polygon
            points="40,0 80,-20 80,10 40,30"
            fill="#1e293b"
            stroke="#3b82f6"
            strokeWidth="0.5"
          />
          {/* LED light dots */}
          <circle cx="20" cy="0" r="1.5" fill="#38bdf8" />
          <circle cx="27" cy="3.5" r="1.5" fill="#38bdf8" />
          <circle cx="34" cy="7" r="1.5" fill="#38bdf8" />
        </g>

        {/* Middle Block */}
        <g transform="translate(60, 95)">
          <polygon
            points="0,-20 40,-40 80,-20 40,0"
            fill="#2563eb"
            stroke="#93c5fd"
            strokeWidth="0.8"
          />
          <polygon
            points="0,-20 40,0 40,25 0,5"
            fill="#0f172a"
            stroke="#3b82f6"
            strokeWidth="0.5"
          />
          <polygon
            points="40,0 80,-20 80,5 40,25"
            fill="#1e293b"
            stroke="#3b82f6"
            strokeWidth="0.5"
          />
          <circle cx="20" cy="-2" r="1.5" fill="#60a5fa" />
          <circle cx="27" cy="1.5" r="1.5" fill="#60a5fa" />
        </g>

        {/* Top Block */}
        <g transform="translate(60, 65)">
          <polygon
            points="0,-20 40,-40 80,-20 40,0"
            fill="url(#serverGrad2)"
            stroke="#bae6fd"
            strokeWidth="1"
          />
          <polygon
            points="0,-20 40,0 40,20 0,0"
            fill="#1e293b"
            stroke="#38bdf8"
            strokeWidth="0.5"
          />
          <polygon
            points="40,0 80,-20 80,0 40,20"
            fill="#334155"
            stroke="#38bdf8"
            strokeWidth="0.5"
          />
          <circle cx="20" cy="-3" r="1.5" fill="#a7f3d0" />
          <circle cx="27" cy="0.5" r="1.5" fill="#a7f3d0" />
        </g>

        {/* --- RIGHT TIER: Cylinder / Database Disks --- */}
        <g transform="translate(210, 110)">
          {/* Disk 3 (Bottom) */}
          <g transform="translate(0, 50)">
            <path
              d="M0,0 C0,14 45,14 45,0 L45,15 C45,29 0,29 0,15 Z"
              fill="url(#diskSide)"
              stroke="#2563eb"
              strokeWidth="0.6"
            />
            <ellipse
              cx="22.5"
              cy="0"
              rx="22.5"
              ry="9"
              fill="url(#diskTop)"
              stroke="#93c5fd"
              strokeWidth="0.6"
            />
            <circle cx="10" cy="10" r="1.5" fill="#38bdf8" />
          </g>

          {/* Disk 2 (Middle) */}
          <g transform="translate(0, 25)">
            <path
              d="M0,0 C0,14 45,14 45,0 L45,15 C45,29 0,29 0,15 Z"
              fill="url(#diskSide)"
              stroke="#2563eb"
              strokeWidth="0.6"
            />
            <ellipse
              cx="22.5"
              cy="0"
              rx="22.5"
              ry="9"
              fill="url(#diskTop)"
              stroke="#93c5fd"
              strokeWidth="0.6"
            />
            <circle cx="10" cy="10" r="1.5" fill="#38bdf8" />
          </g>

          {/* Disk 1 (Top) */}
          <g transform="translate(0, 0)">
            <path
              d="M0,0 C0,14 45,14 45,0 L45,15 C45,29 0,29 0,15 Z"
              fill="url(#diskSide)"
              stroke="#2563eb"
              strokeWidth="0.6"
            />
            <ellipse
              cx="22.5"
              cy="0"
              rx="22.5"
              ry="9"
              fill="url(#diskTop)"
              stroke="#93c5fd"
              strokeWidth="0.8"
            />
            <circle cx="10" cy="10" r="1.5" fill="#67e8f9" />
          </g>
        </g>

        {/* --- CONNECTIONS / DATA FLOW --- */}
        <path
          d="M135 125 C 160 115, 180 145, 210 135"
          stroke="#38bdf8"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          className="animate-pulse"
        />
        <path
          d="M135 155 C 165 150, 185 175, 210 165"
          stroke="#60a5fa"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.7"
        />

        {/* Labels with hand-drawn arrows style */}
        <text
          x="35"
          y="180"
          fill="#94a3b8"
          fontFamily="monospace"
          fontSize="11"
          letterSpacing="0.05em"
        >
          Data
        </text>
        <path
          d="M50 172 C 55 160, 60 155, 68 152"
          stroke="#64748b"
          strokeWidth="1"
          fill="none"
          markerEnd="url(#arrow)"
        />

        <text
          x="120"
          y="45"
          fill="#bae6fd"
          fontFamily="monospace"
          fontSize="11"
          letterSpacing="0.05em"
        >
          Interface
        </text>
        <path
          d="M140 50 C 130 55, 120 58, 115 62"
          stroke="#38bdf8"
          strokeWidth="1"
          fill="none"
        />

        <text
          x="260"
          y="185"
          fill="#94a3b8"
          fontFamily="monospace"
          fontSize="11"
          letterSpacing="0.05em"
        >
          Networks
        </text>
        <path
          d="M260 175 C 250 170, 245 168, 235 165"
          stroke="#64748b"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}
