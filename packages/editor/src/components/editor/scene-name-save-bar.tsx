'use client'

import { Check, Loader2, Save } from 'lucide-react'
import { type CSSProperties, type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { SaveStatus } from '../../hooks/use-auto-save'

interface SceneNameSaveBarProps {
  value: string
  onChange: (value: string) => void
  onSave: (name: string) => Promise<void> | void
  saveStatus?: SaveStatus
  error?: string | null
}

const barStyle: CSSProperties = {
  background: 'rgba(18, 18, 18, 0.94)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 12,
  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.24)',
  color: '#ffffff',
}

const inputStyle: CSSProperties = {
  color: '#ffffff',
  WebkitTextFillColor: '#ffffff',
}

const statusStyle: CSSProperties = {
  color: 'rgba(255, 255, 255, 0.56)',
  WebkitTextFillColor: 'rgba(255, 255, 255, 0.56)',
}

const saveButtonStyle: CSSProperties = {
  alignItems: 'center',
  appearance: 'none',
  background: 'rgba(255, 255, 255, 0.14)',
  border: '1px solid rgba(255, 255, 255, 0.22)',
  borderRadius: 8,
  boxShadow: 'none',
  color: '#ffffff',
  display: 'inline-flex',
  gap: 6,
  height: 30,
  justifyContent: 'center',
  lineHeight: 1,
  minWidth: 74,
  padding: '0 12px',
  WebkitTextFillColor: '#ffffff',
}

const iconStyle: CSSProperties = {
  color: 'currentColor',
  opacity: 1,
}

export function SceneNameSaveBar({
  value,
  onChange,
  onSave,
  saveStatus = 'idle',
  error,
}: SceneNameSaveBarProps) {
  const { t } = useTranslation()
  const [validationError, setValidationError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isSaving = isSubmitting || saveStatus === 'saving'
  const statusText =
    validationError ??
    error ??
    (isSaving
      ? t('Saving...')
      : saveStatus === 'pending'
        ? t('Unsaved changes')
        : saveStatus === 'saved'
          ? t('Saved')
          : null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextName = value.trim()
    if (!nextName) {
      setValidationError(t('Please enter a structure name'))
      return
    }

    setValidationError(null)
    setIsSubmitting(true)
    onChange(nextName)

    try {
      await onSave(nextName)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      className="pointer-events-auto flex h-10 w-[min(520px,calc(100vw-32px))] items-center gap-2 px-2"
      onSubmit={handleSubmit}
      style={barStyle}
    >
      <input
        aria-invalid={Boolean(validationError)}
        aria-label={t('Scene name')}
        className="min-w-0 flex-1 bg-transparent px-2 text-center font-medium text-sm outline-none placeholder:text-white/40"
        onBlur={() => {
          const nextName = value.trim()
          if (nextName && nextName !== value) onChange(nextName)
        }}
        onChange={(event) => {
          if (validationError) setValidationError(null)
          onChange(event.target.value)
        }}
        placeholder={t('Please enter a structure name')}
        style={inputStyle}
        value={value}
      />
      <span className="hidden min-w-24 text-right text-xs sm:block" style={statusStyle}>
        {statusText}
      </span>
      <button
        className="shrink-0 transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSaving}
        style={saveButtonStyle}
        type="submit"
      >
        {isSaving ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" size={14} style={iconStyle} />
        ) : saveStatus === 'saved' && !error && !validationError ? (
          <Check className="h-3.5 w-3.5" size={14} style={iconStyle} />
        ) : (
          <Save className="h-3.5 w-3.5" size={14} style={iconStyle} />
        )}
        <span style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}>{t('Save')}</span>
      </button>
    </form>
  )
}
