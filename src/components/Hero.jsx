import heroGroupImg from '../assets/hero-group.jpg'

function Hero({ onNavClick }) {
  return (
    <section
      className="hero-section"
      id="beranda"
      style={{ '--hero-photo': `url(${heroGroupImg})` }}
    >
      <div className="hero-overlay">
        <p>Persaudaraan Setia Hati Terate</p>
        <h1>UKM PSHT UPN "Veteran" Jawa Timur</h1>
        <span>Tangguh Dalam Aksi, Unggul Dalam Prestasi PSHT KOMISARIAT UPN VETERAN JAWA TIMUR, JAYA!!!</span>
        <a href="#kontak" onClick={(event) => onNavClick(event, '#kontak')}>
          Bergabung Sekarang
        </a>
      </div>
    </section>
  )
}

export default Hero
