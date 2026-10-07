import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { getStatistics, getTeam, getSiteSettings } from '@/api'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Zap, Code2, HeartHandshake, CheckCircle2, Globe, Cpu, Award, Terminal, Activity, Layers, Users } from 'lucide-react'
import { LinkedinIcon, TwitterIcon, GithubIcon } from '@/components/ui/SocialIcons'
import BlueEnergyFlow from '@/components/ui/BlueEnergyFlow'

const STATS_FALLBACK = [
  { val: '200+', label: 'Shipped Systems', desc: 'Enterprise apps, web & mobile platforms', icon: Code2 },
  { val: '99.99%', label: 'Infrastructure Uptime', desc: 'Continuous zero-downtime SLA', icon: ShieldCheck },
  { val: '50+', label: 'Global Clients', desc: 'In 18+ countries worldwide', icon: Globe },
  { val: '<10ms', label: 'Processing Telemetry', desc: 'Sub-millisecond edge latency', icon: Cpu },
]

const CORE_VALUES = [
  {
    title: 'Obsessive Engineering',
    desc: 'We write immaculate, strictly typed, test-covered code designed to scale reliably under extreme concurrency.',
    color: '#0066ff',
    icon: Code2,
  },
  {
    title: 'Velocity Without Compromise',
    desc: 'Rapid iteration cycles paired with strict CI/CD pipelines to ship world-class features at high speed.',
    color: '#00d4ff',
    icon: Zap,
  },
  {
    title: 'Enterprise-Grade Security',
    desc: 'Zero-trust architecture, audit-ready data isolation, and comprehensive vulnerability assessments by default.',
    color: '#38bdf8',
    icon: ShieldCheck,
  },
  {
    title: 'True Product Partnership',
    desc: 'We think like founders and product owners, continuously challenging assumptions to optimize ROI.',
    color: '#60a5fa',
    icon: HeartHandshake,
  },
]

const FALLBACK_TEAM = [
  { name: 'Alex Vance', role: 'Chief Executive Officer & Founder', bio: 'Former Principal Architect with 14+ years designing high-throughput distributed systems and scaling SaaS enterprises.' },
  { name: 'Elena Rostova', role: 'VP of Product Engineering', bio: 'Specialist in reactive UI architectures, performance profiling, and design-system engineering across mobile and web.' },
  { name: 'David K. Chen', role: 'Head of AI & Cloud Infrastructure', bio: 'PhD in Computer Science. Focuses on LLM pipeline orchestration, zero-downtime Kubernetes deployments, and cloud optimization.' },
]

