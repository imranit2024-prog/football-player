import { useState } from 'react';
import {
  LayoutDashboard, User, Video, FileText, ShieldCheck, FileSignature, MessagesSquare, CreditCard, Receipt, Briefcase, Settings, Lock,
  Eye, Bookmark, Camera, CheckCircle2, Clock, Play, Plus, Trash2, Download, BadgeCheck, ArrowRight, Loader2, Building2, Sparkles, AlertCircle,
} from 'lucide-react';
import { useApp } from '../store';
import {
  Avatar, Badge, Button, Card, CardHeader, Checkbox, ClaimPipeline, DataTable, Drawer, Field, InfoNote, Input, Modal, PageHeader, Progress,
  Ring, Select, StatCard, Tabs, Textarea, Timeline, Toggle, UploadZone, cn, downloadCSV,
} from '../components/ui';
import { AreaChart } from '../components/charts';
import { Messenger } from '../components/Messenger';
import CVBuilder from '../components/CVBuilder';
import type { NavGroup } from './Shell';
import { CLAIMS, HEADSHOTS, IMG, PLAYERS, PLAYER_FEES, PLAYER_THREADS, POSITIONS, PROFILE_VIEWS, THUMBS, WEEKS, type Claim } from '../data/mock';

const me = PLAYERS[0];

export const playerNav: NavGroup[] = [
  { title: 'My football', items: [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'profile', label: 'My Football Profile', icon: User },
    { key: 'videos', label: 'Video Uploads', icon: Video },
    { key: 'documents', label: 'Private Documents', icon: FileText },
    { key: 'verification', label: 'Verification', icon: ShieldCheck },
  ] },
  { title: 'Recruitment', items: [
    { key: 'claims', label: 'My Claims', icon: FileSignature, badge: 3 },
    { key: 'messages', label: 'PPM Messages', icon: MessagesSquare, badge: 1 },
  ] },
  { title: 'Account', items: [
    { key: 'membership', label: 'Registration & Renewal', icon: CreditCard },
    { key: 'payments', label: 'Payment History', icon: Receipt },
    { key: 'jobplus', label: 'Job+ Careers', icon: Briefcase },
    { key: 'settings', label: 'Account Settings', icon: Settings },
    { key: 'privacy', label: 'Privacy Settings', icon: Lock },
  ] },
];

export function PlayerDashboard({ screen }: { screen: string }) {
  switch (screen) {
    case 'profile': return <Profile />;
    case 'videos': return <Videos />;
    case 'documents': return <Documents />;
    case 'verification': return <Verification />;
    case 'claims': return <Claims />;
    case 'messages': return (<><PageHeader title="PPM Messages" desc="Your conversations with your Player Placement Manager." /><Messenger threads={PLAYER_THREADS} me={me.name} banner={<span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> Messages are managed by your PPM. Clubs cannot message you directly.</span>} /></>);
    case 'membership': return <Membership />;
    case 'payments': return <Payments />;
    case 'jobplus': return <JobPlusOptIn />;
    case 'settings': return <AccountSettings />;
    case 'privacy': return <Privacy />;
    default: return <Overview />;
  }
}

const CHECKLIST = [
  { t: 'Personal details', done: true, to: 'profile' },
  { t: 'Academy background', done: true, to: 'profile' },
  { t: 'Positions & statistics', done: true, to: 'profile' },
  { t: 'Profile photo', done: true, to: 'profile' },
  { t: 'Identity verification', done: true, to: 'verification' },
  { t: 'Second highlight video', done: false, to: 'videos' },
  { t: 'Football history (2 seasons)', done: false, to: 'profile' },
];

