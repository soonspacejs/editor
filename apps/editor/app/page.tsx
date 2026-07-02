'use client'

import {
  Editor,
  ItemsPanel,
  type SceneGraph,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@pascal-app/editor'
import { Hammer, Layers, Package, Settings } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BuildTab } from '@/components/build-tab'
import {
  CommunityViewerToolbarLeft,
  CommunityViewerToolbarRight,
} from '@/components/viewer-toolbar'

// The open-source editor only ships the built-in catalog (no uploaded items),
// so the Library/Community/Mine source chips and tag filters add nothing —
// drop them and keep the panel to plain categories.
function EditorItemsPanel() {
  return <ItemsPanel showSourceFilter={false} showTagFilters={false} />
}

const SIDEBAR_TABS = [
  {
    id: 'site',
    label: 'Scene',
    component: () => null,
    mobileDefaultSnap: 0.5,
    mobileIcon: <Layers className="h-5 w-5" />,
    icon: (
      <Image
        alt=""
        className="h-8 w-8 object-contain"
        height={32}
        src="/icons/scene.webp"
        width={32}
      />
    ),
  },
  {
    id: 'build',
    label: 'Build',
    component: BuildTab,
    mobileDefaultSnap: 0.5,
    mobileIcon: <Hammer className="h-5 w-5" />,
    icon: (
      <Image
        alt=""
        className="h-8 w-8 object-contain"
        height={32}
        src="/icons/build.webp"
        width={32}
      />
    ),
  },
  {
    id: 'items',
    label: 'Items',
    component: EditorItemsPanel,
    mobileDefaultSnap: 0.5,
    mobileIcon: <Package className="h-5 w-5" />,
    icon: (
      <Image
        alt=""
        className="h-8 w-8 object-contain"
        height={32}
        src="/icons/couch.webp"
        width={32}
      />
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    component: () => null,
    mobileDefaultSnap: 0.5,
    mobileIcon: <Settings className="h-5 w-5" />,
    icon: (
      <Image
        alt=""
        className="h-8 w-8 object-contain"
        height={32}
        src="/icons/settings.webp"
        width={32}
      />
    ),
  },
]

const PROJECT_ID = 'local-editor'
const LOCAL_SCENE_STORAGE_KEY = 'pascal-editor-scene'
const LOCAL_SCENE_META_STORAGE_KEY = 'pascal-editor-scene-meta'

function saveLocalScene(name: string, graph: SceneGraph) {
  localStorage.setItem(LOCAL_SCENE_STORAGE_KEY, JSON.stringify(graph))
  localStorage.setItem(LOCAL_SCENE_META_STORAGE_KEY, JSON.stringify({ name, savedAt: Date.now() }))
}

export default function Home() {
  const { t } = useTranslation()
  const sceneNameRef = useRef(t('Untitled structure'))
  const [saveError, setSaveError] = useState<string | null>(null)
  const sidebarTabs = SIDEBAR_TABS.map((tab) => ({ ...tab, label: t(tab.label) }))

  const handleEditorSave = useCallback(
    async (graph: SceneGraph) => {
      saveLocalScene(sceneNameRef.current.trim() || t('Untitled structure'), graph)
      setSaveError(null)
    },
    [t],
  )

  const handleManualSave = useCallback(
    async (graph: SceneGraph, { name }: { name: string }) => {
      try {
        sceneNameRef.current = name
        saveLocalScene(name, graph)
        setSaveError(null)
      } catch (error) {
        const message = error instanceof Error ? error.message : t('Save failed')
        setSaveError(message)
        throw error instanceof Error ? error : new Error(message)
      }
    },
    [t],
  )

  return (
    <div className="relative h-screen w-screen">
      <Editor
        initialSceneName={sceneNameRef.current}
        layoutVersion="v2"
        onManualSave={handleManualSave}
        onSave={handleEditorSave}
        projectId={PROJECT_ID}
        sceneNameSaveError={saveError}
        showSceneNameSaveBar
        sidebarHeader={
          // Use the editor's own Tooltip primitive (the exact component the rail
          // tabs use) so the "退出" label matches them precisely — white bubble,
          // arrow, fade/zoom/slide animation, side="right". The door icon keeps
          // the rail's grayscale→color hover treatment.
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                aria-label="退出"
                className="group flex h-11 w-11 items-center justify-center rounded-xl text-muted-foreground transition-all duration-200 [&_img]:transition-[opacity,filter] [&_img]:duration-200 hover:bg-accent/50 hover:text-foreground [&_img]:opacity-60 [&_img]:grayscale hover:[&_img]:opacity-100 hover:[&_img]:grayscale-0"
                onClick={() => window.history.back()}
                type="button"
              >
                <Image
                  alt=""
                  className="h-8 w-8 object-contain"
                  height={32}
                  src="/icons/door.webp"
                  width={32}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">退出</TooltipContent>
          </Tooltip>
        }
        sidebarTabs={sidebarTabs}
        viewerToolbarLeft={<CommunityViewerToolbarLeft />}
        viewerToolbarRight={<CommunityViewerToolbarRight />}
      />
    </div>
  )
}
