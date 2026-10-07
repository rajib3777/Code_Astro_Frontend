import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@/context/ThemeContext'
import Layout from '@/layouts/Layout'
import HomePage from '@/pages/HomePage'

// Lazy-loaded secondary routes for minimal initial bundle size and rapid FCP
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ServicesPage = lazy(() => import('@/pages/ServicesPage'))
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetailPage'))
const ProductsPage = lazy(() => import('@/pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'))
const TechnologiesPage = lazy(() => import('@/pages/TechnologiesPage'))
const IndustriesPage = lazy(() => import('@/pages/IndustriesPage'))
const BlogPage = lazy(() => import('@/pages/BlogPage'))
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

// Sleek zero-shift suspense loader matching pure dark theme
function PageLoadingFallback() {
  return (
    <div
      style={{
        minHeight: '80vh',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          border: '2px solid rgba(0, 102, 255, 0.15)',
          borderTopColor: '#00d4ff',
          animation: 'spin 0.75s linear infinite',
        }}
      />
    </div>
  )
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000, // 10 minutes cache
      gcTime: 30 * 60 * 1000,    // 30 minutes garbage collection
      retry: 1,
      refetchOnWindowFocus: false, // Prevents lag & re-render spikes when user switches tabs
      refetchOnReconnect: false,
    },
  },
})

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoadingFallback />}>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="services" element={<ServicesPage />} />
                  <Route path="services/:slug" element={<ServiceDetailPage />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="products/:slug" element={<ProductDetailPage />} />
                  <Route path="projects" element={<ProjectsPage />} />
                  <Route path="projects/:slug" element={<ProjectDetailPage />} />
                  <Route path="technologies" element={<TechnologiesPage />} />
                  <Route path="industries" element={<IndustriesPage />} />
                  <Route path="blog" element={<BlogPage />} />
                  <Route path="blog/:slug" element={<BlogPostPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}
