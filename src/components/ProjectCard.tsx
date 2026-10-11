import { motion } from 'framer-motion';
import type { Project } from '../data/portfolio';
import { EASE, Tilt } from './fx';
import { ProjectArt } from './Poster';

export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.article
      className="w-[84vw] shrink-0 snap-start sm:w-[62vw] lg:w-[46vw] xl:w-[42vw]"
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px -10% 0px 0px' }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: EASE }}
    >
      <Tilt max={5} className="group rounded-2xl">
        <div
          role="button"
          tabIndex={0}
          data-cursor="view"
          onClick={onOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpen();
            }
          }}
          aria-label={`Open ${project.title}`}
          className="focus-ring relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/10 transition duration-500 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] group-hover:ring-white/25 sm:aspect-[16/12] lg:aspect-auto lg:h-[66vh]"
        >
          <motion.div
            layoutId={`art-${project.id}`}
            className="absolute inset-0 overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-cine)] group-hover:scale-[1.07]">
              <ProjectArt project={project} />
            </div>
          </motion.div>

          <div className="absolute left-5 top-5 flex items-center gap-2 sm:left-7 sm:top-7">
            <span className="font-display text-xl leading-none text-crimson-2">
              V
            </span>
            <span className="text-[10px] font-bold tracking-[0.34em] text-bone/80">
              SERIES
            </span>
          </div>

          <span className="absolute right-5 top-5 rounded border border-white/30 px-1.5 py-px text-[10px] font-bold text-bone sm:right-7 sm:top-7">
            {project.year}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 [transform:translateZ(40px)]">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-mist">
              {project.genre}
            </p>

            <motion.h3
              layoutId={`title-${project.id}`}
              className="font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.88] tracking-wide text-bone"
            >
              {project.title}
            </motion.h3>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-bone/75 sm:text-[15px]">
              {project.logline}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full bg-black/35 px-2.5 py-1 text-[11px] font-medium text-bone/90 backdrop-blur"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onOpen();
                }}
                className="flex min-h-11 items-center gap-2 rounded-md bg-bone px-5 text-sm font-bold text-ink transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
              >
                Explore Project <span aria-hidden="true">↗</span>
              </button>

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  onClick={(event) => event.stopPropagation()}
                  aria-label={`Open live demo of ${project.title} in a new tab`}
                  className="flex min-h-11 items-center gap-2 rounded-md border border-white/25 bg-black/30 px-4 text-sm font-semibold text-bone backdrop-blur transition hover:border-bone hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
                >
                  Live Demo ↗
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  onClick={(event) => event.stopPropagation()}
                  aria-label={`Open ${project.title} source code on GitHub in a new tab`}
                  className="flex min-h-11 items-center gap-2 rounded-md border border-white/25 bg-black/30 px-4 text-sm font-semibold text-bone backdrop-blur transition hover:border-bone hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </Tilt>
    </motion.article>
  );
}