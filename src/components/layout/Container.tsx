import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto max-w-[1440px] bg-white', className)} style={{ fontFamily: 'Calibri, sans-serif' }}>
      {children}
    </div>
  )
}
