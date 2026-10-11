import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  achievements,
  certifications,
  education,
  experience,
  profile,
  projects,
  skillCategories,
} from '../data/portfolio';
import { EASE, Magnetic, SectionHeading } from './fx';

/** The resume section, with a responsive preview and download actions. */
export default function ResumeSection({
  onView,
}: {
  onView: () => void;
}) {
  return (
    <>
      <SectionHeading kicker="Software Engineering × AI" title="The Full Story" />

      <div className="gutter grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ transformPerspective: 1600 }}
        >
          <CollapsibleSheet />
        </motion.div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-serif text-3xl italic leading-tight text-bone">
            Every episode, on one page.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-mist">
            Explore my education, professional experience, featured projects,
            technical skills, achievements, and certifications. View the resume
            online or download a copy.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Magnetic className="w-full">
              <button
                type="button"
                data-cursor="view"
                onClick={onView}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-bone px-6 text-[15px] font-bold text-ink transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
              >
                ▶ View Resume
              </button>
            </Magnetic>

            <Magnetic className="w-full">
              <a
                href={profile.resumePdf}
                download="Vishwjit_Upase_Resume.pdf"
                data-cursor="link"
                className="glass flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-6 text-[15px] font-semibold text-bone transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
              >
                ⤓ Download Resume
              </a>
            </Magnetic>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/10 text-center">
            {[
              { value: education[0]?.score?.replace('CGPA ', '') ?? '—', label: 'CGPA' },
              { value: String(projects.length), label: 'Projects' },
              { value: String(certifications.length), label: 'Certifications' },
            ].map((stat) => (
              <div key={stat.label} className="bg-ink-2 px-2 py-4">
                <dd className="font-display text-3xl leading-none text-bone">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}

/** The mobile preview expands on demand to keep the page readable. */
function CollapsibleSheet() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className={`overflow-hidden transition-[max-height] duration-700 ease-[var(--ease-cine)] md:max-h-none ${
          open ? 'max-h-[4000px]' : 'max-h-[560px]'
        }`}
      >
        <ResumeSheet />
      </div>

      {!open && (
        <div className="absolute inset-x-0 bottom-0 flex h-48 items-end justify-center rounded-b-2xl bg-gradient-to-t from-ink via-ink/85 to-transparent pb-4 md:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="glass min-h-11 rounded-full px-5 text-sm font-semibold text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
          >
            Read the full story ↓
          </button>
        </div>
      )}
    </div>
  );
}

function H({ children }: { children: string }) {
  return (
    <h4 className="mb-3 mt-7 border-b border-white/10 pb-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-crimson-2 first:mt-0">
      {children}
    </h4>
  );
}

export function ResumeSheet() {
  return (
    <article className="relative overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#121218,#0c0c11)] p-6 ring-1 ring-white/10 sm:p-10">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson-2/70 to-transparent"
      />

      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="text-[10px] font-bold tracking-[0.34em] text-smoke">
            SOFTWARE ENGINEERING × AI
          </p>

          <h3 className="mt-1 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[0.9] tracking-wide text-bone">
            {profile.fullName}
          </h3>

          <p className="mt-2 text-xs font-medium text-mist">
            Software Development Engineer | AI &amp; Generative AI
          </p>

          <p className="mt-1 text-xs text-mist">
            {profile.location}
          </p>
        </div>

        <div className="text-xs leading-relaxed text-mist sm:text-right">
          <a
            href={`mailto:${profile.email}`}
            className="block break-all transition hover:text-bone"
          >
            {profile.email}
          </a>

          {profile.phone && (
            <a
              href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}
              className="block transition hover:text-bone"
            >
              {profile.phone}
            </a>
          )}

          <div className="mt-1 flex flex-wrap gap-x-2 sm:justify-end">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-bone"
            >
              LinkedIn ↗
            </a>

            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-bone"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </header>

      <div className="grid gap-x-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <H>Education</H>

          {education.map((item) => (
            <div key={item.school} className="mb-4">
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-sm font-semibold text-bone">
                  {item.school}, {item.place}
                </p>
                <p className="text-xs text-smoke">{item.period}</p>
              </div>

              <p className="text-xs text-mist">
                {item.degree} ·{' '}
                <span className="text-bone/80">{item.score}</span>
              </p>
            </div>
          ))}

          <H>Professional Experience</H>

          {experience.map((item) => (
            <div key={item.company} className="mb-5">
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-sm font-semibold text-bone">
                  {item.company} — {item.role}
                </p>
                <p className="text-xs text-smoke">{item.period}</p>
              </div>

              <ul className="mt-2 space-y-1.5">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2 text-xs leading-relaxed text-mist"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-crimson-2" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <H>Featured Projects</H>

          {projects.map((item) => (
            <div key={item.id} className="mb-4">
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-sm font-semibold text-bone">
                  {item.title}
                </p>
                <p className="text-xs text-smoke">{item.year}</p>
              </div>

              <p className="mt-1 text-xs leading-relaxed text-mist">
                {item.logline}
              </p>

              <p className="mt-1 text-xs text-mist">
                {item.stack.join(', ')}
              </p>

              <div className="mt-1 flex flex-wrap gap-x-3 text-xs">
                {item.demo && (
                  <a
                    href={item.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bone underline decoration-white/30 underline-offset-4 hover:decoration-white"
                  >
                    Live Demo ↗
                  </a>
                )}

                {item.github && (
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bone underline decoration-white/30 underline-offset-4 hover:decoration-white"
                  >
                    Source Code ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div>
          <H>Technical Skills</H>

          <div className="space-y-2">
            {skillCategories.map((category) => (
              <p
                key={category.id}
                className="text-xs leading-relaxed text-mist"
              >
                <span className="font-semibold text-bone">
                  {category.title}:{' '}
                </span>
                {category.skills.map((skill) => skill.name).join(', ')}
              </p>
            ))}
          </div>

          <H>Achievements &amp; Recognition</H>

          <ul className="space-y-2">
            {achievements.map((item) => (
              <li key={item.id} className="text-xs leading-relaxed text-mist">
                <span className="font-semibold text-bone">
                  {item.title} — {item.org}.
                </span>{' '}
                {item.detail}
              </li>
            ))}
          </ul>

          <H>Certifications</H>

          <ul className="space-y-2">
            {certifications.map((item) => (
              <li key={item.name} className="text-xs leading-relaxed text-mist">
                <span className="font-semibold text-bone">{item.name}</span>
                {item.issuer ? ` — ${item.issuer}` : ''}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}