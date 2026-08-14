function GallerySection({
  gallery,
  activeSlide,
  onSetActiveSlide,
  onPrevious,
  onNext,
  onPauseChange,
  onOpenLightbox,
}) {
  const currentItem = gallery[activeSlide]

  return (
    <section className="gallery-section" id="galeri">
      <div className="section-title reveal-on-scroll">
        <h2 className="gallery-heading">Galeri PSHT UPN "Veteran" Jawa Timur</h2>
      </div>

      <div
        className="gallery-slider reveal-on-scroll"
        onMouseEnter={() => onPauseChange(true)}
        onMouseLeave={() => onPauseChange(false)}
        onFocus={() => onPauseChange(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) onPauseChange(false)
        }}
      >
        <figure className="gallery-slide">
          <button
            className="gallery-image-button"
            type="button"
            aria-label={`Perbesar foto ${currentItem.title}`}
            onClick={(event) => onOpenLightbox(event.currentTarget)}
          >
            <img
              src={currentItem.image}
              alt={`Dokumentasi ${currentItem.title}`}
              decoding="async"
            />
          </button>
          <figcaption>
            <span>{currentItem.date}</span>
            <strong>{currentItem.title}</strong>
          </figcaption>
        </figure>
        <button
          className="gallery-slider-button previous"
          type="button"
          aria-label="Dokumentasi sebelumnya"
          onClick={onPrevious}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7" /></svg>
        </button>
        <button
          className="gallery-slider-button next"
          type="button"
          aria-label="Dokumentasi berikutnya"
          onClick={onNext}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7" /></svg>
        </button>
        <div className="gallery-slider-dots" aria-label="Pilih dokumentasi kegiatan">
          {gallery.map((item, index) => (
            <button
              key={item.title}
              className={index === activeSlide ? 'active' : ''}
              type="button"
              aria-label={`Tampilkan ${item.title}`}
              aria-current={index === activeSlide ? 'true' : undefined}
              onClick={() => onSetActiveSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default GallerySection
