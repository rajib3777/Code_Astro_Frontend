import { useState, useEffect } from 'react'
import { Terminal, Play, ShieldCheck, Zap, Activity, CheckCircle2, Cpu, BarChart3, Globe } from 'lucide-react'

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

// Real-time metrics for the demo cards
const DEMO_TABS = [
  { id: 'telemetry', label: 'IoT Telemetry Stream', icon: Activity, color: '#0066ff' },
  { id: 'auth', label: 'Zero-Trust IAM', icon: ShieldCheck, color: '#00d4ff' },
  { id: 'gaming', label: 'Arcade Multi-Sync', icon: Zap, color: '#38bdf8' },
]

const INFRA_STATS = [
  { label: 'Active Nodes', value: '48', unit: 'clusters', icon: Globe, color: '#0066ff' },
  { label: 'Req / Second', value: '125K', unit: 'live', icon: BarChart3, color: '#00d4ff' },
  { label: 'Uptime SLA', value: '99.99', unit: '%', icon: Cpu, color: '#38bdf8' },
]

export default function DemoSection() {
  const [activeTab, setActiveTab] = useState<'telemetry' | 'auth' | 'gaming'>('telemetry')
  const [isRunning, setIsRunning] = useState(true)
  const [logs, setLogs] = useState<string[]>([
    'Initializing Code Astro High-Velocity Telemetry Mesh...',
    'Establishing encrypted WebSocket tunnel on wss://edge.codeastro.io:443',
    'Allocating distributed memory buffers: 1024MB ring buffer verified',
    'Cluster nodes synchronized: [Tokyo-01, Frankfurt-03, US-East-09]',
    'Heartbeat latency: 4.8ms | Zero packet drop detected',
  ])
  const [latency, setLatency] = useState(3.99)
  const [throughput, setThroughput] = useState(125360)

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setLatency(Number((3.2 + Math.random() * 2.5).toFixed(2)))
      setThroughput(Math.floor(122000 + Math.random() * 9000))
    }, 1800)
    return () => clearInterval(interval)
  }, [isRunning])

  const handleSimulate = () => {
    const id = Math.floor(1000 + Math.random() * 9000)
    const messages: Record<string, string> = {
      telemetry: `[${new Date().toLocaleTimeString()}] INGEST #TK-${id}: 64KB payload parsed in 0.42ms via SIMD parser`,
      auth: `[${new Date().toLocaleTimeString()}] AUTH_VERIFIED: FIDO2 Passkey handshake confirmed via ECDSA P-256`,
      gaming: `[${new Date().toLocaleTimeString()}] GAME_SWITCH: 1,024 player state updates replicated in 2.1ms`,
    }
    setLogs(prev => [messages[activeTab], ...prev.slice(0, 5)])
  }

  return (
    <section
      id="demo"
      style={{
        padding: 'clamp(5rem, 9vw, 8rem) 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #000000 0%, #030717 50%, #000000 100%)',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '30%', right: '5%', width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(0, 102, 255, 0.12) 0%, transparent 65%)',
        filter: 'blur(90px)', pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)', position: 'relative', zIndex: 10 }}>

        {/* ── Section Header ── */}
        <div style={SECTION_HEADER}>
          <div style={EYEBROW_PILL}>
            <Terminal size={13} color="#22d3ee" />
            <span style={EYEBROW_TEXT}>Interactive Sandbox Demo</span>
          </div>
          <h2 style={SECTION_TITLE}>
            Test Our Technology{' '}
            <span style={GRAD_SPAN}>In Real Time</span>
          </h2>
          <p style={SECTION_SUBTITLE}>
            Simulate real-world streaming throughput, cryptographic zero-trust validation,
            and arcade-speed frame synchronization.
          </p>
        </div>

        {/* ── Infrastructure Stats Strip ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: 16,
          marginBottom: 32,
          maxWidth: 860,
          margin: '0 auto 32px',
        }}>
          {INFRA_STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} style={{
                padding: '20px 24px',
                borderRadius: 16,
                background: 'rgba(5, 10, 24, 0.8)',
                border: '1px solid rgba(0, 102, 255, 0.2)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: `linear-gradient(135deg, ${stat.color}22, ${stat.color}11)`,
                  border: `1px solid ${stat.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={20} color={stat.color} />
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: stat.color, lineHeight: 1 }}>
                    {i === 1 ? throughput.toLocaleString() : stat.value}
                    <span style={{ fontSize: '0.8rem', marginLeft: 4, color: '#64748b', fontWeight: 600 }}>{stat.unit}</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{stat.label}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Terminal Sandbox Card ── */}
        <div style={{
          maxWidth: 1040, margin: '0 auto',
          borderRadius: 24,
          background: 'rgba(5, 8, 20, 0.95)',
          border: '1px solid rgba(0, 102, 255, 0.3)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.9), 0 0 50px rgba(0, 102, 255, 0.15)',
          overflow: 'hidden',
        }}>
          {/* Responsive CSS for Demo Section */}
          <style>{`
            .ca-demo-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              padding: clamp(14px, 3.5vw, 24px);
            }
            .ca-demo-tabs-wrap {
              display: flex;
              gap: 6px;
              flex-wrap: wrap;
            }
            @media (max-width: 820px) {
              .ca-demo-grid {
                grid-template-columns: 1fr !important;
                gap: 16px !important;
              }
              .ca-demo-tabs-wrap {
                width: 100% !important;
              }
              .ca-demo-tabs-wrap button {
                flex: 1 1 auto !important;
                justify-content: center !important;
              }
            }
          `}</style>

          {/* Window Bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px clamp(12px, 3vw, 20px)', borderBottom: '1px solid rgba(0, 102, 255, 0.15)',
            background: 'rgba(8, 14, 32, 0.8)', flexWrap: 'wrap', gap: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
              <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600, marginLeft: 4 }}>
                codeastro-v5.8-runtime // edge-mesh
              </span>
            </div>

            <div className="ca-demo-tabs-wrap">
              {DEMO_TABS.map(tab => {
                const active = activeTab === tab.id
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '7px 12px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700,
                      background: active ? 'rgba(0, 102, 255, 0.25)' : 'rgba(255,255,255,0.03)',
                      border: active ? '1px solid rgba(0, 212, 255, 0.5)' : '1px solid transparent',
                      color: active ? '#ffffff' : '#94a3b8', cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Icon size={13} color={active ? '#22d3ee' : '#94a3b8'} />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Console Grid */}
          <div className="ca-demo-grid">
            {/* Left: Metrics + Action */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{
                padding: 'clamp(14px, 3vw, 18px)', borderRadius: 16,
                background: 'rgba(10, 16, 38, 0.6)', border: '1px solid rgba(0, 102, 255, 0.2)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: '#38bdf8' }}>Live Metrics</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                    ONLINE
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))', gap: 10 }}>
                  <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.06)', minWidth: 0 }}>
                    <div style={{ fontSize: '0.66rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4, letterSpacing: '0.04em' }}>CORE LATENCY</div>
                    <div style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)', fontWeight: 800, color: '#38bdf8', lineHeight: 1.1 }}>
                      {latency}<span style={{ fontSize: '0.78rem', marginLeft: 3 }}>ms</span>
                    </div>
                  </div>
                  <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.06)', minWidth: 0 }}>
                    <div style={{ fontSize: '0.66rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4, letterSpacing: '0.04em' }}>EVENTS / SEC</div>
                    <div style={{ fontSize: 'clamp(1.15rem, 3.2vw, 1.45rem)', fontWeight: 800, color: '#a78bfa', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                      {throughput.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSimulate}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '13px 20px', borderRadius: 14,
                  background: 'linear-gradient(135deg, #0066ff 0%, #00d4ff 100%)',
                  color: '#ffffff', fontWeight: 800, fontSize: '0.88rem',
                  boxShadow: '0 0 30px rgba(0, 102, 255, 0.45)', cursor: 'pointer', border: 'none',
                  width: '100%',
                }}
              >
                <Play size={16} fill="#ffffff" /> Dispatch Test Packet Now
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: '0.74rem' }}>
                <CheckCircle2 size={13} color="#10b981" className="flex-shrink-0" />
                <span>Zero infrastructure lock-in · SOC2 Type II Certified</span>
              </div>
            </div>

            {/* Right: Live Terminal */}
            <div style={{
              borderRadius: 16, background: '#01030a',
              border: '1px solid rgba(0, 102, 255, 0.25)',
              padding: 'clamp(12px, 3vw, 18px)', fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(0.72rem, 2vw, 0.8rem)', display: 'flex', flexDirection: 'column',
              justifyContent: 'space-between', minHeight: 220, overflowX: 'auto',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 8, marginBottom: 4, wordBreak: 'break-all' }}>
                  $ codeastro-telemetry-cli --stream --verbose
                </div>
                {logs.map((log, i) => (
                  <div key={i} style={{ color: i === 0 ? '#ffffff' : '#38bdf8', opacity: 1 - i * 0.14, lineHeight: 1.5, wordBreak: 'break-word' }}>
                    <span style={{ color: '#00d4ff' }}>&gt;</span> {log}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22d3ee', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ color: '#64748b', fontSize: '0.72rem' }}>Listening on distributed gRPC channel...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
