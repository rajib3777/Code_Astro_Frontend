import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProduct } from '@/api'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Play,
  BookOpen,
  CheckCircle2,
  Package,
  Layers,
  Shield,
  Terminal,
  Zap,
  Activity,
  Cpu,
  Server,
  Sparkles,
  Lock,
  Database,
  Globe,
  Copy,
  Check,
} from 'lucide-react'
import BlueEnergyFlow from '@/components/ui/BlueEnergyFlow'

interface ProductData {
  id: number
  name: string
  slug: string
  tagline: string
  category: string
  version: string
  color: string
  short_description: string
  description: string
  product_url: string
  demo_url: string
  docs_url: string
  stats: { label: string; value: string }[]
  specs: {
    runtime: string
    deployment: string
    security: string
    sla: string
  }
  technologies: { name: string; category: string; color: string }[]
  features: {
    title: string
    description: string
    specs: string[]
  }[]
  codePreview: {
    language: string
    title: string
    command: string
    response: string
  }
}

const PRODUCTS_DATA: Record<string, ProductData> = {
  'forge-analytics': {
    id: 1,
    name: 'Forge Analytics',
    slug: 'forge-analytics',
    tagline: 'High-Throughput BI & Real-Time Event Telemetry Platform',
    category: 'Enterprise Data & BI',
    version: 'Production v4.2',
    color: '#0066ff',
    short_description:
      'Self-serve enterprise telemetry and BI platform turning raw event streams into sub-second analytical reporting with automated anomaly detection.',
    description:
      'Forge Analytics is engineered for high-concurrency event ingestion, automated metric aggregation, and sub-second analytical dashboarding across multi-cloud databases. It replaces sluggish legacy BI tools with a high-performance ClickHouse backend and reactive web canvas that scales effortlessly with your traffic.',
    product_url: 'https://forgeanalytics.io',
    demo_url: 'https://demo.forgeanalytics.io',
    docs_url: 'https://docs.forgeanalytics.io',
    stats: [
      { label: 'Event Ingestion', value: '1.4M / sec' },
      { label: 'P99 Query Latency', value: '< 8ms' },
      { label: 'Active Node Mesh', value: '24 Nodes' },
      { label: 'Availability SLA', value: '99.999%' },
    ],
    specs: {
      runtime: 'Distributed ClickHouse + Go Ingest Mesh',
      deployment: 'Multi-Cloud Kubernetes / Bare-Metal',
      security: 'SOC 2 Type II, Column-level Granular RBAC',
      sla: '99.999% Zero-Downtime Guarantee',
    },
    technologies: [
      { name: 'ClickHouse', category: 'OLAP Engine', color: '#ffcc00' },
      { name: 'Go / Golang', category: 'High-Perf Ingest', color: '#00add8' },
      { name: 'React / TypeScript', category: 'Frontend Canvas', color: '#00d4ff' },
      { name: 'PostgreSQL', category: 'Metadata Store', color: '#336791' },
      { name: 'Redis Cluster', category: 'Query Cache', color: '#dc2626' },
      { name: 'Kubernetes', category: 'Cloud Orchestration', color: '#2496ed' },
    ],
    features: [
      {
        title: 'Real-Time Event Ingestion Mesh',
        description:
          'Stream millions of structured and semi-structured events per second with automatic schema inference and zero data loss.',
        specs: ['1.4M events/sec ingestion rate', 'Automatic schema evolution', 'gRPC & Kafka native connectors'],
      },
      {
        title: 'AI-Powered Anomaly Alerts',
        description:
          'Continuous statistical monitoring that alerts engineering and finance before performance anomalies become revenue outages.',
        specs: ['Dynamic 3-sigma statistical thresholds', 'Sub-second webhook alerting', 'Automated root-cause tracing'],
      },
      {
        title: 'Self-Serve SQL & Drag-and-Drop Canvas',
        description:
          'Engineers retain raw high-speed SQL execution control while product and growth teams build custom interactive dashboards.',
        specs: ['Instant SQL query execution', 'Custom SVG vector widget canvas', 'Automated PDF/Slack schedule reports'],
      },
      {
        title: 'Enterprise SSO & Granular RBAC',
        description:
          'SAML 2.0, Okta, and Google Workspace integration with column-level access controls, data masking, and tamper-proof audit trails.',
        specs: ['Column-level data masking', 'Cryptographic audit log trail', 'Multi-tenant team sandboxing'],
      },
    ],
    codePreview: {
      language: 'bash',
      title: 'api.forgeanalytics.io/v1/events/ingest',
      command: `curl -X POST https://api.forgeanalytics.io/v1/events/ingest \\
  -H "Authorization: Bearer fa_live_sec_99a8b1c4" \\
  -H "Content-Type: application/json" \\
  -d '{
    "stream": "enterprise_telemetry",
    "events": [
      {
        "action": "checkout_completed",
        "amount_usd": 2490.00,
        "latency_ms": 3.2,
        "client_region": "us-east"
      }
    ]
  }'`,
      response: `{
  "status": "ingested",
  "cluster_id": "us-east-primary-01",
  "queued_events": 1,
  "serialization_ns": 348,
  "partition": "p202610_us",
  "replicated_nodes": ["us-east-1a", "us-east-1b", "eu-west-1a"],
  "signature": "sig_fa_77x002e"
}`,
    },
  },
  vaultauth: {
    id: 2,
    name: 'VaultAuth Zero-Trust',
    slug: 'vaultauth',
    tagline: 'Cryptographic Identity & Biometric WebAuthn IAM Suite',
    category: 'Zero-Trust Security & IAM',
    version: 'Production v3.8',
    color: '#00d4ff',
    short_description:
      'Next-generation enterprise identity management eliminating passwords with hardware-backed WebAuthn, FIDO2 biometric authentication, and instant token revocation.',
    description:
      'VaultAuth replaces fragile passwords and vulnerable SMS 2FA with hardware-backed cryptographic passkeys, continuous behavioral risk scoring, and sub-millisecond global token blacklisting across edge CDNs. Designed for organizations with zero tolerance for identity compromise.',
    product_url: 'https://vaultauth.io',
    demo_url: 'https://demo.vaultauth.io',
    docs_url: 'https://docs.vaultauth.io',
    stats: [
      { label: 'Auth Edge Latency', value: '< 12ms' },
      { label: 'Passwordless Rate', value: '100% FIDO2' },
      { label: 'Global Revocation', value: '< 5ms Sync' },
      { label: 'Enclave Security', value: 'EAL6+ Rating' },
    ],
    specs: {
      runtime: 'Rust Cryptographic Microkernel + Go Federation',
      deployment: 'Multi-Region Edge Mesh / On-Prem Enclave',
      security: 'FIPS 140-3, Zero-Knowledge Passkey Vault',
      sla: '99.999% Uptime with Edge Auto-Failover',
    },
    technologies: [
      { name: 'Rust', category: 'Crypto Core', color: '#00d4ff' },
      { name: 'WebAuthn / FIDO2', category: 'Biometric Auth', color: '#10b981' },
      { name: 'Go / Golang', category: 'Federation Gateway', color: '#00add8' },
      { name: 'Redis Cluster', category: 'Revocation Cache', color: '#dc2626' },
      { name: 'PostgreSQL', category: 'Encrypted Vault', color: '#336791' },
      { name: 'AWS KMS / HSM', category: 'Hardware Enclave', color: '#f59e0b' },
    ],
    features: [
      {
        title: 'Hardware-Backed WebAuthn & Passkeys',
        description:
          'Phishing-resistant authentication utilizing Apple Secure Enclave, Windows Hello, and YubiKeys with zero stored server passwords.',
        specs: ['100% phishing-resistant FIDO2', 'Biometric touch/face verification', 'Zero server-side credential exposure'],
      },
      {
        title: 'Continuous Behavioral Risk Scoring',
        description:
          'Dynamic session evaluation calculating IP reputation, velocity anomalies, and device posture before authorizing critical actions.',
        specs: ['Continuous passive session audit', 'Adaptive step-up challenge triggers', 'Geo-velocity anomaly alerts'],
      },
      {
        title: 'Sub-Millisecond Global Token Revocation',
        description:
          'Distributed edge Redis memory synchronization that instantly blacklists compromised JWTs across all world regions in under 5ms.',
        specs: ['Sub-5ms global CDN synchronization', 'Zero lingering rogue sessions', 'Cryptographic token validation'],
      },
      {
        title: 'Turnkey Enterprise Identity Federation',
        description:
          'Seamless SAML 2.0, OpenID Connect, and SCIM bridges for Active Directory, Okta, Google Workspace, and Azure AD.',
        specs: ['Automated SCIM user provisioning', 'Multi-tenant organization partitioning', 'Zero-code drop-in SDKs'],
      },
    ],
    codePreview: {
      language: 'bash',
      title: 'auth.vaultauth.io/v1/tokens/verify',
      command: `curl -X POST https://auth.vaultauth.io/v1/tokens/verify \\
  -H "Authorization: Bearer va_live_sec_77ff2301" \\
  -H "Content-Type: application/json" \\
  -d '{
    "token": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9...",
    "device_fingerprint": "dev_macbook_m3_max_01",
    "risk_evaluation": true
  }'`,
      response: `{
  "status": "authenticated",
  "subject_id": "usr_99x418a0",
  "authenticator_type": "FIDO2_HARDWARE_YUBIKEY",
  "risk_score": 0.01,
  "behavioral_posture": "trusted_hardware_enclave",
  "session_ttl_sec": 86400,
  "verified_at": "2026-10-04T06:48:10Z"
}`,
    },
  },
  pulseflow: {
    id: 3,
    name: 'PulseFlow Engine',
    slug: 'pulseflow',
    tagline: 'Ultra-Low Latency Industrial Edge Daemon & Telemetry Mesh',
    category: 'Industrial Edge Daemon',
    version: 'Production v2.5',
    color: '#38bdf8',
    short_description:
      'Ultra-compact, memory-safe edge daemon designed to run on industrial gateways, arcade hardware, and IoT devices with zero memory leaks and sub-millisecond polling.',
    description:
      'PulseFlow aggregates high-frequency sensor readings, normalizes Modbus/CAN protocols, and streams compressed batches to cloud brokers with guaranteed delivery and zero data loss during network outages.',
    product_url: 'https://pulseflow.io',
    demo_url: '',
    docs_url: 'https://docs.pulseflow.io',
    stats: [
      { label: 'Resident Memory', value: '< 18MB RAM' },
      { label: 'Polling Jitter', value: '< 0.2ms' },
      { label: 'Throughput', value: '250K pkt/s' },
      { label: 'Zero-Panic MTBF', value: '100,000+ Hrs' },
    ],
    specs: {
      runtime: 'Memory-Safe Rust Micro-Daemon',
      deployment: 'ARM / x86_64 Industrial Gateways & Arcade Hardware',
      security: 'Encrypted SQLite Flash Ring Buffer + mTLS',
      sla: 'Zero-Data-Loss Outage Resilience',
    },
    technologies: [
      { name: 'Rust', category: 'Memory-Safe Kernel', color: '#38bdf8' },
      { name: 'Modbus / CAN', category: 'Fieldbus Protocol', color: '#f59e0b' },
      { name: 'MQTT / WS', category: 'Cloud Telemetry', color: '#10b981' },
      { name: 'SQLite', category: 'Ring Buffer Storage', color: '#0066ff' },
      { name: 'Zstandard', category: 'Stream Compression', color: '#00d4ff' },
      { name: 'Linux Edge', category: 'Yocto / Embedded OS', color: '#e11d48' },
    ],
    features: [
      {
        title: 'Zero-Allocation Protocol Deserializer',
        description:
          'Zero-copy binary parsing for Modbus TCP/RTU, CAN 2.0B, OPC UA, and proprietary serial binary packets.',
        specs: ['Sub-millisecond packet cycle', 'Zero heap memory allocations', 'Direct DMA serial controller polling'],
      },
      {
        title: 'Store-and-Forward Ring Buffer',
        description:
          'Encrypted local flash storage ensuring zero sensor readings are lost during plant network or satellite blackouts.',
        specs: ['AES-256 local flash encryption', 'Automatic cloud batch resync', 'Configurable multi-gigabyte buffer'],
      },
      {
        title: 'Adaptive Zstandard Stream Compression',
        description:
          'Reduces cellular IoT bandwidth costs by up to 88% through real-time differential dictionary compression.',
        specs: ['88% bandwidth reduction ratio', 'Real-time delta dictionary updates', 'Low CPU decompression footprint'],
      },
      {
        title: 'OTA Firmware & Script Hot-Reload',
        description:
          'Cryptographically signed over-the-air binary updates with hardware watchdog monitors and atomic rollback guarantees.',
        specs: ['Hardware watchdog integration', 'Zero-downtime script execution', 'Cryptographic SHA-256 binary validation'],
      },
    ],
    codePreview: {
      language: 'bash',
      title: 'pulseflow daemon :: edge_node_01',
      command: `pulseflow daemon \\
  --config /etc/pulseflow/edge.toml \\
  --cluster industrial-us-east-01 \\
  --log-level info`,
      response: `[2026-10-04T06:48:12Z INFO pulseflow::engine] PulseFlow Edge Daemon v2.5.4 Initialized
[2026-10-04T06:48:12Z INFO pulseflow::memory] Resident memory: 14,208 KB (allocated: zero_heap)
[2026-10-04T06:48:12Z INFO pulseflow::fieldbus] Active buses: [can0 @ 500kbps, modbus_tcp @ 502, ttyUSB0 @ 115200]
[2026-10-04T06:48:12Z INFO pulseflow::sync] Cloud mesh connected via mTLS [us-east.broker.codeastro.io]
[2026-10-04T06:48:13Z INFO pulseflow::telemetry] 250,000 pkt/sec polled with 0.14ms jitter. Buffer: Nominal.`,
    },
  },
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      setMousePos({
        x: (e.clientX / innerWidth) * 2 - 1,
        y: (e.clientY / innerHeight) * 2 - 1,
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const { data: apiProduct } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProduct(slug!),
    enabled: !!slug,
    retry: false,
  })

  // Lookup custom rich data or fallback
  const currentSlug = slug || 'forge-analytics'
  const fallbackProduct = PRODUCTS_DATA[currentSlug] || {
    id: 99,
    name: currentSlug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
    slug: currentSlug,
    tagline: 'High-Performance Enterprise Software Platform',
    category: 'SaaS Platform',
    version: 'Production v3.0',
    color: '#0066ff',
    short_description:
      'High-throughput distributed software platform engineered from first principles for mission-critical enterprise environments.',
    description:
      'Engineered for extreme performance, uninterrupted uptime, and seamless integration with existing enterprise infrastructure.',
    product_url: '',
    demo_url: '',
    docs_url: '',
    stats: [
      { label: 'Uptime SLA', value: '99.999%' },
      { label: 'P99 Latency', value: '< 15ms' },
      { label: 'Throughput', value: 'Enterprise' },
      { label: 'Security', value: 'SOC 2 Type II' },
    ],
    specs: {
      runtime: 'Distributed Microservices Mesh',
      deployment: 'Multi-Cloud Kubernetes & Bare-Metal',
      security: 'End-to-End Encryption & RBAC',
      sla: '99.999% Guaranteed Availability',
    },
    technologies: [
      { name: 'TypeScript', category: 'Frontend', color: '#00d4ff' },
      { name: 'Go / Golang', category: 'Backend', color: '#00add8' },
      { name: 'PostgreSQL', category: 'Database', color: '#336791' },
      { name: 'Docker / K8s', category: 'Cloud', color: '#2496ed' },
    ],
    features: [
      {
        title: 'High-Throughput Distributed Processing',
        description: 'Engineered for extreme concurrent throughput with zero dropped requests during traffic spikes.',
        specs: ['High-concurrency event processing', 'Zero-downtime auto-scaling', 'Sub-millisecond serialization'],
      },
      {
        title: 'Automated Anomaly Detection',
        description: 'Continuous telemetry monitoring alerting engineering before issues impact end-users.',
        specs: ['Statistical bound evaluation', 'Instant webhook escalation', 'Audit telemetry history'],
      },
      {
        title: 'Enterprise RBAC & Security',
        description: 'Complete role-based access control with granular permission policies and audit logging.',
        specs: ['Granular access rules', 'Cryptographic audit trails', 'Single Sign-On (SSO) integration'],
      },
      {
        title: 'Zero-Downtime Infrastructure',
        description: 'Designed from day one for continuous multi-year runtime with self-healing nodes.',
        specs: ['Multi-region failover', 'Automated health checks', 'Zero-loss state persistence'],
      },
    ],
    codePreview: {
      language: 'bash',
      title: `${currentSlug}.cluster.codeastro.io`,
      command: `curl -X POST https://api.${currentSlug}.io/v1/health \\
  -H "Authorization: Bearer test_key_99x"`,
      response: `{
  "status": "nominal",
  "product": "${currentSlug}",
  "version": "v3.0.0",
  "latency": "2.4ms",
  "nodes": ["cluster-primary-01"]
}`,
    },
  }

  const productName = apiProduct?.name || fallbackProduct.name
  const productTagline = apiProduct?.tagline || fallbackProduct.tagline
  const productDesc = apiProduct?.description || apiProduct?.short_description || fallbackProduct.description
  const accentColor = apiProduct?.color || fallbackProduct.color || '#0066ff'

  const copyCode = () => {
    navigator.clipboard.writeText(fallbackProduct.codePreview.command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Helmet>
        <title>{productName} — Proprietary Platform | Code Astro</title>
        <meta name="description" content={productDesc.slice(0, 160)} />
      </Helmet>

      {/* ── Mobile Responsive Overrides ── */}
      <style>{`
        .pdp-hero-h1 { font-size: clamp(1.6rem, 6vw, 4.2rem); }
        .pdp-tagline  { font-size: clamp(1rem, 3vw, 1.4rem); }
        @media (max-width: 640px) {
          .pdp-hero-h1 { font-size: 1.65rem !important; line-height: 1.15 !important; }
          .pdp-tagline  { font-size: 0.95rem !important; }
          .pdp-actions  { flex-direction: column !important; }
          .pdp-actions a { width: 100% !important; justify-content: center !important; padding: 13px 20px !important; font-size: 0.9rem !important; }
          .pdp-feature-grid { grid-template-columns: 1fr !important; }
          .pdp-tech-grid    { grid-template-columns: repeat(2, 1fr) !important; }
          .pdp-stats-grid   { grid-template-columns: repeat(2, 1fr) !important; }
          .pdp-code-preview pre { font-size: 0.72rem !important; white-space: pre-wrap !important; word-break: break-all !important; }
        }
        @media (max-width: 480px) {
          .pdp-hero-h1 { font-size: 1.35rem !important; }
          .pdp-tech-grid { grid-template-columns: 1fr !important; }
          .pdp-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* ── 1. HERO SECTION (GUARANTEED TOP CLEARANCE & PARALLAX GLOW) ── */}
      <section
        style={{
          background: '#000000',
          paddingTop: 'clamp(100px, 14vw, 190px)',
          paddingBottom: 'clamp(60px, 8vw, 100px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Cyber Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0, 102, 255, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 102, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '70px 70px',
            opacity: 0.35,
            pointerEvents: 'none',
          }}
        />

        {/* Mouse Parallax Flare */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle 700px at calc(50% + ${mousePos.x * 35}px) calc(35% + ${mousePos.y * 35}px), ${accentColor}28 0%, rgba(0, 212, 255, 0.12) 40%, transparent 75%)`,
            pointerEvents: 'none',
            transition: 'background 0.2s ease-out',
          }}
        />

        {/* Top Glow Ambient Orbs */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: '8%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
            filter: 'blur(75px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            left: '6%',
            width: 380,
            height: 380,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%)',
            filter: 'blur(65px)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-wide" style={{ position: 'relative', zIndex: 10 }}>
          {/* Back to Products */}
          <Link
            to="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              marginBottom: 32,
              padding: '6px 14px',
              borderRadius: 20,
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#00d4ff'
              e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.35)'
              e.currentTarget.style.transform = 'translateX(-3px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
              e.currentTarget.style.transform = 'translateX(0)'
            }}
          >
            <ArrowLeft size={14} /> Back to In-House Products
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Col: Narrative & Actions */}
            <div className="lg:col-span-7">
              {/* Badges Row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: 20,
                    background: `${accentColor}18`,
                    color: accentColor,
                    border: `1px solid ${accentColor}35`,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontFamily: 'monospace',
                  }}
                >
                  {fallbackProduct.category}
                </span>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 14px',
                    borderRadius: 20,
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#34d399',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    fontFamily: 'monospace',
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: '#34d399',
                      boxShadow: '0 0 8px #34d399',
                    }}
                    className="animate-pulse"
                  />
                  {fallbackProduct.version}
                </span>
              </div>

              {/* Title */}
              <h1
                className="pdp-hero-h1"
                style={{
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                  marginBottom: 16,
                }}
              >
                {productName}
              </h1>

              {/* Tagline */}
              <p
                className="pdp-tagline"
                style={{
                  fontWeight: 700,
                  lineHeight: 1.4,
                  background: 'linear-gradient(90deg, #00d4ff, #0066ff, #60a5fa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: 24,
                }}
              >
                {productTagline}
              </p>

              {/* Description */}
              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.72)',
                  maxWidth: 620,
                  marginBottom: 36,
                }}
              >
                {productDesc}
              </p>

              {/* Key Metric Highlights Strip */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))',
                  gap: 12,
                  marginBottom: 40,
                }}
              >
                {fallbackProduct.stats.map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(10, 15, 30, 0.65)',
                      border: '1px solid rgba(0, 102, 255, 0.2)',
                      borderRadius: 14,
                      padding: '12px 16px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 900,
                        color: '#00d4ff',
                        fontFamily: 'monospace',
                        lineHeight: 1.2,
                        marginBottom: 4,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 0.55)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }} className="pdp-actions">
                {fallbackProduct.product_url ? (
                  <a
                    href={fallbackProduct.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '16px 32px',
                      borderRadius: 14,
                      background: 'linear-gradient(135deg, #0066ff, #00d4ff)',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '1rem',
                      boxShadow: '0 0 30px rgba(0, 102, 255, 0.45)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)'
                      e.currentTarget.style.boxShadow = '0 0 45px rgba(0, 212, 255, 0.7)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 102, 255, 0.45)'
                    }}
                  >
                    <span>Launch Platform</span>
                    <ExternalLink size={18} />
                  </a>
                ) : (
                  <Link
                    to="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '16px 32px',
                      borderRadius: 14,
                      background: 'linear-gradient(135deg, #0066ff, #00d4ff)',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '1rem',
                      boxShadow: '0 0 30px rgba(0, 102, 255, 0.45)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <span>Request Enterprise Access</span>
                    <ArrowRight size={18} />
                  </Link>
                )}

                {fallbackProduct.demo_url && (
                  <a
                    href={fallbackProduct.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '16px 26px',
                      borderRadius: 14,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '1rem',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 102, 255, 0.15)'
                      e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)'
                      e.currentTarget.style.color = '#00d4ff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                      e.currentTarget.style.color = '#ffffff'
                    }}
                  >
                    <Play size={16} /> Live Demo
                  </a>
                )}

                {fallbackProduct.docs_url && (
                  <a
                    href={fallbackProduct.docs_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '16px 26px',
                      borderRadius: 14,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '1rem',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 102, 255, 0.15)'
                      e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)'
                      e.currentTarget.style.color = '#00d4ff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                      e.currentTarget.style.color = '#ffffff'
                    }}
                  >
                    <BookOpen size={16} /> Technical Docs
                  </a>
                )}
              </div>
            </div>

            {/* Right Col: Architecture & Cluster Specs Glass Card */}
            <div className="lg:col-span-5">
              <div
                style={{
                  borderRadius: 22,
                  overflow: 'hidden',
                  background: 'rgba(10, 15, 30, 0.82)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0, 102, 255, 0.35)',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 102, 255, 0.2)',
                  position: 'relative',
                }}
              >
                {/* Laser Top Line */}
                <div
                  style={{
                    height: 3,
                    background: `linear-gradient(90deg, ${accentColor}, #00d4ff)`,
                  }}
                />

                {/* macOS Style Bar */}
                <div
                  style={{
                    padding: '12px clamp(12px, 3vw, 20px)',
                    background: 'rgba(0, 0, 0, 0.65)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 8,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0, flexShrink: 1 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444', flexShrink: 0 }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#eab308', flexShrink: 0 }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#22c55e', flexShrink: 0 }} />
                    <span
                      style={{
                        marginLeft: 8,
                        fontSize: '0.74rem',
                        fontFamily: 'monospace',
                        color: 'rgba(255, 255, 255, 0.6)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      cluster_monitor::{currentSlug}.io
                    </span>
                  </div>
                  <span
                    style={{
                      padding: '3px 9px',
                      borderRadius: 12,
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#10b981',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      fontFamily: 'monospace',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    ● 100% HEALTHY
                  </span>
                </div>

                {/* Body Specs */}
                <div style={{ padding: 'clamp(16px, 4vw, 26px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* Runtime Engine */}
                  <div>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'rgba(255, 255, 255, 0.45)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: 4,
                      }}
                    >
                      PLATFORM ARCHITECTURE & RUNTIME
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                      {fallbackProduct.specs.runtime}
                    </div>
                  </div>

                  {/* Deployment Target */}
                  <div>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'rgba(255, 255, 255, 0.45)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: 4,
                      }}
                    >
                      DEPLOYMENT TOPOLOGY
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                      {fallbackProduct.specs.deployment}
                    </div>
                  </div>

                  {/* Security Standard */}
                  <div>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'rgba(255, 255, 255, 0.45)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: 4,
                      }}
                    >
                      SECURITY & COMPLIANCE POSTURE
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#38bdf8' }}>
                      {fallbackProduct.specs.security}
                    </div>
                  </div>

                  {/* SLA Standard */}
                  <div>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'rgba(255, 255, 255, 0.45)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: 4,
                      }}
                    >
                      ENTERPRISE GUARANTEE
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#34d399' }}>
                      {fallbackProduct.specs.sla}
                    </div>
                  </div>

                  {/* Built With */}
                  <div
                    style={{
                      paddingTop: 18,
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'rgba(255, 255, 255, 0.5)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: 12,
                      }}
                    >
                      Core Technologies Used
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {fallbackProduct.technologies.map((tech, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            padding: '4px 12px',
                            borderRadius: 12,
                            background: 'rgba(0, 102, 255, 0.12)',
                            border: '1px solid rgba(0, 212, 255, 0.25)',
                            color: '#e2e8f0',
                            fontFamily: 'monospace',
                          }}
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlueEnergyFlow />

      {/* ── 2. CORE PLATFORM MODULES & CAPABILITIES ── */}
      <section
        style={{
          background: '#02050e',
          paddingTop: 'clamp(60px, 8vw, 100px)',
          paddingBottom: 'clamp(60px, 8vw, 100px)',
          position: 'relative',
        }}
      >
        <div className="container-wide">
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 60px' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#00d4ff',
                marginBottom: 12,
                fontFamily: 'monospace',
              }}
            >
              CORE CAPABILITIES
            </span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.2,
                marginBottom: 16,
              }}
            >
              Engineered for Scale & <span style={{ color: '#00d4ff' }}>Zero Runtime Failure</span>
            </h2>
            <p
              style={{
                fontSize: '1.05rem',
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.6,
              }}
            >
              Every subsystem in {productName} is designed from first principles with zero-copy deserialization,
              distributed fault domains, and automatic self-healing resilience.
            </p>
          </div>

          {/* Grid of Capabilities */}
          <div className="grid md:grid-cols-2 gap-8">
            {fallbackProduct.features.map((feat, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  background: 'rgba(10, 15, 30, 0.75)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(0, 102, 255, 0.22)',
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 18,
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)'
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow =
                    '0 20px 45px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 102, 255, 0.25)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 102, 255, 0.22)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Laser Top Line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, ${accentColor}, #00d4ff)`,
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 16,
                      background: 'rgba(0, 102, 255, 0.16)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#00d4ff',
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircle2 size={24} />
                  </div>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: '#ffffff',
                    }}
                  >
                    {feat.title}
                  </h3>
                </div>

                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {feat.description}
                </p>

                {/* Technical Guarantees */}
                <div
                  style={{
                    paddingTop: 14,
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  {feat.specs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        fontSize: '0.85rem',
                        color: '#93c5fd',
                        fontFamily: 'monospace',
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          backgroundColor: '#00d4ff',
                        }}
                      />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. DEVELOPER TERMINAL / API PREVIEW ── */}
      <section
        style={{
          background: '#000000',
          paddingTop: 'clamp(60px, 8vw, 100px)',
          paddingBottom: 'clamp(60px, 8vw, 100px)',
          position: 'relative',
        }}
      >
        <div className="container-wide">
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 60px' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#00d4ff',
                marginBottom: 12,
                fontFamily: 'monospace',
              }}
            >
              INTEGRATION PROTOCOL
            </span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.2,
                marginBottom: 16,
              }}
            >
              API-First <span style={{ color: '#00d4ff' }}>Architecture</span>
            </h2>
            <p
              style={{
                fontSize: '1.05rem',
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.6,
              }}
            >
              Low-overhead client integration via REST, gRPC, and bidirectional WebSockets with sub-millisecond serialization.
            </p>
          </div>

          {/* Terminal Box */}
          <div
            style={{
              maxWidth: 960,
              margin: '0 auto',
              borderRadius: 22,
              overflow: 'hidden',
              background: 'rgba(8, 12, 24, 0.95)',
              border: '1px solid rgba(0, 102, 255, 0.35)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 102, 255, 0.25)',
            }}
          >
            {/* Window Title Bar */}
            <div
              style={{
                padding: '12px clamp(12px, 3vw, 22px)',
                background: 'rgba(0, 0, 0, 0.75)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flexShrink: 1 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ef4444', flexShrink: 0 }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#eab308', flexShrink: 0 }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22c55e', flexShrink: 0 }} />
                <span
                  style={{
                    marginLeft: 10,
                    fontSize: '0.8rem',
                    fontFamily: 'monospace',
                    color: '#93c5fd',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {fallbackProduct.codePreview.title}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                <button
                  onClick={copyCode}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 10px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>

                <span
                  style={{
                    padding: '3px 10px',
                    borderRadius: 12,
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10b981',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    fontFamily: 'monospace',
                  }}
                >
                  ● 200 OK
                </span>
              </div>
            </div>

            {/* Code Body */}
            <div style={{ padding: '28px', fontFamily: 'monospace', fontSize: '0.88rem', lineHeight: 1.65 }}>
              <div style={{ color: 'rgba(255, 255, 255, 0.45)', marginBottom: 8 }}>
                # 1. Execute live query / ingest dispatch
              </div>
              <pre
                style={{
                  color: '#00d4ff',
                  whiteSpace: 'pre-wrap',
                  marginBottom: 24,
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: 16,
                  borderRadius: 12,
                  border: '1px solid rgba(0, 212, 255, 0.15)',
                }}
              >
                {fallbackProduct.codePreview.command}
              </pre>

              <div style={{ color: 'rgba(255, 255, 255, 0.45)', marginBottom: 8 }}>
                # 2. Real-time cluster response payload
              </div>
              <pre
                style={{
                  color: '#34d399',
                  whiteSpace: 'pre-wrap',
                  background: 'rgba(0, 0, 0, 0.6)',
                  padding: 16,
                  borderRadius: 12,
                  border: '1px solid rgba(52, 211, 153, 0.25)',
                }}
              >
                {fallbackProduct.codePreview.response}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. ENTERPRISE ASSURANCES STRIP ── */}
      <section
        style={{
          background: '#02050e',
          paddingTop: 'clamp(50px, 6vw, 80px)',
          paddingBottom: 'clamp(50px, 6vw, 80px)',
          position: 'relative',
        }}
      >
        <div className="container-wide">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: 20,
            }}
          >
            {[
              { title: 'SOC 2 Type II Certified', desc: 'Continuous compliance audit logging with zero gaps' },
              { title: 'Multi-Region Sovereignty', desc: 'Host in US, EU, or on-prem with strict data locality' },
              { title: 'Sub-15ms Global Latency', desc: 'Edge CDN routing to minimize packet propagation' },
              { title: 'Dedicated VPC & Bare-Metal', desc: 'Isolated single-tenant clusters for enterprise tiers' },
            ].map((box, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 18,
                  background: 'rgba(10, 15, 30, 0.7)',
                  border: '1px solid rgba(0, 102, 255, 0.2)',
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>{box.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.5 }}>
                  {box.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. HIGH-IMPACT BLUE ENERGY CTA ── */}
      <section
        style={{
          background: '#000000',
          paddingTop: 'clamp(80px, 10vw, 130px)',
          paddingBottom: 'clamp(80px, 10vw, 130px)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        {/* Radiant Blue Center Bloom */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(0, 102, 255, 0.28) 0%, rgba(0, 212, 255, 0.1) 45%, transparent 75%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-tight" style={{ position: 'relative', zIndex: 10 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 20,
              background: 'rgba(0, 102, 255, 0.15)',
              border: '1px solid rgba(0, 212, 255, 0.35)',
              color: '#00d4ff',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 20,
              fontFamily: 'monospace',
            }}
          >
            ENTERPRISE DEPLOYMENT
          </span>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            Want a Custom Enterprise Build of <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #00d4ff, #0066ff, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {productName}?
            </span>
          </h2>

          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: 620,
              margin: '0 auto 40px',
              lineHeight: 1.6,
            }}
          >
            We provision dedicated single-tenant clusters, custom hardware bridges, tailored schema adapters, and guaranteed
            round-the-clock enterprise SLAs.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '16px 36px',
                borderRadius: 14,
                background: 'linear-gradient(135deg, #0066ff, #00d4ff)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: '0 0 35px rgba(0, 102, 255, 0.5)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 0 50px rgba(0, 212, 255, 0.75)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 102, 255, 0.5)'
              }}
            >
              <span>Contact Enterprise Sales</span>
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/products"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '16px 28px',
                borderRadius: 14,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 102, 255, 0.15)'
                e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)'
                e.currentTarget.style.color = '#00d4ff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.color = '#ffffff'
              }}
            >
              <span>Explore All Products</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
