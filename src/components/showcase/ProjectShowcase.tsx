import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import Particles from './Particles';
import IphoneFrame from './IphoneFrame';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import MobileCarousel from './MobileCarousel';

gsap.registerPlugin(ScrollTrigger);

const COUNT = projects.length;
const SCROLL_PAGES = Math.max(1, COUNT - 1);

interface PhoneStyle {
  x: number;
  y: number;
  z: number;
  scale: number;
  rotateY: number;
  opacity: number;
  blur: number;
}

const SLOTS = {
  center: { x: 0, y: 0, z: 0, scale: 1, rotateY: 0, opacity: 1, blur: 0 },
  left: { x: -320, y: 40, z: -180, scale: 0.88, rotateY: 20, opacity: 0.7, blur: 2 },
  right: { x: 320, y: 40, z: -180, scale: 0.88, rotateY: -20, opacity: 0.7, blur: 2 },
  farLeft: { x: -560, y: 90, z: -460, scale: 0.68, rotateY: 36, opacity: 0, blur: 12 },
  farRight: { x: 560, y: 90, z: -460, scale: 0.68, rotateY: -36, opacity: 0, blur: 12 },
} satisfies Record<string, PhoneStyle>;

function slotForDiff(diff: number): PhoneStyle {
  if (diff <= -2) return SLOTS.farLeft;
  if (diff === -1) return SLOTS.left;
  if (diff === 0) return SLOTS.center;
  if (diff === 1) return SLOTS.right;
  return SLOTS.farRight;
}

