import axios from 'axios';
import type {
  SiteSettings, HeroSection, Statistic, ProcessStep, FAQ,
  TeamMember, Client, MenuItem, Technology, Industry, Service,
  Project, Product, Testimonial, BlogPost, BlogCategory,
  ContactFormData, PaginatedResponse
} from '@/types/api';

const BASE_URL = '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Fallback data for development when API is unavailable
const FALLBACK: Partial<Record<string, unknown>> = {};

async function fetchOrFallback<T>(url: string, fallback?: T): Promise<T> {
  try {
    const res = await api.get<T>(url);
    return res.data;
  } catch {
    if (fallback !== undefined) return fallback;
    throw new Error(`Failed to fetch ${url}`);
  }
}

// ─── Site Settings ───────────────────────────────────────────────
export const getSiteSettings = (): Promise<SiteSettings> =>
  fetchOrFallback<SiteSettings>('/site-settings/', {
    id: 1, company_name: 'Code Astro', tagline: 'We Build Software That Moves Businesses Forward.',
    description: '', logo: null, logo_dark: null, favicon: null,
    email: 'hello@codeastro.io', phone: '+1 (555) 000-1234', address: '100 Innovation Drive',
    city: 'San Francisco', country: 'USA',
    linkedin_url: '', twitter_url: '', github_url: '', facebook_url: '',
    instagram_url: '', youtube_url: '', dribbble_url: '',
    meta_title: 'Code Astro — Premium Software Engineering', meta_description: '', og_image: null,
    theme: 'dark', primary_color: '#0066ff', accent_color: '#00d4ff',
    footer_description: 'We engineer digital products that transform industries.',
    footer_copyright: '© 2026 Code Astro. All rights reserved.',
    newsletter_enabled: true, newsletter_title: 'Stay in the Loop', newsletter_subtitle: '',
  } as SiteSettings);

// ─── Hero ─────────────────────────────────────────────────────────
export const getHero = (): Promise<HeroSection> =>
  fetchOrFallback<HeroSection>('/hero/', {
    id: 1,
    headline: 'We Build Software That Moves Businesses Forward',
    headline_highlight: 'Moves Businesses Forward',
    subheadline: 'From product conception to enterprise scale — we engineer digital solutions that transform industries, accelerate growth, and define the future of technology.',
    primary_cta_text: 'Explore Our Work', primary_cta_url: '/projects',
    secondary_cta_text: 'Start a Project', secondary_cta_url: '/contact',
    background_image: null, background_video: null,
  } as HeroSection);

// ─── Statistics ───────────────────────────────────────────────────
export const getStatistics = (): Promise<PaginatedResponse<Statistic>> =>
  fetchOrFallback('/statistics/', {
    count: 6, next: null, previous: null,
    results: [
      { id: 1, label: 'Products Built', value: '50+', description: 'Across 20+ industries', icon: 'Package', sort_order: 1 },
      { id: 2, label: 'Industries Served', value: '20+', description: 'From FinTech to Healthcare', icon: 'Globe', sort_order: 2 },
      { id: 3, label: 'Infrastructure Uptime', value: '99.9%', description: 'Enterprise reliability', icon: 'Server', sort_order: 3 },
      { id: 4, label: 'Years Experience', value: '8+', description: 'Building premium software', icon: 'Calendar', sort_order: 4 },
      { id: 5, label: 'Team Members', value: '60+', description: 'World-class engineers', icon: 'Users', sort_order: 5 },
      { id: 6, label: 'Client Satisfaction', value: '98%', description: 'Rated by clients', icon: 'ShieldCheck', sort_order: 6 },
    ]
  });

// ─── Process Steps ────────────────────────────────────────────────
export const getProcessSteps = (): Promise<PaginatedResponse<ProcessStep>> =>
  fetchOrFallback('/process-steps/', {
    count: 7, next: null, previous: null,
    results: [
      { id: 1, step_number: 1, title: 'Discover', description: 'Deep-dive into your business goals, user needs, and technical landscape.', icon: 'Search', sort_order: 1 },
      { id: 2, step_number: 2, title: 'Strategize', description: 'Architect a comprehensive roadmap with technology choices and milestones.', icon: 'Map', sort_order: 2 },
      { id: 3, step_number: 3, title: 'Design', description: 'Craft pixel-perfect, user-centered interfaces that are both beautiful and functional.', icon: 'Palette', sort_order: 3 },
      { id: 4, step_number: 4, title: 'Engineer', description: 'Build with clean code, scalable architecture, and rigorous standards.', icon: 'Code2', sort_order: 4 },
      { id: 5, step_number: 5, title: 'Test', description: 'Comprehensive QA, performance testing, and security audits.', icon: 'CheckCircle', sort_order: 5 },
      { id: 6, step_number: 6, title: 'Launch', description: 'Manage the full deployment pipeline with zero-downtime releases.', icon: 'Rocket', sort_order: 6 },
      { id: 7, step_number: 7, title: 'Scale', description: 'Continuously iterate and optimize as your business grows.', icon: 'TrendingUp', sort_order: 7 },
    ]
  });

