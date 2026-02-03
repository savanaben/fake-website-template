import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ColumnProps {
  children: ReactNode
  className?: string
  width?: string
  isEmpty?: boolean
  hasPadding?: boolean
  onDragOver?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent) => void
  onClick?: (e: React.MouseEvent) => void
}

export function Column({ 
  children, 
  className, 
  width,
  isEmpty = false,
  hasPadding = true,
  onDragOver,
  onDrop,
  onClick,
}: ColumnProps) {
  const hasChildren = React.Children.count(children) > 0
  
  // Parse flex value from width prop (e.g., "flex-[1]" or "flex-[2]")
  let flexStyle: React.CSSProperties | undefined = undefined
  let widthClass: string | undefined = undefined
  
  // Check if width is a flex-[value] format from distribution
  const flexMatch = width?.match(/flex-\[(\d+)\]/)
  if (flexMatch) {
    const flexGrow = parseInt(flexMatch[1], 10)
    if (!isNaN(flexGrow) && flexGrow > 0) {
      // Use inline style with explicit flex properties
      // Using the shorthand 'flex' property for better browser compatibility
      flexStyle = { 
        flex: `${flexGrow} 1 0%`,
        minWidth: 0, // Ensure flex works properly
      }
      // Explicitly don't use any flex class when we have distribution
      widthClass = undefined
    } else {
      // Invalid flex value, fall back to default
      widthClass = width || 'flex-1'
    }
  } else {
    // No distribution format, use width prop or default
    widthClass = width || 'flex-1'
  }
  
  return (
    <div 
      className={cn(
        'min-h-[30px] max-w-[900px]',
        hasPadding && 'p-6',
        widthClass,
        (!hasChildren || isEmpty) && 'border-2 border-dashed border-gray-300 rounded-lg',
        className
      )}
      style={flexStyle}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
    >
      {!hasChildren ? (
        <div className="w-full text-center text-gray-400 text-sm py-8">
          Drop content here
        </div>
      ) : (
        children
      )}
    </div>
  )
}
