import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/api'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Activity, CheckCircle2, Zap, ShieldCheck, Layers, FlaskConical, Microscope, Terminal } from 'lucide-react'
import BlueEnergyFlow from '@/components/ui/BlueEnergyFlow'

const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: 'Forge Analytics',
    slug: 'forge-analytics',
    tagline: 'Self-Serve Business Intelligence Platform',
    description: 'Turn millions of raw event logs into actionable real-time dashboard visualizations with sub-second queries and automated anomaly detection.',
    short_description: 'High-throughput BI engine designed for modern data engineering teams.',
    category: 'saas',
    status: 'active',
    color: '#0066ff',
    technologies: ['React', 'ClickHouse', 'PostgreSQL', 'Go'],
    features: [
      'Real-time event streaming at 1.4M events/sec',
      'Automated statistical anomaly detection alerts',
      'Self-serve SQL & interactive canvas editor',
      'Column-level granular RBAC & audit trails',
    ],
    product_url: 'https://forgeanalytics.io',
  },
  {
    id: 2,
    name: 'PulseVector AI',
    slug: 'pulsevector-ai',
    tagline: 'Autonomous Document & Semantic Intelligence',
    description: 'High-dimensional semantic search and vector retrieval platform designed for compliance documents, legal discovery, and healthcare records.',
    short_description: 'Instant semantic document retrieval with strict data sovereignty.',
    category: 'ai',
    status: 'active',
    color: '#00d4ff',
    technologies: ['Python', 'pgvector', 'PyTorch', 'LangChain'],
    features: [
      'Private local LLM inference with zero data leakage',
      'Sub-30ms high-dimensional vector HNSW queries',
      'Automated OCR & unstructured tabular parsing',
      'Enterprise SSO & cryptographic audit logging',
    ],
    product_url: '',
  },
  {
    id: 3,
    name: 'HyperScale Gateway',
    slug: 'hyperscale-gateway',
    tagline: 'Zero-Trust Multi-Cloud API Reverse Proxy',
    description: 'Lightweight Rust and Go reverse proxy with distributed edge rate-limiting, OAuth2 token introspection, and automatic TLS certification.',
    short_description: 'Enterprise API gateway capable of 500,000 requests/sec per single instance.',
    category: 'cloud',
    status: 'active',
    color: '#38bdf8',
    technologies: ['Rust', 'Docker', 'Kubernetes', 'Redis'],
    features: [
      'Ultra-low 2ms memory-safe zero-copy routing',
      'Mutual TLS, WAF & automated DDoS mitigation',
      '500K req/sec throughput per single container instance',
      'Distributed multi-cloud token introspection',
    ],
    product_url: '',
  },
]

