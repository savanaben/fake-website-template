import { cn } from '@/lib/utils'
import { H3 } from './HeadingComponents'
import { IconImage } from './IconImage'

interface WebsiteHeaderBarProps {
  title: string
  fontFamily?: string
  backgroundColor?: string
  titleColor?: string
  iconUrl?: string
  iconAlt?: string
  className?: string
}

export function WebsiteHeaderBar({
  title,
  fontFamily,
  backgroundColor,
  titleColor,
  iconUrl,
  iconAlt,
  className,
}: WebsiteHeaderBarProps) {
  return (
    <div
      className={cn('w-full flex items-center gap-4 px-3 py-2', className)}
      style={{
        backgroundColor: backgroundColor || 'transparent',
      }}
    >
      <IconImage iconUrl={iconUrl} iconAlt={iconAlt || 'Header icon'} />
      <H3
        className="mb-0"
        style={{
          ...(fontFamily && { fontFamily }),
          ...(titleColor && { color: titleColor }),
        }}
      >
        {title}
      </H3>
    </div>
  )
}
