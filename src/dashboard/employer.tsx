import { useMemo, useState } from 'react';
import { LayoutDashboard, Briefcase, PlusCircle, Search, Bookmark, Handshake, BarChart3, Building2, Receipt, Settings, Users, CheckCircle2, Eye, Send, MapPin, Clock, BadgeCheck, Car, Download, PoundSterling, Trophy, Calendar } from 'lucide-react';
import { useApp, usePersist } from '../store';
import { Avatar, Badge, Button, Card, CardHeader, Chips, DataTable, Drawer, EmptyState, Field, InfoNote, Input, Modal, PageHeader, Select, StatCard, Tabs, Textarea, Timeline, Toggle, UploadZone, cn } from '../components/ui';
import { BarChart, HBarList } from '../components/charts';
import { CVDocument, SkillsProfile } from '../components/CV';
import type { NavGroup } from './Shell';
import { CANDIDATES, EMPLOYERS, INDUSTRIES, JOBS, gbp, hiringFee, type Candidate, type Job } from '../data/mock';

const company = EMPLOYERS[0];
type Req = { id: string; candidate: string; job: string; date: string; status: string; salary?: number };
const INIT_REQ: Req[] = [
  { id: 'INT-118', candidate: 'Marcus Bennett', job: 'Operations Coordinator', date: '10 Mar 2026', status: 'Introduced' },
  { id: 'INT-117', candidate: 'Femi Adebayo', job: 'Warehouse Team Leader', date: '08 Mar 2026', status: 'Interviewing' },
  { id: 'INT-116', candidate: 'Aaron Clarke-Wright', job: 'Graduate Sales Executive', date: '05 Mar 2026', status: 'Pending PPM review' },
  { id: 'INT-114', candidate: 'Daniel Hughes', job: 'Graduate Sales Executive', date: '02 Mar 2026', status: 'Offer' },
  { id: 'INT-115', candidate: 'Kieran Doyle', job: 'Customer Success Associate', date: '20 Feb 2026', status: 'Declined' },
  { id: 'INT-112', candidate: 'Owen Fletcher', job: 'Warehouse Team Leader', date: '12 Jan 2026', status: 'Hired', salary: 30000 },
];
const STAGES = ['Pending PPM review', 'Introduced', 'Interviewing', 'Offer', 'Hired'];
const short = (n: string) => { const [f, ...r] = n.split(' '); return `${f} ${r.join(' ')[0] ?? ''}.`; };

export const employerNav: NavGroup[] = [
  { title: 'Hiring', items: [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'jobs', label: 'Job Postings', icon: Briefcase },
    { key: 'create', label: 'Create Job Listing', icon: PlusCircle },
    { key: 'candidates', label: 'Candidate Search', icon: Search },
    { key: 'saved', label: 'Saved Candidates', icon: Bookmark, badge: 2 },
    { key: 'interest', label: 'Interest & Introductions', icon: Handshake, badge: 1 },
    { key: 'hiring', label: 'Hiring Status & Reports', icon: BarChart3 },
  ] },
  { title: 'Company', items: [
    { key: 'company', label: 'Company Profile', icon: Building2 },
    { key: 'billing', label: 'Payments & Invoices', icon: Receipt },
    { key: 'settings', label: 'Settings', icon: Settings },
  ] },
];

function useEmp() {
  const [jobs, setJobs] = usePersist<Job[]>('emp-jobs', JOBS);
  const [saved, setSaved] = usePersist<string[]>('emp-saved', ['k1', 'k3']);
  const [reqs, setReqs] = usePersist<Req[]>('emp-reqs', INIT_REQ);
  return { jobs, setJobs, saved, setSaved, reqs, setReqs };
}
type E = ReturnType<typeof useEmp>;

