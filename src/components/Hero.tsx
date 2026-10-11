
import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  achievements,
  certifications,
  education,
  profile,
  projects,
  type ProfileId,
} from '../data/portfolio';
import { useFinePointer } from '../hooks/useMedia';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { EASE, Magnetic, Particles } from './fx';
import { SeriesMark } from './Poster';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE },
  },
};

export default function Hero({
  onPlay,
  onResume,
  profileId,
}: {
  onPlay: () => void;
  onResume: () => void;
  profileId: ProfileId;
}) {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const { scrollTo } = useSmoothScroll();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const blackout = useTransform(scrollYProgress, [0.35, 1], [0, 1]);

  // Pointer parallax for desktop devices.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });
  const imgRotY = useTransform(px, [-1, 1], [-4, 4]);
  const imgRotX = useTransform(py, [-1, 1], [3, -3]);
  const imgShiftX = useTransform(px, [-1, 1], [-10, 10]);
  const chipX = useTransform(px, [-1, 1], [18, -18]);
  const chipY = useTransform(py, [-1, 1], [12, -12]);
  const glowX = useTransform(px, [-1, 1], ['-6%', '6%']);

  const meta = [
    '2023 – 2027',
    'B.E. Information Technology',
    `${projects.length} Projects`,
    `${certifications.length} Certifications`,
  ];

  const floating = [
    {
      text: education[0].score,
      sub: 'B.E. Information Technology',
      pos: 'left-[2%] top-[30%]',
      depth: 1,
    },
    {
      text: achievements[0].title,
      sub: 'OpenAI Academy × NxtWave',
      pos: 'right-[0%] top-[18%]',
      depth: -1,
    },
    {
      text: 'JavaScript · Python',
      sub: 'Programming Languages',
      pos: 'right-[4%] bottom-[24%]',
      depth: 0.6,
    },
  ];

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
      onPointerMove={(e) => {
        if (!fine) return;

        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      {/* Cinematic atmosphere */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ x: glowX }}
      >
        <div className="absolute right-[-10%] top-[-10%] h-[90vh] w-[80vw] rounded-full bg-[radial-gradient(closest-side,rgba(229,19,43,0.38),rgba(229,19,43,0.08)_55%,transparent)] blur-2xl lg:right-[-4%] lg:w-[60vw]" />

        <div className="absolute bottom-[-20%] left-[-10%] h-[70vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(90,20,120,0.25),transparent)] blur-2xl" />
      </motion.div>

      <Particles className="z-[1]" />

      <div
        aria-hidden
        className="absolute inset-0 z-[1] overflow-hidden"
      >
        <span
          className="light-streak left-[40%] top-[22%] w-[50vw]"
          style={{ animationDelay: '1.2s' }}
        />
        <span
          className="light-streak left-[30%] top-[64%] w-[40vw]"
          style={{ animationDelay: '3.6s' }}
        />
        <span
          className="light-streak left-[55%] top-[44%] w-[30vw]"
          style={{ animationDelay: '5.2s' }}
        />
      </div>

      {/* Portrait */}
      <motion.div
        className="absolute inset-x-0 top-12 z-[2] flex h-[64svh] items-end justify-center sm:h-[70svh] lg:bottom-0 lg:left-auto lg:right-[3vw] lg:top-20 lg:h-auto lg:w-[54vw] xl:right-[6vw] xl:w-[48vw]"
        style={{ y: imgY, scale: imgScale, opacity: fade }}
      >
        <motion.div
          className="relative h-full w-full lg:h-[86vh]"
          style={{
            rotateY: imgRotY,
            rotateX: imgRotX,
            x: imgShiftX,
            transformPerspective: 1200,
          }}
          initial={{
            clipPath: 'inset(100% -30% -10% -30%)',
            opacity: 0,
          }}
          animate={{
            clipPath: 'inset(-30% -30% -10% -30%)',
            opacity: 1,
          }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.1 }}
        >
          <div
            aria-hidden
            className="absolute bottom-[8%] left-1/2 h-[78%] w-[78%] -translate-x-1/2 rounded-full border border-crimson-2/20 shadow-[0_0_120px_rgba(229,19,43,0.35),inset_0_0_80px_rgba(229,19,43,0.18)]"
          />

          <img
            src={profile.portrait.src}
            srcSet={profile.portrait.srcSet}
            sizes="(max-width: 1024px) 100vw, 54vw"
            alt={profile.portrait.alt}
            className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] [mask-image:linear-gradient(to_bottom,black_62%,transparent_97%)]"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_30%,rgba(255,61,90,0.16),transparent_70%)] mix-blend-screen"
          />

          {/* Floating portfolio details */}
          {floating.map((f, i) => (
            <FloatChip
              key={f.text}
              {...f}
              index={i}
              mx={chipX}
              my={chipY}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Readability gradients */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[40svh] z-[3] h-[36svh] bg-gradient-to-b from-transparent via-ink/70 to-ink lg:hidden"
      />

      <div
        aria-hidden
        className="absolute inset-0 z-[3] hidden bg-[linear-gradient(90deg,var(--color-ink)_0%,rgba(7,7,10,0.7)_32%,transparent_58%)] lg:block"
      />

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[3] h-48 bg-gradient-to-t from-ink to-transparent"
      />

      {/* Hero content */}
      <motion.div
        className="gutter relative z-[4] flex min-h-[100svh] flex-col justify-end pb-16 pt-[54svh] sm:pb-20 lg:max-w-[52vw] lg:justify-center lg:pb-0 lg:pt-24"
        style={{ y: textY, opacity: fade }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-3 text-lg">
          <SeriesMark />
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display leading-[0.82] tracking-[0.02em] text-bone"
          style={{ fontSize: 'clamp(4rem, 12vw, 11rem)' }}
        >
          <span className="shimmer-text">{profile.firstName}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-1 font-sans text-sm font-bold tracking-[0.42em] text-crimson-2 sm:text-base sm:tracking-[0.62em]"
        >
          SOFTWARE ENGINEERING × AI
        </motion.p>

        <motion.p
          variants={item}
          className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-bone/90 sm:text-sm sm:tracking-[0.28em]"
        >
          Software Development Engineer · AI & Generative AI
        </motion.p>

        <motion.div
          variants={item}
          className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-medium text-mist"
        >
          {meta.map((m, i) => (
            <span key={m} className="flex items-center gap-3">
              {i > 0 && (
                <span className="h-1 w-1 rounded-full bg-smoke" />
              )}
              {m}
            </span>
          ))}
        </motion.div>

        <motion.p
          variants={item}
          className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-bone/90 sm:text-xs sm:tracking-[0.34em]"
        >
          {profile.tagline.join(' • ')}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 max-w-xl text-[15px] leading-relaxed text-bone/80 sm:text-base"
        >
          {profile.intro}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <button
              type="button"
              data-cursor="play"
              onClick={onPlay}
              className="flex min-h-12 items-center gap-3 rounded-md bg-bone px-6 py-3 text-[15px] font-bold text-ink transition hover:bg-white sm:px-8"
            >
              <span className="text-lg">▶</span>
              Play Intro
            </button>
          </Magnetic>

          <Magnetic>
            {profileId === 'recruiter' ? (
              <button
                type="button"
                onClick={onResume}
                className="glass flex min-h-12 items-center gap-3 rounded-md px-6 py-3 text-[15px] font-semibold text-bone transition hover:bg-white/15 sm:px-8"
              >
                <span className="text-lg">⤓</span>
                View Resume
              </button>
            ) : (
              <button
                type="button"
                onClick={() => scrollTo('#originals')}
                className="glass flex min-h-12 items-center gap-3 rounded-md px-6 py-3 text-[15px] font-semibold text-bone transition hover:bg-white/15 sm:px-8"
              >
                <span className="text-xl leading-none">＋</span>
                My Work
              </button>
            )}
          </Magnetic>

          <button
            type="button"
            onClick={() => scrollTo('#about')}
            aria-label="More information about me"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-lg text-bone transition hover:border-bone hover:bg-white/10"
          >
            ⓘ
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] bg-ink"
        style={{ opacity: blackout }}
      />
    </section>
  );
}

type MV = ReturnType<typeof useTransform<number, number>>;

function FloatChip({
  text,
  sub,
  pos,
  depth,
  index,
  mx,
  my,
}: {
  text: string;
  sub: string;
  pos: string;
  depth: number;
  index: number;
  mx: MV;
  my: MV;
}) {
  const x = useTransform(mx, (n: number) => n * depth);
  const y = useTransform(my, (n: number) => n * depth);

  return (
    <motion.div
      className={`glass absolute hidden rounded-xl px-4 py-2.5 md:block ${pos}`}
      style={{ x, y }}
      initial={{ opacity: 0, filter: 'blur(6px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{
        duration: 0.9,
        delay: 1.2 + index * 0.18,
        ease: EASE,
      }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 5 + index,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <p className="text-sm font-semibold text-bone">{text}</p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-mist">
          {sub}
        </p>
      </motion.div>
    </motion.div>
  );
}
