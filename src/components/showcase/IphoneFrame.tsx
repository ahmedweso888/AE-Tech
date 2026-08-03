import { memo } from 'react';
import type { Project } from '@/data/projects';

interface IphoneFrameProps {
  project: Project;
  className?: string;
}

const FRAME_W = 286;
const FRAME_H = 600;

function IphoneFrame({ project, className = '' }: IphoneFrameProps) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: FRAME_W, height: FRAME_H }}
    >
      {/* side buttons — left */}
      <div
        className="absolute -left-[3px] rounded-l-sm"
        style={{ top: 118, width: 4, height: 32, background: 'linear-gradient(90deg,#1a1a1c,#3a3a3c)' }}
      />
      <div
        className="absolute -left-[3px] rounded-l-sm"
        style={{ top: 168, width: 4, height: 58, background: 'linear-gradient(90deg,#1a1a1c,#3a3a3c)' }}
      />
      <div
        className="absolute -left-[3px] rounded-l-sm"
        style={{ top: 238, width: 4, height: 58, background: 'linear-gradient(90deg,#1a1a1c,#3a3a3c)' }}
      />
      {/* side buttons — right (power) */}
      <div
        className="absolute -right-[3px] rounded-r-sm"
        style={{ top: 178, width: 4, height: 92, background: 'linear-gradient(270deg,#1a1a1c,#3a3a3c)' }}
      />

      {/* titanium frame */}
      <div
        className="relative h-full w-full"
        style={{
          borderRadius: 52,
          padding: 5,
          background:
            'linear-gradient(135deg,#5a5a5e 0%,#2a2a2c 18%,#646468 38%,#232325 58%,#525254 78%,#2c2c2e 100%)',
          boxShadow:
            'inset 0 0 0 1px rgba(255,255,255,0.18), inset 2px 3px 8px rgba(255,255,255,0.10), inset -2px -3px 8px rgba(0,0,0,0.6)',
        }}
      >
        {/* bezel */}
        <div
          className="relative h-full w-full overflow-hidden bg-black"
          style={{ borderRadius: 47 }}
        >
          {/* screen */}
          <Screen project={project} />
        </div>
      </div>
    </div>
  );
}

function Screen({ project }: { project: Project }) {
  return (
    <>
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* color wash + depth gradient so it reads as a screen, not a photo */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${project.accent}22 0%, transparent 45%, rgba(0,0,0,0.55) 100%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />

      {/* status bar */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pt-3 text-white">
        <span className="text-[13px] font-semibold tracking-tight">9:41</span>
        <div className="flex items-center gap-1.5">
          {/* signal */}
          <div className="flex items-end gap-[2px]">
            <span className="block h-[5px] w-[3px] rounded-[1px] bg-white/90" />
            <span className="block h-[7px] w-[3px] rounded-[1px] bg-white/90" />
            <span className="block h-[9px] w-[3px] rounded-[1px] bg-white/90" />
            <span className="block h-[11px] w-[3px] rounded-[1px] bg-white/90" />
          </div>
          {/* wifi */}
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none" className="text-white/90">
            <path
              d="M8 9.5a1.2 1.2 0 100 .01M3.2 5.4a7 7 0 019.6 0M.8 2.6a10.5 10.5 0 0114.4 0"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="8" cy="9.4" r="1" fill="currentColor" />
          </svg>
          {/* battery */}
          <div className="relative flex h-[12px] w-[24px] items-center rounded-[3px] border border-white/50 px-[1.5px]">
            <span className="block h-[8px] w-[17px] rounded-[1.5px] bg-white/90" />
            <span className="absolute -right-[3px] block h-[4px] w-[2px] rounded-r bg-white/50" />
          </div>
        </div>
      </div>

      {/* dynamic island */}
      <div
        className="absolute left-1/2 top-[11px] z-30 flex h-[27px] w-[94px] -translate-x-1/2 items-center justify-end rounded-[14px] bg-black pr-2"
        style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.04)' }}
      >
        <span className="block h-[7px] w-[7px] rounded-full bg-[#0a0a14]" style={{ boxShadow: 'inset 0 0 0 1px rgba(80,90,140,0.5)' }} />
      </div>

      {/* glass diagonal sheen */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(125deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 18%, transparent 38%, transparent 62%, rgba(255,255,255,0.05) 82%, rgba(255,255,255,0.12) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, transparent 12%)',
        }}
      />

      {/* project title at bottom of screen */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
          {project.category}
        </p>
        <h4 className="mt-1 text-lg font-semibold tracking-tight text-white">{project.title}</h4>
      </div>
    </>
  );
}

export default memo(IphoneFrame);
