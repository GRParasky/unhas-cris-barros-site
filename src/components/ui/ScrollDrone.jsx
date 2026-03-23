import { useEffect, useRef } from 'react'
import styles from './ScrollDrone.module.css'
import { CLIENT } from '../../config/client'

export default function ScrollDrone() {
  const droneRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!droneRef.current) return
      const maxY = window.innerHeight - 80
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      const y = progress * maxY
      droneRef.current.style.top = `${y}px`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={droneRef} className={styles.drone} aria-hidden="true">
      <img
        src={`${import.meta.env.BASE_URL}${CLIENT.scrollEffect.iconPath}`}
        alt=""
        className={styles.droneImg}
      />
    </div>
  )
}
