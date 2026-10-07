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
  Smartphone,
  ShoppingBag,
  GraduationCap,
  Brain,
  Users,
  ShieldAlert,
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

const customSoftwareData: ServiceData = {
  id: 1,
  name: 'Custom Software Development',
  slug: 'custom-software-development',
  tagline: 'Tailored Enterprise & Cloud Architectures',
  short_description:
    'Build customized software solutions tailored to specific business requirements and workflows.',
  description:
    'Build customized software solutions tailored to specific business requirements and workflows. From distributed cloud architectures and microservices to tailored business tools, we design scalable software engineered for longevity and performance.',
  icon: Code2,
  color: '#0066ff',
  sla: '99.99% Availability SLA',
  deliveryTime: '6–12 Weeks MVP',
  communication: 'Daily Async Standups + Bi-Weekly Demos',
  stats: [
    { label: 'System Uptime SLA', value: '99.99%' },
    { label: 'P99 Query Latency', value: '< 15ms' },
    { label: 'Architecture Scale', value: 'Horizontal' },
    { label: 'Code Ownership', value: '100% Client' },
  ],
  technologies: [
    { name: 'TypeScript', category: 'Language', color: '#3178c6' },
    { name: 'React / Next.js', category: 'Frontend', color: '#00d4ff' },
    { name: 'Python / Django', category: 'Backend', color: '#0066ff' },
    { name: 'Go / Golang', category: 'High-Perf Backend', color: '#38bdf8' },
    { name: 'PostgreSQL', category: 'Relational DB', color: '#336791' },
    { name: 'Redis Cluster', category: 'In-Memory Cache', color: '#dc2626' },
    { name: 'Docker & Kubernetes', category: 'Container Infra', color: '#2496ed' },
  ],
  features: [
    {
      title: 'Bespoke Enterprise Systems',
      description: 'Tailored software architectures designed to match your specific organizational processes and data models.',
      specs: ['Custom business logic engines', 'Zero bloat or legacy dependencies', 'Built for future feature scalability'],
    },
    {
      title: 'Scalable Microservices Fabric',
      description: 'Decoupled, high-concurrency microservices communicating with low latency and automated failover.',
      specs: ['Decoupled fault domains', 'Fast binary gRPC & REST', 'Automatic retry & dead-letter queue'],
    },
    {
      title: 'API Integration & Data Pipelines',
      description: 'Reliable connectors for external APIs, payment channels, ERPs, and cloud storage providers.',
      specs: ['Secure authenticated endpoints', 'Real-time event streaming', 'Comprehensive OpenAPI specs'],
    },
    {
      title: 'Zero-Trust Enterprise Security',
      description: 'End-to-end cryptographic transport encryption, role-based access control, and complete audit trails.',
      specs: ['Strict RBAC policies', 'AES-256 encrypted storage', 'SOC-2 compliant logging'],
    },
  ],
  process: [
    { phase: 'PHASE 01', title: 'Requirements & Architecture Blueprint', desc: 'Analyze workflows, specify system boundaries, and design relational schemas.', deliverables: 'Architecture Spec, Schema Blueprint, Sprint Milestones' },
    { phase: 'PHASE 02', title: 'Foundation & Core Engineering', desc: 'Set up infrastructure as code, container scaffolding, and database foundations.', deliverables: 'Staging Environment, CI/CD Pipeline, Core Endpoints' },
    { phase: 'PHASE 03', title: 'Agile Sprints & Integration', desc: 'Bi-weekly sprint demos, continuous automated unit/stress testing, and feedback cycles.', deliverables: 'Working Feature Releases, Automated Test Suite' },
    { phase: 'PHASE 04', title: 'Hardening & Deployment', desc: 'Penetration testing, load verification, production DNS cutover, and monitoring handover.', deliverables: 'Production Release, Runbooks, 24/7 Monitoring' },
  ],
}

