import { useEffect, useState } from 'react'

/**
 * Mengelola state slide aktif galeri dan auto-play interval.
 * Auto-play berhenti saat pengguna hover/fokus (paused) atau lightbox terbuka,
 * serta menghormati preferensi reduced-motion pengguna.
 */
export function useGallerySlider(itemCount, intervalMs = 4500) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || paused || lightboxOpen) return undefined

    const sliderInterval = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % itemCount)
    }, intervalMs)

    return () => window.clearInterval(sliderInterval)
  }, [paused, lightboxOpen, itemCount, intervalMs])

  const goToPrevious = () => setActiveSlide((currentSlide) => (currentSlide - 1 + itemCount) % itemCount)
  const goToNext = () => setActiveSlide((currentSlide) => (currentSlide + 1) % itemCount)

  return {
    activeSlide,
    setActiveSlide,
    paused,
    setPaused,
    lightboxOpen,
    setLightboxOpen,
    goToPrevious,
    goToNext,
  }
}
