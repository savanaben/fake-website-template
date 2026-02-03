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
      className={cn('w-full bg-white flex items-center gap-2 px-2 py-[8px]', className)}
      style={{ borderBottom: '1px solid #afafaf' }}
    >
      {/* Navigation buttons - left aligned */}
      <div className="flex items-center gap-[4px]">
        <button
          className="p-[8px] rounded cursor-not-allowed inline-flex items-center justify-center leading-none"
          aria-label="Back"
          type="button"
          disabled
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 block shrink-0" style={{ color: '#D8D8D8' }} />
        </button>
        <button
          className="p-[8px] rounded cursor-not-allowed inline-flex items-center justify-center leading-none"
          aria-label="Forward"
          type="button"
          disabled
        >
          <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 block shrink-0" style={{ color: '#D8D8D8' }} />
        </button>
        <button
          className="p-[8px] rounded cursor-not-allowed inline-flex items-center justify-center leading-none"
          aria-label="Refresh"
          type="button"
          disabled
        >
          <FontAwesomeIcon icon={faRotateRight} className="w-4 h-4 block shrink-0" style={{ color: '#D8D8D8' }} />
        </button>
      </div>

      {/* URL bar - fully rounded, gray background */}
      <div className="flex-1 max-w-2xl">
        <div className="rounded-full px-4 py-1 flex items-center" style={{ backgroundColor: '#F5F5F5' }}>
          <span className="text-[22px] truncate" style={{ fontFamily: 'Calibri, sans-serif', color: '#3c3c3c' }}>{urlText}</span>
        </div>
      </div>
    </div>
  )
}
