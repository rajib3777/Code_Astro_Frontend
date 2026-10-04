import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getSiteSettings } from '@/api'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'

function ScrollReset() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default function Layout() {
  const { data: settings } = useQuery({
    queryKey: ['site-settings'],
    queryFn: getSiteSettings,
  })

  return (
    <div className="min-h-screen flex flex-col bg-black text-slate-100 selection:bg-blue-600/30 selection:text-white" style={{ overflowX: 'clip', width: '100%', maxWidth: '100%' }}>
      <ScrollReset />
      <Navbar settings={settings} />
      <main className="flex-1 w-full" style={{ position: 'relative', overflowX: 'clip', width: '100%', maxWidth: '100%' }}>
        <Outlet />
      </main>
      <Footer settings={settings} />
      <ScrollToTop />
    </div>
  )
}
