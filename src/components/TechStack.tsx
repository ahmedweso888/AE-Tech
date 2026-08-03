import { Cloud, Database, LayoutGrid, Server, Wrench } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { TECH_STACK } from "../constants/content";

const ICONS = {
  layout: LayoutGrid,
  server: Server,
  database: Database,
  cloud: Cloud,
  wrench: Wrench,
} as const;

/** TechStack — categorized capability cards. */
export function TechStack() {
  return (
    <Section
      id="stack"
      eyebrow="Tech Stack"
      title="The tools I reach for"
      lead="A stack chosen for reliability and speed of delivery — across the browser, the server, the database and the cloud."
    >
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TECH_STACK.map((cat, i) => {
          const Icon = ICONS[cat.icon];
          return (
            <Reveal as="li" key={cat.id} delay={i * 0.06}>
              <div className="group h-full rounded-[22px] border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-card">
                <span className="mb-5 inline-grid h-11 w-11 place-items-center rounded-[14px] bg-[var(--accent-soft)] text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon size={19} />
                </span>
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                  {cat.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
