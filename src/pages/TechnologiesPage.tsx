import { useState, useMemo } from 'react'
import PageHeroOrb from '@/components/ui/PageHeroOrb'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { getTechnologies } from '@/api'
import { Link } from 'react-router-dom'
import { ArrowRight, Cpu, Server, Cloud, Terminal, ExternalLink, ShieldCheck } from 'lucide-react'
import BlueEnergyFlow from '@/components/ui/BlueEnergyFlow'

const CATEGORIES = [
  { id: 'all', label: 'All Technologies' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'database', label: 'Databases' },
  { id: 'ai', label: 'AI & ML' },
]

const FALLBACK_TECHS = [
  { id: 1, name: 'React', slug: 'react', category: 'frontend', description: 'Component-driven reactive UIs with cutting-edge server components.', color: '#61dafb', website_url: 'https://react.dev', proficiency: 96 },
  { id: 2, name: 'Next.js', slug: 'nextjs', category: 'frontend', description: 'Enterprise React framework with hybrid SSR/SSG and streaming architecture.', color: '#93c5fd', website_url: 'https://nextjs.org', proficiency: 92 },
  { id: 3, name: 'TypeScript', slug: 'typescript', category: 'frontend', description: 'End-to-end type safety for rock-solid refactoring and zero runtime bugs.', color: '#3b82f6', website_url: 'https://typescriptlang.org', proficiency: 95 },
  { id: 4, name: 'Tailwind CSS', slug: 'tailwind', category: 'frontend', description: 'Utility-first modern styling for bespoke design system implementations.', color: '#22d3ee', website_url: 'https://tailwindcss.com', proficiency: 98 },
  { id: 5, name: 'Django', slug: 'django', category: 'backend', description: 'High-level Python web framework for clean, rapid, and scalable backends.', color: '#4ade80', website_url: 'https://djangoproject.com', proficiency: 95 },
  { id: 6, name: 'Python', slug: 'python', category: 'backend', description: 'Versatile, high-performance ecosystem for APIs, asynchronous tasks, and ML.', color: '#60a5fa', website_url: 'https://python.org', proficiency: 96 },
  { id: 7, name: 'Node.js', slug: 'nodejs', category: 'backend', description: 'Asynchronous event-driven JavaScript runtime for real-time microservices.', color: '#86efac', website_url: 'https://nodejs.org', proficiency: 90 },
  { id: 8, name: 'FastAPI', slug: 'fastapi', category: 'backend', description: 'Modern, high-performance web framework for building APIs with Python 3.8+.', color: '#34d399', website_url: 'https://fastapi.tiangolo.com', proficiency: 92 },
  { id: 9, name: 'PostgreSQL', slug: 'postgresql', category: 'database', description: 'World-class relational database with advanced JSON, vector, and indexing support.', color: '#818cf8', website_url: 'https://postgresql.org', proficiency: 94 },
  { id: 10, name: 'Redis', slug: 'redis', category: 'database', description: 'In-memory data structure store used as a database, cache, and message broker.', color: '#f87171', website_url: 'https://redis.io', proficiency: 90 },
  { id: 11, name: 'Flutter', slug: 'flutter', category: 'mobile', description: 'Multi-platform framework natively compiled for iOS, Android, and web.', color: '#38bdf8', website_url: 'https://flutter.dev', proficiency: 88 },
  { id: 12, name: 'React Native', slug: 'react-native', category: 'mobile', description: 'Cross-platform mobile apps with native UI components and shared TypeScript.', color: '#7dd3fc', website_url: 'https://reactnative.dev', proficiency: 86 },
  { id: 13, name: 'AWS Cloud', slug: 'aws', category: 'cloud', description: 'Comprehensive enterprise cloud infrastructure, serverless compute, and S3.', color: '#fbbf24', website_url: 'https://aws.amazon.com', proficiency: 92 },
  { id: 14, name: 'Docker & Kubernetes', slug: 'docker-k8s', category: 'cloud', description: 'Container orchestration, reproducible builds, and automated scaling.', color: '#60a5fa', website_url: 'https://docker.com', proficiency: 94 },
  { id: 15, name: 'PyTorch & LLMs', slug: 'pytorch-llms', category: 'ai', description: 'Deep learning frameworks, fine-tuning, embeddings, and LangChain pipelines.', color: '#f472b6', website_url: 'https://pytorch.org', proficiency: 88 },
]


