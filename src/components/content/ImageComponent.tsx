import { cn } from '@/lib/utils'

interface ImageComponentProps {
  src: string
  alt: string
  width?: string | number
  height?: string | number
  className?: string
}

export function ImageComponent({ src, alt, width, height, className }: ImageComponentProps) {
  // Determine width styling
  let widthClass: string | undefined = undefined
  let widthStyle: React.CSSProperties | undefined = undefined
  
  if (width) {
    const widthStr = String(width).trim()
    // Check if it's a Tailwind class (starts with w-)
    if (widthStr.startsWith('w-')) {
      widthClass = widthStr
    } 
    // Check if it's a px value (ends with px) or just a number
    else if (widthStr.endsWith('px') || !isNaN(Number(widthStr))) {
      widthStyle = { width: widthStr.endsWith('px') ? widthStr : `${widthStr}px` }
    }
    // Otherwise treat as a CSS value
    else {
      widthStyle = { width: widthStr }
    }
  } else {
    // Default: fill container width
    widthClass = 'w-full'
  }
  
  // Determine height styling
  let heightClass: string | undefined = undefined
  let heightStyle: React.CSSProperties | undefined = undefined
  
  if (height) {
    const heightStr = String(height).trim()
    // Check if it's a Tailwind class (starts with h-)
    if (heightStr.startsWith('h-')) {
      heightClass = heightStr
    }
    // Check if it's a px value (ends with px) or just a number
    else if (heightStr.endsWith('px') || !isNaN(Number(heightStr))) {
      heightStyle = { height: heightStr.endsWith('px') ? heightStr : `${heightStr}px` }
    }
    // Otherwise treat as a CSS value
    else {
      heightStyle = { height: heightStr }
    }
  } else {
    // Default: auto height
    heightStyle = { height: 'auto' }
  }
  
  return (
    <img
      src={src}
      alt={alt}
      className={cn('object-contain', widthClass, heightClass, className)}
      style={{ ...widthStyle, ...heightStyle }}
    />
  )
}
