import { useMemo, useState } from 'react';
import {
  LayoutDashboard, Search, Bookmark, FileSignature, MessagesSquare, Building2, ShieldCheck, Crown, Receipt, Users, Settings, Timer, Trophy,
  SlidersHorizontal, LayoutGrid, List, X, Plus, Eye, Download, Lock, CheckCircle2, Calendar, UserPlus, Trash2, BadgeCheck, Sparkles,
} from 'lucide-react';
import { useApp, usePersist } from '../store';
import {
  Avatar, Badge, Button, Card, CardHeader, ClaimPipeline, DataTable, Drawer, EmptyState, Field, InfoNote, Input, Modal, PageHeader, Progress,
  Select, StatCard, Tabs, Textarea, Timeline, Toggle, UploadZone, cn, ClearingLogo,
} from '../components/ui';
import { HBarList } from '../components/charts';
import { Messenger } from '../components/Messenger';
import type { NavGroup } from './Shell';
import { ClaimForm, PlayerCard, PlayerProfileModal, VideoModal } from './clubParts';
import { CLAIMS, CLAIM_STAGES, CLUB_INVOICES, CLUB_THREADS, COUNTRIES, MY_CLUB, PLAYERS, ROLE_META, TIERS, gbp, placementFee, type Claim, type Player } from '../data/mock';

export const clubNav = (admin: boolean): NavGroup[] => [
  { title: 'Recruitment', items: [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'search', label: 'Player Search', icon: Search },
    { key: 'shortlist', label: 'Shortlisted Players', icon: Bookmark, badge: 3 },
    { key: 'claims', label: 'My Claims', icon: FileSignature },
    { key: 'messages', label: 'PPM Messages', icon: MessagesSquare, badge: 1 },
  ] },
  { title: 'Club', items: [
    { key: 'profile', label: 'Club Profile', icon: Building2 },
    { key: 'verification', label: 'Club Verification', icon: ShieldCheck },
    ...(admin ? [
      { key: 'membership', label: 'Club Membership', icon: Crown },
      { key: 'billing', label: 'Payments & Invoices', icon: Receipt },
      { key: 'staff', label: 'Staff Management', icon: Users },
    ] : []),
    { key: 'settings', label: 'Settings', icon: Settings },
  ] },
];

const feeStatus = (s: string) => (['Rejected', 'Withdrawn'].includes(s) ? 'Not charged' : ['Submitted', 'PPM Review'].includes(s) ? 'Not yet charged' : 'Charged');

