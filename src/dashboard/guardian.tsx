import { useState } from 'react';
import { LayoutDashboard, ShieldCheck, TrendingUp, Bell, MessagesSquare, LifeBuoy, Briefcase, Settings, Lock, Eye, FileSignature, Video, CheckCircle2, Clock, AlertTriangle, XCircle, BadgeCheck, Calendar } from 'lucide-react';
import { useApp, usePersist } from '../store';
import { Badge, Button, Card, CardHeader, Checkbox, ClaimPipeline, Field, InfoNote, Input, Modal, PageHeader, Progress, RadioCards, Ring, Select, StatCard, Tabs, Textarea, Timeline, Toggle, UploadZone, cn } from '../components/ui';
import { AreaChart } from '../components/charts';
import { Messenger } from '../components/Messenger';
import type { NavGroup } from './Shell';
import { CLAIMS, GUARDIAN_THREADS, HEADSHOTS, PLAYERS, PROFILE_VIEWS, WEEKS } from '../data/mock';

const child = PLAYERS[3];
const claim = CLAIMS.find((c) => c.id === 'CLM-2043')!;

export const guardianNav: NavGroup[] = [
  { title: 'Ethan Brooks (17)', items: [
    { key: 'overview', label: 'Linked Player', icon: LayoutDashboard },
    { key: 'consent', label: 'Guardian Consent', icon: ShieldCheck },
    { key: 'progress', label: 'Player Progress', icon: TrendingUp },
    { key: 'claims', label: 'Claim Notifications', icon: Bell, badge: 1 },
    { key: 'messages', label: 'PPM Conversations', icon: MessagesSquare, badge: 1 },
  ] },
  { title: 'Safety & settings', items: [
    { key: 'safeguarding', label: 'Report a Concern', icon: LifeBuoy },
    { key: 'jobplus', label: 'Job+ Consent', icon: Briefcase },
    { key: 'settings', label: 'Account Settings', icon: Settings },
  ] },
];

export function GuardianDashboard({ screen }: { screen: string }) {
  switch (screen) {
    case 'consent': return <Consent />;
    case 'progress': return <Progress_ />;
    case 'claims': return <Claims />;
    case 'messages': return (<><PageHeader title="PPM Conversations" desc="Speak directly with Ethan's Player Placement Manager." /><Messenger threads={GUARDIAN_THREADS} me="Michelle Brooks" banner={<span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> Clubs cannot contact you or Ethan directly. All conversations are PPM-managed.</span>} /></>);
    case 'safeguarding': return <Concern />;
    case 'jobplus': return <JobConsent />;
    case 'settings': return <GSettings />;
    default: return <Overview />;
  }
}

function PrivacyNote() {
  return <InfoNote icon={Lock}>You can only see information about players linked to your guardian account. Other players' records are never visible.</InfoNote>;
}

