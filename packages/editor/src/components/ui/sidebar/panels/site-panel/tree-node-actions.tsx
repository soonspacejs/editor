import { type AnyNodeId, useScene } from '@pascal-app/core'
import { useViewer } from '@pascal-app/viewer'
import { Eye, EyeOff } from 'lucide-react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

interface TreeNodeActionsProps {
  nodeId: AnyNodeId
}

export const TreeNodeActions = memo(function TreeNodeActions({ nodeId }: TreeNodeActionsProps) {
  const { t } = useTranslation()
  const updateNode = useScene((state) => state.updateNode)
  const updateNodes = useScene((state) => state.updateNodes)
  const isVisible = useScene((s) => s.nodes[nodeId]?.visible !== false)

  const toggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newVisibility = !isVisible
    const selectedIds = useViewer.getState().selection.selectedIds
    if (selectedIds?.includes(nodeId)) {
      updateNodes(
        selectedIds.map((id) => ({
          id: id as AnyNodeId,
          data: { visible: newVisibility },
        })),
      )
    } else {
      updateNode(nodeId, { visible: newVisibility })
    }
  }

  return (
    <div className="flex items-center gap-0.5">
      <button
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
        onClick={toggleVisibility}
        title={isVisible ? t('Hide') : t('Show')}
      >
        {isVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3 opacity-50" />}
      </button>
    </div>
  )
})
