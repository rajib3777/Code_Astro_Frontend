import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { getIndustries } from '@/api'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  Landmark,
  ShoppingBag,
  GraduationCap,
  Truck,
  Cloud,
  Building2,
  CheckCircle2,
  Cpu,
  ChevronDown,
  Layers,
  Lock,
  Activity,
  Server,
  FileCheck2,
} from 'lucide-react'
import BlueEnergyFlow from '@/components/ui/BlueEnergyFlow'

interface IndustryCardProps {
  ind: {
    id?: number | string
    name: string
    slug: string
    description: string
    short_description?: string
    features: string[]
    regulations?: string[]
    sla?: string
    iconName?: string
  }
  index: number
  open: boolean
  onToggle: () => void
}

const getIndustryIcon = (slugOrName: string) => {
  const n = slugOrName.toLowerCase()
  if (n.includes('fintech') || n.includes('bank')) return Landmark
  if (n.includes('health') || n.includes('med')) return HeartPulse
  if (n.includes('commerce') || n.includes('retail')) return ShoppingBag
  if (n.includes('edtech') || n.includes('learn') || n.includes('edu')) return GraduationCap
  if (n.includes('logistics') || n.includes('supply') || n.includes('ship')) return Truck
  if (n.includes('saas') || n.includes('cloud')) return Cloud
  return Building2
}

const FALLBACK_INDUSTRIES = [
  {
    id: 1,
    name: 'FinTech & Digital Banking',
    slug: 'fintech',
    description:
      'Ultra-low latency trading interfaces, high-concurrency payment switches, automated fraud mitigation, and PCI-DSS Level 1 compliant core architectures.',
    short_description: 'Processing billions securely with sub-millisecond execution and zero-loss ledgers.',
    iconName: 'Landmark',
    features: [
      'PCI-DSS Level 1 Architecture',
      'Sub-5ms Order Routing Switch',
      'Real-Time Fraud ML Inference',
      'Multi-Currency Ledger & Double Entry',
      'Automated KYC/AML Biometric Verification',
    ],
    regulations: ['PCI-DSS 4.0', 'SOC 2 Type II', 'GLBA', 'FFIEC'],
    sla: '99.999% Fault Tolerance',
  },
  {
    id: 2,
    name: 'Healthcare & MedTech Systems',
    slug: 'healthcare',
    description:
      'HIPAA-compliant telemedicine platforms, HL7/FHIR medical data switches, electronic health records (EHR/EMR), and diagnostic AI assistance systems.',
    short_description: 'HIPAA-compliant patient telemetry and interoperable clinical diagnostics.',
    iconName: 'HeartPulse',
    features: [
      'HIPAA & HITECH Compliant Data Vault',
      'HL7 / FHIR JSON Interoperability',
      'End-to-End Encrypted WebRTC Telehealth',
      'Audit-Proof Immutable Medical Logs',
      'Remote Patient Vital Sign Telemetry',
    ],
    regulations: ['HIPAA Omnibus', 'HITECH Act', 'FDA 21 CFR Part 11', 'GDPR Health'],
    sla: 'Zero Data Leak Guarantee',
  },
  {
    id: 3,
    name: 'Mission-Critical Enterprise SaaS',
    slug: 'saas',
    description:
      'Multi-tenant cloud platforms, self-serve subscription engines, collaborative workspaces, and automated usage billing with zero-downtime database upgrades.',
    short_description: 'Scalable B2B platforms engineered for high retention and ARR expansion.',
    iconName: 'Cloud',
    features: [
      'Multi-Tenant Row & Schema Isolation',
      'Fine-Grained RBAC & ABAC Policies',
      'Usage-Based Metering & Stripe Invoicing',
      'Zero-Downtime Blue/Green Database Migrations',
      'High-Throughput Global Edge Caches',
    ],
    regulations: ['SOC 2 Type II', 'ISO 27001', 'GDPR', 'CCPA'],
    sla: '99.99% Uptime Guarantee',
  },
  {
    id: 4,
    name: 'High-Volume E-Commerce & Retail',
    slug: 'ecommerce',
    description:
      'Headless storefronts, lightning-fast edge product search with Meilisearch, real-time inventory synchronization, and resilient high-load checkout engines.',
    short_description: 'Sub-second page speeds engineered for peak holiday surges and maximal conversions.',
    iconName: 'ShoppingBag',
    features: [
      'Sub-200ms Edge Server-Side Rendering',
      'Flash-Sale Concurrency Protection',
      'Automated Multi-Warehouse Inventory Sync',
      'Headless GraphQL Commerce Engines',
      'Omnichannel Cart & Loyalty Sync',
    ],
    regulations: ['PCI-DSS 4.0', 'GDPR', 'CCPA / CPRA'],
    sla: '< 150ms Response Latency',
  },
  {
    id: 5,
    name: 'Logistics, Fleet & Supply Chain',
    slug: 'logistics',
    description:
      'Real-time IoT fleet telematics, GPS geofencing, route optimization algorithms, and automated Bill of Lading (BOL) generation for freight networks.',
    short_description: 'End-to-end cargo visibility from origin terminal to final doorstep delivery.',
    iconName: 'Truck',
    features: [
      'Real-Time MQTT & IoT Vehicle Telemetry',
      'Dynamic TSP Route Optimization',
      'Automated Electronic Bill of Lading (eBOL)',
      'Cold-Chain Temperature Sensor Monitoring',
      'Predictive Geofence Delay Alerts',
    ],
    regulations: ['DOT FMCSA', 'ISO 28000', 'OSHA Telematics'],
    sla: 'Real-Time Telemetry Feed',
  },
  {
    id: 6,
    name: 'EdTech & Gamified Learning',
    slug: 'edtech',
    description:
      'SCORM/xAPI compliant learning management systems, interactive coding sandboxes, real-time virtual classrooms, and automated AI evaluation engines.',
    short_description: 'Interactive educational platforms serving millions of concurrent active learners.',
    iconName: 'GraduationCap',
    features: [
      'SCORM & xAPI Standards Compliance',
      'Sandboxed WebAssembly Code Execution',
      'Automated AI Grading & Constructive Feedback',
      'Dynamic Adaptive Student Curriculums',
      'Low-Latency Collaborative Whiteboards',
    ],
    regulations: ['FERPA Compliant', 'COPPA Audited', 'WCAG 2.1 AA Accessible'],
    sla: '100% Student Data Privacy',
  },
]

