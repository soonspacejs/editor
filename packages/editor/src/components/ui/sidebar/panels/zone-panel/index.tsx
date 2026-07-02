import {
  type AnyNodeId,
  emitter,
  useScene,
  type ZoneNode,
} from '@pascal-app/core'
import { useViewer } from '@pascal-app/viewer'
import { Hexagon, Save, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { sfxEmitter } from './../../../../../lib/sfx-bus'
import { collectZoneContentIds } from './../../../../../lib/zone-content'
import { ColorDot } from './../../../../../components/ui/primitives/color-dot'
import { cn } from './../../../../../lib/utils'
import useEditor from './../../../../../store/use-editor'
import { ActionButton } from '../../../controls/action-button'
import { PanelSection } from '../../../controls/panel-section'

function ZoneItem({ zone }: { zone: ZoneNode }) {
  const deleteNode = useScene((state) => state.deleteNode)
  const updateNode = useScene((state) => state.updateNode)
  const selectedZoneId = useViewer((state) => state.selection.zoneId)
  const setSelection = useViewer((state) => state.setSelection)

  const isSelected = selectedZoneId === zone.id

  const handleClick = () => {
    setSelection({ zoneId: zone.id })
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    sfxEmitter.emit('sfx:structure-delete')
    deleteNode(zone.id)
    if (isSelected) {
      setSelection({ zoneId: null })
    }
  }

  const handleColorChange = (color: string) => {
    updateNode(zone.id, { color })
  }

  return (
    <div
      className={cn(
        'group/row mx-1 mb-0.5 flex h-8 cursor-pointer select-none items-center rounded-lg border px-2 text-sm transition-all duration-200',
        isSelected
          ? 'border-neutral-200/60 bg-white text-foreground shadow-elevation-0 ring-1 ring-white/50 ring-inset dark:border-border/50 dark:bg-accent/50 dark:ring-white/10'
          : 'border-transparent text-muted-foreground hover:border-neutral-200/50 hover:bg-white/40 hover:text-foreground dark:hover:border-border/40 dark:hover:bg-accent/30',
      )}
      onClick={handleClick}
    >
      <span className="mr-2">
        <ColorDot color={zone.color} onChange={handleColorChange} />
      </span>
      <Hexagon className="mr-1.5 h-3.5 w-3.5 shrink-0" />
      <span className="flex-1 truncate">{zone.name}</span>
      <button
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-muted-foreground opacity-0 transition-colors hover:bg-black/5 hover:text-foreground group-hover/row:opacity-100 dark:hover:bg-white/10"
        onClick={handleDelete}
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </div>
  )
}

export function ZonePanel() {
  const { t } = useTranslation()
  const nodes = useScene((state) => state.nodes)
  const currentLevelId = useViewer((state) => state.selection.levelId)
  const selectedZoneId = useViewer((state) => state.selection.zoneId)
  const setSelection = useViewer((state) => state.setSelection)
  const setPhase = useEditor((state) => state.setPhase)
  const setMode = useEditor((state) => state.setMode)
  const setTool = useEditor((state) => state.setTool)

  // Filter nodes to get zones for the current level
  const levelZones = Object.values(nodes).filter(
    (node): node is ZoneNode => node.type === 'zone' && node.parentId === currentLevelId,
  )
  const selectedZone = levelZones.find((zone) => zone.id === selectedZoneId)

  const handleAddZone = () => {
    if (currentLevelId) {
      setPhase('structure')
      setMode('build')
      setTool('zone')
    }
  }

  const deleteSelectedZone = (withContent: boolean) => {
    if (!selectedZone) return
    const scene = useScene.getState()
    const ids = withContent
      ? [selectedZone.id as AnyNodeId, ...collectZoneContentIds(scene.nodes, selectedZone)]
      : [selectedZone.id as AnyNodeId]
    sfxEmitter.emit('sfx:structure-delete')
    scene.deleteNodes(Array.from(new Set(ids)))
    setSelection({ selectedIds: [], zoneId: null })
  }

  if (!currentLevelId) {
    return (
      <div className="px-3 py-4 text-muted-foreground text-sm">
        {t('Select a level to view and create zones')}
      </div>
    )
  }

  return (
    <div className="py-1">
      {levelZones.length === 0 ? (
        <div className="px-3 py-4 text-muted-foreground text-sm">
          {t('No zones on this level.')}{' '}
          <button className="cursor-pointer text-primary hover:underline" onClick={handleAddZone}>
            {t('Add one')}
          </button>
        </div>
      ) : (
        levelZones.map((zone) => <ZoneItem key={zone.id} zone={zone} />)
      )}
      {selectedZone ? (
        <PanelSection className="mt-2 border-t" title={t('Actions')}>
          <ActionButton
            className="w-full flex-none"
            icon={<Save className="h-4 w-4" />}
            label={t('Save to catalog')}
            onClick={() => emitter.emit('room-preset:create', { zoneId: selectedZone.id })}
            type="button"
          />
          <ActionButton
            className="w-full flex-none"
            icon={<Trash2 className="h-4 w-4 text-red-400" />}
            label={t('Delete')}
            onClick={() => deleteSelectedZone(false)}
            type="button"
          />
          <ActionButton
            className="w-full flex-none"
            icon={<Trash2 className="h-4 w-4 text-red-400" />}
            label={t('Delete with contents')}
            onClick={() => deleteSelectedZone(true)}
            type="button"
          />
        </PanelSection>
      ) : null}
    </div>
  )
}
