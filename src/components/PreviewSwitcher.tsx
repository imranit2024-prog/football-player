import { useEffect, useState } from 'react';
import { Layers, X, User, Users, Search, Building2, Briefcase, ShieldCheck, LayoutDashboard, ChevronUp, type LucideIcon } from 'lucide-react';
import { ROLES, useApp, type Role } from '../store';
import { ClearingMark, JobPlusMark, cn } from './ui';
import { ROLE_META } from '../data/mock';

export const ROLE_ICONS: Record<Role, LucideIcon> = {
  player: User, guardian: Users, clubUser: Search, clubAdmin: Building2, employer: Briefcase, ppm: ShieldCheck, admin: LayoutDashboard,
};

export function PreviewSwitcher() {
  const { mode, brand, role, page, screen, go, openDashboard } = useApp();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [mode, brand, role, page, screen]);
  const label = mode === 'dashboard' ? ROLE_META[role].label + ' dashboard' : brand === 'jobplus' ? 'Job+ website' : 'Clearing+ website';

  return (
    <div className="fixed bottom-4 left-4 z-[90]">
      {open && (
        <>
          <div className="fixed inset-0" onClick={() => setOpen(false)} />
          <div className="absolute bottom-16 left-0 w-[min(92vw,360px)] animate-scale-in overflow-hidden rounded-3xl border border-white/10 bg-navy text-white shadow-2xl shadow-navy/40">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[.18em] text-lime">Prototype navigator</div>
                <div className="mt-0.5 text-xs text-white/50">Frontend-only UI preview · static demo data</div>
              </div>
              <button onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10" aria-label="Close navigator"><X className="h-4 w-4" /></button>
            </div>
            <div className="dark-scroll max-h-[68vh] overflow-y-auto p-3">
              <div className="px-2 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Websites</div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => go('home', 'clearing')} className={cn('flex items-center gap-2.5 rounded-2xl p-3 text-left ring-1 transition', mode === 'public' && brand === 'clearing' ? 'bg-white/10 ring-lime/60' : 'ring-white/10 hover:bg-white/5')}>
                  <ClearingMark size={28} />
                  <div className="min-w-0"><div className="text-sm font-semibold">Clearing+</div><div className="truncate text-[11px] text-white/45">clearingplus.com</div></div>
                </button>
                <button onClick={() => go('home', 'jobplus')} className={cn('flex items-center gap-2.5 rounded-2xl p-3 text-left ring-1 transition', mode === 'public' && brand === 'jobplus' ? 'bg-white/10 ring-aqua/60' : 'ring-white/10 hover:bg-white/5')}>
                  <JobPlusMark size={28} />
                  <div className="min-w-0"><div className="text-sm font-semibold">Job+</div><div className="truncate text-[11px] text-white/45">jobplus.academy</div></div>
                </button>
              </div>
              <div className="px-2 pb-2 pt-4 text-[11px] font-semibold uppercase tracking-wider text-white/40">Role dashboards</div>
              <div className="grid gap-1">
                {ROLES.map((r) => {
                  const I = ROLE_ICONS[r];
                  const m = ROLE_META[r];
                  const active = mode === 'dashboard' && role === r;
                  return (
                    <button key={r} onClick={() => openDashboard(r)} className={cn('flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition', active ? 'bg-lime text-navy' : 'hover:bg-white/5')}>
                      <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-lg', active ? 'bg-navy/10' : r === 'employer' ? 'bg-teal/20 text-aqua' : 'bg-white/5')}><I className="h-4 w-4" /></span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">{m.label}</span>
                        <span className={cn('block truncate text-[11px]', active ? 'text-navy/60' : 'text-white/45')}>{m.name} · {m.desc}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 rounded-xl bg-white/5 px-3 py-2.5 text-[11px] leading-relaxed text-white/45">No real authentication, payments or APIs — every interaction runs on local React state.</div>
            </div>
          </div>
        </>
      )}
      <button onClick={() => setOpen((o) => !o)} className="relative flex items-center gap-2.5 rounded-full bg-navy py-2 pl-2 pr-2 text-white shadow-2xl shadow-navy/30 ring-1 ring-white/15 transition hover:ring-lime/60 sm:pr-4">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-lime text-navy"><Layers className="h-4 w-4" /></span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-white/50">Preview</span>
          <span className="block text-[13px] font-semibold">{label}</span>
        </span>
        <ChevronUp className={cn('mr-1 hidden h-4 w-4 text-white/50 transition sm:block', !open && 'rotate-180')} />
      </button>
    </div>
  );
}
