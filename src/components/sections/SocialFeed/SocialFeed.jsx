// TODO: Instagram: Instagram Graph API - GET /{user-id}/media
// TikTok: TikTok Display API (pending approval)

import { useState, useCallback, useEffect } from 'react'
import styles from './SocialFeed.module.css'
import { useYouTubeVideos } from '../../../hooks/useYouTubeVideos'
import { CLIENT } from '../../../config/client'

// ─── Instagram (aguardando API) ───────────────────────────────────────────────
// TODO: substituir INSTAGRAM_MOCK pelo hook useInstagramFeed quando a API estiver configurada
// e descomentar a entrada do Instagram em PLATFORMS abaixo
// const INSTAGRAM_MOCK = [
//   { id: 'ig1', thumb: 'https://picsum.photos/seed/1/400/400', caption: 'Legenda do post ✨', likes: '234', date: 'há 1 dia' },
//   ...
// ]

// ─── Platform Config ─────────────────────────────────────────────────────────

const PLATFORMS = [
  // YouTube: visível se habilitado no config
  ...(CLIENT.socialFeed.platforms.youtube && CLIENT.social.youtube.enabled
    ? [{
        id: 'youtube',
        label: 'YouTube',
        icon: 'fa-brands fa-youtube',
        color: '#FF0000',
        href: CLIENT.social.youtube.url,
      }]
    : []),
  // TODO: descomentar quando a Instagram Graph API estiver configurada
  // ...(CLIENT.socialFeed.platforms.instagram
  //   ? [{
  //       id: 'instagram',
  //       label: 'Instagram',
  //       icon: 'fa-brands fa-instagram',
  //       color: '#E1306C',
  //       gradient: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af, #515bd4)',
  //       href: CLIENT.social.instagram.url,
  //     }]
  //   : []),
  // TikTok: visível se habilitado no config E houver vídeos configurados
  ...(CLIENT.socialFeed.platforms.tiktok && CLIENT.social.tiktok.enabled && CLIENT.tiktokVideos.length > 0
    ? [{
        id: 'tiktok',
        label: 'TikTok',
        icon: 'fa-brands fa-tiktok',
        color: '#69C9D0',
        href: CLIENT.social.tiktok.url,
      }]
    : []),
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function YouTubeSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={styles.ytCard} aria-hidden="true">
          <div className={styles.skeletonThumb} />
          <div className={styles.ytMeta}>
            <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
            <div className={`${styles.skeletonLine} ${styles.skeletonMeta}`} />
          </div>
        </div>
      ))}
    </>
  )
}

function YouTubeError() {
  return (
    <div className={styles.feedError} role="alert">
      <i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i>
      <p>Não foi possível carregar os vídeos. <a href={CLIENT.social.youtube.url} target="_blank" rel="noopener noreferrer">Ver canal no YouTube</a></p>
    </div>
  )
}

