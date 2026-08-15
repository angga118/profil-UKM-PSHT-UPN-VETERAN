function AchievementsSection({ achievements, onNavClick }) {
  return (
    <section className="catalog-section" id="prestasi">
      <div className="section-title reveal-on-scroll">
        <p>Pencapaian</p>
        <h2>Prestasi Anggota dan UKM</h2>
        <span>Gunakan bagian ini untuk menampilkan rekam jejak lomba, festival, dan kontribusi UKM.</span>
      </div>

      <div className="card-grid three">
        {achievements.map((achievement, index) => (
          <article className="info-card reveal-on-scroll" key={`${achievement.event}-${achievement.year}`} style={{ '--reveal-delay': `${index * 90}ms` }}>
            <div className={achievement.image ? 'card-image mini' : 'card-image mini red'}>
              {achievement.image ? <img src={achievement.image} alt={achievement.event || 'Foto prestasi'} loading="lazy" decoding="async" /> : <strong>{achievement.year}</strong>}
            </div>
            <div className="card-body">
              <span>Prestasi</span>
              <h3>{achievement.event}</h3>
              <p>{achievement.result}</p>
              <a href="#kontak" onClick={(event) => onNavClick(event, '#kontak')}>
                Lihat detail
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AchievementsSection
