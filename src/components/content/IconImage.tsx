import { cn } from '@/lib/utils'

interface IconImageProps {
  iconUrl?: string
  iconAlt?: string
  className?: string
}

/**
 * Shared component for rendering icon images with path resolution.
 * Handles local paths, full URLs, and data URLs, resolving them correctly
 * based on Vite's base URL configuration.
 */
export function IconImage({ iconUrl, iconAlt, className }: IconImageProps) {
  // Helper function to resolve image paths (supports both URLs and local public folder paths)
  const resolveImagePath = (url?: string): string | undefined => {
    if (!url) return undefined
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

  const imageSrc = resolveImagePath(iconUrl)

  if (!imageSrc) {
    return null
  }

  return (
    <img
      src={imageSrc}
      alt={iconAlt || 'Icon'}
      className={cn('h-8 w-8 object-contain flex-shrink-0', className)}
    />
  )
}
