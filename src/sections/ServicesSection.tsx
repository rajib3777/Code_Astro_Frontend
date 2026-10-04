import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getServices } from '@/api'
import {
  ArrowRight,
  Code2,
  Cpu,
  Gamepad2,
  Globe,
  Database,
  Smartphone,
  Shield,
  Zap,
  ChevronDown,
  Layers,
  Activity,
  CheckCircle2,
} from 'lucide-react'
import type { Service } from '@/types/api'

export interface ServicesSectionProps {
  services?: any[]
}

const ICONS: Record<string, any> = {
  code: Code2,
  cpu: Cpu,
  game: Gamepad2,
  globe: Globe,
  db: Database,
  mobile: Smartphone,
  shield: Shield,
  zap: Zap,
}

const FALLBACK_SERVICES = [
  {
    id: 1,
    name: 'Custom Software Development',
    slug: 'custom-software',
    tagline: 'High-Concurrency Web & Enterprise Systems',
    short_description:
      'We architect and engineer distributed cloud applications, resilient REST/GraphQL APIs, and mission-critical enterprise systems designed for infinite scalability and zero downtime.',
    icon: 'code',
    color: '#0066ff',
    is_featured: true,
    features: ['Microservices & Event Mesh', 'Zero-Downtime CI/CD', 'Sub-millisecond Query Latency', 'SOC-2 Compliance'],
    sla: '99.99% Availability',
  },
  {
    id: 2,
    name: 'Arcade & Interactive Gaming Tech',
    slug: 'gaming',
    tagline: 'Embedded Gaming Engines & Machine Telemetry',
    short_description:
      'Custom arcade operating systems, ultra-low-latency input controllers, multiplayer synchronization servers, and high-frequency display engines with native hardware acceleration.',
    icon: 'game',
    color: '#00d4ff',
    is_featured: true,
    features: ['Low-Latency Input Drivers', 'Real-Time Player Sync', 'Telemetry Monitoring', 'Embedded Linux Builds'],
    sla: 'Sub-4ms Input Latency',
  },
  {
    id: 3,
    name: 'Industrial Automation & SCADA',
    slug: 'automation',
    tagline: 'Connected PLC Networks & Hardware IoT',
    short_description:
      'End-to-end industrial software: PLC programming, SCADA telemetry dashboards, edge IoT gateway daemons, and automated sensor pipeline integration for modern manufacturing plants.',
    icon: 'cpu',
    color: '#38bdf8',
    is_featured: true,
    features: ['Modbus & CAN-bus Protocols', 'Fault Anomaly Detection', 'Secure Edge Gateways', 'Real-Time Telemetry'],
    sla: 'Fault-Tolerant Redundancy',
  },
  {
    id: 4,
    name: 'Mobile Engineering & Cross-Platform',
    slug: 'mobile',
    tagline: 'Buttery Smooth iOS & Android Applications',
    short_description:
      'High-performance native and cross-platform mobile apps with offline-first synchronization, biometric security, and responsive UI micro-animations tailored for millions of active users.',
    icon: 'mobile',
    color: '#60a5fa',
    is_featured: false,
    features: ['Offline-First SQLite Cache', 'Biometric WebAuthn', 'Real-time Push Mesh', 'Native Metal / Vulkan UI'],
    sla: '60fps Butter Smooth',
  },
  {
    id: 5,
    name: 'Cloud Infrastructure & DevOps',
    slug: 'cloud',
    tagline: 'Kubernetes Clusters & Automated Multi-Region Deployments',
    short_description:
      'Enterprise cloud topology: automated Terraform IaC, multi-region Kubernetes clusters, automated rollback pipelines, and distributed observability stacks across AWS, GCP, and Azure.',
    icon: 'globe',
    color: '#1a7aff',
    is_featured: false,
    features: ['Kubernetes Orchestration', 'Terraform & OpenTofu', 'Distributed Tracing', 'Multi-Region Failover'],
    sla: 'Self-Healing Topology',
  },
  {
    id: 6,
    name: 'AI Engineering & Data Intelligence',
    slug: 'ai-data',
    tagline: 'Autonomous Intelligence & Real-Time Data Pipelines',
    short_description:
      'Machine learning model deployment, vector retrieval engines, real-time Kafka streaming pipelines, and automated intelligence integrations that grant a tangible operational advantage.',
    icon: 'db',
    color: '#0055ff',
    is_featured: false,
    features: ['Vector Search & RAG', 'Streaming Kafka Telemetry', 'Sub-second Anomaly Alerts', 'Secure On-Prem LLM'],
    sla: 'Real-Time Ingestion',
  },
]

