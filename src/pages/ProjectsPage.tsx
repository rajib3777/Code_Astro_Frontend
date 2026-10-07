import { useState, useMemo } from 'react'
import PageHeroOrb from '@/components/ui/PageHeroOrb'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/api'
import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, CheckCircle2, ChevronDown, Layers, Globe, Shield, Activity, Terminal } from 'lucide-react'
import BlueEnergyFlow from '@/components/ui/BlueEnergyFlow'

const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'NovaPay — Global Payment Switch',
    slug: 'novapay',
    category: 'fintech',
    tagline: 'High-Frequency FinTech Settlement Mesh',
    short_description:
      'Distributed real-time financial switch processing multi-currency FX routing and automated biometric fraud mitigation across 38 countries.',
    client_name: 'NovaPay Inc.',
    status: 'Production Live',
    color: '#0066ff',
    technologies: ['Go', 'Kafka', 'PostgreSQL', 'Kubernetes'],
    results: [
      { metric: 'Annual Volume', value: '$2B+' },
      { metric: 'Engine Uptime', value: '99.99%' },
      { metric: 'Route Latency', value: '1.8ms' },
    ],
    architectureHighlights: [
      'Multi-region active-active database clustering',
      'SIMD-accelerated financial ledger computation',
      'Sub-2ms ISO 20022 message serialization',
    ],
    year: 2025,
  },
  {
    id: 2,
    title: 'MedCore — Clinical Telemetry & EHR',
    slug: 'medcore',
    category: 'healthcare',
    tagline: 'HIPAA-Compliant Diagnostic Healthcare Core',
    short_description:
      'Telemedicine streaming platform with encrypted WebRTC video, HL7 FHIR database interoperability, and automated AI diagnostic triage assistance.',
    client_name: 'MedCore Health',
    status: 'Production Live',
    color: '#00d4ff',
    technologies: ['Python', 'Django', 'React', 'AWS'],
    results: [
      { metric: 'Clinics Connected', value: '500+' },
      { metric: 'Compliance', value: 'HIPAA & SOC2' },
      { metric: 'Data Throughput', value: '14TB/mo' },
    ],
    architectureHighlights: [
      'Zero-knowledge patient medical record encryption',
      'High-throughput WebRTC dynamic bitrate adaptation',
      'Automated diagnostic triage neural inference',
    ],
    year: 2024,
  },
  {
    id: 3,
    title: 'ShipFlow — Freight Fleet Intelligence',
    slug: 'shipflow',
    category: 'logistics',
    tagline: 'Autonomous Industrial Logistics Telematics',
    short_description:
      'Real-time GPS telemetry, predictive route optimization, and autonomous warehouse dispatch engine handling 10,000+ daily freight cargo shipments.',
    client_name: 'ShipFlow Logistics',
    status: 'Production Live',
    color: '#38bdf8',
    technologies: ['Rust', 'Kafka', 'Redis', 'Flutter'],
    results: [
      { metric: 'Shipments/Day', value: '10K+' },
      { metric: 'Fuel Optimization', value: '28% Saved' },
      { metric: 'Fleet Response', value: '450ms' },
    ],
    architectureHighlights: [
      'Embedded Rust GPS telemetry ingest daemon',
      'A* graph algorithm dynamic re-routing pipeline',
      'Real-time automated warehouse cross-dock sync',
    ],
    year: 2025,
  },
  {
    id: 4,
    title: 'LearnSphere — Interactive Global EdTech',
    slug: 'learnsphere',
    category: 'edtech',
    tagline: 'High-Concurrency Collaborative Code Canvas',
    short_description:
      'WebAssembly browser runtime with real-time multiplayer code collaboration, automated unit test grading, and streaming institutional video pipelines.',
    client_name: 'LearnSphere Global',
    status: 'Production Live',
    color: '#60a5fa',
    technologies: ['React', 'TypeScript', 'WebSockets', 'Docker'],
    results: [
      { metric: 'Active Students', value: '2M+' },
      { metric: 'Submissions/Sec', value: '4,500' },
      { metric: 'Sync Latency', value: '<25ms' },
    ],
    architectureHighlights: [
      'CRDT collaborative document conflict resolution',
      'Ephemeral containerized sandbox execution',
      'Adaptive WebRTC video broadcast streaming',
    ],
    year: 2024,
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'fintech', label: 'FinTech & Banking' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'logistics', label: 'Logistics' },
  { id: 'edtech', label: 'EdTech' },
]

