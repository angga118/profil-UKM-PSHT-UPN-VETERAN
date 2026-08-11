import { useState } from 'react'
import heroImg from './assets/hero.png'
import heroGroupImg from './assets/hero-group.jpg'
import logoImg from './assets/psht-logo.jpg'
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <div className="topbar">
        <span>UKM Persaudaraan Setia Hati Terate</span>
        <span>UPN "Veteran" Jawa Timur</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#beranda" aria-label='UKM PSHT UPN "Veteran" Jawa Timur'>
          <img className="brand-logo" src={logoImg} alt='Logo UKM PSHT UPN "Veteran" Jawa Timur' />
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
            <a key={item.href} href={item.href} onClick={closeMenu}>
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
            <a href="#kontak">Bergabung Sekarang</a>
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
                  <a href={card.href}>Lihat detail</a>
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
                  <a href="#kontak">Hubungi pengurus</a>
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
                  <a href="#kontak">Lihat detail</a>
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
            <a href="https://wa.me/6280000000000" target="_blank" rel="noreferrer">
              WhatsApp Pengurus
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">
              Instagram Resmi
            </a>
            <div>
              <small>Jadwal latihan</small>
              <strong>Selasa dan Kamis, 19.00 WIB</strong>
            </div>
            <div>
              <small>Lokasi</small>
              <strong>Area Kampus UPN "Veteran" Jawa Timur</strong>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>UKM PSHT UPN "Veteran" Jawa Timur</span>
        <span>Landing page statis v1</span>
      </footer>
    </div>
  )
}

export default App
