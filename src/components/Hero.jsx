import heroGroupImg from '../assets/hero-group.jpg'

function Hero({ content, onNavClick }) {
  return (
    <section
      className="hero-section"
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
