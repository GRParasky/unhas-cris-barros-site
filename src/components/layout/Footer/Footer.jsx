import styles from './Footer.module.css'
import { CLIENT } from '../../../config/client'

const SOCIAL_ICONS = [
  ...(CLIENT.social.youtube.enabled   ? [{ href: CLIENT.social.youtube.url,   icon: 'fa-brands fa-youtube',   label: 'YouTube' }]   : []),
  ...(CLIENT.social.instagram.enabled ? [{ href: CLIENT.social.instagram.url, icon: 'fa-brands fa-instagram', label: 'Instagram' }] : []),
  ...(CLIENT.social.tiktok.enabled    ? [{ href: CLIENT.social.tiktok.url,    icon: 'fa-brands fa-tiktok',    label: 'TikTok' }]    : []),
]

// Links do footer derivados do CLIENT — sem hardcode
const FOOTER_LINKS = {
  Serviços: CLIENT.about.cards.map((card) => ({ label: card.title, href: '#contact' })),
  Empresa: [
    { label: 'Sobre',     href: '#about' },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Novidades', href: '#social' },
    { label: 'Contato',   href: '#contact' },
  ],
  Social: [
    ...(CLIENT.social.youtube.enabled   ? [{ label: 'YouTube',   href: CLIENT.social.youtube.url,   external: true }] : []),
    ...(CLIENT.social.instagram.enabled ? [{ label: 'Instagram', href: CLIENT.social.instagram.url, external: true }] : []),
    ...(CLIENT.social.tiktok.enabled    ? [{ label: 'TikTok',    href: CLIENT.social.tiktok.url,    external: true }] : []),
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Borda superior com gradiente */}
      <div className={styles.topBorder} aria-hidden="true"></div>

      <div className="container">
        <div className={styles.footerTop}>
          {/* Marca */}
          <div className={styles.brand}>
            <a
              href="#hero"
              className={styles.logo}
              onClick={(e) => handleNavClick(e, '#hero')}
              aria-label={`${CLIENT.brandName} - Voltar ao topo`}
            >
              <img
                src={CLIENT.logoUrl}
                alt={CLIENT.logoAlt}
                className={styles.logoImg}
              />
              <span>
                {CLIENT.brandNameDisplay.prefix}{CLIENT.brandNameDisplay.separator}<span className={styles.logoAccent}>{CLIENT.brandNameDisplay.suffix}</span>
              </span>
            </a>
            <p className={styles.brandTagline}>{CLIENT.footer.tagline}</p>
            <div className={styles.socialIcons} aria-label="Links das redes sociais">
              {SOCIAL_ICONS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label={`Siga-nos no ${social.label}`}
                >
                  <i className={social.icon} aria-hidden="true"></i>
                  <span className={styles.socialIconLabel}>{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Colunas de links */}
          <nav className={styles.linksGrid} aria-label="Navegação do rodapé">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category} className={styles.linkColumn}>
                <h4 className={styles.linkColumnTitle}>{category}</h4>
                <ul className={styles.linkList} role="list">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={styles.footerLink}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        onClick={!link.external ? (e) => handleNavClick(e, link.href) : undefined}
                      >
                        {link.label}
                        {link.external && (
                          <i
                            className={`fa-solid fa-arrow-up-right-from-square ${styles.externalIcon}`}
                            aria-hidden="true"
                          ></i>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Rodapé inferior */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} {CLIENT.brandName}. Todos os direitos reservados.
          </p>
          {CLIENT.contact.location.enabled && (
            <address className={styles.location}>
              <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
              {CLIENT.address?.full || CLIENT.location}
            </address>
          )}
        </div>

        {/* Crédito do desenvolvedor */}
        <div className={styles.devCredit}>
          <span>Desenvolvido por</span>
          <a
            href="https://gabrielparasky.com.br?lang=pt"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.devLink}
          >
            Gabriel Parasky
            <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </footer>
  )
}
