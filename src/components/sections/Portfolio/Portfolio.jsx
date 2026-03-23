import styles from './Portfolio.module.css'
import { CLIENT } from '../../../config/client'

export default function Portfolio() {
  return (
    <section id="portfolio" className={styles.portfolio} aria-labelledby="portfolio-title">
      <div className="container section-padding">
        <div className="section-header">
          <span className="section-badge">Portfólio</span>
          <h2 className="section-title" id="portfolio-title">Nosso Portfólio</h2>
          <p className="section-subtitle">
            Em breve você verá aqui os melhores trabalhos de {CLIENT.brandName}.
          </p>
        </div>

        <div className={styles.construction}>
          {CLIENT.scrollEffect.iconPath && (
            <img
              src={`${import.meta.env.BASE_URL}${CLIENT.scrollEffect.iconPath}`}
              alt=""
              aria-hidden="true"
              className={styles.constructionDroneIcon}
            />
          )}
          <div className={styles.constructionIcon} aria-hidden="true">
            <i className="fa-solid fa-screwdriver-wrench"></i>
          </div>
          <h3 className={styles.constructionTitle}>Em Construção</h3>
          <p className={styles.constructionText}>
            Estamos preparando algo incrível. Em breve os melhores trabalhos estarão aqui.
          </p>
          <div className={styles.constructionDots} aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </section>
  )
}
