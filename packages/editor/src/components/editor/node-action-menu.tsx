'use client'

import { Icon } from '@iconify/react'
import { Copy, Move, Search, Spline, Trash2 } from 'lucide-react'
import type { CSSProperties, MouseEventHandler, PointerEventHandler } from 'react'
import { useTranslation } from 'react-i18next'

type NodeActionMenuProps = {
  onFind?: MouseEventHandler<HTMLButtonElement>
  onAddHole?: MouseEventHandler<HTMLButtonElement>
  onDelete?: MouseEventHandler<HTMLButtonElement>
  onDuplicate?: MouseEventHandler<HTMLButtonElement>
  onMove?: MouseEventHandler<HTMLButtonElement>
  onCurve?: MouseEventHandler<HTMLButtonElement>
  onPointerDown?: PointerEventHandler<HTMLDivElement>
  onPointerUp?: PointerEventHandler<HTMLDivElement>
  onPointerEnter?: PointerEventHandler<HTMLDivElement>
  onPointerLeave?: PointerEventHandler<HTMLDivElement>
}

const actionMenuStyle: CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.97)',
  borderColor: 'rgba(15, 23, 42, 0.14)',
  boxShadow: '0 14px 32px rgba(15, 23, 42, 0.22)',
  color: '#334155',
  opacity: 1,
  filter: 'none',
  isolation: 'isolate',
  mixBlendMode: 'normal',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
}

const actionButtonStyle: CSSProperties = {
  alignItems: 'center',
  appearance: 'none',
  background: 'transparent',
  border: 0,
  boxShadow: 'none',
  color: '#334155',
  display: 'inline-flex',
  height: 28,
  justifyContent: 'center',
  lineHeight: 1,
  margin: 0,
  opacity: 1,
  padding: 0,
  WebkitTextFillColor: '#334155',
  width: 28,
}

const dangerButtonStyle: CSSProperties = {
  ...actionButtonStyle,
  color: '#dc2626',
  WebkitTextFillColor: '#dc2626',
}

const actionIconStyle: CSSProperties = {
  color: 'currentColor',
  opacity: 1,
  pointerEvents: 'none',
}

export function NodeActionMenu({
  onFind,
  onAddHole,
  onDelete,
  onDuplicate,
  onMove,
  onCurve,
  onPointerDown,
  onPointerUp,
  onPointerEnter,
  onPointerLeave,
}: NodeActionMenuProps) {
  const { t } = useTranslation()
  return (
    <div
      className="pointer-events-auto flex items-center gap-1 rounded-lg border p-1"
      onPointerDown={onPointerDown}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerUp={onPointerUp}
      style={actionMenuStyle}
    >
      {onFind && (
        <button
          aria-label={t('Find in catalog')}
          className="tooltip-trigger rounded-md transition-colors hover:!bg-slate-100 hover:!text-slate-950"
          onClick={onFind}
          style={actionButtonStyle}
          title={t('Find in catalog')}
          type="button"
        >
          <Search className="h-4 w-4" style={actionIconStyle} />
        </button>
      )}
      {onMove && (
        <button
          aria-label={t('Move')}
          className="tooltip-trigger rounded-md transition-colors hover:!bg-slate-100 hover:!text-slate-950"
          onClick={onMove}
          style={actionButtonStyle}
          title={t('Move')}
          type="button"
        >
          <Move className="h-4 w-4" style={actionIconStyle} />
        </button>
      )}
      {onCurve && (
        <button
          aria-label={t('Curve')}
          className="tooltip-trigger rounded-md transition-colors hover:!bg-slate-100 hover:!text-slate-950"
          onClick={onCurve}
          style={actionButtonStyle}
          title={t('Curve')}
          type="button"
        >
          <Spline className="h-4 w-4" style={actionIconStyle} />
        </button>
      )}
      {onDuplicate && (
        <button
          aria-label={t('Duplicate')}
          className="tooltip-trigger rounded-md transition-colors hover:!bg-slate-100 hover:!text-slate-950"
          onClick={onDuplicate}
          style={actionButtonStyle}
          title={t('Duplicate')}
          type="button"
        >
          <Copy className="h-4 w-4" style={actionIconStyle} />
        </button>
      )}
      {onAddHole && (
        <button
          aria-label={t('Cut Out')}
          className="tooltip-trigger rounded-md transition-colors hover:!bg-slate-100 hover:!text-slate-950"
          onClick={onAddHole}
          style={actionButtonStyle}
          title={t('Cut Out')}
          type="button"
        >
          <Icon height={16} icon="carbon:cut-out" style={actionIconStyle} width={16} />
        </button>
      )}
      {onDelete && (
        <button
          aria-label={t('Delete')}
          className="tooltip-trigger rounded-md transition-colors hover:!bg-red-50 hover:!text-red-600"
          onClick={onDelete}
          style={dangerButtonStyle}
          title={t('Delete')}
          type="button"
        >
          <Trash2 className="h-4 w-4" style={actionIconStyle} />
        </button>
      )}
    </div>
  )
}
