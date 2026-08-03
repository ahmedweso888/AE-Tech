import { Section } from "./Section";
import { Reveal } from "./Reveal";
import about from "../assets/ahmed-about.jpeg";

const FACTS = [
  { value: "2+", label: "Years building software" },
  { value: "4+", label: "Projects delivered" },
  { value: "99.9%", label: "Uptime on shipped systems" },
];

/** About — split layout: portrait left, biography right. */
export function About() {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[26px] border border-border bg-surface p-2.5 shadow-card">
            <img
              src={about}
              alt="Ahmed Essam standing in a modern workspace"
              loading="lazy"
              width={854}
              height={1280}
              className="h-auto w-full rounded-[18px] object-cover"
            />
          </div>
        </Reveal>

        <div className="min-w-0">
          <Reveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-accent">
              About
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
              Engineering complete systems, not just screens.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              I&apos;m Ahmed Essam, a full stack software engineer. I design the data model, build
              the API, harden the infrastructure and then craft the interface that sits on top —
              so the product feels coherent from the database all the way to the last pixel.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              My work leans on clear architecture, measurable performance and security by default.
              I care about maintainable code, honest documentation and interfaces that stay calm
              under real-world load.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {FACTS.map((f) => (
                <div key={f.label} className="card-surface p-5">
                  <dt className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                    {f.value}
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{f.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
