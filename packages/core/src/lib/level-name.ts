import i18n from 'i18next'
import type { LevelNode } from '../schema'

// Default (unnamed) level labels are localized through the shared global i18next
// instance the editor initializes (English source string = key, see
// `@pascal-app/editor/src/i18n`). Not hardcoded — switching language re-resolves
// them. Falls back to the English key when i18n hasn't loaded a translation.
export function getDefaultLevelName(level: number): string {
  if (level === 0) return i18n.t('Ground Floor')
  if (level > 0) return i18n.t('Floor {{n}}', { n: level })
  return i18n.t('Basement {{n}}', { n: -level })
}

export function getLevelDisplayName(level: Pick<LevelNode, 'name' | 'level'>): string {
  return level.name || getDefaultLevelName(level.level)
}
