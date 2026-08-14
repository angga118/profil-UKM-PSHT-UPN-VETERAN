import { useEffect, useRef } from 'react'

/**
 * Menangani perilaku umum dialog/popup: tutup dengan tombol Escape,
 * pindahkan fokus ke tombol close saat dialog terbuka, dan kembalikan
 * fokus ke elemen pemicu saat dialog ditutup.
 *
 * @param {boolean} isOpen - apakah dialog sedang terbuka
 * @param {() => void} onClose - callback untuk menutup dialog
 */
export function useDismissableDialog(isOpen, onClose) {
  const closeButtonRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      triggerRef.current?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return { closeButtonRef, triggerRef }
}
