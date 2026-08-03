import { Github, Linkedin, Mail } from "lucide-react";
import { NAV_LINKS, SITE } from "../constants/site";

/** Footer — minimal close: logo, links, social, copyright. */
export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-6 sm:grid-cols-[auto_1fr_auto]">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-foreground text-[13px] font-semibold text-background">
            AE
          </span>
          <span className="text-sm font-medium text-foreground">{SITE.name}</span>
        </a>

        <nav aria-label="Footer" className="sm:justify-self-center">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-2 sm:justify-self-end">
          {[
            { icon: Github, href: SITE.github, label: "GitHub" },
            { icon: Linkedin, href: SITE.linkedin, label: "LinkedIn" },
            { icon: Mail, href: `mailto:${SITE.email}`, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
              >
                <Icon size={15} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="mx-auto mt-10 w-full max-w-6xl px-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </p>
    </footer>
  );
}
