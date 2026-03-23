import { useState, useCallback } from 'react'
import styles from './Contact.module.css'
import { CLIENT } from '../../../config/client'

const SERVICE_TYPES = [
  { value: '', label: 'Selecione um serviço...' },
  ...CLIENT.services,
]

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
}

const CONTACT_INFO = [
  ...(CLIENT.contact.email.enabled ? [{
    icon: 'fa-solid fa-envelope',
    label: 'E-mail',
    value: CLIENT.contact.email.value,
    href: `mailto:${CLIENT.contact.email.value}`,
  }] : []),
  ...(CLIENT.contact.whatsapp.enabled ? [{
    icon: 'fa-brands fa-whatsapp',
    label: 'WhatsApp',
    value: CLIENT.contact.whatsapp.label,
    href: `https://wa.me/${CLIENT.contact.whatsapp.number}`,
  }] : []),
  ...(CLIENT.contact.location.enabled ? [{
    icon: 'fa-solid fa-location-dot',
    label: 'Localização',
    value: `${CLIENT.location} — ${CLIENT.contact.location.areaLabel} ${CLIENT.areaServed}`,
    href: null,
  }] : []),
]

function validate(fields) {
  const errors = {}
  if (!fields.name.trim()) errors.name = 'O nome é obrigatório.'
  if (!fields.email.trim()) {
    errors.email = 'O e-mail é obrigatório.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Por favor, insira um e-mail válido.'
  }
  if (fields.phone && !/^[\d\s\+\-\(\)]{7,20}$/.test(fields.phone)) {
    errors.phone = 'Por favor, insira um número de telefone válido.'
  }
  if (!fields.service) errors.service = 'Por favor, selecione um tipo de serviço.'
  if (!fields.message.trim()) {
    errors.message = 'A mensagem é obrigatória.'
  } else if (fields.message.trim().length < 20) {
    errors.message = 'Por favor, forneça mais detalhes (mínimo 20 caracteres).'
  }
  return errors
}

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitState, setSubmitState] = useState('idle') // idle | submitting | success | error

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpa o erro ao editar se o campo foi tocado
    if (touched[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }, [touched])

  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    // Valida ao sair do campo
    const fieldErrors = validate(formData)
    setErrors((prev) => ({
      ...prev,
      ...(fieldErrors[name] ? { [name]: fieldErrors[name] } : {}),
    }))
  }, [formData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const allTouched = Object.keys(INITIAL_FORM).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    setTouched(allTouched)

    const formErrors = validate(formData)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setSubmitState('submitting')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: `Orçamento ${CLIENT.brandName} — ${formData.service}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Não informado',
          service: formData.service,
          message: formData.message,
        }),
      })

      const data = await res.json()
      if (!data.success) throw new Error(data.message)

      setSubmitState('success')
      setFormData(INITIAL_FORM)
      setTouched({})
      setErrors({})
    } catch {
      setSubmitState('error')
    }
  }

  const fieldClass = (name) =>
    `${styles.input} ${errors[name] && touched[name] ? styles.inputError : ''}`

  return (
    <section
      id="contact"
      className={`${styles.contact} section-padding`}
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <header className="section-header">
          <h2 id="contact-heading" className="section-title">
            {CLIENT.contact.sectionTitle} <span className="accent">{CLIENT.contact.sectionTitleAccent}</span>
          </h2>
          <p className="section-subtitle">
            {CLIENT.contact.sectionSubtitle}
          </p>
        </header>

        <div className={`${styles.contactGrid}${!CLIENT.contact.form.enabled ? ` ${styles.contactGridCentered}` : ''}`}>
          {/* Informações de contato */}
          <aside className={styles.contactInfo} aria-label="Informações de contato">
            <div className={styles.infoHeader}>
              <h3 className={styles.infoTitle}>Vamos Conversar</h3>
              <p className={styles.infoSubtitle}>
                Seja uma dúvida rápida ou um briefing completo de produção —
                estamos aqui para ajudar você a criar algo incrível.
              </p>
            </div>

            <ul className={styles.infoList} aria-label="Detalhes de contato">
              {CONTACT_INFO.map((info) => (
                <li key={info.label} className={styles.infoItem}>
                  <div className={styles.infoIcon} aria-hidden="true">
                    <i className={info.icon}></i>
                  </div>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>{info.label}</span>
                    {info.href ? (
                      <a href={info.href} className={styles.infoValue}>
                        {info.value}
                      </a>
                    ) : (
                      <span className={styles.infoValue}>{info.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {[CLIENT.social.youtube, CLIENT.social.instagram, CLIENT.social.tiktok].filter(s => s.enabled).length >= 2 && (
              <div className={styles.socialLinks} aria-label="Links das redes sociais">
                {CLIENT.social.youtube.enabled && (
                  <a href={CLIENT.social.youtube.url} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.socialLink}>
                    <i className="fa-brands fa-youtube" aria-hidden="true"></i>
                  </a>
                )}
                {CLIENT.social.instagram.enabled && (
                  <a href={CLIENT.social.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialLink}>
                    <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                  </a>
                )}
                {CLIENT.social.tiktok.enabled && (
                  <a href={CLIENT.social.tiktok.url} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={styles.socialLink}>
                    <i className="fa-brands fa-tiktok" aria-hidden="true"></i>
                  </a>
                )}
              </div>
            )}
          </aside>

          {/* Formulário de contato */}
          {CLIENT.contact.form.enabled && <div className={styles.formWrapper}>
            {submitState === 'success' ? (
              <div className={styles.successMessage} role="alert">
                <div className={styles.successIcon} aria-hidden="true">
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <h3 className={styles.successTitle}>Mensagem Enviada!</h3>
                <p className={styles.successText}>
                  Obrigado pelo contato. Vamos analisar os detalhes do seu
                  projeto e retornamos em até 24 horas.
                </p>
                <button
                  className={styles.resetBtn}
                  onClick={() => setSubmitState('idle')}
                >
                  Enviar Outra Mensagem
                </button>
              </div>
            ) : (
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Formulário de contato e solicitação de orçamento"
              >
                <div className={styles.formRow}>
                  {/* Nome */}
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-name" className={styles.label}>
                      Nome Completo <span aria-hidden="true" className={styles.required}>*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={fieldClass('name')}
                      placeholder="João Silva"
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!(errors.name && touched.name)}
                      aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                    />
                    {errors.name && touched.name && (
                      <span id="name-error" className={styles.errorMsg} role="alert">
                        <i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i>
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* E-mail */}
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-email" className={styles.label}>
                      Endereço de E-mail <span aria-hidden="true" className={styles.required}>*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={fieldClass('email')}
                      placeholder="joao@exemplo.com"
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={!!(errors.email && touched.email)}
                      aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                    />
                    {errors.email && touched.email && (
                      <span id="email-error" className={styles.errorMsg} role="alert">
                        <i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i>
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.formRow}>
                  {/* Telefone */}
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-phone" className={styles.label}>
                      Número de Telefone
                      <span className={styles.optional}> (opcional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={fieldClass('phone')}
                      placeholder="+55 (11) 9 0000-0000"
                      autoComplete="tel"
                      aria-invalid={!!(errors.phone && touched.phone)}
                      aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && touched.phone && (
                      <span id="phone-error" className={styles.errorMsg} role="alert">
                        <i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i>
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Serviço */}
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-service" className={styles.label}>
                      Tipo de Serviço <span aria-hidden="true" className={styles.required}>*</span>
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${styles.select} ${errors.service && touched.service ? styles.inputError : ''}`}
                      aria-required="true"
                      aria-invalid={!!(errors.service && touched.service)}
                      aria-describedby={errors.service && touched.service ? 'service-error' : undefined}
                    >
                      {SERVICE_TYPES.map(({ value, label }) => (
                        <option key={value} value={value} disabled={value === ''}>
                          {label}
                        </option>
                      ))}
                    </select>
                    {errors.service && touched.service && (
                      <span id="service-error" className={styles.errorMsg} role="alert">
                        <i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i>
                        {errors.service}
                      </span>
                    )}
                  </div>
                </div>

                {/* Mensagem */}
                <div className={styles.formGroup}>
                  <label htmlFor="contact-message" className={styles.label}>
                    Detalhes do Projeto <span aria-hidden="true" className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${styles.textarea} ${errors.message && touched.message ? styles.inputError : ''}`}
                    placeholder="Conte sobre seu projeto — local, data, duração, estilo..."
                    rows={5}
                    aria-required="true"
                    aria-invalid={!!(errors.message && touched.message)}
                    aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
                  />
                  {errors.message && touched.message && (
                    <span id="message-error" className={styles.errorMsg} role="alert">
                      <i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i>
                      {errors.message}
                    </span>
                  )}
                </div>

                {submitState === 'error' && (
                  <div className={styles.submitError} role="alert">
                    <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
                    Algo deu errado. Por favor, tente novamente ou nos envie um e-mail diretamente.
                  </div>
                )}

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={submitState === 'submitting'}
                  aria-busy={submitState === 'submitting'}
                >
                  {submitState === 'submitting' ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true"></span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            )}
          </div>}
        </div>

        {CLIENT.contact.map?.enabled && (
          <div className={styles.mapWrapper}>
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(CLIENT.address.full)}&output=embed&hl=pt-BR`}
              className={styles.mapFrame}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Localização: ${CLIENT.contact.map.address}`}
            />
          </div>
        )}
      </div>
    </section>
  )
}