// ─── FAQs ─────────────────────────────────────────────────────────
export const getFAQs = (): Promise<PaginatedResponse<FAQ>> =>
  fetchOrFallback('/faqs/', { count: 0, next: null, previous: null, results: [] });

// ─── Team ─────────────────────────────────────────────────────────
export const getTeam = (): Promise<PaginatedResponse<TeamMember>> =>
  fetchOrFallback('/team/', { count: 0, next: null, previous: null, results: [] });

// ─── Clients ──────────────────────────────────────────────────────
export const getClients = (): Promise<PaginatedResponse<Client>> =>
  fetchOrFallback('/clients/', { count: 0, next: null, previous: null, results: [] });

// ─── Navigation ───────────────────────────────────────────────────
export const getNavigation = (): Promise<PaginatedResponse<MenuItem>> =>
  fetchOrFallback('/navigation/', {
    count: 9, next: null, previous: null,
    results: [
      { id: 1, label: 'Home', url: '/', item_type: 'link', parent: null, sort_order: 0, open_in_new_tab: false, icon: '', description: '', children: [] },
      { id: 2, label: 'About', url: '/about', item_type: 'link', parent: null, sort_order: 1, open_in_new_tab: false, icon: '', description: '', children: [] },
      { id: 3, label: 'Services', url: '/services', item_type: 'dropdown', parent: null, sort_order: 2, open_in_new_tab: false, icon: '', description: '',
        children: [
          { id: 10, label: 'Custom Software Development', url: '/services/custom-software-development', item_type: 'link', parent: 3, sort_order: 0, open_in_new_tab: false, icon: 'Code2', description: '', children: [] },
          { id: 11, label: 'Mobile App Development', url: '/services/mobile-app-development', item_type: 'link', parent: 3, sort_order: 1, open_in_new_tab: false, icon: 'Smartphone', description: '', children: [] },
          { id: 12, label: 'E-commerce Solutions', url: '/services/ecommerce-solutions', item_type: 'link', parent: 3, sort_order: 2, open_in_new_tab: false, icon: 'ShoppingBag', description: '', children: [] },
          { id: 13, label: 'Web Development', url: '/services/web-development', item_type: 'link', parent: 3, sort_order: 3, open_in_new_tab: false, icon: 'Globe', description: '', children: [] },
          { id: 14, label: 'Training & Earning', url: '/services/training-earning', item_type: 'link', parent: 3, sort_order: 4, open_in_new_tab: false, icon: 'GraduationCap', description: '', children: [] },
          { id: 15, label: 'AI Automation', url: '/services/ai-automation', item_type: 'link', parent: 3, sort_order: 5, open_in_new_tab: false, icon: 'Brain', description: '', children: [] },
          { id: 16, label: 'Remote Developer Hiring', url: '/services/remote-developer-hiring', item_type: 'link', parent: 3, sort_order: 6, open_in_new_tab: false, icon: 'Users', description: '', children: [] },
          { id: 17, label: 'Website Malware Detection & Removal', url: '/services/malware-detection-removal', item_type: 'link', parent: 3, sort_order: 7, open_in_new_tab: false, icon: 'ShieldAlert', description: '', children: [] },
        ]
      },
      { id: 4, label: 'Products', url: '/products', item_type: 'link', parent: null, sort_order: 3, open_in_new_tab: false, icon: '', description: '', children: [] },
      { id: 5, label: 'Projects', url: '/projects', item_type: 'link', parent: null, sort_order: 4, open_in_new_tab: false, icon: '', description: '', children: [] },
      { id: 6, label: 'Technologies', url: '/technologies', item_type: 'link', parent: null, sort_order: 5, open_in_new_tab: false, icon: '', description: '', children: [] },
      { id: 7, label: 'Industries', url: '/industries', item_type: 'link', parent: null, sort_order: 6, open_in_new_tab: false, icon: '', description: '', children: [] },
      { id: 8, label: 'Insights', url: '/blog', item_type: 'link', parent: null, sort_order: 7, open_in_new_tab: false, icon: '', description: '', children: [] },
      { id: 9, label: 'Contact', url: '/contact', item_type: 'link', parent: null, sort_order: 8, open_in_new_tab: false, icon: '', description: '', children: [] },
    ]
  });

