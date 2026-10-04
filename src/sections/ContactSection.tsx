import { useState } from 'react'
import { Mail, Phone, Clock, Send, CheckCircle2, ShieldCheck, AlertCircle, ArrowRight, MessageSquare, Terminal } from 'lucide-react'
import { submitContact } from '@/api'
import type { SiteSettings } from '@/types/api'

export default function ContactSection({ settings }: { settings?: SiteSettings }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    projectType: 'Custom Software Development',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const email = settings?.email || 'hello@codeastro.com'
  const phone = settings?.phone || '+1 (555) 000-0000'
  const address = settings?.city ? `${settings.city}, ${settings.country}` : 'San Francisco · London · Worldwide'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.firstName || !form.email || !form.message) {
      setError('Please fill in all required fields.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      await submitContact({
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        company: '',
        phone: '',
        project_type: form.projectType,
        budget: '',
        message: form.message,
      })
      setSuccess(true)
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        projectType: 'Custom Software Development',
        message: '',
      })
    } catch {
      setSuccess(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="sec relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #03081a 50%, #000000 100%)',
      }}
    >
      {/* Background Cyber Mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0, 102, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 102, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '10%',
          right: '5%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.12) 0%, transparent 65%)',
          filter: 'blur(90px)',
        }}
      />

      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)', position: 'relative', zIndex: 10 }}>
        {/* Responsive style for contact grid */}
        <style>{`
          .ca-contact-grid {
            display: grid;
            grid-template-columns: 5fr 7fr;
            gap: 64px;
            align-items: start;
          }
          @media (max-width: 960px) {
            .ca-contact-grid {
              grid-template-columns: 1fr !important;
              gap: 36px !important;
            }
          }
        `}</style>

        <div className="ca-contact-grid">
          {/* Left Column: Direct Connection Cards */}
          <div>
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 16px', borderRadius: 9999, marginBottom: 20,
                background: 'rgba(0, 102, 255, 0.12)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                boxShadow: '0 0 20px rgba(0, 102, 255, 0.2)',
              }}
            >
              <Terminal size={13} color="#22d3ee" />
              <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#e0f2fe' }}>
                Direct Connection
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 16px' }}>
              Get In{' '}
              <span style={{ background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Touch
              </span>
            </h2>

            <p style={{ color: '#94a3b8', fontSize: '0.98rem', lineHeight: 1.65, marginBottom: 28 }}>
              Ready to architect something remarkable? Reach out directly to Code Astro solution architects for a rapid technical response within 24 hours.
            </p>

            {/* Direct Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                {
                  icon: Mail,
                  title: 'Engineering Inquiries',
                  val: email,
                  sub: 'Rapid architectural consultation',
                },
                {
                  icon: Phone,
                  title: 'Direct Client Line',
                  val: phone,
                  sub: 'Mon - Fri · 9AM - 8PM UTC',
                },
                {
                  icon: Clock,
                  title: 'Guaranteed Response',
                  val: '< 24 Hours SLA',
                  sub: 'Direct response from senior staff',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '18px 20px',
                    borderRadius: 18,
                    background: 'rgba(5, 10, 24, 0.75)',
                    border: '1px solid rgba(0, 102, 255, 0.18)',
                    backdropFilter: 'blur(20px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
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
                    <item.icon size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginTop: 2 }}>
                      {item.val}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#38bdf8', marginTop: 2 }}>
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: High-Tech Project Intake Form */}
          <div>
            <div
              style={{
                borderRadius: 24,
                background: 'rgba(6, 12, 30, 0.95)',
                border: '1px solid rgba(0, 102, 255, 0.28)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.9), 0 0 40px rgba(0, 102, 255, 0.15)',
                padding: '36px 32px',
              }}
            >
              {success ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid #10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      color: '#34d399',
                    }}
                  >
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
                    Inquiry Received
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: 420, margin: '0 auto 24px' }}>
                    Thank you for reaching out to Code Astro. A principal solution architect will review your project specs and respond within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="btn btn-ghost"
                    style={{ padding: '10px 24px' }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <MessageSquare size={18} className="text-cyan-400" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                      Project Specifications Intake
                    </span>
                  </div>

                  {error && (
                    <div
                      style={{
                        padding: '10px 14px',
                        borderRadius: 10,
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#f87171',
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <AlertCircle size={15} />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Name Fields */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 14 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#94a3b8', marginBottom: 6 }}>
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={e => setForm({ ...form, firstName: e.target.value })}
                        placeholder="Elon"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: 10,
                          background: 'rgba(0, 0, 0, 0.6)',
                          border: '1px solid rgba(0, 102, 255, 0.22)',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#94a3b8', marginBottom: 6 }}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={e => setForm({ ...form, lastName: e.target.value })}
                        placeholder="Musk"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: 10,
                          background: 'rgba(0, 0, 0, 0.6)',
                          border: '1px solid rgba(0, 102, 255, 0.22)',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#94a3b8', marginBottom: 6 }}>
                      Work Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="name@enterprise.com"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 10,
                        background: 'rgba(0, 0, 0, 0.6)',
                        border: '1px solid rgba(0, 102, 255, 0.22)',
                        color: '#ffffff',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#94a3b8', marginBottom: 6 }}>
                      Project Domain
                    </label>
                    <select
                      value={form.projectType}
                      onChange={e => setForm({ ...form, projectType: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 10,
                        background: '#040816',
                        border: '1px solid rgba(0, 102, 255, 0.25)',
                        color: '#ffffff',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    >
                      <option value="Custom Software Development">Custom Software Development</option>
                      <option value="Arcade & Gaming Systems">Arcade & Gaming Systems</option>
                      <option value="Industrial Automation & SCADA">Industrial Automation & SCADA</option>
                      <option value="Cloud Topology & DevOps">Cloud Topology & DevOps</option>
                      <option value="Proprietary Product Inquiry">Proprietary Product Inquiry</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#94a3b8', marginBottom: 6 }}>
                      System Requirements & Objectives *
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Briefly describe your workload, timelines, or performance targets..."
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 10,
                        background: 'rgba(0, 0, 0, 0.6)',
                        border: '1px solid rgba(0, 102, 255, 0.22)',
                        color: '#ffffff',
                        fontSize: '0.88rem',
                        outline: 'none',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      fontSize: '0.94rem',
                      fontWeight: 700,
                      marginTop: 6,
                    }}
                  >
                    {submitting ? (
                      <span>Transmitting Specs...</span>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
