import { useEffect, useState } from 'react'

/**
 * Routing sederhana berbasis hash URL yang mendukung beberapa route sekaligus.
 * Mengembalikan hash aktif saat ini beserta helper untuk berpindah route
 * sambil menjaga riwayat browser (pushState).
 *
 * Contoh:
 *   const route = useHashRouter()
 *   route.activeHash // '#sejarah-detail' | '#latihan-rutin-detail' | null
 *   route.go('#latihan-rutin-detail')
 *   route.back('#kontak')
 */
export function useHashRouter() {
  const [activeHash, setActiveHash] = useState(window.location.hash || null)

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash || null)
    updateHash()
    window.addEventListener('hashchange', updateHash)

    return () => window.removeEventListener('hashchange', updateHash)
  }, [])

  const go = (hash) => {
    window.history.pushState(null, '', hash)
    setActiveHash(hash)
  }

  const back = (fallbackHash) => {
    window.history.pushState(null, '', fallbackHash)
    setActiveHash(fallbackHash)
  }

  return { activeHash, go, back }
}
