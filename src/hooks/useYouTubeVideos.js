import { useState, useEffect } from 'react'
import { CLIENT } from '../config/client'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const CHANNEL_HANDLE = CLIENT.social.youtube.handle.replace('@', '')
const CACHE_KEY = `${CLIENT.social.youtube.handle.replace('@', '')}_yt_cache`
const CACHE_TTL_MS = 1000 * 60 * 30 // 30 minutos

function formatDate(isoString) {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'hoje'
  if (diffDays === 1) return 'há 1 dia'
  if (diffDays < 7) return `há ${diffDays} dias`
  if (diffDays < 14) return 'há 1 semana'
  if (diffDays < 30) return `há ${Math.floor(diffDays / 7)} semanas`
  if (diffDays < 60) return 'há 1 mês'
  return `há ${Math.floor(diffDays / 30)} meses`
}

function formatViews(count) {
  const n = parseInt(count, 10)
  if (isNaN(n)) return '—'
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return String(n)
}

function getCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { timestamp, data } = JSON.parse(raw)
    if (Date.now() - timestamp > CACHE_TTL_MS) return null
    return data
  } catch {
    return null
  }
}

function setCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }))
  } catch {
    // sessionStorage indisponível (ex: modo privado com bloqueio)
  }
}

const FETCH_OPTIONS = { referrerPolicy: 'origin' }

async function fetchYouTubeVideos() {
  // 1. Buscar uploads playlist ID do canal (1 quota unit)
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${CHANNEL_HANDLE}&key=${API_KEY}`,
    FETCH_OPTIONS
  )
  if (!channelRes.ok) throw new Error('Erro ao buscar canal')
  const channelData = await channelRes.json()

  const uploadsPlaylistId =
    channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads
  if (!uploadsPlaylistId) throw new Error('Playlist de uploads não encontrada')

  // 2. Buscar últimos 6 vídeos da playlist (1 quota unit)
  const playlistRes = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=6&key=${API_KEY}`,
    FETCH_OPTIONS
  )
  if (!playlistRes.ok) throw new Error('Erro ao buscar vídeos')
  const playlistData = await playlistRes.json()

  const items = playlistData.items ?? []
  const videoIds = items.map((item) => item.snippet.resourceId.videoId).join(',')

  // 3. Buscar views de cada vídeo (1 quota unit)
  const statsRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`,
    FETCH_OPTIONS
  )
  const statsData = statsRes.ok ? await statsRes.json() : { items: [] }

  const statsMap = Object.fromEntries(
    (statsData.items ?? []).map((v) => [v.id, v.statistics])
  )

  return items.map((item) => {
    const videoId = item.snippet.resourceId.videoId
    const stats = statsMap[videoId] ?? {}
    return {
      id: videoId,
      videoId,
      title: item.snippet.title,
      views: formatViews(stats.viewCount),
      date: formatDate(item.snippet.publishedAt),
    }
  })
}

export function useYouTubeVideos() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!API_KEY) {
      setError('Chave da API não configurada')
      setLoading(false)
      return
    }

    const cached = getCache()
    if (cached) {
      setVideos(cached)
      setLoading(false)
      return
    }

    fetchYouTubeVideos()
      .then((data) => {
        setCache(data)
        setVideos(data)
      })
      .catch((err) => {
        console.error('[YouTube API]', err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [])

  return { videos, loading, error }
}
