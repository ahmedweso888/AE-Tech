import { Award } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { CERTIFICATES } from "../constants/content";

/** Certificates — minimal credential cards. */
export function Certificates() {
  return (
    <Section id="certificates" eyebrow="Certificates" title="Credentials">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CERTIFICATES.map((cert, i) => (
          <Reveal as="li" key={cert.title} delay={(i % 2) * 0.06}>
            <div className="flex h-full items-start gap-4 rounded-[20px] border border-border bg-surface p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[var(--accent-soft)] text-accent">
                <Award size={18} />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-medium tracking-[-0.01em] text-foreground">
                  {cert.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cert.provider} · {cert.date}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
