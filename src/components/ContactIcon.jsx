import instagramLogo from '../assets/instagram-logo.svg'
import whatsappLogo from '../assets/whatsapp-logo.svg'

function ContactIcon({ type }) {
  const iconSrc = type === 'instagram' ? instagramLogo : whatsappLogo

  return <img className="contact-icon" src={iconSrc} alt="" aria-hidden="true" />
}

export default ContactIcon