const mobileAppData: ServiceData = {
  id: 2,
  name: 'Mobile App Development',
  slug: 'mobile-app-development',
  tagline: 'High-Performance iOS & Android Applications',
  short_description:
    'Develop modern, responsive, and user-friendly mobile applications for Android and iOS.',
  description:
    'Develop modern, responsive, and user-friendly mobile applications for Android and iOS. We combine fluid user interfaces with native performance, offline-first reliability, and seamless API integrations.',
  icon: Smartphone,
  color: '#00d4ff',
  sla: '60fps Native Speed',
  deliveryTime: '6–10 Weeks MVP',
  communication: 'Bi-Weekly TestFlight & APK Releases',
  stats: [
    { label: 'Target Framerate', value: '60+ FPS' },
    { label: 'Offline Sync', value: 'Instant' },
    { label: 'App Store Pass Rate', value: '100%' },
    { label: 'Platforms Supported', value: 'iOS & Android' },
  ],
  technologies: [
    { name: 'Flutter', category: 'Cross-Platform', color: '#02569b' },
    { name: 'React Native', category: 'Cross-Platform', color: '#61dafb' },
    { name: 'Swift / SwiftUI', category: 'Native iOS', color: '#f05138' },
    { name: 'Kotlin', category: 'Native Android', color: '#7f52ff' },
    { name: 'SQLite / Realm', category: 'Local Storage', color: '#336791' },
    { name: 'Firebase & APNs', category: 'Push Notifications', color: '#f59e0b' },
  ],
  features: [
    {
      title: 'Cross-Platform & Native Architectures',
      description: 'Single codebase efficiency or native performance tailored to your app performance requirements.',
      specs: ['Near-zero latency touch input', 'Native platform hardware bindings', 'Consistent cross-platform design'],
    },
    {
      title: 'Offline-First Synchronization',
      description: 'Local caching enables full app functionality without internet, syncing seamlessly once back online.',
      specs: ['Conflict-free replicated data', 'Background sync daemon', 'Encrypted local SQLite storage'],
    },
    {
      title: 'Biometric & Modern Auth',
      description: 'Frictionless security via FaceID, TouchID, fingerprint authentication, and OAuth social login.',
      specs: ['Hardware keychain integration', 'Encrypted biometric tokens', 'Instant PIN fallback'],
    },
    {
      title: 'Fluid 60fps Micro-Animations',
      description: 'Pixel-perfect interfaces and responsive gestures that feel buttery smooth and engaging.',
      specs: ['Hardware-accelerated rendering', 'Adaptive haptic feedback', 'Natural drag-and-swipe gestures'],
    },
  ],
  process: [
    { phase: 'PHASE 01', title: 'User Flows & Wireframes', desc: 'Define intuitive mobile navigation, screen flows, and interactive mockups.', deliverables: 'Clickable Prototype, App Sitemap' },
    { phase: 'PHASE 02', title: 'Component Engineering', desc: 'Implement core views, native device bindings, and API connectivity.', deliverables: 'Alpha Build, API Client Layer' },
    { phase: 'PHASE 03', title: 'Cross-Device QA & TestFlight', desc: 'Test across various screen sizes, Android versions, and iOS devices.', deliverables: 'Beta Builds via TestFlight and Google Play' },
    { phase: 'PHASE 04', title: 'Store Publishing & Launch', desc: 'Handle App Store and Google Play reviews, metadata, and production release.', deliverables: 'Live App Store & Play Store Listings' },
  ],
}

