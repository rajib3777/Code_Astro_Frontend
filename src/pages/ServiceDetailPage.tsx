import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getService, getServices } from '@/api'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MessageSquare,
  Compass,
  Palette,
  Cpu,
  Rocket,
  Code2,
  Gamepad2,
  Globe,
  Database,
  Zap,
  Activity,
  Shield,
  Terminal,
  Sparkles,
  Server,
  Layers,
  ChevronRight,
} from 'lucide-react'
import BlueEnergyFlow from '@/components/ui/BlueEnergyFlow'
import type { Service } from '@/types/api'

interface ServiceData {
  id: number
  name: string
  slug: string
  tagline: string
  short_description: string
  description: string
  icon: any
  color: string
  sla: string
  deliveryTime: string
  communication: string
  stats: { label: string; value: string }[]
  technologies: { name: string; category: string; color: string }[]
  features: {
    title: string
    description: string
    specs: string[]
  }[]
  process: {
    phase: string
    title: string
    desc: string
    deliverables: string
  }[]
}

const SERVICES_DATA: Record<string, ServiceData> = {
  'custom-software': {
    id: 1,
    name: 'Custom Software Development',
    slug: 'custom-software',
    tagline: 'High-Concurrency Distributed Cloud & Enterprise Architectures',
    short_description:
      'We architect and engineer distributed cloud backends, resilient microservice fabrics, low-latency REST/GraphQL APIs, and mission-critical enterprise systems designed for horizontal scalability and zero downtime.',
    description:
      'Our dedicated software pods partner with forward-thinking enterprises and fast-scaling ventures. We replace legacy technical debt with modern cloud-native systems, event-driven streaming pipelines, and microservice meshes that power millions of mission-critical business transactions every single day.',
    icon: Code2,
    color: '#0066ff',
    sla: '99.99% Availability SLA',
    deliveryTime: '6–12 Weeks MVP',
    communication: 'Daily Async Standups + Bi-Weekly Demos',
    stats: [
      { label: 'System Uptime SLA', value: '99.99%' },
      { label: 'P99 Query Latency', value: '< 15ms' },
      { label: 'Concurrent Throughput', value: '500K+ req/s' },
      { label: 'Code Ownership', value: '100% Yours' },
    ],
    technologies: [
      { name: 'TypeScript', category: 'Frontend/Node', color: '#3178c6' },
      { name: 'React / Next.js', category: 'Frontend', color: '#00d4ff' },
      { name: 'Python / Django', category: 'Backend', color: '#0066ff' },
      { name: 'Go / Golang', category: 'High-Perf Backend', color: '#38bdf8' },
      { name: 'PostgreSQL', category: 'Relational DB', color: '#336791' },
      { name: 'Redis Cluster', category: 'In-Memory Cache', color: '#dc2626' },
      { name: 'Kafka / RabbitMQ', category: 'Event Mesh', color: '#eab308' },
      { name: 'Docker & Kubernetes', category: 'Container Infra', color: '#2496ed' },
    ],
    features: [
      {
        title: 'Event-Driven Microservices Fabric',
        description:
          'Distributed, decoupled service architectures communicating via high-throughput gRPC and Kafka event brokers for zero-loss message processing.',
        specs: ['Decoupled fault domains', 'Sub-millisecond binary RPC', 'Automatic retry & dead-letter queue'],
      },
      {
        title: 'Zero-Downtime Blue/Green Deployments',
        description:
          'Enterprise CI/CD automation with canary traffic routing, automated regression health checks, and instant rollback triggers on any failure.',
        specs: ['Automated canary testing', 'Multi-region failover', '100% automated test coverage'],
      },
      {
        title: 'Sub-Millisecond Query Optimization',
        description:
          'Custom relational schema modeling, distributed caching tiers, and indexing strategies that cut database CPU utilization and slash server costs.',
        specs: ['Partitioned table architecture', 'Redis distributed read replicas', 'Automated connection pooling'],
      },
      {
        title: 'Enterprise Zero-Trust & SOC2 Compliance',
        description:
          'End-to-end cryptographic transport encryption, role-based access control (RBAC), and tamper-proof audit trails meeting financial standards.',
        specs: ['mTLS service communication', 'Column-level AES-256 encryption', 'Immutable audit telemetry'],
      },
    ],
    process: [
      {
        phase: 'PHASE 01',
        title: 'Discovery & Blueprinting',
        desc: 'Deep requirements analysis, event modeling, API contracts, and complete cloud architecture diagrams.',
        deliverables: 'Architecture RFC, Data Schema, Sprint Milestones',
      },
      {
        phase: 'PHASE 02',
        title: 'Foundation & Core API',
        desc: 'Setting up the infrastructure as code, container scaffolding, database schemas, and baseline auth.',
        deliverables: 'Staging Environment, CI/CD Pipeline, Core Endpoints',
      },
      {
        phase: 'PHASE 03',
        title: 'Sprint Cycles & Testing',
        desc: 'Two-week agile sprints with bi-weekly live staging demos, integration tests, and stress benchmarks.',
        deliverables: 'Working Feature Releases, Automated Test Suite',
      },
      {
        phase: 'PHASE 04',
        title: 'Hardening & Global Launch',
        desc: 'Security penetration reviews, load simulation, production DNS switchover, and live observability handoff.',
        deliverables: 'Production Deployment, Runbooks, 24/7 Monitoring',
      },
    ],
  },
  gaming: {
    id: 2,
    name: 'Arcade & Interactive Gaming Tech',
    slug: 'gaming',
    tagline: 'Embedded Arcade Operating Systems & Low-Latency Engines',
    short_description:
      'Engineered from the silicon up: custom embedded arcade operating systems, ultra-low-latency input controllers, multiplayer synchronization protocols, and high-frequency display engines with native hardware acceleration.',
    description:
      'Code Astro pioneers modern arcade hardware and commercial entertainment engineering. We design custom Linux firmware, FPGA interfaces, coin-drop telemetry daemons, and deterministic multiplayer netcode that delivers unforgettable interactive sensations with sub-4ms hardware input response.',
    icon: Gamepad2,
    color: '#00d4ff',
    sla: 'Sub-4ms Input Latency',
    deliveryTime: '8–16 Weeks Hardware/OS',
    communication: 'Hardware Lab Staging Demos + Direct Slack',
    stats: [
      { label: 'Input Polling Latency', value: '< 3.8ms' },
      { label: 'Target Framerate', value: '120+ FPS' },
      { label: 'OS Boot Time', value: '< 4.2 sec' },
      { label: 'Hardware Architecture', value: 'ARM & x86_64' },
    ],
    technologies: [
      { name: 'C++20 / Rust', category: 'Engine Kernel', color: '#00d4ff' },
      { name: 'Vulkan / OpenGL', category: 'GPU Pipeline', color: '#e11d48' },
      { name: 'Embedded Linux / Yocto', category: 'Custom OS', color: '#f59e0b' },
      { name: 'WebSockets / UDP Mesh', category: 'Lockstep Netcode', color: '#0066ff' },
      { name: 'STM32 / ARM Cortex', category: 'Hardware Microcontroller', color: '#10b981' },
      { name: 'MQTT / Telemetry', category: 'Telemetry Daemon', color: '#38bdf8' },
    ],
    features: [
      {
        title: 'Deterministic Sub-4ms Input Drivers',
        description:
          'Direct hardware register access and custom Linux kernel HID drivers bypassing standard OS buffers for immediate arcade response.',
        specs: ['Zero-buffer interrupt polling', 'Anti-ghosting matrix decoder', 'Sub-4ms glass-to-glass latency'],
      },
      {
        title: 'Lockstep Multiplayer Synchronization',
        description:
          'High-frequency UDP deterministic network state rollback engine ensuring arcade cabinets stay frame-perfect across physical venues.',
        specs: ['Rollback netcode algorithms', 'Clock-drift auto-synchronization', 'Sub-20ms multi-machine pairing'],
      },
      {
        title: 'Custom Embedded Linux Distribution',
        description:
          'Stripped-down, read-only flash OS image with watchdog timers that boots from cold power to full graphical gameplay in under 4 seconds.',
        specs: ['Read-only root filesystem', 'Hardware watchdog protection', 'Instant AC power-cut resilience'],
      },
      {
        title: 'Machine Telemetry & Coin-Drop Daemons',
        description:
          'Secure edge daemon capturing coin drops, ticket dispenser pulses, player session duration, and thermal metrics synced to the cloud.',
        specs: ['Encrypted edge sync queue', 'Optical ticket sensor telemetry', 'Real-time revenue analytics dashboard'],
      },
    ],
    process: [
      {
        phase: 'PHASE 01',
        title: 'Hardware & Controller Spec',
        desc: 'Reviewing physical cabinet form factors, I/O pinouts, display resolutions, and input controller latency goals.',
        deliverables: 'Hardware Interface Blueprint, PCB Pinout Plan',
      },
      {
        phase: 'PHASE 02',
        title: 'Embedded OS & Kernel Build',
        desc: 'Compiling stripped Yocto Linux kernel with custom GPU drivers and zero-bloat startup sequences.',
        deliverables: 'Bootable Flash OS Image, Display Pipeline Driver',
      },
      {
        phase: 'PHASE 03',
        title: 'Engine & Gameplay Integration',
        desc: 'Building gameplay mechanics, graphics rendering pipeline, sound engine, and coin-op state machine.',
        deliverables: 'Playable Cabinet Build, Input Calibration Suite',
      },
      {
        phase: 'PHASE 04',
        title: 'Burn-In Stress Testing',
        desc: 'Continuous 72-hour thermal stress test, power interruption cycles, and arcade floor certification.',
        deliverables: 'Production Gold Master Image, Machine Telemetry API',
      },
    ],
  },
  automation: {
    id: 3,
    name: 'Industrial Automation & SCADA',
    slug: 'automation',
    tagline: 'Connected PLC Networks, Edge Daemons & Hardware IoT',
    short_description:
      'Mission-critical industrial software bridging physical factory hardware and cloud intelligence: PLC programming, SCADA telemetry dashboards, edge IoT gateway daemons, and automated sensor pipeline integration for modern manufacturing plants.',
    description:
      'We bring software engineering rigor to the factory floor. Our engineers build secure, fault-tolerant telemetry pipelines that communicate directly with industrial equipment over Modbus, CAN, Profinet, and OPC UA, piping high-frequency sensor readings into real-time monitoring canvases.',
    icon: Cpu,
    color: '#38bdf8',
    sla: 'Fault-Tolerant Redundancy',
    deliveryTime: '8–14 Weeks Commissioning',
    communication: 'Weekly Milestone Reviews + On-Site Trials',
    stats: [
      { label: 'Sensor Polling Rate', value: '50ms High-Freq' },
      { label: 'Hardware MTBF', value: '100,000+ Hrs' },
      { label: 'Edge Failover Time', value: '< 200ms' },
      { label: 'Industrial Standards', value: 'ISA-95 & IEC' },
    ],
    technologies: [
      { name: 'Rust / C++', category: 'Edge Daemon', color: '#38bdf8' },
      { name: 'Modbus / CAN-Bus', category: 'Fieldbus Protocol', color: '#f59e0b' },
      { name: 'OPC UA / MQTT', category: 'SCADA Interop', color: '#10b981' },
      { name: 'TimescaleDB', category: 'Time-Series DB', color: '#0066ff' },
      { name: 'Docker / Balena', category: 'Edge Containerization', color: '#2496ed' },
      { name: 'React / Canvas', category: 'SCADA Web HMI', color: '#00d4ff' },
    ],
    features: [
      {
        title: 'Multi-Protocol Industrial Bridges',
        description:
          'Universal protocol translators connecting Siemens, Allen-Bradley, and Omron PLCs into unified JSON/Protobuf telemetry streams.',
        specs: ['Native Modbus TCP & RTU polling', 'Profinet & EtherNet/IP support', 'Zero-overhead packet deserialization'],
      },
      {
        title: 'Real-Time SCADA Telemetry Canvas',
        description:
          'High-density vector web interface rendering factory topologies with thousands of active valves, pumps, and temperature sensors.',
        specs: ['WebGL hardware-accelerated canvas', 'Sub-second audible alarm triggers', 'Historical trend playback overlay'],
      },
      {
        title: 'Edge Predictive Anomaly Detection',
        description:
          'Embedded statistical and ML algorithms running on edge gateway hardware detecting motor vibration drift before physical failure.',
        specs: ['Fast Fourier Transform (FFT) analysis', 'Vibration harmonic thresholds', 'Zero-cloud autonomous operation'],
      },
      {
        title: 'Store-and-Forward Edge Buffering',
        description:
          'Local cryptographic SQLite ring buffers that preserve industrial telemetry uninterrupted during plant network or satellite blackouts.',
        specs: ['Zero data loss during outages', 'Automatic cloud resync upon reconnect', 'End-to-end payload signature'],
      },
    ],
    process: [
      {
        phase: 'PHASE 01',
        title: 'Plant Audit & Protocol Survey',
        desc: 'Reviewing physical wiring, PLC controller tags, baud rates, network topology, and safety interlocks.',
        deliverables: 'Telemetry Mapping Document, Network Architecture',
      },
      {
        phase: 'PHASE 02',
        title: 'Edge Gateway Firmware Build',
        desc: 'Deploying memory-safe polling daemons onto DIN-rail industrial PCs with hardware watchdog monitors.',
        deliverables: 'Provisioned Edge Gateways, Fieldbus Polling Engine',
      },
      {
        phase: 'PHASE 03',
        title: 'SCADA Web HMI & Alarm Rules',
        desc: 'Designing intuitive real-time web control panels with configurable warning thresholds and email/SMS alerts.',
        deliverables: 'Interactive SCADA Dashboard, Alarm Escalation Engine',
      },
      {
        phase: 'PHASE 04',
        title: 'Commissioning & Plant Sign-off',
        desc: 'On-site verification, failover simulation, electrical isolation testing, and operator team training.',
        deliverables: 'Final Commissioning Certification, Plant Runbook',
      },
    ],
  },
  'ai-cloud': {
    id: 4,
    name: 'AI & Cloud Infrastructure',
    slug: 'ai-cloud',
    tagline: 'Autonomous Intelligence, Vector Search & Multi-Region Mesh',
    short_description:
      'Production-grade AI engineering and cloud platforms: custom retrieval-augmented generation (RAG) pipelines, high-throughput model inference servers, multi-region Kubernetes clusters, and automated Terraform infrastructure.',
    description:
      'We engineer enterprise-ready AI backends that solve real business problems without hallucinations or runaway cloud bills. From fine-tuned local LLM deployments to multi-region Kubernetes clusters running automated GitOps pipelines, we turn cutting-edge AI research into battle-tested production software.',
    icon: Globe,
    color: '#60a5fa',
    sla: '99.99% Cloud Availability',
    deliveryTime: '6–10 Weeks Deployment',
    communication: 'Daily GitOps Telemetry + Sprint Pod Calls',
    stats: [
      { label: 'Inference Latency', value: '< 45ms TTFT' },
      { label: 'Vector Query Rate', value: '50K+ QPS' },
      { label: 'IaC Infrastructure', value: '100% Terraform' },
      { label: 'Global Availability', value: 'Multi-Region' },
    ],
    technologies: [
      { name: 'Python / PyTorch', category: 'AI Inference', color: '#e11d48' },
      { name: 'pgvector / Qdrant', category: 'Vector DB', color: '#00d4ff' },
      { name: 'Kubernetes (K8s)', category: 'Cloud Orchestration', color: '#38bdf8' },
      { name: 'Terraform / OpenTofu', category: 'IaC Automation', color: '#60a5fa' },
      { name: 'vLLM / TensorRT', category: 'Model Serving', color: '#10b981' },
      { name: 'Kafka / Streaming', category: 'Event Telemetry', color: '#f59e0b' },
    ],
    features: [
      {
        title: 'Enterprise RAG & Semantic Retrieval',
        description:
          'Hybrid dense-sparse vector search pipelines with cross-encoder rerankers delivering millisecond-accurate document intelligence.',
        specs: ['Sub-30ms vector search latency', 'Zero data leakage guarantee', 'Dynamic contextual compression'],
      },
      {
        title: 'High-Throughput Model Serving',
        description:
          'Self-hosted inference clusters utilizing vLLM and continuous batching to maximize GPU saturation and minimize token latency.',
        specs: ['Continuous token batching', 'FP8 / AWQ weight quantization', 'Sub-45ms time-to-first-token'],
      },
      {
        title: 'Multi-Region Kubernetes Meshes',
        description:
          'Global container clusters with automated geo-DNS routing, automated horizontal pod autoscaling, and self-healing nodes.',
        specs: ['Automated zero-downtime rollouts', 'Sub-second traffic failover', 'Automated cluster autoscaling'],
      },
      {
        title: 'Declarative GitOps & Terraform IaC',
        description:
          '100% reproducible cloud topologies configured as code with automated security vulnerability scanning and drift detection.',
        specs: ['Automated CI/CD validation plans', 'Zero manual cloud console clicks', 'Automated backup snapshots'],
      },
    ],
    process: [
      {
        phase: 'PHASE 01',
        title: 'AI Feasibility & Data Pipeline',
        desc: 'Analyzing data ingestion sources, embedding chunking strategies, and benchmarking foundational model candidates.',
        deliverables: 'Model Benchmark Report, Vector Strategy RFC',
      },
      {
        phase: 'PHASE 02',
        title: 'Cloud Topology & IaC Provisioning',
        desc: 'Writing Terraform scripts to provision secure VPCs, GPU worker nodes, vector storage, and IAM roles.',
        deliverables: 'Automated Terraform Scripts, Staging Cluster',
      },
      {
        phase: 'PHASE 03',
        title: 'RAG Pipeline & Inference Optimization',
        desc: 'Deploying high-throughput serving engines, embedding indexes, and evaluation benchmarks for factual accuracy.',
        deliverables: 'Production Inference API, Retrieval Benchmark Suite',
      },
      {
        phase: 'PHASE 04',
        title: 'Observability & SLA Handover',
        desc: 'Configuring Prometheus metrics, Grafana dashboards, token cost monitors, and 24/7 on-call alerting.',
        deliverables: 'Production Observability Dashboard, SLA Guarantee',
      },
    ],
  },
}

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

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

  const { data: allServicesData } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  })

  const { data: apiService } = useQuery({
    queryKey: ['service', slug],
    queryFn: () => getService(slug!),
    enabled: !!slug,
    retry: false,
  })

  // Lookup custom rich data or fallback
  const currentSlug = slug || 'custom-software'
  const fallbackCustom = SERVICES_DATA[currentSlug] || {
    id: 99,
    name: currentSlug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
    slug: currentSlug,
    tagline: 'Mission-Critical Engineering & Scalable Systems',
    short_description:
      'We partner with modern enterprises to design, engineer, and deploy high-performance software and systems.',
    description:
      'Our dedicated engineering pods combine modern technology stacks with rigorous product craftsmanship. From initial architecture blueprinting to global multi-region cloud deployment, we deliver solutions that drive measurable business outcomes.',
    icon: Code2,
    color: '#0066ff',
    sla: '99.99% Availability SLA',
    deliveryTime: '6–14 Weeks Delivery',
    communication: 'Daily Async Standups + Dedicated Pod',
    stats: [
      { label: 'System Uptime SLA', value: '99.99%' },
      { label: 'Quality Standard', value: 'Enterprise' },
      { label: 'Delivery Model', value: 'Agile Sprints' },
      { label: 'Code Ownership', value: '100% Client' },
    ],
    technologies: [
      { name: 'TypeScript', category: 'Frontend', color: '#3178c6' },
      { name: 'React', category: 'Frontend', color: '#00d4ff' },
      { name: 'Python / Django', category: 'Backend', color: '#0066ff' },
      { name: 'Docker / K8s', category: 'Cloud Infra', color: '#2496ed' },
    ],
    features: [
      {
        title: 'Architectural Blueprinting',
        description: 'Comprehensive system diagrams, data flow schemas, and tech-stack selection before writing code.',
        specs: ['Full architectural documentation', 'Data flow schemas', 'Scalability capacity models'],
      },
      {
        title: 'Iterative Sprint Delivery',
        description: 'Two-week agile cycles with continuous demo staging environments and live progress dashboards.',
        specs: ['Bi-weekly staging demos', 'Transparent Jira/Linear boards', 'Continuous integration test reports'],
      },
      {
        title: 'Rigorous QA & Security Scans',
        description: 'Automated integration tests, stress benchmarks, and OWASP Top 10 vulnerability scans.',
        specs: ['Automated test suites', 'Vulnerability scanning', 'End-to-end integration tests'],
      },
      {
        title: 'DevOps & Zero-Downtime Releases',
        description: 'CI/CD pipelines, container orchestration, and real-time observability telemetry.',
        specs: ['Automated container builds', 'Telemetry dashboards', 'Multi-region redundancy'],
      },
    ],
    process: [
      {
        phase: 'PHASE 01',
        title: 'Discovery & Blueprinting',
        desc: 'Requirements analysis, tech stack selection, and architectural blueprinting.',
        deliverables: 'Architecture RFC, Data Schemas',
      },
      {
        phase: 'PHASE 02',
        title: 'Design & Prototyping',
        desc: 'UI/UX wireframes, component design systems, and interactive technical prototypes.',
        deliverables: 'Figma Library, Interactive Prototype',
      },
      {
        phase: 'PHASE 03',
        title: 'Engineering & Sprints',
        desc: 'Agile bi-weekly sprints with continuous integration and staging environments.',
        deliverables: 'Staging Environment, Working Pod Releases',
      },
      {
        phase: 'PHASE 04',
        title: 'Launch & Scale',
        desc: 'Production deployment with monitoring, SLAs, and ongoing optimization.',
        deliverables: 'Production Deployment, 24/7 Runbooks',
      },
    ],
  }

  // Combine API data if exists, else fallbackCustom
  const serviceName = apiService?.name || fallbackCustom.name
  const serviceTagline = apiService?.tagline || fallbackCustom.tagline
  const serviceDesc = apiService?.description || apiService?.short_description || fallbackCustom.description
  const accentColor = apiService?.color || fallbackCustom.color || '#0066ff'
  const IconComponent = fallbackCustom.icon || Code2

  return (
    <>
      <Helmet>
        <title>{serviceName} — Capabilities & Architecture | Code Astro</title>
        <meta name="description" content={serviceDesc.slice(0, 160)} />
      </Helmet>

      {/* ── Mobile Responsive Overrides ── */}
      <style>{`
        .sdp-hero-h1 { font-size: clamp(1.6rem, 6vw, 4.2rem); }
        .sdp-tagline  { font-size: clamp(1rem, 3vw, 1.4rem); }
        @media (max-width: 640px) {
          .sdp-hero-h1 { font-size: 1.65rem !important; line-height: 1.15 !important; }
          .sdp-tagline  { font-size: 0.95rem !important; }
          .sdp-actions  { flex-direction: column !important; }
          .sdp-actions > * { width: 100% !important; justify-content: center !important; padding: 13px 20px !important; font-size: 0.9rem !important; box-sizing: border-box !important; }
          .sdp-feature-grid { grid-template-columns: 1fr !important; }
          .sdp-process-grid { grid-template-columns: 1fr !important; }
          .sdp-tech-grid    { grid-template-columns: repeat(2, 1fr) !important; }
          .sdp-stats-grid   { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .sdp-hero-h1 { font-size: 1.35rem !important; }
          .sdp-tech-grid { grid-template-columns: 1fr !important; }
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

        {/* Ambient Top Glow Orbs */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: '10%',
            width: 450,
            height: 450,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
            filter: 'blur(70px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -50,
            left: '5%',
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-wide" style={{ position: 'relative', zIndex: 10 }}>
          {/* Breadcrumb / Back Link */}
          <Link
            to="/services"
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
            <ArrowLeft size={14} /> Back to All Capabilities
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Col: Main Narrative */}
            <div className="lg:col-span-7">
              {/* Status Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 16px',
                  borderRadius: 24,
                  background: 'rgba(0, 102, 255, 0.12)',
                  border: '1px solid rgba(0, 212, 255, 0.35)',
                  boxShadow: '0 0 24px rgba(0, 102, 255, 0.25)',
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    backgroundColor: '#00d4ff',
                    boxShadow: '0 0 10px #00d4ff',
                  }}
                  className="animate-pulse"
                />
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#00d4ff',
                    fontFamily: 'monospace',
                  }}
                >
                  LIVE SERVICE CAPABILITY • POD READY
                </span>
              </div>

              {/* Title */}
              <h1
                className="sdp-hero-h1"
                style={{
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                  marginBottom: 16,
                }}
              >
                {serviceName}
              </h1>

              {/* Tagline */}
              <p
                className="sdp-tagline"
                style={{
                  fontWeight: 700,
                  lineHeight: 1.4,
                  background: 'linear-gradient(90deg, #00d4ff, #0066ff, #60a5fa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: 24,
                }}
              >
                {serviceTagline}
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
                {serviceDesc}
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
                {fallbackCustom.stats.map((stat, i) => (
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

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
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
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = '0 0 45px rgba(0, 212, 255, 0.7)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 102, 255, 0.45)'
                  }}
                >
                  <span>Schedule Technical Discovery</span>
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/projects"
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
                  <span>View Case Studies</span>
                </Link>
              </div>
            </div>

            {/* Right Col: Pod Telemetry Glass Card */}
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

                {/* macOS Style Window Bar */}
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
                      pod_allocator::{currentSlug}.sh
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
                    ● ALL SYSTEMS OPERATIONAL
                  </span>
                </div>

                {/* Card Content Body */}
                <div style={{ padding: 'clamp(16px, 4vw, 26px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* Delivery Cadence */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 14,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 102, 255, 0.15)',
                        border: '1px solid rgba(0, 212, 255, 0.3)',
                        color: '#00d4ff',
                        flexShrink: 0,
                      }}
                    >
                      <Clock size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600 }}>
                        RAPID DELIVERY WINDOW
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                        {fallbackCustom.deliveryTime}
                      </div>
                    </div>
                  </div>

                  {/* SLA Standard */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 14,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 212, 255, 0.15)',
                        border: '1px solid rgba(0, 212, 255, 0.3)',
                        color: '#00d4ff',
                        flexShrink: 0,
                      }}
                    >
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600 }}>
                        UPTIME & RELIABILITY SLA
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                        {fallbackCustom.sla}
                      </div>
                    </div>
                  </div>

                  {/* Communication Pod */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 14,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(56, 189, 248, 0.15)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        color: '#38bdf8',
                        flexShrink: 0,
                      }}
                    >
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600 }}>
                        ENGINEERING CADENCE
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                        {fallbackCustom.communication}
                      </div>
                    </div>
                  </div>

                  {/* Core Stack Preview */}
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
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>Core Tech Stack</span>
                      <span style={{ color: '#00d4ff' }}>Enterprise Grade</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {fallbackCustom.technologies.slice(0, 6).map((tech, i) => (
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

                  {/* Terminal Simulation Footer */}
                  <div
                    style={{
                      padding: '12px 14px',
                      borderRadius: 12,
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(0, 212, 255, 0.15)',
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                      color: '#00d4ff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <Terminal size={14} style={{ flexShrink: 0 }} />
                    <span style={{ wordBreak: 'break-all' }}>$ pod deploy --profile=enterprise --scale=auto</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlueEnergyFlow />

      {/* ── 2. ARCHITECTURAL PILLARS / DELIVERABLES ── */}
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
              TECHNICAL PILLARS & ARCHITECTURE
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
              Precision Engineering <span style={{ color: '#00d4ff' }}>Assurance</span>
            </h2>
            <p
              style={{
                fontSize: '1.05rem',
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.6,
              }}
            >
              Every solution delivered by Code Astro adheres to strict architectural standards for maximum throughput,
              zero data loss, and uninterrupted multi-year runtime.
            </p>
          </div>

          {/* Grid of Deliverables */}
          <div className="grid md:grid-cols-2 gap-8">
            {fallbackCustom.features.map((feat, i) => (
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

                {/* Technical Guarantees List */}
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

      {/* ── 3. FOUR-STAGE DELIVERY ROADMAP ── */}
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
              SPRINT METHODOLOGY
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
              How We Deliver <span style={{ color: '#00d4ff' }}>{serviceName}</span>
            </h2>
            <p
              style={{
                fontSize: '1.05rem',
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.6,
              }}
            >
              A transparent, battle-tested 4-stage engineering lifecycle from initial blueprint to multi-region global launch.
            </p>
          </div>

          {/* Horizontal Process Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            {fallbackCustom.process.map((step, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 20,
                  background: 'rgba(10, 15, 30, 0.6)',
                  border: '1px solid rgba(0, 102, 255, 0.2)',
                  padding: 26,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.45)'
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 102, 255, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 102, 255, 0.2)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Phase Number Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px 12px',
                    borderRadius: 12,
                    background: 'rgba(0, 102, 255, 0.15)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    color: '#00d4ff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    fontFamily: 'monospace',
                    marginBottom: 18,
                    alignSelf: 'flex-start',
                  }}
                >
                  {step.phase}
                </div>

                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    marginBottom: 10,
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.65)',
                    marginBottom: 20,
                    flexGrow: 1,
                  }}
                >
                  {step.desc}
                </p>

                <div
                  style={{
                    paddingTop: 12,
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    fontSize: '0.78rem',
                    color: '#38bdf8',
                    fontFamily: 'monospace',
                  }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 2 }}>
                    DELIVERABLE:
                  </span>
                  {step.deliverables}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. TECHNOLOGY STACK MATRIX ── */}
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
              borderRadius: 24,
              background: 'rgba(10, 15, 30, 0.7)',
              border: '1px solid rgba(0, 102, 255, 0.25)',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#00d4ff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontFamily: 'monospace',
                  }}
                >
                  SPECIALIZED TOOLING
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
                  Engineered With Proven Standards
                </h3>
              </div>
              <span
                style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.55)',
                  fontFamily: 'monospace',
                }}
              >
                // Zero-bloat, production-tested libraries
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {fallbackCustom.technologies.map((tech, i) => (
                <div
                  key={i}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 14,
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(0, 102, 255, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.6)'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 102, 255, 0.25)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 102, 255, 0.25)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: tech.color || '#00d4ff',
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
                      {tech.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.45)', fontFamily: 'monospace' }}>
                      {tech.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
            START AN ENGAGEMENT
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
            Ready to Architect Your <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #00d4ff, #0066ff, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {serviceName} Roadmap?
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
            Schedule a 30-minute discovery call with our engineering directors. We will analyze your technical constraints
            and deliver an initial architecture blueprint.
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
              <span>Schedule Technical Consultation</span>
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/services"
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
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
