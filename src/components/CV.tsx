import type { ReactNode } from 'react';
import { BadgeCheck, Mail, Phone, MapPin, Check } from 'lucide-react';
import { CV_SAMPLE, SKILL_MAP } from '../data/mock';
import { cn } from '../utils/cn';

export type CVData = typeof CV_SAMPLE;

function Sec({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-7">
      <div className="mb-3 flex items-center gap-3">
        <span className="text-[11px] font-bold uppercase tracking-[.18em] text-slate-400">{title}</span>
        <span className="h-px flex-1 bg-stone" />
      </div>
      {children}
    </div>
  );
}

export function CVDocument({ data, highlight, className }: { data?: Partial<CVData>; highlight?: boolean; className?: string }) {
  const d = { ...CV_SAMPLE, ...data };
  return (
    <div className={cn('mx-auto w-full max-w-[760px] overflow-hidden rounded-2xl bg-white text-ink shadow-[0_30px_80px_-30px_rgba(15,20,25,.35)] ring-1 ring-stone', className)}>
      <div className="grid sm:grid-cols-[1fr_220px]">
        <div className="p-6 sm:p-9">
          <div className="text-[11px] font-bold uppercase tracking-[.2em] text-teal">Curriculum Vitae</div>
          <h2 className="mt-2 font-jakarta text-3xl font-extrabold tracking-tight">{d.name}</h2>
          <div className="mt-1 text-[15px] font-semibold text-slate-600">{d.title}</div>
          <Sec title="Profile">
            <p className={cn('text-[13.5px] leading-relaxed text-slate-700', highlight && '-m-2 rounded-lg bg-amber-50 p-2 ring-1 ring-amber-200')}>{d.summary}</p>
          </Sec>
          <Sec title="Experience">
            {d.experience.map((e) => (
              <div key={e.role} className="mb-5 last:mb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <div className="text-sm font-bold">{e.role}</div>
                  <div className="text-xs font-medium text-slate-500">{e.period}</div>
                </div>
                <div className="text-[13px] font-semibold text-teal-dark">{e.org}</div>
                <ul className="mt-2 space-y-1.5">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-700"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Sec>
          <Sec title="Education">
            {d.education.map((e) => (
              <div key={e.q} className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 last:mb-0">
                <div><div className="text-[13.5px] font-semibold">{e.q}</div><div className="text-xs text-slate-500">{e.org}</div></div>
                <div className="text-xs font-medium text-slate-500">{e.year}</div>
              </div>
            ))}
          </Sec>
        </div>
        <aside className="border-t border-stone bg-sand/70 p-6 sm:border-l sm:border-t-0 sm:p-7">
          <div className="space-y-2.5 text-[12.5px] text-slate-600">
            <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-teal" />{d.location}</div>
            <div className="flex items-center gap-2 break-all"><Mail className="h-3.5 w-3.5 shrink-0 text-teal" />{d.email}</div>
            <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-teal" />{d.phone}</div>
          </div>
          <div className="mt-7 text-[11px] font-bold uppercase tracking-[.18em] text-slate-400">Key skills</div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {d.skills.map((s) => <span key={s} className="rounded-full bg-white px-2.5 py-1 text-[11.5px] font-semibold text-ink ring-1 ring-stone">{s}</span>)}
          </div>
          <div className="mt-7 text-[11px] font-bold uppercase tracking-[.18em] text-slate-400">Certifications</div>
          <ul className="mt-3 space-y-2">
            {d.certs.map((c) => <li key={c} className="flex gap-2 text-[12.5px] text-slate-700"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" />{c}</li>)}
          </ul>
          <div className="mt-7 rounded-xl bg-white p-3 ring-1 ring-stone">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700"><BadgeCheck className="h-3.5 w-3.5" /> Reviewed by a Clearing+ PPM</div>
            <div className="mt-1 text-[11px] text-slate-500">References available on request</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function SkillsProfile({ name = CV_SAMPLE.name, className }: { name?: string; className?: string }) {
  return (
    <div className={cn('mx-auto w-full max-w-[760px] overflow-hidden rounded-2xl bg-ink text-white shadow-2xl', className)}>
      <div className="relative p-6 sm:p-9">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(92,225,208,.22),transparent_55%)]" />
        <div className="relative">
          <div className="text-[11px] font-bold uppercase tracking-[.2em] text-aqua">Football-to-Workplace Skills Profile</div>
          <h2 className="mt-2 font-jakarta text-3xl font-extrabold tracking-tight">{name}</h2>
          <p className="mt-1 text-sm text-white/60">How eight years of academy football translate into workplace strengths.</p>
        </div>
      </div>
      <div className="space-y-3 px-6 pb-8 sm:px-9">
        {SKILL_MAP.map((s) => (
          <div key={s.work} className="rounded-xl bg-white/[0.05] p-4 ring-1 ring-white/10">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-[13px] text-white/55">{s.football}</div>
              <div className="text-sm font-bold">{s.work}</div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-teal to-aqua" style={{ width: `${s.score}%` }} /></div>
              <span className="w-8 text-right text-xs font-bold tabular-nums text-aqua">{s.score}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-[11px] text-white/45 sm:px-9">Scores reflect PPM-reviewed evidence from the candidate's football career. Illustrative sample.</div>
    </div>
  );
}

export const CV_FLOW = ['Candidate Form', 'AI Draft Preview', 'PPM Human Review', 'Candidate Approval', 'Published Profile'];
export function CVWorkflow({ current, dark }: { current: number; dark?: boolean }) {
  return (
    <ol className="grid grid-cols-5 gap-1 sm:gap-2">
      {CV_FLOW.map((s, i) => (
        <li key={s} className="flex flex-col items-center gap-2 text-center">
          <div className="relative flex w-full items-center">
            {i > 0 && <span className={cn('absolute right-1/2 top-1/2 h-0.5 w-full -translate-y-1/2', i <= current ? 'bg-teal' : dark ? 'bg-white/15' : 'bg-stone')} />}
            <span className={cn('relative z-10 mx-auto grid h-9 w-9 place-items-center rounded-full text-xs font-bold transition',
              i < current ? 'bg-teal text-white' : i === current ? (dark ? 'bg-aqua text-ink ring-4 ring-aqua/25' : 'bg-ink text-aqua ring-4 ring-teal/20') : dark ? 'bg-white/10 text-white/50' : 'bg-white text-slate-400 ring-1 ring-stone')}>
              {i < current ? <Check className="h-4 w-4" /> : i + 1}
            </span>
          </div>
          <span className={cn('text-[10.5px] font-semibold leading-tight sm:text-xs', i <= current ? (dark ? 'text-white' : 'text-ink') : dark ? 'text-white/40' : 'text-slate-400')}>{s}</span>
        </li>
      ))}
    </ol>
  );
}
