import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { projects, type Project } from '../data/portfolio';
import { useScrollLock } from '../hooks/smoothScroll';
import { EASE, Magnetic } from './fx';
import { ProjectArt } from './Poster';

const block = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE },
  },
};

export default function ProjectModal({
  project,
  onClose,
  onSwitch,
}: {
  project: Project;
  onClose: () => void;
  onSwitch: (p: Project) => void;
}) {
  useScrollLock(true);

  const scroller = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;

    closeBtn.current?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [project.id]);

  const more = projects.filter((item) => item.id !== project.id);

  return (
    <motion.div
      className="fixed inset-0 z-[140]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`title-${project.id}-modal`}
    >
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <div
        ref={scroller}
        data-lenis-prevent
        className="absolute inset-0 overflow-y-auto overscroll-contain"
        onClick={onClose}
      >
        <motion.div
          className="relative mx-auto min-h-full max-w-5xl bg-ink-2 shadow-2xl sm:my-10 sm:min-h-0 sm:rounded-2xl"
          onClick={(event) => event.stopPropagation()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: 30, transition: { duration: 0.3 } }}
        >
          {/* Project artwork and title */}
          <div className="relative h-[52vh] min-h-[340px] overflow-hidden sm:rounded-t-2xl">
            <motion.div
              layoutId={`art-${project.id}`}
              className="absolute inset-0"
              transition={{ duration: 0.7, ease: EASE }}
            >
              <ProjectArt project={project} />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/30 to-transparent" />

            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              data-cursor="close"
              aria-label="Close project details"
              className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-lg text-bone backdrop-blur transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
            >
              ✕
            </button>

            <div className="absolute inset-x-0 bottom-0 px-5 pb-6 sm:px-10">
              <motion.p
                className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-[0.34em] text-bone/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="font-display text-xl tracking-normal text-crimson-2">
                  V
                </span>
                SERIES
              </motion.p>

              <motion.h2
                id={`title-${project.id}-modal`}
                layoutId={`title-${project.id}`}
                className="font-display text-[clamp(2.8rem,8vw,6rem)] leading-[0.86] tracking-wide text-bone"
                transition={{ duration: 0.7, ease: EASE }}
              >
                {project.title}
              </motion.h2>
            </div>
          </div>

          <motion.div
            className="px-5 pb-12 sm:px-10"
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.08, delayChildren: 0.25 }}
          >
            <motion.div
              variants={block}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-mist"
            >
              <span className="font-semibold text-[#46e3a8]">
                {project.year}
              </span>
              <span className="h-1 w-1 rounded-full bg-smoke" />
              <span>{project.genre}</span>
            </motion.div>

            <motion.p
              variants={block}
              className="mt-4 max-w-3xl text-lg leading-relaxed text-bone sm:text-xl"
            >
              {project.logline}
            </motion.p>

            {/* Live project and source-code links */}
            <motion.div
              variants={block}
              className="mt-6 flex flex-wrap gap-3"
            >
              {project.demo && (
                <Magnetic>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    aria-label={`Open live demo of ${project.title} in a new tab`}
                    className="flex min-h-12 items-center gap-2 rounded-md bg-bone px-6 text-[15px] font-bold text-ink transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
                  >
                    Live Demo ↗
                  </a>
                </Magnetic>
              )}

              {project.github && (
                <Magnetic>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    aria-label={`View ${project.title} source code on GitHub in a new tab`}
                    className="flex min-h-12 items-center gap-2 rounded-md border border-white/25 bg-black/30 px-6 text-[15px] font-bold text-bone backdrop-blur transition hover:border-bone hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
                  >
                    GitHub ↗
                  </a>
                </Magnetic>
              )}
            </motion.div>

            {/* Project impact */}
            <motion.section variants={block} className="mt-12">
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">
                Project Highlights
              </h3>

              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
                {project.metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    className="bg-ink p-4 sm:p-5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.5 + index * 0.07,
                      duration: 0.5,
                      ease: EASE,
                    }}
                  >
                    <p
                      className="font-display text-4xl leading-none text-bone sm:text-5xl"
                      style={{
                        color:
                          index === 0 ? project.palette.accent : undefined,
                      }}
                    >
                      {metric.value}
                    </p>
                    <p className="mt-2 text-xs leading-snug text-mist">
                      {metric.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <div className="mt-12 grid gap-10 lg:grid-cols-[3fr_2fr]">
              {/* Contribution */}
              <motion.section variants={block}>
                <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">
                  Engineering & Contribution
                </h3>

                <ul className="space-y-4">
                  {project.build.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] leading-relaxed text-bone/85"
                    >
                      <span
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: project.palette.accent }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.section>

              <div className="space-y-10">
                {/* Technology stack */}
                <motion.section variants={block}>
                  <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">
                    Technology Stack
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((technology) => (
                      <span
                        key={technology}
                        className="glass rounded-full px-3 py-1.5 text-sm font-medium text-bone"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </motion.section>

                {/* Features */}
                <motion.section variants={block}>
                  <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">
                    Key Features
                  </h3>

                  <ul className="space-y-2.5">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-bone/85"
                      >
                        <span className="text-crimson-2" aria-hidden="true">
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.section>
              </div>
            </div>

            {/* Explore the other project */}
            <motion.section
              variants={block}
              className="mt-14 border-t border-white/10 pt-8"
            >
              <h3 className="mb-2 font-sans text-lg font-semibold text-bone">
                Continue Exploring
              </h3>

              <p className="mb-5 text-sm leading-relaxed text-mist">
                Explore another project in my software engineering and AI
                portfolio.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {more.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    data-cursor="view"
                    onClick={() => onSwitch(item)}
                    aria-label={`Explore ${item.title}`}
                    className="group relative aspect-video overflow-hidden rounded-xl text-left ring-1 ring-white/10 transition hover:ring-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
                  >
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                      <ProjectArt project={item} />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-mist">
                        {item.genre}
                      </p>
                      <p className="font-display text-3xl leading-none tracking-wide text-bone">
                        {item.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.section>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}