import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getBlogPost } from '@/api'
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Share2,
  Check,
  Copy,
  Layers,
  CheckCircle2,
} from 'lucide-react'
import type { BlogPost } from '@/types/api'
import BlueEnergyFlow from '@/components/ui/BlueEnergyFlow'

const FALLBACK_ARTICLE: BlogPost = {
  id: 1,
  title: 'Building Scalable SaaS Architecture in 2026: Multi-Tenancy, Vector Search, & Event Mesh',
  slug: 'saas-architecture-2026',
  author_name: 'Alex Vance',
  excerpt:
    'The architectural patterns that separate high-retention SaaS from brittle prototypes — strict row-level security, transactional outbox patterns, and high-frequency edge caching.',
  content: `
## 1. Introduction: The Death of Generic Microservices

In 2026, building software that scales is no longer about blindly adopting thirty disparate microservices on day one. It is about **architectural intentionality**: constructing a cohesive, modular core with laser-focused domain boundaries, isolated state stores, and resilient asynchronous event pipelines.

When our engineering teams design SaaS architectures at Code Astro, we focus on four cornerstone tenets:
* Strict tenant isolation at both the API routing and database connection pool layers.
* Deterministic schema migrations that never introduce downtime or lock analytical tables.
* Aggressive edge caching for high-read global latency reduction.
* Idempotent event processing backed by transactional outboxes.

---

## 2. Multi-Tenant Isolation: Shared vs. Partitioned Data

One of the earliest decisions in multi-tenant SaaS is choosing between a single database with tenant discriminator columns versus database-per-tenant models.

For 90% of SaaS applications, row-level security (RLS) in PostgreSQL offers the optimal balance of developer velocity and robust isolation. By injecting a session-scoped tenant ID into every query context, the database itself guarantees that a tenant can never access foreign rows:

\`\`\`sql
-- Enable Row Level Security on Core Workspaces
ALTER TABLE user_workspaces ENABLE ROW LEVEL SECURITY;

-- Enforce strict tenant isolation on every SELECT / UPDATE / DELETE
CREATE POLICY tenant_isolation_policy ON user_workspaces
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);
\`\`\`

---

## 3. High-Throughput Event Streaming & Transactional Outbox

Modern SaaS products must react instantly to user behavior — triggering notifications, recalculating usage quotas, updating audit trails, and syncing data to customer data platforms (CDPs).

Rather than coupling write operations directly with external integrations, we implement the **Transactional Outbox Pattern**:
* Business entity changes and an event payload are committed in the same local database transaction.
* A lightweight change data capture (CDC) debezium or polling worker streams events directly into Apache Kafka or Redis Streams.
* Dedicated worker pools ingest the stream, guarantee at-least-once delivery, and execute background tasks asynchronously.

\`\`\`typescript
// Transactional Outbox Event Dispatcher
export async function dispatchDomainEvent(tx: Transaction, event: DomainEvent) {
  await tx.insert(outboxEvents).values({
    id: crypto.randomUUID(),
    aggregateType: event.type,
    payload: JSON.stringify(event.payload),
    createdAt: new Date(),
    processedAt: null,
  })
}
\`\`\`

---

## 4. Key Architectural Takeaways

1. **Keep it simple until metrics demand otherwise.** Start with modular monoliths or lightweight decoupled services before fragmenting your operational overhead.
2. **Prioritize developer ergonomics.** Strict TypeScript contracts between backend models and frontend client packages save weeks of debugging.
3. **Automate everything.** CI/CD that performs automated regression runs, database rollback drills, and ephemeral previews is non-negotiable for enterprise speed.
  `,
  featured_image: null,
  category: { id: 1, name: 'Cloud Architecture', slug: 'cloud-architecture', color: '#0066ff' },
  status: 'published',
  published_at: 'February 15, 2026',
  read_time: 8,
  is_featured: true,
  created_at: '2026-02-15',
}