function IndustryDrawerCard({ ind, index, open, onToggle }: IndustryCardProps) {
  const Icon = getIndustryIcon(ind.slug || ind.name)

  return (
    <div
      style={{
        borderRadius: 22,
        background: open ? 'rgba(5, 12, 32, 0.95)' : 'rgba(5, 10, 24, 0.75)',
        border: open ? '1px solid rgba(0, 212, 255, 0.45)' : '1px solid rgba(0, 102, 255, 0.18)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: open
          ? '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 102, 255, 0.25)'
          : '0 8px 25px rgba(0, 0, 0, 0.6)',
        overflow: 'hidden',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={e => {
        if (!open) {
          ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 212, 255, 0.35)'
          ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
        }
      }}
      onMouseLeave={e => {
        if (!open) {
          ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 102, 255, 0.18)'
          ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        }
      }}
    >
      {/* Top Laser Accent */}
      <div
        style={{
          height: 3,
          background: open ? 'linear-gradient(90deg, #0066ff, #00d4ff)' : 'rgba(0, 102, 255, 0.15)',
          transition: 'background 0.3s ease',
        }}
      />

      {/* Main Trigger Card Header */}
      <div
        onClick={onToggle}
        style={{
          padding: '24px 26px',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        {/* Icon with glowing box */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: open
              ? 'linear-gradient(135deg, rgba(0, 102, 255, 0.35), rgba(0, 212, 255, 0.25))'
              : 'rgba(0, 102, 255, 0.12)',
            border: open ? '1px solid #00d4ff' : '1px solid rgba(0, 102, 255, 0.25)',
            boxShadow: open ? '0 0 20px rgba(0, 212, 255, 0.4)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.3s ease',
          }}
        >
          <Icon size={24} color={open ? '#00d4ff' : '#60a5fa'} />
        </div>

        {/* Text Block */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#00d4ff',
                letterSpacing: '0.08em',
              }}
            >
              SECTOR-0{index + 1}
            </span>
            {ind.sla && (
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 9999,
                  background: 'rgba(0, 212, 255, 0.1)',
                  color: '#38bdf8',
                  border: '1px solid rgba(0, 212, 255, 0.25)',
                }}
              >
                {ind.sla}
              </span>
            )}
          </div>
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            {ind.name}
          </h2>
          <p
            style={{
              fontSize: '0.85rem',
              color: '#94a3b8',
              margin: '4px 0 0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {ind.short_description || ind.description}
          </p>
        </div>

        {/* Action Toggle Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 14px',
            borderRadius: 9999,
            background: open ? 'rgba(0, 212, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)',
            border: open ? '1px solid rgba(0, 212, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
            color: open ? '#00d4ff' : '#94a3b8',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            transition: 'all 0.3s ease',
            flexShrink: 0,
          }}
        >
          <span>{open ? 'Collapse' : 'Explore'}</span>
          <ChevronDown
            size={16}
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </div>

      {/* Expandable Drawer Body */}
      {open && (
        <div
          style={{
            padding: '0 26px 28px',
            borderTop: '1px solid rgba(0, 102, 255, 0.15)',
            background: 'linear-gradient(180deg, rgba(0, 102, 255, 0.04) 0%, transparent 100%)',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <div style={{ paddingTop: 20 }}>
            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.65,
                color: '#cbd5e1',
                margin: '0 0 20px',
              }}
            >
              {ind.description}
            </p>

            {/* Compliance Matrix Chips */}
            {ind.regulations && ind.regulations.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#60a5fa',
                    marginBottom: 10,
                  }}
                >
                  Audited Regulatory Frameworks:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {ind.regulations.map((reg, rIdx) => (
                    <span
                      key={rIdx}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '4px 12px',
                        borderRadius: 6,
                        background: 'rgba(0, 102, 255, 0.12)',
                        border: '1px solid rgba(0, 212, 255, 0.25)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#93c5fd',
                      }}
                    >
                      <Lock size={12} color="#00d4ff" />
                      {reg}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Engineered Architecture Checklist */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.45)',
                borderRadius: 14,
                padding: '16px 20px',
                border: '1px solid rgba(0, 102, 255, 0.2)',
                marginBottom: 22,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#38bdf8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 12,
                }}
              >
                <Layers size={14} color="#00d4ff" />
                <span>Sector Architecture Safeguards</span>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                  gap: '10px 16px',
                }}
              >
                {ind.features.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                      fontSize: '0.85rem',
                      color: '#e2e8f0',
                    }}
                  >
                    <CheckCircle2
                      size={14}
                      color="#00d4ff"
                      style={{ marginTop: 3, flexShrink: 0 }}
                    />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Inquire Button */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 14,
                paddingTop: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8', fontSize: '0.8rem' }}>
                <Activity size={14} color="#00d4ff" />
                <span>Custom compliance audits & deployment blueprints available</span>
              </div>

              <Link
                to="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 22px',
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #0066ff, #0052cc)',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 0 20px rgba(0, 102, 255, 0.4)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #0073ff, #0060e6)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(0, 212, 255, 0.6)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #0066ff, #0052cc)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0, 102, 255, 0.4)'
                }}
              >
                <span>Consult on {ind.name.split(' ')[0]}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function IndustriesPage() {
  const [openCardIndex, setOpenCardIndex] = useState<number>(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const { data: indData } = useQuery({
    queryKey: ['industries'],
    queryFn: getIndustries,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 2,
        y: (e.clientY / innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const rawIndustries = indData?.results && indData.results.length > 0 ? indData.results : FALLBACK_INDUSTRIES

  const industries = rawIndustries.map((item: any, i: number) => {
    const fallback = FALLBACK_INDUSTRIES[i % FALLBACK_INDUSTRIES.length]
    return {
      id: item.id || fallback.id,
      name: item.name || fallback.name,
      slug: item.slug || fallback.slug,
      description: item.description || fallback.description,
      short_description: item.short_description || fallback.short_description,
      features: item.features && item.features.length > 0 ? item.features : fallback.features,
      regulations: fallback.regulations,
      sla: fallback.sla,
      iconName: fallback.iconName,
    }
  })

  return (
    <>
      <Helmet>
        <title>Industries We Serve — Code Astro | Domain-Specialized Engineering</title>
        <meta
          name="description"
          content="Domain-specialized software engineering across FinTech, Healthcare, Enterprise SaaS, E-Commerce, Logistics, and EdTech."
        />
      </Helmet>

      {/* ── Hero Section (Guaranteed Clearance from Fixed Navbar) ── */}
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

        <div
          style={{
            width: '100%',
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 clamp(1.25rem, 4vw, 3rem)',
            position: 'relative',
            zIndex: 10,
          }}
        >
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
            <Cpu size={15} color="#00d4ff" />
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#e0f2fe',
              }}
            >
              Regulated Domain Engineering
            </span>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#00d4ff',
                boxShadow: '0 0 10px #00d4ff',
              }}
              className="animate-pulse"
            />
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: '-0.035em',
              color: '#ffffff',
              margin: '0 auto 24px',
              maxWidth: 950,
            }}
          >
            Software Tailored For <br />
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
              Demanding Global Sectors
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
              color: '#94a3b8',
              maxWidth: 780,
              margin: '0 auto 36px',
              lineHeight: 1.65,
            }}
          >
            Generic development agencies build generic software. At Code Astro, we unite rigorous architectural craftsmanship with deep regulatory compliance to engineer systems that satisfy strict audit trails, zero-trust protocols, and massive transactional scale.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 16,
            }}
          >
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 32px',
                borderRadius: 9999,
                background: 'linear-gradient(135deg, #0066ff, #0052cc)',
                color: '#ffffff',
                fontSize: '0.95rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 0 30px rgba(0, 102, 255, 0.5)',
                transition: 'all 0.25s ease',
              }}
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight size={17} />
            </Link>
            <Link
              to="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 28px',
                borderRadius: 9999,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(0, 102, 255, 0.3)',
                color: '#cbd5e1',
                fontSize: '0.95rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Explore Sector Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* ── Certified Engineering Standards Strip ── */}
      <section
        style={{
          borderTop: '1px solid rgba(0, 102, 255, 0.2)',
          borderBottom: '1px solid rgba(0, 102, 255, 0.2)',
          background: 'rgba(5, 10, 24, 0.9)',
          padding: '18px 0',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#60a5fa', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <ShieldCheck size={16} color="#00d4ff" />
              <span>Certified Engineering Standards</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              {[
                'SOC 2 Type II Aligned',
                'HIPAA Ready',
                'PCI-DSS 4.0 Compliant',
                'GDPR / CCPA Audited',
                'ISO 27001 Methodology',
              ].map(badge => (
                <div
                  key={badge}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#cbd5e1',
                    background: 'rgba(0, 102, 255, 0.08)',
                    padding: '4px 12px',
                    borderRadius: 9999,
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                  }}
                >
                  <FileCheck2 size={13} color="#00d4ff" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BlueEnergyFlow />

      {/* ── Main Sector Capabilities Grid ── */}
      <section
        style={{
          background: '#000000',
          padding: 'clamp(60px, 8vw, 100px) 0',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#00d4ff',
                display: 'block',
                marginBottom: 12,
              }}
            >
              Industry Verticals
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontWeight: 800,
                color: '#ffffff',
                margin: '0 0 16px',
                letterSpacing: '-0.02em',
              }}
            >
              Engineered For High-Stakes Environments
            </h2>
            <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: 680, margin: '0 auto' }}>
              Click any industry sector to inspect its architecture safeguards, audited compliance matrices, and SLA delivery models.
            </p>
          </div>

          {/* Interactive Stacked Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {industries.map((ind: any, index: number) => (
              <IndustryDrawerCard
                key={ind.id || ind.slug}
                ind={ind}
                index={index}
                open={openCardIndex === index}
                onToggle={() => setOpenCardIndex(curr => (curr === index ? -1 : index))}
              />
            ))}
          </div>
        </div>
      </section>

      <BlueEnergyFlow flip />

      {/* ── Bottom Architecture Review Consultation ── */}
      <section
        style={{
          background: 'linear-gradient(180deg, #000000 0%, #030816 100%)',
          padding: 'clamp(70px, 10vw, 120px) 0',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
          borderTop: '1px solid rgba(0, 102, 255, 0.15)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 100%, rgba(0, 102, 255, 0.15) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)', position: 'relative', zIndex: 10 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 9999,
              background: 'rgba(0, 212, 255, 0.1)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              marginBottom: 20,
            }}
          >
            <Server size={14} color="#00d4ff" />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Bespoke System Architecture
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 800,
              color: '#ffffff',
              margin: '0 auto 20px',
              lineHeight: 1.15,
            }}
          >
            Operating in a Heavily Regulated Industry?
          </h2>

          <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.65, margin: '0 auto 36px', maxWidth: 640 }}>
            Our principal software architects will review your compliance matrix, recommend database isolation models, and provide a comprehensive implementation roadmap.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '15px 36px',
                borderRadius: 9999,
                background: 'linear-gradient(135deg, #0066ff, #0052cc)',
                color: '#ffffff',
                fontSize: '0.95rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 0 35px rgba(0, 102, 255, 0.5)',
              }}
            >
              <span>Book Architecture Consultation</span>
              <ArrowRight size={17} />
            </Link>
            <Link
              to="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '15px 30px',
                borderRadius: 9999,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(0, 102, 255, 0.3)',
                color: '#cbd5e1',
                fontSize: '0.95rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              View Engineering Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
