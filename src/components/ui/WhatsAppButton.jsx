import styles from './WhatsAppButton.module.css'
import { CLIENT } from '../../config/client'

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${CLIENT.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      aria-label="Falar no WhatsApp"
    >
      <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
    </a>
  )
}