export function EmployerDashboard({ screen }: { screen: string }) {
  const e = useEmp();
  const { toast } = useApp();
  const [cv, setCv] = useState<Candidate | null>(null);
  const [intro, setIntro] = useState<Candidate | null>(null);
  const [job, setJob] = useState(JOBS[0].title);
  const toggleSave = (c: Candidate) => { e.setSaved((s) => (s.includes(c.id) ? s.filter((x) => x !== c.id) : [...s, c.id])); toast(e.saved.includes(c.id) ? `${short(c.name)} removed from saved.` : `${short(c.name)} saved.`, 'info'); };
  const a = { onCV: setCv, onIntro: setIntro, onSave: toggleSave };
  let body;
  switch (screen) {
    case 'jobs': body = <Jobs e={e} />; break;
    case 'create': body = <CreateJob e={e} />; break;
    case 'candidates': body = <Candidates e={e} a={a} />; break;
    case 'saved': body = <Saved e={e} a={a} />; break;
    case 'interest': body = <Interest e={e} />; break;
    case 'hiring': body = <Hiring e={e} />; break;
    case 'company': body = <Company />; break;
    case 'billing': body = <Billing />; break;
    case 'settings': body = <ESettings />; break;
    default: body = <Overview e={e} a={a} />;
  }
  return (
    <>
      {body}
      <Modal open={!!cv} onClose={() => setCv(null)} size="xl" title={cv ? `${cv.name} — candidate profile` : ''} subtitle="Published, PPM-reviewed profile" footer={cv && <><Button variant="outline" icon={<Bookmark />} onClick={() => toggleSave(cv)}>{e.saved.includes(cv.id) ? 'Saved' : 'Save'}</Button><Button variant="teal" icon={<Send />} onClick={() => { setIntro(cv); setCv(null); }}>Request introduction</Button></>}>
        {cv && <CVTabs c={cv} />}
      </Modal>
      <Modal open={!!intro} onClose={() => setIntro(null)} title="Request an introduction" subtitle={intro ? `${intro.name} · via their Player Placement Manager` : ''}
        footer={<Button variant="teal" icon={<Send />} onClick={() => { if (!intro) return; e.setReqs((r) => [{ id: `INT-${120 + r.length}`, candidate: intro.name, job, date: '14 Mar 2026', status: 'Pending PPM review' }, ...r]); toast('Introduction requested — the PPM will review and share it with the candidate.'); setIntro(null); }}>Send request</Button>}>
        <div className="space-y-4">
          <Field label="For which vacancy?"><Select value={job} onChange={(ev) => setJob(ev.target.value)} options={e.jobs.filter((j) => j.status === 'Live').map((j) => j.title)} /></Field>
          <Field label="Message for the PPM"><Textarea rows={4} defaultValue="We'd love to introduce Meridian and discuss the role. Interviews can be arranged at our Manchester office or by video." /></Field>
          <InfoNote tone="teal">Candidates are never contacted directly. Their PPM reviews your request and the candidate decides whether to proceed.</InfoNote>
        </div>
      </Modal>
    </>
  );
}
type A = { onCV: (c: Candidate) => void; onIntro: (c: Candidate) => void; onSave: (c: Candidate) => void };

function CVTabs({ c }: { c: Candidate }) {
  const [t, setT] = useState('cv');
  return (
    <div>
      <Tabs variant="pill" value={t} onChange={setT} tabs={[{ key: 'cv', label: 'Professional CV' }, { key: 'skills', label: 'Skills Profile' }]} className="mb-5" />
      {t === 'cv' ? <CVDocument data={{ name: c.name, title: `${c.role} · Former academy footballer`, location: `${c.city}, UK`, email: 'Shared after introduction', phone: 'Shared after introduction' }} /> : <SkillsProfile name={c.name} />}
    </div>
  );
}

