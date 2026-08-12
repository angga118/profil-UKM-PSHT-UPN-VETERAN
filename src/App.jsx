import { useState } from 'react'
import heroImg from './assets/hero.png'
import heroGroupImg from './assets/hero-group.jpg'
import instagramLogo from './assets/instagram-logo.svg'
import logoImg from './assets/psht-logo.jpg'
import whatsappLogo from './assets/whatsapp-logo.svg'
import './App.css'

const navItems = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Sejarah', href: '#sejarah' },
  { label: 'Ketua', href: '#ketua' },
  { label: 'Prestasi', href: '#prestasi' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'Kontak', href: '#kontak' },
]

const profileCards = [
  {
    title: 'Sejarah UKM',
    eyebrow: 'Profil',
    text: 'Narasi berdirinya UKM, nilai persaudaraan, dan perjalanan PSHT di lingkungan UPN "Veteran" Jawa Timur.',
    points: ['Tahun berdiri', 'Tokoh perintis', 'Filosofi latihan'],
    href: '#sejarah',
  },
  {
    title: 'Latihan Rutin',
    eyebrow: 'Kegiatan',
    text: 'Informasi jadwal latihan, lokasi berkumpul, dan agenda pembinaan anggota aktif.',
    points: ['Selasa dan Kamis', 'Pendampingan pelatih', 'Pembinaan fisik dan teknik'],
    href: '#kontak',
  },
]

const leaders = [
  { name: 'Nama Ketua Saat Ini', period: '2025-2026', note: 'Penguatan kaderisasi dan kegiatan kampus' },
  { name: 'Nama Ketua Periode Lalu', period: '2024-2025', note: 'Aktivasi latihan rutin dan agenda silaturahmi' },
  { name: 'Nama Ketua Pendahulu', period: '2023-2024', note: 'Pendataan anggota dan peningkatan prestasi' },
  { name: 'Nama Ketua Pendahulu', period: '2022-2023', note: 'Regenerasi pengurus dan dokumentasi UKM' },
]

const achievements = [
  {
    event: 'Kejuaraan Pencak Silat Mahasiswa',
    year: '2025',
    result: 'Juara 1 Tanding Kelas Putra',
  },
  {
    event: 'Pekan Olahraga Mahasiswa Daerah',
    year: '2024',
    result: 'Medali Perak Kategori Seni Tunggal',
  },
  {
    event: 'Festival UKM Bela Diri UPN',
    year: '2024',
    result: 'Penampilan Terbaik Demonstrasi Jurus',
  },
]

const gallery = ['Latihan rutin', 'Pengesahan anggota', 'Kejuaraan', 'Silaturahmi alumni']

const contactPopups = {
  whatsapp: {
    title: 'WhatsApp Pengurus',
    text: 'Hubungi pengurus UKM PSHT untuk bertanya jadwal latihan, pendaftaran, atau agenda anggota baru.',
    action: 'Buka WhatsApp',
    href: 'https://wa.me/6280000000000',
    icon: 'whatsapp',
  },
  instagram: {
    title: 'Instagram Resmi',
    text: 'Lihat dokumentasi kegiatan, informasi latihan, dan kabar terbaru dari UKM PSHT UPN.',
    action: 'Buka Instagram',
    href: 'https://www.instagram.com/psht_upn?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    icon: 'instagram',
  },
}

