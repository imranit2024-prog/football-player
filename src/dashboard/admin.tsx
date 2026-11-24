import { useState } from 'react';
import {
  LayoutDashboard, Globe, Users, ShieldCheck, Building2, Crown, Briefcase, FileSignature, UserCog, Video, FileText, Trophy, Handshake, LifeBuoy,
  BarChart3, CreditCard, Receipt, Sprout, History, Settings, PoundSterling, ArrowRight, CheckCircle2, XCircle, Send, Save, Clock, BadgeCheck,
} from 'lucide-react';
import { useApp, usePersist } from '../store';
import { Avatar, Badge, Button, Card, CardHeader, ClaimPipeline, DataTable, Drawer, Field, InfoNote, Input, PageHeader, Progress, Select, StatCard, Tabs, Textarea, Toggle, cn } from '../components/ui';
import { AreaChart, BarChart, Donut, HBarList, Legend } from '../components/charts';
import type { NavGroup } from './Shell';
import {
  AuditLogs, CVReview, CountryFilter, CountryReports, ExportBtn, Grassroots, Hires, Invoices, Payments, Placements, Revenue, Safeguarding, SystemSettings, VideoModeration,
} from './admin2';
import { AUDIT, CLAIMS, CLUBS, CONSENTS, COUNTRIES, COUNTRY_PLAYERS, EMPLOYERS, MONTHS, PPMS, REGISTRATIONS, REG_SERIES, REVENUE_STREAMS, REV_CLEARING, REV_JOBPLUS, TIERS, gbp, type Claim, type Club } from '../data/mock';

export const adminNav: NavGroup[] = [
  { title: 'Overview', items: [{ key: 'overview', label: 'KPI Overview', icon: LayoutDashboard }, { key: 'reports', label: 'Country Reports', icon: Globe }] },
  { title: 'People & verification', items: [
    { key: 'players', label: 'Player Registrations', icon: Users, badge: 18 },
    { key: 'consent', label: 'Guardian Consent', icon: ShieldCheck, badge: 3 },
    { key: 'clubs', label: 'Clubs & Memberships', icon: Building2 },
    { key: 'founding', label: 'Founding Club Settings', icon: Crown },
    { key: 'employers', label: 'Employer Verification', icon: Briefcase, badge: 2 },
  ] },
  { title: 'Operations', items: [
    { key: 'claims', label: 'Claims Management', icon: FileSignature },
    { key: 'ppm', label: 'PPM Assignments', icon: UserCog, badge: 2 },
    { key: 'videos', label: 'Video Moderation', icon: Video, badge: 3 },
    { key: 'cv', label: 'Job+ CV Review', icon: FileText },
    { key: 'placements', label: 'Football Placements', icon: Trophy },
    { key: 'hires', label: 'Job+ Hires', icon: Handshake },
    { key: 'safeguarding', label: 'Safeguarding Reports', icon: LifeBuoy, badge: 2 },
  ] },
  { title: 'Finance', items: [
    { key: 'revenue', label: 'Revenue Reports', icon: BarChart3 },
    { key: 'payments', label: 'GBP Payments', icon: CreditCard },
    { key: 'invoices', label: 'Invoices', icon: Receipt },
    { key: 'grassroots', label: 'Give Back to Grassroots', icon: Sprout },
  ] },
  { title: 'System', items: [{ key: 'audit', label: 'Audit Logs', icon: History }, { key: 'settings', label: 'System Settings', icon: Settings }] },
];

export function AdminDashboard({ screen }: { screen: string }) {
  switch (screen) {
    case 'reports': return <CountryReports />;
    case 'players': return <PlayersAdmin />;
    case 'consent': return <ConsentAdmin />;
    case 'clubs': return <ClubsAdmin />;
    case 'founding': return <FoundingSettings />;
    case 'employers': return <EmployersAdmin />;
    case 'claims': return <ClaimsAdmin />;
    case 'ppm': return <PPMAssignments />;
    case 'videos': return <VideoModeration />;
    case 'cv': return <CVReview />;
    case 'placements': return <Placements />;
    case 'hires': return <Hires />;
    case 'safeguarding': return <Safeguarding />;
    case 'revenue': return <Revenue />;
    case 'payments': return <Payments />;
    case 'invoices': return <Invoices />;
    case 'grassroots': return <Grassroots />;
    case 'audit': return <AuditLogs />;
    case 'settings': return <SystemSettings />;
    default: return <Overview />;
  }
}

