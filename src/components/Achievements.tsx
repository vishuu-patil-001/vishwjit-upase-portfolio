
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { achievements, certifications } from '../data/portfolio';
import { EASE, SectionHeading, Tilt } from './fx';
import { RailButtons } from './Rail';

function Laurel({ side }: { side: 'l' | 'r' }) {
  return (
    <svg
      viewBox="0 0 30 64"
      className={`h-14 w-auto text-[#d9b46a] ${side === 'r' ? '-scale-x-100' : ''}`}
      aria-hidden="true"
    >
      <path
        d="M26 62C10 52 4 36 8 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      {[10, 18, 26, 34, 42, 50].map((y, i) => (
        <ellipse
          key={y}
          cx={i < 2 ? 9 : 8 + i * 1.6}
          cy={y}
          rx="5"
          ry="2.2"
          fill="currentColor"
          opacity="0.85"
          transform={`rotate(-40 ${8 + i * 1.6} ${y})`}
        />
      ))}
    </svg>
  );
}

export default function Achievements() {
  const rail = useRef<HTMLDivElement>(null);
  const issuers = Array.from(
    new Set(certifications.map((certification) => certification.issuer)),
  );

  return (
    <>
      <SectionHeading kicker="Recognition & Growth" title="Achievements" />

      <div className="gutter grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 [perspective:1400px]">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 50, rotateX: 18 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.9, delay: index * 0.08, ease: EASE }}
          >
            <Tilt max={8} className="group h-full rounded-2xl">
              <article className="relative flex h-full min-h-[340px] flex-col items-center overflow-hidden rounded-2xl bg-[radial-gradient(120%_80%_at_50%_0%,#2a1f10,#0d0b08_60%,#07070a)] px-5 pb-6 pt-8 text-center ring-1 ring-[#d9b46a]/20 transition duration-500 group-hover:ring-[#d9b46a]/60">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9b46a]/70 to-transparent"
                />

                <div
                  aria-hidden="true"
                  className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#d9b46a]/10 blur-3xl transition duration-700 group-hover:bg-[#d9b46a]/25"
                />

                <div className="relative flex items-center gap-1">
                  <Laurel side="l" />
                  <div className="px-1">
                    <p className="text-[9px] font-bold uppercase leading-tight tracking-[0.24em] text-[#d9b46a]">
                      {achievement.laurel}
                    </p>
                  </div>
                  <Laurel side="r" />
                </div>

                <h3 className="relative mt-6 font-display text-[2.1rem] leading-[0.92] tracking-wide text-bone">
                  {achievement.title}
                </h3>

                <p className="relative mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d9b46a]">
                  {achievement.org}
                </p>

                <p className="relative mt-4 text-[13px] leading-relaxed text-bone/70">
                  {achievement.detail}
                </p>

                {achievement.link && (
                  <a
                    href={achievement.link}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="relative mt-auto inline-flex min-h-10 items-center gap-1 pt-5 text-xs font-semibold tracking-wide text-bone underline decoration-[#d9b46a]/60 underline-offset-4 hover:decoration-[#d9b46a]"
                  >
                    View details ↗
                  </a>
                )}
              </article>
            </Tilt>
          </motion.div>
        ))}
      </div>

      <div className="mt-16">
        <div className="gutter mb-2 flex flex-wrap items-end justify-between gap-2">
          <h3 className="font-sans text-lg font-semibold text-bone sm:text-2xl">
            Certifications
            <span className="text-mist"> · {certifications.length} credentials</span>
          </h3>

          <p className="text-xs text-smoke">{issuers.join(' · ')}</p>
        </div>

        <div className="group/rail relative">
          <div
            ref={rail}
            className="rail gutter flex snap-x gap-3 overflow-x-auto py-5"
          >
            {certifications.map((certification, index) => (
              <motion.a
                key={certification.name}
                href={certification.link}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="group relative flex w-[230px] shrink-0 snap-start flex-col justify-between rounded-xl bg-ink-2 p-4 ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-white/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(index, 6) * 0.04,
                  ease: EASE,
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-crimson-2">
                    {certification.issuer}
                  </span>
                  <span className="text-sm text-smoke transition group-hover:text-bone">
                    ↗
                  </span>
                </div>

                <p className="mt-6 text-sm font-medium leading-snug text-bone">
                  {certification.name}
                </p>
              </motion.a>
            ))}
          </div>

          <RailButtons rail={rail} />
        </div>
      </div>
    </>
  );
}
