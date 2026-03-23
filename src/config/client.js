// ─────────────────────────────────────────────────────────────────────────────
// CLIENT CONFIG — único arquivo que muda por cliente
//
// INSTRUÇÕES:
//   1. Preencha todos os campos marcados com TODO
//   2. Substitua os valores de exemplo pelos dados reais do cliente
//   3. Depois disso, nenhum componente precisa ser tocado manualmente
// ─────────────────────────────────────────────────────────────────────────────

export const CLIENT = {

  // ─── Guia do navegador ────────────────────────────────────────────────────
  // TODO: Texto que aparece na aba do navegador
  tab: {
    title:       'Unhas Cris Barros | Manicure em Penha, SC',
    // TODO: Caminho do favicon (relativo a /public). Use um SVG ou PNG em public/.
    faviconPath: '/favicon.svg',
  },


  // ─── Paleta de cores ──────────────────────────────────────────────────────
  // TODO: Ajuste as cores para a identidade visual do cliente.
  // Todas as variáveis CSS do site são derivadas daqui.
  // Ferramenta sugerida: coolors.co
  theme: {
    // Fundos
    bg:             '#CEABBC',
    bgSecondary:    '#9C5779', 
    bgCard:         '#CEABBC',
    bgCardHover:    '#664455',
    surface:        '#1c2130',
    border:         'rgba(80, 100, 140, 0.3)',

    // Cor de destaque (botões, títulos, links ativos)
    accent:         '#9C5779',
    accentHover:    '#4d6d96',
    accentLight:    '#664455',

    // Cor da fonte sobre o bg principal (Portfólio, Footer — Hero usa branco fixo por ter overlay)
    textOnBg:          '#3a1525',
    // Cor da fonte sobre o bgSecondary (Sobre, Contato, Novidades)
    textOnBgSecondary: '#f0f0ee',

    // Cor da navbar ao fazer scroll (recomendado: versão opaca do bg)
    navbarScrolled: '#9C5779',

    // Overlay sobre o vídeo/imagem de fundo do Hero
    // Ajuste a cor e opacidade para combinar com seu bg
    // Ex tema escuro: 'rgba(4,20,41,0.72)' | Ex tema claro: 'rgba(80,20,40,0.45)'
    heroOverlay: 'rgba(80,20,40,0.45)',

  },


  // ─── Identidade ───────────────────────────────────────────────────────────
  // TODO: Nome da marca/empresa
  brandName: 'Unhas Cris Barros',

  // TODO: Como o nome aparece na navbar e no footer (prefix + suffix destacado)
  // Ex: prefix='MRP', suffix='Drone' → exibe "MRP[Drone]" com accent no suffix
  // separator: caractere entre prefix e suffix (' ' = espaço, '' = sem separador, '_', '-', etc.)
  brandNameDisplay: {
    prefix: 'Unhas',
    separator: ' ',
    suffix: 'Cris Barros',
  },

  // TODO: Tagline principal (aparece no Hero e em meta tags)
  tagline: 'Manicure',

  // TODO: Cidade/estado de localização
  location: 'Penha, SC',

  // TODO: Área de atuação
  areaServed: 'Manicure',

  // ─── Endereço (NAP) ───────────────────────────────────────────────────────
  // Fonte única de verdade para Name/Address/Phone.
  // Deve ser IDÊNTICO ao cadastro no Google Business Profile.
  address: {
    street:       'R. Margarida Vieira, 403',
    neighborhood: 'Armação',
    city:         'Penha',
    state:        'SC',
    postalCode:   '88385-000',
    // Exibido no footer e no mapa
    full: 'R. Margarida Vieira, 403 - Armação, Penha - SC, 88385-000',
    // Cidades declaradas no schema como areaServed
    citiesServed: ['Penha', 'Navegantes', 'Itajaí'],
  },


  // ─── Logo ─────────────────────────────────────────────────────────────────
  // TODO: Coloque o arquivo de logo em public/images/ e ajuste o caminho.
  // Use URL externa (https://...) ou path local ('/images/logo.png').
  // O mesmo logo é usado na Navbar, Hero e Footer.
  logoUrl: 'images/logo.jpeg',
  logoAlt: 'Unhas Cris Barros',


  // ─── Contato ──────────────────────────────────────────────────────────────
  // Use enabled: false para ocultar um canal sem apagar os dados.
  contact: {
    email: {
      enabled: false,
      // TODO: E-mail de contato do cliente
      value: 'contato@exemplo.com',
    },
    whatsapp: {
      enabled: true,
      // TODO: Número no formato internacional sem espaços nem símbolos
      // Ex: '5547991531804' → +55 47 9 9153-1804
      number: '554791665478',
      // TODO: Como o número aparece exibido na interface
      label: '+55 47 9166-5478',
    },
    location: {
      enabled: true,
      // TODO: Texto exibido após o traço — descreva o tipo de atendimento
      // Ex: 'Atendimento em domicílio', 'Estúdio próprio', 'Gravações no local'
      areaLabel: 'Studio de Manicure em',
    },
    form: {
      // TODO: true para exibir o formulário de contato, false para desativar
      enabled: false,
      // TODO: Link de redirecionamento quando o formulário está desativado
      // Ex: link do WhatsApp, Google Agenda, Calendly, etc.
      externalUrl: 'https://online.maapp.com.br/unhascrisbarros',
    },
    map: {
      // TODO: true para exibir o mapa do Google Maps, false para ocultar
      enabled: true,
    },

    // TODO: Título e subtítulo da seção de contato
    sectionTitle: 'Agende seu',
    sectionTitleAccent: 'Horário',
    sectionSubtitle: 'Quer unhas impecáveis em Penha, SC? Entre em contato pelo WhatsApp e garanta seu horário. Atendimento personalizado, resultados que duram!',
  },


  // ─── Redes sociais ────────────────────────────────────────────────────────
  // TODO: Preencha os handles e URLs das redes do cliente.
  // O handle do YouTube é usado pela API para buscar os vídeos (inclua o @).
  // Use enabled: false para ocultar uma rede social sem apagar os dados.
  social: {
    youtube:   { enabled: false,  handle: '@seucanal',     url: 'https://youtube.com/@seucanal' },
    instagram: { enabled: true, handle: '@cris_barrosoficial', url: 'https://instagram.com/cris_barrosoficial' },
    tiktok:    { enabled: false,  handle: '@seutiktok',    url: 'https://tiktok.com/@seutiktok' },
  },


  // ─── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    // TODO: Texto do badge (pequena etiqueta acima do título)
    // badgeEnabled: false para ocultar o badge completamente
    badgeEnabled: false,
    badge: 'Sua proposta de valor em poucas palavras',

    // TODO: Título principal — aparece em 2 linhas
    // Ex: titleLine1='As Belezas Escondidas', titleLine2Prefix='de ', titleLine2Accent='Santa Catarina'
    titleLine1: 'Manicure em Penha SC',
    titleLine2Prefix: '',
    titleLine2Accent: 'Unhas Perfeitas, Gel e Spa das Mãos',

    // TODO: Parágrafo descritivo abaixo do título
    tagline: 'Serviços profissionais de manicure em Penha SC. Unhas em gel, esmaltação perfeita e cuidados completos para suas mãos. Agende seu horário e realce sua beleza!',

    // TODO: Estatísticas de credibilidade exibidas na parte inferior do Hero
    // statsEnabled: false para ocultar a seção inteira
    statsEnabled: false,
    stats: [
      { number: '100+', label: 'Projetos Realizados' },
      { number: '4K',   label: 'Qualidade Ultra HD' },
    ],

    // TODO: Caminho do vídeo de fundo (relativo a /public)
    // Coloque o arquivo em public/videos/ e ajuste o nome
    videoPath: 'videos/hero-bg.mp4',

    // TODO: true para exibir o vídeo de fundo, false para usar imagem ou cor de fundo
    videoBg: false,

    // TODO: Caminho da imagem de fundo (relativo a /public). Usado quando videoBg: false.
    // Ex: 'images/hero-bg.jpg'. Deixe null para usar apenas a cor de fundo.
    imageBg: "images/bg-image-teste.png",
  },


  // ─── Sobre ────────────────────────────────────────────────────────────────
  about: {
    // TODO: Texto do badge da seção Sobre
    tagBadge: 'Manicure Profissional em Penha SC',

    // TODO: Título da seção (palavra normal + palavra em destaque com cor accent)
    title: 'Cuidado e precisão em',
    titleAccent: 'cada detalhe',

    // TODO: Parágrafos descritivos da empresa/profissional (array de strings)
    descriptions: [
      'Sou Cris Barros, manicure profissional em Penha, SC, especializada em unhas em gel, esmaltação em gel, spa das mãos e nail art. Com anos de experiência e técnicas modernas, ofereço um atendimento exclusivo focado na saúde e na beleza das suas unhas.',
      'Meu studio é um espaço pensado para você relaxar e sair renovada. Utilizo produtos de alta qualidade, materiais descartáveis e esterilização rigorosa — porque sua segurança e satisfação são a minha prioridade.',
    ],

    // TODO: Lista de diferenciais/credenciais (exibidos com ícone de check)
    highlights: [
      'Especialista em unhas em gel e esmaltação em gel',
      'Nail art personalizada e alongamento de unhas',
      'Spa das mãos com hidratação profunda',
      'Materiais descartáveis e higiene rigorosa',
    ],

    // TODO: Cards de serviços (máximo 4, grid 2x2)
    // featured: true adiciona um ribbon "Destaque" no card
    // Ícones: qualquer classe do Font Awesome (fa-solid fa-xxx)
    cards: [
      {
        icon: 'fa-solid fa-gem',
        title: 'Unhas em Gel',
        description: 'Alongamento e esmaltação em gel com acabamento impecável e durabilidade superior. Ideal para quem busca unhas perfeitas por mais tempo.',
        featured: true,
      },
      {
        icon: 'fa-solid fa-paint-brush',
        title: 'Nail Art',
        description: 'Designs exclusivos e personalizados para expressar seu estilo. Do clássico ao mais criativo, cada detalhe feito com precisão e cuidado.',
        featured: true,
      },
      {
        icon: 'fa-solid fa-hands',
        title: 'Spa das Mãos',
        description: 'Tratamento completo com esfoliação, hidratação profunda e massagem relaxante. Suas mãos macias, nutridas e com aparência rejuvenescida.',
      },
      {
        icon: 'fa-solid fa-scissors',
        title: 'Manicure Tradicional',
        description: 'Cutículas tratadas, unhas modeladas e esmaltação perfeita. O clássico que nunca sai de moda, com o cuidado profissional que você merece.',
      },
    ],
  },


  // ─── Portfólio ────────────────────────────────────────────────────────────
  portfolio: {
    // TODO: Título da seção e badge
    badge: 'Portfólio',
    sectionTitle: 'Últimos Clientes',
    sectionSubtitle: 'Confira os trabalhos de',

    // TODO: Para cada post:
    //   url:     link do post/reel no Instagram (abre ao clicar no card)
    //   image:   caminho da foto em public/ (ex: 'images/portfolio/post1.jpg') — null para ícone placeholder
    //   caption: texto opcional exibido abaixo da foto — null para omitir
    posts: [
      { url: 'https://www.instagram.com/p/DWPCzFLCQth/', image: null, caption: null },
      { url: 'https://www.instagram.com/p/DWPCUjVgK0B/',   image: null, caption: null },
      { url: 'https://www.instagram.com/p/DWPBhg0ADpL/',   image: null, caption: null },
    ],
  },


  // ─── Footer ───────────────────────────────────────────────────────────────
  footer: {
    // TODO: Tagline exibida no rodapé abaixo do logo
    tagline: 'Manicure profissional em Penha, SC. Unhas em gel, nail art e spa das mãos com quem entende de beleza.',
  },


  // ─── Serviços (usado no formulário de contato) ────────────────────────────
  // TODO: Opções do select "Tipo de Serviço" no formulário de orçamento.
  // O campo 'value' é enviado no e-mail; o 'label' aparece na UI.
  services: [
    { value: 'manicure',      label: 'Manicure Tradicional' },
    { value: 'gel',           label: 'Unhas em Gel / Esmaltação em Gel' },
    { value: 'nail-art',      label: 'Nail Art' },
    { value: 'spa-maos',      label: 'Spa das Mãos' },
    { value: 'alongamento',   label: 'Alongamento de Unhas' },
    { value: 'other',         label: 'Outro' },
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
      instagram: true, // disponível futuramente
      tiktok:    false,
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
  seoDescription: 'Manicure profissional em Penha, SC. Unhas em gel, esmaltação em gel, nail art, spa das mãos e alongamento. Agende com Cris Barros e tenha unhas perfeitas!',

  // TODO: Palavras-chave relevantes para SEO
  keywords: [
    'manicure em Penha SC',
    'unhas em gel Penha SC',
    'esmaltação em gel Penha',
    'nail art Penha SC',
    'spa das mãos Penha SC',
    'alongamento de unhas Penha',
    'manicure profissional Santa Catarina',
    'Unhas Cris Barros',
  ],

  // TODO: Código de verificação do Google Search Console — null para ignorar
  // Obtenha em: search.google.com/search-console → Verificar propriedade → Tag HTML
  googleSiteVerification: null,


  // ─── Navegação ────────────────────────────────────────────────────────────
  // TODO: Label do botão CTA na navbar e os links de navegação.
  // Os hrefs apontam para IDs de seção na página (não mude os IDs).
  nav: {
    ctaLabel: 'Agendar Horário',
    links: [
      { href: '#about',     label: 'Sobre' },
      { href: '#portfolio', label: 'Portfólio' },
      { href: '#contact',   label: 'Orçamento' },
      { href: '#social',    label: 'Novidades' },
    ],
  },
}
