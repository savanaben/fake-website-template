import { useState, useCallback } from 'react'
import { ComponentType } from '@/types/website'

export function useDragAndDrop(
  onAddComponent: (type: ComponentType, parentId?: string, index?: number, isCrossTab?: boolean) => void
) {
  const [draggedComponentType, setDraggedComponentType] = useState<ComponentType | null>(null)
  const [dragOverParentId, setDragOverParentId] = useState<string | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | undefined>(undefined)

  const handleDragStart = useCallback((type: ComponentType) => {
    setDraggedComponentType(type)
  }, [])

  const handleDragEnd = useCallback(() => {
    setDraggedComponentType(null)
    setDragOverParentId(null)
    setDragOverIndex(undefined)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, parentId?: string, index?: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverParentId(parentId || null)
    setDragOverIndex(index)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent, parentId?: string, index?: number) => {
      e.preventDefault()
      const componentType = e.dataTransfer.getData('componentType') as ComponentType
      const isCrossTab = e.dataTransfer.getData('isCrossTab') === 'true'
      if (componentType || draggedComponentType) {
        // For cross-tab components dropped in canvas, don't pass parentId/index
        // They should be added as cross-tab components
        if (isCrossTab) {
          onAddComponent(componentType || draggedComponentType!, undefined, undefined, true)
        } else {
          onAddComponent(componentType || draggedComponentType!, parentId, index)
        }
      }
      handleDragEnd()
    },
    [draggedComponentType, onAddComponent, handleDragEnd]
  )

  return {
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
    draggedComponentType,
    dragOverParentId,
    dragOverIndex,
  }
}
