import { Link } from 'react-router-dom'
import { ArrowRight, Globe, Zap, Shield } from 'lucide-react'

function FloatingOrb({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        filter: 'blur(60px)',
        ...style,
      }}
    />
  )
}

export default function ReadyToStartSection() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(5rem, 9vw, 8rem) 0',
        background: '#000000',
      }}
    >
      {/* Ambient orbs */}
      <FloatingOrb style={{ top: '20%', left: '5%', width: 400, height: 300, background: 'radial-gradient(ellipse, rgba(0,80,220,0.14) 0%, transparent 70%)' }} />
      <FloatingOrb style={{ bottom: '10%', right: '5%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(0,150,255,0.1) 0%, transparent 70%)' }} />

      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,80,200,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,80,200,0.035) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* SVG circuit lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 300"
        preserveAspectRatio="none"
        style={{ zIndex: 1, opacity: 0.4 }}
      >
        <defs>
          <filter id="cta-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Horizontal flowing lines */}
        <path
          d="M 0 90 L 200 90 L 250 135 L 750 135 L 800 180 L 1000 180"
          fill="none"
          stroke="rgba(0,102,255,0.25)"
          strokeWidth="1"
          strokeDasharray="8 14"
          filter="url(#cta-glow)"
        >
          <animate attributeName="stroke-dashoffset" values="0;-88" dur="4s" repeatCount="indefinite" />
        </path>
        <path
          d="M 0 210 L 150 210 L 200 165 L 800 165 L 850 120 L 1000 120"
          fill="none"
          stroke="rgba(0,170,255,0.18)"
          strokeWidth="1"
          strokeDasharray="6 16"
          filter="url(#cta-glow)"
        >
          <animate attributeName="stroke-dashoffset" values="0;-88" dur="5s" repeatCount="indefinite" begin="1s" />
        </path>
      </svg>

      <div className="wrap relative text-center" style={{ zIndex: 10 }}>
        {/* Label */}
        <div className="section-label" style={{ display: 'inline-flex', marginBottom: 24 }}>
          <Zap size={11} style={{ color: '#00d4ff' }} />
          Get Started Today
        </div>

        {/* Headline */}
        <h2
          className="t-display text-white"
          style={{ marginBottom: 20, maxWidth: 680, margin: '0 auto 20px' }}
        >
          Ready to Build{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #0066ff 0%, #00aaff 50%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Something Great?
          </span>
        </h2>

        <p
          className="t-body"
          style={{
            color: '#94a3b8',
            maxWidth: 520,
            margin: '0 auto 40px',
          }}
        >
          Tell us about your project and we'll respond within 24 hours. No long-form applications — just a quick conversation to see if we're a great fit.
        </p>

        {/* Action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 56 }}>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2.25rem', fontSize: '1rem' }}>
            Start a Project
            <ArrowRight size={17} />
          </Link>
          <Link to="/services" className="btn btn-ghost" style={{ padding: '1rem 2.25rem', fontSize: '1rem' }}>
            <Globe size={16} style={{ color: '#60a5fa' }} />
            Explore Services
          </Link>
        </div>

        {/* Trust badges row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          {[
            { icon: Shield, label: 'NDA on Day 1' },
            { icon: Zap, label: '< 24hr Response' },
            { icon: Globe, label: 'Remote-First Team' },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Icon size={15} style={{ color: '#0066ff', opacity: 0.7 }} />
                <span style={{ fontSize: '0.82rem', color: '#3d5280', fontWeight: 500 }}>{item.label}</span>
              </div>
            )
          })}
        </div>

        {/* Large glowing divider orb beneath */}
        <div
          style={{
            marginTop: 64,
            width: 240,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(0,102,255,0.5), transparent)',
            margin: '64px auto 0',
            borderRadius: 1,
          }}
        />
      </div>
    </section>
  )
}
