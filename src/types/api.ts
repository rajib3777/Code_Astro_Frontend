// API Types - matches Django models exactly

export interface SiteSettings {
  id: number;
  company_name: string;
  tagline: string;
  description: string;
  logo: string | null;
  logo_dark: string | null;
  favicon: string | null;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  linkedin_url: string;
  twitter_url: string;
  github_url: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  dribbble_url: string;
  meta_title: string;
  meta_description: string;
  og_image: string | null;
  theme: 'dark' | 'light' | 'auto';
  primary_color: string;
  accent_color: string;
  footer_description: string;
  footer_copyright: string;
  newsletter_enabled: boolean;
  newsletter_title: string;
  newsletter_subtitle: string;
}

export interface HeroSection {
  id: number;
  headline: string;
  headline_highlight: string;
  subheadline: string;
  primary_cta_text: string;
  primary_cta_url: string;
  secondary_cta_text: string;
  secondary_cta_url: string;
  background_image: string | null;
  background_video: string | null;
}

export interface Statistic {
  id: number;
  label: string;
  value: string;
  description: string;
  icon: string;
  sort_order: number;
}

export interface ProcessStep {
  id: number;
  step_number: number;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string | null;
  linkedin_url: string;
  twitter_url: string;
  github_url: string;
}

export interface Client {
  id: number;
  name: string;
  logo: string | null;
  logo_dark: string | null;
  website_url: string;
  is_featured: boolean;
}

export interface MenuItem {
  id: number;
  label: string;
  url: string;
  item_type: 'link' | 'dropdown' | 'mega';
  parent: number | null;
  sort_order: number;
  open_in_new_tab: boolean;
  icon: string;
  description: string;
  children: MenuItem[];
}

export interface Technology {
  id: number;
  name: string;
  slug: string;
  category: 'frontend' | 'backend' | 'mobile' | 'cloud' | 'devops' | 'database' | 'ai' | 'other';
  description: string;
  icon_svg: string;
  icon_url: string;
  logo: string | null;
  color: string;
  website_url: string;
  proficiency: number;
  is_featured: boolean;
}

export interface Industry {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  icon: string;
  image: string | null;
  technologies: Technology[];
  projects_count: number;
  clients_count: number;
  is_featured: boolean;
}

export interface ServiceFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  short_description: string;
  description: string;
  icon: string;
  icon_svg: string;
  image: string | null;
  technologies: Technology[];
  industries: Industry[];
  features: ServiceFeature[];
  cta_text: string;
  cta_url: string;
  color: string;
  is_featured: boolean;
}

export interface ProjectResult {
  id: number;
  metric: string;
  value: string;
  description: string;
  icon: string;
}

export interface ProjectScreenshot {
  id: number;
  image: string;
  caption: string;
  alt_text: string;
  sort_order: number;
}

export interface ProjectSection {
  id: number;
  section_type: string;
  title: string;
  subtitle: string;
  content: string;
  image: string | null;
  video: string | null;
  data: Record<string, unknown>;
  sort_order: number;
  is_visible: boolean;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  tagline: string;
  short_description: string;
  client_name: string;
  status: 'live' | 'completed' | 'in_progress' | 'archived';
  hero_image: string | null;
  hero_video: string | null;
  thumbnail: string | null;
  cover_image: string | null;
  color: string;
  technologies: Technology[];
  industries: Industry[];
  screenshots: ProjectScreenshot[];
  results: ProjectResult[];
  sections: ProjectSection[];
  year: number | null;
  duration: string;
  team_size: number | null;
  live_url: string;
  github_url: string;
  demo_url: string;
  is_featured: boolean;
}

export interface ProductFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface ProductScreenshot {
  id: number;
  image: string;
  caption: string;
  sort_order: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  short_description: string;
  category: string;
  status: 'active' | 'beta' | 'coming_soon' | 'discontinued';
  logo: string | null;
  hero_image: string | null;
  thumbnail: string | null;
  color: string;
  technologies: Technology[];
  industries: Industry[];
  features: ProductFeature[];
  screenshots: ProductScreenshot[];
  product_url: string;
  demo_url: string;
  docs_url: string;
  github_url: string;
  cta_text: string;
  is_featured: boolean;
}

export interface Testimonial {
  id: number;
  client_name: string;
  client_role: string;
  client_company: string;
  client_image: string | null;
  company_logo: string | null;
  content: string;
  rating: number;
  is_featured: boolean;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  color: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  author_name: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  category: BlogCategory | null;
  status: string;
  published_at: string | null;
  read_time: number;
  is_featured: boolean;
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  project_type: string;
  budget: string;
  message: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
