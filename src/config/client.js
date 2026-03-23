// ─────────────────────────────────────────────────────────────────────────────
// CLIENT CONFIG — único arquivo que muda por cliente
//
// INSTRUÇÕES:
//   1. Preencha todos os campos marcados com TODO
//   2. Substitua os valores de exemplo pelos dados reais do cliente
//   3. Depois disso, nenhum componente precisa ser tocado manualmente
// ─────────────────────────────────────────────────────────────────────────────

export const CLIENT = {

  // ─── Identidade ───────────────────────────────────────────────────────────
  // TODO: Nome da marca/empresa
  brandName: 'Nome da Marca',

  // TODO: Como o nome aparece na navbar e no footer (prefix + suffix destacado)
  // Ex: prefix='MRP', suffix='Drone' → exibe "MRP[Drone]" com accent no suffix
  brandNameDisplay: {
    prefix: 'Nome',
    suffix: 'Marca',
  },

  // TODO: Tagline principal (aparece no Hero e em meta tags)
  tagline: 'Sua tagline principal aqui',

  // TODO: Cidade/estado de localização
  location: 'Cidade, Estado',

  // TODO: Área de atuação
  areaServed: 'Sua Região de Atuação',


  // ─── Logo ─────────────────────────────────────────────────────────────────
  // TODO: Coloque o arquivo de logo em public/images/ e ajuste o caminho.
  // Use URL externa (https://...) ou path local ('/images/logo.png').
  // O mesmo logo é usado na Navbar, Hero e Footer.
  logoUrl: '/images/logo.png',
  logoAlt: 'Logo Nome da Marca',


  // ─── Contato ──────────────────────────────────────────────────────────────
  // TODO: E-mail de contato do cliente
  email: 'contato@exemplo.com',

  // TODO: Número WhatsApp no formato internacional sem espaços nem símbolos
  // Ex: '5547991531804' → +55 47 9 9153-1804
  whatsapp: '5500000000000',

  // TODO: Como o número aparece exibido na interface
  whatsappLabel: '+55 00 0 0000-0000',


  // ─── Redes sociais ────────────────────────────────────────────────────────
  // TODO: Preencha os handles e URLs das redes do cliente.
  // O handle do YouTube é usado pela API para buscar os vídeos (inclua o @).
  social: {
    youtube:   { handle: '@seucanal',     url: 'https://youtube.com/@seucanal' },
    instagram: { handle: '@seuinstagram', url: 'https://instagram.com/seuinstagram' },
    tiktok:    { handle: '@seutiktok',    url: 'https://tiktok.com/@seutiktok' },
  },


  // ─── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    // TODO: Texto do badge (pequena etiqueta acima do título)
    badge: 'Sua proposta de valor em poucas palavras',

    // TODO: Título principal — aparece em 2 linhas
    // Ex: titleLine1='As Belezas Escondidas', titleLine2Prefix='de ', titleLine2Accent='Santa Catarina'
    titleLine1: 'Primeira Linha do',
    titleLine2Prefix: '',
    titleLine2Accent: 'Título Principal',

    // TODO: Parágrafo descritivo abaixo do título
    tagline: 'Descrição detalhada da proposta de valor do cliente. Explique o diferencial em 2-3 linhas.',

    // TODO: Estatísticas de credibilidade exibidas na parte inferior do Hero
    stats: [
      { number: '100+', label: 'Projetos Realizados' },
      { number: '4K',   label: 'Qualidade Ultra HD' },
    ],

    // TODO: Caminho do vídeo de fundo (relativo a /public)
    // Coloque o arquivo em public/videos/ e ajuste o nome
    videoPath: 'videos/hero-bg.mp4',

    // TODO: true para exibir o vídeo de fundo, false para usar apenas a cor de fundo
    videoBg: true,
  },


  // ─── Sobre ────────────────────────────────────────────────────────────────
  about: {
    // TODO: Texto do badge da seção Sobre
    tagBadge: 'Sobre a Marca',

    // TODO: Título da seção (palavra normal + palavra em destaque com cor accent)
    title: 'Título da Seção',
    titleAccent: 'Destaque',

    // TODO: Parágrafos descritivos da empresa/profissional (array de strings)
    descriptions: [
      'Primeiro parágrafo sobre a empresa, o profissional ou o serviço.',
      'Segundo parágrafo com mais detalhes sobre a abordagem e diferenciais.',
    ],

    // TODO: Lista de diferenciais/credenciais (exibidos com ícone de check)
    highlights: [
      'Credencial ou diferencial 1',
      'Credencial ou diferencial 2',
      'Credencial ou diferencial 3',
      'Credencial ou diferencial 4',
    ],

    // TODO: Cards de serviços (máximo 4, grid 2x2)
    // featured: true adiciona um ribbon "Destaque" no card
    // Ícones: qualquer classe do Font Awesome (fa-solid fa-xxx)
    cards: [
      {
        icon: 'fa-solid fa-star',
        title: 'Serviço Principal',
        description: 'Descrição do serviço principal. Mostre o valor entregue ao cliente.',
        featured: true,
      },
      {
        icon: 'fa-solid fa-film',
        title: 'Serviço Secundário',
        description: 'Descrição do segundo serviço mais importante.',
        featured: true,
      },
      {
        icon: 'fa-solid fa-camera',
        title: 'Serviço Adicional',
        description: 'Descrição de um serviço adicional oferecido.',
      },
      {
        icon: 'fa-solid fa-map',
        title: 'Serviço Extra',
        description: 'Descrição de mais um serviço ou especialidade.',
      },
    ],
  },


  // ─── Footer ───────────────────────────────────────────────────────────────
  footer: {
    // TODO: Tagline exibida no rodapé abaixo do logo
    tagline: 'Uma frase de impacto que resume o valor da marca para o rodapé.',
  },


  // ─── Serviços (usado no formulário de contato) ────────────────────────────
  // TODO: Opções do select "Tipo de Serviço" no formulário de orçamento.
  // O campo 'value' é enviado no e-mail; o 'label' aparece na UI.
  services: [
    { value: 'service-1', label: 'Serviço 1' },
    { value: 'service-2', label: 'Serviço 2' },
    { value: 'service-3', label: 'Serviço 3' },
    { value: 'other',     label: 'Outro' },
  ],


  // ─── TikTok (vídeos fixos) ────────────────────────────────────────────────
  // TODO: IDs e URLs dos vídeos do TikTok a exibir (máximo 3 recomendado).
  // Para obter o ID: abra o vídeo no TikTok → copie o número no final da URL.
  // Deixe o array vazio [] para ocultar a aba TikTok automaticamente.
  tiktokVideos: [
    { id: 'VIDEO_ID_1', url: 'https://www.tiktok.com/@seutiktok/video/VIDEO_ID_1' },
    { id: 'VIDEO_ID_2', url: 'https://www.tiktok.com/@seutiktok/video/VIDEO_ID_2' },
    { id: 'VIDEO_ID_3', url: 'https://www.tiktok.com/@seutiktok/video/VIDEO_ID_3' },
  ],


  // ─── Seção Últimas Novidades ──────────────────────────────────────────────
  socialFeed: {
    // TODO: true para exibir a seção inteira, false para ocultá-la completamente
    enabled: true,

    // TODO: Controle individual de cada plataforma (só afeta plataformas com dados configurados)
    platforms: {
      youtube:   true,
      instagram: false, // disponível futuramente
      tiktok:    true,
    },
  },


  // ─── Efeito de scroll (ícone animado na lateral direita) ──────────────────
  scrollEffect: {
    // TODO: true para ativar o ícone animado que segue o scroll, false para desativar
    enabled: false,

    // TODO: Caminho da imagem do ícone (relativo a /public), ex: 'images/drone-icon.png'
    // Só relevante se enabled: true
    iconPath: 'images/scroll-icon.png',
  },


  // ─── SEO ──────────────────────────────────────────────────────────────────
  // TODO: URL completa do site em produção (sem barra no final)
  siteUrl: 'https://seudominio.com.br',

  // TODO: Descrição para mecanismos de busca (ideal: 150-160 caracteres)
  seoDescription: 'Descrição do site para mecanismos de busca. Inclua o serviço principal e a localização. Ideal: 150-160 caracteres.',

  // TODO: Palavras-chave relevantes para SEO
  keywords: [
    'palavra-chave 1',
    'palavra-chave 2',
    'palavra-chave 3',
    'nome da marca',
  ],

  // TODO: Código de verificação do Google Search Console — null para ignorar
  // Obtenha em: search.google.com/search-console → Verificar propriedade → Tag HTML
  googleSiteVerification: null,


  // ─── Navegação ────────────────────────────────────────────────────────────
  // TODO: Label do botão CTA na navbar e os links de navegação.
  // Os hrefs apontam para IDs de seção na página (não mude os IDs).
  nav: {
    ctaLabel: 'Solicitar Orçamento',
    links: [
      { href: '#about',     label: 'Sobre' },
      { href: '#portfolio', label: 'Portfólio' },
      { href: '#contact',   label: 'Orçamento' },
      { href: '#social',    label: 'Novidades' },
    ],
  },
}
