import React from 'react'
import { ComponentType } from '@/types/website'
import { Button } from '@/components/ui/button'

interface ComponentPaletteProps {
  onAddComponent: (type: ComponentType, isCrossTab?: boolean) => void
  onDragStart?: (type: ComponentType) => void
  onDragEnd?: () => void
}

const componentTypes: Array<{ type: ComponentType; label: string; category: string; isCrossTab?: boolean }> = [
  { type: 'flexContainer', label: 'Flex Container', category: 'Layout' },
  { type: 'column', label: 'Column', category: 'Layout' },
  { type: 'title', label: 'Title', category: 'Content' },
  { type: 'paragraph', label: 'Paragraph', category: 'Content' },
  { type: 'image', label: 'Image', category: 'Content' },
  { type: 'bannerImage', label: 'Banner Image', category: 'Content' },
  { type: 'websiteHeaderBar', label: 'Website Header Bar', category: 'Content' },
  { type: 'websiteHeaderBar', label: 'Website Header Bar', category: 'Website Specific Components', isCrossTab: true },
  { type: 'fakeURLBar', label: 'Fake URL Bar', category: 'Website Specific Components' },
]

export function ComponentPalette({ onAddComponent, onDragStart, onDragEnd }: ComponentPaletteProps) {
  const layoutComponents = componentTypes.filter((c) => c.category === 'Layout')
  const contentComponents = componentTypes.filter((c) => c.category === 'Content')
  const websiteSpecificComponents = componentTypes.filter((c) => c.category === 'Website Specific Components')

  const handleDragStart = (e: React.DragEvent, type: ComponentType, isCrossTab?: boolean) => {
    e.dataTransfer.setData('componentType', type)
    if (isCrossTab) {
      e.dataTransfer.setData('isCrossTab', 'true')
    }
    e.dataTransfer.effectAllowed = 'move'
    onDragStart?.(type)
  }

  const handleDragEnd = () => {
    onDragEnd?.()
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Components</h3>
      
      <div className="space-y-3">
        {websiteSpecificComponents.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Website Specific Components</h4>
            <div className="space-y-2">
              {websiteSpecificComponents.map((comp, index) => (
                <Button
                  key={`${comp.type}-${comp.category}-${index}`}
                  variant="outline"
                  className="w-full justify-start cursor-move"
                  onClick={() => onAddComponent(comp.type, comp.isCrossTab)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, comp.type, comp.isCrossTab)}
                  onDragEnd={handleDragEnd}
                >
                  {comp.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Layout</h4>
          <div className="space-y-2">
            {layoutComponents.map((comp, index) => (
              <Button
                key={`${comp.type}-${comp.category}-${index}`}
                variant="outline"
                className="w-full justify-start cursor-move"
                onClick={() => onAddComponent(comp.type, comp.isCrossTab)}
                draggable
                onDragStart={(e) => handleDragStart(e, comp.type, comp.isCrossTab)}
                onDragEnd={handleDragEnd}
              >
                {comp.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Content</h4>
          <div className="space-y-2">
            {contentComponents.map((comp, index) => (
              <Button
                key={`${comp.type}-${comp.category}-${index}`}
                variant="outline"
                className="w-full justify-start cursor-move"
                onClick={() => onAddComponent(comp.type, comp.isCrossTab)}
                draggable
                onDragStart={(e) => handleDragStart(e, comp.type, comp.isCrossTab)}
                onDragEnd={handleDragEnd}
              >
                {comp.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
