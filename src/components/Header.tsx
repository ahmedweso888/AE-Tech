import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "../constants/site";
import logo from "../assets/ae-logo.png";

/** Header — floating glass pill, sticky, with an active section indicator. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
      <header
        className={`pointer-events-auto w-full max-w-4xl rounded-full transition-all duration-500 ${
          scrolled
            ? "glass-nav border border-border shadow-float"
            : "border border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="flex h-14 w-full items-center justify-between gap-3 pl-3 pr-2.5"
        >
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-foreground">
              <img
                src={logo}
                alt=""
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="hidden truncate text-sm font-medium tracking-[-0.01em] text-foreground sm:block">
              {SITE.name}
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id} className="relative">
                <a
                  href={`#${link.id}`}
                  className={`relative block rounded-full px-3.5 py-2 text-sm transition-colors duration-300 ${
                    active === link.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-[rgba(17,17,17,0.06)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex items-center rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform duration-300 hover:-translate-y-0.5"
            >
              Get in touch
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-foreground md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>

        {open && (
          <div className="glass-nav mt-1 rounded-[26px] border border-border px-3 py-2 md:hidden">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-full px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-[rgba(17,17,17,0.04)] hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}
