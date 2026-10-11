
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { useReducedMotionPref } from '../hooks/useMedia';
import { EASE, Magnetic } from './fx';

/**
 * V SERIES opening sequence:
 * black → studio card → VISHWJIT → SOFTWARE × AI
 * → portrait reveal → professional focus → PLAY
 */
const TIMELINE = [
  { at: 300, beat: 1 },
  { at: 1900, beat: 2 },
  { at: 2700, beat: 3 },
  { at: 3400, beat: 4 },
  { at: 4300, beat: 5 },
  { at: 5000, beat: 6 },
];

export default function OpeningSequence({
  onDone,
}: {
  onDone: () => void;
}) {
  const reduced = useReducedMotionPref();
  const [beat, setBeat] = useState(reduced ? 6 : 0);

  useEffect(() => {
    if (reduced) return;

    const timers = TIMELINE.map(({ at, beat }) =>
      window.setTimeout(() => setBeat(beat), at),
    );

    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter') {
        onDone();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] overflow-hidden bg-black"
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
      transition={{ duration: 0.9, ease: EASE }}
      role="dialog"
      aria-label="V SERIES portfolio introduction"
    >
      {/* Cinematic letterbox bars */}
      <motion.div
        className="absolute inset-x-0 top-0 z-30 h-[7vh] bg-black"
        initial={{ y: 0 }}
        animate={{ y: beat >= 6 ? '-100%' : 0 }}
        transition={{ duration: 1.2, ease: EASE }}
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 z-30 h-[7vh] bg-black"
        initial={{ y: 0 }}
        animate={{ y: beat >= 6 ? '100%' : 0 }}
        transition={{ duration: 1.2, ease: EASE }}
      />

      {/* Cinematic studio lighting */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 55%, rgba(229,19,43,0.22), transparent 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: beat >= 2 ? [0, 0.9, 0.5, 1] : 0,
        }}
        transition={{ duration: 1.4 }}
      />

      {/* V SERIES studio title */}
      <AnimatePresence>
        {beat === 1 && (
          <motion.div
            key="studio"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-center"
              initial={{ letterSpacing: '0.2em', opacity: 0 }}
              animate={{ letterSpacing: '0.45em', opacity: 1 }}
              transition={{ duration: 1.6, ease: EASE }}
            >
              <p className="font-sans text-xs font-semibold text-mist sm:text-sm">
                V SERIES
              </p>
              <p className="mt-3 font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-mist/60 sm:text-[10px]">
                SOFTWARE ENGINEERING × AI
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portrait reveal */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-0 mx-auto flex h-[68vh] max-w-[900px] items-end justify-center"
        initial={{
          opacity: 0,
          scale: 1.12,
          filter: 'blur(18px) brightness(0.3)',
        }}
        animate={
          beat >= 4
            ? {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px) brightness(1)',
              }
            : {}
        }
        transition={{ duration: 1.6, ease: EASE }}
      >
        <img
          src={profile.portrait.src}
          srcSet={profile.portrait.srcSet}
          sizes="(max-width: 768px) 100vw, 900px"
          alt={profile.portrait.alt}
          className="h-full w-auto max-w-none object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_55%,transparent_98%)]"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-[radial-gradient(70%_60%_at_50%_40%,transparent_30%,rgba(0,0,0,0.85)_100%)]"
      />

      {/* Main title */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.h1
          className="font-display leading-[0.82] text-bone drop-shadow-[0_8px_40px_rgba(0,0,0,0.8)]"
          style={{ fontSize: 'clamp(4.6rem, 20vw, 15rem)' }}
          initial={{
            opacity: 0,
            scale: 1.3,
            filter: 'blur(20px)',
            letterSpacing: '0.5em',
          }}
          animate={
            beat >= 2
              ? {
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                  letterSpacing: '0.04em',
                  y: beat >= 4 ? '-30vh' : 0,
                }
              : {}
          }
          transition={{ duration: 1.3, ease: EASE }}
        >
          {profile.firstName}
        </motion.h1>

        <motion.p
          className="font-sans text-sm font-bold text-crimson-2 [text-shadow:0_2px_20px_rgba(0,0,0,0.9)] sm:text-lg"
          initial={{ opacity: 0, letterSpacing: '1.4em' }}
          animate={
            beat >= 3
              ? {
                  opacity: 1,
                  letterSpacing: '0.7em',
                  y: beat >= 4 ? '-30vh' : 0,
                }
              : {}
          }
          transition={{ duration: 1.1, ease: EASE }}
        >
          SOFTWARE × AI
        </motion.p>
      </div>

      {/* Professional focus and play button */}
      <div className="absolute inset-x-0 bottom-[9vh] z-20 flex flex-col items-center gap-6 px-4 text-center">
        <motion.p
          className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-bone/90 sm:text-sm sm:tracking-[0.4em]"
          initial={{ opacity: 0, y: 14 }}
          animate={beat >= 5 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          SOFTWARE DEVELOPMENT ENGINEER · AI & GENERATIVE AI
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={beat >= 6 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Magnetic>
            <button
              type="button"
              data-cursor="play"
              onClick={onDone}
              tabIndex={beat >= 6 ? 0 : -1}
              className="group flex items-center gap-3 rounded-full bg-bone px-9 py-4 font-sans text-base font-bold tracking-wide text-ink shadow-[0_0_60px_rgba(229,19,43,0.45)] transition hover:bg-white"
            >
              <span className="text-lg transition-transform group-hover:scale-125">
                ▶
              </span>
              ENTER PORTFOLIO
            </button>
          </Magnetic>
        </motion.div>
      </div>

      {/* Skip introduction */}
      <button
        type="button"
        onClick={onDone}
        className="absolute right-4 top-[calc(7vh+12px)] z-40 rounded-full border border-white/20 px-4 py-2 font-sans text-[11px] font-semibold tracking-[0.2em] text-mist transition hover:border-white/60 hover:text-bone"
      >
        SKIP INTRO
      </button>
    </motion.div>
  );
}
