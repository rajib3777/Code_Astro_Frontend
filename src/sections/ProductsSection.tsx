import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Layers, Shield, Terminal, CheckCircle2, ExternalLink, Activity, Cpu, Globe } from 'lucide-react'

const SECTION_HEADER: React.CSSProperties = {
  textAlign: 'center',
  maxWidth: 680,
  margin: '0 auto 56px',
}

const EYEBROW_PILL: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '6px 16px',
  borderRadius: 9999,
  marginBottom: 20,
  background: 'rgba(0, 102, 255, 0.12)',
  border: '1px solid rgba(0, 212, 255, 0.3)',
  boxShadow: '0 0 20px rgba(0, 102, 255, 0.2)',
}

const EYEBROW_TEXT: React.CSSProperties = {
  fontSize: '0.74rem',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: '#e0f2fe',
}

const SECTION_TITLE: React.CSSProperties = {
  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: '-0.03em',
  color: '#ffffff',
  margin: '0 0 16px',
}

const GRAD_SPAN: React.CSSProperties = {
  background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const SECTION_SUBTITLE: React.CSSProperties = {
  color: '#94a3b8',
  fontSize: '1rem',
  lineHeight: 1.7,
  margin: '0 auto',
  maxWidth: 560,
}

// Product visual mockup images (SVG data URIs for real visual)
const PRODUCT_VISUALS = [
  // Forge Analytics — dashboard screenshot mockup
  `data:image/svg+xml,${encodeURIComponent(`<svg width="400" height="220" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="220" rx="12" fill="#020818"/>
    <rect x="16" y="16" width="368" height="32" rx="8" fill="#0a1228"/>
    <circle cx="36" cy="32" r="6" fill="#ef4444"/>
    <circle cx="54" cy="32" r="6" fill="#eab308"/>
    <circle cx="72" cy="32" r="6" fill="#10b981"/>
    <text x="100" y="37" fill="#334155" font-size="11" font-family="monospace">forge-analytics v2.8 // live</text>
    <rect x="16" y="60" width="112" height="60" rx="8" fill="#0a1228" stroke="#0066ff22"/>
    <text x="28" y="82" fill="#38bdf8" font-size="9" font-family="monospace">QUERIES/SEC</text>
    <text x="28" y="104" fill="#0066ff" font-size="22" font-weight="800" font-family="sans-serif">1.2B</text>
    <rect x="140" y="60" width="112" height="60" rx="8" fill="#0a1228" stroke="#00d4ff22"/>
    <text x="152" y="82" fill="#38bdf8" font-size="9" font-family="monospace">LATENCY</text>
    <text x="152" y="104" fill="#00d4ff" font-size="22" font-weight="800" font-family="sans-serif">8ms</text>
    <rect x="264" y="60" width="120" height="60" rx="8" fill="#0a1228" stroke="#10b98122"/>
    <text x="276" y="82" fill="#38bdf8" font-size="9" font-family="monospace">UPTIME</text>
    <text x="276" y="104" fill="#10b981" font-size="22" font-weight="800" font-family="sans-serif">99.99%</text>
    <rect x="16" y="132" width="368" height="72" rx="8" fill="#0a1228" stroke="#0066ff15"/>
    <text x="28" y="152" fill="#334155" font-size="9" font-family="monospace">REAL-TIME STREAM</text>
    <polyline points="28,190 70,170 112,180 154,155 196,165 238,148 280,158 322,140 364,150" stroke="#0066ff" stroke-width="2" fill="none"/>
    <polyline points="28,195 70,185 112,190 154,175 196,180 238,170 280,175 322,160 364,168" stroke="#00d4ff" stroke-width="1.5" fill="none" opacity="0.5"/>
  </svg>`)}`,

  // VaultAuth — security dashboard
  `data:image/svg+xml,${encodeURIComponent(`<svg width="400" height="220" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="220" rx="12" fill="#020818"/>
    <rect x="16" y="16" width="368" height="32" rx="8" fill="#0a1228"/>
    <circle cx="36" cy="32" r="6" fill="#ef4444"/>
    <circle cx="54" cy="32" r="6" fill="#eab308"/>
    <circle cx="72" cy="32" r="6" fill="#10b981"/>
    <text x="100" y="37" fill="#334155" font-size="11" font-family="monospace">vaultauth v3.2 // zero-trust-iam</text>
    <rect x="16" y="60" width="180" height="144" rx="10" fill="#0a1228" stroke="#00d4ff22"/>
    <text x="28" y="82" fill="#00d4ff" font-size="10" font-family="monospace" font-weight="800">IDENTITY GRAPH</text>
    <circle cx="108" cy="130" r="28" fill="none" stroke="#0066ff" stroke-width="2" stroke-dasharray="4 2"/>
    <circle cx="108" cy="130" r="18" fill="#0066ff22"/>
    <text x="96" y="134" fill="#00d4ff" font-size="14" font-weight="800" font-family="sans-serif">✓</text>
    <text x="84" y="174" fill="#64748b" font-size="9" font-family="monospace">FIDO2 VERIFIED</text>
    <rect x="208" y="60" width="176" height="64" rx="8" fill="#0a1228" stroke="#10b98122"/>
    <text x="220" y="80" fill="#38bdf8" font-size="9" font-family="monospace">SOC-2 AUDIT</text>
    <text x="220" y="104" fill="#10b981" font-size="26" font-weight="800" font-family="sans-serif">100%</text>
    <rect x="208" y="136" width="176" height="64" rx="8" fill="#0a1228" stroke="#0066ff22"/>
    <text x="220" y="156" fill="#38bdf8" font-size="9" font-family="monospace">ACTIVE SESSIONS</text>
    <text x="220" y="180" fill="#0066ff" font-size="26" font-weight="800" font-family="sans-serif">84,291</text>
  </svg>`)}`,

  // PulseFlow — IoT telemetry
  `data:image/svg+xml,${encodeURIComponent(`<svg width="400" height="220" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="220" rx="12" fill="#020818"/>
    <rect x="16" y="16" width="368" height="32" rx="8" fill="#0a1228"/>
    <circle cx="36" cy="32" r="6" fill="#ef4444"/>
    <circle cx="54" cy="32" r="6" fill="#eab308"/>
    <circle cx="72" cy="32" r="6" fill="#10b981"/>
    <text x="100" y="37" fill="#334155" font-size="11" font-family="monospace">pulseflow v1.9 // iot-mesh</text>
    <rect x="16" y="60" width="368" height="44" rx="8" fill="#0a1228" stroke="#38bdf822"/>
    <text x="28" y="80" fill="#38bdf8" font-size="9" font-family="monospace">SENSOR TELEMETRY — 50,000+ ACTIVE NODES</text>
    <polyline points="16,196 50,185 84,192 118,172 152,180 186,162 220,168 254,150 288,158 322,140 356,148 384,136" stroke="#38bdf8" stroke-width="2" fill="none"/>
    <circle cx="254" cy="150" r="4" fill="#38bdf8"/>
    <line x1="254" y1="150" x2="254" y2="116" stroke="#38bdf8" stroke-width="1" stroke-dasharray="3 2"/>
    <rect x="228" y="96" width="80" height="24" rx="6" fill="#0a1228" stroke="#38bdf822"/>
    <text x="238" y="112" fill="#38bdf8" font-size="9" font-family="monospace">0.8ms spike</text>
    <rect x="16" y="116" width="84" height="48" rx="8" fill="#0a1228" stroke="#0066ff22"/>
    <text x="28" y="136" fill="#64748b" font-size="8" font-family="monospace">NODES LIVE</text>
    <text x="28" y="154" fill="#0066ff" font-size="18" font-weight="800" font-family="sans-serif">50K+</text>
    <rect x="116" y="116" width="84" height="48" rx="8" fill="#0a1228" stroke="#00d4ff22"/>
    <text x="128" y="136" fill="#64748b" font-size="8" font-family="monospace">SAMPLING</text>
    <text x="128" y="154" fill="#00d4ff" font-size="18" font-weight="800" font-family="sans-serif">1ms</text>
  </svg>`)}`,
]

const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: 'Forge Analytics',
    slug: 'forge-analytics',
    tagline: 'Real-Time Edge Intelligence Engine',
    short_description: 'Sub-second query engine across petabytes of streaming IoT and application telemetry with autonomous anomaly detection and instant root-cause tracing.',
    category: 'Telemetry SaaS',
    status: 'v2.8 Live',
    color: '#0066ff',
    icon: Layers,
    features: ['Sub-10ms query latency across billion-row sets', 'Automated ML anomaly detection', 'Self-serve GraphQL & REST streaming APIs'],
    statVal: '1.2B',
    statLabel: 'Events Processed Daily',
  },
  {
    id: 2,
    name: 'VaultAuth Zero-Trust',
    slug: 'vault-auth',
    tagline: 'Cryptographic Identity & Access Management',
    short_description: 'SAML 2.0 + OIDC IAM platform featuring hardware biometric WebAuthn FIDO2, automated SCIM directory syncing, and instant SOC-2 compliance enforcement.',
    category: 'Enterprise Security',
    status: 'v3.2 Live',
    color: '#00d4ff',
    icon: Shield,
    features: ['Hardware FIDO2 & WebAuthn biometrics', 'Automated SCIM directory provisioning', 'Zero-knowledge end-to-end payload cryptography'],
    statVal: '100%',
    statLabel: 'SOC-2 Audit Pass Rate',
  },
  {
    id: 3,
    name: 'PulseFlow Engine',
    slug: 'pulseflow-engine',
    tagline: 'Low-Latency Industrial IoT Telemetry Core',
    short_description: 'Ultra-compact, low-power embedded software daemon engineered for mission-critical industrial microcontrollers, SCADA networks, and arcade telemetry.',
    category: 'Embedded Core',
    status: 'v1.9 Live',
    color: '#38bdf8',
    icon: Terminal,
    features: ['Native CAN-bus, Modbus & MQTT drivers', 'Sub-millisecond hardware sensor sampling', 'Cryptographic Over-the-Air firmware updates'],
    statVal: '50,000+',
    statLabel: 'Active Hardware Nodes',
  },
]

