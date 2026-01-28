import React from 'react'
import { ComponentType } from '@/types/website'
import { ComponentPalette } from './ComponentPalette'
import { TemplateSelector } from './TemplateSelector'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ChevronRight, ChevronLeft } from 'lucide-react'

interface BuilderSidebarProps {
  onAddComponent: (type: ComponentType, isCrossTab?: boolean) => void
  onLoadTemplate: (template: any) => void
  onResetToCustom: () => void
  isTemplateMode: boolean
  tabs: Array<{ id: string; label: string; enabled?: boolean; position?: number }>
  activeTabId: string
  onTabChange: (tabId: string) => void
  onAddTab: (label: string) => void
  onRemoveTab: (tabId: string) => void
  onOpenTabSettings: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export function BuilderSidebar({
  onAddComponent,
  onLoadTemplate,
  onResetToCustom,
  isTemplateMode,
  tabs,
  activeTabId,
  onTabChange,
  onAddTab,
  onRemoveTab,
  onOpenTabSettings,
  isCollapsed = false,
  onToggleCollapse,
}: BuilderSidebarProps) {
  const [newTabLabel, setNewTabLabel] = React.useState('')

  if (isCollapsed) {
    return (
      <div className="w-12 border-r border-gray-200 bg-gray-50 flex flex-col h-full items-center">
        <div className="p-2 border-b border-gray-200 w-full flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-64 border-r border-gray-200 bg-gray-50 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex-shrink-0 bg-gray-50 z-10 flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-bold">Website Builder</h2>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
        <div className="p-4 space-y-6">
          {/* Tabs Management */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Tabs</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenTabSettings}
              >
                Tab Settings
              </Button>
            </div>
            <div className="space-y-1">
              {[...tabs].sort((a, b) => (a.position || 0) - (b.position || 0)).map((tab) => {
                const isEnabled = tab.enabled !== false // Default to true if not set
                
                return (
                  <div
                    key={tab.id}
                    className={`flex items-center justify-between p-2 rounded ${
                      !isEnabled 
                        ? 'opacity-50 bg-gray-200' 
                        : activeTabId === tab.id 
                          ? '' 
                          : 'hover:bg-gray-100'
                    }`}
                    style={activeTabId === tab.id && isEnabled ? {
                      backgroundColor: 'rgba(36, 120, 204, 0.1)',
                    } : undefined}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!isEnabled) return // Don't allow interaction with disabled tabs
                        // Regular click to switch tab
                        onTabChange(tab.id)
                      }}
                      disabled={!isEnabled}
                      className={cn(
                        "flex-1 text-left text-sm",
                        !isEnabled && "cursor-not-allowed"
                      )}
                    >
                      {tab.label}
                    </button>
                  {tabs.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onRemoveTab(tab.id)
                      }}
                    >
                      ×
                    </Button>
                  )}
                  </div>
                )
              })}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTabLabel}
                onChange={(e) => setNewTabLabel(e.target.value)}
                placeholder="New tab name"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newTabLabel.trim()) {
                    onAddTab(newTabLabel.trim())
                    setNewTabLabel('')
                  }
                }}
              />
              <Button
                size="sm"
                onClick={() => {
                  if (newTabLabel.trim()) {
                    onAddTab(newTabLabel.trim())
                    setNewTabLabel('')
                  }
                }}
              >
                Add
              </Button>
            </div>
          </div>

          <TemplateSelector
            onLoadTemplate={onLoadTemplate}
            onResetToCustom={onResetToCustom}
            isTemplateMode={isTemplateMode}
          />

          <ComponentPalette 
            onAddComponent={onAddComponent}
            onDragStart={() => {}}
            onDragEnd={() => {}}
          />
        </div>
      </div>
    </div>
  )
}
