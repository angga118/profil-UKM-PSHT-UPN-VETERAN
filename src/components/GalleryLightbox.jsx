function GalleryLightbox({ item, closeButtonRef, onClose }) {
  return (
    <div className="gallery-lightbox-backdrop" onClick={onClose}>
      <div
        className="gallery-lightbox"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-lightbox-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="gallery-lightbox-close"
          type="button"
          aria-label="Tutup tampilan foto"
          ref={closeButtonRef}
          onClick={onClose}
        >
          &times;
        </button>
        <img src={item.image} alt={`Dokumentasi ${item.title}`} />
        <div>
          <span>{item.date}</span>
          <strong id="gallery-lightbox-title">{item.title}</strong>
        </div>
      </div>
    </div>
  )
}

export default GalleryLightbox
