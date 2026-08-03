import ProjectShowcase from "./showcase/ProjectShowcase";
import { Reveal } from "./Reveal";

/** Showcase — device-framed walkthrough of the same work, scroll-driven. */
export function Showcase() {
  return (
    <section id="showcase" aria-label="Project showcase" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-6 pb-14 pt-8">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Projects
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
Production systems built end to end — architecture, APIs, data and interface.
          </h2>
        </Reveal>
      </div>
      <ProjectShowcase />
    </section>
  );
}
