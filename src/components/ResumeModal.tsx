import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { useScrollLock } from '../hooks/smoothScroll';
import { useMedia } from '../hooks/useMedia';
import { EASE } from './fx';
import { ResumeSheet } from './ResumeViewer';

/** Responsive resume viewer with PDF viewing and download options. */
export default function ResumeModal({
  onClose,
}: {
  onClose: () => void;
}) {
  useScrollLock(true);

  const small = useMedia('(max-width: 767px)');
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    closeButton.current?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[140] flex flex-col bg-black/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Vishwjit Upase resume"
    >
      <div className="gutter flex h-16 shrink-0 items-center justify-between gap-3 pt-[env(safe-area-inset-top)]">
        <div className="min-w-0">
          <p className="truncate font-display text-2xl tracking-wide text-bone">
            The Full Story
          </p>
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-mist">
            Vishwjit Upase · Resume
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={profile.resumePdf}
            download="Vishwjit_Upase_Resume.pdf"
            data-cursor="link"
            className="flex min-h-10 items-center gap-2 rounded-md bg-bone px-4 py-2 text-xs font-bold text-ink transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
          >
            <span aria-hidden="true">⤓</span>
            Download
          </a>

          <button
            ref={closeButton}
            type="button"
            onClick={onClose}
            aria-label="Close resume"
            data-cursor="close"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-bone transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
          >
            ✕
          </button>
        </div>
      </div>

      <motion.div
        className="gutter min-h-0 flex-1 pb-6"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {small ? (
          <div data-lenis-prevent className="h-full overflow-y-auto">
            <ResumeSheet />

            <a
              href={profile.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="glass mt-4 flex min-h-12 items-center justify-center rounded-md text-sm font-semibold text-bone transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
            >
              Open original PDF ↗
            </a>

            <a
              href={profile.resumePdf}
              download="Vishwjit_Upase_Resume.pdf"
              className="glass mt-3 flex min-h-12 items-center justify-center rounded-md text-sm font-semibold text-bone transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
            >
              Download PDF ⤓
            </a>
          </div>
        ) : (
          <iframe
            title="Vishwjit Upase resume PDF"
            src={`${profile.resumePdf}#view=FitH`}
            className="h-full w-full rounded-xl bg-white"
          />
        )}
      </motion.div>
    </motion.div>
  );
}