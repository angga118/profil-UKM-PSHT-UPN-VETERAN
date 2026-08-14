function LatihanRutin({ content, onBack }) {
  return (
    <main className="history-page">
      <header className="history-page-header">
        <a className="history-back" href="#sejarah" onClick={onBack}>
          &larr; Kembali ke beranda
        </a>
        <p>{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <span>{content.description}</span>
      </header>

      <section className="history-page-content" aria-labelledby="training-schedule-title">
        <h2 id="training-schedule-title">Jadwal latihan</h2>
        <ol className="history-timeline">
          {content.schedule.map((item) => (
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
          {content.highlights.map((item) => (
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
