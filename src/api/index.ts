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
          { id: 10, label: 'Web Development', url: '/services/web-development', item_type: 'link', parent: 3, sort_order: 0, open_in_new_tab: false, icon: 'Globe', description: '', children: [] },
          { id: 11, label: 'Mobile Apps', url: '/services/mobile-development', item_type: 'link', parent: 3, sort_order: 1, open_in_new_tab: false, icon: 'Smartphone', description: '', children: [] },
          { id: 12, label: 'SaaS Development', url: '/services/saas-development', item_type: 'link', parent: 3, sort_order: 2, open_in_new_tab: false, icon: 'Cloud', description: '', children: [] },
          { id: 13, label: 'AI & Machine Learning', url: '/services/ai-ml', item_type: 'link', parent: 3, sort_order: 3, open_in_new_tab: false, icon: 'Brain', description: '', children: [] },
          { id: 14, label: 'Cloud & DevOps', url: '/services/cloud-devops', item_type: 'link', parent: 3, sort_order: 4, open_in_new_tab: false, icon: 'Server', description: '', children: [] },
          { id: 15, label: 'UI/UX Design', url: '/services/ui-ux-design', item_type: 'link', parent: 3, sort_order: 5, open_in_new_tab: false, icon: 'Palette', description: '', children: [] },
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
  fetchOrFallback('/services/', { count: 0, next: null, previous: null, results: [] });

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
  fetchOrFallback('/products/', { count: 0, next: null, previous: null, results: [] });

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
