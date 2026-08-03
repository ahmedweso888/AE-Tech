import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { EXPERIENCE } from "../constants/content";

/** Experience — vertical timeline, animated on scroll. */
export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've built"
      lead="Roles across product engineering, backend systems and interface work."
    >
      <ol className="relative ml-1 border-l border-border pl-8 sm:pl-10">
        {EXPERIENCE.map((item, i) => (
          <Reveal as="li" key={item.company} delay={i * 0.08} className="relative pb-12 last:pb-0">
            <span className="absolute -left-[41px] top-1.5 grid h-[18px] w-[18px] place-items-center rounded-full border border-border bg-surface shadow-soft sm:-left-[49px]">
              <span className="h-2 w-2 rounded-full bg-accent" />
            </span>

            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:flex-wrap sm:items-baseline sm:justify-between">
              <h3 className="min-w-0 truncate text-lg font-semibold tracking-[-0.02em] text-foreground">
                {item.position}
              </h3>
              <span className="shrink-0 text-xs text-muted-foreground">{item.period}</span>
            </div>
            <p className="mt-1 text-sm font-medium text-accent">{item.company}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
