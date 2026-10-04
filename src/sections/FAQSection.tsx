import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFAQs } from '@/api'
import { HelpCircle, ChevronDown, MessageSquare, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const FALLBACK_FAQS = [
  {
    id: 1,
    question: 'What types of software engineering projects does Code Astro specialize in?',
    answer:
      'Code Astro specializes in high-concurrency cloud applications, custom arcade & gaming hardware/software systems, industrial IoT telemetry, and enterprise microservices. We handle the entire lifecycle from architecture and security audits to production deployment.',
    category: 'General',
  },
  {
    id: 2,
    question: 'How fast can Code Astro deploy a dedicated engineering team for our project?',
    answer:
      'We can typically assemble and onboard a senior engineering team within 1 to 2 weeks. Every squad includes a principal architect, senior full-stack developers, and automated QA engineers equipped with modern CI/CD pipelines.',
    category: 'Process',
  },
  {
    id: 3,
    question: 'How do you ensure data security and regulatory compliance?',
    answer:
      'Security is baked into our code from Day 1. We practice strict zero-trust IAM, end-to-end payload encryption (AES-256 / ChaCha20), automated vulnerability scanning, and compliance readiness for SOC-2 Type II, HIPAA, and GDPR.',
    category: 'Security',
  },
  {
    id: 4,
    question: 'Can Code Astro integrate with our existing legacy infrastructure and databases?',
    answer:
      'Yes. We regularly build high-performance middleware and reverse-proxy adapters that interface modern GraphQL/REST frontends with legacy SQL, mainframe, or on-premise industrial PLCs without downtime.',
    category: 'Architecture',
  },
  {
    id: 5,
    question: 'What are your engagement and billing models?',
    answer:
      'We offer flexible engagement structures tailored to project scale: Dedicated Engineering Pods (monthly sprint velocity), Fixed-Scope Milestone Deliveries, and Strategic Architectural Consulting.',
    category: 'Pricing',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { data } = useQuery({ queryKey: ['faqs'], queryFn: getFAQs })

  const rawFaqs = data?.results && data.results.length > 0 ? data.results : FALLBACK_FAQS
  const faqs = rawFaqs.map((f: any, i: number) => ({
    id: f.id ?? i,
    question: f.question,
    answer: f.answer,
    category: f.category || 'General',
  }))

  const toggle = (idx: number) => {
    setOpenIndex(current => (current === idx ? null : idx))
  }

  return (
    <section
      id="faq"
      style={{
        padding: 'clamp(5rem, 9vw, 8rem) 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #000000 0%, #020512 50%, #000000 100%)',
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: 'absolute', pointerEvents: 'none',
          top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 400,
          background: 'radial-gradient(ellipse, rgba(0, 102, 255, 0.08) 0%, transparent 65%)',
          filter: 'blur(80px)',
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
            <HelpCircle size={13} color="#22d3ee" />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#e0f2fe' }}>
              Frequently Asked Questions
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 16px' }}>
            Answers to Your{' '}
            <span style={{ background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Key Questions
            </span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, margin: '0 auto', maxWidth: 560 }}>
            Everything you need to know about partnering with Code Astro, our engineering standards, and deployment timelines.
          </p>
        </div>

        {/* QnA Accordion Drawer Cards */}
        <div style={{ maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={faq.id}
                style={{
                  borderRadius: 18,
                  background: isOpen ? 'rgba(8, 16, 38, 0.95)' : 'rgba(5, 10, 24, 0.65)',
                  border: isOpen ? '1px solid rgba(0, 212, 255, 0.45)' : '1px solid rgba(0, 102, 255, 0.18)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: isOpen ? '0 12px 40px rgba(0,0,0,0.8), 0 0 25px rgba(0, 102, 255, 0.2)' : 'none',
                  overflow: 'hidden',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    textAlign: 'left',
                    cursor: 'pointer',
                    background: 'transparent',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: isOpen ? 'rgba(0, 212, 255, 0.2)' : 'rgba(0, 102, 255, 0.12)',
                        border: isOpen ? '1px solid #00d4ff' : '1px solid rgba(0, 102, 255, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isOpen ? '#00d4ff' : '#60a5fa',
                        flexShrink: 0,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <MessageSquare size={15} />
                    </div>
                    <span
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: isOpen ? '#ffffff' : '#e2e8f0',
                        lineHeight: 1.4,
                      }}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: 'rgba(255,255,255,0.04)',
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
                </button>

                {/* Accordion Content Drawer */}
                {isOpen && (
                  <div
                    style={{
                      padding: '0 24px 22px 70px',
                      color: '#94a3b8',
                      fontSize: '0.92rem',
                      lineHeight: 1.7,
                      borderTop: '1px solid rgba(0, 102, 255, 0.1)',
                      paddingTop: 16,
                      animation: 'fade-in 0.25s ease',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA block for custom questions */}
        <div
          style={{
            maxWidth: 600,
            margin: '48px auto 0',
            textAlign: 'center',
            padding: '24px',
            borderRadius: 20,
            background: 'rgba(5, 12, 30, 0.7)',
            border: '1px solid rgba(0, 102, 255, 0.2)',
          }}
        >
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: 6 }}>
            Have a project-specific architecture question?
          </div>
          <p style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: 16 }}>
            Our lead engineers and solution architects are available for technical consultations.
          </p>
          <Link
            to="/contact"
            className="btn btn-primary"
            style={{ padding: '10px 24px', fontSize: '0.85rem' }}
          >
            Speak with an Engineer <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