function useClubState() {
  const [shortlist, setShortlist] = usePersist<string[]>('club-shortlist', ['p3', 'p5', 'p11']);
  const [claims, setClaims] = usePersist<Claim[]>('club-claims', CLAIMS.filter((c) => c.club === MY_CLUB.name));
  const toggle = (id: string) => setShortlist((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  return { shortlist, toggle, claims, setClaims };
}

export function ClubDashboard({ screen, admin }: { screen: string; admin: boolean }) {
  const st = useClubState();
  const { toast } = useApp();
  const [view, setView] = useState<Player | null>(null);
  const [video, setVideo] = useState<Player | null>(null);
  const [claimFor, setClaimFor] = useState<{ open: boolean; p: Player | null }>({ open: false, p: null });
  const actions = {
    onView: (p: Player) => setView(p),
    onPlay: (p: Player) => setVideo(p),
    onClaim: (p: Player | null) => { setView(null); setClaimFor({ open: true, p }); },
    onToggle: (p: Player) => { st.toggle(p.id); toast(st.shortlist.includes(p.id) ? `${p.name} removed from shortlist.` : `${p.name} added to shortlist.`, 'info'); },
  };
  const restricted = !admin && ['membership', 'billing', 'staff'].includes(screen);
  let body;
  if (restricted) body = <Card><EmptyState icon={Lock} title="Club Admin access required" text="Membership, billing and staff management are only available to Club Admins." /></Card>;
  else switch (screen) {
    case 'search': body = <SearchScreen st={st} a={actions} />; break;
    case 'shortlist': body = <Shortlist st={st} a={actions} />; break;
    case 'claims': body = <ClaimsScreen st={st} onNew={() => actions.onClaim(null)} />; break;
    case 'messages': body = (<><PageHeader title="PPM Messages" desc="All communication about players runs through your Player Placement Manager." /><Messenger threads={CLUB_THREADS} me={ROLE_META[admin ? 'clubAdmin' : 'clubUser'].name} banner={<span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> Direct player messaging is disabled. Your PPM may enable a monitored, Claim-specific channel.</span>} /></>); break;
    case 'profile': body = <ClubProfile />; break;
    case 'verification': body = <ClubVerification />; break;
    case 'membership': body = <Membership />; break;
    case 'billing': body = <Billing />; break;
    case 'staff': body = <Staff />; break;
    case 'settings': body = <ClubSettings />; break;
    default: body = <Overview st={st} a={actions} />;
  }
  return (
    <>
      {body}
      <PlayerProfileModal p={view} onClose={() => setView(null)} shortlisted={!!view && st.shortlist.includes(view.id)} onToggle={() => view && actions.onToggle(view)} onClaim={() => actions.onClaim(view)} />
      <VideoModal p={video} onClose={() => setVideo(null)} />
      <ClaimForm open={claimFor.open} player={claimFor.p} onClose={() => setClaimFor({ open: false, p: null })} onSubmitted={(c) => st.setClaims((cs) => [c, ...cs])} />
    </>
  );
}

type St = ReturnType<typeof useClubState>;
type Act = { onView: (p: Player) => void; onPlay: (p: Player) => void; onClaim: (p: Player | null) => void; onToggle: (p: Player) => void };

function Overview({ st, a }: { st: St; a: Act }) {
  const { setScreen } = useApp();
  const counts = CLAIM_STAGES.map((s) => ({ label: s, value: st.claims.filter((c) => c.status === s).length }));
  const fresh = PLAYERS.filter((p) => p.verified).slice(1, 4);
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 rounded-3xl bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white font-display text-xl font-extrabold text-navy">AR</span>
          <div>
            <div className="flex flex-wrap items-center gap-2"><h1 className="font-display text-2xl font-extrabold">{MY_CLUB.name}</h1><Badge tone="lime">Founding Club</Badge><Badge tone="green">Verified</Badge></div>
            <p className="mt-1 text-sm text-white/60">{MY_CLUB.country} · {MY_CLUB.tier} · free period until 31 Aug 2026</p>
          </div>
        </div>
        <div className="flex gap-2"><Button variant="lime" icon={<Search />} onClick={() => setScreen('search')}>Find players</Button><Button variant="glass" icon={<Plus />} onClick={() => a.onClaim(null)}>New Claim</Button></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Claims" value={st.claims.filter((c) => !['Rejected', 'Withdrawn', 'Placement'].includes(c.status)).length} hint="Across all stages" icon={FileSignature} />
        <StatCard label="Shortlisted players" value={st.shortlist.length} delta="2 this week" icon={Bookmark} tone="lime" />
        <StatCard label="Trials scheduled" value={st.claims.filter((c) => c.status === 'Trial').length} hint="Next: 19 Mar 2026" icon={Timer} tone="violet" />
        <StatCard label="Placements this season" value={st.claims.filter((c) => c.status === 'Placement').length} hint="Ben Hartley · Feb 2026" icon={Trophy} tone="emerald" />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="New verified players for you" desc="Matching your saved search: midfield & wide players, 18–21" action={<Button size="sm" variant="ghost" onClick={() => setScreen('search')}>View all</Button>} />
          <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
            {fresh.map((p) => (
              <button key={p.id} onClick={() => a.onView(p)} className="group overflow-hidden rounded-2xl border border-slate-200 text-left transition hover:shadow-lg">
                <div className="relative h-36 overflow-hidden"><img src={p.photo} alt="" className="h-full w-full object-cover object-[50%_25%] transition group-hover:scale-105" /><span className="absolute left-2 top-2 rounded-full bg-lime px-2 py-0.5 text-[11px] font-extrabold text-navy">{p.pos}</span></div>
                <div className="p-3"><div className="text-sm font-bold text-slate-900">{p.name}</div><div className="text-xs text-slate-500">{p.age} · {p.country} · {p.foot}</div></div>
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Claims by stage" desc="Your club's pipeline" />
          <div className="p-5 sm:p-6"><HBarList items={counts} color="bg-navy" /></div>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Upcoming trials" />
          <ul className="divide-y divide-slate-100 p-2 sm:p-3">
            {st.claims.filter((c) => c.status === 'Trial').map((c) => (
              <li key={c.id} className="flex items-center gap-4 p-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-600"><Calendar className="h-5 w-5" /></span><div className="flex-1"><div className="text-sm font-semibold text-slate-900">{c.player}</div><div className="text-xs text-slate-500">{c.id} · {c.trialDate} · PPM {c.ppm}</div></div><Badge>Scheduled</Badge></li>
            ))}
            {!st.claims.some((c) => c.status === 'Trial') && <li className="p-6 text-center text-sm text-slate-400">No trials scheduled.</li>}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Recent activity" />
          <div className="p-5 sm:p-6"><Timeline items={[
            { title: 'CLM-2051 submitted for Jordan Ellis', time: '10 Mar 2026', tone: 'blue', icon: FileSignature },
            { title: 'CLM-2050 approved — £100 Claim Fee invoiced', time: '05 Mar 2026', tone: 'green', icon: CheckCircle2 },
            { title: 'Trial confirmed: Oskar Lindqvist', time: '21 Feb 2026', tone: 'violet', icon: Timer },
          ]} /></div>
        </Card>
      </div>
    </div>
  );
}

const POS = ['GK', 'CB', 'RB', 'LB', 'CDM', 'CM', 'CAM', 'RW', 'LW', 'ST', 'CF'];
function SearchScreen({ st, a }: { st: St; a: Act }) {
  const [q, setQ] = useState('');
  const [pos, setPos] = useState<string[]>([]);
  const [country, setCountry] = useState('All countries');
  const [foot, setFoot] = useState('Any');
  const [minAge, setMinAge] = useState(16);
  const [maxAge, setMaxAge] = useState(23);
  const [minH, setMinH] = useState(165);
  const [avail, setAvail] = useState('Any availability');
  const [sort, setSort] = useState('Recommended');
  const [grid, setGrid] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const results = useMemo(() => {
    let r = PLAYERS.filter((p) => p.verified)
      .filter((p) => (p.name + p.academy + p.position).toLowerCase().includes(q.toLowerCase()))
      .filter((p) => !pos.length || pos.includes(p.pos))
      .filter((p) => country === 'All countries' || p.country === country)
      .filter((p) => foot === 'Any' || p.foot === foot)
      .filter((p) => p.age >= minAge && p.age <= maxAge && p.height >= minH)
      .filter((p) => avail === 'Any availability' || p.availability === avail);
    if (sort === 'Youngest') r = [...r].sort((x, y) => x.age - y.age);
    if (sort === 'Tallest') r = [...r].sort((x, y) => y.height - x.height);
    if (sort === 'Most goals') r = [...r].sort((x, y) => y.goals - x.goals);
    return r;
  }, [q, pos, country, foot, minAge, maxAge, minH, avail, sort]);
  const reset = () => { setPos([]); setCountry('All countries'); setFoot('Any'); setMinAge(16); setMaxAge(23); setMinH(165); setAvail('Any availability'); setQ(''); };
  const active = pos.length + (country !== 'All countries' ? 1 : 0) + (foot !== 'Any' ? 1 : 0) + (minAge !== 16 || maxAge !== 23 ? 1 : 0) + (minH !== 165 ? 1 : 0) + (avail !== 'Any availability' ? 1 : 0);

  const filters = (
    <div className="space-y-6">
      <div><div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Position</div><div className="flex flex-wrap gap-1.5">{POS.map((p) => <button key={p} onClick={() => setPos((x) => (x.includes(p) ? x.filter((y) => y !== p) : [...x, p]))} className={cn('rounded-lg px-2.5 py-1.5 text-xs font-bold transition', pos.includes(p) ? 'bg-navy text-lime' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>{p}</button>)}</div></div>
      <div><div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Age range</div><div className="grid grid-cols-2 gap-2"><Select value={String(minAge)} onChange={(e) => setMinAge(+e.target.value)} options={['16', '17', '18', '19', '20', '21']} /><Select value={String(maxAge)} onChange={(e) => setMaxAge(+e.target.value)} options={['18', '19', '20', '21', '22', '23']} /></div></div>
      <div><div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Country</div><Select value={country} onChange={(e) => setCountry(e.target.value)} options={['All countries', ...COUNTRIES]} /></div>
      <div><div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Preferred foot</div><div className="grid grid-cols-4 gap-1 rounded-xl bg-slate-100 p-1">{['Any', 'Right', 'Left', 'Both'].map((f) => <button key={f} onClick={() => setFoot(f)} className={cn('rounded-lg py-1.5 text-xs font-semibold', foot === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500')}>{f}</button>)}</div></div>
      <div><div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400"><span>Min height</span><span className="text-slate-700">{minH} cm</span></div><input type="range" min={160} max={195} value={minH} onChange={(e) => setMinH(+e.target.value)} className="w-full accent-[#102A43]" aria-label="Minimum height" /></div>
      <div><div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Availability</div><Select value={avail} onChange={(e) => setAvail(e.target.value)} options={['Any availability', 'Available now', 'Available from July', 'In discussions']} /></div>
      <Toggle checked onChange={() => undefined} disabled label="Verified players only" desc="Unverified profiles are never shown." />
      <Button variant="outline" className="w-full" onClick={reset}>Reset filters</Button>
    </div>
  );
  return (
    <div className="space-y-6">
      <PageHeader title="Player Search" desc="Discover verified, academy-trained players. Contact details and private documents are never shown." />
      <Card className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
        <div className="relative flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, academy or position…" className="field h-11 border-0 bg-slate-50 pl-9" /></div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="lg:hidden" icon={<SlidersHorizontal />} onClick={() => setFiltersOpen(true)}>Filters{active ? ` (${active})` : ''}</Button>
          <Select value={sort} onChange={(e) => setSort(e.target.value)} options={['Recommended', 'Youngest', 'Tallest', 'Most goals']} className="h-11 w-40" />
          <div className="hidden rounded-xl bg-slate-100 p-1 sm:flex">
            <button onClick={() => setGrid(true)} className={cn('grid h-9 w-9 place-items-center rounded-lg', grid ? 'bg-white shadow-sm' : 'text-slate-500')} aria-label="Grid view"><LayoutGrid className="h-4 w-4" /></button>
            <button onClick={() => setGrid(false)} className={cn('grid h-9 w-9 place-items-center rounded-lg', !grid ? 'bg-white shadow-sm' : 'text-slate-500')} aria-label="List view"><List className="h-4 w-4" /></button>
          </div>
        </div>
      </Card>
      <div className="grid gap-6 lg:grid-cols-[270px_1fr]">
        <Card className="hidden h-fit p-5 lg:sticky lg:top-24 lg:block">{filters}</Card>
        <div>
          <div className="mb-4 flex items-center justify-between text-sm"><span className="text-slate-500"><b className="text-slate-900">{results.length}</b> verified players</span>{active > 0 && <button onClick={reset} className="inline-flex items-center gap-1 font-semibold text-slate-500 hover:text-slate-900"><X className="h-3.5 w-3.5" /> Clear {active} filter{active > 1 ? 's' : ''}</button>}</div>
          {!results.length ? <Card><EmptyState icon={Search} title="No players match these filters" text="Try widening the age range or removing a position." action={<Button variant="navy" onClick={reset}>Reset filters</Button>} /></Card> : grid ? (
            <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
              {results.map((p) => <PlayerCard key={p.id} p={p} shortlisted={st.shortlist.includes(p.id)} onToggle={() => a.onToggle(p)} onView={() => a.onView(p)} onClaim={() => a.onClaim(p)} onPlay={() => a.onPlay(p)} />)}
            </div>
          ) : (
            <Card className="divide-y divide-slate-100">
              {results.map((p) => (
                <div key={p.id} className="flex flex-wrap items-center gap-4 p-4">
                  <img src={p.photo} alt="" className="h-14 w-14 rounded-xl object-cover object-top" />
                  <div className="min-w-0 flex-1"><div className="font-semibold text-slate-900">{p.name} <span className="ml-1 rounded bg-lime/40 px-1.5 text-[11px] font-bold text-navy">{p.pos}</span></div><div className="text-xs text-slate-500">{p.age} · {p.country} · {p.foot} foot · {p.height} cm · {p.academy}</div></div>
                  <Badge>{p.availability}</Badge>
                  <div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => a.onView(p)}>View</Button><Button size="sm" variant={st.shortlist.includes(p.id) ? 'lime' : 'soft'} onClick={() => a.onToggle(p)} icon={<Bookmark />}>{st.shortlist.includes(p.id) ? 'Saved' : 'Save'}</Button><Button size="sm" variant="navy" onClick={() => a.onClaim(p)}>Claim</Button></div>
                </div>
              ))}
            </Card>
          )}
        </div>
      </div>
      <Drawer open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters" footer={<Button variant="navy" onClick={() => setFiltersOpen(false)}>Show {results.length} players</Button>}>{filters}</Drawer>
    </div>
  );
}

function Shortlist({ st, a }: { st: St; a: Act }) {
  const { setScreen } = useApp();
  const list = PLAYERS.filter((p) => st.shortlist.includes(p.id));
  return (
    <div className="space-y-6">
      <PageHeader title="Shortlisted Players" desc="Players your recruitment team has saved. Shared across club staff." actions={<Button variant="navy" icon={<Search />} onClick={() => setScreen('search')}>Find more players</Button>} />
      {!list.length ? <Card><EmptyState icon={Bookmark} title="Your shortlist is empty" text="Save players from Player Search to compare them here." action={<Button variant="navy" onClick={() => setScreen('search')}>Search players</Button>} /></Card> : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((p) => <PlayerCard key={p.id} p={p} shortlisted onToggle={() => a.onToggle(p)} onView={() => a.onView(p)} onClaim={() => a.onClaim(p)} onPlay={() => a.onPlay(p)} />)}
        </div>
      )}
    </div>
  );
}

function ClaimsScreen({ st, onNew }: { st: St; onNew: () => void }) {
  const { toast, setScreen } = useApp();
  const [tab, setTab] = useState('all');
  const [sel, setSel] = useState<Claim | null>(null);
  const [withdraw, setWithdraw] = useState(false);
  const groups: Record<string, string[]> = { review: ['Submitted', 'PPM Review'], active: ['Approved', 'Player Discussion'], trial: ['Trial'], placement: ['Placement'], closed: ['Rejected', 'Withdrawn'] };
  const rows = tab === 'all' ? st.claims : st.claims.filter((c) => groups[tab].includes(c.status));
  const count = (k: string) => st.claims.filter((c) => groups[k].includes(c.status)).length;
  const doWithdraw = () => {
    if (!sel) return;
    st.setClaims((cs) => cs.map((c) => (c.id === sel.id ? { ...c, status: 'Withdrawn' } : c)));
    setSel({ ...sel, status: 'Withdrawn' });
    setWithdraw(false);
    toast(`${sel.id} withdrawn — no Claim Fee charged.`, 'info');
  };
  return (
    <div className="space-y-6">
      <PageHeader title="My Claims" desc="Track every Claim from submission to placement. The £100 Claim Fee applies only after PPM approval." actions={<Button variant="navy" icon={<Plus />} onClick={onNew}>Submit new Claim</Button>} />
      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'all', label: 'All', count: st.claims.length }, { key: 'review', label: 'In review', count: count('review') }, { key: 'active', label: 'Approved & discussion', count: count('active') }, { key: 'trial', label: 'Trials', count: count('trial') }, { key: 'placement', label: 'Placements', count: count('placement') }, { key: 'closed', label: 'Closed', count: count('closed') }]} />
      <DataTable rows={rows} onRowClick={setSel} rowKey={(r) => r.id} columns={[
        { key: 'id', label: 'Claim', render: (r) => <span className="font-mono text-xs font-bold text-slate-900">{r.id}</span> },
        { key: 'player', label: 'Player', render: (r) => <div className="flex items-center gap-2.5"><Avatar name={r.player} src={PLAYERS.find((p) => p.id === r.playerId)?.photo} size={30} /><span className="font-semibold text-slate-900">{r.player}</span></div> },
        { key: 'type', label: 'Type' }, { key: 'submitted', label: 'Submitted' }, { key: 'ppm', label: 'PPM' },
        { key: 'fee', label: 'Claim fee', sort: (r) => feeStatus(r.status), render: (r) => <Badge dot={false}>{feeStatus(r.status)}</Badge> },
        { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
      ]} />
      <Drawer open={!!sel} onClose={() => setSel(null)} title={sel ? `${sel.id} · ${sel.player}` : ''} subtitle={sel?.type} wide
        footer={sel && <><Button variant="outline" icon={<MessagesSquare />} onClick={() => setScreen('messages')}>Message PPM</Button>{!['Withdrawn', 'Rejected', 'Placement', 'Trial'].includes(sel.status) && <Button variant="danger" onClick={() => setWithdraw(true)}>Withdraw Claim</Button>}</>}>
        {sel && (
          <div className="space-y-6">
            <ClaimPipeline status={sel.status} />
            <div className="grid gap-3 sm:grid-cols-4">{[['Status', <Badge key="s">{sel.status}</Badge>], ['Submitted', sel.submitted], ['PPM', sel.ppm], ['Type', sel.type]].map(([k, v]) => <div key={k as string} className="rounded-xl border border-slate-200 p-3"><div className="text-xs text-slate-400">{k}</div><div className="mt-1 text-sm font-semibold text-slate-900">{v}</div></div>)}</div>
            <div><div className="text-xs font-bold uppercase tracking-wider text-slate-400">Opportunity</div><p className="mt-2 text-sm text-slate-700">{sel.note}</p></div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="text-sm font-bold text-slate-900">Fees for this Claim (GBP)</div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">Claim Fee (after PPM approval)</span><span className="font-semibold">{feeStatus(sel.status) === 'Charged' ? '£100.00 · charged' : feeStatus(sel.status) === 'Not charged' ? '£0.00 · not charged' : '£100.00 · on approval'}</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Placement fee {sel.contract ? `(contract ${gbp(sel.contract)})` : '(on signing)'}</span><span className="font-semibold">{sel.contract ? gbp(placementFee(sel.contract)) : 'Greater of £3,000 or 10%'}</span></div>
              </div>
            </div>
            <Timeline items={[
              { title: 'Claim submitted', time: sel.submitted, tone: 'blue', icon: FileSignature },
              ...(sel.status !== 'Submitted' ? [{ title: sel.status === 'Rejected' ? 'Rejected by PPM — not charged' : sel.status === 'Withdrawn' ? 'Withdrawn by club — not charged' : sel.status === 'PPM Review' ? 'PPM review in progress' : 'Approved by PPM — £100 Claim Fee invoiced', time: sel.ppm, tone: (sel.status === 'Rejected' ? 'red' : sel.status === 'Withdrawn' ? 'slate' : sel.status === 'PPM Review' ? 'amber' : 'green') as 'red' | 'slate' | 'amber' | 'green', icon: ShieldCheck }] : []),
              ...(sel.trialDate ? [{ title: `Trial scheduled · ${sel.trialDate}`, time: 'Coordinated by PPM', tone: 'violet' as const, icon: Timer }] : []),
              ...(sel.status === 'Placement' ? [{ title: 'Player signed — placement confirmed', time: 'Placement fee invoiced', tone: 'lime' as const, icon: Trophy }] : []),
            ]} />
          </div>
        )}
      </Drawer>
      <Modal open={withdraw} onClose={() => setWithdraw(false)} size="sm" title="Withdraw this Claim?" footer={<><Button variant="ghost" onClick={() => setWithdraw(false)}>Cancel</Button><Button variant="danger" onClick={doWithdraw}>Withdraw</Button></>}>
        <p className="text-sm text-slate-600">The PPM and player will be notified. Withdrawn Claims are not charged.</p>
      </Modal>
    </div>
  );
}

function ClubProfile() {
  const { toast } = useApp();
  const [name, setName] = useState(MY_CLUB.name);
  const [about, setAbout] = useState('Ambitious Tier 5 club with a strong record of developing young players into first-team regulars. Modern training facilities and a dedicated welfare team.');
  return (
    <div className="space-y-6">
      <PageHeader title="Club Profile" desc="How your club appears to Player Placement Managers and players during Claims." actions={<Button variant="navy" onClick={() => toast('Club profile saved (demo).')}>Save profile</Button>} />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card className="p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Club name"><Input value={name} onChange={(e) => setName(e.target.value)} /></Field>
            <Field label="Country"><Select options={COUNTRIES} defaultValue={MY_CLUB.country} /></Field>
            <Field label="League tier"><Select options={TIERS} defaultValue={MY_CLUB.tier} /></Field>
            <Field label="Town / city"><Input defaultValue={MY_CLUB.city} /></Field>
            <Field label="Training ground"><Input defaultValue="Ashford Rovers Training Ground, Kent" /></Field>
            <Field label="Founded"><Input defaultValue="1931" /></Field>
            <Field label="About the club" className="sm:col-span-2"><Textarea value={about} onChange={(e) => setAbout(e.target.value)} /></Field>
            <Field label="Club crest" className="sm:col-span-2"><UploadZone label="Upload crest" hint="PNG or SVG · transparent background" accept="image/*" /></Field>
          </div>
        </Card>
        <Card className="h-fit overflow-hidden">
          <div className="bg-navy p-6 text-white"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-white font-display text-lg font-extrabold text-navy">AR</span><div className="mt-4 font-display text-xl font-extrabold">{name}</div><div className="text-sm text-white/60">{MY_CLUB.country} · {MY_CLUB.tier}</div><div className="mt-3 flex gap-2"><Badge tone="lime">Founding Club</Badge><Badge tone="green">Verified</Badge></div></div>
          <div className="p-5 text-sm leading-relaxed text-slate-600">{about}</div>
        </Card>
      </div>
    </div>
  );
}

function ClubVerification() {
  const items = [['FA affiliation number', 'AFF-102938 · confirmed'], ['Safeguarding officer', 'Jenna Moss · DBS confirmed'], ['Safeguarding policy', 'Uploaded 10 Sep 2025'], ['Staff DBS declaration', 'Signed by Club Admin'], ['Recruitment contact', 'Graham Whitlock · verified']];
  return (
    <div className="space-y-6">
      <PageHeader title="Club Verification" desc="Verified clubs can search players and submit Claims." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center p-8 text-center"><span className="grid h-20 w-20 place-items-center rounded-3xl bg-lime/30 text-navy"><BadgeCheck className="h-10 w-10" /></span><div className="mt-5 font-display text-2xl font-extrabold text-slate-900">Verified club</div><p className="mt-1 text-sm text-slate-500">Verified 12 Sep 2025 · re-verification due 12 Sep 2026</p><div className="mt-5 w-full"><Progress value={50} tone="lime" /><div className="mt-2 text-xs text-slate-500">6 months until annual re-verification</div></div></Card>
        <Card className="lg:col-span-2"><CardHeader title="Verification checks" /><ul className="divide-y divide-slate-100 p-2 sm:p-3">{items.map(([t, d]) => <li key={t} className="flex items-center gap-4 p-3"><CheckCircle2 className="h-5 w-5 text-emerald-500" /><div className="flex-1"><div className="text-sm font-semibold text-slate-900">{t}</div><div className="text-xs text-slate-500">{d}</div></div><Badge>Verified</Badge></li>)}</ul></Card>
      </div>
      <Card className="p-5 sm:p-6"><div className="mb-4 font-display font-bold text-slate-900">Upload updated documents</div><UploadZone label="Upload safeguarding or affiliation documents" /></Card>
    </div>
  );
}

function Membership() {
  const [auto, setAuto] = useState(true);
  return (
    <div className="space-y-6">
      <PageHeader title="Club Membership" desc="Your annual Clearing+ club licence. Managed with the Platform Admin team." />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-3xl bg-lime p-6 text-navy lg:col-span-2 sm:p-8">
          <div className="absolute inset-0 bg-grid-dark opacity-60" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy px-3 py-1 text-xs font-bold text-lime"><Crown className="h-3.5 w-3.5" /> Founding Club</div>
            <div className="mt-5 font-display text-3xl font-extrabold">Free period until 31 Aug 2026</div>
            <p className="mt-1 text-navy/70">Then {gbp(MY_CLUB.fee)} per year ({MY_CLUB.tier} annual licence, GBP).</p>
            <div className="mt-6"><div className="mb-1.5 flex justify-between text-xs font-bold"><span>Free period used</span><span>6 of 12 months</span></div><div className="h-2.5 overflow-hidden rounded-full bg-navy/10"><div className="h-full w-1/2 rounded-full bg-navy" /></div></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">{[['Status', 'Active'], ['Licence after free period', gbp(MY_CLUB.fee) + '/yr'], ['Member since', MY_CLUB.joined]].map(([k, v]) => <div key={k} className="rounded-xl bg-white/50 p-3"><div className="text-[11px] font-bold uppercase tracking-wider text-navy/50">{k}</div><div className="font-semibold">{v}</div></div>)}</div>
          </div>
        </div>
        <Card className="p-6"><Toggle checked={auto} onChange={setAuto} label="Auto-renew licence" desc="Renew automatically when the free period ends." /><div className="mt-6 space-y-2.5 border-t border-slate-100 pt-6 text-sm text-slate-600">{['Founding Club badge', 'Reduced player fees for your released players', 'Early access to new verified players', 'Dedicated PPM contact'].map((t) => <div key={t} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />{t}</div>)}</div></Card>
      </div>
    </div>
  );
}

function InvoiceDoc({ inv }: { inv: (typeof CLUB_INVOICES)[number] }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-6">
      <div className="flex items-start justify-between"><div className="rounded-xl bg-navy p-3"><ClearingLogo /></div><div className="text-right"><div className="font-display text-xl font-extrabold text-slate-900">Invoice</div><div className="font-mono text-xs text-slate-500">{inv.id}</div></div></div>
      <div className="mt-6 grid gap-4 text-sm sm:grid-cols-2"><div><div className="text-xs font-bold uppercase tracking-wider text-slate-400">Bill to</div><div className="mt-1 font-semibold text-slate-900">{MY_CLUB.name}</div><div className="text-slate-500">Accounts · {MY_CLUB.city}, {MY_CLUB.country}</div></div><div className="sm:text-right"><div className="text-xs font-bold uppercase tracking-wider text-slate-400">Dates</div><div className="mt-1 text-slate-700">Issued {inv.date}</div><div className="text-slate-500">Due {inv.due}</div></div></div>
      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200"><div className="flex justify-between bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500"><span>Description</span><span>Amount</span></div><div className="flex justify-between gap-4 px-4 py-3 text-sm"><span className="text-slate-700">{inv.desc}</span><span className="font-semibold">{gbp(inv.amount, 2)}</span></div></div>
      <div className="mt-4 flex justify-end"><div className="w-56 space-y-1 text-sm"><div className="flex justify-between text-slate-500"><span>Subtotal</span><span>{gbp(inv.amount, 2)}</span></div><div className="flex justify-between border-t border-slate-200 pt-2 font-display text-lg font-extrabold text-slate-900"><span>Total (GBP)</span><span>{gbp(inv.amount, 2)}</span></div></div></div>
      <div className="mt-4 text-xs text-slate-400">Mock invoice for UI demonstration only.</div>
    </div>
  );
}

function Billing() {
  const { toast } = useApp();
  const [tab, setTab] = useState('invoices');
  const [inv, setInv] = useState<(typeof CLUB_INVOICES)[number] | null>(null);
  return (
    <div className="space-y-6">
      <PageHeader title="Payments & Invoices" desc="Claim fees, placement fees and club licence invoices — all in GBP." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Paid this season" value={gbp(200)} hint="2 Claim Fees" icon={CheckCircle2} tone="emerald" />
        <StatCard label="Outstanding" value={gbp(3000)} hint="INV-2026-0151 · due 14 Mar" icon={Receipt} tone="amber" />
        <StatCard label="Not charged" value="1 Claim" hint="CLM-2046 withdrawn" icon={X} tone="sky" />
      </div>
      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'invoices', label: 'Invoices' }, { key: 'examples', label: 'Placement fee examples' }]} />
      {tab === 'invoices' ? (
        <DataTable rows={CLUB_INVOICES} search={false} rowKey={(r) => r.id} columns={[
          { key: 'id', label: 'Invoice', render: (r) => <span className="font-mono text-xs font-bold text-slate-900">{r.id}</span> },
          { key: 'date', label: 'Issued' }, { key: 'desc', label: 'Description' },
          { key: 'amount', label: 'Amount', align: 'right', render: (r) => <b>{gbp(r.amount, 2)}</b> },
          { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
          { key: 'v', label: '', render: (r) => <Button size="xs" variant="outline" icon={<Eye />} onClick={() => setInv(r)}>View</Button> },
        ]} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {[{ c: 24000, n: 'Ben Hartley · one-year contract' }, { c: 42000, n: 'Example · two-year contract' }].map((x) => (
            <Card key={x.c} className="p-6"><div className="text-xs font-bold uppercase tracking-wider text-slate-400">Mock placement invoice</div><div className="mt-2 font-semibold text-slate-900">{x.n}</div><div className="mt-4 space-y-2 text-sm"><div className="flex justify-between"><span className="text-slate-500">First-year contract value</span><span>{gbp(x.c)}</span></div><div className="flex justify-between"><span className="text-slate-500">10% of contract</span><span>{gbp(x.c * 0.1)}</span></div><div className="flex justify-between"><span className="text-slate-500">Minimum fee</span><span>£3,000</span></div><div className="flex justify-between border-t border-slate-100 pt-2 font-display text-lg font-extrabold"><span>Placement fee</span><span>{gbp(placementFee(x.c))}</span></div></div></Card>
          ))}
        </div>
      )}
      <Modal open={!!inv} onClose={() => setInv(null)} size="lg" title="Invoice preview" footer={<Button variant="navy" icon={<Download />} onClick={() => toast('PDF download is a demo only.', 'info')}>Download PDF</Button>}>{inv && <InvoiceDoc inv={inv} />}</Modal>
    </div>
  );
}

function Staff() {
  const { toast } = useApp();
  const [staff, setStaff] = usePersist('club-staff', [
    { name: 'Graham Whitlock', email: 'g.whitlock@ashfordrovers.example', role: 'Club Admin', status: 'Active', last: 'Today' },
    { name: 'Lauren Hale', email: 'l.hale@ashfordrovers.example', role: 'Club User', status: 'Active', last: 'Yesterday' },
    { name: 'Paul Stanton', email: 'p.stanton@ashfordrovers.example', role: 'Club User', status: 'Active', last: '3 days ago' },
    { name: 'Jenna Moss', email: 'safeguarding@ashfordrovers.example', role: 'Club User', status: 'Pending', last: 'Invited 10 Mar' },
  ]);
  const [open, setOpen] = useState(false);
  const [n, setN] = useState({ name: '', email: '', role: 'Club User' });
  return (
    <div className="space-y-6">
      <PageHeader title="Staff Management" desc="Club Admins control who can search players, shortlist and submit Claims." actions={<Button variant="navy" icon={<UserPlus />} onClick={() => setOpen(true)}>Invite staff</Button>} />
      <DataTable rows={staff} rowKey={(r) => r.email} columns={[
        { key: 'name', label: 'Name', render: (r) => <div className="flex items-center gap-3"><Avatar name={r.name} size={32} /><div><div className="font-semibold text-slate-900">{r.name}</div><div className="text-xs text-slate-500">{r.email}</div></div></div> },
        { key: 'role', label: 'Role', render: (r) => <select value={r.role} onChange={(e) => { setStaff((s) => s.map((x) => (x.email === r.email ? { ...x, role: e.target.value } : x))); toast(`${r.name} is now ${e.target.value}.`); }} className="field h-9 w-36 text-[13px]"><option>Club Admin</option><option>Club User</option></select> },
        { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> }, { key: 'last', label: 'Last active' },
        { key: 'x', label: '', render: (r) => r.role !== 'Club Admin' || staff.filter((s) => s.role === 'Club Admin').length > 1 ? <button onClick={() => { setStaff((s) => s.filter((x) => x.email !== r.email)); toast(`${r.name} removed.`, 'info'); }} className="text-slate-400 hover:text-rose-600" aria-label="Remove"><Trash2 className="h-4 w-4" /></button> : null },
      ]} />
      <Modal open={open} onClose={() => setOpen(false)} title="Invite a staff member" footer={<Button variant="navy" onClick={() => { if (!n.name || !n.email) return toast('Name and email are required.', 'error'); setStaff((s) => [...s, { ...n, status: 'Pending', last: 'Invited today' }]); setN({ name: '', email: '', role: 'Club User' }); setOpen(false); toast('Invitation sent (demo).'); }}>Send invitation</Button>}>
        <div className="grid gap-4">
          <Field label="Full name"><Input value={n.name} onChange={(e) => setN({ ...n, name: e.target.value })} /></Field>
          <Field label="Work email"><Input type="email" value={n.email} onChange={(e) => setN({ ...n, email: e.target.value })} /></Field>
          <Field label="Role"><Select value={n.role} onChange={(e) => setN({ ...n, role: e.target.value })} options={['Club User', 'Club Admin']} /></Field>
          <InfoNote>Club Users can search, shortlist and submit Claims. Club Admins can also manage staff, membership and billing.</InfoNote>
        </div>
      </Modal>
    </div>
  );
}

function ClubSettings() {
  const { toast } = useApp();
  const [s, setS] = useState({ claims: true, players: true, invoices: true, twofa: true });
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" desc="Notifications and security for your club account." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-5 p-5 sm:p-6">
          <div className="font-display font-bold text-slate-900">Notifications</div>
          <Toggle checked={s.claims} onChange={(v) => setS({ ...s, claims: v })} label="Claim status updates" desc="PPM decisions, trials and placements." />
          <Toggle checked={s.players} onChange={(v) => setS({ ...s, players: v })} label="Saved search alerts" desc="New verified players matching your criteria." />
          <Toggle checked={s.invoices} onChange={(v) => setS({ ...s, invoices: v })} label="Invoices & payments" desc="New invoices and payment reminders." />
        </Card>
        <Card className="space-y-5 p-5 sm:p-6">
          <div className="font-display font-bold text-slate-900">Security</div>
          <Toggle checked={s.twofa} onChange={(v) => setS({ ...s, twofa: v })} label="Two-factor authentication" desc="Required for all Club Admins." />
          <Field label="Default Claim contact"><Select options={['Graham Whitlock', 'Lauren Hale', 'Paul Stanton']} /></Field>
          <Button variant="navy" icon={<Sparkles />} onClick={() => toast('Settings saved (demo).')}>Save settings</Button>
        </Card>
      </div>
    </div>
  );
}
