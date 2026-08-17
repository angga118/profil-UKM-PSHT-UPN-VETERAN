import heroImg from '../assets/hero.png'
function ProfileSection({ content, cards }) {
  return (
    <section className="catalog-section" id="sejarah">
      <div className="section-title reveal-on-scroll">
        <p>{content.eyebrow}</p>
        <h2>{content.title}</h2>
        <span>{content.description}</span>
      </div>

      <div className="profile-grid">
        {cards.map((card, index) => (
          <article className="info-card feature-card reveal-on-scroll" key={`${card.title}-${index}`} style={{ '--reveal-delay': `${index * 90}ms` }}>
            <div className="card-image">
              <img src={card.image || heroImg} alt={card.title || 'Foto card profil'} loading="lazy" decoding="async" />
            </div>
            <div className="card-body">
              <span>{card.eyebrow}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <ul>
                {(Array.isArray(card.points) ? card.points : []).map((point) => (
                  <li key={`${card.title}-${point}`}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProfileSection
