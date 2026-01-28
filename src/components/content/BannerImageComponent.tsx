import { cn } from '@/lib/utils'

interface BannerImageComponentProps {
  src: string
  alt: string
  className?: string
}

export function BannerImageComponent({ src, alt, className }: BannerImageComponentProps) {
  return (
    <div className={cn('w-full my-4', className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover"
      />
    </div>
  )
}
