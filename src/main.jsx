import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { CLIENT } from './config/client'

// ─── Guia do navegador ────────────────────────────────────────────────────
document.title = CLIENT.tab.title

const faviconLink = document.querySelector('link[rel="icon"]')
if (faviconLink) faviconLink.href = CLIENT.tab.faviconPath

// ─── Paleta de cores ──────────────────────────────────────────────────────
const t = CLIENT.theme
const root = document.documentElement
root.style.setProperty('--color-bg',             t.bg)
root.style.setProperty('--color-bg-secondary',   t.bgSecondary)
root.style.setProperty('--color-bg-card',        t.bgCard)
root.style.setProperty('--color-bg-card-hover',  t.bgCardHover)
root.style.setProperty('--color-surface',        t.surface)
root.style.setProperty('--color-border',         t.border)
root.style.setProperty('--color-accent',         t.accent)
root.style.setProperty('--color-accent-hover',   t.accentHover)
root.style.setProperty('--color-accent-light',   t.accentLight)
root.style.setProperty('--color-text-primary',              t.textOnBg)
root.style.setProperty('--color-text-secondary',            `${t.textOnBg}b3`)
root.style.setProperty('--color-text-muted',                `${t.textOnBg}66`)
root.style.setProperty('--color-white',                      t.textOnBg)
root.style.setProperty('--color-text-on-bg-secondary',       t.textOnBgSecondary)
root.style.setProperty('--color-navbar-scrolled',           t.navbarScrolled)
root.style.setProperty('--color-hero-overlay',               t.heroOverlay)
root.style.setProperty('--shadow-glow',                     `0 0 20px ${t.accent}66`)

// ─── Schema JSON-LD (BeautySalon) ─────────────────────────────────────────
const schema = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: CLIENT.brandName,
  description: CLIENT.seoDescription,
  url: CLIENT.siteUrl,
  logo: `${CLIENT.siteUrl}/${CLIENT.logoUrl}`,
  image: `${CLIENT.siteUrl}/${CLIENT.logoUrl}`,
  telephone: `+${CLIENT.contact.whatsapp.number}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: CLIENT.address.street,
    addressLocality: CLIENT.address.city,
    addressRegion: CLIENT.address.state,
    postalCode: CLIENT.address.postalCode,
    addressCountry: 'BR',
  },
  areaServed: CLIENT.address.citiesServed.map((city) => ({ '@type': 'City', name: city })),
  sameAs: [
    CLIENT.social.instagram.enabled && CLIENT.social.instagram.url,
    CLIENT.social.youtube.enabled   && CLIENT.social.youtube.url,
    CLIENT.social.tiktok.enabled    && CLIENT.social.tiktok.url,
  ].filter(Boolean),
  priceRange: '$$',
}
const schemaTag = document.createElement('script')
schemaTag.type = 'application/ld+json'
schemaTag.textContent = JSON.stringify(schema)
document.head.appendChild(schemaTag)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