export default function ProductsPage() {
  const { data } = useQuery({ queryKey: ['products'], queryFn: getProducts })
  const products = data?.results?.length ? data.results : FALLBACK_PRODUCTS
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      setMousePos({
        x: (e.clientX / innerWidth) * 2 - 1,
        y: (e.clientY / innerHeight) * 2 - 1,
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <Helmet>
        <title>Proprietary Products & SaaS Platforms — Code Astro</title>
        <meta name="description" content="Discover software products built and deployed by Code Astro — developer tools, SaaS platforms, and AI engines." />
      </Helmet>

      {/* ── 1. HERO SECTION (GUARANTEED TOP CLEARANCE) ── */}
      <section
        style={{
          background: '#000000',
          paddingTop: 'clamp(90px, 14vw, 190px)',
          paddingBottom: 'clamp(60px, 8vw, 100px)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {/* Cyber Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(to right, rgba(0, 102, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 102, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '70px 70px',
          }}
        />

        {/* Radiant Blue Center Glow */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: `translate(-50%, -50%) translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
            width: 'clamp(450px, 60vw, 850px)',
            height: 'clamp(450px, 60vw, 850px)',
            background: 'radial-gradient(circle, rgba(0, 102, 255, 0.22) 0%, rgba(0, 212, 255, 0.08) 40%, transparent 70%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
            transition: 'transform 0.2s ease-out',
          }}
        />

        <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)', position: 'relative', zIndex: 10 }}>
          {/* Centered Status Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '7px 20px',
              borderRadius: 9999,
              marginBottom: 24,
              background: 'rgba(0, 102, 255, 0.12)',
              border: '1px solid rgba(0, 212, 255, 0.35)',
              boxShadow: '0 0 24px rgba(0, 102, 255, 0.3)',
            }}
          >
            <Layers size={15} color="#00d4ff" />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e0f2fe' }}>
              In-House Labs & Ventures
            </span>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 10px #00d4ff' }} className="animate-pulse" />
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: '-0.035em',
              color: '#ffffff',
              margin: '0 auto 24px',
              maxWidth: 900,
            }}
          >
            Software Engineered & <br />
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
              Shipped In-House
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
              color: '#94a3b8',
              lineHeight: 1.7,
              maxWidth: 720,
              margin: '0 auto 36px',
            }}
          >
            Beyond client partnerships, our lab designs, stress-tests, and scales proprietary developer infrastructure, telemetry platforms, and enterprise AI engines.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
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
              Request Enterprise License
              <ArrowRight size={16} />
            </Link>
            <a
              href="#products-grid"
              className="btn btn-ghost"
              style={{
                padding: '13px 28px',
                fontSize: '0.98rem',
                fontWeight: 600,
              }}
            >
              <Terminal size={16} color="#38bdf8" />
              Explore All Platforms
            </a>
          </div>
        </div>
      </section>

      <BlueEnergyFlow />

      {/* ── 2. PRODUCTS GRID ── */}
      <section
        id="products-grid"
        style={{
          padding: 'clamp(5rem, 9vw, 8rem) 0',
          position: 'relative',
          background: 'linear-gradient(180deg, #000000 0%, #030818 50%, #000000 100%)',
        }}
      >
        <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
              gap: 24,
            }}
          >
            {products.map((product: any, i: number) => {
              const color = product.color || '#0066ff'
              const techs: string[] = product.technologies?.map((t: any) => (typeof t === 'string' ? t : t.name)) || []
              const features: string[] = product.features || []

              return (
                <div
                  key={product.id || i}
                  style={{
                    borderRadius: 24,
                    background: 'rgba(5, 10, 24, 0.8)',
                    border: '1px solid rgba(0, 102, 255, 0.2)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 212, 255, 0.45)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 20px 50px rgba(0,0,0,0.9), 0 0 35px rgba(0, 102, 255, 0.25)'
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 102, 255, 0.2)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)'
                  }}
                >
                  {/* Top Laser Accent */}
                  <div style={{ height: 3, background: `linear-gradient(90deg, ${color}, #00d4ff, transparent)` }} />

                  <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color }}>
                        {product.category || 'Platform'}
                      </span>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: 9999,
                          background: 'rgba(16, 185, 129, 0.12)',
                          color: '#34d399',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                        }}
                      >
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981' }} className="animate-ping" />
                        Active
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 6 }}>
                      {product.name}
                    </h3>
                    <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#60a5fa', marginBottom: 14 }}>
                      {product.tagline}
                    </p>

                    <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.65, marginBottom: 20, flexGrow: 1 }}>
                      {product.description || product.short_description}
                    </p>

                    {/* Features checklist */}
                    {features.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20, padding: '14px 16px', borderRadius: 14, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,102,255,0.15)' }}>
                        {features.slice(0, 3).map((f: any, fi: number) => (
                          <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: '#cbd5e1' }}>
                            <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0" />
                            <span>{typeof f === 'string' ? f : f.title}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Production Tech Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                      {techs.map((t, ti) => (
                        <span
                          key={ti}
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: 6,
                            background: 'rgba(0, 102, 255, 0.12)',
                            border: '1px solid rgba(0, 212, 255, 0.2)',
                            color: '#93c5fa',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <Link
                        to={`/products/${product.slug}`}
                        className="btn btn-primary"
                        style={{ flex: 1, justifyContent: 'center', padding: '11px 18px', fontSize: '0.85rem' }}
                      >
                        Explore Specs <ArrowRight size={14} />
                      </Link>
                      {product.product_url && (
                        <a
                          href={product.product_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-ghost"
                          style={{ padding: '11px 14px', fontSize: '0.85rem' }}
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <BlueEnergyFlow flip />

      {/* ── 3. DEVELOPER API TERMINAL PREVIEW ── */}
      <section
        style={{
          padding: 'clamp(5rem, 9vw, 8rem) 0',
          position: 'relative',
          background: 'linear-gradient(180deg, #000000 0%, #03081a 50%, #000000 100%)',
        }}
      >
        <div style={{ width: '100%', maxWidth: 1000, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 48px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 16px',
                borderRadius: 9999,
                marginBottom: 20,
                background: 'rgba(0, 102, 255, 0.12)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                boxShadow: '0 0 20px rgba(0, 102, 255, 0.2)',
              }}
            >
              <Terminal size={13} color="#22d3ee" />
              <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#e0f2fe' }}>
                Developer Preview
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 16px' }}>
              Built for <span style={{ background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>High-Frequency Ingestion</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, margin: '0 auto' }}>
              Sub-millisecond REST, gRPC, and WebSocket streaming hooks designed for modern data pipelines.
            </p>
          </div>

          {/* Terminal Window */}
          <div
            style={{
              borderRadius: 22,
              background: 'rgba(5, 10, 26, 0.95)',
              border: '1px solid rgba(0, 102, 255, 0.3)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 102, 255, 0.2)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '16px 20px',
                background: 'rgba(10, 18, 42, 0.9)',
                borderBottom: '1px solid rgba(0, 102, 255, 0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#64748b', marginLeft: 8 }}>
                  edge.mesh.codeastro.io:443
                </span>
              </div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 9999,
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}
              >
                ● 200 OK — 4ms
              </span>
            </div>

            <div style={{ padding: '24px 26px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ color: '#38bdf8' }}>
                $ curl -X POST https://api.codeastro.io/v1/telemetry/ingest \
              </p>
              <p style={{ color: '#38bdf8', paddingLeft: 16 }}>
                -H "Authorization: Bearer live_cluster_token_sec90" \
              </p>
              <p style={{ color: '#38bdf8', paddingLeft: 16 }}>
                -d '{`{"stream":"iot_sensors","batch_size":5000,"latency":"low"}`}'
              </p>
              <div style={{ padding: '16px 20px', borderRadius: 12, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,102,255,0.18)', marginTop: 6 }}>
                <pre style={{ color: '#34d399', fontSize: '0.8rem', lineHeight: 1.5 }}>{`{
  "status": "acknowledged",
  "engine": "PulseFlow-Daemon-v6",
  "events_processed": 5000,
  "cluster_regions": ["us-east-1", "eu-central-1", "ap-southeast-1"],
  "ingest_duration": "3.8ms"
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CTA ── */}
      <section
        style={{
          padding: 'clamp(5rem, 8vw, 7rem) 0',
          background: 'linear-gradient(180deg, #000000 0%, #02081a 100%)',
          borderTop: '1px solid rgba(0, 102, 255, 0.15)',
          position: 'relative',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div style={{ width: '100%', maxWidth: 760, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)', position: 'relative', zIndex: 10 }}>
          <span className="badge-glow" style={{ marginBottom: 20, display: 'inline-flex' }}>
            Custom Deployment
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: 16 }}>
            Want to Deploy Our <br />
            <span style={{ background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Proprietary Stacks?
            </span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, marginBottom: 36 }}>
            We offer dedicated on-premise installation, private cloud orchestration, and model fine-tuning for enterprise organizations.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '13px 32px', fontSize: '0.98rem' }}>
              Request Enterprise Demo <ArrowRight size={16} />
            </Link>
            <Link to="/services" className="btn btn-ghost" style={{ padding: '13px 28px', fontSize: '0.98rem' }}>
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
