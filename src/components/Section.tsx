import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}

/** Section — consistent rhythm, spacing and heading hierarchy site-wide. */
export function Section({ id, eyebrow, title, lead, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-24 sm:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-6">
        {(eyebrow || title || lead) && (
          <header className="mb-14 max-w-2xl">
            {eyebrow && (
              <Reveal>
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-accent">
                  {eyebrow}
                </p>
              </Reveal>
            )}
            {title && (
              <Reveal delay={0.05}>
                <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
                  {title}
                </h2>
              </Reveal>
            )}
            {lead && (
              <Reveal delay={0.1}>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {lead}
                </p>
              </Reveal>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