export default function TechnologiesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { data: techData } = useQuery({ queryKey: ['technologies'], queryFn: () => getTechnologies() })

  const technologies = techData?.results?.length ? techData.results : FALLBACK_TECHS

  const filteredTechs = useMemo(() => {
    return technologies.filter((tech: any) => {
      if (selectedCategory === 'all') return true
      if (selectedCategory === 'cloud' && (tech.category === 'cloud' || tech.category === 'devops')) return true
      return tech.category === selectedCategory
    })
  }, [technologies, selectedCategory])

  return (
    <>
      <Helmet>
        <title>Technology Stack & Infrastructure — Code Astro</title>
        <meta name="description" content="Explore Code Astro's modern technology stack: React, TypeScript, Python, Django, Cloud Architecture, DevOps, and AI." />
      </Helmet>

      {/* ── 1. HERO SECTION (GUARANTEED NAVBAR CLEARANCE) ── */}
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
            <Cpu size={15} color="#00d4ff" />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e0f2fe' }}>
              Production-Grade Infrastructure
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
            Our Core <br />
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
              Technology Stack
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
            We select our tech stack deliberately: battle-tested frameworks that offer unprecedented speed of delivery without sacrificing resilience, security, or long-term maintainability.
          </p>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
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

      {/* ── 2. TECH CARDS GRID ── */}
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 20,
            }}
          >
            {filteredTechs.map((tech: any, i: number) => {
              const color = tech.color || '#0066ff'
              const proficiency = tech.proficiency || 92

              return (
                <div
                  key={tech.id || i}
                  style={{
                    borderRadius: 22,
                    background: 'rgba(5, 10, 24, 0.8)',
                    border: '1px solid rgba(0, 102, 255, 0.2)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 24,
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = `${color}66`
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = `0 20px 45px rgba(0,0,0,0.8), 0 0 30px ${color}22`
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 102, 255, 0.2)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 12,
                            background: `${color}18`,
                            border: `1px solid ${color}40`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: color,
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            fontFamily: 'var(--font-mono)',
                            boxShadow: `0 0 16px ${color}20`,
                          }}
                        >
                          {tech.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 2 }}>
                            {tech.name}
                          </h3>
                          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            {tech.category}
                          </span>
                        </div>
                      </div>

                      {tech.website_url && (
                        <a
                          href={tech.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#64748b', transition: 'color 0.2s', padding: 4 }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#00d4ff'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}
                          title="Official Documentation"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>

                    <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.65, marginBottom: 20 }}>
                      {tech.description || `Enterprise architecture, custom deployment, and scaling with ${tech.name}.`}
                    </p>
                  </div>

                  {/* Proficiency Gauge */}
                  <div style={{ paddingTop: 14, borderTop: '1px solid rgba(0, 102, 255, 0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: 6 }}>
                      <span style={{ color: '#64748b', fontWeight: 600 }}>Lab Proficiency</span>
                      <span style={{ color, fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{proficiency}%</span>
                    </div>
                    <div style={{ height: 6, width: '100%', borderRadius: 9999, background: 'rgba(0,0,0,0.5)', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${proficiency}%`,
                          borderRadius: 9999,
                          background: `linear-gradient(90deg, #0066ff, ${color})`,
                          boxShadow: `0 0 10px ${color}`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <BlueEnergyFlow flip />

      {/* ── 3. ARCHITECTURE PHILOSOPHY ── */}
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
              <ShieldCheck size={13} color="#22d3ee" />
              <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#e0f2fe' }}>
                Engineering Rigor
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 16px' }}>
              How We Maintain{' '}
              <span style={{ background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Stack Integrity
              </span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, margin: '0 auto', maxWidth: 560 }}>
              We do not chase ephemeral hype. We invest heavily in technologies with strong typing, robust documentation, and decades of production longevity.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 24 }}>
            {[
              { icon: Cpu, title: 'Full-Stack Type Safety', desc: 'From database schemas and API contracts to UI components, strict typing eliminates runtime errors before release.', color: '#0066ff' },
              { icon: Cloud, title: 'Cloud Agnostic Orchestration', desc: 'Containerized with Docker and orchestrated with Kubernetes to eliminate cloud lock-in and enable seamless hybrid deployment.', color: '#00d4ff' },
              { icon: Terminal, title: 'Automated CI/CD Verification', desc: 'Every commit undergoes automated linting, test suites, static vulnerability scanning, and ephemeral staging previews.', color: '#38bdf8' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  style={{
                    borderRadius: 22,
                    background: 'rgba(5, 10, 24, 0.8)',
                    border: '1px solid rgba(0, 102, 255, 0.2)',
                    padding: 28,
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
                      color: '#ffffff',
                      boxShadow: '0 0 25px rgba(0, 102, 255, 0.4)',
                      margin: '0 auto 18px',
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 8 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.65 }}>
                    {item.desc}
                  </p>
                </div>
              )
            })}
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
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: 16 }}>
            Have Specific <span style={{ background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Technical Requirements?</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, marginBottom: 36 }}>
            Whether you require legacy modernization, custom hardware telemetry, or specialized AI pipelines, let's talk.
          </p>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '13px 32px', fontSize: '0.98rem' }}>
            Discuss Your Architecture <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
