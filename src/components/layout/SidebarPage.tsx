import React, { ReactNode } from 'react'

interface SidebarPageProps {
  children?: ReactNode
  isEmpty?: boolean
  onDragOver?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent) => void
  onClick?: (e: React.MouseEvent) => void
  className?: string
}

export function SidebarPage({
  children,
  isEmpty,
  onDragOver,
  onDrop,
  onClick,
  className,
}: SidebarPageProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        minHeight: '100%',
      }}
      onClick={onClick}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {isEmpty ? (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #d1d5db',
            borderRadius: '0.5rem',
            padding: '2rem',
            color: '#9ca3af',
            minHeight: '200px',
          }}
        >
          Drop SidebarColumn or FlexContainer here
        </div>
      ) : (
        children
      )}
    </div>
  )
}
