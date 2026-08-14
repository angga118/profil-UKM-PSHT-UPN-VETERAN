import { trainingHighlights, trainingSchedule } from '../data/siteData'

function LatihanRutin({ onBack }) {
  return (
    <main className="history-page">
      <header className="history-page-header">
        <a className="history-back" href="#kontak" onClick={onBack}>
          &larr; Kembali ke beranda
        </a>
        <p>Kegiatan</p>
        <h1>Latihan Rutin UKM PSHT</h1>
        <span>
          Jadwal dan agenda latihan berikut adalah contoh gambaran umum. Sesuaikan dengan jadwal
          resmi terbaru dari pengurus UKM.
        </span>
      </header>

      <section className="history-page-content" aria-labelledby="training-schedule-title">
        <h2 id="training-schedule-title">Jadwal latihan</h2>
        <ol className="history-timeline">
          {trainingSchedule.map((item) => (
            <li key={item.day}>
              <strong>{item.day}</strong>
              <div>
                <h3>
                  {item.focus}
                  {' · '}
                  {item.time}
                </h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="history-page-content" aria-labelledby="training-highlights-title">
        <h2 id="training-highlights-title">Fokus pembinaan</h2>
        <ol className="history-timeline">
          {trainingHighlights.map((item) => (
            <li key={item.title}>
              <strong>&bull;</strong>
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

export default LatihanRutin
