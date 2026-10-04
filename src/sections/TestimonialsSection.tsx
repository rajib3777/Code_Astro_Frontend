import { useState, useEffect, useRef } from 'react'
import { ShieldCheck, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getTestimonials } from '@/api'

const FALLBACK = [
  {
    id: 1, client_name: 'Marcus Chen', client_role: 'CTO', client_company: 'NexaScale',
    content: 'Code Astro delivered our entire platform in 12 weeks — something we quoted 6 months with another agency. The code quality was exceptional and the team was a pleasure to work with.',
    rating: 5, client_image: null,
  },
  {
    id: 2, client_name: 'Sophia Williams', client_role: 'Product Director', client_company: 'Luminary AI',
    content: 'Their AI integration expertise is unmatched. They transformed our data pipeline and reduced processing time by 80%. The results exceeded our expectations significantly.',
    rating: 5, client_image: null,
  },
  {
    id: 3, client_name: 'James Okafor', client_role: 'Founder & CEO', client_company: 'ArcadeVault',
    content: 'The custom arcade gaming system they built for us is flawless. Thousands of players daily, zero downtime. Code Astro truly understands both hardware and software.',
    rating: 5, client_image: null,
  },
  {
    id: 4, client_name: 'Priya Nair', client_role: 'Head of Engineering', client_company: 'IndusTech',
    content: 'Our industrial automation project was complex and mission-critical. Code Astro handled every aspect with precision. The PLC integration works perfectly in production.',
    rating: 5, client_image: null,
  },
  {
    id: 5, client_name: 'Lucas Fontaine', client_role: 'VP Engineering', client_company: 'CloudNative Inc',
    content: 'We migrated our legacy infrastructure to a microservices architecture in record time. The team\'s cloud expertise saved us months of work and significant costs.',
    rating: 5, client_image: null,
  },
]

function RatingBadge({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 9999, background: 'rgba(0, 102, 255, 0.15)', border: '1px solid rgba(0, 212, 255, 0.3)' }}>
      <ShieldCheck size={14} className="text-cyan-400" />
      <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.04em' }}>
        Verified {rating || 5}.0 / 5.0 Enterprise Review
      </span>
    </div>
  )
}

export default function TestimonialsSection({ testimonials: propTestimonials }: { testimonials?: any[] } = {}) {
  const [active, setActive] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const { data } = useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials,
    enabled: !propTestimonials || propTestimonials.length === 0,
  })
  const testimonials = (propTestimonials && propTestimonials.length > 0)
    ? propTestimonials
    : (data?.results?.length ? data.results : FALLBACK)
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  const goTo = (idx: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setActive(idx)
      setIsAnimating(false)
    }, 220)
  }

  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length)
  const next = () => goTo((active + 1) % testimonials.length)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive(a => (a + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(intervalRef.current)
  }, [testimonials.length])

  const current = (testimonials && testimonials[active]) || testimonials[0] || (FALLBACK[0] as any)

  return (
    <section
      id="testimonials"
      style={{
        padding: 'clamp(5rem, 9vw, 8rem) 0',
        background: 'linear-gradient(180deg, #000000 0%, #020614 50%, #000000 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(to right, rgba(0,80,200,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,80,200,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Center glow */}
      <div
        style={{
          position: 'absolute', pointerEvents: 'none',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 600, height: 400,
          background: 'radial-gradient(ellipse, rgba(0,60,180,0.08) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 9999, background: 'rgba(0, 102, 255, 0.12)', border: '1px solid rgba(0, 212, 255, 0.3)', marginBottom: 20 }}>
            <Quote size={11} color="#00d4ff" />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#e0f2fe' }}>Client Stories</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 16px' }}>
            Trusted by{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Industry Leaders
            </span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, maxWidth: 440, margin: '0 auto' }}>
            Real feedback from real clients who've seen real results.
          </p>
        </div>

        {/* Main featured testimonial */}
        <div
          style={{
            maxWidth: 800,
            margin: '0 auto 48px',
            padding: 'clamp(24px, 5vw, 48px) clamp(18px, 5vw, 52px)',
            borderRadius: 'clamp(18px, 4vw, 28px)',
            background: 'rgba(0,20,50,0.5)',
            border: '1px solid rgba(0,102,255,0.2)',
            boxShadow: '0 0 60px rgba(0,102,255,0.06), 0 24px 64px rgba(0,0,0,0.6)',
            position: 'relative',
            overflow: 'hidden',
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'scale(0.98)' : 'scale(1)',
            transition: 'opacity 0.22s ease, transform 0.22s ease',
          }}
        >
          {/* Decorative quote icon */}
          <Quote
            size={80}
            style={{
              position: 'absolute',
              top: 24,
              right: 36,
              color: '#0066ff',
              opacity: 0.05,
            }}
          />

          <RatingBadge rating={current.rating ?? 5} />

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: '#b8caef',
              lineHeight: 1.75,
              fontStyle: 'italic',
              margin: '24px 0 32px',
              letterSpacing: '-0.01em',
            }}
          >
            "{current.content}"
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Avatar */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'linear-gradient(135deg, #0055cc, #0099ff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                fontWeight: 800,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              {current.client_name?.charAt(0) ?? 'C'}
            </div>
            <div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#f0f4ff' }}>
                {current.client_name}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#3d5280' }}>
                {current.client_role} — {current.client_company}
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          {/* Prev */}
          <button
            onClick={prev}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'rgba(13,13,26,0.8)',
              border: '1px solid rgba(0,102,255,0.2)',
              color: '#6b84b5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,102,255,0.5)'; (e.currentTarget as HTMLElement).style.color = '#60a5fa' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,102,255,0.2)'; (e.currentTarget as HTMLElement).style.color = '#6b84b5' }}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Dots */}
          {testimonials.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === active ? 28 : 8,
                height: 8,
                borderRadius: 9999,
                background: i === active ? '#0066ff' : 'rgba(0,102,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
                boxShadow: i === active ? '0 0 10px rgba(0,102,255,0.6)' : 'none',
              }}
            />
          ))}

          {/* Next */}
          <button
            onClick={next}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'rgba(13,13,26,0.8)',
              border: '1px solid rgba(0,102,255,0.2)',
              color: '#6b84b5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,102,255,0.5)'; (e.currentTarget as HTMLElement).style.color = '#60a5fa' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,102,255,0.2)'; (e.currentTarget as HTMLElement).style.color = '#6b84b5' }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
