'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { zh } from './zh'

// i18n for the Pascal editor.
//
// English source strings are used verbatim as keys (keySeparator / nsSeparator
// disabled), so any UI string we have NOT translated yet falls back to its
// original English automatically. Default language is Chinese; the embedding
// host switches it via `setEditorLanguage(locale)` (the structure-editor facade
// calls it from the host's `cps_lang`). The standalone `apps/editor` keeps the
// Chinese default.
//
// Initialised as an import side effect (see `src/index.tsx`) so the instance is
// ready before any editor component renders. The `isInitialized` guard keeps it
// idempotent under HMR / repeated imports.
if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    lng: 'zh',
    // No `en` resource: when a key is missing in the active language, i18next
    // returns the key itself — which IS the English source string.
    fallbackLng: false,
    resources: { zh: { translation: zh } },
    keySeparator: false,
    nsSeparator: false,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })
}

/**
 * Switch the editor language. Anything starting with `zh` → Chinese; everything
 * else → English (keys returned verbatim). Safe to call before/after mount.
 */
export function setEditorLanguage(locale: string | null | undefined): void {
  const lng = locale?.toLowerCase().startsWith('zh') ? 'zh' : 'en'
  if (i18n.language !== lng) void i18n.changeLanguage(lng)
}

export { i18n as editorI18n }
