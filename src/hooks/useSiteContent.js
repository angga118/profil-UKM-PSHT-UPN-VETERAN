import { useState } from 'react'
import { editableContentDefaults } from '../data/siteData'

const storageKey = 'psht-site-content'

function getInitialContent() {
  try {
    const storedContent = window.localStorage.getItem(storageKey)
    if (!storedContent) return editableContentDefaults

    const parsedContent = JSON.parse(storedContent)
    if (!parsedContent?.hero || !parsedContent?.welcome || !parsedContent?.profile || !parsedContent?.history || !parsedContent?.training || !Array.isArray(parsedContent?.profileCards) || !Array.isArray(parsedContent?.leaders) || !Array.isArray(parsedContent?.achievements) || !Array.isArray(parsedContent?.gallery) || !parsedContent.gallery.length) {
      return editableContentDefaults
    }

    return parsedContent
  } catch {
    return editableContentDefaults
  }
}

export function useSiteContent() {
  const [content, setContent] = useState(getInitialContent)

  const saveContent = (nextContent) => {
    window.localStorage.setItem(storageKey, JSON.stringify(nextContent))
    setContent(nextContent)
  }

  const resetContent = () => {
    window.localStorage.removeItem(storageKey)
    setContent(editableContentDefaults)
    return editableContentDefaults
  }

  return { content, saveContent, resetContent }
}
