import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'

interface FakeURLBarProps {
  urlText?: string
  visible?: boolean
  className?: string
}

export function FakeURLBar({ urlText = 'https://example.com', visible = true, className }: FakeURLBarProps) {
  if (!visible) {
    return null
  }

  return (
    <div 
      className={cn('w-full bg-white border-b border-gray-200 flex items-center gap-2 px-2 py-1', className)} 
    >
      {/* Navigation buttons - left aligned */}
      <div className="flex items-center gap-1">
        <button
          className="p-1.5 rounded cursor-not-allowed opacity-50"
          aria-label="Back"
          type="button"
          disabled
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 text-gray-400" />
        </button>
        <button
          className="p-1.5 rounded cursor-not-allowed opacity-50"
          aria-label="Forward"
          type="button"
          disabled
        >
          <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 text-gray-400" />
        </button>
        <button
          className="p-1.5 rounded cursor-not-allowed opacity-50"
          aria-label="Refresh"
          type="button"
          disabled
        >
          <FontAwesomeIcon icon={faRotateRight} className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* URL bar - fully rounded, gray background */}
      <div className="flex-1 max-w-2xl">
        <div className="h-8 bg-gray-100 rounded-full px-4 flex items-center">
          <span className="text-[24px] text-gray-600 truncate" style={{ fontFamily: 'Calibri, sans-serif' }}>{urlText}</span>
        </div>
      </div>
    </div>
  )
}
