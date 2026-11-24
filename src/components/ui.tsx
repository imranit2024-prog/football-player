import {
  useEffect, useMemo, useRef, useState,
  type ButtonHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes, type ReactNode,
  type SelectHTMLAttributes, type TextareaHTMLAttributes,
} from 'react';
import {
  X, Check, Search, ChevronLeft, ChevronRight, ArrowUpDown, UploadCloud, FileText, Inbox,
  CheckCircle2, AlertCircle, Info, Plus, type LucideIcon,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useApp } from '../store';
import { Sparkline } from './charts';
import { CLAIM_STAGES } from '../data/mock';

export { cn };

/* ------------------------------------------------------------------ Button */
const BTN = {
  lime: 'bg-lime text-navy hover:bg-[#c6f86d] shadow-[0_10px_30px_-12px_rgba(182,242,75,.8)]',
  navy: 'bg-navy text-white hover:bg-deep',
  white: 'bg-white text-navy hover:bg-mist',
  glass: 'border border-white/20 bg-white/5 text-white backdrop-blur hover:bg-white/15',
  outline: 'border border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  teal: 'bg-teal text-white hover:bg-teal-dark shadow-[0_10px_30px_-14px_rgba(13,158,151,.9)]',
  ink: 'bg-ink text-white hover:bg-black',
  danger: 'bg-rose-600 text-white hover:bg-rose-700',
  soft: 'bg-slate-100 text-slate-800 hover:bg-slate-200',
  brand: 'bg-[var(--brand)] text-white hover:opacity-90',
};
const SIZE = {
  xs: 'h-7 px-2.5 text-xs gap-1.5',
  sm: 'h-9 px-3.5 text-[13px] gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-[15px] gap-2',
  xl: 'h-14 px-7 text-base gap-2.5',
};
type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof BTN; size?: keyof typeof SIZE; icon?: ReactNode; iconRight?: ReactNode };
export function Button({ variant = 'navy', size = 'md', icon, iconRight, className, children, type = 'button', ...rest }: BtnProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
        BTN[variant], SIZE[size], className,
      )}
      {...rest}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
}

