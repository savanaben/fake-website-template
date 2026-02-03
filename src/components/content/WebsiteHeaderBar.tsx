import { cn } from '@/lib/utils'
import { H1, H2, H3, H4, H5, H6 } from './HeadingComponents'
import { IconImage } from './IconImage'

interface WebsiteHeaderBarProps {
  title: string
  fontFamily?: string
  backgroundColor?: string
  titleColor?: string
  iconUrl?: string
  iconAlt?: string
  textAlign?: 'left' | 'center'
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
}

export function WebsiteHeaderBar({
  title,
  fontFamily,
  backgroundColor,
  titleColor,
  iconUrl,
  iconAlt,
  textAlign = 'left',
  headingLevel = 'h3',
  className,
}: WebsiteHeaderBarProps) {
  const hasIcon = !!iconUrl
  const isCentered = textAlign === 'center'
  
  const HeadingComponent = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
  }[headingLevel]
  
  return (
    <div
      className={cn(
        'w-full flex items-center py-2',
        isCentered && 'justify-center',
        className
      )}
      style={{
        backgroundColor: backgroundColor || 'transparent',
        paddingLeft: '16px',
        paddingRight: '16px',
        gap: '16px',
      }}
    >
      {hasIcon && <IconImage iconUrl={iconUrl} iconAlt={iconAlt || 'Header icon'} />}
      <HeadingComponent
        className={cn('mb-0', isCentered ? 'text-center' : '')}
        style={{
          ...(fontFamily && { fontFamily }),
          ...(titleColor && { color: titleColor }),
        }}
      >
        {title}
      </HeadingComponent>
    </div>
  )
}
