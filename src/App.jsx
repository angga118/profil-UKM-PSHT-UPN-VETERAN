import { useEffect, useState } from 'react'
import AchievementsSection from './components/AchievementsSection'
import AdminLoginPage from './page/AdminLoginPage'
import AdminPage from './page/AdminPage'
import ContactPopup from './components/ContactPopup'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import GalleryLightbox from './components/GalleryLightbox'
import GallerySection from './components/GallerySection'
import Header from './components/Header'
import Hero from './components/Hero'
import LeadersSection from './components/LeadersSection'
import ProfileSection from './components/ProfileSection'
import WelcomeStrip from './components/WelcomeStrip'
import { contactPopups } from './data/siteData'
import { useDismissableDialog } from './hooks/useDismissableDialog'
import { useGallerySlider } from './hooks/useGallerySlider'
import { useHashRouter } from './hooks/useHashRouter'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useSiteContent } from './hooks/useSiteContent'
import HistoryPage from './page/HistoryPage'
import LatihanRutin from './page/LatihanRutin'
import './App.css'

const detailPages = {
  '#sejarah-detail': { Component: HistoryPage, contentKey: 'history', fallbackHash: '#sejarah' },
  '#latihan-rutin-detail': { Component: LatihanRutin, contentKey: 'training', fallbackHash: '#sejarah' },
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePopup, setActivePopup] = useState(null)
  const { content, saveContent, resetContent } = useSiteContent()
  const [admin, setAdmin] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)

  const router = useHashRouter()
  const activeDetailPage = router.activeHash ? detailPages[router.activeHash] : undefined
  const {
    activeSlide,
    setActiveSlide,
    setPaused,
    lightboxOpen,
    setLightboxOpen,
    goToPrevious,
    goToNext,
  } = useGallerySlider(content.gallery.length)
  const visibleSlide = Math.min(activeSlide, content.gallery.length - 1)

  const { closeButtonRef: popupCloseButtonRef, triggerRef: popupTriggerRef } =
    useDismissableDialog(Boolean(activePopup), () => setActivePopup(null))
  const { closeButtonRef: lightboxCloseButtonRef, triggerRef: lightboxTriggerRef } =
    useDismissableDialog(lightboxOpen, () => setLightboxOpen(false))

  useScrollReveal(router.activeHash)

  useEffect(() => {
    if (router.activeHash === '#admin') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [router.activeHash])
 
  useEffect(() => {
    fetch('/api/auth.php', { credentials: 'same-origin' })
      .then(async (response) => {
        if (!response.ok) throw new Error('Tidak dapat memeriksa sesi login.')
        return response.json()
      })
      .then((data) => setAdmin(data.authenticated ? { username: data.username } : null))
      .catch(() => setAdmin(null))
      .finally(() => setAuthChecked(true))
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const popupContent = activePopup ? contactPopups[activePopup] : null

  const openPopup = (event, popupType) => {
    popupTriggerRef.current = event.currentTarget
    setActivePopup(popupType)
  }

  const openDetailPage = (detailHash) => {
    router.go(detailHash)
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }))
  }

  const closeDetailPage = (event) => {
    event.preventDefault()
    const fallbackHash = activeDetailPage?.fallbackHash ?? '#beranda'
    router.back(fallbackHash)

    window.requestAnimationFrame(() => {
      const target = document.querySelector(fallbackHash)
      if (!target) return

      const headerHeight = document.querySelector('.site-header')?.offsetHeight ?? 0
      const sectionPaddingTop = Number.parseFloat(window.getComputedStyle(target).paddingTop) || 0
      const contentGap = 24
      const targetTop =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight +
        Math.max(0, sectionPaddingTop - contentGap)

      window.scrollTo({ top: targetTop, behavior: 'auto' })
    })
  }

  const scrollToSection = (event, href) => {
    if (!href.startsWith('#')) return

    const target = document.querySelector(href)
    if (!target) return

    event.preventDefault()
    closeMenu()

    if (href === '#beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.history.pushState(null, '', href)
      return
    }

    const headerHeight = document.querySelector('.site-header')?.offsetHeight ?? 0
    const sectionPaddingTop = Number.parseFloat(window.getComputedStyle(target).paddingTop) || 0
    const contentGap = 24
    const targetTop =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight +
      Math.max(0, sectionPaddingTop - contentGap)

    window.scrollTo({ top: targetTop, behavior: 'smooth' })
    window.history.pushState(null, '', href)
  }

  const closeAdminPage = (event) => {
    event.preventDefault()
    router.go('#beranda')
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  }

  const loginAdmin = async ({ username, password }) => {
    const response = await fetch('/api/auth.php', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(data.message || 'Login gagal. Silakan coba lagi.')
    setAdmin({ username: data.username })
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }))
  }

  const logoutAdmin = async () => {
    await fetch('/api/auth.php', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    })
    setAdmin(null)
    router.go('#beranda')
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  }

  if (router.activeHash === '#admin') {
    if (!authChecked) return <main className="admin-login-page"><p className="admin-auth-loading">Memeriksa sesi admin...</p></main>
    if (!admin) return <AdminLoginPage onLogin={loginAdmin} onBack={closeAdminPage} />
    return <AdminPage content={content} onBack={closeAdminPage} onSave={saveContent} onReset={resetContent} adminName={admin.username} onLogout={logoutAdmin} />
  }

  if (activeDetailPage) {
    const { Component } = activeDetailPage
    return <Component content={content[activeDetailPage.contentKey]} onBack={closeDetailPage} />
  }

  return (
    <div className="site-shell">
      {popupContent && (
        <ContactPopup
          content={popupContent}
          closeButtonRef={popupCloseButtonRef}
          onClose={() => setActivePopup(null)}
        />
      )}

      {lightboxOpen && (
        <GalleryLightbox
          item={content.gallery[visibleSlide]}
          closeButtonRef={lightboxCloseButtonRef}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((isOpen) => !isOpen)}
        onNavClick={scrollToSection}
      />
      <button
        className={menuOpen ? 'nav-backdrop open' : 'nav-backdrop'}
        type="button"
        aria-label="Tutup menu navigasi"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />

      <main>
        <Hero content={content.hero} onNavClick={scrollToSection} />
        <WelcomeStrip content={content.welcome} />
        <ProfileSection content={content.profile} cards={content.profileCards} onOpenDetail={openDetailPage} onNavClick={scrollToSection} />
        <LeadersSection leaders={content.leaders} />
        <AchievementsSection achievements={content.achievements} onNavClick={scrollToSection} />
        <GallerySection
          gallery={content.gallery}
          activeSlide={visibleSlide}
          onSetActiveSlide={setActiveSlide}
          onPrevious={goToPrevious}
          onNext={goToNext}
          onPauseChange={setPaused}
          onOpenLightbox={(triggerEl) => {
            lightboxTriggerRef.current = triggerEl
            setLightboxOpen(true)
          }}
        />
        <ContactSection onOpenPopup={openPopup} />
      </main>

      <Footer />
    </div>
  )
}

export default App
