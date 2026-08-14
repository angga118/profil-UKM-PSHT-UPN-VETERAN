import logoImg from '../assets/psht-logo.jpg'
import { navItems } from '../data/siteData'

function Header({ menuOpen, onToggleMenu, onNavClick }) {
  return (
    <header className="site-header">
      <a
        className="brand"
        href="#beranda"
        aria-label='UKM PSHT UPN "Veteran" Jawa Timur'
        onClick={(event) => onNavClick(event, '#beranda')}
      >
        <span className="brand-logo-frame">
          <img className="brand-logo" src={logoImg} alt='Logo UKM PSHT UPN "Veteran" Jawa Timur' />
        </span>
        <span>
          <strong>UKM PSHT</strong>
          <small>UPN "Veteran" Jatim</small>
        </span>
      </a>

      <button
        className="menu-button"
        type="button"
        aria-label="Buka menu navigasi"
        aria-expanded={menuOpen}
        onClick={onToggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Navigasi utama">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={(event) => onNavClick(event, item.href)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Header