function CandidateCard({ c, saved, a }: { c: Candidate; saved: boolean; a: A }) {
  return (
    <Card className="flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/60">
      <div className="flex items-start gap-3">
        <Avatar name={c.name} src={c.photo} size={52} />
        <div className="min-w-0 flex-1"><div className="font-jakarta font-bold text-ink">{short(c.name)}</div><div className="truncate text-sm text-slate-500">{c.role}</div><div className="mt-1 flex items-center gap-1 text-xs text-slate-400"><MapPin className="h-3 w-3" />{c.city}</div></div>
        <div className="text-right"><div className="font-jakarta text-xl font-extrabold text-teal">{c.match}%</div><div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">match</div></div>
      </div>
      <p className="mt-3 text-xs text-slate-500">{c.football}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">{c.skills.map((s) => <span key={s} className="rounded-full bg-teal/10 px-2.5 py-1 text-[11px] font-semibold text-teal-dark">{s}</span>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px]">
        {[{ i: PoundSterling, v: gbp(c.salary) }, { i: Clock, v: c.availability }, { i: Car, v: c.licence === 'Full UK licence' ? 'Full licence' : c.licence }].map((x, k) => <div key={k} className="rounded-xl bg-sand px-1 py-2"><x.i className="mx-auto h-3.5 w-3.5 text-slate-400" /><div className="mt-0.5 truncate font-semibold text-ink">{x.v}</div></div>)}
      </div>
      <div className="mt-4 grid grid-cols-[auto_1fr_1fr] gap-2">
        <button onClick={() => a.onSave(c)} className={cn('grid h-9 w-9 place-items-center rounded-xl border transition', saved ? 'border-teal bg-teal text-white' : 'border-slate-200 text-slate-500 hover:bg-slate-50')} aria-label="Save"><Bookmark className="h-4 w-4" /></button>
        <Button size="sm" variant="outline" className="rounded-xl" icon={<Eye />} onClick={() => a.onCV(c)}>View CV</Button>
        <Button size="sm" variant="teal" className="rounded-xl" onClick={() => a.onIntro(c)}>Introduce</Button>
      </div>
    </Card>
  );
}

function Overview({ e, a }: { e: E; a: A }) {
  const { setScreen } = useApp();
  const pipeline = STAGES.map((s) => ({ label: s, value: e.reqs.filter((r) => r.status === s).length }));
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 rounded-3xl bg-ink p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div><div className="text-xs font-bold uppercase tracking-[.18em] text-aqua">Job+ employer</div><div className="mt-1 flex flex-wrap items-center gap-2"><h1 className="font-jakarta text-2xl font-extrabold sm:text-3xl">Welcome back, Hannah</h1><Badge tone="teal">Verified UK employer</Badge></div><p className="mt-1 text-sm text-white/60">{company.name} · {company.city} · {company.sector}</p></div>
        <div className="flex gap-2"><Button variant="teal" icon={<Search />} onClick={() => setScreen('candidates')}>Find candidates</Button><Button variant="glass" icon={<PlusCircle />} onClick={() => setScreen('create')}>New listing</Button></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Live vacancies" value={e.jobs.filter((j) => j.status === 'Live').length} icon={Briefcase} tone="teal" />
        <StatCard label="Candidate matches" value="45" delta="3 new today" icon={Users} tone="ink" />
        <StatCard label="Open introductions" value={e.reqs.filter((r) => !['Hired', 'Declined'].includes(r.status)).length} icon={Handshake} tone="sky" />
        <StatCard label="Hires (YTD)" value={e.reqs.filter((r) => r.status === 'Hired').length + 1} hint="15% fee on confirmed hires" icon={Trophy} tone="emerald" />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2"><CardHeader title="Top matches for your vacancies" action={<Button size="sm" variant="ghost" onClick={() => setScreen('candidates')}>View all</Button>} /><div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">{CANDIDATES.filter((c) => c.cv === 'Published').slice(0, 2).map((c) => <CandidateCard key={c.id} c={c} saved={e.saved.includes(c.id)} a={a} />)}</div></Card>
        <Card><CardHeader title="Introduction pipeline" /><div className="p-5 sm:p-6"><HBarList items={pipeline} color="bg-teal" /></div></Card>
      </div>
      <InfoNote tone="teal">Hiring success fee: 15% of first-year base salary, payable only when a hire is confirmed. Example: {gbp(28000)} salary → {gbp(hiringFee(28000))}.</InfoNote>
    </div>
  );
}

