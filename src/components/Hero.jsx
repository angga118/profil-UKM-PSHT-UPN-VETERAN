import heroGroupImg from '../assets/hero-group.jpg'
import { useEffect, useState } from 'react'

function Hero({ content, onNavClick }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <section
      className={isReady ? 'hero-section hero-animate' : 'hero-section'}
      id="beranda"
      style={{ '--hero-photo': `url(${heroGroupImg})` }}
    >
      <div className="hero-overlay">
        <p>{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <span>{content.description}</span>
        <a href="#kontak" onClick={(event) => onNavClick(event, '#kontak')}>
          Bergabung Sekarang
        </a>
      </div>
    </section>
  )
}

export default Hero