function Overview() {
  const { setScreen } = useApp();
  const [range, setRange] = useState('12m');
  const total = REVENUE_STREAMS.reduce((s, x) => s + x.value, 0);
  const queue = [
    { label: 'Player verifications', n: 18, to: 'players', icon: Users },
    { label: 'Guardian consents pending', n: 3, to: 'consent', icon: ShieldCheck },
    { label: 'Club verifications', n: 2, to: 'clubs', icon: Building2 },
    { label: 'Employer verifications', n: 2, to: 'employers', icon: Briefcase },
    { label: 'Videos to moderate', n: 3, to: 'videos', icon: Video },
    { label: 'Open safeguarding cases', n: 2, to: 'safeguarding', icon: LifeBuoy },
  ];
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Platform Admin · Clearing+ HQ" title="Good afternoon, Elena" desc="Here's how Clearing+ and Job+ are performing. All figures are fictional sample data in GBP."
        actions={<><Tabs variant="pill" value={range} onChange={setRange} tabs={[{ key: '30d', label: '30 days' }, { key: 'q', label: 'Quarter' }, { key: '12m', label: '12 months' }]} /><ExportBtn name="kpi-overview" rows={[{ players: 2346, verified_clubs: 148, active_claims: 63, placements_ytd: 21, jobplus_candidates: 312, jobplus_hires: 14, revenue_gbp: total, grassroots_gbp: Math.round(total * 0.05) }]} /></>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Registered players" value="2,346" delta="9.6% vs prior" icon={Users} spark={REG_SERIES} />
        <StatCard label="Verified clubs" value="148" delta="12 new" icon={Building2} tone="lime" spark={[96, 101, 108, 112, 118, 121, 127, 131, 136, 140, 145, 148]} />
        <StatCard label="Active Claims" value="63" hint="9 awaiting PPM review" icon={FileSignature} tone="amber" spark={[31, 35, 40, 38, 44, 47, 52, 49, 55, 58, 61, 63]} sparkColor="#D97706" />
        <StatCard label="Football placements (YTD)" value="21" delta="5 this month" icon={Trophy} tone="violet" />
        <StatCard label="Job+ candidates" value="312" delta="48 published" icon={FileText} tone="teal" spark={[40, 62, 90, 120, 151, 170, 198, 221, 240, 266, 290, 312]} sparkColor="#0D9E97" />
        <StatCard label="Job+ hires" value="14" hint="Avg salary £25.9k" icon={Handshake} tone="teal" />
        <StatCard label="Revenue (12 months)" value={gbp(total)} delta="18.4% YoY" icon={PoundSterling} tone="emerald" />
        <StatCard label="Grassroots fund (5%)" value={gbp(total * 0.05)} hint="Reported quarterly" icon={Sprout} tone="lime" />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Revenue" desc="Monthly, GBP · Clearing+ vs Job+" action={<div className="flex gap-3 text-xs font-semibold text-slate-500"><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-deep" />Clearing+</span><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-teal" />Job+</span></div>} />
          <div className="p-4 sm:p-6"><AreaChart labels={MONTHS} prefix="£" series={[{ name: 'Clearing+', data: REV_CLEARING, color: '#102A43' }, { name: 'Job+', data: REV_JOBPLUS, color: '#0D9E97' }]} /></div>
        </Card>
        <Card>
          <CardHeader title="Revenue mix" desc="12 months by stream" />
          <div className="flex flex-col items-center gap-6 p-6"><Donut segments={REVENUE_STREAMS} label={gbp(total)} sub="total" /><Legend items={REVENUE_STREAMS} format={(n) => gbp(n)} /></div>
        </Card>
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Card>
          <CardHeader title="Action queue" desc="Items needing review" />
          <ul className="space-y-1 p-3">
            {queue.map((q) => (
              <li key={q.label}><button onClick={() => setScreen(q.to)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-slate-50"><span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-600"><q.icon className="h-4 w-4" /></span><span className="flex-1 text-sm font-medium text-slate-700">{q.label}</span><span className="rounded-full bg-navy px-2 py-0.5 text-xs font-bold text-lime">{q.n}</span><ArrowRight className="h-4 w-4 text-slate-300" /></button></li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Player registrations" desc="Per month" />
          <div className="p-4 sm:p-6"><BarChart data={MONTHS.map((m, i) => ({ label: m, value: REG_SERIES[i] }))} keys={['value']} names={['Registrations']} colors={['#102A43']} /></div>
        </Card>
        <Card>
          <CardHeader title="Players by country" desc="Top markets" action={<Button size="xs" variant="ghost" onClick={() => setScreen('reports')}>Reports</Button>} />
          <div className="p-5 sm:p-6"><HBarList items={COUNTRY_PLAYERS.slice(0, 6)} color="bg-lime-dark" /></div>
        </Card>
      </div>
      <DataTable title="Recent audit activity" search={false} pageSize={5} rows={AUDIT} columns={[
        { key: 'time', label: 'Time', render: (r) => <span className="font-mono text-xs">{r.time}</span> }, { key: 'actor', label: 'Actor', render: (r) => <b className="text-slate-900">{r.actor}</b> },
        { key: 'role', label: 'Role' }, { key: 'action', label: 'Action' }, { key: 'target', label: 'Target' },
      ]} />
    </div>
  );
}

type Reg = (typeof REGISTRATIONS)[number];
function PlayersAdmin() {
  const { toast } = useApp();
  const [rows, setRows] = usePersist<Reg[]>('admin-regs', REGISTRATIONS);
  const [tab, setTab] = useState('all');
  const [c, setC] = useState('All countries');
  const [plan, setPlan] = useState('All plans');
  const [sel, setSel] = useState<Reg | null>(null);
  const list = rows.filter((r) => (tab === 'all' || ['Pending', 'In review'].includes(r.verification)) && (c === 'All countries' || r.country === c) && (plan === 'All plans' || r.plan === plan));
  const decide = (v: string) => { if (!sel) return; setRows((rs) => rs.map((r) => (r.id === sel.id ? { ...r, verification: v } : r))); toast(`${sel.name} ${v === 'Verified' ? 'verified' : 'rejected'}.`, v === 'Verified' ? 'success' : 'info'); setSel(null); };
  return (
    <div className="space-y-6">
      <PageHeader title="Player Registrations & Verification" desc="All player registrations with plan, guardian consent and verification status." />
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Registrations (sample)" value={rows.length} icon={Users} />
        <StatCard label="Verified" value={rows.filter((r) => r.verification === 'Verified').length} icon={BadgeCheck} tone="emerald" />
        <StatCard label="Awaiting review" value={rows.filter((r) => ['Pending', 'In review'].includes(r.verification)).length} icon={Clock} tone="amber" />
        <StatCard label="Membership revenue" value={gbp(rows.reduce((s, r) => s + r.fee, 0), 2)} icon={PoundSterling} tone="lime" />
      </div>
      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'all', label: 'All registrations', count: rows.length }, { key: 'queue', label: 'Verification queue', count: rows.filter((r) => ['Pending', 'In review'].includes(r.verification)).length }]} />
      <DataTable rows={list} onRowClick={setSel} rowKey={(r) => r.id} toolbar={<><CountryFilter value={c} onChange={setC} /><Select value={plan} onChange={(e) => setPlan(e.target.value)} options={['All plans', 'Founding/member academy', 'Other UK', 'International']} className="h-10 w-48" /><ExportBtn name="player-registrations" rows={list} /></>} columns={[
        { key: 'id', label: 'ID', render: (r) => <span className="font-mono text-xs font-bold">{r.id}</span> }, { key: 'name', label: 'Player', render: (r) => <div className="flex items-center gap-2"><Avatar name={r.name} size={28} /><b className="text-slate-900">{r.name}</b></div> },
        { key: 'age', label: 'Age' }, { key: 'country', label: 'Country' }, { key: 'position', label: 'Pos' },
        { key: 'plan', label: 'Plan', render: (r) => <span className="text-xs">{r.plan} · <b>£{r.fee}</b></span> }, { key: 'registered', label: 'Registered' },
        { key: 'guardian', label: 'Guardian', render: (r) => <Badge dot={false}>{r.guardian}</Badge> }, { key: 'verification', label: 'Verification', render: (r) => <Badge>{r.verification}</Badge> },
      ]} />
      <Drawer open={!!sel} onClose={() => setSel(null)} title={sel?.name} subtitle={sel && `${sel.id} · ${sel.position} · ${sel.age} · ${sel.country}`}
        footer={sel && <><Button variant="outline" icon={<XCircle />} onClick={() => decide('Rejected')}>Reject</Button><Button variant="navy" icon={<CheckCircle2 />} onClick={() => decide('Verified')}>Verify player</Button></>}>
        {sel && (
          <div className="space-y-5">
            <div className="flex gap-2"><Badge>{sel.verification}</Badge><Badge dot={false} tone="lime">{sel.plan} · £{sel.fee}</Badge></div>
            <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-200">
              {[['Identity document', 'Passport uploaded', true], ['Academy confirmation', 'Release letter uploaded', sel.verification !== 'Pending'], ['Membership payment', `£${sel.fee} paid`, true], ['Guardian consent', sel.age < 18 ? sel.guardian : 'Not required (18+)', sel.age >= 18 || sel.guardian === 'Approved']].map(([t, d, ok]) => (
                <li key={t as string} className="flex items-center gap-3 p-3.5">{ok ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Clock className="h-5 w-5 text-amber-500" />}<div><div className="text-sm font-semibold text-slate-900">{t}</div><div className="text-xs text-slate-500">{d}</div></div></li>
              ))}
            </ul>
            {sel.age < 18 && sel.guardian !== 'Approved' && <InfoNote tone="amber">Profile stays hidden from clubs until guardian consent is approved.</InfoNote>}
            <Field label="Reviewer notes"><Textarea rows={3} placeholder="Internal notes (audit-logged)…" /></Field>
          </div>
        )}
      </Drawer>
    </div>
  );
}

function ConsentAdmin() {
  const { toast } = useApp();
  const [rows, setRows] = usePersist('admin-consents', CONSENTS);
  return (
    <div className="space-y-6">
      <PageHeader title="Guardian Consent Tracking" desc="Players aged 16–17 stay hidden from clubs until a verified guardian approves." />
      <div className="grid gap-4 sm:grid-cols-3">
        {['Approved', 'Pending', 'Withdrawn'].map((s) => <StatCard key={s} label={s} value={rows.filter((r) => r.status === s).length} icon={ShieldCheck} tone={s === 'Approved' ? 'emerald' : s === 'Pending' ? 'amber' : 'rose'} />)}
      </div>
      <DataTable rows={rows} rowKey={(r) => r.player} toolbar={<ExportBtn name="guardian-consent" rows={rows} />} columns={[
        { key: 'player', label: 'Player', render: (r) => <b className="text-slate-900">{r.player}</b> }, { key: 'age', label: 'Age' }, { key: 'guardian', label: 'Guardian' }, { key: 'relation', label: 'Relationship' },
        { key: 'requested', label: 'Requested' }, { key: 'updated', label: 'Updated' }, { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
        { key: 'a', label: '', render: (r) => r.status === 'Pending' ? <div className="flex gap-1.5"><Button size="xs" variant="outline" icon={<Send />} onClick={() => toast(`Reminder sent to ${r.guardian} (demo).`)}>Remind</Button><Button size="xs" variant="navy" onClick={() => { setRows((x) => x.map((y) => (y.player === r.player ? { ...y, status: 'Approved', updated: '14 Mar 2026' } : y))); toast(`Consent recorded for ${r.player}.`); }}>Mark verified</Button></div> : null },
      ]} />
    </div>
  );
}

function ClubsAdmin() {
  const { toast } = useApp();
  const [clubs, setClubs] = usePersist<Club[]>('admin-clubs', CLUBS);
  const [tab, setTab] = useState('all');
  const [c, setC] = useState('All countries');
  const [sel, setSel] = useState<Club | null>(null);
  const list = clubs.filter((x) => (c === 'All countries' || x.country === c) && (tab === 'all' || (tab === 'queue' ? ['Pending', 'In review'].includes(x.verified) : x.founding)));
  const patch = (id: string, p: Partial<Club>) => { setClubs((cs) => cs.map((x) => (x.id === id ? { ...x, ...p } : x))); setSel((s) => (s && s.id === id ? { ...s, ...p } : s)); };
  return (
    <div className="space-y-6">
      <PageHeader title="Clubs & Memberships" desc="Club verification, membership status and annual licences (GBP)." />
      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'all', label: 'All clubs', count: clubs.length }, { key: 'queue', label: 'Verification queue', count: clubs.filter((x) => ['Pending', 'In review'].includes(x.verified)).length }, { key: 'founding', label: 'Founding Clubs', count: clubs.filter((x) => x.founding).length }]} />
      <DataTable rows={list} onRowClick={setSel} rowKey={(r) => r.id} toolbar={<><CountryFilter value={c} onChange={setC} /><ExportBtn name="clubs" rows={list} /></>} columns={[
        { key: 'name', label: 'Club', render: (r) => <div className="flex items-center gap-2.5"><Avatar name={r.name} size={30} /><div><b className="text-slate-900">{r.name}</b>{r.founding && <span className="ml-2 rounded bg-lime/40 px-1.5 py-0.5 text-[10px] font-bold text-navy">FOUNDING</span>}</div></div> },
        { key: 'country', label: 'Country' }, { key: 'tier', label: 'Tier' }, { key: 'verified', label: 'Verification', render: (r) => <Badge>{r.verified}</Badge> },
        { key: 'status', label: 'Membership', render: (r) => <Badge>{r.status}</Badge> }, { key: 'fee', label: 'Licence', align: 'right', render: (r) => gbp(r.fee) }, { key: 'claims', label: 'Claims', align: 'right' },
      ]} />
      <Drawer open={!!sel} onClose={() => setSel(null)} title={sel?.name} subtitle={sel && `${sel.country} · ${sel.tier} · joined ${sel.joined}`}
        footer={sel && <><Button variant="outline" onClick={() => { patch(sel.id, { verified: 'Rejected', status: 'Suspended' }); toast(`${sel.name} rejected.`, 'info'); }}>Reject</Button><Button variant="navy" onClick={() => { patch(sel.id, { verified: 'Verified', status: sel.status === 'Pending' ? 'Active' : sel.status }); toast(`${sel.name} verified.`); }}>Verify club</Button></>}>
        {sel && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2"><Badge>{sel.verified}</Badge><Badge>{sel.status}</Badge>{sel.founding && <Badge tone="lime">Founding</Badge>}</div>
            <div className="grid grid-cols-2 gap-3">{[['Staff accounts', sel.staff], ['Claims submitted', sel.claims], ['Annual licence', gbp(sel.fee)], ['Free period end', sel.freeUntil || '—']].map(([k, v]) => <div key={k as string} className="rounded-xl border border-slate-200 p-3"><div className="text-xs text-slate-400">{k}</div><div className="font-semibold text-slate-900">{v}</div></div>)}</div>
            <Field label="Membership status"><Select value={sel.status} onChange={(e) => { patch(sel.id, { status: e.target.value }); toast('Membership status updated.'); }} options={['Active', 'Trial', 'Pending', 'Expired', 'Suspended']} /></Field>
            <ul className="space-y-2 text-sm">{['Affiliation number confirmed', 'Safeguarding officer named', 'Safeguarding policy uploaded', 'Staff DBS declaration signed'].map((t, i) => <li key={t} className="flex items-center gap-2">{sel.verified === 'Verified' || i < 2 ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Clock className="h-4 w-4 text-amber-500" />}{t}</li>)}</ul>
          </div>
        )}
      </Drawer>
    </div>
  );
}

