import { Link } from 'react-router-dom'
import { Zap, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import type { SiteSettings } from '@/types/api'

function GithubIcon({ size = 15, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function TwitterIcon({ size = 15, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  )
}

function LinkedinIcon({ size = 15, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const NAV = {
  Services: [
    { label: 'Custom Software Development', href: '/services/custom-software-development' },
    { label: 'Mobile App Development', href: '/services/mobile-app-development' },
    { label: 'E-commerce Solutions', href: '/services/ecommerce-solutions' },
    { label: 'Web Development', href: '/services/web-development' },
    { label: 'Training & Earning', href: '/services/training-earning' },
    { label: 'AI Automation', href: '/services/ai-automation' },
    { label: 'Remote Developer Hiring', href: '/services/remote-developer-hiring' },
    { label: 'Website Malware Detection & Removal', href: '/services/website-malware-detection-removal' },
  ],
  Company: [
    { label: 'About Us', href: '/#about' },
    { label: 'Our Work', href: '/projects' },
    { label: 'Products', href: '/products' },
    { label: 'Technologies', href: '/technologies' },
    { label: 'Blog', href: '/blog' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/about' },
    { label: 'Terms of Service', href: '/about' },
    { label: 'Security', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
}

export default function Footer({ settings }: { settings?: SiteSettings }) {
  const company = settings?.company_name || 'Code Astro'
  const email = settings?.email || 'hello@codeastro.com'
  const phone = settings?.phone || '+1 (555) 000-0000'
  const address = settings?.city ? `${settings.city}, ${settings.country}` : 'Worldwide · Remote-First'

  return (
    <footer
      style={{
        background: '#000000',
        borderTop: '1px solid rgba(0,102,255,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 200,
          background: 'radial-gradient(ellipse, rgba(0,60,180,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,60,180,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,60,180,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <style>{`
        @media (max-width: 900px) {
          .ca-footer-cta {
            grid-column: 1 / -1 !important;
            max-width: 500px;
          }
        }
        @media (max-width: 580px) {
          .ca-footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 28px 16px !important;
          }
          .ca-footer-brand {
            grid-column: 1 / -1 !important;
          }
          .ca-footer-cta {
            grid-column: 1 / -1 !important;
            max-width: 100% !important;
            margin-top: 8px;
          }
        }
      `}</style>

      <div className="wrap relative" style={{ zIndex: 10, paddingTop: 64, paddingBottom: 40 }}>
        {/* Top row: Brand + Nav cols */}
        <div
          className="ca-footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
            gap: 'clamp(24px, 4vw, 48px)',
            marginBottom: 56,
            alignItems: 'start',
          }}
        >
          {/* Brand column */}
          <div className="ca-footer-brand" style={{ gridColumn: 'span 1', width: '100%', minWidth: 0 }}>
            {/* Logo */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', marginBottom: 20 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #0066ff, #00aaff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(0,102,255,0.4)',
                  flexShrink: 0,
                }}
              >
                <Zap size={20} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                  {company}
                </div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#60a5fa' }}>
                  Software Engineering Lab
                </div>
              </div>
            </Link>

            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: 24, maxWidth: 260 }}>
              World-class software engineering. Modern web & mobile apps, AI automation, and secure enterprise platforms that scale.
            </p>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {[
                { icon: Mail, label: email },
                { icon: Phone, label: phone },
                { icon: MapPin, label: address },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon size={13} style={{ color: '#0066ff', flexShrink: 0, opacity: 0.9 }} />
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{item.label}</span>
                  </div>
                )
              })}
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { Icon: GithubIcon, href: settings?.github_url || '#', label: 'GitHub' },
                { Icon: TwitterIcon, href: settings?.twitter_url || '#', label: 'Twitter' },
                { Icon: LinkedinIcon, href: settings?.linkedin_url || '#', label: 'LinkedIn' },
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: 'rgba(13,13,26,0.8)',
                    border: '1px solid rgba(0,102,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3d5280',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'rgba(0,102,255,0.45)'
                    el.style.color = '#60a5fa'
                    el.style.background = 'rgba(0,60,180,0.15)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'rgba(0,102,255,0.15)'
                    el.style.color = '#3d5280'
                    el.style.background = 'rgba(13,13,26,0.8)'
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(NAV).map(([category, links]) => (
            <div key={category}>
              <div style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                color: '#6b84b5',
                marginBottom: 16,
              }}>
                {category}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      style={{
                        fontSize: '0.825rem',
                        color: '#94a3b8',
                        textDecoration: 'none',
                        transition: 'color 0.18s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#60a5fa' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#94a3b8' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA card */}
          <div
            className="ca-footer-cta"
            style={{
              padding: 'clamp(20px, 4vw, 28px) clamp(16px, 4vw, 24px)',
              borderRadius: 20,
              background: 'linear-gradient(135deg, rgba(0, 30, 80, 0.55), rgba(2, 8, 26, 0.9))',
              border: '1px solid rgba(0, 102, 255, 0.28)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 102, 255, 0.12)',
              position: 'relative',
              overflow: 'hidden',
              boxSizing: 'border-box',
              width: '100%',
            }}
          >
            {/* Top neon line accent */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: 'linear-gradient(90deg, #0066ff, #00d4ff)',
                boxShadow: '0 0 8px #00d4ff',
              }}
            />
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: 8, letterSpacing: '-0.01em' }}>
              Ready to build?
            </div>
            <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: 18 }}>
              Let's talk about your project. We respond within 24 hours.
            </p>
            <Link
              to="/contact"
              className="btn btn-primary"
              style={{
                padding: '11px 20px',
                fontSize: '0.85rem',
                width: '100%',
                justifyContent: 'center',
                boxSizing: 'border-box',
                boxShadow: '0 0 20px rgba(0, 102, 255, 0.4)',
              }}
            >
              Get in Touch
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: 24,
            borderTop: '1px solid rgba(0,102,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
            © {new Date().getFullYear()} {company}. All rights reserved.
          </p>
          <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
            Built with precision · Powered by passion
          </p>
        </div>
      </div>
    </footer>
  )
}