function Overview() {
  const { setScreen } = useApp();
  const [consent] = usePersist('guardian-consent', 'Approved');
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl bg-navy text-white">
        <div className="grid md:grid-cols-[260px_1fr]">
          <img src={child.photo} alt="" className="h-60 w-full object-cover object-top md:h-full" />
          <div className="p-6 sm:p-8">
            <div className="text-xs font-bold uppercase tracking-[.18em] text-lime">Linked player</div>
            <div className="mt-2 flex flex-wrap items-center gap-2"><h1 className="font-display text-3xl font-extrabold">{child.name}</h1><Badge tone="green">Verified</Badge><Badge>{consent}</Badge></div>
            <p className="mt-1 text-white/60">{child.position} · Age {child.age} · {child.academy}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">{[['Availability', child.availability], ['Your consent', consent], ['PPM', 'Priya Nair']].map(([k, v]) => <div key={k} className="rounded-xl bg-white/[0.07] p-3"><div className="text-[11px] uppercase tracking-wider text-white/45">{k}</div><div className="mt-0.5 text-sm font-semibold">{v}</div></div>)}</div>
            <div className="mt-6 flex flex-wrap gap-2"><Button variant="lime" size="sm" onClick={() => setScreen('consent')}>Manage consent</Button><Button variant="glass" size="sm" onClick={() => setScreen('messages')}>Message PPM</Button></div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Profile views (30 days)" value="64" delta="12% vs last month" icon={Eye} />
        <StatCard label="Active Claims" value="1" hint="Castleton Athletic" icon={FileSignature} tone="amber" />
        <StatCard label="Approved videos" value="2" hint="1 in moderation" icon={Video} tone="lime" />
        <StatCard label="Unread messages" value="1" hint="From Priya Nair" icon={MessagesSquare} tone="sky" />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="What's happening next" desc={`${claim.id} · ${claim.club} · ${claim.type}`} action={<Badge>{claim.status}</Badge>} />
          <div className="p-5 sm:p-6"><ClaimPipeline status={claim.status} /></div>
          <div className="mx-5 mb-5 flex items-center gap-3 rounded-2xl bg-mist p-4 sm:mx-6"><Calendar className="h-5 w-5 text-navy" /><p className="flex-1 text-sm text-slate-600">Family call with Priya and the club's welfare lead — <b className="text-slate-900">Thursday, 6:00pm</b>.</p></div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">Ethan's PPM</div>
          <div className="mt-4 flex items-center gap-3"><img src={HEADSHOTS[6]} alt="" className="h-14 w-14 rounded-2xl object-cover" /><div><div className="font-display text-lg font-bold text-slate-900">Priya Nair</div><div className="text-sm text-slate-500">PPM · Safeguarding lead</div></div></div>
          <Button variant="navy" className="mt-5 w-full" onClick={() => setScreen('messages')}>Open conversation</Button>
        </Card>
      </div>
      <PrivacyNote />
    </div>
  );
}

