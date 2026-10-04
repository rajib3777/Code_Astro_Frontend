import { useState } from 'react'
import { Compass, Layout, GitBranch, ShieldCheck, Rocket, CheckCircle2, ChevronDown, Activity, ArrowRight } from 'lucide-react'

const PROCESS_STEPS = [
  {
    step_number: 1,
    title: 'Discovery & System Architecture Design',
    description:
      'We deconstruct your domain requirements, audit existing infrastructure, and draft a comprehensive System Design Document (SDD) with data schema topology and low-latency specs.',
    duration: 'Week 1 – 2',
    icon: Compass,
    deliverables: [
      'Comprehensive System Design Document (SDD)',
      'Data flow & schema ERD topology',
      'Threat model & security specifications',
      'API contract specification (OpenAPI/gRPC)',
    ],
  },
  {
    step_number: 2,
    title: 'Precision Prototyping & UX Wireframes',
    description:
      'Interactive Figma prototypes, design tokens, and user journey mappings — validated with end-users and product stakeholders before writing production code.',
    duration: 'Week 2 – 3',
    icon: Layout,
    deliverables: [
      'Interactive Figma design system & tokens',
      'End-to-end user journey wireframe verification',
      'Micro-animation & state transition prototypes',
      'Responsive multi-viewport validation specs',
    ],
  },
  {
    step_number: 3,
    title: 'Agile Engineering Sprints & Daily CI/CD',
    description:
      'Two-week bi-directional sprints with automated daily builds, continuous integration pipelines, and weekly staging demo deployments for immediate feedback.',
    duration: 'Week 4 – 14',
    icon: GitBranch,
    deliverables: [
      'Daily continuous integration & unit test suite',
      'Automated preview environments for each PR',
      'Weekly staging sprint demo walkthroughs',
      'Transparent Jira/Linear roadmap burndown tracking',
    ],
  },
  {
    step_number: 4,
    title: 'QA, Fuzz Testing & Chaos Audits',
    description:
      'End-to-end automated regression suites, 10x peak load chaos simulations, dynamic application security testing (DAST), and cryptographic audits.',
    duration: 'Week 14 – 16',
    icon: ShieldCheck,
    deliverables: [
      'Automated Playwright/Cypress E2E test suites',
      '10x peak concurrent load chaos simulations',
      'DAST automated vulnerability scanning',
      'SOC-2 Type II & HIPAA compliance checklist',
    ],
  },
  {
    step_number: 5,
    title: 'Zero-Downtime Deployment & Handover',
    description:
      'Blue/green or canary production rollout on Kubernetes / Cloud infrastructure with APM telemetry dashboards, operational runbooks, and staff handover.',
    duration: 'Production Launch',
    icon: Rocket,
    deliverables: [
      'Canary blue/green zero-downtime deployment',
      'Prometheus/Grafana real-time APM telemetry',
      'Comprehensive ops runbooks & architecture handover',
      '24/7 hyper-care incident escalation bridge',
    ],
  },
]

export default function ProcessSection({ steps }: { steps?: any[] }) {
  const [openDrawer, setOpenDrawer] = useState<number | null>(0)
  const items = PROCESS_STEPS

  return (
    <section
      id="process"
      style={{
        padding: 'clamp(5rem, 9vw, 8rem) 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #000000 0%, #030818 50%, #000000 100%)',
      }}
    >
      {/* Background Cyber Stream */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(to right, rgba(0, 102, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 102, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Ambient Blue Radial Glow */}
      <div
        style={{
          position: 'absolute', pointerEvents: 'none',
          top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 500,
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.1) 0%, transparent 65%)',
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
            <Activity size={13} color="#22d3ee" />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#e0f2fe' }}>
              Execution Methodology
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 16px' }}>
            Engineered for{' '}
            <span style={{ background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Predictable Delivery
            </span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, margin: '0 auto', maxWidth: 560 }}>
            A rigorous 5-phase engineering lifecycle designed by Code Astro to eliminate technical debt and deliver bulletproof software on schedule.
          </p>
        </div>

        {/* Process Step Drawer Cards List */}
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {items.map((step, idx) => {
            const num = String(step.step_number).padStart(2, '0')
            const isOpen = openDrawer === idx
            const Icon = step.icon

            return (
              <div
                key={idx}
                style={{
                  borderRadius: 20,
                  background: isOpen ? 'rgba(7, 16, 38, 0.95)' : 'rgba(5, 10, 24, 0.75)',
                  border: isOpen ? '1px solid rgba(0, 212, 255, 0.45)' : '1px solid rgba(0, 102, 255, 0.18)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: isOpen
                    ? '0 16px 45px rgba(0,0,0,0.85), 0 0 30px rgba(0, 102, 255, 0.2)'
                    : '0 6px 20px rgba(0,0,0,0.5)',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Header Trigger */}
                <div
                  onClick={() => setOpenDrawer(isOpen ? null : idx)}
                  style={{
                    padding: 'clamp(14px, 3.5vw, 22px) clamp(14px, 3.5vw, 24px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(12px, 2.5vw, 18px)',
                    cursor: 'pointer',
                  }}
                >
                  {/* Step Number Badge */}
                  <div
                    style={{
                      width: 'clamp(36px, 7vw, 44px)',
                      height: 'clamp(36px, 7vw, 44px)',
                      borderRadius: 12,
                      background: isOpen
                        ? 'linear-gradient(135deg, #0066ff, #00d4ff)'
                        : 'rgba(0, 102, 255, 0.15)',
                      border: `1px solid ${isOpen ? '#00d4ff' : 'rgba(0, 102, 255, 0.3)'}`,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                      boxShadow: isOpen ? '0 0 20px rgba(0, 102, 255, 0.6)' : 'none',
                      flexShrink: 0,
                    }}
                  >
                    {num}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Icon size={14} className="text-cyan-400" />
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          Phase {num}
                        </span>
                      </div>
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
                        {step.duration}
                      </span>
                    </div>
                    <h3 style={{ fontSize: 'clamp(0.98rem, 2.5vw, 1.15rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em', marginBottom: 4, lineHeight: 1.25 }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.45 }}>
                      {step.description}
                    </p>
                  </div>

                  {/* Drawer Chevron */}
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isOpen ? '#00d4ff' : '#64748b',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDown size={16} />
                  </div>
                </div>

                {/* Expandable Deliverables Drawer */}
                {isOpen && (
                  <div
                    style={{
                      padding: '16px clamp(16px, 4vw, 24px) 22px clamp(16px, 4vw, 86px)',
                      borderTop: '1px solid rgba(0, 102, 255, 0.15)',
                      animation: 'fade-in 0.2s ease',
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#00d4ff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                      Phase Deliverables & Verification
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 8 }}>
                      {step.deliverables.map((d, di) => (
                        <div key={di} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: '#cbd5e1' }}>
                          <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
