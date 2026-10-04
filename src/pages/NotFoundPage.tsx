import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Home, Compass, PhoneCall } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Code Astro</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>

      <section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden py-32" style={{ background: 'var(--bg-primary)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,102,255,0.14) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
        <div className="aurora-orb w-96 h-96 top-1/4 -right-20" style={{ background: 'rgba(0,102,255,0.1)' }} />
        <div className="aurora-orb w-72 h-72 bottom-1/4 -left-20" style={{ background: 'rgba(0,212,255,0.08)' }} />

        <div className="container-tight text-center relative z-10">
          <Reveal>
            <span className="badge-glow mb-6 inline-flex">Route Error // 404</span>
            <div className="text-8xl sm:text-9xl font-black mb-4 font-mono gradient-text tracking-tighter">
              404
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>
              Requested Route Does Not Exist
            </h1>
            <p className="text-base sm:text-lg max-w-md mx-auto mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              The endpoint, case study, or resource you requested cannot be located in the current namespace.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/" className="btn-primary">
                <Home size={16} /> Return to Home
              </Link>
              <Link to="/projects" className="btn-secondary">
                <Compass size={16} /> Explore Projects
              </Link>
              <Link to="/contact" className="btn-secondary">
                <PhoneCall size={16} /> Contact Team
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