const ecommerceData: ServiceData = {
  id: 3,
  name: 'E-commerce Solutions',
  slug: 'ecommerce-solutions',
  tagline: 'Scalable Digital Commerce & Multi-Vendor Stores',
  short_description:
    'Build complete and scalable e-commerce solutions for online businesses, including product, order, payment, and customer management.',
  description:
    'Build complete and scalable e-commerce solutions for online businesses, including product, order, payment, and customer management. We engineer conversion-optimized online storefronts, payment gateways, inventory automation, and multi-channel commerce tools.',
  icon: ShoppingBag,
  color: '#10b981',
  sla: 'High-Conversion Checkout',
  deliveryTime: '4–8 Weeks Launch',
  communication: 'Weekly Sprint Reviews + Live Staging Store',
  stats: [
    { label: 'Checkout Latency', value: '< 200ms' },
    { label: 'Payment Success Rate', value: '99.8%' },
    { label: 'Catalog Capacity', value: '100K+ SKUs' },
    { label: 'Security Standard', value: 'PCI-DSS Ready' },
  ],
  technologies: [
    { name: 'React / Next.js', category: 'Storefront', color: '#00d4ff' },
    { name: 'Node.js / Django', category: 'Backend Engine', color: '#0066ff' },
    { name: 'PostgreSQL', category: 'Product Database', color: '#336791' },
    { name: 'Redis', category: 'Cart & Session Cache', color: '#dc2626' },
    { name: 'Stripe & PayPal', category: 'Payment Gateways', color: '#6366f1' },
    { name: 'Elasticsearch', category: 'Product Search', color: '#f59e0b' },
  ],
  features: [
    {
      title: 'Storefront & Product Catalog',
      description: 'Instant faceted search, variant selectors, stock statuses, and high-resolution galleries.',
      specs: ['Sub-second product search', 'Dynamic attribute filtering', 'SEO-optimized product pages'],
    },
    {
      title: 'Order & Inventory Automation',
      description: 'Automated order processing, multi-warehouse stock management, and fulfillment status updates.',
      specs: ['Real-time stock deduction', 'Automated packing slips & invoices', 'Shipping carrier API webhooks'],
    },
    {
      title: 'Multi-Gateway Payment Checkout',
      description: 'Fast, secure checkout supporting credit cards, mobile wallets, and regional payment providers.',
      specs: ['One-step checkout experience', 'PCI-DSS tokenization', 'Automated fraud protection filters'],
    },
    {
      title: 'Customer Accounts & Retention',
      description: 'Order history, wishlist tracking, promotional discount coupons, and automated email receipts.',
      specs: ['Self-serve customer portals', 'Dynamic promotional engine', 'Abandoned cart recovery workflows'],
    },
  ],
  process: [
    { phase: 'PHASE 01', title: 'Catalog & Business Rules Discovery', desc: 'Map product hierarchies, tax requirements, shipping zones, and payment accounts.', deliverables: 'E-commerce Architecture Blueprint, Data Model' },
    { phase: 'PHASE 02', title: 'Storefront & Checkout Build', desc: 'Design responsive storefront UI, shopping cart state, and payment integrations.', deliverables: 'Interactive Staging Store, Payment Sandboxes' },
    { phase: 'PHASE 03', title: 'Inventory & Admin Panel Setup', desc: 'Configure order management dashboard, warehouse inventory sync, and email triggers.', deliverables: 'Admin Panel, Automated Invoicing Engine' },
    { phase: 'PHASE 04', title: 'Load Simulation & Launch', desc: 'Conduct simulated checkout surges, verify security certificates, and execute domain switch.', deliverables: 'Live Production Storefront, Operator Guide' },
  ],
}

const webDevData: ServiceData = {
  id: 4,
  name: 'Web Development',
  slug: 'web-development',
  tagline: 'Modern, Secure & Responsive Web Platforms',
  short_description:
    'Develop modern, secure, responsive, and high-performance websites and web applications.',
  description:
    'Develop modern, secure, responsive, and high-performance websites and web applications. We engineer responsive web applications that combine pixel-perfect UI aesthetics with fast loading speeds, bulletproof security, and modern web standards.',
  icon: Globe,
  color: '#38bdf8',
  sla: 'Sub-second Load Times',
  deliveryTime: '4–8 Weeks Deployment',
  communication: 'Daily Git Commits + Weekly Demo Calls',
  stats: [
    { label: 'Core Web Vitals', value: '95+ Score' },
    { label: 'First Contentful Paint', value: '< 0.8s' },
    { label: 'Responsive Coverage', value: '100% Devices' },
    { label: 'SEO Compliance', value: 'Engineered In' },
  ],
  technologies: [
    { name: 'React', category: 'Frontend', color: '#00d4ff' },
    { name: 'TypeScript', category: 'Type Safety', color: '#3178c6' },
    { name: 'Next.js / Vite', category: 'Build Tooling', color: '#000000' },
    { name: 'Tailwind CSS', category: 'Styling', color: '#06b6d4' },
    { name: 'REST / GraphQL', category: 'Data Fetching', color: '#e10098' },
    { name: 'Node.js / Python', category: 'API Backend', color: '#339933' },
  ],
  features: [
    {
      title: 'Modern Frontend Architecture',
      description: 'Component-driven codebases built on React and TypeScript ensuring maintainability and speed.',
      specs: ['Reusable component libraries', 'Type-safe state management', 'Modular clean architecture'],
    },
    {
      title: 'Mobile-First Responsive Layouts',
      description: 'Fluid designs that adjust effortlessly from small smartphone screens to large 4K monitors.',
      specs: ['Adaptive typography & spacing', 'Cross-browser compatibility', 'Touch-friendly navigation controls'],
    },
    {
      title: 'Performance & SEO Optimization',
      description: 'Optimized asset bundling, code splitting, dynamic meta tags, and structured schema markup.',
      specs: ['Sub-second page transitions', 'Optimized WebP/SVG images', 'Comprehensive Open Graph & Twitter cards'],
    },
    {
      title: 'Hardened Security & Best Practices',
      description: 'Secure authentication workflows, CSRF protection, sanitized user inputs, and strict headers.',
      specs: ['Content Security Policy (CSP)', 'OWASP Top 10 defenses', 'SSL/TLS A+ rating configuration'],
    },
  ],
  process: [
    { phase: 'PHASE 01', title: 'Design System & Architecture', desc: 'Create component design tokens, typography scale, responsive breakpoints, and site maps.', deliverables: 'Figma Design System, Tech Stack Specification' },
    { phase: 'PHASE 02', title: 'Component & Page Development', desc: 'Implement modular UI components, integrate backend APIs, and configure routing.', deliverables: 'Responsive Staging Site, Dynamic Page Templates' },
    { phase: 'PHASE 03', title: 'Cross-Browser & Performance QA', desc: 'Run automated lighthouse audits, responsive testing across 20+ device viewports.', deliverables: 'Lighthouse Performance Report, QA Sign-Off' },
    { phase: 'PHASE 04', title: 'Deployment & SEO Verification', desc: 'Deploy to high-speed CDN, configure domain DNS, submit XML sitemaps to search engines.', deliverables: 'Live Production URL, Analytics Dashboard' },
  ],
}

