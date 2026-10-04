import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProject } from '@/api'
import { ArrowLeft, ExternalLink, Calendar, Clock, Users, Search } from 'lucide-react'
import { GithubIcon } from '@/components/ui/SocialIcons'
import Reveal from '@/components/ui/Reveal'
import { motion } from 'framer-motion'
import BlueEnergyFlow from '@/components/ui/BlueEnergyFlow'

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: project, isLoading, isError } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => getProject(slug!),
    enabled: !!slug,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen pb-20" style={{ background: '#000000', paddingTop: 'clamp(90px, 14vw, 190px)' }}>
        <div className="container-wide">
          <div className="skeleton h-5 w-32 rounded-full mb-10" />
          <div className="skeleton h-12 w-2/3 rounded-xl mb-4" />
          <div className="skeleton h-6 w-1/2 rounded-xl mb-6" />
          <div className="skeleton h-64 rounded-2xl mb-8" />
        </div>
      </div>
    )
  }

  if (isError || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#000000', paddingTop: 'clamp(90px, 14vw, 190px)' }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: 'rgba(0,102,255,0.12)', border: '1px solid rgba(0,212,255,0.3)', color: '#00d4ff' }}>
            <Search size={30} />
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Project Not Found</h1>
          <p className="mb-8" style={{ color: 'var(--text-muted)' }}>This case study doesn't exist or has been archived.</p>
          <Link to="/projects" className="btn-primary">Back to Portfolio</Link>
        </div>
      </div>
    )
  }

  const accentColor = project.color || '#0066ff'

  return (
    <>
      <Helmet>
        <title>{project.title} — Case Study | Code Astro</title>
        <meta name="description" content={project.short_description} />
      </Helmet>

      {/* Hero */}
      <section className="relative pb-20 overflow-hidden" style={{ background: '#000000', paddingTop: 'clamp(90px, 14vw, 190px)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 80% at 50% 0%, ${accentColor}22 0%, transparent 65%)` }} />
        <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
        <div className="aurora-orb w-96 h-96 -top-20 right-0 opacity-40" style={{ background: accentColor }} />
        <div className="aurora-orb w-64 h-64 bottom-0 left-0 opacity-30" style={{ background: 'var(--cyan-vivid)' }} />

        <div className="container-wide relative z-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--blue-pale)'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)'}
          >
            <ArrowLeft size={15} /> Back to Projects
          </Link>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Main */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {project.status === 'live' && (
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-5"
                    style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Product
                  </div>
                )}

                {project.client_name && (
                  <div className="text-xs font-extrabold uppercase tracking-widest mb-2" style={{ color: accentColor }}>
                    {project.client_name}
                  </div>
                )}

                <h1 className="text-display mb-3" style={{ color: 'var(--text-primary)' }}>{project.title}</h1>

                {project.tagline && (
                  <p className="text-xl font-semibold mb-5 gradient-text">{project.tagline}</p>
                )}

                <p className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {project.short_description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map(tech => (
                    <span key={tech.id} className="tag">{tech.name}</span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Side Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)' }}>
                <div className="h-1.5" style={{ background: `linear-gradient(to right, ${accentColor}, ${accentColor}77)` }} />
                <div className="p-6">
                  <h3 className="font-bold text-xs uppercase tracking-wider mb-5" style={{ color: 'var(--text-muted)' }}>
                    Project Details
                  </h3>
                  <div className="space-y-4">
                    {project.client_name && (
                      <div>
                        <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Client</div>
                        <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{project.client_name}</div>
                      </div>
                    )}
                    {project.year && (
                      <div>
                        <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Year</div>
                        <div className="text-sm font-semibold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                          <Calendar size={13} style={{ color: accentColor }} /> {project.year}
                        </div>
                      </div>
                    )}
                    {project.duration && (
                      <div>
                        <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Duration</div>
                        <div className="text-sm font-semibold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                          <Clock size={13} style={{ color: accentColor }} /> {project.duration}
                        </div>
                      </div>
                    )}
                    {project.team_size && (
                      <div>
                        <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Team Size</div>
                        <div className="text-sm font-semibold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                          <Users size={13} style={{ color: accentColor }} /> {project.team_size} engineers
                        </div>
                      </div>
                    )}
                    {project.industries?.length > 0 && (
                      <div>
                        <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>Industry</div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.industries.map(ind => <span key={ind.id} className="tag text-xs">{ind.name}</span>)}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 space-y-2 pt-5 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center text-sm">
                        View Live <ExternalLink size={14} />
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full justify-center text-sm">
                        <GithubIcon size={14} /> View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BlueEnergyFlow />

      {/* Results Metrics */}
      {project.results?.length > 0 && (
        <section className="py-16" style={{ background: 'var(--bg-primary)' }}>
          <div className="container-wide">
            <Reveal>
              <div className="text-center mb-10">
                <span className="badge-glow mb-3 inline-flex">Measurable Impact</span>
                <h2 className="text-section" style={{ color: 'var(--text-primary)' }}>Engineered Outcomes</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
              {project.results.map((result, i) => (
                <Reveal key={result.id} delay={i * 0.08}>
                  <div
                    className="text-center p-4 sm:p-6 rounded-2xl transition-all duration-300"
                    style={{ background: 'var(--bg-card)', border: `1px solid var(--border-subtle)`, boxShadow: 'var(--shadow-card)' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = accentColor
                      ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
                      ;(e.currentTarget as HTMLDivElement).style.boxShadow = `var(--shadow-lg), 0 0 25px ${accentColor}25`
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-subtle)'
                      ;(e.currentTarget as HTMLDivElement).style.transform = ''
                      ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-card)'
                    }}
                  >
                    <div className="counter-value text-3xl mb-2" style={{
                      background: `linear-gradient(135deg, ${accentColor}, #00d4ff)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      {result.value}
                    </div>
                    <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{result.metric}</div>
                    {result.description && (
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{result.description}</div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content Sections */}
      {project.sections?.filter(s => s.is_visible).map((section) => (
        <section key={section.id} className="py-16" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container-tight">
            <Reveal>
              {section.title && <h2 className="text-section mb-4" style={{ color: 'var(--text-primary)' }}>{section.title}</h2>}
              {section.subtitle && <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>{section.subtitle}</p>}
              {section.content && (
                <div
                  className="prose max-w-none text-base leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                  dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br />') }}
                />
              )}
            </Reveal>
          </div>
        </section>
      ))}

      {/* Screenshots */}
      {project.screenshots?.length > 0 && (
        <section className="py-16" style={{ background: 'var(--bg-primary)' }}>
          <div className="container-wide">
            <Reveal className="mb-10">
              <h2 className="text-section text-center" style={{ color: 'var(--text-primary)' }}>Interface & Architecture Screens</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.screenshots.map((ss, i) => (
                <Reveal key={ss.id} delay={i * 0.1}>
                  <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)' }}>
                    <img src={ss.image} alt={ss.alt_text || ss.caption} className="w-full h-auto" />
                    {ss.caption && (
                      <p className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)', background: 'var(--bg-card)' }}>
                        {ss.caption}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next CTA */}
      <section className="py-24 text-center relative overflow-hidden" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(0,102,255,0.1) 0%, transparent 60%)' }} />
        <div className="container-tight relative z-10">
          <Reveal>
            <span className="badge-glow mb-4 inline-flex">Build With Us</span>
            <h2 className="text-section mb-4" style={{ color: 'var(--text-primary)' }}>
              Want a Similar Solution?
            </h2>
            <p className="text-base max-w-lg mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
              Let's talk about how we can apply the same engineering excellence and velocity to your product roadmap.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                <span>Start a Conversation</span>
                <ArrowLeft size={16} className="rotate-180" />
              </Link>
              <Link to="/projects" className="btn-secondary">
                View More Projects
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
