import { historyTimeline } from '../data/siteData'

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
