import { cn } from '@/lib/utils'

interface ParagraphComponentProps {
  content: string
  className?: string
}

export function ParagraphComponent({ content, className }: ParagraphComponentProps) {
  const displayContent = content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  
  return (
    <p className={cn('text-base mb-4', className)} style={{ lineHeight: '1.4' }}>
      {displayContent}
    </p>
  )
}
