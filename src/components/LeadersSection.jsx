import heroImg from '../assets/hero.png'

function LeadersSection({ leaders }) {
  return (
    <section className="catalog-section soft-section" id="ketua">
      <div className="section-title reveal-on-scroll">
        <p>Regenerasi</p>
        <h2>Daftar Ketua UKM</h2>
        <span>Urutan dibuat dari periode terbaru agar pengunjung melihat kepengurusan terkini.</span>
      </div>

      <div className="card-grid">
        {leaders.map((leader, index) => (
          <article className="info-card reveal-on-scroll" key={`${leader.name}-${leader.period}`} style={{ '--reveal-delay': `${index * 80}ms` }}>
            <div className="card-image mini">
              <img src={heroImg} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="card-body">
              <span>{leader.period}</span>
              <h3>{leader.name}</h3>
              <p>{leader.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default LeadersSection
