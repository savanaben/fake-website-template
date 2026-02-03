import { cn } from '@/lib/utils'

interface HeadingProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function H1({ children, className, style }: HeadingProps) {
  return (
    <h1 className={cn('text-4xl font-bold mb-4', className)} style={{ lineHeight: 1.1, ...style }}>
      {children}
    </h1>
  )
}

export function H2({ children, className, style }: HeadingProps) {
  return (
    <h2 className={cn('text-3xl font-bold mb-3', className)} style={{ lineHeight: 1.1, ...style }}>
      {children}
    </h2>
  )
}

export function H3({ children, className, style }: HeadingProps) {
  return (
    <h3 className={cn('text-2xl font-semibold mb-2', className)} style={{ lineHeight: 1.1, ...style }}>
      {children}
    </h3>
  )
}

export function H4({ children, className, style }: HeadingProps) {
  return (
    <h4 className={cn('text-xl font-semibold mb-2', className)} style={{ lineHeight: 1.1, ...style }}>
      {children}
    </h4>
  )
}

export function H5({ children, className, style }: HeadingProps) {
  return (
    <h5 className={cn('text-lg font-medium mb-2', className)} style={{ lineHeight: 1.1, ...style }}>
      {children}
    </h5>
  )
}

export function H6({ children, className, style }: HeadingProps) {
  return (
    <h6 className={cn('text-base font-medium mb-2', className)} style={{ lineHeight: 1.1, ...style }}>
      {children}
    </h6>
  )
}
