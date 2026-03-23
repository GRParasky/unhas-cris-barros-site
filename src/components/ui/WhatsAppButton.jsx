import styles from './WhatsAppButton.module.css'
import { CLIENT } from '../../config/client'

export default function WhatsAppButton() {
  if (!CLIENT.contact.whatsapp.enabled) return null

  return (
    <a
      href={`https://wa.me/${CLIENT.contact.whatsapp.number}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      aria-label="Falar no WhatsApp"
    >
      <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
    </a>
  )
}
