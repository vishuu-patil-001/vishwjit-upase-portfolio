
import { useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { profile, projects, type Project } from '../data/portfolio';
import { useDesktop, useReducedMotionPref } from '../hooks/useMedia';
import { EASE, RevealText } from './fx';
import ProjectCard from './ProjectCard';

/**
 * ORIGINALS
 * Desktop: a cinematic, pinned horizontal project showcase.
 * Mobile and reduced-motion: a native horizontal swipe rail.
 */
export default function Originals({
  onOpen,
}: {
  onOpen: (p: Project) => void;
}) {
  const desktop = useDesktop();
  const reduced = useReducedMotionPref();

  return desktop && !reduced ? (
    <PinnedOriginals onOpen={onOpen} />
  ) : (
    <RailOriginals onOpen={onOpen} />
  );
}

function Intro() {
  return (
    <div className="flex w-full shrink-0 flex-col justify-center lg:w-[34vw]">
      <p className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-crimson-2">
        <span className="h-px w-8 bg-crimson-2" />
        {projects.length} Featured Projects
      </p>

      <RevealText
        as="h2"
        text="MY WORK"
        className="font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.85] text-bone"
      />

      <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-mist">
        A selection of real software projects combining full-stack engineering,
        APIs, databases, and AI-powered workflows. Open a project to explore its
        technology, features, and available links.
      </p>

      <p className="mt-6 hidden text-xs tracking-[0.24em] text-smoke lg:block">
        SCROLL TO EXPLORE →
      </p>
    </div>
  );
}

function Outro() {
  return (
    <a
      href={profile.links.github}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="link"
      aria-label="Explore Vishwjit's GitHub profile"
      className="group flex aspect-[3/4] w-[70vw] shrink-0 snap-start flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/15 text-center transition hover:border-crimson-2/60 sm:w-[44vw] lg:aspect-auto lg:h-[66vh] lg:w-[24vw]"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 text-2xl text-bone transition group-hover:scale-110 group-hover:border-crimson-2 group-hover:text-crimson-2">
        ↗
      </span>

      <span className="font-display text-3xl tracking-wide text-bone">
        Explore GitHub
      </span>

      <span className="px-4 text-xs text-mist">
        More code, repositories, and development work
      </span>
    </a>
  );
}

function PinnedOriginals({
  onOpen,
}: {
  onOpen: (p: Project) => void;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const distMV = useMotionValue(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;

      const distance = Math.max(
        0,
        track.current.scrollWidth - window.innerWidth,
      );

      setDist(distance);
      distMV.set(distance);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);

    if (track.current) {
      resizeObserver.observe(track.current);
    }

    window.addEventListener('resize', measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [distMV]);

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ['start start', 'end end'],
  });

  const raw = useTransform(
    [scrollYProgress, distMV],
    ([progress, distance]: number[]) => -progress * distance,
  );

  const x = useSpring(raw, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={wrap}
      style={{ height: `calc(100vh + ${dist}px)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(50%_60%_at_70%_50%,rgba(229,19,43,0.10),transparent_70%)]"
        />

        <motion.div
          ref={track}
          style={{ x }}
          className="gutter relative flex items-center gap-8 pr-[12vw]"
          data-cursor="drag"
        >
          <Intro />

          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={() => onOpen(project)}
            />
          ))}

          <Outro />
        </motion.div>

        <div className="gutter absolute inset-x-0 bottom-8 flex items-center gap-4">
          <span className="text-[10px] font-bold tracking-[0.3em] text-smoke">
            PROJECTS
          </span>

          <div className="h-[2px] flex-1 overflow-hidden rounded bg-white/10">
            <motion.div
              className="h-full origin-left bg-crimson"
              style={{ scaleX: bar }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function RailOriginals({
  onOpen,
}: {
  onOpen: (p: Project) => void;
}) {
  return (
    <div className="py-6">
      <div className="gutter mb-6">
        <Intro />
      </div>

      <motion.div
        className="rail gutter flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6"
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpen={() => onOpen(project)}
          />
        ))}

        <Outro />
      </motion.div>
    </div>
  );
}