function ServiceDrawerCard({ service, index }: { service: any; index: number }) {
  const [open, setOpen] = useState(false)
  const Icon = ICONS[service.icon] || Code2
  const color = service.color || '#0066ff'
  const features: string[] = Array.isArray(service.features)
    ? service.features.map((f: any) => (typeof f === 'string' ? f : f.title))
    : FALLBACK_SERVICES[index % FALLBACK_SERVICES.length].features
  const sla = service.sla || FALLBACK_SERVICES[index % FALLBACK_SERVICES.length].sla

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
          height: 2,
          background: open ? 'linear-gradient(90deg, #0066ff, #00d4ff)' : 'rgba(0, 102, 255, 0.15)',
          transition: 'background 0.3s ease',
        }}
      />

      {/* Main Trigger Card Header */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          padding: 'clamp(16px, 3.5vw, 24px) clamp(14px, 3.5vw, 26px)',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(12px, 2.5vw, 18px)',
          cursor: 'pointer',
        }}
      >
        {/* Icon with glowing box */}
        <div
          style={{
            width: 'clamp(40px, 8vw, 48px)',
            height: 'clamp(40px, 8vw, 48px)',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.25), rgba(0, 212, 255, 0.1))',
            border: `1px solid ${color}55`,
            boxShadow: `0 0 20px ${color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00d4ff',
            flexShrink: 0,
          }}
        >
          <Icon size={20} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              0{index + 1} // Engineering
            </span>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 9999,
                background: 'rgba(0, 102, 255, 0.15)',
                border: '1px solid rgba(0, 212, 255, 0.25)',
                color: '#38bdf8',
                display: 'inline-flex',
                whiteSpace: 'nowrap',
              }}
            >
              {sla}
            </span>
          </div>
          <h3 style={{ fontSize: 'clamp(1rem, 2.8vw, 1.15rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 4, lineHeight: 1.25 }}>
            {service.name}
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4 }}>
            {service.tagline}
          </p>
        </div>

        {/* Drawer Chevron Indicator */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: 'rgba(255, 255, 255, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: open ? '#00d4ff' : '#64748b',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            flexShrink: 0,
          }}
        >
          <ChevronDown size={17} />
        </div>
      </div>

      {/* Expandable Architecture Drawer */}
      {open && (
        <div
          style={{
            padding: '0 26px 24px',
            borderTop: '1px solid rgba(0, 102, 255, 0.15)',
            paddingTop: 18,
            animation: 'fade-in 0.25s ease',
          }}
        >
          <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: 18 }}>
            {service.short_description || service.description}
          </p>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#00d4ff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              Architectural Capabilities
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 8 }}>
              {features.map((feat, fi) => (
                <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Engineered by Code Astro · Production Ready
            </span>
            <Link
              to={`/services`}
              className="btn-link"
              style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#38bdf8',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                textDecoration: 'none',
              }}
            >
              Explore Full Specs <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ServicesSection({ services: propServices }: ServicesSectionProps = {}) {
  const { data } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
    enabled: !propServices || propServices.length === 0,
  })
  const services = propServices && propServices.length > 0
    ? propServices
    : (data?.results?.length ? data.results : FALLBACK_SERVICES)

  return (
    <section
      id="services"
      style={{
        padding: 'clamp(5rem, 9vw, 8rem) 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #000000 0%, #020614 50%, #000000 100%)',
      }}
    >
      {/* Background Cyber Grid */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(to right, rgba(0, 102, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 102, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radiant Glow */}
      <div
        style={{
          position: 'absolute', pointerEvents: 'none',
          top: '25%',
          left: '-5%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.12) 0%, transparent 65%)',
          filter: 'blur(90px)',
        }}
      />

      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 9999, marginBottom: 20,
              background: 'rgba(0, 102, 255, 0.12)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              boxShadow: '0 0 20px rgba(0, 102, 255, 0.2)',
            }}
          >
            <Layers size={13} color="#22d3ee" />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#e0f2fe' }}>
              Full-Stack Capabilities
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 16px' }}>
            Services That{' '}
            <span style={{ background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Drive Growth
            </span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, margin: '0 auto', maxWidth: 560 }}>
            From high-throughput cloud architectures to industrial machine firmware — Code Astro delivers mission-critical engineering solutions.
          </p>
        </div>

        {/* Two-Column Interactive Drawer Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: 14,
          }}
        >
          {services.slice(0, 6).map((service: any, i: number) => (
            <ServiceDrawerCard key={service.id || i} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 48, width: '100%', display: 'flex', justifyContent: 'center', padding: '0 12px' }}>
          <Link
            to="/contact"
            className="btn btn-primary"
            style={{
              padding: 'clamp(10px, 2.5vw, 13px) clamp(16px, 4vw, 28px)',
              fontSize: 'clamp(0.78rem, 2.8vw, 0.92rem)',
              maxWidth: '100%',
              whiteSpace: 'normal',
              textAlign: 'center',
              lineHeight: 1.35,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <span>Request Custom Architecture Consultation</span>
            <ArrowRight size={15} style={{ flexShrink: 0 }} />
          </Link>
        </div>
      </div>
    </section>
  )
}
