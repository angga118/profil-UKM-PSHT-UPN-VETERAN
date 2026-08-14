import ContactIcon from './ContactIcon'

function ContactSection({ onOpenPopup }) {
  return (
    <section className="contact-section" id="kontak">
      <div className="contact-copy">
        <p>Kontak</p>
        <h2>Ingin ikut latihan atau bertanya soal pendaftaran?</h2>
        <span>
          Hubungi pengurus UKM untuk jadwal latihan, lokasi kumpul, dan informasi penerimaan
          anggota baru.
        </span>
      </div>

      <div className="contact-panel">
        <button
          className="contact-action whatsapp"
          type="button"
          aria-haspopup="dialog"
          onClick={(event) => onOpenPopup(event, 'whatsapp')}
        >
          <ContactIcon type="whatsapp" />
          WhatsApp
        </button>
        <button
          className="contact-action instagram"
          type="button"
          aria-haspopup="dialog"
          onClick={(event) => onOpenPopup(event, 'instagram')}
        >
          <ContactIcon type="instagram" />
          Instagram
        </button>
        <div className="contact-info schedule">
          <small>Jadwal latihan</small>
          <strong>Selasa dan Kamis, Pukul 19.22</strong>
        </div>
        <div className="contact-info location">
          <small>Lokasi</small>
          <strong>Lapangan Basket Depan Rektorat UPN "Veteran" Jawa Timur</strong>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
