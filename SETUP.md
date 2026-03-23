# Template Site — Guia de Setup

Landing page modular com React + Vite. Toda customização por cliente é feita em **3 arquivos** — nenhum componente precisa ser tocado.

---

## Checklist rápido de personalização

### 1. `src/config/client.js` — dados do cliente

Preencha **todos os campos marcados com `TODO`**. Este é o único arquivo que muda por cliente:

| Campo | O que é |
|-------|---------|
| `brandName` | Nome da marca |
| `brandNameDisplay` | Como o nome aparece na navbar (prefix + suffix com accent) |
| `tagline` | Tagline principal |
| `location` / `areaServed` | Localização e área de atendimento |
| `logoUrl` | Caminho do logo (local ou URL externa) |
| `email` / `whatsapp` | Contato do cliente |
| `social.*` | Handles e URLs das redes sociais |
| `hero.*` | Textos, título, estatísticas e vídeo do Hero |
| `about.*` | Textos, descrições, highlights e cards de serviços |
| `footer.*` | Tagline do rodapé e crédito do desenvolvedor |
| `services` | Opções do formulário de orçamento |
| `tiktokVideos` | IDs dos vídeos fixos do TikTok (deixe `[]` para ocultar) |
| `scrollEffect` | Ativar/desativar o efeito de scroll e qual ícone usar |
| `nav.*` | Label do CTA e links da navbar |
| `siteUrl` / `seoDescription` / `keywords` | SEO |
| `googleSiteVerification` | Verificação do Google Search Console |

---

### 2. `index.html` — meta tags SEO

Preencha os campos marcados com `TODO`. Eles **não** são gerados automaticamente — precisam ser preenchidos manualmente para garantir controle total do SEO:

- `<title>` — título da aba
- Meta `description` e `keywords`
- Open Graph (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card
- `<link rel="canonical">`
- JSON-LD (dados estruturados para o Google)
- Google Site Verification (descomente a linha e cole o código)

---

### 3. `src/App.css` — paleta de cores

Altere apenas o bloco `:root` no topo do arquivo. Todas as cores do site usam variáveis CSS (`var(--color-*)`), então mudando as variáveis o visual muda inteiro:

| Variável | Uso |
|----------|-----|
| `--color-bg` | Fundo principal da página |
| `--color-bg-secondary` | Fundo de seções alternadas |
| `--color-accent` | Botões, links ativos, destaques |
| `--color-accent-light` | Textos em destaque |
| `--color-text-primary` | Texto principal |

---

## Arquivos de mídia

Coloque os assets em `public/`:

| Arquivo | Onde usar |
|---------|-----------|
| `public/images/logo.png` | Logo da marca (navbar, hero, footer) |
| `public/images/og-image.jpg` | Imagem de compartilhamento nas redes (1200×630px) |
| `public/videos/hero-bg.mp4` | Vídeo de fundo da seção Hero |
| `public/images/scroll-icon.png` | Ícone do efeito de scroll (se `scrollEffect.enabled: true`) |

---

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```bash
cp .env.example .env.local
```

| Variável | Como obter |
|----------|-----------|
| `VITE_YOUTUBE_API_KEY` | [console.cloud.google.com](https://console.cloud.google.com) → APIs & Services → Credentials → Create API Key → Habilite "YouTube Data API v3" |
| `VITE_WEB3FORMS_KEY` | [web3forms.com](https://web3forms.com) → Create Access Key → informe o e-mail do cliente |

---

## Rodando o projeto

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # produção → pasta dist/
npm run preview  # testar build localmente
```

---

## Deploy

### GitHub Pages

1. Ajuste o `base` em `vite.config.js`:
   ```js
   base: '/nome-do-repositorio/'
   ```
2. Faça build e publique a pasta `dist/` no branch `gh-pages`.

### Domínio próprio (Netlify, Vercel, etc.)

1. Mantenha `base: '/'` em `vite.config.js`.
2. Configure as variáveis de ambiente no painel da plataforma.

---

## Pendências comuns por cliente

| Item | Status | Observação |
|------|--------|------------|
| Logo e vídeo | ⏳ Pendente | Aguardar assets do cliente |
| YouTube API Key | ⏳ Pendente | Criar no Google Cloud Console |
| Web3Forms Key | ⏳ Pendente | Criar conta em web3forms.com |
| TikTok vídeos | ⏳ Pendente | Pegar IDs dos vídeos a exibir |
| Instagram API | ⏳ Pendente | Aguarda aprovação do app no Meta |
| Google Search Console | ⏳ Pendente | Fazer após deploy com domínio |
| Portfólio | ⏳ Pendente | Aguardar conteúdo do cliente |
