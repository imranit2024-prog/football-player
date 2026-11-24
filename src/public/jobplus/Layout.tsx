import { useEffect, useState, type ReactNode } from 'react';
import { Menu, X, ArrowUpRight, ArrowRight, MapPin } from 'lucide-react';
import { useApp } from '../../store';
import { Button, ClearingMark, JobPlusLogo, cn } from '../../components/ui';

const NAV = [
  { key: 'how', label: 'How it works' },
  { key: 'candidates', label: 'Candidates' },
  { key: 'employers', label: 'Employers' },
  { key: 'contact', label: 'Contact' },
];

export function JobHeader() {
  const { page, go } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setOpen(false), [page]);

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-all duration-300', scrolled ? 'py-3' : 'py-5')}>
      <div className={cn('absolute inset-0 -z-10 border-b border-stone/80 bg-sand/85 backdrop-blur-xl transition-opacity duration-300', scrolled ? 'opacity-100' : 'opacity-0')} />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <button onClick={() => go('home', 'jobplus')} aria-label="Job+ home"><JobPlusLogo /></button>
        <nav className="hidden items-center gap-1 rounded-full bg-white/80 p-1 ring-1 ring-stone backdrop-blur lg:flex">
          {NAV.map((n) => (
            <button key={n.key} onClick={() => go(n.key, 'jobplus')} className={cn('rounded-full px-4 py-2 text-[13.5px] font-semibold transition', page === n.key ? 'bg-ink text-white' : 'text-slate-600 hover:text-ink')}>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="hidden items-center gap-1.5 lg:flex">
          <button onClick={() => go('home', 'clearing')} className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-semibold text-slate-500 hover:text-ink">Clearing+ <ArrowUpRight className="h-3.5 w-3.5" /></button>
          <button onClick={() => go('login', 'jobplus')} className="rounded-full px-3 py-2 text-[13.5px] font-semibold text-ink hover:bg-white">Sign in</button>
          <Button variant="teal" size="sm" onClick={() => go('optin', 'jobplus')}>Start your CV</Button>
        </div>
        <button className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink ring-1 ring-stone lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
      </div>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 animate-fade-in bg-ink/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-3 top-3 animate-scale-in rounded-3xl bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <JobPlusLogo />
              <button className="grid h-10 w-10 place-items-center rounded-full bg-sand" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button>
            </div>
            <nav className="mt-6 flex flex-col">
              {[{ key: 'home', label: 'Home' }, ...NAV, { key: 'optin', label: 'Candidate opt-in' }, { key: 'employer-register', label: 'Employer registration' }].map((n) => (
                <button key={n.key} onClick={() => go(n.key, 'jobplus')} className={cn('flex items-center justify-between border-b border-stone/70 py-3.5 text-left font-jakarta text-lg font-bold', page === n.key ? 'text-teal' : 'text-ink')}>
                  {n.label}<ArrowRight className="h-4 w-4 text-slate-300" />
                </button>
              ))}
            </nav>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => go('login', 'jobplus')}>Sign in</Button>
              <Button variant="teal" onClick={() => go('optin', 'jobplus')}>Start your CV</Button>
            </div>
            <button onClick={() => go('home', 'clearing')} className="mt-4 flex w-full items-center gap-3 rounded-2xl bg-navy p-3.5 text-left text-white">
              <ClearingMark size={30} /><span className="flex-1 text-sm font-semibold">Back to Clearing+</span><ArrowUpRight className="h-4 w-4 text-lime" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export function JobFooter() {
  const { go } = useApp();
  const cols: { title: string; links: [string, string, ('clearing' | 'jobplus')?][] }[] = [
    { title: 'Candidates', links: [['Candidate information', 'candidates'], ['How Job+ works', 'how'], ['Start your CV', 'optin'], ['Sign in', 'login']] },
    { title: 'Employers', links: [['Employer information', 'employers'], ['Register as an employer', 'employer-register'], ['Contact our team', 'contact']] },
    { title: 'Clearing+', links: [['Clearing+ home', 'home', 'clearing'], ['For players', 'players', 'clearing'], ['About us', 'about', 'clearing']] },
    { title: 'Legal', links: [['Terms of Use', 'terms', 'clearing'], ['Privacy Policy', 'privacy', 'clearing']] },
  ];
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <JobPlusLogo dark />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/55">Career placement for former academy footballers — professional CVs, transferable skills and introductions to verified UK employers.</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 ring-1 ring-white/10"><MapPin className="h-3.5 w-3.5 text-aqua" /> Version 1 · UK employers only</div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-[11px] font-bold uppercase tracking-[.18em] text-white/40">{c.title}</div>
                <ul className="mt-5 space-y-3">
                  {c.links.map(([label, key, brand]) => (
                    <li key={label}><button onClick={() => go(key, brand ?? 'jobplus')} className="text-left text-[14px] text-white/70 transition hover:text-aqua">{label}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3"><ClearingMark size={30} /><span className="text-sm text-white/70">Job+ is <b className="text-white">powered by Clearing+</b> — the same Player Placement Managers support every candidate.</span></div>
          <button onClick={() => go('home', 'clearing')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-lime">Visit Clearing+ <ArrowUpRight className="h-4 w-4" /></button>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <span>© 2026 Job+ · jobplus.academy · Salaries shown in GBP</span>
          <span>Interactive UI prototype — fictional sample content.</span>
        </div>
      </div>
    </footer>
  );
}

export function JobPageHero({ eyebrow, title, desc, actions, aside }: { eyebrow: string; title: ReactNode; desc?: ReactNode; actions?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-sand pb-16 pt-36 sm:pt-40 lg:pb-24">
      <div className="absolute inset-0 bg-dots opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className={aside ? 'lg:col-span-7' : 'lg:col-span-10'}>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-stone"><span className="h-1.5 w-1.5 rounded-full bg-teal" />{eyebrow}</div>
          <h1 className="mt-6 animate-fade-up font-jakarta text-[40px] font-extrabold leading-[1.04] tracking-[-0.04em] text-ink sm:text-6xl">{title}</h1>
          {desc && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">{desc}</p>}
          {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </section>
  );
}

export function JobHead({ eyebrow, title, desc, center, dark }: { eyebrow: string; title: ReactNode; desc?: ReactNode; center?: boolean; dark?: boolean }) {
  return (
    <div className={cn('max-w-3xl', center && 'mx-auto text-center')}>
      <div className={cn('text-[11px] font-bold uppercase tracking-[.2em]', dark ? 'text-aqua' : 'text-teal')}>{eyebrow}</div>
      <h2 className={cn('mt-4 font-jakarta text-4xl font-extrabold leading-[1.06] tracking-[-0.035em] sm:text-5xl', dark ? 'text-white' : 'text-ink')}>{title}</h2>
      {desc && <p className={cn('mt-5 text-lg leading-relaxed', dark ? 'text-white/60' : 'text-slate-600')}>{desc}</p>}
    </div>
  );
}
