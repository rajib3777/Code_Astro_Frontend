import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Zap,
  Code2,
  Gamepad2,
  Cpu,
  Cloud,
  Shield,
  Layers,
  HelpCircle,
  Users,
  Terminal,
} from 'lucide-react'
import type { SiteSettings } from '@/types/api'

interface SubMenuItem {
  title: string
  desc: string
  url: string
  icon: any
}

interface NavGroup {
  id: string
  label: string
  url?: string
  children?: SubMenuItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: 'services',
    label: 'Services',
    children: [
      { title: 'Custom Software Dev', desc: 'Full-stack web, cloud apps & APIs', url: '/services/custom-software', icon: Code2 },
      { title: 'Arcade & Gaming Tech', desc: 'Embedded hardware & interactive games', url: '/services/gaming', icon: Gamepad2 },
      { title: 'Industrial Automation', desc: 'PLC, SCADA & IoT telemetry systems', url: '/services/automation', icon: Cpu },
      { title: 'AI & Cloud Infrastructure', desc: 'Scalable microservices & ML models', url: '/services/ai-cloud', icon: Cloud },
    ],
  },
  {
    id: 'products',
    label: 'Products',
    children: [
      { title: 'Forge Analytics', desc: 'Real-time telemetry query engine', url: '/products/forge-analytics', icon: Layers },
      { title: 'VaultAuth Zero-Trust', desc: 'Cryptographic biometric identity IAM', url: '/products/vaultauth', icon: Shield },
      { title: 'PulseFlow Engine', desc: 'Low-latency industrial edge daemon', url: '/products/pulseflow', icon: Terminal },
    ],
  },
  {
    id: 'work',
    label: 'Case Studies',
    url: '/projects',
  },
  {
    id: 'explore',
    label: 'Explore',
    children: [
      { title: 'Industries We Serve', desc: 'FinTech, HealthTech, SaaS & more', url: '/industries', icon: Cpu },
      { title: 'Technologies', desc: 'Our modern language & cloud stack', url: '/technologies', icon: Zap },
      { title: 'Engineering Blog', desc: 'Architecture insights & playbooks', url: '/blog', icon: HelpCircle },
    ],
  },
  {
    id: 'company',
    label: 'Company',
    children: [
      { title: 'About Us', desc: 'Our mission, team & engineering culture', url: '/about', icon: Users },
      { title: 'Contact Us', desc: 'Direct inquiry & consultation booking', url: '/contact', icon: ArrowRight },
    ],
  },
]

