import { useState, useEffect } from 'react'
import styles from './Portfolio.module.css'
import { CLIENT } from '../../../config/client'

function InstagramCard({ post, index }) {
  const [thumb, setThumb] = useState(null)

  useEffect(() => {
    fetch(`https://api.instagram.com/oembed/?url=${encodeURIComponent(post.url)}`)
      .then((r) => r.json())
      .then((data) => { if (data.thumbnail_url) setThumb(data.thumbnail_url) })
      .catch(() => {})
  }, [post.url])

  return (
    <article className={styles.card}>
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cardLink}
        aria-label={post.caption || `Ver post ${index + 1} no Instagram`}
      >
        {thumb
          ? <img src={thumb} alt={post.caption || `Post ${index + 1}`} className={styles.cardThumb} loading="lazy" />
          : <div className={styles.cardPlaceholder} aria-hidden="true">
              <i className="fa-brands fa-instagram"></i>
            </div>
        }
        <div className={styles.cardOverlay} aria-hidden="true">
          <i className="fa-brands fa-instagram"></i>
          <span>Ver no Instagram</span>
        </div>
      </a>
      {post.caption && <p className={styles.cardCaption}>{post.caption}</p>}
    </article>
  )
}

export default function Portfolio() {
  return (
    <section id="portfolio" className={styles.portfolio} aria-labelledby="portfolio-title">
      <div className="container section-padding">
        <div className="section-header">
          <span className="section-badge">{CLIENT.portfolio.badge}</span>
          <h2 className="section-title" id="portfolio-title">{CLIENT.portfolio.sectionTitle}</h2>
          <p className="section-subtitle">
            {CLIENT.portfolio.sectionSubtitle} {CLIENT.brandName}.
          </p>
        </div>

        <div className={styles.grid}>
          {CLIENT.portfolio.posts.map((post, i) => (
            <InstagramCard key={i} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
