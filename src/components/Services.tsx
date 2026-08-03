import { Code2, Database, Globe, Layers, Plug, Sparkles } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { SERVICES } from "../constants/content";

const ICONS = {
  code: Code2,
  layers: Layers,
  plug: Plug,
  database: Database,
  globe: Globe,
  sparkles: Sparkles,
} as const;

/** Services — what I take on, in plain terms. */
export function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="How I can help"
      lead="From a blank repository to a maintained platform in production."
    >
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => {
          const Icon = ICONS[service.icon];
          return (
            <Reveal as="li" key={service.title} delay={i * 0.05}>
              <div className="group h-full rounded-[22px] border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <span className="mb-5 inline-grid h-10 w-10 place-items-center rounded-[12px] bg-[rgba(17,17,17,0.04)] text-foreground transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon size={18} />
                </span>
                <h3 className="text-base font-semibold tracking-[-0.02em] text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
