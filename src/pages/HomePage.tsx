import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import {
  getSiteSettings,
  getHero,
  getStatistics,
  getServices,
  getProjects,
  getProducts,
  getTechnologies,
  getTestimonials,
  getProcessSteps,
  getClients,
} from '@/api'
import HeroSection from '@/sections/HeroSection'
import ClientsSection from '@/sections/ClientsSection'
import AboutUsSection from '@/sections/AboutUsSection'
import ServicesSection from '@/sections/ServicesSection'
import DemoSection from '@/sections/DemoSection'
import TestimonialsSection from '@/sections/TestimonialsSection'
import ProjectsSection from '@/sections/ProjectsSection'
import ProductsSection from '@/sections/ProductsSection'
import TechnologiesSection from '@/sections/TechnologiesSection'
import ProcessSection from '@/sections/ProcessSection'
import FAQSection from '@/sections/FAQSection'
import ReadyToStartSection from '@/sections/ReadyToStartSection'
import ContactSection from '@/sections/ContactSection'
import BlueEnergyFlow from '@/components/ui/BlueEnergyFlow'

export default function HomePage() {
  const { data: settings } = useQuery({ queryKey: ['site-settings'], queryFn: getSiteSettings })
  const { data: hero } = useQuery({ queryKey: ['hero'], queryFn: getHero })
  const { data: statsData } = useQuery({ queryKey: ['statistics'], queryFn: getStatistics })
  const { data: servicesData } = useQuery({ queryKey: ['services'], queryFn: getServices })
  const { data: projectsData } = useQuery({ queryKey: ['projects'], queryFn: () => getProjects() })
  const { data: productsData } = useQuery({ queryKey: ['products'], queryFn: getProducts })
  const { data: techData } = useQuery({ queryKey: ['technologies'], queryFn: () => getTechnologies() })
  const { data: testimonialData } = useQuery({ queryKey: ['testimonials'], queryFn: getTestimonials })
  const { data: processData } = useQuery({ queryKey: ['process-steps'], queryFn: getProcessSteps })
  const { data: clientsData } = useQuery({ queryKey: ['clients'], queryFn: getClients })

  const metaTitle = settings?.meta_title || `${settings?.company_name ?? 'Code Astro'} — Next-Gen Software & Tech Lab`
  const metaDesc = settings?.meta_description || 'We build world-class software products, AI platforms, and enterprise solutions.'

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        {settings?.og_image && <meta property="og:image" content={settings.og_image} />}
      </Helmet>

      {/* 1. Hero with Central Headline & Giant 3D Interactive World Globe */}
      <HeroSection hero={hero} stats={statsData?.results} />

      {/* Shiny Blue Energy Flow Line */}
      <BlueEnergyFlow />

      {/* 2. Trusted Partners with Radiant Horizon Light */}
      <ClientsSection clients={clientsData?.results ?? []} />

      {/* 3. About Us Section */}
      <AboutUsSection />

      {/* 4. What We Do / Services Section with Interactive Drawer Cards */}
      <ServicesSection services={servicesData?.results ?? []} />

      {/* Shiny Blue Energy Flow Line */}
      <BlueEnergyFlow flip />

      {/* 5. Live Interactive Sandbox / Demo Section */}
      <DemoSection />

      {/* 6. Happy Customers & Testimonials Carousel */}
      <TestimonialsSection testimonials={testimonialData?.results ?? []} />

      {/* 7. Our Work / Projects Section */}
      <ProjectsSection projects={projectsData?.results ?? []} />

      {/* Shiny Blue Energy Flow Line */}
      <BlueEnergyFlow />

      {/* 8. Proprietary Products with Architecture Drawers */}
      <ProductsSection products={productsData?.results ?? []} />

      {/* 9. Core Technologies Stack */}
      <TechnologiesSection technologies={techData?.results ?? []} />

      {/* 10. Engineering Process */}
      <ProcessSection steps={processData?.results ?? []} />

      {/* 11. Frequently Asked Questions (QnA) Accordion Drawer Cards */}
      <FAQSection />

      {/* 12. Ready To Get Started CTA */}
      <ReadyToStartSection />

      {/* 13. Get In Touch (Direct Contact Cards & Form) */}
      <ContactSection settings={settings} />
    </>
  )
}
