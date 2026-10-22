import { useEffect, useId, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { setScrollLocked } from '@/lib/scrollTo'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  closeLabel: string
  children: ReactNode
}

/**
 * A native <dialog> opened with showModal(): focus is trapped, Escape closes it, and
 * the page behind is inert. Page scrolling is frozen while it is open.
 */
export function Modal({ open, onClose, title, closeLabel, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      setScrollLocked(true)
    }
    if (!open && dialog.open) dialog.close()
    return () => {
      if (open) setScrollLocked(false)
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      data-lenis-prevent
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="m-auto max-h-[90svh] w-[min(40rem,92vw)] overflow-y-auto rounded-card bg-paper p-0 text-ink-900 backdrop:bg-pine-950/70 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 md:p-10">
        <div className="flex items-start justify-between gap-6">
          <h3 id={titleId} className="font-display text-h3">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="-mt-1 -mr-2 flex size-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-ink-900/10"
          >
            <X aria-hidden size={20} />
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </dialog>
  )
}
