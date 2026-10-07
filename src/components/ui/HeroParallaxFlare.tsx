import { useEffect, useRef } from 'react'

interface HeroParallaxFlareProps {
  accentColor: string
}

/**
 * Ultra-high-performance ambient hero flare with mouse parallax.
 * Updates CSS background directly via requestAnimationFrame on fine pointers only.
 * Causes ZERO React re-renders on the parent page during mouse movement.
 */
export default function HeroParallaxFlare({ accentColor }: HeroParallaxFlareProps) {
  const flareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only track mouse movement on fine pointers (desktop mouse), never on touch/mobile
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return
    }

    let rAF: number | null = null
    const handleMouseMove = (e: MouseEvent) => {
      if (rAF !== null) return
      rAF = window.requestAnimationFrame(() => {
        if (flareRef.current) {
          const mx = ((e.clientX / window.innerWidth) * 2 - 1) * 35
          const my = ((e.clientY / window.innerHeight) * 2 - 1) * 35
          flareRef.current.style.background = `radial-gradient(circle 700px at calc(50% + ${mx}px) calc(35% + ${my}px), ${accentColor}28 0%, rgba(0, 212, 255, 0.12) 40%, transparent 75%)`
        }
        rAF = null
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rAF !== null) cancelAnimationFrame(rAF)
    }
  }, [accentColor])

  return (
    <div
      ref={flareRef}
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle 700px at 50% 35%, ${accentColor}28 0%, rgba(0, 212, 255, 0.12) 40%, transparent 75%)`,
        pointerEvents: 'none',
        transition: 'background 0.2s ease-out',
      }}
    />
  )
}
