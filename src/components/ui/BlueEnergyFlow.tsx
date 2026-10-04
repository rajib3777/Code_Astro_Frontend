export default function BlueEnergyFlow({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="relative w-full overflow-hidden pointer-events-none"
      style={{
        height: 80,
        margin: '-40px 0',
        zIndex: 20,
        transform: flip ? 'scaleX(-1)' : 'none',
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="flow-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0066ff" stopOpacity="0" />
            <stop offset="20%" stopColor="#0066ff" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#0066ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0066ff" stopOpacity="0" />
          </linearGradient>

          <filter id="beam-filter" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient background glow path */}
        <path
          d="M 0 40 Q 360 10, 720 40 T 1440 40"
          stroke="rgba(0, 102, 255, 0.2)"
          strokeWidth="6"
          fill="none"
        />

        {/* Crisp energetic beam */}
        <path
          d="M 0 40 Q 360 10, 720 40 T 1440 40"
          stroke="url(#flow-glow)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="120 400"
          filter="url(#beam-filter)"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-520"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>

        {/* Orbiting energy spark */}
        <circle r="4" fill="#ffffff" filter="url(#beam-filter)">
          <animateMotion
            path="M 0 40 Q 360 10, 720 40 T 1440 40"
            dur="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  )
}
