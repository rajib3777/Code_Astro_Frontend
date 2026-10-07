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
  'astro-hr': {
    id: 1,
    name: 'Astro HR',
    slug: 'astro-hr',
    tagline: 'Modern Enterprise HR & Payroll Automation',
    category: 'HR Tech',
    version: 'Production v3.4',
    color: '#0066ff',
    short_description:
      'Comprehensive human resource management system featuring employee lifecycle tracking, automated payroll, biometric attendance, and leave management.',
    description:
      'Astro HR streamlines end-to-end human capital management. From onboarding and multi-tier tax-compliant payroll processing to real-time biometric time-tracking and automated leave approval workflows, it centralizes all workforce operations into a single intuitive, secure dashboard.',
    product_url: '',
    demo_url: '',
    docs_url: '',
    stats: [
      { label: 'Employees Managed', value: '14,000+' },
      { label: 'Payroll Accuracy', value: '100%' },
      { label: 'Attendance Uptime', value: '99.9%' },
      { label: 'Compliance Rating', value: 'Audited' },
    ],
    specs: {
      runtime: 'React, Node.js & Python Architecture',
      deployment: 'Enterprise Cloud & Hybrid On-Prem',
      security: 'End-to-End Encryption & Granular RBAC',
      sla: '99.95% Availability SLA',
    },
    technologies: [
      { name: 'React', category: 'Frontend Web', color: '#00d4ff' },
      { name: 'Python', category: 'Backend Engine', color: '#38bdf8' },
      { name: 'PostgreSQL', category: 'Relational Database', color: '#336791' },
      { name: 'Redis', category: 'Session Cache', color: '#dc2626' },
      { name: 'Docker', category: 'Containerization', color: '#2496ed' },
    ],
    features: [
      {
        title: 'Multi-Tier Payroll & Tax Automation',
        description:
          'Compute salary sheets, overtime allowances, tax deductions, and bonuses automatically with zero manual spreadsheet errors.',
        specs: ['Customizable tax slabs', 'Direct bank disbursement files', 'Automated pay slip generation'],
      },
      {
        title: 'Biometric & Mobile Attendance Sync',
        description:
          'Integrate directly with biometric hardware devices and geofenced mobile check-ins with shift rotation management.',
        specs: ['Hardware device sync API', 'Geofenced check-in', 'Overtime calculation engine'],
      },
      {
        title: 'Employee Self-Service & Approvals',
        description:
          'Empower staff to apply for leave, submit expense claims, and review pay slips via an intuitive self-service portal.',
        specs: ['Multi-level manager sign-off', 'Instant notification webhooks', 'Document repository'],
      },
      {
        title: 'Workforce Analytics & Reporting',
        description:
          'Track retention metrics, department headcount trends, and payroll expenses with visual executive dashboards.',
        specs: ['Customizable report builder', 'One-click Excel/PDF export', 'Historical headcount trends'],
      },
    ],
    codePreview: {
      language: 'bash',
      title: 'api.astrohr.io/v1/payroll/calculate',
      command: `curl -X POST https://api.astrohr.io/v1/payroll/calculate \\
  -H "Authorization: Bearer hr_live_sec_1092" \\
  -H "Content-Type: application/json" \\
  -d '{ "cycle": "2026-10", "department": "engineering", "auto_approve": true }'`,
      response: `{
  "status": "completed",
  "disbursements_queued": 142,
  "total_gross_usd": 684200.00,
  "tax_deducted_usd": 124800.00,
  "audit_trail_id": "aud_oct_9918"
}`,
    },
  },
  'hikmah-soft': {
    id: 2,
    name: 'Hikmah Soft',
    slug: 'hikmah-soft',
    tagline: 'Shariah-Compliant Enterprise ERP & Financials',
    category: 'Islamic FinTech',
    version: 'Production v2.6',
    color: '#10b981',
    short_description:
      'Specialized enterprise resource planning software tailored for Islamic financial institutions, educational trusts, and commercial organizations.',
    description:
      'Hikmah Soft provides strict Shariah-compliant accounting, Islamic commercial contract tracking (Murabaha, Mudaraba, Musharaka, Ijara), automated Zakat calculations, and transparent general ledger bookkeeping designed to satisfy internal religious audit boards and regulatory authorities.',
    product_url: '',
    demo_url: '',
    docs_url: '',
    stats: [
      { label: 'Audit Verification', value: '100% Shariah' },
      { label: 'Ledger Latency', value: '< 20ms' },
      { label: 'Zakat Accuracy', value: 'Automated' },
      { label: 'Uptime', value: '99.99%' },
    ],
    specs: {
      runtime: 'Django & Next.js Microservices',
      deployment: 'Dedicated Private Cloud / On-Premise',
      security: 'Immutable Audit Ledger & Role Security',
      sla: '99.99% Availability Guarantee',
    },
    technologies: [
      { name: 'Next.js', category: 'Frontend', color: '#00d4ff' },
      { name: 'Django', category: 'Backend Engine', color: '#10b981' },
      { name: 'PostgreSQL', category: 'Ledger Database', color: '#336791' },
      { name: 'Redis', category: 'Cache', color: '#dc2626' },
    ],
    features: [
      {
        title: 'Shariah-Compliant Contract Tracking',
        description:
          'Enforce strict Shariah rules across commercial contracts including Murabaha cost-plus financing and profit-sharing pools.',
        specs: ['Murabaha repayment schedules', 'Mudaraba profit distribution', 'Non-interest ledger controls'],
      },
      {
        title: 'Automated Zakat & Waqf Computation',
        description:
          'Calculate Zakat obligations precisely across various asset classes with transparent disbursement tracking for charities and trusts.',
        specs: ['Nisab threshold monitoring', 'Multi-asset asset classification', 'Disbursement audit records'],
      },
      {
        title: 'Multi-Branch General Ledger',
        description:
          'Manage multi-entity chart of accounts with real-time trial balance generation and financial statement exports.',
        specs: ['Dual-currency ledger', 'Automated bank reconciliation', 'Tamper-resistant audit trails'],
      },
    ],
    codePreview: {
      language: 'bash',
      title: 'api.hikmahsoft.io/v1/zakat/evaluate',
      command: `curl -X POST https://api.hikmahsoft.io/v1/zakat/evaluate \\
  -H "Authorization: Bearer hs_sec_token_8841" \\
  -d '{ "financial_year": 2026, "institution_id": "inst_dhaka_01" }'`,
      response: `{
  "nisab_gold_usd": 6840.00,
  "net_qualifying_assets_usd": 1240500.00,
  "zakat_due_usd": 31012.50,
  "shariah_board_certified": true
}`,
    },
  },
  'fincore360': {
    id: 3,
    name: 'FinCore360',
    slug: 'fincore360',
    tagline: 'High-Throughput Core Banking & Financial Platform',
    category: 'FinTech Platform',
    version: 'Production v4.1',
    color: '#00d4ff',
    short_description:
      'Scalable financial transaction and ledger management platform engineered for modern financial institutions, cooperatives, and fintech companies.',
    description:
      'FinCore360 is an enterprise-grade core banking and financial clearing engine designed for high transaction velocity, sub-100ms multi-party settlements, strict double-entry ledger integrity, and continuous compliance monitoring.',
    product_url: '',
    demo_url: '',
    docs_url: '',
    stats: [
      { label: 'Daily Volume', value: '$24M+' },
      { label: 'Clearance Latency', value: '< 100ms' },
      { label: 'Ledger Integrity', value: '100%' },
      { label: 'Uptime SLA', value: '99.999%' },
    ],
    specs: {
      runtime: 'Go Core + Kafka Event Mesh',
      deployment: 'High-Availability Multi-Region Kubernetes',
      security: 'PCI-DSS Ready, Hardware Token Auth',
      sla: '99.999% Fault Tolerant',
    },
    technologies: [
      { name: 'Go / Golang', category: 'High-Concurrency Core', color: '#00add8' },
      { name: 'PostgreSQL', category: 'ACID Ledger', color: '#336791' },
      { name: 'Kafka', category: 'Transaction Pipeline', color: '#f59e0b' },
      { name: 'Redis', category: 'Balance Cache', color: '#dc2626' },
    ],
    features: [
      {
        title: 'Real-Time Double-Entry Ledger',
        description: 'ACID-compliant double-entry accounting guarantees zero balance discrepancies during high concurrency peaks.',
        specs: ['Zero-race ledger balances', 'Atomic transaction locks', 'Sub-millisecond verification'],
      },
      {
        title: 'Multi-Currency Account Vaults',
        description: 'Support international accounts with real-time FX rate conversions and fee calculations.',
        specs: ['Dynamic FX integration', 'Virtual IBAN generation', 'Multi-tenant segregation'],
      },
      {
        title: 'Anti-Fraud & Regulatory Reporting',
        description: 'Built-in transaction velocity limits and anti-money laundering rule engines ensure regulatory compliance.',
        specs: ['Velocity risk scoring', 'Suspicious transaction flags', 'Automated regulatory exports'],
      },
    ],
    codePreview: {
      language: 'bash',
      title: 'api.fincore360.io/v1/transactions/settle',
      command: `curl -X POST https://api.fincore360.io/v1/transactions/settle \\
  -H "Authorization: Bearer fc_sec_7721" \\
  -d '{ "source": "acc_7819", "target": "acc_3391", "amount": 1500.00, "currency": "USD" }'`,
      response: `{
  "status": "settled",
  "reference": "tx_202610_884920",
  "latency_ms": 4.1,
  "cleared_at": "2026-10-07T13:40:00Z"
}`,
    },
  },
  'quotation-pro': {
    id: 4,
    name: 'Quotation Pro',
    slug: 'quotation-pro',
    tagline: 'Smart CPQ & Proposal Generation Engine',
    category: 'Business SaaS',
    version: 'Production v2.2',
    color: '#6366f1',
    short_description:
      'Streamlined quotation, estimation, and billing software designed for sales teams, contractors, and agencies to close deals faster.',
    description:
      'Quotation Pro transforms how businesses deliver estimates and proposals. Featuring dynamic product catalogs, automated tax and discount rules, digital client signatures, and one-click conversion to final invoices, it eliminates sales bottlenecks.',
    product_url: '',
    demo_url: '',
    docs_url: '',
    stats: [
      { label: 'Proposals Generated', value: '120K+' },
      { label: 'Closing Speed', value: '2.5x Faster' },
      { label: 'Acceptance Rate', value: '84%' },
      { label: 'Invoice Conversion', value: '1-Click' },
    ],
    specs: {
      runtime: 'React, Node.js & Cloud PDF Pipeline',
      deployment: 'Serverless Edge & Cloud Database',
      security: 'Cryptographic Audit Trails & Signatures',
      sla: '99.9% Uptime',
    },
    technologies: [
      { name: 'React', category: 'Web App', color: '#00d4ff' },
      { name: 'Node.js', category: 'Backend Engine', color: '#10b981' },
      { name: 'PostgreSQL', category: 'Database', color: '#336791' },
      { name: 'TailwindCSS', category: 'Styling', color: '#38bdf8' },
    ],
    features: [
      {
        title: 'Dynamic CPQ Pricing Rules',
        description: 'Configure complex volume discounts, tiered addons, and tax structures with zero calculation errors.',
        specs: ['Tiered volume pricing', 'Multiple currency support', 'Reusable line-item templates'],
      },
      {
        title: 'Interactive Client Acceptance & e-Sign',
        description: 'Send web-based proposals that clients can review, select optional items, and digitally approve instantly.',
        specs: ['Real-time view tracking', 'Digital signature capture', 'Automated email reminders'],
      },
      {
        title: 'One-Click Invoicing & Billing',
        description: 'Convert accepted quotations into professional tax invoices with payment gateway links.',
        specs: ['Stripe/PayPal integration', 'Recurring billing options', 'Automatic payment reconciliation'],
      },
    ],
    codePreview: {
      language: 'bash',
      title: 'api.quotationpro.io/v1/proposals/generate',
      command: `curl -X POST https://api.quotationpro.io/v1/proposals/generate \\
  -H "Authorization: Bearer qp_sec_token" \\
  -d '{ "client_id": "cli_9921", "items": [{"sku": "DEV-SR", "qty": 160}], "discount_pct": 5 }'`,
      response: `{
  "proposal_id": "prop_2026_8812",
  "share_url": "https://quotationpro.io/p/prop_2026_8812",
  "total_amount": 15200.00,
  "status": "awaiting_signature"
}`,
    },
  },
  'remote-desk': {
    id: 5,
    name: 'Remote Desk',
    slug: 'remote-desk',
    tagline: 'Secure Virtual Desktop & Distributed Workspace',
    category: 'Workplace Tech',
    version: 'Production v3.0',
    color: '#38bdf8',
    short_description:
      'High-performance remote desktop infrastructure and virtual workstation management suite designed for distributed teams and engineering centers.',
    description:
      'Remote Desk delivers ultra-low-latency, hardware-accelerated remote workstation access over the web. Designed for engineering organizations and remote agencies requiring rock-solid data sovereignty and frictionless developer environments.',
    product_url: '',
    demo_url: '',
    docs_url: '',
    stats: [
      { label: 'Active Desktops', value: '8,450' },
      { label: 'Stream Latency', value: '< 15ms' },
      { label: 'Data Encryption', value: 'AES-256' },
      { label: 'Uptime SLA', value: '99.99%' },
    ],
    specs: {
      runtime: 'Rust WebRTC Streaming Engine + Go Gateway',
      deployment: 'Multi-Cloud GPU & Bare-Metal Nodes',
      security: 'Zero-Trust Network Access (ZTNA) & MFA',
      sla: '99.99% Guaranteed Availability',
    },
    technologies: [
      { name: 'Rust', category: 'Low-Latency Media', color: '#38bdf8' },
      { name: 'WebRTC', category: 'Screen Streaming', color: '#00d4ff' },
      { name: 'Go', category: 'Orchestration', color: '#00add8' },
      { name: 'Kubernetes', category: 'Node Management', color: '#2496ed' },
    ],
    features: [
      {
        title: 'Ultra-Low-Latency WebRTC Streaming',
        description: 'Smooth 60 FPS remote desktop streaming with adaptive bitrate optimization for fluid coding and design work.',
        specs: ['Adaptive bitrate codec', 'Sub-15ms regional latency', 'Multi-monitor stream support'],
      },
      {
        title: 'Zero-Trust Access & Session Auditing',
        description: 'Protect sensitive corporate codebases with zero file exfiltration policies and continuous session recording.',
        specs: ['Copy-paste restriction policies', 'Watermarked display overlays', 'Comprehensive audit logging'],
      },
      {
        title: 'Instant Ephemeral Workspace Provisioning',
        description: 'Spin up standardized developer containers with pre-configured toolchains in seconds.',
        specs: ['Sub-10s container initialization', 'Persistent volume mounting', 'Customizable OS images'],
      },
    ],
    codePreview: {
      language: 'bash',
      title: 'remotedesk cli :: connect',
      command: `remotedesk session start \\
  --host workspace.cluster.codeastro.io \\
  --profile developer-fullstack-gpu \\
  --auth token_rd_9941`,
      response: `[INFO] WebRTC DataChannel Established [12ms ping]
[INFO] Hardware Video Pipeline: H.265 Accelerated (60 FPS)
[INFO] Zero-Trust Enclave Active. Local Exfiltration Disabled.
[READY] Session online at https://workspace.codeastro.io/s/usr_882`,
    },
  },
  'industrial-edge': {
    id: 6,
    name: 'Industrial Edge',
    slug: 'industrial-edge',
    tagline: 'Industrial IoT Telemetry & SCADA Gateway',
    category: 'IoT & Telemetry',
    version: 'Production v2.5',
    color: '#f59e0b',
    short_description:
      'Ruggedized edge telemetry daemon aggregating real-time sensor streams, machine health telemetry, and automated industrial PLC control.',
    description:
      'Industrial Edge connects factory equipment, PLCs, and environmental sensor arrays to central telemetry dashboards. Built with memory-safe Rust, it features store-and-forward flash buffering to guarantee zero data loss during network outages.',
    product_url: '',
    demo_url: '',
    docs_url: '',
    stats: [
      { label: 'Active Sensors', value: '50,000+' },
      { label: 'Polling Rate', value: '1ms' },
      { label: 'Packets Handled', value: '100M+' },
      { label: 'Zero-Loss Buffer', value: '100%' },
    ],
    specs: {
      runtime: 'Memory-Safe Rust Micro-Daemon',
      deployment: 'ARM / x86_64 Industrial Gateways',
      security: 'mTLS Cloud Uplink & Encrypted Flash Storage',
      sla: 'Zero Data Loss Resilience',
    },
    technologies: [
      { name: 'Rust', category: 'Edge Core', color: '#f59e0b' },
      { name: 'Modbus / CAN', category: 'Fieldbus Protocol', color: '#10b981' },
      { name: 'MQTT', category: 'Telemetry Stream', color: '#00d4ff' },
      { name: 'SQLite', category: 'Local Ring Buffer', color: '#336791' },
    ],
    features: [
      {
        title: 'Multi-Protocol Fieldbus Integration',
        description: 'Native drivers for Modbus TCP/RTU, CAN-bus, OPC UA, and RS-485 serial communication with PLCs.',
        specs: ['1ms cycle polling', 'Zero heap memory allocations', 'Direct DMA serial controller support'],
      },
      {
        title: 'Store-and-Forward Flash Buffer',
        description: 'Guarantees zero lost metrics during plant network disconnects with encrypted local SQLite persistence.',
        specs: ['AES-256 local storage', 'Automatic background resync', 'Configurable multi-gigabyte buffer'],
      },
      {
        title: 'Automated Threshold Incident Escalation',
        description: 'Trigger immediate local alerts and webhook notifications when machine temperatures or vibrations exceed tolerances.',
        specs: ['Sub-second alert trigger', 'SMS/Email/Webhook dispatch', 'Predictive maintenance metrics'],
      },
    ],
    codePreview: {
      language: 'bash',
      title: 'industrial-edge :: daemon status',
      command: `industrial-edge daemon --config /etc/industrial/edge.toml`,
      response: `[INFO] Industrial Edge Daemon v2.5.1 Initialized
[INFO] Active Buses: [can0 @ 500kbps, modbus_tcp @ 502, serial0 @ 115200]
[INFO] Sensors Polled: 50,420 nodes (0.12ms jitter)
[INFO] Cloud Broker Link: Connected via mTLS (us-east.codeastro.io)
[STATUS] Nominal. Zero buffer queue.`,
    },
  },
  'eproshno': {
    id: 7,
    name: 'eProshno',
    slug: 'eproshno',
    tagline: 'Smart Examination & Question Paper Management',
    category: 'EdTech',
    version: 'Production v1.9',
    color: '#8b5cf6',
    short_description:
      'Modern digital examination and academic assessment portal with automated question banking, proctoring controls, and instant evaluation.',
    description:
      'eProshno modernizes testing for universities, schools, and certification bodies. From automated question bank curation and balanced paper generation to AI-assisted proctoring and automated MCQ grading, it reduces assessment administration time by 80%.',
    product_url: '',
    demo_url: '',
    docs_url: '',
    stats: [
      { label: 'Exams Conducted', value: '500,000+' },
      { label: 'Question Bank', value: '2M+ Items' },
      { label: 'Grading Speed', value: 'Instant' },
      { label: 'Proctoring SLA', value: '99.9%' },
    ],
    specs: {
      runtime: 'React, Python FastAPI & PostgreSQL',
      deployment: 'High-Concurrency Cloud Architecture',
      security: 'Browser Lock-Down & Anti-Cheat AI',
      sla: '99.95% Availability during Exam Peaks',
    },
    technologies: [
      { name: 'React', category: 'Student & Admin UI', color: '#00d4ff' },
      { name: 'FastAPI', category: 'Backend Engine', color: '#8b5cf6' },
      { name: 'PostgreSQL', category: 'Question Repository', color: '#336791' },
      { name: 'Redis', category: 'Live Exam State', color: '#dc2626' },
    ],
    features: [
      {
        title: 'Algorithmic Question Paper Generation',
        description: 'Generate balanced, leak-proof examination papers adhering strictly to difficulty curves, blooms taxonomy, and topic weightages.',
        specs: ['Automated difficulty balancing', 'Anti-leak shuffling', 'LaTeX & formula rendering'],
      },
      {
        title: 'Anti-Cheat Digital Proctoring',
        description: 'Ensure assessment integrity through full-screen lockdown, tab-switch monitoring, and AI anomaly detection.',
        specs: ['Browser lockdown mode', 'Audio/Video focus tracking', 'Detailed audit logs per student'],
      },
      {
        title: 'Instant Evaluation & Performance Analytics',
        description: 'Auto-grade multiple-choice sections immediately and provide teachers with intuitive rubric grading for written responses.',
        specs: ['Instant MCQ answer grading', 'Subject competency breakdown', 'Batch gradebook exports'],
      },
    ],
    codePreview: {
      language: 'bash',
      title: 'api.eproshno.io/v1/exams/generate-paper',
      command: `curl -X POST https://api.eproshno.io/v1/exams/generate-paper \\
  -H "Authorization: Bearer ep_sec_8840" \\
  -d '{ "subject_code": "CS-301", "total_marks": 100, "difficulty": "moderate" }'`,
      response: `{
  "paper_id": "qp_2026_cs301_setA",
  "questions_selected": 50,
  "bloom_distribution": { "knowledge": "30%", "application": "50%", "analysis": "20%" },
  "status": "ready_for_review"
}`,
    },
  },
  'staff-sight': {
    id: 8,
    name: 'Staff Sight',
    slug: 'staff-sight',
    tagline: 'Workforce Productivity & Activity Analytics',
    category: 'Analytics SaaS',
    version: 'Production v2.1',
    color: '#ec4899',
    short_description:
      'Intelligent workforce tracking platform providing transparent productivity analytics, timesheets, and project resource allocation insights.',
    description:
      'Staff Sight provides distributed engineering and operations managers with actionable visibility into team workloads, project timesheets, application usage, and burnout indicators without invasive surveillance or privacy violations.',
    product_url: '',
    demo_url: '',
    docs_url: '',
    stats: [
      { label: 'Reporting Accuracy', value: '99.8%' },
      { label: 'Teams Monitored', value: '2,400+' },
      { label: 'Time Saved', value: '12 hrs/wk' },
      { label: 'Privacy Standard', value: 'GDPR Aligned' },
    ],
    specs: {
      runtime: 'Cross-Platform Client + Cloud Analytics Core',
      deployment: 'Enterprise Cloud & Secure Database',
      security: 'Privacy Controls & Role-Based Access',
      sla: '99.9% Uptime',
    },
    technologies: [
      { name: 'TypeScript', category: 'Frontend', color: '#00d4ff' },
      { name: 'Electron', category: 'Desktop Agent', color: '#38bdf8' },
      { name: 'Node.js', category: 'Analytics API', color: '#10b981' },
      { name: 'PostgreSQL', category: 'Time Log Data', color: '#336791' },
    ],
    features: [
      {
        title: 'Automated Project Timesheets',
        description: 'Track billable hours effortlessly per project, milestone, and task with seamless sync to billing systems.',
        specs: ['Automatic activity detection', 'Project milestone allocation', 'One-click client invoice generation'],
      },
      {
        title: 'Productivity Distribution Analytics',
        description: 'Identify software tool bottlenecks and see clear splits between focused development and meeting fatigue.',
        specs: ['App & website categorization', 'Deep work vs meeting metrics', 'Burnout warning flags'],
      },
      {
        title: 'Privacy-First Architecture',
        description: 'Built to respect employee dignity with transparent logging controls and customizable privacy boundaries.',
        specs: ['Non-intrusive metadata mode', 'Employee-accessible timesheet reviews', 'GDPR/SOC-2 privacy compliant'],
      },
    ],
    codePreview: {
      language: 'bash',
      title: 'api.staffsight.io/v1/analytics/team-summary',
      command: `curl -X GET "https://api.staffsight.io/v1/analytics/team-summary?team_id=eng-frontend&range=last_7_days" \\
  -H "Authorization: Bearer ss_sec_key_441"`,
      response: `{
  "team": "Frontend Engineering",
  "active_hours": 1280.5,
  "deep_work_percentage": 78.4,
  "top_applications": ["VS Code", "GitHub", "Figma", "Slack"],
  "burnout_risk_index": "low"
}`,
    },
  },
  'digital-astro': {
    id: 9,
    name: 'Digital Astro',
    slug: 'digital-astro',
    tagline: 'Enterprise Digital Transformation Suite',
    category: 'Enterprise SaaS',
    version: 'Production v3.5',
    color: '#06b6d4',
    short_description:
      'End-to-end digital operations portal empowering businesses to orchestrate workflows, manage customer portals, and digitize paper processes.',
    description:
      'Digital Astro is a comprehensive enterprise orchestration suite that replaces legacy paper workflows and fragmented point solutions with unified digital customer portals, automated business processes, and bi-directional API bridges.',
    product_url: '',
    demo_url: '',
    docs_url: '',
    stats: [
      { label: 'Deployments', value: '300+' },
      { label: 'Workflow Efficiency', value: '+65%' },
      { label: 'API Integrations', value: '50+ Connectors' },
      { label: 'Platform SLA', value: '99.95%' },
    ],
    specs: {
      runtime: 'Next.js, Node.js & Multi-Cloud API Mesh',
      deployment: 'Enterprise Cloud & Managed Kubernetes',
      security: 'Enterprise SSO, SOC-2 Compliant Logs',
      sla: '99.95% Guaranteed Availability',
    },
    technologies: [
      { name: 'Next.js', category: 'Enterprise Portal', color: '#00d4ff' },
      { name: 'Node.js', category: 'Workflow Engine', color: '#10b981' },
      { name: 'GraphQL', category: 'Data Mesh', color: '#e10098' },
      { name: 'Docker', category: 'Infrastructure', color: '#2496ed' },
    ],
    features: [
      {
        title: 'Visual Workflow Automation',
        description: 'Design multi-stage approval pipelines, automated document generation, and status triggers with zero code.',
        specs: ['Drag-and-drop workflow builder', 'Conditional branch routing', 'Webhook event dispatches'],
      },
      {
        title: 'Branded Customer Self-Service Portals',
        description: 'Give clients dedicated access to upload files, submit project requests, and track service status live.',
        specs: ['White-label branding', 'Secure document exchange', 'Direct messaging with team'],
      },
      {
        title: 'Universal Enterprise Connectors',
        description: 'Sync effortlessly with legacy ERPs, payment processors, and modern CRM systems.',
        specs: ['Pre-built REST & GraphQL APIs', 'Bidirectional data sync', 'Automated error retry queues'],
      },
    ],
    codePreview: {
      language: 'bash',
      title: 'api.digitalastro.io/v1/workflows/trigger',
      command: `curl -X POST https://api.digitalastro.io/v1/workflows/trigger \\
  -H "Authorization: Bearer da_live_token_77" \\
  -d '{ "workflow_id": "wf_client_onboard_v2", "entity_id": "ent_9918" }'`,
      response: `{
  "status": "executing",
  "steps_total": 6,
  "current_step": "contract_generation",
  "execution_id": "exec_202610_442"
}`,
    },
  },
  'hotel-management-system': {
    id: 10,
    name: 'Hotel Management System',
    slug: 'hotel-management-system',
    tagline: 'All-in-One Hospitality PMS & Reservation Core',
    category: 'Hospitality Tech',
    version: 'Production v2.8',
    color: '#14b8a6',
    short_description:
      'Comprehensive property management software for hotels and resorts, unifying reservations, front-desk check-ins, billing, and housekeeping.',
    description:
      'Hotel Management System is an all-in-one hospitality PMS built to elevate guest experiences and maximize RevPAR. Unify direct online booking, OTA channel syncing, front-desk check-ins, room folio billing, POS restaurant orders, and housekeeping task dispatch.',
    product_url: '',
    demo_url: '',
    docs_url: '',
    stats: [
      { label: 'Occupancy Tracking', value: '98.5%' },
      { label: 'Channel Sync', value: 'Real-Time' },
      { label: 'Check-In Speed', value: '< 60 sec' },
      { label: 'System Uptime', value: '99.99%' },
    ],
    specs: {
      runtime: 'React, Node.js & Multi-Tenant PostgreSQL',
      deployment: 'Cloud Hosted with Offline POS Fallback',
      security: 'PCI-DSS Tokenized Payments & Encrypted Logs',
      sla: '99.99% Availability Guarantee',
    },
    technologies: [
      { name: 'React', category: 'PMS Front-Desk', color: '#00d4ff' },
      { name: 'Node.js', category: 'Booking Engine', color: '#10b981' },
      { name: 'PostgreSQL', category: 'Property Database', color: '#336791' },
      { name: 'Stripe', category: 'Payment Processing', color: '#6366f1' },
    ],
    features: [
      {
        title: 'Real-Time Room Inventory & OTA Channel Sync',
        description: 'Eliminate double-bookings with instant 2-way synchronization across direct websites, Booking.com, Agoda, and Expedia.',
        specs: ['Sub-second OTA rate sync', 'Overbooking prevention logic', 'Dynamic seasonal rate cards'],
      },
      {
        title: 'Front-Desk Express Check-In & Guest Folios',
        description: 'Handle check-ins and check-outs in under 60 seconds with digital identity scanning and consolidated billing folios.',
        specs: ['Digital signature capture', 'Consolidated minibar/restaurant billing', 'Keycard encoder integration'],
      },
      {
        title: 'Mobile Housekeeping Management',
        description: 'Equip housekeeping teams with real-time room cleaning status updates on their mobile devices.',
        specs: ['Instant clean/dirty room updates', 'Maintenance issue ticketing', 'Minibar consumption tracking'],
      },
    ],
    codePreview: {
      language: 'bash',
      title: 'api.hotelms.codeastro.io/v1/reservations/create',
      command: `curl -X POST https://api.hotelms.codeastro.io/v1/reservations/create \\
  -H "Authorization: Bearer hms_sec_4481" \\
  -d '{ "room_type": "deluxe_suite", "check_in": "2026-10-12", "check_out": "2026-10-15", "guests": 2 }'`,
      response: `{
  "reservation_id": "res_88190",
  "room_assigned": "Suite 402",
  "folio_total_usd": 750.00,
  "status": "confirmed_paid"
}`,
    },
  },
  'microcredit-management-system': {
    id: 11,
    name: 'Microcredit Management System',
    slug: 'microcredit-management-system',
    tagline: 'Microfinance & Loan Disbursement Platform',
    category: 'Microfinance Tech',
    version: 'Production v3.2',
    color: '#3b82f6',
    short_description:
      'Reliable financial software engineered for microfinance institutions, NGO credit programs, and cooperative societies with automated field collections.',
    description:
      'Microcredit Management System empowers microfinance institutions and NGOs to manage grassroots credit schemes. Featuring flexible repayment terms, offline-capable mobile field agent collections, savings passbooks, and portfolio default risk analytics.',
    product_url: '',
    demo_url: '',
    docs_url: '',
    stats: [
      { label: 'Loans Disbursed', value: '$18M+' },
      { label: 'Recovery Rate', value: '99.2%' },
      { label: 'Field Sync', value: 'Offline Ready' },
      { label: 'Audit Compliance', value: '100%' },
    ],
    specs: {
      runtime: 'React, Django & SQLite/Postgres Dual-Store',
      deployment: 'Central Cloud with Offline Field Agent Sync',
      security: 'Role-Based Branch Permissioning & Passbooks',
      sla: '99.95% Availability',
    },
    technologies: [
      { name: 'React', category: 'Branch Portal', color: '#00d4ff' },
      { name: 'Django', category: 'Core Credit Engine', color: '#10b981' },
      { name: 'PostgreSQL', category: 'Central Database', color: '#336791' },
      { name: 'Redis', category: 'Sync Pipeline', color: '#dc2626' },
    ],
    features: [
      {
        title: 'Flexible Loan Products & Schedules',
        description: 'Configure daily, weekly, or monthly repayment schedules with customizable flat or reducing balance interest schemes.',
        specs: ['Automated installment schedules', 'Penalty & grace period handling', 'Instant loan sanction workflow'],
      },
      {
        title: 'Offline-First Mobile Field Collection',
        description: 'Enable loan officers to record repayments and print receipts in rural areas with automatic sync upon internet connection.',
        specs: ['Offline local SQLite storage', 'Bluetooth thermal printer receipt support', 'Tamper-evident collection logs'],
      },
      {
        title: 'Portfolio at Risk (PAR) Analytics',
        description: 'Monitor delinquency rates and borrower repayment trends with real-time regulatory compliance indicators.',
        specs: ['PAR 30/60/90 default indicators', 'Branch-wise collection scorecards', 'Regulatory MRA report generation'],
      },
    ],
    codePreview: {
      language: 'bash',
      title: 'api.microcredit.codeastro.io/v1/collections/record',
      command: `curl -X POST https://api.microcredit.codeastro.io/v1/collections/record \\
  -H "Authorization: Bearer mc_sec_9918" \\
  -d '{ "loan_account": "ln_44018", "installment_num": 12, "amount_collected": 250.00 }'`,
      response: `{
  "receipt_no": "rcpt_991802",
  "principal_paid": 220.00,
  "interest_paid": 30.00,
  "remaining_balance": 1250.00,
  "status": "cleared"
}`,
    },
  },
  'digimind-live': {
    id: 12,
    name: 'digimind.live',
    slug: 'digimind-live',
    tagline: 'AI-Powered Mental Wellness & Cognitive Support',
    category: 'HealthTech & AI',
    version: 'Production v1.5',
    color: '#84cc16',
    short_description:
      'Next-generation AI cognitive health platform providing personalized support, mindfulness guidance, and real-time behavioral insights.',
    description:
      'digimind.live harnesses empathetic, privacy-preserving artificial intelligence to provide accessible cognitive wellness support. Delivering guided reflective sessions, emotional resilience exercises, and mood tracking to help users navigate daily stress and cultivate mental clarity.',
    product_url: 'https://digimind.live',
    demo_url: 'https://digimind.live',
    docs_url: '',
    stats: [
      { label: 'Active Users', value: '25,000+' },
      { label: 'Sessions Logged', value: '180,000+' },
      { label: 'Data Encryption', value: 'Zero-Knowledge' },
      { label: 'User Rating', value: '4.9 / 5' },
    ],
    specs: {
      runtime: 'Next.js, Python NLP Core & Secure Vector DB',
      deployment: 'HIPAA & GDPR-Ready Secure Cloud',
      security: 'End-to-End Encryption & Ephemeral Sessions',
      sla: '99.9% Availability SLA',
    },
    technologies: [
      { name: 'Next.js', category: 'Web App', color: '#00d4ff' },
      { name: 'Python', category: 'AI Inference Engine', color: '#84cc16' },
      { name: 'OpenAI', category: 'Conversational LLM', color: '#10b981' },
      { name: 'PostgreSQL', category: 'Encrypted Vault', color: '#336791' },
    ],
    features: [
      {
        title: 'Empathetic AI Conversational Companion',
        description: 'Trained on evidence-based cognitive behavioral frameworks to deliver supportive, non-judgmental reflective conversations.',
        specs: ['24/7 conversational availability', 'Safety crisis escalation filters', 'Personalized reflection exercises'],
      },
      {
        title: 'Zero-Knowledge Confidentiality',
        description: 'Client conversation logs and reflections are protected with military-grade client-side encryption.',
        specs: ['Client-side encryption keys', 'Zero model-training on user data', 'Anonymous usage mode support'],
      },
      {
        title: 'Longitudinal Wellness & Mood Analytics',
        description: 'Help users discover patterns in their emotional states over time with interactive clarity dashboards.',
        specs: ['Daily mood trajectory graphs', 'Habit correlation insights', 'Downloadable wellness journals'],
      },
    ],
    codePreview: {
      language: 'bash',
      title: 'digimind.live :: session connect',
      command: `curl -X POST https://api.digimind.live/v1/sessions/initiate \\
  -H "Authorization: Bearer dm_token_anonymous" \\
  -d '{ "session_mode": "reflective_checkin" }'`,
      response: `{
  "session_token": "dm_ses_88204",
  "encryption": "aes256_e2e_verified",
  "welcome_prompt": "Hello. How are you feeling right now at this moment?",
  "status": "ready"
}`,
    },
  },
  // Alias for dot notation slug
  'digimind.live': {
    id: 12,
    name: 'digimind.live',
    slug: 'digimind-live',
    tagline: 'AI-Powered Mental Wellness & Cognitive Support',
    category: 'HealthTech & AI',
    version: 'Production v1.5',
    color: '#84cc16',
    short_description:
      'Next-generation AI cognitive health platform providing personalized support, mindfulness guidance, and real-time behavioral insights.',
    description:
      'digimind.live harnesses empathetic, privacy-preserving artificial intelligence to provide accessible cognitive wellness support. Delivering guided reflective sessions, emotional resilience exercises, and mood tracking to help users navigate daily stress and cultivate mental clarity.',
    product_url: 'https://digimind.live',
    demo_url: 'https://digimind.live',
    docs_url: '',
    stats: [
      { label: 'Active Users', value: '25,000+' },
      { label: 'Sessions Logged', value: '180,000+' },
      { label: 'Data Encryption', value: 'Zero-Knowledge' },
      { label: 'User Rating', value: '4.9 / 5' },
    ],
    specs: {
      runtime: 'Next.js, Python NLP Core & Secure Vector DB',
      deployment: 'HIPAA & GDPR-Ready Secure Cloud',
      security: 'End-to-End Encryption & Ephemeral Sessions',
      sla: '99.9% Availability SLA',
    },
    technologies: [
      { name: 'Next.js', category: 'Web App', color: '#00d4ff' },
      { name: 'Python', category: 'AI Inference Engine', color: '#84cc16' },
      { name: 'OpenAI', category: 'Conversational LLM', color: '#10b981' },
      { name: 'PostgreSQL', category: 'Encrypted Vault', color: '#336791' },
    ],
    features: [
      {
        title: 'Empathetic AI Conversational Companion',
        description: 'Trained on evidence-based cognitive behavioral frameworks to deliver supportive, non-judgmental reflective conversations.',
        specs: ['24/7 conversational availability', 'Safety crisis escalation filters', 'Personalized reflection exercises'],
      },
      {
        title: 'Zero-Knowledge Confidentiality',
        description: 'Client conversation logs and reflections are protected with military-grade client-side encryption.',
        specs: ['Client-side encryption keys', 'Zero model-training on user data', 'Anonymous usage mode support'],
      },
      {
        title: 'Longitudinal Wellness & Mood Analytics',
        description: 'Help users discover patterns in their emotional states over time with interactive clarity dashboards.',
        specs: ['Daily mood trajectory graphs', 'Habit correlation insights', 'Downloadable wellness journals'],
      },
    ],
    codePreview: {
      language: 'bash',
      title: 'digimind.live :: session connect',
      command: `curl -X POST https://api.digimind.live/v1/sessions/initiate \\
  -H "Authorization: Bearer dm_token_anonymous" \\
  -d '{ "session_mode": "reflective_checkin" }'`,
      response: `{
  "session_token": "dm_ses_88204",
  "encryption": "aes256_e2e_verified",
  "welcome_prompt": "Hello. How are you feeling right now at this moment?",
  "status": "ready"
}`,
    },
  },
}

import HeroParallaxFlare from '@/components/ui/HeroParallaxFlare'

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [copied, setCopied] = useState(false)

  const { data: apiProduct } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProduct(slug!),
    enabled: !!slug,
    retry: false,
  })

  // Lookup custom rich data or fallback
  const currentSlug = slug || 'astro-hr'
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
        <HeroParallaxFlare accentColor={accentColor} />

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
