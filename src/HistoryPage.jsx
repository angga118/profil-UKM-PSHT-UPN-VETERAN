const historyTimeline = [
  {
    year: '2018',
    title: 'Awal pembentukan komunitas',
    text: 'Sejumlah mahasiswa mulai membentuk kelompok latihan pencak silat berbasis nilai persaudaraan di lingkungan kampus.',
  },
  {
    year: '2020',
    title: 'Penguatan kegiatan latihan',
    text: 'Latihan rutin, pembinaan teknik, dan kegiatan silaturahmi mulai disusun lebih terarah untuk anggota.',
  },
  {
    year: '2023',
    title: 'Regenerasi kepengurusan',
    text: 'Kepengurusan memperluas dokumentasi kegiatan serta membuka ruang kaderisasi bagi mahasiswa baru.',
  },
  {
    year: 'Sekarang',
    title: 'Pembinaan dan prestasi',
    text: 'UKM terus menjadi wadah latihan, pengembangan karakter, dan partisipasi mahasiswa dalam kegiatan kampus maupun kejuaraan.',
  },
]

function HistoryPage({ onBack }) {
  return (
    <main className="history-page">
      <header className="history-page-header">
        <a className="history-back" href="#sejarah" onClick={onBack}>
          &larr; Kembali ke beranda
        </a>
        <p>Contoh konten</p>
        <h1>Sejarah UKM PSHT</h1>
        <span>
          Halaman ini adalah dummy. Ganti tahun dan narasinya setelah data organisasi telah
          dikonfirmasi.
        </span>
      </header>

      <section className="history-page-content" aria-labelledby="history-timeline-title">
        <h2 id="history-timeline-title">Perjalanan organisasi</h2>
        <ol className="history-timeline">
          {historyTimeline.map((item) => (
            <li key={item.year}>
              <strong>{item.year}</strong>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}

export default HistoryPage
