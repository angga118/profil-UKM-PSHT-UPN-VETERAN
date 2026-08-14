import { useEffect } from 'react'

/**
 * Mengaktifkan class `.is-visible` pada elemen `.reveal-on-scroll` saat
 * elemen tersebut masuk viewport. Jatuh ke tampil langsung jika browser
 * tidak mendukung IntersectionObserver atau pengguna memilih reduced-motion.
 *
 * @param {*} dependency - dependency tambahan agar observer di-reset ulang
 *   (misalnya saat berpindah halaman/route dalam SPA sederhana ini).
 */
export function useScrollReveal(dependency) {
  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal-on-scroll')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
      return undefined
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        })
      },
      { threshold: 0.12 },
    )

    revealItems.forEach((item) => revealObserver.observe(item))
    return () => revealObserver.disconnect()
  }, [dependency])
}
