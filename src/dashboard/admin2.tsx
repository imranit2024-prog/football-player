import { useMemo, useState } from 'react';
import { Download, CheckCircle2, XCircle, Play, Trophy, Handshake, PoundSterling, Sprout, LifeBuoy, AlertTriangle, ShieldAlert, Eye, Lock, Globe, FileText, Users, Building2, FileSignature, Plus } from 'lucide-react';
import { useApp, usePersist } from '../store';
import {
  Avatar, Badge, Button, Card, CardHeader, Chips, DataTable, Drawer, Field, InfoNote, Input, Modal, PageHeader, Select, StatCard, Tabs, Textarea,
  Timeline, Toggle, downloadCSV, cn,
} from '../components/ui';
import { BarChart, Donut, Legend, HBarList } from '../components/charts';
import { CVDocument } from '../components/CV';
import {
  AUDIT, CANDIDATES, CLAIMS, CLUBS, COUNTRIES, HIRES, MONTHS, PAYMENTS, PLACEMENTS, REGISTRATIONS, REVENUE_STREAMS, REV_CLEARING, REV_JOBPLUS,
  SAFEGUARDING, VIDEOS, gbp, hiringFee, placementFee,
} from '../data/mock';

/* ------------------------------------------------------------------ shared helpers */
export function CountryFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <Select value={value} onChange={(e) => onChange(e.target.value)} options={['All countries', ...COUNTRIES]} className="h-10 w-44" />;
}
export function ExportBtn({ name, rows }: { name: string; rows: Record<string, unknown>[] }) {
  const { toast } = useApp();
  return (
    <Button size="sm" variant="outline" className="h-10 rounded-xl" icon={<Download />} onClick={() => { downloadCSV(`${name}.csv`, rows); toast(`Exported ${rows.length} rows to ${name}.csv`); }}>
      Export CSV
    </Button>
  );
}
const byCountry = <T extends { country: string }>(rows: T[], c: string) => (c === 'All countries' ? rows : rows.filter((r) => r.country === c));

