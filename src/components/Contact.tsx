import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { SITE } from "../constants/site";

/** Contact — centered layout with a professional enquiry form. */
export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams({
      subject: `Portfolio enquiry from ${String(data.get("name") ?? "")}`,
      body: `${String(data.get("message") ?? "")}\n\n— ${String(data.get("name") ?? "")} (${String(
        data.get("email") ?? "",
      )})`,
    });
    window.location.href = `mailto:${SITE.email}?${params.toString()}`;
    toast.success("Opening your email client…");
    form.reset();
    setSending(false);
  };

  const field =
    "w-full rounded-[14px] border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-[var(--text-subtle)] shadow-soft transition-colors duration-300 focus:border-accent focus:outline-none";

  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-3xl px-6 text-center">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Contact
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">
            Let&apos;s build something solid.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Tell me about the product, the constraints and the timeline — I&apos;ll reply with a
            clear plan.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <form onSubmit={onSubmit} className="mt-12 text-left">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-muted-foreground">
                  Name
                </label>
                <input id="name" name="name" required className={field} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-muted-foreground">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={field}
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="message" className="mb-2 block text-sm text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className={`${field} resize-none`}
                placeholder="What are you building?"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-[var(--shadow-accent)] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
            >
              <Send size={15} />
              Send message
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.2}>
          <ul className="mt-14 grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
            {[
              { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
              {
                icon: Phone,
                label: "Phone",
                value: SITE.phone,
                href: `tel:${SITE.phone.replace(/\s/g, "")}`,
              },
              
            ].map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="flex items-center gap-3 rounded-[18px] border border-border bg-surface p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[11px] bg-[var(--accent-soft)] text-accent">
                    <Icon size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground">01122062692</span>
                    <span className="block truncate text-sm text-foreground">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={14} />
            {SITE.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
