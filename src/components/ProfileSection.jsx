import heroImg from '../assets/hero.png'
function ProfileSection({ content, cards, onOpenDetail, onNavClick }) {
  return (
    <section className="catalog-section" id="sejarah">
      <div className="section-title reveal-on-scroll">
        <p>{content.eyebrow}</p>
        <h2>{content.title}</h2>
        <span>{content.description}</span>
      </div>

      <div className="profile-grid">
        {cards.map((card, index) => (
          <article className="info-card feature-card reveal-on-scroll" key={card.title} style={{ '--reveal-delay': `${index * 90}ms` }}>
            <div className="card-image">
              <img src={heroImg} alt="" loading="lazy" decoding="async" />
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
              <a
                href={card.detailRoute ?? card.href}
                onClick={(event) => {
                  if (card.detailRoute) {
                    event.preventDefault()
                    onOpenDetail(card.detailRoute)
                  }
                  else onNavClick(event, card.href)
                }}
              >
                Lihat detail
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProfileSection
