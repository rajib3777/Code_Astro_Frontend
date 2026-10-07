import { useEffect, useRef } from 'react'

interface PageHeroOrbProps {
  factor?: number
  top?: string
  width?: string
  height?: string
  background?: string
  filter?: string
}

/**
 * Ultra-high-performance ambient hero flare orb.
 * Updates transform directly on DOM via requestAnimationFrame on fine pointers only.
 * Causes ZERO React re-renders on the parent page during mouse movement.
 */
export default function PageHeroOrb({
  factor = 20,
  top = '40%',
  width = 'clamp(450px, 60vw, 850px)',
  height = 'clamp(450px, 60vw, 850px)',
  background = 'radial-gradient(circle, rgba(0, 102, 255, 0.22) 0%, rgba(0, 212, 255, 0.08) 40%, transparent 70%)',
  filter = 'blur(80px)',
}: PageHeroOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only track mouse movement on fine pointers (desktop mouse), never on touch/mobile
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return
    }

    let rAF: number | null = null
    const handleMouseMove = (e: MouseEvent) => {
      if (rAF !== null) return
      rAF = window.requestAnimationFrame(() => {
        if (orbRef.current) {
          const mx = ((e.clientX / window.innerWidth) * 2 - 1) * factor
          const my = ((e.clientY / window.innerHeight) * 2 - 1) * factor
          orbRef.current.style.transform = `translate(-50%, -50%) translate3d(${mx}px, ${my}px, 0)`
        }
        rAF = null
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rAF !== null) cancelAnimationFrame(rAF)
    }
  }, [factor])

  return (
    <div
      ref={orbRef}
      style={{
        position: 'absolute',
        top,
        left: '50%',
        transform: 'translate(-50%, -50%) translate3d(0, 0, 0)',
        width,
        height,
        background,
        filter,
        pointerEvents: 'none',
        transition: 'transform 0.2s ease-out',
        willChange: 'transform',
      }}
    />
  )
}
