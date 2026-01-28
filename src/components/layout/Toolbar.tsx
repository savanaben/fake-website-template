import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ToolbarProps {
  children?: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

export function Toolbar({ children, variant = 'primary', className }: ToolbarProps) {
  return (
    <div
      className={cn(
        'h-[60px] w-full sticky top-0 z-20',
        className
      )}
      style={{
        backgroundColor: variant === 'primary' ? 'rgb(235, 235, 235)' : 'rgb(228, 228, 228)',
        ...(variant === 'primary' ? {
          borderBottom: '1px solid rgb(199, 199, 199)',
        } : {}),
      }}
    >
      {children}
    </div>
  )
}
