import { ArrowUpRight, Github } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { PROJECTS } from "../constants/content";

/** Projects — premium preview cards with lift, zoom and button motion. */
export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      lead="Production systems built end to end — architecture, APIs, data and interface."
    >
      <ul className="grid grid-cols-1 gap-7 md:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <Reveal as="li" key={project.id} delay={(i % 2) * 0.08}>
            <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-border bg-surface shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-float">
              <div className="overflow-hidden bg-[#f2f4f8]">
                <img
                  src={project.image}
                  alt={`${project.title} interface preview`}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="h-56 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-[rgba(17,17,17,0.04)] px-3 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-3 pt-1">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      Live Demo
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
                  >
                    <Github size={15} />
                    GitHub
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