/* ------------------------------------------------------------------ Badge */
const TONE = {
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15',
  amber: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  red: 'bg-rose-50 text-rose-700 ring-rose-600/15',
  blue: 'bg-sky-50 text-sky-700 ring-sky-600/15',
  violet: 'bg-violet-50 text-violet-700 ring-violet-600/15',
  teal: 'bg-teal-50 text-teal-700 ring-teal-600/20',
  lime: 'bg-lime/30 text-[#3c5a07] ring-lime-dark/25',
  slate: 'bg-slate-100 text-slate-600 ring-slate-500/15',
  navy: 'bg-navy text-white ring-navy',
};
const DOT = { green: 'bg-emerald-500', amber: 'bg-amber-500', red: 'bg-rose-500', blue: 'bg-sky-500', violet: 'bg-violet-500', teal: 'bg-teal-500', lime: 'bg-lime-dark', slate: 'bg-slate-400', navy: 'bg-lime' };
export type Tone = keyof typeof TONE;
const STATUS: Record<string, Tone> = {
  Verified: 'green', Approved: 'green', Active: 'green', Paid: 'green', Published: 'green', Live: 'green', Confirmed: 'green', Resolved: 'green',
  Completed: 'green', Accepted: 'green', 'Available now': 'green', Charged: 'green', Started: 'green', Uploaded: 'green', Granted: 'green',
  Placement: 'lime', Placed: 'lime', Hired: 'lime', Founding: 'lime',
  Submitted: 'blue', Open: 'blue', Introduced: 'blue', Scheduled: 'blue', Sent: 'blue', New: 'blue',
  'PPM Review': 'amber', Pending: 'amber', 'In review': 'amber', Investigating: 'amber', Due: 'amber', Interviewing: 'amber', Paused: 'amber',
  'Candidate Approval': 'amber', 'AI Draft': 'amber', 'Outcome pending': 'amber', 'Pending PPM review': 'amber', 'In discussions': 'amber',
  'Available from July': 'blue', Medium: 'amber', 'Awaiting candidate': 'amber', 'Not yet charged': 'amber',
  Trial: 'violet', Offer: 'violet', 'Player Discussion': 'teal',
  Rejected: 'red', Expired: 'red', Failed: 'red', Suspended: 'red', Overdue: 'red', High: 'red', Declined: 'red',
  Withdrawn: 'slate', Refunded: 'slate', Draft: 'slate', Closed: 'slate', Low: 'slate', 'Not charged': 'slate', 'n/a': 'slate', Unassigned: 'slate',
};
export function Badge({ children, tone, dot = true, className }: { children: ReactNode; tone?: Tone; dot?: boolean; className?: string }) {
  const t: Tone = tone ?? STATUS[String(children)] ?? 'slate';
  return (
    <span className={cn('inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset', TONE[t], className)}>
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', DOT[t])} />}
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ Layout */
export function Card({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]', className)} {...rest}>{children}</div>;
}
export function CardHeader({ title, desc, action, className }: { title: ReactNode; desc?: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-start justify-between gap-3 px-5 pt-5 sm:px-6 sm:pt-6', className)}>
      <div className="min-w-0">
        <h3 className="font-display text-[15px] font-bold text-slate-900">{title}</h3>
        {desc && <p className="mt-0.5 text-[13px] text-slate-500">{desc}</p>}
      </div>
      {action}
    </div>
  );
}
export function PageHeader({ title, desc, actions, eyebrow }: { title: ReactNode; desc?: ReactNode; actions?: ReactNode; eyebrow?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-slate-400">{eyebrow}</div>}
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[28px]">{title}</h1>
        {desc && <p className="mt-1 max-w-2xl text-sm text-slate-500">{desc}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
const ICON_TONE = {
  navy: 'bg-navy text-lime', lime: 'bg-lime/35 text-navy', teal: 'bg-teal/10 text-teal', amber: 'bg-amber-50 text-amber-600',
  rose: 'bg-rose-50 text-rose-600', sky: 'bg-sky-50 text-sky-600', violet: 'bg-violet-50 text-violet-600', emerald: 'bg-emerald-50 text-emerald-600', ink: 'bg-ink text-aqua',
};
export function StatCard({ label, value, delta, up = true, icon: Icon, spark, tone = 'navy', hint, sparkColor }: {
  label: string; value: ReactNode; delta?: string; up?: boolean; icon?: LucideIcon; spark?: number[]; tone?: keyof typeof ICON_TONE; hint?: string; sparkColor?: string;
}) {
  return (
    <Card className="group relative overflow-hidden p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60">
      <div className="flex items-start justify-between gap-3">
        <div className="text-[13px] font-medium text-slate-500">{label}</div>
        {Icon && <div className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl', ICON_TONE[tone])}><Icon className="h-[18px] w-[18px]" /></div>}
      </div>
      <div className="mt-2 font-display text-[26px] font-extrabold tracking-tight text-slate-900 sm:text-[28px]">{value}</div>
      <div className="mt-1 flex items-end justify-between gap-2">
        {delta ? (
          <span className={cn('inline-flex items-center gap-1 text-xs font-semibold', up ? 'text-emerald-600' : 'text-rose-600')}>{up ? '▲' : '▼'} {delta}</span>
        ) : (
          <span className="text-xs text-slate-400">{hint}</span>
        )}
        {spark && <Sparkline data={spark} color={sparkColor} width={84} height={28} />}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ Overlays */
function useLockScroll(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', h);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
}
const MODAL_SIZE = { sm: 'sm:max-w-md', md: 'sm:max-w-xl', lg: 'sm:max-w-3xl', xl: 'sm:max-w-5xl' };
export function Modal({ open, onClose, title, subtitle, children, footer, size = 'md' }: {
  open: boolean; onClose: () => void; title?: ReactNode; subtitle?: ReactNode; children: ReactNode; footer?: ReactNode; size?: keyof typeof MODAL_SIZE;
}) {
  useLockScroll(open, onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 animate-fade-in bg-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('relative flex max-h-[92vh] w-full animate-scale-in flex-col rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl', MODAL_SIZE[size])}>
        {title && (
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <h3 className="font-display text-lg font-extrabold tracking-tight text-slate-900">{title}</h3>
              {subtitle && <p className="mt-0.5 text-[13px] text-slate-500">{subtitle}</p>}
            </div>
            <button onClick={onClose} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close"><X className="h-5 w-5" /></button>
          </div>
        )}
        <div className="thin-scroll overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
        {footer && <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 px-5 py-4 sm:px-6">{footer}</div>}
      </div>
    </div>
  );
}
export function Drawer({ open, onClose, title, subtitle, children, footer, wide }: {
  open: boolean; onClose: () => void; title?: ReactNode; subtitle?: ReactNode; children: ReactNode; footer?: ReactNode; wide?: boolean;
}) {
  useLockScroll(open, onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 animate-fade-in bg-navy/50 backdrop-blur-[2px]" onClick={onClose} />
      <aside className={cn('absolute inset-y-0 right-0 flex w-full animate-slide-left flex-col bg-white shadow-2xl', wide ? 'max-w-3xl' : 'max-w-xl')}>
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h3 className="font-display text-lg font-extrabold tracking-tight text-slate-900">{title}</h3>
            {subtitle && <div className="mt-0.5 text-[13px] text-slate-500">{subtitle}</div>}
          </div>
          <button onClick={onClose} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        <div className="thin-scroll flex-1 overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
        {footer && <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 px-5 py-4 sm:px-6">{footer}</div>}
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ Tabs & accordion */
export function Tabs({ tabs, value, onChange, className, variant = 'line' }: {
  tabs: { key: string; label: string; count?: number }[]; value: string; onChange: (k: string) => void; className?: string; variant?: 'line' | 'pill';
}) {
  if (variant === 'pill')
    return (
      <div className={cn('no-scrollbar inline-flex max-w-full overflow-x-auto rounded-full bg-slate-100 p-1', className)}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => onChange(t.key)} className={cn('whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition', value === t.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800')}>
            {t.label}{t.count != null && <span className="ml-1.5 text-slate-400">{t.count}</span>}
          </button>
        ))}
      </div>
    );
  return (
    <div className={cn('no-scrollbar flex gap-1 overflow-x-auto border-b border-slate-200', className)}>
      {tabs.map((t) => (
        <button key={t.key} onClick={() => onChange(t.key)} className={cn('relative whitespace-nowrap px-3 pb-3 pt-1 text-sm font-semibold transition', value === t.key ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800')}>
          {t.label}
          {t.count != null && <span className={cn('ml-2 rounded-full px-1.5 py-0.5 text-[11px]', value === t.key ? 'bg-[var(--brand)] text-white' : 'bg-slate-100 text-slate-500')}>{t.count}</span>}
          {value === t.key && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[var(--brand)]" />}
        </button>
      ))}
    </div>
  );
}
export function Accordion({ items, dark, accent, className }: { items: { q: string; a: ReactNode }[]; dark?: boolean; accent?: string; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={cn('divide-y', dark ? 'divide-white/10' : 'divide-slate-200', className)}>
      {items.map((it, i) => {
        const o = open === i;
        return (
          <div key={i}>
            <button onClick={() => setOpen(o ? null : i)} className="flex w-full items-center justify-between gap-6 py-5 text-left">
              <span className={cn('text-base font-semibold sm:text-[17px]', dark ? 'text-white' : 'text-slate-900')}>{it.q}</span>
              <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300', o ? cn('rotate-45', accent ?? (dark ? 'border-lime bg-lime text-navy' : 'border-navy bg-navy text-white')) : dark ? 'border-white/20 text-white' : 'border-slate-300 text-slate-600')}>
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <div className={cn('grid transition-all duration-300', o ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
              <div className="overflow-hidden">
                <div className={cn('pb-5 pr-4 text-[15px] leading-relaxed sm:pr-12', dark ? 'text-white/65' : 'text-slate-600')}>{it.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ Forms */
export function Field({ label, hint, children, className, required }: { label: ReactNode; hint?: ReactNode; children: ReactNode; className?: string; required?: boolean }) {
  return (
    <div className={cn('block', className)}>
      <span className="mb-1.5 block text-[13px] font-semibold text-slate-700">{label}{required && <span className="text-rose-500"> *</span>}</span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-slate-500">{hint}</span>}
    </div>
  );
}
export const Input = ({ className, ...p }: InputHTMLAttributes<HTMLInputElement>) => <input className={cn('field', className)} {...p} />;
export const Textarea = ({ className, rows = 4, ...p }: TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea rows={rows} className={cn('field', className)} {...p} />;
export function Select({ className, options, ...p }: SelectHTMLAttributes<HTMLSelectElement> & { options: (string | { value: string; label: string })[] }) {
  return (
    <select className={cn('field', className)} {...p}>
      {options.map((o) => (typeof o === 'string' ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>))}
    </select>
  );
}
export function Toggle({ checked, onChange, label, desc, disabled, className }: { checked: boolean; onChange: (v: boolean) => void; label?: ReactNode; desc?: ReactNode; disabled?: boolean; className?: string }) {
  return (
    <div className={cn('flex items-start justify-between gap-4', disabled && 'opacity-60', className)}>
      {(label || desc) && (
        <div className="min-w-0">
          {label && <div className="text-sm font-semibold text-slate-800">{label}</div>}
          {desc && <div className="mt-0.5 text-[13px] text-slate-500">{desc}</div>}
        </div>
      )}
      <button type="button" role="switch" aria-checked={checked} disabled={disabled} onClick={() => onChange(!checked)}
        className={cn('relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200', checked ? 'bg-[var(--brand)]' : 'bg-slate-300')}>
        <span className={cn('absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200', checked && 'translate-x-5')} />
      </button>
    </div>
  );
}
export function Checkbox({ checked, onChange, label, desc, className }: { checked: boolean; onChange: (v: boolean) => void; label: ReactNode; desc?: ReactNode; className?: string }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className={cn('flex items-start gap-3 text-left', className)}>
      <span className={cn('mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition', checked ? 'border-[var(--brand)] bg-[var(--brand)] text-white' : 'border-slate-300 bg-white')}>
        {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </span>
      <span>
        <span className="block text-sm font-medium text-slate-800">{label}</span>
        {desc && <span className="mt-0.5 block text-xs text-slate-500">{desc}</span>}
      </span>
    </button>
  );
}
export function RadioCards({ options, value, onChange, cols = 3 }: {
  options: { value: string; label: ReactNode; desc?: ReactNode; icon?: LucideIcon; extra?: ReactNode }[]; value: string; onChange: (v: string) => void; cols?: 2 | 3 | 4;
}) {
  const grid = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[cols];
  return (
    <div className={cn('grid gap-3', grid)}>
      {options.map((o) => {
        const a = o.value === value;
        return (
          <button type="button" key={o.value} onClick={() => onChange(o.value)}
            className={cn('relative rounded-2xl border p-4 text-left transition', a ? 'border-[var(--accent-strong)] bg-[var(--brand-soft)] ring-4 ring-[var(--accent-ring)]' : 'border-slate-200 bg-white hover:border-slate-300')}>
            <span className={cn('absolute right-3.5 top-3.5 grid h-5 w-5 place-items-center rounded-full border', a ? 'border-[var(--brand)] bg-[var(--brand)] text-white' : 'border-slate-300')}>{a && <Check className="h-3 w-3" strokeWidth={3} />}</span>
            {o.icon && <o.icon className="mb-3 h-5 w-5 text-slate-700" />}
            <div className="pr-7 text-sm font-bold text-slate-900">{o.label}</div>
            {o.desc && <div className="mt-1 text-xs leading-relaxed text-slate-500">{o.desc}</div>}
            {o.extra}
          </button>
        );
      })}
    </div>
  );
}
export function Chips({ options, value, onChange }: { options: string[]; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const a = value.includes(o);
        return (
          <button type="button" key={o} onClick={() => onChange(a ? value.filter((x) => x !== o) : [...value, o])}
            className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium transition', a ? 'border-[var(--brand)] bg-[var(--brand)] text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300')}>
            {a && <Check className="h-3.5 w-3.5" />}{o}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ Progress & avatar */
const PROG = { brand: 'bg-[var(--brand)]', lime: 'bg-lime', teal: 'bg-teal', amber: 'bg-amber-500', green: 'bg-emerald-500', navy: 'bg-navy', rose: 'bg-rose-500', sky: 'bg-sky-500' };
export function Progress({ value, className, tone = 'brand', size = 'md' }: { value: number; className?: string; tone?: keyof typeof PROG; size?: 'sm' | 'md' }) {
  return (
    <div className={cn('w-full overflow-hidden rounded-full bg-slate-100', size === 'sm' ? 'h-1.5' : 'h-2', className)}>
      <div className={cn('h-full rounded-full transition-all duration-700', PROG[tone])} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
export function Ring({ value, size = 96, stroke = 8, color = '#B6F24B', track = 'rgba(255,255,255,.12)', children }: { value: number; size?: number; stroke?: number; color?: string; track?: string; children?: ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} className="transition-all duration-1000" />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}
const AV = ['bg-sky-100 text-sky-700', 'bg-amber-100 text-amber-700', 'bg-emerald-100 text-emerald-700', 'bg-violet-100 text-violet-700', 'bg-rose-100 text-rose-700', 'bg-teal-100 text-teal-700', 'bg-lime/40 text-navy'];
export function Avatar({ name, src, size = 36, className }: { name: string; src?: string; size?: number; className?: string }) {
  const initials = name.split(/\s+/).filter((s) => /[A-Za-z]/.test(s[0] ?? '')).map((s) => s[0]).slice(0, 2).join('').toUpperCase();
  const color = AV[[...name].reduce((s, ch) => s + ch.charCodeAt(0), 0) % AV.length];
  if (src) return <img src={src} alt={name} loading="lazy" className={cn('shrink-0 rounded-full object-cover', className)} style={{ width: size, height: size }} />;
  return <span className={cn('grid shrink-0 place-items-center rounded-full font-bold', color, className)} style={{ width: size, height: size, fontSize: Math.max(10, size * 0.36) }}>{initials}</span>;
}
export function EmptyState({ icon: Icon = Inbox, title, text, action }: { icon?: LucideIcon; title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400"><Icon className="h-6 w-6" /></div>
      <h4 className="mt-4 font-display text-base font-bold text-slate-900">{title}</h4>
      {text && <p className="mt-1 max-w-sm text-sm text-slate-500">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ Data table */
export type Column<T> = { key: string; label: string; render?: (r: T) => ReactNode; sort?: (r: T) => string | number; className?: string; align?: 'right' };
export function DataTable<T>({ columns, rows, pageSize = 8, search = true, searchPlaceholder = 'Search…', toolbar, onRowClick, rowKey, title }: {
  columns: Column<T>[]; rows: T[]; pageSize?: number; search?: boolean; searchPlaceholder?: string; toolbar?: ReactNode; onRowClick?: (r: T) => void; rowKey?: (r: T, i: number) => string; title?: ReactNode;
}) {
  const [q, setQ] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const [page, setPage] = useState(0);
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    let r = s ? rows.filter((row) => JSON.stringify(row).toLowerCase().includes(s)) : rows;
    if (sortKey) {
      const col = columns.find((c) => c.key === sortKey);
      const get = col?.sort ?? ((x: T) => (x as Record<string, unknown>)[sortKey] as string | number);
      r = [...r].sort((a, b) => {
        const va = get(a), vb = get(b);
        return (va > vb ? 1 : va < vb ? -1 : 0) * dir;
      });
    }
    return r;
  }, [rows, q, sortKey, dir, columns]);
  useEffect(() => setPage(0), [q, rows.length]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const cur = Math.min(page, pages - 1);
  const slice = filtered.slice(cur * pageSize, cur * pageSize + pageSize);
  return (
    <Card className="overflow-hidden">
      {(search || toolbar || title) && (
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {title && <div className="font-display text-[15px] font-bold text-slate-900">{title}</div>}
            {search && (
              <div className="relative w-full sm:max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={searchPlaceholder} className="field h-10 pl-9" />
              </div>
            )}
          </div>
          {toolbar && <div className="flex flex-wrap items-center gap-2">{toolbar}</div>}
        </div>
      )}
      <div className="thin-scroll overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              {columns.map((c) => (
                <th key={c.key} className={cn('whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500', c.align === 'right' && 'text-right', c.className)}>
                  {c.label && (
                    <button onClick={() => { if (sortKey === c.key) setDir((d) => (d === 1 ? -1 : 1)); else { setSortKey(c.key); setDir(1); } }} className="inline-flex items-center gap-1 uppercase hover:text-slate-800">
                      {c.label}<ArrowUpDown className={cn('h-3 w-3', sortKey === c.key ? 'opacity-100' : 'opacity-40')} />
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {slice.map((r, i) => (
              <tr key={rowKey ? rowKey(r, i) : i} onClick={onRowClick ? () => onRowClick(r) : undefined} className={cn('transition-colors hover:bg-slate-50/80', onRowClick && 'cursor-pointer')}>
                {columns.map((c) => (
                  <td key={c.key} className={cn('whitespace-nowrap px-4 py-3.5 text-slate-700', c.align === 'right' && 'text-right', c.className)}>
                    {c.render ? c.render(r) : String((r as Record<string, unknown>)[c.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {!slice.length && <EmptyState title="No results found" text="Try adjusting your search or filters." />}
      </div>
      <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 text-[13px] text-slate-500 sm:flex-row">
        <span>Showing {filtered.length ? cur * pageSize + 1 : 0}–{Math.min(filtered.length, (cur + 1) * pageSize)} of {filtered.length}</span>
        <div className="flex items-center gap-1">
          <PageBtn disabled={cur === 0} onClick={() => setPage(cur - 1)}><ChevronLeft className="h-4 w-4" /></PageBtn>
          {Array.from({ length: Math.min(pages, 7) }).map((_, i) => <PageBtn key={i} active={i === cur} onClick={() => setPage(i)}>{i + 1}</PageBtn>)}
          <PageBtn disabled={cur >= pages - 1} onClick={() => setPage(cur + 1)}><ChevronRight className="h-4 w-4" /></PageBtn>
        </div>
      </div>
    </Card>
  );
}
function PageBtn({ children, active, disabled, onClick }: { children: ReactNode; active?: boolean; disabled?: boolean; onClick: () => void }) {
  return (
    <button disabled={disabled} onClick={onClick} className={cn('grid h-8 min-w-8 place-items-center rounded-lg px-2 text-[13px] font-semibold transition disabled:opacity-40', active ? 'bg-[var(--brand)] text-white' : 'text-slate-600 hover:bg-slate-100')}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ Stepper / pipeline */
export function Stepper({ steps, current, className }: { steps: string[]; current: number; className?: string }) {
  return (
    <div className={className}>
      <div className="md:hidden">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-500">Step {current + 1} of {steps.length}</span>
          <span className="text-slate-900">{steps[current]}</span>
        </div>
        <Progress value={((current + 1) / steps.length) * 100} />
      </div>
      <ol className="hidden items-center md:flex">
        {steps.map((s, i) => (
          <li key={s} className={cn('flex items-center', i < steps.length - 1 && 'flex-1')}>
            <div className="flex items-center gap-2">
              <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition', i < current ? 'bg-[var(--brand)] text-white' : i === current ? 'bg-[var(--brand)] text-white ring-4 ring-[var(--accent-ring)]' : 'bg-slate-100 text-slate-400')}>
                {i < current ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className={cn('whitespace-nowrap text-[13px] font-semibold', i <= current ? 'text-slate-900' : 'text-slate-400', i !== current && 'hidden xl:inline')}>{s}</span>
            </div>
            {i < steps.length - 1 && <span className={cn('mx-3 h-px flex-1', i < current ? 'bg-[var(--brand)]' : 'bg-slate-200')} />}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ClaimPipeline({ status, compact }: { status: string; compact?: boolean }) {
  const terminal = status === 'Rejected' || status === 'Withdrawn';
  const idx = terminal ? (status === 'Rejected' ? 2 : 1) : CLAIM_STAGES.indexOf(status);
  return (
    <div>
      <div className="flex items-start">
        {CLAIM_STAGES.map((s, i) => {
          const bad = terminal && i === idx;
          const done = i < idx || (status === 'Placement' && i === idx);
          const current = i === idx && !done;
          const label = bad ? status : i === 2 ? 'Approved / Rejected' : s;
          return (
            <div key={s} className={cn('flex items-start', i < CLAIM_STAGES.length - 1 && 'flex-1')}>
              <div className="flex flex-col items-center gap-1.5">
                <span className={cn('grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold transition',
                  bad ? 'bg-rose-500 text-white' : done ? 'bg-emerald-500 text-white' : current ? 'bg-[var(--brand)] text-white ring-4 ring-[var(--accent-ring)]' : 'bg-slate-100 text-slate-400')}>
                  {bad ? <X className="h-3.5 w-3.5" /> : done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                {!compact && (
                  <span className={cn('hidden w-[72px] text-center text-[11px] font-semibold leading-tight sm:block', bad ? 'text-rose-600' : current ? 'text-slate-900' : done ? 'text-slate-600' : 'text-slate-400')}>{label}</span>
                )}
              </div>
              {i < CLAIM_STAGES.length - 1 && <span className={cn('mx-1 mt-[13px] h-0.5 flex-1 rounded-full', i < idx || (status === 'Placement') ? 'bg-emerald-500' : 'bg-slate-200')} />}
            </div>
          );
        })}
      </div>
      {!compact && <div className="mt-2 text-xs font-semibold text-slate-600 sm:hidden">Current stage: {status}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ Upload & timeline */
type UpFile = { id: number; name: string; size: string; progress: number };
export function UploadZone({ label = 'Drag & drop or click to browse', hint = 'PDF, JPG or PNG · up to 10MB', accept, onDone, icon: Icon = UploadCloud, className }: {
  label?: string; hint?: string; accept?: string; onDone?: (name: string) => void; icon?: LucideIcon; className?: string;
}) {
  const [files, setFiles] = useState<UpFile[]>([]);
  const [drag, setDrag] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const add = (list: { name: string; size: number }[]) => {
    list.forEach((f) => {
      const id = Date.now() + Math.random();
      const size = f.size > 1e6 ? (f.size / 1e6).toFixed(1) + ' MB' : Math.max(1, Math.round(f.size / 1e3)) + ' KB';
      setFiles((p) => [...p, { id, name: f.name, size, progress: 0 }]);
      let pr = 0;
      const t = setInterval(() => {
        pr = Math.min(100, pr + 14 + Math.random() * 20);
        setFiles((p) => p.map((x) => (x.id === id ? { ...x, progress: pr } : x)));
        if (pr >= 100) { clearInterval(t); onDone?.(f.name); }
      }, 220);
    });
  };
  return (
    <div className={className}>
      <div
        onClick={() => ref.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); add(Array.from(e.dataTransfer.files)); }}
        className={cn('flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition', drag ? 'border-[var(--accent-strong)] bg-[var(--brand-soft)]' : 'border-slate-200 bg-slate-50/60 hover:border-slate-300 hover:bg-slate-50')}
      >
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200"><Icon className="h-5 w-5" /></div>
        <div className="mt-3 text-sm font-semibold text-slate-800">{label}</div>
        <div className="mt-1 text-xs text-slate-500">{hint}</div>
        <button type="button" onClick={(e) => { e.stopPropagation(); add([{ name: `sample-file-${files.length + 1}.pdf`, size: 1_240_000 }]); }} className="mt-3 text-xs font-semibold text-slate-500 underline underline-offset-2 hover:text-slate-800">
          or use a sample file
        </button>
        <input ref={ref} type="file" accept={accept} multiple className="hidden" onChange={(e) => { add(Array.from(e.target.files ?? [])); e.target.value = ''; }} />
      </div>
      {!!files.length && (
        <ul className="mt-3 space-y-2">
          {files.map((f) => (
            <li key={f.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500"><FileText className="h-4 w-4" /></div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 text-[13px]">
                  <span className="truncate font-semibold text-slate-800">{f.name}</span>
                  <span className="shrink-0 text-slate-400">{f.progress >= 100 ? f.size : `${Math.round(f.progress)}%`}</span>
                </div>
                {f.progress < 100 ? <Progress value={f.progress} size="sm" className="mt-1.5" /> : <div className="mt-0.5 flex items-center gap-1 text-xs font-medium text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5" /> Uploaded securely</div>}
              </div>
              <button onClick={() => setFiles((p) => p.filter((x) => x.id !== f.id))} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Remove"><X className="h-4 w-4" /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const TL = { green: 'bg-emerald-100 text-emerald-700', amber: 'bg-amber-100 text-amber-700', blue: 'bg-sky-100 text-sky-700', red: 'bg-rose-100 text-rose-700', slate: 'bg-slate-100 text-slate-500', lime: 'bg-lime/40 text-navy', violet: 'bg-violet-100 text-violet-700', teal: 'bg-teal-100 text-teal-700', navy: 'bg-navy text-lime' };
export function Timeline({ items }: { items: { title: ReactNode; time: string; desc?: ReactNode; tone?: keyof typeof TL; icon?: LucideIcon }[] }) {
  return (
    <ol className="relative space-y-5">
      {items.map((it, i) => (
        <li key={i} className="relative flex gap-3.5">
          {i < items.length - 1 && <span className="absolute left-[15px] top-9 h-[calc(100%-12px)] w-px bg-slate-200" />}
          <span className={cn('relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full ring-4 ring-white', TL[it.tone ?? 'slate'])}>
            {it.icon ? <it.icon className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-current" />}
          </span>
          <div className="min-w-0 pt-1">
            <div className="text-sm font-semibold text-slate-900">{it.title}</div>
            {it.desc && <div className="mt-0.5 text-[13px] text-slate-500">{it.desc}</div>}
            <div className="mt-1 text-xs text-slate-400">{it.time}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ Motion */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setVis(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={cn('transition-all duration-700 ease-out', vis ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0', className)}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ Brand marks */
export function ClearingMark({ size = 34, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={cn('shrink-0', className)} aria-hidden>
      <rect width="32" height="32" rx="9" fill="#B6F24B" />
      <path d="M19.5 10.6A7.6 7.6 0 1 0 19.5 21.4" stroke="#081526" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M20.8 16h5.2M23.4 13.4v5.2" stroke="#081526" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
export function ClearingLogo({ dark = true, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <ClearingMark />
      <span className={cn('font-display text-[20px] font-extrabold tracking-[-0.03em]', dark ? 'text-white' : 'text-navy')}>
        Clearing<span className={dark ? 'text-lime' : 'text-lime-dark'}>+</span>
      </span>
    </span>
  );
}
export function JobPlusMark({ size = 34, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={cn('shrink-0', className)} aria-hidden>
      <rect width="32" height="32" rx="16" fill="#0D9E97" />
      <path d="M14.6 9v8.6a3.9 3.9 0 0 1-7.4 1.7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M19.4 16h6M22.4 13v6" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
export function JobPlusLogo({ dark = false, sub = true, className }: { dark?: boolean; sub?: boolean; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <JobPlusMark />
      <span className="leading-none">
        <span className={cn('block font-jakarta text-[20px] font-extrabold tracking-[-0.03em]', dark ? 'text-white' : 'text-ink')}>Job<span className="text-teal">+</span></span>
        {sub && <span className={cn('mt-1 block text-[9.5px] font-bold uppercase tracking-[.16em]', dark ? 'text-white/45' : 'text-slate-400')}>Powered by Clearing+</span>}
      </span>
    </span>
  );
}
export function Eyebrow({ children, className, dark }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <div className={cn('inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[.2em]', dark ? 'text-lime' : 'text-lime-dark', className)}>
      <span className="h-px w-7 bg-current" />{children}
    </div>
  );
}

/* ------------------------------------------------------------------ Toaster & helpers */
export function Toaster() {
  const { toasts, dismiss } = useApp();
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
      {toasts.map((t) => {
        const Icon = t.tone === 'error' ? AlertCircle : t.tone === 'info' ? Info : CheckCircle2;
        return (
          <div key={t.id} className="pointer-events-auto flex animate-scale-in items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10">
            <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', t.tone === 'error' ? 'text-rose-500' : t.tone === 'info' ? 'text-sky-500' : 'text-emerald-500')} />
            <p className="flex-1 text-sm font-medium text-slate-800">{t.msg}</p>
            <button onClick={() => dismiss(t.id)} className="text-slate-400 hover:text-slate-700" aria-label="Dismiss"><X className="h-4 w-4" /></button>
          </div>
        );
      })}
    </div>
  );
}

export function downloadCSV(filename: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = [headers.join(','), ...rows.map((r) => headers.map((h) => esc(r[h])).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function InfoNote({ children, tone = 'slate', icon: Icon = Info, className }: { children: ReactNode; tone?: 'slate' | 'amber' | 'lime' | 'teal' | 'navy' | 'rose'; icon?: LucideIcon; className?: string }) {
  const t = {
    slate: 'bg-slate-50 text-slate-600 ring-slate-200', amber: 'bg-amber-50 text-amber-800 ring-amber-200', lime: 'bg-lime/15 text-[#34500a] ring-lime-dark/20',
    teal: 'bg-teal-50 text-teal-800 ring-teal-200', navy: 'bg-navy text-white/80 ring-navy', rose: 'bg-rose-50 text-rose-800 ring-rose-200',
  }[tone];
  return (
    <div className={cn('flex items-start gap-3 rounded-2xl p-4 text-[13px] leading-relaxed ring-1 ring-inset', t, className)}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
