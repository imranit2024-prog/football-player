import { useEffect, useState, type ReactNode } from 'react';
import { Bell, ChevronDown, LogOut, Menu, PanelLeftClose, PanelLeftOpen, Search, Settings, X, ArrowLeftRight, Globe, HelpCircle, CheckCheck, type LucideIcon } from 'lucide-react';
import { ROLES, useApp, type Role } from '../store';
import { Avatar, ClearingLogo, ClearingMark, JobPlusLogo, JobPlusMark, cn } from '../components/ui';
import { ROLE_ICONS } from '../components/PreviewSwitcher';
import { NOTIFS, ROLE_META } from '../data/mock';

export type NavItem = { key: string; label: string; icon: LucideIcon; badge?: string | number };
export type NavGroup = { title?: string; items: NavItem[] };

export function DashboardShell({ role, nav, children }: { role: Role; nav: NavGroup[]; children: ReactNode }) {
  const { screen, setScreen, openDashboard, go, toast } = useApp();
  const meta = ROLE_META[role];
  const job = meta.brand === 'jobplus';
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [panel, setPanel] = useState<'notif' | 'menu' | 'role' | null>(null);
  const notifKey = role === 'clubUser' || role === 'clubAdmin' ? 'club' : role;
  const [notifs, setNotifs] = useState(NOTIFS[notifKey] ?? []);
  useEffect(() => setNotifs(NOTIFS[notifKey] ?? []), [notifKey]);
  useEffect(() => { setMobile(false); setPanel(null); }, [screen, role]);
  const all = nav.flatMap((g) => g.items);
  const current = all.find((i) => i.key === screen) ?? all[0];
  const unread = notifs.filter((n) => n.unread).length;

  const sidebar = (c: boolean) => (
    <div className={cn('flex h-full flex-col', job ? 'bg-ink' : 'bg-navy')}>
      <div className={cn('flex h-16 shrink-0 items-center border-b border-white/10', c ? 'justify-center px-2' : 'px-5')}>
        <button onClick={() => go('home', meta.brand)} aria-label="Back to website">{c ? (job ? <JobPlusMark /> : <ClearingMark />) : job ? <JobPlusLogo dark /> : <ClearingLogo />}</button>
      </div>
      {!c && (
        <div className="mx-4 mt-4 rounded-2xl bg-white/[0.05] p-3 ring-1 ring-white/10">
          <div className="text-[10px] font-bold uppercase tracking-[.16em] text-white/40">{meta.label} workspace</div>
          <div className="mt-0.5 truncate text-sm font-semibold text-white">{meta.org}</div>
        </div>
      )}
      <nav className="dark-scroll mt-2 flex-1 overflow-y-auto px-3 pb-4">
        {nav.map((g, gi) => (
          <div key={gi} className="mt-4">
            {g.title && !c && <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/35">{g.title}</div>}
            {c && gi > 0 && <div className="mx-3 mb-3 h-px bg-white/10" />}
            <ul className="space-y-0.5">
              {g.items.map((it) => {
                const a = it.key === current.key;
                return (
                  <li key={it.key}>
                    <button title={c ? it.label : undefined} onClick={() => setScreen(it.key)}
                      className={cn('group relative flex w-full items-center gap-3 rounded-xl text-[13.5px] font-medium transition', c ? 'h-11 justify-center' : 'h-10 px-3',
                        a ? (job ? 'bg-teal/15 text-white' : 'bg-white/[0.08] text-white') : 'text-white/60 hover:bg-white/[0.05] hover:text-white')}>
                      {a && <span className={cn('absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full', job ? 'bg-aqua' : 'bg-lime')} />}
                      <it.icon className={cn('h-[18px] w-[18px] shrink-0', a && (job ? 'text-aqua' : 'text-lime'))} />
                      {!c && <span className="flex-1 truncate text-left">{it.label}</span>}
                      {it.badge != null && !c && <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-bold', job ? 'bg-aqua text-ink' : 'bg-lime text-navy')}>{it.badge}</span>}
                      {it.badge != null && c && <span className={cn('absolute right-2 top-2 h-2 w-2 rounded-full', job ? 'bg-aqua' : 'bg-lime')} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-white/10 p-3">
        <div className={cn('flex items-center gap-3 rounded-xl p-2', c && 'justify-center')}>
          <Avatar name={meta.name} src={meta.photo} size={36} />
          {!c && <div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold text-white">{meta.name}</div><div className="truncate text-xs text-white/45">{meta.title}</div></div>}
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn('min-h-screen', job ? 'theme-jobplus bg-[#F6F5F2]' : 'bg-mist')}>
      <aside className={cn('fixed inset-y-0 left-0 z-40 hidden transition-[width] duration-300 lg:block', collapsed ? 'w-[76px]' : 'w-[264px]')}>{sidebar(collapsed)}</aside>
      {mobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 animate-fade-in bg-navy/60 backdrop-blur-sm" onClick={() => setMobile(false)} />
          <aside className="absolute inset-y-0 left-0 w-[284px] animate-slide-right shadow-2xl">
            {sidebar(false)}
            <button onClick={() => setMobile(false)} className="absolute right-3 top-3.5 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white" aria-label="Close menu"><X className="h-4 w-4" /></button>
          </aside>
        </div>
      )}
      {panel && <div className="fixed inset-0 z-20" onClick={() => setPanel(null)} />}
      <div className={cn('transition-[padding] duration-300', collapsed ? 'lg:pl-[76px]' : 'lg:pl-[264px]')}>
        <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-slate-200/70 bg-white/90 px-3 backdrop-blur-xl sm:gap-3 sm:px-6">
          <button className="grid h-10 w-10 place-items-center rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden" onClick={() => setMobile(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
          <button className="hidden h-10 w-10 place-items-center rounded-xl text-slate-500 hover:bg-slate-100 lg:grid" onClick={() => setCollapsed((c) => !c)} aria-label="Toggle sidebar">{collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}</button>
          <div className="min-w-0">
            <div className="truncate text-[10.5px] font-bold uppercase tracking-[.14em] text-slate-400">{meta.label}</div>
            <div className="truncate font-display text-[15px] font-bold text-slate-900">{current.label}</div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input placeholder="Search…" className="field h-10 w-52 rounded-full bg-slate-50 pl-9 lg:w-64" onKeyDown={(e) => { if (e.key === 'Enter') toast('Global search is a UI demo — use the filters on each screen.', 'info'); }} />
            </div>
            <div className="relative">
              <button onClick={() => setPanel(panel === 'role' ? null : 'role')} className="hidden h-10 items-center gap-2 rounded-full border border-slate-200 px-3 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 sm:inline-flex">
                <ArrowLeftRight className="h-4 w-4 text-slate-400" />{meta.label}<ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>
              {panel === 'role' && (
                <div className="absolute right-0 top-12 z-40 w-72 animate-scale-in rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                  <div className="px-3 pb-1.5 pt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Preview another role</div>
                  {ROLES.map((r) => {
                    const I = ROLE_ICONS[r];
                    return (
                      <button key={r} onClick={() => openDashboard(r)} className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition', r === role ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600 hover:bg-slate-50')}>
                        <I className="h-4 w-4 text-slate-400" /><span className="flex-1">{ROLE_META[r].label}</span><span className="text-xs text-slate-400">{ROLE_META[r].name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="relative">
              <button onClick={() => setPanel(panel === 'notif' ? null : 'notif')} className="relative grid h-10 w-10 place-items-center rounded-full text-slate-600 hover:bg-slate-100" aria-label="Notifications">
                <Bell className="h-5 w-5" />
                {unread > 0 && <span className={cn('absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-bold', job ? 'bg-teal text-white' : 'bg-lime text-navy')}>{unread}</span>}
              </button>
              {panel === 'notif' && (
                <div className="absolute -right-12 top-12 z-40 w-[min(92vw,380px)] animate-scale-in overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:right-0">
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                    <div className="font-display font-bold text-slate-900">Notifications</div>
                    <button onClick={() => setNotifs((n) => n.map((x) => ({ ...x, unread: false })))} className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900"><CheckCheck className="h-3.5 w-3.5" /> Mark all read</button>
                  </div>
                  <ul className="thin-scroll max-h-96 divide-y divide-slate-100 overflow-y-auto">
                    {notifs.map((n, i) => (
                      <li key={i}>
                        <button onClick={() => setNotifs((ns) => ns.map((x, j) => (j === i ? { ...x, unread: false } : x)))} className="flex w-full gap-3 px-4 py-3 text-left hover:bg-slate-50">
                          <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', n.unread ? (job ? 'bg-teal' : 'bg-lime-dark') : 'bg-slate-200')} />
                          <span className="flex-1"><span className={cn('block text-sm', n.unread ? 'font-semibold text-slate-900' : 'text-slate-600')}>{n.title}</span><span className="text-xs text-slate-400">{n.time}</span></span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative">
              <button onClick={() => setPanel(panel === 'menu' ? null : 'menu')} className="flex items-center gap-2 rounded-full p-1 pr-1 hover:bg-slate-100 sm:pr-2" aria-label="Account menu">
                <Avatar name={meta.name} src={meta.photo} size={34} />
                <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
              </button>
              {panel === 'menu' && (
                <div className="absolute right-0 top-12 z-40 w-64 animate-scale-in overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                  <div className="border-b border-slate-100 px-4 py-3"><div className="text-sm font-semibold text-slate-900">{meta.name}</div><div className="truncate text-xs text-slate-500">{meta.email}</div></div>
                  <div className="p-1.5">
                    {[
                      { icon: Settings, label: 'Account settings', fn: () => setScreen(all.find((i) => i.key === 'settings') ? 'settings' : current.key) },
                      { icon: ArrowLeftRight, label: 'Switch role', fn: () => setPanel('role') },
                      { icon: HelpCircle, label: 'Help centre', fn: () => toast('Help centre is not part of this prototype.', 'info') },
                      { icon: Globe, label: 'Back to website', fn: () => go('home', meta.brand) },
                    ].map((m) => (
                      <button key={m.label} onClick={m.fn} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"><m.icon className="h-4 w-4 text-slate-400" />{m.label}</button>
                    ))}
                    <button onClick={() => { toast('Signed out (demo).', 'info'); go('login', meta.brand); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"><LogOut className="h-4 w-4" />Sign out</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1440px] px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pt-8">
          <div key={current.key} className="animate-[fade-up_.45s_cubic-bezier(.2,.7,.2,1)_both]">{children}</div>
        </main>
      </div>
    </div>
  );
}
