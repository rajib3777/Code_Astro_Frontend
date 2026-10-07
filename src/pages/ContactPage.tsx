import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getSiteSettings, submitContact } from '@/api'
import { Send, Mail, Phone, MapPin, CheckCircle, ArrowRight, MessageSquare, Zap, Clock, ShieldCheck } from 'lucide-react'

const PROJECT_TYPES = [
  'Custom Software Development',
  'Mobile App Development',
  'E-commerce Solutions',
  'Web Development',
  'Training & Earning',
  'AI Automation',
  'Remote Developer Hiring',
  'Website Malware Detection & Removal',
]

const BUDGET_RANGES = [
  '< $25K',
  '$25K – $75K',
  '$75K – $200K',
  '$200K – $500K',
  '$500K+',
  "Let's discuss",
]

import PageHeroOrb from '@/components/ui/PageHeroOrb'

export default function ContactPage() {
  const { data: settings } = useQuery({ queryKey: ['site-settings'], queryFn: getSiteSettings })
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', project_type: '', budget: '', message: '' })
  const [success, setSuccess] = useState(false)

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      setSuccess(true)
      setForm({ name: '', email: '', company: '', phone: '', project_type: '', budget: '', message: '' })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(form)
  }

  return (
    <>
      <Helmet>
        <title>Contact — Code Astro | Start an Engineering Partnership</title>
        <meta name="description" content="Start a project with Code Astro. Tell us about your vision and our senior architects will respond within 24 hours." />
      </Helmet>

      {/* ── Mobile Responsive Overrides ── */}
      <style>{`
        @media (max-width: 640px) {
          .contact-hero-h1 { font-size: 1.75rem !important; line-height: 1.1 !important; }
          .contact-form-cols { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 400px) {
          .contact-hero-h1 { font-size: 1.45rem !important; }
        }
      `}</style>

      {/* ── 1. HERO SECTION (GUARANTEED TOP CLEARANCE) ── */}
      <section
        style={{
          background: '#000000',
          paddingTop: 'clamp(90px, 14vw, 190px)',
          paddingBottom: 'clamp(50px, 7vw, 80px)',
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
            <Zap size={15} color="#00d4ff" />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e0f2fe' }}>
              Direct Channels // Architecture Inquiries
            </span>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 10px #00d4ff' }} className="animate-pulse" />
          </div>

          <h1
            className="contact-hero-h1"
            style={{
              fontSize: 'clamp(1.8rem, 5.5vw, 4.8rem)',
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: '-0.035em',
              color: '#ffffff',
              margin: '0 auto 24px',
              maxWidth: 900,
            }}
          >
            Let's Build Something <br />
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
              Extraordinary
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
              color: '#94a3b8',
              lineHeight: 1.7,
              maxWidth: 720,
              margin: '0 auto',
            }}
          >
            Tell us about your technical brief, timeline, and vision. Our senior engineering leads will evaluate your requirements and provide an architectural assessment within 24 hours.
          </p>
        </div>
      </section>

      {/* ── 2. MAIN INTERACTIVE CONSULTATION HUB ── */}
      <section
        style={{
          padding: 'clamp(3rem, 6vw, 6rem) 0 clamp(5rem, 8vw, 8rem)',
          background: 'linear-gradient(180deg, #000000 0%, #030818 50%, #000000 100%)',
          position: 'relative',
        }}
      >
        <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 36, alignItems: 'start' }}>

            {/* ── Left Column: Direct Channels & SLA ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Channels Card */}
              <div
                style={{
                  borderRadius: 24,
                  background: 'rgba(5, 10, 24, 0.85)',
                  border: '1px solid rgba(0, 102, 255, 0.22)',
                  boxShadow: '0 12px 35px rgba(0,0,0,0.6)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ height: 3, background: 'linear-gradient(90deg, #0066ff, #00d4ff)' }} />
                <div style={{ padding: '28px 24px' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 8 }}>
                    Direct Channels
                  </h2>
                  <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: 24 }}>
                    Whether you need enterprise consultation, cloud scaling, or bespoke firmware development, our engineering directors are ready.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {settings?.email && (
                      <a
                        href={`mailto:${settings.email}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 16,
                          padding: '14px 16px',
                          borderRadius: 14,
                          background: 'rgba(0, 0, 0, 0.4)',
                          border: '1px solid rgba(0, 102, 255, 0.18)',
                          textDecoration: 'none',
                          transition: 'all 0.25s ease',
                        }}
                        onMouseEnter={e => {
                          ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 212, 255, 0.45)'
                          ;(e.currentTarget as HTMLElement).style.background = 'rgba(0, 102, 255, 0.1)'
                        }}
                        onMouseLeave={e => {
                          ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 102, 255, 0.18)'
                          ;(e.currentTarget as HTMLElement).style.background = 'rgba(0, 0, 0, 0.4)'
                        }}
                      >
                        <div
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: 12,
                            background: 'rgba(0, 102, 255, 0.15)',
                            border: '1px solid rgba(0, 212, 255, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#00d4ff',
                            flexShrink: 0,
                          }}
                        >
                          <Mail size={18} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            Email Dispatch
                          </div>
                          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
                            {settings.email}
                          </div>
                        </div>
                      </a>
                    )}

                    {settings?.phone && (
                      <a
                        href={`tel:${settings.phone}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 16,
                          padding: '14px 16px',
                          borderRadius: 14,
                          background: 'rgba(0, 0, 0, 0.4)',
                          border: '1px solid rgba(0, 102, 255, 0.18)',
                          textDecoration: 'none',
                          transition: 'all 0.25s ease',
                        }}
                        onMouseEnter={e => {
                          ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 212, 255, 0.45)'
                          ;(e.currentTarget as HTMLElement).style.background = 'rgba(0, 102, 255, 0.1)'
                        }}
                        onMouseLeave={e => {
                          ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 102, 255, 0.18)'
                          ;(e.currentTarget as HTMLElement).style.background = 'rgba(0, 0, 0, 0.4)'
                        }}
                      >
                        <div
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: 12,
                            background: 'rgba(0, 102, 255, 0.15)',
                            border: '1px solid rgba(0, 212, 255, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#00d4ff',
                            flexShrink: 0,
                          }}
                        >
                          <Phone size={18} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            Direct Phone
                          </div>
                          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
                            {settings.phone}
                          </div>
                        </div>
                      </a>
                    )}

                    {settings?.city && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 16,
                          padding: '14px 16px',
                          borderRadius: 14,
                          background: 'rgba(0, 0, 0, 0.4)',
                          border: '1px solid rgba(0, 102, 255, 0.18)',
                        }}
                      >
                        <div
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: 12,
                            background: 'rgba(0, 102, 255, 0.15)',
                            border: '1px solid rgba(0, 212, 255, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#00d4ff',
                            flexShrink: 0,
                          }}
                        >
                          <MapPin size={18} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            Global Studio
                          </div>
                          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
                            {settings.city}, {settings.country}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Protocol Card */}
              <div
                style={{
                  borderRadius: 24,
                  background: 'rgba(5, 10, 24, 0.85)',
                  border: '1px solid rgba(0, 102, 255, 0.22)',
                  padding: '24px 24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <ShieldCheck size={18} color="#00d4ff" />
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
                    Response Protocol & SLA
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { step: '01', title: 'Architecture Review', desc: 'Requirements analysis and tech stack feasibility.' },
                    { step: '02', title: 'Technical Sync (30 min)', desc: 'Direct discovery call with a Principal Engineer.' },
                    { step: '03', title: 'Sprint Roadmap & Scope', desc: 'Granular timeline, milestone budget, and deliverables.' },
                  ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <span
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 8,
                          background: 'rgba(0, 102, 255, 0.2)',
                          border: '1px solid rgba(0, 212, 255, 0.4)',
                          color: '#00d4ff',
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        {s.step}
                      </span>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>{s.title}</div>
                        <div style={{ fontSize: '0.76rem', color: '#64748b' }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right Column: Interactive Consultation Form ── */}
            <div>
              {success ? (
                <div
                  style={{
                    borderRadius: 24,
                    background: 'rgba(5, 12, 28, 0.95)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 35px rgba(16, 185, 129, 0.2)',
                    padding: '48px 32px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#10b981',
                      margin: '0 auto 20px',
                    }}
                  >
                    <CheckCircle size={32} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: 12 }}>
                    Brief Transmitted Successfully
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: 440, margin: '0 auto 28px' }}>
                    Thank you for reaching out. Our engineering directors are reviewing your project specifications and will reply within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="btn btn-ghost"
                    style={{ padding: '12px 28px' }}
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    borderRadius: 24,
                    background: 'rgba(5, 10, 24, 0.85)',
                    border: '1px solid rgba(0, 102, 255, 0.25)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 35px rgba(0, 102, 255, 0.15)',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ height: 3, background: 'linear-gradient(90deg, #0066ff, #00d4ff)' }} />
                  <div style={{ padding: '36px 32px' }}>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(0, 102, 255, 0.15)' }}>
                      Project Specifications
                    </h2>

                    {/* Inputs Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 16, marginBottom: 20 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 8 }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="Alex Mercer"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: 12,
                            background: 'rgba(0, 0, 0, 0.5)',
                            border: '1px solid rgba(0, 102, 255, 0.22)',
                            color: '#ffffff',
                            fontSize: '0.9rem',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 8 }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          placeholder="alex@enterprise.com"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: 12,
                            background: 'rgba(0, 0, 0, 0.5)',
                            border: '1px solid rgba(0, 102, 255, 0.22)',
                            color: '#ffffff',
                            fontSize: '0.9rem',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 8 }}>
                          Company / Venture
                        </label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                          placeholder="Acme Global Inc."
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: 12,
                            background: 'rgba(0, 0, 0, 0.5)',
                            border: '1px solid rgba(0, 102, 255, 0.22)',
                            color: '#ffffff',
                            fontSize: '0.9rem',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 8 }}>
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          placeholder="+1 (555) 000-0000"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: 12,
                            background: 'rgba(0, 0, 0, 0.5)',
                            border: '1px solid rgba(0, 102, 255, 0.22)',
                            color: '#ffffff',
                            fontSize: '0.9rem',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>

                    {/* Project Category Pills */}
                    <div style={{ marginBottom: 20 }}>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 10 }}>
                        Project Scope / Category
                      </label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {PROJECT_TYPES.map(t => {
                          const active = form.project_type === t
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setForm(f => ({ ...f, project_type: t }))}
                              style={{
                                padding: '8px 16px',
                                borderRadius: 9999,
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                background: active ? 'linear-gradient(135deg, #0066ff, #00d4ff)' : 'rgba(0,0,0,0.4)',
                                color: active ? '#ffffff' : '#94a3b8',
                                border: active ? '1px solid rgba(0, 212, 255, 0.6)' : '1px solid rgba(0, 102, 255, 0.2)',
                                boxShadow: active ? '0 0 20px rgba(0, 102, 255, 0.4)' : 'none',
                              }}
                            >
                              {t}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Estimated Budget Range */}
                    <div style={{ marginBottom: 20 }}>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 10 }}>
                        Estimated Budget Range
                      </label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {BUDGET_RANGES.map(b => {
                          const active = form.budget === b
                          return (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setForm(f => ({ ...f, budget: b }))}
                              style={{
                                padding: '8px 16px',
                                borderRadius: 9999,
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                background: active ? 'linear-gradient(135deg, #0066ff, #00d4ff)' : 'rgba(0,0,0,0.4)',
                                color: active ? '#ffffff' : '#94a3b8',
                                border: active ? '1px solid rgba(0, 212, 255, 0.6)' : '1px solid rgba(0, 102, 255, 0.2)',
                                boxShadow: active ? '0 0 20px rgba(0, 102, 255, 0.4)' : 'none',
                              }}
                            >
                              {b}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Overview Message */}
                    <div style={{ marginBottom: 28 }}>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 8 }}>
                        Project Goals & Architectural Requirements *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="Describe your technical brief, expected scale, target platforms, and key milestones..."
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: 12,
                          background: 'rgba(0, 0, 0, 0.5)',
                          border: '1px solid rgba(0, 102, 255, 0.22)',
                          color: '#ffffff',
                          fontSize: '0.9rem',
                          outline: 'none',
                          resize: 'vertical',
                        }}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        padding: '15px 28px',
                        fontSize: '1rem',
                        fontWeight: 700,
                        boxShadow: '0 0 35px rgba(0, 102, 255, 0.6)',
                      }}
                    >
                      {mutation.isPending ? 'Transmitting Brief...' : (
                        <>
                          <Send size={16} /> Submit Project Brief
                        </>
                      )}
                    </button>

                    {mutation.isError && (
                      <p style={{ marginTop: 14, fontSize: '0.78rem', color: '#ef4444', textAlign: 'center' }}>
                        Failed to submit. Please reach out directly to {settings?.email || 'contact@codeastro.io'}.
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
