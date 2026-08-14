import { useEffect, useState } from 'react'
import { editableContentDefaults } from '../data/siteData'

const storageKey = 'psht-site-content'

function normalizeText(value, fallback) {
  if (typeof value !== 'string') return fallback
  return value.trim() === '' ? fallback : value
}

function normalizeObjectSection(baseSection, candidate) {
  if (!candidate || typeof candidate !== 'object') return baseSection

  const merged = { ...baseSection }
  for (const [key, value] of Object.entries(candidate)) {
    if (value === null || value === undefined) continue

    if (typeof value === 'string') {
      merged[key] = normalizeText(value, baseSection[key])
      continue
    }

    if (Array.isArray(value)) {
      merged[key] = value.length > 0 ? value : baseSection[key]
      continue
    }

    if (typeof value === 'object') {
      merged[key] = normalizeObjectSection(baseSection[key] ?? {}, value)
    }
  }

  return merged
}

function normalizeContent(value) {
  const base = editableContentDefaults
  if (!value || typeof value !== 'object') return base

  const arrayOrDefault = (candidate, fallback) => (Array.isArray(candidate) && candidate.length > 0 ? candidate : fallback)

  return {
    ...base,
    hero: normalizeObjectSection(base.hero, value.hero ?? {}),
    welcome: normalizeObjectSection(base.welcome, value.welcome ?? {}),
    profile: normalizeObjectSection(base.profile, value.profile ?? {}),
    history: normalizeObjectSection(base.history, value.history ?? {}),
    training: normalizeObjectSection(base.training, value.training ?? {}),
    profileCards: arrayOrDefault(value.profileCards, base.profileCards),
    leaders: arrayOrDefault(value.leaders, base.leaders),
    achievements: arrayOrDefault(value.achievements, base.achievements),
    gallery: arrayOrDefault(value.gallery, base.gallery),
  }
}

function getInitialContent() {
  try {
    const storedContent = window.localStorage.getItem(storageKey)
    if (!storedContent) return editableContentDefaults

    const parsedContent = JSON.parse(storedContent)
    return normalizeContent(parsedContent)
  } catch {
    return editableContentDefaults
  }
}

export function useSiteContent() {
  const [content, setContent] = useState(getInitialContent)

  useEffect(() => {
    let isActive = true

    fetch('/api/content.php', { credentials: 'same-origin' })
      .then(async (response) => {
        if (!response.ok) throw new Error('Gagal mengambil konten dari server.')
        const data = await response.json().catch(() => ({}))
        if (!isActive) return

        const nextContent = normalizeContent(data)
        window.localStorage.setItem(storageKey, JSON.stringify(nextContent))
        setContent(nextContent)
      })
      .catch(() => {
        if (isActive) setContent(getInitialContent())
      })

    return () => {
      isActive = false
    }
  }, [])

  const saveContent = (nextContent) => {
    const normalized = normalizeContent(nextContent)
    window.localStorage.setItem(storageKey, JSON.stringify(normalized))
    setContent(normalized)

    fetch('/api/content.php', {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(normalized),
    }).catch(() => {
      // Biarkan konten tetap tersimpan di browser saat server tidak tersedia.
    })
  }

  const resetContent = () => {
    const defaults = normalizeContent(editableContentDefaults)
    window.localStorage.removeItem(storageKey)
    setContent(defaults)

    fetch('/api/content.php', {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(defaults),
    }).catch(() => {
      // Kembali ke konten awal tetap aman meski server gagal merespons.
    })

    return defaults
  }

  return { content, saveContent, resetContent }
}