function Jobs({ e }: { e: E }) {
  const { setScreen, toast } = useApp();
  return (
    <div className="space-y-6">
      <PageHeader title="Job Postings" desc="Manage your vacancies. Listings are visible to Job+ candidates and their PPMs." actions={<Button variant="teal" icon={<PlusCircle />} onClick={() => setScreen('create')}>Create listing</Button>} />
      <DataTable rows={e.jobs} rowKey={(r) => r.id} columns={[
        { key: 'title', label: 'Vacancy', render: (r) => <div><div className="font-semibold text-ink">{r.title}</div><div className="text-xs text-slate-500">{r.id} · {r.industry}</div></div> },
        { key: 'location', label: 'Location' }, { key: 'type', label: 'Type' },
        { key: 'min', label: 'Salary (GBP)', render: (r) => (r.min === r.max ? gbp(r.min) : `${gbp(r.min)} – ${gbp(r.max)}`) },
        { key: 'matches', label: 'Matches', align: 'right' }, { key: 'intros', label: 'Intros', align: 'right' }, { key: 'posted', label: 'Posted' },
        { key: 'status', label: 'Status', render: (r) => <select value={r.status} onChange={(ev) => { e.setJobs((j) => j.map((x) => (x.id === r.id ? { ...x, status: ev.target.value } : x))); toast(`${r.title} set to ${ev.target.value}.`); }} className="field h-8 w-28 text-xs font-semibold">{['Live', 'Paused', 'Draft', 'Closed'].map((s) => <option key={s}>{s}</option>)}</select> },
      ]} />
    </div>
  );
}

function CreateJob({ e }: { e: E }) {
  const { setScreen, toast } = useApp();
  const [f, setF] = useState({ title: 'Logistics Planner', location: 'Manchester', type: 'Full-time', industry: INDUSTRIES[0].name, min: 26000, max: 29000, desc: 'Plan daily delivery routes and coordinate with drivers and warehouse teams to keep customers on schedule.' });
  const [skills, setSkills] = useState(['Planning', 'Communication', 'Teamwork']);
  const publish = (status: string) => {
    e.setJobs((j) => [{ id: `J-${306 + j.length}`, title: f.title, location: f.location, type: f.type, min: f.min, max: f.max, status, matches: status === 'Live' ? 6 : 0, intros: 0, posted: status === 'Live' ? '14 Mar 2026' : '—', industry: f.industry }, ...j]);
    toast(status === 'Live' ? `"${f.title}" published to Job+ candidates.` : 'Draft saved.');
    setScreen('jobs');
  };
  return (
    <div className="space-y-6">
      <PageHeader title="Create Job Listing" desc="UK roles only in Version 1. Salaries in GBP." />
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <Card className="p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Job title" required className="sm:col-span-2"><Input value={f.title} onChange={(ev) => setF({ ...f, title: ev.target.value })} /></Field>
            <Field label="Location (UK)" required><Input value={f.location} onChange={(ev) => setF({ ...f, location: ev.target.value })} /></Field>
            <Field label="Employment type"><Select value={f.type} onChange={(ev) => setF({ ...f, type: ev.target.value })} options={['Full-time', 'Part-time', 'Apprenticeship', 'Fixed-term']} /></Field>
            <Field label="Industry"><Select value={f.industry} onChange={(ev) => setF({ ...f, industry: ev.target.value })} options={INDUSTRIES.map((i) => i.name)} /></Field>
            <Field label="Start date"><Input type="date" defaultValue="2026-04-20" /></Field>
            <Field label="Salary from (GBP)"><Input type="number" value={f.min} onChange={(ev) => setF({ ...f, min: +ev.target.value })} /></Field>
            <Field label="Salary to (GBP)"><Input type="number" value={f.max} onChange={(ev) => setF({ ...f, max: +ev.target.value })} /></Field>
            <Field label="Role description" className="sm:col-span-2"><Textarea rows={5} value={f.desc} onChange={(ev) => setF({ ...f, desc: ev.target.value })} /></Field>
            <Field label="Transferable skills you value" className="sm:col-span-2"><Chips options={['Leadership', 'Teamwork', 'Resilience', 'Communication', 'Planning', 'Discipline', 'Customer focus', 'Data & analysis']} value={skills} onChange={setSkills} /></Field>
          </div>
          <div className="mt-6 flex flex-wrap justify-end gap-2"><Button variant="outline" onClick={() => publish('Draft')}>Save draft</Button><Button variant="teal" onClick={() => publish('Live')}>Publish listing</Button></div>
        </Card>
        <div className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <div className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">Live preview</div>
          <Card className="overflow-hidden">
            <div className="bg-ink p-5 text-white"><div className="text-xs text-white/50">{company.name}</div><div className="mt-1 font-jakarta text-xl font-extrabold">{f.title || 'Job title'}</div><div className="mt-2 flex flex-wrap gap-2 text-xs text-white/70"><span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{f.location}</span><span>· {f.type}</span></div></div>
            <div className="p-5"><div className="font-jakarta text-2xl font-extrabold text-teal">{gbp(f.min)} – {gbp(f.max)}</div><p className="mt-3 text-sm text-slate-600">{f.desc}</p><div className="mt-4 flex flex-wrap gap-1.5">{skills.map((s) => <span key={s} className="rounded-full bg-teal/10 px-2.5 py-1 text-[11px] font-semibold text-teal-dark">{s}</span>)}</div></div>
          </Card>
          <InfoNote tone="teal">If you hire through this listing, the success fee would be about {gbp(hiringFee(f.min))}–{gbp(hiringFee(f.max))} (15%).</InfoNote>
        </div>
      </div>
    </div>
  );
}

