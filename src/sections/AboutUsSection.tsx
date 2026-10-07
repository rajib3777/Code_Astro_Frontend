import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Code2, Award, Globe } from 'lucide-react'

const STATS = [
  { val: '200+', label: 'Projects Delivered', icon: Code2 },
  { val: '50+',  label: 'Global Clients',     icon: Globe },
  { val: '8+',   label: 'Years Experience',   icon: Award },
  { val: '30+',  label: 'Team Members',       icon: Users },
]

const VALUES = [
  {
    title: 'Precision Engineering',
    desc: 'Every feature is built to spec, tested rigorously, and delivered on time. No shortcuts.',
    color: '#0066ff',
  },
  {
    title: 'Design Excellence',
    desc: 'Beautiful interfaces that are also intuitive. We believe great UX is never a luxury.',
    color: '#0088ff',
  },
  {
    title: 'Scalable Architecture',
    desc: 'Systems designed to grow from zero to millions of users without breaking.',
    color: '#00aaff',
  },
  {
    title: 'Full Transparency',
    desc: 'You always know what\'s happening with your project — real-time updates, zero surprises.',
    color: '#00ccff',
  },
]

export default function AboutUsSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.02, rootMargin: '120px 0px' }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="about"
      className="sec"
      style={{
        background: 'linear-gradient(180deg, #02020a 0%, #000000 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,80,200,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,80,200,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Right glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: '-8%',
          top: '20%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(0,80,200,0.09) 0%, transparent 65%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="wrap relative" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* Left: Text block */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(36px)',
              transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <div className="section-label" style={{ display: 'inline-flex', marginBottom: 20 }}>
              About Code Astro
            </div>

            <h2 className="t-display text-white mb-6" style={{ letterSpacing: '-0.03em' }}>
              We Are a Team of{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Digital Builders
              </span>
            </h2>

            <p className="t-body mb-5" style={{ color: '#6b84b5', maxWidth: 520 }}>
              Founded with a mission to make elite software engineering accessible to every ambitious company. We combine startup speed with enterprise-grade quality.
            </p>
            <p className="t-body mb-8" style={{ color: '#3d5280', maxWidth: 520 }}>
              Our team specializes in custom software development, mobile apps, e-commerce, web development, and AI-powered automation. We don't just write code — we engineer business outcomes.
            </p>

            <Link to="/about" className="btn btn-primary" style={{ gap: 8 }}>
              Meet the Team
              <ArrowRight size={15} />
            </Link>

            {/* Values grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 12, marginTop: 32 }}>
              {VALUES.map((v, i) => (
                <div
                  key={i}
                  style={{
                    padding: '18px 20px',
                    borderRadius: 16,
                    background: 'rgba(13,13,26,0.7)',
                    border: '1px solid rgba(0,102,255,0.1)',
                    transition: 'all 0.3s ease',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${0.15 + i * 0.07}s`,
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = `${v.color}40`
                    el.style.boxShadow = `0 8px 28px ${v.color}15`
                    el.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'rgba(0,102,255,0.1)'
                    el.style.boxShadow = 'none'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: v.color, marginBottom: 10, boxShadow: `0 0 8px ${v.color}` }} />
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#b8caef', marginBottom: 5, letterSpacing: '-0.01em' }}>
                    {v.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#3d5280', lineHeight: 1.6 }}>
                    {v.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats + visual */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(36px)',
              transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s',
            }}
          >
            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))', gap: 12, marginBottom: 24 }}>
              {STATS.map((s, i) => {
                const Icon = s.icon
                const color = ['#0066ff', '#0088ff', '#00aaff', '#00ccff'][i]
                return (
                  <div
                    key={i}
                    style={{
                      padding: 'clamp(18px, 4vw, 28px) clamp(14px, 3vw, 24px)',
                      borderRadius: 20,
                      background: 'rgba(13,13,26,0.8)',
                      border: '1px solid rgba(0,102,255,0.12)',
                      textAlign: 'center',
                      transition: 'all 0.35s ease',
                      opacity: visible ? 1 : 0,
                      transitionDelay: `${0.2 + i * 0.08}s`,
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = `${color}40`
                      el.style.boxShadow = `0 12px 36px ${color}15`
                      el.style.transform = 'translateY(-4px)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'rgba(0,102,255,0.12)'
                      el.style.boxShadow = 'none'
                      el.style.transform = 'translateY(0)'
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: `${color}18`,
                        border: `1px solid ${color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 12px',
                      }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div
                      style={{
                        fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.04em',
                        background: 'linear-gradient(135deg, #fff 0%, #60a5fa 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        lineHeight: 1,
                        marginBottom: 6,
                      }}
                    >
                      {s.val}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3d5280', letterSpacing: '0.02em' }}>
                      {s.label}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Big quote card */}
            <div
              style={{
                padding: '28px 32px',
                borderRadius: 20,
                background: 'rgba(0,34,80,0.3)',
                border: '1px solid rgba(0,102,255,0.2)',
                boxShadow: '0 0 40px rgba(0,102,255,0.08)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 120,
                  height: 120,
                  background: 'radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
              <div style={{ fontSize: '3rem', color: '#0066ff', lineHeight: 1, marginBottom: 12, opacity: 0.5 }}>"</div>
              <p style={{ fontSize: '1rem', color: '#b8caef', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 16 }}>
                We don't just deliver software. We deliver competitive advantages that our clients can build their futures on.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #0066ff, #00aaff)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: '#fff',
                  }}
                >
                  CA
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#b8caef' }}>Founders, Code Astro</div>
                  <div style={{ fontSize: '0.72rem', color: '#3d5280' }}>Engineering Leadership</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