function ContactIcon({ type }) {
  const iconSrc = type === 'instagram' ? instagramLogo : whatsappLogo

  return <img className="contact-icon" src={iconSrc} alt="" aria-hidden="true" />
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePopup, setActivePopup] = useState(null)
  const closeMenu = () => setMenuOpen(false)
  const popupContent = activePopup ? contactPopups[activePopup] : null
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

  return (
    <div className="site-shell">
      {popupContent && (
        <div className="contact-popup-backdrop" onClick={() => setActivePopup(null)}>
          <div
            className="contact-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-popup-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="contact-popup-close"
              type="button"
              aria-label="Tutup pop up"
              onClick={() => setActivePopup(null)}
            >
              X
            </button>
            <p>Kontak UKM</p>
            <h3 id="contact-popup-title">{popupContent.title}</h3>
            <span>{popupContent.text}</span>
            <a href={popupContent.href} target="_blank" rel="noreferrer">
              <ContactIcon type={popupContent.icon} />
              {popupContent.action}
            </a>
          </div>
        </div>
      )}

      <div className="topbar">
       
      </div>

      <header className="site-header">
        <a
          className="brand"
          href="#beranda"
          aria-label='UKM PSHT UPN "Veteran" Jawa Timur'
          onClick={(event) => scrollToSection(event, '#beranda')}
        >
          <span className="brand-logo-frame">
            <img className="brand-logo" src={logoImg} alt='Logo UKM PSHT UPN "Veteran" Jawa Timur' />
          </span>
          <span>
            <strong>UKM PSHT</strong>
            <small>UPN "Veteran" Jatim</small>
          </span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label="Buka menu navigasi"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Navigasi utama">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={(event) => scrollToSection(event, item.href)}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section
          className="hero-section"
          id="beranda"
          style={{ '--hero-photo': `url(${heroGroupImg})` }}
        >
          <div className="hero-overlay">
            <p>Persaudaraan Setia Hati Terate</p>
            <h1>UKM PSHT UPN "Veteran" Jawa Timur</h1>
            <span>Disiplin, prestasi, dan persaudaraan dalam satu wadah mahasiswa.</span>
            <a href="#kontak" onClick={(event) => scrollToSection(event, '#kontak')}>
              Bergabung Sekarang
            </a>
          </div>
        </section>

        <section className="welcome-strip" aria-label="Sambutan">
          <strong>Selamat Datang</strong>
          <span>di landing page resmi UKM PSHT UPN "Veteran" Jawa Timur</span>
        </section>

        <section className="catalog-section" id="sejarah">
          <div className="section-title">
            <p>Profil UKM</p>
            <h2>Informasi Utama</h2>
            <span>
              Bagian ini merangkum sejarah, kegiatan, kepengurusan, prestasi, dan kontak UKM
              dalam format ringkas seperti katalog informasi.
            </span>
          </div>

          <div className="profile-grid">
            {profileCards.map((card) => (
              <article className="info-card feature-card" key={card.title}>
                <div className="card-image">
                  <img src={heroImg} alt="" />
                </div>
                <div className="card-body">
                  <span>{card.eyebrow}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <ul>
                    {card.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <a href={card.href} onClick={(event) => scrollToSection(event, card.href)}>
                    Lihat detail
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="history-panel">
            <h3>Sejarah Singkat</h3>
            <p>
              UKM PSHT UPN "Veteran" Jawa Timur menjadi ruang pembinaan mahasiswa yang ingin
              mendalami pencak silat sekaligus nilai budi pekerti, keberanian, dan tanggung jawab.
              Narasi lengkap sejarah UKM, tahun berdiri, tokoh perintis, dan perjalanan organisasi
              dapat ditempatkan pada bagian ini saat data resmi sudah tersedia.
            </p>
          </div>
        </section>

        <section className="catalog-section soft-section" id="ketua">
          <div className="section-title">
            <p>Regenerasi</p>
            <h2>Daftar Ketua UKM</h2>
            <span>Urutan dibuat dari periode terbaru agar pengunjung melihat kepengurusan terkini.</span>
          </div>

          <div className="card-grid">
            {leaders.map((leader) => (
              <article className="info-card" key={`${leader.name}-${leader.period}`}>
                <div className="card-image mini">
                  <img src={heroImg} alt="" />
                </div>
                <div className="card-body">
                  <span>{leader.period}</span>
                  <h3>{leader.name}</h3>
                  <p>{leader.note}</p>
                  <a href="#kontak" onClick={(event) => scrollToSection(event, '#kontak')}>
                    Hubungi pengurus
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="catalog-section" id="prestasi">
          <div className="section-title">
            <p>Pencapaian</p>
            <h2>Prestasi Anggota dan UKM</h2>
            <span>Gunakan bagian ini untuk menampilkan rekam jejak lomba, festival, dan kontribusi UKM.</span>
          </div>

          <div className="card-grid three">
            {achievements.map((achievement) => (
              <article className="info-card" key={`${achievement.event}-${achievement.year}`}>
                <div className="card-image mini red">
                  <strong>{achievement.year}</strong>
                </div>
                <div className="card-body">
                  <span>Prestasi</span>
                  <h3>{achievement.event}</h3>
                  <p>{achievement.result}</p>
                  <a href="#kontak" onClick={(event) => scrollToSection(event, '#kontak')}>
                    Lihat detail
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery-section" id="galeri">
          <div className="section-title">
            <p>Galeri</p>
            <h2>Dokumentasi Kegiatan</h2>
          </div>

          <div className="gallery-grid">
            {gallery.map((item) => (
              <figure className="gallery-tile" key={item}>
                <img src={heroImg} alt="" />
                <figcaption>{item}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="contact-section" id="kontak">
          <div className="contact-copy">
            <p>Kontak</p>
            <h2>Ingin ikut latihan atau bertanya soal pendaftaran?</h2>
            <span>
              Hubungi pengurus UKM untuk jadwal latihan, lokasi kumpul, dan informasi penerimaan
              anggota baru.
            </span>
          </div>

          <div className="contact-panel">
            <button className="contact-action whatsapp" type="button" onClick={() => setActivePopup('whatsapp')}>
              <ContactIcon type="whatsapp" />
              WhatsApp 
            </button>
            <button className="contact-action instagram" type="button" onClick={() => setActivePopup('instagram')}>
              <ContactIcon type="instagram" />
              Instagram 
            </button>
            <div className="contact-info schedule">
              <small>Jadwal latihan</small>
              <strong>Selasa dan Kamis, 19.22 WIB</strong>
            </div>
            <div className="contact-info location">
              <small>Lokasi</small>
              <strong> Depan Rektorat UPN "Veteran" Jawa Timur</strong>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>UKM PSHT UPN "Veteran" Jawa Timur</span>
        <span>Design by Angga</span>
      </footer>
    </div>
  )
}

export default App
