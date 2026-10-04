import { useQuery } from '@tanstack/react-query'
import { getClients } from '@/api'

export interface ClientsSectionProps { clients?: any[] }

const FALLBACK_CLIENTS = [
  'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta',
  'Netflix', 'Stripe', 'Notion', 'Figma', 'Vercel',
  'Linear', 'Loom', 'Webflow', 'Framer', 'Shopify',
]

export default function ClientsSection(_props: ClientsSectionProps = {}) {
  const { data } = useQuery({ queryKey: ['clients'], queryFn: getClients })
  const clients = data?.results?.length ? data.results : null

  const items = clients
    ? clients.map((c) => c.name)
    : FALLBACK_CLIENTS

  // duplicate exactly once for seamless -50% translateX ticker
  const doubled = [...items, ...items]

  return (
    <section
      style={{
        padding: '56px 0',
        background: '#000000',
        borderTop: '1px solid rgba(0,102,255,0.07)',
        borderBottom: '1px solid rgba(0,102,255,0.07)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,80,200,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,80,200,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="wrap mb-10 relative z-10 text-center">
        <div
          className="section-label"
          style={{ display: 'inline-flex', marginBottom: 12 }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: '#0066ff', animation: 'blink 1.5s step-end infinite' }}
          />
          Trusted By World-Class Teams
        </div>
        <p style={{ color: '#3d5280', fontSize: '0.85rem', marginTop: 4 }}>
          Clients who rely on our engineering expertise
        </p>
      </div>

      {/* Ticker */}
      <div
        className="ticker-wrap relative z-10"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          className="ticker-inner"
          style={{ animation: 'ticker 32s linear infinite', gap: '0px' }}
        >
          {doubled.map((name, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '0 40px',
                flexShrink: 0,
              }}
            >
              {/* Circle avatar/logo placeholder */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: `rgba(0,${60 + (i % 5) * 20},255,0.12)`,
                  border: '1px solid rgba(0,102,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  color: '#60a5fa',
                  flexShrink: 0,
                }}
              >
                {name.charAt(0)}
              </div>
              <span
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#2a3f65',
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#60a5fa' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#2a3f65' }}
              >
                {name}
              </span>
              {/* Separator dot */}
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'rgba(0,102,255,0.2)',
                  display: 'inline-block',
                  marginLeft: 40,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
