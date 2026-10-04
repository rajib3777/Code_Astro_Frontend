import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Code2, Cpu, Gamepad2, Globe, Shield, Terminal, Activity } from 'lucide-react'

/* ══════════════════════════════════════════════════════
   MASSIVE 3D INTERACTIVE SVG EARTH GLOBE
   Ready for the World · High-Fidelity Atmosphere & Orbit
══════════════════════════════════════════════════════ */
function BigWorldGlobe({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <div
      className="relative flex items-center justify-center mx-auto"
      style={{
        width: '100%',
        maxWidth: 760,
        aspectRatio: '1 / 1',
        transform: `perspective(1400px) rotateY(${mouseX * 6}deg) rotateX(${-mouseY * 5}deg)`,
        transition: 'transform 0.15s ease-out',
        willChange: 'transform',
      }}
    >
      {/* High-Performance Ambient Glow Aura (Replaces heavy SVG dual drop-shadows that crash mobile GPU) */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '88%',
          height: '88%',
          top: '6%',
          left: '6%',
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.38) 0%, rgba(0, 212, 255, 0.18) 45%, transparent 72%)',
          boxShadow: '0 0 60px rgba(0, 102, 255, 0.35)',
          zIndex: 5,
        }}
      />

      {/* Outer atmosphere glow rings */}
      {[1.35, 1.22, 1.1].map((scale, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${scale * 100}%`,
            height: `${scale * 100}%`,
            border: `1px solid rgba(0, ${120 + i * 30}, 255, ${0.08 - i * 0.02})`,
            boxShadow: i === 0 ? '0 0 50px rgba(0, 102, 255, 0.2)' : 'none',
            animation: `pulse-ring ${5 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}

      {/* Main SVG Globe */}
      <svg
        viewBox="0 0 500 500"
        className="relative z-10 w-full h-full"
        style={{
          filter: 'drop-shadow(0 0 25px rgba(0, 102, 255, 0.45))',
          willChange: 'transform',
        }}
      >
        <defs>
          {/* Deep celestial ocean radial */}
          <radialGradient id="world-base" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#0c1d38" />
            <stop offset="35%" stopColor="#061226" />
            <stop offset="70%" stopColor="#030814" />
            <stop offset="100%" stopColor="#000206" />
          </radialGradient>

          {/* Electric blue illumination from upper-left */}
          <radialGradient id="world-sun-glow" cx="28%" cy="22%" r="65%">
            <stop offset="0%" stopColor="#00aaff" stopOpacity="0.4" />
            <stop offset="35%" stopColor="#0066ff" stopOpacity="0.18" />
            <stop offset="75%" stopColor="#0033aa" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          {/* Shadow crescent on bottom-right */}
          <radialGradient id="world-shadow" cx="80%" cy="75%" r="60%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#000000" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          {/* Horizon rim glow */}
          <radialGradient id="world-rim" cx="50%" cy="50%" r="50%">
            <stop offset="72%" stopColor="transparent" stopOpacity="0" />
            <stop offset="88%" stopColor="#0066ff" stopOpacity="0.25" />
            <stop offset="96%" stopColor="#00d4ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
          </radialGradient>

          {/* Latitude & Longitude neon stroke gradient */}
          <linearGradient id="neon-coord-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
            <stop offset="25%" stopColor="#0066ff" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.5" />
            <stop offset="75%" stopColor="#0066ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </linearGradient>

          {/* Clip path circle */}
          <clipPath id="world-sphere-clip">
            <circle cx="250" cy="250" r="230" />
          </clipPath>

          {/* Landmass hardware-accelerated neon glow */}
          <filter id="land-glow-filter" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#00d4ff" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* ── Base Sphere ── */}
        <circle cx="250" cy="250" r="230" fill="url(#world-base)" />

        {/* ── Rotating World Landmasses ── */}
        <g clipPath="url(#world-sphere-clip)">
          {/* Internal Ocean Depth */}
          <circle cx="250" cy="250" r="230" fill="url(#world-sun-glow)" />

          {/* Spinning Landmass Group (18s linear rotation) */}
          <g style={{ transformOrigin: '250px 250px', animation: 'earth-spin 22s linear infinite' }}>
            {/* Asia & Europe complex vector continent */}
            <path
              d="M 230 110 C 255 102 295 98 335 105 C 375 112 400 128 420 148
                 C 440 168 445 192 438 212 C 430 232 410 245 390 252
                 C 370 258 345 252 325 245 C 305 238 292 225 280 218
                 C 268 212 250 210 238 212 C 225 215 212 222 204 235
                 C 196 248 192 262 188 276 C 184 290 180 305 174 315
                 C 168 325 158 330 148 328 C 138 325 132 315 128 302
                 C 124 288 126 272 132 258 C 138 245 152 235 165 225
                 C 178 215 190 206 200 192 C 210 178 214 160 218 142
                 C 222 125 228 114 230 110 Z"
              fill="#0b2447"
              filter="url(#land-glow-filter)"
              stroke="#0088ff"
              strokeWidth="0.8"
              strokeOpacity="0.45"
            />
            {/* Africa */}
            <path
              d="M 198 270 C 204 264 214 260 222 264 C 230 268 234 278 232 290
                 C 230 304 224 316 216 330 C 208 342 198 352 188 356
                 C 178 360 168 356 160 348 C 152 338 150 324 152 312
                 C 155 300 162 288 172 280 C 182 272 190 274 198 270 Z"
              fill="#0b2447"
              filter="url(#land-glow-filter)"
              stroke="#0088ff"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
            {/* Americas North */}
            <path
              d="M 70 155 C 76 140 90 130 102 128 C 115 125 128 132 135 145
                 C 142 158 138 174 132 188 C 125 200 115 210 105 214
                 C 95 218 84 214 76 205 C 68 196 64 182 66 168 C 68 162 68 159 70 155 Z"
              fill="#0b2447"
              filter="url(#land-glow-filter)"
              stroke="#0088ff"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
            {/* Americas South */}
            <path
              d="M 86 226 C 94 220 104 217 112 222 C 120 227 122 238 120 252
                 C 118 266 110 280 100 290 C 90 300 78 305 70 300
                 C 60 295 56 282 58 270 C 60 256 70 240 86 226 Z"
              fill="#0b2447"
              filter="url(#land-glow-filter)"
              stroke="#0088ff"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
            {/* Australia */}
            <path
              d="M 370 328 C 380 318 396 315 408 322 C 420 328 426 342 422 358
                 C 418 374 406 386 394 390 C 382 394 368 388 360 378
                 C 352 368 352 352 360 340 C 364 334 366 330 370 328 Z"
              fill="#0b2447"
              filter="url(#land-glow-filter)"
              stroke="#0088ff"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />

            {/* Latitude Grid Lines */}
            {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((i) => {
              const yOffset = i * 46
              const rx = Math.sqrt(Math.max(0, 230 * 230 - yOffset * yOffset))
              return (
                <ellipse
                  key={`lat-${i}`}
                  cx="250"
                  cy={250 + yOffset}
                  rx={rx}
                  ry={Math.abs(i) >= 3 ? 10 : 18}
                  fill="none"
                  stroke="url(#neon-coord-line)"
                  strokeWidth="0.8"
                />
              )
            })}

            {/* Longitude Ellipse Arcs */}
            {[0, 35, 70, 105, 140].map((deg) => (
              <ellipse
                key={`long-${deg}`}
                cx="250"
                cy="250"
                rx={Math.max(1, Math.abs(Math.cos((deg * Math.PI) / 180) * 230))}
                ry="230"
                fill="none"
                stroke="url(#neon-coord-line)"
                strokeWidth="0.8"
              />
            ))}

            {/* Glowing Tech Hub Nodes */}
            {[
              { x: 310, y: 175, name: 'Tokyo Node' },
              { x: 260, y: 155, name: 'London Node' },
              { x: 110, y: 180, name: 'Silicon Valley' },
              { x: 385, y: 350, name: 'Sydney Core' },
              { x: 210, y: 300, name: 'Nairobi Telemetry' },
            ].map((node, i) => (
              <g key={i}>
                <circle cx={node.x} cy={node.y} r="5" fill="#00d4ff" filter="url(#land-glow-filter)">
                  <animate attributeName="r" values="3;7;3" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                </circle>
                <circle cx={node.x} cy={node.y} r="2.5" fill="#ffffff" />
              </g>
            ))}
          </g>

          {/* Shadow Overlay */}
          <circle cx="250" cy="250" r="230" fill="url(#world-shadow)" pointerEvents="none" />

          {/* Specular Glint Top-Left */}
          <ellipse
            cx="160"
            cy="130"
            rx="90"
            ry="65"
            fill="radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)"
            pointerEvents="none"
          />
        </g>

        {/* ── Rim Corona Highlight ── */}
        <circle cx="250" cy="250" r="230" fill="url(#world-rim)" pointerEvents="none" />

        {/* ── Outer Orbital Track 1 (Tilted 3D Orbit) ── */}
        <ellipse
          cx="250"
          cy="250"
          rx="275"
          ry="95"
          fill="none"
          stroke="rgba(0, 212, 255, 0.4)"
          strokeWidth="1.2"
          strokeDasharray="6 10"
          transform="rotate(-25 250 250)"
        />
        {/* Orbital Satellite 1 */}
        <g transform="rotate(-25 250 250)">
          <circle r="4" fill="#00d4ff" filter="url(#land-glow-filter)">
            <animateMotion
              path="M 525 250 A 275 95 0 1 0 -25 250 A 275 95 0 1 0 525 250"
              dur="12s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* ── Outer Orbital Track 2 (Counter-Tilted) ── */}
        <ellipse
          cx="250"
          cy="250"
          rx="290"
          ry="110"
          fill="none"
          stroke="rgba(0, 102, 255, 0.28)"
          strokeWidth="1"
          strokeDasharray="8 14"
          transform="rotate(35 250 250)"
        />
        {/* Orbital Satellite 2 */}
        <g transform="rotate(35 250 250)">
          <circle r="3.5" fill="#38bdf8" filter="url(#land-glow-filter)">
            <animateMotion
              path="M 540 250 A 290 110 0 1 0 -40 250 A 290 110 0 1 0 540 250"
              dur="16s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>

      {/* Floating Telemetry Badge 1: Top Left */}
      <div
        className="absolute hidden md:flex items-center gap-3 px-4 py-2.5 rounded-2xl"
        style={{
          top: '12%',
          left: '2%',
          background: 'rgba(5, 12, 28, 0.85)',
          border: '1px solid rgba(0, 102, 255, 0.35)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(0, 102, 255, 0.2)',
          zIndex: 25,
          animation: 'float-up-down 6s ease-in-out infinite',
        }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.04em' }}>
            GLOBAL MESH ACTIVE
          </div>
          <div style={{ fontSize: '0.64rem', color: '#38bdf8', fontWeight: 600 }}>
            99.99% Uptime across 38 Regions
          </div>
        </div>
      </div>

      {/* Floating Telemetry Badge 2: Bottom Right */}
      <div
        className="absolute hidden md:flex items-center gap-3 px-4 py-2.5 rounded-2xl"
        style={{
          bottom: '14%',
          right: '2%',
          background: 'rgba(5, 12, 28, 0.85)',
          border: '1px solid rgba(0, 212, 255, 0.35)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(0, 212, 255, 0.2)',
          zIndex: 25,
          animation: 'float-up-down 7s ease-in-out infinite',
          animationDelay: '1.5s',
        }}
      >
        <Activity size={16} className="text-cyan-400" />
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.04em' }}>
            SUB-10MS LATENCY
          </div>
          <div style={{ fontSize: '0.64rem', color: '#60a5fa', fontWeight: 600 }}>
            Real-Time Edge Telemetry
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   HERO SECTION — CENTERED DESIGN & READY FOR THE WORLD
══════════════════════════════════════════════════════ */
export default function HeroSection({ hero }: { hero?: any; stats?: any[] }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Only track mouse tilt on devices with a fine pointer (mouse), not touch screens
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return
    }

    let rAF: number | null = null
    const handleMouseMove = (e: MouseEvent) => {
      if (rAF !== null) return
      rAF = window.requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window
        setMousePos({
          x: (e.clientX / innerWidth) * 2 - 1,
          y: (e.clientY / innerHeight) * 2 - 1,
        })
        rAF = null
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rAF !== null) cancelAnimationFrame(rAF)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative overflow-hidden flex flex-col items-center justify-center text-center"
      style={{
        background: '#000000',
        paddingTop: 'clamp(110px, 14vw, 150px)',
        paddingBottom: 'clamp(50px, 8vw, 90px)',
        minHeight: '100vh',
      }}
    >
      {/* Background Neon Grid with Shiny Center Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0, 102, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 102, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '70px 70px',
        }}
      />

      {/* Massive Shiny Blue Radiant Energy Flare behind the globe (hardware accelerated) */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '35%',
          left: '50%',
          transform: `translate(-50%, -50%) translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
          width: 'clamp(450px, 65vw, 950px)',
          height: 'clamp(450px, 65vw, 950px)',
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.28) 0%, rgba(0, 212, 255, 0.14) 35%, rgba(0, 102, 255, 0.04) 55%, transparent 72%)',
          transition: 'transform 0.2s ease-out',
          willChange: 'transform',
        }}
      />

      <div className="wrap relative z-10 w-full flex flex-col items-center">
        {/* ── 1. CENTERED STATUS BADGE ── */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6"
          style={{
            background: 'rgba(0, 102, 255, 0.12)',
            border: '1px solid rgba(0, 212, 255, 0.35)',
            boxShadow: '0 0 20px rgba(0, 102, 255, 0.25)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}
        >
          <Zap size={14} className="text-cyan-400" />
          <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e0f2fe' }}>
            Ready for the World
          </span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
        </div>

        {/* ── 2. CENTERED MAIN HEADLINE ── */}
        <h1
          className="t-hero font-extrabold text-white mb-6 max-w-4xl"
          style={{
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.65s ease 0.1s',
          }}
        >
          Engineering Digital Systems <br />
          <span
            style={{
              background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 50%, #ffffff 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              textShadow: '0 0 40px rgba(0, 102, 255, 0.4)',
            }}
          >
            Ready for the World
          </span>
        </h1>

        {/* ── 3. CENTERED SUBTITLE ── */}
        <p
          className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed"
          style={{
            color: '#94a3b8',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.65s ease 0.2s',
          }}
        >
          We build mission-critical enterprise software, interactive arcade & gaming systems,
          and intelligent IoT automation architectures designed to scale globally.
        </p>

        {/* ── 4. CENTERED ACTION BUTTONS ── */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.65s ease 0.3s',
          }}
        >
          <Link
            to="/contact"
            className="btn btn-primary"
            style={{
              padding: '13px 32px',
              fontSize: '0.98rem',
              fontWeight: 700,
              boxShadow: '0 0 35px rgba(0, 102, 255, 0.6)',
            }}
          >
            Start a Project
            <ArrowRight size={17} />
          </Link>
          <a
            href="#demo"
            className="btn btn-ghost"
            style={{
              padding: '13px 28px',
              fontSize: '0.98rem',
              fontWeight: 600,
            }}
          >
            <Terminal size={17} className="text-cyan-400" />
            Explore Live Demo
          </a>
          <Link
            to="/projects"
            className="btn btn-ghost"
            style={{
              padding: '13px 28px',
              fontSize: '0.98rem',
              fontWeight: 600,
            }}
          >
            <Globe size={17} className="text-blue-400" />
            View Case Studies
          </Link>
        </div>

        {/* ── 5. BIG 3D INTERACTIVE SVG GLOBE ── */}
        <div
          className="w-full flex justify-center relative mt-2"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.95)',
            transition: 'opacity 0.85s ease 0.35s, transform 0.85s ease 0.35s',
          }}
        >
          <BigWorldGlobe mouseX={mousePos.x} mouseY={mousePos.y} />
        </div>

        {/* ── 6. QUICK METRICS ROW ── */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl mt-10 sm:mt-12 pt-6 sm:pt-8"
          style={{
            borderTop: '1px solid rgba(0, 102, 255, 0.15)',
          }}
        >
          {[
            { val: '200+', label: 'Shipped Systems', icon: Code2 },
            { val: '99.99%', label: 'Infrastructure Uptime', icon: Shield },
            { val: '50+', label: 'Global Clients', icon: Globe },
            { val: '<10ms', label: 'Processing Telemetry', icon: Cpu },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <span
                style={{
                  fontSize: 'clamp(1.25rem, 3.5vw, 2.2rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                }}
              >
                {item.val}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginTop: 4 }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