const trainingData: ServiceData = {
  id: 5,
  name: 'Training & Earning',
  slug: 'training-earning',
  tagline: 'Hands-On Tech Skills & Career Development',
  short_description:
    'Provide practical technology training and help learners develop digital skills for professional and earning opportunities.',
  description:
    'Provide practical technology training and help learners develop digital skills for professional and earning opportunities. Our hands-on curriculums cover software development, digital platforms, problem-solving, and practical project building to empower careers in the global digital economy.',
  icon: GraduationCap,
  color: '#8b5cf6',
  sla: 'Industry Ready Skills',
  deliveryTime: '8–16 Weeks Bootcamps',
  communication: 'Live Mentorship Sessions + Dedicated Discord/Slack',
  stats: [
    { label: 'Practical Project Ratio', value: '80% Hands-On' },
    { label: 'Industry Curriculum', value: '100% Modern' },
    { label: 'Mentor Availability', value: 'Daily Support' },
    { label: 'Career Outcomes', value: 'Job & Freelance' },
  ],
  technologies: [
    { name: 'JavaScript & TS', category: 'Programming', color: '#f7df1e' },
    { name: 'React & Frontend', category: 'Web Framework', color: '#00d4ff' },
    { name: 'Python & Django', category: 'Backend Track', color: '#0066ff' },
    { name: 'Git & GitHub', category: 'Version Control', color: '#f05032' },
    { name: 'SQL & Databases', category: 'Data Management', color: '#336791' },
    { name: 'Freelance Platforms', category: 'Career Strategy', color: '#10b981' },
  ],
  features: [
    {
      title: 'Practical Project Curriculum',
      description: 'Learn by building real, working web applications and software tools instead of theoretical slide decks.',
      specs: ['Portfolio-ready capstone projects', 'Industry-standard git workflows', 'Clean code conventions'],
    },
    {
      title: 'Direct Senior Engineer Mentorship',
      description: 'Get code reviews, live pair programming, and architectural feedback from working software engineers.',
      specs: ['Line-by-line pull request reviews', 'Weekly 1-on-1 office hours', 'Real-world problem troubleshooting'],
    },
    {
      title: 'Career & Earning Roadmap',
      description: 'Guidance on building compelling developer portfolios, resume optimization, and freelance pitching.',
      specs: ['Upwork & remote job strategies', 'Technical interview prep', 'Contract negotiation basics'],
    },
    {
      title: 'Collaborative Learning Community',
      description: 'Engage with fellow learners, collaborate on group projects, and build a lasting professional network.',
      specs: ['Active community forum', 'Hackathons and coding challenges', 'Alumni support network'],
    },
  ],
  process: [
    { phase: 'PHASE 01', title: 'Fundamentals & Tooling Setup', desc: 'Master development environment configuration, git version control, and core programming principles.', deliverables: 'Configured Dev Environment, First Code Repositories' },
    { phase: 'PHASE 02', title: 'Full-Stack Project Development', desc: 'Build responsive frontend interfaces, design backend APIs, and connect relational databases.', deliverables: 'Interactive Web Apps, Working REST APIs' },
    { phase: 'PHASE 03', title: 'Capstone Product Engineering', desc: 'Plan and build a complete full-stack product with authentication, database, and cloud deployment.', deliverables: 'Published Live Capstone Project, Public GitHub Code' },
    { phase: 'PHASE 04', title: 'Portfolio & Earning Launch', desc: 'Craft professional developer portfolio, optimize LinkedIn/GitHub profiles, and begin client outreach.', deliverables: 'Professional Portfolio Website, Career Readiness Certificate' },
  ],
}