export default function AboutPage() {
  const { data: statsData } = useQuery({ queryKey: ['statistics'], queryFn: getStatistics })
  const { data: teamData } = useQuery({ queryKey: ['team'], queryFn: getTeam })
  const { data: settings } = useQuery({ queryKey: ['site-settings'], queryFn: getSiteSettings })
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

  const team = teamData?.results?.length ? teamData.results : FALLBACK_TEAM

  return (
    <>
      <Helmet>
        <title>About Us — Code Astro | Engineering Tomorrow's Software</title>
        <meta name="description" content="Learn about Code Astro, our engineering philosophy, our team of world-class developers, and our mission to build transformative software." />
      </Helmet>

      {/* ── 1. HERO SECTION (GUARANTEED NAVBAR CLEARANCE & 3D GLOW) ── */}
      <section
        style={{
          background: '#000000',
          paddingTop: 'clamp(90px, 14vw, 190px)',
          paddingBottom: 'clamp(60px, 8vw, 100px)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {/* Cyber Grid Background */}
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

        {/* Shiny Blue Radiant Energy Flare */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: `translate(-50%, -50%) translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)`,
            width: 'clamp(450px, 60vw, 900px)',
            height: 'clamp(450px, 60vw, 900px)',
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
            <Zap size={15} color="#00d4ff" />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e0f2fe' }}>
              Engineering Studio & Deep Tech Lab
            </span>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 10px #00d4ff' }} className="animate-pulse" />
          </div>

          {/* Centered Main Title */}
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
            An Elite Software Lab Crafting <br />
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
              Next-Gen Products
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
              color: '#94a3b8',
              lineHeight: 1.7,
              maxWidth: 720,
              margin: '0 auto 36px',
            }}
          >
            Code Astro was founded on a simple conviction: modern enterprises deserve software engineered with architectural rigor, exquisite design craft, and fearless technical ambition.
          </p>

          {/* Action Buttons */}
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
              Build With Us
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
              Explore Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. METRICS STRIP (CYBER BOXES) ── */}
      <section
        style={{
          borderTop: '1px solid rgba(0, 102, 255, 0.15)',
          borderBottom: '1px solid rgba(0, 102, 255, 0.15)',
          background: 'rgba(5, 8, 20, 0.9)',
          padding: '40px 0',
          position: 'relative',
        }}
      >
        <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 20 }}>
            {STATS_FALLBACK.map((s, i) => {
              const Icon = s.icon
              return (
                <div
                  key={i}
                  style={{
                    padding: '22px 24px',
                    borderRadius: 18,
                    background: 'rgba(10, 18, 40, 0.65)',
                    border: '1px solid rgba(0, 102, 255, 0.2)',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 212, 255, 0.45)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(0, 102, 255, 0.15)'
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 102, 255, 0.2)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: 'rgba(0, 102, 255, 0.15)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                      color: '#00d4ff',
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div
                    style={{
                      fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 1.1,
                      marginBottom: 4,
                    }}
                  >
                    {s.val}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', marginBottom: 2 }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    {s.desc}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <BlueEnergyFlow />

      {/* ── 3. ORIGIN & LIVE TELEMETRY TERMINAL ── */}
      <section
        style={{
          padding: 'clamp(5rem, 9vw, 8rem) 0',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #000000 0%, #03081a 50%, #000000 100%)',
        }}
      >
        <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: 'clamp(24px, 4vw, 48px)', alignItems: 'center' }}>
            {/* Story */}
            <div>
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
                  Our Origin & Vision
                </span>
              </div>

              <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 20px' }}>
                Bridging Visionary Design With{' '}
                <span style={{ background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Relentless Engineering
                </span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: '#94a3b8', fontSize: '1rem', lineHeight: 1.75 }}>
                <p>
                  Most software agencies either deliver gorgeous mockups with unmaintainable code, or rock-solid backend systems wrapped in uninspired interfaces. Code Astro was built to eliminate this compromise.
                </p>
                <p>
                  We operate as an agile product studio and deep software engineering lab. Whether architects are refactoring distributed microservices or motion designers are fine-tuning 60fps micro-interactions, every detail is engineered with uncompromising standards.
                </p>
                <p>
                  From high-growth FinTech unicorns and HIPAA-compliant healthcare networks to AI-first enterprise systems, our work powers transactions, saves lives, and shapes how global leaders operate.
                </p>
              </div>

              <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary">
                  Start Project Brief <ArrowRight size={15} />
                </Link>
                <Link to="/services" className="btn btn-ghost">
                  Explore Capabilities
                </Link>
              </div>
            </div>

            {/* Live Terminal Telemetry Card */}
            <div>
              <div
                style={{
                  borderRadius: 22,
                  background: 'rgba(5, 10, 26, 0.95)',
                  border: '1px solid rgba(0, 102, 255, 0.3)',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 102, 255, 0.2)',
                  overflow: 'hidden',
                }}
              >
                {/* Window Bar */}
                <div
                  style={{
                    padding: '12px clamp(12px, 3vw, 20px)',
                    background: 'rgba(10, 18, 42, 0.9)',
                    borderBottom: '1px solid rgba(0, 102, 255, 0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 8,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ef4444' }} />
                    <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#f59e0b' }} />
                    <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#10b981' }} />
                    <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#64748b', marginLeft: 8 }}>
                      codeastro-lab-telemetry // v6.0
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
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} className="animate-pulse" />
                    LIVE CLUSTER
                  </span>
                </div>

                {/* Terminal Content */}
                <div style={{ padding: 'clamp(14px, 3vw, 24px) clamp(12px, 3vw, 26px)', fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.72rem, 2vw, 0.82rem)', display: 'flex', flexDirection: 'column', gap: 14, overflowX: 'auto' }}>
                  <div style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,102,255,0.18)' }}>
                    <div style={{ color: '#38bdf8', fontWeight: 700, marginBottom: 8 }}>
                      $ codeastro --diagnostics --all
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, color: '#94a3b8' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <CheckCircle2 size={13} color="#10b981" />
                        <span>Core Mesh Health: 100% Operational</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <CheckCircle2 size={13} color="#10b981" />
                        <span>Latency Profile: &lt; 14ms Global Edge</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <CheckCircle2 size={13} color="#10b981" />
                        <span>Zero-Downtime Pipeline: Verified</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <CheckCircle2 size={13} color="#10b981" />
                        <span>Security: SOC 2 & ISO-27001 Aligned</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,102,255,0.18)' }}>
                    <div style={{ color: '#00d4ff', fontWeight: 700, marginBottom: 6 }}>
                      $ runtime.architecture()
                    </div>
                    <div style={{ color: '#cbd5e1', lineHeight: 1.6 }}>
                      Stack: [TypeScript, React, Django, Python, Docker, Kubernetes, PostgreSQL, ClickHouse, Redis, Kafka]
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlueEnergyFlow flip />

      {/* ── 4. CORE DNA & VALUES (INTERACTIVE LASER CARDS) ── */}
      <section
        style={{
          padding: 'clamp(5rem, 9vw, 8rem) 0',
          position: 'relative',
          background: 'linear-gradient(180deg, #000000 0%, #020614 50%, #000000 100%)',
        }}
      >
        <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)' }}>
          {/* Header */}
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
              <Cpu size={13} color="#22d3ee" />
              <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#e0f2fe' }}>
                Our Core DNA
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 16px' }}>
              Principles That Drive{' '}
              <span style={{ background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Every Line of Code
              </span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, margin: '0 auto', maxWidth: 560 }}>
              We operate under unwavering standards that prioritize durability, speed, and real business impact.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 20 }}>
            {CORE_VALUES.map((v, i) => {
              const Icon = v.icon
              return (
                <div
                  key={i}
                  style={{
                    borderRadius: 22,
                    background: 'rgba(5, 10, 24, 0.8)',
                    border: '1px solid rgba(0, 102, 255, 0.2)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = `${v.color}66`
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = `0 20px 45px rgba(0,0,0,0.8), 0 0 30px ${v.color}25`
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 102, 255, 0.2)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  <div style={{ height: 3, background: `linear-gradient(90deg, ${v.color}, transparent)` }} />
                  <div style={{ padding: '28px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: `${v.color}18`,
                        border: `1px solid ${v.color}40`,
                        boxShadow: `0 0 20px ${v.color}25`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: v.color,
                        marginBottom: 18,
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
                      {v.title}
                    </h3>
                    <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.65 }}>
                      {v.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 5. LEADERSHIP TEAM (EXPANDED CARDS) ── */}
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
              <Users size={13} color="#22d3ee" />
              <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#e0f2fe' }}>
                Leadership & Architects
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 16px' }}>
              World-Class Builders{' '}
              <span style={{ background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Behind Code Astro
              </span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, margin: '0 auto', maxWidth: 560 }}>
              A collective of veteran system architects, product designers, and AI engineers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 24 }}>
            {team.map((member: any, i: number) => (
              <div
                key={i}
                style={{
                  borderRadius: 22,
                  background: 'rgba(5, 10, 24, 0.8)',
                  border: '1px solid rgba(0, 102, 255, 0.2)',
                  overflow: 'hidden',
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20 }}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 16,
                      background: 'linear-gradient(135deg, #0066ff, #00d4ff)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      boxShadow: '0 0 25px rgba(0, 102, 255, 0.4)',
                      flexShrink: 0,
                    }}
                  >
                    {member.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 4 }}>
                      {member.name}
                    </h3>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {member.role}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.65, marginBottom: 24, flexGrow: 1 }}>
                  {member.bio}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(0, 102, 255, 0.15)' }}>
                  <span style={{ fontSize: '0.74rem', color: '#64748b' }}>Connect:</span>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>
                    <LinkedinIcon size={16} />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>
                    <GithubIcon size={16} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>
                    <TwitterIcon size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. BOTTOM CTA (HOMEPAGE MATCHING) ── */}
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
            Partner With Us
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: 16 }}>
            Ready to Build Something <br />
            <span style={{ background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Extraordinary?
            </span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, marginBottom: 36 }}>
            Partner with a software engineering firm that operates as your strategic technology accelerator.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '13px 32px', fontSize: '0.98rem' }}>
              Start a Conversation <ArrowRight size={16} />
            </Link>
            <Link to="/services" className="btn btn-ghost" style={{ padding: '13px 28px', fontSize: '0.98rem' }}>
              View All Capabilities
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
