import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { HandwrittenName } from "./HandwrittenName";
import { SITE } from "../constants/site";
import portrait from "../assets/ahmed-portrait.png";

/** Hero — full-screen opening: handwritten name, role, description, CTAs, photo. */
export function Hero() {
  const reduced = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 90, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 90, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !wrap.current) return;
    const r = wrap.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 6);
    rx.set(-py * 6);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const fade = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 16, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="top" className="relative flex min-h-svh items-center pt-28 pb-16 sm:pt-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="min-w-0">
          <motion.p
            {...fade(0.05)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground shadow-soft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Available for new projects
          </motion.p>

          <h1 className="mb-5">
            <span className="sr-only">
              {SITE.name} — {SITE.role}
            </span>
            <span aria-hidden="true">
              <HandwrittenName text={SITE.name} />
            </span>
          </h1>

          <motion.p
            {...fade(2.7)}
            className="text-xl font-medium tracking-[-0.02em] text-foreground sm:text-2xl"
          >
            {SITE.role}
          </motion.p>

          <motion.p
            {...fade(2.9)}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {SITE.tagline}
          </motion.p>

          <motion.div {...fade(3.05)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-[var(--shadow-accent)] transition-all duration-300 hover:-translate-y-0.5"
            >
              View My Projects
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="/cv-ahmed-essam.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-6 py-3 text-sm font-medium text-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
            >
              <Download size={16} />
              Download CV
            </a>
          </motion.div>
        </div>

        <motion.div
          ref={wrap}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          {...fade(0.2)}
          className="relative mx-auto w-full max-w-md [perspective:1200px]"
        >
          <motion.div
            style={{ rotateX: rx, rotateY: ry }}
            className="relative rounded-[28px] border border-border bg-surface p-3 shadow-float"
          >
            <img
              src={portrait}
              alt="Portrait of Ahmed Essam, full stack software engineer"
              width={658}
              height={800}
              className="h-auto w-full rounded-[20px] object-cover"
            />
            <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-3">
              <span className="truncate text-sm font-medium text-foreground">{SITE.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground">{SITE.location}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
