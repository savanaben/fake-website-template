import { cn } from '@/lib/utils'

interface BannerImageComponentProps {
  src: string
  alt: string
  height?: string | number
  className?: string
}

/**
 * Banner image component with path resolution.
 * Handles local paths, full URLs, and data URLs, resolving them correctly
 * based on Vite's base URL configuration.
 * Renders as a full-width cover background image with configurable height.
 */
export function BannerImageComponent({ src, alt, height, className }: BannerImageComponentProps) {
  // Helper function to resolve image paths (supports both URLs and local public folder paths)
  const resolveImagePath = (url: string): string => {
    // If it's already a full URL (http/https) or data URL, use as-is
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url
    }
    
    // Get Vite's base URL (e.g., '/fake-website/')
    const baseUrl = import.meta.env.BASE_URL || '/'
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
    
    // For paths starting with /, remove the leading slash and prepend base URL
    // /assets/images/history.png -> /fake-website/assets/images/history.png
    if (url.startsWith('/')) {
      const pathWithoutSlash = url.slice(1)
      // Ensure we don't have double slashes
      return `${normalizedBase}${pathWithoutSlash}`
    }
    
    // For relative paths, prepend base URL
    return `${normalizedBase}${url}`
  }

  const imageSrc = resolveImagePath(src)
  
  // Convert height to CSS value (supports numbers as pixels or strings as-is)
  const heightValue = height 
    ? typeof height === 'number' ? `${height}px` : height
    : '300px' // Default height

  return (
    <div 
      className={cn('w-full relative', className)}
      style={{
        height: heightValue,
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      role="img"
      aria-label={alt}
    />
  )
}