const aiAutomationData: ServiceData = {
  id: 6,
  name: 'AI Automation',
  slug: 'ai-automation',
  tagline: 'Intelligent Process Automation & Workflow Efficiency',
  short_description:
    'Use AI-powered automation to streamline business processes, reduce repetitive tasks, improve productivity, and increase operational efficiency.',
  description:
    'Use AI-powered automation to streamline business processes, reduce repetitive tasks, improve productivity, and increase operational efficiency. We implement intelligent agents, automated document processors, and smart workflows that save hours of manual labor every week.',
  icon: Brain,
  color: '#f59e0b',
  sla: 'Automated Efficiency',
  deliveryTime: '4–8 Weeks Integration',
  communication: 'Weekly Iteration Demos + Metric Dashboards',
  stats: [
    { label: 'Time Saved per Process', value: '70%+' },
    { label: 'Processing Accuracy', value: '99.2%' },
    { label: 'Automation Response', value: 'Instant' },
    { label: 'Integrations Supported', value: '50+ Apps' },
  ],
  technologies: [
    { name: 'Python', category: 'Core Language', color: '#3776ab' },
    { name: 'OpenAI / Claude APIs', category: 'LLM Foundations', color: '#10a37f' },
    { name: 'LangChain & LlamaIndex', category: 'AI Orchestration', color: '#1c3c3c' },
    { name: 'pgvector / Qdrant', category: 'Vector Retrieval', color: '#00d4ff' },
    { name: 'Zapier / n8n / Make', category: 'Workflow Pipelines', color: '#ff4f00' },
    { name: 'FastAPI', category: 'API Serving', color: '#009688' },
  ],
  features: [
    {
      title: 'End-to-End Workflow Automation',
      description: 'Connect disparate software tools to automate data transfer, alerts, customer updates, and filings.',
      specs: ['Zero manual data entry', 'Trigger-based webhook pipelines', 'Automated error alerts and retries'],
    },
    {
      title: 'Intelligent Document Extraction',
      description: 'Extract structured data from unstructured invoices, PDFs, contracts, and customer forms automatically.',
      specs: ['High-accuracy OCR parsing', 'Table and field extraction', 'Automated CRM & database sync'],
    },
    {
      title: 'Customer & Internal AI Assistants',
      description: 'Deploy domain-trained chatbots that answer support queries and retrieve internal knowledge instantly.',
      specs: ['Grounding in your company data', 'Hallucination prevention guardrails', 'Seamless human escalation handoff'],
    },
    {
      title: 'Operational Productivity Dashboards',
      description: 'Track time saved, tasks completed, and cost efficiencies gained from automated processes in real time.',
      specs: ['Live throughput metrics', 'Cost per task analytics', 'Audit logs for every automated action'],
    },
  ],
  process: [
    { phase: 'PHASE 01', title: 'Workflow Audit & ROI Mapping', desc: 'Identify highest-leverage repetitive bottlenecks and define clear time-saving targets.', deliverables: 'Automation Feasibility Report, Process Map' },
    { phase: 'PHASE 02', title: 'Data Pipeline & AI Prototype', desc: 'Set up connectors, test model extraction accuracy, and validate edge cases.', deliverables: 'Working Proof-of-Concept, Accuracy Benchmark' },
    { phase: 'PHASE 03', title: 'Integration & Guardrail Tuning', desc: 'Integrate automated workflows into existing CRM, database, and communication tools.', deliverables: 'Automated Pipeline on Staging, Fallback Rules' },
    { phase: 'PHASE 04', title: 'Production Rollout & Monitoring', desc: 'Deploy live automation, train internal team, and configure automated error monitoring.', deliverables: 'Production Automation Suite, Efficiency Dashboard' },
  ],
}

