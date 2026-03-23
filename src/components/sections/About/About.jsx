import styles from './About.module.css'
import { CLIENT } from '../../../config/client'

export default function About() {
  return (
    <section
      id="about"
      className={`${styles.about} section-padding`}
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className={styles.aboutGrid}>
          {/* Esquerda: Conteúdo de texto */}
          <div className={styles.content}>
            <div className={styles.tagBadge}>
              <i className="fa-solid fa-circle-info" aria-hidden="true"></i>
              {CLIENT.about.tagBadge}
            </div>

            <h2 id="about-heading" className={styles.title}>
              {CLIENT.about.title}{' '}
              <span className={styles.titleAccent}>{CLIENT.about.titleAccent}</span>
            </h2>

            {CLIENT.about.descriptions.map((text, i) => (
              <p key={i} className={styles.description}>{text}</p>
            ))}

            <div className={styles.highlights}>
              {CLIENT.about.highlights.map((highlight) => (
                <div key={highlight} className={styles.highlight}>
                  <i className="fa-solid fa-check-circle" aria-hidden="true"></i>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className={styles.ctaLink}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {CLIENT.nav.ctaLabel}
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>

          {/* Direita: Cards de serviços */}
          <div className={styles.servicesGrid} aria-label="Nossos serviços">
            {CLIENT.about.cards.map((service) => (
              <article
                key={service.title}
                className={`${styles.serviceCard} ${service.featured ? styles.featured : ''}`}
              >
                <div className={styles.serviceIcon} aria-hidden="true">
                  <i className={service.icon}></i>
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
