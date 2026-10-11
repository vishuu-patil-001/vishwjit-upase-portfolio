
import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import {
  sectionMeta,
  viewerProfiles,
  type ProfileId,
  type SectionId,
} from '../data/portfolio';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { SeriesMark } from './Poster';
import { ProfileAvatar } from './ProfileSelector';
import { EASE } from './fx';

type NavbarProps = {
  order: SectionId[];
  profileId: ProfileId;
  onSwitch: (id: ProfileId) => void;
};

export default function Navbar({
  order,
  profileId,
  onSwitch,
}: NavbarProps) {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [active, setActive] = useState<string>('top');
  const { scrollTo } = useSmoothScroll();
  const menuRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;

    setSolid(y > 40);
    setHidden(y > 400 && y > prev && !menu && !mobileNav);
  });

  useEffect(() => {
    const ids = ['top', ...order];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [order]);

  useEffect(() => {
    if (!menu) return;

    const closeMenu = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenu(false);
      }
    };

    window.addEventListener('pointerdown', closeMenu);

    return () => {
      window.removeEventListener('pointerdown', closeMenu);
    };
  }, [menu]);

  const go = (id: string) => {
    setMobileNav(false);
    setMenu(false);
    scrollTo(`#${id}`, { offset: id === 'top' ? 0 : -64 });
  };

  const current = viewerProfiles.find((profile) => profile.id === profileId);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[60]"
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <div
        className={`gutter flex h-16 items-center justify-between gap-6 transition-[background,backdrop-filter] duration-500 md:h-[72px] ${
          solid || mobileNav
            ? 'bg-ink/80 backdrop-blur-xl'
            : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        {/* V SERIES branding and desktop navigation */}
        <div className="flex items-center gap-8 lg:gap-10">
          <button
            type="button"
            onClick={() => go('top')}
            className="flex items-center gap-2 text-left"
            aria-label="V SERIES — Back to home"
          >
            <SeriesMark />
          </button>

          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Main navigation"
          >
            <NavLink
              label="Home"
              active={active === 'top'}
              onClick={() => go('top')}
            />

            {order.map((id) => (
              <NavLink
                key={id}
                label={sectionMeta[id].nav}
                active={active === id}
                onClick={() => go(id)}
              />
            ))}
          </nav>
        </div>

        {/* Contact, profile selector, and mobile menu */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => go('contact')}
            className="hidden rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-bone transition hover:border-crimson-2 hover:text-crimson-2 sm:block"
          >
            LET&apos;S CONNECT
          </button>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenu((value) => !value)}
              aria-haspopup="menu"
              aria-expanded={menu}
              aria-label={`Viewing as ${current?.name ?? 'visitor'}. Switch profile`}
              className="flex items-center gap-2 rounded-md p-1"
            >
              <ProfileAvatar id={profileId} size="sm" />

              <motion.span
                animate={{ rotate: menu ? 180 : 0 }}
                className="text-[10px] text-mist"
                aria-hidden="true"
              >
                ▼
              </motion.span>
            </button>

            <AnimatePresence>
              {menu && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="absolute right-0 top-12 w-60 origin-top-right rounded-xl border border-white/10 bg-ink-2/95 p-2 shadow-2xl backdrop-blur-xl"
                >
                  <p className="px-3 pb-2 pt-1 text-[10px] font-semibold tracking-[0.24em] text-smoke">
                    EXPLORE PROFILES
                  </p>

                  {viewerProfiles.map((profileOption) => (
                    <button
                      key={profileOption.id}
                      role="menuitem"
                      type="button"
                      onClick={() => {
                        onSwitch(profileOption.id);
                        setMenu(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-white/5 ${
                        profileOption.id === profileId
                          ? 'bg-white/[0.06]'
                          : ''
                      }`}
                    >
                      <ProfileAvatar id={profileOption.id} size="sm" />

                      <span>
                        <span className="block text-sm text-bone">
                          {profileOption.name}
                        </span>

                        <span className="block text-[11px] text-smoke">
                          {profileOption.blurb}
                        </span>
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={mobileNav ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileNav}
            onClick={() => setMobileNav((value) => !value)}
          >
            <motion.span
              className="block h-0.5 w-5 bg-bone"
              animate={{
                rotate: mobileNav ? 45 : 0,
                y: mobileNav ? 4 : 0,
              }}
            />

            <motion.span
              className="block h-0.5 w-5 bg-bone"
              animate={{
                rotate: mobileNav ? -45 : 0,
                y: mobileNav ? -4 : 0,
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {mobileNav && (
          <motion.nav
            aria-label="Mobile navigation"
            className="gutter border-b border-white/5 bg-ink/95 pb-6 pt-2 backdrop-blur-xl lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {[
              { id: 'top', label: 'Home' },
              ...order.map((id) => ({
                id,
                label: sectionMeta[id].nav,
              })),
              { id: 'contact', label: 'Contact' },
            ].map((link, index) => (
              <motion.button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                className={`block w-full py-3 text-left font-display text-3xl tracking-wide ${
                  active === link.id ? 'text-crimson-2' : 'text-bone'
                }`}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavLink({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-[13px] font-medium transition ${
        active ? 'text-bone' : 'text-mist hover:text-bone'
      }`}
    >
      {label}

      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded bg-crimson"
        />
      )}
    </button>
  );
}