const remoteDeveloperData: ServiceData = {
  id: 7,
  name: 'Remote Developer Hiring',
  slug: 'remote-developer-hiring',
  tagline: 'Vetted Dedicated Tech Talent & Team Augmentation',
  short_description:
    'Help businesses hire skilled remote developers according to their project requirements and technical needs.',
  description:
    'Help businesses hire skilled remote developers according to their project requirements and technical needs. Scale your tech team seamlessly with vetted, senior engineers proficient in modern web, mobile, backend, and DevOps technologies.',
  icon: Users,
  color: '#ec4899',
  sla: 'Top 3% Vetted Talent',
  deliveryTime: '1–2 Weeks Placement',
  communication: 'Direct Slack, Jira & Daily Standups',
  stats: [
    { label: 'Vetting Acceptance Rate', value: 'Top 3%' },
    { label: 'Onboarding Speed', value: '< 10 Days' },
    { label: 'Developer Retention', value: '94%+' },
    { label: 'Trial Period', value: '2-Week Risk Free' },
  ],
  technologies: [
    { name: 'React / Next.js', category: 'Frontend', color: '#00d4ff' },
    { name: 'Python / Django', category: 'Backend', color: '#0066ff' },
    { name: 'Node.js / Express', category: 'Backend', color: '#339933' },
    { name: 'Flutter & Mobile', category: 'Mobile Apps', color: '#02569b' },
    { name: 'PostgreSQL / MySQL', category: 'Databases', color: '#336791' },
    { name: 'Docker / Cloud', category: 'DevOps', color: '#2496ed' },
  ],
  features: [
    {
      title: 'Rigorous Technical & Soft Skill Vetting',
      description: 'Every developer undergoes live coding assessments, system architecture interviews, and communication checks.',
      specs: ['Live coding evaluation', 'System design interview', 'Fluent English communication verification'],
    },
    {
      title: 'Seamless Tool & Culture Integration',
      description: 'Engineers adapt directly into your GitHub, Jira, Slack, and daily sprint rhythm from Day 1.',
      specs: ['Time zone overlap flexibility', 'Immediate repository access', 'Familiar with modern agile cadences'],
    },
    {
      title: 'Flexible Team Augmentation Models',
      description: 'Scale up or adjust your engineering capacity on-demand with part-time, full-time, or pod contracts.',
      specs: ['Zero long-term lock-in', 'No recruitment overhead fees', 'Simple consolidated invoicing'],
    },
    {
      title: 'Dedicated Account & Performance Support',
      description: 'Continuous check-ins to ensure your developer meets expectations and delivers measurable sprint outputs.',
      specs: ['Regular milestone check-ins', 'Replacement guarantee if not a fit', 'Continuous skill upskilling support'],
    },
  ],
  process: [
    { phase: 'PHASE 01', title: 'Skill Profile & Stack Definition', desc: 'Understand your project tech stack, required seniority, time zone needs, and milestone goals.', deliverables: 'Candidate Profile Spec, Screening Criteria' },
    { phase: 'PHASE 02', title: 'Shortlisting & Client Interviews', desc: 'Select from pre-screened senior engineers and conduct direct technical interviews.', deliverables: 'Curated Candidate Portfolios, Interview Schedules' },
    { phase: 'PHASE 03', title: '2-Week Trial & Onboarding', desc: 'Integrate the selected engineer into your sprint cycle with a risk-free trial period.', deliverables: 'Repository Access, First Completed Sprint Tasks' },
    { phase: 'PHASE 04', title: 'Dedicated Scaling & Milestones', desc: 'Long-term productive contribution with regular management check-ins and performance alignment.', deliverables: 'Continuous Feature Releases, Sprint Delivery' },
  ],
}

