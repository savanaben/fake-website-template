import { cn } from '@/lib/utils'

interface TitleComponentProps {
  title: string
  logoUrl?: string
  logoAlt?: string
  className?: string
}

export function TitleComponent({ title, logoUrl, logoAlt, className }: TitleComponentProps) {
  return (
    <div className={cn('flex items-center h-[50px] gap-4', className)}>
      {logoUrl && (
        <img
          src={logoUrl}
          alt={logoAlt || 'Logo'}
          className="h-full object-contain"
        />
      )}
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  )
}