function ProjectDrawerCard({ project, index }: { project: any; index: number }) {
  const [open, setOpen] = useState(false)
  const color = project.color || '#0066ff'
  const techs: string[] = project.technologies?.map((t: any) => (typeof t === 'string' ? t : t.name)) || []
  const results: any[] = project.results || []
  const highlights: string[] = project.architectureHighlights || [
    'Fault-tolerant distributed architecture',
    'Real-time telemetry and APM monitoring',
    'Automated zero-downtime deployment pipeline',
  ]

  return (
    <div
      style={{
        borderRadius: 24,
        background: open ? 'rgba(6, 14, 34, 0.95)' : 'rgba(5, 10, 24, 0.75)',
        border: open ? '1px solid rgba(0, 212, 255, 0.45)' : '1px solid rgba(0, 102, 255, 0.2)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: open
          ? '0 24px 60px rgba(0,0,0,0.9), 0 0 35px rgba(0, 102, 255, 0.25)'
          : '0 10px 30px rgba(0,0,0,0.6)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={e => {
        if (!open) {
          ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 212, 255, 0.35)'
          ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'
        }
      }}
      onMouseLeave={e => {
        if (!open) {
          ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 102, 255, 0.2)'
          ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        }
      }}
    >
      {/* Top Laser Accent */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${color}, #00d4ff, transparent)` }} />

      <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color }}>
            {project.client_name}
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
            {project.status || 'Live'}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 6 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#60a5fa', marginBottom: 14 }}>
          {project.tagline}
        </p>

        <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.65, marginBottom: 20, flexGrow: 1 }}>
          {project.short_description}
        </p>

        {/* Results Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 80px), 1fr))', gap: 8, marginBottom: 18 }}>
          {results.slice(0, 3).map((r, ri) => (
            <div
              key={ri}
              style={{
                padding: '8px 10px',
                borderRadius: 12,
                background: 'rgba(0, 0, 0, 0.45)',
                border: '1px solid rgba(0, 102, 255, 0.18)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#38bdf8', lineHeight: 1.1 }}>
                {r.value}
              </div>
              <div style={{ fontSize: '0.64rem', color: '#64748b', fontWeight: 600, marginTop: 3 }}>
                {r.metric}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Toggle Button */}
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '10px 16px',
            borderRadius: 10,
            background: open ? 'rgba(0, 102, 255, 0.22)' : 'rgba(255, 255, 255, 0.04)',
            border: open ? '1px solid rgba(0, 212, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
            color: open ? '#ffffff' : '#94a3b8',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginBottom: 14,
          }}
        >
          <span>{open ? 'Hide Blueprint Details' : 'View Blueprint & Architecture'}</span>
          <ChevronDown
            size={15}
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.25s ease',
            }}
          />
        </button>

        {/* Expandable Blueprint Drawer */}
        {open && (
          <div
            style={{
              padding: '14px 16px',
              borderRadius: 14,
              background: 'rgba(2, 6, 16, 0.95)',
              border: '1px solid rgba(0, 102, 255, 0.25)',
              marginBottom: 16,
              animation: 'fade-in 0.2s ease',
            }}
          >
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#00d4ff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              Engineering Blueprint Highlights
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
              {highlights.map((h, hi) => (
                <div key={hi} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: 6 }}>
              Production Stack
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {techs.map((t, ti) => (
                <span
                  key={ti}
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: 'rgba(0, 102, 255, 0.15)',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    color: '#93c5fd',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Link */}
        <Link
          to={`/projects/${project.slug}`}
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '11px 18px', fontSize: '0.85rem' }}
        >
          View Case Study <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}


export default function ProjectsPage() {
  const { data } = useQuery({ queryKey: ['projects-all'], queryFn: () => getProjects() })
  const [selectedCategory, setSelectedCategory] = useState('all')

  const projects = data?.results?.length ? data.results : FALLBACK_PROJECTS
  const filtered = useMemo(() => {
    return selectedCategory === 'all'
      ? projects
      : projects.filter((p: any) => p.category === selectedCategory || p.slug.includes(selectedCategory))
  }, [selectedCategory, projects])

  return (
    <>
      <Helmet>
        <title>Client Case Studies & Engineering Portfolio — Code Astro</title>
        <meta name="description" content="Explore our portfolio of mission-critical software projects across FinTech, Healthcare, Logistics, and SaaS." />
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
        <PageHeroOrb
          factor={20}
          top="40%"
          width="clamp(450px, 60vw, 850px)"
          height="clamp(450px, 60vw, 850px)"
          background="radial-gradient(circle, rgba(0, 102, 255, 0.22) 0%, rgba(0, 212, 255, 0.08) 40%, transparent 70%)"
          filter="blur(90px)"
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
            <TrendingUp size={15} color="#00d4ff" />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e0f2fe' }}>
              Production Engineering Portfolio
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
            Projects That <br />
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
              Define Industries
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
            From high-concurrency payment switches processing billions to mission-critical healthcare telemetry — discover how we build scalable digital solutions that stand the test of time.
          </p>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginTop: 10 }}>
            {CATEGORIES.map(cat => {
              const active = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 9999,
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    background: active ? 'linear-gradient(135deg, #0066ff, #00d4ff)' : 'rgba(10, 18, 40, 0.7)',
                    color: active ? '#ffffff' : '#94a3b8',
                    border: active ? '1px solid rgba(0, 212, 255, 0.6)' : '1px solid rgba(0, 102, 255, 0.2)',
                    boxShadow: active ? '0 0 25px rgba(0, 102, 255, 0.45)' : 'none',
                  }}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <BlueEnergyFlow />

      {/* ── 2. PROJECTS BLUEPRINT DRAWER CARDS ── */}
      <section
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
            {filtered.map((project: any, i: number) => (
              <ProjectDrawerCard key={project.id || i} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <BlueEnergyFlow flip />

      {/* ── 3. TRUST STRIP ── */}
      <section
        style={{
          padding: '50px 0',
          background: 'rgba(5, 8, 20, 0.95)',
          borderTop: '1px solid rgba(0, 102, 255, 0.15)',
          borderBottom: '1px solid rgba(0, 102, 255, 0.15)',
        }}
      >
        <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 24, textAlign: 'center' }}>
            {[
              { val: '$5B+', label: 'Client Revenue Handled', icon: Shield },
              { val: '48', label: 'Global Enterprise Systems', icon: Globe },
              { val: '18+', label: 'Countries Deployed', icon: Activity },
              { val: '0', label: 'Critical Security Breaches', icon: Terminal },
            ].map((item, idx) => (
              <div key={idx} style={{ padding: '16px 20px' }}>
                <div style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 6 }}>
                  <span style={{ background: 'linear-gradient(135deg, #fff 0%, #60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {item.val}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CTA ── */}
      <section
        style={{
          padding: 'clamp(5rem, 8vw, 7rem) 0',
          background: 'linear-gradient(180deg, #000000 0%, #02081a 100%)',
          position: 'relative',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            height: 700,
            background: 'radial-gradient(circle, rgba(0, 102, 255, 0.15) 0%, transparent 65%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ width: '100%', maxWidth: 760, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)', position: 'relative', zIndex: 10 }}>
          <span className="badge-glow" style={{ marginBottom: 20, display: 'inline-flex' }}>
            Start Building
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: 16 }}>
            Ready to Architect Your <br />
            <span style={{ background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Next Major System?
            </span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, marginBottom: 36 }}>
            Work with a dedicated team of elite software engineers who treat your product roadmap with startup velocity and enterprise discipline.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '13px 32px', fontSize: '0.98rem' }}>
              Start Project Discussion <ArrowRight size={16} />
            </Link>
            <Link to="/services" className="btn btn-ghost" style={{ padding: '13px 28px', fontSize: '0.98rem' }}>
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
