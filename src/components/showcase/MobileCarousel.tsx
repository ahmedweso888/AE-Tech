import { Github, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import IphoneFrame from './IphoneFrame';

export default function MobileCarousel() {
  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-16" aria-label="Projects showcase">
      <div className="flex snap-x snap-mandatory items-center gap-8 overflow-x-auto px-8 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {projects.map((p) => (
          <div key={p.id} className="flex w-[78vw] shrink-0 snap-center flex-col items-center">
            <div
              className="relative"
              style={{ boxShadow: `0 40px 80px -20px rgba(0,0,0,0.9), 0 0 60px -20px ${p.accent}33` }}
            >
              <IphoneFrame project={p} />
            </div>
            <div className="mt-6 w-full max-w-[300px] text-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">{p.category}</p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{p.description}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center gap-3">
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
                >
                  Visit <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80"
                >
                  <Github className="h-4 w-4" /> Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[11px] uppercase tracking-[0.3em] text-white/30">Swipe to explore</p>
    </section>
  );
}