function Overview() {
  const { setScreen } = useApp();
  const claim = CLAIMS.find((c) => c.id === 'CLM-2051')!;
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-navy p-6 text-white sm:p-8">
        <img src={IMG.stadiumMatch} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <img src={me.photo} alt="" className="hidden h-20 w-20 rounded-2xl object-cover ring-2 ring-lime/60 sm:block" />
            <div>
              <div className="text-xs font-bold uppercase tracking-[.18em] text-lime">Good morning</div>
              <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight">Welcome back, Jordan</h1>
              <p className="mt-1.5 max-w-lg text-sm text-white/65">Your profile is 82% complete. Add a second highlight video to stand out to verified clubs.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="lime" size="sm" onClick={() => setScreen('videos')} iconRight={<ArrowRight />}>Complete profile</Button>
                <Button variant="glass" size="sm" onClick={() => setScreen('claims')}>View my Claims</Button>
              </div>
            </div>
          </div>
          <Ring value={82} size={110} stroke={10}><div className="text-center"><div className="font-display text-2xl font-extrabold">82%</div><div className="text-[10px] uppercase tracking-wider text-white/50">complete</div></div></Ring>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Profile views (30 days)" value="186" delta="24% vs last month" icon={Eye} spark={PROFILE_VIEWS} />
        <StatCard label="Shortlisted by clubs" value="6" delta="2 this week" icon={Bookmark} tone="lime" />
        <StatCard label="Active Claims" value="2" hint="1 awaiting PPM review" icon={FileSignature} tone="amber" />
        <StatCard label="Membership" value="Active" hint="Renews 14 Jan 2027" icon={BadgeCheck} tone="emerald" />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Latest Claim" desc={`${claim.id} · ${claim.club} · ${claim.type}`} action={<Badge>{claim.status}</Badge>} />
          <div className="p-5 pt-6 sm:p-6"><ClaimPipeline status={claim.status} /></div>
          <div className="mx-5 mb-5 flex flex-col gap-3 rounded-2xl bg-mist p-4 sm:mx-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">{claim.note} Your PPM is completing credibility checks.</p>
            <Button size="sm" variant="outline" onClick={() => setScreen('claims')}>View details</Button>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">Your Player Placement Manager</div>
          <div className="mt-4 flex items-center gap-4">
            <img src={HEADSHOTS[7]} alt="" className="h-14 w-14 rounded-2xl object-cover" />
            <div><div className="font-display text-lg font-bold text-slate-900">Sarah Okafor</div><div className="text-sm text-slate-500">Senior PPM · North & Midlands</div></div>
          </div>
          <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">“They've proposed 24–25 March. I've noted your exam on the 20th — no clash.”</div>
          <Button variant="navy" className="mt-5 w-full" icon={<MessagesSquare />} onClick={() => setScreen('messages')}>Message Sarah</Button>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Profile views by verified clubs" desc="Last 12 weeks" />
          <div className="p-4 sm:p-6"><AreaChart labels={WEEKS} series={[{ name: 'Views', data: PROFILE_VIEWS, color: '#102A43' }]} /></div>
        </Card>
        <Card>
          <CardHeader title="Profile completion" desc="5 of 7 complete" />
          <ul className="space-y-1 p-3 sm:p-4">
            {CHECKLIST.map((c) => (
              <li key={c.t}>
                <button onClick={() => setScreen(c.to)} className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm hover:bg-slate-50">
                  {c.done ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <span className="h-5 w-5 rounded-full border-2 border-slate-300" />}
                  <span className={cn('flex-1', c.done ? 'text-slate-500 line-through decoration-slate-300' : 'font-semibold text-slate-800')}>{c.t}</span>
                  {!c.done && <ArrowRight className="h-4 w-4 text-slate-400" />}
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <CardHeader title="Recent activity" />
        <div className="p-5 sm:p-6">
          <Timeline items={[
            { title: 'Ashford Rovers FC submitted a Claim', desc: 'CLM-2051 · Trial invitation · now in PPM review', time: 'Today, 09:02', tone: 'blue', icon: FileSignature },
            { title: 'Highlight video submitted for moderation', desc: '“Training: Passing Patterns”', time: 'Yesterday', tone: 'amber', icon: Video },
            { title: 'Kingsmere United Claim approved by PPM', desc: 'CLM-2040 · discussion booked', time: '18 Feb 2026', tone: 'green', icon: CheckCircle2 },
            { title: 'Profile verified', desc: 'Identity and academy history confirmed', time: '15 Jan 2026', tone: 'lime', icon: BadgeCheck },
          ]} />
        </div>
      </Card>
    </div>
  );
}

const PITCH = [
  { k: 'GK', x: 50, y: 90 }, { k: 'LB', x: 16, y: 72 }, { k: 'CB', x: 50, y: 76 }, { k: 'RB', x: 84, y: 72 }, { k: 'CDM', x: 50, y: 62 },
  { k: 'CM', x: 50, y: 48 }, { k: 'CAM', x: 50, y: 34 }, { k: 'LW', x: 16, y: 28 }, { k: 'RW', x: 84, y: 28 }, { k: 'ST', x: 50, y: 15 },
];
function Pitch({ primary, secondary, onPick }: { primary: string; secondary: string; onPick: (k: string) => void }) {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-3xl bg-gradient-to-b from-deep to-navy">
      <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="2">
        <rect x="16" y="16" width="268" height="368" rx="6" /><line x1="16" y1="200" x2="284" y2="200" /><circle cx="150" cy="200" r="38" />
        <rect x="80" y="16" width="140" height="58" /><rect x="80" y="326" width="140" height="58" /><rect x="118" y="16" width="64" height="22" /><rect x="118" y="362" width="64" height="22" />
      </svg>
      {PITCH.map((p) => (
        <button key={p.k} onClick={() => onPick(p.k)} style={{ left: `${p.x}%`, top: `${p.y}%` }}
          className={cn('absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[11px] font-bold transition',
            primary === p.k ? 'scale-110 bg-lime text-navy shadow-[0_0_0_6px_rgba(182,242,75,.25)]' : secondary === p.k ? 'bg-white text-navy' : 'bg-white/10 text-white/80 ring-1 ring-white/20 hover:bg-white/20')}>
          {p.k}
        </button>
      ))}
    </div>
  );
}

function Profile() {
  const { toast } = useApp();
  const [tab, setTab] = useState('personal');
  const [photoOpen, setPhotoOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [mode, setMode] = useState('primary');
  const [pos, setPos] = useState({ primary: 'CM', secondary: 'CDM' });
  const [seasons, setSeasons] = useState([
    { season: '2024/25', club: 'Kingsmere United Academy', level: 'U18 Premier (Captain)', apps: 26, goals: 4, assists: 8 },
    { season: '2023/24', club: 'Kingsmere United Academy', level: 'U18 Premier', apps: 20, goals: 3, assists: 4 },
  ]);
  const [addOpen, setAddOpen] = useState(false);
  const [ns, setNs] = useState({ season: '2022/23', club: 'Kingsmere United Academy', level: 'U16', apps: 18, goals: 2, assists: 5 });
  const save = () => toast('Profile changes saved (local demo).');
  return (
    <div className="space-y-6">
      <PageHeader title="My Football Profile" desc="This is what verified clubs use to discover you. Keep it accurate and up to date." actions={<><Button variant="outline" icon={<Eye />} onClick={() => setPreviewOpen(true)}>Preview as a club</Button><Button variant="navy" onClick={save}>Save changes</Button></>} />
      <Card className="overflow-hidden">
        <div className="h-28 bg-navy bg-cover bg-center sm:h-36" style={{ backgroundImage: `linear-gradient(90deg,#081526 10%,rgba(8,21,38,.5)),url(${IMG.stadium})` }} />
        <div className="flex flex-col gap-5 px-5 pb-6 sm:flex-row sm:items-end sm:px-6">
          <div className="relative -mt-14 w-fit">
            <img src={me.photo} alt="" className="h-28 w-28 rounded-3xl object-cover ring-4 ring-white" />
            <button onClick={() => setPhotoOpen(true)} className="absolute -bottom-2 -right-2 grid h-10 w-10 place-items-center rounded-full bg-lime text-navy shadow-lg ring-4 ring-white" aria-label="Change photo"><Camera className="h-4 w-4" /></button>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2"><h2 className="font-display text-2xl font-extrabold text-slate-900">{me.name}</h2><Badge tone="green">Verified</Badge></div>
            <div className="mt-1 text-sm text-slate-500">{me.position} · {me.age} · {me.country} · {me.academy}</div>
          </div>
          <div className="w-full sm:w-64"><div className="mb-1.5 flex justify-between text-xs font-semibold"><span className="text-slate-500">Profile completion</span><span className="text-slate-900">82%</span></div><Progress value={82} tone="lime" /></div>
        </div>
      </Card>

      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'personal', label: 'Personal Details' }, { key: 'history', label: 'Football History' }, { key: 'academy', label: 'Academy Background' }, { key: 'positions', label: 'Positions & Statistics' }]} />

      {tab === 'personal' && (
        <Card className="p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="First name"><Input defaultValue="Jordan" /></Field>
            <Field label="Last name"><Input defaultValue="Ellis" /></Field>
            <Field label="Date of birth"><Input type="date" defaultValue="2006-08-14" /></Field>
            <Field label="Nationality"><Select options={['English', 'Scottish', 'Welsh', 'Northern Irish', 'Irish', 'Other']} /></Field>
            <Field label="Country of residence"><Select options={['England', 'Scotland', 'Wales', 'Northern Ireland']} /></Field>
            <Field label="Town / city"><Input defaultValue="Stockport" /></Field>
            <Field label="Mobile" hint="Never shown to clubs."><Input defaultValue="07700 900321" /></Field>
            <Field label="Email" hint="Never shown to clubs."><Input defaultValue={me.name.toLowerCase().replace(' ', '.') + '@example.com'} /></Field>
            <Field label="Availability"><Select options={['Available now', 'Available from July', 'In discussions']} /></Field>
            <Field label="Short bio" className="sm:col-span-2 lg:col-span-3"><Textarea rows={3} defaultValue={me.bio} /></Field>
          </div>
          <div className="mt-6 flex justify-end"><Button variant="navy" onClick={save}>Save personal details</Button></div>
        </Card>
      )}
      {tab === 'history' && (
        <DataTable title="Season history" search={false} rows={seasons} toolbar={<Button size="sm" variant="navy" icon={<Plus />} onClick={() => setAddOpen(true)}>Add season</Button>}
          columns={[
            { key: 'season', label: 'Season', render: (r) => <b className="text-slate-900">{r.season}</b> },
            { key: 'club', label: 'Club' }, { key: 'level', label: 'Team / level' },
            { key: 'apps', label: 'Apps', align: 'right' }, { key: 'goals', label: 'Goals', align: 'right' }, { key: 'assists', label: 'Assists', align: 'right' },
          ]} />
      )}
      {tab === 'academy' && (
        <Card className="p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Academy"><Input defaultValue={me.academy} /></Field>
            <Field label="Category / level"><Select options={['Category 1', 'Category 2', 'Category 3', 'Category 4']} defaultValue="Category 2" /></Field>
            <Field label="Joined academy"><Input type="month" defaultValue="2017-07" /></Field>
            <Field label="Release date"><Input type="month" defaultValue="2025-05" /></Field>
            <Field label="Reason for release"><Select options={['End of scholarship', 'Retained list decision', 'Mutual agreement', 'Relocation', 'Other']} /></Field>
            <Field label="Highest level played"><Input defaultValue="U18 Premier League (Captain)" /></Field>
            <Field label="Academy coach reference" hint="Private — used for verification only." className="sm:col-span-2"><Input defaultValue="Coach: Daniel Ashby · d.ashby@kingsmere.example" /></Field>
          </div>
          <div className="mt-6 flex justify-end"><Button variant="navy" onClick={save}>Save academy background</Button></div>
        </Card>
      )}
      {tab === 'positions' && (
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <Card className="p-5">
            <Tabs variant="pill" value={mode} onChange={setMode} tabs={[{ key: 'primary', label: 'Primary position' }, { key: 'secondary', label: 'Secondary' }]} className="mb-5" />
            <Pitch primary={pos.primary} secondary={pos.secondary} onPick={(k) => setPos((p) => (mode === 'primary' ? { ...p, primary: k } : { ...p, secondary: k }))} />
            <div className="mt-4 flex justify-center gap-4 text-xs text-slate-500"><span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-lime" /> Primary: <b className="text-slate-800">{pos.primary}</b></span><span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full border border-slate-300 bg-white" /> Secondary: <b className="text-slate-800">{pos.secondary}</b></span></div>
          </Card>
          <Card className="p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Preferred foot"><Select options={['Right', 'Left', 'Both']} /></Field>
              <Field label="Height (cm)"><Input type="number" defaultValue={me.height} /></Field>
              <Field label="Weight (kg)"><Input type="number" defaultValue={74} /></Field>
              <Field label="Appearances (last 2 seasons)"><Input type="number" defaultValue={me.apps} /></Field>
              <Field label="Goals"><Input type="number" defaultValue={me.goals} /></Field>
              <Field label="Assists"><Input type="number" defaultValue={me.assists} /></Field>
              <Field label="Minutes played"><Input type="number" defaultValue={3480} /></Field>
              <Field label="Pass completion %"><Input type="number" defaultValue={88} /></Field>
              <Field label="Other positions"><Select options={['None', ...POSITIONS]} /></Field>
            </div>
            <div className="mt-6 flex justify-end"><Button variant="navy" onClick={save}>Save positions & statistics</Button></div>
          </Card>
        </div>
      )}

      <Modal open={photoOpen} onClose={() => setPhotoOpen(false)} title="Update profile photo" subtitle="A clear, front-facing photo in training or match kit works best." footer={<Button variant="navy" onClick={() => { setPhotoOpen(false); toast('Profile photo updated (demo).'); }}>Save photo</Button>}>
        <UploadZone icon={Camera} label="Upload a new photo" hint="JPG or PNG · square crop recommended" accept="image/*" />
      </Modal>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add a season" footer={<Button variant="navy" onClick={() => { setSeasons((s) => [...s, ns]); setAddOpen(false); toast('Season added.'); }}>Add season</Button>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Season"><Input value={ns.season} onChange={(e) => setNs({ ...ns, season: e.target.value })} /></Field>
          <Field label="Team / level"><Input value={ns.level} onChange={(e) => setNs({ ...ns, level: e.target.value })} /></Field>
          <Field label="Club" className="sm:col-span-2"><Input value={ns.club} onChange={(e) => setNs({ ...ns, club: e.target.value })} /></Field>
          <Field label="Apps"><Input type="number" value={ns.apps} onChange={(e) => setNs({ ...ns, apps: +e.target.value })} /></Field>
          <Field label="Goals"><Input type="number" value={ns.goals} onChange={(e) => setNs({ ...ns, goals: +e.target.value })} /></Field>
        </div>
      </Modal>
      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)} title="Club view preview" subtitle="Exactly what verified clubs can see." size="md">
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="relative h-56"><img src={me.photo} alt="" className="h-full w-full object-cover object-top" /><div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" /><div className="absolute bottom-4 left-4 text-white"><div className="font-display text-2xl font-extrabold">{me.name}</div><div className="text-sm text-white/70">{me.position} · {me.age} · {me.country}</div></div></div>
          <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 text-center">{[['Foot', me.foot], ['Height', `${me.height} cm`], ['Availability', me.availability]].map(([k, v]) => <div key={k} className="p-3"><div className="text-[11px] uppercase tracking-wider text-slate-400">{k}</div><div className="text-sm font-semibold text-slate-900">{v}</div></div>)}</div>
          <div className="p-4 text-sm text-slate-600">{me.academy} · {me.category} · Released {me.released}</div>
        </div>
        <InfoNote className="mt-4" icon={Lock}>Hidden from clubs: phone, email, address, private documents and guardian information.</InfoNote>
      </Modal>
    </div>
  );
}

