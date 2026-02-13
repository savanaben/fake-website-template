import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { NAEP_BORDER_RADIUS, NAEP_SHADOWS, NAEP_SPACING } from '@/lib/naepTokens'

export type CardRounding = 'small' | 'medium' | 'large'
export type CardShadow = 'none' | 'low' | 'high'
export type CardBorder = 'none' | 'thin' | 'thick' | 'bordered' // 'bordered' legacy, rendered as thick
export type CardWidth = 'default' | 'manual'
export type CardPadding = 'space-16' | 'space-24' | 'space-32' | 'space-48'

const CARD_PADDING_OPTIONS: CardPadding[] = ['space-16', 'space-24', 'space-32', 'space-48']

interface CardComponentProps {
  children: ReactNode
  className?: string
  rounding?: CardRounding
  shadow?: CardShadow
  backgroundColor?: string
  borderColor?: string
  border?: CardBorder
  width?: CardWidth
  widthManual?: string
  padding?: CardPadding
  isEmpty?: boolean
  onDragOver?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent) => void
  onClick?: (e: React.MouseEvent) => void
}

/** small=NAEP sm (2px), medium=NAEP lg (6px), large=Tailwind step (12px) */
const roundingToRadius: Record<CardRounding, number> = {
  small: NAEP_BORDER_RADIUS.sm,
  medium: NAEP_BORDER_RADIUS.lg,
  large: 12, // Tailwind rounded-xl
}

/** NAEP shadows: low=md, high=lg */
const shadowToToken: Record<CardShadow, string> = {
  none: '',
  low: NAEP_SHADOWS.md,
  high: NAEP_SHADOWS.lg,
}

function getPaddingPx(padding: string | undefined): number {
  if (padding && CARD_PADDING_OPTIONS.includes(padding as CardPadding)) {
    return NAEP_SPACING[padding as CardPadding]
  }
  return NAEP_SPACING['space-24']
}

export function CardComponent({
  children,
  className,
  rounding = 'medium',
  shadow = 'none',
  backgroundColor = '#ffffff',
  borderColor,
  border = 'none',
  width = 'default',
  widthManual,
  padding = 'space-24',
  isEmpty = false,
  onDragOver,
  onDrop,
  onClick,
}: CardComponentProps) {
  const hasChildren = React.Children.count(children) > 0

  const widthClass =
    width === 'manual' && widthManual ? widthManual : 'max-w-[62ch]'

  const style: React.CSSProperties = {}
  if (backgroundColor === 'transparent') {
    style.backgroundColor = 'transparent'
  } else if (backgroundColor) {
    style.backgroundColor = backgroundColor
  }
  style.borderRadius = `${roundingToRadius[rounding]}px`
  if (shadowToToken[shadow]) {
    style.boxShadow = shadowToToken[shadow]
  }
  style.padding = `${getPaddingPx(padding)}px`
  if ((hasChildren && !isEmpty) && (border === 'thin' || border === 'thick' || border === 'bordered')) {
    style.borderColor = borderColor ?? '#909090'
  }

  return (
    <div
      className={cn(
        widthClass,
        'mx-auto',
        (hasChildren && !isEmpty) && (border === 'thin') && 'border',
        (hasChildren && !isEmpty) && (border === 'thick' || border === 'bordered') && 'border-2',
        (!hasChildren || isEmpty) && 'border-2 border-dashed border-gray-300 min-h-[60px]',
        className
      )}
      style={style}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
    >
      {!hasChildren ? (
        <div className="w-full text-center text-gray-400 text-sm py-8">
          Drop title or paragraph here
        </div>
      ) : (
        <div className="space-y-4 [&>*:last-child]:mb-0 [&>*:last-child_*]:mb-0">{children}</div>
      )}
    </div>
  )
}
