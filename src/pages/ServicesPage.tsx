import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { getServices } from '@/api'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Code2,
  Cpu,
  Globe,
  Database,
  Smartphone,
  Shield,
  Zap,
  ChevronDown,
  Layers,
  CheckCircle2,
  Compass,
  Rocket,
  Palette,
  ShoppingBag,
  GraduationCap,
  Brain,
  Users,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react'
import BlueEnergyFlow from '@/components/ui/BlueEnergyFlow'

const ICONS: Record<string, any> = {
  code: Code2,
  Code2: Code2,
  cpu: Cpu,
  globe: Globe,
  Globe: Globe,
  db: Database,
  mobile: Smartphone,
  Smartphone: Smartphone,
  shield: Shield,
  Shield: Shield,
  ShieldAlert: ShieldAlert,
  ShieldCheck: ShieldCheck,
  ShoppingBag: ShoppingBag,
  shopping: ShoppingBag,
  GraduationCap: GraduationCap,
  training: GraduationCap,
  Brain: Brain,
  ai: Brain,
  Users: Users,
  users: Users,
  zap: Zap,
}

const FALLBACK_SERVICES = [
  {
    id: 1,
    name: 'Custom Software Development',
    slug: 'custom-software-development',
    tagline: 'Tailored Enterprise & Cloud Architectures',
    short_description:
      'Build customized software solutions tailored to specific business requirements and workflows.',
    icon: 'Code2',
    color: '#0066ff',
    features: ['Bespoke Enterprise Systems', 'Scalable Microservices Fabric', 'API Integration & Pipelines', 'Full Code Ownership'],
    sla: '99.99% Availability',
  },
  {
    id: 2,
    name: 'Mobile App Development',
    slug: 'mobile-app-development',
    tagline: 'High-Performance iOS & Android Applications',
    short_description:
      'Develop modern, responsive, and user-friendly mobile applications for Android and iOS.',
    icon: 'Smartphone',
    color: '#00d4ff',
    features: ['Cross-Platform Flutter & Native', 'Offline-First Local Sync', 'Biometric Authentication', 'Smooth 60fps Micro-UI'],
    sla: '60fps Native Speed',
  },
  {
    id: 3,
    name: 'E-commerce Solutions',
    slug: 'ecommerce-solutions',
    tagline: 'Scalable Digital Commerce & Multi-Vendor Stores',
    short_description:
      'Build complete and scalable e-commerce solutions for online businesses, including product, order, payment, and customer management.',
    icon: 'ShoppingBag',
    color: '#10b981',
    features: ['Dynamic Storefronts & Catalogs', 'Order & Inventory Automation', 'Multi-Gateway Checkout', 'Customer Loyalty Portals'],
    sla: 'High-Conversion Checkout',
  },
  {
    id: 4,
    name: 'Web Development',
    slug: 'web-development',
    tagline: 'Modern, Secure & Responsive Web Platforms',
    short_description:
      'Develop modern, secure, responsive, and high-performance websites and web applications.',
    icon: 'Globe',
    color: '#38bdf8',
    features: ['React & Next.js Architecture', 'Mobile-First Responsive Layout', 'Sub-Second Page Performance', 'Hardened Web Standards'],
    sla: 'Sub-second Load Times',
  },
  {
    id: 5,
    name: 'Training & Earning',
    slug: 'training-earning',
    tagline: 'Hands-On Tech Skills & Career Development',
    short_description:
      'Provide practical technology training and help learners develop digital skills for professional and earning opportunities.',
    icon: 'GraduationCap',
    color: '#8b5cf6',
    features: ['Practical Project Curriculum', 'Senior Engineer Mentorship', 'Career & Freelance Readiness', 'Hands-On Skill Verification'],
    sla: 'Industry Ready Skills',
  },
  {
    id: 6,
    name: 'AI Automation',
    slug: 'ai-automation',
    tagline: 'Intelligent Process Automation & Workflow Efficiency',
    short_description:
      'Use AI-powered automation to streamline business processes, reduce repetitive tasks, improve productivity, and increase operational efficiency.',
    icon: 'Brain',
    color: '#f59e0b',
    features: ['End-to-End Workflow Automation', 'AI Chatbots & Virtual Agents', 'Intelligent Document Extraction', 'Operational Cost Reductions'],
    sla: 'Automated Efficiency',
  },
  {
    id: 7,
    name: 'Remote Developer Hiring',
    slug: 'remote-developer-hiring',
    tagline: 'Vetted Dedicated Tech Talent & Team Augmentation',
    short_description:
      'Help businesses hire skilled remote developers according to their project requirements and technical needs.',
    icon: 'Users',
    color: '#ec4899',
    features: ['Pre-Vetted Senior Engineers', 'Flexible Engagement Models', 'Immediate Tooling Integration', 'Transparent Sprint Reporting'],
    sla: 'Top 3% Vetted Talent',
  },
  {
    id: 8,
    name: 'Website Malware Detection & Removal',
    slug: 'malware-detection-removal',
    tagline: 'Comprehensive Web Security & Threat Cleanup',
    short_description:
      'Detect and remove malware, malicious code, suspicious files, redirects, and other security threats from compromised websites.',
    icon: 'ShieldAlert',
    color: '#ef4444',
    features: ['Deep File & Webshell Scanning', 'Malicious Redirect Eradication', 'Database & Admin Disinfection', 'Firewall Hardening & Un-Blacklist'],
    sla: 'Rapid Security Response',
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
          height: 3,
          background: open ? 'linear-gradient(90deg, #0066ff, #00d4ff)' : 'rgba(0, 102, 255, 0.15)',
          transition: 'background 0.3s ease',
        }}
      />

      {/* Main Trigger Card Header */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          padding: '24px 26px',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
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
              0{index + 1} // Capability
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
          <h3 style={{ fontSize: 'clamp(1rem, 2.8vw, 1.2rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 4, lineHeight: 1.25 }}>
            {service.name}
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.4 }}>
            {service.tagline}
          </p>
        </div>

        {/* Drawer Chevron */}
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
              Architectural Highlights
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
              to={`/services/${service.slug}`}
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

export default function ServicesPage() {
  const { data } = useQuery({ queryKey: ['services'], queryFn: getServices })
  const services = data?.results?.length ? data.results : FALLBACK_SERVICES
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
        <title>Engineering Capabilities & Services — Code Astro</title>
        <meta name="description" content="Full-spectrum software engineering from web and mobile apps to SaaS platforms, AI integrations, and cloud infrastructure." />
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
            <Cpu size={15} color="#00d4ff" />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e0f2fe' }}>
              Full-Stack Engineering Disciplines
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
            Full-Spectrum <br />
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
              Software Engineering
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
            We partner with ambitious enterprises and high-growth startups to design, build, and scale world-class software products — from conceptual architecture to global distribution.
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
              Start Architecture Review
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/projects"
              className="btn btn-ghost"
              style={{
                padding: '13px 28px',
                fontSize: '0.98rem',
                fontWeight: 600,
              }}
            >
              <Globe size={16} color="#38bdf8" />
              View Case Studies
            </Link>
          </div>
        </div>
      </section>

      <BlueEnergyFlow />

      {/* ── 2. SERVICES INTERACTIVE DRAWER CARDS ── */}
      <section
        style={{
          padding: 'clamp(5rem, 9vw, 8rem) 0',
          position: 'relative',
          background: 'linear-gradient(180deg, #000000 0%, #020614 50%, #000000 100%)',
        }}
      >
        <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
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
              <Layers size={13} color="#22d3ee" />
              <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#e0f2fe' }}>
                Specialized Engineering Pods
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 16px' }}>
              Our Core <span style={{ background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Engineering Disciplines</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, margin: '0 auto', maxWidth: 560 }}>
              Each discipline is delivered by a dedicated pod of senior architects, engineers, and specialists.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: 16,
            }}
          >
            {services.map((service: any, i: number) => (
              <ServiceDrawerCard key={service.id || i} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <BlueEnergyFlow flip />

      {/* ── 3. PROCESS & WORKFLOW PIPELINE ── */}
      <section
        style={{
          padding: 'clamp(5rem, 9vw, 8rem) 0',
          position: 'relative',
          background: 'linear-gradient(180deg, #000000 0%, #03081a 50%, #000000 100%)',
        }}
      >
        <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
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
              <Compass size={13} color="#22d3ee" />
              <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#e0f2fe' }}>
                Delivery Cadence
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 16px' }}>
              From Blueprint to{' '}
              <span style={{ background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Global Deployment
              </span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, margin: '0 auto', maxWidth: 560 }}>
              A battle-tested 4-phase agile pipeline that eliminates risk and accelerates time-to-market.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 20 }}>
            {[
              { step: '01', title: 'Discovery & Schema Blueprint', desc: 'Requirements analysis, domain modeling, and technical architecture spec.', icon: Compass },
              { step: '02', title: 'Interactive Prototype & UX', desc: '60fps interactive wireframes, component design systems, and user testing.', icon: Palette },
              { step: '03', title: 'Agile Engineering Sprints', desc: 'Bi-weekly sprint demos, live preview environments, and continuous CI/CD QA.', icon: Cpu },
              { step: '04', title: 'Global Multi-Region Launch', desc: 'Production deployment with 99.99% SLA, real-time observability, and autoscaling.', icon: Rocket },
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 22,
                  background: 'rgba(5, 10, 24, 0.8)',
                  border: '1px solid rgba(0, 102, 255, 0.2)',
                  padding: '28px 24px',
                  textAlign: 'center',
                  transition: 'all 0.35s ease',
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 212, 255, 0.45)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 102, 255, 0.2)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 102, 255, 0.2)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 16,
                    background: 'linear-gradient(135deg, #0066ff, #00d4ff)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    boxShadow: '0 0 25px rgba(0, 102, 255, 0.4)',
                    margin: '0 auto 18px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {p.step}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 8 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.65 }}>
                  {p.desc}
                </p>
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
          borderTop: '1px solid rgba(0, 102, 255, 0.15)',
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
            Ready to Build?
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: 16 }}>
            Need a Specialized <br />
            <span style={{ background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Technical Architecture?
            </span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, marginBottom: 36 }}>
            We engineer bespoke systems tailored to unique performance, compliance, and multi-tenant scaling requirements.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '13px 32px', fontSize: '0.98rem' }}>
              Schedule Consultation <ArrowRight size={16} />
            </Link>
            <Link to="/projects" className="btn btn-ghost" style={{ padding: '13px 28px', fontSize: '0.98rem' }}>
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
