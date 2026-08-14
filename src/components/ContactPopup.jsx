import ContactIcon from './ContactIcon'

function ContactPopup({ content, closeButtonRef, onClose }) {
  return (
    <div className="contact-popup-backdrop" onClick={onClose}>
      <div
        className="contact-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-popup-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="contact-popup-close"
          type="button"
          aria-label="Tutup pop up"
          ref={closeButtonRef}
          onClick={onClose}
        >
          &times;
        </button>
        <p>Kontak UKM</p>
        <h3 id="contact-popup-title">{content.title}</h3>
        <span>{content.text}</span>
        <a href={content.href} target="_blank" rel="noreferrer">
          <ContactIcon type={content.icon} />
          {content.action}
        </a>
      </div>
    </div>
  )
}

export default ContactPopup