function Candidates({ e, a }: { e: E; a: A }) {
  const [q, setQ] = useState('');
  const [ind, setInd] = useState('All industries');
  const [avail, setAvail] = useState('Any availability');
  const [lic, setLic] = useState(false);
  const list = useMemo(() => CANDIDATES.filter((c) => c.cv === 'Published').filter((c) => (c.name + c.role + c.city + c.skills.join()).toLowerCase().includes(q.toLowerCase())).filter((c) => ind === 'All industries' || c.industry === ind).filter((c) => avail === 'Any availability' || c.availability === avail).filter((c) => !lic || c.licence === 'Full UK licence'), [q, ind, avail, lic]);
  return (
    <div className="space-y-6">
      <PageHeader title="Candidate Search" desc="Published, PPM-reviewed candidate profiles. Contact details are shared only after an introduction." />
      <Card className="grid gap-3 p-4 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
        <div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={q} onChange={(ev) => setQ(ev.target.value)} placeholder="Role, skill or location…" className="field h-11 pl-9" /></div>
        <Select value={ind} onChange={(ev) => setInd(ev.target.value)} options={['All industries', ...Array.from(new Set(CANDIDATES.map((c) => c.industry)))]} className="h-11 md:w-52" />
        <Select value={avail} onChange={(ev) => setAvail(ev.target.value)} options={['Any availability', 'Immediately', '2 weeks', '1 month']} className="h-11 md:w-44" />
        <Toggle checked={lic} onChange={setLic} label="Full UK licence" />
      </Card>
      <div className="text-sm text-slate-500"><b className="text-ink">{list.length}</b> published candidates</div>
      {!list.length ? <Card><EmptyState icon={Users} title="No candidates match" text="Try a different industry or availability." /></Card> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{list.map((c) => <CandidateCard key={c.id} c={c} saved={e.saved.includes(c.id)} a={a} />)}</div>}
    </div>
  );
}

function Saved({ e, a }: { e: E; a: A }) {
  const { setScreen } = useApp();
  const list = CANDIDATES.filter((c) => e.saved.includes(c.id));
  return (
    <div className="space-y-6">
      <PageHeader title="Saved Candidates" desc="Candidates you've bookmarked for current and future roles." />
      {!list.length ? <Card><EmptyState icon={Bookmark} title="No saved candidates" action={<Button variant="teal" onClick={() => setScreen('candidates')}>Search candidates</Button>} /></Card> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{list.map((c) => <CandidateCard key={c.id} c={c} saved a={a} />)}</div>}
    </div>
  );
}

