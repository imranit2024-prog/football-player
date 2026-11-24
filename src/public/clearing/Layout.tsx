import { useEffect, useState, type ReactNode } from 'react';
import { Menu, X, ArrowUpRight, ArrowRight, Mail } from 'lucide-react';
import { useApp } from '../../store';
import { Button, ClearingLogo, Eyebrow, JobPlusMark, cn } from '../../components/ui';

const NAV = [
  { key: 'how', label: 'How It Works' },
  { key: 'players', label: 'Players' },
  { key: 'parents', label: 'Parents' },
  { key: 'clubs', label: 'Clubs' },
  { key: 'founding', label: 'Founding Clubs' },
  { key: 'grassroots', label: 'Grassroots' },
  { key: 'about', label: 'About' },
];

export function ClearingHeader() {
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
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-all duration-300', scrolled ? 'py-3' : 'py-5')}>
      {/* Blur lives on a child layer so the fixed mobile menu is not trapped by backdrop-filter */}
      <div className={cn('absolute inset-0 -z-10 bg-navy/85 shadow-[0_1px_0_rgba(255,255,255,.06)] backdrop-blur-xl transition-opacity duration-300', scrolled ? 'opacity-100' : 'opacity-0')} />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <button onClick={() => go('home', 'clearing')} aria-label="Clearing+ home"><ClearingLogo /></button>
        <nav className="hidden items-center gap-0.5 xl:flex">
          {NAV.map((n) => (
            <button key={n.key} onClick={() => go(n.key, 'clearing')} className={cn('rounded-full px-3.5 py-2 text-[13.5px] font-medium transition', page === n.key ? 'text-lime' : 'text-white/75 hover:text-white')}>
              {n.label}
            </button>
          ))}
          <button onClick={() => go('home', 'jobplus')} className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-aqua/30 px-3 py-1.5 text-[13px] font-semibold text-aqua transition hover:bg-aqua/10">
            Job+ <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </nav>
        <div className="hidden items-center gap-2 xl:flex">
          <button onClick={() => go('login', 'clearing')} className="px-3 text-[13.5px] font-semibold text-white/80 transition hover:text-white">Log in</button>
          <Button variant="lime" size="sm" onClick={() => go('interest', 'clearing')}>Register Interest</Button>
        </div>
        <button className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white xl:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex animate-fade-in flex-col overflow-y-auto bg-navy px-5 pb-10 pt-5 text-white sm:px-8 xl:hidden">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="relative flex items-center justify-between">
            <ClearingLogo />
            <button className="grid h-11 w-11 place-items-center rounded-full border border-white/15" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button>
          </div>
          <nav className="relative mt-10 flex flex-col">
            {[{ key: 'home', label: 'Home' }, ...NAV, { key: 'employers', label: 'For Employers' }, { key: 'contact', label: 'Contact' }].map((n, i) => (
              <button key={n.key} onClick={() => go(n.key, 'clearing')} style={{ animationDelay: `${i * 35}ms` }}
                className={cn('flex animate-fade-up items-center justify-between border-b border-white/10 py-4 text-left font-display text-2xl font-bold tracking-tight', page === n.key ? 'text-lime' : 'text-white')}>
                {n.label}<ArrowRight className="h-5 w-5 text-white/30" />
              </button>
            ))}
          </nav>
          <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
            <Button variant="lime" size="lg" onClick={() => go('interest', 'clearing')}>Register Interest</Button>
            <Button variant="glass" size="lg" onClick={() => go('login', 'clearing')}>Log in</Button>
          </div>
          <button onClick={() => go('home', 'jobplus')} className="relative mt-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
            <JobPlusMark />
            <span className="flex-1"><span className="block font-semibold">Explore Job+</span><span className="text-sm text-white/55">Careers beyond the pitch</span></span>
            <ArrowUpRight className="h-5 w-5 text-aqua" />
          </button>
        </div>
      )}
    </header>
  );
}

export function ClearingFooter() {
  const { go, toast } = useApp();
  const [email, setEmail] = useState('');
  const cols: { title: string; links: [string, string, ('clearing' | 'jobplus')?][] }[] = [
    { title: 'Platform', links: [['How It Works', 'how'], ['For Players', 'players'], ['For Parents & Guardians', 'parents'], ['For Clubs', 'clubs'], ['For Employers', 'employers']] },
    { title: 'Programmes', links: [['Founding Clubs', 'founding'], ['Give Back to Grassroots', 'grassroots'], ['Job+ Careers', 'home', 'jobplus']] },
    { title: 'Company', links: [['About Us', 'about'], ['Contact', 'contact'], ['Register Interest', 'interest'], ['Log in', 'login']] },
    { title: 'Legal', links: [['Terms of Use', 'terms'], ['Privacy Policy', 'privacy'], ['Safeguarding', 'parents']] },
  ];
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ClearingLogo />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/55">
              The football recruitment platform connecting released academy players with verified clubs — with professional placement support at every step.
            </p>
            <form className="mt-7 flex max-w-sm gap-2" onSubmit={(e) => { e.preventDefault(); setEmail(''); toast('Thanks — you are on the Clearing+ update list (demo).'); }}>
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email for updates" className="field field-dark pl-10" />
              </div>
              <Button type="submit" variant="lime" className="h-11 rounded-xl">Join</Button>
            </form>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-[11px] font-bold uppercase tracking-[.18em] text-white/40">{c.title}</div>
                <ul className="mt-5 space-y-3">
                  {c.links.map(([label, key, brand]) => (
                    <li key={label}><button onClick={() => go(key, brand ?? 'clearing')} className="text-left text-[14px] text-white/70 transition hover:text-lime">{label}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none mt-16 select-none font-display text-[19vw] font-extrabold leading-[0.8] tracking-[-0.06em] text-white/[0.035] lg:text-[200px]">Clearing+</div>
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:justify-between">
          <span>© 2026 Clearing+ · clearingplus.com · All prices in GBP</span>
          <span>Interactive UI prototype — fictional sample content, no real data collected.</span>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, desc, img, actions, children }: { eyebrow: string; title: ReactNode; desc?: ReactNode; img?: string; actions?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-navy pb-20 pt-36 text-white sm:pt-44 lg:pb-28">
      {img && (
        <>
          <img src={img} alt="" className="absolute inset-0 h-full w-full animate-slow-zoom object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
        </>
      )}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow dark>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-4xl animate-fade-up font-display text-[40px] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl">{title}</h1>
        {desc && <p className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-white/65 [animation-delay:120ms]">{desc}</p>}
        {actions && <div className="mt-9 flex animate-fade-up flex-wrap gap-3 [animation-delay:200ms]">{actions}</div>}
        {children}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, desc, center, dark }: { eyebrow: string; title: ReactNode; desc?: ReactNode; center?: boolean; dark?: boolean }) {
  return (
    <div className={cn('max-w-3xl', center && 'mx-auto text-center')}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2 className={cn('mt-4 font-display text-4xl font-extrabold leading-[1.03] tracking-[-0.035em] sm:text-5xl', dark ? 'text-white' : 'text-navy')}>{title}</h2>
      {desc && <p className={cn('mt-5 text-lg leading-relaxed', dark ? 'text-white/60' : 'text-slate-600')}>{desc}</p>}
    </div>
  );
}
