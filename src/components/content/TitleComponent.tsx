import { cn } from '@/lib/utils'
import { H1, H2, H3, H4, H5, H6 } from './HeadingComponents'

interface TitleComponentProps {
  title: string
  logoUrl?: string
  logoAlt?: string
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  titleColor?: string
  fontFamily?: string
  className?: string
}

export function TitleComponent({ title, logoUrl, logoAlt, headingLevel = 'h1', titleColor, fontFamily, className }: TitleComponentProps) {
  const HeadingComponent = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
  }[headingLevel]

  const headingStyle = {
    ...(titleColor && { color: titleColor }),
    ...(fontFamily && { fontFamily }),
  }

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {logoUrl && (
        <img
          src={logoUrl}
          alt={logoAlt || 'Logo'}
          className="h-[50px] object-contain"
        />
      )}
      <HeadingComponent style={headingStyle}>{title}</HeadingComponent>
    </div>
  )
}