export default function Navbar({ settings }: { settings?: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const location = useLocation()
  const companyName = settings?.company_name || 'Code Astro'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [location])

  const handleMouseEnter = (id: string) => {
    clearTimeout(timerRef.current)
    setActiveDropdown(id)
  }

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 180)
  }

  return (
    <>
      <style>{`
        @media (max-width: 820px) {
          .ca-nav-desktop { display: none !important; }
          .ca-nav-mobile-btn { display: flex !important; }
          .ca-nav-cta-btn { display: none !important; }
        }
        @media (min-width: 821px) {
          .ca-nav-desktop { display: flex !important; }
          .ca-nav-mobile-btn { display: none !important; }
          .ca-nav-cta-btn { display: inline-flex !important; }
        }
        @keyframes dropdown-pop {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: scrolled ? '10px 0' : '16px 0',
          background: scrolled ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
          borderBottom: scrolled ? '1px solid rgba(0, 102, 255, 0.18)' : '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 102, 255, 0.1)' : 'none',
        }}
      >
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          {/* Brand Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #0066ff 0%, #00d4ff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(0, 102, 255, 0.6)',
                transition: 'transform 0.25s ease',
              }}
            >
              <Zap size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {companyName}
              </div>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#00d4ff' }}>
                Software Engineering Lab
              </div>
            </div>
          </Link>

          {/* Desktop Navigation — Grouped Menu & Submenus */}
          <nav className="ca-nav-desktop" style={{ alignItems: 'center', gap: 6 }}>
            {NAV_GROUPS.map((group) => {
              const hasSub = !!group.children?.length
              const isOpen = activeDropdown === group.id
              const isDirectLink = !hasSub && group.url

              return (
                <div
                  key={group.id}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => hasSub && handleMouseEnter(group.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {isDirectLink ? (
                    <Link
                      to={group.url!}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        padding: '8px 14px',
                        borderRadius: 10,
                        fontSize: '0.86rem',
                        fontWeight: 600,
                        color: location.pathname.startsWith(group.url!) ? '#60a5fa' : '#94a3b8',
                        background: location.pathname.startsWith(group.url!) ? 'rgba(0,102,255,0.1)' : 'transparent',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        ;(e.currentTarget as HTMLElement).style.color = '#ffffff'
                        ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,102,255,0.08)'
                      }}
                      onMouseLeave={e => {
                        ;(e.currentTarget as HTMLElement).style.color = location.pathname.startsWith(group.url!) ? '#60a5fa' : '#94a3b8'
                        ;(e.currentTarget as HTMLElement).style.background = location.pathname.startsWith(group.url!) ? 'rgba(0,102,255,0.1)' : 'transparent'
                      }}
                    >
                      {group.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        padding: '8px 14px',
                        borderRadius: 10,
                        fontSize: '0.86rem',
                        fontWeight: 600,
                        color: isOpen ? '#60a5fa' : '#94a3b8',
                        background: isOpen ? 'rgba(0,102,255,0.1)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        ;(e.currentTarget as HTMLElement).style.color = '#ffffff'
                        ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,102,255,0.08)'
                      }}
                      onMouseLeave={e => {
                        ;(e.currentTarget as HTMLElement).style.color = isOpen ? '#60a5fa' : '#94a3b8'
                        ;(e.currentTarget as HTMLElement).style.background = isOpen ? 'rgba(0,102,255,0.1)' : 'transparent'
                      }}
                    >
                      {group.label}
                      <ChevronDown
                        size={13}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                        }}
                      />
                    </button>
                  )}

                  {/* Submenu Dropdown Card */}
                  {hasSub && isOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: (group.id === 'company' || group.id === 'explore') ? 'auto' : 0,
                        right: (group.id === 'company' || group.id === 'explore') ? 0 : 'auto',
                        marginTop: 8,
                        width: 320,
                        padding: 10,
                        borderRadius: 16,
                        background: 'rgba(5, 8, 20, 0.96)',
                        border: '1px solid rgba(0, 102, 255, 0.25)',
                        backdropFilter: 'blur(28px)',
                        WebkitBackdropFilter: 'blur(28px)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.85), 0 0 30px rgba(0, 102, 255, 0.18)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        animation: 'dropdown-pop 0.2s ease',
                      }}
                    >
                      {group.children?.map((sub, i) => {
                        const Icon = sub.icon
                        return (
                          <Link
                            key={i}
                            to={sub.url}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 12,
                              padding: '10px 12px',
                              borderRadius: 10,
                              textDecoration: 'none',
                              transition: 'all 0.18s ease',
                            }}
                            onMouseEnter={e => {
                              ;(e.currentTarget as HTMLElement).style.background = 'rgba(0, 102, 255, 0.12)'
                              ;(e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'
                            }}
                            onMouseLeave={e => {
                              ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                              ;(e.currentTarget as HTMLElement).style.transform = 'translateX(0)'
                            }}
                          >
                            <div
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                background: 'rgba(0, 102, 255, 0.15)',
                                border: '1px solid rgba(0, 102, 255, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#00d4ff',
                                flexShrink: 0,
                                marginTop: 2,
                              }}
                            >
                              <Icon size={16} />
                            </div>
                            <div>
                              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.2 }}>
                                {sub.title}
                              </div>
                              <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: 2, lineHeight: 1.4 }}>
                                {sub.desc}
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right CTA and Mobile Hamburger Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link
              to="/contact"
              className="btn btn-primary ca-nav-cta-btn"
              style={{
                padding: '9px 20px',
                fontSize: '0.84rem',
                borderRadius: 9999,
                fontWeight: 700,
                boxShadow: '0 0 24px rgba(0, 102, 255, 0.45)',
              }}
            >
              Start a Project
              <ArrowRight size={14} />
            </Link>

            {/* Mobile Hamburger Button — strictly hidden on desktop (>820px) */}
            <button
              type="button"
              onClick={() => setMobileOpen(o => !o)}
              className="ca-nav-mobile-btn"
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'rgba(10, 15, 30, 0.9)',
                border: '1px solid rgba(0, 102, 255, 0.3)',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#93c5fd',
                cursor: 'pointer',
              }}
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (visible only when mobileOpen is true) */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 95,
            background: 'rgba(2, 4, 12, 0.98)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            overflowY: 'auto',
            paddingTop: 85,
            paddingBottom: 40,
          }}
        >
          <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {NAV_GROUPS.map((group) => (
              <div key={group.id} style={{ borderBottom: '1px solid rgba(0, 102, 255, 0.1)', paddingBottom: 12 }}>
                {group.url ? (
                  <Link
                    to={group.url}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: '#f8fafc',
                      textDecoration: 'none',
                      padding: '8px 4px',
                    }}
                  >
                    {group.label}
                  </Link>
                ) : (
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#00d4ff', marginBottom: 8, paddingLeft: 4 }}>
                      {group.label}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {group.children?.map((sub, idx) => (
                        <Link
                          key={idx}
                          to={sub.url}
                          onClick={() => setMobileOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '10px 12px',
                            borderRadius: 10,
                            background: 'rgba(10, 20, 45, 0.4)',
                            textDecoration: 'none',
                            color: '#cbd5e1',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                          }}
                        >
                          <sub.icon size={16} color="#38bdf8" />
                          <span>{sub.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px 24px', marginTop: 10 }}
            >
              Start a Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