function FoundingSettings() {
  const { toast } = useApp();
  const [clubs, setClubs] = usePersist<Club[]>('admin-clubs', CLUBS);
  const [dirty, setDirty] = useState(false);
  const [prog, setProg] = useState({ open: true, max: '25', months: '12 months' });
  const [c, setC] = useState('All countries');
  const patch = (id: string, p: Partial<Club>) => { setClubs((cs) => cs.map((x) => (x.id === id ? { ...x, ...p } : x))); setDirty(true); };
  const list = clubs.filter((x) => c === 'All countries' || x.country === c);
  return (
    <div className="space-y-6">
      <PageHeader title="Founding Club Settings" desc="Toggle Founding status, edit free-period end dates and manage licences per club."
        actions={<>{dirty && <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-200"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" />Unsaved changes</span>}<Button variant="navy" icon={<Save />} onClick={() => { setDirty(false); toast('Founding Club settings saved (demo) — change written to audit log.'); }}>Save changes</Button></>} />
      <div className="grid gap-4 lg:grid-cols-4">
        <Card className="p-5"><Toggle checked={prog.open} onChange={(v) => { setProg({ ...prog, open: v }); setDirty(true); }} label="Programme open" desc="Accept new Founding Club applications." /></Card>
        <Card className="p-5"><Field label="Maximum Founding Clubs"><Input value={prog.max} onChange={(e) => { setProg({ ...prog, max: e.target.value }); setDirty(true); }} /></Field></Card>
        <Card className="p-5"><Field label="Default free period"><Select value={prog.months} onChange={(e) => { setProg({ ...prog, months: e.target.value }); setDirty(true); }} options={['6 months', '9 months', '12 months', '18 months']} /></Field></Card>
        <Card className="p-5"><div className="text-[13px] font-semibold text-slate-700">Founding Clubs</div><div className="mt-1 font-display text-3xl font-extrabold text-slate-900">{clubs.filter((x) => x.founding).length}<span className="text-base font-medium text-slate-400"> / {prog.max}</span></div><Progress className="mt-2" tone="lime" value={(clubs.filter((x) => x.founding).length / (+prog.max || 1)) * 100} /></Card>
      </div>
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="font-display text-[15px] font-bold text-slate-900">Per-club settings</div><div className="flex gap-2"><CountryFilter value={c} onChange={setC} /><ExportBtn name="founding-club-settings" rows={list.map(({ name, country, tier, founding, freeUntil, status, fee }) => ({ name, country, tier, founding_club: founding ? 'Yes' : 'No', free_period_end: freeUntil || '', membership: status, licence_fee_gbp: fee }))} /></div></div>
        <div className="thin-scroll overflow-x-auto">
          <table className="w-full min-w-[1080px] text-left text-sm">
            <thead><tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wider text-slate-500">{['Club', 'Founding Club', 'Free-period end date', 'Country', 'League tier', 'Membership status', 'Annual licence (GBP)'].map((h) => <th key={h} className="whitespace-nowrap px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((x) => (
                <tr key={x.id} className={cn('transition-colors', x.founding ? 'bg-lime/[0.06]' : 'hover:bg-slate-50/70')}>
                  <td className="px-4 py-3"><div className="flex items-center gap-2.5"><Avatar name={x.name} size={30} /><div><div className="font-semibold text-slate-900">{x.name}</div><div className="text-xs text-slate-500">{x.verified}</div></div></div></td>
                  <td className="px-4 py-3"><Toggle checked={x.founding} onChange={(v) => { patch(x.id, { founding: v, freeUntil: v ? x.freeUntil || '2026-12-31' : '' }); toast(`${x.name} ${v ? 'is now a Founding Club' : 'removed from Founding Clubs'}.`, 'info'); }} /></td>
                  <td className="px-4 py-3"><input type="date" value={x.freeUntil} disabled={!x.founding} onChange={(e) => patch(x.id, { freeUntil: e.target.value })} className="field h-9 w-40 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-300" /></td>
                  <td className="px-4 py-3"><select value={x.country} onChange={(e) => patch(x.id, { country: e.target.value })} className="field h-9 w-40">{COUNTRIES.map((k) => <option key={k}>{k}</option>)}</select></td>
                  <td className="px-4 py-3"><select value={x.tier} onChange={(e) => patch(x.id, { tier: e.target.value })} className="field h-9 w-28">{TIERS.map((k) => <option key={k}>{k}</option>)}</select></td>
                  <td className="px-4 py-3"><select value={x.status} onChange={(e) => patch(x.id, { status: e.target.value })} className="field h-9 w-32">{['Active', 'Trial', 'Pending', 'Expired', 'Suspended'].map((k) => <option key={k}>{k}</option>)}</select></td>
                  <td className="px-4 py-3"><div className="relative w-32"><span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">£</span><input type="number" value={x.fee} onChange={(e) => patch(x.id, { fee: +e.target.value })} className="field h-9 pl-7" /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <InfoNote>Founding Club players registering from a Founding/member academy pay £24.99 per year. Free-period end dates are set individually per club and shown to Club Admins on their membership page.</InfoNote>
    </div>
  );
}

function EmployersAdmin() {
  const { toast } = useApp();
  const [rows, setRows] = usePersist('admin-employers', EMPLOYERS);
  const [sel, setSel] = useState<(typeof EMPLOYERS)[number] | null>(null);
  const decide = (status: string) => { if (!sel) return; setRows((r) => r.map((x) => (x.id === sel.id ? { ...x, status } : x))); toast(`${sel.name} ${status.toLowerCase()}.`); setSel(null); };
  return (
    <div className="space-y-6">
      <PageHeader title="Employer Verification" desc="Job+ Version 1 supports verified UK employers only." />
      <DataTable rows={rows} onRowClick={setSel} rowKey={(r) => r.id} toolbar={<ExportBtn name="employers" rows={rows} />} columns={[
        { key: 'name', label: 'Employer', render: (r) => <div className="flex items-center gap-2.5"><Avatar name={r.name} size={30} /><b className="text-slate-900">{r.name}</b></div> },
        { key: 'sector', label: 'Sector' }, { key: 'city', label: 'Location (UK)' }, { key: 'size', label: 'Size' }, { key: 'vacancies', label: 'Vacancies', align: 'right' }, { key: 'hires', label: 'Hires', align: 'right' },
        { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
      ]} />
      <Drawer open={!!sel} onClose={() => setSel(null)} title={sel?.name} subtitle={sel && `${sel.sector} · ${sel.city}`} footer={sel && <><Button variant="outline" onClick={() => decide('Rejected')}>Reject</Button><Button variant="teal" onClick={() => decide('Verified')}>Verify employer</Button></>}>
        {sel && <div className="space-y-4"><Badge>{sel.status}</Badge><ul className="space-y-2.5 text-sm">{['UK-registered company (Companies House)', 'Named hiring contact verified', 'Right-to-work responsibility accepted', 'Job+ employer terms accepted (15% fee)'].map((t) => <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />{t}</li>)}</ul><Field label="Notes"><Textarea rows={3} /></Field></div>}
      </Drawer>
    </div>
  );
}

function ClaimsAdmin() {
  const { toast } = useApp();
  const [claims, setClaims] = usePersist<Claim[]>('admin-claims', CLAIMS);
  const [tab, setTab] = useState('All');
  const [c, setC] = useState('All countries');
  const [sel, setSel] = useState<Claim | null>(null);
  const list = claims.filter((x) => (tab === 'All' || x.status === tab) && (c === 'All countries' || x.country === c));
  return (
    <div className="space-y-6">
      <PageHeader title="Claims Management" desc="Every Claim across all clubs. £100 Claim Fee applies only after PPM approval." />
      <Tabs value={tab} onChange={setTab} tabs={['All', 'Submitted', 'PPM Review', 'Approved', 'Player Discussion', 'Trial', 'Placement', 'Rejected', 'Withdrawn'].map((s) => ({ key: s, label: s, count: s === 'All' ? claims.length : claims.filter((x) => x.status === s).length }))} />
      <DataTable rows={list} onRowClick={setSel} rowKey={(r) => r.id} toolbar={<><CountryFilter value={c} onChange={setC} /><ExportBtn name="claims" rows={list} /></>} columns={[
        { key: 'id', label: 'Claim', render: (r) => <span className="font-mono text-xs font-bold">{r.id}</span> }, { key: 'player', label: 'Player', render: (r) => <b className="text-slate-900">{r.player}</b> },
        { key: 'club', label: 'Club' }, { key: 'country', label: 'Country' }, { key: 'ppm', label: 'PPM', render: (r) => r.ppm === 'Unassigned' ? <Badge>Unassigned</Badge> : r.ppm },
        { key: 'submitted', label: 'Submitted' }, { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
      ]} />
      <Drawer open={!!sel} onClose={() => setSel(null)} wide title={sel ? `${sel.id} · ${sel.player}` : ''} subtitle={sel && `${sel.club} · ${sel.type}`}>
        {sel && (
          <div className="space-y-6">
            <ClaimPipeline status={sel.status} />
            <p className="text-sm text-slate-600">{sel.note}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Admin status override"><Select value={sel.status} onChange={(e) => { const status = e.target.value; setClaims((cs) => cs.map((x) => (x.id === sel.id ? { ...x, status } : x))); setSel({ ...sel, status }); toast(`Status changed to ${status} (audit-logged).`, 'info'); }} options={['Submitted', 'PPM Review', 'Approved', 'Player Discussion', 'Trial', 'Placement', 'Rejected', 'Withdrawn']} /></Field>
              <Field label="Assigned PPM"><Select value={sel.ppm} onChange={(e) => { const ppm = e.target.value; setClaims((cs) => cs.map((x) => (x.id === sel.id ? { ...x, ppm } : x))); setSel({ ...sel, ppm }); toast(`Assigned to ${ppm}.`); }} options={['Unassigned', ...PPMS.map((p) => p.name)]} /></Field>
            </div>
            <InfoNote>{['Rejected', 'Withdrawn'].includes(sel.status) ? 'No Claim Fee charged for rejected or withdrawn Claims.' : ['Submitted', 'PPM Review'].includes(sel.status) ? '£100 Claim Fee will be invoiced if the PPM approves this Claim.' : '£100 Claim Fee invoiced on PPM approval.'}{sel.contract ? ` Placement fee on signing: ${gbp(Math.max(3000, sel.contract * 0.1))}.` : ''}</InfoNote>
          </div>
        )}
      </Drawer>
    </div>
  );
}

function PPMAssignments() {
  const { toast } = useApp();
  const [claims, setClaims] = usePersist<Claim[]>('admin-claims', CLAIMS);
  const unassigned = claims.filter((c) => c.ppm === 'Unassigned');
  return (
    <div className="space-y-6">
      <PageHeader title="PPM Assignments" desc="Balance Claim workload across Player Placement Managers." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {PPMS.map((p) => {
          const n = claims.filter((c) => c.ppm === p.name && !['Rejected', 'Withdrawn', 'Placement'].includes(c.status)).length;
          const load = p.active + n;
          return (
            <Card key={p.name} className="p-5">
              <div className="flex items-center gap-3"><Avatar name={p.name} src={p.photo} size={44} /><div><div className="font-semibold text-slate-900">{p.name}</div><div className="text-xs text-slate-500">{p.region}</div></div></div>
              <div className="mt-5 flex justify-between text-xs font-semibold"><span className="text-slate-500">Workload</span><span className="text-slate-900">{load} / {p.capacity}</span></div>
              <Progress className="mt-1.5" value={(load / p.capacity) * 100} tone={load / p.capacity > 0.9 ? 'rose' : load / p.capacity > 0.75 ? 'amber' : 'green'} />
              <div className="mt-3 text-xs text-slate-500">Avg review time · <b className="text-slate-800">{p.avgDays} days</b></div>
            </Card>
          );
        })}
      </div>
      <Card>
        <CardHeader title="Unassigned Claims" desc={`${unassigned.length} waiting for a PPM`} />
        <div className="divide-y divide-slate-100 p-2 sm:p-3">
          {!unassigned.length && <div className="p-6 text-center text-sm text-slate-500">All Claims are assigned. 🎯</div>}
          {unassigned.map((c) => (
            <div key={c.id} className="flex flex-wrap items-center gap-3 p-3">
              <span className="font-mono text-xs font-bold text-slate-900">{c.id}</span>
              <div className="min-w-0 flex-1"><div className="text-sm font-semibold text-slate-900">{c.player} ← {c.club}</div><div className="text-xs text-slate-500">{c.country} · {c.type} · {c.submitted}</div></div>
              <select defaultValue="" onChange={(e) => { const ppm = e.target.value; setClaims((cs) => cs.map((x) => (x.id === c.id ? { ...x, ppm, status: 'PPM Review' } : x))); toast(`${c.id} assigned to ${ppm}.`); }} className="field h-9 w-48 text-[13px]">
                <option value="" disabled>Assign PPM…</option>{PPMS.map((p) => <option key={p.name}>{p.name}</option>)}
              </select>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
