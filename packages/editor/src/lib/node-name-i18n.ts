import i18n from 'i18next'

// Auto-generated node names (e.g. "Wall 2", "Room 1 Slab", "Slab (12.3m²)") are
// stored verbatim in `node.name` as English data — the app even PARSES some of
// them (space-detection derives the next "Room N" index by regex). So we do NOT
// translate the stored value; instead we localize it at DISPLAY time here,
// keeping the canonical English in the scene graph (parsers stay happy) while
// the tree / inspector show Chinese. Translation comes from the shared i18n
// dictionary (kind word = key, e.g. Wall=墙) — nothing is hardcoded, and it
// follows the active language.
//
// Custom names the user typed (anything not matching a known auto-name shape)
// pass through untouched.

// English kind words that appear at the head of auto-generated names. Each is a
// dictionary key already (Wall=墙, Slab=楼板, …); multi-word kinds included so
// "Box Vent 3" etc. localize too. Unknown words fall back to English via t().
const AUTO_NAME_KINDS = new Set<string>([
  'Wall', 'Fence', 'Slab', 'Ceiling', 'Roof', 'Roof Segment', 'Stair', 'Stairs',
  'Stair Segment', 'Elevator', 'Door', 'Window', 'Column', 'Shelf', 'Room',
  'Material', 'Zone', 'Level', 'Floor', 'Group', 'Item', 'Skylight', 'Dormer',
  'Chimney', 'Cupola', 'Gutter', 'Downspout', 'Solar Panel', 'Spawn Point',
  'Box Vent', 'Ridge Vent', 'Turbine Vent', 'Eyebrow Vent', 'HVAC Unit', 'Duct',
  'Register', 'Lineset', 'Liquid Line', 'DWV Pipe', 'Trap',
])

/**
 * Localize a node's display name. Recognizes the editor's auto-name shapes and
 * translates the kind word(s) via i18n, preserving numbers / area suffixes.
 * Returns custom or unrecognized names unchanged.
 */
export function localizeNodeName(name: string | null | undefined): string {
  if (!name) return ''

  // "Room 1 Slab" / "Room 3 Ceiling"
  let m = /^Room (\d+) (Slab|Ceiling)$/.exec(name)
  if (m) return `${i18n.t('Room')} ${m[1]} ${i18n.t(m[2]!)}`

  // "<Kind> 7"  (Wall 2, Door 3, Box Vent 1, Room 4, Material 2, …)
  m = /^(.+) (\d+)$/.exec(name)
  if (m && AUTO_NAME_KINDS.has(m[1]!)) return `${i18n.t(m[1]!)} ${m[2]}`

  // "Slab (12.3m²)" — area-suffixed fallback name
  m = /^(.+) (\(.+\))$/.exec(name)
  if (m && AUTO_NAME_KINDS.has(m[1]!)) return `${i18n.t(m[1]!)} ${m[2]}`

  // Bare kind label ("Wall", "Door", …) — the unnamed-node fallback.
  if (AUTO_NAME_KINDS.has(name)) return i18n.t(name)

  return name
}