type Vid = { title: string; len: string; status: string; thumb: string; reason?: string };
function Videos() {
  const { toast } = useApp();
  const [vids, setVids] = useState<Vid[]>([
    { title: '2024/25 Season Highlights', len: '3:12', status: 'Approved', thumb: THUMBS[0] },
    { title: 'U18 Cup Semi-Final — Full 90', len: '9:46', status: 'Approved', thumb: THUMBS[4] },
    { title: 'Training: Passing Patterns', len: '1:58', status: 'Pending', thumb: THUMBS[2] },
    { title: 'Pre-season Friendly Clips', len: '2:20', status: 'Rejected', thumb: THUMBS[3], reason: "Another player's face is clearly visible without consent." },
  ]);
  const [play, setPlay] = useState<Vid | null>(null);
  return (
    <div className="space-y-6">
      <PageHeader title="Football Video Uploads" desc="Highlight videos are moderated before verified clubs can view them — usually within 48 hours." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2"><UploadZone icon={Video} label="Upload a highlight video" hint="MP4 or MOV · up to 5 minutes · 1GB max" accept="video/*" onDone={(n) => { setVids((v) => [{ title: n.replace(/\.[^.]+$/, ''), len: '2:00', status: 'Pending', thumb: THUMBS[5] }, ...v]); toast('Video submitted for moderation.'); }} /></Card>
        <Card className="p-5">
          <div className="font-display font-bold text-slate-900">Video guidelines</div>
          <ul className="mt-3 space-y-2.5 text-sm text-slate-600">{['Show yourself clearly in the first 10 seconds', 'No personal contact details on screen', 'Avoid clear faces of other minors', 'Match footage and training both welcome'].map((t) => <li key={t} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />{t}</li>)}</ul>
        </Card>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {vids.map((v, i) => (
          <Card key={v.title + i} className="group overflow-hidden">
            <button onClick={() => setPlay(v)} className="relative block aspect-video w-full overflow-hidden">
              <img src={v.thumb} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 grid place-items-center bg-navy/30 opacity-90 transition group-hover:bg-navy/45"><span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-navy"><Play className="h-5 w-5 fill-current" /></span></span>
              <span className="absolute bottom-2 right-2 rounded-md bg-navy/80 px-1.5 py-0.5 text-[11px] font-semibold text-white">{v.len}</span>
            </button>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2"><div className="text-sm font-semibold text-slate-900">{v.title}</div><button onClick={() => { setVids((x) => x.filter((_, j) => j !== i)); toast('Video removed.', 'info'); }} className="text-slate-400 hover:text-rose-600" aria-label="Delete"><Trash2 className="h-4 w-4" /></button></div>
              <div className="mt-2"><Badge>{v.status === 'Pending' ? 'In review' : v.status}</Badge></div>
              {v.reason && <p className="mt-2 text-xs text-rose-600">{v.reason}</p>}
            </div>
          </Card>
        ))}
      </div>
      <Modal open={!!play} onClose={() => setPlay(null)} title={play?.title} subtitle="Video preview (static mock player)" size="lg">
        {play && (
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-navy">
            <img src={play.thumb} alt="" className="h-full w-full object-cover opacity-70" />
            <span className="absolute inset-0 grid place-items-center"><span className="grid h-16 w-16 place-items-center rounded-full bg-lime text-navy"><Play className="h-7 w-7 fill-current" /></span></span>
            <div className="absolute inset-x-4 bottom-4"><div className="h-1 rounded-full bg-white/25"><div className="h-full w-1/3 rounded-full bg-lime" /></div><div className="mt-2 flex justify-between text-xs text-white/80"><span>1:04</span><span>{play.len}</span></div></div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function Documents() {
  const { toast } = useApp();
  const docs = [
    { name: 'Passport (photo page)', type: 'Identity', status: 'Verified', date: '12 Jan 2026' },
    { name: 'Proof of address', type: 'Identity', status: 'Verified', date: '12 Jan 2026' },
    { name: 'Academy release letter', type: 'Eligibility', status: 'Verified', date: '15 Jan 2026' },
    { name: 'Guardian consent form', type: 'Consent', status: 'n/a', date: 'Not required (18+)' },
    { name: 'Medical clearance (optional)', type: 'Medical', status: 'Pending', date: 'Not uploaded' },
  ];
  return (
    <div className="space-y-6">
      <PageHeader title="Private Documents" desc="Securely stored for verification. Only Clearing+ verification staff can access them." />
      <InfoNote tone="navy" icon={Lock}>Private documents are <b className="text-white">never visible to clubs or employers</b>. They are used only to verify your identity, eligibility and consent.</InfoNote>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Your documents" desc="5 document types" />
          <ul className="divide-y divide-slate-100 p-2 sm:p-3">
            {docs.map((d) => (
              <li key={d.name} className="flex flex-wrap items-center gap-3 rounded-xl p-3 hover:bg-slate-50">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-500"><FileText className="h-5 w-5" /></span>
                <div className="min-w-0 flex-1"><div className="text-sm font-semibold text-slate-900">{d.name}</div><div className="text-xs text-slate-500">{d.type} · {d.date}</div></div>
                <Badge>{d.status}</Badge>
                <Button size="xs" variant="outline" onClick={() => toast(`Replace "${d.name}" — use the upload area (demo).`, 'info')}>{d.status === 'Pending' ? 'Upload' : 'Replace'}</Button>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-5"><div className="mb-4 font-display font-bold text-slate-900">Upload a document</div><UploadZone onDone={(n) => toast(`${n} uploaded securely.`)} /></Card>
      </div>
    </div>
  );
}

function Verification() {
  const checks = [
    { t: 'Identity check', d: 'Passport verified', s: 'Verified' },
    { t: 'Age & eligibility', d: 'Released academy player, aged 19', s: 'Verified' },
    { t: 'Academy history', d: 'Confirmed with Kingsmere United Academy', s: 'Verified' },
    { t: 'Membership payment', d: 'Founding/member academy · £24.99', s: 'Paid' },
    { t: 'Video moderation', d: '2 approved · 1 in review', s: 'In review' },
    { t: 'Guardian consent', d: 'Not required — player is 18+', s: 'n/a' },
  ];
  return (
    <div className="space-y-6">
      <PageHeader title="Verification Status" desc="Verification builds trust with clubs and keeps the platform safe." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center justify-center p-8 text-center">
          <span className="grid h-20 w-20 place-items-center rounded-3xl bg-lime/30 text-navy"><BadgeCheck className="h-10 w-10" /></span>
          <div className="mt-5 font-display text-2xl font-extrabold text-slate-900">Verified player</div>
          <p className="mt-1 text-sm text-slate-500">Since 15 Jan 2026 · visible to verified clubs</p>
          <div className="mt-5 w-full"><Progress value={92} tone="green" /><div className="mt-2 text-xs text-slate-500">5 of 6 checks complete</div></div>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader title="Verification checks" />
          <ul className="divide-y divide-slate-100 p-2 sm:p-3">
            {checks.map((c) => (
              <li key={c.t} className="flex items-center gap-4 p-3">
                {c.s === 'In review' ? <Clock className="h-5 w-5 text-amber-500" /> : c.s === 'n/a' ? <AlertCircle className="h-5 w-5 text-slate-300" /> : <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                <div className="flex-1"><div className="text-sm font-semibold text-slate-900">{c.t}</div><div className="text-xs text-slate-500">{c.d}</div></div>
                <Badge>{c.s}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <Card>
        <CardHeader title="Verification history" />
        <div className="p-5 sm:p-6">
          <Timeline items={[
            { title: 'Profile verified', time: '15 Jan 2026 · 14:20', tone: 'green', icon: BadgeCheck, desc: 'All required checks passed' },
            { title: 'Academy history confirmed', time: '15 Jan 2026 · 11:02', tone: 'green', icon: Building2 },
            { title: 'Identity verified', time: '12 Jan 2026 · 16:45', tone: 'green', icon: ShieldCheck },
            { title: 'Documents submitted', time: '12 Jan 2026 · 10:10', tone: 'blue', icon: FileText },
          ]} />
        </div>
      </Card>
    </div>
  );
}

function Claims() {
  const { toast, setScreen } = useApp();
  const [claims, setClaims] = useState<Claim[]>(CLAIMS.filter((c) => c.playerId === 'p1'));
  const [sel, setSel] = useState<Claim | null>(null);
  const update = (id: string, status: string) => {
    setClaims((cs) => cs.map((c) => (c.id === id ? { ...c, status } : c)));
    setSel((s) => (s && s.id === id ? { ...s, status } : s));
  };
  return (
    <div className="space-y-6">
      <PageHeader title="My Claims" desc="Claims are submitted by verified clubs and reviewed by your PPM before you're asked to discuss them." />
      <InfoNote icon={ShieldCheck}>Every Claim passes a PPM credibility review. Clubs cannot message you directly — your PPM manages all communication.</InfoNote>
      <div className="grid gap-4">
        {claims.map((c) => (
          <Card key={c.id} className="cursor-pointer p-5 transition hover:shadow-lg hover:shadow-slate-200/60 sm:p-6" onClick={() => setSel(c)}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar name={c.club} size={44} />
                <div><div className="font-display font-bold text-slate-900">{c.club}</div><div className="text-xs text-slate-500">{c.id} · {c.type} · submitted {c.submitted}</div></div>
              </div>
              <Badge>{c.status}</Badge>
            </div>
            <div className="mt-6"><ClaimPipeline status={c.status} /></div>
          </Card>
        ))}
      </div>
      <Drawer open={!!sel} onClose={() => setSel(null)} title={sel?.club} subtitle={sel && `${sel.id} · ${sel.type}`}
        footer={sel && (
          <>
            <Button variant="outline" icon={<MessagesSquare />} onClick={() => setScreen('messages')}>Message PPM</Button>
            {sel.status === 'Approved' && <Button variant="navy" onClick={() => { update(sel.id, 'Player Discussion'); toast('Thanks — your PPM will arrange the discussion.'); }}>I'd like to discuss</Button>}
          </>
        )}>
        {sel && (
          <div className="space-y-6">
            <div className="flex items-center justify-between rounded-2xl bg-mist p-4"><span className="text-sm text-slate-600">Current status</span><Badge>{sel.status}</Badge></div>
            <ClaimPipeline status={sel.status} />
            <div><div className="text-xs font-bold uppercase tracking-wider text-slate-400">Opportunity</div><p className="mt-2 text-sm text-slate-700">{sel.note}</p></div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[['Club country', sel.country], ['Your PPM', sel.ppm], ['Submitted', sel.submitted], ['Claim type', sel.type]].map(([k, v]) => <div key={k} className="rounded-xl border border-slate-200 p-3"><div className="text-xs text-slate-400">{k}</div><div className="font-semibold text-slate-900">{v}</div></div>)}
            </div>
            <Timeline items={[
              { title: 'Claim submitted by club', time: sel.submitted, tone: 'blue', icon: FileSignature },
              { title: sel.status === 'Rejected' ? 'Rejected by PPM — club not charged' : sel.status === 'PPM Review' ? 'PPM credibility review in progress' : 'Approved by PPM', time: sel.status === 'PPM Review' ? 'In progress' : 'Within 2 working days', tone: sel.status === 'Rejected' ? 'red' : sel.status === 'PPM Review' ? 'amber' : 'green', icon: ShieldCheck },
            ]} />
          </div>
        )}
      </Drawer>
    </div>
  );
}

function PayModal({ open, onClose, amount, label }: { open: boolean; onClose: () => void; amount: number; label: string }) {
  const { toast } = useApp();
  const [state, setState] = useState<'form' | 'paying' | 'done'>('form');
  const close = () => { setState('form'); onClose(); };
  return (
    <Modal open={open} onClose={close} title={state === 'done' ? 'Payment complete' : 'Renew membership'} subtitle="Visual payment mockup — no real payment is taken." size="sm">
      {state === 'done' ? (
        <div className="py-6 text-center"><CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" /><div className="mt-4 font-display text-xl font-bold text-slate-900">£{amount} paid (simulated)</div><p className="mt-1 text-sm text-slate-500">Membership extended to 14 Jan 2028.</p><Button variant="navy" className="mt-6" onClick={close}>Done</Button></div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl bg-navy p-4 text-white"><span className="text-sm text-white/70">{label}</span><span className="font-display text-2xl font-extrabold text-lime">£{amount}</span></div>
          <Field label="Card number"><Input defaultValue="4242 4242 4242 4242" /></Field>
          <div className="grid grid-cols-2 gap-3"><Field label="Expiry"><Input defaultValue="08 / 28" /></Field><Field label="CVC"><Input defaultValue="123" /></Field></div>
          <Button variant="lime" size="lg" className="w-full" disabled={state === 'paying'} icon={state === 'paying' ? <Loader2 className="animate-spin" /> : <Lock />}
            onClick={() => { setState('paying'); setTimeout(() => { setState('done'); toast('Renewal payment simulated.'); }, 1400); }}>
            {state === 'paying' ? 'Processing…' : `Pay £${amount}`}
          </Button>
        </div>
      )}
    </Modal>
  );
}

function Membership() {
  const { go } = useApp();
  const [auto, setAuto] = useState(true);
  const [pay, setPay] = useState(false);
  return (
    <div className="space-y-6">
      <PageHeader title="Registration & Renewal" desc="Manage your annual Clearing+ membership. All prices in GBP." />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-3xl bg-navy p-6 text-white lg:col-span-2 sm:p-8">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-lime/20 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2"><Badge tone="lime">Active</Badge><span className="text-xs text-white/50">Member since 14 Jan 2026</span></div>
            <div className="mt-5 text-sm text-white/60">Current plan</div>
            <div className="font-display text-2xl font-extrabold">Founding / member academy</div>
            <div className="mt-4 flex items-baseline gap-1"><span className="font-display text-5xl font-extrabold text-lime">£24.99</span><span className="text-white/50">/year</span></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[['Renewal date', '14 Jan 2027'], ['Payment method', 'Visa •• 4242'], ['Eligibility', 'Kingsmere United (member)']].map(([k, v]) => <div key={k} className="rounded-xl bg-white/[0.06] p-3"><div className="text-[11px] uppercase tracking-wider text-white/45">{k}</div><div className="mt-0.5 text-sm font-semibold">{v}</div></div>)}
            </div>
            <div className="mt-6 flex flex-wrap gap-2"><Button variant="lime" onClick={() => setPay(true)}>Renew now</Button><Button variant="glass" onClick={() => go('register', 'clearing')}>Open registration form</Button></div>
          </div>
        </div>
        <Card className="p-6">
          <Toggle checked={auto} onChange={setAuto} label="Auto-renew" desc="Renews automatically on 14 Jan 2027. We'll remind you 14 days before." />
          <div className="mt-6 border-t border-slate-100 pt-6">
            <div className="text-sm font-semibold text-slate-900">Registration progress</div>
            <ul className="mt-3 space-y-2.5 text-sm">{[['Account created', true], ['Membership paid', true], ['Verification complete', true], ['Profile 100% complete', false]].map(([t, d]) => <li key={t as string} className="flex items-center gap-2">{d ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Clock className="h-4 w-4 text-amber-500" />}<span className={d ? 'text-slate-600' : 'font-semibold text-slate-900'}>{t}</span></li>)}</ul>
          </div>
        </Card>
      </div>
      <Card>
        <CardHeader title="Annual membership fees" desc="Your fee depends on your country and releasing academy." />
        <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-6">
          {PLAYER_FEES.map((f, i) => (
            <div key={f.key} className={cn('rounded-2xl border p-5', i === 0 ? 'border-lime-dark/40 bg-lime/10' : 'border-slate-200')}>
              <div className="text-sm font-semibold text-slate-600">{f.label}</div>
              <div className="mt-2 font-display text-3xl font-extrabold text-slate-900">£{f.price}<span className="text-sm font-medium text-slate-400"> /year</span></div>
              <p className="mt-2 text-xs text-slate-500">{f.desc}</p>
              {i === 0 && <div className="mt-3 text-[11px] font-bold uppercase tracking-wider text-lime-dark">Your plan</div>}
            </div>
          ))}
        </div>
      </Card>
      <PayModal open={pay} onClose={() => setPay(false)} amount={24.99} label="Founding / member academy · 12 months" />
    </div>
  );
}

function Payments() {
  const rows = [
    { id: 'REN-2027', date: '14 Jan 2027', desc: 'Annual renewal — Founding/member academy', amount: 24.99, method: 'Visa •• 4242', status: 'Scheduled' },
    { id: 'PAY-90412', date: '14 Jan 2026', desc: 'Annual membership — Founding/member academy', amount: 24.99, method: 'Visa •• 4242', status: 'Paid' },
    { id: 'PAY-90388', date: '13 Jan 2026', desc: 'Annual membership — attempt', amount: 24.99, method: 'Mastercard •• 0071', status: 'Failed' },
  ];
  return (
    <div className="space-y-6">
      <PageHeader title="Payment History" desc="Receipts for your Clearing+ membership. All amounts in GBP." />
      <DataTable rows={rows} columns={[
        { key: 'id', label: 'Reference', render: (r) => <span className="font-mono text-xs font-semibold text-slate-900">{r.id}</span> },
        { key: 'date', label: 'Date' }, { key: 'desc', label: 'Description' }, { key: 'method', label: 'Method' },
        { key: 'amount', label: 'Amount', align: 'right', render: (r) => <b className="text-slate-900">£{r.amount.toFixed(2)}</b> },
        { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
        { key: 'dl', label: '', render: (r) => r.status === 'Paid' ? <button onClick={() => downloadCSV(`receipt-${r.id}.csv`, [r])} className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900"><Download className="h-3.5 w-3.5" /> Receipt</button> : null },
      ]} />
    </div>
  );
}

function JobPlusOptIn() {
  const { toast } = useApp();
  const [consent, setConsent] = useState(false);
  const [opted, setOpted] = useState(false);
  if (opted)
    return (
      <div className="theme-jobplus space-y-6">
        <PageHeader eyebrow="Job+ · Powered by Clearing+" title="Build your Job+ career profile" desc="Your answers create an AI-assisted draft (simulated) which your PPM reviews before anything is published." />
        <CVBuilder embedded />
      </div>
    );
  return (
    <div className="space-y-6">
      <PageHeader title="Job+ Career Opt-in" desc="Explore careers beyond the pitch with a professional, human-reviewed CV." />
      <div className="grid overflow-hidden rounded-3xl bg-ink text-white lg:grid-cols-2">
        <div className="p-6 sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-aqua"><Sparkles className="h-3.5 w-3.5" /> Job+ · Powered by Clearing+</div>
          <h2 className="mt-5 font-jakarta text-3xl font-extrabold tracking-tight sm:text-4xl">Your skills go <span className="font-serif font-normal italic text-aqua">beyond</span> the pitch.</h2>
          <p className="mt-3 text-white/60">Opting in to Job+ doesn't affect your football profile. You can be discoverable to clubs and employers at the same time.</p>
          <ul className="mt-6 space-y-2.5 text-sm">{['Verified Clearing+ player', 'Aged 18+ (no guardian consent needed)', 'Active membership'].map((t) => <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-aqua" />{t}<span className="ml-auto text-xs font-semibold text-aqua">Eligible</span></li>)}</ul>
          <div className="mt-6 rounded-2xl bg-white/5 p-4"><Checkbox checked={consent} onChange={setConsent} label={<span className="text-white">I consent to my information being used to create a Job+ career profile.</span>} desc={<span className="text-white/50">Your profile is only published after PPM review and your approval.</span>} /></div>
          <Button variant="teal" size="lg" className="mt-6" iconRight={<ArrowRight />} onClick={() => { if (!consent) return toast('Please give consent to continue.', 'error'); setOpted(true); toast('Opted in to Job+.'); }}>Opt in & start my CV</Button>
        </div>
        <div className="relative min-h-[260px]"><img src={IMG.office4} alt="" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-ink to-transparent" /></div>
      </div>
    </div>
  );
}

function AccountSettings() {
  const { toast } = useApp();
  const [n, setN] = useState({ claims: true, messages: true, digest: true, marketing: false });
  const [del, setDel] = useState(false);
  return (
    <div className="space-y-6">
      <PageHeader title="Account Settings" desc="Manage your login details and notifications." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <div className="font-display font-bold text-slate-900">Login details</div>
          <div className="mt-4 grid gap-4">
            <Field label="Email"><Input defaultValue="jordan.ellis@example.com" /></Field>
            <Field label="Mobile"><Input defaultValue="07700 900321" /></Field>
            <Field label="Current password"><Input type="password" defaultValue="password123" /></Field>
            <Field label="New password"><Input type="password" placeholder="At least 10 characters" /></Field>
          </div>
          <Button variant="navy" className="mt-5" onClick={() => toast('Account details updated (demo).')}>Update details</Button>
        </Card>
        <Card className="p-5 sm:p-6">
          <div className="font-display font-bold text-slate-900">Notifications</div>
          <div className="mt-5 space-y-5">
            <Toggle checked={n.claims} onChange={(v) => setN({ ...n, claims: v })} label="Claim updates" desc="When a Claim is submitted, approved or changes stage." />
            <Toggle checked={n.messages} onChange={(v) => setN({ ...n, messages: v })} label="PPM messages" desc="New messages from your Player Placement Manager." />
            <Toggle checked={n.digest} onChange={(v) => setN({ ...n, digest: v })} label="Weekly profile digest" desc="Views and shortlists from verified clubs." />
            <Toggle checked={n.marketing} onChange={(v) => setN({ ...n, marketing: v })} label="Clearing+ news" desc="Occasional product and programme updates." />
          </div>
        </Card>
      </div>
      <Card className="flex flex-col gap-4 border-rose-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div><div className="font-display font-bold text-rose-600">Deactivate account</div><p className="text-sm text-slate-500">Hide your profile from clubs and pause your membership.</p></div>
        <Button variant="danger" onClick={() => setDel(true)}>Deactivate</Button>
      </Card>
      <Modal open={del} onClose={() => setDel(false)} title="Deactivate your account?" size="sm" footer={<><Button variant="ghost" onClick={() => setDel(false)}>Cancel</Button><Button variant="danger" onClick={() => { setDel(false); toast('Deactivation simulated — nothing changed.', 'info'); }}>Deactivate</Button></>}>
        <p className="text-sm text-slate-600">Your profile will be hidden from verified clubs immediately. Active Claims will be paused and your PPM notified.</p>
      </Modal>
    </div>
  );
}

function Privacy() {
  const { toast } = useApp();
  const [p, setP] = useState({ discoverable: true, intl: true, academy: true, jobplus: false, analytics: true });
  return (
    <div className="space-y-6">
      <PageHeader title="Privacy Settings" desc="Control who can discover you and how your data is used." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5 sm:p-6 lg:col-span-2">
          <div className="space-y-6">
            <Toggle checked={p.discoverable} onChange={(v) => { setP({ ...p, discoverable: v }); toast(v ? 'Profile is discoverable by verified clubs.' : 'Profile hidden from club search.', 'info'); }} label="Discoverable by verified clubs" desc="Turn off to hide your profile from player search." />
            <Toggle checked={p.intl} onChange={(v) => setP({ ...p, intl: v })} label="Visible to international clubs" desc="Allow verified clubs outside the UK to find you." />
            <Toggle checked={p.academy} onChange={(v) => setP({ ...p, academy: v })} label="Show academy name" desc="Otherwise clubs see only the academy category." />
            <Toggle checked={p.jobplus} onChange={(v) => setP({ ...p, jobplus: v })} label="Job+ employers can view my published CV" desc="Only applies once you opt in to Job+." />
            <Toggle checked={p.analytics} onChange={(v) => setP({ ...p, analytics: v })} label="Product analytics" desc="Help us improve Clearing+ with anonymised usage data." />
          </div>
          <Button variant="navy" className="mt-6" onClick={() => toast('Privacy preferences saved.')}>Save preferences</Button>
        </Card>
        <div className="space-y-4">
          <InfoNote tone="navy" icon={Lock}>Always hidden from clubs: phone, email, address, private documents, guardian details and payment information.</InfoNote>
          <Card className="p-5">
            <div className="font-display font-bold text-slate-900">Your data</div>
            <div className="mt-4 grid gap-2">
              <Button variant="outline" icon={<Download />} onClick={() => downloadCSV('my-clearing-profile.csv', [{ name: me.name, position: me.position, age: me.age, country: me.country, academy: me.academy, height_cm: me.height, foot: me.foot }])}>Download my data</Button>
              <Button variant="ghost" className="text-rose-600 hover:bg-rose-50 hover:text-rose-700" onClick={() => toast('Deletion request recorded (demo).', 'info')}>Request account deletion</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
