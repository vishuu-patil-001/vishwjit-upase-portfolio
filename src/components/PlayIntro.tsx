import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import { introSlides, profile } from '../data/portfolio';
import { useScrollLock } from '../hooks/smoothScroll';
import { useReducedMotionPref } from '../hooks/useMedia';
import { EASE } from './fx';

const SLIDE_MS = 3600;

/**
 * "▶ Play Intro": darken → zoom into the portrait → a full-screen highlight reel
 * built only from resume facts → fade back to the portfolio.
 */
export default function PlayIntro({ onClose }: { onClose: () => void }) {
  useScrollLock(true);
  const reduced = useReducedMotionPref();
  const [phase, setPhase] = useState<'zoom' | 'reel' | 'end'>(reduced ? 'reel' : 'zoom');
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);

  useEffect(() => {
    if (phase !== 'zoom') return;
    const t = window.setTimeout(() => setPhase('reel'), 1700);
    return () => clearTimeout(t);
  }, [phase]);

  const next = useCallback(() => {
    setIndex((i) => {
      if (i >= introSlides.length - 1) {
        setPhase('end');
        return i;
      }
      return i + 1;
    });
    progress.set(0);
  }, [progress]);
  const prev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
    progress.set(0);
  }, [progress]);

  // one clock drives both the active progress bar and auto-advance, so pause is exact
  useEffect(() => {
    if (phase !== 'reel' || paused) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const v = progress.get() + (now - last) / SLIDE_MS;
      last = now;
      if (v >= 1) {
        next();
        return;
      }
      progress.set(v);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, paused, index, next, progress]);

  useEffect(() => {
    if (phase !== 'end') return;
    const t = window.setTimeout(onClose, 2200);
    return () => clearTimeout(t);
  }, [phase, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === ' ') {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, next, prev]);

  const slide = introSlides[index];

  return (
    <motion.div
      className="fixed inset-0 z-[130] overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.6 }}
      role="dialog"
      aria-modal="true"
      aria-label="Intro highlight reel"
    >
      {/* Zoom into the portrait */}
      <motion.div
        className="absolute inset-0 flex items-end justify-center"
        initial={{ scale: 1, opacity: 1 }}
        animate={phase === 'zoom' ? { scale: [1, 1.08, 2.6], opacity: [0.9, 1, 0] } : { opacity: 0.1, scale: 1.25, filter: 'blur(4px)' }}
        transition={{ duration: phase === 'zoom' ? 1.7 : 1.2, ease: [0.7, 0, 0.2, 1], times: phase === 'zoom' ? [0, 0.3, 1] : undefined }}
        style={{ transformOrigin: '50% 30%' }}
      >
        <img
          src={profile.portrait.src}
          srcSet={profile.portrait.srcSet}
          sizes="100vw"
          alt=""
          className="h-[88vh] w-auto max-w-none object-contain [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(120,10,25,0.35),transparent_70%)]" />

      {/* progress bars */}
      {phase !== 'zoom' && (
        <div className="absolute inset-x-0 top-0 z-20 flex gap-1.5 px-4 pt-4 sm:px-10 sm:pt-6">
          {introSlides.map((s, i) => (
            <div key={s.kicker} className="h-[3px] flex-1 overflow-hidden rounded bg-white/15">
              <motion.div
                className="h-full origin-left bg-bone"
                style={{ scaleX: i === index && phase === 'reel' ? progress : i < index || phase === 'end' ? 1 : 0 }}
              />
            </div>
          ))}
        </div>
      )}

      {/* reel */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          {phase === 'reel' && (
            <motion.div
              key={index}
              className="max-w-4xl"
              initial={{ opacity: 0, scale: 1.06, filter: 'blur(14px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.5em] text-crimson-2 sm:text-xs">
                Episode {String(index + 1).padStart(2, '0')} · {slide.kicker}
              </p>
              <h2 className="font-display leading-[0.88] text-bone" style={{ fontSize: 'clamp(3rem, 10vw, 8.5rem)' }}>
                {slide.title}
              </h2>
              <div className="mt-6 space-y-2">
                {slide.lines.map((l, i) => (
                  <motion.p
                    key={l}
                    className="text-base text-bone/80 sm:text-xl"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.15, duration: 0.6, ease: EASE }}
                  >
                    {l}
                  </motion.p>
                ))}
              </div>
              {slide.chips && (
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {slide.chips.map((c, i) => (
                    <motion.span
                      key={c}
                      className="glass rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-bone"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.06 }}
                    >
                      {c}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
          {phase === 'end' && (
            <motion.div key="end" initial={{ opacity: 0, letterSpacing: '0.6em' }} animate={{ opacity: 1, letterSpacing: '0.2em' }} transition={{ duration: 1.2, ease: EASE }}>
              <p className="font-display text-5xl text-bone sm:text-7xl">NOW STREAMING</p>
              <p className="mt-3 text-xs font-semibold tracking-[0.4em] text-mist">{profile.displayName.toUpperCase()}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* tap zones (mobile-friendly) */}
      {phase === 'reel' && (
        <>
          <button type="button" aria-label="Previous highlight" className="absolute inset-y-0 left-0 z-[5] w-1/4" onClick={prev} />
          <button type="button" aria-label="Next highlight" data-cursor="play" className="absolute inset-y-0 right-0 z-[5] w-1/4" onClick={next} />
        </>
      )}

      {/* controls */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-10 sm:pb-8">
        <div className="flex items-center gap-2">
          {phase === 'reel' && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Resume' : 'Pause'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-bone transition hover:bg-white/10"
            >
              {paused ? '▶' : '❚❚'}
            </button>
          )}
          <span className="hidden text-[11px] tracking-[0.2em] text-smoke sm:block">SPACE · ← → · ESC</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          data-cursor="close"
          className="rounded-full bg-bone px-5 py-2.5 text-xs font-bold tracking-[0.18em] text-ink transition hover:bg-white"
        >
          BACK TO BROWSE
        </button>
      </div>
    </motion.div>
  );
}