function Interest({ e }: { e: E }) {
  const { toast } = useApp();
  const [sel, setSel] = useState<Req | null>(null);
  const [hire, setHire] = useState(false);
  const [salary, setSalary] = useState(28000);
  const set = (id: string, patch: Partial<Req>) => { e.setReqs((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x))); setSel((s) => (s && s.id === id ? { ...s, ...patch } : s)); };
  const idx = sel ? STAGES.indexOf(sel.status) : -1;
  return (
    <div className="space-y-6">
      <PageHeader title="Interest Requests & Introductions" desc="Track every introduction from request to hire. All introductions are managed by a PPM." />
      <DataTable rows={e.reqs} onRowClick={setSel} rowKey={(r) => r.id} columns={[
        { key: 'id', label: 'Request', render: (r) => <span className="font-mono text-xs font-bold">{r.id}</span> }, { key: 'candidate', label: 'Candidate', render: (r) => <div className="flex items-center gap-2"><Avatar name={r.candidate} src={CANDIDATES.find((c) => c.name === r.candidate)?.photo} size={28} /><b className="text-ink">{r.candidate}</b></div> },
        { key: 'job', label: 'Vacancy' }, { key: 'date', label: 'Requested' }, { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
      ]} />
      <Drawer open={!!sel} onClose={() => setSel(null)} title={sel?.candidate} subtitle={sel && `${sel.id} · ${sel.job}`}
        footer={sel && !['Hired', 'Declined'].includes(sel.status) && <>{sel.status === 'Introduced' && <Button variant="outline" onClick={() => { set(sel.id, { status: 'Interviewing' }); toast('Interview scheduled — PPM notified.'); }}>Schedule interview</Button>}{sel.status === 'Interviewing' && <Button variant="outline" onClick={() => { set(sel.id, { status: 'Offer' }); toast('Offer recorded.'); }}>Record offer</Button>}{sel.status === 'Offer' && <Button variant="teal" onClick={() => setHire(true)}>Confirm hire</Button>}</>}>
        {sel && (
          <div className="space-y-6">
            <ol className="space-y-3">
              {STAGES.map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className={cn('grid h-8 w-8 place-items-center rounded-full text-xs font-bold', sel.status === 'Declined' ? 'bg-slate-100 text-slate-400' : i < idx || sel.status === 'Hired' ? 'bg-teal text-white' : i === idx ? 'bg-ink text-aqua ring-4 ring-teal/20' : 'bg-slate-100 text-slate-400')}>{i < idx || sel.status === 'Hired' ? <CheckCircle2 className="h-4 w-4" /> : i + 1}</span>
                  <span className={cn('text-sm', i <= idx ? 'font-semibold text-ink' : 'text-slate-400')}>{s}</span>
                </li>
              ))}
            </ol>
            {sel.status === 'Declined' && <InfoNote tone="slate">The candidate declined this introduction. No fee applies.</InfoNote>}
            {sel.status === 'Hired' && <InfoNote tone="teal">Hire confirmed{sel.salary ? ` at ${gbp(sel.salary)} — fee ${gbp(hiringFee(sel.salary))} (15%)` : ''}.</InfoNote>}
            <Timeline items={[{ title: 'Introduction requested', time: sel.date, tone: 'blue', icon: Send }, { title: 'Reviewed by PPM and shared with candidate', time: 'Within 2 working days', tone: 'teal', icon: BadgeCheck }]} />
          </div>
        )}
      </Drawer>
      <Modal open={hire} onClose={() => setHire(false)} size="sm" title="Confirm hire" footer={<Button variant="teal" onClick={() => { if (sel) set(sel.id, { status: 'Hired', salary }); setHire(false); toast(`Hire confirmed — invoice for ${gbp(hiringFee(salary))} will be issued (demo).`); }}>Confirm hire</Button>}>
        <Field label="First-year base salary (GBP)"><Input type="number" value={salary} onChange={(ev) => setSalary(+ev.target.value)} /></Field>
        <div className="mt-4 rounded-2xl bg-ink p-4 text-white"><div className="text-sm text-white/60">Hiring success fee (15%)</div><div className="font-jakarta text-3xl font-extrabold text-aqua">{gbp(hiringFee(salary))}</div></div>
      </Modal>
    </div>
  );
}