function CodeBlock({ code, language = 'sql' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      style={{
        borderRadius: 16,
        background: 'rgba(5, 10, 24, 0.95)',
        border: '1px solid rgba(0, 102, 255, 0.3)',
        overflow: 'hidden',
        margin: '28px 0',
        boxShadow: '0 12px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 102, 255, 0.15)',
      }}
    >
      {/* Terminal Title Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 18px',
          background: 'rgba(5, 12, 32, 0.95)',
          borderBottom: '1px solid rgba(0, 102, 255, 0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: '#94a3b8',
              marginLeft: 10,
            }}
          >
            snippet.{language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 12px',
            borderRadius: 6,
            background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            border: copied ? '1px solid #10b981' : '1px solid rgba(0, 102, 255, 0.2)',
            color: copied ? '#34d399' : '#cbd5e1',
            fontSize: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {copied ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
          <span>{copied ? 'Copied!' : 'Copy Code'}</span>
        </button>
      </div>

      <pre
        style={{
          margin: 0,
          padding: '20px 22px',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          lineHeight: 1.6,
          color: '#38bdf8',
          overflowX: 'auto',
          background: 'transparent',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [copiedLink, setCopiedLink] = useState(false)

  const { data: apiPost, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => getBlogPost(slug!),
    enabled: !!slug,
  })

  const post = apiPost || FALLBACK_ARTICLE

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#000000',
          paddingTop: 'clamp(90px, 14vw, 190px)',
          paddingBottom: '80px',
        }}
      >
        <div style={{ maxWidth: 880, margin: '0 auto', padding: '0 24px' }}>
          <div className="skeleton h-8 w-48 rounded mb-6" />
          <div className="skeleton h-14 w-full rounded mb-4" />
          <div className="skeleton h-4 w-64 rounded mb-12" />
          <div className="space-y-4">
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-3/4 rounded" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{post.title} — Code Astro Architecture Insights</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      {/* ── Article Header (Guaranteed Clearance from Fixed Navbar) ── */}
      <section
        style={{
          background: '#000000',
          paddingTop: 'clamp(90px, 14vw, 190px)',
          paddingBottom: 'clamp(50px, 6vw, 80px)',
          position: 'relative',
          overflow: 'hidden',
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

        {/* Radiant Blue Glow */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(400px, 55vw, 750px)',
            height: 'clamp(400px, 55vw, 750px)',
            background: 'radial-gradient(circle, rgba(0, 102, 255, 0.22) 0%, rgba(0, 212, 255, 0.08) 40%, transparent 70%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 880, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 2.5rem)', position: 'relative', zIndex: 10 }}>
          {/* Back Navigation Button */}
          <Link
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#00d4ff',
              textDecoration: 'none',
              marginBottom: 32,
              padding: '6px 14px',
              borderRadius: 8,
              background: 'rgba(0, 102, 255, 0.1)',
              border: '1px solid rgba(0, 212, 255, 0.25)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(0, 102, 255, 0.2)'
              ;(e.currentTarget as HTMLElement).style.borderColor = '#00d4ff'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(0, 102, 255, 0.1)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 212, 255, 0.25)'
            }}
          >
            <ArrowLeft size={15} />
            <span>Back to Insights</span>
          </Link>

          {/* Category Chip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            {post.category && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 14px',
                  borderRadius: 9999,
                  background: 'rgba(0, 102, 255, 0.15)',
                  border: '1px solid rgba(0, 212, 255, 0.35)',
                  color: '#38bdf8',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                <Layers size={13} color="#00d4ff" />
                {post.category.name}
              </span>
            )}
          </div>

          {/* Article Title */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.4rem)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              margin: '0 0 24px',
            }}
          >
            {post.title}
          </h1>

          {/* Article Excerpt */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
              color: '#cbd5e1',
              lineHeight: 1.65,
              margin: '0 0 32px',
            }}
          >
            {post.excerpt}
          </p>

          {/* Meta Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              padding: '16px 0',
              borderTop: '1px solid rgba(0, 102, 255, 0.25)',
              borderBottom: '1px solid rgba(0, 102, 255, 0.25)',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, fontSize: '0.82rem', color: '#94a3b8' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#e2e8f0', fontWeight: 600 }}>
                <User size={15} color="#00d4ff" />
                {post.author_name}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Calendar size={15} color="#00d4ff" />
                {post.published_at || 'Recent'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={15} color="#00d4ff" />
                {post.read_time} min read
              </span>
            </div>

            <button
              onClick={handleShare}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 8,
                background: copiedLink ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: copiedLink ? '1px solid #10b981' : '1px solid rgba(0, 102, 255, 0.25)',
                color: copiedLink ? '#34d399' : '#cbd5e1',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {copiedLink ? <Check size={14} color="#34d399" /> : <Share2 size={14} />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>
        </div>
      </section>

      <BlueEnergyFlow />

      {/* ── Article Body Content ── */}
      <section
        style={{
          background: '#000000',
          padding: 'clamp(50px, 7vw, 90px) 0',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 880, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 2.5rem)' }}>
          <div
            style={{
              color: '#cbd5e1',
              fontSize: '1.05rem',
              lineHeight: 1.8,
            }}
          >
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2
                    key={idx}
                    style={{
                      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginTop: 44,
                      marginBottom: 16,
                      letterSpacing: '-0.02em',
                      borderLeft: '3px solid #00d4ff',
                      paddingLeft: 16,
                    }}
                  >
                    {paragraph.replace('## ', '')}
                  </h2>
                )
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3
                    key={idx}
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: '#e2e8f0',
                      marginTop: 32,
                      marginBottom: 12,
                    }}
                  >
                    {paragraph.replace('### ', '')}
                  </h3>
                )
              }
              if (paragraph.startsWith('```')) {
                const cleaned = paragraph.replace(/```[a-z]*/g, '').trim()
                const lang = paragraph.includes('typescript') ? 'ts' : 'sql'
                return <CodeBlock key={idx} code={cleaned} language={lang} />
              }
              if (paragraph.startsWith('* ')) {
                const items = paragraph.split('\n').map(l => l.replace('* ', ''))
                return (
                  <div
                    key={idx}
                    style={{
                      margin: '20px 0',
                      background: 'rgba(5, 10, 24, 0.7)',
                      borderRadius: 14,
                      padding: '16px 20px',
                      border: '1px solid rgba(0, 102, 255, 0.2)',
                    }}
                  >
                    {items.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 10,
                          fontSize: '0.95rem',
                          color: '#e2e8f0',
                          marginBottom: i === items.length - 1 ? 0 : 10,
                        }}
                      >
                        <CheckCircle2 size={16} color="#00d4ff" style={{ marginTop: 4, flexShrink: 0 }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )
              }
              if (paragraph.startsWith('---')) {
                return (
                  <hr
                    key={idx}
                    style={{
                      margin: '40px 0',
                      border: 'none',
                      borderTop: '1px solid rgba(0, 102, 255, 0.2)',
                    }}
                  />
                )
              }
              return (
                <p key={idx} style={{ marginBottom: 20 }}>
                  {paragraph}
                </p>
              )
            })}
          </div>

          {/* ── Author Box ── */}
          <div
            style={{
              marginTop: 60,
              padding: 30,
              borderRadius: 20,
              background: 'rgba(5, 12, 32, 0.85)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 102, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: 22,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0066ff, #00d4ff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.25rem',
                color: '#ffffff',
                flexShrink: 0,
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
              }}
            >
              {post.author_name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </div>

            <div>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#00d4ff',
                  display: 'block',
                  marginBottom: 4,
                }}
              >
                Written By Principal Engineering
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', margin: '0 0 6px' }}>
                {post.author_name}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0, lineHeight: 1.55 }}>
                Lead Software Architect at Code Astro. Specializing in high-concurrency event meshes, distributed database consistency, and micro-frontend design systems.
              </p>
            </div>
          </div>

          {/* Back to Blog Action */}
          <div style={{ marginTop: 44, textAlign: 'center' }}>
            <Link
              to="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 28px',
                borderRadius: 9999,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(0, 102, 255, 0.3)',
                color: '#cbd5e1',
                fontSize: '0.9rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = '#00d4ff'
                ;(e.currentTarget as HTMLElement).style.color = '#ffffff'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 102, 255, 0.3)'
                ;(e.currentTarget as HTMLElement).style.color = '#cbd5e1'
              }}
            >
              <ArrowLeft size={16} />
              <span>Explore More Architectural Insights</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