function Consent() {
  const { toast } = useApp();
  const [state, setState] = usePersist('guardian-consent', 'Approved');
  const [d, setD] = useState({ a: false, b: false, c: false, sig: '' });
  const [withdraw, setWithdraw] = useState(false);
  const icon = state === 'Approved' ? CheckCircle2 : state === 'Pending' ? Clock : XCircle;
  const Icon = icon;
  return (
    <div className="space-y-6">
      <PageHeader title="Guardian Consent" desc="Ethan is 17, so his profile is only visible to verified clubs while your consent is active." actions={<div className="flex items-center gap-2"><span className="text-xs font-semibold text-slate-400">Preview state:</span><Tabs variant="pill" value={state} onChange={setState} tabs={[{ key: 'Pending', label: 'Pending' }, { key: 'Approved', label: 'Approved' }, { key: 'Withdrawn', label: 'Withdrawn' }]} /></div>} />
      <div className={cn('rounded-3xl p-6 sm:p-8', state === 'Approved' ? 'bg-emerald-50 ring-1 ring-emerald-200' : state === 'Pending' ? 'bg-amber-50 ring-1 ring-amber-200' : 'bg-rose-50 ring-1 ring-rose-200')}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <span className={cn('grid h-16 w-16 shrink-0 place-items-center rounded-2xl', state === 'Approved' ? 'bg-emerald-500 text-white' : state === 'Pending' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white')}><Icon className="h-8 w-8" /></span>
          <div className="flex-1">
            <div className="font-display text-2xl font-extrabold text-slate-900">{state === 'Approved' ? 'Consent approved' : state === 'Pending' ? 'Consent pending' : 'Consent withdrawn'}</div>
            <p className="mt-1 text-sm text-slate-600">{state === 'Approved' ? 'Given on 04 Feb 2026. Ethan’s profile is visible to verified clubs. You can withdraw at any time.' : state === 'Pending' ? 'Ethan’s profile is hidden from clubs until you review and approve it below.' : 'Ethan’s profile is hidden from all clubs and active Claims are paused. You can give consent again at any time.'}</p>
          </div>
          {state === 'Approved' && <Button variant="danger" onClick={() => setWithdraw(true)}>Withdraw consent</Button>}
          {state === 'Withdrawn' && <Button variant="navy" onClick={() => { setState('Pending'); toast('Consent request re-opened.', 'info'); }}>Give consent again</Button>}
        </div>
      </div>
      {state === 'Pending' && (
        <Card className="p-5 sm:p-6">
          <div className="font-display font-bold text-slate-900">Review & give consent</div>
          <div className="mt-4 space-y-3">
            <Checkbox checked={d.a} onChange={(v) => setD({ ...d, a: v })} label="I confirm I am Ethan's parent or legal guardian." />
            <Checkbox checked={d.b} onChange={(v) => setD({ ...d, b: v })} label="I consent to Ethan's football profile being visible to verified clubs." desc="Clubs see football information only — never contact details, documents or your details." />
            <Checkbox checked={d.c} onChange={(v) => setD({ ...d, c: v })} label="I understand all club communication is managed by a PPM and I will be included in discussions." />
          </div>
          <Field label="Signature (type your full name)" className="mt-5 max-w-sm"><Input value={d.sig} onChange={(e) => setD({ ...d, sig: e.target.value })} placeholder="Michelle Brooks" className="font-serif text-lg italic" /></Field>
          <Button variant="navy" className="mt-5" onClick={() => { if (!(d.a && d.b && d.c && d.sig)) return toast('Please complete all declarations and sign.', 'error'); setState('Approved'); toast('Consent recorded — Ethan’s profile can now be shown to verified clubs.'); }}>Give consent</Button>
        </Card>
      )}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card><CardHeader title="What your consent allows" /><ul className="space-y-3 p-5 text-sm sm:p-6">{['Verified clubs can view Ethan’s football profile and approved videos', 'Clubs can submit Claims, reviewed by a PPM first', 'You are notified about every Claim and included in discussions'].map((t) => <li key={t} className="flex gap-2.5 text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />{t}</li>)}{['Clubs never see contact details, documents or guardian information', 'Clubs cannot message Ethan directly'].map((t) => <li key={t} className="flex gap-2.5 text-slate-700"><Lock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />{t}</li>)}</ul></Card>
        <Card><CardHeader title="Consent history" /><div className="p-5 sm:p-6"><Timeline items={[{ title: 'Consent approved by Michelle Brooks', time: '04 Feb 2026 · 19:12', tone: 'green', icon: CheckCircle2 }, { title: 'Identity verified', time: '03 Feb 2026', tone: 'blue', icon: BadgeCheck }, { title: 'Consent requested by Ethan', time: '02 Feb 2026', tone: 'slate', icon: Clock }]} /></div></Card>
      </div>
      <Modal open={withdraw} onClose={() => setWithdraw(false)} size="sm" title="Withdraw consent?" footer={<><Button variant="ghost" onClick={() => setWithdraw(false)}>Cancel</Button><Button variant="danger" onClick={() => { setState('Withdrawn'); setWithdraw(false); toast('Consent withdrawn — profile hidden from clubs.', 'info'); }}>Withdraw</Button></>}>
        <p className="text-sm text-slate-600">Ethan's profile will be hidden from verified clubs immediately, and the active Claim from Castleton Athletic will be paused. Priya Nair will be notified.</p>
      </Modal>
    </div>
  );
}

function Progress_() {
  return (
    <div className="space-y-6">
      <PageHeader title="Player Progress" desc="Ethan's profile, verification and visibility at a glance." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center p-8 text-center"><Ring value={88} size={130} stroke={12} color="#6f9e17" track="#F1F5F9"><div><div className="font-display text-3xl font-extrabold text-slate-900">88%</div><div className="text-xs text-slate-500">complete</div></div></Ring><div className="mt-4 font-semibold text-slate-900">Profile completion</div><p className="text-sm text-slate-500">Add a second video to reach 100%.</p></Card>
        <Card className="lg:col-span-2"><CardHeader title="Verification" /><ul className="divide-y divide-slate-100 p-2 sm:p-3">{[['Identity', 'Verified'], ['Academy history', 'Verified'], ['Guardian consent', 'Approved'], ['Highlight videos', 'In review']].map(([t, s]) => <li key={t} className="flex items-center gap-3 p-3">{s === 'In review' ? <Clock className="h-5 w-5 text-amber-500" /> : <CheckCircle2 className="h-5 w-5 text-emerald-500" />}<span className="flex-1 text-sm font-semibold text-slate-900">{t}</span><Badge>{s}</Badge></li>)}</ul></Card>
      </div>
      <Card><CardHeader title="Profile views by verified clubs" desc="Last 12 weeks" /><div className="p-4 sm:p-6"><AreaChart labels={WEEKS} series={[{ name: 'Views', data: PROFILE_VIEWS.map((v) => Math.round(v * 0.6)), color: '#102A43' }]} /></div></Card>
      <div className="grid gap-4 sm:grid-cols-3">{[['Appearances', child.apps], ['Goals', child.goals], ['Assists', child.assists]].map(([k, v]) => <Card key={k as string} className="p-5"><div className="text-sm text-slate-500">{k} (2 seasons)</div><div className="mt-1 font-display text-3xl font-extrabold text-slate-900">{v}</div></Card>)}</div>
    </div>
  );
}

function Claims() {
  return (
    <div className="space-y-6">
      <PageHeader title="Claim Notifications" desc="Every Claim for Ethan is reviewed by a PPM before he's asked to discuss it — and you're always included." />
      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><div className="font-display text-lg font-bold text-slate-900">{claim.club}</div><div className="text-sm text-slate-500">{claim.id} · {claim.type} · PPM {claim.ppm}</div></div><Badge>{claim.status}</Badge></div>
        <div className="mt-6"><ClaimPipeline status={claim.status} /></div>
        <p className="mt-6 rounded-2xl bg-mist p-4 text-sm text-slate-600">{claim.note}</p>
      </Card>
      <Card><CardHeader title="Notifications" /><div className="p-5 sm:p-6"><Timeline items={[
        { title: 'Family call scheduled with Castleton Athletic welfare lead', desc: 'Thursday, 6:00pm · via PPM', time: 'Today', tone: 'teal', icon: Calendar },
        { title: 'Claim approved by PPM after credibility review', desc: 'Named coach and safeguarding officer confirmed', time: '03 Mar 2026', tone: 'green', icon: CheckCircle2 },
        { title: 'New Claim submitted by Castleton Athletic', desc: 'Scholarship opportunity', time: '02 Mar 2026', tone: 'blue', icon: FileSignature },
      ]} /></div></Card>
      <PrivacyNote />
    </div>
  );
}

function Concern() {
  const { toast } = useApp();
  const [sent, setSent] = useState(false);
  const [urgency, setUrgency] = useState('Medium');
  const [ack, setAck] = useState(false);
  return (
    <div className="space-y-6">
      <PageHeader title="Report a Safeguarding Concern" desc="Confidential. Reports go directly to the Clearing+ designated safeguarding lead." />
      <InfoNote tone="rose" icon={AlertTriangle}>If a child is in immediate danger, call <b>999</b> now. This form is for non-emergency concerns.</InfoNote>
      {sent ? (
        <Card className="p-8 text-center"><CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" /><div className="mt-4 font-display text-2xl font-extrabold text-slate-900">Concern received</div><p className="mt-1 text-slate-600">Reference <b>SG-0119</b>. Our safeguarding lead will contact you within 24 hours. (Demo — nothing was sent.)</p><Button variant="outline" className="mt-6" onClick={() => setSent(false)}>Report another concern</Button></Card>
      ) : (
        <Card className="p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Type of concern" required><Select options={['Contact outside the platform', 'Inappropriate behaviour by club staff', 'Unverified agent / intermediary', 'Wellbeing concern', 'Online safety', 'Other']} /></Field>
            <Field label="Who is involved?"><Input placeholder="e.g. a person claiming to represent a club" /></Field>
            <Field label="When did this happen?"><Input type="date" defaultValue="2026-03-12" /></Field>
            <Field label="Preferred contact"><Select options={['Phone call', 'Email', 'Message in dashboard']} /></Field>
            <Field label="What happened?" required className="sm:col-span-2"><Textarea rows={5} placeholder="Please describe what happened, including any names, dates or messages…" /></Field>
            <Field label="Urgency" className="sm:col-span-2"><RadioCards cols={3} value={urgency} onChange={setUrgency} options={[{ value: 'Low', label: 'Low', desc: 'For information' }, { value: 'Medium', label: 'Medium', desc: 'Needs follow-up' }, { value: 'High', label: 'High', desc: 'Needs urgent review' }]} /></Field>
            <Field label="Evidence (optional)" className="sm:col-span-2"><UploadZone label="Upload screenshots or documents" hint="Stored securely · visible to safeguarding staff only" /></Field>
          </div>
          <Checkbox className="mt-5" checked={ack} onChange={setAck} label="I understand this report will be shared with the Clearing+ safeguarding team." />
          <Button variant="navy" className="mt-5" icon={<LifeBuoy />} onClick={() => { if (!ack) return toast('Please confirm you understand how the report is shared.', 'error'); setSent(true); toast('Safeguarding concern submitted (demo).'); }}>Submit concern</Button>
        </Card>
      )}
    </div>
  );
}

function JobConsent() {
  const { toast } = useApp();
  const [on, setOn] = usePersist('guardian-jobplus', false);
  return (
    <div className="theme-jobplus space-y-6">
      <PageHeader eyebrow="Job+ · Powered by Clearing+" title="Job+ Consent" desc="Players aged 16–17 need guardian consent before they can create a Job+ career profile." />
      <Card className="p-5 sm:p-6">
        <Toggle checked={on} onChange={(v) => { setOn(v); toast(v ? 'Job+ consent given — Ethan can now opt in.' : 'Job+ consent withdrawn.', v ? 'success' : 'info'); }} label="Allow Ethan to use Job+" desc="Ethan can build an AI-assisted CV, reviewed by his PPM. Nothing is published to employers without his approval." />
        <div className="mt-6 grid gap-3 sm:grid-cols-3">{[['Status', on ? 'Consent given' : 'Not given'], ['Employer region', 'UK only'], ['CV review', 'By PPM Priya Nair']].map(([k, v]) => <div key={k} className="rounded-xl bg-sand p-3"><div className="text-xs text-slate-500">{k}</div><div className="text-sm font-semibold text-ink">{v}</div></div>)}</div>
      </Card>
      <InfoNote tone="teal">Employers only see a published profile and must request introductions through the PPM. For under-18s, you will be included in any employer conversations.</InfoNote>
    </div>
  );
}

function GSettings() {
  const { toast } = useApp();
  const [n, setN] = useState({ claims: true, messages: true, weekly: false });
  return (
    <div className="space-y-6">
      <PageHeader title="Account Settings" desc="Your guardian account details and notifications." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5 sm:p-6"><div className="grid gap-4"><Field label="Full name"><Input defaultValue="Michelle Brooks" /></Field><Field label="Email"><Input defaultValue="m.brooks@example.com" /></Field><Field label="Mobile"><Input defaultValue="07700 900456" /></Field><Field label="Relationship"><Select options={['Mother', 'Father', 'Legal guardian']} /></Field></div><Button variant="navy" className="mt-5" onClick={() => toast('Details saved (demo).')}>Save details</Button></Card>
        <Card className="space-y-5 p-5 sm:p-6"><div className="font-display font-bold text-slate-900">Notifications</div><Toggle checked={n.claims} onChange={(v) => setN({ ...n, claims: v })} label="Claim updates" desc="Every new Claim and stage change." /><Toggle checked={n.messages} onChange={(v) => setN({ ...n, messages: v })} label="PPM messages" /><Toggle checked={n.weekly} onChange={(v) => setN({ ...n, weekly: v })} label="Weekly progress summary" /></Card>
      </div>
      <Card className="p-5 sm:p-6"><div className="text-sm font-semibold text-slate-900">Linked players</div><div className="mt-3 flex items-center gap-3 rounded-xl bg-mist p-3"><img src={child.photo} alt="" className="h-10 w-10 rounded-full object-cover object-top" /><div className="flex-1"><div className="text-sm font-semibold text-slate-900">{child.name}</div><div className="text-xs text-slate-500">Age 17 · linked 02 Feb 2026</div></div><Badge tone="green">Linked</Badge></div><Progress className="mt-4 hidden" value={0} /></Card>
    </div>
  );
}