/* ------------------------------------------------------------------ Video moderation */
export function VideoModeration() {
  const { toast } = useApp();
  const [vids, setVids] = usePersist('admin-videos', VIDEOS);
  const [tab, setTab] = useState('Pending');
  const [reject, setReject] = useState<string | null>(null);
  const [reason, setReason] = useState('Other minors clearly identifiable');
  const set = (id: string, status: string) => setVids((v) => v.map((x) => (x.id === id ? { ...x, status } : x)));
  const list = vids.filter((v) => v.status === tab);
  return (
    <div className="space-y-6">
      <PageHeader title="Video Moderation" desc="Every highlight video is reviewed before verified clubs can view it." />
      <Tabs value={tab} onChange={setTab} tabs={['Pending', 'Approved', 'Rejected'].map((s) => ({ key: s, label: s, count: vids.filter((v) => v.status === s).length }))} />
      {!list.length ? <Card className="p-10 text-center text-sm text-slate-500">Nothing here — queue clear. 🎉</Card> : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((v) => (
            <Card key={v.id} className="overflow-hidden">
              <div className="relative aspect-video"><img src={v.thumb} alt="" className="h-full w-full object-cover" /><span className="absolute inset-0 grid place-items-center bg-navy/30"><span className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-navy"><Play className="h-4 w-4 fill-current" /></span></span><span className="absolute bottom-2 right-2 rounded bg-navy/80 px-1.5 text-[11px] font-semibold text-white">{v.len}</span></div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2"><div><div className="text-sm font-semibold text-slate-900">{v.title}</div><div className="text-xs text-slate-500">{v.player} · {v.id} · {v.submitted}</div></div><Badge>{v.status}</Badge></div>
                {v.status === 'Pending' && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline" className="rounded-xl" icon={<XCircle />} onClick={() => setReject(v.id)}>Reject</Button>
                    <Button size="sm" variant="navy" className="rounded-xl" icon={<CheckCircle2 />} onClick={() => { set(v.id, 'Approved'); toast(`${v.id} approved — now visible to verified clubs.`); }}>Approve</Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
      <Modal open={!!reject} onClose={() => setReject(null)} size="sm" title="Reject video" footer={<Button variant="danger" onClick={() => { if (reject) set(reject, 'Rejected'); setReject(null); toast('Video rejected — player notified with reason.', 'info'); }}>Reject video</Button>}>
        <Field label="Reason shared with player"><Select value={reason} onChange={(e) => setReason(e.target.value)} options={['Other minors clearly identifiable', 'Personal contact details visible', 'Not the registered player', 'Poor quality / unwatchable', 'Inappropriate content']} /></Field>
      </Modal>
    </div>
  );
}

/* ------------------------------------------------------------------ Job+ CV review */
export function CVReview() {
  const { toast } = useApp();
  const [rows, setRows] = usePersist('admin-cv', CANDIDATES);
  const [sel, setSel] = useState<(typeof CANDIDATES)[number] | null>(null);
  const set = (id: string, cv: string) => { setRows((r) => r.map((x) => (x.id === id ? { ...x, cv } : x))); setSel(null); };
  return (
    <div className="space-y-6">
      <PageHeader title="Job+ CV Review" desc="Oversight of AI-assisted drafts and PPM human reviews before publication." />
      <div className="grid gap-4 sm:grid-cols-4">
        {['AI Draft', 'PPM Review', 'Candidate Approval', 'Published'].map((s) => <StatCard key={s} label={s} value={rows.filter((r) => r.cv === s).length} icon={FileText} tone={s === 'Published' ? 'emerald' : 'teal'} />)}
      </div>
      <DataTable rows={rows} onRowClick={setSel} rowKey={(r) => r.id} columns={[
        { key: 'name', label: 'Candidate', render: (r) => <div className="flex items-center gap-2.5"><Avatar name={r.name} src={r.photo} size={30} /><span className="font-semibold text-slate-900">{r.name}</span></div> },
        { key: 'role', label: 'Target role' }, { key: 'industry', label: 'Industry' }, { key: 'city', label: 'Location' },
        { key: 'cv', label: 'CV status', render: (r) => <Badge>{r.cv}</Badge> },
      ]} />
      <Modal open={!!sel} onClose={() => setSel(null)} size="xl" title={sel ? `${sel.name} — CV` : ''} subtitle={sel?.cv}
        footer={sel && <><Button variant="outline" onClick={() => { set(sel.id, 'PPM Review'); toast('Returned to PPM for changes.', 'info'); }}>Request changes</Button><Button variant="teal" onClick={() => { set(sel.id, 'Published'); toast(`${sel.name}'s profile published.`); }}>Approve & publish</Button></>}>
        {sel && <div className="theme-jobplus"><CVDocument data={{ name: sel.name, title: `${sel.role} · Former academy footballer`, location: `${sel.city}, UK` }} /></div>}
      </Modal>
    </div>
  );
}

/* ------------------------------------------------------------------ Placements & hires */
export function Placements() {
  const [c, setC] = useState('All countries');
  const rows = byCountry(PLACEMENTS, c).map((p) => ({ ...p, fee: placementFee(p.contract), rule: p.contract * 0.1 > 3000 ? '10% of contract' : '£3,000 minimum' }));
  return (
    <div className="space-y-6">
      <PageHeader title="Football Placements" desc="Signed players and placement fees — the greater of £3,000 or 10% of first-year contract value." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Placements" value={rows.length} icon={Trophy} tone="lime" />
        <StatCard label="Contract value" value={gbp(rows.reduce((s, r) => s + r.contract, 0))} icon={FileSignature} />
        <StatCard label="Placement fees" value={gbp(rows.reduce((s, r) => s + r.fee, 0))} icon={PoundSterling} tone="emerald" />
      </div>
      <DataTable rows={rows} rowKey={(r) => r.id} toolbar={<><CountryFilter value={c} onChange={setC} /><ExportBtn name="placements" rows={rows} /></>} columns={[
        { key: 'id', label: 'Ref', render: (r) => <span className="font-mono text-xs font-bold">{r.id}</span> }, { key: 'player', label: 'Player', render: (r) => <b className="text-slate-900">{r.player}</b> },
        { key: 'club', label: 'Club' }, { key: 'country', label: 'Country' }, { key: 'date', label: 'Signed' },
        { key: 'contract', label: 'Contract', align: 'right', render: (r) => gbp(r.contract) },
        { key: 'fee', label: 'Fee', align: 'right', render: (r) => <b>{gbp(r.fee)}</b> },
        { key: 'rule', label: 'Rule', render: (r) => <Badge dot={false} tone={r.rule.startsWith('10') ? 'violet' : 'slate'}>{r.rule}</Badge> },
        { key: 'invoice', label: 'Invoice', render: (r) => <Badge>{r.invoice}</Badge> },
      ]} />
    </div>
  );
}
export function Hires() {
  const rows = HIRES.map((h) => ({ ...h, fee: hiringFee(h.salary) }));
  return (
    <div className="space-y-6">
      <PageHeader title="Job+ Hires" desc="Confirmed hires through Job+ — 15% of first-year base salary. UK employers only." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Hires (YTD)" value={rows.length} icon={Handshake} tone="teal" />
        <StatCard label="Average salary" value={gbp(rows.reduce((s, r) => s + r.salary, 0) / rows.length)} icon={PoundSterling} />
        <StatCard label="Hiring fees" value={gbp(rows.reduce((s, r) => s + r.fee, 0))} icon={CheckCircle2} tone="emerald" />
      </div>
      <DataTable rows={rows} rowKey={(r) => r.id} toolbar={<ExportBtn name="jobplus-hires" rows={rows} />} columns={[
        { key: 'id', label: 'Ref', render: (r) => <span className="font-mono text-xs font-bold">{r.id}</span> }, { key: 'candidate', label: 'Candidate', render: (r) => <b className="text-slate-900">{r.candidate}</b> },
        { key: 'employer', label: 'Employer' }, { key: 'role', label: 'Role' }, { key: 'start', label: 'Start date' },
        { key: 'salary', label: 'Base salary', align: 'right', render: (r) => gbp(r.salary) }, { key: 'fee', label: '15% fee', align: 'right', render: (r) => <b>{gbp(r.fee)}</b> },
        { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> }, { key: 'invoice', label: 'Invoice', render: (r) => <Badge>{r.invoice}</Badge> },
      ]} />
    </div>
  );
}

/* ------------------------------------------------------------------ Revenue */
const SHARE: Record<string, number> = { England: 0.56, Scotland: 0.1, Wales: 0.06, 'Northern Ireland': 0.03, Ireland: 0.07, Portugal: 0.04, Spain: 0.035, Germany: 0.035, Norway: 0.04, Sweden: 0.015, Netherlands: 0.015 };
export function Revenue() {
  const [c, setC] = useState('All countries');
  const f = c === 'All countries' ? 1 : SHARE[c] ?? 0.02;
  const jf = c === 'All countries' ? 1 : UKF(c);
  const data = MONTHS.map((m, i) => ({ label: m, memberships: Math.round(REV_CLEARING[i] * 0.34 * f), licences: Math.round(REV_CLEARING[i] * 0.26 * f), fees: Math.round(REV_CLEARING[i] * 0.4 * f), jobplus: Math.round(REV_JOBPLUS[i] * jf) }));
  const streams = REVENUE_STREAMS.map((s) => ({ ...s, value: Math.round(s.value * (s.label.startsWith('Job+') ? jf : f)) }));
  const total = streams.reduce((s, x) => s + x.value, 0);
  const countryRows = COUNTRIES.map((k) => ({ country: k, revenue: Math.round(218440 * (SHARE[k] ?? 0)) }));
  return (
    <div className="space-y-6">
      <PageHeader title="Revenue Reports" desc="All revenue reported in GBP. Filter by country to compare markets." actions={<><CountryFilter value={c} onChange={setC} /><ExportBtn name={`revenue-${c.replace(/\s/g, '-').toLowerCase()}`} rows={data.map((d) => ({ month: d.label, memberships_gbp: d.memberships, licences_gbp: d.licences, claim_placement_fees_gbp: d.fees, jobplus_gbp: d.jobplus }))} /></>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue (12 months)" value={gbp(total)} delta="18.4% YoY" icon={PoundSterling} />
        <StatCard label="Clearing+" value={gbp(total - streams[4].value)} icon={Trophy} tone="lime" />
        <StatCard label="Job+" value={gbp(streams[4].value)} hint={c !== 'All countries' && jf === 0 ? 'UK employers only' : '15% hiring fees'} icon={Handshake} tone="teal" />
        <StatCard label="Grassroots (5%)" value={gbp(total * 0.05)} icon={Sprout} tone="emerald" />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2"><CardHeader title="Monthly revenue by stream" desc={c} /><div className="p-4 sm:p-6"><BarChart data={data} keys={['memberships', 'licences', 'fees', 'jobplus']} names={['Memberships', 'Licences', 'Claim & placement fees', 'Job+']} colors={['#B6F24B', '#102A43', '#6366F1', '#0D9E97']} prefix="£" /></div></Card>
        <Card><CardHeader title="Revenue mix" /><div className="flex flex-col items-center gap-6 p-6"><Donut segments={streams} label={gbp(total)} sub="12 months" /><Legend items={streams} format={(n) => gbp(n)} /></div></Card>
      </div>
      <Card><CardHeader title="Revenue by country" desc="Share of total revenue (all streams)" /><div className="p-5 sm:p-6"><HBarList items={countryRows.map((r) => ({ label: r.country, value: r.revenue }))} format={(n) => gbp(n)} color="bg-navy" /></div></Card>
    </div>
  );
}
function UKF(c: string) { return ['England', 'Scotland', 'Wales', 'Northern Ireland'].includes(c) ? (SHARE[c] ?? 0) / 0.75 : 0; }

/* ------------------------------------------------------------------ Payments & invoices */
export function Payments() {
  const [c, setC] = useState('All countries');
  const [type, setType] = useState('All types');
  const [status, setStatus] = useState('All statuses');
  const rows = byCountry(PAYMENTS, c).filter((p) => (type === 'All types' || p.type === type) && (status === 'All statuses' || p.status === status));
  return (
    <div className="space-y-6">
      <PageHeader title="GBP Payment History" desc="Every payment across Clearing+ and Job+. Currency: GBP only (V1)." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Collected" value={gbp(rows.filter((r) => r.status === 'Paid').reduce((s, r) => s + r.amount, 0), 2)} icon={CheckCircle2} tone="emerald" />
        <StatCard label="Pending" value={gbp(rows.filter((r) => r.status === 'Pending').reduce((s, r) => s + r.amount, 0), 2)} icon={PoundSterling} tone="amber" />
        <StatCard label="Failed / refunded" value={rows.filter((r) => ['Failed', 'Refunded'].includes(r.status)).length} icon={XCircle} tone="rose" />
      </div>
      <DataTable rows={rows} pageSize={10} rowKey={(r) => r.id} toolbar={<><CountryFilter value={c} onChange={setC} /><Select value={type} onChange={(e) => setType(e.target.value)} options={['All types', 'Player membership', 'Club licence', 'Claim fee', 'Placement fee', 'Job+ hiring fee']} className="h-10 w-44" /><Select value={status} onChange={(e) => setStatus(e.target.value)} options={['All statuses', 'Paid', 'Pending', 'Failed', 'Refunded']} className="h-10 w-36" /><ExportBtn name="payments" rows={rows} /></>} columns={[
        { key: 'id', label: 'Payment', render: (r) => <span className="font-mono text-xs font-bold">{r.id}</span> }, { key: 'date', label: 'Date' },
        { key: 'payer', label: 'Payer', render: (r) => <b className="text-slate-900">{r.payer}</b> }, { key: 'type', label: 'Type' }, { key: 'country', label: 'Country' }, { key: 'method', label: 'Method' },
        { key: 'amount', label: 'Amount', align: 'right', render: (r) => <b>{gbp(r.amount, 2)}</b> }, { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
      ]} />
    </div>
  );
}
export function Invoices() {
  const { toast } = useApp();
  const rows = PAYMENTS.filter((p) => p.type !== 'Player membership').map((p, i) => ({ id: `INV-2026-${String(190 - i).padStart(4, '0')}`, to: p.payer, type: p.type, country: p.country, issued: p.date, amount: p.amount, status: p.status === 'Paid' ? 'Paid' : p.status === 'Pending' ? 'Due' : p.status }));
  const [sel, setSel] = useState<(typeof rows)[number] | null>(null);
  return (
    <div className="space-y-6">
      <PageHeader title="Invoices" desc="Club licences, Claim fees, placement fees and Job+ hiring fees." />
      <DataTable rows={rows} onRowClick={setSel} rowKey={(r) => r.id} toolbar={<ExportBtn name="invoices" rows={rows} />} columns={[
        { key: 'id', label: 'Invoice', render: (r) => <span className="font-mono text-xs font-bold">{r.id}</span> }, { key: 'to', label: 'Billed to', render: (r) => <b className="text-slate-900">{r.to}</b> },
        { key: 'type', label: 'Type' }, { key: 'country', label: 'Country' }, { key: 'issued', label: 'Issued' },
        { key: 'amount', label: 'Amount', align: 'right', render: (r) => <b>{gbp(r.amount, 2)}</b> }, { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
      ]} />
      <Modal open={!!sel} onClose={() => setSel(null)} title={sel?.id} subtitle={sel && `${sel.type} · ${sel.to}`} footer={<Button variant="navy" icon={<Download />} onClick={() => toast('PDF generation is a demo only.', 'info')}>Download PDF</Button>}>
        {sel && <div className="space-y-2 text-sm">{[['Billed to', sel.to], ['Country', sel.country], ['Type', sel.type], ['Issued', sel.issued], ['Status', sel.status]].map(([k, v]) => <div key={k} className="flex justify-between border-b border-slate-100 py-2"><span className="text-slate-500">{k}</span><span className="font-semibold">{v}</span></div>)}<div className="flex justify-between pt-3 font-display text-xl font-extrabold"><span>Total (GBP)</span><span>{gbp(sel.amount, 2)}</span></div></div>}
      </Modal>
    </div>
  );
}

/* ------------------------------------------------------------------ Grassroots */
export function Grassroots() {
  const { toast } = useApp();
  const [log, setLog] = usePersist('admin-grassroots', [
    { ref: 'GBG-Q4-01', pool: 'North West pool', amount: 1450, date: '20 Jan 2026', by: 'Elena Marsh', status: 'Allocated' },
    { ref: 'GBG-Q4-02', pool: 'Scotland pool', amount: 620, date: '20 Jan 2026', by: 'Elena Marsh', status: 'Allocated' },
    { ref: 'GBG-Q4-03', pool: 'Midlands pool', amount: 880, date: '22 Jan 2026', by: 'Elena Marsh', status: 'Allocated' },
  ]);
  const [open, setOpen] = useState(false);
  const [n, setN] = useState({ pool: 'Wales pool', amount: 500 });
  const quarters = [{ label: 'Q2 25', eligible: 28400 }, { label: 'Q3 25', eligible: 41200 }, { label: 'Q4 25', eligible: 52600 }, { label: 'Q1 26', eligible: 68900 }].map((q, i) => ({ ...q, allocated: i < 3 ? Math.round(q.eligible * 0.05) : Math.round(q.eligible * 0.05 * 0.35), pending: i < 3 ? 0 : Math.round(q.eligible * 0.05 * 0.65) }));
  const fund = quarters.reduce((s, q) => s + q.eligible * 0.05, 0);
  const allocated = quarters.reduce((s, q) => s + q.allocated, 0);
  return (
    <div className="space-y-6">
      <PageHeader title="Give Back to Grassroots" desc="5% of eligible platform revenue is ring-fenced for grassroots football. Allocations are recorded manually — no automated payouts." actions={<><ExportBtn name="grassroots-allocations" rows={log} /><Button size="sm" variant="navy" className="h-10 rounded-xl" icon={<Plus />} onClick={() => setOpen(true)}>Record allocation</Button></>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Eligible revenue (4 quarters)" value={gbp(quarters.reduce((s, q) => s + q.eligible, 0))} icon={PoundSterling} />
        <StatCard label="5% ring-fenced" value={gbp(fund)} icon={Sprout} tone="lime" />
        <StatCard label="Allocated" value={gbp(allocated)} icon={CheckCircle2} tone="emerald" />
        <StatCard label="Awaiting allocation" value={gbp(fund - allocated)} icon={AlertTriangle} tone="amber" />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2"><CardHeader title="5% fund by quarter" desc="Allocated vs awaiting allocation (GBP)" /><div className="p-4 sm:p-6"><BarChart data={quarters} keys={['allocated', 'pending']} names={['Allocated', 'Awaiting allocation']} colors={['#102A43', '#B6F24B']} prefix="£" /></div></Card>
        <Card><CardHeader title="Regional pools" desc="Q1 2026" /><div className="p-5 sm:p-6"><HBarList format={(n) => gbp(n)} color="bg-lime-dark" items={[{ label: 'North West', value: 1120 }, { label: 'London & South East', value: 980 }, { label: 'Midlands', value: 640 }, { label: 'Scotland', value: 410 }, { label: 'Wales', value: 300 }]} /></div></Card>
      </div>
      <DataTable title="Allocation log" search={false} rows={log} rowKey={(r) => r.ref} columns={[
        { key: 'ref', label: 'Ref', render: (r) => <span className="font-mono text-xs font-bold">{r.ref}</span> }, { key: 'pool', label: 'Pool' }, { key: 'amount', label: 'Amount', align: 'right', render: (r) => <b>{gbp(r.amount)}</b> },
        { key: 'date', label: 'Date' }, { key: 'by', label: 'Recorded by' }, { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
      ]} />
      <Modal open={open} onClose={() => setOpen(false)} title="Record a manual allocation" subtitle="This records an allocation for reporting. No money is moved." footer={<Button variant="navy" onClick={() => { setLog((l) => [{ ref: `GBG-Q1-${String(l.length + 1).padStart(2, '0')}`, pool: n.pool, amount: n.amount, date: '14 Mar 2026', by: 'Elena Marsh', status: 'Allocated' }, ...l]); setOpen(false); toast('Allocation recorded.'); }}>Record allocation</Button>}>
        <div className="grid gap-4"><Field label="Regional pool"><Select value={n.pool} onChange={(e) => setN({ ...n, pool: e.target.value })} options={['North West pool', 'London & South East pool', 'Midlands pool', 'Scotland pool', 'Wales pool', 'Northern Ireland pool']} /></Field><Field label="Amount (GBP)"><Input type="number" value={n.amount} onChange={(e) => setN({ ...n, amount: +e.target.value })} /></Field><Field label="Notes"><Textarea rows={3} placeholder="Recipient nomination reference, approval notes…" /></Field></div>
      </Modal>
    </div>
  );
}

/* ------------------------------------------------------------------ Safeguarding */
export function Safeguarding({ ppmView }: { ppmView?: boolean }) {
  const { toast } = useApp();
  const [cases, setCases] = usePersist('safeguarding', SAFEGUARDING);
  const [sel, setSel] = useState<(typeof SAFEGUARDING)[number] | null>(null);
  const update = (id: string, patch: Partial<(typeof SAFEGUARDING)[number]>) => { setCases((c) => c.map((x) => (x.id === id ? { ...x, ...patch } : x))); setSel((s) => (s && s.id === id ? { ...s, ...patch } : s)); };
  return (
    <div className="space-y-6">
      <PageHeader title={ppmView ? 'Safeguarding Cases' : 'Safeguarding Reports'} desc="Confidential. Access is restricted and every view is audit-logged." />
      <InfoNote tone="rose" icon={ShieldAlert}>If a child is at immediate risk, contact emergency services on <b>999</b> and follow the escalation policy. Never share case details outside this system.</InfoNote>
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Open" value={cases.filter((c) => c.status === 'Open').length} icon={LifeBuoy} tone="sky" />
        <StatCard label="Investigating" value={cases.filter((c) => c.status === 'Investigating').length} icon={Eye} tone="amber" />
        <StatCard label="High priority" value={cases.filter((c) => c.priority === 'High' && c.status !== 'Resolved').length} icon={AlertTriangle} tone="rose" />
        <StatCard label="Resolved (90 days)" value={cases.filter((c) => c.status === 'Resolved').length} icon={CheckCircle2} tone="emerald" />
      </div>
      <DataTable rows={cases} onRowClick={setSel} rowKey={(r) => r.id} columns={[
        { key: 'id', label: 'Case', render: (r) => <span className="font-mono text-xs font-bold">{r.id}</span> }, { key: 'title', label: 'Summary', render: (r) => <b className="text-slate-900">{r.title}</b> },
        { key: 'player', label: 'Player' }, { key: 'reporter', label: 'Reported by' }, { key: 'priority', label: 'Priority', render: (r) => <Badge>{r.priority}</Badge> },
        { key: 'assigned', label: 'Assigned' }, { key: 'opened', label: 'Opened' }, { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
      ]} />
      <Drawer open={!!sel} onClose={() => setSel(null)} title={sel?.id} subtitle={sel?.title}
        footer={sel && <><Button variant="outline" onClick={() => { update(sel.id, { priority: 'High', status: 'Investigating' }); toast('Escalated to the designated safeguarding lead.', 'info'); }}>Escalate</Button><Button variant="navy" onClick={() => { update(sel.id, { status: 'Resolved' }); toast(`${sel.id} marked as resolved.`); }}>Mark resolved</Button></>}>
        {sel && (
          <div className="space-y-6">
            <div className="flex gap-2"><Badge>{sel.priority}</Badge><Badge>{sel.status}</Badge></div>
            <div className="grid grid-cols-2 gap-3 text-sm">{[['Player', sel.player], ['Reported by', sel.reporter], ['Opened', sel.opened], ['Assigned', sel.assigned]].map(([k, v]) => <div key={k} className="rounded-xl border border-slate-200 p-3"><div className="text-xs text-slate-400">{k}</div><div className="font-semibold text-slate-900">{v}</div></div>)}</div>
            <Field label="Reassign case"><Select value={sel.assigned} onChange={(e) => { update(sel.id, { assigned: e.target.value }); toast(`Case reassigned to ${e.target.value}.`); }} options={['Priya Nair', 'Sarah Okafor', 'Daniel Reyes', 'Tom Whitfield']} /></Field>
            <Timeline items={[{ title: 'Case opened', time: sel.opened, tone: 'blue', icon: LifeBuoy }, { title: 'Guardian contacted by safeguarding lead', time: 'Within 24 hours', tone: 'amber', icon: Users }, { title: 'Club access to player restricted pending review', time: 'Automatic', tone: 'red', icon: Lock }]} />
            <Field label="Add confidential note"><Textarea rows={3} placeholder="Notes are visible to safeguarding staff only…" /></Field>
          </div>
        )}
      </Drawer>
    </div>
  );
}

/* ------------------------------------------------------------------ Country reports */
export function CountryReports() {
  const [countries, setCountries] = useState<string[]>([]);
  const [tab, setTab] = useState('players');
  const match = (c: string) => !countries.length || countries.includes(c);
  const sets = useMemo(() => ({
    players: { label: 'Player registrations', icon: Users, rows: REGISTRATIONS.filter((r) => match(r.country)) as Record<string, unknown>[] },
    clubs: { label: 'Clubs', icon: Building2, rows: CLUBS.filter((r) => match(r.country)).map(({ id, name, country, tier, status, verified, founding, freeUntil, fee }) => ({ id, name, country, tier, membership: status, verification: verified, founding_club: founding ? 'Yes' : 'No', free_period_end: freeUntil || '—', licence_fee_gbp: fee })) as Record<string, unknown>[] },
    claims: { label: 'Claims', icon: FileSignature, rows: CLAIMS.filter((r) => match(r.country)).map(({ id, player, club, country, status, ppm, submitted, type }) => ({ id, player, club, country, status, ppm, submitted, type })) as Record<string, unknown>[] },
    placements: { label: 'Placements', icon: Trophy, rows: PLACEMENTS.filter((r) => match(r.country)).map((p) => ({ ...p, placement_fee_gbp: placementFee(p.contract) })) as Record<string, unknown>[] },
    revenue: { label: 'Revenue', icon: PoundSterling, rows: PAYMENTS.filter((r) => match(r.country)).map(({ id, date, payer, type, country, amount, status }) => ({ id, date, payer, type, country, amount_gbp: amount, status })) as Record<string, unknown>[] },
  }), [countries]); // eslint-disable-line react-hooks/exhaustive-deps
  const active = sets[tab as keyof typeof sets];
  const cols = active.rows.length ? Object.keys(active.rows[0]).slice(0, 8).map((k) => ({ key: k, label: k.replace(/_/g, ' ') })) : [{ key: 'id', label: 'id' }];
  return (
    <div className="space-y-6">
      <PageHeader title="Country-based Reporting" desc="Filter by one or more countries and export any dataset as CSV. All monetary values in GBP." />
      <Card className="p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between"><div className="flex items-center gap-2 text-sm font-semibold text-slate-900"><Globe className="h-4 w-4 text-slate-400" /> Countries {countries.length ? `(${countries.length} selected)` : '(all)'}</div>{!!countries.length && <button onClick={() => setCountries([])} className="text-xs font-semibold text-slate-500 hover:text-slate-900">Clear</button>}</div>
        <Chips options={COUNTRIES} value={countries} onChange={setCountries} />
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Object.entries(sets).map(([k, s]) => (
          <Card key={k} className={cn('cursor-pointer p-5 transition hover:shadow-lg', tab === k && 'ring-2 ring-navy')} onClick={() => setTab(k)}>
            <div className="flex items-center justify-between"><s.icon className="h-5 w-5 text-slate-400" /><span className="text-xs font-semibold text-slate-400">rows</span></div>
            <div className="mt-3 font-display text-3xl font-extrabold text-slate-900">{s.rows.length}</div>
            <div className="text-sm font-semibold text-slate-600">{s.label}</div>
            <div className="mt-4" onClick={(e) => e.stopPropagation()}><ExportBtn name={`${k}-${countries.length ? countries.join('-').toLowerCase().replace(/\s/g, '') : 'all'}`} rows={s.rows} /></div>
          </Card>
        ))}
      </div>
      <DataTable key={tab + countries.join()} title={`${active.label} preview`} rows={active.rows} columns={cols.map((c) => ({ ...c, render: (r: Record<string, unknown>) => String(r[c.key] ?? '') }))} />
    </div>
  );
}

/* ------------------------------------------------------------------ Audit & settings */
export function AuditLogs() {
  const [role, setRole] = useState('All roles');
  const rows = AUDIT.filter((a) => role === 'All roles' || a.role === role);
  return (
    <div className="space-y-6">
      <PageHeader title="Audit Logs" desc="Immutable record of sensitive actions across the platform." />
      <DataTable rows={rows} pageSize={10} toolbar={<><Select value={role} onChange={(e) => setRole(e.target.value)} options={['All roles', 'Platform Admin', 'PPM', 'Club Admin', 'Employer', 'Player', 'System']} className="h-10 w-40" /><ExportBtn name="audit-log" rows={rows} /></>} columns={[
        { key: 'time', label: 'Timestamp', render: (r) => <span className="font-mono text-xs">{r.time}</span> }, { key: 'actor', label: 'Actor', render: (r) => <div className="flex items-center gap-2"><Avatar name={r.actor} size={26} /><b className="text-slate-900">{r.actor}</b></div> },
        { key: 'role', label: 'Role', render: (r) => <Badge dot={false} tone="slate">{r.role}</Badge> }, { key: 'action', label: 'Action' }, { key: 'target', label: 'Target', render: (r) => <span className="font-semibold">{r.target}</span> }, { key: 'ip', label: 'IP', render: (r) => <span className="font-mono text-xs text-slate-400">{r.ip}</span> },
      ]} />
    </div>
  );
}

export function SystemSettings() {
  const { toast } = useApp();
  const [flags, setFlags] = useState({ jobplus: true, intl: true, maintenance: false, mfa: true, videoAuto: false });
  return (
    <div className="space-y-6">
      <PageHeader title="System Settings" desc="Platform-wide configuration for Version 1." actions={<Button variant="navy" onClick={() => toast('System settings saved (demo).')}>Save changes</Button>} />
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <div className="font-display font-bold text-slate-900">Fees (GBP)</div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Player fee — Founding/member academy"><Input defaultValue="24.99" /></Field>
            <Field label="Player fee — Other UK"><Input defaultValue="49.99" /></Field>
            <Field label="Player fee — International"><Input defaultValue="29.99" /></Field>
            <Field label="Claim Fee (after PPM approval)"><Input defaultValue="100.00" /></Field>
            <Field label="Placement fee minimum"><Input defaultValue="3000.00" /></Field>
            <Field label="Placement fee percentage"><Input defaultValue="10%" /></Field>
            <Field label="Job+ hiring success fee"><Input defaultValue="15% of first-year base salary" /></Field>
            <Field label="Grassroots allocation"><Input defaultValue="5% of eligible revenue" /></Field>
          </div>
        </Card>
        <div className="space-y-6">
          <Card className="space-y-5 p-5 sm:p-6">
            <div className="font-display font-bold text-slate-900">Feature flags</div>
            <Toggle checked={flags.jobplus} onChange={(v) => setFlags({ ...flags, jobplus: v })} label="Job+ enabled" desc="Candidate opt-in and employer access." />
            <Toggle checked={flags.intl} onChange={(v) => setFlags({ ...flags, intl: v })} label="International player registrations" desc="Players outside the UK (£29.99 plan)." />
            <Toggle checked={flags.mfa} onChange={(v) => setFlags({ ...flags, mfa: v })} label="Require 2FA for staff roles" />
            <Toggle checked={flags.maintenance} onChange={(v) => setFlags({ ...flags, maintenance: v })} label="Maintenance banner" desc="Show a site-wide maintenance notice." />
          </Card>
          <Card className="space-y-4 p-5 sm:p-6">
            <div className="font-display font-bold text-slate-900">Locked policies (Version 1)</div>
            {[['Currency', 'GBP only — multi-currency out of scope'], ['Club ↔ player direct messaging', 'Disabled by default; monitored channel per Claim via PPM'], ['Job+ employer region', 'United Kingdom only'], ['Language', 'English (UK)']].map(([k, v]) => (
              <div key={k} className="flex items-start justify-between gap-4 rounded-xl bg-slate-50 p-3"><div><div className="text-sm font-semibold text-slate-900">{k}</div><div className="text-xs text-slate-500">{v}</div></div><Lock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" /></div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