const malwareData: ServiceData = {
  id: 8,
  name: 'Website Malware Detection & Removal',
  slug: 'malware-detection-removal',
  tagline: 'Comprehensive Web Security & Threat Cleanup',
  short_description:
    'Detect and remove malware, malicious code, suspicious files, redirects, and other security threats from compromised websites.',
  description:
    'Detect and remove malware, malicious code, suspicious files, redirects, and other security threats from compromised websites. We disinfect compromised websites, restore normal operation, patch vulnerabilities, and implement proactive defenses against recurring attacks.',
  icon: ShieldAlert,
  color: '#ef4444',
  sla: 'Rapid Security Response',
  deliveryTime: '24–48 Hours Disinfection',
  communication: 'Direct Security Incident Updates',
  stats: [
    { label: 'Malware Removal Rate', value: '100% Clean' },
    { label: 'Emergency Response', value: '< 2 Hours' },
    { label: 'Blacklist Delisting', value: 'Google Verified' },
    { label: 'Post-Clean Warranty', value: '30-Day Guarantee' },
  ],
  technologies: [
    { name: 'PHP & WordPress', category: 'CMS Security', color: '#21759b' },
    { name: 'Linux / Nginx / Apache', category: 'Server Hardening', color: '#f59e0b' },
    { name: 'ClamAV / Maldet', category: 'Scanner Engines', color: '#ef4444' },
    { name: 'Web Application Firewall', category: 'WAF Protection', color: '#0066ff' },
    { name: 'SSL / TLS Certificates', category: 'Transport Crypto', color: '#10b981' },
    { name: 'Google Search Console', category: 'Blacklist Removal', color: '#4285f4' },
  ],
  features: [
    {
      title: 'Deep File & Webshell Scanning',
      description: 'Comprehensive static and behavioral scanning uncovering hidden backdoors, obfuscated eval scripts, and webshells.',
      specs: ['Core file integrity verification', 'Signature & heuristic detection', 'Identification of unauthorized admin accounts'],
    },
    {
      title: 'Malicious Redirect Elimination',
      description: 'Clean .htaccess exploits, corrupt Nginx configs, and JavaScript hooks that redirect your visitors to malicious sites.',
      specs: ['Search engine cloaking cleanup', 'SEO spam & pharma link removal', 'Mobile redirect eradication'],
    },
    {
      title: 'Database & Cron Sanitization',
      description: 'Scan SQL databases for injected scripts, base64 payloads, rogue scheduled cron jobs, and unauthorized users.',
      specs: ['SQL payload neutralization', 'Elimination of rogue cron tasks', 'Secure database password rotation'],
    },
    {
      title: 'Hardening & Blacklist Delisting',
      description: 'Install hardened firewall rules, update security patches, and submit expedited review requests to Google Safe Browsing.',
      specs: ['Google red warning screen removal', 'Web Application Firewall (WAF) deployment', 'File permission lockdown'],
    },
  ],
  process: [
    { phase: 'PHASE 01', title: 'Emergency Containment & Full Backup', desc: 'Isolate compromised files, create secure uncorrupted backups, and prevent further infection spread.', deliverables: 'Secure Offline Snapshot, Attack Vector Diagnosis' },
    { phase: 'PHASE 02', title: 'Deep Disinfection & Code Cleanup', desc: 'Remove backdoors, infected scripts, malicious database rows, and restore clean core files.', deliverables: 'Cleaned Codebase, Clean Database Verification' },
    { phase: 'PHASE 03', title: 'Vulnerability Patching & Hardening', desc: 'Patch underlying security holes, update vulnerable plugins, and configure active WAF rules.', deliverables: 'Hardened Server Configuration, Installed Firewall' },
    { phase: 'PHASE 04', title: 'Blacklist Delisting & Handover', desc: 'Request reviews from Google Safe Browsing, verify clean status, and provide full security audit report.', deliverables: 'Google Delisting Approval, Prevention Audit Report' },
  ],
}

const SERVICES_DATA: Record<string, ServiceData> = {
  'custom-software-development': customSoftwareData,
  'custom-software': customSoftwareData,
  'mobile-app-development': mobileAppData,
  'mobile': mobileAppData,
  'ecommerce-solutions': ecommerceData,
  'web-development': webDevData,
  'training-earning': trainingData,
  'ai-automation': aiAutomationData,
  'ai-cloud': aiAutomationData,
  'ai-ml': aiAutomationData,
  'remote-developer-hiring': remoteDeveloperData,
  'malware-detection-removal': malwareData,
}

import HeroParallaxFlare from '@/components/ui/HeroParallaxFlare'

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()

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
        <HeroParallaxFlare accentColor={accentColor} />

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
