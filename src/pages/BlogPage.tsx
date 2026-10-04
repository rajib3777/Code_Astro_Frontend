import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { getBlogPosts, getBlogCategories } from '@/api'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Clock,
  User,
  Calendar,
  Search,
  Zap,
  Terminal,
  Mail,
  CheckCircle2,
} from 'lucide-react'
import type { BlogPost } from '@/types/api'
import BlueEnergyFlow from '@/components/ui/BlueEnergyFlow'

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Building Scalable SaaS Architecture in 2026: Multi-Tenancy, Vector Search, & Event Mesh',
    slug: 'saas-architecture-2026',
    author_name: 'Alex Vance',
    excerpt:
      'The architectural patterns that separate high-retention SaaS from brittle prototypes — strict row-level security, transactional outbox patterns, and high-frequency edge caching.',
    content: '',
    featured_image: null,
    category: { id: 1, name: 'Cloud Architecture', slug: 'cloud-architecture', color: '#0066ff' },
    status: 'published',
    published_at: 'Feb 15, 2026',
    read_time: 8,
    is_featured: true,
    created_at: '2026-02-15',
  },
  {
    id: 2,
    title: 'Designing High-Performance Design Systems: Micro-Interactions & Sub-Pixel Precision',
    slug: 'premium-ui-design-systems',
    author_name: 'Elena Rostova',
    excerpt:
      'How our product studio creates ultra-consistent, responsive design tokens that maintain 60fps hardware-accelerated animations across multi-platform enterprise web applications.',
    content: '',
    featured_image: null,
    category: { id: 2, name: 'Design Engineering', slug: 'design-engineering', color: '#00d4ff' },
    status: 'published',
    published_at: 'Jan 28, 2026',
    read_time: 6,
    is_featured: false,
    created_at: '2026-01-28',
  },
  {
    id: 3,
    title: 'From Prototype to $10M ARR: The Engineering Playbook for High-Growth Startups',
    slug: 'mvp-to-10m-arr',
    author_name: 'David K. Chen',
    excerpt:
      'The critical architectural decisions and refactoring milestones that enabled our venture-backed clients to scale past massive traffic surges without breaking core databases.',
    content: '',
    featured_image: null,
    category: { id: 3, name: 'Product Strategy', slug: 'product-strategy', color: '#38bdf8' },
    status: 'published',
    published_at: 'Jan 10, 2026',
    read_time: 11,
    is_featured: false,
    created_at: '2026-01-10',
  },
  {
    id: 4,
    title: 'Zero-Downtime Database Migrations with PostgreSQL and Django in Enterprise Environments',
    slug: 'zero-downtime-db-migrations',
    author_name: 'Marcus Sterling',
    excerpt:
      'Safely adding indexes, altering column constraints, and executing asynchronous data backfills on tables with 100M+ active rows without holding exclusive locks.',
    content: '',
    featured_image: null,
    category: { id: 1, name: 'Cloud Architecture', slug: 'cloud-architecture', color: '#0066ff' },
    status: 'published',
    published_at: 'Dec 18, 2025',
    read_time: 9,
    is_featured: false,
    created_at: '2025-12-18',
  },
  {
    id: 5,
    title: 'Sub-4ms Real-Time Multiplayer Synchronization for Interactive Gaming Cabinets',
    slug: 'multiplayer-sync-gaming',
    author_name: 'Alex Vance',
    excerpt:
      'Designing custom UDP binary protocols, client-side prediction, and authoritative server rollbacks for high-frequency amusement and esports hardware installations.',
    content: '',
    featured_image: null,
    category: { id: 4, name: 'Embedded Systems', slug: 'embedded-systems', color: '#60a5fa' },
    status: 'published',
    published_at: 'Nov 29, 2025',
    read_time: 7,
    is_featured: false,
    created_at: '2025-11-29',
  },
  {
    id: 6,
    title: 'Why We Switched to Server-Driven UI with React 19 and Edge Caching',
    slug: 'server-driven-ui-react-19',
    author_name: 'Elena Rostova',
    excerpt:
      'Eliminating client bundle bloat while retaining instantaneous screen transitions by leveraging modern Server Components, streaming hydration, and edge key-value stores.',
    content: '',
    featured_image: null,
    category: { id: 2, name: 'Design Engineering', slug: 'design-engineering', color: '#00d4ff' },
    status: 'published',
    published_at: 'Nov 12, 2025',
    read_time: 8,
    is_featured: false,
    created_at: '2025-11-12',
  },
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const { data: postsData } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => getBlogPosts(),
  })
  const { data: catData } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: getBlogCategories,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 2,
        y: (e.clientY / innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const rawPosts: BlogPost[] =
    postsData?.results && postsData.results.length > 0 ? postsData.results : FALLBACK_POSTS

  const categories = catData?.results ?? [
    { id: 1, name: 'All Topics', slug: 'all', color: '#00d4ff' },
    { id: 2, name: 'Cloud Architecture', slug: 'cloud-architecture', color: '#0066ff' },
    { id: 3, name: 'Design Engineering', slug: 'design-engineering', color: '#00d4ff' },
    { id: 4, name: 'Product Strategy', slug: 'product-strategy', color: '#38bdf8' },
    { id: 5, name: 'Embedded Systems', slug: 'embedded-systems', color: '#60a5fa' },
  ]

  const filteredPosts = rawPosts.filter(post => {
    const matchesCat =
      selectedCategory === 'all' ||
      post.category?.slug === selectedCategory ||
      post.category?.name.toLowerCase().includes(selectedCategory.toLowerCase())
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author_name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  const featuredPost = rawPosts.find(p => p.is_featured) || rawPosts[0]

  return (
    <>
      <Helmet>
        <title>Engineering Insights & Architecture Playbooks — Code Astro</title>
        <meta
          name="description"
          content="Technical deep dives, distributed system architecture case studies, and engineering philosophy from the Code Astro software team."
        />
      </Helmet>

      {/* ── Hero Section (Guaranteed Clearance from Fixed Navbar) ── */}
      <section
        style={{
          background: '#000000',
          paddingTop: 'clamp(90px, 14vw, 190px)',
          paddingBottom: 'clamp(50px, 6vw, 80px)',
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

        {/* Radiant Center Glow */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: `translate(-50%, -50%) translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
            width: 'clamp(450px, 60vw, 800px)',
            height: 'clamp(450px, 60vw, 800px)',
            background: 'radial-gradient(circle, rgba(0, 102, 255, 0.22) 0%, rgba(0, 212, 255, 0.08) 40%, transparent 70%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
            transition: 'transform 0.2s ease-out',
          }}
        />

        <div
          style={{
            width: '100%',
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 clamp(1.25rem, 4vw, 3rem)',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Status Badge */}
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
            <Terminal size={15} color="#00d4ff" />
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#e0f2fe',
              }}
            >
              Technical Insights & Case Files
            </span>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#00d4ff',
                boxShadow: '0 0 10px #00d4ff',
              }}
              className="animate-pulse"
            />
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: '-0.035em',
              color: '#ffffff',
              margin: '0 auto 24px',
              maxWidth: 950,
            }}
          >
            Engineering <br />
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
              Insights & Dispatches
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
              color: '#94a3b8',
              maxWidth: 750,
              margin: '0 auto 36px',
              lineHeight: 1.65,
            }}
          >
            Practical playbooks, benchmark studies, and architectural blueprints written directly by our principal software engineers, cloud architects, and product leads.
          </p>
        </div>
      </section>

      {/* ── Featured Article Showcase ── */}
      {featuredPost && (
        <section
          style={{
            background: '#000000',
            padding: '0 0 clamp(40px, 6vw, 70px)',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)' }}>
            <div
              style={{
                borderRadius: 24,
                background: 'rgba(5, 12, 32, 0.9)',
                border: '1px solid rgba(0, 212, 255, 0.35)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 102, 255, 0.2)',
                overflow: 'hidden',
                position: 'relative',
                transition: 'all 0.35s ease',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 212, 255, 0.6)'
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 45px rgba(0, 212, 255, 0.3)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 212, 255, 0.35)'
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 102, 255, 0.2)'
              }}
            >
              {/* Top Laser Line */}
              <div style={{ height: 3, background: 'linear-gradient(90deg, #0066ff, #00d4ff, #ffffff)' }} />

              <div style={{ padding: 'clamp(28px, 5vw, 48px)', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '4px 14px',
                      borderRadius: 9999,
                      background: 'rgba(0, 212, 255, 0.15)',
                      border: '1px solid rgba(0, 212, 255, 0.4)',
                      color: '#00d4ff',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <Zap size={13} color="#00d4ff" />
                    Featured Deep Dive
                  </span>

                  {featuredPost.category && (
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: 6,
                        background: 'rgba(0, 102, 255, 0.15)',
                        border: '1px solid rgba(0, 102, 255, 0.3)',
                        color: '#93c5fd',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      {featuredPost.category.name}
                    </span>
                  )}

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      color: '#94a3b8',
                      fontSize: '0.8rem',
                      marginLeft: 'auto',
                    }}
                  >
                    <Clock size={14} color="#60a5fa" />
                    {featuredPost.read_time} min read
                  </span>
                </div>

                <Link
                  to={`/blog/${featuredPost.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <h2
                    style={{
                      fontSize: 'clamp(1.5rem, 3.2vw, 2.5rem)',
                      fontWeight: 800,
                      color: '#ffffff',
                      lineHeight: 1.2,
                      margin: '0 0 18px',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      ;(e.currentTarget as HTMLElement).style.color = '#38bdf8'
                    }}
                    onMouseLeave={e => {
                      ;(e.currentTarget as HTMLElement).style.color = '#ffffff'
                    }}
                  >
                    {featuredPost.title}
                  </h2>
                </Link>

                <p
                  style={{
                    fontSize: 'clamp(0.95rem, 1.3vw, 1.12rem)',
                    color: '#cbd5e1',
                    lineHeight: 1.7,
                    maxWidth: 900,
                    margin: '0 0 28px',
                  }}
                >
                  {featuredPost.excerpt}
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    paddingTop: 20,
                    borderTop: '1px solid rgba(0, 102, 255, 0.2)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: '0.82rem', color: '#94a3b8' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <User size={14} color="#00d4ff" />
                      {featuredPost.author_name}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Calendar size={14} color="#00d4ff" />
                      {featuredPost.published_at || 'Recent'}
                    </span>
                  </div>

                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 24px',
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, #0066ff, #0052cc)',
                      color: '#ffffff',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      boxShadow: '0 0 24px rgba(0, 102, 255, 0.4)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      ;(e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #0073ff, #0060e6)'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(0, 212, 255, 0.6)'
                    }}
                    onMouseLeave={e => {
                      ;(e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #0066ff, #0052cc)'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(0, 102, 255, 0.4)'
                    }}
                  >
                    <span>Read Architectural Deep Dive</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Search & Filter Controls ── */}
      <section
        style={{
          background: 'rgba(3, 7, 20, 0.95)',
          borderTop: '1px solid rgba(0, 102, 255, 0.2)',
          borderBottom: '1px solid rgba(0, 102, 255, 0.2)',
          padding: '20px 0',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
              {categories.map(c => {
                const isActive = selectedCategory === c.slug
                return (
                  <button
                    key={c.id || c.slug}
                    onClick={() => setSelectedCategory(c.slug)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: 9999,
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: isActive
                        ? '1px solid #00d4ff'
                        : '1px solid rgba(0, 102, 255, 0.25)',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(0, 102, 255, 0.35), rgba(0, 212, 255, 0.25))'
                        : 'rgba(5, 12, 32, 0.7)',
                      color: isActive ? '#ffffff' : '#94a3b8',
                      boxShadow: isActive ? '0 0 18px rgba(0, 212, 255, 0.35)' : 'none',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {c.name}
                  </button>
                )
              })}
            </div>

            {/* Cyber Search Input */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 340,
                minWidth: 0,
              }}
            >
              <Search
                size={16}
                color="#00d4ff"
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                placeholder="Search architecture articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 16px 10px 42px',
                  borderRadius: 12,
                  background: 'rgba(5, 10, 24, 0.8)',
                  border: '1px solid rgba(0, 102, 255, 0.3)',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  outline: 'none',
                  transition: 'all 0.25s ease',
                }}
                onFocus={e => {
                  ;(e.currentTarget as HTMLInputElement).style.borderColor = '#00d4ff'
                  ;(e.currentTarget as HTMLInputElement).style.boxShadow = '0 0 18px rgba(0, 212, 255, 0.3)'
                }}
                onBlur={e => {
                  ;(e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(0, 102, 255, 0.3)'
                  ;(e.currentTarget as HTMLInputElement).style.boxShadow = 'none'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <BlueEnergyFlow />

      {/* ── Main Articles Grid ── */}
      <section
        style={{
          background: '#000000',
          padding: 'clamp(60px, 8vw, 100px) 0',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
              gap: 28,
            }}
          >
            {filteredPosts.map((post, i) => (
              <article
                key={post.id || post.slug}
                style={{
                  borderRadius: 20,
                  background: 'rgba(5, 10, 24, 0.75)',
                  border: '1px solid rgba(0, 102, 255, 0.2)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 212, 255, 0.45)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow =
                    '0 20px 45px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 102, 255, 0.25)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 102, 255, 0.2)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.6)'
                }}
              >
                {/* Top Laser Accent */}
                <div style={{ height: 3, background: 'linear-gradient(90deg, #0066ff, #00d4ff)' }} />

                <div style={{ padding: 26, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Category and Read Time */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 16,
                    }}
                  >
                    {post.category && (
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '3px 10px',
                          borderRadius: 6,
                          background: 'rgba(0, 102, 255, 0.12)',
                          color: '#38bdf8',
                          border: '1px solid rgba(0, 212, 255, 0.25)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {post.category.name}
                      </span>
                    )}
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        fontSize: '0.75rem',
                        color: '#94a3b8',
                      }}
                    >
                      <Clock size={12} color="#60a5fa" />
                      {post.read_time} min read
                    </span>
                  </div>

                  {/* Title */}
                  <Link
                    to={`/blog/${post.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <h3
                      style={{
                        fontSize: '1.22rem',
                        fontWeight: 800,
                        color: '#ffffff',
                        lineHeight: 1.35,
                        margin: '0 0 12px',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        ;(e.currentTarget as HTMLElement).style.color = '#00d4ff'
                      }}
                      onMouseLeave={e => {
                        ;(e.currentTarget as HTMLElement).style.color = '#ffffff'
                      }}
                    >
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: '#94a3b8',
                      lineHeight: 1.6,
                      margin: '0 0 24px',
                      flex: 1,
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Footer Meta */}
                  <div
                    style={{
                      paddingTop: 16,
                      borderTop: '1px solid rgba(0, 102, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 'auto',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#cbd5e1' }}>
                      <User size={13} color="#00d4ff" />
                      <span>{post.author_name}</span>
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: '#00d4ff',
                        textDecoration: 'none',
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        ;(e.currentTarget as HTMLElement).style.transform = 'translateX(3px)'
                      }}
                      onMouseLeave={e => {
                        ;(e.currentTarget as HTMLElement).style.transform = 'translateX(0)'
                      }}
                    >
                      <span>Read Deep Dive</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 20px',
                background: 'rgba(5, 10, 24, 0.6)',
                borderRadius: 20,
                border: '1px solid rgba(0, 102, 255, 0.2)',
              }}
            >
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: 0 }}>
                No engineering articles found matching "{searchQuery}".
              </p>
            </div>
          )}
        </div>
      </section>

      <BlueEnergyFlow flip />

      {/* ── Engineering Newsletter Dispatch ── */}
      <section
        style={{
          background: 'linear-gradient(180deg, #000000 0%, #030816 100%)',
          padding: 'clamp(70px, 10vw, 110px) 0',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
          borderTop: '1px solid rgba(0, 102, 255, 0.15)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 100%, rgba(0, 102, 255, 0.18) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)', position: 'relative', zIndex: 10 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 9999,
              background: 'rgba(0, 212, 255, 0.1)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              marginBottom: 20,
            }}
          >
            <Mail size={14} color="#00d4ff" />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Quarterly Engineering Dispatch
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 800,
              color: '#ffffff',
              margin: '0 auto 16px',
              lineHeight: 1.15,
            }}
          >
            Get Architecture Playbooks Directly
          </h2>

          <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.65, margin: '0 auto 32px' }}>
            We share zero-downtime blueprints, high-concurrency benchmarks, and production case studies once a month. No spam, ever.
          </p>

          {subscribed ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 28px',
                borderRadius: 12,
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#34d399',
                fontSize: '0.95rem',
                fontWeight: 700,
              }}
            >
              <CheckCircle2 size={18} color="#34d399" />
              <span>You're subscribed to the Code Astro Architecture Dispatch.</span>
            </div>
          ) : (
            <form
              onSubmit={e => {
                e.preventDefault()
                if (emailInput.trim()) setSubscribed(true)
              }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 12,
                maxWidth: 520,
                margin: '0 auto',
              }}
            >
              <input
                type="email"
                required
                placeholder="developer@company.com"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                style={{
                  flex: '1 1 200px',
                  width: '100%',
                  maxWidth: '100%',
                  minWidth: 0,
                  padding: '14px 20px',
                  borderRadius: 12,
                  background: 'rgba(5, 10, 24, 0.9)',
                  border: '1px solid rgba(0, 102, 255, 0.35)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
                onFocus={e => {
                  ;(e.currentTarget as HTMLInputElement).style.borderColor = '#00d4ff'
                  ;(e.currentTarget as HTMLInputElement).style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)'
                }}
                onBlur={e => {
                  ;(e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(0, 102, 255, 0.35)'
                  ;(e.currentTarget as HTMLInputElement).style.boxShadow = 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 28px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #0066ff, #0052cc)',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 0 25px rgba(0, 102, 255, 0.4)',
                }}
              >
                <span>Subscribe</span>
                <ArrowRight size={15} />
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
