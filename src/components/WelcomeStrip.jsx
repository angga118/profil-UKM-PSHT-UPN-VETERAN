function WelcomeStrip({ content }) {
  return (
    <section className="welcome-strip" aria-label="Sambutan">
      <strong>{content.title}</strong>
      <span>{content.text}</span>
    </section>
  )
}

export default WelcomeStrip