// ─── Technologies ─────────────────────────────────────────────────
export const getTechnologies = (params?: Record<string, string>): Promise<PaginatedResponse<Technology>> => {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  return fetchOrFallback(`/technologies/${query}`, { count: 0, next: null, previous: null, results: [] });
};

// ─── Industries ───────────────────────────────────────────────────
export const getIndustries = (): Promise<PaginatedResponse<Industry>> =>
  fetchOrFallback('/industries/', { count: 0, next: null, previous: null, results: [] });

// ─── Services ─────────────────────────────────────────────────────
export const getServices = (): Promise<PaginatedResponse<Service>> =>
  fetchOrFallback('/services/', {
    count: 8, next: null, previous: null,
    results: [
      { id: 1, name: 'Custom Software Development', slug: 'custom-software-development', tagline: 'Tailored Enterprise & Cloud Solutions', short_description: 'Build customized software solutions tailored to specific business requirements and workflows.', description: 'Build customized software solutions tailored to specific business requirements and workflows. From distributed cloud architectures and microservices to tailored business tools, we design scalable software engineered for longevity and performance.', icon: 'Code2', color: '#0066ff', sort_order: 1, is_active: true, is_featured: true, features: [] },
      { id: 2, name: 'Mobile App Development', slug: 'mobile-app-development', tagline: 'High-Performance iOS & Android Applications', short_description: 'Develop modern, responsive, and user-friendly mobile applications for Android and iOS.', description: 'Develop modern, responsive, and user-friendly mobile applications for Android and iOS. We combine fluid user interfaces with native performance, offline-first reliability, and seamless API integrations.', icon: 'Smartphone', color: '#00d4ff', sort_order: 2, is_active: true, is_featured: true, features: [] },
      { id: 3, name: 'E-commerce Solutions', slug: 'ecommerce-solutions', tagline: 'Scalable Digital Commerce & Multi-Vendor Platforms', short_description: 'Build complete and scalable e-commerce solutions for online businesses, including product, order, payment, and customer management.', description: 'Build complete and scalable e-commerce solutions for online businesses, including product, order, payment, and customer management. We engineer conversion-optimized online storefronts, payment gateways, inventory automation, and multi-channel commerce tools.', icon: 'ShoppingBag', color: '#10b981', sort_order: 3, is_active: true, is_featured: true, features: [] },
      { id: 4, name: 'Web Development', slug: 'web-development', tagline: 'Modern, Secure & Responsive Web Platforms', short_description: 'Develop modern, secure, responsive, and high-performance websites and web applications.', description: 'Develop modern, secure, responsive, and high-performance websites and web applications. We engineer responsive web applications that combine pixel-perfect UI aesthetics with fast loading speeds, bulletproof security, and modern web standards.', icon: 'Globe', color: '#38bdf8', sort_order: 4, is_active: true, is_featured: true, features: [] },
      { id: 5, name: 'Training & Earning', slug: 'training-earning', tagline: 'Hands-On Tech Skills & Career Development', short_description: 'Provide practical technology training and help learners develop digital skills for professional and earning opportunities.', description: 'Provide practical technology training and help learners develop digital skills for professional and earning opportunities. Our hands-on curriculums cover software development, digital platforms, problem-solving, and practical project building to empower careers in the global digital economy.', icon: 'GraduationCap', color: '#8b5cf6', sort_order: 5, is_active: true, is_featured: true, features: [] },
      { id: 6, name: 'AI Automation', slug: 'ai-automation', tagline: 'Intelligent Process Automation & Workflow Efficiency', short_description: 'Use AI-powered automation to streamline business processes, reduce repetitive tasks, improve productivity, and increase operational efficiency.', description: 'Use AI-powered automation to streamline business processes, reduce repetitive tasks, improve productivity, and increase operational efficiency. We implement intelligent agents, automated document processors, and smart workflows that save hours of manual labor every week.', icon: 'Brain', color: '#f59e0b', sort_order: 6, is_active: true, is_featured: true, features: [] },
      { id: 7, name: 'Remote Developer Hiring', slug: 'remote-developer-hiring', tagline: 'Vetted Dedicated Tech Talent & Team Augmentation', short_description: 'Help businesses hire skilled remote developers according to their project requirements and technical needs.', description: 'Help businesses hire skilled remote developers according to their project requirements and technical needs. Scale your tech team seamlessly with vetted, senior engineers proficient in modern web, mobile, backend, and DevOps technologies.', icon: 'Users', color: '#ec4899', sort_order: 7, is_active: true, is_featured: true, features: [] },
      { id: 8, name: 'Website Malware Detection & Removal', slug: 'malware-detection-removal', tagline: 'Comprehensive Web Security & Threat Cleanup', short_description: 'Detect and remove malware, malicious code, suspicious files, redirects, and other security threats from compromised websites.', description: 'Detect and remove malware, malicious code, suspicious files, redirects, and other security threats from compromised websites. We disinfect compromised websites, restore normal operation, patch vulnerabilities, and implement proactive defenses against recurring attacks.', icon: 'ShieldAlert', color: '#ef4444', sort_order: 8, is_active: true, is_featured: true, features: [] },
    ] as unknown as Service[]
  });

export const getService = (slug: string): Promise<Service> =>
  api.get<Service>(`/services/${slug}/`).then(r => r.data);

// ─── Projects ─────────────────────────────────────────────────────
export const getProjects = (params?: Record<string, string>): Promise<PaginatedResponse<Project>> => {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  return fetchOrFallback(`/projects/${query}`, { count: 0, next: null, previous: null, results: [] });
};

export const getProject = (slug: string): Promise<Project> =>
  api.get<Project>(`/projects/${slug}/`).then(r => r.data);

// ─── Products ─────────────────────────────────────────────────────
export const getProducts = (): Promise<PaginatedResponse<Product>> =>
  fetchOrFallback('/products/', {
    count: 12, next: null, previous: null,
    results: [
      { id: 1, name: 'Astro HR', slug: 'astro-hr', tagline: 'Smart Human Resource & Payroll Management', short_description: 'Comprehensive HR platform for employee lifecycle management, attendance tracking, payroll calculation, and performance evaluation.', description: 'Astro HR is a modern human resources platform designed for scaling organizations.', category: 'saas', status: 'active', color: '#0066ff', product_url: '', sort_order: 1, is_featured: true, is_active: true },
      { id: 2, name: 'Hikmah Soft', slug: 'hikmah-soft', tagline: 'Modern Institutional & Islamic ERP Solution', short_description: 'Integrated management system designed to streamline operational workflows, accounting, and institutional administration.', description: 'Hikmah Soft is an integrated institutional management solution tailored for schools and community organizations.', category: 'platform', status: 'active', color: '#10b981', product_url: '', sort_order: 2, is_featured: true, is_active: true },
      { id: 3, name: 'FinCore360', slug: 'fincore360', tagline: 'Comprehensive Financial Core & Accounting Engine', short_description: 'Advanced financial management platform featuring real-time ledger accounting, transaction processing, and automated audit reporting.', description: 'FinCore360 is an enterprise-grade financial core built for businesses handling high-volume daily transactions.', category: 'saas', status: 'active', color: '#00d4ff', product_url: '', sort_order: 3, is_featured: true, is_active: true },
      { id: 4, name: 'Quotation Pro', slug: 'quotation-pro', tagline: 'Automated Quotation & Invoicing System', short_description: 'Fast and professional quotation generation tool with customizable templates, client approvals, and sales order tracking.', description: 'Quotation Pro streamlines the sales quotation workflow for agencies, contractors, and B2B suppliers.', category: 'tool', status: 'active', color: '#6366f1', product_url: '', sort_order: 4, is_featured: true, is_active: true },
      { id: 5, name: 'Remote Desk', slug: 'remote-desk', tagline: 'Virtual Workspace & Remote Team Management', short_description: 'Collaborative platform for managing distributed teams, tracking task progress, monitoring work sessions, and coordinating deliverables.', description: 'Remote Desk provides distributed organizations with an all-in-one virtual command center.', category: 'platform', status: 'active', color: '#38bdf8', product_url: '', sort_order: 5, is_featured: true, is_active: true },
      { id: 6, name: 'Industrial Edge', slug: 'industrial-edge', tagline: 'Edge Computing & Industrial Operations Platform', short_description: 'High-performance edge software for monitoring equipment telemetry, industrial sensor data, and production floor metrics.', description: 'Industrial Edge bridges physical factory machinery and digital analytics.', category: 'platform', status: 'active', color: '#f59e0b', product_url: '', sort_order: 6, is_featured: true, is_active: true },
      { id: 7, name: 'eProshno', slug: 'eproshno', tagline: 'Digital Assessment & Question Bank Platform', short_description: 'Interactive examination and assessment system enabling educators to create, manage, and deliver online tests securely.', description: 'eProshno is a comprehensive question bank and online assessment platform.', category: 'web', status: 'active', color: '#8b5cf6', product_url: '', sort_order: 7, is_featured: true, is_active: true },
      { id: 8, name: 'Staff Sight', slug: 'staff-sight', tagline: 'Employee Monitoring & Workforce Productivity Suite', short_description: 'Real-time workforce intelligence tool providing activity insights, project time tracking, and productivity metrics.', description: 'Staff Sight gives leadership visibility into team productivity and work patterns.', category: 'saas', status: 'active', color: '#06b6d4', product_url: '', sort_order: 8, is_featured: true, is_active: true },
      { id: 9, name: 'Digital Astro', slug: 'digital-astro', tagline: 'Digital Marketing & Agency Operations Suite', short_description: 'Unified digital operations platform to manage client campaigns, digital assets, reporting dashboards, and client communications.', description: 'Digital Astro is an agency operations platform designed for digital marketing teams.', category: 'platform', status: 'active', color: '#ec4899', product_url: '', sort_order: 9, is_featured: true, is_active: true },
      { id: 10, name: 'Hotel Management System', slug: 'hotel-management-system', tagline: 'End-to-End Hospitality & Reservation Solution', short_description: 'All-in-one hotel management software covering room reservations, front-desk check-ins, billing, housekeeping, and guest services.', description: 'Hotel Management System is an all-in-one property management platform built for hotels, resorts, and guest houses.', category: 'platform', status: 'active', color: '#14b8a6', product_url: '', sort_order: 10, is_featured: true, is_active: true },
      { id: 11, name: 'Microcredit Management System', slug: 'microcredit-management-system', tagline: 'Microfinance, Loans & Field Collection Platform', short_description: 'Robust management solution for microfinance institutions, tracking borrower accounts, loan disbursements, installment schedules, and field collections.', description: 'Microcredit Management System simplifies microfinance operations.', category: 'platform', status: 'active', color: '#3b82f6', product_url: '', sort_order: 11, is_featured: true, is_active: true },
      { id: 12, name: 'digimind.live', slug: 'digimind-live', tagline: 'Interactive Learning & Digital Knowledge Hub', short_description: 'Dynamic online knowledge and live learning platform connecting mentors and learners with real-time digital skill building.', description: 'digimind.live is an interactive digital learning hub connecting mentors and students.', category: 'web', status: 'active', color: '#a855f7', product_url: '', sort_order: 12, is_featured: true, is_active: true },
    ] as unknown as Product[]
  });

export const getProduct = (slug: string): Promise<Product> =>
  api.get<Product>(`/products/${slug}/`).then(r => r.data);

// ─── Testimonials ─────────────────────────────────────────────────
export const getTestimonials = (): Promise<PaginatedResponse<Testimonial>> =>
  fetchOrFallback('/testimonials/', { count: 0, next: null, previous: null, results: [] });

// ─── Blog ─────────────────────────────────────────────────────────
export const getBlogPosts = (params?: Record<string, string>): Promise<PaginatedResponse<BlogPost>> => {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  return fetchOrFallback(`/blog/${query}`, { count: 0, next: null, previous: null, results: [] });
};

export const getBlogPost = (slug: string): Promise<BlogPost> =>
  api.get<BlogPost>(`/blog/${slug}/`).then(r => r.data);

export const getBlogCategories = (): Promise<PaginatedResponse<BlogCategory>> =>
  fetchOrFallback('/blog/categories/', { count: 0, next: null, previous: null, results: [] });

// ─── Contact ──────────────────────────────────────────────────────
export const submitContact = (data: ContactFormData): Promise<{ message: string }> =>
  api.post('/contact/', data).then(r => r.data);
