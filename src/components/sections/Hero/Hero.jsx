import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'
import { CLIENT } from '../../../config/client'

export default function Hero() {
  const parallaxRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return
      const scrollY = window.scrollY
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.4}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCtaClick = (e) => {
    if (!CLIENT.contact.form.enabled && CLIENT.contact.form.externalUrl) return
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

return (
    <section
      id="hero"
      className={styles.hero}
      aria-label={`Hero - ${CLIENT.brandName}`}
    >
      {/* Fundo: vídeo, imagem ou mock */}
      {CLIENT.hero.videoBg ? (
        <>
          <video
            className={styles.videoBg}
            src={`${import.meta.env.BASE_URL}${CLIENT.hero.videoPath}`}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className={styles.videoOverlay} aria-hidden="true"></div>
        </>
      ) : CLIENT.hero.imageBg ? (
        <>
          <img
            className={styles.videoBg}
            src={`${import.meta.env.BASE_URL}${CLIENT.hero.imageBg}`}
            alt=""
            aria-hidden="true"
          />
          <div className={styles.videoOverlay} aria-hidden="true"></div>
        </>
      ) : (
        <div className={styles.heroBgMock} aria-hidden="true"></div>
      )}

      {/* Partículas animadas */}
      <div className={styles.particles} aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className={styles.particle} style={{ '--i': i }}></span>
        ))}
      </div>

      <div className={`container ${styles.heroContent}`}>
        <div className={styles.heroLogo} aria-hidden="true">
          <img
            src={`${import.meta.env.BASE_URL}${CLIENT.logoUrl}`}
            alt={CLIENT.logoAlt}
          />
        </div>

        {CLIENT.hero.badgeEnabled && (
          <div className={styles.badge}>
            <i className="fa-solid fa-circle-dot" aria-hidden="true"></i>
            <span>{CLIENT.hero.badge}</span>
          </div>
        )}

        <h1 className={styles.title}>
          <span className={styles.titleLine1}>{CLIENT.hero.titleLine1}</span>
          <span className={styles.titleLine2}>
            {CLIENT.hero.titleLine2Prefix}
            <span className={styles.titleAccent}>{CLIENT.hero.titleLine2Accent}</span>
          </span>
        </h1>

        <p className={styles.tagline}>{CLIENT.hero.tagline}</p>

        <div className={styles.ctaGroup}>
          <a
            href={CLIENT.contact.form.enabled ? '#contact' : CLIENT.contact.form.externalUrl}
            className={styles.ctaPrimary}
            onClick={handleCtaClick}
            {...(!CLIENT.contact.form.enabled && { target: '_blank', rel: 'noopener noreferrer' })}
          >
            <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
            {CLIENT.nav.ctaLabel}
          </a>
        </div>

        {/* Estatísticas */}
        {CLIENT.hero.statsEnabled && <div className={styles.stats} role="list" aria-label="Nossas conquistas">
          {CLIENT.hero.stats.map((stat, index) => (
            <>
              {index > 0 && (
                <div key={`divider-${index}`} className={styles.statDivider} aria-hidden="true"></div>
              )}
              <div key={stat.label} className={styles.statItem} role="listitem">
                <strong className={styles.statNumber}>{stat.number}</strong>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            </>
          ))}
        </div>}
      </div>

      {/* Indicador de scroll */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLine}></span>
        <span className={styles.scrollDot}></span>
      </div>
    </section>
  )
}