function computeStyle(index: number, active: number, ds: number): PhoneStyle {
  const lower = Math.floor(active);
  const frac = active - lower;
  const s1 = slotForDiff(index - lower);
  const s2 = slotForDiff(index - (lower + 1));
  const lerp = (a: number, b: number) => a + (b - a) * frac;
  return {
    x: lerp(s1.x, s2.x) * ds,
    y: lerp(s1.y, s2.y) * ds,
    z: lerp(s1.z, s2.z) * ds,
    scale: lerp(s1.scale, s2.scale),
    rotateY: lerp(s1.rotateY, s2.rotateY),
    opacity: lerp(s1.opacity, s2.opacity),
    blur: lerp(s1.blur, s2.blur),
  };
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shadowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lightRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const techRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const progressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const rafRef = useRef(0);
  const lastActiveRef = useRef(-1);

  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${SCROLL_PAGES * 100}%`,
      pin: true,
      scrub: reduceMotion ? true : 0.6,
      onUpdate: (self) => {
        progressRef.current = self.progress * SCROLL_PAGES;
      },
    });

    const tick = () => {
      const active = progressRef.current;
      const vw = window.innerWidth;
      const ds = vw < 1024 ? 0.72 : vw > 1920 ? 1.15 : 1;
      const reduced = !!reduceMotion;
      const { x: mx, y: my } = mouseRef.current;

      for (let i = 0; i < COUNT; i++) {
        const el = phoneRefs.current[i];
        if (!el) continue;

        const s = computeStyle(i, active, ds);
        const isFront = Math.round(active) === i;
        const tiltX = isFront && !reduced ? my * -7 : 0;
        const tiltY = isFront && !reduced ? mx * 9 : 0;

        el.style.transform =
          `translate3d(-50%,-50%,0) translate3d(${s.x}px,${s.y}px,${s.z}px) scale(${s.scale}) rotateX(${tiltX}deg) rotateY(${s.rotateY + tiltY}deg)`;
        el.style.opacity = String(s.opacity);
        el.style.filter = `blur(${s.blur}px)`;
        el.style.zIndex = String(Math.round((COUNT - Math.abs(i - active)) * 100));

        const shadow = shadowRefs.current[i];
        if (shadow) {
          shadow.style.opacity = String(s.opacity * 0.7);
          shadow.style.filter = `blur(${16 + s.blur * 3}px)`;
        }
      }

      // soft moving light
      if (lightRef.current && !reduced) {
        timeRef.current += 0.004;
        const t = timeRef.current;
        lightRef.current.style.transform =
          `translate3d(${Math.sin(t) * 90}px, ${Math.cos(t * 0.7) * 50}px, 0)`;
      }

      const rounded = Math.round(active);
      if (rounded !== lastActiveRef.current) {
        lastActiveRef.current = rounded;
        setActiveIndex(rounded);
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      st.kill();
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!infoRef.current) return;
    gsap.fromTo(
      infoRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
    );
    techRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.08 + i * 0.05 },
      );
    });
  }, [activeIndex]);

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (reduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      };
    },
    [reduceMotion],
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top <= 0 && rect.bottom >= window.innerHeight * 0.5;
      if (!inView) return;
      const st = ScrollTrigger.getAll()[0];
      if (!st) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const next = Math.min(activeIndex + 1, COUNT - 1);
        window.scrollTo({
          top: st.start + (next / SCROLL_PAGES) * (st.end - st.start),
          behavior: 'smooth',
        });
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = Math.max(activeIndex - 1, 0);
        window.scrollTo({
          top: st.start + (prev / SCROLL_PAGES) * (st.end - st.start),
          behavior: 'smooth',
        });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex]);

  if (isMobile) return <MobileCarousel />;

  const activeProject = projects[Math.min(activeIndex, COUNT - 1)];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#050505]"
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      aria-label="Projects showcase"
    >
      <Particles />
      <Vignette />
      <KeyLight />
      <div
        ref={lightRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-[3] h-[65vh] w-[65vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(130,140,170,0.06) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />
      <ActiveGlow accent={activeProject.accent} active={activeIndex} />

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div
          className="relative h-full w-full"
          style={{ perspective: '1700px', perspectiveOrigin: '50% 40%' }}
        >
          {projects.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => {
                phoneRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-1/2"
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                willChange: 'transform, opacity, filter',
              }}
            >
              <div
                ref={(el) => {
                  shadowRefs.current[i] = el;
                }}
                className="pointer-events-none absolute left-1/2 rounded-full"
                style={{
                  top: 'calc(100% + 14px)',
                  height: 42,
                  width: '72%',
                  transform: 'translateX(-50%)',
                  background: 'radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)',
                }}
                aria-hidden="true"
              />
              <IphoneFrame project={p} />
            </div>
          ))}
        </div>
      </div>

      <InfoPanel
        project={activeProject}
        infoRef={infoRef}
        techRefs={techRefs}
      />
      <ProgressIndicator count={COUNT} active={activeIndex} />
      <HintBar active={activeIndex} total={COUNT} />
    </section>
  );
}

/* ---------- Info panel ---------- */

function InfoPanel({
  project,
  infoRef,
  techRefs,
}: {
  project: (typeof projects)[number];
  infoRef: React.RefObject<HTMLDivElement | null>;
  techRefs: React.RefObject<(HTMLSpanElement | null)[]>;
}) {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-full px-6 pb-20 sm:px-12 sm:pb-14">
      <div
        ref={infoRef}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <div className="flex flex-wrap justify-center gap-2">
          {project.tech.map((t, i) => (
            <span
              key={t}
              ref={(el) => {
                techRefs.current[i] = el;
              }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/60 backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
          {project.description}
        </p>
        <div className="pointer-events-auto mt-5 flex items-center gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            Visit
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors duration-200 hover:bg-white/10"
          >
            <Github className="h-4 w-4" />
            Code
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------- Background helpers ---------- */

function Vignette() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5]"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 36%, rgba(0,0,0,0.72) 100%)',
      }}
      aria-hidden="true"
    />
  );
}

function KeyLight() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-[50vh]"
      style={{
        background:
          'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)',
      }}
      aria-hidden="true"
    />
  );
}

function ActiveGlow({ accent, active }: { accent: string; active: number }) {
  return (
    <div
      key={active}
      className="pointer-events-none absolute left-1/2 top-[38%] z-[2] h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        background: `radial-gradient(circle, ${accent}14 0%, transparent 70%)`,
        filter: 'blur(70px)',
      }}
      aria-hidden="true"
    />
  );
}

/* ---------- UI overlays ---------- */

function ProgressIndicator({ count, active }: { count: number; active: number }) {
  return (
    <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2.5 sm:flex">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-1 rounded-full transition-all duration-500"
          style={{
            width: i === active ? 28 : 14,
            background: i === active ? '#fff' : 'rgba(255,255,255,0.2)',
          }}
        />
      ))}
    </div>
  );
}

function HintBar({ active, total }: { active: number; total: number }) {
  return (
    <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-center">
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/30">
        {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} — Scroll to explore
      </p>
    </div>
  );
}