function Hiring({ e }: { e: E }) {
  const cols = ['Introduced', 'Interviewing', 'Offer', 'Hired'];
  return (
    <div className="space-y-6">
      <PageHeader title="Hiring Status & Reports" desc="Your Job+ hiring pipeline and performance." />
      <div className="grid gap-4 md:grid-cols-4">
        {cols.map((c) => (
          <div key={c} className="rounded-2xl bg-white/60 p-3 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between px-1"><span className="text-sm font-bold text-ink">{c}</span><span className="rounded-full bg-slate-100 px-2 text-xs font-bold text-slate-500">{e.reqs.filter((r) => r.status === c).length}</span></div>
            <div className="space-y-2">{e.reqs.filter((r) => r.status === c).map((r) => <div key={r.id} className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200"><div className="flex items-center gap-2"><Avatar name={r.candidate} src={CANDIDATES.find((x) => x.name === r.candidate)?.photo} size={26} /><span className="text-sm font-semibold text-ink">{r.candidate}</span></div><div className="mt-1.5 text-xs text-slate-500">{r.job}</div></div>)}{!e.reqs.some((r) => r.status === c) && <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-400">Empty</div>}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Average time to hire" value="24 days" icon={Calendar} tone="teal" />
        <StatCard label="Introduction → interview" value="62%" icon={Handshake} tone="sky" />
        <StatCard label="Fees paid (YTD)" value={gbp(8700)} icon={PoundSterling} tone="emerald" />
      </div>
      <Card><CardHeader title="Introductions and hires by month" /><div className="p-4 sm:p-6"><BarChart data={[{ label: 'Oct', intros: 2, hires: 0 }, { label: 'Nov', intros: 3, hires: 1 }, { label: 'Dec', intros: 2, hires: 0 }, { label: 'Jan', intros: 4, hires: 1 }, { label: 'Feb', intros: 5, hires: 0 }, { label: 'Mar', intros: 4, hires: 1 }]} keys={['intros', 'hires']} names={['Introductions', 'Hires']} colors={['#5CE1D0', '#0D9E97']} /></div></Card>
    </div>
  );
}

function Company() {
  const { toast } = useApp();
  return (
    <div className="space-y-6">
      <PageHeader title="Company Profile" desc="How candidates and PPMs see your company." actions={<Button variant="teal" onClick={() => toast('Company profile saved (demo).')}>Save profile</Button>} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5 sm:p-6 lg:col-span-2"><div className="grid gap-4 sm:grid-cols-2"><Field label="Company name"><Input defaultValue={company.name} /></Field><Field label="Companies House no."><Input defaultValue="09876543" /></Field><Field label="Sector"><Input defaultValue={company.sector} /></Field><Field label="Head office (UK)"><Input defaultValue={company.city} /></Field><Field label="Company size"><Select options={['50–249', '250–500', '500+']} defaultValue="250–500" /></Field><Field label="Website"><Input defaultValue="https://meridian.example" /></Field><Field label="About" className="sm:col-span-2"><Textarea rows={4} defaultValue="Meridian Logistics moves goods for retailers across the North West. We value people who are reliable, team-first and hungry to learn." /></Field><Field label="Logo" className="sm:col-span-2"><UploadZone label="Upload company logo" accept="image/*" /></Field></div></Card>
        <Card className="h-fit"><CardHeader title="Verification status" /><div className="p-5 sm:p-6"><Timeline items={[{ title: 'Verified UK employer', time: '18 Nov 2025', tone: 'green', icon: BadgeCheck }, { title: 'Hiring contact verified', time: '17 Nov 2025', tone: 'green', icon: CheckCircle2 }, { title: 'Companies House check passed', time: '16 Nov 2025', tone: 'green', icon: Building2 }, { title: 'Registration submitted', time: '15 Nov 2025', tone: 'blue', icon: Send }]} /></div></Card>
      </div>
    </div>
  );
}

function Billing() {
  const { toast } = useApp();
  const [s, setS] = useState(28000);
  const inv = [
    { id: 'INV-JP-0042', date: '09 Mar 2026', desc: 'Hiring fee — Marcus Bennett · Operations Coordinator (£28,000 × 15%)', amount: 4200, status: 'Paid' },
    { id: 'INV-JP-0031', date: '05 Feb 2026', desc: 'Hiring fee — Owen Fletcher · Warehouse Team Leader (£30,000 × 15%)', amount: 4500, status: 'Paid' },
  ];
  return (
    <div className="space-y-6">
      <PageHeader title="Payments & Invoices" desc="Hiring success fees: 15% of first-year base salary. GBP only." />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2"><DataTable rows={inv} search={false} rowKey={(r) => r.id} columns={[{ key: 'id', label: 'Invoice', render: (r) => <span className="font-mono text-xs font-bold">{r.id}</span> }, { key: 'date', label: 'Date' }, { key: 'desc', label: 'Description', className: 'whitespace-normal min-w-[260px]' }, { key: 'amount', label: 'Amount', align: 'right', render: (r) => <b>{gbp(r.amount)}</b> }, { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> }, { key: 'd', label: '', render: () => <button onClick={() => toast('PDF download is a demo only.', 'info')} className="text-slate-400 hover:text-ink" aria-label="Download"><Download className="h-4 w-4" /></button> }]} /></div>
        <Card className="p-5 sm:p-6"><div className="font-jakarta font-bold text-ink">Fee calculator</div><Field label="First-year base salary (GBP)" className="mt-4"><Input type="number" value={s} onChange={(ev) => setS(+ev.target.value)} /></Field><div className="mt-4 rounded-2xl bg-ink p-4 text-white"><div className="text-sm text-white/60">Success fee (15%)</div><div className="font-jakarta text-3xl font-extrabold text-aqua">{gbp(hiringFee(s))}</div></div><div className="mt-4 rounded-xl bg-sand p-3 text-sm text-slate-600">Payment method: BACS · invoices due in 30 days</div></Card>
      </div>
    </div>
  );
}

function ESettings() {
  const { toast } = useApp();
  const [n, setN] = useState({ matches: true, intros: true, invoices: true });
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" desc="Notifications and team access." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-5 p-5 sm:p-6"><div className="font-jakarta font-bold text-ink">Notifications</div><Toggle checked={n.matches} onChange={(v) => setN({ ...n, matches: v })} label="New candidate matches" /><Toggle checked={n.intros} onChange={(v) => setN({ ...n, intros: v })} label="Introduction updates" /><Toggle checked={n.invoices} onChange={(v) => setN({ ...n, invoices: v })} label="Invoices & payments" /></Card>
        <Card className="p-5 sm:p-6"><div className="font-jakarta font-bold text-ink">Team</div><ul className="mt-4 divide-y divide-slate-100">{[['Hannah Clarke', 'Talent Acquisition Lead · Admin'], ['Joe Marsden', 'Operations Manager · Hiring manager']].map(([nm, r]) => <li key={nm} className="flex items-center gap-3 py-3"><Avatar name={nm} size={34} /><div className="flex-1"><div className="text-sm font-semibold text-ink">{nm}</div><div className="text-xs text-slate-500">{r}</div></div></li>)}</ul><Button variant="outline" className="mt-3" onClick={() => toast('Invitation sent (demo).')}>Invite teammate</Button></Card>
      </div>
    </div>
  );
}
