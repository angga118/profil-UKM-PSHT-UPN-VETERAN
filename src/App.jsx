import { useState } from 'react'
import AchievementsSection from './components/AchievementsSection'
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
import { contactPopups, gallery } from './data/siteData'
import { useDismissableDialog } from './hooks/useDismissableDialog'
import { useGallerySlider } from './hooks/useGallerySlider'
import { useHashRouter } from './hooks/useHashRouter'
import { useScrollReveal } from './hooks/useScrollReveal'
import HistoryPage from './page/HistoryPage'
import LatihanRutin from './page/LatihanRutin'
import './App.css'

const detailPages = {
  '#sejarah-detail': { Component: HistoryPage, fallbackHash: '#sejarah' },
  '#latihan-rutin-detail': { Component: LatihanRutin, fallbackHash: '#kontak' },
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePopup, setActivePopup] = useState(null)

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
  } = useGallerySlider(gallery.length)

  const { closeButtonRef: popupCloseButtonRef, triggerRef: popupTriggerRef } =
    useDismissableDialog(Boolean(activePopup), () => setActivePopup(null))
  const { closeButtonRef: lightboxCloseButtonRef, triggerRef: lightboxTriggerRef } =
    useDismissableDialog(lightboxOpen, () => setLightboxOpen(false))

  useScrollReveal(router.activeHash)

  const closeMenu = () => setMenuOpen(false)
  const popupContent = activePopup ? contactPopups[activePopup] : null

  const openPopup = (event, popupType) => {
    popupTriggerRef.current = event.currentTarget
    setActivePopup(popupType)
  }

  const openDetailPage = (detailHash) => router.go(detailHash)

  const closeDetailPage = (event) => {
    event.preventDefault()
    const fallbackHash = activeDetailPage?.fallbackHash ?? '#beranda'
    router.back(fallbackHash)

    window.requestAnimationFrame(() => {
      document.querySelector(fallbackHash)?.scrollIntoView({ behavior: 'smooth' })
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

  if (activeDetailPage) {
    const { Component } = activeDetailPage
    return <Component onBack={closeDetailPage} />
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
          item={gallery[activeSlide]}
          closeButtonRef={lightboxCloseButtonRef}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((isOpen) => !isOpen)} onNavClick={scrollToSection} />

      <main>
        <Hero onNavClick={scrollToSection} />
        <WelcomeStrip />
        <ProfileSection onOpenDetail={openDetailPage} onNavClick={scrollToSection} />
        <LeadersSection />
        <AchievementsSection onNavClick={scrollToSection} />
        <GallerySection
          activeSlide={activeSlide}
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
