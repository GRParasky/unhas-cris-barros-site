import { useState, useEffect, useCallback } from 'react'
import styles from './Navbar.module.css'
import { CLIENT } from '../../../config/client'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20)

    const sections = CLIENT.nav.links.map((link) => link.href.slice(1))
    const scrollPos = window.scrollY + 100

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i])
      if (el && el.offsetTop <= scrollPos) {
        setActiveSection(sections[i])
        break
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  return (
    <header
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <div className={`container ${styles.navInner}`}>
        {/* Logo */}
        <a
          href="#hero"
          className={styles.logo}
          onClick={(e) => handleNavClick(e, '#hero')}
          aria-label={`${CLIENT.brandName} - Voltar ao topo`}
        >
          <img
            src={`${import.meta.env.BASE_URL}${CLIENT.logoUrl}`}
            alt={CLIENT.logoAlt}
            className={styles.logoImg}
          />
          <span className={styles.logoText}>
            {CLIENT.brandNameDisplay.prefix}{CLIENT.brandNameDisplay.separator}<span className={styles.logoAccent}>{CLIENT.brandNameDisplay.suffix}</span>
          </span>
        </a>

        {/* Navegação Desktop */}
        <nav className={styles.desktopNav} aria-label="Navegação principal">
          <ul className={styles.navList} role="list">
            {CLIENT.nav.links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`${styles.navLink} ${
                    activeSection === href.slice(1) ? styles.active : ''
                  }`}
                  onClick={(e) => handleNavClick(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Botão CTA */}
        <a
          href={CLIENT.contact.form.enabled ? '#contact' : CLIENT.contact.form.externalUrl}
          className={styles.ctaButton}
          onClick={(e) => CLIENT.contact.form.enabled && handleNavClick(e, '#contact')}
          {...(!CLIENT.contact.form.enabled && { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {CLIENT.nav.ctaLabel}
        </a>

        {/* Botão Menu Hambúrguer */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>

      {/* Menu Mobile */}
      <nav
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
        aria-label="Navegação mobile"
        aria-hidden={!isMenuOpen}
      >
        <ul className={styles.mobileNavList} role="list">
          {CLIENT.nav.links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`${styles.mobileNavLink} ${
                  activeSection === href.slice(1) ? styles.active : ''
                }`}
                onClick={(e) => handleNavClick(e, href)}
                tabIndex={isMenuOpen ? 0 : -1}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={CLIENT.contact.form.enabled ? '#contact' : CLIENT.contact.form.externalUrl}
              className={styles.mobileCta}
              onClick={(e) => CLIENT.contact.form.enabled && handleNavClick(e, '#contact')}
              tabIndex={isMenuOpen ? 0 : -1}
              {...(!CLIENT.contact.form.enabled && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {CLIENT.nav.ctaLabel}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