function YouTubeCard({ item }) {
  const thumb = `https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`
  return (
    <article className={styles.ytCard}>
      <a
        href={`https://www.youtube.com/watch?v=${item.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.ytThumbLink}
        aria-label={`Assistir: ${item.title}`}
      >
        <div className={styles.ytThumbWrapper}>
          <img
            src={thumb}
            alt={item.title}
            className={styles.ytThumb}
            loading="lazy"
          />
          <span className={styles.playOverlay} aria-hidden="true">
            <i className="fa-solid fa-play"></i>
          </span>
        </div>
      </a>
      <div className={styles.ytMeta}>
        <p className={styles.ytTitle}>{item.title}</p>
        <div className={styles.ytStats}>
          <span>
            <i className="fa-solid fa-eye" aria-hidden="true"></i> {item.views}
          </span>
          <span>{item.date}</span>
        </div>
      </div>
    </article>
  )
}

// TODO: descomentar quando a Instagram Graph API estiver configurada
// function InstagramCard({ item }) { ... }

function TikTokCard({ item }) {
  const [thumb, setThumb] = useState(null)

  useEffect(() => {
    fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(item.url)}`)
      .then((r) => r.json())
      .then((data) => { if (data.thumbnail_url) setThumb(data.thumbnail_url) })
      .catch(() => {})
  }, [item.url])

  return (
    <article className={styles.ttCard}>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.ttLink}
        aria-label="Assistir no TikTok"
      >
        {thumb
          ? <img src={thumb} alt="TikTok vídeo" className={styles.ttThumb} loading="lazy" />
          : <div className={styles.ttPlaceholder} aria-hidden="true" />
        }
        <div className={styles.ttOverlay} aria-hidden="true">
          <span className={styles.ttPlayIcon}>
            <i className="fa-brands fa-tiktok"></i>
          </span>
          <span className={styles.ttCta}>Ver no TikTok</span>
        </div>
      </a>
    </article>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SocialFeed() {
  const [activePlatformIndex, setActivePlatformIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const { videos: youtubeVideos, loading: ytLoading, error: ytError } = useYouTubeVideos()

  if (!CLIENT.socialFeed.enabled || PLATFORMS.length === 0) return null

  const activePlatform = PLATFORMS[activePlatformIndex]

  const switchPlatform = useCallback((index) => {
    if (index === activePlatformIndex || isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setActivePlatformIndex(index)
      setIsAnimating(false)
    }, 200)
  }, [activePlatformIndex, isAnimating])

  const handlePrev = useCallback(() => {
    const prevIndex = (activePlatformIndex - 1 + PLATFORMS.length) % PLATFORMS.length
    switchPlatform(prevIndex)
  }, [activePlatformIndex, switchPlatform])

  const handleNext = useCallback(() => {
    const nextIndex = (activePlatformIndex + 1) % PLATFORMS.length
    switchPlatform(nextIndex)
  }, [activePlatformIndex, switchPlatform])

  return (
    <section
      id="social"
      className={styles.socialFeed}
      aria-labelledby="social-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 id="social-heading" className="section-title">
            Últimas <span className="accent">Novidades</span>
          </h2>
          <p className="section-subtitle">
            Acompanhe o nosso conteúdo
          </p>
        </div>

        {/* Platform Switcher */}
        <div className={styles.switcherWrapper} role="group" aria-label="Escolher plataforma">
          <button
            className={styles.arrowBtn}
            onClick={handlePrev}
            aria-label="Plataforma anterior"
          >
            <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
          </button>

          <div className={styles.tabsRow} role="tablist">
            {PLATFORMS.map((platform, index) => {
              const isActive = index === activePlatformIndex
              const accentStyle = isActive
                ? platform.gradient
                  ? { background: platform.gradient, borderColor: 'transparent', color: '#fff' }
                  : { background: platform.color, borderColor: 'transparent', color: '#fff' }
                : {}

              return (
                <button
                  key={platform.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="social-grid"
                  className={`${styles.platformTab} ${isActive ? styles.platformTabActive : ''}`}
                  style={accentStyle}
                  onClick={() => switchPlatform(index)}
                >
                  <i className={platform.icon} aria-hidden="true"></i>
                  <span>{platform.label}</span>
                </button>
              )
            })}
          </div>

          <button
            className={styles.arrowBtn}
            onClick={handleNext}
            aria-label="Próxima plataforma"
          >
            <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>

        {/* Content Grid */}
        <div
          id="social-grid"
          role="tabpanel"
          aria-label={`Conteúdo do ${activePlatform.label}`}
          className={`${styles.contentGrid} ${styles[`grid_${activePlatform.id}`]} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}
        >
          {activePlatform.id === 'youtube' && (
            ytLoading
              ? <YouTubeSkeleton />
              : ytError
                ? <YouTubeError />
                : youtubeVideos.map((item) => <YouTubeCard key={item.id} item={item} />)
          )}

          {/* TODO: descomentar quando a Instagram Graph API estiver configurada */}
          {/* {activePlatform.id === 'instagram' &&
            INSTAGRAM_MOCK.map((item) => <InstagramCard key={item.id} item={item} />)} */}

          {activePlatform.id === 'tiktok' &&
            CLIENT.tiktokVideos.map((item) => <TikTokCard key={item.id} item={item} />)}
        </div>

        {/* CTA */}
        <div className={styles.ctaWrapper}>
          <a
            href={activePlatform.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaLink}
            style={
              activePlatform.gradient
                ? { background: activePlatform.gradient }
                : { background: activePlatform.color }
            }
          >
            <i className={activePlatform.icon} aria-hidden="true"></i>
            Ver mais no {activePlatform.label}
            <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>
  )
}