export default function ProductsSection({ products }: { products?: any[] }) {
  const [activeDrawer, setActiveDrawer] = useState<number | null>(null)
  const items = products && products.length > 0 ? products : FALLBACK_PRODUCTS

  return (
    <section
      id="products"
      style={{
        padding: 'clamp(5rem, 9vw, 8rem) 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #000000 0%, #030818 50%, #000000 100%)',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '25%', left: '10%', width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(0, 102, 255, 0.1) 0%, transparent 65%)',
        filter: 'blur(90px)', pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)', position: 'relative', zIndex: 10 }}>

        {/* ── Section Header ── */}
        <div style={SECTION_HEADER}>
          <div style={EYEBROW_PILL}>
            <Layers size={13} color="#22d3ee" />
            <span style={EYEBROW_TEXT}>Proprietary Technologies</span>
          </div>
          <h2 style={SECTION_TITLE}>
            Production Products{' '}
            <span style={GRAD_SPAN}>Engineered by Code Astro</span>
          </h2>
          <p style={SECTION_SUBTITLE}>
            Battle-tested SaaS platforms, cryptographic systems, and embedded IoT frameworks
            built for massive global loads.
          </p>
        </div>

        {/* ── Product Cards Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 24,
        }}>
          {items.map((prod: any, idx: number) => {
            const fb = FALLBACK_PRODUCTS[idx % FALLBACK_PRODUCTS.length]
            const name = prod.name || fb.name
            const tagline = prod.tagline || fb.tagline
            const desc = prod.short_description || prod.description || fb.short_description
            const status = prod.status || fb.status
            const category = prod.category || fb.category
            const slug = prod.slug || fb.slug
            const statVal = prod.statVal || fb.statVal
            const statLabel = prod.statLabel || fb.statLabel
            const features = prod.features?.length ? prod.features : fb.features
            const Icon = fb.icon
            const color = fb.color
            const isDrawerOpen = activeDrawer === idx
            const visual = PRODUCT_VISUALS[idx % PRODUCT_VISUALS.length]

            return (
              <div
                key={prod.id || idx}
                style={{
                  borderRadius: 24,
                  background: 'rgba(6, 12, 28, 0.9)',
                  border: isDrawerOpen ? '1px solid rgba(0, 212, 255, 0.5)' : '1px solid rgba(0, 102, 255, 0.22)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: isDrawerOpen
                    ? '0 24px 60px rgba(0,0,0,0.9), 0 0 40px rgba(0, 102, 255, 0.25)'
                    : '0 12px 35px rgba(0,0,0,0.6)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={e => {
                  if (!isDrawerOpen) {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 212, 255, 0.38)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isDrawerOpen) {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 102, 255, 0.22)'
                  }
                }}
              >
                {/* Glowing top accent */}
                <div style={{ height: 3, background: `linear-gradient(90deg, ${color}, #00d4ff, transparent)` }} />

                {/* Product Screenshot / Visual */}
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#020818',
                  borderBottom: '1px solid rgba(0, 102, 255, 0.15)',
                }}>
                  <img
                    src={visual}
                    alt={`${name} dashboard`}
                    style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
                  />
                  {/* Status badge overlay */}
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    display: 'flex', alignItems: 'center', gap: 5,
                    fontSize: '0.7rem', fontWeight: 800,
                    padding: '3px 10px', borderRadius: 9999,
                    background: 'rgba(16, 185, 129, 0.2)',
                    color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)',
                    backdropFilter: 'blur(10px)',
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                    {status}
                  </div>
                </div>

                <div style={{ padding: '24px 24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  {/* Icon + Category */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                      background: `linear-gradient(135deg, ${color}33, ${color}15)`,
                      border: `1px solid ${color}55`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={18} color={color} />
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color }}>
                      {category}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 6 }}>
                    {name}
                  </h3>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#60a5fa', marginBottom: 12 }}>
                    {tagline}
                  </div>
                  <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.65, marginBottom: 18, flexGrow: 1 }}>
                    {desc}
                  </p>

                  {/* Telemetry Stat */}
                  <div style={{
                    padding: '12px 16px', borderRadius: 12,
                    background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(0, 102, 255, 0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: 14,
                  }}>
                    <div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8' }}>{statVal}</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>{statLabel}</div>
                    </div>
                    <Activity size={20} color="#22d3ee" style={{ opacity: 0.6 }} />
                  </div>

                  {/* Drawer Toggle */}
                  <button
                    onClick={() => setActiveDrawer(isDrawerOpen ? null : idx)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      padding: '9px 16px', borderRadius: 10, marginBottom: 12,
                      background: isDrawerOpen ? 'rgba(0, 102, 255, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                      border: isDrawerOpen ? '1px solid rgba(0, 212, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: isDrawerOpen ? '#ffffff' : '#94a3b8', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
                    }}
                  >
                    {isDrawerOpen ? 'Hide Architecture Specs' : 'View Architecture Specs'}
                  </button>

                  {/* Collapsible Drawer */}
                  {isDrawerOpen && (
                    <div style={{
                      padding: '14px 16px', borderRadius: 12, marginBottom: 14,
                      background: 'rgba(2, 6, 16, 0.9)', border: '1px solid rgba(0, 102, 255, 0.2)',
                    }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#00d4ff', textTransform: 'uppercase', marginBottom: 10 }}>
                        Key Architectural Features
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {features.map((feat: string, fIdx: number) => (
                          <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: '#cbd5e1' }}>
                            <CheckCircle2 size={13} color="#22d3ee" style={{ flexShrink: 0 }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link
                    to={`/products/${slug}`}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      padding: '10px 18px', borderRadius: 9999, fontSize: '0.84rem', fontWeight: 700,
                      background: 'linear-gradient(135deg, #0066ff, #1a7aff)',
                      color: '#ffffff', textDecoration: 'none',
                      boxShadow: '0 0 20px rgba(0, 102, 255, 0.3)',
                    }}
                  >
                    Explore {name} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
